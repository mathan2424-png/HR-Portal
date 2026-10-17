import { api } from './Api';

export const UsersRolesApi = {
  // ─── ROLES APIS ──────────────────────────────────────────
  /**
   * Fetch all roles (for dropdowns and role management)
   */
  getRoles: async () => {
    try {
      const response = await api.get('/roles');
      return response.data;
    } catch (err) {
      console.error('Failed to fetch roles:', err);
      return err.response?.data || { success: false, message: 'Network / server error' };
    }
  },

  /**
   * Fetch single role by ID
   */
  getRoleById: async (id) => {
    try {
      const response = await api.get(`/roles/${id}`);
      return response.data;
    } catch (err) {
      console.error('Failed to get role details:', err);
      return err.response?.data || { success: false, message: 'Network / server error' };
    }
  },

  /**
   * Create a new role
   */
  createRole: async (roleData) => {
    try {
      const response = await api.post('/roles', roleData);
      return response.data;
    } catch (err) {
      console.error('Failed to create role:', err);
      return err.response?.data || { success: false, message: 'Network / server error' };
    }
  },

  /**
   * Update role permissions
   */
  updateRole: async (id, roleData) => {
    try {
      const response = await api.put(`/roles/${id}`, roleData);
      return response.data;
    } catch (err) {
      console.error('Failed to update role:', err);
      return err.response?.data || { success: false, message: 'Network / server error' };
    }
  },

  /**
   * Delete role
   */
  deleteRole: async (id) => {
    try {
      const response = await api.delete(`/roles/${id}`);
      return response.data;
    } catch (err) {
      console.error('Failed to delete role:', err);
      return err.response?.data || { success: false, message: 'Network / server error' };
    }
  },

  // ─── USERS APIS ──────────────────────────────────────────
  /**
   * Fetch users list with optional search and filters
   * @param {Object} params - { search, role, status }
   */
  getUsers: async (params = {}) => {
    try {
      const response = await api.get('/users', { params });
      return response.data;
    } catch (err) {
      console.error('Failed to fetch users:', err);
      return err.response?.data || { success: false, message: 'Network / server error' };
    }
  },    

  /**
   * Fetch single user by ID
   */
  getUserById: async (id) => {
    try {
      const response = await api.get(`/users/${id}`);
      return response.data;
    } catch (err) {
      console.error('Failed to get user:', err);
      return err.response?.data || { success: false, message: 'Network / server error' };
    }
  },

  /**
   * Create new company user
   */
  createUser: async (userData) => {
    try {
      const response = await api.post('/users', userData);
      return response.data;
    } catch (err) {
      console.error('Failed to create user:', err);
      return err.response?.data || { success: false, message: 'Network / server error' };
    }
  },

  /**
   * Update user details
   */
  updateUser: async (id, userData) => {
    try {
      const response = await api.put(`/users/${id}`, userData);
      return response.data;
    } catch (err) {
      console.error('Failed to update user:', err);
      return err.response?.data || { success: false, message: 'Network / server error' };
    }
  },

  /**
   * Delete user (soft delete)
   */
  deleteUser: async (id) => {
    try {
      const response = await api.delete(`/users/${id}`);
      return response.data;
    } catch (err) {
      console.error('Failed to delete user:', err);
      return err.response?.data || { success: false, message: 'Network / server error' };
    }
  },
};

export default UsersRolesApi;
