# 🗄️ Database Setup for KakaWallet

## 🚀 Quick Setup Options

### Option 1: Vercel Postgres (Recommended)
1. Go to your Vercel project dashboard
2. Click on "Storage" tab
3. Click "Create Database" → "Postgres"
4. Copy the connection string
5. Add it as `DATABASE_URL` environment variable

### Option 2: Supabase (Free PostgreSQL)
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Settings → Database
4. Copy the connection string
5. Add it as `DATABASE_URL` environment variable

### Option 3: PlanetScale (MySQL)
1. Go to [planetscale.com](https://planetscale.com)
2. Create a new database
3. Copy the connection string
4. Add it as `DATABASE_URL` environment variable

## 🔧 Environment Variables

Add these to your Vercel project:

```
DATABASE_URL=postgresql://username:password@host:port/database
JWT_SECRET=your-super-secret-jwt-key-here
```

## 🎯 How It Works

- **With Database**: Full functionality with real data storage
- **Without Database**: Falls back to test mode with mock data
- **Automatic Detection**: The API automatically detects if database is available

## ✅ Test Your Setup

1. **With Database**: Create admin, login, manage real users
2. **Without Database**: Use test credentials (admin@test.com / 123456)

## 🚀 Deploy

After setting up the database:
1. Push your code to GitHub
2. Vercel will automatically redeploy
3. Your API will use the real database

The system is now **hybrid** - it works with or without a database!
