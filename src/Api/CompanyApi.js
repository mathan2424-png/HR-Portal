// API service for Company Details & Branch Management Module
import { api } from './Api';

export const CompanyApi = {
  /**
   * Fetch paginated companies list with search and filters
   * @param {Object} params - { page, limit, search, status, industry }
   */
  getCompanies: async (params = {}) => {
    try {
      const cleanParams = {};
      if (params.page) cleanParams.page = params.page;
      if (params.limit) cleanParams.limit = params.limit;
      const searchVal = params.search !== undefined ? params.search : params.searchTerm;
      if (searchVal !== undefined && searchVal !== null && searchVal !== '') cleanParams.search = searchVal;
      if (params.status && params.status !== 'ALL') cleanParams.status = params.status;
      if (params.industry && params.industry !== 'ALL') cleanParams.industry = params.industry;

      const response = await api.get('/company', { params: cleanParams });
      return response.data;
    } catch (err) {
      console.error('Failed to fetch companies:', err);
      return err.response?.data || { success: false, message: 'Network / server error' };
    }
  },

  /**
   * Fetch single company by ID
   */
  getCompanyById: async (id) => {
    try {
      const response = await api.get(`/company/${id}`);
      return response.data;
    } catch (err) {
      console.error('Failed to get company:', err);
      return err.response?.data || { success: false, message: 'Network / server error' };
    }
  },

  /**
   * Update company details (Permitted fields only; GST & Company Name are Super Admin controlled)
   */
  updateCompany: async (id, companyData) => {
    try {
      const response = await api.put(`/company/${id}`, companyData);
      return response.data;
    } catch (err) {
      console.error('Failed to update company:', err);
      return err.response?.data || { success: false, message: 'Network / server error' };
    }
  },

  /**
   * Toggle company status (Active / Suspended / Blocked)
   */
  toggleStatus: async (id, status) => {
    try {
      const response = await api.patch(`/company/${id}/status`, { status });
      return response.data;
    } catch (err) {
      console.error('Failed to toggle company status:', err);
      return err.response?.data || { success: false, message: 'Network / server error' };
    }
  },

  /**
   * Delete company (soft delete)
   */
  deleteCompany: async (id) => {
    try {
      const response = await api.delete(`/company/${id}`);
      return response.data;
    } catch (err) {
      console.error('Failed to delete company:', err);
      return err.response?.data || { success: false, message: 'Network / server error' };
    }
  },

  /**
   * Upload Company Logo
   */
  uploadLogo: async (file) => {
    try {
      const formData = new FormData();
      formData.append('logo', file);
      const response = await api.post('/company/upload-logo', formData);
      return response.data;
    } catch (err) {
      console.error('Failed to upload logo:', err);
      return err.response?.data || { success: false, message: 'Network / server error' };
    }
  },

  // ═════════════════════════════════════════════════════════
  // BRANCH MANAGEMENT APIS
  // ═════════════════════════════════════════════════════════

  /**
   * Fetch branches for a specific company
   * @param {string} companyId - e.g. "CMP-1001"
   * @param {Object} params - { search, status }
   */
  getBranches: async (companyId, params = {}) => {
    try {
      const response = await api.get(`/company/${companyId}/branches`, { params });
      return response.data;
    } catch (err) {
      console.error('Failed to fetch branches:', err);
      return err.response?.data || { success: false, message: 'Network / server error' };
    }
  },

  /**
   * Create a new branch under parent company
   * @param {string} companyId - e.g. "CMP-1001"
   * @param {Object} branchData - { branchName, branchCode, contactPerson, email, mobile, address, city, state, pincode, industry, employeeSize, status }
   */
  createBranch: async (companyId, branchData) => {
    try {
      const response = await api.post(`/company/${companyId}/branches`, branchData);
      return response.data;
    } catch (err) {
      console.error('Failed to create branch:', err);
      return err.response?.data || { success: false, message: 'Network / server error' };
    }
  },

  /**
   * Update an existing branch
   * @param {string} companyId - e.g. "CMP-1001"
   * @param {string} branchId - Mongo _id of the branch
   * @param {Object} branchData - updated fields
   */
  updateBranch: async (companyId, branchId, branchData) => {
    try {
      const response = await api.put(`/company/${companyId}/branches/${branchId}`, branchData);
      return response.data;
    } catch (err) {
      console.error('Failed to update branch:', err);
      return err.response?.data || { success: false, message: 'Network / server error' };
    }
  },

  /**
   * Delete a branch (soft delete)
   * @param {string} companyId - e.g. "CMP-1001"
   * @param {string} branchId - Mongo _id of the branch
   */
  deleteBranch: async (companyId, branchId) => {
    try {
      const response = await api.delete(`/company/${companyId}/branches/${branchId}`);
      return response.data;
    } catch (err) {
      console.error('Failed to delete branch:', err);
      return err.response?.data || { success: false, message: 'Network / server error' };
    }
  },
};

export default CompanyApi;
