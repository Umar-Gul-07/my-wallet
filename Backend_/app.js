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

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test and sync database
testConnection();
syncDatabase();

// Separate routers for login and admin creation
const loginRouter = express.Router();
const adminRouter = express.Router();

loginRouter.post('/', [body('email').isEmail(), body('password').notEmpty()], loginUser);
adminRouter.post('/', [
  body('name').notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
], createAdmin);

// Routes
app.use('/api/users/login', loginRouter);
app.use('/api/users/admin', adminRouter);
app.use('/api/users', adminAuth, userRoutes);
app.use('/api/loans', adminAuth, loanRoutes);
app.use('/api/loan-persons', adminAuth, loanPersonRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'KakaWallet API is running',
    timestamp: new Date().toISOString()
  });
});

// Root route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to KakaWallet API! Visit /api/health for status.',
    docs: '/api/health',
    timestamp: new Date().toISOString()
  });
});

// Backup route
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

// Error handler
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

// Scheduled backup (every 24 hours)
setInterval(async () => {
  try {
    console.log('🔄 Running scheduled backup...');
    await createBackup();
    await createDatabaseBackup();
    console.log('✅ Scheduled backup completed');
  } catch (error) {
    console.error('❌ Scheduled backup failed:', error);
  }
}, 24 * 60 * 60 * 1000);

// ✅ Export app for Vercel (no app.listen)
export default app;
