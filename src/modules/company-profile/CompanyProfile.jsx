import React, { useState, useMemo } from 'react';
import {
  Search,
  Plus,
  Edit2,
  Eye,
  Trash2,
  Lock,
  Unlock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Upload,
  MapPin,
  Building2,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Save,
} from 'lucide-react';
import defaultLogo from '../../assets/logo.png';
import './CompanyProfile.css';

// Initial Mock Companies strictly conforming to user requirements (No Business Type, No PAN/CIN)
const INITIAL_COMPANIES = [
  {
    companyId: 'CMP-1001',
    companyName: 'Acme Technologies Pvt. Ltd.',
    companyLogo: defaultLogo,
    aboutCompany:
      'Enterprise software engineering firm specializing in scalable SaaS architectures, cloud solutions, and recruitment infrastructure.',
    industry: 'Information Technology',
    companySize: '51-200 Employees',
    website: 'https://www.acmetech.io',
    companyEmail: 'contact@acmetech.io',
    companyMobile: '+91 98765 43210',
    contactPerson: 'Rajesh Sharma',
    contactDesignation: 'Head of HR & Operations',
    registeredAddress: 'Ascendas IT Park, 4th Floor, Tech Zone 2',
    city: 'Chennai',
    state: 'Tamil Nadu',
    pincode: '600113',
    gstNumber: '33AAACC1206D1ZM',
    gstVerification: 'Valid',
    gstLegalName: 'ACME TECHNOLOGIES PRIVATE LIMITED',
    gstBusinessStatus: 'Active',
    gstVerificationDate: '12-Oct-2026 10:30 AM',
    companyStatus: 'Active',
    registrationDate: '15-Jan-2025',
    lastUpdated: '12-Oct-2026 01:09 PM',
  },
  {
    companyId: 'CMP-1002',
    companyName: 'Zeta Cloud Solutions LLP',
    companyLogo: '',
    aboutCompany:
      'Cloud modernization and DevOps advisory providing infrastructure management and enterprise security services.',
    industry: 'Cloud Infrastructure & SaaS',
    companySize: '201-500 Employees',
    website: 'https://www.zetacloud.com',
    companyEmail: 'admin@zetacloud.com',
    companyMobile: '+91 98450 11223',
    contactPerson: 'Priya Sundaram',
    contactDesignation: 'VP - Talent Acquisition',
    registeredAddress: 'Brigade Gateway, 12th Floor, Malleshwaram',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560055',
    gstNumber: '29AABCF9812K1ZN',
    gstVerification: 'Valid',
    gstLegalName: 'ZETA CLOUD SOLUTIONS LLP',
    gstBusinessStatus: 'Active',
    gstVerificationDate: '11-Oct-2026 04:15 PM',
    companyStatus: 'Active',
    registrationDate: '02-Mar-2025',
    lastUpdated: '11-Oct-2026 04:15 PM',
  },
  {
    companyId: 'CMP-1003',
    companyName: 'Apex Recruiters & Staffing',
    companyLogo: '',
    aboutCompany:
      'Full-spectrum workforce management and talent sourcing partner for tech, healthcare, and engineering industries.',
    industry: 'Human Resources & Staffing',
    companySize: '11-50 Employees',
    website: 'https://www.apexstaffing.in',
    companyEmail: 'hiring@apexstaffing.in',
    companyMobile: '+91 97112 33445',
    contactPerson: 'Kavitha Raman',
    contactDesignation: 'Managing Director',
    registeredAddress: 'Cyber Towers, Level 3, Hitec City',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '500081',
    gstNumber: '36AAEPA1092M1ZO',
    gstVerification: 'Valid',
    gstLegalName: 'APEX STAFFING SERVICES',
    gstBusinessStatus: 'Active',
    gstVerificationDate: '08-Oct-2026 11:20 AM',
    companyStatus: 'Active',
    registrationDate: '10-May-2025',
    lastUpdated: '09-Oct-2026 02:40 PM',
  },
  {
    companyId: 'CMP-1004',
    companyName: 'Nova Healthtech Innovations',
    companyLogo: '',
    aboutCompany:
      'Digital healthcare and medical diagnostics software provider delivering AI-driven clinical solutions.',
    industry: 'Healthcare & Biotech',
    companySize: '1-10 Employees',
    website: 'https://www.novahealth.tech',
    companyEmail: 'ops@novahealth.tech',
    companyMobile: '+91 94433 88776',
    contactPerson: 'Arun Karthik',
    contactDesignation: 'Co-Founder & CEO',
    registeredAddress: 'TIDEL Park, Module 205, Tharamani',
    city: 'Chennai',
    state: 'Tamil Nadu',
    pincode: '600113',
    gstNumber: '33AABCN5544J1ZQ',
    gstVerification: 'Invalid',
    gstLegalName: '—',
    gstBusinessStatus: 'Cancelled',
    gstVerificationDate: '10-Oct-2026 03:00 PM',
    companyStatus: 'Pending',
    registrationDate: '09-Oct-2026',
    lastUpdated: '10-Oct-2026 03:00 PM',
  },
  {
    companyId: 'CMP-1005',
    companyName: 'Vanguard Global Consulting',
    companyLogo: '',
    aboutCompany:
      'Strategic corporate advisory and digital operations consultancy for Fortune 500 enterprises.',
    industry: 'Management Consulting',
    companySize: '501-1000 Employees',
    website: 'https://www.vanguardconsulting.com',
    companyEmail: 'contact@vanguard.com',
    companyMobile: '+91 99001 22334',
    contactPerson: 'Vikramaditya Roy',
    contactDesignation: 'Head of People Strategy',
    registeredAddress: 'One BKC, G Block, Bandra Kurla Complex',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400051',
    gstNumber: '27AAACV4421B1ZR',
    gstVerification: 'Verification Failed',
    gstLegalName: 'VANGUARD CONSULTING GROUP',
    gstBusinessStatus: 'Suspended',
    gstVerificationDate: '05-Oct-2026 09:12 AM',
    companyStatus: 'Suspended',
    registrationDate: '18-Aug-2024',
    lastUpdated: '05-Oct-2026 09:12 AM',
  },
];

