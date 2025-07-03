import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import LoanPerson from './LoanPerson.js';

const Loan = sequelize.define('Loan', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  loanPersonId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'loan_persons',
      key: 'id'
    }
  },
  type: {
    type: DataTypes.ENUM('given', 'repaid'),
    allowNull: false,
    comment: 'given = you gave loan to person, repaid = person repaid loan to you'
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0.01
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Optional description of the loan'
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  },
  adminId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' },
    comment: 'The admin who owns this loan record'
  }
}, {
  tableName: 'loans'
});

// Define associations
Loan.belongsTo(LoanPerson, { foreignKey: 'loanPersonId', as: 'loanPerson' });
LoanPerson.hasMany(Loan, { foreignKey: 'loanPersonId', as: 'loans' });

export default Loan; 