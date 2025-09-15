import { Sequelize } from 'sequelize';

// Use environment variable for database URL (Vercel Postgres, PlanetScale, etc.)
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.warn('⚠️ DATABASE_URL not found. Using in-memory database for testing.');
  // For testing without database
  export const sequelize = null;
  export const testConnection = async () => {
    console.log('✅ Using in-memory database (testing mode)');
    return true;
  };
  export const syncDatabase = async () => {
    console.log('✅ Database sync skipped (testing mode)');
    return true;
  };
} else {
  // Create database connection
  export const sequelize = new Sequelize(databaseUrl, {
    dialect: 'postgres',
    logging: false,
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
}
