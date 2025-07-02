import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { testConnection, syncDatabase } from './config/database.js';
import userRoutes from './routes/userRoutes.js';
import loanRoutes from './routes/loanRoutes.js';
import loanPersonRoutes from './routes/loanPersonRoutes.js';
import { createBackup, createDatabaseBackup } from './backup.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test database connection
testConnection();

// Sync database (create tables)
syncDatabase();

// Routes
app.use('/api/users', userRoutes);
app.use('/api/loans', loanRoutes);
app.use('/api/loan-persons', loanPersonRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'KakaWallet API is running',
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