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
} from 'lucide-react';
import './DepartmentsModule.css';

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
      rec.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.pincode.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'All' ? true : rec.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Count metrics
  const totalCount = records.length;
  const activeCount = records.filter((r) => r.status === 'Active').length;
  const inactiveCount = records.filter((r) => r.status === 'Inactive').length;

  // Handler: Open Add View
  const handleOpenAdd = () => {
    const nextDeptNum = 100 + records.length + 1;
    const nextBranchNum = records.length + 1;
    setFormData({
      ...initialFormState,
      id: `REC-${String(records.length + 1).padStart(3, '0')}`,
      departmentId: `DEP-${nextDeptNum}`,
      branchId: `BR-0${nextBranchNum}`,
      status: 'Active',
    });
    setCurrentView('add');
  };

  // Handler: Open Edit View
  const handleOpenEdit = (record) => {
    setFormData({ ...record });
    setCurrentView('edit');
  };

  // Handler: Back to List
  const handleBackToList = () => {
    setCurrentView('list');
    setFormData(initialFormState);
  };

  // Handler: Save (Add or Edit)
  const handleSaveRecord = (e) => {
    e.preventDefault();

    if (!formData.departmentName.trim()) {
      alert('Please enter the Department Name');
      return;
    }
    if (!formData.departmentHead.trim()) {
      alert('Please enter the Department Head');
      return;
    }
    if (!formData.branchName.trim()) {
      alert('Please enter the Branch Name');
      return;
    }
    if (!formData.city.trim() || !formData.state.trim() || !formData.pincode.trim()) {
      alert('Please fill the City, State and Pincode');
      return;
    }

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
            <div className="dept-header-left">
              <h1 className="dept-page-title">Departments & Branches</h1>
              
            </div>
            <button
              type="button"
              className="btn-add-dept"
              onClick={handleOpenAdd}
            >
              <Plus size={16} />
              Add Department & Branch
            </button>
          </>
        ) : (
          <>
            <div className="dept-inpage-header-left">
              <button
                type="button"
                className="btn-back-dept"
                onClick={handleBackToList}
              >
                <ArrowLeft size={16} />
                Back to Directory
              </button>
              <div>
                <h1 className="dept-page-title">
                  {currentView === 'add'
                    ? 'Add New Department & Branch'
                    : 'Edit Department & Branch'}
                </h1>
                <p className="dept-subtitle">
                  Configure department structure and branch location details
                </p>
              </div>
            </div>

            <div className="dept-inpage-header-actions">
              <button
                type="button"
                className="btn-cancel-dept"
                onClick={handleBackToList}
              >
                Cancel
              </button>
              <button
                type="submit"
                form="inpage-dept-form"
                className="btn-save-dept"
              >
                <Save size={16} />
                {currentView === 'add' ? 'Save Record' : 'Save Changes'}
              </button>
            </div>
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
            {/* Toolbar: Search, Status Filter & Count Chips */}
            <div className="dept-toolbar">
              <div className="dept-toolbar-left">
                <div className="dept-search-box">
                  <Search size={16} style={{ color: 'var(--text-muted)' }} />
                  <input
                    type="text"
                    placeholder="Search by department, head, branch, city or pincode..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="dept-search-input"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="dept-filter-select"
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active Only</option>
                  <option value="Inactive">Inactive Only</option>
                </select>
              </div>

              <div className="dept-toolbar-stats">
                <span className="dept-stat-chip">Total: {totalCount}</span>
                <span className="dept-stat-chip active">Active: {activeCount}</span>
                <span className="dept-stat-chip inactive">Inactive: {inactiveCount}</span>
              </div>
            </div>

            {/* Table */}
            <div className="dept-table-wrapper">
              <table className="dept-table">
                <thead>
                  <tr>
                    <th style={{ width: '55px' }}>S.NO</th>
                    <th>Department</th>
                    <th>Department Head</th>
                    <th>Branch</th>
                    <th>Branch Address</th>
                    <th>City / State / Pincode</th>
                    <th>Status</th>
                    <th style={{ textAlign: 'center' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="dept-empty-state">
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
                    filteredRecords.map((rec, index) => (
                      <tr key={rec.id}>
                        {/* S.NO */}
                        <td style={{ fontWeight: 600, color: 'var(--text-muted)', textAlign: 'center' }}>
                          {index + 1}
                        </td>

                        {/* 1. Department: Department ID & Name */}
                        <td>
                          <div className="dept-cell-main">
                            <span className="dept-name-text">{rec.departmentName}</span>
                            <span className="dept-id-badge">{rec.departmentId}</span>
                          </div>
                        </td>

                        

                        {/* 3. Branch: Branch name/ID */}
                        <td>
                          <div className="branch-cell-main">
                            <span className="branch-name-text">{rec.branchName}</span>
                            <span className="branch-id-badge">{rec.branchId}</span>
                          </div>
                        </td>

                        {/* 4. Branch Address: Branch address */}
                        <td>
                          <div className="branch-address-text">
                            {rec.branchAddress || '—'}
                          </div>
                        </td>

                        {/* 5. City / State / Pincode: Branch location */}
                        <td>
                          <div className="location-cell-main">
                            <span className="city-state-text">
                              {rec.city}, {rec.state}
                            </span>
                            <span className="pincode-text">PIN: {rec.pincode}</span>
                          </div>
                        </td>

                        {/* 6. Status: Active / Inactive */}
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
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="dept-table-footer">
              <div>
                Showing 1 to {filteredRecords.length} of {records.length} Entries
              </div>

              <div className="dept-pagination-controls">
                <button type="button" className="btn-dept-page" disabled>
                  <ChevronLeft size={14} />
                </button>
                <button type="button" className="btn-dept-page active">
                  1
                </button>
                <button type="button" className="btn-dept-page" disabled>
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
                    onChange={(e) =>
                      setFormData({ ...formData, departmentId: e.target.value })
                    }
                    placeholder="e.g. DEP-101"
                    className="form-control-input"
                    required
                  />
                </div>

                {/* Department Name */}
                <div className="form-field-group">
                  <label>Department Name *</label>
                  <input
                    type="text"
                    value={formData.departmentName}
                    onChange={(e) =>
                      setFormData({ ...formData, departmentName: e.target.value })
                    }
                    placeholder="e.g. Engineering & Technology"
                    className="form-control-input"
                    required
                  />
                </div>

                {/* Department Head */}
                <div className="form-field-group">
                  <label>Department Head (Person Responsible) *</label>
                  <input
                    type="text"
                    value={formData.departmentHead}
                    onChange={(e) =>
                      setFormData({ ...formData, departmentHead: e.target.value })
                    }
                    placeholder="e.g. Sundar Raman"
                    className="form-control-input"
                    required
                  />
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
                    onChange={(e) =>
                      setFormData({ ...formData, branchId: e.target.value })
                    }
                    placeholder="e.g. BR-01"
                    className="form-control-input"
                    required
                  />
                </div>

                {/* Branch Name */}
                <div className="form-field-group">
                  <label>Branch Name *</label>
                  <input
                    type="text"
                    value={formData.branchName}
                    onChange={(e) =>
                      setFormData({ ...formData, branchName: e.target.value })
                    }
                    placeholder="e.g. HQ - Chennai Campus"
                    className="form-control-input"
                    required
                  />
                </div>
              </div>

              {/* Branch Address */}
              <div className="form-field-group">
                <label>Branch Address *</label>
                <textarea
                  value={formData.branchAddress}
                  onChange={(e) =>
                    setFormData({ ...formData, branchAddress: e.target.value })
                  }
                  placeholder="e.g. Tidel Park, 4th Floor, Rajiv Gandhi Salai, Taramani"
                  className="form-control-textarea"
                  rows={2}
                  required
                />
              </div>

              {/* City / State / Pincode */}
              <div className="inpage-grid-3col">
                <div className="form-field-group">
                  <label>City *</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    placeholder="e.g. Chennai"
                    className="form-control-input"
                    required
                  />
                </div>

                <div className="form-field-group">
                  <label>State *</label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) =>
                      setFormData({ ...formData, state: e.target.value })
                    }
                    placeholder="e.g. Tamil Nadu"
                    className="form-control-input"
                    required
                  />
                </div>

                <div className="form-field-group">
                  <label>Pincode *</label>
                  <input
                    type="text"
                    value={formData.pincode}
                    onChange={(e) =>
                      setFormData({ ...formData, pincode: e.target.value })
                    }
                    placeholder="e.g. 600113"
                    className="form-control-input"
                    required
                  />
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
                className="btn-cancel-dept"
                onClick={handleBackToList}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-save-dept"
              >
                <Save size={16} />
                {currentView === 'add' ? 'Save Department & Branch' : 'Update Record'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
