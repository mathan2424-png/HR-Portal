import React from 'react';

export const Badge = ({ status = 'Active', variant }) => {
  const getBadgeClass = () => {
    if (variant) return `badge-${variant}`;
    const s = status.toLowerCase();
    if (['active', 'approved', 'present', 'completed', 'paid'].includes(s)) return 'badge-success';
    if (['pending', 'on leave', 'in review', 'late'].includes(s)) return 'badge-warning';
    if (['rejected', 'inactive', 'absent', 'terminated', 'cancelled'].includes(s)) return 'badge-danger';
    return 'badge-info';
  };

  return (
    <span className={`badge ${getBadgeClass()}`}>
      <span className="badge-dot" />
      {status}
    </span>
  );
};
