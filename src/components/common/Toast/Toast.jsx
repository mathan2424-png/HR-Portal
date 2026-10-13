import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  CheckCircle2,
  AlertCircle,
  Trash2,
  AlertTriangle,
  Info,
  X,
} from 'lucide-react';
import './Toast.css';

export const Toast = ({
  title,
  message,
  type = 'success', // 'success' | 'delete' | 'error' | 'info' | 'warning'
  duration = 4000,
  onClose,
}) => {
  const [progress, setProgress] = useState(100);
  const [isHovered, setIsHovered] = useState(false);
  const remainingTimeRef = useRef(duration);
  const lastTickTimeRef = useRef(Date.now());

  // Default badges based on notification type
  const defaultTitles = {
    success: 'Success',
    delete: 'Deleted',
    error: 'Error',
    warning: 'Warning',
    info: 'Information',
  };

  const displayTitle = title || defaultTitles[type] || 'Notification';

  // Reset timer whenever message or duration changes
  useEffect(() => {
    if (!message) return;
    remainingTimeRef.current = duration;
    lastTickTimeRef.current = Date.now();
    setProgress(100);
  }, [message, duration]);

  // Handle countdown: PAUSES when isHovered is true (cursor is on the toast)
  useEffect(() => {
    if (!message) return;

    const interval = setInterval(() => {
      // If cursor is on the toast, do not decrease timer or progress
      if (isHovered) {
        lastTickTimeRef.current = Date.now();
        return;
      }

      const now = Date.now();
      const delta = now - lastTickTimeRef.current;
      lastTickTimeRef.current = now;

      remainingTimeRef.current = Math.max(0, remainingTimeRef.current - delta);
      const remainingPercent = (remainingTimeRef.current / duration) * 100;
      setProgress(remainingPercent);

      if (remainingTimeRef.current <= 0) {
        clearInterval(interval);
        if (onClose) onClose();
      }
    }, 25);

    return () => clearInterval(interval);
  }, [message, isHovered, duration, onClose]);

  if (!message) return null;

  const renderIcon = () => {
    switch (type) {
      case 'delete':
        return <Trash2 size={16} strokeWidth={2.3} className="portal-toast-svg" />;
      case 'error':
        return <AlertCircle size={16} strokeWidth={2.3} className="portal-toast-svg" />;
      case 'warning':
        return <AlertTriangle size={16} strokeWidth={2.3} className="portal-toast-svg" />;
      case 'info':
        return <Info size={16} strokeWidth={2.3} className="portal-toast-svg" />;
      case 'success':
      default:
        return <CheckCircle2 size={16} strokeWidth={2.3} className="portal-toast-svg" />;
    }
  };

  const toastContent = (
    <div
      className={`portal-toast-container ${type}`}
      role="alert"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        lastTickTimeRef.current = Date.now();
        setIsHovered(false);
      }}
    >
      <div className={`portal-toast-card ${isHovered ? 'is-paused' : ''}`}>
        {/* Left vertical accent indicator */}
        <div className={`portal-toast-accent ${type}`} />

        {/* Soft tinted icon badge */}
        <div className={`portal-toast-icon-wrap ${type}`}>
          {renderIcon()}
        </div>

        {/* Text Content */}
        <div className="portal-toast-content">
          <div className="portal-toast-header-row">
            <span className={`portal-toast-title ${type}`}>{displayTitle}</span>
          </div>
          <p className="portal-toast-message">{message}</p>
        </div>

        {/* Close Button */}
        <button
          type="button"
          className="portal-toast-close"
          onClick={onClose}
          aria-label="Close notification"
          title="Close notification"
        >
          <X size={15} strokeWidth={2.2} />
        </button>

        {/* Animated Countdown Progress Bar at Bottom */}
        <div className={`portal-toast-progress-track ${type}`}>
          <div
            className={`portal-toast-progress-bar ${type}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined'
    ? createPortal(toastContent, document.body)
    : toastContent;
};
