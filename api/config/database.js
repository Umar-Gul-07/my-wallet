import { Sequelize } from 'sequelize';

// Use environment variable for database URL (Vercel Postgres, PlanetScale, etc.)
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL environment variable is required');
}

// Create database connection
export const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres', // or 'mysql' for PlanetScale
  logging: false, // Disable logging in production
  define: {
    timestamps: true,
    underscored: true
  },
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

// Test database connection
export const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully');
    return true;
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    return false;
  }
};

// Sync database (create tables)
export const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('✅ Database synchronized successfully');
    return true;
  } catch (error) {
    console.error('❌ Database sync failed:', error);
    return false;
  }
};
