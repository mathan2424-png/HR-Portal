import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronDown } from 'lucide-react';
import './UpdateStatusModal.css';

/**
 * UpdateStatusModal
 * A modern status update dialog matching the exact UI specification from the user.
 *
 * @param {boolean} isOpen - Whether modal is visible
 * @param {string} title - Heading (default: "Update Job Status")
 * @param {string} subtitle - Subtitle (e.g. "Change the status for {jobTitle}.")
 * @param {string} label - Field label (default: "Job Status")
 * @param {string} currentStatus - Current active status
 * @param {Array<{value: string, label: string}>} options - Dropdown choices
 * @param {string} confirmText - Button text (default: "Update Status")
 * @param {string} cancelText - Cancel button text (default: "Cancel")
 * @param {boolean} isLoading - Spinner state on confirm button
 * @param {function(newStatus)} onConfirm - Callback with selected status
 * @param {function} onCancel - Callback on close/cancel
 */
export const UpdateStatusModal = ({
  isOpen,
  title = 'Update Job Status',
  subtitle = '',
  label = 'Job Status',
  currentStatus = 'Active',
  options = [
    { value: 'Active', label: 'Active' },
    { value: 'Pending Approval', label: 'Pending' },
    { value: 'Draft', label: 'Draft' },
    { value: 'Paused', label: 'Paused' },
    { value: 'Closed', label: 'Closed' },
    { value: 'Filled', label: 'Filled' },
    { value: 'Expired', label: 'Expired' },
  ],
  confirmText = 'Update Status',
  cancelText = 'Cancel',
  isLoading = false,
  onConfirm,
  onCancel,
}) => {
  const [selectedStatus, setSelectedStatus] = useState(currentStatus || 'Active');

  useEffect(() => {
    if (isOpen) {
      // Normalize 'Pending' or 'Pending Approval' to match option values
      const initial =
        currentStatus === 'Pending' ? 'Pending Approval' : currentStatus || 'Active';
      setSelectedStatus(initial);
    }
  }, [isOpen, currentStatus]);

  // Handle ESC key press
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && !isLoading) {
        onCancel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isLoading, onCancel]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onConfirm && !isLoading) {
      onConfirm(selectedStatus);
    }
  };

  const modalContent = (
    <div
      className="update-status-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isLoading) {
          onCancel();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="update-status-title"
    >
      <div className="update-status-card animate-scale-in">
        {/* Header */}
        <div className="update-status-header">
          <div className="update-status-header-text">
            <h3 id="update-status-title" className="update-status-title">
              {title}
            </h3>
            {subtitle && <p className="update-status-subtitle">{subtitle}</p>}
          </div>
          <button
            type="button"
            className="update-status-close-btn"
            onClick={onCancel}
            disabled={isLoading}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="update-status-form">
          <div className="update-status-field-group">
            <label className="update-status-label">{label}</label>
            <div className="update-status-select-wrapper">
              <select
                className="update-status-select"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                disabled={isLoading}
                autoFocus
              >
                {options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown size={18} className="update-status-chevron" />
            </div>
          </div>

          {/* Action Buttons Row */}
          <div className="update-status-actions">
            <button
              type="button"
              className="btn-update-status-cancel"
              onClick={onCancel}
              disabled={isLoading}
            >
              {cancelText}
            </button>
            <button
              type="submit"
              className="btn-update-status-confirm"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="update-status-spinner" />
              ) : (
                confirmText
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return typeof document !== 'undefined'
    ? createPortal(modalContent, document.body)
    : modalContent;
};

export default UpdateStatusModal;
