import React, { useState } from 'react';
import { userAPI } from './apiService.js';

const DebugBackend = () => {
  const [testResults, setTestResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const addResult = (test, status, data, error = null) => {
    setTestResults(prev => [...prev, {
      test,
      status,
      data,
      error,
      timestamp: new Date().toISOString()
    }]);
  };

  const testBackend = async () => {
    setLoading(true);
    setTestResults([]);

    try {
      // Test 1: Health check
      addResult('Health Check', 'Testing...', null);
      try {
        const healthResponse = await userAPI.healthCheck();
        addResult('Health Check', 'SUCCESS', healthResponse);
      } catch (error) {
        addResult('Health Check', 'FAILED', null, error.message);
      }

      // Test 2: Admin registration
      addResult('Admin Registration', 'Testing...', null);
      try {
        const adminData = {
          name: `Test Admin ${Date.now()}`,
          email: `test${Date.now()}@example.com`,
          password: '123456'
        };
        const regResponse = await userAPI.createAdmin(adminData);
        addResult('Admin Registration', 'SUCCESS', regResponse);
      } catch (error) {
        addResult('Admin Registration', 'FAILED', null, error.message);
      }

      // Test 3: Login
      addResult('Login Test', 'Testing...', null);
      try {
        const loginData = {
          email: 'test@example.com',
          password: '123456'
        };
        const loginResponse = await userAPI.login(loginData);
        addResult('Login Test', 'SUCCESS', loginResponse);
      } catch (error) {
        addResult('Login Test', 'FAILED', null, error.message);
      }

    } catch (error) {
      addResult('Overall Test', 'FAILED', null, error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          <h4>Backend Connection Debug</h4>
          <button 
            className="btn btn-primary" 
            onClick={testBackend}
            disabled={loading}
          >
            {loading ? 'Testing...' : 'Test Backend Connection'}
          </button>
        </div>
        <div className="card-body">
          {testResults.map((result, index) => (
            <div key={index} className={`alert alert-${result.status === 'SUCCESS' ? 'success' : result.status === 'FAILED' ? 'danger' : 'info'}`}>
              <strong>{result.test}:</strong> {result.status}
              {result.error && (
                <div className="mt-2">
                  <strong>Error:</strong> {result.error}
                </div>
              )}
              {result.data && (
                <div className="mt-2">
                  <strong>Response:</strong>
                  <pre className="mt-1">{JSON.stringify(result.data, null, 2)}</pre>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DebugBackend; 