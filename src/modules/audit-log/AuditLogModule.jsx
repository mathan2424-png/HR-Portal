import React, { useState, useEffect } from 'react';
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
  Download,
  Loader2,
} from 'lucide-react';
import { FieldError } from '../../components/common/FieldError/FieldError';
import {
  validateName,
  validateRequired,
  sanitizeNameInput,
} from '../../utils/validation';
import { CompanyAuditApi } from '../../Api/Company Audit Api';
import './AuditLogModule.css';

export const AuditLogModule = () => {
  // Audit Logs State
  const [auditLogs, setAuditLogs] = useState([]);
  const [totalEntries, setTotalEntries] = useState(0);
  const [loading, setLoading] = useState(false);

  // Views: 'list' | 'form'
  const [currentView, setCurrentView] = useState('list');
  const [editingId, setEditingId] = useState(null);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [moduleFilter, setModuleFilter] = useState('All');
  const [actionFilter, setActionFilter] = useState('All');
  const [toastMessage, setToastMessage] = useState('');

  // Dropdown options
  const [availableModules, setAvailableModules] = useState([
    'Jobs',
    'Candidate Responses',
    'Screening',
    'Interviews',
    'Offers & Hiring',
    'Users & Roles',
    'Departments & Branches',
    'Subscription',
    'Company Settings',
  ]);
  const [availableActions, setAvailableActions] = useState([
    'Create',
    'Edit',
    'Publish',
    'Approve',
    'Delete',
    'Archive',
  ]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Form State (strictly the 7 requested fields)
  const initialFormState = {
    id: '',
    user: '',
    module: 'Jobs',
    action: 'Create',
    record: '',
    dateTime: '',
    reason: '',
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3500);
  };

  // Fetch filter metadata on mount
  useEffect(() => {
    const loadFilters = async () => {
      try {
        const res = await CompanyAuditApi.getFilterOptions();
        if (res?.success && res.data) {
          if (res.data.modules?.length) setAvailableModules(res.data.modules);
          if (res.data.actions?.length) setAvailableActions(res.data.actions);
        }
      } catch (err) {
        console.error('Failed to load audit filters:', err);
      }
    };
    loadFilters();
  }, []);

  // Fetch audit logs from backend API
  const fetchAuditLogs = async () => {
    setLoading(true);
    try {
      const res = await CompanyAuditApi.getAuditLogs({
        page: currentPage,
        limit: itemsPerPage,
        search: searchQuery,
        module: moduleFilter === 'All' ? '' : moduleFilter,
        action: actionFilter === 'All' ? '' : actionFilter,
      });

      if (res?.success) {
        const list = res.data || res.auditLogs || [];
        const normalized = list.map((item) => ({
          _id: item._id,
          id: item.auditId || item.id,
          user: item.user || item.userName || 'System User',
          module: item.module,
          action: item.action,
          record: item.affectedRecord || item.record,
          dateTime: item.actionDate || item.date || item.dateTime,
          reason: item.reason,
        }));
        setAuditLogs(normalized);
        setTotalEntries(res.total || res.pagination?.total || normalized.length);
      } else {
        setAuditLogs([]);
        setTotalEntries(0);
      }
    } catch (err) {
      console.error('Error fetching audit logs:', err);
      showToast('Error loading audit logs from server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuditLogs();
  }, [currentPage, searchQuery, moduleFilter, actionFilter]);

  const handleOpenAdd = async () => {
    setErrors({});
    let generatedId = 'AUD-2026-001';

    try {
      const res = await CompanyAuditApi.getNextAuditId();
      if (res?.success && res.data?.auditId) {
        generatedId = res.data.auditId;
      }
    } catch (err) {
      console.error('Failed to generate next audit ID:', err);
    }

    const now = new Date();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let hours = now.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const nowStr = `${String(now.getDate()).padStart(2, '0')}-${months[now.getMonth()]}-${now.getFullYear()} ${String(hours).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} ${ampm}`;

    setFormData({
      ...initialFormState,
      id: generatedId,
      user: '',
      module: availableModules[0] || 'Jobs',
      action: 'Create',
      record: '',
      reason: '',
      dateTime: nowStr,
    });
    setEditingId(null);
    setCurrentView('form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenEdit = (item) => {
    setErrors({});
    setFormData({ ...item });
    setEditingId(item.id);
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
    if (field === 'user') {
      sanitized = sanitizeNameInput(value);
    }
    setFormData((prev) => ({ ...prev, [field]: sanitized }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleSaveAudit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.user || !formData.user.trim()) {
      newErrors.user = 'Company user is required.';
    } else {
      const userErr = validateName(formData.user, 'Company user', true);
      if (userErr) newErrors.user = userErr;
    }

    const recErr = validateRequired(formData.record, 'Affected record');
    if (recErr) newErrors.record = recErr;

    const dtErr = validateRequired(formData.dateTime, 'Date & time');
    if (dtErr) newErrors.dateTime = dtErr;

    const reasonErr = validateRequired(formData.reason, 'Reason for action');
    if (reasonErr) newErrors.reason = reasonErr;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      window.scrollTo({ top: 120, behavior: 'smooth' });
      return;
    }

    setErrors({});

    try {
      const payload = {
        auditId: formData.id,
        user: formData.user,
        module: formData.module,
        action: formData.action,
        affectedRecord: formData.record,
        actionDate: formData.dateTime,
        reason: formData.reason,
      };

      const res = await CompanyAuditApi.createAuditLog(payload);
      if (res?.success) {
        showToast(`Audit record "${formData.id}" saved successfully!`);
        setCurrentView('list');
        setEditingId(null);
        fetchAuditLogs();
      } else {
        showToast(res?.message || 'Failed to save audit record.');
      }
    } catch (err) {
      console.error('Failed to save audit record:', err);
      showToast('Error occurred while communicating with server.');
    }
  };

  const handleDelete = (id, user) => {
    if (window.confirm(`Are you sure you want to remove audit record "${id}" by ${user}?`)) {
      setAuditLogs((prev) => prev.filter((item) => item.id !== id));
      showToast(`Audit record "${id}" deleted.`);
    }
  };

  const handleExportCSV = async () => {
    showToast('Exporting Company Audit Log in CSV format...');
    try {
      const blob = await CompanyAuditApi.exportCsv({
        search: searchQuery,
        module: moduleFilter === 'All' ? '' : moduleFilter,
        action: actionFilter === 'All' ? '' : actionFilter,
      });

      if (blob) {
        const url = window.URL.createObjectURL(new Blob([blob], { type: 'text/csv;charset=utf-8;' }));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `company-audit-logs-${new Date().toISOString().slice(0, 10)}.csv`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      }
    } catch (err) {
      console.error('Export CSV error:', err);
      showToast('Failed to export CSV file.');
    }
  };

  // Pagination Logic
  const totalPages = Math.ceil(totalEntries / itemsPerPage) || 1;

  const getActionClass = (action) => {
    switch ((action || '').toLowerCase()) {
      case 'create':
        return 'create';
      case 'edit':
        return 'edit';
      case 'publish':
        return 'publish';
      case 'approve':
        return 'approve';
      case 'delete':
        return 'delete';
      case 'archive':
        return 'archive';
      default:
        return 'edit';
    }
  };

  return (
    <div className="audit-page-container">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="audit-toast-alert">
          <CheckCircle2 size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Page Header */}
      <div className="audit-page-header">
        {currentView === 'list' ? (
          <>
            <div className="audit-header-left">
              <h1 className="audit-page-title">Company Audit Log</h1>
            </div>
            <div className="audit-header-actions">
              <button
                type="button"
                className="btn-export-audit"
                onClick={handleExportCSV}
              >
                <Download size={15} />
                <span>Export Log (CSV)</span>
              </button>
              <button
                className="btn-add-audit"
                onClick={handleOpenAdd}
                id="btn-log-audit"
              >
                <Plus size={16} />
                <span>Log Audit Entry</span>
              </button>
            </div>
          </>
        ) : (
          <>
            <div>
              <h1 className="audit-page-title">
                {editingId ? `Edit Audit Record: ${formData.id}` : 'Create Audit Record Entry'}
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
      <div className="audit-main-card">
        {currentView === 'list' ? (
          <>
            {/* Toolbar: Search (Left) + Filters (Right) */}
            <div className="audit-toolbar">
              <div className="audit-search-box">
                <Search size={16} className="text-muted" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="audit-search-input"
                />
              </div>

              <div className="audit-toolbar-right">
                <select
                  value={moduleFilter}
                  onChange={(e) => {
                    setModuleFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="audit-filter-select"
                >
                  <option value="All">All Modules</option>
                  {availableModules.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>

                <select
                  value={actionFilter}
                  onChange={(e) => {
                    setActionFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="audit-filter-select"
                >
                  <option value="All">All Actions</option>
                  {availableActions.map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Modern Data Table */}
            <div className="audit-table-wrapper">
              <table className="audit-table">
                <thead>
                  <tr>
                    <th>S.NO</th>
                    <th>AUDIT ID</th>
                    <th>USER</th>
                    <th>MODULE</th>
                    <th>ACTION</th>
                    <th>AFFECTED RECORD</th>
                    <th>DATE & TIME</th>
                    <th>REASON</th>
                    <th style={{ textAlign: 'center' }}>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="9" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: '#64748b' }}>
                          <Loader2 size={20} className="animate-spin" />
                          <span>Loading audit logs...</span>
                        </div>
                      </td>
                    </tr>
                  ) : auditLogs.length > 0 ? (
                    auditLogs.map((item, index) => {
                      const serialNumber = (currentPage - 1) * itemsPerPage + index + 1;
                      return (
                        <tr key={item.id || index}>
                          {/* S.NO */}
                          <td style={{ fontWeight: 700, color: '#64748b' }}>
                            {serialNumber}
                          </td>

                          {/* Audit ID */}
                          <td>
                            <span className="aud-id-badge">{item.id}</span>
                          </td>

                          {/* User */}
                          <td>
                            <span className="aud-user-cell">{item.user}</span>
                          </td>

                          {/* Module */}
                          <td>
                            <span className="aud-module-badge">{item.module}</span>
                          </td>

                          {/* Action */}
                          <td>
                            <span className={`aud-action-pill ${getActionClass(item.action)}`}>
                              {item.action}
                            </span>
                          </td>

                          {/* Affected Record */}
                          <td>
                            <span className="aud-record-cell">{item.record}</span>
                          </td>

                          {/* Date & Time */}
                          <td style={{ fontWeight: 600, color: '#475569', fontSize: '0.82rem' }}>
                            {item.dateTime}
                          </td>

                          {/* Reason */}
                          <td>
                            <div className="aud-reason-cell" title={item.reason}>
                              {item.reason || '—'}
                            </div>
                          </td>

                          {/* Actions */}
                          <td style={{ textAlign: 'center' }}>
                            <div className="aud-row-actions">
                              <button
                                type="button"
                                className="action-icon-btn edit"
                                title="Edit Audit Record"
                                onClick={() => handleOpenEdit(item)}
                              >
                                <Edit2 size={15} />
                              </button>
                              <button
                                type="button"
                                className="action-icon-btn delete"
                                title="Delete Audit Record"
                                onClick={() => handleDelete(item.id, item.user)}
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
                      <td colSpan="9">
                        <div className="audit-empty-state">
                          <p>No audit records found matching your filters.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Table Footer Pagination */}
            <div className="audit-table-footer">
              <div>
                Showing {totalEntries > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{' '}
                {Math.min(currentPage * itemsPerPage, totalEntries)} of{' '}
                {totalEntries} audit entries
              </div>

              <div className="audit-pagination-controls">
                <button
                  type="button"
                  className="btn-audit-page"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                >
                  <ChevronLeft size={16} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    type="button"
                    className={`btn-audit-page ${currentPage === page ? 'active' : ''}`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))}

                <button
                  type="button"
                  className="btn-audit-page"
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
             IN-PAGE FORM: Strictly the 7 requested fields (NO MODAL POPUP)
             ===================================================================== */
          <form onSubmit={handleSaveAudit} className="inpage-audit-form" noValidate>
            {/* Section 1: Audit Identifier, User & Affected Target */}
            <div className="inpage-section-box">
              <div className="inpage-section-header">
                1. AUDIT IDENTIFIER, USER & AFFECTED TARGET
              </div>
              <div className="inpage-grid-2col">
                {/* 1. Audit ID */}
                <div className="form-field-group">
                  <label>Audit ID *</label>
                  <input
                    type="text"
                    className="form-control-input readonly"
                    value={formData.id}
                    readOnly
                  />
                </div>

                {/* 2. User */}
                <div className="form-field-group">
                  <label>Company User (Who performed the action) *</label>
                  <input
                    type="text"
                    className={`form-control-input ${errors.user ? 'has-error' : ''}`}
                    placeholder="e.g. Rajeshwaran K (Company Admin)"
                    value={formData.user}
                    onChange={(e) => handleInputChange('user', e.target.value)}
                  />
                  <FieldError error={errors.user} />
                </div>

                {/* 3. Module */}
                <div className="form-field-group">
                  <label>Affected Module *</label>
                  <select
                    className="form-control-select"
                    value={formData.module}
                    onChange={(e) => handleInputChange('module', e.target.value)}
                  >
                    {availableModules.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>

                {/* 4. Action */}
                <div className="form-field-group">
                  <label>Action Performed *</label>
                  <select
                    className="form-control-select"
                    value={formData.action}
                    onChange={(e) => handleInputChange('action', e.target.value)}
                  >
                    {availableActions.map((a) => (
                      <option key={a} value={a}>{a}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Section 2: Record Details, Timeliness & Justification */}
            <div className="inpage-section-box">
              <div className="inpage-section-header">
                2. RECORD DETAILS, TIMELINESS & JUSTIFICATION
              </div>
              <div className="inpage-grid-2col">
                {/* 5. Record */}
                <div className="form-field-group">
                  <label>Affected Record (Job / Candidate / Interview / Offer / etc.) *</label>
                  <input
                    type="text"
                    className={`form-control-input ${errors.record ? 'has-error' : ''}`}
                    placeholder="e.g. Senior Frontend Engineer (JOB-2026-001)"
                    value={formData.record}
                    onChange={(e) => handleInputChange('record', e.target.value)}
                  />
                  <FieldError error={errors.record} />
                </div>

                {/* 6. Date & Time */}
                <div className="form-field-group">
                  <label>Date & Time (Action timestamp) *</label>
                  <input
                    type="text"
                    className={`form-control-input ${errors.dateTime ? 'has-error' : ''}`}
                    placeholder="e.g. 12-Oct-2026 05:45 PM"
                    value={formData.dateTime}
                    onChange={(e) => handleInputChange('dateTime', e.target.value)}
                  />
                  <FieldError error={errors.dateTime} />
                </div>
              </div>

              {/* 7. Reason */}
              <div className="form-field-group" style={{ marginTop: '0.25rem' }}>
                <label>Reason for Important Action *</label>
                <textarea
                  className={`form-control-textarea ${errors.reason ? 'has-error' : ''}`}
                  rows={3}
                  placeholder="Explain justification, authorization notes, approval details, or change reason..."
                  value={formData.reason}
                  onChange={(e) => handleInputChange('reason', e.target.value)}
                />
                <FieldError error={errors.reason} />
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
                id="btn-save-audit"
              >
                <Save size={16} />
                <span>Save Audit Record</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
