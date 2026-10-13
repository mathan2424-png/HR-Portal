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
  MapPin,
} from 'lucide-react';
import { FieldError } from '../../components/common/FieldError/FieldError';
import {
  validateName,
  validateNumber,
  validateRequired,
  sanitizeNameInput,
  sanitizeNumberInput,
} from '../../utils/validation';
import './DepartmentsModule.css';

// Helper: Format branch address so main street part is visible,
// and area, city, state, pincode appear in interactive hover tooltip.
const formatBranchAddress = (rec) => {
  if (!rec) {
    return {
      mainAddress: '—',
      areaCity: '',
      fullMeta: '',
      fullAddress: '',
    };
  }

  const rawAddr = (rec.branchAddress || '').trim();
  const city = (rec.city || '').trim();
  const state = (rec.state || '').trim();
  const pincode = (rec.pincode || '').trim();

  // If no branch address, fallback to city
  if (!rawAddr) {
    const areaCity = city || '—';
    const metaParts = [];
    if (state) metaParts.push(state);
    if (pincode) metaParts.push(`PIN: ${pincode}`);
    const fullMeta = metaParts.join(' • ');
    const fullAddress = [city, state, pincode].filter(Boolean).join(', ');
    return {
      mainAddress: areaCity,
      areaCity,
      fullMeta,
      fullAddress,
    };
  }

  // Split raw address by commas
  const parts = rawAddr.split(',').map((p) => p.trim()).filter(Boolean);

  let mainParts = [];
  let areaParts = [];

  if (parts.length >= 4) {
    // e.g. "Tidel Park, 4th Floor, Rajiv Gandhi Salai, Taramani"
    // Visible: first 3 parts ("Tidel Park, 4th Floor, Rajiv Gandhi Salai")
    // Remaining: 4th part ("Taramani")
    mainParts = parts.slice(0, 3);
    areaParts = parts.slice(3);
  } else if (parts.length >= 2) {
    // e.g. "ELCOT IT Park, Ring Road, Ilandhaikulam" -> 2 visible, 1 remaining
    // e.g. "Thuvakudi Industrial Corridor, Cantonment" -> 1 visible, 1 remaining
    mainParts = parts.slice(0, parts.length - 1);
    areaParts = parts.slice(parts.length - 1);
  } else {
    mainParts = parts;
    areaParts = [];
  }

  const mainAddress = mainParts.join(', ');

  // Area & City (e.g. "Taramani, Chennai")
  const areaCityList = [...areaParts];
  if (city && !areaCityList.includes(city)) {
    areaCityList.push(city);
  }
  const areaCity = areaCityList.join(', ');

  // State & Pincode meta
  const metaParts = [];
  if (state) metaParts.push(state);
  if (pincode) metaParts.push(`PIN: ${pincode}`);
  const fullMeta = metaParts.join(' • ');

  const fullAddress = `${rawAddr}${city ? `, ${city}` : ''}${state ? `, ${state}` : ''}${pincode ? ` - ${pincode}` : ''}`;

  return {
    mainAddress,
    areaCity,
    fullMeta,
    fullAddress,
  };
};

