import { Sequelize } from 'sequelize';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure database directory exists
const dbDir = path.join(__dirname, '../database');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// Use environment variable for database path or default to local path
const dbPath = process.env.DATABASE_URL || path.join(dbDir, 'kaka_wallet.sqlite');

// Create SQLite database connection
export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath,
  logging: false, // Disable logging in production
  define: {
    timestamps: true,
    underscored: true
  }
});

// Test database connection
export const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
  }
};

// Sync database (create tables)
export const syncDatabase = async () => {
  try {
    // Import models to ensure they are registered
    await import('../models/User.js');
    await import('../models/Transaction.js');
    await import('../models/LoanPerson.js');
    await import('../models/Loan.js');
    
    // Sync without force to preserve existing data
    await sequelize.sync({ alter: true });
    console.log('✅ Database synchronized successfully.');
    
    // Create default admin if none exists
    const { default: User } = await import('../models/User.js');
    const adminExists = await User.findOne({ where: { isAdmin: true } });
    if (!adminExists) {
      await User.create({
        name: 'Default Admin',
        email: 'admin@kakawallet.com',
        password: 'admin123',
        isAdmin: true
      });
      console.log('✅ Admin user created successfully.');
    }
  } catch (error) {
    console.error('❌ Database sync error:', error);
  }
}; 