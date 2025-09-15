import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

// If no database, return null
if (!sequelize) {
  export default null;
} else {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [6, 100]
      }
    },
    joinDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      defaultValue: 'active'
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    adminId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: 'users', key: 'id' }
    }
  }, {
    tableName: 'users',
    getterMethods: {
      totalGiven() {
        if (this.transactions && this.transactions.length > 0) {
          return this.transactions
            .filter(t => t.type === 'given')
            .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);
        }
        return 0;
      },
      totalReturned() {
        if (this.transactions && this.transactions.length > 0) {
          return this.transactions
            .filter(t => t.type === 'returned')
            .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);
        }
        return 0;
      },
      moneyKeepingBalance() {
        return this.totalGiven - this.totalReturned;
      },
      lastUpdated() {
        if (this.transactions && this.transactions.length > 0) {
          return this.transactions
            .sort((a, b) => new Date(b.date) - new Date(a.date))[0].date;
        }
        return this.joinDate;
      }
    }
  });

  export default User;
}