export const DepartmentsModule = () => {
  // STRICTLY and ONLY the user-requested fields:
  // 1. Department: Department ID and department name.
  // 2. Department Head: Person responsible for the department.
  // 3. Branch: Branch name/ID.
  // 4. Branch Address: Branch address.
  // 5. City / State / Pincode: Branch location.
  // 6. Status: Active/Inactive.

  const [records, setRecords] = useState([
    {
      id: 'REC-001',
      departmentId: 'DEP-101',
      departmentName: 'Engineering & Technology',
      departmentHead: 'Sundar Raman',
      branchId: 'BR-01',
      branchName: 'HQ - Chennai Campus',
      branchAddress: 'Tidel Park, 4th Floor, Rajiv Gandhi Salai, Taramani',
      city: 'Chennai',
      state: 'Tamil Nadu',
      pincode: '600113',
      status: 'Active',
    },
    {
      id: 'REC-002',
      departmentId: 'DEP-102',
      departmentName: 'Human Resources & Talent',
      departmentHead: 'Abinaya R',
      branchId: 'BR-01',
      branchName: 'HQ - Chennai Campus',
      branchAddress: 'Tidel Park, 4th Floor, Rajiv Gandhi Salai, Taramani',
      city: 'Chennai',
      state: 'Tamil Nadu',
      pincode: '600113',
      status: 'Active',
    },
    {
      id: 'REC-003',
      departmentId: 'DEP-103',
      departmentName: 'Product & UX Design',
      departmentHead: 'Karthik Raja',
      branchId: 'BR-02',
      branchName: 'Madurai Tech Hub',
      branchAddress: 'ELCOT IT Park, Ring Road, Ilandhaikulam',
      city: 'Madurai',
      state: 'Tamil Nadu',
      pincode: '625020',
      status: 'Active',
    },
    {
      id: 'REC-004',
      departmentId: 'DEP-104',
      departmentName: 'Sales & Business Development',
      departmentHead: 'Muthuvel Pandian',
      branchId: 'BR-03',
      branchName: 'Tiruchirappalli Regional Office',
      branchAddress: 'Thuvakudi Industrial Corridor, Cantonment',
      city: 'Tiruchirappalli',
      state: 'Tamil Nadu',
      pincode: '620015',
      status: 'Active',
    },
    {
      id: 'REC-005',
      departmentId: 'DEP-105',
      departmentName: 'Finance & Accounts',
      departmentHead: 'Meenakshi Sundaram',
      branchId: 'BR-01',
      branchName: 'HQ - Chennai Campus',
      branchAddress: 'Tidel Park, 4th Floor, Rajiv Gandhi Salai, Taramani',
      city: 'Chennai',
      state: 'Tamil Nadu',
      pincode: '600113',
      status: 'Active',
    },
    {
      id: 'REC-006',
      departmentId: 'DEP-106',
      departmentName: 'Customer Success & Support',
      departmentHead: 'Arun Kumar',
      branchId: 'BR-04',
      branchName: 'Coimbatore Delivery Center',
      branchAddress: 'CHIL SEZ IT Park, Keeranatham Road, Saravanampatti',
      city: 'Coimbatore',
      state: 'Tamil Nadu',
      pincode: '641035',
      status: 'Inactive',
    },
  ]);

  // Views: 'list' | 'add' | 'edit'
  const [currentView, setCurrentView] = useState('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [toastMessage, setToastMessage] = useState('');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Form State
  const initialFormState = {
    id: '',
    departmentId: '',
    departmentName: '',
    departmentHead: '',
    branchId: '',
    branchName: '',
    branchAddress: '',
    city: '',
    state: '',
    pincode: '',
    status: 'Active',
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  const handleFieldChange = (field, val) => {
    let sanitized = val;
    if (['departmentHead', 'city', 'state'].includes(field)) {
      sanitized = sanitizeNameInput(val);
    } else if (field === 'pincode') {
      sanitized = sanitizeNumberInput(val, 6);
    }
    setFormData((prev) => ({ ...prev, [field]: sanitized }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  // Show Toast
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3500);
  };

  // Filter Records
  const filteredRecords = records.filter((rec) => {
    const matchesSearch =
      rec.departmentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.departmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.departmentHead.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.branchId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.branchName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (rec.branchAddress && rec.branchAddress.toLowerCase().includes(searchTerm.toLowerCase())) ||
      rec.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.pincode.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'All' ? true : rec.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage) || 1;
  const paginatedRecords = filteredRecords.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handler: Open Add View
  const handleOpenAdd = () => {
    const nextDeptNum = 100 + records.length + 1;
    const nextBranchNum = records.length + 1;
    setErrors({});
    setFormData({
      ...initialFormState,
      id: `REC-${Date.now()}`,
      departmentId: `DEP-${nextDeptNum}`,
      departmentName: '',
      departmentHead: 'Sundar Raman',
      branchId: `BR-0${nextBranchNum}`,
      branchName: 'HQ - Chennai Campus',
      branchAddress: 'Tidel Park, 4th Floor, Rajiv Gandhi Salai, Taramani',
      city: 'Chennai',
      state: 'Tamil Nadu',
      pincode: '600113',
      status: 'Active',
    });
    setCurrentView('add');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler: Open Edit View
  const handleOpenEdit = (record) => {
    setErrors({});
    setFormData({ ...record });
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

  // Handler: Save (Add or Edit)
  const handleSaveRecord = (e) => {
    e.preventDefault();
    const newErrors = {};

    const deptIdErr = validateRequired(formData.departmentId, 'Department ID');
    if (deptIdErr) newErrors.departmentId = deptIdErr;

    const deptNameErr = validateRequired(formData.departmentName, 'Department Name');
    if (deptNameErr) newErrors.departmentName = deptNameErr;

    if (formData.departmentHead) {
      const headErr = validateName(formData.departmentHead, 'Department Head', true);
      if (headErr) newErrors.departmentHead = headErr;
    }

    const branchIdErr = validateRequired(formData.branchId, 'Branch ID');
    if (branchIdErr) newErrors.branchId = branchIdErr;

    const branchNameErr = validateRequired(formData.branchName, 'Branch Name');
    if (branchNameErr) newErrors.branchName = branchNameErr;

    if (formData.city) {
      const cityErr = validateName(formData.city, 'City', true);
      if (cityErr) newErrors.city = cityErr;
    }

    if (formData.state) {
      const stateErr = validateName(formData.state, 'State', true);
      if (stateErr) newErrors.state = stateErr;
    }

    if (formData.pincode) {
      const pinErr = validateNumber(formData.pincode, 'Pincode', true, 6, 6);
      if (pinErr) newErrors.pincode = pinErr;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      window.scrollTo({ top: 120, behavior: 'smooth' });
      return;
    }

    setErrors({});

    if (currentView === 'add') {
      const newRec = {
        ...formData,
        id: `REC-${Date.now()}`,
      };
      setRecords([newRec, ...records]);
      showToast(`Department "${newRec.departmentName}" added successfully.`);
    } else if (currentView === 'edit') {
      setRecords(
        records.map((r) => (r.id === formData.id ? { ...formData } : r))
      );
      showToast(`Department "${formData.departmentName}" updated successfully.`);
    }

    handleBackToList();
  };

  // Handler: Toggle Status
  const handleToggleStatus = (record) => {
    const nextStatus = record.status === 'Active' ? 'Inactive' : 'Active';
    setRecords(
      records.map((r) =>
        r.id === record.id ? { ...r, status: nextStatus } : r
      )
    );
    showToast(`Status for "${record.departmentName}" changed to ${nextStatus}.`);
  };

  // Handler: Delete Record
  const handleDeleteRecord = (record) => {
    if (window.confirm(`Are you sure you want to delete "${record.departmentName} - ${record.branchName}"?`)) {
      setRecords(records.filter((r) => r.id !== record.id));
      showToast(`Record "${record.departmentName}" deleted successfully.`);
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
              <h1 className="dept-page-title">Departments & Branches</h1>
            </div>
            <button
              type="button"
              className="btn-add-dept"
              onClick={handleOpenAdd}
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
                  ? 'Add Department & Branch'
                  : `Edit Department & Branch — ${formData.departmentName}`}
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

      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="dept-toast-alert">
          <CheckCircle2 size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

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
                  placeholder="Search..."
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

            {/* Table */}
            <div className="dept-table-wrapper">
              <table className="dept-table">
                <thead>
                  <tr>
                    <th style={{ width: '55px' }}>S.NO</th>
                    <th>Department</th>
                    <th>Branch</th>
                    <th>Branch Address</th>
                    <th>Status</th>
                    <th style={{ textAlign: 'center', width: '120px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="dept-empty-state">
                        <div className="dept-empty-icon">🏢</div>
                        <p style={{ fontWeight: 600, margin: '0 0 0.25rem' }}>
                          No departments or branches found
                        </p>
                        <p style={{ fontSize: '0.8rem', margin: 0 }}>
                          Try adjusting your search terms or filters
                        </p>
                      </td>
                    </tr>
                  ) : (
                    paginatedRecords.map((rec, index) => {
                      const serialNumber = (currentPage - 1) * itemsPerPage + index + 1;
                      return (
                      <tr key={rec.id}>
                        {/* S.NO */}
                        <td style={{ fontWeight: 600, color: 'var(--text-muted)', textAlign: 'center' }}>
                          {serialNumber}
                        </td>

                        {/* 1. Department: Department ID & Name */}
                        <td>
                          <div className="dept-cell-main">
                            <span className="dept-name-text">{rec.departmentName}</span>
                            <span className="dept-id-badge">{rec.departmentId}</span>
                          </div>
                        </td>

                        {/* 2. Branch: Branch name/ID */}
                        <td>
                          <div className="branch-cell-main">
                            <span className="branch-name-text">{rec.branchName}</span>
                            <span className="branch-id-badge">{rec.branchId}</span>
                          </div>
                        </td>

                        {/* 3. Branch Address: Street address visible + Interactive Hover Tooltip for Area, City, State, PIN */}
                        <td>
                          {(() => {
                            const { mainAddress, areaCity, fullMeta, fullAddress } =
                              formatBranchAddress(rec);
                            return (
                              <div
                                className="branch-address-cell-wrapper"
                                title={fullAddress}
                              >
                                <span className="branch-address-text">
                                  {mainAddress}
                                </span>

                                {/* Hover Tooltip Box */}
                                <div className="branch-address-tooltip">
                                  <div className="tooltip-title">Area & Location</div>
                                  <div className="tooltip-area-city">{areaCity}</div>
                                  {fullMeta && (
                                    <div className="tooltip-meta">
                                      <span>{rec.state}</span>
                                      {rec.pincode && (
                                        <span className="tooltip-pin">PIN: {rec.pincode}</span>
                                      )}
                                    </div>
                                  )}
                                  <div className="tooltip-arrow" />
                                </div>
                              </div>
                            );
                          })()}
                        </td>

                        {/* 4. Status: Active / Inactive */}
                        <td>
                          <span
                            className={`status-pill ${rec.status === 'Active' ? 'active' : 'inactive'
                              }`}
                          >
                            <span className="status-dot"></span>
                            {rec.status}
                          </span>
                        </td>

                        {/* Actions */}
                        <td>
                          <div className="dept-row-actions" style={{ justifyContent: 'center' }}>
                            <button
                              type="button"
                              className="action-icon-btn edit"
                              title="Edit Record"
                              onClick={() => handleOpenEdit(rec)}
                            >
                              <Edit2 size={15} />
                            </button>

                            <button
                              type="button"
                              className="action-icon-btn status-toggle"
                              title={rec.status === 'Active' ? 'Deactivate' : 'Activate'}
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
                              title="Delete Record"
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
              Showing {filteredRecords.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{' '}
              {Math.min(currentPage * itemsPerPage, filteredRecords.length)} of{' '}
              {filteredRecords.length} Entries
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
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  type="button"
                  className={`btn-dept-page ${currentPage === page ? 'active' : ''}`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
              <button
                type="button"
                className="btn-dept-page"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
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
            Strictly and only the requested fields:
            • Department: Department ID and department name.
            • Department Head: Person responsible for the department.
            • Branch: Branch name/ID.
            • Branch Address: Branch address.
            • City / State / Pincode: Branch location.
            • Status: Active/Inactive.
            ======================================================================= */}
        {currentView !== 'list' && (
          <form
            id="inpage-dept-form"
            onSubmit={handleSaveRecord}
            className="inpage-dept-form"
            noValidate
          >
            {/* SECTION 1: DEPARTMENT */}
            <div className="inpage-section-box">
              <div className="inpage-section-header">
                1. DEPARTMENT INFORMATION
              </div>

              <div className="inpage-grid-3col">
                {/* Department ID */}
                <div className="form-field-group">
                  <label>Department ID *</label>
                  <input
                    type="text"
                    value={formData.departmentId}
                    onChange={(e) => handleFieldChange('departmentId', e.target.value)}
                    placeholder="e.g. DEP-101"
                    className={`form-control-input ${errors.departmentId ? 'has-error' : ''}`}
                  />
                  <FieldError error={errors.departmentId} />
                </div>

                {/* Department Name */}
                <div className="form-field-group">
                  <label>Department Name *</label>
                  <input
                    type="text"
                    value={formData.departmentName}
                    onChange={(e) => handleFieldChange('departmentName', e.target.value)}
                    placeholder="e.g. Engineering & Technology"
                    className={`form-control-input ${errors.departmentName ? 'has-error' : ''}`}
                  />
                  <FieldError error={errors.departmentName} />
                </div>

                {/* Department Head */}
                <div className="form-field-group">
                  <label>Department Head (Person Responsible) *</label>
                  <input
                    type="text"
                    value={formData.departmentHead}
                    onChange={(e) => handleFieldChange('departmentHead', e.target.value)}
                    placeholder="e.g. Sundar Raman (letters only)"
                    className={`form-control-input ${errors.departmentHead ? 'has-error' : ''}`}
                  />
                  <FieldError error={errors.departmentHead} />
                </div>
              </div>
            </div>

            {/* SECTION 2: BRANCH & LOCATION */}
            <div className="inpage-section-box">
              <div className="inpage-section-header">
                2. BRANCH & LOCATION DETAILS
              </div>

              <div className="inpage-grid-2col">
                {/* Branch ID */}
                <div className="form-field-group">
                  <label>Branch ID *</label>
                  <input
                    type="text"
                    value={formData.branchId}
                    onChange={(e) => handleFieldChange('branchId', e.target.value)}
                    placeholder="e.g. BR-01"
                    className={`form-control-input ${errors.branchId ? 'has-error' : ''}`}
                  />
                  <FieldError error={errors.branchId} />
                </div>

                {/* Branch Name */}
                <div className="form-field-group">
                  <label>Branch Name *</label>
                  <input
                    type="text"
                    value={formData.branchName}
                    onChange={(e) => handleFieldChange('branchName', e.target.value)}
                    placeholder="e.g. HQ - Chennai Campus"
                    className={`form-control-input ${errors.branchName ? 'has-error' : ''}`}
                  />
                  <FieldError error={errors.branchName} />
                </div>
              </div>

              {/* Branch Address */}
              <div className="form-field-group">
                <label>Branch Address *</label>
                <textarea
                  value={formData.branchAddress}
                  onChange={(e) => handleFieldChange('branchAddress', e.target.value)}
                  placeholder="e.g. Tidel Park, 4th Floor, Rajiv Gandhi Salai, Taramani"
                  className={`form-control-textarea ${errors.branchAddress ? 'has-error' : ''}`}
                  rows={2}
                />
                <FieldError error={errors.branchAddress} />
              </div>

              {/* City / State / Pincode */}
              <div className="inpage-grid-3col">
                <div className="form-field-group">
                  <label>City *</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleFieldChange('city', e.target.value)}
                    placeholder="e.g. Chennai (letters only)"
                    className={`form-control-input ${errors.city ? 'has-error' : ''}`}
                  />
                  <FieldError error={errors.city} />
                </div>

                <div className="form-field-group">
                  <label>State *</label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => handleFieldChange('state', e.target.value)}
                    placeholder="e.g. Tamil Nadu (letters only)"
                    className={`form-control-input ${errors.state ? 'has-error' : ''}`}
                  />
                  <FieldError error={errors.state} />
                </div>

                <div className="form-field-group">
                  <label>Pincode *</label>
                  <input
                    type="text"
                    value={formData.pincode}
                    onChange={(e) => handleFieldChange('pincode', e.target.value)}
                    placeholder="e.g. 600113 (6 digits)"
                    className={`form-control-input ${errors.pincode ? 'has-error' : ''}`}
                  />
                  <FieldError error={errors.pincode} />
                </div>
              </div>
            </div>

            {/* SECTION 3: STATUS */}
            <div className="inpage-section-box">
              <div className="inpage-section-header">
                3. STATUS CONFIGURATION
              </div>

              <div className="inpage-grid-2col">
                <div className="form-field-group">
                  <label>Status *</label>
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
              <button
                type="submit"
                className="btn-save-header-action"
              >
                <Save size={16} />
                <span>{currentView === 'add' ? 'Add Department' : 'Save Changes'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
