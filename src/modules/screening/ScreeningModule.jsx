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
  CheckCircle,
  AlertCircle,
  XCircle,
} from 'lucide-react';
import './ScreeningModule.css';

export const ScreeningModule = () => {
  // STRICTLY and ONLY the 12 user-requested fields:
  // 1. Screening Name: Screening name.
  // 2. Job: Related job.
  // 3. Questions: Screening questions.
  // 4. Question Type: Yes/No, MCQ, text, number, etc.
  // 5. Mandatory: Whether the question is required.
  // 6. Score: Question/candidate score.
  // 7. Pass Criteria: Minimum score or rules.
  // 8. Candidate Answer: Candidate's submitted answer.
  // 9. Screening Status: Not Sent, Pending, Completed, Expired.
  // 10. Result: Qualified, Review Required, Not Qualified.
  // 11. Reviewed By: Company user who reviewed it.
  // 12. Review Date: Review date.

  const [screenings, setScreenings] = useState([
    {
      id: 'SCRN-001',
      screeningName: 'Frontend Core Competency & React Architecture',
      job: 'Senior Frontend Engineer (JOB-2026-001)',
      questions: 'How many years of production experience do you have with React 18/19 and Next.js App Router?',
      questionType: 'Number',
      mandatory: 'Yes',
      score: 92,
      passCriteria: 'Min Score: 75% & All Mandatory Questions Validated',
      candidateAnswer: '5.5 Years in B2B SaaS building micro-frontends with React 19, TypeScript and Next.js.',
      screeningStatus: 'Completed',
      result: 'Qualified',
      reviewedBy: 'Sundar Raman (Engineering Lead)',
      reviewDate: '12-Oct-2026 04:30 PM',
    },
    {
      id: 'SCRN-002',
      screeningName: 'Design Systems & Figma Component Architecture',
      job: 'Lead Product Designer (JOB-2026-002)',
      questions: 'Have you built and maintained design tokens across Web & Mobile platforms in production?',
      questionType: 'Yes/No',
      mandatory: 'Yes',
      score: 88,
      passCriteria: 'Min Score: 70% & Portfolio Link Verified',
      candidateAnswer: 'Yes, architected multi-brand design tokens for 3 SaaS web applications in Figma.',
      screeningStatus: 'Completed',
      result: 'Qualified',
      reviewedBy: 'Karthik Raja (Design Head)',
      reviewDate: '11-Oct-2026 02:15 PM',
    },
    {
      id: 'SCRN-003',
      screeningName: 'Cloud Infrastructure & High Availability Assessment',
      job: 'DevOps & Cloud Architect (JOB-2026-004)',
      questions: 'Which multi-cluster Kubernetes orchestration tools have you implemented on AWS?',
      questionType: 'MCQ',
      mandatory: 'Yes',
      score: 84,
      passCriteria: 'Min Score: 80% & AWS Certification Verified',
      candidateAnswer: 'AWS EKS with Terraform, ArgoCD GitOps, Helm charts and Istio Service Mesh.',
      screeningStatus: 'Completed',
      result: 'Review Required',
      reviewedBy: 'Sundar Raman (Engineering Lead)',
      reviewDate: '11-Oct-2026 10:45 AM',
    },
    {
      id: 'SCRN-004',
      screeningName: 'Tech Sourcing Velocity & Boolean Search Evaluation',
      job: 'Senior Technical Recruiter (JOB-2026-003)',
      questions: 'Detail your approach to sourcing niche distributed systems engineers with passive outreach.',
      questionType: 'Text',
      mandatory: 'Yes',
      score: 90,
      passCriteria: 'Min Score: 75% & Positive Recruiter Assessment',
      candidateAnswer: 'Leverage LinkedIn Recruiter advanced Boolean filters, GitHub repo search and targeted warm email campaigns.',
      screeningStatus: 'Completed',
      result: 'Qualified',
      reviewedBy: 'Abinaya R (Senior HR Manager)',
      reviewDate: '10-Oct-2026 05:20 PM',
    },
    {
      id: 'SCRN-005',
      screeningName: 'Enterprise SaaS Deal Closure & ARR Growth',
      job: 'Enterprise Account Executive (JOB-2026-005)',
      questions: 'What is the largest enterprise ARR software contract you have independently closed?',
      questionType: 'Number',
      mandatory: 'No',
      score: 65,
      passCriteria: 'Min Score: 70% & Enterprise References',
      candidateAnswer: '₹45 Lakhs annual contract with mid-market manufacturing client.',
      screeningStatus: 'Pending',
      result: 'Review Required',
      reviewedBy: 'Muthuvel Pandian (Sales Director)',
      reviewDate: '10-Oct-2026 11:30 AM',
    },
    {
      id: 'SCRN-006',
      screeningName: 'Statutory Payroll Compliance & TDS Reconciliation',
      job: 'Finance & Payroll Specialist (JOB-2026-006)',
      questions: 'Can you independently manage monthly PF, ESI, TDS and Professional Tax filings in Tamil Nadu?',
      questionType: 'Yes/No',
      mandatory: 'Yes',
      score: 45,
      passCriteria: 'Min Score: 80% & Zero Compliance Errors',
      candidateAnswer: 'No, have managed PF only, TDS was handled by external auditing firm.',
      screeningStatus: 'Completed',
      result: 'Not Qualified',
      reviewedBy: 'Meenakshi Sundaram (Finance Lead)',
      reviewDate: '09-Oct-2026 03:00 PM',
    },
    {
      id: 'SCRN-007',
      screeningName: 'Frontend Performance & Core Web Vitals Benchmark',
      job: 'Senior Frontend Engineer (JOB-2026-001)',
      questions: 'Explain strategies you implemented to achieve sub-second LCP and INP in high-traffic portals.',
      questionType: 'Text',
      mandatory: 'Yes',
      score: 0,
      passCriteria: 'Min Score: 75%',
      candidateAnswer: 'Assessment sent to candidate, waiting for submission.',
      screeningStatus: 'Pending',
      result: 'Review Required',
      reviewedBy: 'Dhakshan S (Technical Recruiter)',
      reviewDate: 'Pending Candidate Submission',
    },
  ]);

  // Views: 'list' | 'add' | 'edit'
  const [currentView, setCurrentView] = useState('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [resultFilter, setResultFilter] = useState('All');
  const [toastMessage, setToastMessage] = useState('');

  // Form State
  const initialFormState = {
    id: '',
    screeningName: '',
    job: 'Senior Frontend Engineer (JOB-2026-001)',
    questions: '',
    questionType: 'Text',
    mandatory: 'Yes',
    score: 80,
    passCriteria: 'Min Score: 75% & All Mandatory Questions Validated',
    candidateAnswer: '',
    screeningStatus: 'Completed',
    result: 'Qualified',
    reviewedBy: 'Dhakshan S (Technical Recruiter)',
    reviewDate: '',
  };

  const [formData, setFormData] = useState(initialFormState);

  // Toast
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3500);
  };

  // Filter Screenings
  const filteredScreenings = screenings.filter((item) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      item.screeningName.toLowerCase().includes(term) ||
      item.job.toLowerCase().includes(term) ||
      item.questions.toLowerCase().includes(term) ||
      item.reviewedBy.toLowerCase().includes(term) ||
      item.candidateAnswer.toLowerCase().includes(term);

    const matchesStatus =
      statusFilter === 'All' ? true : item.screeningStatus === statusFilter;

    const matchesResult =
      resultFilter === 'All' ? true : item.result === resultFilter;

    return matchesSearch && matchesStatus && matchesResult;
  });

  // Counters
  const totalCount = screenings.length;
  const qualifiedCount = screenings.filter((s) => s.result === 'Qualified').length;
  const reviewCount = screenings.filter((s) => s.result === 'Review Required').length;
  const pendingCount = screenings.filter((s) => s.screeningStatus === 'Pending').length;
  const completedCount = screenings.filter((s) => s.screeningStatus === 'Completed').length;

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
      id: `SCRN-${Date.now()}`,
      reviewDate: nowStr,
    });
    setCurrentView('add');
  };

  // Open Edit
  const handleOpenEdit = (item) => {
    setFormData({ ...item });
    setCurrentView('edit');
  };

  // Back to list
  const handleBackToList = () => {
    setCurrentView('list');
    setFormData(initialFormState);
  };

  // Save Screening
  const handleSaveScreening = (e) => {
    e.preventDefault();

    if (!formData.screeningName.trim()) {
      alert('Please enter Screening Name');
      return;
    }
    if (!formData.job.trim()) {
      alert('Please select related Job');
      return;
    }
    if (!formData.questions.trim()) {
      alert('Please enter screening question');
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
      const newScrn = {
        ...formData,
        id: `SCRN-${Date.now()}`,
        reviewDate: formData.reviewDate || nowStr,
      };
      setScreenings([newScrn, ...screenings]);
      showToast(`Screening "${newScrn.screeningName}" added successfully.`);
    } else if (currentView === 'edit') {
      setScreenings(screenings.map((s) => (s.id === formData.id ? { ...formData } : s)));
      showToast(`Screening evaluation updated.`);
    }

    handleBackToList();
  };

  // Delete Screening
  const handleDeleteScreening = (item) => {
    if (window.confirm(`Are you sure you want to delete screening "${item.screeningName}"?`)) {
      setScreenings(screenings.filter((s) => s.id !== item.id));
      showToast('Screening assessment deleted.');
    }
  };

  // Helpers
  const getResultClass = (res) => {
    switch (res?.toLowerCase()) {
      case 'qualified':
        return 'qualified';
      case 'review required':
        return 'review-required';
      default:
        return 'not-qualified';
    }
  };

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'completed';
      case 'pending':
        return 'pending';
      case 'not sent':
        return 'not-sent';
      default:
        return 'expired';
    }
  };

  return (
    <div className="screening-page-container">
      {/* =========================================================================
          MODULE HEADER
          ========================================================================= */}
      <div className="screening-page-header">
        {currentView === 'list' ? (
          <>
            <div className="screening-header-left">
              <h1 className="screening-page-title">Screening</h1>
             
            </div>
            <button
              type="button"
              className="btn-add-screening"
              onClick={handleOpenAdd}
            >
              <Plus size={16} />
              Add Screening Assessment
            </button>
          </>
        ) : (
          <div className="screening-inpage-header-left">
            <button
              type="button"
              className="btn-back-screening"
              onClick={handleBackToList}
            >
              <ArrowLeft size={16} />
              Back to Screening List
            </button>
            <div>
              <h1 className="screening-page-title">
                {currentView === 'add'
                  ? 'Create Screening Assessment'
                  : 'Review Candidate Screening Response'}
              </h1>
              <p className="screening-subtitle">
                Configure screening questions, evaluation criteria, and review candidate submitted answers
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Toast Alert */}
      {toastMessage && (
        <div className="screening-toast-alert">
          <CheckCircle2 size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* =========================================================================
          MAIN CARD CONTAINER
          ========================================================================= */}
      <div className="screening-main-card">
        {/* =======================================================================
            VIEW 1: DIRECTORY TABLE (Shown when currentView === 'list')
            ======================================================================= */}
        {currentView === 'list' && (
          <>
            {/* Toolbar: Search, Filters & Counters */}
            <div className="screening-toolbar">
              <div className="screening-toolbar-left">
                <div className="screening-search-box">
                  <Search size={16} style={{ color: 'var(--text-muted)' }} />
                  <input
                    type="text"
                    placeholder="Search screening name, job, questions, reviewer..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="screening-search-input"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="screening-filter-select"
                >
                  <option value="All">All Status</option>
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                  <option value="Not Sent">Not Sent</option>
                  <option value="Expired">Expired</option>
                </select>

                <select
                  value={resultFilter}
                  onChange={(e) => setResultFilter(e.target.value)}
                  className="screening-filter-select"
                >
                  <option value="All">All Results</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Review Required">Review Required</option>
                  <option value="Not Qualified">Not Qualified</option>
                </select>
              </div>

              <div className="screening-toolbar-stats">
                <span className="screening-stat-chip">Total: {totalCount}</span>
                <span className="screening-stat-chip qualified">Qualified: {qualifiedCount}</span>
                <span className="screening-stat-chip review">Review Req: {reviewCount}</span>
                <span className="screening-stat-chip pending">Pending: {pendingCount}</span>
                <span className="screening-stat-chip completed">Completed: {completedCount}</span>
              </div>
            </div>

            {/* Modern Data Table */}
            <div className="screening-table-wrapper">
              <table className="screening-table">
                <thead>
                  <tr>
                    <th style={{ width: '55px', textAlign: 'center' }}>S.NO</th>
                    <th>Screening Name</th>
                    <th>Related Job</th>
                    <th>Screening Questions</th>
                    <th>Question Type</th>
                    <th>Mandatory</th>
                    <th>Score & Pass Criteria</th>
                    <th>Candidate Answer</th>
                    <th>Screening Status</th>
                    <th>Result</th>
                    <th>Reviewed By</th>
                    <th>Review Date</th>
                    <th style={{ textAlign: 'center' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredScreenings.length === 0 ? (
                    <tr>
                      <td colSpan={13} className="screening-empty-state">
                        <div className="screening-empty-icon">📝</div>
                        <p style={{ fontWeight: 600, margin: '0 0 0.25rem' }}>
                          No screening assessments found
                        </p>
                        <p style={{ fontSize: '0.8rem', margin: 0 }}>
                          Adjust filters or create a new screening question set
                        </p>
                      </td>
                    </tr>
                  ) : (
                    filteredScreenings.map((item, index) => (
                      <tr key={item.id}>
                        {/* S.NO */}
                        <td style={{ fontWeight: 600, color: 'var(--text-muted)', textAlign: 'center' }}>
                          {index + 1}
                        </td>

                        {/* 1. Screening Name */}
                        <td>
                          <div className="scrn-name-cell">
                            <span className="scrn-name-text">{item.screeningName}</span>
                          </div>
                        </td>

                        {/* 2. Job */}
                        <td>
                          <div className="scrn-job-cell">
                            <span className="scrn-job-title">{item.job.split(' (')[0]}</span>
                            <span className="scrn-job-id">
                              {item.job.includes('(') ? item.job.split('(')[1].replace(')', '') : item.job}
                            </span>
                          </div>
                        </td>

                        {/* 3. Questions */}
                        <td>
                          <div className="scrn-quest-cell">
                            <span className="scrn-quest-text" title={item.questions}>
                              {item.questions}
                            </span>
                          </div>
                        </td>

                        {/* 4. Question Type */}
                        <td>
                          <span className="type-pill">{item.questionType}</span>
                        </td>

                        {/* 5. Mandatory */}
                        <td>
                          <span className={item.mandatory === 'Yes' ? 'mandatory-badge' : 'type-pill'}>
                            {item.mandatory === 'Yes' ? 'Required' : 'Optional'}
                          </span>
                        </td>

                        {/* 6 & 7. Score & Pass Criteria */}
                        <td>
                          <div className="scrn-score-cell">
                            <span className="scrn-score-text">{item.score} / 100</span>
                            <span className="scrn-criteria-sub">{item.passCriteria}</span>
                          </div>
                        </td>

                        {/* 8. Candidate Answer */}
                        <td>
                          <span className="scrn-answer-text" title={item.candidateAnswer}>
                            {item.candidateAnswer || '—'}
                          </span>
                        </td>

                        {/* 9. Screening Status */}
                        <td>
                          <span className={`scrn-status-pill ${getStatusClass(item.screeningStatus)}`}>
                            <span className="status-dot"></span>
                            {item.screeningStatus}
                          </span>
                        </td>

                        {/* 10. Result */}
                        <td>
                          <span className={`scrn-result-pill ${getResultClass(item.result)}`}>
                            {item.result === 'Qualified' && <CheckCircle size={13} />}
                            {item.result === 'Review Required' && <AlertCircle size={13} />}
                            {item.result === 'Not Qualified' && <XCircle size={13} />}
                            {item.result}
                          </span>
                        </td>

                        {/* 11. Reviewed By */}
                        <td style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '0.84rem' }}>
                          {item.reviewedBy}
                        </td>

                        {/* 12. Review Date */}
                        <td style={{ fontSize: '0.82rem', color: 'var(--text-main)' }}>
                          {item.reviewDate || '—'}
                        </td>

                        {/* Actions */}
                        <td>
                          <div className="scrn-row-actions" style={{ justifyContent: 'center' }}>
                            <button
                              type="button"
                              className="action-icon-btn edit"
                              title="Review & Edit Assessment"
                              onClick={() => handleOpenEdit(item)}
                            >
                              <Edit2 size={15} />
                            </button>

                            <button
                              type="button"
                              className="action-icon-btn delete"
                              title="Delete Screening"
                              onClick={() => handleDeleteScreening(item)}
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
            <div className="screening-table-footer">
              <div>
                Showing 1 to {filteredScreenings.length} of {screenings.length} Entries
              </div>

              <div className="screening-pagination-controls">
                <button type="button" className="btn-screening-page" disabled>
                  <ChevronLeft size={14} />
                </button>
                <button type="button" className="btn-screening-page active">
                  1
                </button>
                <button type="button" className="btn-screening-page" disabled>
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
            id="inpage-screening-form"
            onSubmit={handleSaveScreening}
            className="inpage-screening-form"
          >
            {/* SECTION 1: SCREENING SETUP & JOB ASSOCIATION */}
            <div className="inpage-section-box">
              <div className="inpage-section-header">
                1. SCREENING SETUP & JOB ASSOCIATION
              </div>

              <div className="inpage-grid-3col">
                {/* 1. Screening Name */}
                <div className="form-field-group">
                  <label>Screening Name *</label>
                  <input
                    type="text"
                    value={formData.screeningName}
                    onChange={(e) => setFormData({ ...formData, screeningName: e.target.value })}
                    placeholder="e.g. Frontend Core Competency & React Architecture"
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

                {/* 7. Pass Criteria */}
                <div className="form-field-group">
                  <label>Pass Criteria (Minimum Score & Rules) *</label>
                  <input
                    type="text"
                    value={formData.passCriteria}
                    onChange={(e) => setFormData({ ...formData, passCriteria: e.target.value })}
                    placeholder="e.g. Min Score: 75% & All Mandatory Questions Validated"
                    className="form-control-input"
                    required
                  />
                </div>
              </div>
            </div>

            {/* SECTION 2: QUESTION SPECIFICATION & RULES */}
            <div className="inpage-section-box">
              <div className="inpage-section-header">
                2. QUESTION SPECIFICATION & RULES
              </div>

              {/* 3. Questions */}
              <div className="form-field-group">
                <label>Screening Questions *</label>
                <textarea
                  value={formData.questions}
                  onChange={(e) => setFormData({ ...formData, questions: e.target.value })}
                  placeholder="Enter the technical or screening question asked to candidates..."
                  className="form-control-textarea"
                  rows={3}
                  required
                />
              </div>

              <div className="inpage-grid-2col">
                {/* 4. Question Type */}
                <div className="form-field-group">
                  <label>Question Type *</label>
                  <select
                    value={formData.questionType}
                    onChange={(e) => setFormData({ ...formData, questionType: e.target.value })}
                    className="form-control-select"
                  >
                    <option value="Text">Text (Detailed Response)</option>
                    <option value="Yes/No">Yes/No (Boolean Decision)</option>
                    <option value="MCQ">MCQ (Multiple Choice)</option>
                    <option value="Number">Number (Numerical / Years Exp)</option>
                  </select>
                </div>

                {/* 5. Mandatory */}
                <div className="form-field-group">
                  <label>Mandatory Question *</label>
                  <select
                    value={formData.mandatory}
                    onChange={(e) => setFormData({ ...formData, mandatory: e.target.value })}
                    className="form-control-select"
                  >
                    <option value="Yes">Yes (Required for Qualification)</option>
                    <option value="No">No (Optional Question)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* SECTION 3: CANDIDATE SUBMISSION & SCORING */}
            <div className="inpage-section-box">
              <div className="inpage-section-header">
                3. CANDIDATE SUBMISSION & SCORING
              </div>

              {/* 8. Candidate Answer */}
              <div className="form-field-group">
                <label>Candidate Submitted Answer</label>
                <textarea
                  value={formData.candidateAnswer}
                  onChange={(e) => setFormData({ ...formData, candidateAnswer: e.target.value })}
                  placeholder="Candidate's submitted response or evaluation findings..."
                  className="form-control-textarea"
                  rows={3}
                />
              </div>

              <div className="inpage-grid-3col">
                {/* 6. Score */}
                <div className="form-field-group">
                  <label>Candidate Score (out of 100) *</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.score}
                    onChange={(e) =>
                      setFormData({ ...formData, score: parseInt(e.target.value) || 0 })
                    }
                    className="form-control-input"
                    required
                  />
                </div>

                {/* 9. Screening Status */}
                <div className="form-field-group">
                  <label>Screening Status *</label>
                  <select
                    value={formData.screeningStatus}
                    onChange={(e) => setFormData({ ...formData, screeningStatus: e.target.value })}
                    className="form-control-select"
                  >
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                    <option value="Not Sent">Not Sent</option>
                    <option value="Expired">Expired</option>
                  </select>
                </div>

                {/* 10. Result */}
                <div className="form-field-group">
                  <label>Assessment Result *</label>
                  <select
                    value={formData.result}
                    onChange={(e) => setFormData({ ...formData, result: e.target.value })}
                    className="form-control-select"
                  >
                    <option value="Qualified">Qualified</option>
                    <option value="Review Required">Review Required</option>
                    <option value="Not Qualified">Not Qualified</option>
                  </select>
                </div>
              </div>
            </div>

            {/* SECTION 4: REVIEW AUDIT & APPROVAL */}
            <div className="inpage-section-box">
              <div className="inpage-section-header">
                4. REVIEW AUDIT & APPROVAL
              </div>

              <div className="inpage-grid-2col">
                {/* 11. Reviewed By */}
                <div className="form-field-group">
                  <label>Reviewed By (Company User) *</label>
                  <input
                    type="text"
                    value={formData.reviewedBy}
                    onChange={(e) => setFormData({ ...formData, reviewedBy: e.target.value })}
                    placeholder="e.g. Sundar Raman (Engineering Lead)"
                    className="form-control-input"
                    required
                  />
                </div>

                {/* 12. Review Date */}
                <div className="form-field-group">
                  <label>Review Date & Timestamp</label>
                  <input
                    type="text"
                    value={formData.reviewDate}
                    onChange={(e) => setFormData({ ...formData, reviewDate: e.target.value })}
                    placeholder="e.g. 12-Oct-2026 04:30 PM"
                    className="form-control-input"
                  />
                </div>
              </div>
            </div>

            {/* Form Footer */}
            <div className="inpage-form-footer">
              <button
                type="button"
                className="btn-cancel-screening"
                onClick={handleBackToList}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-save-screening"
              >
                <Save size={16} />
                {currentView === 'add' ? 'Save Assessment' : 'Update Evaluation'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
