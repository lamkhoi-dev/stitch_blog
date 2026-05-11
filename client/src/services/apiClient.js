import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Interceptor — auto-attach JWT token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('logiverse_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor cho Response
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data?.message || error.message);
    // Có thể thêm toast notification ở đây để báo lỗi global
    return Promise.reject(error);
  }
);

export default apiClient;
