import User from '../models/User.js';
import Transaction from '../models/Transaction.js';
import { validationResult } from 'express-validator';
import { sequelize } from '../config/database.js';
import LoanPerson from '../models/LoanPerson.js';
import Loan from '../models/Loan.js';

// Get all users with their transactions
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: { isAdmin: false }, // Only get people you keep money for
      include: [{
        model: Transaction,
        as: 'transactions',
        attributes: ['id', 'type', 'amount', 'date', 'description'],
        order: [['date', 'DESC']]
      }],
      order: [['joinDate', 'DESC']]
    });

    // Ensure totals are calculated for each user
    const usersWithTotals = users.map(user => {
      const userData = user.toJSON();
      const totals = {
        totalGiven: user.totalGiven,
        totalReturned: user.totalReturned,
        moneyKeepingBalance: user.moneyKeepingBalance,
        lastUpdated: user.lastUpdated,
        // Add special flag for zero balance
        isFullyReturned: user.moneyKeepingBalance === 0
      };
      
      // Debug logging
      console.log(`User ${user.name}:`, {
        transactions: user.transactions?.length || 0,
        given: totals.totalGiven,
        returned: totals.totalReturned,
        moneyBalance: totals.moneyKeepingBalance,
        isFullyReturned: totals.isFullyReturned
      });
      
      return {
        ...userData,
        ...totals
      };
    });

    res.json({
      success: true,
      data: usersWithTotals
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
      error: error.message
    });
  }
};

// Get single user with transactions
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      include: [{
        model: Transaction,
        as: 'transactions',
        attributes: ['id', 'type', 'amount', 'date', 'description'],
        order: [['date', 'DESC']]
      }]
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Ensure totals are calculated
    const userData = user.toJSON();
    const userWithTotals = {
      ...userData,
      totalGiven: user.totalGiven,
      totalReturned: user.totalReturned,
      moneyKeepingBalance: user.moneyKeepingBalance,
      lastUpdated: user.lastUpdated,
      // Add special flag for zero balance
      isFullyReturned: user.moneyKeepingBalance === 0
    };

    res.json({
      success: true,
      data: userWithTotals
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user',
      error: error.message
    });
  }
};

// Create new user (for people you keep money for)
export const createUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const { name, email, password, phone, address, notes } = req.body;

    // Check if user already exists (only if email is provided)
    if (email) {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'User with this email already exists'
        });
      }
    }

    // Validate password only if provided (for admin login)
    if (password && password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }

    const user = await User.create({
      name,
      email: email || null,
      password: password || null,
      phone,
      address,
      notes,
      isAdmin: false // Default to false, only set true for admin
    });

    // Don't send password in response
    const userResponse = user.toJSON();
    delete userResponse.password;

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: userResponse
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating user',
      error: error.message
    });
  }
};

// Create admin user (only for initial setup)
export const createAdmin = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const { name, email, password } = req.body;

    // Check if admin already exists
    const existingAdmin = await User.findOne({ where: { isAdmin: true } });
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: 'Admin already exists. Only one admin is allowed.'
      });
    }

    // Check if email already exists
    if (email) {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'User with this email already exists'
        });
      }
    }

    // Validate password
    if (!password || password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }

    const admin = await User.create({
      name,
      email: email || null,
      password,
      isAdmin: true
    });

    // Don't send password in response
    const adminResponse = admin.toJSON();
    delete adminResponse.password;

    res.status(201).json({
      success: true,
      message: 'Admin created successfully',
      data: adminResponse
    });
  } catch (error) {
    console.error('Error creating admin:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating admin',
      error: error.message
    });
  }
};

