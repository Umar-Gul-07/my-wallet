import React, { useState, useEffect } from 'react';
import { userAPI } from '../Utils/apiService.js';
import { useAuth } from '../Utils/useAuth';

const Home = () => {
    const { UserInfo } = useAuth();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchDashboardStats();
    }, []);

    const fetchDashboardStats = async () => {
        try {
            setLoading(true);
            const response = await userAPI.getDashboardStats();
            if (response.success) {
                setStats(response.data);
            }
        } catch (err) {
            setError('Failed to fetch dashboard statistics');
            console.error(err);
        } finally {
            setLoading(false);
        }
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

    const getTransactionTypeLabel = (transaction) => {
        if (transaction.type === 'loan') {
            return transaction.transactionType === 'given' ? 'Loan Given' : 'Loan Repaid';
        } else {
            return transaction.transactionType === 'given' ? 'Gave to Me' : 'I Returned';
        }
    };

    const getTransactionTypeClass = (transaction) => {
        if (transaction.type === 'loan') {
            return transaction.transactionType === 'given' ? 'bg-warning' : 'bg-success';
        } else {
            return transaction.transactionType === 'given' ? 'bg-success' : 'bg-danger';
        }
    };

    const getBalanceDisplay = (balance, isFullyReturned, isFullyRepaid) => {
        if (isFullyReturned || isFullyRepaid) {
            return (
                <div className="d-flex align-items-center">
                    <span className="text-success me-2">{formatCurrency(balance)}</span>
                    <span className="badge bg-success">
                        <i className="fi fi-bs-check me-1"></i>
                        {isFullyReturned ? 'Fully Returned' : 'Fully Repaid'}
                    </span>
                </div>
            );
        }
        return <span className={balance >= 0 ? 'text-success' : 'text-danger'}>{formatCurrency(balance)}</span>;
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

    if (error) {
        return (
            <div className="content-body">
                <div className="container">
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            {/* Hero / Header */}
            <div
                className="py-4"
                style={{
                    background: 'linear-gradient(135deg, #111827 0%, #1f2937 50%, #0f766e 100%)',
                    color: '#fff'
                }}
            >
                <div className="container">
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                        <div>
                            <div className="d-flex align-items-center gap-3">
                                <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: 44, height: 44, background: 'rgba(255,255,255,0.1)' }}>
                                    <i className="fi fi-rr-dashboard" />
                                        </div>
                                <div>
                                    <h3 className="mb-1" style={{ fontWeight: 700 }}>Dashboard</h3>
                                    <div className="text-white-50">{`Welcome ${UserInfo && UserInfo.name ? UserInfo.name : ''}`}</div>
                                </div>
                            </div>
                        </div>
                        <div className="text-white-50">
                            <i className="fi fi-rr-home me-1" /> Home
                            <i className="fi fi-rr-angle-small-right mx-2" />
                            <span className="text-white">Overview</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
            <div className="content-body" style={{ minHeight: 1003, backgroundColor: '#f3f4f6' }}>
                <div className="container py-4">
                    {/* Overall Financial Summary */}
                    <div className="row g-4 mb-2">
                        <div className="col-12 col-lg-6">
                            <div className="card shadow-sm border-0 h-100">
                                <div className="card-body">
                                    <div className="d-flex align-items-center justify-content-between mb-2">
                                        <h6 className="text-muted mb-0">Total Net Balance</h6>
                                        <span className="badge bg-light text-dark">Money + Loans</span>
                                    </div>
                                    <h2 className={`mb-2 ${stats?.overallBalance >= 0 ? 'text-success' : 'text-danger'}`} style={{ fontWeight: 700 }}>
                                                    {formatCurrency(stats?.overallBalance || 0)}
                                    </h2>
                                    <div className="text-secondary small">
                                        <i className="fi fi-rr-arrow-trend-up me-1" /> Combined Money Keeping + Loans
                                            </div>
                                        </div>
                                            </div>
                                        </div>
                        <div className="col-12 col-lg-6">
                            <div className="card shadow-sm border-0 h-100">
                                <div className="card-body">
                                    <h6 className="text-muted mb-1">Monthly Activity</h6>
                                    <h2 className="mb-2" style={{ fontWeight: 700 }}>{stats?.totalMonthlyActivity || 0}</h2>
                                    <div className="text-secondary small">
                                        <i className="fi fi-rr-calendar me-1" /> Total Transactions This Month
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Money Keeping Statistics */}
                    <div className="row g-4 mb-2">
                        <div className="col-12">
                            <h5 className="mb-2">
                                <i className="fi fi-rr-users me-2"></i>
                                Money Keeping Statistics
                            </h5>
                        </div>
                        <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
                            <div className="card shadow-sm border-0 h-100 p-3">
                                <h6>Total People</h6>
                                <h3>{stats?.moneyKeeping?.totalPeople || 0}</h3>
                                <p>
                                    <span className="text-success">
                                        <i className="fi fi-rr-users" />
                                        Active: {stats?.moneyKeeping?.activeUsers || 0}
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
                            <div className="card shadow-sm border-0 h-100 p-3">
                                <h6>Money Keeping</h6>
                                <h3>{formatCurrency(stats?.moneyKeeping?.totalMoneyKept || 0)}</h3>
                                <p>
                                    <span className="text-success">
                                        <i className="fi fi-rr-arrow-trend-up" />
                                        Given: {formatCurrency(stats?.moneyKeeping?.totalGiven || 0)}
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
                            <div className="card shadow-sm border-0 h-100 p-3">
                                <h6>Returned</h6>
                                <h3>{formatCurrency(stats?.moneyKeeping?.totalReturned || 0)}</h3>
                                <p>
                                    <span className="text-info">
                                        <i className="fi fi-rr-arrow-trend-down" />
                                        Total Returned
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
                            <div className="card shadow-sm border-0 h-100 p-3">
                                <h6>Monthly Activity</h6>
                                <h3>{stats?.moneyKeeping?.monthlyTransactions || 0}</h3>
                                <p>
                                    <span className="text-info">
                                        <i className="fi fi-rr-calendar" />
                                        This Month
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Loan Statistics */}
                    <div className="row g-4 mb-2">
                        <div className="col-12">
                            <h5 className="mb-2">
                                <i className="fi fi-rr-credit-card me-2"></i>
                                Loan Statistics
                            </h5>
                        </div>
                        <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
                            <div className="card shadow-sm border-0 h-100 p-3">
                                <h6>Loan Persons</h6>
                                <h3>{stats?.loans?.totalLoanPersons || 0}</h3>
                                <p>
                                    <span className="text-success">
                                        <i className="fi fi-rr-users" />
                                        Active: {stats?.loans?.activeLoanPersons || 0}
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
                            <div className="card shadow-sm border-0 h-100 p-3">
                                <h6>Total Loans Given</h6>
                                <h3>{formatCurrency(stats?.loans?.totalLoanGiven || 0)}</h3>
                                <p>
                                    <span className="text-warning">
                                        <i className="fi fi-rr-arrow-trend-up" />
                                        Loans Given
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
                            <div className="card shadow-sm border-0 h-100 p-3">
                                <h6>Total Repaid</h6>
                                <h3>{formatCurrency(stats?.loans?.totalLoanRepaid || 0)}</h3>
                                <p>
                                    <span className="text-success">
                                        <i className="fi fi-rr-arrow-trend-down" />
                                        Loans Repaid
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
                            <div className="card shadow-sm border-0 h-100 p-3">
                                <h6>Loan Balance</h6>
                                <h3 className={stats?.loans?.totalLoanBalance >= 0 ? 'text-warning' : 'text-success'}>
                                    {formatCurrency(stats?.loans?.totalLoanBalance || 0)}
                                </h3>
                                <p>
                                    <span className="text-info">
                                        <i className="fi fi-rr-credit-card" />
                                        Outstanding Loans
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xxl-8 col-xl-8 col-lg-6">
                            <div className="card shadow-sm border-0">
                                <div className="card-header bg-white border-0">
                                    <h4 className="card-title mb-0">Recent Transactions</h4>
                                </div>
                                <div className="card-body pt-0">
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>Person</th>
                                                    <th>Type</th>
                                                    <th>Amount</th>
                                                    <th>Date</th>
                                                    <th>Category</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {stats?.recentTransactions?.map(transaction => (
                                                    <tr key={`${transaction.type}-${transaction.id}`}>
                                                        <td>
                                                            <div className="d-flex align-items-center">
                                                                <div className="avatar avatar-sm me-3">
                                                                    <div className="avatar-title rounded-circle bg-light">
                                                                        <i className={`fi ${transaction.type === 'loan' ? 'fi-rr-credit-card' : 'fi-rr-user'}`}></i>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <h6 className="mb-0">{transaction.user?.name || 'Unknown'}</h6>
                                                                    <small className="text-muted">{formatDate(transaction.date)}</small>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <span className={`badge ${getTransactionTypeClass(transaction)}`}>
                                                                {getTransactionTypeLabel(transaction)}
                                                            </span>
                                                        </td>
                                                        <td>{formatCurrency(transaction.amount)}</td>
                                                        <td>{transaction.description || '-'}</td>
                                                        <td>
                                                            <span className={`badge ${transaction.type === 'loan' ? 'bg-warning' : 'bg-primary'}`}>
                                                                {transaction.type === 'loan' ? 'Loan' : 'Money Keeping'}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xxl-4 col-xl-4 col-lg-6 col-md-12">
                            <div className="card shadow-sm border-0 h-100">
                                <div className="card-header bg-white border-0">
                                    <h4 className="card-title mb-0">Top Balances</h4>
                                </div>
                                <div className="card-body pt-0">
                                    <div className="list-1">
                                        {/* Top Money Keeping Balances */}
                                        <h6 className="mb-3 text-primary">
                                            <i className="fi fi-rr-users me-2"></i>
                                            Money Keeping
                                        </h6>
                                        {stats?.topUsersByBalance?.map((user) => (
                                            <div key={`money-${user.id}`} className="d-flex justify-content-between align-items-center mb-3">
                                                <div>
                                                    <h6 className="mb-0">{user.name}</h6>
                                                    <small className="text-muted">
                                                        Last updated: {user.lastUpdated ? 
                                                            new Date(user.lastUpdated).toLocaleDateString() : 'Never'}
                                                    </small>
                                                </div>
                                                <div className="text-end">
                                                    {getBalanceDisplay(user.currentBalance, user.isFullyReturned, false)}
                                                    <small className="text-muted">Balance</small>
                                                </div>
                                            </div>
                                        ))}

                                        <hr className="my-4" />

                                        {/* Top Loan Balances */}
                                        <h6 className="mb-3 text-warning">
                                            <i className="fi fi-rr-credit-card me-2"></i>
                                            Loans
                                        </h6>
                                        {stats?.topLoanPersonsByBalance?.map((person) => (
                                            <div key={`loan-${person.id}`} className="d-flex justify-content-between align-items-center mb-3">
                                                <div>
                                                    <h6 className="mb-0">{person.name}</h6>
                                                    <small className="text-muted">
                                                        Last updated: {person.lastUpdated ? 
                                                            new Date(person.lastUpdated).toLocaleDateString() : 'Never'}
                                                    </small>
                                                </div>
                                                <div className="text-end">
                                                    {getBalanceDisplay(person.currentBalance, false, person.isFullyRepaid)}
                                                    <small className="text-muted">Loan Balance</small>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
