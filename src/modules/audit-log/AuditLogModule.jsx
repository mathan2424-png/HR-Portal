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
  Download,
} from 'lucide-react';
import './AuditLogModule.css';

export const AuditLogModule = () => {
  // STRICTLY and ONLY the 7 user-requested fields:
  // 1. Audit ID: Unique audit record.
  // 2. User: Company user who performed the action.
  // 3. Module: Affected module.
  // 4. Action: Create, edit, publish, delete, approve, etc.
  // 5. Record: Affected job/candidate/interview/etc.
  // 6. Date & Time: Action timestamp.
  // 7. Reason: Reason for important actions.

  const [auditLogs, setAuditLogs] = useState([
    {
      id: 'AUD-2026-001',
      user: 'Rajeshwaran K (Company Admin)',
      module: 'Jobs',
      action: 'Publish',
      record: 'Senior Frontend Engineer (JOB-2026-001)',
      dateTime: '12-Oct-2026 05:30 PM',
      reason: 'Job requirement approved by VP Engineering following Q4 hiring budget release.',
    },
    {
      id: 'AUD-2026-002',
      user: 'Abinaya R (Senior HR Manager)',
      module: 'Offers & Hiring',
      action: 'Approve',
      record: 'Staff Software Engineer Offer (OFR-2026-001 - Priya Sharma)',
      dateTime: '12-Oct-2026 04:45 PM',
      reason: 'Candidate cleared technical and managerial rounds with highest evaluation ratings.',
    },
    {
      id: 'AUD-2026-003',
      user: 'Sundar Raman (Eng Lead)',
      module: 'Interviews',
      action: 'Edit',
      record: 'DevOps System Design Round (INT-2026-003 - Karthik V)',
      dateTime: '12-Oct-2026 02:20 PM',
      reason: 'Rescheduled interview slot upon candidate formal request due to travel conflict.',
    },
    {
      id: 'AUD-2026-004',
      user: 'Senthamizh Selvan (Finance Admin)',
      module: 'Subscription',
      action: 'Create',
      record: 'Invoice Payment (INV-2026-104 - ₹49,999 Enterprise Plan)',
      dateTime: '11-Oct-2026 11:15 AM',
      reason: 'Monthly plan auto-renewal processed and credit pool refilled for matching alerts.',
    },
    {
      id: 'AUD-2026-005',
      user: 'Karthik Raja (Design Head)',
      module: 'Screening',
      action: 'Create',
      record: 'Design Systems & Figma Assessment (SCRN-002)',
      dateTime: '10-Oct-2026 03:40 PM',
      reason: 'New mandatory multi-choice screening criteria added for Lead Product Designer role.',
    },
    {
      id: 'AUD-2026-006',
      user: 'Rajeshwaran K (Company Admin)',
      module: 'Users & Roles',
      action: 'Delete',
      record: 'Inactive Contractor Account (USR-108 - Guest Reviewer)',
      dateTime: '09-Oct-2026 06:10 PM',
      reason: 'Recruitment assignment expired; access permissions revoked per security policy.',
    },
    {
      id: 'AUD-2026-007',
      user: 'Abinaya R (Senior HR Manager)',
      module: 'Candidate Responses',
      action: 'Edit',
      record: 'Candidate Response Stage (CAN-1048 - Sneha Patel)',
      dateTime: '08-Oct-2026 01:25 PM',
      reason: 'Candidate withdrawn; application archived under competing counter-offer.',
    },
  ]);

  // Views: 'list' | 'form'
  const [currentView, setCurrentView] = useState('list');
  const [editingId, setEditingId] = useState(null);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [moduleFilter, setModuleFilter] = useState('All');
  const [actionFilter, setActionFilter] = useState('All');
  const [toastMessage, setToastMessage] = useState('');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

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

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3500);
  };

  const handleOpenAdd = () => {
    const nextNum = auditLogs.length + 1;
    const generatedId = `AUD-2026-${String(nextNum).padStart(3, '0')}`;
    setFormData({
      ...initialFormState,
      id: generatedId,
      user: 'Rajeshwaran K (Company Admin)',
      dateTime: '12-Oct-2026 05:45 PM',
    });
    setEditingId(null);
    setCurrentView('form');
  };

  const handleOpenEdit = (item) => {
    setFormData({ ...item });
    setEditingId(item.id);
    setCurrentView('form');
  };

  const handleCancelForm = () => {
    setCurrentView('list');
    setEditingId(null);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveAudit = (e) => {
    e.preventDefault();
    if (!formData.user.trim()) {
      alert('Please enter User who performed the action.');
      return;
    }
    if (!formData.record.trim()) {
      alert('Please enter Affected Record.');
      return;
    }
    if (!formData.reason.trim()) {
      alert('Please provide Reason for this action.');
      return;
    }

    if (editingId) {
      setAuditLogs((prev) =>
        prev.map((item) => (item.id === editingId ? { ...formData } : item))
      );
      showToast(`Audit log "${formData.id}" updated successfully!`);
    } else {
      setAuditLogs((prev) => [formData, ...prev]);
      showToast(`Audit record "${formData.id}" logged successfully!`);
    }

    setCurrentView('list');
    setEditingId(null);
  };

  const handleDelete = (id, user) => {
    if (window.confirm(`Are you sure you want to remove audit record "${id}" by ${user}?`)) {
      setAuditLogs((prev) => prev.filter((item) => item.id !== id));
      showToast(`Audit record "${id}" deleted.`);
    }
  };

  const handleExportCSV = () => {
    showToast('Exporting Company Audit Log in CSV format...');
  };

  // Filter & Search Logic
  const filteredAuditLogs = auditLogs.filter((item) => {
    const matchesSearch =
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.module.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.record.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.reason.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesModule =
      moduleFilter === 'All' || item.module === moduleFilter;

    const matchesAction =
      actionFilter === 'All' || item.action === actionFilter;

    return matchesSearch && matchesModule && matchesAction;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredAuditLogs.length / itemsPerPage) || 1;
  const paginatedAuditLogs = filteredAuditLogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getActionClass = (action) => {
    switch (action.toLowerCase()) {
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
              1
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
          <div className="audit-inpage-header-left">
            <button
              type="button"
              className="btn-back-audit"
              onClick={handleCancelForm}
            >
              <ArrowLeft size={16} />
              <span>Back to Audit Log</span>
            </button>
            <h1 className="audit-page-title">
              {editingId ? `Edit Audit Record: ${formData.id}` : 'Create Audit Record Entry'}
            </h1>
          </div>
        )}
      </div>

      {/* Main Single Card Container */}
      <div className="audit-main-card">
        {currentView === 'list' ? (
          <>
            {/* Toolbar & Filters */}
            <div className="audit-toolbar">
              <div className="audit-toolbar-left">
                <div className="audit-search-box">
                  <Search size={16} className="text-muted" />
                  <input
                    type="text"
                    placeholder="Search user, module, action, record, ID..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="audit-search-input"
                  />
                </div>

                <select
                  value={moduleFilter}
                  onChange={(e) => {
                    setModuleFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="audit-filter-select"
                >
                  <option value="All">All Modules</option>
                  <option value="Jobs">Jobs</option>
                  <option value="Candidate Responses">Candidate Responses</option>
                  <option value="Screening">Screening</option>
                  <option value="Interviews">Interviews</option>
                  <option value="Offers & Hiring">Offers & Hiring</option>
                  <option value="Users & Roles">Users & Roles</option>
                  <option value="Subscription">Subscription</option>
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
                  <option value="Create">Create</option>
                  <option value="Edit">Edit</option>
                  <option value="Publish">Publish</option>
                  <option value="Approve">Approve</option>
                  <option value="Delete">Delete</option>
                </select>
              </div>

              {/* Quick Stat Chips */}
              <div className="audit-toolbar-stats">
                <span className="audit-stat-chip">
                  Total: {auditLogs.length}
                </span>
                <span className="audit-stat-chip create">
                  Creates: {auditLogs.filter((a) => a.action === 'Create').length}
                </span>
                <span className="audit-stat-chip edit">
                  Edits: {auditLogs.filter((a) => a.action === 'Edit').length}
                </span>
                <span className="audit-stat-chip approve">
                  Approvals: {auditLogs.filter((a) => a.action === 'Approve' || a.action === 'Publish').length}
                </span>
                <span className="audit-stat-chip delete">
                  Deletions: {auditLogs.filter((a) => a.action === 'Delete').length}
                </span>
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
                  {paginatedAuditLogs.length > 0 ? (
                    paginatedAuditLogs.map((item, index) => {
                      const serialNumber = (currentPage - 1) * itemsPerPage + index + 1;
                      return (
                        <tr key={item.id}>
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
                              {item.reason}
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
                Showing {filteredAuditLogs.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{' '}
                {Math.min(currentPage * itemsPerPage, filteredAuditLogs.length)} of{' '}
                {filteredAuditLogs.length} audit entries
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
          <form onSubmit={handleSaveAudit} className="inpage-audit-form">
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
                    className="form-control-input"
                    placeholder="e.g. Rajeshwaran K (Company Admin)"
                    value={formData.user}
                    onChange={(e) => handleInputChange('user', e.target.value)}
                    required
                  />
                </div>

                {/* 3. Module */}
                <div className="form-field-group">
                  <label>Affected Module *</label>
                  <select
                    className="form-control-select"
                    value={formData.module}
                    onChange={(e) => handleInputChange('module', e.target.value)}
                  >
                    <option value="Jobs">Jobs</option>
                    <option value="Candidate Responses">Candidate Responses</option>
                    <option value="Screening">Screening</option>
                    <option value="Interviews">Interviews</option>
                    <option value="Offers & Hiring">Offers & Hiring</option>
                    <option value="Users & Roles">Users & Roles</option>
                    <option value="Departments & Branches">Departments & Branches</option>
                    <option value="Subscription">Subscription</option>
                    <option value="Company Settings">Company Settings</option>
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
                    <option value="Create">Create</option>
                    <option value="Edit">Edit</option>
                    <option value="Publish">Publish</option>
                    <option value="Approve">Approve</option>
                    <option value="Delete">Delete</option>
                    <option value="Archive">Archive</option>
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
                    className="form-control-input"
                    placeholder="e.g. Senior Frontend Engineer (JOB-2026-001)"
                    value={formData.record}
                    onChange={(e) => handleInputChange('record', e.target.value)}
                    required
                  />
                </div>

                {/* 6. Date & Time */}
                <div className="form-field-group">
                  <label>Date & Time (Action timestamp) *</label>
                  <input
                    type="text"
                    className="form-control-input"
                    placeholder="e.g. 12-Oct-2026 05:45 PM"
                    value={formData.dateTime}
                    onChange={(e) => handleInputChange('dateTime', e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* 7. Reason */}
              <div className="form-field-group" style={{ marginTop: '0.25rem' }}>
                <label>Reason for Important Action *</label>
                <textarea
                  className="form-control-textarea"
                  rows="3"
                  placeholder="Explain justification, authorization notes, approval details, or change reason..."
                  value={formData.reason}
                  onChange={(e) => handleInputChange('reason', e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Bottom Form Actions */}
            <div className="inpage-form-footer">
              <button
                type="button"
                className="btn-cancel-audit"
                onClick={handleCancelForm}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-save-audit"
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
