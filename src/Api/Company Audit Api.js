// API service for Company Audit Log Module
import { api } from './Api';

export const CompanyAuditApi = {
  /**
   * Fetch paginated audit logs with search and module/action filters
   * @param {Object} params - { page, limit, search, module, action }
   */
  getAuditLogs: async (params = {}) => {
    try {
      const cleanParams = {};
      if (params.page) cleanParams.page = params.page;
      if (params.limit) cleanParams.limit = params.limit;
      const searchVal = params.search !== undefined ? params.search : params.searchQuery;
      if (searchVal !== undefined && searchVal !== null && searchVal !== '') {
        cleanParams.search = searchVal;
      }
      if (params.module && params.module !== 'All' && params.module !== 'ALL') {
        cleanParams.module = params.module;
      }
      if (params.action && params.action !== 'All' && params.action !== 'ALL') {
        cleanParams.action = params.action;
      }

      const response = await api.get('/audit-logs', { params: cleanParams });
      return response.data;
    } catch (err) {
      console.error('Failed to fetch audit logs:', err);
      return err.response?.data || { success: false, message: 'Network / server error' };
    }
  },

  /**
   * Fetch next auto-incremented audit ID (e.g. AUD-2026-001)
   */
  getNextAuditId: async () => {
    try {
      const response = await api.get('/audit-logs/next-id');
      return response.data;
    } catch (err) {
      console.error('Failed to get next audit ID:', err);
      return err.response?.data || { success: false, message: 'Network / server error' };
    }
  },

  /**
   * Fetch dynamic modules, actions, and user filter metadata
   */
  getFilterOptions: async () => {
    try {
      const response = await api.get('/audit-logs/filters');
      return response.data;
    } catch (err) {
      console.error('Failed to fetch filter options:', err);
      return err.response?.data || { success: false, message: 'Network / server error' };
    }
  },

  /**
   * Fetch single audit record details by Mongo ID or auditId
   * @param {string} id - Mongo ID or AUD-2026-XXX
   */
  getAuditLogById: async (id) => {
    try {
      const response = await api.get(/audit-logs/);
      return response.data;
    } catch (err) {
      console.error('Failed to get audit log:', err);
      return err.response?.data || { success: false, message: 'Network / server error' };
    }
  },

  /**
   * Create a new manual audit log entry
   * @param {Object} logData - { auditId, user, module, action, affectedRecord, actionDate, reason }
   */
  createAuditLog: async (logData) => {
    try {
      const response = await api.post('/audit-logs', logData);
      return response.data;
    } catch (err) {
      console.error('Failed to create audit log entry:', err);
      return err.response?.data || { success: false, message: 'Network / server error' };
    }
  },

  /**
   * Export audit logs as CSV file download
   * @param {Object} params - optional search and filter params
   */
  exportCsv: async (params = {}) => {
    try {
      const response = await api.get('/audit-logs/export/csv', {
        params,
        responseType: 'blob',
      });
      return response.data;
    } catch (err) {
      console.error('Failed to export audit logs CSV:', err);
      return null;
    }
  },
};

export default CompanyAuditApi;