export const CompanyProfile = () => {
  const [companies, setCompanies] = useState(INITIAL_COMPANIES);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('ALL');

  // In-page View Mode: 'list' (Table) | 'edit' (Edit Form) | 'view' (Readonly Details)
  const [currentView, setCurrentView] = useState('list');
  const [isVerifyingGst, setIsVerifyingGst] = useState(false);
  const [saveSuccessMessage, setSaveSuccessMessage] = useState('');

  // Active form data
  const defaultForm = {
    companyId: '',
    companyName: '',
    companyLogo: '',
    aboutCompany: '',
    industry: 'Information Technology',
    companySize: '51-200 Employees',
    website: '',
    companyEmail: '',
    companyMobile: '',
    contactPerson: '',
    contactDesignation: '',
    registeredAddress: '',
    city: '',
    state: '',
    pincode: '',
    gstNumber: '',
    gstVerification: 'Valid',
    gstLegalName: '',
    gstBusinessStatus: 'Active',
    gstVerificationDate: '',
    companyStatus: 'Active',
    registrationDate: '',
    lastUpdated: '',
  };

  const [formData, setFormData] = useState(defaultForm);

  // Filtered List for Table
  const filteredCompanies = useMemo(() => {
    return companies.filter((c) => {
      const matchSearch =
        c.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.companyId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.gstNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.city.toLowerCase().includes(searchTerm.toLowerCase());

      const matchStatus = selectedStatus === 'ALL' || c.companyStatus === selectedStatus;

      return matchSearch && matchStatus;
    });
  }, [companies, searchTerm, selectedStatus]);

  // Open Add Company Form (Switches view in the same card)
  const handleOpenAddForm = () => {
    const nextNum = companies.length + 1;
    const newId = `CMP-${1000 + nextNum}`;
    setFormData({
      ...defaultForm,
      companyId: newId,
      registrationDate: '12-Oct-2026',
      lastUpdated: 'Just now',
      gstVerificationDate: 'Pending Verification',
      gstVerification: 'Not Found',
    });
    setCurrentView('add');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open Edit Form (Switches view in the same card)
  const handleOpenEditForm = (company) => {
    setFormData({ ...company });
    setCurrentView('edit');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open Quick View Form (Switches view in the same card)
  const handleOpenViewForm = (company) => {
    setFormData({ ...company });
    setCurrentView('view');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Switch back to List View
  const handleBackToList = () => {
    setCurrentView('list');
    setSaveSuccessMessage('');
  };

  // Handle Form Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Logo Upload
  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        companyLogo: URL.createObjectURL(file),
      }));
    }
  };

  // Remove Logo
  const handleRemoveLogo = () => {
    setFormData((prev) => ({
      ...prev,
      companyLogo: '',
    }));
  };

  // GST Verification Simulator
  const handleTriggerGstVerification = () => {
    setIsVerifyingGst(true);
    setTimeout(() => {
      setIsVerifyingGst(false);
      const cleanGst = formData.gstNumber.trim().toUpperCase();
      const now =
        new Date().toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }) +
        ' ' +
        new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

      if (cleanGst.length === 15) {
        setFormData((prev) => ({
          ...prev,
          gstVerification: 'Valid',
          gstLegalName: prev.companyName.toUpperCase() + ' (PVT LTD)',
          gstBusinessStatus: 'Active',
          gstVerificationDate: now,
        }));
      } else if (cleanGst.length === 0) {
        setFormData((prev) => ({
          ...prev,
          gstVerification: 'Not Found',
          gstLegalName: '—',
          gstBusinessStatus: 'Inactive',
          gstVerificationDate: now,
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          gstVerification: 'Invalid',
          gstLegalName: 'Verification Failed / No Record',
          gstBusinessStatus: 'Cancelled',
          gstVerificationDate: now,
        }));
      }
    }, 450);
  };

  // Save Company Handler
  const handleSaveCompany = (e) => {
    e.preventDefault();
    const now = '12-Oct-2026 01:09 PM';

    if (currentView === 'add') {
      const newRecord = {
        ...formData,
        lastUpdated: now,
      };
      setCompanies((prev) => [newRecord, ...prev]);
    } else {
      setCompanies((prev) =>
        prev.map((item) =>
          item.companyId === formData.companyId ? { ...formData, lastUpdated: now } : item
        )
      );
    }

    setSaveSuccessMessage('Company details saved successfully!');
    setTimeout(() => {
      setSaveSuccessMessage('');
      setCurrentView('list');
    }, 600);
  };

  // Toggle Company Status (Active <-> Suspended)
  const handleToggleStatus = (companyId) => {
    setCompanies((prev) =>
      prev.map((c) => {
        if (c.companyId === companyId) {
          const next = c.companyStatus === 'Active' ? 'Suspended' : 'Active';
          return { ...c, companyStatus: next };
        }
        return c;
      })
    );
  };

  // Delete Company
  const handleDeleteCompany = (companyId) => {
    if (window.confirm('Are you sure you want to delete this company account?')) {
      setCompanies((prev) => prev.filter((c) => c.companyId !== companyId));
    }
  };

  return (
    <div className="company-details-page animate-fade-in">
      {/* 1. Page Header */}
      <div className="companies-header-row">
        {currentView === 'list' ? (
          <>
            <div>
              <h1 className="companies-main-title">Company Details</h1>
            </div>
            <button
              type="button"
              className="btn-save-header-action"
              onClick={handleOpenAddForm}
            >
              <Plus size={16} strokeWidth={2.5} />
              <span>Add Company</span>
            </button>
          </>
        ) : (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <button
                type="button"
                className="btn-back-to-list"
                onClick={handleBackToList}
                title="Back to Companies List"
              >
                <ArrowLeft size={16} strokeWidth={2.5} />
                <span>Back to List</span>
              </button>
              <h1 className="companies-main-title">
                {currentView === 'add'
                  ? 'Add Company Details'
                  : currentView === 'edit'
                    ? `Edit Company Details — ${formData.companyName}`
                    : `Company Details — ${formData.companyName}`}
              </h1>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <button
                type="button"
                className="btn-cancel-action"
                onClick={handleBackToList}
              >
                {currentView === 'view' ? 'Back to List' : 'Cancel'}
              </button>
              {(currentView === 'edit' || currentView === 'add') && (
                <button
                  type="submit"
                  form="inpage-company-form"
                  className="btn-save-header-action"
                >
                  <Save size={16} />
                  <span>{currentView === 'add' ? 'Add Company' : 'Save Changes'}</span>
                </button>
              )}
            </div>
          </>
        )}
      </div>

      {/* 2. Main White Container Card (Everything renders inside here without popups!) */}
      <div className="companies-main-card">
        {saveSuccessMessage && (
          <div className="inpage-success-banner">
            <CheckCircle2 size={16} />
            <span>{saveSuccessMessage}</span>
          </div>
        )}

        {/* =========================================================================
            VIEW 1: TABLE LIST VIEW (When currentView === 'list')
            ========================================================================= */}
        {currentView === 'list' && (
          <>
            {/* Toolbar: Search + Status Filter + Total Count */}
            <div className="companies-toolbar">
              <div className="toolbar-left-group">
                {/* Search Input Box */}
                <div className="company-search-input">
                  <Search size={16} color="var(--text-muted)" />
                  <input
                    type="text"
                    placeholder="Search Company, ID, GSTIN, Contact..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* Company Status Filter */}
                <select
                  className="toolbar-filter-select"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="ALL">All Company Statuses</option>
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Suspended">Suspended</option>
                  <option value="Blocked">Blocked</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              {/* Right: Total Count Label (Matches Reference UI) */}
              <div className="companies-total-label">
                Total : {filteredCompanies.length} Companies
              </div>
            </div>

            {/* Companies List Table (Solid Primary Banner Header + Clean Rows) */}
            <div className="companies-table-container">
              <table className="companies-table">
                <thead>
                  <tr>
                    <th style={{ width: '50px' }}>S.NO</th>
                    <th>COMPANY</th>
                    <th>CONTACT PERSON</th>
                    <th>INDUSTRY & SIZE</th>
                    <th>LOCATION</th>
                    <th>GST VERIFICATION</th>
                    <th>STATUS</th>
                    <th style={{ textAlign: 'center' }}>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCompanies.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="empty-table-cell">
                        No companies found matching your criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredCompanies.map((company, index) => (
                      <tr key={company.companyId}>
                        {/* S.NO */}
                        <td style={{ fontWeight: 600 }}>{index + 1}</td>

                        {/* COMPANY (Logo + Name + ID) */}
                        <td style={{ whiteSpace: 'nowrap' }}>
                          <div className="company-info-cell" style={{ whiteSpace: 'nowrap' }}>
                            <div className="company-logo-mini">
                              {company.companyLogo ? (
                                <img src={company.companyLogo} alt={company.companyName} />
                              ) : (
                                <span className="company-logo-letter">
                                  {company.companyName ? company.companyName.trim().charAt(0).toUpperCase() : 'C'}
                                </span>
                              )}
                            </div>
                            <div style={{ whiteSpace: 'nowrap' }}>
                              <span className="company-name-title" style={{ whiteSpace: 'nowrap' }}>
                                {company.companyName}
                              </span>
                              <div className="company-sub-id" style={{ whiteSpace: 'nowrap' }}>
                                {company.companyId}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* CONTACT PERSON (Name + Designation + Mobile) */}
                        <td style={{ whiteSpace: 'nowrap' }}>
                          <div style={{ whiteSpace: 'nowrap' }}>
                            <span className="contact-name-title" style={{ whiteSpace: 'nowrap' }}>
                              {company.contactPerson}
                            </span>
                            <div className="contact-sub-meta" style={{ whiteSpace: 'nowrap' }}>
                              {company.contactDesignation} • {company.companyMobile}
                            </div>
                          </div>
                        </td>

                        {/* INDUSTRY & SIZE */}
                        <td style={{ whiteSpace: 'nowrap' }}>
                          <div style={{ whiteSpace: 'nowrap' }}>
                            <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>
                              {company.industry}
                            </div>
                            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                              {company.companySize}
                            </div>
                          </div>
                        </td>

                        {/* LOCATION (City, State) with Interactive Hover Tooltip */}
                        <td style={{ whiteSpace: 'nowrap' }}>
                          <div
                            className="location-cell-wrapper"
                            title={`${company.registeredAddress}, ${company.city}, ${company.state} - ${company.pincode}`}
                          >
                            <div className="location-pill">
                              <MapPin size={14} color="var(--primary)" />
                              <span>{company.city}, {company.state}</span>
                            </div>

                            {/* Hover Tooltip Box */}
                            <div className="location-tooltip">
                              <div className="tooltip-title">Registered Office Address</div>
                              <div className="tooltip-address">{company.registeredAddress}</div>
                              <div className="tooltip-meta">
                                <span>{company.city}, {company.state}</span>
                                <span className="tooltip-pin">PIN: {company.pincode}</span>
                              </div>
                              <div className="tooltip-arrow" />
                            </div>
                          </div>
                        </td>

                        {/* GST VERIFICATION (Badge + GSTIN) */}
                        <td style={{ whiteSpace: 'nowrap' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                            <span
                              className={`gst-status-badge ${company.gstVerification
                                .toLowerCase()
                                .replace(/\s+/g, '_')}`}
                            >
                              {company.gstVerification === 'Valid' && <CheckCircle2 size={12} />}
                              {company.gstVerification === 'Invalid' && <XCircle size={12} />}
                              {company.gstVerification === 'Not Found' && <AlertTriangle size={12} />}
                              {company.gstVerification === 'Verification Failed' && (
                                <AlertTriangle size={12} />
                              )}
                              <span>{company.gstVerification}</span>
                            </span>
                            <span className="gst-sub-number">{company.gstNumber}</span>
                          </div>
                        </td>

                        {/* COMPANY STATUS (Pending, Active, Suspended, Blocked, Closed) */}
                        <td style={{ whiteSpace: 'nowrap' }}>
                          <span
                            className={`company-status-pill ${company.companyStatus.toLowerCase()}`}
                          >
                            {company.companyStatus}
                          </span>
                        </td>

                        {/* ACTION (Edit, View, Status Toggle, Delete) */}
                        <td style={{ whiteSpace: 'nowrap', textAlign: 'center' }}>
                          <div className="table-actions-cluster">
                            {/* Edit Button */}
                            <button
                              type="button"
                              className="action-icon-button"
                              title="Edit Company Details"
                              onClick={() => handleOpenEditForm(company)}
                            >
                              <Edit2 size={16} />
                            </button>

                            {/* Quick View Button */}
                            <button
                              type="button"
                              className="action-icon-button"
                              title="View Company Record"
                              onClick={() => handleOpenViewForm(company)}
                            >
                              <Eye size={16} />
                            </button>

                            {/* Status Toggle Button */}
                            <button
                              type="button"
                              className="action-icon-button"
                              title={
                                company.companyStatus === 'Active'
                                  ? 'Suspend Account'
                                  : 'Activate Account'
                              }
                              onClick={() => handleToggleStatus(company.companyId)}
                            >
                              {company.companyStatus === 'Active' ? (
                                <Unlock size={16} color="var(--color-success)" />
                              ) : (
                                <Lock size={16} color="var(--color-warning)" />
                              )}
                            </button>

                            {/* Delete Button */}
                            <button
                              type="button"
                              className="action-icon-button delete"
                              title="Delete Company"
                              onClick={() => handleDeleteCompany(company.companyId)}
                            >
                              <Trash2 size={16} />
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
            <div className="companies-pagination-row">
              <div className="pagination-entries-count">
                Showing 1 to {filteredCompanies.length} of {companies.length} entries
              </div>
              <div className="pagination-controls">
                <button type="button" className="pagination-nav-btn disabled" disabled>
                  <ChevronLeft size={16} />
                </button>
                <button type="button" className="pagination-page-btn active">
                  1
                </button>
                <button type="button" className="pagination-nav-btn disabled" disabled>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </>
        )}

        {/* =========================================================================
            VIEW 2: IN-PAGE EDIT / VIEW FORM (Table is hidden, no popup!)
            ========================================================================= */}
        {currentView !== 'list' && (
          <form
            id="inpage-company-form"
            onSubmit={handleSaveCompany}
            className="inpage-company-form"
          >
            {/* SECTION 1: Company & Business Identity */}
            <div className="inpage-section-box">
              <div className="inpage-section-header">1. COMPANY INFORMATION</div>

              {/* Logo Upload Row */}
              <div className="inpage-logo-row">
                <div className="inpage-logo-preview">
                  {formData.companyLogo ? (
                    <img src={formData.companyLogo} alt="Logo Preview" />
                  ) : (
                    <span className="company-logo-letter large">
                      {formData.companyName ? formData.companyName.trim().charAt(0).toUpperCase() : 'C'}
                    </span>
                  )}
                </div>
                {currentView !== 'view' && (
                  <div className="inpage-logo-actions">
                    <label className="btn-upload-file">
                      <Upload size={14} />
                      <span>Upload Logo</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        style={{ display: 'none' }}
                      />
                    </label>
                    {formData.companyLogo && (
                      <button
                        type="button"
                        className="btn-remove-file"
                        onClick={handleRemoveLogo}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                )}
              </div>

              <div className="inpage-grid-3col">


                {/* Company Name */}
                <div className="form-field-group">
                  <label>Company Name *</label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    readOnly={currentView === 'view'}
                    required
                    placeholder="Enter company name"
                    className="form-control-input"
                  />
                </div>

                {/* Industry */}
                <div className="form-field-group">
                  <label>Industry *</label>
                  <input
                    type="text"
                    name="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                    readOnly={currentView === 'view'}
                    required
                    placeholder="e.g. Information Technology"
                    className="form-control-input"
                  />
                </div>

                {/* Company Size */}
                <div className="form-field-group">
                  <label>Company Size *</label>
                  <select
                    name="companySize"
                    value={formData.companySize}
                    onChange={handleInputChange}
                    disabled={currentView === 'view'}
                    className="form-control-select"
                  >
                    <option value="1-10 Employees">1-10 Employees</option>
                    <option value="11-50 Employees">11-50 Employees</option>
                    <option value="51-200 Employees">51-200 Employees</option>
                    <option value="201-500 Employees">201-500 Employees</option>
                    <option value="501-1000 Employees">501-1000 Employees</option>
                    <option value="1000+ Employees">1000+ Employees</option>
                  </select>
                </div>

                {/* Website */}
                <div className="form-field-group" style={{ gridColumn: 'span 2' }}>
                  <label>Website</label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    readOnly={currentView === 'view'}
                    placeholder="https://example.com"
                    className="form-control-input"
                  />
                </div>
              </div>

              {/* About Company */}
              <div className="form-field-group" style={{ marginTop: '0.25rem' }}>
                <label>About Company</label>
                <textarea
                  name="aboutCompany"
                  value={formData.aboutCompany}
                  onChange={handleInputChange}
                  readOnly={currentView === 'view'}
                  placeholder="Enter brief company description..."
                  rows={3}
                  className="form-control-textarea"
                />
              </div>
            </div>

            {/* SECTION 2: Official Contact & Registered Address */}
            <div className="inpage-section-box">
              <div className="inpage-section-header">2. OFFICIAL CONTACT & REGISTERED ADDRESS</div>
              <div className="inpage-grid-4col">
                {/* Contact Person */}
                <div className="form-field-group">
                  <label>Contact Person *</label>
                  <input
                    type="text"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleInputChange}
                    readOnly={currentView === 'view'}
                    required
                    placeholder="Primary contact name"
                    className="form-control-input"
                  />
                </div>

                {/* Contact Designation */}


                {/* Company Email */}
                <div className="form-field-group">
                  <label>Company Email *</label>
                  <input
                    type="email"
                    name="companyEmail"
                    value={formData.companyEmail}
                    onChange={handleInputChange}
                    readOnly={currentView === 'view'}
                    required
                    placeholder="official@company.com"
                    className="form-control-input"
                  />
                </div>

                {/* Company Mobile */}
                <div className="form-field-group">
                  <label>Company Mobile *</label>
                  <input
                    type="text"
                    name="companyMobile"
                    value={formData.companyMobile}
                    onChange={handleInputChange}
                    readOnly={currentView === 'view'}
                    required
                    placeholder="+91 98765 43210"
                    className="form-control-input"
                  />
                </div>
              </div>

              <div className="inpage-grid-4col" style={{ marginTop: '1rem' }}>
                {/* Registered Address */}
                <div className="form-field-group" style={{ gridColumn: 'span 2' }}>
                  <label>Registered Address *</label>
                  <input
                    type="text"
                    name="registeredAddress"
                    value={formData.registeredAddress}
                    onChange={handleInputChange}
                    readOnly={currentView === 'view'}
                    required
                    placeholder="Street, Building, Area"
                    className="form-control-input"
                  />
                </div>

                {/* City */}
                <div className="form-field-group">
                  <label>City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    readOnly={currentView === 'view'}
                    required
                    placeholder="City name"
                    className="form-control-input"
                  />
                </div>

                {/* State / Pincode */}
                <div className="form-field-group">
                  <label>State & Pincode *</label>
                  <div style={{ display: 'flex', gap: '0.45rem' }}>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      readOnly={currentView === 'view'}
                      placeholder="State"
                      required
                      className="form-control-input"
                    />
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      readOnly={currentView === 'view'}
                      placeholder="Pincode"
                      required
                      style={{ width: '95px' }}
                      className="form-control-input"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 3: GST Verification & Legal Registration */}
            <div className="inpage-section-box">
              <div className="inpage-section-header">3. GST VERIFICATION & LEGAL DETAILS</div>

              <div className="inpage-grid-3col">
                <div className="form-field-group" style={{ gridColumn: 'span 2' }}>
                  <label>GST Number (GSTIN) *</label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input
                      type="text"
                      name="gstNumber"
                      value={formData.gstNumber}
                      onChange={handleInputChange}
                      readOnly={currentView === 'view'}
                      maxLength={15}
                      placeholder="e.g. 33AAACC1206D1ZM"
                      className="form-control-input"
                      style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}
                    />
                    {currentView !== 'view' && (
                      <button
                        type="button"
                        className="btn-trigger-verify-gst"
                        onClick={handleTriggerGstVerification}
                        disabled={isVerifyingGst}
                      >
                        {isVerifyingGst ? 'Verifying...' : 'Verify GST'}
                      </button>
                    )}
                  </div>
                </div>

                {/* GST Verification Status */}
                <div className="form-field-group">
                  <label>GST Verification Status</label>
                  <div style={{ display: 'flex', alignItems: 'center', height: '40px' }}>
                    <span
                      className={`gst-status-badge ${formData.gstVerification
                        .toLowerCase()
                        .replace(/\s+/g, '_')}`}
                    >
                      {formData.gstVerification}
                    </span>
                  </div>
                </div>
              </div>

              <div className="inpage-grid-2col" style={{ marginTop: '1rem' }}>
                {/* GST Legal Name */}
                <div className="form-field-group">
                  <label>GST Legal Name (from verification)</label>
                  <input
                    type="text"
                    name="gstLegalName"
                    value={formData.gstLegalName}
                    readOnly
                    className="form-control-input readonly"
                  />
                </div>

                {/* GST Business Status */}
                <div className="form-field-group">
                  <label>GST Business Status</label>
                  <input
                    type="text"
                    name="gstBusinessStatus"
                    value={formData.gstBusinessStatus}
                    readOnly
                    className="form-control-input readonly"
                  />
                </div>
              </div>

              <div
                style={{
                  marginTop: '0.65rem',
                  fontSize: '0.78rem',
                  color: 'var(--text-muted)',
                }}
              >
                Latest GST Verification Date:{' '}
                <strong>{formData.gstVerificationDate || 'Not verified yet'}</strong>
              </div>
            </div>

            {/* SECTION 4: Company Status & Audit Metadata */}
            <div className="inpage-section-box">
              <div className="inpage-section-header">4. COMPANY STATUS & AUDIT METADATA</div>
              <div className="inpage-grid-3col">
                {/* Company Status */}
                <div className="form-field-group">
                  <label>Company Status *</label>
                  <select
                    name="companyStatus"
                    value={formData.companyStatus}
                    onChange={handleInputChange}
                    disabled={currentView === 'view'}
                    className="form-control-select"
                  >
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Suspended">Suspended</option>
                    <option value="Blocked">Blocked</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>

                {/* Registration Date */}
                <div className="form-field-group">
                  <label>Registration Date</label>
                  <input
                    type="text"
                    name="registrationDate"
                    value={formData.registrationDate}
                    readOnly
                    className="form-control-input readonly"
                  />
                </div>

                {/* Last Updated */}
                <div className="form-field-group">
                  <label>Last Updated</label>
                  <input
                    type="text"
                    name="lastUpdated"
                    value={formData.lastUpdated}
                    readOnly
                    className="form-control-input readonly"
                  />
                </div>
              </div>
            </div>

            {/* Form Bottom Controls */}
            <div className="inpage-form-footer">
              <button
                type="button"
                className="btn-cancel-action"
                onClick={handleBackToList}
              >
                {currentView === 'view' ? 'Back to List' : 'Cancel'}
              </button>
              {(currentView === 'edit' || currentView === 'add') && (
                <button type="submit" className="btn-save-header-action">
                  <Save size={16} />
                  <span>{currentView === 'add' ? 'Add Company' : 'Save Changes'}</span>
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
