# 🚀 KakaWallet Backend - Vercel Deployment

This is the Vercel-compatible version of your KakaWallet backend, converted to use serverless functions.

## 📋 Prerequisites

1. **Vercel Account** - Sign up at [vercel.com](https://vercel.com)
2. **Database** - You need a cloud database (PostgreSQL recommended)
3. **GitHub Repository** - Your code should be on GitHub

## 🗄️ Database Setup

### Option 1: Vercel Postgres (Recommended)
1. Go to your Vercel dashboard
2. Create a new Postgres database
3. Copy the connection string

### Option 2: PlanetScale (MySQL)
1. Sign up at [planetscale.com](https://planetscale.com)
2. Create a new database
3. Copy the connection string

### Option 3: Supabase (PostgreSQL)
1. Sign up at [supabase.com](https://supabase.com)
2. Create a new project
3. Copy the connection string

## 🚀 Deployment Steps

### 1. Push to GitHub
```bash
git add .
git commit -m "Add Vercel serverless functions"
git push origin main
```

### 2. Deploy on Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Set the following environment variables:
   - `DATABASE_URL` - Your database connection string
   - `JWT_SECRET` - A random secret key for JWT tokens
5. Click "Deploy"

### 3. Environment Variables
In your Vercel project settings, add:
```
DATABASE_URL=postgresql://username:password@host:port/database
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=production
```

## 📡 API Endpoints

- `GET /api/health` - Health check
- `POST /api/users/login` - Admin login
- `POST /api/users/admin` - Admin registration
- `GET /api/users` - Get all users (requires auth)
- `POST /api/users` - Create user (requires auth)

## 🔧 Local Development

```bash
# Install Vercel CLI
npm i -g vercel

# Run locally
vercel dev
```

## ⚠️ Important Notes

1. **Database**: This version uses a cloud database instead of SQLite
2. **File Storage**: No persistent file storage (use cloud storage for uploads)
3. **Backups**: Automatic backups are disabled (implement cloud-based backups)
4. **Cold Starts**: First request might be slower due to serverless nature

## 🆚 Differences from Original Backend

- ✅ **Serverless Functions** instead of Express server
- ✅ **Cloud Database** instead of SQLite
- ✅ **Vercel Deployment** instead of traditional hosting
- ❌ **No File Uploads** (use cloud storage)
- ❌ **No Scheduled Backups** (implement separately)

## 🎯 Next Steps

1. Deploy to Vercel
2. Set up your database
3. Update your frontend to use the new Vercel URL
4. Test all endpoints
5. Set up cloud storage for file uploads (if needed)

Your backend will be available at: `https://your-project.vercel.app/api`
