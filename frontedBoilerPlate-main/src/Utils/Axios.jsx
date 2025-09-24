import axios from 'axios';

// Resolve API base URL from env or global override; fallback to relative /api
const ENV_BASE_URL =
  process.env.REACT_APP_API_BASE_URL ||
  (typeof window !== 'undefined' && window.__API_BASE_URL__) ||
  '/api';

// Create a new Axios instance
const api = axios.create({
  baseURL: ENV_BASE_URL,
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

    if (process.env.NODE_ENV !== 'production') {
      // Log only in development
      // eslint-disable-next-line no-console
      console.log(`🚀 Request: [${config.method?.toUpperCase()}] ${config.baseURL}${config.url}`);
    }
    return config;
  },
  (error) => {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.error('❌ Request Error:', error);
    }
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.log(`✅ Response: [${response.status}] ${response.config.url}`);
    }
    return response;
  },
  (error) => {
    if (process.env.NODE_ENV !== 'production') {
      const errData = error.response?.data || error.message;
      // eslint-disable-next-line no-console
      console.error('❌ Response Error:', errData);
    }
    return Promise.reject(error);
  }
);

export default api;
