#!/usr/bin/env bash

# ================================================
# KakaWallet - AWS EC2 Deployment Script (No Domain/SSL)
# ================================================
# What this does (idempotent; safe to re-run):
# 1) Installs Node.js 18, PM2, Nginx and configures UFW
# 2) Clones/updates your GitHub repo to /var/www/kaka-wallet
# 3) Installs backend production dependencies (Backend_/)
# 4) Creates .env if missing, with sensible defaults for SQLite
# 5) Configures Nginx to proxy HTTP :80 -> backend :PORT (default 5001)
# 6) Starts the backend with PM2 and enables startup on reboot
#
# Usage examples:
# - Minimal (public repo):
#   sudo bash -c 'REPO_URL="https://github.com/your-org/kaka-wallet.git" BRANCH="main" bash -s' < scripts/deploy_aws.sh
#
# - Pin port and custom app directory:
#   sudo bash -c 'REPO_URL="https://github.com/your-org/kaka-wallet.git" APP_DIR="/var/www/kaka-wallet" PORT="5001" bash -s' < scripts/deploy_aws.sh
#
# Requirements:
# - Run on Ubuntu EC2 as root (use sudo)
# - If repo is private: ensure EC2 has read access (deploy key/SSH)
# ================================================

set -Eeuo pipefail
IFS=$'\n\t'

# ------------------------
# Config (override via env)
# ------------------------
: "${REPO_URL:=https://github.com/your-org/kaka-wallet.git}"
: "${BRANCH:=main}"
: "${APP_NAME:=kaka-wallet}"
: "${APP_DIR:=/var/www/kaka-wallet}"
: "${BACKEND_DIR:=Backend_}"
: "${PORT:=5001}"
: "${NODE_MAJOR:=18}"

DEFAULT_ENV_CONTENT="PORT=${PORT}
NODE_ENV=production
ALLOWED_ORIGINS=http://localhost:3000
DATABASE_URL=${APP_DIR}/${BACKEND_DIR}/database/kaka_wallet.sqlite"

# ------------------------
# Helpers
# ------------------------
log() { printf "\n[deploy] %s\n" "$*"; }
die() { printf "\n[deploy][error] %s\n" "$*" >&2; exit 1; }

require_root() { [[ $EUID -eq 0 ]] || die "Run as root (sudo)."; }

apt_install() {
  local pkgs=("$@") to_install=()
  for p in "${pkgs[@]}"; do dpkg -s "$p" >/dev/null 2>&1 || to_install+=("$p"); done
  if ((${#to_install[@]})); then apt-get update -y && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends "${to_install[@]}"; fi
}

ensure_node() {
  if ! command -v node >/dev/null 2>&1 || ! node -v | grep -q "v${NODE_MAJOR}"; then
    curl -fsSL https://deb.nodesource.com/setup_${NODE_MAJOR}.x | bash -
    apt_install nodejs build-essential
  fi
}

ensure_pm2() { command -v pm2 >/dev/null 2>&1 || npm i -g pm2; }

ensure_nginx() { apt_install nginx; systemctl enable nginx; }

setup_firewall() {
  if command -v ufw >/dev/null 2>&1; then
    ufw allow OpenSSH >/dev/null 2>&1 || true
    ufw allow 'Nginx Full' >/dev/null 2>&1 || true
    yes | ufw enable >/dev/null 2>&1 || true
  fi
}

clone_or_update_repo() {
  log "Cloning or updating repository"
  mkdir -p "${APP_DIR}"
  if [[ -d "${APP_DIR}/.git" ]]; then
    git -C "${APP_DIR}" fetch --all --prune
    git -C "${APP_DIR}" checkout "${BRANCH}"
    git -C "${APP_DIR}" pull --ff-only origin "${BRANCH}"
  else
    git clone --branch "${BRANCH}" "${REPO_URL}" "${APP_DIR}"
  fi
}

prepare_backend() {
  log "Preparing backend dependencies and environment"
  [[ -d "${APP_DIR}/${BACKEND_DIR}" ]] || die "Missing ${APP_DIR}/${BACKEND_DIR}"
  pushd "${APP_DIR}/${BACKEND_DIR}" >/dev/null
  mkdir -p database
  if [[ -f package-lock.json ]]; then npm ci --omit=dev; else npm i --omit=dev; fi
  [[ -f .env ]] || printf "%s\n" "${ENV_FILE:-$DEFAULT_ENV_CONTENT}" > .env
  popd >/dev/null
}

configure_nginx() {
  log "Configuring Nginx reverse proxy on port 80"
  local conf="/etc/nginx/sites-available/${APP_NAME}.conf"
  cat > "$conf" <<EOF
server {
    listen 80;
    server_name _;

    client_max_body_size 20m;

    location / {
        proxy_pass http://127.0.0.1:${PORT};
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_read_timeout 300;
    }

    location ~ /(\.env|\.env\..*)$ { deny all; }
}
EOF
  ln -sf "$conf" "/etc/nginx/sites-enabled/${APP_NAME}.conf"
  [[ -e /etc/nginx/sites-enabled/default ]] && rm -f /etc/nginx/sites-enabled/default
  nginx -t && systemctl reload nginx
}

start_pm2() {
  log "Starting or restarting PM2 process: ${APP_NAME}"
  pushd "${APP_DIR}/${BACKEND_DIR}" >/dev/null
  if pm2 describe "$APP_NAME" >/dev/null 2>&1; then pm2 restart "$APP_NAME"; else pm2 start app.js --name "$APP_NAME" --time --update-env; fi
  pm2 save
  pm2 startup systemd -u "$(whoami)" --hp "$HOME" | sed -n 's/^.*sudo \(.*systemctl.*pm2.*\)$/\1/p' | bash || true
  popd >/dev/null
}

summary() {
  log "Deployed $APP_NAME on port $PORT"
  echo "Access via server IP on http://<EC2_PUBLIC_IP>/"
  pm2 status || true
}

#========================
# Main
#========================
require_root

log "Installing base packages"
apt_install curl git ca-certificates ufw

log "Ensuring Node.js and PM2 are installed"
ensure_node
ensure_pm2

log "Ensuring Nginx is installed and enabled"
ensure_nginx

log "Configuring firewall (UFW)"
setup_firewall

clone_or_update_repo
prepare_backend
configure_nginx
start_pm2
summary


