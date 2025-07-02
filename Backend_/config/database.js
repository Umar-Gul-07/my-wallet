import { Sequelize } from 'sequelize';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create SQLite database connection
export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../database/kaka_wallet.sqlite'),
  logging: false, // Set to console.log to see SQL queries
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
    await sequelize.sync({ force: true });
    console.log('✅ Database synchronized successfully.');
    
    // Create admin user if not exists
    const User = (await import('../models/User.js')).default;
    const adminExists = await User.findOne({ where: { isAdmin: true } });
    
    if (!adminExists) {
      await User.create({
        name: 'Admin User',
        email: 'admin@kakawallet.com',
        password: 'admin123', // In production, use hashed password
        phone: '+1234567890',
        isAdmin: true,
        status: 'active',
        joinDate: new Date()
      });
      console.log('✅ Admin user created successfully.');
    }
  } catch (error) {
    console.error('❌ Error synchronizing database:', error);
  }
}; 