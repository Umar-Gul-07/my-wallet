import api from './Axios.jsx';

// User API Services
export const userAPI = {
  // Login user
  login: async (loginData) => {
    const response = await api.post('/users/login', loginData);
    return response.data;
  },

  // Get all users
  getAllUsers: async () => {
    const response = await api.get('/users');
    return response.data;
  },

  // Get user by ID
  getUserById: async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  // Create new user
  createUser: async (userData) => {
    const response = await api.post('/users', userData);
    return response.data;
  },

  // Create admin user
  createAdmin: async (adminData) => {
    const response = await api.post('/users/admin', adminData);
    return response.data;
  },

  // Update user
  updateUser: async (id, userData) => {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  },

  // Delete user
  deleteUser: async (id) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },

  // Add transaction
  addTransaction: async (userId, transactionData) => {
    const response = await api.post(`/users/${userId}/transactions`, transactionData);
    return response.data;
  },

  // Get user transactions
  getUserTransactions: async (userId) => {
    const response = await api.get(`/users/${userId}/transactions`);
    return response.data;
  },

  // Get dashboard stats
  getDashboardStats: async () => {
    const response = await api.get('/users/dashboard/stats');
    return response.data;
  },

  // Create backup
  createBackup: async () => {
    const response = await api.post('/backup/create');
    return response.data;
  }
};

// Health check
export const healthCheck = async () => {
  const response = await api.get('/health');
  return response.data;
};

// Loan Person API
export const loanPersonAPI = {
  // Get all loan persons
  getAllLoanPersons: async () => {
    const response = await api.get('/loan-persons');
    return response.data;
  },
  // Create new loan person
  createLoanPerson: async (personData) => {
    const response = await api.post('/loan-persons', personData);
    return response.data;
  },
  // Get loan person by ID
  getLoanPersonById: async (id) => {
    const response = await api.get(`/loan-persons/${id}`);
    return response.data;
  },
  // Update loan person
  updateLoanPerson: async (id, personData) => {
    const response = await api.put(`/loan-persons/${id}`, personData);
    return response.data;
  },
  // Delete loan person
  deleteLoanPerson: async (id) => {
    const response = await api.delete(`/loan-persons/${id}`);
    return response.data;
  }
};

// Loan API (for loan persons)
export const loanAPI = {
  // Add loan transaction
  addLoan: async (loanPersonId, loanData) => {
    const response = await api.post(`/loan-persons/${loanPersonId}/loans`, loanData);
    return response.data;
  },
  // Get loans for a loan person
  getUserLoans: async (loanPersonId) => {
    const response = await api.get(`/loan-persons/${loanPersonId}/loans`);
    return response.data;
  }
}; 