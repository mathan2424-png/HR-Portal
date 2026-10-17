import { api } from './Api';

export const JobsApi = {
  /**
   * Fetch all jobs with optional search, status filter, department filter, and pagination
   * @param {Object} params - { search, status, department, page, limit }
   */
  getJobs: async (params = {}) => {
    try {
      const response = await api.get('/jobs', { params });
      return response.data;
    } catch (err) {
      console.error('Failed to fetch jobs:', err);
      return err.response?.data || { success: false, message: 'Network / server error' };
    }
  },

  /**
   * Fetch next auto-generated job ID (e.g. JOB-2026-007)
   */
  getNextJobId: async () => {
    try {
      const response = await api.get('/jobs/next-id');
      return response.data;
    } catch (err) {
      console.error('Failed to get next job ID:', err);
      return err.response?.data || { success: false, message: 'Network / server error' };
    }
  },

  /**
   * Fetch single job by ID or jobId
   */
  getJobById: async (id) => {
    try {
      const response = await api.get(`/jobs/${id}`);
      return response.data;
    } catch (err) {
      console.error('Failed to get job:', err);
      return err.response?.data || { success: false, message: 'Network / server error' };
    }
  },

  /**
   * Create new job requirement
   */
  createJob: async (jobData) => {
    try {
      const response = await api.post('/jobs', jobData);
      return response.data;
    } catch (err) {
      console.error('Failed to create job:', err);
      return err.response?.data || { success: false, message: 'Network / server error' };
    }
  },

  /**
   * Update existing job requirement
   */
  updateJob: async (id, jobData) => {
    try {
      const response = await api.put(`/jobs/${id}`, jobData);
      return response.data;
    } catch (err) {
      console.error('Failed to update job:', err);
      return err.response?.data || { success: false, message: 'Network / server error' };
    }
  },

  /**
   * Update job status (Active, Draft, Pending Approval, Paused, Closed)
   */
  updateJobStatus: async (id, status) => {
    try {
      const response = await api.patch(`/jobs/${id}/status`, { status });
      return response.data;
    } catch (err) {
      console.error('Failed to update job status:', err);
      return err.response?.data || { success: false, message: 'Network / server error' };
    }
  },

  /**
   * Delete job (soft delete)
   */
  deleteJob: async (id) => {
    try {
      const response = await api.delete(`/jobs/${id}`);
      return response.data;
    } catch (err) {
      console.error('Failed to delete job:', err);
      return err.response?.data || { success: false, message: 'Network / server error' };
    }
  },
};

export default JobsApi;
