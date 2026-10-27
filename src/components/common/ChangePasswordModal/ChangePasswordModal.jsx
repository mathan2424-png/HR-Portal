import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { KeyRound, Eye, EyeOff, X, Lock } from 'lucide-react';
import { FieldError } from '../FieldError/FieldError';
import './ChangePasswordModal.css';

/**
 * ChangePasswordModal
 * Reusable modal dialog for Changing / Editing password of a Branch, Company, or User.
 *
 * @param {boolean} isOpen - Whether modal is open
 * @param {string} targetTitle - Label or Name of the target (e.g. "Tambaram Branch", "Ocean Software")
 * @param {string} targetType - Type of target: "Branch" | "Company" | "User"
 * @param {boolean} isLoading - Spinner state when submitting
 * @param {function} onClose - Modal close handler
 * @param {function} onSubmit - Callback ({ newPassword, confirmPassword }) => Promise<void>
 */
export const ChangePasswordModal = ({
  isOpen,
  targetTitle = '',
  targetType = 'Account',
  isLoading = false,
  onClose,
  onSubmit,
}) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  // Reset form when modal opens or closes
  useEffect(() => {
    if (isOpen) {
      setNewPassword('');
      setConfirmPassword('');
      setShowNewPassword(false);
      setShowConfirmPassword(false);
      setErrors({});
    }
  }, [isOpen]);

  // Handle ESC key press
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && !isLoading) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isLoading, onClose]);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!newPassword.trim()) {
      errs.newPassword = 'New password is required.';
    } else if (newPassword.length < 6) {
      errs.newPassword = 'Password must be at least 6 characters.';
    }

    if (!confirmPassword.trim()) {
      errs.confirmPassword = 'Confirm password is required.';
    } else if (newPassword && confirmPassword !== newPassword) {
      errs.confirmPassword = 'Passwords do not match.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (onSubmit) {
      onSubmit({ newPassword, confirmPassword });
    }
  };

  const handleBlurField = (fieldName) => {
    setErrors((prev) => {
      const updated = { ...prev };
      if (fieldName === 'newPassword') {
        if (!newPassword.trim()) {
          updated.newPassword = 'New password is required.';
        } else if (newPassword.length < 6) {
          updated.newPassword = 'Password must be at least 6 characters.';
        } else {
          delete updated.newPassword;
        }
        if (confirmPassword && confirmPassword !== newPassword) {
          updated.confirmPassword = 'Passwords do not match.';
        }
      } else if (fieldName === 'confirmPassword') {
        if (!confirmPassword.trim()) {
          updated.confirmPassword = 'Confirm password is required.';
        } else if (newPassword && confirmPassword !== newPassword) {
          updated.confirmPassword = 'Passwords do not match.';
        } else {
          delete updated.confirmPassword;
        }
      }
      return updated;
    });
  };

  const modalContent = (
    <div
      className="change-password-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isLoading) {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="change-password-title"
    >
      <div className="change-password-card animate-scale-in">
        {/* Close Button */}
        <button
          type="button"
          className="change-password-close-btn"
          onClick={onClose}
          disabled={isLoading}
          title="Close dialog"
        >
          <X size={18} />
        </button>

        {/* Header Icon */}
        <div className="change-password-icon-wrapper">
          <KeyRound size={24} className="change-password-icon" />
        </div>

        {/* Modal Title */}
        <h3 id="change-password-title" className="change-password-title">
          Change Password
        </h3>

        {/* Modal Description */}
        <p className="change-password-message">
          Set a new administrator password for{' '}
          <strong className="change-password-target">{targetTitle || targetType}</strong>.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="change-password-form">
          {/* New Password Field */}
          <div className="change-password-field-group">
            <label className="change-password-label">
              New Password <span className="required-star">*</span>
            </label>
            <div className="change-password-input-wrapper">
              <input
                type={showNewPassword ? 'text' : 'password'}
                placeholder="Enter new password (min 6 chars)"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  if (errors.newPassword) {
                    setErrors((prev) => ({ ...prev, newPassword: null }));
                  }
                }}
                onBlur={() => handleBlurField('newPassword')}
                className={`change-password-input ${errors.newPassword ? 'has-error' : ''}`}
                disabled={isLoading}
                autoFocus
              />
              <button
                type="button"
                className="change-password-eye-btn"
                onClick={() => setShowNewPassword((p) => !p)}
                tabIndex={-1}
                title={showNewPassword ? 'Hide password' : 'Show password'}
              >
                {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <FieldError error={errors.newPassword} />
          </div>

          {/* Confirm Password Field */}
          <div className="change-password-field-group">
            <label className="change-password-label">
              Confirm Password <span className="required-star">*</span>
            </label>
            <div className="change-password-input-wrapper">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Re-enter new password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (errors.confirmPassword) {
                    setErrors((prev) => ({ ...prev, confirmPassword: null }));
                  }
                }}
                onBlur={() => handleBlurField('confirmPassword')}
                className={`change-password-input ${errors.confirmPassword ? 'has-error' : ''}`}
                disabled={isLoading}
              />
              <button
                type="button"
                className="change-password-eye-btn"
                onClick={() => setShowConfirmPassword((p) => !p)}
                tabIndex={-1}
                title={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
              >
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <FieldError error={errors.confirmPassword} />
          </div>

          {/* Action Buttons Row */}
          <div className="change-password-actions">
            <button
              type="button"
              className="btn-password-cancel"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn-password-submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="change-password-spinner" />
                  <span>Updating...</span>
                </>
              ) : (
                <>
                  <Lock size={15} />
                  <span>Update Password</span>
                </>
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

export default ChangePasswordModal;
