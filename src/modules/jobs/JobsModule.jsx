import React, { useState, useEffect } from 'react';
import { api } from '../../Api/Api';
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
import { Toast } from '../../components/common/Toast/Toast';
import { ConfirmDeleteModal } from '../../components/common/ConfirmDeleteModal';
import { UpdateStatusModal } from '../../components/common/UpdateStatusModal';
import { FieldError } from '../../components/common/FieldError/FieldError';
import {
  validateName,
  validateNumber,
  validateRequired,
  sanitizeNameInput,
  sanitizeNumberInput,
} from '../../utils/validation';
import './JobsModule.css';

// Status options for the Update Status Modal matching requested specifications
const JOB_STATUS_OPTIONS = [
  { value: 'Active', label: 'Active' },
  { value: 'Pending Approval', label: 'Pending' },
  { value: 'Draft', label: 'Draft' },
  { value: 'Paused', label: 'Paused' },
  { value: 'Closed', label: 'Closed' },
  { value: 'Filled', label: 'Filled' },
  { value: 'Expired', label: 'Expired' },
];

// Pre-configured standard Job Categories fallback
const DEFAULT_JOB_CATEGORIES = [
  'Software Engineering / IT',
  'Design & UX',
  'Product & UX Design',
  'Healthcare',
  'Customer Success & Support',
  'Finance & Accounting',
  'Marketing & Growth',
  'Sales & Business Development',
  'Human Resources & Talent',
  'Operations & Logistics',
  'Quality Assurance & Testing',
  'Data & Analytics',
];

