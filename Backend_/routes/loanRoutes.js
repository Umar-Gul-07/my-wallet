import express from 'express';
import { body } from 'express-validator';
import {
  addLoan,
  getUserLoans,
  getAllLoans
} from '../controllers/loanController.js';

const router = express.Router();

// Validation middleware
const loanValidation = [
  body('type').isIn(['given', 'repaid']).withMessage('Type must be given or repaid'),
  body('amount').isFloat({ min: 0.01 }).withMessage('Amount must be a positive number'),
  body('description').optional().isString().withMessage('Description must be a string')
];

// Loan routes
router.post('/:userId/loans', loanValidation, addLoan);
router.get('/:userId/loans', getUserLoans);
router.get('/', getAllLoans);

export default router; 