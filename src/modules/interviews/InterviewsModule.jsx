import React, { useState } from 'react';
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Save,
  CheckCircle2,
} from 'lucide-react';
import { FieldError } from '../../components/common/FieldError/FieldError';
import {
  validateName,
  validateRequired,
  sanitizeNameInput,
} from '../../utils/validation';
import './InterviewsModule.css';

export const InterviewsModule = () => {
  const [errors, setErrors] = useState({});
  // STRICTLY and ONLY the 14 user-requested fields:
  // 1. Interview ID: Unique interview reference.
  // 2. Candidate: Candidate reference.
  // 3. Job: Related job.
  // 4. Interview Round: HR, Technical, Managerial, Final, etc.
  // 5. Interview Type: Online, Phone, In-person.
  // 6. Date / Time: Interview date and time.
  // 7. Time Zone: Interview timezone.
  // 8. Meeting Link / Location: Online link or physical location.
  // 9. Interviewer / Panel: Assigned interviewer(s).
  // 10. Interview Status: Scheduled, Accepted, Reschedule Requested, Completed, Cancelled, No Show.
  // 11. Feedback: Interview feedback.
  // 12. Rating: Interview rating.
  // 13. Recommendation: Hire, Hold, Reject.
  // 14. Next Step: Next interview/action, if applicable.

  const [interviews, setInterviews] = useState([
    {
      id: 'INT-2026-001',
      candidate: 'Dharshini (CAN-1042)',
      job: 'Senior Frontend Engineer (JOB-2026-001)',
      interviewRound: 'Technical',
      interviewType: 'Online',
      dateTime: '2026-10-14 10:30 AM',
      timeZone: 'IST (UTC+05:30)',
      meetingLinkLocation: 'https://meet.google.com/hrc-admn-xyz',
      interviewerPanel: 'Sundar Raman (Eng Lead)',
      interviewStatus: 'Scheduled',
      feedback: 'Candidate displayed deep architecture intuition in React 19 concurrent features and CSS optimization.',
      rating: '4.5 / 5',
      recommendation: 'Hire',
      nextStep: 'Schedule Managerial Round with VP Engineering',
    },
    {
      id: 'INT-2026-002',
      candidate: 'Anand Kumar (CAN-1043)',
      job: 'Lead Product Designer (JOB-2026-002)',
      interviewRound: 'Managerial',
      interviewType: 'Online',
      dateTime: '2026-10-14 02:00 PM',
      timeZone: 'IST (UTC+05:30)',
      meetingLinkLocation: 'https://teams.microsoft.com/l/meetup-join/des-rev-002',
      interviewerPanel: 'Karthik Raja (Design Head), Anitha Murugesan (Director)',
      interviewStatus: 'Accepted',
      feedback: 'Excellent design systems and cross-functional product leadership mindset. Fits company culture.',
      rating: '4.8 / 5',
      recommendation: 'Hire',
      nextStep: 'Prepare Offer Letter & Compensation Structure',
    },
    {
      id: 'INT-2026-003',
      candidate: 'Karthik V (CAN-1045)',
      job: 'DevOps & Cloud Architect (JOB-2026-004)',
      interviewRound: 'Technical',
      interviewType: 'In-person',
      dateTime: '2026-10-15 11:00 AM',
      timeZone: 'IST (UTC+05:30)',
      meetingLinkLocation: 'Admin Tower, Conference Room 4B, Chennai Campus',
      interviewerPanel: 'Vigneshwaran M (Principal Architect)',
      interviewStatus: 'Reschedule Requested',
      feedback: 'Awaiting rescheduled session due to candidate official travel commitments.',
      rating: '3.5 / 5',
      recommendation: 'Hold',
      nextStep: 'Confirm alternate availability slot for next Monday',
    },
    {
      id: 'INT-2026-004',
      candidate: 'Deepa Rajan (CAN-1046)',
      job: 'Senior Technical Recruiter (JOB-2026-003)',
      interviewRound: 'HR',
      interviewType: 'Phone',
      dateTime: '2026-10-13 04:30 PM',
      timeZone: 'IST (UTC+05:30)',
      meetingLinkLocation: '+91 98401 23456 (HR Direct Line)',
      interviewerPanel: 'Abinaya R (Senior HR Manager)',
      interviewStatus: 'Completed',
      feedback: 'High proficiency in niche tech talent sourcing, pipeline metrics, and employer branding.',
      rating: '4.2 / 5',
      recommendation: 'Hire',
      nextStep: 'Schedule Final Cultural Fit Round with HR Director',
    },
    {
      id: 'INT-2026-005',
      candidate: 'Venkatesh S (CAN-1047)',
      job: 'Enterprise Account Executive (JOB-2026-005)',
      interviewRound: 'Final',
      interviewType: 'Online',
      dateTime: '2026-10-12 11:30 AM',
      timeZone: 'IST (UTC+05:30)',
      meetingLinkLocation: 'https://zoom.us/j/98127391823',
      interviewerPanel: 'Rajeshwaran K (VP Sales)',
      interviewStatus: 'Completed',
      feedback: 'Impressive track record of SaaS ARR deal closures, consultative selling and territory expansion.',
      rating: '4.6 / 5',
      recommendation: 'Hire',
      nextStep: 'Release Formal Offer Letter',
    },
    {
      id: 'INT-2026-006',
      candidate: 'Subhashini M (CAN-1048)',
      job: 'Senior Frontend Engineer (JOB-2026-001)',
      interviewRound: 'Technical',
      interviewType: 'Online',
      dateTime: '2026-10-11 03:00 PM',
      timeZone: 'IST (UTC+05:30)',
      meetingLinkLocation: 'https://meet.google.com/xyz-fe-eval',
      interviewerPanel: 'Sundar Raman (Eng Lead)',
      interviewStatus: 'Cancelled',
      feedback: 'Candidate accepted competing offer prior to technical assessment round.',
      rating: '2.0 / 5',
      recommendation: 'Reject',
      nextStep: 'Archive Candidate Application & Update Pool',
    },
    {
      id: 'INT-2026-007',
      candidate: 'Manoj Krishnan (CAN-1049)',
      job: 'DevOps & Cloud Architect (JOB-2026-004)',
      interviewRound: 'HR',
      interviewType: 'Online',
      dateTime: '2026-10-10 10:00 AM',
      timeZone: 'IST (UTC+05:30)',
      meetingLinkLocation: 'https://meet.google.com/hrc-admn-int',
      interviewerPanel: 'Abinaya R (Senior HR Manager)',
      interviewStatus: 'No Show',
      feedback: 'Candidate did not attend interview session or provide prior reschedule notification.',
      rating: '1.0 / 5',
      recommendation: 'Reject',
      nextStep: 'Mark record as No Show and close recruitment ticket',
    },
  ]);

  // Views: 'list' | 'form'
  const [currentView, setCurrentView] = useState('list');
  const [editingId, setEditingId] = useState(null);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [roundFilter, setRoundFilter] = useState('All');
  const [toastMessage, setToastMessage] = useState('');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Form State (strictly the 14 requested fields)
  const initialFormState = {
    id: '',
    candidate: '',
    job: '',
    interviewRound: 'Technical',
    interviewType: 'Online',
    dateTime: '',
    timeZone: 'IST (UTC+05:30)',
    meetingLinkLocation: '',
    interviewerPanel: '',
    interviewStatus: 'Scheduled',
    feedback: '',
    rating: '4.0 / 5',
    recommendation: 'Hire',
    nextStep: '',
  };

  const [formData, setFormData] = useState(initialFormState);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3500);
  };

  const handleOpenAdd = () => {
    const nextNum = interviews.length + 1;
    const generatedId = `INT-2026-${String(nextNum).padStart(3, '0')}`;
    setFormData({
      ...initialFormState,
      id: generatedId,
      candidate: '',
      job: 'JOB-2026-001 (Senior Frontend Engineer)',
      meetingLinkLocation: 'https://meet.google.com/hms-rec-int',
      interviewerPanel: 'Sundar Raman (Lead Engineer)',
      dateTime: '2026-10-16 11:00 AM',
      timeZone: 'IST (UTC+05:30)',
      interviewRound: 'Technical Round 1',
      interviewType: 'Online',
      interviewStatus: 'Scheduled',
    });
    setEditingId(null);
    setErrors({});
    setCurrentView('form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenEdit = (item) => {
    setFormData({ ...item });
    setEditingId(item.id);
    setErrors({});
    setCurrentView('form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelForm = () => {
    setErrors({});
    setCurrentView('list');
    setEditingId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInputChange = (field, value) => {
    let sanitized = value;
    if (field === 'candidate') {
      sanitized = sanitizeNameInput(value);
    }
    setFormData((prev) => ({ ...prev, [field]: sanitized }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleSaveInterview = (e) => {
    e.preventDefault();
    const newErrors = {};

    const candErr = validateName(formData.candidate, 'Candidate reference', true);
    if (candErr) newErrors.candidate = candErr;

    const jobErr = validateRequired(formData.job, 'Related job');
    if (jobErr) newErrors.job = jobErr;

    const dtErr = validateRequired(formData.dateTime, 'Interview date / time');
    if (dtErr) newErrors.dateTime = dtErr;

    const locErr = validateRequired(formData.meetingLinkLocation, 'Meeting link / location');
    if (locErr) newErrors.meetingLinkLocation = locErr;

    const panelErr = validateRequired(formData.interviewerPanel, 'Interviewer / panel');
    if (panelErr) newErrors.interviewerPanel = panelErr;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      window.scrollTo({ top: 120, behavior: 'smooth' });
      return;
    }

    setErrors({});

    if (editingId) {
      setInterviews((prev) =>
        prev.map((item) => (item.id === editingId ? { ...formData } : item))
      );
      showToast(`Interview schedule "${formData.id}" updated successfully!`);
    } else {
      setInterviews((prev) => [formData, ...prev]);
      showToast(`New interview "${formData.id}" scheduled successfully!`);
    }

    setCurrentView('list');
    setEditingId(null);
  };

  const handleDelete = (id, candidateName) => {
    if (window.confirm(`Are you sure you want to remove interview schedule for "${candidateName}" (${id})?`)) {
      setInterviews((prev) => prev.filter((item) => item.id !== id));
      showToast(`Interview schedule "${id}" deleted.`);
    }
  };

  // Filter & Search Logic
  const filteredInterviews = interviews.filter((item) => {
    const matchesSearch =
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.candidate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.job.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.interviewerPanel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.meetingLinkLocation.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === 'All' || item.interviewStatus === statusFilter;

    const matchesRound =
      roundFilter === 'All' || item.interviewRound === roundFilter;

    return matchesSearch && matchesStatus && matchesRound;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredInterviews.length / itemsPerPage) || 1;
  const paginatedInterviews = filteredInterviews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusClass = (status) => {
    switch (status) {
      case 'Scheduled':
        return 'scheduled';
      case 'Accepted':
        return 'accepted';
      case 'Completed':
        return 'completed';
      case 'Reschedule Requested':
        return 'reschedule-requested';
      case 'Cancelled':
        return 'cancelled';
      case 'No Show':
        return 'no-show';
      default:
        return '';
    }
  };

  const getRecommendationClass = (rec) => {
    switch (rec) {
      case 'Hire':
        return 'hire';
      case 'Hold':
        return 'hold';
      case 'Reject':
        return 'reject';
      default:
        return '';
    }
  };

  return (
    <div className="interviews-page-container">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="interviews-toast-alert">
          <CheckCircle2 size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Page Header */}
      <div className="interviews-page-header">
        {currentView === 'list' ? (
          <>
            <div>
              <h1 className="interviews-page-title">Interviews</h1>
            </div>
            <button
              className="btn-add-interview"
              onClick={handleOpenAdd}
              id="btn-schedule-interview"
            >
              <Plus size={16} strokeWidth={2.5} />
              <span>Schedule Interview</span>
            </button>
          </>
        ) : (
          <>
            <div>
              <h1 className="interviews-page-title">
                {editingId ? `Edit Interview: ${formData.id}` : 'Schedule New Interview'}
              </h1>
            </div>

            <button
              type="button"
              className="btn-back-to-list"
              onClick={handleCancelForm}
              title="Back to List"
            >
              <ArrowLeft size={16} strokeWidth={2.5} />
              <span>Back to List</span>
            </button>
          </>
        )}
      </div>

      {/* Main Single Card Container */}
      <div className="interviews-main-card">
        {currentView === 'list' ? (
          <>
            {/* Toolbar: Search (Left) + Filters (Right) */}
            <div className="interviews-toolbar">
              <div className="interviews-search-box">
                <Search size={16} className="text-muted" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="interviews-search-input"
                />
              </div>

              <div className="interviews-toolbar-right">
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="interviews-filter-select"
                >
                  <option value="All">All Statuses</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Reschedule Requested">Reschedule Requested</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="No Show">No Show</option>
                </select>

                <select
                  value={roundFilter}
                  onChange={(e) => {
                    setRoundFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="interviews-filter-select"
                >
                  <option value="All">All Rounds</option>
                  <option value="HR">HR</option>
                  <option value="Technical">Technical</option>
                  <option value="Managerial">Managerial</option>
                  <option value="Final">Final</option>
                </select>
              </div>
            </div>

            {/* Modern Data Table */}
            <div className="interviews-table-wrapper">
              <table className="interviews-table">
                <thead>
                  <tr>
                    <th>S.NO</th>
                    <th>INTERVIEW ID & CANDIDATE</th>
                    <th>JOB</th>
                    <th>ROUND & TYPE</th>
                    <th>DATE / TIME & TIME ZONE</th>
                    <th>MEETING LINK / LOCATION</th>
                    <th>INTERVIEWER / PANEL</th>
                    <th>STATUS</th>
                    <th>RATING & RECOMMENDATION</th>
                    <th>FEEDBACK</th>
                    <th>NEXT STEP</th>
                    <th style={{ textAlign: 'center' }}>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedInterviews.length > 0 ? (
                    paginatedInterviews.map((item, index) => {
                      const serialNumber = (currentPage - 1) * itemsPerPage + index + 1;
                      const isUrl = item.meetingLinkLocation.startsWith('http');
                      return (
                        <tr key={item.id}>
                          {/* S.NO */}
                          <td style={{ fontWeight: 700, color: '#64748b' }}>
                            {serialNumber}
                          </td>

                          {/* Interview ID & Candidate */}
                          <td>
                            <div className="intv-cand-cell">
                              <span className="intv-cand-name">{item.candidate}</span>
                              <span className="intv-id-badge">{item.id}</span>
                            </div>
                          </td>

                          {/* Related Job */}
                          <td>
                            <div className="intv-job-cell">
                              <span className="intv-job-title">{item.job}</span>
                            </div>
                          </td>

                          {/* Interview Round & Type */}
                          <td>
                            <div className="intv-round-cell">
                              <span className="round-pill">{item.interviewRound} Round</span>
                              <span className="type-sub-badge">{item.interviewType}</span>
                            </div>
                          </td>

                          {/* Date / Time & Time Zone */}
                          <td>
                            <div className="intv-time-cell">
                              <span className="intv-time-text">{item.dateTime}</span>
                              <span className="intv-tz-text">{item.timeZone}</span>
                            </div>
                          </td>

                          {/* Meeting Link / Location */}
                          <td>
                            <div className="intv-loc-cell" title={item.meetingLinkLocation}>
                              {isUrl ? (
                                <a
                                  href={item.meetingLinkLocation}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="intv-link-text"
                                >
                                  {item.meetingLinkLocation}
                                </a>
                              ) : (
                                <span>{item.meetingLinkLocation}</span>
                              )}
                            </div>
                          </td>

                          {/* Interviewer / Panel */}
                          <td style={{ fontWeight: 600 }}>
                            {item.interviewerPanel}
                          </td>

                          {/* Interview Status */}
                          <td>
                            <span className={`intv-status-pill ${getStatusClass(item.interviewStatus)}`}>
                              <span className="status-dot"></span>
                              <span>{item.interviewStatus}</span>
                            </span>
                          </td>

                          {/* Rating & Recommendation */}
                          <td>
                            <div className="intv-eval-cell">
                              <span className="rating-badge">★ {item.rating}</span>
                              <span className={`recom-pill ${getRecommendationClass(item.recommendation)}`}>
                                {item.recommendation}
                              </span>
                            </div>
                          </td>

                          {/* Feedback */}
                          <td style={{ maxWidth: '280px', overflow: 'hidden', textOverflow: 'ellipsis' }} title={item.feedback}>
                            <span style={{ color: '#334155', fontSize: '0.82rem' }}>
                              {item.feedback}
                            </span>
                          </td>

                          {/* Next Step */}
                          <td style={{ fontWeight: 600, color: '#1e293b' }}>
                            {item.nextStep || '—'}
                          </td>

                          {/* Actions */}
                          <td style={{ textAlign: 'center' }}>
                            <div className="intv-row-actions">
                              <button
                                type="button"
                                className="action-icon-btn edit"
                                title="Edit Interview"
                                onClick={() => handleOpenEdit(item)}
                              >
                                <Edit2 size={15} />
                              </button>
                              <button
                                type="button"
                                className="action-icon-btn delete"
                                title="Delete Schedule"
                                onClick={() => handleDelete(item.id, item.candidate)}
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="12">
                        <div className="interviews-empty-state">
                          <p>No interviews found matching your criteria.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Table Footer Pagination */}
            <div className="interviews-table-footer">
              <div>
                Showing {filteredInterviews.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{' '}
                {Math.min(currentPage * itemsPerPage, filteredInterviews.length)} of{' '}
                {filteredInterviews.length} interviews
              </div>

              <div className="interviews-pagination-controls">
                <button
                  type="button"
                  className="btn-interviews-page"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                >
                  <ChevronLeft size={16} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    type="button"
                    className={`btn-interviews-page ${currentPage === page ? 'active' : ''}`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))}

                <button
                  type="button"
                  className="btn-interviews-page"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </>
        ) : (
          /* =====================================================================
             IN-PAGE FORM: Strictly the 14 requested fields (NO MODAL POPUP)
             ===================================================================== */
          <form onSubmit={handleSaveInterview} className="inpage-interview-form" noValidate>
            {/* Section 1: Interview Identity & Candidate Association */}
            <div className="inpage-section-box">
              <div className="inpage-section-header">
                1. INTERVIEW IDENTITY & CANDIDATE ASSOCIATION
              </div>
              <div className="inpage-grid-3col">
                {/* 1. Interview ID */}
                <div className="form-field-group">
                  <label>Interview ID *</label>
                  <input
                    type="text"
                    className="form-control-input readonly"
                    value={formData.id}
                    readOnly
                  />
                </div>

                {/* 2. Candidate */}
                <div className="form-field-group">
                  <label>Candidate Reference *</label>
                  <input
                    type="text"
                    className={`form-control-input ${errors.candidate ? 'has-error' : ''}`}
                    placeholder="e.g. Nathiya Sharma (letters only)"
                    value={formData.candidate}
                    onChange={(e) => handleInputChange('candidate', e.target.value)}
                  />
                  <FieldError error={errors.candidate} />
                </div>

                {/* 3. Job */}
                <div className="form-field-group">
                  <label>Related Job *</label>
                  <input
                    type="text"
                    className={`form-control-input ${errors.job ? 'has-error' : ''}`}
                    placeholder="e.g. Senior Frontend Engineer (JOB-2026-001)"
                    value={formData.job}
                    onChange={(e) => handleInputChange('job', e.target.value)}
                  />
                  <FieldError error={errors.job} />
                </div>
              </div>
            </div>

            {/* Section 2: Schedule & Location Details */}
            <div className="inpage-section-box">
              <div className="inpage-section-header">
                2. SCHEDULE & LOCATION DETAILS
              </div>
              <div className="inpage-grid-3col">
                {/* 4. Interview Round */}
                <div className="form-field-group">
                  <label>Interview Round *</label>
                  <select
                    className="form-control-select"
                    value={formData.interviewRound}
                    onChange={(e) => handleInputChange('interviewRound', e.target.value)}
                  >
                    <option value="HR">HR</option>
                    <option value="Technical">Technical</option>
                    <option value="Managerial">Managerial</option>
                    <option value="Final">Final</option>
                    <option value="Culture Fit">Culture Fit</option>
                    <option value="System Design">System Design</option>
                  </select>
                </div>

                {/* 5. Interview Type */}
                <div className="form-field-group">
                  <label>Interview Type *</label>
                  <select
                    className="form-control-select"
                    value={formData.interviewType}
                    onChange={(e) => handleInputChange('interviewType', e.target.value)}
                  >
                    <option value="Online">Online</option>
                    <option value="Phone">Phone</option>
                    <option value="In-person">In-person</option>
                  </select>
                </div>

                {/* 6. Date / Time */}
                <div className="form-field-group">
                  <label>Date / Time *</label>
                  <input
                    type="text"
                    className={`form-control-input ${errors.dateTime ? 'has-error' : ''}`}
                    placeholder="e.g. 2026-10-16 11:00 AM"
                    value={formData.dateTime}
                    onChange={(e) => handleInputChange('dateTime', e.target.value)}
                  />
                  <FieldError error={errors.dateTime} />
                </div>
              </div>

              <div className="inpage-grid-2col" style={{ marginTop: '0.25rem' }}>
                {/* 7. Time Zone */}
                <div className="form-field-group">
                  <label>Time Zone *</label>
                  <select
                    className="form-control-select"
                    value={formData.timeZone}
                    onChange={(e) => handleInputChange('timeZone', e.target.value)}
                  >
                    <option value="IST (UTC+05:30)">IST (UTC+05:30) - Indian Standard Time</option>
                    <option value="SGT (UTC+08:00)">SGT (UTC+08:00) - Singapore Time</option>
                    <option value="GST (UTC+04:00)">GST (UTC+04:00) - Gulf Standard Time</option>
                    <option value="BST (UTC+01:00)">BST (UTC+01:00) - British Summer Time</option>
                    <option value="EST (UTC-05:00)">EST (UTC-05:00) - Eastern Standard Time</option>
                    <option value="PST (UTC-08:00)">PST (UTC-08:00) - Pacific Standard Time</option>
                  </select>
                </div>

                {/* 8. Meeting Link / Location */}
                <div className="form-field-group">
                  <label>Meeting Link / Location *</label>
                  <input
                    type="text"
                    className={`form-control-input ${errors.meetingLinkLocation ? 'has-error' : ''}`}
                    placeholder="e.g. https://meet.google.com/xyz or Room 402, Bangalore HQ"
                    value={formData.meetingLinkLocation}
                    onChange={(e) => handleInputChange('meetingLinkLocation', e.target.value)}
                  />
                  <FieldError error={errors.meetingLinkLocation} />
                </div>
              </div>
            </div>

            {/* Section 3: Panel & Status Configuration */}
            <div className="inpage-section-box">
              <div className="inpage-section-header">
                3. PANEL & STATUS CONFIGURATION
              </div>
              <div className="inpage-grid-2col">
                {/* 9. Interviewer / Panel */}
                <div className="form-field-group">
                  <label>Interviewer / Panel *</label>
                  <input
                    type="text"
                    className={`form-control-input ${errors.interviewerPanel ? 'has-error' : ''}`}
                    placeholder="e.g. Sundar Raman (Eng Lead), Kavitha S (Staff Engineer)"
                    value={formData.interviewerPanel}
                    onChange={(e) => handleInputChange('interviewerPanel', e.target.value)}
                  />
                  <FieldError error={errors.interviewerPanel} />
                </div>

                {/* 10. Interview Status */}
                <div className="form-field-group">
                  <label>Interview Status *</label>
                  <select
                    className="form-control-select"
                    value={formData.interviewStatus}
                    onChange={(e) => handleInputChange('interviewStatus', e.target.value)}
                  >
                    <option value="Scheduled">Scheduled</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Reschedule Requested">Reschedule Requested</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="No Show">No Show</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 4: Evaluation, Feedback & Next Steps */}
            <div className="inpage-section-box">
              <div className="inpage-section-header">
                4. EVALUATION, FEEDBACK & NEXT STEPS
              </div>
              <div className="inpage-grid-3col">
                {/* 12. Rating */}
                <div className="form-field-group">
                  <label>Rating</label>
                  <select
                    className="form-control-select"
                    value={formData.rating}
                    onChange={(e) => handleInputChange('rating', e.target.value)}
                  >
                    <option value="5.0 / 5">5.0 / 5 - Exceptional</option>
                    <option value="4.8 / 5">4.8 / 5 - Excellent</option>
                    <option value="4.5 / 5">4.5 / 5 - Very Good</option>
                    <option value="4.2 / 5">4.2 / 5 - Good</option>
                    <option value="4.0 / 5">4.0 / 5 - Above Average</option>
                    <option value="3.5 / 5">3.5 / 5 - Average</option>
                    <option value="3.0 / 5">3.0 / 5 - Below Average</option>
                    <option value="2.0 / 5">2.0 / 5 - Poor</option>
                    <option value="1.0 / 5">1.0 / 5 - Unsatisfactory</option>
                  </select>
                </div>

                {/* 13. Recommendation */}
                <div className="form-field-group">
                  <label>Recommendation</label>
                  <select
                    className="form-control-select"
                    value={formData.recommendation}
                    onChange={(e) => handleInputChange('recommendation', e.target.value)}
                  >
                    <option value="Hire">Hire</option>
                    <option value="Hold">Hold</option>
                    <option value="Reject">Reject</option>
                  </select>
                </div>

                {/* 14. Next Step */}
                <div className="form-field-group">
                  <label>Next Step</label>
                  <input
                    type="text"
                    className="form-control-input"
                    placeholder="e.g. Schedule Managerial Round / Release Offer Letter"
                    value={formData.nextStep}
                    onChange={(e) => handleInputChange('nextStep', e.target.value)}
                  />
                </div>
              </div>

              {/* 11. Feedback */}
              <div className="form-field-group" style={{ marginTop: '0.25rem' }}>
                <label>Feedback</label>
                <textarea
                  className="form-control-textarea"
                  rows="3"
                  placeholder="Enter detailed interview feedback, candidate strengths, architecture assessment, cultural fit..."
                  value={formData.feedback}
                  onChange={(e) => handleInputChange('feedback', e.target.value)}
                />
              </div>
            </div>

            {/* Bottom Form Actions */}
            <div className="inpage-form-footer">
              <button
                type="button"
                className="btn-cancel-action"
                onClick={handleCancelForm}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-save-header-action"
                id="btn-save-interview"
              >
                <Save size={16} />
                <span>Save Interview Schedule</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
