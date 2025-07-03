# KakaWallet Backend

## Deployment Instructions

### 🚫 Do NOT deploy this backend to Vercel
Vercel is for serverless functions and static sites, not for long-running Express servers. Use one of the following platforms:

---

### 🚀 Deploy to Render (Recommended)
1. Go to https://render.com/
2. Click 'New Web Service'.
3. Connect your GitHub repo.
4. Set root directory to `Backend_`.
5. Set build command: `npm install`
6. Set start command: `npm start`
7. Choose a free or paid plan and deploy.

---

### 🚀 Deploy to Railway
1. Go to https://railway.app/
2. Click 'Start a New Project'.
3. Connect your GitHub repo.
4. Set root directory to `Backend_`.
5. Deploy.

---

### 🚀 Deploy to Heroku
1. Go to https://heroku.com/
2. Create a new app.
3. Connect your GitHub repo.
4. Set root directory to `Backend_`.
5. Heroku will detect the `start` script and deploy automatically.

---

## Local Development

```bash
cd Backend_
npm install
npm start
```

---

## Environment Variables
- Create a `.env` file in `Backend_` if needed for secrets.

---

## Database
- Uses SQLite by default (file: `Backend_/database/kaka_wallet.sqlite`).
- For production, you can switch to Postgres or MySQL by editing `config/database.js`.

---

## API Endpoints
- Health: `/api/health`
- Admin registration: `/api/users/admin`
- Login: `/api/users/login`
- All other endpoints require `x-admin-id` header (see frontend setup).

---

## Need help?
Ask your AI assistant for step-by-step deployment help! 