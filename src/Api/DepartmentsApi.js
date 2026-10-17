import { api } from './Api';

export const DepartmentsApi = {
  /**
   * Fetch all departments with optional search, status filter, and pagination
   * @param {Object} params - { search, status, page, limit }
   */
  getDepartments: async (params = {}) => {
    try {
      const response = await api.get('/departments', { params });
      return response.data;
    } catch (err) {
      console.error('Failed to fetch departments:', err);
      return err.response?.data || { success: false, message: 'Network / server error' };
    }
  },

  /**
   * Fetch next auto-generated department ID (e.g. DEP-109)
   */
  getNextDepartmentId: async () => {
    try {
      const response = await api.get('/departments/next-id');
      return response.data;
    } catch (err) {
      console.error('Failed to get next department ID:', err);
      return err.response?.data || { success: false, message: 'Network / server error' };
    }
  },

  /**
   * Fetch single department by ID
   */
  getDepartmentById: async (id) => {
    try {
      const response = await api.get(`/departments/${id}`);
      return response.data;
    } catch (err) {
      console.error('Failed to get department:', err);
      return err.response?.data || { success: false, message: 'Network / server error' };
    }
  },

  /**
   * Create new department
   */
  createDepartment: async (deptData) => {
    try {
      const response = await api.post('/departments', deptData);
      return response.data;
    } catch (err) {
      console.error('Failed to create department:', err);
      return err.response?.data || { success: false, message: 'Network / server error' };
    }
  },

  /**
   * Update department
   */
  updateDepartment: async (id, deptData) => {
    try {
      const response = await api.put(`/departments/${id}`, deptData);
      return response.data;
    } catch (err) {
      console.error('Failed to update department:', err);
      return err.response?.data || { success: false, message: 'Network / server error' };
    }
  },

  /**
   * Toggle department active/inactive status
   */
  toggleDepartmentStatus: async (id) => {
    try {
      const response = await api.patch(`/departments/${id}/toggle-status`);
      return response.data;
    } catch (err) {
      console.error('Failed to toggle department status:', err);
      return err.response?.data || { success: false, message: 'Network / server error' };
    }
  },

  /**
   * Delete department (soft delete)
   */
  deleteDepartment: async (id) => {
    try {
      const response = await api.delete(`/departments/${id}`);
      return response.data;
    } catch (err) {
      console.error('Failed to delete department:', err);
      return err.response?.data || { success: false, message: 'Network / server error' };
    }
  },
};

export default DepartmentsApi;
