import { api } from '../../Api/Api';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  ChevronLeft,
  ChevronRight,
  Filter,
  ArrowLeft,
} from 'lucide-react';
import { Toast } from '../../components/common/Toast/Toast';
import { ConfirmDeleteModal } from '../../components/common/ConfirmDeleteModal';
import { FieldError } from '../../components/common/FieldError/FieldError';
import './MastersModule.css';

const DEFAULT_CATEGORIES = {
  'job-categories': {
    id: 'job-categories',
    label: 'Job Categories',
    singular: 'Job Category',
  },
  'skills': {
    id: 'skills',
    label: 'Skills & Proficiencies',
    singular: 'Skill',
  },
  'industries': {
    id: 'industries',
    label: 'Industries',
    singular: 'Industry',
  },
  'locations': {
    id: 'locations',
    label: 'Primary Job Locations',
    singular: 'Location',
  },
  'employment-types': {
    id: 'employment-types',
    label: 'Employment Types',
    singular: 'Employment Type',
  },
  'work-modes': {
    id: 'work-modes',
    label: 'Work Modes',
    singular: 'Work Mode',
  },
  'qualifications': {
    id: 'qualifications',
    label: 'Academic Qualifications',
    singular: 'Qualification',
  },
};

const TAB_ENDPOINTS = {
  'job-categories': '/job-categories',
  'skills': '/skills',
  'industries': '/industries',
  'locations': '/job-locations',
  'employment-types': '/employment-types',
  'work-modes': '/work-modes',
  'qualifications': '/academic-qualifications',
};

const formatDisplayDate = (d) => {
  if (!d) return '—';
  try {
    const parts = d.split('-');
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      const dt = new Date(year, month, day);
      if (!isNaN(dt.getTime())) {
        return dt.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        });
      }
    }
    const parsed = new Date(d);
    if (!isNaN(parsed.getTime())) {
      return parsed.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
    }
  } catch {}
  return d;
};

const formatItem = (it) => ({
  id: it._id || it.id,
  _id: it._id || it.id,
  title: it.name || it.title || 'Untitled',
  name: it.name || it.title || 'Untitled',
  status: it.status || (it.isActive === false ? 'Inactive' : 'Active'),
  startDate: it.startDate || (it.createdAt ? it.createdAt.slice(0, 10) : '2026-01-01'),
  createdAt: it.createdAt,
});

const extractItems = (data) => {
  if (!data) return [];
  if (Array.isArray(data)) return data.map(formatItem);
  const arrayField =
    data.records ||
    data.items ||
    data.categories ||
    data.skills ||
    data.industries ||
    data.locations ||
    data.employmentTypes ||
    data.workModes ||
    data.qualifications ||
    Object.values(data).find((v) => Array.isArray(v));

  if (Array.isArray(arrayField)) {
    return arrayField.map(formatItem);
  }
  return [];
};

