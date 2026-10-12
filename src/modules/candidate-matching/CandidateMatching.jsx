import React, { useState } from 'react';
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Send,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Save,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import './CandidateMatching.css';

export const CandidateMatching = () => {
  // STRICTLY and ONLY the 12 user-requested fields:
  // 1. Job: Selected job.
  // 2. Match Score: Candidate-job matching score.
  // 3. Skills Match: Matching skills.
  // 4. Experience Match: Experience match.
  // 5. Location Match: Location match.
  // 6. Salary Match: Expected salary vs job salary.
  // 7. Availability: Immediate/notice-period availability.
  // 8. Candidate Count: Eligible candidate count.
  // 9. Alert Channel: In-app, email, push, etc.
  // 10. Alert Status: Draft, Scheduled, Sent, Failed.
  // 11. Alert Date: Date/time alert was sent.
  // 12. Credits Used: Plan credits consumed.

  const [alerts, setAlerts] = useState([
    {
      id: 'MATCH-ALT-001',
      job: 'Senior Frontend Engineer (JOB-2026-001)',
      matchScore: 94,
      skillsMatch: 'React.js, TypeScript, Next.js, Redux (4/5 Matched)',
      experienceMatch: '5.5 Yrs (Required: 4 - 8 Yrs)',
      locationMatch: 'Chennai HQ Campus (Exact Match)',
      salaryMatch: '₹22,00,000 vs ₹18-28 LPA (Within Budget)',
      availability: 'Immediate to 15 Days',
      candidateCount: 38,
      alertChannel: 'Email + In-App',
      alertStatus: 'Sent',
      alertDate: '12-Oct-2026 02:30 PM',
      creditsUsed: 38,
    },
    {
      id: 'MATCH-ALT-002',
      job: 'Lead Product Designer (JOB-2026-002)',
      matchScore: 91,
      skillsMatch: 'Figma, Design Systems, UX Research (3/4 Matched)',
      experienceMatch: '6.0 Yrs (Required: 5 - 9 Yrs)',
      locationMatch: 'Bengaluru Center (Exact Match)',
      salaryMatch: '₹24,00,000 vs ₹20-30 LPA (Within Budget)',
      availability: '30 Days Notice',
      candidateCount: 24,
      alertChannel: 'Email',
      alertStatus: 'Sent',
      alertDate: '11-Oct-2026 11:15 AM',
      creditsUsed: 24,
    },
    {
      id: 'MATCH-ALT-003',
      job: 'DevOps & Cloud Architect (JOB-2026-004)',
      matchScore: 88,
      skillsMatch: 'Kubernetes, AWS Cloud, Terraform, Docker (4/5 Matched)',
      experienceMatch: '7.5 Yrs (Required: 6 - 10 Yrs)',
      locationMatch: 'Remote - India (Exact Match)',
      salaryMatch: '₹28,00,000 vs ₹25-35 LPA (Within Budget)',
      availability: '30 Days Notice',
      candidateCount: 19,
      alertChannel: 'Email + Push',
      alertStatus: 'Scheduled',
      alertDate: '13-Oct-2026 10:00 AM',
      creditsUsed: 19,
    },
    {
      id: 'MATCH-ALT-004',
      job: 'Senior Technical Recruiter (JOB-2026-003)',
      matchScore: 85,
      skillsMatch: 'Tech Sourcing, Screening, Offer Negotiation (3/3 Matched)',
      experienceMatch: '4.0 Yrs (Required: 3 - 6 Yrs)',
      locationMatch: 'Chennai HQ Campus (Exact Match)',
      salaryMatch: '₹12,00,000 vs ₹10-15 LPA (Within Budget)',
      availability: 'Immediate',
      candidateCount: 45,
      alertChannel: 'In-App + Push',
      alertStatus: 'Sent',
      alertDate: '10-Oct-2026 04:45 PM',
      creditsUsed: 45,
    },
    {
      id: 'MATCH-ALT-005',
      job: 'Enterprise Account Executive (JOB-2026-005)',
      matchScore: 78,
      skillsMatch: 'B2B SaaS Sales, Enterprise Demos (2/3 Matched)',
      experienceMatch: '4.5 Yrs (Required: 4 - 7 Yrs)',
      locationMatch: 'Mumbai Office (Exact Match)',
      salaryMatch: '₹16,00,000 vs ₹14-22 LPA (Within Budget)',
      availability: '45 Days Notice',
      candidateCount: 15,
      alertChannel: 'Email',
      alertStatus: 'Draft',
      alertDate: 'Not Dispatched',
      creditsUsed: 0,
    },
    {
      id: 'MATCH-ALT-006',
      job: 'Finance & Payroll Specialist (JOB-2026-006)',
      matchScore: 72,
      skillsMatch: 'Payroll Processing, TDS, GST (2/4 Matched)',
      experienceMatch: '3.0 Yrs (Required: 3 - 5 Yrs)',
      locationMatch: 'Chennai HQ Campus (Exact Match)',
      salaryMatch: '₹10,00,000 vs ₹8-12 LPA (Within Budget)',
      availability: '60 Days Notice',
      candidateCount: 12,
      alertChannel: 'In-App',
      alertStatus: 'Failed',
      alertDate: '09-Oct-2026 06:10 PM',
      creditsUsed: 0,
    },
  ]);

  // Views: 'list' | 'add' | 'edit'
  const [currentView, setCurrentView] = useState('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [toastMessage, setToastMessage] = useState('');

  // Form State
  const initialFormState = {
    id: '',
    job: 'Senior Frontend Engineer (JOB-2026-001)',
    matchScore: 90,
    skillsMatch: '',
    experienceMatch: '',
    locationMatch: '',
    salaryMatch: '',
    availability: 'Immediate to 30 Days',
    candidateCount: 25,
    alertChannel: 'Email + In-App',
    alertStatus: 'Draft',
    alertDate: '',
    creditsUsed: 25,
  };

  const [formData, setFormData] = useState(initialFormState);

  // Toast
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3500);
  };

  // Filter alerts
  const filteredAlerts = alerts.filter((item) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      item.job.toLowerCase().includes(term) ||
      item.skillsMatch.toLowerCase().includes(term) ||
      item.locationMatch.toLowerCase().includes(term) ||
      item.alertChannel.toLowerCase().includes(term) ||
      item.availability.toLowerCase().includes(term);

    const matchesStatus =
      statusFilter === 'All' ? true : item.alertStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Counters
  const totalCount = alerts.length;
  const sentCount = alerts.filter((a) => a.alertStatus === 'Sent').length;
  const scheduledCount = alerts.filter((a) => a.alertStatus === 'Scheduled').length;
  const draftCount = alerts.filter((a) => a.alertStatus === 'Draft').length;
  const totalCredits = alerts.reduce((acc, curr) => acc + (curr.creditsUsed || 0), 0);

  // Open Add Form
  const handleOpenAdd = () => {
    const nowStr = new Date().toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
    setFormData({
      ...initialFormState,
      id: `MATCH-ALT-${Date.now()}`,
      alertDate: nowStr,
    });
    setCurrentView('add');
  };

  // Open Edit Form
  const handleOpenEdit = (item) => {
    setFormData({ ...item });
    setCurrentView('edit');
  };

  // Back to list
  const handleBackToList = () => {
    setCurrentView('list');
    setFormData(initialFormState);
  };

  // Save Alert
  const handleSaveAlert = (e) => {
    e.preventDefault();

    if (!formData.job.trim()) {
      alert('Please select a Job');
      return;
    }
    if (!formData.skillsMatch.trim()) {
      alert('Please specify Skills Match criteria');
      return;
    }
    if (!formData.locationMatch.trim()) {
      alert('Please specify Location Match criteria');
      return;
    }

    const nowStr = new Date().toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    if (currentView === 'add') {
      const newAlert = {
        ...formData,
        id: `MATCH-ALT-${Date.now()}`,
        alertDate: formData.alertStatus === 'Sent' ? nowStr : (formData.alertDate || 'Not Dispatched'),
        creditsUsed: formData.alertStatus === 'Sent' ? formData.candidateCount : (formData.alertStatus === 'Scheduled' ? formData.candidateCount : 0),
      };
      setAlerts([newAlert, ...alerts]);
      showToast(`Candidate alert for "${newAlert.job}" created successfully.`);
    } else if (currentView === 'edit') {
      const updatedAlert = {
        ...formData,
        creditsUsed: formData.alertStatus === 'Sent' ? formData.candidateCount : formData.creditsUsed,
      };
      setAlerts(alerts.map((a) => (a.id === formData.id ? updatedAlert : a)));
      showToast(`Alert configuration updated.`);
    }

    handleBackToList();
  };

  // Quick Dispatch / Resend
  const handleQuickDispatch = (item) => {
    const nowStr = new Date().toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
    setAlerts(
      alerts.map((a) =>
        a.id === item.id
          ? {
              ...a,
              alertStatus: 'Sent',
              alertDate: nowStr,
              creditsUsed: a.candidateCount,
            }
          : a
      )
    );
    showToast(`Alert dispatched to ${item.candidateCount} matching candidates!`);
  };

  // Delete Alert
  const handleDeleteAlert = (item) => {
    if (window.confirm(`Are you sure you want to delete alert for "${item.job}"?`)) {
      setAlerts(alerts.filter((a) => a.id !== item.id));
      showToast('Matching alert record deleted.');
    }
  };

  // Helper score pill
  const getScoreClass = (score) => {
    if (score >= 90) return 'high';
    if (score >= 80) return 'mid';
    return 'fair';
  };

  // Helper status pill
  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'sent':
        return 'sent';
      case 'scheduled':
        return 'scheduled';
      case 'draft':
        return 'draft';
      default:
        return 'failed';
    }
  };

  return (
    <div className="matching-page-container">
      {/* =========================================================================
          MODULE HEADER
          ========================================================================= */}
      <div className="matching-page-header">
        {currentView === 'list' ? (
          <>
            <div className="matching-header-left">
              <h1 className="matching-page-title">Candidate Matching & Alerts</h1>
              
            </div>
            <button
              type="button"
              className="btn-add-matching"
              onClick={handleOpenAdd}
            >
              <Plus size={16} />
              Create Matching Alert
            </button>
          </>
        ) : (
          <div className="matching-inpage-header-left">
            <button
              type="button"
              className="btn-back-matching"
              onClick={handleBackToList}
            >
              <ArrowLeft size={16} />
              Back to Alerts List
            </button>
            <div>
              <h1 className="matching-page-title">
                {currentView === 'add'
                  ? 'Create Candidate Matching Alert'
                  : 'Edit Matching Alert Configuration'}
              </h1>
              <p className="matching-subtitle">
                Configure job matching parameters and candidate dispatch channel
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Toast Alert */}
      {toastMessage && (
        <div className="matching-toast-alert">
          <CheckCircle2 size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* =========================================================================
          MAIN CARD CONTAINER
          ========================================================================= */}
      <div className="matching-main-card">
        {/* =======================================================================
            VIEW 1: DIRECTORY TABLE (Shown when currentView === 'list')
            ======================================================================= */}
        {currentView === 'list' && (
          <>
            {/* Toolbar: Search, Status Filter & Count Chips */}
            <div className="matching-toolbar">
              <div className="matching-toolbar-left">
                <div className="matching-search-box">
                  <Search size={16} style={{ color: 'var(--text-muted)' }} />
                  <input
                    type="text"
                    placeholder="Search by Job, skills, location, channel or availability..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="matching-search-input"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="matching-filter-select"
                >
                  <option value="All">All Status</option>
                  <option value="Sent">Sent</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="Draft">Draft</option>
                  <option value="Failed">Failed</option>
                </select>
              </div>

              <div className="matching-toolbar-stats">
                <span className="matching-stat-chip">Total: {totalCount}</span>
                <span className="matching-stat-chip sent">Sent: {sentCount}</span>
                <span className="matching-stat-chip scheduled">Scheduled: {scheduledCount}</span>
                <span className="matching-stat-chip draft">Draft: {draftCount}</span>
                <span className="matching-stat-chip credits">Credits Used: {totalCredits}</span>
              </div>
            </div>

            {/* Modern Data Table */}
            <div className="matching-table-wrapper">
              <table className="matching-table">
                <thead>
                  <tr>
                    <th style={{ width: '55px', textAlign: 'center' }}>S.NO</th>
                    <th>Selected Job</th>
                    <th>Match Score</th>
                    <th>Skills Match</th>
                    <th>Experience Match</th>
                    <th>Location Match</th>
                    <th>Salary Match</th>
                    <th>Availability</th>
                    <th>Candidate Count</th>
                    <th>Alert Channel</th>
                    <th>Alert Status</th>
                    <th>Alert Date</th>
                    <th>Credits Used</th>
                    <th style={{ textAlign: 'center' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAlerts.length === 0 ? (
                    <tr>
                      <td colSpan={14} className="matching-empty-state">
                        <div className="matching-empty-icon">🎯</div>
                        <p style={{ fontWeight: 600, margin: '0 0 0.25rem' }}>
                          No matching alerts found
                        </p>
                        <p style={{ fontSize: '0.8rem', margin: 0 }}>
                          Try adjusting your search criteria or create a new candidate alert
                        </p>
                      </td>
                    </tr>
                  ) : (
                    filteredAlerts.map((item, index) => (
                      <tr key={item.id}>
                        {/* S.NO */}
                        <td style={{ fontWeight: 600, color: 'var(--text-muted)', textAlign: 'center' }}>
                          {index + 1}
                        </td>

                        {/* 1. Job: Selected job */}
                        <td>
                          <div className="match-job-cell">
                            <span className="match-job-title">{item.job.split(' (')[0]}</span>
                            <span className="match-job-id">
                              {item.job.includes('(') ? item.job.split('(')[1].replace(')', '') : item.job}
                            </span>
                          </div>
                        </td>

                        {/* 2. Match Score */}
                        <td>
                          <span className={`match-score-pill ${getScoreClass(item.matchScore)}`}>
                            <Sparkles size={13} />
                            {item.matchScore}%
                          </span>
                        </td>

                        {/* 3. Skills Match */}
                        <td>
                          <div className="match-skills-cell">
                            <span className="match-skills-primary">
                              {item.skillsMatch.split(' (')[0]}
                            </span>
                            <span className="match-skills-ratio">
                              {item.skillsMatch.includes('(') ? `(${item.skillsMatch.split('(')[1]}` : ''}
                            </span>
                          </div>
                        </td>

                        {/* 4. Experience Match */}
                        <td style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '0.83rem' }}>
                          {item.experienceMatch}
                        </td>

                        {/* 5. Location Match */}
                        <td style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '0.83rem' }}>
                          {item.locationMatch}
                        </td>

                        {/* 6. Salary Match */}
                        <td style={{ color: '#0f766e', fontWeight: 600, fontSize: '0.83rem' }}>
                          {item.salaryMatch}
                        </td>

                        {/* 7. Availability */}
                        <td style={{ fontSize: '0.82rem', color: 'var(--text-main)', fontWeight: 600 }}>
                          {item.availability}
                        </td>

                        {/* 8. Candidate Count */}
                        <td>
                          <span className="candidate-count-badge">
                            👥 {item.candidateCount} Candidates
                          </span>
                        </td>

                        {/* 9. Alert Channel */}
                        <td>
                          <span className="channel-pill email">
                            {item.alertChannel}
                          </span>
                        </td>

                        {/* 10. Alert Status */}
                        <td>
                          <span className={`alert-status-pill ${getStatusClass(item.alertStatus)}`}>
                            <span className="status-dot"></span>
                            {item.alertStatus}
                          </span>
                        </td>

                        {/* 11. Alert Date */}
                        <td style={{ fontSize: '0.82rem', color: 'var(--text-main)' }}>
                          {item.alertDate || '—'}
                        </td>

                        {/* 12. Credits Used */}
                        <td>
                          <span className="credits-used-badge">
                            ⚡ {item.creditsUsed} Credits
                          </span>
                        </td>

                        {/* Actions */}
                        <td>
                          <div className="match-row-actions" style={{ justifyContent: 'center' }}>
                            <button
                              type="button"
                              className="action-icon-btn edit"
                              title="Edit Alert Configuration"
                              onClick={() => handleOpenEdit(item)}
                            >
                              <Edit2 size={15} />
                            </button>

                            {item.alertStatus !== 'Sent' && (
                              <button
                                type="button"
                                className="action-icon-btn trigger"
                                title="Send Alert Now"
                                onClick={() => handleQuickDispatch(item)}
                              >
                                <Send size={15} />
                              </button>
                            )}

                            <button
                              type="button"
                              className="action-icon-btn delete"
                              title="Delete Alert"
                              onClick={() => handleDeleteAlert(item)}
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="matching-table-footer">
              <div>
                Showing 1 to {filteredAlerts.length} of {alerts.length} Entries
              </div>

              <div className="matching-pagination-controls">
                <button type="button" className="btn-matching-page" disabled>
                  <ChevronLeft size={14} />
                </button>
                <button type="button" className="btn-matching-page active">
                  1
                </button>
                <button type="button" className="btn-matching-page" disabled>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </>
        )}

        {/* =======================================================================
            VIEW 2: IN-PAGE ADD / EDIT FORM (NO MODALS / POPUPS!)
            Strictly and only the 12 requested fields
            ======================================================================= */}
        {currentView !== 'list' && (
          <form
            id="inpage-matching-form"
            onSubmit={handleSaveAlert}
            className="inpage-matching-form"
          >
            {/* SECTION 1: JOB SELECTION & MATCH CRITERIA */}
            <div className="inpage-section-box">
              <div className="inpage-section-header">
                1. JOB SELECTION & MATCH THRESHOLD
              </div>

              <div className="inpage-grid-3col">
                {/* 1. Job */}
                <div className="form-field-group">
                  <label>Selected Job *</label>
                  <select
                    value={formData.job}
                    onChange={(e) => setFormData({ ...formData, job: e.target.value })}
                    className="form-control-select"
                    required
                  >
                    <option value="Senior Frontend Engineer (JOB-2026-001)">Senior Frontend Engineer (JOB-2026-001)</option>
                    <option value="Lead Product Designer (JOB-2026-002)">Lead Product Designer (JOB-2026-002)</option>
                    <option value="Senior Technical Recruiter (JOB-2026-003)">Senior Technical Recruiter (JOB-2026-003)</option>
                    <option value="DevOps & Cloud Architect (JOB-2026-004)">DevOps & Cloud Architect (JOB-2026-004)</option>
                    <option value="Enterprise Account Executive (JOB-2026-005)">Enterprise Account Executive (JOB-2026-005)</option>
                    <option value="Finance & Payroll Specialist (JOB-2026-006)">Finance & Payroll Specialist (JOB-2026-006)</option>
                  </select>
                </div>

                {/* 2. Match Score */}
                <div className="form-field-group">
                  <label>Minimum Match Score (%) *</label>
                  <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center' }}>
                    <input
                      type="number"
                      min="50"
                      max="100"
                      value={formData.matchScore}
                      onChange={(e) =>
                        setFormData({ ...formData, matchScore: parseInt(e.target.value) || 75 })
                      }
                      className="form-control-input"
                      required
                    />
                    <span style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '0.9rem' }}>
                      {formData.matchScore}% Target
                    </span>
                  </div>
                </div>

                {/* 8. Candidate Count */}
                <div className="form-field-group">
                  <label>Eligible Candidate Count *</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.candidateCount}
                    onChange={(e) => {
                      const count = parseInt(e.target.value) || 1;
                      setFormData({
                        ...formData,
                        candidateCount: count,
                        creditsUsed: count,
                      });
                    }}
                    className="form-control-input"
                    required
                  />
                </div>
              </div>
            </div>

            {/* SECTION 2: MATCHING PARAMETERS */}
            <div className="inpage-section-box">
              <div className="inpage-section-header">
                2. MATCHING PARAMETERS & FILTERS
              </div>

              <div className="inpage-grid-2col">
                {/* 3. Skills Match */}
                <div className="form-field-group">
                  <label>Skills Match (Required & Matching Skills) *</label>
                  <input
                    type="text"
                    value={formData.skillsMatch}
                    onChange={(e) =>
                      setFormData({ ...formData, skillsMatch: e.target.value })
                    }
                    placeholder="e.g. React.js, TypeScript, Next.js, Redux (4/5 Matched)"
                    className="form-control-input"
                    required
                  />
                </div>

                {/* 4. Experience Match */}
                <div className="form-field-group">
                  <label>Experience Match (Required vs Candidate Experience) *</label>
                  <input
                    type="text"
                    value={formData.experienceMatch}
                    onChange={(e) =>
                      setFormData({ ...formData, experienceMatch: e.target.value })
                    }
                    placeholder="e.g. 5.5 Yrs (Required: 4 - 8 Yrs)"
                    className="form-control-input"
                    required
                  />
                </div>
              </div>

              <div className="inpage-grid-3col">
                {/* 5. Location Match */}
                <div className="form-field-group">
                  <label>Location Match *</label>
                  <input
                    type="text"
                    value={formData.locationMatch}
                    onChange={(e) =>
                      setFormData({ ...formData, locationMatch: e.target.value })
                    }
                    placeholder="e.g. Chennai HQ Campus (Exact Match)"
                    className="form-control-input"
                    required
                  />
                </div>

                {/* 6. Salary Match */}
                <div className="form-field-group">
                  <label>Salary Match (Expected vs Offered) *</label>
                  <input
                    type="text"
                    value={formData.salaryMatch}
                    onChange={(e) =>
                      setFormData({ ...formData, salaryMatch: e.target.value })
                    }
                    placeholder="e.g. ₹22,00,000 vs ₹18-28 LPA (Within Budget)"
                    className="form-control-input"
                    required
                  />
                </div>

                {/* 7. Availability */}
                <div className="form-field-group">
                  <label>Availability (Notice Period) *</label>
                  <select
                    value={formData.availability}
                    onChange={(e) =>
                      setFormData({ ...formData, availability: e.target.value })
                    }
                    className="form-control-select"
                  >
                    <option value="Immediate">Immediate</option>
                    <option value="Immediate to 15 Days">Immediate to 15 Days</option>
                    <option value="30 Days Notice">30 Days Notice</option>
                    <option value="45 Days Notice">45 Days Notice</option>
                    <option value="60 Days Notice">60 Days Notice</option>
                    <option value="Serving Notice">Serving Notice</option>
                  </select>
                </div>
              </div>
            </div>

            {/* SECTION 3: ALERT CHANNEL & DISPATCH */}
            <div className="inpage-section-box">
              <div className="inpage-section-header">
                3. ALERT CHANNEL & DISPATCH CONFIGURATION
              </div>

              <div className="inpage-grid-4col">
                {/* 9. Alert Channel */}
                <div className="form-field-group">
                  <label>Alert Channel *</label>
                  <select
                    value={formData.alertChannel}
                    onChange={(e) =>
                      setFormData({ ...formData, alertChannel: e.target.value })
                    }
                    className="form-control-select"
                  >
                    <option value="Email + In-App">Email + In-App</option>
                    <option value="Email">Email Only</option>
                    <option value="In-App">In-App Notification</option>
                    <option value="Push Notification">Push Notification</option>
                    <option value="Email + Push">Email + Push</option>
                  </select>
                </div>

                {/* 10. Alert Status */}
                <div className="form-field-group">
                  <label>Alert Status *</label>
                  <select
                    value={formData.alertStatus}
                    onChange={(e) =>
                      setFormData({ ...formData, alertStatus: e.target.value })
                    }
                    className="form-control-select"
                  >
                    <option value="Draft">Draft</option>
                    <option value="Scheduled">Scheduled</option>
                    <option value="Sent">Sent (Immediate Dispatch)</option>
                    <option value="Failed">Failed</option>
                  </select>
                </div>

                {/* 11. Alert Date */}
                <div className="form-field-group">
                  <label>Alert Date / Schedule Time</label>
                  <input
                    type="text"
                    value={formData.alertDate}
                    onChange={(e) =>
                      setFormData({ ...formData, alertDate: e.target.value })
                    }
                    placeholder="e.g. 12-Oct-2026 03:30 PM"
                    className="form-control-input"
                  />
                </div>

                {/* 12. Credits Used */}
                <div className="form-field-group">
                  <label>Credits to Consume (Plan Credits)</label>
                  <input
                    type="number"
                    value={formData.creditsUsed}
                    readOnly
                    className="form-control-input readonly"
                  />
                </div>
              </div>
            </div>

            {/* Form Footer */}
            <div className="inpage-form-footer">
              <button
                type="button"
                className="btn-cancel-matching"
                onClick={handleBackToList}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-save-matching"
              >
                <Save size={16} />
                {currentView === 'add' ? 'Save & Schedule Alert' : 'Update Alert Configuration'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
