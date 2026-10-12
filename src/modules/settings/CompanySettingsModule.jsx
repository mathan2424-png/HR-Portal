import React, { useState } from 'react';
import {
  Save,
  CheckCircle2,
  Building,
  Sliders,
  Bell,
  Shield,
  History,
} from 'lucide-react';
import './CompanySettingsModule.css';

export const CompanySettingsModule = () => {
  // STRICTLY and ONLY the 5 user-requested sections:
  // 1. Company Preferences: Timezone, working days and basic recruitment preferences.
  // 2. Recruitment Settings: Default stages, screening settings, rejection reasons and approval settings.
  // 3. Notification Preferences: Email, SMS, push and reminder preferences.
  // 4. Security: Password, two-factor authentication, active sessions and device access.
  // 5. Login History: User login date/time and device information.

  const [activeTab, setActiveTab] = useState('all');
  const [toastMessage, setToastMessage] = useState('');

  // 1. Company Preferences State
  const [preferences, setPreferences] = useState({
    timezone: 'IST (UTC+05:30) - Asia/Kolkata (Indian Standard Time)',
    workingDays: 'Monday - Friday (5 Days Working)',
    autoExpireDays: '45 Days after job publishing',
    defaultJobVisibility: 'Company Portal & External Matching',
    resumeFormatPolicy: 'PDF, DOCX formats supported (Max 15MB)',
    candidateAckEmail: 'Enabled (Automatic receipt confirmation on candidate response)',
  });

  // 2. Recruitment Settings State
  const [recruitmentSettings, setRecruitmentSettings] = useState({
    defaultStages: 'Matched, Interested, Screening, Shortlisted, Interview, Offer, Hired',
    screeningSettings: 'Auto-trigger screening assessment upon candidate positive response',
    minPassingScore: '75% Minimum Passing Score Threshold',
    mandatoryQuestionPolicy: 'All mandatory screening questions required before HR review',
    rejectionReasons: 'Skills Mismatch, Budget / Salary Expectation Mismatch, Notice Period Exceeds Limit, Failed Assessment, Candidate Declined Offer',
    jobApprovalSettings: 'Require Department Head & Hiring Manager Approval before publishing',
    offerApprovalSettings: 'Require HR Director & Finance Executive sign-off before releasing offer',
  });

  // 3. Notification Preferences State
  const [notificationPreferences, setNotificationPreferences] = useState({
    emailCandidateResponse: true,
    emailInterviewSchedule: true,
    emailOfferUpdates: true,
    smsInterviewUrgent: true,
    smsCriticalAlerts: true,
    pushInstantMatch: true,
    pushCandidateMessages: true,
    interviewReminderTiming: '1 Hour Before Scheduled Interview Time',
    offerExpiryReminder: '3 Days Before Offer Validity Expiry',
    screeningPendingReminder: '48 Hours After Application Submission',
  });

  // 4. Security State (Password & 2FA)
  const [securityData, setSecurityData] = useState({
    currentPassword: '••••••••••••',
    newPassword: '',
    confirmPassword: '',
    lastPasswordChange: '15-Sep-2026 (27 days ago)',
    twoFactorEnabled: true,
    twoFactorMethod: 'Authenticator App (TOTP - Google Authenticator / Microsoft Authenticator)',
  });

  // 4b. Active Sessions & Device Access Data
  const [activeSessions, setActiveSessions] = useState([
    {
      id: 'SES-001',
      deviceBrowser: 'Chrome 129 on Windows 11 (Desktop)',
      ipAddress: '106.208.12.84',
      location: 'Chennai, Tamil Nadu, India',
      loginDateTime: '12-Oct-2026 09:30 AM',
      status: 'Current Active Session',
      isCurrent: true,
    },
    {
      id: 'SES-002',
      deviceBrowser: 'Safari on iPhone 16 Pro (Mobile App)',
      ipAddress: '49.207.218.42',
      location: 'Bangalore, Karnataka, India',
      loginDateTime: '12-Oct-2026 08:15 AM',
      status: 'Active',
      isCurrent: false,
    },
    {
      id: 'SES-003',
      deviceBrowser: 'Firefox 130 on macOS Sequoia (MacBook Air)',
      ipAddress: '157.48.91.103',
      location: 'Hyderabad, Telangana, India',
      loginDateTime: '11-Oct-2026 06:40 PM',
      status: 'Active',
      isCurrent: false,
    },
  ]);

  // 5. Login History Audit Data
  const [loginHistory] = useState([
    {
      id: 'LOG-001',
      userName: 'Sundar Raman (Eng Lead)',
      loginDateTime: '12-Oct-2026 09:30 AM',
      ipAddress: '106.208.12.84',
      deviceInfo: 'Chrome 129 / Windows 11 Desktop',
      location: 'Chennai, India',
      status: 'Successful',
    },
    {
      id: 'LOG-002',
      userName: 'Abinaya R (Senior HR Manager)',
      loginDateTime: '12-Oct-2026 08:45 AM',
      ipAddress: '49.207.218.42',
      deviceInfo: 'Chrome 129 / macOS Sequoia',
      location: 'Bangalore, India',
      status: 'Successful',
    },
    {
      id: 'LOG-003',
      userName: 'Rajeshwaran K (Company Admin)',
      loginDateTime: '12-Oct-2026 08:15 AM',
      ipAddress: '157.48.91.103',
      deviceInfo: 'Safari Mobile / iOS 18',
      location: 'Hyderabad, India',
      status: 'Successful',
    },
    {
      id: 'LOG-004',
      userName: 'Karthik Raja (Design Head)',
      loginDateTime: '11-Oct-2026 06:40 PM',
      ipAddress: '115.111.23.18',
      deviceInfo: 'Firefox 130 / macOS Sequoia',
      location: 'Chennai, India',
      status: 'Successful',
    },
    {
      id: 'LOG-005',
      userName: 'Deepak Verma (Finance Admin)',
      loginDateTime: '11-Oct-2026 02:10 PM',
      ipAddress: '182.74.88.5',
      deviceInfo: 'Edge 129 / Windows 11 Desktop',
      location: 'Mumbai, India',
      status: 'Successful',
    },
    {
      id: 'LOG-006',
      userName: 'Unrecognized User (Failed Attempt)',
      loginDateTime: '10-Oct-2026 11:22 PM',
      ipAddress: '194.26.29.112',
      deviceInfo: 'Unknown Client / Linux x86_64',
      location: 'Frankfurt, Germany',
      status: 'Failed (Blocked by 2FA)',
    },
  ]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3500);
  };

  const handleSaveAll = (e) => {
    e.preventDefault();
    showToast('Company preferences and security settings saved successfully!');
  };

  const handleRevokeSession = (sessionId) => {
    setActiveSessions((prev) => prev.filter((s) => s.id !== sessionId));
    showToast(`Session ${sessionId} revoked and terminated.`);
  };

  return (
    <div className="settings-page-container">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="settings-toast-alert">
          <CheckCircle2 size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="settings-page-header">
        <div className="settings-header-left">
          <h1 className="settings-page-title">Company Settings & Security</h1>
          
        </div>
      </div>

      {/* Main Single Card Container */}
      <div className="settings-main-card">
        {/* Navigation Tabs */}
        <div className="settings-tabs-nav">
          <button
            type="button"
            className={`settings-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All Settings Overview
          </button>
          <button
            type="button"
            className={`settings-tab-btn ${activeTab === 'preferences' ? 'active' : ''}`}
            onClick={() => setActiveTab('preferences')}
          >
            <Building size={15} />
            <span>1. Company Preferences</span>
          </button>
          <button
            type="button"
            className={`settings-tab-btn ${activeTab === 'recruitment' ? 'active' : ''}`}
            onClick={() => setActiveTab('recruitment')}
          >
            <Sliders size={15} />
            <span>2. Recruitment Settings</span>
          </button>
          <button
            type="button"
            className={`settings-tab-btn ${activeTab === 'notifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('notifications')}
          >
            <Bell size={15} />
            <span>3. Notification Preferences</span>
          </button>
          <button
            type="button"
            className={`settings-tab-btn ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            <Shield size={15} />
            <span>4. Security & Sessions</span>
          </button>
          <button
            type="button"
            className={`settings-tab-btn ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            <History size={15} />
            <span>5. Login History</span>
          </button>
        </div>

        <form onSubmit={handleSaveAll} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* SECTION 1: Company Preferences */}
          {(activeTab === 'preferences' || activeTab === 'all') && (
            <div className="settings-section-box">
              <div className="settings-section-header">
                <span>1. COMPANY PREFERENCES (TIMEZONE, WORKING DAYS & BASIC RECRUITMENT PREFERENCES)</span>
              </div>

              <div className="settings-grid-2col">
                {/* Timezone */}
                <div className="form-field-group">
                  <label>Company Operating Timezone *</label>
                  <select
                    className="form-control-select"
                    value={preferences.timezone}
                    onChange={(e) => setPreferences({ ...preferences, timezone: e.target.value })}
                  >
                    <option value="IST (UTC+05:30) - Asia/Kolkata (Indian Standard Time)">
                      IST (UTC+05:30) - Asia/Kolkata (Indian Standard Time)
                    </option>
                    <option value="SGT (UTC+08:00) - Singapore Standard Time">
                      SGT (UTC+08:00) - Singapore Standard Time
                    </option>
                    <option value="GST (UTC+04:00) - Gulf Standard Time (Dubai)">
                      GST (UTC+04:00) - Gulf Standard Time (Dubai)
                    </option>
                    <option value="BST (UTC+01:00) - British Summer Time (London)">
                      BST (UTC+01:00) - British Summer Time (London)
                    </option>
                    <option value="EST (UTC-05:00) - Eastern Standard Time (New York)">
                      EST (UTC-05:00) - Eastern Standard Time (New York)
                    </option>
                  </select>
                </div>

                {/* Working Days */}
                <div className="form-field-group">
                  <label>Company Working Days *</label>
                  <select
                    className="form-control-select"
                    value={preferences.workingDays}
                    onChange={(e) => setPreferences({ ...preferences, workingDays: e.target.value })}
                  >
                    <option value="Monday - Friday (5 Days Working)">Monday - Friday (5 Days Working)</option>
                    <option value="Monday - Saturday (6 Days Working)">Monday - Saturday (6 Days Working)</option>
                    <option value="Sunday - Thursday (Middle East Standard)">Sunday - Thursday (Middle East Standard)</option>
                  </select>
                </div>
              </div>

              <div className="settings-grid-3col">
                {/* Basic Recruitment Preferences: Auto-expire */}
                <div className="form-field-group">
                  <label>Unfilled Job Auto-Expire Duration</label>
                  <select
                    className="form-control-select"
                    value={preferences.autoExpireDays}
                    onChange={(e) => setPreferences({ ...preferences, autoExpireDays: e.target.value })}
                  >
                    <option value="30 Days after job publishing">30 Days after job publishing</option>
                    <option value="45 Days after job publishing">45 Days after job publishing</option>
                    <option value="60 Days after job publishing">60 Days after job publishing</option>
                    <option value="90 Days after job publishing">90 Days after job publishing</option>
                  </select>
                </div>

                {/* Basic Recruitment Preferences: Default Job Visibility */}
                <div className="form-field-group">
                  <label>Default Candidate Matching Visibility</label>
                  <select
                    className="form-control-select"
                    value={preferences.defaultJobVisibility}
                    onChange={(e) => setPreferences({ ...preferences, defaultJobVisibility: e.target.value })}
                  >
                    <option value="Company Portal & External Matching">Company Portal & External Matching</option>
                    <option value="Internal Recruitment Team Only">Internal Recruitment Team Only</option>
                    <option value="Private & Executive Search Only">Private & Executive Search Only</option>
                  </select>
                </div>

                {/* Basic Recruitment Preferences: Resume Formats */}
                <div className="form-field-group">
                  <label>Allowed Resume File Formats</label>
                  <input
                    type="text"
                    className="form-control-input"
                    value={preferences.resumeFormatPolicy}
                    onChange={(e) => setPreferences({ ...preferences, resumeFormatPolicy: e.target.value })}
                  />
                </div>
              </div>

              {/* Basic Recruitment Preferences: Candidate Receipt Confirmation */}
              <div className="form-field-group">
                <label>Automatic Candidate Application Acknowledgement</label>
                <input
                  type="text"
                  className="form-control-input"
                  value={preferences.candidateAckEmail}
                  onChange={(e) => setPreferences({ ...preferences, candidateAckEmail: e.target.value })}
                />
              </div>
            </div>
          )}

          {/* SECTION 2: Recruitment Settings */}
          {(activeTab === 'recruitment' || activeTab === 'all') && (
            <div className="settings-section-box">
              <div className="settings-section-header">
                <span>2. RECRUITMENT SETTINGS (DEFAULT STAGES, SCREENING, REJECTION REASONS & APPROVALS)</span>
              </div>

              {/* Default Stages */}
              <div className="form-field-group">
                <label>Default Recruitment Pipeline Stages *</label>
                <input
                  type="text"
                  className="form-control-input"
                  value={recruitmentSettings.defaultStages}
                  onChange={(e) => setRecruitmentSettings({ ...recruitmentSettings, defaultStages: e.target.value })}
                />
                <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                  Standard recruitment stages configured across all active company jobs.
                </span>
              </div>

              <div className="settings-grid-3col">
                {/* Screening Settings */}
                <div className="form-field-group">
                  <label>Screening Trigger Policy</label>
                  <input
                    type="text"
                    className="form-control-input"
                    value={recruitmentSettings.screeningSettings}
                    onChange={(e) => setRecruitmentSettings({ ...recruitmentSettings, screeningSettings: e.target.value })}
                  />
                </div>

                {/* Screening Settings: Pass Score */}
                <div className="form-field-group">
                  <label>Screening Pass Criteria Threshold</label>
                  <input
                    type="text"
                    className="form-control-input"
                    value={recruitmentSettings.minPassingScore}
                    onChange={(e) => setRecruitmentSettings({ ...recruitmentSettings, minPassingScore: e.target.value })}
                  />
                </div>

                {/* Screening Settings: Mandatory Policy */}
                <div className="form-field-group">
                  <label>Mandatory Question Policy</label>
                  <input
                    type="text"
                    className="form-control-input"
                    value={recruitmentSettings.mandatoryQuestionPolicy}
                    onChange={(e) => setRecruitmentSettings({ ...recruitmentSettings, mandatoryQuestionPolicy: e.target.value })}
                  />
                </div>
              </div>

              {/* Rejection Reasons */}
              <div className="form-field-group">
                <label>Standard Company Rejection Reasons *</label>
                <textarea
                  className="form-control-textarea"
                  rows="2"
                  value={recruitmentSettings.rejectionReasons}
                  onChange={(e) => setRecruitmentSettings({ ...recruitmentSettings, rejectionReasons: e.target.value })}
                />
                <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                  Comma-separated rejection reasons available in recruitment candidate response stages.
                </span>
              </div>

              <div className="settings-grid-2col">
                {/* Approval Settings: Job */}
                <div className="form-field-group">
                  <label>Job Posting Approval Policy *</label>
                  <input
                    type="text"
                    className="form-control-input"
                    value={recruitmentSettings.jobApprovalSettings}
                    onChange={(e) => setRecruitmentSettings({ ...recruitmentSettings, jobApprovalSettings: e.target.value })}
                  />
                </div>

                {/* Approval Settings: Offer */}
                <div className="form-field-group">
                  <label>Offer Release Approval Policy *</label>
                  <input
                    type="text"
                    className="form-control-input"
                    value={recruitmentSettings.offerApprovalSettings}
                    onChange={(e) => setRecruitmentSettings({ ...recruitmentSettings, offerApprovalSettings: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}

          {/* SECTION 3: Notification Preferences */}
          {(activeTab === 'notifications' || activeTab === 'all') && (
            <div className="settings-section-box">
              <div className="settings-section-header">
                <span>3. NOTIFICATION PREFERENCES (EMAIL, SMS, PUSH & REMINDER PREFERENCES)</span>
              </div>

              <div className="settings-grid-3col">
                {/* Email Preferences */}
                <div className="form-field-group">
                  <label>Email Notification Channels</label>
                  <div className="settings-checkbox-group">
                    <label className="settings-checkbox-item">
                      <input
                        type="checkbox"
                        checked={notificationPreferences.emailCandidateResponse}
                        onChange={(e) => setNotificationPreferences({ ...notificationPreferences, emailCandidateResponse: e.target.checked })}
                      />
                      <span>Candidate Response Alerts</span>
                    </label>
                    <label className="settings-checkbox-item">
                      <input
                        type="checkbox"
                        checked={notificationPreferences.emailInterviewSchedule}
                        onChange={(e) => setNotificationPreferences({ ...notificationPreferences, emailInterviewSchedule: e.target.checked })}
                      />
                      <span>Interview Confirmations & Reschedules</span>
                    </label>
                    <label className="settings-checkbox-item">
                      <input
                        type="checkbox"
                        checked={notificationPreferences.emailOfferUpdates}
                        onChange={(e) => setNotificationPreferences({ ...notificationPreferences, emailOfferUpdates: e.target.checked })}
                      />
                      <span>Offer Letter Dispatches & Signatures</span>
                    </label>
                  </div>
                </div>

                {/* SMS Preferences */}
                <div className="form-field-group">
                  <label>SMS Alert Channels</label>
                  <div className="settings-checkbox-group">
                    <label className="settings-checkbox-item">
                      <input
                        type="checkbox"
                        checked={notificationPreferences.smsInterviewUrgent}
                        onChange={(e) => setNotificationPreferences({ ...notificationPreferences, smsInterviewUrgent: e.target.checked })}
                      />
                      <span>Urgent Interview Schedule Alerts</span>
                    </label>
                    <label className="settings-checkbox-item">
                      <input
                        type="checkbox"
                        checked={notificationPreferences.smsCriticalAlerts}
                        onChange={(e) => setNotificationPreferences({ ...notificationPreferences, smsCriticalAlerts: e.target.checked })}
                      />
                      <span>Security OTP & Account Alerts</span>
                    </label>
                  </div>
                </div>

                {/* Push Preferences */}
                <div className="form-field-group">
                  <label>Push Notification Channels</label>
                  <div className="settings-checkbox-group">
                    <label className="settings-checkbox-item">
                      <input
                        type="checkbox"
                        checked={notificationPreferences.pushInstantMatch}
                        onChange={(e) => setNotificationPreferences({ ...notificationPreferences, pushInstantMatch: e.target.checked })}
                      />
                      <span>Instant Candidate Match Alerts</span>
                    </label>
                    <label className="settings-checkbox-item">
                      <input
                        type="checkbox"
                        checked={notificationPreferences.pushCandidateMessages}
                        onChange={(e) => setNotificationPreferences({ ...notificationPreferences, pushCandidateMessages: e.target.checked })}
                      />
                      <span>Live Candidate Responses</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="settings-grid-3col" style={{ marginTop: '0.25rem' }}>
                {/* Reminder Preferences: Interview */}
                <div className="form-field-group">
                  <label>Interview Reminder Timing *</label>
                  <select
                    className="form-control-select"
                    value={notificationPreferences.interviewReminderTiming}
                    onChange={(e) => setNotificationPreferences({ ...notificationPreferences, interviewReminderTiming: e.target.value })}
                  >
                    <option value="30 Minutes Before Scheduled Interview">30 Minutes Before Scheduled Interview</option>
                    <option value="1 Hour Before Scheduled Interview Time">1 Hour Before Scheduled Interview Time</option>
                    <option value="2 Hours Before Scheduled Interview">2 Hours Before Scheduled Interview</option>
                    <option value="24 Hours Before Scheduled Interview">24 Hours Before Scheduled Interview</option>
                  </select>
                </div>

                {/* Reminder Preferences: Offer Expiry */}
                <div className="form-field-group">
                  <label>Offer Expiry Reminder *</label>
                  <select
                    className="form-control-select"
                    value={notificationPreferences.offerExpiryReminder}
                    onChange={(e) => setNotificationPreferences({ ...notificationPreferences, offerExpiryReminder: e.target.value })}
                  >
                    <option value="1 Day Before Offer Validity Expiry">1 Day Before Offer Validity Expiry</option>
                    <option value="3 Days Before Offer Validity Expiry">3 Days Before Offer Validity Expiry</option>
                    <option value="5 Days Before Offer Validity Expiry">5 Days Before Offer Validity Expiry</option>
                  </select>
                </div>

                {/* Reminder Preferences: Screening Pending */}
                <div className="form-field-group">
                  <label>Screening Pending Reminder *</label>
                  <select
                    className="form-control-select"
                    value={notificationPreferences.screeningPendingReminder}
                    onChange={(e) => setNotificationPreferences({ ...notificationPreferences, screeningPendingReminder: e.target.value })}
                  >
                    <option value="24 Hours After Application Submission">24 Hours After Application Submission</option>
                    <option value="48 Hours After Application Submission">48 Hours After Application Submission</option>
                    <option value="72 Hours After Application Submission">72 Hours After Application Submission</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 4: Security (Password, 2FA, Active Sessions & Device Access) */}
          {(activeTab === 'security' || activeTab === 'all') && (
            <div className="settings-section-box">
              <div className="settings-section-header">
                <span>4. SECURITY (PASSWORD, TWO-FACTOR AUTHENTICATION, ACTIVE SESSIONS & DEVICE ACCESS)</span>
              </div>

              {/* Password & Two-Factor Authentication */}
              <div className="settings-grid-2col">
                {/* Password Management */}
                <div className="form-field-group">
                  <label>Password Management (Last Changed: {securityData.lastPasswordChange})</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <input
                      type="password"
                      placeholder="Current Password"
                      className="form-control-input"
                      value={securityData.currentPassword}
                      onChange={(e) => setSecurityData({ ...securityData, currentPassword: e.target.value })}
                    />
                    <input
                      type="password"
                      placeholder="New Password (Min 8 chars, 1 number, 1 symbol)"
                      className="form-control-input"
                      value={securityData.newPassword}
                      onChange={(e) => setSecurityData({ ...securityData, newPassword: e.target.value })}
                    />
                  </div>
                </div>

                {/* Two-Factor Authentication */}
                <div className="form-field-group">
                  <label>Two-Factor Authentication (2FA)</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                    <select
                      className="form-control-select"
                      value={securityData.twoFactorMethod}
                      onChange={(e) => setSecurityData({ ...securityData, twoFactorMethod: e.target.value })}
                    >
                      <option value="Authenticator App (TOTP - Google Authenticator / Microsoft Authenticator)">
                        Authenticator App (Google Authenticator / Duo Mobile) - Recommended
                      </option>
                      <option value="SMS Text Message OTP">SMS Text Message OTP</option>
                      <option value="Hardware Security Key (FIDO2 / YubiKey)">Hardware Security Key (FIDO2)</option>
                    </select>

                    <label className="settings-checkbox-item">
                      <input
                        type="checkbox"
                        checked={securityData.twoFactorEnabled}
                        onChange={(e) => setSecurityData({ ...securityData, twoFactorEnabled: e.target.checked })}
                      />
                      <span>Enforce Two-Factor Authentication across all Admin & HR User logins</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Active Sessions & Device Access Table */}
              <div style={{ marginTop: '0.5rem' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#1e293b', marginBottom: '0.5rem' }}>
                  Active Sessions & Device Access ({activeSessions.length} Devices Connected)
                </div>
                <div className="settings-table-wrapper">
                  <table className="settings-table">
                    <thead>
                      <tr>
                        <th>S.NO</th>
                        <th>DEVICE & BROWSER</th>
                        <th>IP ADDRESS</th>
                        <th>LOCATION</th>
                        <th>LOGIN DATE / TIME</th>
                        <th>SESSION STATUS</th>
                        <th style={{ textAlign: 'center' }}>ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeSessions.map((session, index) => (
                        <tr key={session.id}>
                          <td style={{ fontWeight: 700, color: '#64748b' }}>{index + 1}</td>
                          <td style={{ fontWeight: 700 }}>{session.deviceBrowser}</td>
                          <td><code>{session.ipAddress}</code></td>
                          <td>{session.location}</td>
                          <td>{session.loginDateTime}</td>
                          <td>
                            <span className={`status-pill-badge ${session.isCurrent ? 'active' : 'success'}`}>
                              {session.status}
                            </span>
                          </td>
                          <td style={{ textAlign: 'center' }}>
                            {session.isCurrent ? (
                              <span style={{ fontSize: '0.74rem', color: '#166534', fontWeight: 700 }}>Current Device</span>
                            ) : (
                              <button
                                type="button"
                                style={{
                                  padding: '0.25rem 0.65rem',
                                  fontSize: '0.74rem',
                                  fontWeight: 700,
                                  background: '#fee2e2',
                                  color: '#b91c1c',
                                  border: '1px solid #fecaca',
                                  borderRadius: '6px',
                                  cursor: 'pointer',
                                }}
                                onClick={() => handleRevokeSession(session.id)}
                              >
                                Revoke
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 5: Login History */}
          {(activeTab === 'history' || activeTab === 'all') && (
            <div className="settings-section-box">
              <div className="settings-section-header">
                <span>5. LOGIN HISTORY (USER LOGIN DATE/TIME AND DEVICE INFORMATION)</span>
                <span style={{ fontSize: '0.74rem', opacity: 0.9 }}>Total Audit Entries: {loginHistory.length}</span>
              </div>

              <div className="settings-table-wrapper">
                <table className="settings-table">
                  <thead>
                    <tr>
                      <th>S.NO</th>
                      <th>USER NAME</th>
                      <th>LOGIN DATE / TIME</th>
                      <th>IP ADDRESS</th>
                      <th>DEVICE & BROWSER</th>
                      <th>LOCATION</th>
                      <th>LOGIN STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loginHistory.map((log, index) => (
                      <tr key={log.id}>
                        <td style={{ fontWeight: 700, color: '#64748b' }}>{index + 1}</td>
                        <td style={{ fontWeight: 700 }}>{log.userName}</td>
                        <td style={{ fontWeight: 600, color: '#334155' }}>{log.loginDateTime}</td>
                        <td><code>{log.ipAddress}</code></td>
                        <td>{log.deviceInfo}</td>
                        <td>{log.location}</td>
                        <td>
                          <span
                            className={`status-pill-badge ${log.status.includes('Failed') ? 'failed' : 'success'}`}
                          >
                            {log.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Bottom Action Footer */}
          <div className="inpage-form-footer">
            <button
              type="button"
              className="btn-cancel-settings"
              onClick={() => showToast('Preferences reset to saved configurations.')}
            >
              Reset to Defaults
            </button>
            <button
              type="submit"
              className="btn-save-settings"
              id="btn-save-settings"
            >
              <Save size={16} />
              <span>Save Company Preferences & Security</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
