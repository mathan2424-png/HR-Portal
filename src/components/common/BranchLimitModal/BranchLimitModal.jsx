import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AlertTriangle, Zap, ArrowRight, X, Building2 } from 'lucide-react';
import './BranchLimitModal.css';

/**
 * BranchLimitModal
 * Modern, high-converting warning modal displayed when an admin clicks the "Add Branch" button
 * after reaching their subscription tier's maximum branch quota.
 *
 * @param {boolean} isOpen - Whether the warning modal is visible
 * @param {string} planName - Current subscription plan (e.g. "Enterprise Pro (Annual)")
 * @param {number} currentCount - Current count of active branches
 * @param {number} maxBranches - Maximum allowed branches for the current plan
 * @param {string} companyName - Target parent company name
 * @param {function} onClose - Callback to close modal
 * @param {function} onUpgrade - Callback to navigate to /subscription
 */
export const BranchLimitModal = ({
  isOpen,
  planName = 'Current Plan',
  currentCount = 1,
  maxBranches = 1,
  companyName = 'Main Company',
  onClose,
  onUpgrade,
}) => {
  // ESC key listener to close modal
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modalContent = (
    <div
      className="branch-limit-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="branch-limit-title"
    >
      <div className="branch-limit-card animate-scale-in">
        {/* Top-Right Dismiss Button */}
        <button
          type="button"
          className="branch-limit-close-btn"
          onClick={onClose}
          aria-label="Close branch limit dialog"
        >
          <X size={18} />
        </button>

        {/* Warning Icon with Glowing Warm Amber Halo */}
        <div className="branch-limit-icon-wrapper">
          <AlertTriangle size={28} className="branch-limit-icon" />
        </div>

        {/* Plan & Status Badges */}
        <div className="branch-limit-badges-row">
          <span className="branch-limit-plan-tag">{planName}</span>
          <span className="branch-limit-status-tag">Branch Quota Reached</span>
        </div>

        {/* Modal Title */}
        <h3 id="branch-limit-title" className="branch-limit-title">
          Branch Limit Reached
        </h3>

        {/* Modal Description */}
        <p className="branch-limit-message">
          You have reached the maximum allowed branch locations for your current{' '}
          <strong>{planName}</strong> subscription plan.
        </p>

        {/* Quota Usage Progress Box */}
        <div className="branch-limit-usage-box">
          <div className="usage-box-header">
            <span className="usage-box-label">
              <Building2 size={14} style={{ color: '#d97706' }} />
              <span>Current Branch Quota</span>
            </span>
            <span className="usage-box-percent">100% Quota Used</span>
          </div>

          <div className="usage-progress-track">
            <div className="usage-progress-bar" style={{ width: '100%' }} />
          </div>

          <div className="usage-box-footer">
            <span>
              <strong>{currentCount}</strong> of <strong>{maxBranches}</strong> branches registered
            </span>
            <span className="usage-remaining-tag">0 slots remaining</span>
          </div>
        </div>

        {/* Higher Tier Upgrade Pitch */}
        <div className="branch-limit-tier-pitch">
          <div className="tier-pitch-heading">Upgrade options to create more branches:</div>
          <div className="tier-pitch-list">
            <div className="tier-pitch-item">
              <div className="tier-pitch-info">
                <span className="tier-pitch-name">Enterprise Elite (Annual)</span>
                <span className="tier-pitch-cap">Up to 15 Branches • 25 Recruiter Seats</span>
              </div>
              <span className="tier-pitch-badge">15 Branches</span>
            </div>

            <div className="tier-pitch-item highlight">
              <div className="tier-pitch-info">
                <span className="tier-pitch-name">Enterprise Global Ultimate</span>
                <span className="tier-pitch-cap">Unlimited Branches • 50 Recruiter Seats</span>
              </div>
              <span className="tier-pitch-badge ultimate">Unlimited</span>
            </div>
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="branch-limit-actions">
          <button
            type="button"
            className="btn-branch-limit-cancel"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            type="button"
            className="btn-branch-limit-upgrade"
            onClick={() => {
              onClose();
              if (onUpgrade) onUpgrade();
            }}
          >
            <Zap size={16} />
            <span>Upgrade Subscription Plan</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined'
    ? createPortal(modalContent, document.body)
    : modalContent;
};

export default BranchLimitModal;
