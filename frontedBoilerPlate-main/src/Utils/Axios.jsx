import axios from 'axios';

// const authToken = 'your_auth_token'; 

// Create a new instance of Axios
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Updated to match backend port
  timeout: 10000, // Increased timeout for better reliability
  headers: {
    'Content-Type': 'application/json',
    // 'Authorization': `Bearer ${authToken}`,
  },
});

// Request interceptor for logging and adminId header
api.interceptors.request.use(
  (config) => {
    // Add x-admin-id header for all requests except login/admin registration
    if (
      !config.url.includes('/users/login') &&
      !config.url.includes('/users/admin')
    ) {
      const userInfo = JSON.parse(localStorage.getItem('UserInfo'));
      if (userInfo && userInfo.id) {
        config.headers['x-admin-id'] = userInfo.id;
      }
    }
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('❌ Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