export const JobsModule = () => {
  const [jobErrors, setJobErrors] = useState({});
  // STRICTLY and ONLY the 21 user-requested fields:
  // 1. Job ID, 2. Job Title, 3. Department, 4. Hiring Manager, 5. Recruiter,
  // 6. Number of Vacancies, 7. Job Category, 8. Employment Type,
  // 9. Experience (Min/Max), 10. Skills (Required & Preferred),
  // 11. Qualification, 12. Salary (Min/Max & Visibility), 13. Location,
  // 14. Work Mode, 15. Notice Period, 16. Job Description, 17. Benefits,
  // 18. Priority, 19. Target Joining Date, 20. Job Status,
  // 21. Created / Updated By & Timestamps

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);

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
    department: '',
    hiringManager: '',
    recruiter: '',
    vacancies: '',
    jobCategory: '',
    employmentType: 'Full-time',
    minExperience: '',
    maxExperience: '',
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

  // Toast State
  const [toast, setToast] = useState(null); // { message: string, type: 'success' | 'delete' | 'info' | 'warning' }

  // Delete Confirmation Modal State
  const [deleteConfirm, setDeleteConfirm] = useState({
    isOpen: false,
    job: null,
    isLoading: false,
  });

  // Status Update Modal State
  const [statusModal, setStatusModal] = useState({
    isOpen: false,
    job: null,
    isLoading: false,
  });

  // Dynamic Job Categories loaded from Backend /job-categories
  const [categoryOptions, setCategoryOptions] = useState(DEFAULT_JOB_CATEGORIES);

  useEffect(() => {
    let isMounted = true;
    const fetchCategories = async () => {
      try {
        const response = await api.get('/job-categories');
        if (response.data?.success && isMounted) {
          const raw =
            response.data.data?.categories ||
            response.data.data?.records ||
            response.data.data?.items ||
            (Array.isArray(response.data.data) ? response.data.data : []);
          const activeList = raw
            .filter((c) => !c.status || c.status.toLowerCase() === 'active')
            .map((c) => (c.name || c.title || '').trim())
            .filter(Boolean);

          if (activeList.length > 0) {
            setCategoryOptions((prev) => Array.from(new Set([...activeList, ...prev])));
          }
        }
      } catch (err) {
        console.warn('Could not load dynamic job categories from server:', err);
      }
    };
    fetchCategories();
    return () => {
      isMounted = false;
    };
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch Jobs from Backend API with Search, Filter & Pagination
  const fetchJobs = async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit: itemsPerPage,
      };
      if (searchTerm && searchTerm.trim()) {
        params.search = searchTerm.trim();
      }
      if (statusFilter && statusFilter !== 'All' && statusFilter !== 'All Status') {
        params.status = statusFilter;
      }
      const response = await api.get('/jobs', { params });
      if (response.data?.success) {
        const data = response.data.data;
        const jobList = (data.jobs || []).map((j) => ({
          ...j,
          id: j._id || j.id,
        }));
        setJobs(jobList);
        setTotalPages(data.pagination?.totalPages || 1);
        setTotalJobs(data.pagination?.total || 0);
      }
    } catch (err) {
      console.error('fetchJobs error:', err);
      const serverMsg =
        err.response?.data?.message ||
        err.message ||
        'Failed to fetch jobs';
      showToast(serverMsg, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentView === 'list') {
      const timer = setTimeout(() => {
        fetchJobs();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [searchTerm, statusFilter, currentPage, currentView]);

  const filteredJobs = jobs;
  const paginatedJobs = jobs;

  // Open Add
  const handleOpenAdd = async () => {
    let nextJobId = `JOB-${new Date().getFullYear()}-001`;
    try {
      const idRes = await api.get('/jobs/next-id');
      if (idRes.data?.success && idRes.data?.data?.jobId) {
        nextJobId = idRes.data.data.jobId;
      }
    } catch (e) {
      console.error('Error fetching next-id:', e);
    }

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
      jobId: nextJobId,
      createdBy: `Admin (${nowStr})`,
      updatedBy: `Admin (${nowStr})`,
    });
    setJobErrors({});
    setCurrentView('add');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open Edit
  const handleOpenEdit = (job) => {
    setFormData({ ...job });
    setJobErrors({});
    setCurrentView('edit');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Back to List
  const handleBackToList = () => {
    setJobErrors({});
    setCurrentView('list');
    setFormData(initialFormState);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Save Job (Real Backend API Call)
  const handleSaveJob = async (e) => {
    e.preventDefault();

    const errors = {};
    const titleErr = validateRequired(formData.jobTitle, 'Job title');
    if (titleErr) errors.jobTitle = titleErr;

    const deptErr = validateRequired(formData.department, 'Department');
    if (deptErr) errors.department = deptErr;

    const catErr = validateRequired(formData.jobCategory, 'Job category');
    if (catErr) errors.jobCategory = catErr;

    if (formData.hiringManager) {
      const hmErr = validateName(formData.hiringManager, 'Hiring manager', true);
      if (hmErr) errors.hiringManager = hmErr;
    }

    if (formData.recruiter) {
      const recErr = validateName(formData.recruiter, 'Assigned recruiter', true);
      if (recErr) errors.recruiter = recErr;
    }

    if (formData.vacancies) {
      const vacErr = validateNumber(formData.vacancies, 'Number of vacancies', true, 1);
      if (vacErr) errors.vacancies = vacErr;
    }

    if (formData.minExperience !== '' && formData.minExperience !== null && formData.minExperience !== undefined) {
      const minExpNum = Number(formData.minExperience);
      if (isNaN(minExpNum) || String(formData.minExperience).includes('-') || minExpNum < 0) {
        errors.minExperience = 'Minimum experience cannot be negative';
      }
    }

    if (formData.maxExperience !== '' && formData.maxExperience !== null && formData.maxExperience !== undefined) {
      const maxExpNum = Number(formData.maxExperience);
      if (isNaN(maxExpNum) || String(formData.maxExperience).includes('-') || maxExpNum < 0) {
        errors.maxExperience = 'Maximum experience cannot be negative';
      }
    }

    if (
      formData.minExperience !== '' &&
      formData.maxExperience !== '' &&
      formData.minExperience !== null &&
      formData.maxExperience !== null &&
      !errors.minExperience &&
      !errors.maxExperience &&
      Number(formData.minExperience) > Number(formData.maxExperience)
    ) {
      errors.maxExperience = 'Maximum experience cannot be less than minimum experience';
    }

    if (formData.minSalary) {
      const minErr = validateNumber(formData.minSalary, 'Minimum salary', false);
      if (minErr) {
        errors.minSalary = minErr;
      } else if (Number(formData.minSalary) < 0) {
        errors.minSalary = 'Minimum salary cannot be negative';
      }
    }

    if (formData.maxSalary) {
      const maxErr = validateNumber(formData.maxSalary, 'Maximum salary', false);
      if (maxErr) {
        errors.maxSalary = maxErr;
      } else if (Number(formData.maxSalary) < 0) {
        errors.maxSalary = 'Maximum salary cannot be negative';
      }
    }

    if (
      formData.minSalary &&
      formData.maxSalary &&
      !errors.minSalary &&
      !errors.maxSalary &&
      Number(formData.minSalary) > Number(formData.maxSalary)
    ) {
      errors.maxSalary = 'Maximum salary cannot be less than minimum salary';
    }

    if (Object.keys(errors).length > 0) {
      setJobErrors(errors);
      window.scrollTo({ top: 120, behavior: 'smooth' });
      return;
    }

    setJobErrors({});

    try {
      if (currentView === 'add') {
        const response = await api.post('/jobs', formData);
        if (response.data?.success) {
          showToast(response.data.message || `Job "${formData.jobTitle}" created successfully.`, 'success');
          handleBackToList();
          fetchJobs();
        }
      } else if (currentView === 'edit') {
        const targetId = formData._id || formData.id;
        const response = await api.put(`/jobs/${targetId}`, formData);
        if (response.data?.success) {
          showToast(response.data.message || `Job "${formData.jobTitle}" updated successfully.`, 'success');
          handleBackToList();
          fetchJobs();
        }
      }
    } catch (err) {
      console.error('handleSaveJob error:', err);
      const serverMsg =
        err.response?.data?.message ||
        (typeof err.response?.data?.errors === 'string'
          ? err.response.data.errors
          : err.response?.data?.errors
          ? Object.values(err.response.data.errors)[0]
          : null) ||
        err.response?.data?.error ||
        err.message ||
        'Failed to save job';
      showToast(serverMsg, 'error');
    }
  };

  // Open Status Update Modal
  const handleOpenStatusModal = (job) => {
    setStatusModal({
      isOpen: true,
      job,
      isLoading: false,
    });
  };

  // Confirm and Execute Status Update via API
  const handleConfirmStatusUpdate = async (nextStatus) => {
    if (!statusModal.job) return;
    const job = statusModal.job;
    const jobId = job._id || job.id;
    setStatusModal((prev) => ({ ...prev, isLoading: true }));
    try {
      const response = await api.patch(`/jobs/${jobId}/status`, {
        status: nextStatus,
        jobStatus: nextStatus,
      });
      if (response.data?.success) {
        setJobs((prev) =>
          prev.map((j) => (j.id === jobId || j._id === jobId ? { ...j, jobStatus: nextStatus } : j))
        );
        showToast(response.data.message || `Job status updated to "${nextStatus}".`, 'success');
        setStatusModal({ isOpen: false, job: null, isLoading: false });
      } else {
        showToast(response.data?.message || 'Failed to update job status', 'error');
        setStatusModal((prev) => ({ ...prev, isLoading: false }));
      }
    } catch (err) {
      console.error('Status change error:', err);
      const serverMsg = err.response?.data?.message || 'Failed to update job status';
      showToast(serverMsg, 'error');
      setStatusModal((prev) => ({ ...prev, isLoading: false }));
    }
  };

  // Quick Status Change (Real Backend API Call fallback)
  const handleQuickStatusChange = async (jobId, nextStatus) => {
    try {
      const response = await api.patch(`/jobs/${jobId}/status`, {
        status: nextStatus,
        jobStatus: nextStatus,
      });
      if (response.data?.success) {
        setJobs((prev) =>
          prev.map((j) => (j.id === jobId || j._id === jobId ? { ...j, jobStatus: nextStatus } : j))
        );
        showToast(response.data.message || `Job status updated to "${nextStatus}".`, 'success');
      }
    } catch (err) {
      console.error('Status change error:', err);
      const serverMsg = err.response?.data?.message || 'Failed to update job status';
      showToast(serverMsg, 'error');
    }
  };

  // Delete Job - Open Confirmation Modal
  const handleDeleteJob = (job) => {
    setDeleteConfirm({
      isOpen: true,
      job,
      isLoading: false,
    });
  };

  // Confirm and Execute Delete via Backend API Call
  const handleConfirmDelete = async () => {
    if (!deleteConfirm.job) return;
    const job = deleteConfirm.job;
    setDeleteConfirm((prev) => ({ ...prev, isLoading: true }));
    try {
      const targetId = job._id || job.id;
      const response = await api.delete(`/jobs/${targetId}`);
      if (response.data?.success) {
        showToast(response.data.message || `Job "${job.jobTitle}" deleted successfully.`, 'delete');
        fetchJobs();
      } else {
        showToast(response.data?.message || 'Failed to delete job', 'error');
      }
    } catch (err) {
      console.error('Delete job error:', err);
      const serverMsg = err.response?.data?.message || 'Failed to delete job';
      showToast(serverMsg, 'error');
    } finally {
      setDeleteConfirm({ isOpen: false, job: null, isLoading: false });
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
      {/* Floating Animated Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          duration={3500}
          onClose={() => setToast(null)}
        />
      )}

      {/* Custom Modern Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={deleteConfirm.isOpen}
        title="Confirm Delete"
        message={
          deleteConfirm.job
            ? `Are you sure you want to delete job "${deleteConfirm.job.jobTitle} (${deleteConfirm.job.jobId})"? This action cannot be undone.`
            : 'Are you sure you want to delete this job? This action cannot be undone.'
        }
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={deleteConfirm.isLoading}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteConfirm({ isOpen: false, job: null, isLoading: false })}
      />

      {/* Modern Update Job Status Modal */}
      <UpdateStatusModal
        isOpen={statusModal.isOpen}
        title="Update Job Status"
        subtitle={
          statusModal.job
            ? `Change the status for ${statusModal.job.jobTitle || 'this job'}.`
            : 'Change the job status.'
        }
        label="Job Status"
        currentStatus={statusModal.job?.jobStatus || 'Active'}
        options={JOB_STATUS_OPTIONS}
        confirmText="Update Status"
        cancelText="Cancel"
        isLoading={statusModal.isLoading}
        onConfirm={handleConfirmStatusUpdate}
        onCancel={() => setStatusModal({ isOpen: false, job: null, isLoading: false })}
      />

      {/* =========================================================================
          MODULE HEADER
          ========================================================================= */}
      <div className="jobs-page-header">
        {currentView === 'list' ? (
          <>
            <div>
              <h1 className="jobs-page-title">Jobs</h1>
            </div>
            <button
              type="button"
              className="btn-add-job"
              onClick={handleOpenAdd}
            >
              <Plus size={16} strokeWidth={2.5} />
              <span>Create Job</span>
            </button>
          </>
        ) : (
          <>
            <div>
              <h1 className="jobs-page-title">
                {currentView === 'add'
                  ? 'Create New Job Requirement'
                  : `Edit Job Requirement — ${formData.jobTitle}`}
              </h1>
            </div>

            <button
              type="button"
              className="btn-back-to-list"
              onClick={handleBackToList}
              title="Back to List"
            >
              <ArrowLeft size={16} strokeWidth={2.5} />
              <span>Back to List</span>
            </button>
          </>
        )}
      </div>


      {/* =========================================================================
          MAIN CARD CONTAINER
          ========================================================================= */}
      <div className="jobs-main-card">
        {/* =======================================================================
            VIEW 1: DIRECTORY TABLE (Shown when currentView === 'list')
            ======================================================================= */}
        {currentView === 'list' && (
          <>
            {/* Toolbar: Search (Left) + Status Filter (Right) */}
            <div className="jobs-toolbar">
              <div className="jobs-search-box">
                <Search size={16} style={{ color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="jobs-search-input"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
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
                        <p style={{ fontWeight: 600, margin: '0 0 0.25rem' }}>
                          No job openings found
                        </p>
                        <p style={{ fontSize: '0.8rem', margin: 0 }}>
                          Try adjusting your search criteria or create a new job opening
                        </p>
                      </td>
                    </tr>
                  ) : (
                    paginatedJobs.map((job, index) => {
                      const serialNumber = (currentPage - 1) * itemsPerPage + index + 1;
                      return (
                        <tr key={job.id}>
                          {/* S.NO */}
                          <td style={{ fontWeight: 600, color: 'var(--text-muted)', textAlign: 'center' }}>
                            {serialNumber}
                          </td>

                          {/* Job Title & ID */}
                          <td>
                            <div className="job-title-cell">
                              <span className="job-title-text">{job.jobTitle}</span>
                              <span className="job-id-badge">{job.jobId}</span>
                            </div>
                          </td>

                          {/* Department & Job Category */}
                          <td>
                            <span className="job-dept-text">{job.department}</span>
                            {job.jobCategory && (
                              <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                                {job.jobCategory}
                              </span>
                            )}
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
                                  ? !isNaN(Number(job.minSalary)) && !isNaN(Number(job.maxSalary))
                                    ? `₹${Number(job.minSalary).toLocaleString('en-IN')} - ₹${Number(job.maxSalary).toLocaleString('en-IN')}`
                                    : `${job.minSalary} - ${job.maxSalary}`
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
                            <span
                              className={`job-status-pill clickable ${getStatusClass(job.jobStatus)}`}
                              onClick={() => handleOpenStatusModal(job)}
                              title="Click to update status"
                              role="button"
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault();
                                  handleOpenStatusModal(job);
                                }
                              }}
                            >
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
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="jobs-table-footer">
              <div>
                Showing {jobs.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{' '}
                    {Math.min(currentPage * itemsPerPage, totalJobs || jobs.length)} of{' '}
                    {totalJobs || jobs.length} Entries
              </div>

              <div className="jobs-pagination-controls">
                <button
                  type="button"
                  className="btn-jobs-page"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                >
                  <ChevronLeft size={14} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    type="button"
                    className={`btn-jobs-page ${currentPage === page ? 'active' : ''}`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))}
                <button
                  type="button"
                  className="btn-jobs-page"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                >
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
            noValidate
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
                    onChange={(e) => {
                      setFormData({ ...formData, jobTitle: e.target.value });
                      if (jobErrors.jobTitle) setJobErrors((prev) => ({ ...prev, jobTitle: null }));
                    }}
                    placeholder="e.g. Senior Frontend Engineer"
                    className={`form-control-input ${jobErrors.jobTitle ? 'has-error' : ''}`}
                  />
                  <FieldError error={jobErrors.jobTitle} />
                </div>

                {/* 7. Job Category Dropdown */}
                <div className="form-field-group">
                  <label htmlFor="jobCategorySelect">Job Category *</label>
                  <select
                    id="jobCategorySelect"
                    value={formData.jobCategory}
                    onChange={(e) => {
                      setFormData({ ...formData, jobCategory: e.target.value });
                      if (jobErrors.jobCategory) {
                        setJobErrors((prev) => ({ ...prev, jobCategory: null }));
                      }
                    }}
                    className={`form-control-select ${jobErrors.jobCategory ? 'has-error' : ''}`}
                  >
                    <option value="">Select Job Category</option>
                    {categoryOptions.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                    {formData.jobCategory && !categoryOptions.includes(formData.jobCategory) && (
                      <option value={formData.jobCategory}>{formData.jobCategory}</option>
                    )}
                  </select>
                  <FieldError error={jobErrors.jobCategory} />
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
                    onChange={(e) => {
                      setFormData({ ...formData, department: e.target.value });
                      if (jobErrors.department) setJobErrors((prev) => ({ ...prev, department: null }));
                    }}
                    className={`form-control-select ${jobErrors.department ? 'has-error' : ''}`}
                  >
                    <option value="">Select Department</option>
                    <option value="Engineering & Technology">Engineering & Technology</option>
                    <option value="Human Resources & Talent">Human Resources & Talent</option>
                    <option value="Product & UX Design">Product & UX Design</option>
                    <option value="Sales & Business Development">Sales & Business Development</option>
                    <option value="Finance & Accounts">Finance & Accounts</option>
                    <option value="Customer Success & Support">Customer Success & Support</option>
                  </select>
                  <FieldError error={jobErrors.department} />
                </div>

                {/* 4. Hiring Manager */}
                <div className="form-field-group">
                  <label>Hiring Manager (Person Responsible) *</label>
                  <input
                    type="text"
                    value={formData.hiringManager}
                    onChange={(e) => {
                      const clean = sanitizeNameInput(e.target.value);
                      setFormData({ ...formData, hiringManager: clean });
                      if (jobErrors.hiringManager) setJobErrors((prev) => ({ ...prev, hiringManager: null }));
                    }}
                    placeholder="e.g. Sundar Raman (letters only)"
                    className={`form-control-input ${jobErrors.hiringManager ? 'has-error' : ''}`}
                  />
                  <FieldError error={jobErrors.hiringManager} />
                </div>

                {/* 5. Recruiter */}
                <div className="form-field-group">
                  <label>Assigned Recruiter *</label>
                  <input
                    type="text"
                    value={formData.recruiter}
                    onChange={(e) => {
                      const clean = sanitizeNameInput(e.target.value);
                      setFormData({ ...formData, recruiter: clean });
                      if (jobErrors.recruiter) setJobErrors((prev) => ({ ...prev, recruiter: null }));
                    }}
                    placeholder="e.g. Dhakshan S (letters only)"
                    className={`form-control-input ${jobErrors.recruiter ? 'has-error' : ''}`}
                  />
                  <FieldError error={jobErrors.recruiter} />
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
                    type="text"
                    value={formData.vacancies}
                    onChange={(e) => {
                      const clean = sanitizeNumberInput(e.target.value);
                      setFormData({ ...formData, vacancies: clean });
                      if (jobErrors.vacancies) setJobErrors((prev) => ({ ...prev, vacancies: null }));
                    }}
                    placeholder="e.g. 5 (digits only)"
                    className={`form-control-input ${jobErrors.vacancies ? 'has-error' : ''}`}
                  />
                  <FieldError error={jobErrors.vacancies} />
                </div>
              </div>

              <div className="inpage-grid-3col">
                {/* 13. Location */}
                <div className="form-field-group">
                  <label>Job Location *</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => {
                      setFormData({ ...formData, location: e.target.value });
                      if (jobErrors.location) setJobErrors((prev) => ({ ...prev, location: null }));
                    }}
                    placeholder="e.g. Chennai HQ Campus"
                    className={`form-control-input ${jobErrors.location ? 'has-error' : ''}`}
                  />
                  <FieldError error={jobErrors.location} />
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
                      onKeyDown={(e) => {
                        if (['-', '+', 'e', 'E'].includes(e.key)) e.preventDefault();
                      }}
                      onPaste={(e) => {
                        const pasteData = e.clipboardData.getData('text');
                        if (pasteData.includes('-') || /[^0-9]/.test(pasteData)) {
                          e.preventDefault();
                          const clean = pasteData.replace(/\D/g, '');
                          const val = clean === '' ? '' : Math.max(0, parseInt(clean, 10));
                          setFormData((prev) => ({ ...prev, minExperience: val }));
                        }
                      }}
                      onChange={(e) => {
                        const clean = sanitizeNumberInput(e.target.value);
                        const val = clean === '' ? '' : Math.max(0, parseInt(clean, 10));
                        setFormData({
                          ...formData,
                          minExperience: val,
                        });
                        if (jobErrors.minExperience) {
                          setJobErrors((prev) => ({ ...prev, minExperience: null }));
                        }
                      }}
                      placeholder="Min"
                      className={`form-control-input ${jobErrors.minExperience ? 'has-error' : ''}`}
                    />
                    <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>to</span>
                    <input
                      type="number"
                      min="0"
                      value={formData.maxExperience}
                      onKeyDown={(e) => {
                        if (['-', '+', 'e', 'E'].includes(e.key)) e.preventDefault();
                      }}
                      onPaste={(e) => {
                        const pasteData = e.clipboardData.getData('text');
                        if (pasteData.includes('-') || /[^0-9]/.test(pasteData)) {
                          e.preventDefault();
                          const clean = pasteData.replace(/\D/g, '');
                          const val = clean === '' ? '' : Math.max(0, parseInt(clean, 10));
                          setFormData((prev) => ({ ...prev, maxExperience: val }));
                        }
                      }}
                      onChange={(e) => {
                        const clean = sanitizeNumberInput(e.target.value);
                        const val = clean === '' ? '' : Math.max(0, parseInt(clean, 10));
                        setFormData({
                          ...formData,
                          maxExperience: val,
                        });
                        if (jobErrors.maxExperience) {
                          setJobErrors((prev) => ({ ...prev, maxExperience: null }));
                        }
                      }}
                      placeholder="Max"
                      className={`form-control-input ${jobErrors.maxExperience ? 'has-error' : ''}`}
                    />
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Years</span>
                  </div>
                  <FieldError error={jobErrors.minExperience || jobErrors.maxExperience} />
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
                    inputMode="numeric"
                    value={formData.minSalary}
                    onKeyDown={(e) => {
                      if (['-', '+', 'e', 'E'].includes(e.key)) e.preventDefault();
                    }}
                    onChange={(e) => {
                      const clean = sanitizeNumberInput(e.target.value);
                      setFormData({ ...formData, minSalary: clean });
                      if (jobErrors.minSalary) setJobErrors((prev) => ({ ...prev, minSalary: null }));
                    }}
                    placeholder="e.g. 1800000"
                    className={`form-control-input ${jobErrors.minSalary ? 'has-error' : ''}`}
                  />
                  <FieldError error={jobErrors.minSalary} />
                </div>

                <div className="form-field-group">
                  <label>Maximum Salary (Annual)</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={formData.maxSalary}
                    onKeyDown={(e) => {
                      if (['-', '+', 'e', 'E'].includes(e.key)) e.preventDefault();
                    }}
                    onChange={(e) => {
                      const clean = sanitizeNumberInput(e.target.value);
                      setFormData({ ...formData, maxSalary: clean });
                      if (jobErrors.maxSalary) setJobErrors((prev) => ({ ...prev, maxSalary: null }));
                    }}
                    placeholder="e.g. 2800000"
                    className={`form-control-input ${jobErrors.maxSalary ? 'has-error' : ''}`}
                  />
                  <FieldError error={jobErrors.maxSalary} />
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
                className="btn-cancel-action"
                onClick={handleBackToList}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-save-header-action"
              >
                <Save size={16} />
                <span>{currentView === 'add' ? 'Save & Post Job' : 'Save Changes'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
