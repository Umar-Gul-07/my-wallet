import express from 'express';
import { body } from 'express-validator';
import {
  getAllUsers,
  getUserById,
  createUser,
  createAdmin,
  updateUser,
  deleteUser,
  addTransaction,
  getUserTransactions,
  getDashboardStats,
  loginUser
} from '../controllers/userController.js';

const router = express.Router();

// Validation middleware
const userValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').optional().isEmail().withMessage('Valid email is required if provided'),
  body('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long if provided'),
  body('phone').optional().isMobilePhone().withMessage('Valid phone number is required if provided'),
  body('address').optional().isString().withMessage('Address must be a string'),
  body('notes').optional().isString().withMessage('Notes must be a string')
];

const adminValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

const loginValidation = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required')
];

const transactionValidation = [
  body('type').isIn(['given', 'returned']).withMessage('Type must be given or returned'),
  body('amount').isFloat({ min: 0.01 }).withMessage('Amount must be a positive number'),
  body('description').optional().isString().withMessage('Description must be a string')
];

// Dashboard routes
router.get('/dashboard/stats', getDashboardStats);

// Auth routes
router.post('/login', loginValidation, loginUser);
router.post('/admin', adminValidation, createAdmin);

// User routes
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', userValidation, createUser);
router.put('/:id', userValidation, updateUser);
router.delete('/:id', deleteUser);

// Transaction routes
router.post('/:userId/transactions', transactionValidation, addTransaction);
router.get('/:userId/transactions', getUserTransactions);

export default router; 