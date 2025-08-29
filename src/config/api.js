// API Configuration for different environments
const config = {
  development: {
    baseURL: 'http://127.0.0.1:5000',
    apiEndpoints: {
      predict: '/predict',
      locations: '/api/locations'
    }
  },
  production: {
    baseURL: '', // Leave empty for same-domain API calls
    apiEndpoints: {
      predict: '/api/predict',
      locations: '/api/locations'
    }
  }
};

// Get current environment
const isDevelopment = process.env.NODE_ENV === 'development';
const currentConfig = isDevelopment ? config.development : config.production;

export const API_BASE_URL = currentConfig.baseURL;
export const API_ENDPOINTS = currentConfig.apiEndpoints;

// Helper function to get full API URL
export const getApiUrl = (endpoint) => {
  return `${API_BASE_URL}${endpoint}`;
};

export default currentConfig;
