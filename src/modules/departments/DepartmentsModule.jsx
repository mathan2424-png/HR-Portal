import React, { useState, useEffect } from 'react';
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
  Building2,
} from 'lucide-react';
import { FieldError } from '../../components/common/FieldError/FieldError';
import {
  validateName,
  validateRequired,
  sanitizeNameInput,
} from '../../utils/validation';
import './DepartmentsModule.css';
import { DepartmentsApi } from '../../Api/DepartmentsApi';
import { Toast } from '../../components/common/Toast/Toast';
import { ConfirmDeleteModal } from '../../components/common/ConfirmDeleteModal';

export const DepartmentsModule = () => {
  // Real department records from backend API
  const [records, setRecords] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Views: 'list' | 'add' | 'edit'
  const [currentView, setCurrentView] = useState('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  // Toast Notification State
  const [toast, setToast] = useState(null); // { message: string, type: 'success' | 'delete' | 'error' | 'info' | 'warning' }

  // Delete confirmation modal state
  const [deleteConfirm, setDeleteConfirm] = useState({
    isOpen: false,
    record: null,
    isLoading: false,
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Form State: strictly Department Name, Department ID (Auto-generated), Department Head, Status
  const initialFormState = {
    id: '',
    departmentId: '',
    departmentName: '',
    departmentHead: '',
    status: 'Active',
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  // Helper: Auto-generate sequential Department ID (DEP-101, DEP-102, etc.)
  const generateDeptId = (existingList = []) => {
    const nums = existingList
      .map((r) => {
        const match = (r.departmentId || '').match(/\d+/);
        return match ? parseInt(match[0], 10) : 0;
      })
      .filter((n) => !isNaN(n) && n > 0);
    const maxNum = nums.length > 0 ? Math.max(...nums) : 100;
    return `DEP-${maxNum + 1}`;
  };

  const handleFieldChange = (field, val) => {
    let sanitized = val;
    if (field === 'departmentHead') {
      sanitized = sanitizeNameInput(val);
    }
    setFormData((prev) => ({ ...prev, [field]: sanitized }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  // Show Toast
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // ─── LOAD DEPARTMENTS FROM BACKEND API ───────────────────────────
  const loadDepartments = async (
    page = currentPage,
    search = searchTerm,
    status = statusFilter
  ) => {
    setIsLoading(true);
    try {
      const params = {
        page,
        limit: itemsPerPage,
      };
      if (search && search.trim()) {
        params.search = search.trim();
      }
      if (status && status !== 'All') {
        params.status = status;
      }

      const res = await DepartmentsApi.getDepartments(params);
      const data = res?.data || res;
      const list = Array.isArray(data?.departments)
        ? data.departments
        : Array.isArray(data)
        ? data
        : [];

      setRecords(list);

      if (data?.pagination) {
        setTotalRecords(data.pagination.total ?? list.length);
        setTotalPages(data.pagination.totalPages ?? (Math.ceil((data.pagination.total || list.length) / itemsPerPage) || 1));
      } else {
        const tot = res?.total ?? list.length;
        setTotalRecords(tot);
        setTotalPages(Math.ceil(tot / itemsPerPage) || 1);
      }
    } catch (err) {
      console.error('Failed to load departments from API:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Live Server-side Query debounced 300ms
  useEffect(() => {
    const timer = setTimeout(() => {
      loadDepartments(currentPage, searchTerm, statusFilter);
    }, 300);

    return () => clearTimeout(timer);
  }, [currentPage, searchTerm, statusFilter]);

  // Use server records directly
  const paginatedRecords = records;
  const filteredRecords = records;

  // Handler: Open Add View with live backend auto-generated Department ID
  const handleOpenAdd = async () => {
    setErrors({});
    setFormData({
      id: '',
      departmentId: 'Generating...',
      departmentName: '',
      departmentHead: '',
      status: 'Active',
    });
    setCurrentView('add');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      const res = await DepartmentsApi.getNextDepartmentId();
      if (res && res.success && res.data?.departmentId) {
        setFormData((prev) => ({
          ...prev,
          departmentId: res.data.departmentId,
        }));
      } else {
        // Fallback to local sequence if needed
        const autoId = generateDeptId(records);
        setFormData((prev) => ({ ...prev, departmentId: autoId }));
      }
    } catch (err) {
      console.error('Error fetching next department ID:', err);
      const autoId = generateDeptId(records);
      setFormData((prev) => ({ ...prev, departmentId: autoId }));
    }
  };

  // Handler: Open Edit View
  const handleOpenEdit = (record) => {
    setErrors({});
    setFormData({
      _id: record._id,
      id: record.id || record.departmentId,
      departmentId: record.departmentId || '',
      departmentName: record.departmentName || '',
      departmentHead: record.departmentHead || '',
      status: record.status || 'Active',
    });
    setCurrentView('edit');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler: Back to List
  const handleBackToList = () => {
    setErrors({});
    setCurrentView('list');
    setFormData(initialFormState);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler: Save (Add or Edit) via Backend API
  const handleSaveRecord = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const newErrors = {};

    const deptNameErr = validateRequired(formData.departmentName, 'Department Name');
    if (deptNameErr) {
      newErrors.departmentName = deptNameErr;
    }

    const deptHeadErr = validateRequired(formData.departmentHead, 'Department Head');
    if (deptHeadErr) {
      newErrors.departmentHead = deptHeadErr;
    } else {
      const headNameErr = validateName(formData.departmentHead, 'Department Head', true);
      if (headNameErr) newErrors.departmentHead = headNameErr;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      window.scrollTo({ top: 120, behavior: 'smooth' });
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      if (currentView === 'add') {
        const payload = {
          departmentName: formData.departmentName.trim(),
          departmentHead: formData.departmentHead.trim(),
          departmentId: formData.departmentId,
          status: formData.status,
        };

        const res = await DepartmentsApi.createDepartment(payload);
        if (res && res.success) {
          showToast(res.message || `Department "${payload.departmentName}" added successfully.`, 'success');
          await loadDepartments(1, searchTerm, statusFilter);
          handleBackToList();
        } else {
          showToast(res?.message || 'Failed to add department', 'error');
          if (res?.message && res.message.toLowerCase().includes('already exists')) {
            setErrors({ departmentName: res.message });
          }
        }
      } else if (currentView === 'edit') {
        const editId = formData._id || formData.departmentId;
        const payload = {
          departmentName: formData.departmentName.trim(),
          departmentHead: formData.departmentHead.trim(),
          status: formData.status,
        };

        const res = await DepartmentsApi.updateDepartment(editId, payload);
        if (res && res.success) {
          showToast(res.message || `Department "${payload.departmentName}" updated successfully.`, 'success');
          await loadDepartments(currentPage, searchTerm, statusFilter);
          handleBackToList();
        } else {
          showToast(res?.message || 'Failed to update department', 'error');
          if (res?.message && res.message.toLowerCase().includes('already exists')) {
            setErrors({ departmentName: res.message });
          }
        }
      }
    } catch (err) {
      console.error('Error saving department:', err);
      showToast(err.response?.data?.message || err.message || 'Error saving department', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handler: Toggle Status via Backend API
  const handleToggleStatus = async (record) => {
    const targetId = record._id || record.departmentId;
    try {
      const res = await DepartmentsApi.toggleDepartmentStatus(targetId);
      if (res && res.success) {
        showToast(res.message || `Status for "${record.departmentName}" updated.`, 'success');
        await loadDepartments(currentPage, searchTerm, statusFilter);
      } else {
        showToast(res?.message || 'Failed to change status', 'error');
      }
    } catch (err) {
      console.error('Error toggling status:', err);
      showToast('Failed to change status', 'error');
    }
  };

  // Handler: Delete Record via Backend API
  const handleDeleteRecord = (record) => {
    setDeleteConfirm({
      isOpen: true,
      record,
      isLoading: false,
    });
  };

  const handleConfirmDelete = async () => {
    if (!deleteConfirm.record) return;
    const record = deleteConfirm.record;
    setDeleteConfirm((prev) => ({ ...prev, isLoading: true }));
    const targetId = record._id || record.departmentId;
    try {
      const res = await DepartmentsApi.deleteDepartment(targetId);
      if (res && res.success) {
        showToast(res.message || `Department "${record.departmentName}" deleted successfully.`, 'delete');
        await loadDepartments(currentPage, searchTerm, statusFilter);
      } else {
        showToast(res?.message || 'Failed to delete department', 'error');
      }
    } catch (err) {
      console.error('Error deleting department:', err);
      showToast(err.response?.data?.message || err.message || 'Failed to delete department', 'error');
    } finally {
      setDeleteConfirm({ isOpen: false, record: null, isLoading: false });
    }
  };

  return (
    <div className="dept-page-container">
      {/* =========================================================================
          MODULE HEADER
          ========================================================================= */}
      <div className="dept-page-header">
        {currentView === 'list' ? (
          <>
            <div>
              <h1 className="dept-page-title">Departments</h1>
            </div>
            <button
              type="button"
              className="btn-add-dept"
              onClick={handleOpenAdd}
              id="btn-add-department"
            >
              <Plus size={16} strokeWidth={2.5} />
              <span>Add Department</span>
            </button>
          </>
        ) : (
          <>
            <div>
              <h1 className="dept-page-title">
                {currentView === 'add'
                  ? 'Add Department'
                  : `Edit Department — ${formData.departmentName}`}
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
          deleteConfirm.record
            ? `Are you sure you want to delete department "${deleteConfirm.record.departmentName}"? This action cannot be undone.`
            : 'Are you sure you want to delete this department? This action cannot be undone.'
        }
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={deleteConfirm.isLoading}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteConfirm({ isOpen: false, record: null, isLoading: false })}
      />

      {/* =========================================================================
          MAIN CARD CONTAINER
          ========================================================================= */}
      <div className="dept-main-card">
        {/* =======================================================================
            VIEW 1: DIRECTORY TABLE (Shown when currentView === 'list')
            ======================================================================= */}
        {currentView === 'list' && (
          <>
            {/* Toolbar: Search (Left) + Status Filter (Right) */}
            <div className="dept-toolbar">
              <div className="dept-search-box">
                <Search size={16} style={{ color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  placeholder="Search departments..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="dept-search-input"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="dept-filter-select"
              >
                <option value="All">All Status</option>
                <option value="Active">Active Only</option>
                <option value="Inactive">Inactive Only</option>
              </select>
            </div>

            {/* Table with EXACT requested column headers:
                S.No | Department Name | Department ID | Department Head | Status | Actions */}
            <div className="dept-table-wrapper">
              <table className="dept-table">
                <thead>
                  <tr>
                    <th style={{ width: '70px', textAlign: 'center' }}>S.No</th>
                    <th style={{ width: '180px' }}>Department ID</th>
                    <th>Department Name</th>
                    <th>Department Head</th>
                    <th style={{ width: '140px' }}>Status</th>
                    <th style={{ textAlign: 'center', width: '130px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan={6} style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
                        Loading departments from database...
                      </td>
                    </tr>
                  ) : filteredRecords.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="dept-empty-state">
                        <p style={{ fontWeight: 600, margin: '0 0 0.25rem' }}>
                          No departments found
                        </p>
                        <p style={{ fontSize: '0.8rem', margin: 0 }}>
                          Try adjusting your search terms or status filter
                        </p>
                      </td>
                    </tr>
                  ) : (
                    paginatedRecords.map((rec, index) => {
                      const serialNumber =
                        (currentPage - 1) * itemsPerPage + index + 1;
                      return (
                        <tr key={rec.id || rec.departmentId}>
                          {/* 1. S.No */}
                          <td
                            style={{
                              fontWeight: 600,
                              color: 'var(--text-muted)',
                              textAlign: 'center',
                            }}
                          >
                            {serialNumber}
                          </td>

                          {/* 2. Department ID */}
                          <td>
                            <span className="dept-id-badge">
                              {rec.departmentId}
                            </span>
                          </td>

                          {/* 3. Department Name */}
                          <td>
                            <span className="dept-name-text">
                              {rec.departmentName}
                            </span>
                          </td>

                          {/* 4. Department Head */}
                          <td>
                            <div className="dept-head-cell">
                              {/*  */}
                              <span className="dept-head-name">
                                {rec.departmentHead || '—'}
                              </span>
                            </div>
                          </td>

                          {/* 5. Status */}
                          <td>
                            <span
                              className={`status-pill ${
                                rec.status === 'Active' ? 'active' : 'inactive'
                              }`}
                            >
                              <span className="status-dot"></span>
                              {rec.status}
                            </span>
                          </td>

                          {/* 6. Actions */}
                          <td>
                            <div
                              className="dept-row-actions"
                              style={{ justifyContent: 'center' }}
                            >
                              <button
                                type="button"
                                className="action-icon-btn edit"
                                title="Edit Department"
                                onClick={() => handleOpenEdit(rec)}
                              >
                                <Edit2 size={15} />
                              </button>

                              <button
                                type="button"
                                className="action-icon-btn status-toggle"
                                title={
                                  rec.status === 'Active'
                                    ? 'Deactivate Department'
                                    : 'Activate Department'
                                }
                                onClick={() => handleToggleStatus(rec)}
                              >
                                {rec.status === 'Active' ? (
                                  <Lock size={15} />
                                ) : (
                                  <Unlock size={15} />
                                )}
                              </button>

                              <button
                                type="button"
                                className="action-icon-btn delete"
                                title="Delete Department"
                                onClick={() => handleDeleteRecord(rec)}
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
            <div className="dept-table-footer">
              <div>
                Showing{' '}
                {filteredRecords.length > 0
                  ? (currentPage - 1) * itemsPerPage + 1
                  : 0}{' '}
                to{' '}
                {Math.min(currentPage * itemsPerPage, filteredRecords.length)}{' '}
                of {filteredRecords.length} Entries
              </div>

              <div className="dept-pagination-controls">
                <button
                  type="button"
                  className="btn-dept-page"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  title="Previous Page"
                >
                  <ChevronLeft size={14} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      type="button"
                      className={`btn-dept-page ${
                        currentPage === page ? 'active' : ''
                      }`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  )
                )}
                <button
                  type="button"
                  className="btn-dept-page"
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  title="Next Page"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </>
        )}

        {/* =======================================================================
            VIEW 2: IN-PAGE ADD / EDIT FORM (NO MODALS / POPUPS!)
            Strictly the user requested fields:
            • Department Name
            • Department ID (Auto-generated)
            • Department Head
            • Status (Active / Inactive)
            ======================================================================= */}
        {currentView !== 'list' && (
          <form
            id="inpage-dept-form"
            onSubmit={handleSaveRecord}
            className="inpage-dept-form"
            noValidate
          >
            <div className="inpage-section-box">
              <div className="inpage-section-header">
                DEPARTMENT DETAILS
              </div>

              <div className="inpage-grid-2col">
                {/* 1. Department ID (Auto-generated) */}
                <div className="form-field-group">
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <label>Department ID (Auto-generated)</label>
                    <span className="auto-gen-pill">Auto</span>
                  </div>
                  <input
                    type="text"
                    value={formData.departmentId}
                    readOnly
                    className="form-control-input auto-generated"
                    title="System generated unique Department ID"
                  />
                  <span className="form-field-hint">
                    System generated unique department identifier
                  </span>
                </div>

                {/* 2. Department Name */}
                <div className="form-field-group">
                  <label>Department Name *</label>
                  <input
                    type="text"
                    value={formData.departmentName}
                    onChange={(e) =>
                      handleFieldChange('departmentName', e.target.value)
                    }
                    placeholder="Enter department name (e.g. Engineering & Technology)"
                    className={`form-control-input ${
                      errors.departmentName ? 'has-error' : ''
                    }`}
                    autoFocus
                  />
                  <FieldError error={errors.departmentName} />
                </div>

                {/* 3. Department Head */}
                <div className="form-field-group">
                  <label>Department Head *</label>
                  <input
                    type="text"
                    value={formData.departmentHead}
                    onChange={(e) =>
                      handleFieldChange('departmentHead', e.target.value)
                    }
                    placeholder="Enter head of department (e.g. Sundar Raman)"
                    className={`form-control-input ${
                      errors.departmentHead ? 'has-error' : ''
                    }`}
                  />
                  <FieldError error={errors.departmentHead} />
                </div>

                {/* 4. Status (Active / Inactive) */}
                <div className="form-field-group">
                  <label>Status (Active / Inactive) *</label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className="form-control-select"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Form Footer Buttons */}
            <div className="inpage-form-footer">
              <button
                type="button"
                className="btn-cancel-action"
                onClick={handleBackToList}
              >
                Cancel
              </button>
              <button type="submit" className="btn-save-header-action">
                <Save size={16} />
                <span>
                  {currentView === 'add' ? 'Add Department' : 'Save Changes'}
                </span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
