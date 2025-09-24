#!/usr/bin/env bash

# KakaWallet AWS Deployment Script
# This script provisions an Ubuntu server, installs Node.js, PM2, and Nginx,
# deploys the KakaWallet backend, configures a reverse proxy, optional SSL,
# and sets up process persistence. Idempotent and safe to re-run.

set -Eeuo pipefail
IFS=$'\n\t'

###############################
# Configurable Variables
###############################

# Required: public Git repo URL or your private repo URL (use deploy key if private)
: "${REPO_URL:=https://github.com/your-org/kaka-wallet.git}"

# Branch to deploy
: "${BRANCH:=main}"

# Domain for Nginx server_name. Leave empty for IP-based access
: "${DOMAIN:=}"

# Email for Let's Encrypt (required if ENABLE_SSL=true)
: "${LETSENCRYPT_EMAIL:=admin@example.com}"

# Toggle automatic SSL with Certbot (true/false)
: "${ENABLE_SSL:=false}"

# App and system paths
: "${APP_NAME:=kaka-wallet}"
: "${APP_DIR:=/var/www/kaka-wallet}"
: "${BACKEND_DIR:=Backend_}"

# Runtime
: "${NODE_MAJOR:=18}"
: "${PORT:=5000}"

# Environment file content (override via ENV_FILE or individual vars)
# DATABASE_URL defaults to SQLite file inside Backend_/database/
DEFAULT_ENV_CONTENT="PORT=${PORT}
NODE_ENV=production
DATABASE_URL=${APP_DIR}/${BACKEND_DIR}/database/kaka_wallet.sqlite"

###############################
# Helper Functions
###############################

log() { printf "\n[deploy] %s\n" "$*"; }
die() { printf "\n[deploy][error] %s\n" "$*" >&2; exit 1; }

require_root() {
  if [[ "${EUID}" -ne 0 ]]; then
    die "This script must be run as root (use sudo)."
  fi
}

