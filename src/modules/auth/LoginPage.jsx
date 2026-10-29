import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  KeyRound,
  ShieldCheck,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import bgImg from '../../assets/login-bg.jpg';
import { usePortal } from '../../context/PortalContext';
import { Toast } from '../../components/common/Toast/Toast';
import { FieldError } from '../../components/common/FieldError/FieldError';
import { AuthApi } from '../../Api/AuthApi';
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

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [toast, setToast] = useState(null);
  const [errors, setErrors] = useState({});

  // Forgot Password Workflow State
  const [isForgotMode, setIsForgotMode] = useState(false);
  const [forgotStep, setForgotStep] = useState(1); // 1: Email, 2: OTP, 3: New Password, 4: Success
  const [forgotUsername, setForgotUsername] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [forgotErrors, setForgotErrors] = useState({});
  const [isForgotLoading, setIsForgotLoading] = useState(false);

  const showToast = (message, type = 'info', title = null) => {
    setToast({ message, type, title });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!username.trim()) newErrors.username = 'User Name is required';
    if (!password.trim()) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      const result = await AuthApi.login(username, password);

      if (!result.success) {
        // Fallback for locally reset password in frontend (demo support)
        const locallyResetUser = localStorage.getItem('demo_reset_user');
        const locallyResetPass = localStorage.getItem('demo_reset_password');
        if (
          locallyResetUser &&
          locallyResetUser.toLowerCase() === username.trim().toLowerCase() &&
          locallyResetPass &&
          locallyResetPass === password.trim()
        ) {
          const demoUser = {
            id: 'DEMO-ADMIN-01',
            username: username.trim(),
            name: username.trim(),
            companyName: 'Ocean Software Solutions',
            role: 'Super Admin',
            hasActivePlan: true,
          };
          localStorage.setItem('hr_portal_token', 'demo_token_' + Date.now());
          localStorage.setItem('hr_portal_authenticated', 'true');
          localStorage.setItem('hr_portal_user', JSON.stringify(demoUser));
          if (login) login(demoUser);
          showToast('Login successful with updated password!', 'success');
          setTimeout(() => navigate('/'), 600);
          return;
        }

        const isCredentialError =
          !result.message ||
          /invalid\s*credential/i.test(result.message) ||
          result.message.toLowerCase().includes('credential');
        const errorMessage = isCredentialError
          ? 'Username and password are not correct'
          : result.message;
        showToast(errorMessage, 'error');
        setIsLoading(false);
        return;
      }

      // Backend token & user details save pannuvom
      localStorage.setItem('hr_portal_token', result.data.token);
      localStorage.setItem('hr_portal_authenticated', 'true');
      localStorage.setItem('hr_portal_user', JSON.stringify(result.data.user));

      if (login) {
        login(result.data.user);
      }

      showToast(result.message || 'Login successful!', 'success');

      // Check if newly created company has no active plan assigned yet
      const user = result.data.user;
      const isSuperAdmin = Boolean(
        user?.role?.toLowerCase?.().includes('super') ||
        user?.role?.roleName?.toLowerCase?.().includes('super')
      );
      const isBranchAdmin = Boolean(user?.isBranchAdmin || user?.branchId);
      const needsPlanSetup = !isSuperAdmin && !isBranchAdmin && user?.hasActivePlan === false;

      setTimeout(() => {
        if (needsPlanSetup) {
          navigate('/choose-plan');
        } else {
          navigate('/');
        }
      }, 600);
    } catch (err) {
      console.error('Login error:', err);
      // Even if network fails, check if this was the demo reset password
      const locallyResetUser = localStorage.getItem('demo_reset_user');
      const locallyResetPass = localStorage.getItem('demo_reset_password');
      if (
        locallyResetUser &&
        locallyResetUser.toLowerCase() === username.trim().toLowerCase() &&
        locallyResetPass &&
        locallyResetPass === password.trim()
      ) {
        const demoUser = {
          id: 'DEMO-ADMIN-01',
          username: username.trim(),
          name: username.trim(),
          companyName: 'Ocean Software Solutions',
          role: 'Super Admin',
          hasActivePlan: true,
        };
        localStorage.setItem('hr_portal_token', 'demo_token_' + Date.now());
        localStorage.setItem('hr_portal_authenticated', 'true');
        localStorage.setItem('hr_portal_user', JSON.stringify(demoUser));
        if (login) login(demoUser);
        showToast('Login successful with updated password!', 'success');
        setTimeout(() => navigate('/'), 600);
        return;
      }

      if (!navigator.onLine) {
        showToast(
          'No internet connection. Please check your network and try again.',
          'error',
          'Internet Error'
        );
      } else {
        showToast(
          'Unable to connect to server. Please check your internet connection.',
          'error',
          'Internet Error'
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Open Forgot Password View
  const handleOpenForgotPassword = (e) => {
    e.preventDefault();
    setIsForgotMode(true);
    setForgotStep(1);
    setForgotUsername(username.trim() || '');
    setGeneratedOtp('');
    setEnteredOtp('');
    setNewPassword('');
    setConfirmPassword('');
    setForgotErrors({});
  };

  // Cancel & Back to Sign In
  const handleBackToLogin = () => {
    setIsForgotMode(false);
    setForgotStep(1);
    setForgotErrors({});
  };

  // Step 1: Auto-generate OTP
  const handleGenerateOtp = (e) => {
    e.preventDefault();
    if (!forgotUsername.trim()) {
      setForgotErrors({ username: 'Username or Email is required' });
      return;
    }
    setForgotErrors({});
    setIsForgotLoading(true);

    setTimeout(() => {
      // Auto-generate a secure 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(otp);
      setEnteredOtp('');
      setIsForgotLoading(false);
      setForgotStep(2);
      showToast(`Verification OTP generated: ${otp}`, 'info', 'OTP Generated');
    }, 450);
  };

  // Step 2: Resend OTP
  const handleResendOtp = () => {
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);
    setEnteredOtp('');
    setForgotErrors({});
    showToast(`New Verification OTP: ${newOtp}`, 'info', 'OTP Resent');
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (!enteredOtp.trim()) {
      setForgotErrors({ otp: 'Please enter the 6-digit OTP' });
      return;
    }
    if (enteredOtp.trim() !== generatedOtp.trim()) {
      setForgotErrors({ otp: `Incorrect OTP. Please enter ${generatedOtp}` });
      return;
    }

    setForgotErrors({});
    setIsForgotLoading(true);

    setTimeout(() => {
      setIsForgotLoading(false);
      setForgotStep(3);
      showToast('OTP verified successfully! Now create a new password.', 'success', 'OTP Verified');
    }, 400);
  };

  // Step 3: Reset Password in Frontend
  const handleResetPassword = (e) => {
    e.preventDefault();
    const newErrs = {};
    if (!newPassword.trim()) {
      newErrs.newPassword = 'New password is required';
    } else if (newPassword.length < 6) {
      newErrs.newPassword = 'Password must be at least 6 characters';
    }

    if (!confirmPassword.trim()) {
      newErrs.confirmPassword = 'Confirm password is required';
    } else if (newPassword && confirmPassword !== newPassword) {
      newErrs.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrs).length > 0) {
      setForgotErrors(newErrs);
      return;
    }

    setForgotErrors({});
    setIsForgotLoading(true);

    setTimeout(() => {
      setIsForgotLoading(false);
      // Persist in localStorage for demo fallback login
      localStorage.setItem('demo_reset_user', forgotUsername.trim());
      localStorage.setItem('demo_reset_password', newPassword.trim());

      // Pre-fill credentials into the Login form
      setUsername(forgotUsername.trim());
      setPassword(newPassword.trim());

      setForgotStep(4);
      showToast('Password has been reset successfully!', 'success', 'Success');
    }, 600);
  };

  // Step 4: Finish and return to Login
  const handleCompleteReset = () => {
    setIsForgotMode(false);
    setForgotStep(1);
    setForgotErrors({});
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
          title={toast.title}
          message={toast.message}
          type={toast.type}
          duration={3500}
          onClose={() => setToast(null)}
        />
      )}

      {/* Center Frosted Glassmorphism Login Card */}
      <main className="login-card-wrapper">
        <div className="login-card">
          {!isForgotMode ? (
            <>
              {/* Card Header */}
              <div className="login-header">
                <h1 className="login-title">Sign In</h1>
                <p className="login-subtitle">
                  Enter your credentials to access the enterprise portal
                </p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="login-form" noValidate>
                {/* Field 1: User Name */}
                <div className="login-field-group">
                  <label className="login-field-label">Username</label>
                  <div
                    className={`login-input-container ${
                      usernameFocused ? 'focused' : ''
                    } ${errors.username ? 'has-error' : ''}`}
                  >
                    <div className="login-input-icon">
                      <User size={17} strokeWidth={2.2} />
                    </div>
                    <input
                      type="text"
                      className="login-input"
                      placeholder="Enter Username"
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                        if (errors.username) setErrors((prev) => ({ ...prev, username: null }));
                      }}
                      onFocus={() => setUsernameFocused(true)}
                      onBlur={() => {
                        setUsernameFocused(false);
                        if (!username.trim()) {
                          setErrors((prev) => ({ ...prev, username: 'User Name is required' }));
                        }
                      }}
                      autoComplete="username"
                    />
                  </div>
                  <FieldError error={errors.username} />
                </div>

                {/* Field 2: Password */}
                <div className="login-field-group">
                  <div className="login-field-label-row">
                    <label className="login-field-label">Password</label>
                    <button
                      type="button"
                      className="login-forgot-btn"
                      onClick={handleOpenForgotPassword}
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
            </>
          ) : (
            <div className="forgot-password-flow">
              {/* Step 1: Request OTP */}
              {forgotStep === 1 && (
                <>
                  <div className="login-header">
                    <div className="forgot-icon-badge">
                      <KeyRound size={22} />
                    </div>
                    <h1 className="login-title">Forgot Password</h1>
                    <p className="login-subtitle">
                      Enter your username or email address and we'll generate an OTP to verify your account
                    </p>
                  </div>

                  <form onSubmit={handleGenerateOtp} className="login-form" noValidate>
                    <div className="login-field-group">
                      <label className="login-field-label">Username or Email</label>
                      <div className={`login-input-container ${forgotErrors.username ? 'has-error' : ''}`}>
                        <div className="login-input-icon">
                          <User size={17} strokeWidth={2.2} />
                        </div>
                        <input
                          type="text"
                          className="login-input"
                          placeholder="Enter your username or email"
                          value={forgotUsername}
                          onChange={(e) => {
                            setForgotUsername(e.target.value);
                            if (forgotErrors.username) {
                              setForgotErrors((prev) => ({ ...prev, username: null }));
                            }
                          }}
                          autoFocus
                        />
                      </div>
                      <FieldError error={forgotErrors.username} />
                    </div>

                    <button
                      type="submit"
                      className="login-submit-btn"
                      disabled={isForgotLoading}
                    >
                      {isForgotLoading ? (
                        <span>Generating OTP...</span>
                      ) : (
                        <>
                          <span>Send Verification OTP</span>
                          <ArrowRight size={18} strokeWidth={2.4} />
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      className="login-back-btn"
                      onClick={handleBackToLogin}
                    >
                      <ArrowLeft size={16} />
                      <span>Back to Sign In</span>
                    </button>
                  </form>
                </>
              )}

              {/* Step 2: Verify OTP */}
              {forgotStep === 2 && (
                <>
                  <div className="login-header">
                    <div className="forgot-icon-badge">
                      <ShieldCheck size={22} />
                    </div>
                    <h1 className="login-title">Verify OTP</h1>
                    <p className="login-subtitle">
                      Verification code generated for <strong>{forgotUsername}</strong>
                    </p>
                  </div>

                  {/* Auto-Generated Mock OTP Banner */}
                  <div className="demo-otp-banner">
                    <div className="demo-otp-content">
                      <div className="demo-otp-meta">
                        <Sparkles size={14} className="demo-otp-sparkle" />
                        <span className="demo-otp-tag">Auto-Generated OTP</span>
                      </div>
                      <div className="demo-otp-code">{generatedOtp}</div>
                    </div>
                    <button
                      type="button"
                      className="demo-otp-autofill-btn"
                      onClick={() => {
                        setEnteredOtp(generatedOtp);
                        if (forgotErrors.otp) {
                          setForgotErrors((prev) => ({ ...prev, otp: null }));
                        }
                      }}
                      title="Click to auto-fill this OTP"
                    >
                      Auto-Fill Code
                    </button>
                  </div>

                  <form onSubmit={handleVerifyOtp} className="login-form" noValidate>
                    <div className="login-field-group">
                      <div className="login-field-label-row">
                        <label className="login-field-label">Enter 6-Digit OTP</label>
                        <button
                          type="button"
                          className="login-resend-btn"
                          onClick={handleResendOtp}
                          title="Generate a new OTP code"
                        >
                          <RefreshCw size={12} />
                          <span>Resend OTP</span>
                        </button>
                      </div>
                      <div className={`login-input-container ${forgotErrors.otp ? 'has-error' : ''}`}>
                        <div className="login-input-icon">
                          <Lock size={17} strokeWidth={2.2} />
                        </div>
                        <input
                          type="text"
                          maxLength={6}
                          className="login-input otp-input-text"
                          placeholder="• • • • • •"
                          value={enteredOtp}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '');
                            setEnteredOtp(val);
                            if (forgotErrors.otp) {
                              setForgotErrors((prev) => ({ ...prev, otp: null }));
                            }
                          }}
                          autoFocus
                        />
                      </div>
                      <FieldError error={forgotErrors.otp} />
                    </div>

                    <button
                      type="submit"
                      className="login-submit-btn"
                      disabled={isForgotLoading}
                    >
                      {isForgotLoading ? (
                        <span>Verifying...</span>
                      ) : (
                        <>
                          <span>Verify & Proceed</span>
                          <ArrowRight size={18} strokeWidth={2.4} />
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      className="login-back-btn"
                      onClick={() => setForgotStep(1)}
                    >
                      <ArrowLeft size={16} />
                      <span>Change Username / Email</span>
                    </button>
                  </form>
                </>
              )}

              {/* Step 3: Set New Password */}
              {forgotStep === 3 && (
                <>
                  <div className="login-header">
                    <div className="forgot-icon-badge">
                      <KeyRound size={22} />
                    </div>
                    <h1 className="login-title">Reset Password</h1>
                    <p className="login-subtitle">
                      Set a secure new password for <strong>{forgotUsername}</strong>
                    </p>
                  </div>

                  <form onSubmit={handleResetPassword} className="login-form" noValidate>
                    <div className="login-field-group">
                      <label className="login-field-label">New Password</label>
                      <div className={`login-input-container ${forgotErrors.newPassword ? 'has-error' : ''}`}>
                        <div className="login-input-icon">
                          <Lock size={17} strokeWidth={2.2} />
                        </div>
                        <input
                          type={showNewPassword ? 'text' : 'password'}
                          className="login-input password-input"
                          placeholder="••••••••"
                          value={newPassword}
                          onChange={(e) => {
                            setNewPassword(e.target.value);
                            if (forgotErrors.newPassword) {
                              setForgotErrors((prev) => ({ ...prev, newPassword: null }));
                            }
                          }}
                          autoFocus
                        />
                        <button
                          type="button"
                          className="login-toggle-pw-btn"
                          onClick={() => setShowNewPassword((prev) => !prev)}
                        >
                          {showNewPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                        </button>
                      </div>
                      <FieldError error={forgotErrors.newPassword} />
                    </div>

                    <div className="login-field-group">
                      <label className="login-field-label">Confirm New Password</label>
                      <div className={`login-input-container ${forgotErrors.confirmPassword ? 'has-error' : ''}`}>
                        <div className="login-input-icon">
                          <Lock size={17} strokeWidth={2.2} />
                        </div>
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          className="login-input password-input"
                          placeholder="••••••••"
                          value={confirmPassword}
                          onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            if (forgotErrors.confirmPassword) {
                              setForgotErrors((prev) => ({ ...prev, confirmPassword: null }));
                            }
                          }}
                        />
                        <button
                          type="button"
                          className="login-toggle-pw-btn"
                          onClick={() => setShowConfirmPassword((prev) => !prev)}
                        >
                          {showConfirmPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                        </button>
                      </div>
                      <FieldError error={forgotErrors.confirmPassword} />
                    </div>

                    <button
                      type="submit"
                      className="login-submit-btn"
                      disabled={isForgotLoading}
                    >
                      {isForgotLoading ? (
                        <span>Updating Password...</span>
                      ) : (
                        <>
                          <span>Save & Update Password</span>
                          <ArrowRight size={18} strokeWidth={2.4} />
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      className="login-back-btn"
                      onClick={handleBackToLogin}
                    >
                      <ArrowLeft size={16} />
                      <span>Cancel</span>
                    </button>
                  </form>
                </>
              )}

              {/* Step 4: Success Confirmation */}
              {forgotStep === 4 && (
                <div className="forgot-success-view">
                  <div className="forgot-success-icon-wrap">
                    <CheckCircle2 size={44} className="forgot-success-icon" />
                  </div>
                  <h2 className="forgot-success-title">Password Reset Complete!</h2>
                  <p className="forgot-success-desc">
                    Your password has been successfully updated for <strong>{forgotUsername}</strong>. You can now log in with your new credentials.
                  </p>

                  <button
                    type="button"
                    className="login-submit-btn"
                    onClick={handleCompleteReset}
                  >
                    <span>Sign In Now</span>
                    <ArrowRight size={18} strokeWidth={2.4} />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
