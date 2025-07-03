import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const LoanPerson = sequelize.define('LoanPerson', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [2, 100]
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isEmail: true
    }
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'active'
  },
  joinDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  adminId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' },
    comment: 'The admin who owns this loan person record'
  }
}, {
  tableName: 'loan_persons',
  getterMethods: {
    // Virtual fields that calculate totals from loans
    totalLoanGiven() {
      if (this.loans && this.loans.length > 0) {
        return this.loans
          .filter(l => l.type === 'given')
          .reduce((sum, l) => sum + parseFloat(l.amount || 0), 0);
      }
      return 0;
    },
    totalLoanRepaid() {
      if (this.loans && this.loans.length > 0) {
        return this.loans
          .filter(l => l.type === 'repaid')
          .reduce((sum, l) => sum + parseFloat(l.amount || 0), 0);
      }
      return 0;
    },
    loanBalance() {
      return this.totalLoanGiven - this.totalLoanRepaid;
    },
    lastUpdated() {
      if (this.loans && this.loans.length > 0) {
        return this.loans
          .sort((a, b) => new Date(b.date) - new Date(a.date))[0].date;
      }
      return this.joinDate;
    }
  }
});

export default LoanPerson; 