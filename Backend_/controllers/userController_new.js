import User from '../models/User.js';
import Transaction from '../models/Transaction.js';
import { validationResult } from 'express-validator';
import { sequelize } from '../config/database.js';

// Get all users with their transactions
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: { isAdmin: false }, // Only get people you keep money for
      include: [{
        model: Transaction,
        as: 'transactions',
        order: [['date', 'DESC']]
      }],
      order: [['joinDate', 'DESC']]
    });

    res.json({
      success: true,
      data: users
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
        order: [['date', 'DESC']]
      }]
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: user
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

// Create new user
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
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check if user has any transactions
    const transactionCount = await Transaction.count({ where: { userId: id } });
    if (transactionCount > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete user with existing transactions'
      });
    }

    await user.destroy();

    res.json({
      success: true,
      message: 'User deleted successfully'
    });
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

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
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
        order: [['date', 'DESC']]
      }]
    });

    res.status(201).json({
      success: true,
      message: 'Transaction added successfully',
      data: {
        transaction,
        user: {
          id: updatedUser.id,
          name: updatedUser.name,
          totalGiven: updatedUser.totalGiven,
          totalReturned: updatedUser.totalReturned,
          currentBalance: updatedUser.currentBalance,
          lastUpdated: updatedUser.lastUpdated
        }
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
    // Get all users with their transactions
    const users = await User.findAll({
      where: { isAdmin: false },
      include: [{
        model: Transaction,
        as: 'transactions'
      }]
    });

    // Calculate statistics
    const totalUsers = users.length;
    const activeUsers = users.filter(u => u.status === 'active').length;
    const inactiveUsers = users.filter(u => u.status === 'inactive').length;
    
    const totalGiven = users.reduce((sum, user) => sum + user.totalGiven, 0);
    const totalReturned = users.reduce((sum, user) => sum + user.totalReturned, 0);
    const totalBalance = totalGiven - totalReturned;

    const usersWithMoney = users.filter(u => u.currentBalance > 0).length;
    const usersWithZeroBalance = users.filter(u => u.currentBalance === 0).length;

    // Recent transactions (last 10)
    const recentTransactions = await Transaction.findAll({
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'email'],
        where: { isAdmin: false }
      }],
      order: [['date', 'DESC']],
      limit: 10
    });

    // Top users by balance
    const topUsersByBalance = users
      .filter(u => u.currentBalance > 0)
      .sort((a, b) => b.currentBalance - a.currentBalance)
      .slice(0, 5)
      .map(user => ({
        id: user.id,
        name: user.name,
        currentBalance: user.currentBalance,
        totalGiven: user.totalGiven,
        totalReturned: user.totalReturned,
        lastUpdated: user.lastUpdated
      }));

    res.json({
      success: true,
      data: {
        // User statistics
        totalUsers,
        activeUsers,
        inactiveUsers,
        usersWithMoney,
        usersWithZeroBalance,
        
        // Money statistics
        totalGiven: parseFloat(totalGiven),
        totalReturned: parseFloat(totalReturned),
        totalBalance: parseFloat(totalBalance),
        
        // Recent activity
        recentTransactions,
        topUsersByBalance
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