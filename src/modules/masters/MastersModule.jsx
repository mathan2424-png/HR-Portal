import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Plus,
  Search,
  CheckCircle2,
  RotateCcw,
  Edit2,
  Trash2,
  X,
  Check,
  ChevronLeft,
  ChevronRight,
  Filter,
  ArrowLeft,
} from 'lucide-react';
import { Toast } from '../../components/common/Toast/Toast';
import { FieldError } from '../../components/common/FieldError/FieldError';
import {
  validateName,
  validateRequired,
  validateNumber,
  validatePhone,
  sanitizeNameInput,
  sanitizeNumberInput,
  sanitizePhoneInput,
  sanitizeDecimalInput,
} from '../../utils/validation';
import './MastersModule.css';

const DEFAULT_CATEGORIES = {
  'job-categories': {
    id: 'job-categories',
    label: 'Job Categories',
    singular: 'Job Category',
    items: [
      { id: 'JC-01', title: 'Software Engineering', startDate: '2026-01-15', status: 'Active' },
      { id: 'JC-02', title: 'Data Science & AI', startDate: '2026-02-01', status: 'Active' },
      { id: 'JC-03', title: 'Product Management', startDate: '2026-02-10', status: 'Active' },
      { id: 'JC-04', title: 'Human Resources', startDate: '2026-01-05', status: 'Active' },
      { id: 'JC-05', title: 'Sales & BD', startDate: '2026-03-01', status: 'Active' },
      { id: 'JC-06', title: 'Marketing & Growth', startDate: '2026-01-20', status: 'Active' },
      { id: 'JC-07', title: 'Healthcare', startDate: '2026-02-15', status: 'Active' },
      { id: 'JC-08', title: 'Finance & Accounting', startDate: '2026-01-10', status: 'Active' },
      { id: 'JC-09', title: 'Customer Success', startDate: '2026-03-12', status: 'Active' },
      { id: 'JC-10', title: 'Design & UX', startDate: '2026-02-18', status: 'Active' },
    ],
  },
  'skills': {
    id: 'skills',
    label: 'Skills & Proficiencies',
    singular: 'Skill',
    items: [
      { id: 'SK-01', title: 'React.js', startDate: '2026-01-10', status: 'Active' },
      { id: 'SK-02', title: 'Node.js', startDate: '2026-01-12', status: 'Active' },
      { id: 'SK-03', title: 'Python', startDate: '2026-01-15', status: 'Active' },
      { id: 'SK-04', title: 'Java', startDate: '2026-01-08', status: 'Active' },
      { id: 'SK-05', title: 'SQL & Database', startDate: '2026-01-05', status: 'Active' },
      { id: 'SK-06', title: 'Cloud / AWS', startDate: '2026-01-20', status: 'Active' },
      { id: 'SK-07', title: 'UI/UX Design', startDate: '2026-02-01', status: 'Active' },
      { id: 'SK-08', title: 'DevOps & CI/CD', startDate: '2026-02-05', status: 'Active' },
      { id: 'SK-09', title: 'Machine Learning', startDate: '2026-02-12', status: 'Active' },
      { id: 'SK-10', title: 'Agile / Scrum', startDate: '2026-01-02', status: 'Active' },
      { id: 'SK-11', title: 'Product Strategy', startDate: '2026-02-15', status: 'Active' },
      { id: 'SK-12', title: 'Project Management', startDate: '2026-01-18', status: 'Active' },
      { id: 'SK-13', title: 'Digital Marketing', startDate: '2026-02-22', status: 'Active' },
    ],
  },
  'industries': {
    id: 'industries',
    label: 'Industries',
    singular: 'Industry',
    items: [
      { id: 'IND-01', title: 'Information Technology', startDate: '2026-01-01', status: 'Active' },
      { id: 'IND-02', title: 'Financial Services / Fintech', startDate: '2026-01-15', status: 'Active' },
      { id: 'IND-03', title: 'Healthcare & Life Sciences', startDate: '2026-02-01', status: 'Active' },
      { id: 'IND-04', title: 'E-Commerce & Retail', startDate: '2026-02-10', status: 'Active' },
      { id: 'IND-05', title: 'Manufacturing', startDate: '2026-01-20', status: 'Active' },
      { id: 'IND-06', title: 'Education / EdTech', startDate: '2026-02-20', status: 'Active' },
      { id: 'IND-07', title: 'Telecommunications', startDate: '2026-03-01', status: 'Active' },
      { id: 'IND-08', title: 'Real Estate & Construction', startDate: '2026-03-05', status: 'Active' },
      { id: 'IND-09', title: 'Logistics & Supply Chain', startDate: '2026-03-10', status: 'Active' },
    ],
  },
  'locations': {
    id: 'locations',
    label: 'Primary Job Locations',
    singular: 'Location',
    items: [
      { id: 'LOC-01', title: 'Chennai', status: 'Active' },
      { id: 'LOC-02', title: 'Coimbatore', status: 'Active' },
      { id: 'LOC-03', title: 'Madurai', status: 'Active' },
      { id: 'LOC-04', title: 'Tiruchirappalli', status: 'Active' },
      { id: 'LOC-05', title: 'Salem', status: 'Active' },
      { id: 'LOC-06', title: 'Tirunelveli', status: 'Active' },
      { id: 'LOC-07', title: 'Bengaluru', status: 'Active' },
      { id: 'LOC-08', title: 'Hyderabad', status: 'Active' },
    ],
  },
  'employment-types': {
    id: 'employment-types',
    label: 'Employment Types',
    singular: 'Employment Type',
    items: [
      { id: 'ET-01', title: 'Full Time', status: 'Active' },
      { id: 'ET-02', title: 'Part Time', status: 'Active' },
      { id: 'ET-03', title: 'Contract', status: 'Active' },
      { id: 'ET-04', title: 'Internship', status: 'Active' },
      { id: 'ET-05', title: 'Freelance', status: 'Active' },
    ],
  },
  'work-modes': {
    id: 'work-modes',
    label: 'Work Modes',
    singular: 'Work Mode',
    items: [
      { id: 'WM-01', title: 'On-Site', status: 'Active' },
      { id: 'WM-02', title: 'Hybrid', status: 'Active' },
      { id: 'WM-03', title: 'Remote', status: 'Active' },
      { id: 'WM-04', title: 'Flexible', status: 'Active' },
    ],
  },
  'qualifications': {
    id: 'qualifications',
    label: 'Academic Qualifications',
    singular: 'Qualification',
    items: [
      { id: 'AQ-01', title: 'B.E / B.Tech', startDate: '2026-01-01', status: 'Active' },
      { id: 'AQ-02', title: 'M.E / M.Tech', startDate: '2026-01-01', status: 'Active' },
      { id: 'AQ-03', title: 'BCA / MCA', startDate: '2026-01-10', status: 'Active' },
      { id: 'AQ-04', title: 'B.Sc / M.Sc', startDate: '2026-01-10', status: 'Active' },
      { id: 'AQ-05', title: 'B.Com / M.Com', startDate: '2026-01-15', status: 'Active' },
      { id: 'AQ-06', title: 'MBA / PGDM', startDate: '2026-01-15', status: 'Active' },
    ],
  },
};

