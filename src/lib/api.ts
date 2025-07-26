import axios from 'axios';

import { API_URL } from '@/constants';

// Create axios instance with base URL and default config
export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor (optional)
api.interceptors.request.use(
  config => {
    // You can add auth tokens, logging, etc. here
    console.log(
      `Making ${config.method?.toUpperCase()} request to ${config.url}`
    );
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Response interceptor (optional)
api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // Handle global errors here
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);
