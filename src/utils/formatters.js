/**
 * Utility functions for HR Portal formatting
 */

export const formatDate = (dateString, options = {}) => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    ...options,
  });
};

export const formatCurrency = (amount, currency = 'INR') => {
  if (amount === undefined || amount === null) return '-';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const getInitials = (name = '') => {
  if (!name) return 'HR';
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};
