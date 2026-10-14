import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from 'lucide-react';
import bgImg from '../../assets/login-bg.jpg';
import { usePortal } from '../../context/PortalContext';
import { Toast } from '../../components/common/Toast/Toast';
import { FieldError } from '../../components/common/FieldError/FieldError';
import { validateEmail } from '../../utils/validation';
import './LoginPage.css';

// Stylized Brand Emblem Matching Uploaded Design
export const PortalBrandLogo = ({ color = '#1D72FE', textColor = '#0F172A', size = 36 }) => (
  <div className="portal-logo-container">
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className="portal-svg-logo">
      <defs>
        <linearGradient id={`pGrad-${color.replace('#', '')}`} x1="8" y1="8" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor={color === '#ffffff' ? '#ffffff' : '#2563EB'} />
          <stop offset="1" stopColor={color === '#ffffff' ? '#e2e8f0' : '#1D4ED8'} />
        </linearGradient>
      </defs>
      {/* Folder / Badge Base */}
      <rect x="8" y="10" width="25" height="29" rx="7" fill={`url(#pGrad-${color.replace('#', '')})`} />
      {/* Silhouette User */}
      <circle cx="20.5" cy="20.5" r="4.2" fill={color === '#ffffff' ? '#0F172A' : '#FFFFFF'} />
      <path
        d="M13.5 33C13.5 29.4 16.8 26.8 20.5 26.8C24.2 26.8 27.5 29.4 27.5 33"
        stroke={color === '#ffffff' ? '#0F172A' : '#FFFFFF'}
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      {/* Digital Floating Portal Pixels */}
      <rect x="35" y="8" width="5.5" height="5.5" rx="1.5" fill={color === '#ffffff' ? '#93C5FD' : '#3B82F6'} />
      <rect x="42" y="15" width="4.5" height="4.5" rx="1.2" fill={color === '#ffffff' ? '#BFDBFE' : '#60A5FA'} />
      <rect x="37" y="21" width="4" height="4" rx="1" fill={color === '#ffffff' ? '#60A5FA' : '#2563EB'} />
    </svg>
    <span
      className="portal-logo-text"
      style={{
        color: textColor,
        fontSize: `${size * 0.72}px`,
      }}
    >
      Portal
    </span>
  </div>
);

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = usePortal();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [toast, setToast] = useState(null);
  const [errors, setErrors] = useState({});

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    const emailErr = validateEmail(email, 'Email Address', true);
    if (emailErr) newErrors.email = emailErr;

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    // Simulate enterprise authentication
    setTimeout(() => {
      setIsLoading(false);
      if (login) {
        login(email, password);
      }
      showToast('Login Successfully! Redirecting...', 'success');
      setTimeout(() => {
        navigate('/');
      }, 700);
    }, 450);
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    showToast(`Password recovery link has been sent to ${email || 'your email'}.`, 'success');
  };

  const handleContactSupport = (e) => {
    e.preventDefault();
    showToast('Support ticket initiated: support@enterpriseportal.com', 'info');
  };

  return (
    <div className="login-page-container">
      {/* Architectural Illuminated Skyscraper Background Layer */}
      <div
        className="login-bg-layer"
        style={{ backgroundImage: `url(${bgImg})` }}
      />

      {/* Subtle Twilight Ambient Tint */}
      <div className="login-overlay-layer" />

      {/* Top Floating App Bar */}
      <header className="login-topbar">
        <div className="login-topbar-badges">
          <span>Secure</span>
          <span className="dot-sep">•</span>
          <span>Fast</span>
          <span className="dot-sep">•</span>
          <span>Enterprise</span>
        </div>
      </header>

      {/* Floating Animated Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          duration={3500}
          onClose={() => setToast(null)}
        />
      )}

      {/* Center Frosted Glassmorphism Login Card */}
      <main className="login-card-wrapper">
        <div className="login-card">
          {/* Card Header */}
          <div className="login-header">
            <h1 className="login-title">Sign In</h1>
            <p className="login-subtitle">
              Enter your credentials to access the enterprise portal
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="login-form" noValidate>
            {/* Field 1: Email Address */}
            <div className="login-field-group">
              <label className="login-field-label">User Name</label>
              <div
                className={`login-input-container ${
                  emailFocused ? 'focused' : ''
                } ${errors.email ? 'has-error' : ''}`}
              >
                <div className="login-input-icon">
                  <Mail size={17} strokeWidth={2.2} />
                </div>
                <input
                  type="email"
                  className="login-input"
                  placeholder="Enter Email Address"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: null }));
                  }}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => {
                    setEmailFocused(false);
                    const err = validateEmail(email, 'Email Address', false);
                    if (err) setErrors((prev) => ({ ...prev, email: err }));
                  }}
                  autoComplete="email"
                />
              </div>
              <FieldError error={errors.email} />
            </div>

            {/* Field 2: Password */}
            <div className="login-field-group">
              <div className="login-field-label-row">
                <label className="login-field-label">Password</label>
                <button
                  type="button"
                  className="login-forgot-btn"
                  onClick={handleForgotPassword}
                >
                  Forgot Password?
                </button>
              </div>
              <div
                className={`login-input-container ${
                  passwordFocused ? 'focused' : ''
                } ${errors.password ? 'has-error' : ''}`}
              >
                <div className="login-input-icon">
                  <Lock size={17} strokeWidth={2.2} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="login-input password-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors((prev) => ({ ...prev, password: null }));
                  }}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="login-toggle-pw-btn"
                  onClick={() => setShowPassword((prev) => !prev)}
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff size={17} strokeWidth={2.2} />
                  ) : (
                    <Eye size={17} strokeWidth={2.2} />
                  )}
                </button>
              </div>
              <FieldError error={errors.password} />
            </div>

            {/* Remember Me Option */}
            <div className="login-options-row">
              <label className="login-remember-label">
                <input
                  type="checkbox"
                  className="login-checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span className="login-checkbox-custom"></span>
                <span className="login-remember-text">Remember this device</span>
              </label>
            </div>

            {/* Sign In Submit Button */}
            <button
              type="submit"
              className="login-submit-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight size={18} strokeWidth={2.4} />
                </>
              )}
            </button>
          </form>

          {/* Thin Divider Line */}
          <div className="login-divider-line" />

          {/* Card Footer Help & Support */}
          <div className="login-card-footer">
            <span>Need help?</span>
            <button
              type="button"
              className="login-support-link"
              onClick={handleContactSupport}
            >
              Contact Support
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
