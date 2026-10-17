import React, { useState, useMemo, useEffect, useRef } from 'react';
import CompanyApi from '../../Api/CompanyApi';
import {
  Search,
  Plus,
  Edit2,
  Eye,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  Upload,
  MapPin,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Save,
  GitBranch,
  Building2,
  ShieldCheck,
  KeyRound,
  EyeOff,
  User,
  Phone,
  Mail,
} from 'lucide-react';
import defaultLogo from '../../assets/logo.png';
import { Toast } from '../../components/common/Toast/Toast';
import { ConfirmDeleteModal } from '../../components/common/ConfirmDeleteModal';
import { FieldError } from '../../components/common/FieldError/FieldError';
import {
  validateEmail,
  validateName,
  validatePhone,
  validateNumber,
  validateRequired,
  sanitizeNameInput,
  sanitizePhoneInput,
  sanitizeNumberInput,
} from '../../utils/validation';
import './CompanyProfile.css';

export const CompanyProfile = () => {
  // State for companies and branches
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isBackendConnected, setIsBackendConnected] = useState(false);

  // Active view: 'list' | 'add-branch' | 'edit-branch' | 'view-branch' | 'edit-company' | 'view-company'
  const [currentView, setCurrentView] = useState('list');
  const [toast, setToast] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState({
    isOpen: false,
    branch: null,
    parentCompany: null,
    isLoading: false,
  });
  const [isSaving, setIsSaving] = useState(false);
  const isPageMounted = useRef(false);

  // Selected entities for edit/view
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);

  // Password visibility toggle in form
  const [showPassword, setShowPassword] = useState(false);

  // Form templates
  const defaultBranchForm = {
    parentCompanyId: '',
    parentCompanyName: '',
    parentGst: '',
    branchName: '',
    branchCode: '',
    adminUsername: '',
    adminPassword: '',
    confirmPassword: '',
    contactPerson: '',
    contactDesignation: 'Branch Manager',
    email: '',
    mobile: '',
    address: '',
    city: '',
    state: 'Tamil Nadu',
    pincode: '',
    industry: 'Information Technology',
    employeeSize: '10-50 Employees',
    status: 'Active',
  };

  const defaultCompanyForm = {
    companyId: '',
    companyName: '',
    companyLogo: '',
    aboutCompany: '',
    industry: 'Information Technology',
    companySize: '500-1000 Employees',
    website: '',
    companyEmail: '',
    companyMobile: '',
    contactPerson: '',
    contactDesignation: '',
    registeredAddress: '',
    city: '',
    state: 'Tamil Nadu',
    pincode: '',
    gstNumber: '',
    gstVerificationStatus: 'Valid',
    status: 'Active',
  };

  const [branchFormData, setBranchFormData] = useState(defaultBranchForm);
  const [branchFormErrors, setBranchFormErrors] = useState({});
  const [companyFormData, setCompanyFormData] = useState(defaultCompanyForm);
  const [companyFormErrors, setCompanyFormErrors] = useState({});

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // ─────────────────────────────────────────────────────────────
  // 1. DATA LOADING: Fetch hierarchical company & branches
  // ─────────────────────────────────────────────────────────────
  const loadCompanies = async (page = currentPage, search = searchTerm, status = selectedStatus) => {
    setIsLoading(true);
    try {
      const res = await CompanyApi.getCompanies({
        page,
        limit: itemsPerPage,
        search: search.trim(),
        status: status !== 'ALL' ? status : undefined,
      });

      if (res && res.success && res.data) {
        const fetched = res.data.companies || [];
        setCompanies(fetched);
        setTotalCount(res.data.pagination?.total ?? fetched.length);
        setIsBackendConnected(true);
      } else {
        setCompanies([]);
        setTotalCount(0);
        setIsBackendConnected(false);
      }
    } catch (err) {
      console.error('Failed to load companies:', err);
      setCompanies([]);
      setTotalCount(0);
      setIsBackendConnected(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isPageMounted.current) {
      isPageMounted.current = true;
      loadCompanies(1, searchTerm, selectedStatus);
      return;
    }

    const timer = setTimeout(() => {
      loadCompanies(1, searchTerm, selectedStatus);
      setCurrentPage(1);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, selectedStatus]);

  // ─────────────────────────────────────────────────────────────
  // 2. FILTERING & FLATTENING BRANCHES
  // ─────────────────────────────────────────────────────────────
  // Filtered Company List
  const filteredCompanies = useMemo(() => {
    const q = searchTerm.toLowerCase();
    return companies.filter((comp) => {
      const matchesSearch =
        !searchTerm ||
        comp.companyName?.toLowerCase().includes(q) ||
        comp.companyId?.toLowerCase().includes(q) ||
        comp.city?.toLowerCase().includes(q) ||
        comp.contactPerson?.toLowerCase().includes(q);

      const matchesStatus =
        selectedStatus === 'ALL' ||
        comp.status?.toUpperCase() === selectedStatus.toUpperCase();

      return matchesSearch && matchesStatus;
    });
  }, [companies, searchTerm, selectedStatus]);

  // Filtered Branches List (Flattened from companies)
  const allBranchesList = useMemo(() => {
    const q = searchTerm.toLowerCase();
    const list = [];

    companies.forEach((comp) => {
      const branchItems = comp.branches || [];
      branchItems.forEach((b) => {
        const matchesSearch =
          !searchTerm ||
          b.branchName?.toLowerCase().includes(q) ||
          b.branchCode?.toLowerCase().includes(q) ||
          b.city?.toLowerCase().includes(q) ||
          b.contactPerson?.toLowerCase().includes(q) ||
          comp.companyName?.toLowerCase().includes(q);

        const matchesStatus =
          selectedStatus === 'ALL' ||
          b.status?.toUpperCase() === selectedStatus.toUpperCase();

        if (matchesSearch && matchesStatus) {
          list.push({
            ...b,
            parentCompanyObj: comp,
            parentCompanyName: comp.companyName,
          });
        }
      });
    });

    return list;
  }, [companies, searchTerm, selectedStatus]);

  // ─────────────────────────────────────────────────────────────
  // 3. ACTION HANDLERS
  // ─────────────────────────────────────────────────────────────
  const handleOpenAddBranch = (parent = null) => {
    const mainComp = parent || companies.find((c) => c.isMainCompany) || companies[0] || null;
    if (!mainComp) {
      showToast('Please register a main company before adding branch locations.', 'error');
      return;
    }
    setSelectedCompany(mainComp);
    setSelectedBranch(null);
    setShowPassword(false);

    setBranchFormData({
      parentCompanyId: mainComp.companyId || '',
      parentCompanyName: mainComp.companyName || '',
      parentGst: mainComp.gstNumber || '',
      branchName: '',
      branchCode: '',
      adminUsername: '',
      adminPassword: '',
      confirmPassword: '',
      contactPerson: '',
      contactDesignation: 'Branch Manager',
      email: '',
      mobile: '',
      address: '',
      city: '',
      state: mainComp.state || 'Tamil Nadu',
      pincode: '',
      industry: mainComp.industry || 'Information Technology',
      employeeSize: '10-50 Employees',
      status: 'Active',
    });
    setBranchFormErrors({});
    setCurrentView('add-branch');
  };

  const handleOpenEditBranch = (branch, parentComp = null) => {
    const parent = parentComp || branch.parentCompanyObj || companies.find((c) => c.companyId === branch.companyId) || companies[0] || null;
    setSelectedCompany(parent);
    setSelectedBranch(branch);
    setShowPassword(false);

    setBranchFormData({
      parentCompanyId: parent?.companyId || branch.companyId || '',
      parentCompanyName: parent?.companyName || branch.parentCompanyName || '',
      parentGst: parent?.gstNumber || '',
      branchName: branch.branchName || '',
      branchCode: branch.branchCode || '',
      adminUsername: branch.adminUsername || '',
      adminPassword: '',
      confirmPassword: '',
      contactPerson: branch.contactPerson || '',
      contactDesignation: branch.contactDesignation || 'Branch Manager',
      email: branch.email || '',
      mobile: branch.mobile || '',
      address: branch.address || '',
      city: branch.city || '',
      state: branch.state || parent?.state || 'Tamil Nadu',
      pincode: branch.pincode || '',
      industry: branch.industry || parent?.industry || 'Information Technology',
      employeeSize: branch.employeeSize || '10-50 Employees',
      status: branch.status || 'Active',
    });
    setBranchFormErrors({});
    setCurrentView('edit-branch');
  };

  const handleOpenViewBranch = (branch, parentComp = null) => {
    handleOpenEditBranch(branch, parentComp);
    setCurrentView('view-branch');
  };

  const handleOpenEditCompany = (company) => {
    setSelectedCompany(company);
    setCompanyFormData({
      ...company,
      companyId: company.companyId,
      companyName: company.companyName,
      companyLogo: company.companyLogo || defaultLogo,
      aboutCompany: company.aboutCompany || '',
      industry: company.industry || 'Information Technology',
      companySize: company.companySize || '500-1000 Employees',
      website: company.website || '',
      companyEmail: company.companyEmail || company.email || '',
      companyMobile: company.companyMobile || company.mobile || '',
      contactPerson: company.contactPerson || '',
      contactDesignation: company.contactDesignation || '',
      registeredAddress: company.registeredAddress || company.address || '',
      city: company.city || '',
      state: company.state || 'Tamil Nadu',
      pincode: company.pincode || '',
      gstNumber: company.gstNumber || '',
      gstVerificationStatus: company.gstVerificationStatus || 'Valid',
      status: company.status || 'Active',
    });
    setCompanyFormErrors({});
    setCurrentView('edit-company');
  };

  const handleOpenViewCompany = (company) => {
    handleOpenEditCompany(company);
    setCurrentView('view-company');
  };

  // ─────────────────────────────────────────────────────────────
  // 4. BRANCH SUBMISSION & VALIDATION
  // ─────────────────────────────────────────────────────────────
  const handleBranchInputChange = (e) => {
    const { name, value } = e.target;
    let sanitizedVal = value;

    if (name === 'contactPerson') sanitizedVal = sanitizeNameInput(value);
    if (name === 'mobile') sanitizedVal = sanitizePhoneInput(value).slice(0, 10);
    if (name === 'pincode') sanitizedVal = sanitizeNumberInput(value).slice(0, 6);
    if (name === 'branchCode') sanitizedVal = value.toUpperCase().replace(/[^A-Z0-9_-]/g, '');
    if (name === 'adminUsername') sanitizedVal = value.toLowerCase().replace(/[^a-z0-9_.]/g, '');

    setBranchFormData((prev) => ({ ...prev, [name]: sanitizedVal }));
    if (branchFormErrors[name]) {
      setBranchFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateBranchForm = () => {
    const errors = {};
    const nameErr = validateRequired(branchFormData.branchName, 'Branch Name');
    if (nameErr) errors.branchName = nameErr;

    const codeErr = validateRequired(branchFormData.branchCode, 'Branch Code');
    if (codeErr) errors.branchCode = codeErr;

    // Validate Credentials in Add Branch mode
    if (currentView === 'add-branch') {
      if (!branchFormData.adminUsername || branchFormData.adminUsername.trim().length < 3) {
        errors.adminUsername = 'Username must be at least 3 characters.';
      }

      if (!branchFormData.adminPassword || branchFormData.adminPassword.length < 6) {
        errors.adminPassword = 'Password must be at least 6 characters.';
      }

      if (branchFormData.adminPassword !== branchFormData.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match.';
      }
    }

    const personErr = validateName(branchFormData.contactPerson, 'Contact Person');
    if (personErr) errors.contactPerson = personErr;

    const emailErr = validateEmail(branchFormData.email, 'Email Address');
    if (emailErr) errors.email = emailErr;

    const mobileErr = validatePhone(branchFormData.mobile, 'Mobile Number');
    if (mobileErr) errors.mobile = mobileErr;

    const addrErr = validateRequired(branchFormData.address, 'Address');
    if (addrErr) errors.address = addrErr;

    const cityErr = validateRequired(branchFormData.city, 'City');
    if (cityErr) errors.city = cityErr;

    const stateErr = validateRequired(branchFormData.state, 'State');
    if (stateErr) errors.state = stateErr;

    const pinErr = validateNumber(branchFormData.pincode, 'Pincode', 6, 6);
    if (pinErr) errors.pincode = pinErr;

    setBranchFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSaveBranch = async (e) => {
    e.preventDefault();
    if (!validateBranchForm()) {
      showToast('Please correct the validation errors in the form.', 'error');
      return;
    }

    setIsSaving(true);
    try {
      const parentId = branchFormData.parentCompanyId || selectedCompany?.companyId;

      if (selectedBranch) {
        // Update Branch
        const branchId = selectedBranch._id || selectedBranch.id;
        const res = await CompanyApi.updateBranch(parentId, branchId, branchFormData);
        if (res && res.success) {
          showToast('Branch updated successfully.', 'success');
          await loadCompanies();
          setCurrentView('list');
        } else {
          showToast(res?.message || 'Failed to update branch.', 'error');
        }
      } else {
        // Create Branch with Administrator Credentials
        const res = await CompanyApi.createBranch(parentId, branchFormData);
        if (res && (res.success || res._id || res.data)) {
          const userNote = branchFormData.adminUsername
            ? `Branch created! Administrator account (${branchFormData.adminUsername}) is active.`
            : 'Branch created successfully and administrator credentials configured.';
          showToast(userNote, 'success');
          await loadCompanies();
          setCurrentView('list');
        } else {
          showToast(res?.message || 'Failed to create branch.', 'error');
          if (res?.message && res.message.toLowerCase().includes('already taken')) {
            setBranchFormErrors((prev) => ({ ...prev, adminUsername: 'Username is already taken.' }));
          }
          if (res?.message && res.message.toLowerCase().includes('already exists')) {
            setBranchFormErrors((prev) => ({ ...prev, branchCode: 'Branch code already in use.' }));
          }
        }
      }
    } catch (err) {
      console.error('Error saving branch:', err);
      showToast('Network error while saving branch.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteBranch = (branch, parentCompany) => {
    setDeleteConfirm({
      isOpen: true,
      branch,
      parentCompany,
      isLoading: false,
    });
  };

  const handleConfirmDeleteBranch = async () => {
    if (!deleteConfirm.branch || !deleteConfirm.parentCompany) return;
    const { branch, parentCompany } = deleteConfirm;
    setDeleteConfirm((prev) => ({ ...prev, isLoading: true }));

    try {
      const branchId = branch._id || branch.id;
      const res = await CompanyApi.deleteBranch(parentCompany.companyId, branchId);
      if (res && res.success) {
        showToast(res.message || `Branch "${branch.branchName}" deleted successfully.`, 'success');
        await loadCompanies();
      } else {
        showToast(res?.message || 'Failed to delete branch.', 'error');
      }
    } catch (err) {
      console.error('Delete branch error:', err);
      showToast(err.response?.data?.message || err.message || 'Error deleting branch.', 'error');
    } finally {
      setDeleteConfirm({ isOpen: false, branch: null, parentCompany: null, isLoading: false });
    }
  };

  // ─────────────────────────────────────────────────────────────
  // 5. COMPANY FORM SUBMISSION
  // ─────────────────────────────────────────────────────────────
  const handleCompanyInputChange = (e) => {
    const { name, value } = e.target;
    let sanitizedVal = value;
    if (name === 'contactPerson') sanitizedVal = sanitizeNameInput(value);
    if (name === 'companyMobile') sanitizedVal = sanitizePhoneInput(value);
    if (name === 'pincode') sanitizedVal = sanitizeNumberInput(value).slice(0, 6);

    setCompanyFormData((prev) => ({ ...prev, [name]: sanitizedVal }));
    if (companyFormErrors[name]) {
      setCompanyFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSaveCompany = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const companyId = companyFormData.companyId || companyFormData._id;
      const res = await CompanyApi.updateCompany(companyId, companyFormData);
      if (res && (res.success || res.companyId)) {
        showToast(`Company "${companyFormData.companyName}" updated successfully.`, 'success');
        await loadCompanies();
        setCurrentView('list');
      } else {
        showToast(res?.message || 'Failed to update company.', 'error');
      }
    } catch (err) {
      console.error('Update company error:', err);
      showToast('Error saving company.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  // ─────────────────────────────────────────────────────────────
  // RENDER VIEW
  // ─────────────────────────────────────────────────────────────
  return (
    <div className="company-details-page">
      {/* Toast Notification */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Custom Modern Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={deleteConfirm.isOpen}
        title="Confirm Delete"
        message={
          deleteConfirm.branch
            ? `Are you sure you want to delete branch "${deleteConfirm.branch.branchName}"? This action cannot be undone.`
            : 'Are you sure you want to delete this branch? This action cannot be undone.'
        }
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={deleteConfirm.isLoading}
        onConfirm={handleConfirmDeleteBranch}
        onCancel={() => setDeleteConfirm({ isOpen: false, branch: null, parentCompany: null, isLoading: false })}
      />

      {/* ══════════════════════════════════════════════════════════
          VIEW 1: DUAL TABLES (Company List & Branch List)
          ══════════════════════════════════════════════════════════ */}
      {currentView === 'list' && (
        <>
          {/* Header Row: Title & "+ Add Branch" Button */}
          <div className="companies-header-row">
            <h1 className="companies-main-title">Company Details</h1>
            <button
              type="button"
              className="btn-save-header-action"
              onClick={() => handleOpenAddBranch()}
              title="Add a new sub-branch"
            >
              <Plus size={16} />
              <span>Add Branch</span>
            </button>
          </div>

          {/* Search and Status Filter Toolbar */}
          <div className="companies-main-card" style={{ padding: '0.85rem 1.25rem', marginBottom: '0.5rem' }}>
            <div className="companies-toolbar" style={{ margin: 0 }}>
              <div className="toolbar-left-group">
                <div style={{ position: 'relative', width: '320px' }}>
                  <Search
                    size={16}
                    style={{
                      position: 'absolute',
                      left: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'var(--text-muted)',
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="company-search-input"
                    style={{ paddingLeft: '36px' }}
                  />
                </div>
              </div>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="toolbar-filter-select"
              >
                <option value="ALL">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Blocked">Blocked</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════
              SECTION 1: COMPANY LIST TABLE
              ═══════════════════════════════════════════════════════ */}
          <div className="section-table-box main-company-table-box" style={{ overflow: 'visible', maxHeight: 'none' }}>
            <div className="module-section-header">
              <div className="module-section-title-wrap">
                <h2 className="module-section-title">
                  <Building2 size={18} style={{ color: 'var(--primary)' }} />
                  <span>Main Company</span>
                </h2>
                
              </div>
            </div>

            <div className="companies-table-container main-company-table-container" style={{ overflowY: 'hidden', overflowX: 'auto', maxHeight: 'none' }}>
              <table className="companies-table">
                <thead>
                  <tr>
                    <th style={{ width: '60px', textAlign: 'center' }}>S.NO</th>
                    <th style={{ textAlign: 'left' }}>COMPANY NAME</th>
                    <th style={{ textAlign: 'left' }}>COMPANY CODE</th>
                    <th style={{ textAlign: 'left' }}>REGISTERED ADDRESS</th>
                    <th style={{ textAlign: 'left' }}>CONTACT PERSON</th>
                    <th style={{ textAlign: 'center' }}>TOTAL BRANCHES</th>
                    <th style={{ textAlign: 'center' }}>STATUS</th>
                    <th style={{ textAlign: 'center', width: '110px' }}>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCompanies.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="empty-table-cell">
                        {isLoading ? 'Loading company records...' : 'No companies found matching criteria.'}
                      </td>
                    </tr>
                  ) : (
                    filteredCompanies.map((company, index) => {
                      const branchCount = (company.branches || []).length;
                      return (
                        <tr key={company.companyId || company._id}>
                          {/* S.NO */}
                          <td style={{ textAlign: 'center', fontWeight: 600 }}>{index + 1}</td>

                          {/* COMPANY NAME */}
                          <td style={{ textAlign: 'left' }}>
                            <div className="company-info-cell" style={{ justifyContent: 'flex-start' }}>
                              <div className="company-logo-mini">
                                {company.companyLogo ? (
                                  <img src={company.companyLogo} alt={company.companyName} />
                                ) : (
                                  <span className="company-logo-letter">
                                    {company.companyName ? company.companyName.trim().charAt(0).toUpperCase() : 'O'}
                                  </span>
                                )}
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                                <span className="company-name-title" style={{ fontSize: '0.94rem', fontWeight: 800 }}>
                                  {company.companyName}
                                </span>
                                {company.isMainCompany && (
                                  <span className="badge-main-company" style={{ fontSize: '0.68rem', padding: '1px 6px' }}>
                                    Main Company
                                  </span>
                                )}
                              </div>
                            </div>
                          </td>

                          {/* COMPANY CODE */}
                          <td style={{ textAlign: 'left' }}>
                            <span className="code-pill" style={{ fontWeight: 700, color: '#1e293b' }}>
                              {company.companyId}
                            </span>
                          </td>

                          {/* REGISTERED ADDRESS */}
                          <td style={{ textAlign: 'left' }}>
                            <div className="location-cell-wrapper" style={{ justifyContent: 'flex-start' }}>
                              <span className="location-pill">
                                <MapPin size={12} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                                <span style={{ fontWeight: 600 }}>{company.city || '—'}</span>
                                <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                                  {company.state || ''}
                                </span>
                              </span>

                              <div className="location-tooltip">
                                <div className="tooltip-title">{company.companyName}</div>
                                <div className="tooltip-address">{company.registeredAddress}</div>
                                <div className="tooltip-meta">
                                  <span>{company.city}, {company.state}</span>
                                  {company.pincode && <span className="tooltip-pin">PIN: {company.pincode}</span>}
                                </div>
                                <div className="tooltip-arrow"></div>
                              </div>
                            </div>
                          </td>

                          {/* CONTACT PERSON */}
                          <td style={{ textAlign: 'left' }}>
                            <div className="contact-name-title">{company.contactPerson || '—'}</div>
                            <div className="contact-sub-meta">
                              {company.companyMobile || company.mobile || company.companyEmail || company.email}
                            </div>
                          </td>

                          {/* TOTAL BRANCHES */}
                          <td style={{ textAlign: 'center' }}>
                            <span className="company-branch-count-btn">
                              <GitBranch size={13} />
                              <span>{branchCount} {branchCount === 1 ? 'Branch' : 'Branches'}</span>
                            </span>
                          </td>

                          {/* STATUS */}
                          <td style={{ textAlign: 'center' }}>
                            <span className={`company-status-pill ${(company.status || 'Active').toLowerCase()}`}>
                              {company.status || 'Active'}
                            </span>
                          </td>

                          {/* ACTIONS */}
                          <td style={{ textAlign: 'center' }}>
                            <div className="table-actions-cluster" style={{ justifyContent: 'center' }}>
                              <button
                                type="button"
                                className="action-icon-button"
                                title="View Company Details"
                                onClick={() => handleOpenViewCompany(company)}
                              >
                                <Eye size={15} />
                              </button>
                              <button
                                type="button"
                                className="action-icon-button"
                                title="Edit Company Details"
                                onClick={() => handleOpenEditCompany(company)}
                              >
                                <Edit2 size={15} />
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
          </div>

          {/* ═══════════════════════════════════════════════════════
              SECTION 2: BRANCH LIST TABLE
              ═══════════════════════════════════════════════════════ */}
          <div className="section-table-box">
            <div className="module-section-header">
              <div className="module-section-title-wrap">
                <h2 className="module-section-title">
                  <GitBranch size={18} style={{ color: 'var(--primary)' }} />
                  <span>Branch List</span>
                </h2>
                <span className="module-section-badge">
                  {allBranchesList.length} {allBranchesList.length === 1 ? 'Branch' : 'Branches'}
                </span>
              </div>
            </div>

            <div className="companies-table-container">
              <table className="companies-table">
                <thead>
                  <tr>
                    <th style={{ width: '60px', textAlign: 'center' }}>S.NO</th>
                    <th style={{ textAlign: 'left' }}>BRANCH NAME</th>
                    <th style={{ textAlign: 'left' }}>BRANCH CODE</th>
                    <th style={{ textAlign: 'left' }}>PARENT COMPANY</th>
                    <th style={{ textAlign: 'left' }}>LOCATION / ADDRESS</th>
                    <th style={{ textAlign: 'left' }}>CONTACT PERSON</th>
                    <th style={{ textAlign: 'center' }}>STATUS</th>
                    <th style={{ textAlign: 'center', width: '110px' }}>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {allBranchesList.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="empty-table-cell">
                        No sub-branches registered yet. Click "+ Add Branch" to create one.
                      </td>
                    </tr>
                  ) : (
                    allBranchesList.map((branch, index) => (
                      <tr key={branch._id || branch.branchCode || index}>
                        {/* S.NO */}
                        <td style={{ textAlign: 'center', fontWeight: 600 }}>{index + 1}</td>

                        {/* BRANCH NAME */}
                        <td style={{ textAlign: 'left' }}>
                          <span style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '0.91rem' }}>
                            {branch.branchName}
                          </span>
                        </td>

                        {/* BRANCH CODE */}
                        <td style={{ textAlign: 'left' }}>
                          <span className="code-pill">
                            {branch.branchCode}
                          </span>
                        </td>

                        {/* PARENT COMPANY */}
                        <td style={{ textAlign: 'left' }}>
                          <span className="parent-company-name">
                            {branch.parentCompanyName || '—'}
                          </span>
                        </td>

                        {/* LOCATION */}
                        <td style={{ textAlign: 'left' }}>
                          <div className="location-cell-wrapper" style={{ justifyContent: 'flex-start' }}>
                            <span className="location-pill">
                              <MapPin size={12} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                              <span>{branch.city || '—'}</span>
                            </span>

                            <div className="location-tooltip">
                              <div className="tooltip-title">{branch.branchName}</div>
                              <div className="tooltip-address">{branch.address || 'Address on file'}</div>
                              <div className="tooltip-meta">
                                <span>{branch.city}, {branch.state}</span>
                                {branch.pincode && <span className="tooltip-pin">PIN: {branch.pincode}</span>}
                              </div>
                              <div className="tooltip-arrow"></div>
                            </div>
                          </div>
                        </td>

                        {/* CONTACT PERSON */}
                        <td style={{ textAlign: 'left' }}>
                          <div className="contact-name-title">{branch.contactPerson || '—'}</div>
                          <div className="contact-sub-meta">
                            {branch.mobile ? `+91 ${branch.mobile}` : branch.email}
                          </div>
                        </td>

                        {/* STATUS */}
                        <td style={{ textAlign: 'center' }}>
                          <span className={`company-status-pill ${(branch.status || 'Active').toLowerCase()}`}>
                            {branch.status || 'Active'}
                          </span>
                        </td>

                        {/* ACTIONS */}
                        <td style={{ textAlign: 'center' }}>
                          <div className="table-actions-cluster" style={{ justifyContent: 'center' }}>
                            <button
                              type="button"
                              className="action-icon-button"
                              title="Edit Branch"
                              onClick={() => handleOpenEditBranch(branch, branch.parentCompanyObj)}
                            >
                              <Edit2 size={15} />
                            </button>
                            <button
                              type="button"
                              className="action-icon-button delete"
                              title="Delete Branch"
                              onClick={() => handleDeleteBranch(branch, branch.parentCompanyObj)}
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
          </div>
        </>
      )}

      {/* ══════════════════════════════════════════════════════════
          VIEW 2: ADD / EDIT / VIEW BRANCH FORM (With Credentials Section)
          ══════════════════════════════════════════════════════════ */}
      {(currentView === 'add-branch' || currentView === 'edit-branch' || currentView === 'view-branch') && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <button
              type="button"
              className="btn-back-to-list"
              onClick={() => setCurrentView('list')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem' }}
            >
              <ArrowLeft size={16} />
              <span>Back to Company & Branch Management</span>
            </button>
          </div>

          <div className="companies-header-row">
            <div>
              <h1 className="companies-main-title">
                {currentView === 'view-branch'
                  ? 'Sub-Branch Profile (Read-Only)'
                  : currentView === 'edit-branch'
                  ? 'Edit Sub-Branch'
                  : 'Add New Sub-Branch'}
              </h1>
              <p style={{ margin: '4px 0 0 0', fontSize: '0.86rem', color: 'var(--text-muted)' }}>
                {currentView === 'add-branch'
                  ? 'Manage sub-branch parameters under registered parent organization.'
                  : 'Manage sub-branch parameters under registered parent organization.'}
              </p>
            </div>
          </div>

          <form onSubmit={handleSaveBranch} className="inpage-company-form">
            {/* SECTION 1: PARENT COMPANY (READ-ONLY) */}
            <div className="inpage-section-box">
              <div className="inpage-section-header">
                1. Parent Company Details (Read-Only)
              </div>
              <div className="readonly-parent-card">
                <div>
                  <div className="parent-title">
                    <Building2 size={18} style={{ color: 'var(--primary)' }} />
                    <span>{branchFormData.parentCompanyName || 'Main Company'}</span>
                    <span className="parent-code-badge">
                      {branchFormData.parentCompanyId || '—'}
                    </span>
                  </div>
                  <div style={{ marginTop: '4px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Parent Company is registered by Super Admin. Sub-branches inherit parent enterprise configuration.
                  </div>
                </div>

                <div className="super-admin-gst-tag">
                  <ShieldCheck size={14} />
                  <span>GSTIN: {branchFormData.parentGst || '—'} (Super Admin Verified)</span>
                </div>
              </div>
            </div>

            {/* SECTION 2: BRANCH IDENTITY & CLASSIFICATION */}
            <div className="inpage-section-box">
              <div className="inpage-section-header">
                2. Branch Identity & Classification
              </div>

              <div className="inpage-grid-3col">
                <div className="form-field-group">
                  <label>
                    Branch Name <span style={{ color: '#dc2626' }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="branchName"
                    placeholder="e.g. Central Branch"
                    value={branchFormData.branchName}
                    onChange={handleBranchInputChange}
                    readOnly={currentView === 'view-branch'}
                    className={`form-control-input ${currentView === 'view-branch' ? 'readonly' : ''}`}
                  />
                  <FieldError error={branchFormErrors.branchName} />
                </div>

                <div className="form-field-group">
                  <label>
                    Branch Code <span style={{ color: '#dc2626' }}>*</span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginLeft: '6px' }}>
                      (Unique within company)
                    </span>
                  </label>
                  <input
                    type="text"
                    name="branchCode"
                    placeholder="e.g. BR-001"
                    value={branchFormData.branchCode}
                    onChange={handleBranchInputChange}
                    readOnly={currentView === 'view-branch'}
                    className={`form-control-input ${currentView === 'view-branch' ? 'readonly' : ''}`}
                  />
                  <FieldError error={branchFormErrors.branchCode} />
                </div>

                <div className="form-field-group">
                  <label>Branch Status <span style={{ color: '#dc2626' }}>*</span></label>
                  {currentView === 'view-branch' ? (
                    <input
                      type="text"
                      value={branchFormData.status}
                      readOnly
                      className="form-control-input readonly"
                    />
                  ) : (
                    <select
                      name="status"
                      value={branchFormData.status}
                      onChange={handleBranchInputChange}
                      className="form-control-select"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  )}
                </div>
              </div>

              <div className="inpage-grid-2col">
                <div className="form-field-group">
                  <label>Industry</label>
                  <input
                    type="text"
                    name="industry"
                    placeholder="e.g. Information Technology"
                    value={branchFormData.industry}
                    onChange={handleBranchInputChange}
                    readOnly={currentView === 'view-branch'}
                    className={`form-control-input ${currentView === 'view-branch' ? 'readonly' : ''}`}
                  />
                </div>

                <div className="form-field-group">
                  <label>Employee Size</label>
                  {currentView === 'view-branch' ? (
                    <input
                      type="text"
                      value={branchFormData.employeeSize}
                      readOnly
                      className="form-control-input readonly"
                    />
                  ) : (
                    <select
                      name="employeeSize"
                      value={branchFormData.employeeSize}
                      onChange={handleBranchInputChange}
                      className="form-control-select"
                    >
                      <option value="1-10 Employees">1-10 Employees</option>
                      <option value="11-50 Employees">11-50 Employees</option>
                      <option value="51-200 Employees">51-200 Employees</option>
                      <option value="201-500 Employees">201-500 Employees</option>
                      <option value="500+ Employees">500+ Employees</option>
                    </select>
                  )}
                </div>
              </div>
            </div>

            {/* ── SECTION 3: CREDENTIAL SECTION FOR SUB-BRANCH ── */}
            {currentView === 'add-branch' && (
              <div className="inpage-section-box">
                <div className="inpage-section-header" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <KeyRound size={16} />
                  <span>3. Branch Administrator Login Credentials</span>
                </div>

                <div className="credential-info-callout">
                  <ShieldCheck size={16} style={{ flexShrink: 0 }} />
                  <span>
                    Configure administrator login credentials for this sub-branch. The branch administrator will use these credentials to securely access the HR Portal.
                  </span>
                </div>

                <div className="inpage-grid-3col">
                  <div className="form-field-group">
                    <label>
                      Administrator Username <span style={{ color: '#dc2626' }}>*</span>
                    </label>
                    <input
                      type="text"
                      name="adminUsername"
                      placeholder="e.g. branch_tambaram"
                      value={branchFormData.adminUsername}
                      onChange={handleBranchInputChange}
                      className="form-control-input"
                    />
                    <FieldError error={branchFormErrors.adminUsername} />
                  </div>

                  <div className="form-field-group">
                    <label>
                      Login Password <span style={{ color: '#dc2626' }}>*</span>
                    </label>
                    <div style={{ position: 'relative' }}>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="adminPassword"
                        placeholder="Enter password (min 6 chars)"
                        value={branchFormData.adminPassword}
                        onChange={handleBranchInputChange}
                        className="form-control-input"
                        style={{ paddingRight: '36px' }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((p) => !p)}
                        style={{
                          position: 'absolute',
                          right: '10px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          background: 'none',
                          border: 'none',
                          color: '#64748b',
                          cursor: 'pointer',
                        }}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    <FieldError error={branchFormErrors.adminPassword} />
                  </div>

                  <div className="form-field-group">
                    <label>
                      Confirm Password <span style={{ color: '#dc2626' }}>*</span>
                    </label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      placeholder="Re-enter password"
                      value={branchFormData.confirmPassword}
                      onChange={handleBranchInputChange}
                      className="form-control-input"
                    />
                    <FieldError error={branchFormErrors.confirmPassword} />
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 4: BRANCH CONTACT DETAILS */}
            <div className="inpage-section-box">
              <div className="inpage-section-header">
                {currentView === 'add-branch' ? '4. Branch Contact Details' : '3. Branch Contact Details'}
              </div>

              <div className="inpage-grid-2col">
                <div className="form-field-group">
                  <label>
                    Contact Person Name <span style={{ color: '#dc2626' }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="contactPerson"
                    placeholder="e.g. Kavitha R"
                    value={branchFormData.contactPerson}
                    onChange={handleBranchInputChange}
                    readOnly={currentView === 'view-branch'}
                    className={`form-control-input ${currentView === 'view-branch' ? 'readonly' : ''}`}
                  />
                  <FieldError error={branchFormErrors.contactPerson} />
                </div>

                <div className="form-field-group">
                  <label>Designation</label>
                  <input
                    type="text"
                    name="contactDesignation"
                    placeholder="e.g. Operations Lead / Branch Manager"
                    value={branchFormData.contactDesignation}
                    onChange={handleBranchInputChange}
                    readOnly={currentView === 'view-branch'}
                    className={`form-control-input ${currentView === 'view-branch' ? 'readonly' : ''}`}
                  />
                </div>
              </div>

              <div className="inpage-grid-2col">
                <div className="form-field-group">
                  <label>
                    Branch Email Address <span style={{ color: '#dc2626' }}>*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="e.g. branch@company.com"
                    value={branchFormData.email}
                    onChange={handleBranchInputChange}
                    readOnly={currentView === 'view-branch'}
                    className={`form-control-input ${currentView === 'view-branch' ? 'readonly' : ''}`}
                  />
                  <FieldError error={branchFormErrors.email} />
                </div>

                <div className="form-field-group">
                  <label>
                    Branch Mobile Number (10 Digits) <span style={{ color: '#dc2626' }}>*</span>
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    placeholder="e.g. 9840112233"
                    value={branchFormData.mobile}
                    onChange={handleBranchInputChange}
                    maxLength={10}
                    readOnly={currentView === 'view-branch'}
                    className={`form-control-input ${currentView === 'view-branch' ? 'readonly' : ''}`}
                  />
                  <FieldError error={branchFormErrors.mobile} />
                </div>
              </div>
            </div>

            {/* SECTION 5: BRANCH ADDRESS */}
            <div className="inpage-section-box">
              <div className="inpage-section-header">
                {currentView === 'add-branch' ? '5. Branch Address' : '4. Branch Address'}
              </div>

              <div className="form-field-group">
                <label>
                  Address (Street / Building) <span style={{ color: '#dc2626' }}>*</span>
                </label>
                <textarea
                  name="address"
                  placeholder="e.g. GST Road, Near Sanatorium Railway Station"
                  value={branchFormData.address}
                  onChange={handleBranchInputChange}
                  readOnly={currentView === 'view-branch'}
                  className={`form-control-textarea ${currentView === 'view-branch' ? 'readonly' : ''}`}
                />
                <FieldError error={branchFormErrors.address} />
              </div>

              <div className="inpage-grid-3col">
                <div className="form-field-group">
                  <label>
                    City <span style={{ color: '#dc2626' }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    placeholder="e.g. Chennai / Coimbatore / Trichy / Puducherry"
                    value={branchFormData.city}
                    onChange={handleBranchInputChange}
                    readOnly={currentView === 'view-branch'}
                    className={`form-control-input ${currentView === 'view-branch' ? 'readonly' : ''}`}
                  />
                  <FieldError error={branchFormErrors.city} />
                </div>

                <div className="form-field-group">
                  <label>
                    State <span style={{ color: '#dc2626' }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="state"
                    placeholder="e.g. Tamil Nadu"
                    value={branchFormData.state}
                    onChange={handleBranchInputChange}
                    readOnly={currentView === 'view-branch'}
                    className={`form-control-input ${currentView === 'view-branch' ? 'readonly' : ''}`}
                  />
                  <FieldError error={branchFormErrors.state} />
                </div>

                <div className="form-field-group">
                  <label>
                    Pincode (6 Digits) <span style={{ color: '#dc2626' }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    placeholder="e.g. 600045"
                    value={branchFormData.pincode}
                    onChange={handleBranchInputChange}
                    maxLength={6}
                    readOnly={currentView === 'view-branch'}
                    className={`form-control-input ${currentView === 'view-branch' ? 'readonly' : ''}`}
                  />
                  <FieldError error={branchFormErrors.pincode} />
                </div>
              </div>
            </div>

            {/* Form Footer Buttons */}
            <div className="inpage-form-footer">
              <button
                type="button"
                className="btn-cancel-action"
                onClick={() => setCurrentView('list')}
                disabled={isSaving}
              >
                {currentView === 'view-branch' ? 'Back to Table' : 'Cancel'}
              </button>
              {currentView !== 'view-branch' && (
                <button
                  type="submit"
                  className="btn-save-header-action"
                  disabled={isSaving}
                >
                  <Save size={16} />
                  <span>{isSaving ? 'Saving...' : currentView === 'edit-branch' ? 'Update Branch' : 'Create Branch'}</span>
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════
          VIEW 3: EDIT & VIEW COMPANY DETAILS
          ══════════════════════════════════════════════════════════ */}
      {(currentView === 'edit-company' || currentView === 'view-company') && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <button
              type="button"
              className="btn-back-to-list"
              onClick={() => setCurrentView('list')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem' }}
            >
              <ArrowLeft size={16} />
              <span>Back to Company & Branch Management</span>
            </button>
          </div>

          <div className="companies-header-row">
            <div>
              <h1 className="companies-main-title">
                {currentView === 'view-company' ? 'Company Details (Read-Only)' : 'Edit Company Details'}
              </h1>
              <p style={{ margin: '4px 0 0 0', fontSize: '0.86rem', color: 'var(--text-muted)' }}>
                {currentView === 'view-company'
                  ? 'Organization profile registered and verified by Super Admin.'
                  : 'Authorized Admin management. Super Admin-controlled GST verification data is protected.'}
              </p>
            </div>
          </div>

          <form onSubmit={handleSaveCompany} className="inpage-company-form">
            {/* SECTION 1: SUPER ADMIN CONTROLLED REGISTRATION & GST (STRICTLY READ-ONLY) */}
            <div className="inpage-section-box">
              <div className="inpage-section-header">
                1. Super Admin Registration & GST Verification (Read-Only)
              </div>

              <div className="inpage-grid-2col">
                <div className="form-field-group">
                  <label>
                    Company Name
                    <span style={{ fontSize: '0.72rem', color: '#4F46E5', background: '#EEF2FF', padding: '1px 6px', borderRadius: '4px', marginLeft: '6px' }}>
                      Super Admin Registered
                    </span>
                  </label>
                  <input
                    type="text"
                    value={companyFormData.companyName}
                    readOnly
                    className="form-control-input readonly"
                    title="Company Name is registered and controlled exclusively by Super Admin."
                  />
                </div>

                <div className="form-field-group">
                  <label>
                    Company Code / ID
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginLeft: '6px' }}>
                      (Read-Only)
                    </span>
                  </label>
                  <input
                    type="text"
                    value={companyFormData.companyId}
                    readOnly
                    className="form-control-input readonly"
                  />
                </div>
              </div>

              <div className="inpage-grid-2col" style={{ alignItems: 'flex-start' }}>
                <div className="form-field-group">
                  <label>
                    GSTIN Number
                    <span style={{ fontSize: '0.72rem', color: '#16a34a', background: '#f0fdf4', padding: '1px 6px', borderRadius: '4px', marginLeft: '6px' }}>
                      Super Admin Verified
                    </span>
                  </label>
                  <input
                    type="text"
                    value={companyFormData.gstNumber || ''}
                    readOnly
                    className="form-control-input readonly"
                  />
                </div>

                <div className="form-field-group">
                  <label>GST Verification Status</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', minHeight: '38px' }}>
                    <span className="super-admin-gst-tag" style={{ padding: '0.45rem 0.85rem' }}>
                      <CheckCircle2 size={16} />
                      <span>Super Admin Verified (Valid)</span>
                    </span>
                  </div>
                  <span style={{ fontSize: '0.73rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    GST registration and verification are controlled exclusively by the Super Admin.
                  </span>
                </div>
              </div>
            </div>

            {/* SECTION 2: COMPANY PROFILE DETAILS */}
            <div className="inpage-section-box">
              <div className="inpage-section-header">
                2. Company Profile Details
              </div>

              <div className="form-field-group">
                <label>About Company</label>
                <textarea
                  name="aboutCompany"
                  value={companyFormData.aboutCompany}
                  onChange={handleCompanyInputChange}
                  readOnly={currentView === 'view-company'}
                  className={`form-control-textarea ${currentView === 'view-company' ? 'readonly' : ''}`}
                  placeholder="Brief description of the organization..."
                />
              </div>

              <div className="inpage-grid-3col">
                <div className="form-field-group">
                  <label>Industry</label>
                  <input
                    type="text"
                    name="industry"
                    value={companyFormData.industry}
                    onChange={handleCompanyInputChange}
                    readOnly={currentView === 'view-company'}
                    className={`form-control-input ${currentView === 'view-company' ? 'readonly' : ''}`}
                  />
                </div>

                <div className="form-field-group">
                  <label>Company Size</label>
                  {currentView === 'view-company' ? (
                    <input
                      type="text"
                      value={companyFormData.companySize}
                      readOnly
                      className="form-control-input readonly"
                    />
                  ) : (
                    <select
                      name="companySize"
                      value={companyFormData.companySize}
                      onChange={handleCompanyInputChange}
                      className="form-control-select"
                    >
                      <option value="1-10 Employees">1-10 Employees</option>
                      <option value="11-50 Employees">11-50 Employees</option>
                      <option value="51-200 Employees">51-200 Employees</option>
                      <option value="201-500 Employees">201-500 Employees</option>
                      <option value="500-1000 Employees">500-1000 Employees</option>
                      <option value="1000-5000 Employees">1000-5000 Employees</option>
                      <option value="5000+ Employees">5000+ Employees</option>
                    </select>
                  )}
                </div>

                <div className="form-field-group">
                  <label>Company Website</label>
                  <input
                    type="text"
                    name="website"
                    value={companyFormData.website}
                    onChange={handleCompanyInputChange}
                    readOnly={currentView === 'view-company'}
                    className={`form-control-input ${currentView === 'view-company' ? 'readonly' : ''}`}
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="inpage-grid-2col">
                <div className="form-field-group">
                  <label>Company Email</label>
                  <input
                    type="email"
                    name="companyEmail"
                    value={companyFormData.companyEmail}
                    onChange={handleCompanyInputChange}
                    readOnly={currentView === 'view-company'}
                    className={`form-control-input ${currentView === 'view-company' ? 'readonly' : ''}`}
                  />
                </div>

                <div className="form-field-group">
                  <label>Company Mobile</label>
                  <input
                    type="tel"
                    name="companyMobile"
                    value={companyFormData.companyMobile}
                    onChange={handleCompanyInputChange}
                    readOnly={currentView === 'view-company'}
                    className={`form-control-input ${currentView === 'view-company' ? 'readonly' : ''}`}
                  />
                </div>
              </div>

              <div className="inpage-grid-2col">
                <div className="form-field-group">
                  <label>Contact Person</label>
                  <input
                    type="text"
                    name="contactPerson"
                    value={companyFormData.contactPerson}
                    onChange={handleCompanyInputChange}
                    readOnly={currentView === 'view-company'}
                    className={`form-control-input ${currentView === 'view-company' ? 'readonly' : ''}`}
                  />
                </div>

                <div className="form-field-group">
                  <label>Contact Designation</label>
                  <input
                    type="text"
                    name="contactDesignation"
                    value={companyFormData.contactDesignation}
                    onChange={handleCompanyInputChange}
                    readOnly={currentView === 'view-company'}
                    className={`form-control-input ${currentView === 'view-company' ? 'readonly' : ''}`}
                  />
                </div>
              </div>
            </div>

            {/* SECTION 3: REGISTERED ADDRESS */}
            <div className="inpage-section-box">
              <div className="inpage-section-header">
                3. Registered Head Office Address
              </div>

              <div className="form-field-group">
                <label>Registered Address</label>
                <textarea
                  name="registeredAddress"
                  value={companyFormData.registeredAddress}
                  onChange={handleCompanyInputChange}
                  readOnly={currentView === 'view-company'}
                  className={`form-control-textarea ${currentView === 'view-company' ? 'readonly' : ''}`}
                />
              </div>

              <div className="inpage-grid-3col">
                <div className="form-field-group">
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    value={companyFormData.city}
                    onChange={handleCompanyInputChange}
                    readOnly={currentView === 'view-company'}
                    className={`form-control-input ${currentView === 'view-company' ? 'readonly' : ''}`}
                  />
                </div>

                <div className="form-field-group">
                  <label>State</label>
                  <input
                    type="text"
                    name="state"
                    value={companyFormData.state}
                    onChange={handleCompanyInputChange}
                    readOnly={currentView === 'view-company'}
                    className={`form-control-input ${currentView === 'view-company' ? 'readonly' : ''}`}
                  />
                </div>

                <div className="form-field-group">
                  <label>Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    value={companyFormData.pincode}
                    onChange={handleCompanyInputChange}
                    maxLength={6}
                    readOnly={currentView === 'view-company'}
                    className={`form-control-input ${currentView === 'view-company' ? 'readonly' : ''}`}
                  />
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="inpage-form-footer">
              <button
                type="button"
                className="btn-cancel-action"
                onClick={() => setCurrentView('list')}
                disabled={isSaving}
              >
                {currentView === 'view-company' ? 'Back to Table' : 'Cancel'}
              </button>
              {currentView === 'edit-company' && (
                <button
                  type="submit"
                  className="btn-save-header-action"
                  disabled={isSaving}
                >
                  <Save size={16} />
                  <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
                </button>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CompanyProfile;
