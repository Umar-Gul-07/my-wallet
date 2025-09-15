import User from '../models/User.js';
import Transaction from '../models/Transaction.js';
import { sequelize } from '../config/database.js';
import { adminAuth } from '../utils/authMiddleware.js';

// Get all users with their transactions
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: { isAdmin: false, adminId: req.user.id },
      include: [{
        model: Transaction,
        as: 'transactions',
        attributes: ['id', 'type', 'amount', 'date', 'description'],
        order: [['date', 'DESC']]
      }],
      order: [['joinDate', 'DESC']]
    });

    const usersWithTotals = users.map(user => {
      const userData = user.toJSON();
      const totals = {
        totalGiven: user.totalGiven,
        totalReturned: user.totalReturned,
        moneyKeepingBalance: user.moneyKeepingBalance,
        lastUpdated: user.lastUpdated,
        isFullyReturned: user.moneyKeepingBalance === 0
      };
      
      return {
        ...userData,
        ...totals
      };
    });

    res.json({
      success: true,
      data: usersWithTotals,
      count: usersWithTotals.length
    });
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
  }
};

// Create a new user
const createUser = async (req, res) => {
  try {
    const { name, email, phone, address, notes } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Name is required'
      });
    }

    const user = await User.create({
      name,
      email,
      phone,
      address,
      notes,
      adminId: req.user.id,
      isAdmin: false,
      status: 'active'
    });

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: user
    });
  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
  }
};

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-admin-id');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Ensure database is connected
    await sequelize.authenticate();

    // Apply admin authentication middleware
    await new Promise((resolve, reject) => {
      adminAuth(req, res, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    if (req.method === 'GET') {
      await getAllUsers(req, res);
    } else if (req.method === 'POST') {
      await createUser(req, res);
    } else {
      res.status(405).json({ success: false, message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Handler error:', error);
    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
      });
    }
  }
}