export const MastersModule = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');
  const initialTab =
    tabParam && DEFAULT_CATEGORIES[tabParam] ? tabParam : 'job-categories';

  const [activeTab, setActiveTab] = useState(initialTab);
  const [items, setItems] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [toast, setToast] = useState(null);

  // Delete Confirmation Modal State
  const [deleteConfirm, setDeleteConfirm] = useState({
    isOpen: false,
    item: null,
    isLoading: false,
  });

  // Pagination (Matching Company Details Pattern - 10 per page)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // In-Page View State (Matching Company Details Pattern - No Popups!)
  const [currentView, setCurrentView] = useState('list');
  const [editingItem, setEditingItem] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [modalForm, setModalForm] = useState({
    title: '',
    startDate: new Date().toISOString().split('T')[0],
    status: 'Active',
  });

  const activeCategory =
    DEFAULT_CATEGORIES[activeTab] || DEFAULT_CATEGORIES['job-categories'];

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // Sync with URL query parameter
  useEffect(() => {
    if (tabParam && DEFAULT_CATEGORIES[tabParam] && tabParam !== activeTab) {
      setActiveTab(tabParam);
      setSearchTerm('');
      setStatusFilter('ALL');
      setCurrentPage(1);
      setCurrentView('list');
      setFormErrors({});
    }
  }, [tabParam, activeTab]);

  // Live Server-Side Fetch with Search, Filter & Pagination (debounced 300ms)
  const fetchMasterData = async (
    page = currentPage,
    search = searchTerm,
    status = statusFilter,
    tab = activeTab
  ) => {
    const endpoint = TAB_ENDPOINTS[tab];
    if (!endpoint) return;

    try {
      setIsLoading(true);
      const cleanParams = {
        page,
        limit: itemsPerPage,
      };
      if (search && search.trim()) {
        cleanParams.search = search.trim();
      }
      if (status && status !== 'ALL' && status !== 'All') {
        cleanParams.status = status;
      }

      const response = await api.get(endpoint, { params: cleanParams });
      const result = response.data;
      if (result && result.success) {
        const list = extractItems(result.data);
        setItems(list);
        setTotalPages(result.data?.pagination?.totalPages || 1);
        setTotalRecords(
          typeof result.data?.pagination?.total === 'number'
            ? result.data.pagination.total
            : typeof result.data?.total === 'number'
            ? result.data.total
            : list.length
        );
      }
    } catch (err) {
      console.error('Error fetching master data:', err);
      const serverMsg =
        err.response?.data?.message || 'Failed to fetch records from backend';
      showToast(serverMsg, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchMasterData(currentPage, searchTerm, statusFilter, activeTab);
    }, 300);

    return () => clearTimeout(timer);
  }, [activeTab, currentPage, searchTerm, statusFilter]);

  const handleTabChange = (key) => {
    setActiveTab(key);
    setSearchParams({ tab: key });
    setSearchTerm('');
    setStatusFilter('ALL');
    setCurrentPage(1);
    setCurrentView('list');
    setFormErrors({});
  };

  // In-Page Add Form
  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormErrors({});
    setModalForm({
      title: '',
      startDate: new Date().toISOString().split('T')[0],
      status: 'Active',
    });
    setCurrentView('form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // In-Page Edit Form
  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormErrors({});
    setModalForm({
      title: item.title,
      startDate: item.startDate || new Date().toISOString().split('T')[0],
      status: item.status || 'Active',
    });
    setCurrentView('form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setEditingItem(null);
    setFormErrors({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Save Item (Add or Edit) via Real Backend API
  const handleSaveModal = async (e) => {
    e.preventDefault();
    const errors = {};
    const trimmedTitle = modalForm.title.trim();
    if (!trimmedTitle) {
      errors.title = `${activeCategory.singular} Name / Title is required`;
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      window.scrollTo({ top: 120, behavior: 'smooth' });
      return;
    }

    setFormErrors({});
    const endpoint = TAB_ENDPOINTS[activeTab];
    if (!endpoint) return;

    try {
      if (editingItem) {
        // Real Backend PUT API Call
        const response = await api.put(`${endpoint}/${editingItem.id}`, {
          title: trimmedTitle,
          name: trimmedTitle,
          status: modalForm.status,
          isActive: modalForm.status === 'Active',
        });
        const result = response.data;
        if (!result || !result.success) {
          showToast(result.message || 'Failed to update', 'error');
          return;
        }
        showToast(result.message || `${activeCategory.singular} updated successfully!`, 'success');
      } else {
        // Real Backend POST API Call
        const response = await api.post(endpoint, {
          title: trimmedTitle,
          name: trimmedTitle,
          status: modalForm.status,
          isActive: modalForm.status === 'Active',
        });
        const result = response.data;
        if (!result || !result.success) {
          showToast(result.message || 'Failed to create', 'error');
          return;
        }
        showToast(result.message || `${activeCategory.singular} created successfully!`, 'success');
      }

      handleBackToList();
      fetchMasterData(currentPage, searchTerm, statusFilter, activeTab);
    } catch (err) {
      console.error('API Error:', err);
      const serverMsg =
        err.response?.data?.message ||
        (typeof err.response?.data?.errors === 'string'
          ? err.response.data.errors
          : err.response?.data?.errors
          ? Object.values(err.response.data.errors)[0]
          : null) ||
        err.response?.data?.error ||
        err.message ||
        'Backend server connection error';
      showToast(serverMsg, 'error');
    }
  };

  // Open Delete Confirmation Modal
  const handleDelete = (item) => {
    setDeleteConfirm({
      isOpen: true,
      item,
      isLoading: false,
    });
  };

  // Confirm and Execute Delete via Real Backend DELETE API Call
  const handleConfirmDelete = async () => {
    if (!deleteConfirm.item) return;
    const item = deleteConfirm.item;
    setDeleteConfirm((prev) => ({ ...prev, isLoading: true }));
    const endpoint = TAB_ENDPOINTS[activeTab];
    try {
      const response = await api.delete(`${endpoint}/${item.id}`);
      const result = response.data;
      if (!result || !result.success) {
        showToast(result.message || 'Failed to delete', 'error');
        return;
      }
      showToast(result.message || `${activeCategory.singular} "${item.title}" deleted successfully!`, 'delete');
      fetchMasterData(currentPage, searchTerm, statusFilter, activeTab);
    } catch (err) {
      console.error('Delete error:', err);
      const serverMsg =
        err.response?.data?.message ||
        (typeof err.response?.data?.errors === 'string'
          ? err.response.data.errors
          : err.response?.data?.errors
          ? Object.values(err.response.data.errors)[0]
          : null) ||
        err.response?.data?.error ||
        err.message ||
        'Backend server connection error';
      showToast(serverMsg, 'error');
    } finally {
      setDeleteConfirm({ isOpen: false, item: null, isLoading: false });
    }
  };

  return (
    <div className="masters-page-container animate-fade-in">
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
          deleteConfirm.item
            ? `Are you sure you want to delete ${activeCategory.singular.toLowerCase()} "${deleteConfirm.item.title}"? This action cannot be undone.`
            : 'Are you sure you want to delete this item? This action cannot be undone.'
        }
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={deleteConfirm.isLoading}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteConfirm({ isOpen: false, item: null, isLoading: false })}
      />

      {/* 1. Page Header */}
      <div className="masters-page-header">
        <h1 className="masters-page-title">
          {currentView === 'list'
            ? activeCategory.label
            : editingItem
              ? `Edit ${activeCategory.singular} — ${editingItem.title}`
              : `Add ${activeCategory.singular}`}
        </h1>

        {currentView === 'list' ? (
          <div className="masters-header-actions">
            <button
              type="button"
              className="btn-add-master"
              onClick={handleOpenAdd}
            >
              <Plus size={16} strokeWidth={2.5} />
              <span>Add {activeCategory.singular}</span>
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="btn-back-to-list"
            onClick={handleBackToList}
            title="Back to List"
          >
            <ArrowLeft size={16} strokeWidth={2.5} />
            <span>Back to List</span>
          </button>
        )}
      </div>

      {/* 2. Main White Container Card */}
      <div className="masters-card">
        {currentView === 'list' ? (
          <>
            {/* Toolbar: Search (Left) + Filter (Right) */}
            <div className="masters-toolbar">
              <div className="masters-search-box">
                <Search size={16} className="text-muted" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="masters-search-input"
                />
                {searchTerm && (
                  <button
                    type="button"
                    className="masters-search-clear"
                    onClick={() => {
                      setSearchTerm('');
                      setCurrentPage(1);
                    }}
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              <div className="masters-toolbar-right">
                <div className="masters-filter-wrap">
                  <Filter size={15} color="var(--text-muted)" />
                  <select
                    className="masters-status-select"
                    value={statusFilter}
                    onChange={(e) => {
                      setStatusFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                  >
                    <option value="ALL">All Statuses</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 3. Modern Data Table: Strictly S.NO | TITLE | CREATED DATE | STATUS | ACTION */}
            <div className="masters-table-container">
              <table className="masters-table">
                <thead>
                  <tr>
                    <th style={{ width: '85px', textAlign: 'center' }}>S.NO</th>
                    <th>TITLE</th>
                    <th style={{ width: '180px' }}>CREATED DATE</th>
                    <th style={{ width: '150px', textAlign: 'center' }}>STATUS</th>
                    <th style={{ width: '130px', textAlign: 'center' }}>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan={5} className="masters-empty-cell">
                        Loading {activeCategory.label.toLowerCase()}...
                      </td>
                    </tr>
                  ) : items.length > 0 ? (
                    items.map((item, index) => {
                      const serialNumber =
                        (currentPage - 1) * itemsPerPage + index + 1;
                      return (
                        <tr key={item.id}>
                          {/* 1. S.NO */}
                          <td
                            style={{
                              textAlign: 'center',
                              fontWeight: 700,
                              color: '#64748b',
                            }}
                          >
                            {serialNumber}
                          </td>

                          {/* 2. TITLE */}
                          <td>
                            <span className="master-title-cell">{item.title}</span>
                          </td>

                          {/* 3. CREATED DATE */}
                          <td>
                            <span className="master-date-cell">
                              {formatDisplayDate(item.startDate)}
                            </span>
                          </td>

                          {/* 4. STATUS */}
                          <td style={{ textAlign: 'center' }}>
                            <span
                              className={`master-status-badge ${
                                item.status === 'Active' ? 'active' : 'inactive'
                              }`}
                            >
                              <span className="master-status-dot" />
                              <span>{item.status}</span>
                            </span>
                          </td>

                          {/* 5. ACTION (Edit / Delete) */}
                          <td style={{ textAlign: 'center' }}>
                            <div className="master-actions-group">
                              <button
                                type="button"
                                className="btn-table-action edit"
                                onClick={() => handleOpenEdit(item)}
                                title="Edit"
                              >
                                <Edit2 size={15} />
                              </button>
                              <button
                                type="button"
                                className="btn-table-action delete"
                                onClick={() => handleDelete(item)}
                                title="Delete"
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
                      <td colSpan={5} className="masters-empty-cell">
                        {searchTerm || statusFilter !== 'ALL'
                          ? 'No matching records found. Try adjusting your search or filter.'
                          : `No records in ${activeCategory.label} yet. Click "+ Add ${activeCategory.singular}" above to create one.`}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            {totalRecords > itemsPerPage && (
              <div className="masters-pagination-row">
                <span className="masters-pagination-info">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
                  {Math.min(currentPage * itemsPerPage, totalRecords)} of{' '}
                  {totalRecords} records
                </span>

                <div className="masters-pagination-controls">
                  <button
                    type="button"
                    className="btn-page-nav"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  >
                    <ChevronLeft size={16} />
                    <span>Prev</span>
                  </button>

                  <div className="page-numbers">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <button
                          key={page}
                          type="button"
                          className={`btn-page-num ${
                            currentPage === page ? 'active' : ''
                          }`}
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </button>
                      )
                    )}
                  </div>

                  <button
                    type="button"
                    className="btn-page-nav"
                    disabled={currentPage === totalPages}
                    onClick={() =>
                      setCurrentPage((p) => Math.min(p + 1, totalPages))
                    }
                  >
                    <span>Next</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          /* =========================================================================
             VIEW 2: IN-PAGE EDIT / ADD FORM
             ========================================================================= */
          <form onSubmit={handleSaveModal} className="inpage-company-form animate-fade-in" noValidate>
            <div className="inpage-section-box">
              <div className="inpage-section-header">
                1. {activeCategory.singular.toUpperCase()} INFORMATION
              </div>

              <div className="inpage-grid-2col">
                <div className="form-field-group">
                  <label className="modal-field-label">
                    {activeCategory.singular} Name / Title <span className="field-required">*</span>
                  </label>
                  <input
                    type="text"
                    className={`modal-field-input ${formErrors.title ? 'has-error' : ''}`}
                    placeholder={`Enter ${activeCategory.singular.toLowerCase()} title...`}
                    value={modalForm.title}
                    onChange={(e) => {
                      setModalForm({ ...modalForm, title: e.target.value });
                      if (formErrors.title) setFormErrors({ ...formErrors, title: null });
                    }}
                    autoFocus
                  />
                  <FieldError error={formErrors.title} />
                </div>

                <div className="form-field-group">
                  <label className="modal-field-label">
                    Status <span className="field-required">*</span>
                  </label>
                  <select
                    className="modal-field-select"
                    value={modalForm.status}
                    onChange={(e) =>
                      setModalForm({ ...modalForm, status: e.target.value })
                    }
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="inpage-form-footer">
              <button
                type="button"
                className="btn-cancel"
                onClick={handleBackToList}
              >
                Cancel
              </button>
              <button type="submit" className="btn-save">
                {editingItem ? 'Update' : 'Save'} {activeCategory.singular}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default MastersModule;
