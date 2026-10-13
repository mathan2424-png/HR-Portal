import React, { useState } from 'react';
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Lock,
  Unlock,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Save,
  CheckCircle2,
  FileText,
} from 'lucide-react';
import './CandidateResponses.css';

export const CandidateResponses = () => {
  // STRICTLY and ONLY the 11 user-requested fields:
  // 1. Candidate: Candidate reference/profile.
  // 2. Job: Related job.
  // 3. Response: Interested, Not Interested, Maybe Later, No Response.
  // 4. Response Date: Date/time of response.
  // 5. Match Score: Candidate-job score.
  // 6. Recruitment Stage: Matched, Interested, Screening, Shortlisted, Interview, Offer, Hired.
  // 7. Assigned Recruiter: Responsible HR/recruiter.
  // 8. Resume Access: Locked/Unlocked, according to permissions.
  // 9. Notes: Internal recruitment notes.
  // 10. Tags: Company-defined candidate tags.
  // 11. Outcome: Selected, Rejected, Withdrawn, etc.

  const [responses, setResponses] = useState([
    {
      id: 'RESP-001',
      candidate: 'Rajesh Kumar (CAN-8021)',
      job: 'Senior Frontend Engineer (JOB-2026-001)',
      response: 'Interested',
      responseDate: '12-Oct-2026 03:45 PM',
      matchScore: 94,
      recruitmentStage: 'Screening',
      assignedRecruiter: 'Dhakshan S',
      resumeAccess: 'Unlocked',
      notes: 'Strong React & Next.js background, 5.5 years exp at mid-market SaaS, available for technical screening call on Wednesday.',
      tags: ['Top Tier', 'Immediate Joiner', 'React Lead'],
      outcome: 'In Process',
    },
    {
      id: 'RESP-002',
      candidate: 'Sivakami R (CAN-8034)',
      job: 'Lead Product Designer (JOB-2026-002)',
      response: 'Interested',
      responseDate: '12-Oct-2026 01:20 PM',
      matchScore: 91,
      recruitmentStage: 'Shortlisted',
      assignedRecruiter: 'Dhakshan S',
      resumeAccess: 'Unlocked',
      notes: 'Excellent design portfolio in Figma & Design Systems. Shortlisted by Hiring Manager Karthik Raja.',
      tags: ['Design Systems', 'B2B SaaS', 'Figma Pro'],
      outcome: 'In Process',
    },
    {
      id: 'RESP-003',
      candidate: 'Vigneshwaran P (CAN-8049)',
      job: 'DevOps & Cloud Architect (JOB-2026-004)',
      response: 'Interested',
      responseDate: '11-Oct-2026 05:10 PM',
      matchScore: 88,
      recruitmentStage: 'Interview',
      assignedRecruiter: 'Dhakshan S',
      resumeAccess: 'Unlocked',
      notes: 'Passed initial screening, technical architecture round scheduled with Sundar Raman for Friday.',
      tags: ['AWS Certified', 'Kubernetes', 'Terraform'],
      outcome: 'In Process',
    },
    {
      id: 'RESP-004',
      candidate: 'Anitha Murugesan (CAN-8015)',
      job: 'Senior Technical Recruiter (JOB-2026-003)',
      response: 'Interested',
      responseDate: '11-Oct-2026 11:30 AM',
      matchScore: 85,
      recruitmentStage: 'Offer',
      assignedRecruiter: 'Priya Anand',
      resumeAccess: 'Unlocked',
      notes: 'Final leadership round completed with Abinaya R. Offer rolled out for ₹14.5 LPA, awaiting acceptance.',
      tags: ['Tech Sourcing', 'Fast Joiner'],
      outcome: 'Selected',
    },
    {
      id: 'RESP-005',
      candidate: 'Arvind Swamy (CAN-8062)',
      job: 'Enterprise Account Executive (JOB-2026-005)',
      response: 'Maybe Later',
      responseDate: '10-Oct-2026 02:40 PM',
      matchScore: 78,
      recruitmentStage: 'Interested',
      assignedRecruiter: 'Priya Anand',
      resumeAccess: 'Locked',
      notes: 'Currently leading an active deal cycle, open to exploring opportunities next quarter (January 2027).',
      tags: ['Enterprise Sales', 'Q1 Pipeline'],
      outcome: 'In Process',
    },
    {
      id: 'RESP-006',
      candidate: 'Manoj Pillai (CAN-8078)',
      job: 'Senior Frontend Engineer (JOB-2026-001)',
      response: 'Not Interested',
      responseDate: '09-Oct-2026 06:15 PM',
      matchScore: 82,
      recruitmentStage: 'Matched',
      assignedRecruiter: 'Dhakshan S',
      resumeAccess: 'Locked',
      notes: 'Looking strictly for 100% remote positions, not open to hybrid setup at Chennai campus.',
      tags: ['Remote Only'],
      outcome: 'Withdrawn',
    },
    {
      id: 'RESP-007',
      candidate: 'Kavitha Natarajan (CAN-8091)',
      job: 'Finance & Payroll Specialist (JOB-2026-006)',
      response: 'No Response',
      responseDate: '08-Oct-2026 10:00 AM',
      matchScore: 72,
      recruitmentStage: 'Matched',
      assignedRecruiter: 'Priya Anand',
      resumeAccess: 'Locked',
      notes: 'Alert delivered via email, candidate has not viewed or responded yet.',
      tags: ['Follow Up'],
      outcome: 'In Process',
    },
  ]);

  // Views: 'list' | 'add' | 'edit'
  const [currentView, setCurrentView] = useState('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [responseFilter, setResponseFilter] = useState('All');
  const [stageFilter, setStageFilter] = useState('All');
  const [toastMessage, setToastMessage] = useState('');

  // Form State
  const initialFormState = {
    id: '',
    candidate: '',
    job: 'Senior Frontend Engineer (JOB-2026-001)',
    response: 'Interested',
    responseDate: '',
    matchScore: 85,
    recruitmentStage: 'Interested',
    assignedRecruiter: 'Dhakshan S',
    resumeAccess: 'Unlocked',
    notes: '',
    tags: '',
    outcome: 'In Process',
  };

  const [formData, setFormData] = useState(initialFormState);

  // Toast
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3500);
  };

  // Filter Responses
  const filteredResponses = responses.filter((item) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      item.candidate.toLowerCase().includes(term) ||
      item.job.toLowerCase().includes(term) ||
      item.assignedRecruiter.toLowerCase().includes(term) ||
      (Array.isArray(item.tags) ? item.tags.join(' ').toLowerCase().includes(term) : item.tags.toLowerCase().includes(term)) ||
      item.notes.toLowerCase().includes(term);

    const matchesResponse =
      responseFilter === 'All' ? true : item.response === responseFilter;

    const matchesStage =
      stageFilter === 'All' ? true : item.recruitmentStage === stageFilter;

    return matchesSearch && matchesResponse && matchesStage;
  });

  // Counters
  const totalCount = responses.length;
  const interestedCount = responses.filter((r) => r.response === 'Interested').length;
  const screeningCount = responses.filter((r) => ['Screening', 'Shortlisted', 'Interview'].includes(r.recruitmentStage)).length;
  const offerHiredCount = responses.filter((r) => ['Offer', 'Hired'].includes(r.recruitmentStage)).length;
  const unlockedCount = responses.filter((r) => r.resumeAccess === 'Unlocked').length;

  // Open Add
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
      id: `RESP-${Date.now()}`,
      responseDate: nowStr,
    });
    setCurrentView('add');
  };

  // Open Edit
  const handleOpenEdit = (item) => {
    setFormData({
      ...item,
      tags: Array.isArray(item.tags) ? item.tags.join(', ') : item.tags,
    });
    setCurrentView('edit');
  };

  // Back to list
  const handleBackToList = () => {
    setCurrentView('list');
    setFormData(initialFormState);
  };

  // Save Response
  const handleSaveResponse = (e) => {
    e.preventDefault();

    if (!formData.candidate.trim()) {
      alert('Please enter Candidate reference/profile');
      return;
    }
    if (!formData.job.trim()) {
      alert('Please select related Job');
      return;
    }
    if (!formData.assignedRecruiter.trim()) {
      alert('Please assign a Recruiter');
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

    const parsedTags = typeof formData.tags === 'string'
      ? formData.tags.split(',').map((t) => t.trim()).filter(Boolean)
      : formData.tags;

    if (currentView === 'add') {
      const newResp = {
        ...formData,
        id: `RESP-${Date.now()}`,
        responseDate: formData.responseDate || nowStr,
        tags: parsedTags,
      };
      setResponses([newResp, ...responses]);
      showToast(`Response record for "${newResp.candidate}" added successfully.`);
    } else if (currentView === 'edit') {
      const updatedResp = {
        ...formData,
        tags: parsedTags,
      };
      setResponses(responses.map((r) => (r.id === formData.id ? updatedResp : r)));
      showToast(`Candidate response updated.`);
    }

    handleBackToList();
  };

  // Toggle Resume Access
  const handleToggleResume = (item) => {
    const nextAccess = item.resumeAccess === 'Unlocked' ? 'Locked' : 'Unlocked';
    setResponses(
      responses.map((r) => (r.id === item.id ? { ...r, resumeAccess: nextAccess } : r))
    );
    showToast(`Resume access set to ${nextAccess} for ${item.candidate}.`);
  };

  // Delete Response
  const handleDeleteResponse = (item) => {
    if (window.confirm(`Are you sure you want to delete response for "${item.candidate}"?`)) {
      setResponses(responses.filter((r) => r.id !== item.id));
      showToast('Response record deleted.');
    }
  };

  // Helpers
  const getResponsePillClass = (resp) => {
    switch (resp?.toLowerCase()) {
      case 'interested':
        return 'interested';
      case 'maybe later':
        return 'maybe-later';
      case 'not interested':
        return 'not-interested';
      default:
        return 'no-response';
    }
  };

  const getStageClass = (st) => {
    switch (st?.toLowerCase()) {
      case 'matched':
        return 'matched';
      case 'interested':
        return 'interested';
      case 'screening':
        return 'screening';
      case 'shortlisted':
        return 'shortlisted';
      case 'interview':
        return 'interview';
      case 'offer':
        return 'offer';
      default:
        return 'hired';
    }
  };

  const getOutcomeClass = (out) => {
    switch (out?.toLowerCase()) {
      case 'selected':
        return 'selected';
      case 'rejected':
        return 'rejected';
      case 'withdrawn':
        return 'withdrawn';
      default:
        return 'in-process';
    }
  };

  const getScoreClass = (score) => {
    if (score >= 90) return 'high';
    if (score >= 80) return 'mid';
    return 'fair';
  };

  return (
    <div className="responses-page-container">
      {/* =========================================================================
          MODULE HEADER
          ========================================================================= */}
      <div className="responses-page-header">
        {currentView === 'list' ? (
          <>
            <div className="responses-header-left">
              <h1 className="responses-page-title">Candidate Responses</h1>

            </div>
            <button
              type="button"
              className="btn-add-response"
              onClick={handleOpenAdd}
            >
              <Plus size={16} />
              Add Candidate Response
            </button>
          </>
        ) : (
          <div className="responses-inpage-header-left">
            <button
              type="button"
              className="btn-back-responses"
              onClick={handleBackToList}
            >
              <ArrowLeft size={16} />
              Back to Responses List
            </button>
            <div>
              <h1 className="responses-page-title">
                {currentView === 'add'
                  ? 'Record Candidate Response'
                  : 'Edit Candidate Response & Evaluation'}
              </h1>
              <p className="responses-subtitle">
                Update candidate engagement status, recruitment stage, notes and evaluation tags
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Toast Alert */}
      {toastMessage && (
        <div className="responses-toast-alert">
          <CheckCircle2 size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* =========================================================================
          MAIN CARD CONTAINER
          ========================================================================= */}
      <div className="responses-main-card">
        {/* =======================================================================
            VIEW 1: DIRECTORY TABLE (Shown when currentView === 'list')
            ======================================================================= */}
        {currentView === 'list' && (
          <>
            {/* Toolbar: Search, Filters & Counters */}
            <div className="responses-toolbar">
              <div className="responses-toolbar-left">
                <div className="responses-search-box">
                  <Search size={16} style={{ color: 'var(--text-muted)' }} />
                  <input
                    type="text"
                    placeholder="Search candidate, job, recruiter, tags or notes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="responses-search-input"
                  />
                </div>

                <select
                  value={responseFilter}
                  onChange={(e) => setResponseFilter(e.target.value)}
                  className="responses-filter-select"
                >
                  <option value="All">All Responses</option>
                  <option value="Interested">Interested</option>
                  <option value="Maybe Later">Maybe Later</option>
                  <option value="Not Interested">Not Interested</option>
                  <option value="No Response">No Response</option>
                </select>

                <select
                  value={stageFilter}
                  onChange={(e) => setStageFilter(e.target.value)}
                  className="responses-filter-select"
                >
                  <option value="All">All Stages</option>
                  <option value="Matched">Matched</option>
                  <option value="Interested">Interested</option>
                  <option value="Screening">Screening</option>
                  <option value="Shortlisted">Shortlisted</option>
                  <option value="Interview">Interview</option>
                  <option value="Offer">Offer</option>
                  <option value="Hired">Hired</option>
                </select>
              </div>

              <div className="responses-toolbar-stats">
                <span className="responses-stat-chip">Total: {totalCount}</span>
                <span className="responses-stat-chip interested">Interested: {interestedCount}</span>
                <span className="responses-stat-chip screening">Active Pipeline: {screeningCount}</span>
                <span className="responses-stat-chip offers">Offers: {offerHiredCount}</span>
                <span className="responses-stat-chip" style={{ background: '#ecfdf5', color: '#065f46', borderColor: '#a7f3d0' }}>
                  Resumes Unlocked: {unlockedCount}
                </span>
              </div>
            </div>

            {/* Modern Data Table */}
            <div className="responses-table-wrapper">
              <table className="responses-table">
                <thead>
                  <tr>
                    <th style={{ width: '55px', textAlign: 'center' }}>S.NO</th>
                    <th>Candidate Profile</th>
                    <th>Related Job</th>
                    <th>Response</th>
                    <th>Match Score</th>
                    <th>Recruitment Stage</th>
                    <th>Assigned Recruiter</th>
                    <th>Resume Access</th>
                    <th>Tags</th>
                    <th>Response Date</th>
                    <th>Outcome</th>
                    <th style={{ textAlign: 'center' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredResponses.length === 0 ? (
                    <tr>
                      <td colSpan={12} className="responses-empty-state">
                        <div className="responses-empty-icon">📨</div>
                        <p style={{ fontWeight: 600, margin: '0 0 0.25rem' }}>
                          No candidate responses found
                        </p>
                        <p style={{ fontSize: '0.8rem', margin: 0 }}>
                          Adjust filters or wait for candidates to respond to job alerts
                        </p>
                      </td>
                    </tr>
                  ) : (
                    filteredResponses.map((item, index) => (
                      <tr key={item.id}>
                        {/* S.NO */}
                        <td style={{ fontWeight: 600, color: 'var(--text-muted)', textAlign: 'center' }}>
                          {index + 1}
                        </td>

                        {/* 1. Candidate: Profile/Reference */}
                        <td>
                          <div className="cand-profile-cell">
                            <div className="cand-avatar">
                              {item.candidate.charAt(0).toUpperCase()}
                            </div>
                            <div className="cand-name-box">
                              <span className="cand-name-text">{item.candidate.split(' (')[0]}</span>
                              <span className="cand-id-badge">
                                {item.candidate.includes('(') ? item.candidate.split('(')[1].replace(')', '') : 'CAN'}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* 2. Job: Related Job */}
                        <td>
                          <div className="cand-job-cell">
                            <span className="cand-job-title">{item.job.split(' (')[0]}</span>
                            <span className="cand-job-id">
                              {item.job.includes('(') ? item.job.split('(')[1].replace(')', '') : item.job}
                            </span>
                          </div>
                        </td>

                        {/* 3. Response */}
                        <td>
                          <span className={`response-pill ${getResponsePillClass(item.response)}`}>
                            {item.response}
                          </span>
                        </td>

                        {/* 5. Match Score */}
                        <td>
                          <span className={`resp-score-pill ${getScoreClass(item.matchScore)}`}>
                            {item.matchScore}%
                          </span>
                        </td>

                        {/* 6. Recruitment Stage */}
                        <td>
                          <span className={`stage-pill ${getStageClass(item.recruitmentStage)}`}>
                            {item.recruitmentStage}
                          </span>
                        </td>

                        {/* 7. Assigned Recruiter */}
                        <td style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '0.84rem' }}>
                          {item.assignedRecruiter}
                        </td>

                        {/* 8. Resume Access */}
                        <td>
                          <span className={`resume-access-pill ${item.resumeAccess === 'Unlocked' ? 'unlocked' : 'locked'}`}>
                            {item.resumeAccess === 'Unlocked' ? (
                              <>
                                <Unlock size={12} />
                                Unlocked
                              </>
                            ) : (
                              <>
                                <Lock size={12} />
                                Locked
                              </>
                            )}
                          </span>
                        </td>

                        {/* 10. Tags */}
                        <td>
                          <div>
                            {Array.isArray(item.tags)
                              ? item.tags.map((tag) => (
                                <span key={tag} className="tag-chip">
                                  #{tag}
                                </span>
                              ))
                              : <span className="tag-chip">#{item.tags}</span>}
                          </div>
                        </td>

                        {/* 4. Response Date */}
                        <td style={{ fontSize: '0.82rem', color: 'var(--text-main)' }}>
                          {item.responseDate || '—'}
                        </td>

                        {/* 11. Outcome */}
                        <td>
                          <span className={`outcome-pill ${getOutcomeClass(item.outcome)}`}>
                            {item.outcome}
                          </span>
                        </td>

                        {/* Actions */}
                        <td>
                          <div className="resp-row-actions" style={{ justifyContent: 'center' }}>
                            <button
                              type="button"
                              className="action-icon-btn edit"
                              title="Edit Evaluation"
                              onClick={() => handleOpenEdit(item)}
                            >
                              <Edit2 size={15} />
                            </button>

                            <button
                              type="button"
                              className="action-icon-btn resume-toggle"
                              title={item.resumeAccess === 'Unlocked' ? 'Lock Resume' : 'Unlock Resume'}
                              onClick={() => handleToggleResume(item)}
                            >
                              <FileText size={15} />
                            </button>

                            <button
                              type="button"
                              className="action-icon-btn delete"
                              title="Delete Record"
                              onClick={() => handleDeleteResponse(item)}
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
            <div className="responses-table-footer">
              <div>
                Showing 1 to {filteredResponses.length} of {responses.length} Entries
              </div>

              <div className="responses-pagination-controls">
                <button type="button" className="btn-responses-page" disabled>
                  <ChevronLeft size={14} />
                </button>
                <button type="button" className="btn-responses-page active">
                  1
                </button>
                <button type="button" className="btn-responses-page" disabled>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </>
        )}

        {/* =======================================================================
            VIEW 2: IN-PAGE ADD / EDIT FORM (NO MODALS / POPUPS!)
            Strictly and only the 11 requested fields
            ======================================================================= */}
        {currentView !== 'list' && (
          <form
            id="inpage-response-form"
            onSubmit={handleSaveResponse}
            className="inpage-response-form"
          >
            {/* SECTION 1: CANDIDATE PROFILE & JOB ASSOCIATION */}
            <div className="inpage-section-box">
              <div className="inpage-section-header">
                1. CANDIDATE PROFILE & JOB ASSOCIATION
              </div>

              <div className="inpage-grid-3col">
                {/* 1. Candidate */}
                <div className="form-field-group">
                  <label>Candidate Profile / Reference *</label>
                  <input
                    type="text"
                    value={formData.candidate}
                    onChange={(e) => setFormData({ ...formData, candidate: e.target.value })}
                    placeholder="e.g. Rajesh Kumar (CAN-8021)"
                    className="form-control-input"
                    required
                  />
                </div>

                {/* 2. Job */}
                <div className="form-field-group">
                  <label>Related Job Opening *</label>
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

                {/* 5. Match Score */}
                <div className="form-field-group">
                  <label>Candidate Match Score (%) *</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={formData.matchScore}
                    onChange={(e) =>
                      setFormData({ ...formData, matchScore: parseInt(e.target.value) || 0 })
                    }
                    className="form-control-input"
                    required
                  />
                </div>
              </div>
            </div>

            {/* SECTION 2: RESPONSE DETAILS & TIMELINE */}
            <div className="inpage-section-box">
              <div className="inpage-section-header">
                2. RESPONSE DETAILS & TIMELINE
              </div>

              <div className="inpage-grid-3col">
                {/* 3. Response */}
                <div className="form-field-group">
                  <label>Candidate Response *</label>
                  <select
                    value={formData.response}
                    onChange={(e) => setFormData({ ...formData, response: e.target.value })}
                    className="form-control-select"
                  >
                    <option value="Interested">Interested</option>
                    <option value="Maybe Later">Maybe Later</option>
                    <option value="Not Interested">Not Interested</option>
                    <option value="No Response">No Response</option>
                  </select>
                </div>

                {/* 4. Response Date */}
                <div className="form-field-group">
                  <label>Response Date & Timestamp</label>
                  <input
                    type="text"
                    value={formData.responseDate}
                    onChange={(e) => setFormData({ ...formData, responseDate: e.target.value })}
                    placeholder="e.g. 12-Oct-2026 03:45 PM"
                    className="form-control-input"
                  />
                </div>

                {/* 11. Outcome */}
                <div className="form-field-group">
                  <label>Recruitment Outcome *</label>
                  <select
                    value={formData.outcome}
                    onChange={(e) => setFormData({ ...formData, outcome: e.target.value })}
                    className="form-control-select"
                  >
                    <option value="In Process">In Process</option>
                    <option value="Selected">Selected</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Withdrawn">Withdrawn</option>
                  </select>
                </div>
              </div>
            </div>

            {/* SECTION 3: RECRUITMENT PROGRESS & ASSIGNMENT */}
            <div className="inpage-section-box">
              <div className="inpage-section-header">
                3. RECRUITMENT PROGRESS & ASSIGNMENT
              </div>

              <div className="inpage-grid-3col">
                {/* 6. Recruitment Stage */}
                <div className="form-field-group">
                  <label>Recruitment Stage *</label>
                  <select
                    value={formData.recruitmentStage}
                    onChange={(e) => setFormData({ ...formData, recruitmentStage: e.target.value })}
                    className="form-control-select"
                  >
                    <option value="Matched">Matched</option>
                    <option value="Interested">Interested</option>
                    <option value="Screening">Screening</option>
                    <option value="Shortlisted">Shortlisted</option>
                    <option value="Interview">Interview</option>
                    <option value="Offer">Offer</option>
                    <option value="Hired">Hired</option>
                  </select>
                </div>

                {/* 7. Assigned Recruiter */}
                <div className="form-field-group">
                  <label>Assigned Recruiter (Responsible HR) *</label>
                  <input
                    type="text"
                    value={formData.assignedRecruiter}
                    onChange={(e) => setFormData({ ...formData, assignedRecruiter: e.target.value })}
                    placeholder="e.g. Dhakshan S"
                    className="form-control-input"
                    required
                  />
                </div>

                {/* 8. Resume Access */}
                <div className="form-field-group">
                  <label>Resume Access Permission *</label>
                  <select
                    value={formData.resumeAccess}
                    onChange={(e) => setFormData({ ...formData, resumeAccess: e.target.value })}
                    className="form-control-select"
                  >
                    <option value="Unlocked">Unlocked</option>
                    <option value="Locked">Locked</option>
                  </select>
                </div>
              </div>
            </div>

            {/* SECTION 4: NOTES & TAGS */}
            <div className="inpage-section-box">
              <div className="inpage-section-header">
                4. EVALUATION NOTES & TAGS
              </div>

              {/* 10. Tags */}
              <div className="form-field-group">
                <label>Candidate Tags (Comma-separated) *</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="e.g. Top Tier, Immediate Joiner, React Lead"
                  className="form-control-input"
                />
              </div>

              {/* 9. Notes */}
              <div className="form-field-group">
                <label>Internal Recruitment Notes *</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Record interview impressions, technical strengths, compensation discussions, and notice period clarifications..."
                  className="form-control-textarea"
                  rows={3}
                />
              </div>
            </div>

            {/* Form Footer */}
            <div className="inpage-form-footer">
              <button
                type="button"
                className="btn-cancel-response"
                onClick={handleBackToList}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-save-response"
              >
                <Save size={16} />
                {currentView === 'add' ? 'Save Response' : 'Update Evaluation'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
