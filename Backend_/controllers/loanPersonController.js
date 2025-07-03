import LoanPerson from '../models/LoanPerson.js';
import Loan from '../models/Loan.js';
import { validationResult } from 'express-validator';

// Get all loan persons
export const getAllLoanPersons = async (req, res) => {
  try {
    const loanPersons = await LoanPerson.findAll({
      where: { adminId: req.user.id },
      include: [
        {
          model: Loan,
          as: 'loans',
          attributes: ['id', 'type', 'amount', 'date', 'description'],
          order: [['date', 'DESC']]
        }
      ],
      order: [['name', 'ASC']]
    });

    // Ensure totals are calculated for each loan person
    const loanPersonsWithTotals = loanPersons.map(person => {
      const personData = person.toJSON();
      const totals = {
        totalLoanGiven: person.totalLoanGiven,
        totalLoanRepaid: person.totalLoanRepaid,
        loanBalance: person.loanBalance,
        lastUpdated: person.lastUpdated,
        isFullyRepaid: person.loanBalance === 0
      };
      
      return {
        ...personData,
        ...totals
      };
    });

    res.json({
      success: true,
      data: loanPersonsWithTotals
    });
  } catch (error) {
    console.error('Error fetching loan persons:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching loan persons',
      error: error.message
    });
  }
};

// Create new loan person
export const createLoanPerson = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const { name, email, phone, notes } = req.body;

    const loanPerson = await LoanPerson.create({
      name,
      email,
      phone,
      notes,
      status: 'active',
      joinDate: new Date(),
      adminId: req.user.id
    });

    res.status(201).json({
      success: true,
      message: 'Loan person created successfully',
      data: loanPerson
    });
  } catch (error) {
    console.error('Error creating loan person:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating loan person',
      error: error.message
    });
  }
};

// Get loan person by ID
export const getLoanPersonById = async (req, res) => {
  try {
    const { id } = req.params;
    const loanPerson = await LoanPerson.findByPk(id, {
      include: [
        {
          model: Loan,
          as: 'loans',
          attributes: ['id', 'type', 'amount', 'date', 'description'],
          order: [['date', 'DESC']]
        }
      ]
    });

    if (!loanPerson) {
      return res.status(404).json({
        success: false,
        message: 'Loan person not found'
      });
    }

    // Ensure totals are calculated
    const personData = loanPerson.toJSON();
    const personWithTotals = {
      ...personData,
      totalLoanGiven: loanPerson.totalLoanGiven,
      totalLoanRepaid: loanPerson.totalLoanRepaid,
      loanBalance: loanPerson.loanBalance,
      lastUpdated: loanPerson.lastUpdated,
      isFullyRepaid: loanPerson.loanBalance === 0
    };

    res.json({
      success: true,
      data: personWithTotals
    });
  } catch (error) {
    console.error('Error fetching loan person:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching loan person',
      error: error.message
    });
  }
};

// Update loan person
export const updateLoanPerson = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, notes, status } = req.body;

    const loanPerson = await LoanPerson.findByPk(id);
    if (!loanPerson) {
      return res.status(404).json({
        success: false,
        message: 'Loan person not found'
      });
    }

    await loanPerson.update({
      name,
      email,
      phone,
      notes,
      status
    });

    res.json({
      success: true,
      message: 'Loan person updated successfully',
      data: loanPerson
    });
  } catch (error) {
    console.error('Error updating loan person:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating loan person',
      error: error.message
    });
  }
};

// Delete loan person
export const deleteLoanPerson = async (req, res) => {
  try {
    const { id } = req.params;
    const loanPerson = await LoanPerson.findByPk(id);
    
    if (!loanPerson) {
      return res.status(404).json({
        success: false,
        message: 'Loan person not found'
      });
    }

    await loanPerson.destroy();

    res.json({
      success: true,
      message: 'Loan person deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting loan person:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting loan person',
      error: error.message
    });
  }
};
