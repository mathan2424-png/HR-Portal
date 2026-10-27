import { api } from './Api';

export const SubscriptionApi = {
  /**
   * Fetch all subscription records with optional search, status filter, and pagination
   * @param {Object} params - { search, status, page, limit }
   */
  getSubscriptions: async (params = {}) => {
    try {
      const response = await api.get('/subscriptions', { params });
      return response.data;
    } catch (err) {
      console.error('Failed to fetch subscriptions:', err);
      return err.response?.data || { success: false, message: 'Failed to fetch subscriptions' };
    }
  },

  /**
   * Fetch the current active subscription details for the company
   */
  getCurrentSubscription: async () => {
    try {
      const response = await api.get('/subscriptions/current');
      return response.data;
    } catch (err) {
      console.error('Failed to get current subscription:', err);
      return err.response?.data || { success: false, message: 'Failed to get current subscription' };
    }
  },

  /**
   * Fetch a single subscription record by ID (e.g. SUB-101 or MongoDB _id)
   * @param {string} id
   */
  getSubscriptionById: async (id) => {
    try {
      const response = await api.get(`/subscriptions/${id}`);
      return response.data;
    } catch (err) {
      console.error('Failed to get subscription details:', err);
      return err.response?.data || { success: false, message: 'Failed to fetch subscription' };
    }
  },

  /**
   * Upgrade subscription plan to a higher enterprise tier
   * @param {Object} upgradeData - { subscriptionId, tierName, paymentMethod, proratedCredit }
   */
  upgradePlan: async (upgradeData) => {
    try {
      const response = await api.post('/subscriptions/upgrade', upgradeData);
      return response.data;
    } catch (err) {
      console.error('Failed to upgrade plan:', err);
      return err.response?.data || { success: false, message: 'Failed to upgrade subscription plan' };
    }
  },

  /**
   * Renew current subscription plan for the next billing cycle (e.g. +1 Year)
   * @param {Object} renewalData - { subscriptionId, paymentMethod, billingAddress, gstNumber }
   */
  renewPlan: async (renewalData) => {
    try {
      const response = await api.post('/subscriptions/renew', renewalData);
      return response.data;
    } catch (err) {
      console.error('Failed to renew plan:', err);
      return err.response?.data || { success: false, message: 'Failed to renew subscription' };
    }
  },

  /**
   * Toggle auto-renewal status for a subscription
   * @param {string} id - Subscription ID (e.g. SUB-101 or MongoDB _id)
   */
  toggleAutoRenewal: async (id) => {
    try {
      const response = await api.patch(`/subscriptions/${id}/auto-renewal`);
      return response.data;
    } catch (err) {
      console.error('Failed to toggle auto renewal:', err);
      return err.response?.data || { success: false, message: 'Failed to toggle auto renewal' };
    }
  },

  /**
   * Fetch all past billing invoices
   */
  getInvoices: async () => {
    try {
      const response = await api.get('/subscriptions/invoices');
      return response.data;
    } catch (err) {
      console.error('Failed to fetch invoices:', err);
      return err.response?.data || { success: false, message: 'Failed to fetch invoices' };
    }
  },

  /**
   * Fetch all available plans in real-time for subscription selection
   */
  getAvailablePlans: async () => {
    try {
      const response = await api.get('/subscriptions/plans');
      return response.data;
    } catch (err) {
      console.error('Failed to fetch available plans:', err);
      return err.response?.data || { success: false, message: 'Failed to fetch plans' };
    }
  },

  /**
   * Activate or select initial plan for newly registered company
   * @param {Object} planData - { planId, planName, companyId }
   */
  chooseInitialPlan: async (planData) => {
    try {
      const response = await api.post('/subscriptions/choose-plan', planData);
      return response.data;
    } catch (err) {
      console.error('Failed to activate plan:', err);
      return err.response?.data || { success: false, message: 'Failed to activate plan' };
    }
  },
};

export default SubscriptionApi;
