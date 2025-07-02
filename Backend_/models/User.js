import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

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
    allowNull: true, // Email is optional for people you keep money for
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
    allowNull: true, // Password only for admin login
    validate: {
      len: [6, 100] // Minimum 6 characters
    }
  },
  // Additional fields for better tracking
  joinDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    comment: 'When this person started keeping money with you'
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'active',
    comment: 'Whether this person is still active'
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Additional notes about this person'
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    comment: 'Whether this user is the admin/money keeper'
  }
}, {
  tableName: 'users',
  getterMethods: {
    // Virtual fields that calculate totals from transactions (money keeping)
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