import LoanPerson from '../models/LoanPerson.js';
import Loan from '../models/Loan.js';
import { validationResult } from 'express-validator';

// Add loan transaction
export const addLoan = async (req, res) => {
  try {
    const { loanPersonId } = req.params;
    const { type, amount, description } = req.body;

    const loanPerson = await LoanPerson.findByPk(loanPersonId, {
      include: [{
        model: Loan,
        as: 'loans',
        attributes: ['id', 'type', 'amount', 'date', 'description']
      }]
    });
    
    if (!loanPerson) {
      return res.status(404).json({
        success: false,
        message: 'Loan person not found'
      });
    }

    // Validate repayment amount - cannot repay more than what was loaned
    if (type === 'repaid') {
      const currentBalance = loanPerson.loanBalance;
      console.log(`Validating loan repayment: amount=${amount}, currentBalance=${currentBalance}`);
      if (parseFloat(amount) > currentBalance) {
        return res.status(400).json({
          success: false,
          message: `Cannot repay ${amount} QAR. Maximum amount that can be repaid is ${currentBalance} QAR (current loan balance).`
        });
      }
    }

    // Create loan
    const loan = await Loan.create({
      loanPersonId,
      type,
      amount: parseFloat(amount),
      description: description || '',
      date: new Date(),
      adminId: req.user.id
    });

    // Get updated loan person with loans to calculate new totals
    const updatedLoanPerson = await LoanPerson.findByPk(loanPersonId, {
      include: [
        {
          model: Loan,
          as: 'loans',
          attributes: ['id', 'type', 'amount', 'date', 'description'],
          order: [['date', 'DESC']]
        }
      ]
    });

    res.status(201).json({
      success: true,
      message: 'Loan transaction added successfully',
      data: {
        loan,
        loanPerson: {
          id: updatedLoanPerson.id,
          name: updatedLoanPerson.name,
          totalLoanGiven: updatedLoanPerson.totalLoanGiven,
          totalLoanRepaid: updatedLoanPerson.totalLoanRepaid,
          loanBalance: updatedLoanPerson.loanBalance,
          lastUpdated: updatedLoanPerson.lastUpdated,
          isFullyRepaid: updatedLoanPerson.loanBalance === 0
        }
      }
    });
  } catch (error) {
    console.error('Error adding loan:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding loan transaction',
      error: error.message
    });
  }
};

// Get loan person loans
export const getUserLoans = async (req, res) => {
  try {
    const { loanPersonId } = req.params;
    const { page = 1, limit = 20 } = req.query;

    const loanPerson = await LoanPerson.findByPk(loanPersonId);
    if (!loanPerson) {
      return res.status(404).json({
        success: false,
        message: 'Loan person not found'
      });
    }

    const offset = (page - 1) * limit;
    const loans = await Loan.findAndCountAll({
      where: { loanPersonId },
      order: [['date', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      success: true,
      data: {
        loans: loans.rows,
        total: loans.count,
        currentPage: parseInt(page),
        totalPages: Math.ceil(loans.count / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching loans:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching loans',
      error: error.message
    });
  }
};

// Get all loans for dashboard
export const getAllLoans = async (req, res) => {
  try {
    const loans = await Loan.findAll({
      where: { adminId: req.user.id },
      include: [{
        model: LoanPerson,
        as: 'loanPerson',
        attributes: ['id', 'name', 'email'],
        where: { status: 'active' }
      }],
      order: [['date', 'DESC']],
      limit: 10
    });

    res.json({
      success: true,
      data: loans
    });
  } catch (error) {
    console.error('Error fetching all loans:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching loans',
      error: error.message
    });
  }
}; 