// Update user
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, address, notes, status } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check if email is being changed and if it already exists
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'User with this email already exists'
        });
      }
    }

    await user.update({
      name: name || user.name,
      email: email || user.email,
      phone: phone || user.phone,
      address: address || user.address,
      notes: notes || user.notes,
      status: status || user.status
    });

    res.json({
      success: true,
      message: 'User updated successfully',
      data: user
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating user',
      error: error.message
    });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      include: [{
        model: Transaction,
        as: 'transactions',
        attributes: ['id', 'type', 'amount', 'date', 'description']
      }]
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check if user has any transactions
    const transactionCount = await Transaction.count({ where: { userId: id } });
    
    if (transactionCount > 0) {
      // Check if user is fully returned (balance = 0)
      const balance = user.moneyKeepingBalance;
      
      if (balance !== 0) {
        return res.status(400).json({
          success: false,
          message: `Cannot delete user. Current balance is ${balance} QAR. User must be fully returned (balance = 0) to be deleted.`
        });
      }
      
      // If balance is 0, delete transactions first, then user
      const dbTransaction = await sequelize.transaction();
      
      try {
        // Delete all transactions for this user first
        await Transaction.destroy({ 
          where: { userId: id },
          transaction: dbTransaction
        });
        
        // Then delete the user
        await user.destroy({ transaction: dbTransaction });
        
        await dbTransaction.commit();
        
        res.json({
          success: true,
          message: 'User deleted successfully. All transaction history has been removed.'
        });
      } catch (transactionError) {
        await dbTransaction.rollback();
        throw transactionError;
      }
    } else {
      // No transactions, safe to delete
      await user.destroy();
      
      res.json({
        success: true,
        message: 'User deleted successfully'
      });
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting user',
      error: error.message
    });
  }
};

// Add transaction (money given or returned)
export const addTransaction = async (req, res) => {
  try {
    const { userId } = req.params;
    const { type, amount, description } = req.body;

    const user = await User.findByPk(userId, {
      include: [{
        model: Transaction,
        as: 'transactions',
        attributes: ['id', 'type', 'amount', 'date', 'description']
      }]
    });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Validate return amount - cannot return more than what was given
    if (type === 'returned') {
      const currentBalance = user.moneyKeepingBalance;
      console.log(`Validating return: amount=${amount}, currentBalance=${currentBalance}`);
      if (parseFloat(amount) > currentBalance) {
        return res.status(400).json({
          success: false,
          message: `Cannot return ${amount} QAR. Maximum amount that can be returned is ${currentBalance} QAR (current balance).`
        });
      }
    }

    // Create transaction
    const transaction = await Transaction.create({
      userId,
      type,
      amount: parseFloat(amount),
      description: description || '',
      date: new Date()
    });

    // Get updated user with transactions to calculate new totals
    const updatedUser = await User.findByPk(userId, {
      include: [{
        model: Transaction,
        as: 'transactions',
        attributes: ['id', 'type', 'amount', 'date', 'description'],
        order: [['date', 'DESC']]
      }]
    });

    // Ensure totals are calculated
    const userData = updatedUser.toJSON();
    const userWithTotals = {
      ...userData,
      totalGiven: updatedUser.totalGiven,
      totalReturned: updatedUser.totalReturned,
      moneyKeepingBalance: updatedUser.moneyKeepingBalance,
      lastUpdated: updatedUser.lastUpdated,
      // Add special flag for zero balance
      isFullyReturned: updatedUser.moneyKeepingBalance === 0
    };

    res.status(201).json({
      success: true,
      message: 'Transaction added successfully',
      data: {
        transaction,
        user: userWithTotals
      }
    });
  } catch (error) {
    console.error('Error adding transaction:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding transaction',
      error: error.message
    });
  }
};

