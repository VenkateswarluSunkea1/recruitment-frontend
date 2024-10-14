// src/utils/axiosInstance.js

import axios from 'axios';

// Create a base Axios instance
const axiosInstance = axios.create({
  // baseURL: 'https://fa8b-2409-40f0-201d-a5aa-30df-2d3c-4b77-42d0.ngrok-free.app/api',
  baseURL:'http://34.131.163.216:8000/api',
  // baseURL:'http://127.0.0.1:8000/api',
  headers: {
    // 'ngrok-skip-browser-warning': '69420',
    'Accept': 'application/json',
  },
});

// Optionally, you can add interceptors to handle requests and responses globally
axiosInstance.interceptors.request.use(
  (config) => {
    // You can add auth tokens or other global settings before sending the request
    // config.headers.Authorization = `Bearer ${your_token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // You can add global response handling here
    return response;
  },
  (error) => {
    // Handle global errors (e.g., CORS errors, network issues)
    return Promise.reject(error);
  }
);

export default axiosInstance;
