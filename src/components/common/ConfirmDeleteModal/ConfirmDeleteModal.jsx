import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Trash2 } from 'lucide-react';
import './ConfirmDeleteModal.css';

/**
 * ConfirmDeleteModal
 * A modern, accessible confirmation dialog matching the design in the user screenshot.
 *
 * @param {boolean} isOpen - Whether the modal is visible
 * @param {string} title - Modal heading (default: "Confirm Delete")
 * @param {string} message - Main confirmation description
 * @param {string} itemName - Optional item name or label being deleted
 * @param {string} confirmText - Label for the delete action button (default: "Delete")
 * @param {string} cancelText - Label for the cancel button (default: "Cancel")
 * @param {boolean} isLoading - Shows spinner on delete button while deleting
 * @param {function} onConfirm - Callback when user clicks Delete
 * @param {function} onCancel - Callback when user clicks Cancel or closes
 */
export const ConfirmDeleteModal = ({
  isOpen,
  title = 'Confirm Delete',
  message,
  itemName = '',
  confirmText = 'Delete',
  cancelText = 'Cancel',
  isLoading = false,
  onConfirm,
  onCancel,
}) => {
  // Handle ESC key press to close
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

  const defaultDescription = itemName
    ? `Are you sure you want to delete "${itemName}"? This action cannot be undone.`
    : 'Are you sure you want to delete this item? This action cannot be undone.';

  const modalContent = (
    <div
      className="confirm-delete-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isLoading) {
          onCancel();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-delete-title"
    >
      <div className="confirm-delete-card animate-scale-in">
        {/* Soft Red Glowing Icon Badge */}
        <div className="confirm-delete-icon-wrapper">
          <Trash2 size={24} className="confirm-delete-icon" />
        </div>

        {/* Modal Title */}
        <h3 id="confirm-delete-title" className="confirm-delete-title">
          {title}
        </h3>

        {/* Modal Description */}
        <p className="confirm-delete-message">
          {message || defaultDescription}
        </p>

        {/* Action Buttons Row */}
        <div className="confirm-delete-actions">
          <button
            type="button"
            className="btn-confirm-cancel"
            onClick={onCancel}
            disabled={isLoading}
          >
            {cancelText}
          </button>

          <button
            type="button"
            className="btn-confirm-delete"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="confirm-delete-spinner" />
            ) : (
              confirmText
            )}
          </button>
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined'
    ? createPortal(modalContent, document.body)
    : modalContent;
};

export default ConfirmDeleteModal;
