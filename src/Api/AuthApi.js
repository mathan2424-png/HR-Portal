// API service for Authentication
import { api } from './Api';

export const AuthApi = {
  /**
   * User / Admin Login
   * @param {string} username - User Name, Email, or Phone
   * @param {string} password - User Password
   */
  login: async (username, password) => {
    try {
      const response = await api.post('/login', {
        username: username.trim(),
        password: password.trim(),
      });
      return {
        ok: true,
        status: response.status,
        ...response.data,
      };
    } catch (err) {
      console.error('Login error:', err);
      const res = err.response;
      return {
        ok: false,
        status: res?.status || 500,
        success: false,
        message: res?.data?.message || 'Login failed. Please check credentials or network connection.',
        ...res?.data,
      };
    }
  },

  /**
   * Fetch Authenticated User Profile
   */
  getProfile: async () => {
    try {
      const response = await api.get('/profile');
      return {
        ok: true,
        status: response.status,
        ...response.data,
      };
    } catch (err) {
      console.error('Get profile error:', err);
      const res = err.response;
      return {
        ok: false,
        status: res?.status || 500,
        success: false,
        message: res?.data?.message || 'Failed to fetch profile',
      };
    }
  },

  /**
   * Logout User
   */
  logout: async () => {
    try {
      await api.post('/logout');
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      localStorage.removeItem('userToken');
      localStorage.removeItem('hr_portal_token');
      localStorage.removeItem('hr_portal_authenticated');
      localStorage.removeItem('hr_portal_user');
      localStorage.removeItem('isLoggedIn');
    }
  },
};

export default AuthApi;