// Get user transactions
export const getUserTransactions = async (req, res) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 20 } = req.query;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const offset = (page - 1) * limit;
    const transactions = await Transaction.findAndCountAll({
      where: { userId },
      order: [['date', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      success: true,
      data: {
        transactions: transactions.rows,
        total: transactions.count,
        currentPage: parseInt(page),
        totalPages: Math.ceil(transactions.count / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching transactions',
      error: error.message
    });
  }
};

// Get dashboard statistics
export const getDashboardStats = async (req, res) => {
  try {
    // Get all users with their transactions (Money Keeping)
    const users = await User.findAll({
      where: { isAdmin: false },
      include: [{
        model: Transaction,
        as: 'transactions',
        attributes: ['id', 'type', 'amount', 'date', 'description']
      }]
    });

    // Get all loan persons with their loans
    const loanPersons = await LoanPerson.findAll({
      include: [{
        model: Loan,
        as: 'loans',
        attributes: ['id', 'type', 'amount', 'date', 'description']
      }]
    });

    // Calculate Money Keeping statistics
    const totalPeople = users.length;
    const activeUsers = users.filter(u => u.status === 'active').length;
    const totalGiven = users.reduce((sum, user) => sum + user.totalGiven, 0);
    const totalReturned = users.reduce((sum, user) => sum + user.totalReturned, 0);
    const totalMoneyKept = totalGiven - totalReturned;
    const monthlyTransactions = users.reduce((sum, user) => {
      const thisMonth = user.transactions?.filter(t => {
        const transactionDate = new Date(t.date);
        const now = new Date();
        return transactionDate.getMonth() === now.getMonth() && 
               transactionDate.getFullYear() === now.getFullYear();
      }).length || 0;
      return sum + thisMonth;
    }, 0);

    // Calculate Loan statistics
    const totalLoanPersons = loanPersons.length;
    const activeLoanPersons = loanPersons.filter(lp => lp.status === 'active').length;
    const totalLoanGiven = loanPersons.reduce((sum, person) => sum + person.totalLoanGiven, 0);
    const totalLoanRepaid = loanPersons.reduce((sum, person) => sum + person.totalLoanRepaid, 0);
    const totalLoanBalance = totalLoanGiven - totalLoanRepaid;
    const monthlyLoans = loanPersons.reduce((sum, person) => {
      const thisMonth = person.loans?.filter(l => {
        const loanDate = new Date(l.date);
        const now = new Date();
        return loanDate.getMonth() === now.getMonth() && 
               loanDate.getFullYear() === now.getFullYear();
      }).length || 0;
      return sum + thisMonth;
    }, 0);

    // Get recent transactions (last 10) - combine both user transactions and loans
    const allUserTransactions = users.flatMap(user => 
      (user.transactions || []).map(t => ({
        ...t.toJSON(),
        user: { id: user.id, name: user.name },
        type: 'money-keeping',
        transactionType: t.type
      }))
    );

    const allLoans = loanPersons.flatMap(person => 
      (person.loans || []).map(l => ({
        ...l.toJSON(),
        user: { id: person.id, name: person.name },
        type: 'loan',
        transactionType: l.type
      }))
    );

    const allTransactions = [...allUserTransactions, ...allLoans];
    const recentTransactions = allTransactions
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 10);

    // Get top users by money keeping balance
    const topUsersByBalance = users
      .map(user => ({
        id: user.id,
        name: user.name,
        currentBalance: user.moneyKeepingBalance,
        lastUpdated: user.lastUpdated,
        type: 'money-keeping',
        isFullyReturned: user.moneyKeepingBalance === 0
      }))
      .sort((a, b) => b.currentBalance - a.currentBalance)
      .slice(0, 5);

    // Get top loan persons by loan balance
    const topLoanPersonsByBalance = loanPersons
      .map(person => ({
        id: person.id,
        name: person.name,
        currentBalance: person.loanBalance,
        lastUpdated: person.lastUpdated,
        type: 'loan',
        isFullyRepaid: person.loanBalance === 0
      }))
      .sort((a, b) => b.currentBalance - a.currentBalance)
      .slice(0, 5);

    // Calculate overall financial summary
    const overallBalance = totalMoneyKept + totalLoanBalance;
    const totalMonthlyActivity = monthlyTransactions + monthlyLoans;

    res.json({
      success: true,
      data: {
        // Overall summary
        overallBalance,
        totalMonthlyActivity,
        
        // Money Keeping statistics
        moneyKeeping: {
          totalPeople,
          activeUsers,
          totalGiven,
          totalReturned,
          totalMoneyKept,
          monthlyTransactions
        },
        
        // Loan statistics
        loans: {
          totalLoanPersons,
          activeLoanPersons,
          totalLoanGiven,
          totalLoanRepaid,
          totalLoanBalance,
          monthlyLoans
        },
        
        // Recent transactions
        recentTransactions,
        
        // Top balances
        topUsersByBalance,
        topLoanPersonsByBalance
      }
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard statistics',
      error: error.message
    });
  }
};

// Login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check password (in production, you'd compare hashed passwords)
    if (user.password !== password) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Don't send password in response
    const userResponse = user.toJSON();
    delete userResponse.password;

    res.json({
      success: true,
      message: 'Login successful',
      data: userResponse
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({
      success: false,
      message: 'Error during login',
      error: error.message
    });
  }
}; 