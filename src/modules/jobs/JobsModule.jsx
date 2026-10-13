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
import './JobsModule.css';

export const JobsModule = () => {
  // STRICTLY and ONLY the 21 user-requested fields:
  // 1. Job ID, 2. Job Title, 3. Department, 4. Hiring Manager, 5. Recruiter,
  // 6. Number of Vacancies, 7. Job Category, 8. Employment Type,
  // 9. Experience (Min/Max), 10. Skills (Required & Preferred),
  // 11. Qualification, 12. Salary (Min/Max & Visibility), 13. Location,
  // 14. Work Mode, 15. Notice Period, 16. Job Description, 17. Benefits,
  // 18. Priority, 19. Target Joining Date, 20. Job Status,
  // 21. Created / Updated By & Timestamps

  const [jobs, setJobs] = useState([
    {
      id: 'REC-JOB-001',
      jobId: 'JOB-2026-001',
      jobTitle: 'Senior Frontend Engineer',
      department: 'Engineering & Technology',
      hiringManager: 'Sundar Raman',
      recruiter: 'Dhakshan S',
      vacancies: 3,
      jobCategory: 'Software Engineering / IT',
      employmentType: 'Full-time',
      minExperience: 4,
      maxExperience: 8,
      requiredSkills: 'React.js, TypeScript, Next.js, Redux, TailwindCSS',
      preferredSkills: 'GraphQL, AWS Cloud, Web Vitals, Node.js',
      qualification: 'B.Tech / B.E in CS / IT or relevant engineering degree',
      minSalary: '₹18,00,000',
      maxSalary: '₹28,00,000',
      salaryVisibility: 'Visible to Candidates',
      location: 'Chennai HQ Campus',
      workMode: 'Hybrid',
      noticePeriod: '30 Days',
      jobDescription: 'Lead frontend architecture for enterprise HRMS portal, build scalable UI components, and mentor junior engineers.',
      benefits: 'Comprehensive Health Insurance, Performance Bonus, Flexible Working Hours, Annual Learning Stipend',
      priority: 'Urgent',
      targetJoiningDate: '2026-11-15',
      jobStatus: 'Active',
      createdBy: 'Dhakshan S (10-Oct-2026 10:30 AM)',
      updatedBy: 'Dhakshan S (12-Oct-2026 04:15 PM)',
    },
    {
      id: 'REC-JOB-002',
      jobId: 'JOB-2026-002',
      jobTitle: 'Lead Product Designer (UI/UX)',
      department: 'Product & UX Design',
      hiringManager: 'Karthik Raja',
      recruiter: 'Dhakshan S',
      vacancies: 1,
      jobCategory: 'Product & Design',
      employmentType: 'Full-time',
      minExperience: 5,
      maxExperience: 9,
      requiredSkills: 'Figma, Design Systems, User Research, Prototyping',
      preferredSkills: 'Design Tokens, Micro-interactions, Design Sprints',
      qualification: 'Bachelor or Master in Design / Human-Computer Interaction',
      minSalary: '₹20,00,000',
      maxSalary: '₹30,00,000',
      salaryVisibility: 'Visible to Candidates',
      location: 'Coimbatore Tech Park',
      workMode: 'Hybrid',
      noticePeriod: '45 Days',
      jobDescription: 'Own end-to-end design strategy for admin portal workflows, recruit design system tokens, and conduct user testing sessions.',
      benefits: 'MacBook Pro M-Series, Wellness Reimbursement, Health Insurance, Stock Options',
      priority: 'High',
      targetJoiningDate: '2026-11-30',
      jobStatus: 'Active',
      createdBy: 'Abinaya R (08-Oct-2026 11:15 AM)',
      updatedBy: 'Abinaya R (11-Oct-2026 02:40 PM)',
    },
    {
      id: 'REC-JOB-003',
      jobId: 'JOB-2026-003',
      jobTitle: 'Senior Technical Recruiter',
      department: 'Human Resources & Talent',
      hiringManager: 'Abinaya R',
      recruiter: 'Priya Anand',
      vacancies: 2,
      jobCategory: 'Human Resources',
      employmentType: 'Full-time',
      minExperience: 3,
      maxExperience: 6,
      requiredSkills: 'Tech Sourcing, LinkedIn Recruiter, Candidate Screening, Offer Negotiation',
      preferredSkills: 'Campus Recruitment, ATS Workflow Setup',
      qualification: 'MBA in HR or Bachelor Degree with Recruitment Expertise',
      minSalary: '₹10,00,000',
      maxSalary: '₹15,00,000',
      salaryVisibility: 'Visible to Candidates',
      location: 'Chennai HQ Campus',
      workMode: 'Office',
      noticePeriod: 'Immediate to 15 Days',
      jobDescription: 'Drive tech recruitment pipelines across Frontend, Backend and Cloud hiring requirements with aggressive turnaround times.',
      benefits: 'Quarterly Hiring Incentives, Mediclaim Insurance, Gym Membership',
      priority: 'High',
      targetJoiningDate: '2026-10-31',
      jobStatus: 'Active',
      createdBy: 'Abinaya R (05-Oct-2026 09:20 AM)',
      updatedBy: 'Dhakshan S (10-Oct-2026 05:00 PM)',
    },
    {
      id: 'REC-JOB-004',
      jobId: 'JOB-2026-004',
      jobTitle: 'DevOps & Cloud Architect',
      department: 'Engineering & Technology',
      hiringManager: 'Sundar Raman',
      recruiter: 'Dhakshan S',
      vacancies: 1,
      jobCategory: 'Infrastructure & Cloud',
      employmentType: 'Contract',
      minExperience: 6,
      maxExperience: 10,
      requiredSkills: 'Kubernetes, AWS, Terraform, Docker, CI/CD Pipelines',
      preferredSkills: 'SOC2 Compliance, Datadog Monitoring, Helm',
      qualification: 'B.Tech / B.E or Cloud Certification (AWS Solutions Architect)',
      minSalary: '₹25,00,000',
      maxSalary: '₹35,00,000',
      salaryVisibility: 'Competitive as per Market',
      location: 'Remote - Tamil Nadu',
      workMode: 'Remote',
      noticePeriod: '30 Days',
      jobDescription: 'Architect high-availability Kubernetes clusters, optimize AWS infrastructure costs and implement zero-trust security postures.',
      benefits: 'Work From Home Setup Allowance, Internet Allowance, Health Cover',
      priority: 'Urgent',
      targetJoiningDate: '2026-11-10',
      jobStatus: 'Pending Approval',
      createdBy: 'Sundar Raman (11-Oct-2026 03:10 PM)',
      updatedBy: 'Sundar Raman (11-Oct-2026 03:10 PM)',
    },
    {
      id: 'REC-JOB-005',
      jobId: 'JOB-2026-005',
      jobTitle: 'Enterprise Account Executive',
      department: 'Sales & Business Development',
      hiringManager: 'Muthuvel Pandian',
      recruiter: 'Priya Anand',
      vacancies: 2,
      jobCategory: 'Sales & Marketing',
      employmentType: 'Full-time',
      minExperience: 4,
      maxExperience: 7,
      requiredSkills: 'B2B SaaS Sales, Enterprise Client Demos, Deal Closure, CRM Management',
      preferredSkills: 'HR Tech Domain Knowledge, Account Planning',
      qualification: 'MBA in Marketing / Sales or Graduate degree with SaaS sales record',
      minSalary: '₹14,00,000',
      maxSalary: '₹22,00,000',
      salaryVisibility: 'Visible to Candidates',
      location: 'Madurai Delivery Center',
      workMode: 'Hybrid',
      noticePeriod: '30 Days',
      jobDescription: 'Drive SaaS ARR growth by closing mid-market and enterprise HR platform contracts across South India.',
      benefits: 'Uncapped Sales Commission, Travel Allowances, Executive Health Plan',
      priority: 'Medium',
      targetJoiningDate: '2026-12-01',
      jobStatus: 'Draft',
      createdBy: 'Muthuvel Pandian (09-Oct-2026 04:50 PM)',
      updatedBy: 'Muthuvel Pandian (10-Oct-2026 11:00 AM)',
    },
    {
      id: 'REC-JOB-006',
      jobId: 'JOB-2026-006',
      jobTitle: 'Finance & Payroll Specialist',
      department: 'Finance & Accounts',
      hiringManager: 'Meera Nambiar',
      recruiter: 'Priya Anand',
      vacancies: 1,
      jobCategory: 'Finance & Accounting',
      employmentType: 'Full-time',
      minExperience: 3,
      maxExperience: 5,
      requiredSkills: 'Statutory Compliance, Payroll Processing, TDS, GST, Excel Modelling',
      preferredSkills: 'SAP ERP, Payroll Auditing',
      qualification: 'B.Com / M.Com / Inter CA',
      minSalary: '₹8,00,000',
      maxSalary: '₹12,00,000',
      salaryVisibility: 'Hidden / Confidential',
      location: 'Chennai HQ Campus',
      workMode: 'Office',
      noticePeriod: 'Immediate to 30 Days',
      jobDescription: 'Handle monthly employee payroll, PF/ESI filing, vendor invoicing and compliance reconciliations.',
      benefits: 'Group Medical Insurance, Gratuity, Performance Bonus',
      priority: 'Low',
      targetJoiningDate: '2026-11-20',
      jobStatus: 'Paused',
      createdBy: 'Meera Nambiar (02-Oct-2026 10:00 AM)',
      updatedBy: 'Meera Nambiar (06-Oct-2026 01:15 PM)',
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
    jobId: '',
    jobTitle: '',
    department: 'Engineering & Technology',
    hiringManager: '',
    recruiter: '',
    vacancies: 1,
    jobCategory: 'Software Engineering / IT',
    employmentType: 'Full-time',
    minExperience: 2,
    maxExperience: 5,
    requiredSkills: '',
    preferredSkills: '',
    qualification: '',
    minSalary: '',
    maxSalary: '',
    salaryVisibility: 'Visible to Candidates',
    location: '',
    workMode: 'Hybrid',
    noticePeriod: '30 Days',
    jobDescription: '',
    benefits: '',
    priority: 'Medium',
    targetJoiningDate: '',
    jobStatus: 'Active',
    createdBy: '',
    updatedBy: '',
  };

  const [formData, setFormData] = useState(initialFormState);

  // Toast
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3500);
  };

  // Filter Jobs
  const filteredJobs = jobs.filter((job) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      job.jobId.toLowerCase().includes(term) ||
      job.jobTitle.toLowerCase().includes(term) ||
      job.department.toLowerCase().includes(term) ||
      job.hiringManager.toLowerCase().includes(term) ||
      job.recruiter.toLowerCase().includes(term) ||
      job.location.toLowerCase().includes(term) ||
      job.requiredSkills.toLowerCase().includes(term);

    const matchesStatus =
      statusFilter === 'All' ? true : job.jobStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Counters
  const totalCount = jobs.length;
  const activeCount = jobs.filter((j) => j.jobStatus === 'Active').length;
  const draftCount = jobs.filter((j) => j.jobStatus === 'Draft').length;
  const pendingCount = jobs.filter((j) => j.jobStatus === 'Pending Approval').length;
  const pausedCount = jobs.filter((j) => j.jobStatus === 'Paused').length;

  // Open Add
  const handleOpenAdd = () => {
    const nextNum = jobs.length + 1;
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
      id: `REC-JOB-${Date.now()}`,
      jobId: `JOB-2026-${String(nextNum).padStart(3, '0')}`,
      createdBy: `Admin User (${nowStr})`,
      updatedBy: `Admin User (${nowStr})`,
    });
    setCurrentView('add');
  };

  // Open Edit
  const handleOpenEdit = (job) => {
    setFormData({ ...job });
    setCurrentView('edit');
  };

  // Back to List
  const handleBackToList = () => {
    setCurrentView('list');
    setFormData(initialFormState);
  };

  // Save Job
  const handleSaveJob = (e) => {
    e.preventDefault();

    if (!formData.jobTitle.trim()) {
      alert('Please enter Job Title');
      return;
    }
    if (!formData.department.trim()) {
      alert('Please select Department');
      return;
    }
    if (!formData.hiringManager.trim()) {
      alert('Please enter Hiring Manager');
      return;
    }
    if (!formData.recruiter.trim()) {
      alert('Please enter Assigned Recruiter');
      return;
    }
    if (!formData.location.trim()) {
      alert('Please enter Job Location');
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
      const newJob = {
        ...formData,
        id: `REC-JOB-${Date.now()}`,
        createdBy: `Admin User (${nowStr})`,
        updatedBy: `Admin User (${nowStr})`,
      };
      setJobs([newJob, ...jobs]);
      showToast(`Job "${newJob.jobTitle}" created successfully.`);
    } else if (currentView === 'edit') {
      const updatedJob = {
        ...formData,
        updatedBy: `Admin User (${nowStr})`,
      };
      setJobs(jobs.map((j) => (j.id === formData.id ? updatedJob : j)));
      showToast(`Job "${formData.jobTitle}" updated successfully.`);
    }

    handleBackToList();
  };

  // Quick Status Change
  const handleQuickStatusChange = (jobId, nextStatus) => {
    setJobs(
      jobs.map((j) => (j.id === jobId ? { ...j, jobStatus: nextStatus } : j))
    );
    showToast(`Job status updated to "${nextStatus}".`);
  };

  // Delete Job
  const handleDeleteJob = (job) => {
    if (window.confirm(`Are you sure you want to delete job "${job.jobTitle} (${job.jobId})"?`)) {
      setJobs(jobs.filter((j) => j.id !== job.id));
      showToast(`Job "${job.jobTitle}" deleted.`);
    }
  };

  // Helper for priority pill
  const getPriorityClass = (pri) => {
    switch (pri?.toLowerCase()) {
      case 'urgent':
        return 'urgent';
      case 'high':
        return 'high';
      case 'medium':
        return 'medium';
      default:
        return 'low';
    }
  };

  // Helper for status pill
  const getStatusClass = (st) => {
    switch (st?.toLowerCase()) {
      case 'active':
        return 'active';
      case 'draft':
        return 'draft';
      case 'pending approval':
        return 'pending-approval';
      case 'paused':
        return 'paused';
      case 'closed':
        return 'closed';
      case 'filled':
        return 'filled';
      default:
        return 'expired';
    }
  };

  return (
    <div className="jobs-page-container">
      {/* =========================================================================
          MODULE HEADER
          ========================================================================= */}
      <div className="jobs-page-header">
        {currentView === 'list' ? (
          <>
            <div className="jobs-header-left">
              <h1 className="jobs-page-title">Jobs</h1>
              
            </div>
            <button
              type="button"
              className="btn-add-job"
              onClick={handleOpenAdd}
            >
              <Plus size={16} />
              Create Job
            </button>
          </>
        ) : (
          <>
            <div className="jobs-inpage-header-left">
              <button
                type="button"
                className="btn-back-jobs"
                onClick={handleBackToList}
              >
                <ArrowLeft size={16} />
                Back to Job List
              </button>
              <div>
                <h1 className="jobs-page-title">
                  {currentView === 'add' ? 'Create New Job Requirement' : 'Edit Job Requirement'}
                </h1>
                <p className="jobs-subtitle">
                  Configure job opening, candidate criteria, compensation and hiring parameters
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Toast Alert */}
      {toastMessage && (
        <div className="jobs-toast-alert">
          <CheckCircle2 size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* =========================================================================
          MAIN CARD CONTAINER
          ========================================================================= */}
      <div className="jobs-main-card">
        {/* =======================================================================
            VIEW 1: DIRECTORY TABLE (Shown when currentView === 'list')
            ======================================================================= */}
        {currentView === 'list' && (
          <>
            {/* Toolbar: Search, Status Filter & Count Chips */}
            <div className="jobs-toolbar">
              <div className="jobs-toolbar-left">
                <div className="jobs-search-box">
                  <Search size={16} style={{ color: 'var(--text-muted)' }} />
                  <input
                    type="text"
                    placeholder="Search by Job ID, Title, Department, Manager, Recruiter, Skills..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="jobs-search-input"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="jobs-filter-select"
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active Only</option>
                  <option value="Pending Approval">Pending Approval</option>
                  <option value="Draft">Draft</option>
                  <option value="Paused">Paused</option>
                  <option value="Closed">Closed</option>
                  <option value="Filled">Filled</option>
                  <option value="Expired">Expired</option>
                </select>
              </div>

              <div className="jobs-toolbar-stats">
                <span className="jobs-stat-chip">Total: {totalCount}</span>
                <span className="jobs-stat-chip active">Active: {activeCount}</span>
                <span className="jobs-stat-chip draft">Draft: {draftCount}</span>
                <span className="jobs-stat-chip" style={{ background: '#fef3c7', color: '#b45309', borderColor: '#fde68a' }}>
                  Pending: {pendingCount}
                </span>
                <span className="jobs-stat-chip paused">Paused: {pausedCount}</span>
              </div>
            </div>

            {/* Modern Data Table */}
            <div className="jobs-table-wrapper">
              <table className="jobs-table">
                <thead>
                  <tr>
                    <th style={{ width: '55px', textAlign: 'center' }}>S.NO</th>
                    <th>Job Title & ID</th>
                    <th>Department</th>
                    <th>Hiring Team</th>
                    <th>Vacancies & Type</th>
                    <th>Location & Mode</th>
                    <th>Experience & Salary</th>
                    <th>Priority</th>
                    <th>Target Date</th>
                    <th>Status</th>
                    <th style={{ textAlign: 'center' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredJobs.length === 0 ? (
                    <tr>
                      <td colSpan={11} className="jobs-empty-state">
                        <div className="jobs-empty-icon">💼</div>
                        <p style={{ fontWeight: 600, margin: '0 0 0.25rem' }}>
                          No job openings found
                        </p>
                        <p style={{ fontSize: '0.8rem', margin: 0 }}>
                          Try adjusting your search criteria or create a new job opening
                        </p>
                      </td>
                    </tr>
                  ) : (
                    filteredJobs.map((job, index) => (
                      <tr key={job.id}>
                        {/* S.NO */}
                        <td style={{ fontWeight: 600, color: 'var(--text-muted)', textAlign: 'center' }}>
                          {index + 1}
                        </td>

                        {/* Job Title & ID */}
                        <td>
                          <div className="job-title-cell">
                            <span className="job-title-text">{job.jobTitle}</span>
                            <span className="job-id-badge">{job.jobId}</span>
                          </div>
                        </td>

                        {/* Department */}
                        <td>
                          <span className="job-dept-text">{job.department}</span>
                        </td>

                        {/* Hiring Team */}
                        <td>
                          <div className="job-team-cell">
                            <span className="job-hm-text">HM: {job.hiringManager}</span>
                            <span className="job-recruiter-text">Rec: {job.recruiter}</span>
                          </div>
                        </td>

                        {/* Vacancies & Type */}
                        <td>
                          <div className="job-vacancies-cell">
                            <span className="job-vacancies-badge">
                              {job.vacancies} {job.vacancies > 1 ? 'Openings' : 'Opening'}
                            </span>
                            <span className="job-type-sub">{job.employmentType}</span>
                          </div>
                        </td>

                        {/* Location & Work Mode */}
                        <td>
                          <div className="job-location-cell">
                            <span className="job-location-text">{job.location}</span>
                            <span className="job-workmode-badge">{job.workMode}</span>
                          </div>
                        </td>

                        {/* Experience & Salary */}
                        <td>
                          <div className="job-comp-cell">
                            <span className="job-salary-text">
                              {job.minSalary && job.maxSalary
                                ? `${job.minSalary} - ${job.maxSalary}`
                                : 'Competitive'}
                            </span>
                            <span className="job-exp-text">
                              {job.minExperience} - {job.maxExperience} Yrs Exp
                            </span>
                          </div>
                        </td>

                        {/* Priority */}
                        <td>
                          <span className={`priority-pill ${getPriorityClass(job.priority)}`}>
                            {job.priority}
                          </span>
                        </td>

                        {/* Target Joining Date */}
                        <td style={{ fontSize: '0.82rem', color: 'var(--text-main)', fontWeight: 600 }}>
                          {job.targetJoiningDate || '—'}
                        </td>

                        {/* Job Status */}
                        <td>
                          <span className={`job-status-pill ${getStatusClass(job.jobStatus)}`}>
                            <span className="status-dot"></span>
                            {job.jobStatus}
                          </span>
                        </td>

                        {/* Actions */}
                        <td>
                          <div className="job-row-actions" style={{ justifyContent: 'center' }}>
                            <button
                              type="button"
                              className="action-icon-btn edit"
                              title="Edit Job"
                              onClick={() => handleOpenEdit(job)}
                            >
                              <Edit2 size={15} />
                            </button>

                            {/* Quick Status Selector */}
                            <select
                              value={job.jobStatus}
                              onChange={(e) => handleQuickStatusChange(job.id, e.target.value)}
                              className="form-control-select"
                              style={{
                                padding: '0.2rem 0.4rem',
                                fontSize: '0.75rem',
                                width: 'auto',
                                height: '30px',
                                borderRadius: '6px',
                              }}
                              title="Change Status"
                            >
                              <option value="Active">Active</option>
                              <option value="Pending Approval">Pending</option>
                              <option value="Draft">Draft</option>
                              <option value="Paused">Paused</option>
                              <option value="Closed">Closed</option>
                              <option value="Filled">Filled</option>
                              <option value="Expired">Expired</option>
                            </select>

                            <button
                              type="button"
                              className="action-icon-btn delete"
                              title="Delete Job"
                              onClick={() => handleDeleteJob(job)}
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
            <div className="jobs-table-footer">
              <div>
                Showing 1 to {filteredJobs.length} of {jobs.length} Entries
              </div>

              <div className="jobs-pagination-controls">
                <button type="button" className="btn-jobs-page" disabled>
                  <ChevronLeft size={14} />
                </button>
                <button type="button" className="btn-jobs-page active">
                  1
                </button>
                <button type="button" className="btn-jobs-page" disabled>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </>
        )}

        {/* =======================================================================
            VIEW 2: IN-PAGE ADD / EDIT FORM (NO MODALS / POPUPS!)
            Strictly and only the 21 requested fields
            ======================================================================= */}
        {currentView !== 'list' && (
          <form
            id="inpage-job-form"
            onSubmit={handleSaveJob}
            className="inpage-job-form"
          >
            {/* SECTION 1: JOB IDENTITY & ROLE OVERVIEW */}
            <div className="inpage-section-box">
              <div className="inpage-section-header">
                1. JOB IDENTITY & ROLE OVERVIEW
              </div>

              <div className="inpage-grid-4col">
                {/* 1. Job ID */}
                <div className="form-field-group">
                  <label>Job ID (System-generated)</label>
                  <input
                    type="text"
                    value={formData.jobId}
                    readOnly
                    className="form-control-input readonly"
                  />
                </div>

                {/* 2. Job Title */}
                <div className="form-field-group" style={{ gridColumn: 'span 2' }}>
                  <label>Job Title (Position Name) *</label>
                  <input
                    type="text"
                    value={formData.jobTitle}
                    onChange={(e) =>
                      setFormData({ ...formData, jobTitle: e.target.value })
                    }
                    placeholder="e.g. Senior Frontend Engineer"
                    className="form-control-input"
                    required
                  />
                </div>

                {/* 7. Job Category */}
                <div className="form-field-group">
                  <label>Job Category *</label>
                  <input
                    type="text"
                    value={formData.jobCategory}
                    onChange={(e) =>
                      setFormData({ ...formData, jobCategory: e.target.value })
                    }
                    placeholder="e.g. Software Engineering / IT"
                    className="form-control-input"
                    required
                  />
                </div>
              </div>
            </div>

            {/* SECTION 2: DEPARTMENT & HIRING TEAM */}
            <div className="inpage-section-box">
              <div className="inpage-section-header">
                2. DEPARTMENT & HIRING TEAM
              </div>

              <div className="inpage-grid-3col">
                {/* 3. Department */}
                <div className="form-field-group">
                  <label>Department (Hiring Department) *</label>
                  <select
                    value={formData.department}
                    onChange={(e) =>
                      setFormData({ ...formData, department: e.target.value })
                    }
                    className="form-control-select"
                    required
                  >
                    <option value="Engineering & Technology">Engineering & Technology</option>
                    <option value="Human Resources & Talent">Human Resources & Talent</option>
                    <option value="Product & UX Design">Product & UX Design</option>
                    <option value="Sales & Business Development">Sales & Business Development</option>
                    <option value="Finance & Accounts">Finance & Accounts</option>
                    <option value="Customer Success & Support">Customer Success & Support</option>
                  </select>
                </div>

                {/* 4. Hiring Manager */}
                <div className="form-field-group">
                  <label>Hiring Manager (Person Responsible) *</label>
                  <input
                    type="text"
                    value={formData.hiringManager}
                    onChange={(e) =>
                      setFormData({ ...formData, hiringManager: e.target.value })
                    }
                    placeholder="e.g. Sundar Raman"
                    className="form-control-input"
                    required
                  />
                </div>

                {/* 5. Recruiter */}
                <div className="form-field-group">
                  <label>Assigned Recruiter *</label>
                  <input
                    type="text"
                    value={formData.recruiter}
                    onChange={(e) =>
                      setFormData({ ...formData, recruiter: e.target.value })
                    }
                    placeholder="e.g. Dhakshan S"
                    className="form-control-input"
                    required
                  />
                </div>
              </div>
            </div>

            {/* SECTION 3: EMPLOYMENT & POSITION SPECIFICATIONS */}
            <div className="inpage-section-box">
              <div className="inpage-section-header">
                3. EMPLOYMENT & POSITION SPECIFICATIONS
              </div>

              <div className="inpage-grid-3col">
                {/* 8. Employment Type */}
                <div className="form-field-group">
                  <label>Employment Type *</label>
                  <select
                    value={formData.employmentType}
                    onChange={(e) =>
                      setFormData({ ...formData, employmentType: e.target.value })
                    }
                    className="form-control-select"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>

                {/* 14. Work Mode */}
                <div className="form-field-group">
                  <label>Work Mode *</label>
                  <select
                    value={formData.workMode}
                    onChange={(e) =>
                      setFormData({ ...formData, workMode: e.target.value })
                    }
                    className="form-control-select"
                  >
                    <option value="Office">Office</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>

                {/* 6. Number of Vacancies */}
                <div className="form-field-group">
                  <label>Number of Vacancies *</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.vacancies}
                    onChange={(e) =>
                      setFormData({ ...formData, vacancies: parseInt(e.target.value) || 1 })
                    }
                    className="form-control-input"
                    required
                  />
                </div>
              </div>

              <div className="inpage-grid-3col">
                {/* 13. Location */}
                <div className="form-field-group">
                  <label>Job Location *</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    placeholder="e.g. Chennai HQ Campus"
                    className="form-control-input"
                    required
                  />
                </div>

                {/* 19. Target Joining Date */}
                <div className="form-field-group">
                  <label>Target Joining Date (Expected Date) *</label>
                  <input
                    type="date"
                    value={formData.targetJoiningDate}
                    onChange={(e) =>
                      setFormData({ ...formData, targetJoiningDate: e.target.value })
                    }
                    className="form-control-input"
                    required
                  />
                </div>

                {/* 15. Notice Period */}
                <div className="form-field-group">
                  <label>Notice Period Required *</label>
                  <select
                    value={formData.noticePeriod}
                    onChange={(e) =>
                      setFormData({ ...formData, noticePeriod: e.target.value })
                    }
                    className="form-control-select"
                  >
                    <option value="Immediate">Immediate</option>
                    <option value="15 Days">15 Days</option>
                    <option value="30 Days">30 Days</option>
                    <option value="45 Days">45 Days</option>
                    <option value="60 Days">60 Days</option>
                    <option value="90 Days">90 Days</option>
                  </select>
                </div>
              </div>
            </div>

            {/* SECTION 4: QUALIFICATIONS & COMPENSATION */}
            <div className="inpage-section-box">
              <div className="inpage-section-header">
                4. QUALIFICATIONS & COMPENSATION
              </div>

              <div className="inpage-grid-3col">
                {/* 9. Experience */}
                <div className="form-field-group">
                  <label>Experience Required (Min - Max Yrs) *</label>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <input
                      type="number"
                      min="0"
                      value={formData.minExperience}
                      onChange={(e) =>
                        setFormData({ ...formData, minExperience: parseInt(e.target.value) || 0 })
                      }
                      placeholder="Min"
                      className="form-control-input"
                    />
                    <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>to</span>
                    <input
                      type="number"
                      min="0"
                      value={formData.maxExperience}
                      onChange={(e) =>
                        setFormData({ ...formData, maxExperience: parseInt(e.target.value) || 0 })
                      }
                      placeholder="Max"
                      className="form-control-input"
                    />
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Years</span>
                  </div>
                </div>

                {/* 11. Qualification */}
                <div className="form-field-group" style={{ gridColumn: 'span 2' }}>
                  <label>Required Qualification *</label>
                  <input
                    type="text"
                    value={formData.qualification}
                    onChange={(e) =>
                      setFormData({ ...formData, qualification: e.target.value })
                    }
                    placeholder="e.g. B.Tech / B.E in CS / IT or relevant engineering degree"
                    className="form-control-input"
                    required
                  />
                </div>
              </div>

              {/* 10. Skills */}
              <div className="inpage-grid-2col">
                <div className="form-field-group">
                  <label>Required Skills *</label>
                  <input
                    type="text"
                    value={formData.requiredSkills}
                    onChange={(e) =>
                      setFormData({ ...formData, requiredSkills: e.target.value })
                    }
                    placeholder="e.g. React.js, TypeScript, Next.js, Redux, TailwindCSS"
                    className="form-control-input"
                    required
                  />
                </div>

                <div className="form-field-group">
                  <label>Preferred Skills</label>
                  <input
                    type="text"
                    value={formData.preferredSkills}
                    onChange={(e) =>
                      setFormData({ ...formData, preferredSkills: e.target.value })
                    }
                    placeholder="e.g. GraphQL, AWS Cloud, Web Vitals, Node.js"
                    className="form-control-input"
                  />
                </div>
              </div>

              {/* 12. Salary */}
              <div className="inpage-grid-3col">
                <div className="form-field-group">
                  <label>Minimum Salary (Annual)</label>
                  <input
                    type="text"
                    value={formData.minSalary}
                    onChange={(e) =>
                      setFormData({ ...formData, minSalary: e.target.value })
                    }
                    placeholder="e.g. ₹18,00,000"
                    className="form-control-input"
                  />
                </div>

                <div className="form-field-group">
                  <label>Maximum Salary (Annual)</label>
                  <input
                    type="text"
                    value={formData.maxSalary}
                    onChange={(e) =>
                      setFormData({ ...formData, maxSalary: e.target.value })
                    }
                    placeholder="e.g. ₹28,00,000"
                    className="form-control-input"
                  />
                </div>

                <div className="form-field-group">
                  <label>Salary Visibility *</label>
                  <select
                    value={formData.salaryVisibility}
                    onChange={(e) =>
                      setFormData({ ...formData, salaryVisibility: e.target.value })
                    }
                    className="form-control-select"
                  >
                    <option value="Visible to Candidates">Visible to Candidates</option>
                    <option value="Hidden / Confidential">Hidden / Confidential</option>
                    <option value="Competitive as per Market">Competitive as per Market</option>
                  </select>
                </div>
              </div>
            </div>

            {/* SECTION 5: JOB DESCRIPTION & BENEFITS */}
            <div className="inpage-section-box">
              <div className="inpage-section-header">
                5. JOB DESCRIPTION & BENEFITS
              </div>

              {/* 16. Job Description */}
              <div className="form-field-group">
                <label>Job Description (Responsibilities & Role Details) *</label>
                <textarea
                  value={formData.jobDescription}
                  onChange={(e) =>
                    setFormData({ ...formData, jobDescription: e.target.value })
                  }
                  placeholder="Outline core responsibilities, key project deliverables, and team expectations..."
                  className="form-control-textarea"
                  rows={4}
                  required
                />
              </div>

              {/* 17. Benefits */}
              <div className="form-field-group">
                <label>Benefits (Benefits Offered) *</label>
                <textarea
                  value={formData.benefits}
                  onChange={(e) =>
                    setFormData({ ...formData, benefits: e.target.value })
                  }
                  placeholder="e.g. Health Insurance, Performance Bonus, Flexible Working Hours, Annual Learning Stipend..."
                  className="form-control-textarea"
                  rows={3}
                />
              </div>
            </div>

            {/* SECTION 6: PRIORITY, STATUS & AUDIT */}
            <div className="inpage-section-box">
              <div className="inpage-section-header">
                6. PRIORITY, STATUS & AUDIT TRAIL
              </div>

              <div className="inpage-grid-4col">
                {/* 18. Priority */}
                <div className="form-field-group">
                  <label>Priority *</label>
                  <select
                    value={formData.priority}
                    onChange={(e) =>
                      setFormData({ ...formData, priority: e.target.value })
                    }
                    className="form-control-select"
                  >
                    <option value="Urgent">Urgent</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                {/* 20. Job Status */}
                <div className="form-field-group">
                  <label>Job Status *</label>
                  <select
                    value={formData.jobStatus}
                    onChange={(e) =>
                      setFormData({ ...formData, jobStatus: e.target.value })
                    }
                    className="form-control-select"
                  >
                    <option value="Active">Active</option>
                    <option value="Pending Approval">Pending Approval</option>
                    <option value="Draft">Draft</option>
                    <option value="Paused">Paused</option>
                    <option value="Closed">Closed</option>
                    <option value="Filled">Filled</option>
                    <option value="Expired">Expired</option>
                  </select>
                </div>

                {/* 21. Created By */}
                <div className="form-field-group">
                  <label>Created By</label>
                  <input
                    type="text"
                    value={formData.createdBy}
                    readOnly
                    className="form-control-input readonly"
                  />
                </div>

                {/* 21. Updated By */}
                <div className="form-field-group">
                  <label>Updated By</label>
                  <input
                    type="text"
                    value={formData.updatedBy}
                    readOnly
                    className="form-control-input readonly"
                  />
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="inpage-form-footer">
              <button
                type="button"
                className="btn-cancel-job"
                onClick={handleBackToList}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-save-job"
              >
                <Save size={16} />
                {currentView === 'add' ? 'Save & Post Job' : 'Save Changes'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
