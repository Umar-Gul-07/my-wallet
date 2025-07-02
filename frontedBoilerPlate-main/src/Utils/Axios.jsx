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

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
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
