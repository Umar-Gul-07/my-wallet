import express from 'express';
import { body } from 'express-validator';
import {
  getAllLoanPersons,
  createLoanPerson,
  getLoanPersonById,
  updateLoanPerson,
  deleteLoanPerson
} from '../controllers/loanPersonController.js';
import { addLoan, getUserLoans } from '../controllers/loanController.js';

const router = express.Router();

// Validation middleware
const loanPersonValidation = [
  body('name').isLength({ min: 2 }).withMessage('Name is required'),
  body('email').optional().isEmail().withMessage('Invalid email'),
  body('phone').optional().isString(),
  body('notes').optional().isString()
];

// Loan person routes
router.get('/', getAllLoanPersons);
router.post('/', loanPersonValidation, createLoanPerson);
router.get('/:id', getLoanPersonById);
router.put('/:id', loanPersonValidation, updateLoanPerson);
router.delete('/:id', deleteLoanPerson);

// Loan routes for a loan person
router.post('/:loanPersonId/loans', addLoan);
router.get('/:loanPersonId/loans', getUserLoans);

export default router; 