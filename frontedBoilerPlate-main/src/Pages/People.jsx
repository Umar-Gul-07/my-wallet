import React, { useState, useEffect } from 'react';
import { userAPI } from '../Utils/apiService.js';

const People = () => {
    const [people, setPeople] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showAddForm, setShowAddForm] = useState(false);
    const [showTransactionForm, setShowTransactionForm] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [transactions, setTransactions] = useState([]);
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        notes: ''
    });
    
    const [transactionData, setTransactionData] = useState({
        type: 'given',
        amount: '',
        description: ''
    });

    useEffect(() => {
        fetchPeople();
    }, []);

    const fetchPeople = async () => {
        try {
            setLoading(true);
            const response = await userAPI.getAllUsers();
            if (response.success) {
                setPeople(response.data);
            }
        } catch (err) {
            setError('Failed to fetch people: ' + (err.response?.data?.message || err.message));
        } finally {
            setLoading(false);
        }
    };

    const fetchTransactions = async (userId) => {
        try {
            const response = await userAPI.getUserTransactions(userId);
            if (response.success) {
                setTransactions(response.data.transactions || []);
            }
        } catch (err) {
            console.error('Failed to fetch transactions:', err);
        }
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleTransactionInputChange = (e) => {
        setTransactionData({
            ...transactionData,
            [e.target.name]: e.target.value
        });
    };

    const handleAddPerson = async (e) => {
        e.preventDefault();
        try {
            const response = await userAPI.createUser(formData);
            if (response.success) {
                setShowAddForm(false);
                setFormData({ name: '', email: '', phone: '', address: '', notes: '' });
                fetchPeople();
            }
        } catch (err) {
            setError('Failed to add person: ' + (err.response?.data?.message || err.message));
        }
    };

    const handleAddTransaction = async (e) => {
        e.preventDefault();
        if (!selectedPerson) return;

        try {
            const response = await userAPI.addTransaction(selectedPerson.id, transactionData);
            if (response.success) {
                setShowTransactionForm(false);
                setTransactionData({ type: 'given', amount: '', description: '' });
                fetchPeople(); // Refresh to update balances
                fetchTransactions(selectedPerson.id); // Refresh transactions
            }
        } catch (err) {
            setError('Failed to add transaction: ' + (err.response?.data?.message || err.message));
            console.error('Transaction error:', err);
        }
    };

    const openTransactionForm = (person) => {
        setSelectedPerson(person);
        setShowTransactionForm(true);
        fetchTransactions(person.id);
    };

    const handleDeletePerson = async () => {
        if (!selectedPerson) return;

        try {
            const response = await userAPI.deleteUser(selectedPerson.id);
            if (response.success) {
                setShowDeleteConfirm(false);
                setSelectedPerson(null);
                fetchPeople(); // Refresh the list
            }
        } catch (err) {
            setError('Failed to delete person: ' + (err.response?.data?.message || err.message));
        }
    };

    const openDeleteConfirm = (person) => {
        setSelectedPerson(person);
        setShowDeleteConfirm(true);
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

    const getBalanceDisplay = (balance, isFullyReturned) => {
        if (isFullyReturned) {
            return (
                <div className="d-flex align-items-center justify-content-center">
                    <span className="text-success me-2">{formatCurrency(balance)}</span>
                    <span className="badge bg-success">
                        <i className="fi fi-bs-check me-1"></i>
                        Fully Returned
                    </span>
                </div>
            );
        }
        return (
            <span className={balance >= 0 ? 'text-success' : 'text-danger'}>
                {formatCurrency(balance)}
            </span>
        );
    };

    if (loading) {
        return <div>Loading...</div>;
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
                                        <h3>People Management</h3>
                                        <p className="mb-2">Track people&apos;s money with you</p>
                                    </div>
                                </div>
                                <div className="col-auto">
                                    <button 
                                        className="btn btn-primary"
                                        onClick={() => setShowAddForm(true)}
                                    >
                                        <i className="fi fi-rr-plus"></i> Add Person
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
                    {people.map(person => (
                        <div key={person.id} className="col-xl-4 col-lg-6 col-md-6 mb-4">
                            <div className="card position-relative">
                                {person.isFullyReturned && (
                                    <button 
                                        className="btn btn-sm position-absolute top-0 end-0 m-2"
                                        style={{ zIndex: 10 }}
                                        onClick={() => openDeleteConfirm(person)}
                                        title="Delete person (only available when fully returned)"
                                    >
                                        <i className="fi fi-rr-cross text-danger"></i>
                                    </button>
                                )}
                                <div className="card-body">
                                    <h5 className="card-title">{person.name}</h5>
                                    
                                    <div className="money-info mb-3">
                                        <div className="row text-center">
                                            <div className="col-6">
                                                <h6 className="text-success mb-1">
                                                    {formatCurrency(person.totalGiven)}
                                                </h6>
                                                <small className="text-muted">Money Given to Me</small>
                                            </div>
                                            <div className="col-6">
                                                <h6 className="text-danger mb-1">
                                                    {formatCurrency(person.totalReturned)}
                                                </h6>
                                                <small className="text-muted">Money I Returned</small>
                                            </div>
                                        </div>
                                        <div className="row text-center mt-2">
                                            <div className="col-12">
                                                {getBalanceDisplay(person.moneyKeepingBalance, person.isFullyReturned)}
                                                <small className="text-muted d-block mt-1">Current Balance</small>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="person-details mb-3">
                                        <p className="card-text mb-1">
                                            <strong>Phone:</strong> {person.phone || 'Not provided'}
                                        </p>

                                        {person.notes && (
                                            <p className="card-text mb-1">
                                                <strong>Notes:</strong> {person.notes}
                                            </p>
                                        )}
                                        <p className="card-text mb-1">
                                            <strong>Last Updated:</strong> {formatDate(person.lastUpdated)}
                                        </p>
                                    </div>

                                    <div className="d-flex justify-content-between">
                                        <button 
                                            className="btn btn-outline-primary btn-sm"
                                            onClick={() => openTransactionForm(person)}
                                        >
                                            Add Transaction
                                        </button>
                                        <button 
                                            className="btn btn-outline-info btn-sm"
                                            onClick={() => openTransactionForm(person)}
                                        >
                                            View History
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Add Person Modal */}
                {showAddForm && (
                    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Add New Person</h5>
                                    <button 
                                        type="button" 
                                        className="btn-close"
                                        onClick={() => setShowAddForm(false)}
                                    ></button>
                                </div>
                                <form onSubmit={handleAddPerson}>
                                    <div className="modal-body">
                                        <div className="mb-3">
                                            <label className="form-label">Name *</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Email</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Phone</label>
                                            <input
                                                type="tel"
                                                className="form-control"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Address</label>
                                            <textarea
                                                className="form-control"
                                                name="address"
                                                value={formData.address}
                                                onChange={handleInputChange}
                                                rows="2"
                                            ></textarea>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Notes</label>
                                            <textarea
                                                className="form-control"
                                                name="notes"
                                                value={formData.notes}
                                                onChange={handleInputChange}
                                                rows="2"
                                            ></textarea>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button 
                                            type="button" 
                                            className="btn btn-secondary"
                                            onClick={() => setShowAddForm(false)}
                                        >
                                            Cancel
                                        </button>
                                        <button type="submit" className="btn btn-primary">
                                            Add Person
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}

                {/* Transaction Modal */}
                {showTransactionForm && selectedPerson && (
                    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">
                                        Money Transaction - {selectedPerson.name}
                                    </h5>
                                    <button 
                                        type="button" 
                                        className="btn-close"
                                        onClick={() => setShowTransactionForm(false)}
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <form onSubmit={handleAddTransaction}>
                                                <div className="mb-3">
                                                    <label className="form-label">Transaction Type *</label>
                                                    <select
                                                        className="form-select"
                                                        name="type"
                                                        value={transactionData.type}
                                                        onChange={handleTransactionInputChange}
                                                        required
                                                    >
                                                        <option value="given">Person Gave Me Money (to keep)</option>
                                                        <option value="returned">I Returned Money to Person</option>
                                                    </select>
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label">Amount *</label>
                                                    <input
                                                        type="number"
                                                        step="0.01"
                                                        className="form-control"
                                                        name="amount"
                                                        value={transactionData.amount}
                                                        onChange={handleTransactionInputChange}
                                                        required
                                                        max={transactionData.type === 'returned' ? selectedPerson.moneyKeepingBalance : undefined}
                                                    />
                                                    {transactionData.type === 'returned' && (
                                                        <div className="form-text text-info">
                                                            <i className="fi fi-rr-info me-1"></i>
                                                            Maximum amount you can return: {formatCurrency(selectedPerson.moneyKeepingBalance)}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label">Description/Notes</label>
                                                    <textarea
                                                        className="form-control"
                                                        name="description"
                                                        value={transactionData.description}
                                                        onChange={handleTransactionInputChange}
                                                        rows="2"
                                                        placeholder="e.g., Monthly savings, Emergency fund, etc."
                                                    ></textarea>
                                                </div>
                                                <button type="submit" className="btn btn-primary">
                                                    Add Transaction
                                                </button>
                                            </form>
                                        </div>
                                        <div className="col-md-6">
                                            <h6>Transaction History</h6>
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
                                                        {transactions.map(transaction => (
                                                            <tr key={transaction.id}>
                                                                <td>{formatDate(transaction.date)}</td>
                                                                <td>
                                                                    <span className={`badge ${transaction.type === 'given' ? 'bg-success' : 'bg-danger'}`}>
                                                                        {transaction.type === 'given' ? 'Given' : 'Returned'}
                                                                    </span>
                                                                </td>
                                                                <td>{formatCurrency(transaction.amount)}</td>
                                                                <td>{transaction.description || '-'}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button 
                                        type="button" 
                                        className="btn btn-secondary"
                                        onClick={() => setShowTransactionForm(false)}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Delete Confirmation Modal */}
                {showDeleteConfirm && selectedPerson && (
                    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title text-danger">
                                        <i className="fi fi-rr-trash me-2"></i>
                                        Delete Person
                                    </h5>
                                    <button 
                                        type="button" 
                                        className="btn-close"
                                        onClick={() => setShowDeleteConfirm(false)}
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    <div className="alert alert-warning">
                                        <i className="fi fi-rr-exclamation me-2"></i>
                                        <strong>Warning:</strong> This action cannot be undone.
                                    </div>
                                    <p>
                                        Are you sure you want to delete <strong>{selectedPerson.name}</strong>?
                                    </p>
                                    <p className="text-muted">
                                        This person has been fully returned (balance = 0) and all transaction history will be permanently deleted.
                                    </p>
                                    <div className="row text-center mt-3">
                                        <div className="col-4">
                                            <small className="text-muted">Total Given</small>
                                            <div className="text-success">{formatCurrency(selectedPerson.totalGiven)}</div>
                                        </div>
                                        <div className="col-4">
                                            <small className="text-muted">Total Returned</small>
                                            <div className="text-danger">{formatCurrency(selectedPerson.totalReturned)}</div>
                                        </div>
                                        <div className="col-4">
                                            <small className="text-muted">Current Balance</small>
                                            <div className="text-info">{formatCurrency(selectedPerson.moneyKeepingBalance)}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button 
                                        type="button" 
                                        className="btn btn-secondary"
                                        onClick={() => setShowDeleteConfirm(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="button" 
                                        className="btn btn-danger"
                                        onClick={handleDeletePerson}
                                    >
                                        <i className="fi fi-rr-trash me-1"></i>
                                        Delete Permanently
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default People; 