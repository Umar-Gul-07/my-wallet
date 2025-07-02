import React, { useState, useEffect } from 'react';
import { loanPersonAPI, loanAPI } from '../Utils/apiService.js';

const Loans = () => {
  const [loanPeople, setLoanPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddPersonModal, setShowAddPersonModal] = useState(false);
  const [showLoanModal, setShowLoanModal] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [loans, setLoans] = useState([]);

  const [newPerson, setNewPerson] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  });

  const [loanData, setLoanData] = useState({
    type: 'given',
    amount: '',
    description: ''
  });

  useEffect(() => {
    fetchLoanPeople();
  }, []);

  const fetchLoanPeople = async () => {
    try {
      setLoading(true);
      const response = await loanPersonAPI.getAllLoanPersons();
      if (response.success) {
        setLoanPeople(response.data);
      }
    } catch (err) {
      setError('Failed to fetch loan people: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const fetchLoans = async (loanPersonId) => {
    try {
      const response = await loanAPI.getUserLoans(loanPersonId);
      if (response.success) {
        setLoans(response.data.loans || []);
      }
    } catch (err) {
      setLoans([]);
    }
  };

  const handleAddPerson = async (e) => {
    e.preventDefault();
    try {
      const response = await loanPersonAPI.createLoanPerson(newPerson);
      if (response.success) {
        setShowAddPersonModal(false);
        setNewPerson({ name: '', email: '', phone: '', notes: '' });
        fetchLoanPeople();
      }
    } catch (err) {
      setError('Failed to add loan person: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleAddLoan = async (e) => {
    e.preventDefault();
    if (!selectedPerson) return;
    try {
      const response = await loanAPI.addLoan(selectedPerson.id, loanData);
      if (response.success) {
        setShowLoanModal(false);
        setLoanData({ type: 'given', amount: '', description: '' });
        fetchLoanPeople();
        fetchLoans(selectedPerson.id);
      }
    } catch (err) {
      setError('Failed to add loan: ' + (err.response?.data?.message || err.message));
    }
  };

  const openLoanModal = (person) => {
    setSelectedPerson(person);
    setShowLoanModal(true);
    fetchLoans(person.id);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-QA', {
      style: 'currency',
      currency: 'QAR'
    }).format(amount || 0);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getBalanceDisplay = (balance, isFullyRepaid) => {
    if (isFullyRepaid) {
      return (
        <div className="d-flex align-items-center justify-content-center">
          <span className="text-success me-2">{formatCurrency(balance)}</span>
          <span className="badge bg-success">
            <i className="fi fi-bs-check me-1"></i>
            Fully Repaid
          </span>
        </div>
      );
    }
    return (
      <span className={balance >= 0 ? 'text-warning' : 'text-success'}>
        {formatCurrency(balance)}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="content-body">
        <div className="container">
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="content-body">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="page-title">
              <div className="row align-items-center justify-content-between">
                <div className="col-xl-4">
                  <div className="page-title-content">
                    <h3>Loan Management</h3>
                    <p className="mb-2">Track loans you give to people</p>
                  </div>
                </div>
                <div className="col-auto">
                  <button className="btn btn-primary" onClick={() => setShowAddPersonModal(true)}>
                    <i className="fi fi-rr-plus me-2"></i>
                    Add Loan Person
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <div className="row">
          {loanPeople.map(person => (
            <div key={person.id} className="col-xl-4 col-lg-6 col-md-6 mb-4">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <h5 className="card-title mb-0">{person.name}</h5>
                    <span className={`badge ${person.status === 'active' ? 'bg-success' : 'bg-secondary'}`}>
                      {person.status}
                    </span>
                  </div>
                  <div className="loan-stats mb-3">
                    <div className="row text-center">
                      <div className="col-4">
                        <h6 className="text-warning mb-1">{formatCurrency(person.totalLoanGiven)}</h6>
                        <small className="text-muted">Loans Given</small>
                      </div>
                      <div className="col-4">
                        <h6 className="text-info mb-1">{formatCurrency(person.totalLoanRepaid)}</h6>
                        <small className="text-muted">Loans Repaid</small>
                      </div>
                      <div className="col-4">
                        {getBalanceDisplay(person.loanBalance, person.isFullyRepaid)}
                        <small className="text-muted d-block mt-1">Outstanding</small>
                      </div>
                    </div>
                  </div>
                  <div className="person-info mb-3">
                    <p className="mb-1"><i className="fi fi-rr-envelope me-2"></i>{person.email || 'No email'}</p>
                    <p className="mb-1"><i className="fi fi-rr-phone-call me-2"></i>{person.phone || 'No phone'}</p>
                    {person.notes && <p className="mb-1"><i className="fi fi-rr-note me-2"></i>{person.notes}</p>}
                    <p className="mb-0 text-muted small"><i className="fi fi-rr-calendar me-2"></i>Last updated: {formatDate(person.lastUpdated)}</p>
                  </div>
                  <div className="d-flex gap-2">
                    <button className="btn btn-warning btn-sm flex-fill" onClick={() => openLoanModal(person)}>
                      <i className="fi fi-rr-plus me-1"></i>
                      Add/View Loan
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Loan Person Modal */}
        {showAddPersonModal && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add New Loan Person</h5>
                  <button type="button" className="btn-close" onClick={() => setShowAddPersonModal(false)}></button>
                </div>
                <form onSubmit={handleAddPerson}>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="form-label">Name *</label>
                      <input type="text" className="form-control" value={newPerson.name} onChange={e => setNewPerson({ ...newPerson, name: e.target.value })} required />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input type="email" className="form-control" value={newPerson.email} onChange={e => setNewPerson({ ...newPerson, email: e.target.value })} />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Phone</label>
                      <input type="tel" className="form-control" value={newPerson.phone} onChange={e => setNewPerson({ ...newPerson, phone: e.target.value })} />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Notes</label>
                      <textarea className="form-control" rows="3" value={newPerson.notes} onChange={e => setNewPerson({ ...newPerson, notes: e.target.value })}></textarea>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setShowAddPersonModal(false)}>Cancel</button>
                    <button type="submit" className="btn btn-primary">Add Loan Person</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Loan Modal */}
        {showLoanModal && selectedPerson && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Loan Transaction - {selectedPerson.name}</h5>
                  <button type="button" className="btn-close" onClick={() => setShowLoanModal(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-6">
                      <form onSubmit={handleAddLoan}>
                        <div className="mb-3">
                          <label className="form-label">Loan Type *</label>
                          <select className="form-select" name="type" value={loanData.type} onChange={e => setLoanData({ ...loanData, type: e.target.value })} required>
                            <option value="given">I Gave Loan to Person</option>
                            <option value="repaid">Person Repaid Loan to Me</option>
                          </select>
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Amount *</label>
                          <input 
                            type="number" 
                            step="0.01" 
                            className="form-control" 
                            name="amount" 
                            value={loanData.amount} 
                            onChange={e => setLoanData({ ...loanData, amount: e.target.value })} 
                            required 
                            max={loanData.type === 'repaid' ? selectedPerson.loanBalance : undefined}
                          />
                          {loanData.type === 'repaid' && (
                            <div className="form-text text-info">
                              <i className="fi fi-rr-info me-1"></i>
                              Maximum amount that can be repaid: {formatCurrency(selectedPerson.loanBalance)}
                            </div>
                          )}
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Description/Notes</label>
                          <textarea className="form-control" name="description" value={loanData.description} onChange={e => setLoanData({ ...loanData, description: e.target.value })} rows="3" placeholder="e.g., Emergency loan, Business loan, etc."></textarea>
                        </div>
                        <button type="submit" className="btn btn-warning">
                          <i className="fi fi-rr-plus me-2"></i>
                          Add Loan Transaction
                        </button>
                      </form>
                    </div>
                    <div className="col-md-6">
                      <h6>Loan History</h6>
                      <div className="table-responsive">
                        <table className="table table-sm">
                          <thead>
                            <tr>
                              <th>Date</th>
                              <th>Type</th>
                              <th>Amount</th>
                              <th>Description</th>
                            </tr>
                          </thead>
                          <tbody>
                            {loans.map(loan => (
                              <tr key={loan.id}>
                                <td>{formatDate(loan.date)}</td>
                                <td>
                                  <span className={`badge ${loan.type === 'given' ? 'bg-warning' : 'bg-info'}`}>
                                    {loan.type === 'given' ? 'Given' : 'Repaid'}
                                  </span>
                                </td>
                                <td>{formatCurrency(loan.amount)}</td>
                                <td>{loan.description || '-'}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowLoanModal(false)}>Close</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Loans; 