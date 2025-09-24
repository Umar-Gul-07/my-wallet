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

    // Intentionally no console logs to keep browser console clean
    return config;
  },
  (error) => {
    // No console logs
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // No console logs
    return response;
  },
  (error) => {
    // No console logs
    return Promise.reject(error);
  }
);

export default api;
