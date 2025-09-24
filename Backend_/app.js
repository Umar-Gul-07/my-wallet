import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { testConnection, syncDatabase } from './config/database.js';
import userRoutes from './routes/userRoutes.js';
import loanRoutes from './routes/loanRoutes.js';
import loanPersonRoutes from './routes/loanPersonRoutes.js';
import { createBackup, createDatabaseBackup } from './backup.js';
import { adminAuth } from './utils/authMiddleware.js';
import { loginUser, createAdmin } from './controllers/userController.js';
import { body } from 'express-validator';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// Configure CORS with an allowlist to avoid wildcard with credentials
const defaultAllowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'https://your-frontend-domain.vercel.app'
];
const allowedOrigins = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map(o => o.trim())
  .filter(Boolean);
const corsAllowlist = allowedOrigins.length ? allowedOrigins : defaultAllowedOrigins;

app.use(cors({
  origin: (origin, callback) => {
    // Allow non-browser requests (like curl/postman) where origin is undefined
    if (!origin) return callback(null, true);
    if (corsAllowlist.includes(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'x-admin-id', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
}));

// Add request logging middleware (disabled in production)
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log(`📥 ${req.method} ${req.path} - ${new Date().toISOString()}`);
    next();
  });
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test database connection
testConnection();

// Sync database (create tables)
syncDatabase();

// Fix: Use dedicated routers for login and admin registration to avoid route overlap
const loginRouter = express.Router();
const adminRouter = express.Router();

loginRouter.post('/', [body('email').isEmail(), body('password').notEmpty()], loginUser);
adminRouter.post('/', [body('name').notEmpty(), body('email').isEmail(), body('password').isLength({ min: 6 })], createAdmin);

// Routes
app.use('/api/users/login', loginRouter); // login route (no auth)
app.use('/api/users/admin', adminRouter); // admin registration (no auth)
app.use('/api/users', adminAuth, userRoutes); // all other user routes (protected)
app.use('/api/loans', adminAuth, loanRoutes);
app.use('/api/loan-persons', adminAuth, loanPersonRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'KakaWallet API is running',
    timestamp: new Date().toISOString()
  });
});

// Root route for Railway/Vercel visits
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to KakaWallet API!',
    endpoints: {
      health: '/api/health',
      adminRegistration: '/api/users/admin',
      login: '/api/users/login'
    },
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Backup routes
app.post('/api/backup/create', async (req, res) => {
  try {
    const result = await createBackup();
    await createDatabaseBackup();
    res.json({
      success: true,
      message: 'Backup created successfully',
      data: result
    });
  } catch (error) {
    console.error('Backup error:', error);
    res.status(500).json({
      success: false,
      message: 'Backup failed',
      error: error.message
    });
  }
});

// Auto-backup every 24 hours
setInterval(async () => {
  try {
    console.log('🔄 Running scheduled backup...');
    await createBackup();
    await createDatabaseBackup();
    console.log('✅ Scheduled backup completed');
  } catch (error) {
    console.error('❌ Scheduled backup failed:', error);
  }
}, 24 * 60 * 60 * 1000); // 24 hours

// Start server
app.listen(PORT, () => {
  console.log(`🚀 KakaWallet API server running on port ${PORT}`);
  console.log(`📊 Database: SQLite with Sequelize ORM`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`💾 Auto-backup enabled (every 24 hours)`);
});