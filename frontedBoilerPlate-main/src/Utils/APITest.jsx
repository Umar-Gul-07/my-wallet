import React, { useState, useEffect } from 'react';
import { healthCheck, userAPI } from './apiService.js';

const APITest = () => {
    const [healthStatus, setHealthStatus] = useState(null);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const testHealthCheck = async () => {
        try {
            setLoading(true);
            const result = await healthCheck();
            setHealthStatus(result);
            setError('');
        } catch (err) {
            setError('Backend connection failed: ' + err.message);
            setHealthStatus(null);
        } finally {
            setLoading(false);
        }
    };

    const testGetUsers = async () => {
        try {
            setLoading(true);
            const result = await userAPI.getAllUsers();
            setUsers(result.data || []);
            setError('');
        } catch (err) {
            setError('Failed to fetch users: ' + err.message);
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        testHealthCheck();
    }, []);

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h5>Backend Health Check</h5>
                        </div>
                        <div className="card-body">
                            {loading ? (
                                <p>Testing connection...</p>
                            ) : healthStatus ? (
                                <div>
                                    <p className="text-success">✅ Backend is running!</p>
                                    <pre>{JSON.stringify(healthStatus, null, 2)}</pre>
                                </div>
                            ) : (
                                <p className="text-danger">❌ Backend connection failed</p>
                            )}
                            {error && <p className="text-danger">{error}</p>}
                            <button 
                                className="btn btn-primary" 
                                onClick={testHealthCheck}
                                disabled={loading}
                            >
                                Test Connection
                            </button>
                        </div>
                    </div>
                </div>
                
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h5>Users API Test</h5>
                        </div>
                        <div className="card-body">
                            {loading ? (
                                <p>Fetching users...</p>
                            ) : (
                                <div>
                                    <p>Found {users.length} users</p>
                                    {users.length > 0 && (
                                        <ul className="list-group">
                                            {users.map(user => (
                                                <li key={user.id} className="list-group-item">
                                                    {user.name} - {user.email}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            )}
                            <button 
                                className="btn btn-secondary" 
                                onClick={testGetUsers}
                                disabled={loading}
                            >
                                Fetch Users
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default APITest; 