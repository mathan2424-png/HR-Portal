import { api } from './Api';

export const SupportApi = {
  /**
   * Fetch all support tickets with optional search, status/priority filters, and pagination
   * @param {Object} params - { search, status, priority, page, limit }
   */
  getTickets: async (params = {}) => {
    try {
      const response = await api.get('/support/tickets', { params });
      return response.data;
    } catch (err) {
      console.error('Failed to fetch support tickets:', err);
      return err.response?.data || { success: false, message: 'Failed to fetch tickets' };
    }
  },

  /**
   * Fetch next auto-generated Ticket ID (e.g. TKT-2026-1050)
   */
  getNextTicketId: async () => {
    try {
      const response = await api.get('/support/next-id');
      return response.data;
    } catch (err) {
      console.error('Failed to get next ticket ID:', err);
      return err.response?.data || { success: false, message: 'Failed to generate ticket ID' };
    }
  },

  /**
   * Fetch a single ticket by its MongoDB _id or business ticketId
   * @param {string} id
   */
  getTicketById: async (id) => {
    try {
      const response = await api.get(`/support/tickets/${id}`);
      return response.data;
    } catch (err) {
      console.error('Failed to get ticket details:', err);
      return err.response?.data || { success: false, message: 'Failed to fetch ticket' };
    }
  },

  /**
   * Create a new support ticket
   * @param {Object} ticketData
   */
  createTicket: async (ticketData) => {
    try {
      const response = await api.post('/support/tickets', ticketData);
      return response.data;
    } catch (err) {
      console.error('Failed to create ticket:', err);
      return err.response?.data || { success: false, message: 'Failed to create ticket' };
    }
  },

  /**
   * Post a reply message to an existing ticket conversation thread
   * @param {string} id
   * @param {Object} replyData - { message, attachment }
   */
  sendReply: async (id, replyData) => {
    try {
      const response = await api.post(`/support/tickets/${id}/reply`, replyData);
      return response.data;
    } catch (err) {
      console.error('Failed to send reply:', err);
      return err.response?.data || { success: false, message: 'Failed to post reply' };
    }
  },

  /**
   * Update ticket status (e.g., Reopen, Close)
   * @param {string} id
   * @param {string} status - 'Open' | 'In Progress' | 'Resolved' | 'Closed'
   * @param {string} notes
   */
  updateTicketStatus: async (id, status, notes = '') => {
    try {
      const response = await api.patch(`/support/tickets/${id}/status`, { status, notes });
      return response.data;
    } catch (err) {
      console.error('Failed to update ticket status:', err);
      return err.response?.data || { success: false, message: 'Failed to update ticket status' };
    }
  },
};

export default SupportApi;
