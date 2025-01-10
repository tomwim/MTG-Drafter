import axios from 'axios';

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_SCRYFALL_API_URL, // Base API URL
  timeout: 5000, // Request timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor if needed
httpClient.interceptors.request.use(
  (config) => {
    // Add token or modify config
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor if needed
httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally
    console.error('API error:', error.response || error.message);
    return Promise.reject(error);
  }
);

export default httpClient;
