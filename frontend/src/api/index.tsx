// src/api/index.ts
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
});

const isAuthPage = () => {
  const path = window.location.pathname;
  return path === '/login' || path === '/register';
};

api.interceptors.request.use((cfg) => {
  const token = localStorage.getItem('jwt');
  if (token) {
    cfg.headers.Authorization = `Bearer ${token}`;
  }
  return cfg;
});

api.interceptors.response.use(
  response => response,
  error => {
    if ((error.response?.status === 401 || error.response?.status === 403) && !isAuthPage()) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
