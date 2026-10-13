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
  FileText,
  Download,
} from 'lucide-react';
import './OffersHiringModule.css';

export const OffersHiringModule = () => {
  // STRICTLY and ONLY the 12 user-requested fields:
  // 1. Offer ID: Unique offer reference.
  // 2. Candidate: Selected candidate.
  // 3. Job: Related job.
  // 4. Designation: Offered position.
  // 5. Salary / CTC: Offered compensation.
  // 6. Joining Date: Expected joining date.
  // 7. Offer Valid Until: Offer expiry date.
  // 8. Offer Document: Offer letter/document.
  // 9. Offer Status: Draft, Sent, Accepted, Declined, Expired, Withdrawn.
  // 10. Joining Status: Pending, Joined, Not Joined.
  // 11. Actual Joining Date: Actual date joined.
  // 12. Reason: Reason for declined/not joined/withdrawn, where applicable.

  const [offers, setOffers] = useState([
    {
      id: 'OFR-2026-001',
      candidate: 'Priya Dharshini (CAN-1042)',
      job: 'Senior Frontend Engineer (JOB-2026-001)',
      designation: 'Staff Software Engineer - Frontend',
      salaryCtc: '₹28,50,000 / Annum (₹28.5 LPA)',
      joiningDate: '01-Nov-2026',
      offerValidUntil: '22-Oct-2026',
      offerDocument: 'Offer_Letter_Priya_Dharshini_OFR001.pdf',
      offerStatus: 'Accepted',
      joiningStatus: 'Pending',
      actualJoiningDate: '',
      reason: 'Offer accepted; awaiting background verification clearance.',
    },
    {
      id: 'OFR-2026-002',
      candidate: 'Anand Kumar (CAN-1043)',
      job: 'Lead Product Designer (JOB-2026-002)',
      designation: 'Principal Product Designer',
      salaryCtc: '₹32,00,000 / Annum (₹32.0 LPA)',
      joiningDate: '28-Oct-2026',
      offerValidUntil: '20-Oct-2026',
      offerDocument: 'Offer_Letter_Anand_Kumar_OFR002.pdf',
      offerStatus: 'Accepted',
      joiningStatus: 'Joined',
      actualJoiningDate: '28-Oct-2026',
      reason: 'Onboarded on scheduled date; asset allocation completed.',
    },
    {
      id: 'OFR-2026-003',
      candidate: 'Karthik V (CAN-1045)',
      job: 'DevOps & Cloud Architect (JOB-2026-004)',
      designation: 'Senior Cloud Infrastructure Architect',
      salaryCtc: '₹36,00,000 / Annum (₹36.0 LPA)',
      joiningDate: '15-Nov-2026',
      offerValidUntil: '25-Oct-2026',
      offerDocument: 'Offer_Letter_Karthik_V_OFR003.pdf',
      offerStatus: 'Sent',
      joiningStatus: 'Pending',
      actualJoiningDate: '',
      reason: 'Candidate reviewing compensation breakdown & stock option vesting.',
    },
    {
      id: 'OFR-2026-004',
      candidate: 'Deepa Rajan (CAN-1046)',
      job: 'Senior Technical Recruiter (JOB-2026-003)',
      designation: 'Talent Acquisition Lead',
      salaryCtc: '₹18,50,000 / Annum (₹18.5 LPA)',
      joiningDate: '05-Nov-2026',
      offerValidUntil: '21-Oct-2026',
      offerDocument: 'Offer_Letter_Deepa_Rajan_OFR004.pdf',
      offerStatus: 'Sent',
      joiningStatus: 'Pending',
      actualJoiningDate: '',
      reason: 'Offer dispatched via email; awaiting signed acceptance acknowledgement.',
    },
    {
      id: 'OFR-2026-005',
      candidate: 'Venkatesh S (CAN-1047)',
      job: 'Enterprise Account Executive (JOB-2026-005)',
      designation: 'Senior Director - Enterprise Sales',
      salaryCtc: '₹40,00,000 / Annum (₹40.0 LPA)',
      joiningDate: '10-Nov-2026',
      offerValidUntil: '18-Oct-2026',
      offerDocument: 'Offer_Letter_Venkatesh_S_OFR005.pdf',
      offerStatus: 'Draft',
      joiningStatus: 'Pending',
      actualJoiningDate: '',
      reason: 'Under executive review by VP Sales & Finance.',
    },
    {
      id: 'OFR-2026-006',
      candidate: 'Subhashini M (CAN-1048)',
      job: 'Senior Frontend Engineer (JOB-2026-001)',
      designation: 'Senior Frontend Engineer',
      salaryCtc: '₹26,00,000 / Annum (₹26.0 LPA)',
      joiningDate: '24-Oct-2026',
      offerValidUntil: '12-Oct-2026',
      offerDocument: 'Offer_Letter_Subhashini_M_OFR006.pdf',
      offerStatus: 'Declined',
      joiningStatus: 'Not Joined',
      actualJoiningDate: '',
      reason: 'Candidate accepted competing counter-offer from previous employer.',
    },
    {
      id: 'OFR-2026-007',
      candidate: 'Manoj Krishnan (CAN-1049)',
      job: 'DevOps & Cloud Architect (JOB-2026-004)',
      designation: 'Lead DevOps Engineer',
      salaryCtc: '₹30,00,000 / Annum (₹30.0 LPA)',
      joiningDate: '01-Oct-2026',
      offerValidUntil: '28-Sep-2026',
      offerDocument: 'Offer_Letter_Manoj_Krishnan_OFR007.pdf',
      offerStatus: 'Expired',
      joiningStatus: 'Not Joined',
      actualJoiningDate: '',
      reason: 'Offer validity expired without response from candidate.',
    },
  ]);

  // View state: 'list' | 'form'
  const [currentView, setCurrentView] = useState('list');
  const [editingId, setEditingId] = useState(null);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [offerStatusFilter, setOfferStatusFilter] = useState('All');
  const [joiningStatusFilter, setJoiningStatusFilter] = useState('All');
  const [toastMessage, setToastMessage] = useState('');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Form State (Strictly the 12 requested fields)
  const initialFormState = {
    id: '',
    candidate: '',
    job: '',
    designation: '',
    salaryCtc: '',
    joiningDate: '',
    offerValidUntil: '',
    offerDocument: '',
    offerStatus: 'Draft',
    joiningStatus: 'Pending',
    actualJoiningDate: '',
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
    const nextNum = offers.length + 1;
    const generatedId = `OFR-2026-${String(nextNum).padStart(3, '0')}`;
    setFormData({
      ...initialFormState,
      id: generatedId,
      joiningDate: '01-Nov-2026',
      offerValidUntil: '25-Oct-2026',
      offerDocument: `Offer_Letter_${generatedId}.pdf`,
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

  const handleSaveOffer = (e) => {
    e.preventDefault();
    if (!formData.candidate.trim()) {
      alert('Please enter Selected Candidate.');
      return;
    }
    if (!formData.job.trim()) {
      alert('Please enter Related Job.');
      return;
    }
    if (!formData.designation.trim()) {
      alert('Please enter Offered Designation.');
      return;
    }
    if (!formData.salaryCtc.trim()) {
      alert('Please specify Salary / CTC.');
      return;
    }

    if (editingId) {
      setOffers((prev) =>
        prev.map((item) => (item.id === editingId ? { ...formData } : item))
      );
      showToast(`Offer record "${formData.id}" updated successfully!`);
    } else {
      setOffers((prev) => [formData, ...prev]);
      showToast(`New offer "${formData.id}" generated successfully!`);
    }

    setCurrentView('list');
    setEditingId(null);
  };

  const handleDelete = (id, candidateName) => {
    if (window.confirm(`Are you sure you want to delete offer record for "${candidateName}" (${id})?`)) {
      setOffers((prev) => prev.filter((item) => item.id !== id));
      showToast(`Offer record "${id}" removed.`);
    }
  };

  // Filter & Search Logic
  const filteredOffers = offers.filter((item) => {
    const matchesSearch =
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.candidate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.job.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.salaryCtc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.offerDocument.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesOfferStatus =
      offerStatusFilter === 'All' || item.offerStatus === offerStatusFilter;

    const matchesJoiningStatus =
      joiningStatusFilter === 'All' || item.joiningStatus === joiningStatusFilter;

    return matchesSearch && matchesOfferStatus && matchesJoiningStatus;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredOffers.length / itemsPerPage) || 1;
  const paginatedOffers = filteredOffers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getOfferStatusClass = (status) => {
    switch (status) {
      case 'Draft':
        return 'draft';
      case 'Sent':
        return 'sent';
      case 'Accepted':
        return 'accepted';
      case 'Declined':
        return 'declined';
      case 'Expired':
        return 'expired';
      case 'Withdrawn':
        return 'withdrawn';
      default:
        return '';
    }
  };

  const getJoiningStatusClass = (status) => {
    switch (status) {
      case 'Pending':
        return 'pending';
      case 'Joined':
        return 'joined';
      case 'Not Joined':
        return 'not-joined';
      default:
        return '';
    }
  };

  return (
    <div className="offers-page-container">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="offers-toast-alert">
          <CheckCircle2 size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Page Header */}
      <div className="offers-page-header">
        {currentView === 'list' ? (
          <>
            <div className="offers-header-left">
              <h1 className="offers-page-title">Offers & Hiring</h1>
             
            </div>
            <button
              className="btn-add-offer"
              onClick={handleOpenAdd}
              id="btn-generate-offer"
            >
              <Plus size={16} />
              <span>Generate Offer</span>
            </button>
          </>
        ) : (
          <div className="offers-inpage-header-left">
            <button
              type="button"
              className="btn-back-offers"
              onClick={handleCancelForm}
            >
              <ArrowLeft size={16} />
              <span>Back to Offers List</span>
            </button>
            <h1 className="offers-page-title">
              {editingId ? `Edit Offer: ${formData.id}` : 'Generate Candidate Offer'}
            </h1>
          </div>
        )}
      </div>

      {/* Main Single Card Container */}
      <div className="offers-main-card">
        {currentView === 'list' ? (
          <>
            {/* Toolbar & Filters */}
            <div className="offers-toolbar">
              <div className="offers-toolbar-left">
                <div className="offers-search-box">
                  <Search size={16} className="text-muted" />
                  <input
                    type="text"
                    placeholder="Search candidate, job, designation, offer ID..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="offers-search-input"
                  />
                </div>

                <select
                  value={offerStatusFilter}
                  onChange={(e) => {
                    setOfferStatusFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="offers-filter-select"
                >
                  <option value="All">All Offer Statuses</option>
                  <option value="Draft">Draft</option>
                  <option value="Sent">Sent</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Declined">Declined</option>
                  <option value="Expired">Expired</option>
                  <option value="Withdrawn">Withdrawn</option>
                </select>

                <select
                  value={joiningStatusFilter}
                  onChange={(e) => {
                    setJoiningStatusFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="offers-filter-select"
                >
                  <option value="All">All Joining Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="Joined">Joined</option>
                  <option value="Not Joined">Not Joined</option>
                </select>
              </div>

              {/* Quick Stat Chips */}
              <div className="offers-toolbar-stats">
                <span className="offers-stat-chip">
                  Total: {offers.length}
                </span>
                <span className="offers-stat-chip sent">
                  Sent: {offers.filter((o) => o.offerStatus === 'Sent').length}
                </span>
                <span className="offers-stat-chip accepted">
                  Accepted: {offers.filter((o) => o.offerStatus === 'Accepted').length}
                </span>
                <span className="offers-stat-chip joined">
                  Joined: {offers.filter((o) => o.joiningStatus === 'Joined').length}
                </span>
                <span className="offers-stat-chip declined">
                  Declined: {offers.filter((o) => o.offerStatus === 'Declined').length}
                </span>
              </div>
            </div>

            {/* Modern Data Table */}
            <div className="offers-table-wrapper">
              <table className="offers-table">
                <thead>
                  <tr>
                    <th>S.NO</th>
                    <th>OFFER ID & CANDIDATE</th>
                    <th>JOB & DESIGNATION</th>
                    <th>SALARY / CTC</th>
                    <th>EXPECTED JOINING & VALIDITY</th>
                    <th>OFFER DOCUMENT</th>
                    <th>OFFER STATUS</th>
                    <th>JOINING STATUS</th>
                    <th>ACTUAL JOINING DATE</th>
                    <th>REASON</th>
                    <th style={{ textAlign: 'center' }}>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedOffers.length > 0 ? (
                    paginatedOffers.map((item, index) => {
                      const serialNumber = (currentPage - 1) * itemsPerPage + index + 1;
                      return (
                        <tr key={item.id}>
                          {/* S.NO */}
                          <td style={{ fontWeight: 700, color: '#64748b' }}>
                            {serialNumber}
                          </td>

                          {/* Offer ID & Candidate */}
                          <td>
                            <div className="ofr-cand-cell">
                              <span className="ofr-cand-name">{item.candidate}</span>
                              <span className="ofr-id-badge">{item.id}</span>
                            </div>
                          </td>

                          {/* Job & Designation */}
                          <td>
                            <div className="ofr-role-cell">
                              <span className="ofr-desig-title">{item.designation}</span>
                              <span className="ofr-job-ref">{item.job}</span>
                            </div>
                          </td>

                          {/* Salary / CTC */}
                          <td>
                            <span className="ofr-salary-badge">{item.salaryCtc}</span>
                          </td>

                          {/* Joining Date & Offer Valid Until */}
                          <td>
                            <div className="ofr-date-cell">
                              <span className="ofr-date-main">Joining: {item.joiningDate}</span>
                              <span className="ofr-date-sub">Valid Until: {item.offerValidUntil}</span>
                            </div>
                          </td>

                          {/* Offer Document */}
                          <td>
                            <div
                              className="ofr-doc-pill"
                              title={`Download ${item.offerDocument}`}
                              onClick={() => alert(`Opening Offer Document: ${item.offerDocument}`)}
                            >
                              <FileText size={14} />
                              <span>{item.offerDocument}</span>
                              <Download size={13} style={{ marginLeft: '2px', opacity: 0.8 }} />
                            </div>
                          </td>

                          {/* Offer Status */}
                          <td>
                            <span className={`ofr-status-pill ${getOfferStatusClass(item.offerStatus)}`}>
                              <span className="status-dot"></span>
                              <span>{item.offerStatus}</span>
                            </span>
                          </td>

                          {/* Joining Status */}
                          <td>
                            <span className={`ofr-joining-pill ${getJoiningStatusClass(item.joiningStatus)}`}>
                              <span className="status-dot"></span>
                              <span>{item.joiningStatus}</span>
                            </span>
                          </td>

                          {/* Actual Joining Date */}
                          <td style={{ fontWeight: 600, color: item.actualJoiningDate ? '#166534' : '#64748b' }}>
                            {item.actualJoiningDate || '—'}
                          </td>

                          {/* Reason */}
                          <td style={{ maxWidth: '260px', overflow: 'hidden', textOverflow: 'ellipsis' }} title={item.reason}>
                            <span style={{ color: '#334155', fontSize: '0.82rem' }}>
                              {item.reason || '—'}
                            </span>
                          </td>

                          {/* Actions */}
                          <td style={{ textAlign: 'center' }}>
                            <div className="ofr-row-actions">
                              <button
                                type="button"
                                className="action-icon-btn edit"
                                title="Edit Offer Record"
                                onClick={() => handleOpenEdit(item)}
                              >
                                <Edit2 size={15} />
                              </button>
                              <button
                                type="button"
                                className="action-icon-btn delete"
                                title="Delete Offer Record"
                                onClick={() => handleDelete(item.id, item.candidate)}
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
                      <td colSpan="11">
                        <div className="offers-empty-state">
                          <p>No offer records found matching your criteria.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Table Footer Pagination */}
            <div className="offers-table-footer">
              <div>
                Showing {filteredOffers.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{' '}
                {Math.min(currentPage * itemsPerPage, filteredOffers.length)} of{' '}
                {filteredOffers.length} offers
              </div>

              <div className="offers-pagination-controls">
                <button
                  type="button"
                  className="btn-offers-page"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                >
                  <ChevronLeft size={16} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    type="button"
                    className={`btn-offers-page ${currentPage === page ? 'active' : ''}`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))}

                <button
                  type="button"
                  className="btn-offers-page"
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
             IN-PAGE FORM: Strictly the 12 requested fields (NO MODAL POPUP)
             ===================================================================== */
          <form onSubmit={handleSaveOffer} className="inpage-offer-form">
            {/* Section 1: Offer Identity & Candidate Details */}
            <div className="inpage-section-box">
              <div className="inpage-section-header">
                1. OFFER IDENTITY & CANDIDATE DETAILS
              </div>
              <div className="inpage-grid-4col">
                {/* 1. Offer ID */}
                <div className="form-field-group">
                  <label>Offer ID *</label>
                  <input
                    type="text"
                    className="form-control-input readonly"
                    value={formData.id}
                    readOnly
                  />
                </div>

                {/* 2. Candidate */}
                <div className="form-field-group">
                  <label>Selected Candidate *</label>
                  <input
                    type="text"
                    className="form-control-input"
                    placeholder="e.g. Priya Sharma (CAN-1042)"
                    value={formData.candidate}
                    onChange={(e) => handleInputChange('candidate', e.target.value)}
                    required
                  />
                </div>

                {/* 3. Job */}
                <div className="form-field-group">
                  <label>Related Job *</label>
                  <input
                    type="text"
                    className="form-control-input"
                    placeholder="e.g. Senior Frontend Engineer (JOB-2026-001)"
                    value={formData.job}
                    onChange={(e) => handleInputChange('job', e.target.value)}
                    required
                  />
                </div>

                {/* 4. Designation */}
                <div className="form-field-group">
                  <label>Offered Position / Designation *</label>
                  <input
                    type="text"
                    className="form-control-input"
                    placeholder="e.g. Staff Software Engineer - Frontend"
                    value={formData.designation}
                    onChange={(e) => handleInputChange('designation', e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Compensation & Timeline */}
            <div className="inpage-section-box">
              <div className="inpage-section-header">
                2. COMPENSATION & TIMELINE
              </div>
              <div className="inpage-grid-4col">
                {/* 5. Salary / CTC */}
                <div className="form-field-group">
                  <label>Salary / CTC *</label>
                  <input
                    type="text"
                    className="form-control-input"
                    placeholder="e.g. ₹28,50,000 / Annum (₹28.5 LPA)"
                    value={formData.salaryCtc}
                    onChange={(e) => handleInputChange('salaryCtc', e.target.value)}
                    required
                  />
                </div>

                {/* 6. Joining Date */}
                <div className="form-field-group">
                  <label>Expected Joining Date *</label>
                  <input
                    type="text"
                    className="form-control-input"
                    placeholder="e.g. 01-Nov-2026"
                    value={formData.joiningDate}
                    onChange={(e) => handleInputChange('joiningDate', e.target.value)}
                    required
                  />
                </div>

                {/* 7. Offer Valid Until */}
                <div className="form-field-group">
                  <label>Offer Valid Until *</label>
                  <input
                    type="text"
                    className="form-control-input"
                    placeholder="e.g. 22-Oct-2026"
                    value={formData.offerValidUntil}
                    onChange={(e) => handleInputChange('offerValidUntil', e.target.value)}
                    required
                  />
                </div>

                {/* 8. Offer Document */}
                <div className="form-field-group">
                  <label>Offer Document *</label>
                  <input
                    type="text"
                    className="form-control-input"
                    placeholder="e.g. Offer_Letter_Priya_Sharma.pdf"
                    value={formData.offerDocument}
                    onChange={(e) => handleInputChange('offerDocument', e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Offer Status & Onboarding Tracking */}
            <div className="inpage-section-box">
              <div className="inpage-section-header">
                3. OFFER STATUS & ONBOARDING TRACKING
              </div>
              <div className="inpage-grid-3col">
                {/* 9. Offer Status */}
                <div className="form-field-group">
                  <label>Offer Status *</label>
                  <select
                    className="form-control-select"
                    value={formData.offerStatus}
                    onChange={(e) => handleInputChange('offerStatus', e.target.value)}
                  >
                    <option value="Draft">Draft</option>
                    <option value="Sent">Sent</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Declined">Declined</option>
                    <option value="Expired">Expired</option>
                    <option value="Withdrawn">Withdrawn</option>
                  </select>
                </div>

                {/* 10. Joining Status */}
                <div className="form-field-group">
                  <label>Joining Status *</label>
                  <select
                    className="form-control-select"
                    value={formData.joiningStatus}
                    onChange={(e) => handleInputChange('joiningStatus', e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Joined">Joined</option>
                    <option value="Not Joined">Not Joined</option>
                  </select>
                </div>

                {/* 11. Actual Joining Date */}
                <div className="form-field-group">
                  <label>Actual Joining Date</label>
                  <input
                    type="text"
                    className="form-control-input"
                    placeholder="e.g. 28-Oct-2026 (Leave blank if pending)"
                    value={formData.actualJoiningDate}
                    onChange={(e) => handleInputChange('actualJoiningDate', e.target.value)}
                  />
                </div>
              </div>

              {/* 12. Reason */}
              <div className="form-field-group" style={{ marginTop: '0.25rem' }}>
                <label>Reason (for Declined / Not Joined / Withdrawn or Notes)</label>
                <textarea
                  className="form-control-textarea"
                  rows="3"
                  placeholder="Enter reason if offer was declined, candidate did not join, or internal approval notes..."
                  value={formData.reason}
                  onChange={(e) => handleInputChange('reason', e.target.value)}
                />
              </div>
            </div>

            {/* Bottom Form Actions */}
            <div className="inpage-form-footer">
              <button
                type="button"
                className="btn-cancel-offer"
                onClick={handleCancelForm}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-save-offer"
                id="btn-save-offer"
              >
                <Save size={16} />
                <span>Save Offer & Hiring Record</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
