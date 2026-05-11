import { create } from 'zustand';
import api from '../lib/api';

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('logiverse_user') || 'null'),
  token: localStorage.getItem('logiverse_token') || null,
  isAuthenticated: !!localStorage.getItem('logiverse_token'),
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('logiverse_token', data.token);
      localStorage.setItem('logiverse_user', JSON.stringify(data.user));
      set({ user: data.user, token: data.token, isAuthenticated: true, loading: false });
      return true;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Lỗi đăng nhập', loading: false });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem('logiverse_token');
    localStorage.removeItem('logiverse_user');
    set({ user: null, token: null, isAuthenticated: false });
  },
}));

export default useAuthStore;
