import axios from 'axios';

// Create a new Axios instance
const api = axios.create({
  baseURL: 'https://kaka-wallet-backend-production.up.railway.app/api', // ✅ Include `/api` here
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Attach x-admin-id from localStorage for protected routes
    if (
      !config.url.includes('/users/login') &&
      !config.url.includes('/users/admin')
    ) {
      const userInfo = JSON.parse(localStorage.getItem('UserInfo'));
      if (userInfo?.id) {
        config.headers['x-admin-id'] = userInfo.id;
      }
    }

    console.log(`🚀 Request: [${config.method?.toUpperCase()}] ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log(`✅ Response: [${response.status}] ${response.config.url}`);
    return response;
  },
  (error) => {
    const errData = error.response?.data || error.message;
    console.error('❌ Response Error:', errData);
    return Promise.reject(error);
  }
);

export default api;