const normalizeData = (raw) => {
  if (!raw) return DEFAULT_CATEGORIES;
  const result = {};
  for (const key of Object.keys(DEFAULT_CATEGORIES)) {
    const defaultCat = DEFAULT_CATEGORIES[key];
    const rawCat = raw[key] || defaultCat;
    if (rawCat.items && Array.isArray(rawCat.items)) {
      result[key] = {
        ...defaultCat,
        ...rawCat,
        items: rawCat.items.map((item, idx) => ({
          id: item.id || `${key.substring(0, 2).toUpperCase()}-${idx + 1}`,
          title: typeof item === 'string' ? item : item.title || 'Untitled',
          startDate:
            item.startDate ||
            (defaultCat.items && defaultCat.items[idx]?.startDate) ||
            '2026-01-01',
          status: item.status || 'Active',
        })),
      };
    } else if (rawCat.tags && Array.isArray(rawCat.tags)) {
      result[key] = {
        ...defaultCat,
        items: rawCat.tags.map((t, idx) => ({
          id: `${key.substring(0, 2).toUpperCase()}-${idx + 1}`,
          title: typeof t === 'string' ? t : t.title || 'Untitled',
          startDate: '2026-01-01',
          status: 'Active',
        })),
      };
    } else {
      result[key] = defaultCat;
    }
  }
  return result;
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

export const MastersModule = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');
  const initialTab =
    tabParam && DEFAULT_CATEGORIES[tabParam] ? tabParam : 'job-categories';

  const [activeTab, setActiveTab] = useState(initialTab);
  const [categoryData, setCategoryData] = useState(() => {
    const saved = localStorage.getItem('hr_admin_master_taxonomy_v3');
    if (saved) {
      try {
        return normalizeData(JSON.parse(saved));
      } catch {
        return DEFAULT_CATEGORIES;
      }
    }
    // Check old storage keys for graceful migration
    const oldSavedV2 = localStorage.getItem('hr_admin_master_taxonomy_v2');
    if (oldSavedV2) {
      try {
        return normalizeData(JSON.parse(oldSavedV2));
      } catch {
        return DEFAULT_CATEGORIES;
      }
    }
    const oldSaved = localStorage.getItem('hr_admin_master_taxonomy');
    if (oldSaved) {
      try {
        return normalizeData(JSON.parse(oldSaved));
      } catch {
        return DEFAULT_CATEGORIES;
      }
    }
    return DEFAULT_CATEGORIES;
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [toast, setToast] = useState(null); // { message: string, type: 'success' | 'delete' | 'warning' | 'info' }

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // In-Page View State (Matching Company Details Pattern - No Popups!)
  // currentView: 'list' | 'form'
  const [currentView, setCurrentView] = useState('list');
  const [editingItem, setEditingItem] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [modalForm, setModalForm] = useState({
    title: '',
    startDate: new Date().toISOString().split('T')[0],
    status: 'Active',
  });

  // Sync with URL query parameter when it changes
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

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(
      'hr_admin_master_taxonomy_v3',
      JSON.stringify(categoryData)
    );
  }, [categoryData]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const activeCategory =
    categoryData[activeTab] || categoryData['job-categories'];

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

  // Save Item (Add or Edit)
  const handleSaveModal = (e) => {
    e.preventDefault();
    const errors = {};
    const trimmedTitle = modalForm.title.trim();
    if (!trimmedTitle) {
      errors.title = `${activeCategory.singular} Name / Title is required`;
    }
    if (!modalForm.startDate) {
      errors.startDate = 'Start date is required';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      window.scrollTo({ top: 120, behavior: 'smooth' });
      return;
    }

    const currentItems = activeCategory.items;

    // Check duplicate
    const isDuplicate = currentItems.some(
      (it) =>
        it.title.toLowerCase() === trimmedTitle.toLowerCase() &&
        (!editingItem || it.id !== editingItem.id)
    );

    if (isDuplicate) {
      setFormErrors({ title: `"${trimmedTitle}" already exists in ${activeCategory.label}` });
      window.scrollTo({ top: 120, behavior: 'smooth' });
      return;
    }

    setFormErrors({});

    if (editingItem) {
      // Edit
      const updated = currentItems.map((it) =>
        it.id === editingItem.id
          ? {
              ...it,
              title: trimmedTitle,
              startDate: modalForm.startDate || it.startDate || '2026-01-01',
              status: modalForm.status,
            }
          : it
      );
      setCategoryData((prev) => ({
        ...prev,
        [activeTab]: {
          ...prev[activeTab],
          items: updated,
        },
      }));
      showToast(`${activeCategory.singular} updated successfully!`, 'success');
    } else {
      // Add
      const newItem = {
        id: `${activeTab.substring(0, 2).toUpperCase()}-${Date.now().toString().slice(-4)}`,
        title: trimmedTitle,
        startDate: modalForm.startDate || new Date().toISOString().split('T')[0],
        status: modalForm.status,
      };
      setCategoryData((prev) => ({
        ...prev,
        [activeTab]: {
          ...prev[activeTab],
          items: [newItem, ...currentItems],
        },
      }));
      showToast(`${activeCategory.singular} created successfully!`, 'success');
    }

    handleBackToList();
  };

  // Delete Item
  const handleDelete = (item) => {
    if (window.confirm(`Are you sure you want to delete "${item.title}"?`)) {
      const updated = activeCategory.items.filter((it) => it.id !== item.id);
      setCategoryData((prev) => ({
        ...prev,
        [activeTab]: {
          ...prev[activeTab],
          items: updated,
        },
      }));
      showToast(`${activeCategory.singular} "${item.title}" deleted successfully!`, 'delete');
    }
  };

  // Reset to Defaults
  const handleResetDefaults = () => {
    if (
      window.confirm(
        `Reset all categories to standard system defaults?`
      )
    ) {
      setCategoryData(DEFAULT_CATEGORIES);
      localStorage.removeItem('hr_admin_master_taxonomy_v2');
      localStorage.removeItem('hr_admin_master_taxonomy');
      showToast('Reset to system default taxonomies!', 'info');
      setCurrentPage(1);
    }
  };

  // Filtered Items
  const filteredItems = useMemo(() => {
    return activeCategory.items.filter((item) => {
      const matchesSearch = item.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase().trim());
      const matchesStatus =
        statusFilter === 'ALL' || item.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [activeCategory.items, searchTerm, statusFilter]);

  // Paginated Items
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage) || 1;
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredItems.slice(start, start + itemsPerPage);
  }, [filteredItems, currentPage, itemsPerPage]);

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

      {/* 1. Page Header (Matching Company Details Pattern) */}
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
              className="btn-reset-defaults"
              onClick={handleResetDefaults}
              title="Reset to system default records"
            >
              <RotateCcw size={14} />
              <span>Reset Defaults</span>
            </button>

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
                onClick={() => setSearchTerm('')}
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

        {/* 3. Modern Data Table: Strictly S.NO | TITLE | START DATE | STATUS | ACTION */}
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
              {paginatedItems.length > 0 ? (
                paginatedItems.map((item, index) => {
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
        {filteredItems.length > itemsPerPage && (
          <div className="masters-pagination-row">
            <span className="masters-pagination-info">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
              {Math.min(currentPage * itemsPerPage, filteredItems.length)} of{' '}
              {filteredItems.length} records
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
             VIEW 2: IN-PAGE EDIT / ADD FORM (Table is hidden, No Popups!)
             ========================================================================= */
          <form onSubmit={handleSaveModal} className="inpage-company-form animate-fade-in" noValidate>
            <div className="inpage-section-box">
              <div className="inpage-section-header">
                1. {activeCategory.singular.toUpperCase()} INFORMATION
              </div>

              <div className="inpage-grid-3col">
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
                    Start Date <span className="field-required">*</span>
                  </label>
                  <input
                    type="date"
                    className={`modal-field-input ${formErrors.startDate ? 'has-error' : ''}`}
                    value={modalForm.startDate}
                    onChange={(e) => {
                      setModalForm({ ...modalForm, startDate: e.target.value });
                      if (formErrors.startDate) setFormErrors({ ...formErrors, startDate: null });
                    }}
                  />
                  <FieldError error={formErrors.startDate} />
                </div>

                <div className="form-field-group">
                  <label className="modal-field-label">Status</label>
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

            <div className="inpage-form-actions">
              <button
                type="button"
                className="btn-modal-cancel"
                onClick={handleBackToList}
              >
                Cancel
              </button>
              <button type="submit" className="btn-modal-submit">
                <Check size={16} />
                <span>{editingItem ? `Update ${activeCategory.singular}` : `Save ${activeCategory.singular}`}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