apt_install() {
  # Install packages only if missing to keep idempotency
  local pkgs=("$@")
  local to_install=()
  for p in "${pkgs[@]}"; do
    if ! dpkg -s "$p" >/dev/null 2>&1; then
      to_install+=("$p")
    fi
  done
  if ((${#to_install[@]})); then
    apt-get update -y
    DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends "${to_install[@]}"
  fi
}

ensure_node() {
  if ! command -v node >/dev/null 2>&1 || ! node -v | grep -q "v${NODE_MAJOR}"; then
    log "Installing Node.js ${NODE_MAJOR}.x"
    curl -fsSL https://deb.nodesource.com/setup_${NODE_MAJOR}.x | bash -
    apt_install nodejs build-essential
  else
    log "Node.js present: $(node -v)"
  fi
}

ensure_pm2() {
  if ! command -v pm2 >/dev/null 2>&1; then
    log "Installing PM2"
    npm i -g pm2
  else
    log "PM2 present: $(pm2 -v)"
  fi
}

ensure_nginx() {
  apt_install nginx
  systemctl enable nginx
}

setup_firewall() {
  if command -v ufw >/dev/null 2>&1; then
    ufw allow OpenSSH >/dev/null 2>&1 || true
    ufw allow 'Nginx Full' >/dev/null 2>&1 || true
    yes | ufw enable >/dev/null 2>&1 || true
  fi
}

clone_or_update_repo() {
  mkdir -p "${APP_DIR}"
  if [[ -d "${APP_DIR}/.git" ]]; then
    log "Updating existing repo at ${APP_DIR}"
    git -C "${APP_DIR}" fetch --all --prune
    git -C "${APP_DIR}" checkout "${BRANCH}"
    git -C "${APP_DIR}" pull --ff-only origin "${BRANCH}"
  else
    log "Cloning repo ${REPO_URL} into ${APP_DIR}"
    git clone --branch "${BRANCH}" "${REPO_URL}" "${APP_DIR}"
  fi
}

prepare_backend() {
  [[ -d "${APP_DIR}/${BACKEND_DIR}" ]] || die "Backend directory not found: ${APP_DIR}/${BACKEND_DIR}"
  pushd "${APP_DIR}/${BACKEND_DIR}" >/dev/null

  # Ensure database folder exists for SQLite
  mkdir -p database

  # Install dependencies
  if [[ -f package-lock.json ]]; then
    npm ci --omit=dev
  else
    npm i --omit=dev
  fi

  # Create .env if missing
  if [[ ! -f .env ]]; then
    log "Creating .env"
    if [[ -n "${ENV_FILE:-}" ]]; then
      printf "%s\n" "${ENV_FILE}" > .env
    else
      printf "%s\n" "${DEFAULT_ENV_CONTENT}" > .env
    fi
  fi

  popd >/dev/null
}

configure_nginx() {
  local server_name _server_name
  if [[ -n "${DOMAIN}" ]]; then
    server_name="${DOMAIN}"
    _server_name="server_name ${DOMAIN};"
  else
    server_name="_"
    _server_name="# using default server_name since DOMAIN is empty"
  fi

  local conf_path="/etc/nginx/sites-available/${APP_NAME}.conf"
  cat > "${conf_path}" <<EOF
server {
    listen 80;
    ${_server_name}

    # Increase body size if needed for file uploads
    client_max_body_size 20m;

    location / {
        proxy_pass http://127.0.0.1:${PORT};
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 300;
    }

    # Do not serve env files
    location ~ /(\.env|\.env\..*)$ { deny all; }
}
EOF

  ln -sf "${conf_path}" "/etc/nginx/sites-enabled/${APP_NAME}.conf"
  # Remove default if exists
  if [[ -e /etc/nginx/sites-enabled/default ]]; then
    rm -f /etc/nginx/sites-enabled/default
  fi

  nginx -t
  systemctl reload nginx
}

enable_ssl() {
  if [[ "${ENABLE_SSL}" != "true" ]]; then
    log "SSL is disabled. Skipping Certbot."
    return 0
  fi
  [[ -n "${DOMAIN}" ]] || die "ENABLE_SSL=true requires DOMAIN to be set"
  [[ -n "${LETSENCRYPT_EMAIL}" ]] || die "ENABLE_SSL=true requires LETSENCRYPT_EMAIL to be set"

  apt_install certbot python3-certbot-nginx
  # Non-interactive certbot issuance and nginx reconfiguration with redirect
  certbot --nginx -d "${DOMAIN}" -m "${LETSENCRYPT_EMAIL}" --agree-tos -n --redirect || die "Certbot failed"
}

start_pm2() {
  pushd "${APP_DIR}/${BACKEND_DIR}" >/dev/null
  # Start or restart the app with PM2
  if pm2 describe "${APP_NAME}" >/dev/null 2>&1; then
    pm2 restart "${APP_NAME}"
  else
    pm2 start app.js --name "${APP_NAME}" --time --update-env
  fi
  # Persist PM2 across reboots
  pm2 save
  pm2 startup systemd -u "$(whoami)" --hp "${HOME}" | sed -n 's/^.*sudo \(.*systemctl.*pm2.*\)$/\1/p' | bash || true
  popd >/dev/null
}

print_summary() {
  log "Deployment finished. Summary:"
  echo "- App Name: ${APP_NAME}"
  echo "- Repo: ${REPO_URL}@${BRANCH}"
  echo "- Path: ${APP_DIR}/${BACKEND_DIR}"
  echo "- Port: ${PORT} (proxied by Nginx)"
  if [[ -n "${DOMAIN}" ]]; then
    echo "- URL: http://${DOMAIN}/ (and https if SSL enabled)"
  else
    echo "- Access via server IP on port 80"
  fi
  echo "- PM2 status:"
  pm2 status || true
}

###############################
# Main
###############################

require_root

log "Installing base dependencies"
apt_install curl git ca-certificates ufw

ensure_node
ensure_pm2
ensure_nginx
setup_firewall

log "Fetch application code"
clone_or_update_repo

log "Prepare backend and environment"
prepare_backend

log "Configure Nginx reverse proxy"
configure_nginx

log "Start or restart PM2 process"
start_pm2

enable_ssl

print_summary


