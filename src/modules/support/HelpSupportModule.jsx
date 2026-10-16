import React, { useState, useEffect, useMemo } from 'react';
import {
  LifeBuoy,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  Upload,
  X,
  ArrowLeft,
  Send,
  MessageSquare,
  ShieldCheck,
  Paperclip,
  Download,
  RotateCcw,
  User,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  HelpCircle,
  Building,
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { Toast } from '../../components/common/Toast/Toast';
import { FieldError } from '../../components/common/FieldError/FieldError';
import './HelpSupportModule.css';

const DEFAULT_TICKETS = [
  {
    id: 'TKT-2026-1045',
    subject: 'GST Verification API timeout during company onboarding',
    category: 'Technical Issue',
    priority: 'High',
    status: 'In Progress',
    createdDate: '14-Oct-2026 11:30 AM',
    lastUpdatedDate: '15-Oct-2026 09:15 AM',
    contactEmail: 'mathan67@hrms.com',
    companyId: 'CMP-1001',
    companyName: 'Marutham Technologies Pvt. Ltd.',
    description:
      'When verifying new branch GST number (33AAACC1206D1ZM), the gateway throws an API connection timeout error after 30 seconds. This blocks branch onboarding for Coimbatore unit.',
    attachments: [
      { name: 'gst_error_log.png', size: '1.2 MB', type: 'image' },
      { name: 'branch_details.pdf', size: '420 KB', type: 'document' },
    ],
    superAdminRemarks:
      'Our cloud infrastructure team has identified upstream GSTN portal sync latency. Hotfix deployed extending socket timeouts to 60s.',
    conversation: [
      {
        id: 'msg-1',
        sender: 'MATHAN67',
        role: 'Company Admin',
        time: '14-Oct-2026 11:30 AM',
        message:
          'Encountering timeout when verifying branch GSTIN 33AAACC1206D1ZM during onboarding. Screenshot attached.',
        attachment: 'gst_error_log.png',
      },
      {
        id: 'msg-2',
        sender: 'HR Portal Support Team',
        role: 'Super Admin Support',
        time: '14-Oct-2026 03:45 PM',
        message:
          'Hello Mathan, we received your ticket. Our technical team is inspecting the webhook retry queue for GST state code 33.',
      },
      {
        id: 'msg-3',
        sender: 'HR Portal Support Team',
        role: 'Super Admin Support',
        time: '15-Oct-2026 09:15 AM',
        message:
          'We have extended the socket timeout to 60s and flushed the cache. Please re-trigger verification from Company Details module and let us know if it succeeds.',
      },
    ],
  },
  {
    id: 'TKT-2026-1046',
    subject: 'Invoice GST breakdown missing on monthly enterprise billing receipt',
    category: 'Billing',
    priority: 'Medium',
    status: 'Resolved',
    createdDate: '12-Oct-2026 10:00 AM',
    lastUpdatedDate: '13-Oct-2026 04:30 PM',
    contactEmail: 'mathan67@hrms.com',
    companyId: 'CMP-1001',
    companyName: 'Marutham Technologies Pvt. Ltd.',
    description:
      'Tax invoice #INV-2026-104 does not reflect CGST 9% and SGST 9% split in the downloaded PDF receipt.',
    attachments: [{ name: 'invoice_INV-2026-104.pdf', size: '850 KB', type: 'document' }],
    superAdminRemarks:
      'Regenerated invoice #INV-2026-104-R with complete 18% GST bifurcation. Updated PDF is now available in your Subscription & Billing module.',
    conversation: [
      {
        id: 'msg-1',
        sender: 'MATHAN67',
        role: 'Company Admin',
        time: '12-Oct-2026 10:00 AM',
        message:
          'Our finance audit team needs CGST and SGST split on invoice #INV-2026-104 for corporate tax filing.',
      },
      {
        id: 'msg-2',
        sender: 'HR Portal Billing Desk',
        role: 'Super Admin Support',
        time: '13-Oct-2026 04:30 PM',
        message:
          'We have updated the billing engine and re-issued the tax invoice with full CGST (₹4,500) and SGST (₹4,500) itemized breakdowns. Resolved.',
      },
    ],
  },
  {
    id: 'TKT-2026-1047',
    subject: 'Candidate match threshold filter not saving in recruitment settings',
    category: 'Feature Request',
    priority: 'Low',
    status: 'Closed',
    createdDate: '09-Oct-2026 02:15 PM',
    lastUpdatedDate: '11-Oct-2026 05:00 PM',
    contactEmail: 'mathan67@hrms.com',
    companyId: 'CMP-1001',
    companyName: 'Marutham Technologies Pvt. Ltd.',
    description:
      'Would like the candidate matching algorithm to default to 85% match score for Senior Tech roles permanently across all recruiters.',
    attachments: [],
    superAdminRemarks:
      'Configured default matching threshold preference in Recruitment Settings. Closed as resolved.',
    conversation: [
      {
        id: 'msg-1',
        sender: 'MATHAN67',
        role: 'Company Admin',
        time: '09-Oct-2026 02:15 PM',
        message: 'Can we save a default 85% threshold score across all tech openings?',
      },
      {
        id: 'msg-2',
        sender: 'HR Portal Product Team',
        role: 'Super Admin Support',
        time: '11-Oct-2026 05:00 PM',
        message:
          'This has been enabled under Company Settings > Recruitment Settings > Screening threshold.',
      },
    ],
  },
  {
    id: 'TKT-2026-1048',
    subject: 'Need 2 additional HR Recruiter role licenses for Coimbatore branch',
    category: 'Account',
    priority: 'High',
    status: 'Open',
    createdDate: '15-Oct-2026 08:30 AM',
    lastUpdatedDate: '15-Oct-2026 08:30 AM',
    contactEmail: 'mathan67@hrms.com',
    companyId: 'CMP-1001',
    companyName: 'Marutham Technologies Pvt. Ltd.',
    description:
      'Our Coimbatore regional unit requires 2 extra user seats with Recruiter role permissions for upcoming engineering campus recruitment drive.',
    attachments: [],
    superAdminRemarks:
      'Ticket acknowledged. Account Manager assigned. Licenses will be activated within 2 business hours.',
    conversation: [
      {
        id: 'msg-1',
        sender: 'MATHAN67',
        role: 'Company Admin',
        time: '15-Oct-2026 08:30 AM',
        message:
          'Requesting 2 recruiter seats for Coimbatore campus hiring. Please apply corporate billing rate.',
      },
    ],
  },
];

export const HelpSupportModule = ({ inSettings = false }) => {
  const { currentUser } = usePortal();

  // Tickets stored in localStorage
  const [tickets, setTickets] = useState(() => {
    const saved = localStorage.getItem('hr_admin_support_tickets_v1');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return DEFAULT_TICKETS;
  });

  // Current view: 'list' | 'create' | 'details'
  const [currentView, setCurrentView] = useState('list');
  const [selectedTicket, setSelectedTicket] = useState(null);

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [dateFilter, setDateFilter] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Toast Notification
  const [toast, setToast] = useState(null);
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('hr_admin_support_tickets_v1', JSON.stringify(tickets));
  }, [tickets]);

  // Form State for "Create Ticket"
  const defaultEmail = currentUser?.email || 'mathan67@hrms.com';
  const defaultCompanyName = 'Marutham Technologies Pvt. Ltd.';
  const defaultCompanyId = 'CMP-1001';

  const [createForm, setCreateForm] = useState({
    subject: '',
    category: 'Technical Issue',
    priority: 'Medium',
    description: '',
    attachments: [],
  });
  const [formErrors, setFormErrors] = useState({});
  const [uploadedFile, setUploadedFile] = useState(null);

  // Form State for "Reply Box"
  const [replyText, setReplyText] = useState('');
  const [replyFile, setReplyFile] = useState(null);

  // Generate unique Ticket ID
  const generateTicketId = () => {
    const count = tickets.length + 1;
    const year = new Date().getFullYear();
    const idNum = 1045 + count;
    return `TKT-${year}-${idNum}`;
  };

  // Format current date-time for display
  const getFormattedNow = () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${day}-${month}-${year} ${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;
  };

  // Switch to Create View
  const handleOpenCreate = () => {
    setFormErrors({});
    setUploadedFile(null);
    setCreateForm({
      subject: '',
      category: 'Technical Issue',
      priority: 'Medium',
      description: '',
      attachments: [],
    });
    setCurrentView('create');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Switch to Details View
  const handleOpenDetails = (ticket) => {
    setSelectedTicket(ticket);
    setReplyText('');
    setReplyFile(null);
    setCurrentView('details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedTicket(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle File Input in Create Ticket
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileSize = (file.size / 1024).toFixed(0);
      const sizeStr = fileSize > 1024 ? `${(fileSize / 1024).toFixed(1)} MB` : `${fileSize} KB`;
      setUploadedFile({
        name: file.name,
        size: sizeStr,
        type: file.type.startsWith('image/') ? 'image' : 'document',
      });
    }
  };

  // Submit Ticket Creation
  const handleCreateSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!createForm.subject.trim()) {
      errors.subject = 'Issue Subject / Title is required';
    }
    if (!createForm.category) {
      errors.category = 'Category selection is required';
    }
    if (!createForm.priority) {
      errors.priority = 'Priority selection is required';
    }
    if (!createForm.description.trim()) {
      errors.description = 'Issue Description is required';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const newTicketId = generateTicketId();
    const nowTime = getFormattedNow();
    const adminName = currentUser?.name || 'MATHAN67';

    const attachmentsList = uploadedFile ? [uploadedFile] : [];

    const newTicket = {
      id: newTicketId,
      subject: createForm.subject.trim(),
      category: createForm.category,
      priority: createForm.priority,
      status: 'Open',
      createdDate: nowTime,
      lastUpdatedDate: nowTime,
      contactEmail: defaultEmail,
      companyId: defaultCompanyId,
      companyName: defaultCompanyName,
      description: createForm.description.trim(),
      attachments: attachmentsList,
      superAdminRemarks: 'Ticket received and queued for Super Admin technical review.',
      conversation: [
        {
          id: `msg-${Date.now()}`,
          sender: adminName,
          role: 'Company Admin',
          time: nowTime,
          message: createForm.description.trim(),
          attachment: uploadedFile ? uploadedFile.name : null,
        },
      ],
    };

    setTickets((prev) => [newTicket, ...prev]);
    showToast(`Support Ticket ${newTicketId} created successfully!`, 'success');
    handleOpenDetails(newTicket);
  };

  // Send Reply in Ticket Details
  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim() && !replyFile) return;

    const nowTime = getFormattedNow();
    const adminName = currentUser?.name || 'MATHAN67';

    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: adminName,
      role: 'Company Admin',
      time: nowTime,
      message: replyText.trim() || 'Attached supplementary diagnostic file.',
      attachment: replyFile ? replyFile.name : null,
    };

    const updatedTicket = {
      ...selectedTicket,
      lastUpdatedDate: nowTime,
      status: selectedTicket.status === 'Resolved' || selectedTicket.status === 'Closed' ? 'In Progress' : selectedTicket.status,
      conversation: [...selectedTicket.conversation, newMsg],
      attachments: replyFile
        ? [...(selectedTicket.attachments || []), replyFile]
        : selectedTicket.attachments,
    };

    setSelectedTicket(updatedTicket);
    setTickets((prev) => prev.map((t) => (t.id === updatedTicket.id ? updatedTicket : t)));
    setReplyText('');
    setReplyFile(null);
    showToast('Reply message posted to ticket thread!', 'success');
  };

  // Reopen Ticket
  const handleReopenTicket = () => {
    const nowTime = getFormattedNow();
    const adminName = currentUser?.name || 'MATHAN67';

    const reopenMsg = {
      id: `msg-${Date.now()}`,
      sender: adminName,
      role: 'Company Admin',
      time: nowTime,
      message: 'Ticket reopened by Admin for further clarification / recurring issue.',
    };

    const updated = {
      ...selectedTicket,
      status: 'Open',
      lastUpdatedDate: nowTime,
      conversation: [...selectedTicket.conversation, reopenMsg],
    };

    setSelectedTicket(updated);
    setTickets((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    showToast(`Ticket ${selectedTicket.id} reopened successfully!`, 'success');
  };

  // Close Ticket
  const handleCloseTicket = () => {
    const nowTime = getFormattedNow();
    const adminName = currentUser?.name || 'MATHAN67';

    const closeMsg = {
      id: `msg-${Date.now()}`,
      sender: adminName,
      role: 'Company Admin',
      time: nowTime,
      message: 'Issue verified as resolved by Admin. Ticket marked as Closed.',
    };

    const updated = {
      ...selectedTicket,
      status: 'Closed',
      lastUpdatedDate: nowTime,
      conversation: [...selectedTicket.conversation, closeMsg],
    };

    setSelectedTicket(updated);
    setTickets((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    showToast(`Ticket ${selectedTicket.id} closed.`, 'info');
  };

  // Filtered Tickets
  const filteredTickets = useMemo(() => {
    return tickets.filter((t) => {
      const q = searchTerm.toLowerCase().trim();
      const matchSearch =
        !q ||
        t.id.toLowerCase().includes(q) ||
        t.subject.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q);

      const matchPriority = priorityFilter === 'ALL' || t.priority === priorityFilter;
      const matchStatus = statusFilter === 'ALL' || t.status === statusFilter;

      return matchSearch && matchPriority && matchStatus;
    });
  }, [tickets, searchTerm, priorityFilter, statusFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredTickets.length / itemsPerPage) || 1;
  const paginatedTickets = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredTickets.slice(start, start + itemsPerPage);
  }, [filteredTickets, currentPage, itemsPerPage]);

  // Statistics
  const stats = useMemo(() => {
    const total = tickets.length;
    const openCount = tickets.filter((t) => t.status === 'Open').length;
    const inProgressCount = tickets.filter((t) => t.status === 'In Progress').length;
    const resolvedCount = tickets.filter((t) => t.status === 'Resolved' || t.status === 'Closed').length;
    return { total, openCount, inProgressCount, resolvedCount };
  }, [tickets]);

  return (
    <div className="support-container animate-fade-in">
      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          duration={3500}
          onClose={() => setToast(null)}
        />
      )}

      {/* 1. Header */}
      <div className="support-header">
        <div className="support-header-left">
          <h1 className="support-title">
            <LifeBuoy size={26} color="var(--primary)" />
            <span>
              {currentView === 'list'
                ? 'Help & Support'
                : currentView === 'create'
                ? 'Create Support Ticket'
                : `Ticket Details — ${selectedTicket?.id}`}
            </span>
          </h1>
        </div>

        <div className="support-header-actions">
          {currentView === 'list' ? (
            <button
              type="button"
              className="btn-primary-action"
              onClick={handleOpenCreate}
            >
              <Plus size={16} strokeWidth={2.5} />
              <span>Create Ticket</span>
            </button>
          ) : (
            <button
              type="button"
              className="btn-secondary-action"
              onClick={handleBackToList}
            >
              <ArrowLeft size={16} strokeWidth={2.5} />
              <span>Back to Tickets</span>
            </button>
          )}
        </div>
      </div>

      {/* =========================================================================
          VIEW 1: MY TICKETS LIST (When currentView === 'list')
          ========================================================================= */}
      {currentView === 'list' && (
        <>
          {/* Summary Metric Cards */}
          <div className="support-metrics-grid">
            <div className="support-metric-card">
              <div className="support-metric-info">
                <span className="support-metric-label">Total Tickets</span>
                <span className="support-metric-value">{stats.total}</span>
              </div>
              <div className="support-metric-icon blue">
                <FileText size={22} />
              </div>
            </div>

            <div className="support-metric-card">
              <div className="support-metric-info">
                <span className="support-metric-label">Open Tickets</span>
                <span className="support-metric-value">{stats.openCount}</span>
              </div>
              <div className="support-metric-icon amber">
                <AlertCircle size={22} />
              </div>
            </div>

            <div className="support-metric-card">
              <div className="support-metric-info">
                <span className="support-metric-label">In Progress</span>
                <span className="support-metric-value">{stats.inProgressCount}</span>
              </div>
              <div className="support-metric-icon purple">
                <Clock size={22} />
              </div>
            </div>

            <div className="support-metric-card">
              <div className="support-metric-info">
                <span className="support-metric-label">Resolved / Closed</span>
                <span className="support-metric-value">{stats.resolvedCount}</span>
              </div>
              <div className="support-metric-icon green">
                <CheckCircle2 size={22} />
              </div>
            </div>
          </div>

          {/* Main White Card Container */}
          <div className="support-main-card">
            {/* Toolbar: Search (Left) + Priority/Status Filters (Right) */}
            <div className="support-toolbar">
              <div className="support-search-box">
                <Search size={16} className="support-search-icon" />
                <input
                  type="text"
                  placeholder="Search Ticket ID, Subject, Category..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="support-search-input"
                />
                {searchTerm && (
                  <button
                    type="button"
                    className="support-search-clear"
                    onClick={() => setSearchTerm('')}
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              <div className="support-toolbar-filters">
                {/* Priority Filter */}
                <div className="support-filter-wrap">
                  <Filter size={14} color="var(--text-muted)" />
                  <select
                    className="support-filter-select"
                    value={priorityFilter}
                    onChange={(e) => {
                      setPriorityFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                  >
                    <option value="ALL">All Priorities</option>
                    <option value="Critical">Critical</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                {/* Status Filter */}
                <div className="support-filter-wrap">
                  <select
                    className="support-filter-select"
                    value={statusFilter}
                    onChange={(e) => {
                      setStatusFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                  >
                    <option value="ALL">All Statuses</option>
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
              </div>
            </div>

            {/* My Tickets Data Table */}
            <div className="support-table-container">
              <table className="support-table">
                <thead>
                  <tr>
                    <th style={{ width: '75px', textAlign: 'center' }}>S.NO</th>
                    <th style={{ width: '150px' }}>TICKET ID</th>
                    <th>SUBJECT</th>
                    <th style={{ width: '160px' }}>CATEGORY</th>
                    <th style={{ width: '120px', textAlign: 'center' }}>PRIORITY</th>
                    <th style={{ width: '140px', textAlign: 'center' }}>STATUS</th>
                    <th style={{ width: '170px' }}>CREATED DATE</th>
                    <th style={{ width: '170px' }}>LAST UPDATED DATE</th>
                    <th style={{ width: '130px', textAlign: 'center' }}>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedTickets.length > 0 ? (
                    paginatedTickets.map((t, index) => {
                      const sNo = (currentPage - 1) * itemsPerPage + index + 1;
                      const priorityClass = t.priority.toLowerCase();
                      const statusClass = t.status.toLowerCase().replace(/\s+/g, '_');

                      return (
                        <tr key={t.id}>
                          {/* 1. S.No */}
                          <td style={{ textAlign: 'center', fontWeight: 700, color: '#64748b' }}>
                            {sNo}
                          </td>

                          {/* 2. Ticket ID */}
                          <td>
                            <button
                              type="button"
                              className="ticket-id-link"
                              onClick={() => handleOpenDetails(t)}
                              title="Click to view details"
                            >
                              {t.id}
                            </button>
                          </td>

                          {/* 3. Subject */}
                          <td>
                            <span className="ticket-subject-cell" title={t.subject}>
                              {t.subject}
                            </span>
                          </td>

                          {/* 4. Category */}
                          <td>
                            <span className="ticket-category-tag">
                              {t.category}
                            </span>
                          </td>

                          {/* 5. Priority */}
                          <td style={{ textAlign: 'center' }}>
                            <span className={`badge-priority ${priorityClass}`}>
                              {t.priority}
                            </span>
                          </td>

                          {/* 6. Status */}
                          <td style={{ textAlign: 'center' }}>
                            <span className={`badge-status ${statusClass}`}>
                              <span className="badge-status-dot" />
                              <span>{t.status}</span>
                            </span>
                          </td>

                          {/* 7. Created Date */}
                          <td>
                            <span style={{ fontSize: '0.82rem', color: '#475569' }}>
                              {t.createdDate}
                            </span>
                          </td>

                          {/* 8. Last Updated Date */}
                          <td>
                            <span style={{ fontSize: '0.82rem', color: '#475569' }}>
                              {t.lastUpdatedDate}
                            </span>
                          </td>

                          {/* 9. Action: View Details */}
                          <td style={{ textAlign: 'center' }}>
                            <button
                              type="button"
                              className="btn-view-details"
                              onClick={() => handleOpenDetails(t)}
                              title="View full conversation and remarks"
                            >
                              <ExternalLink size={13} />
                              <span>View Details</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={9} className="support-empty-cell">
                        {searchTerm || priorityFilter !== 'ALL' || statusFilter !== 'ALL'
                          ? 'No tickets match your filters. Try resetting search or filter options.'
                          : 'No support tickets raised yet. Click "+ Create Ticket" above to raise an issue.'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {filteredTickets.length > itemsPerPage && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  paddingTop: '0.75rem',
                  borderTop: '1px solid var(--border-color)',
                }}
              >
                <span style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                  Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
                  {Math.min(currentPage * itemsPerPage, filteredTickets.length)} of{' '}
                  {filteredTickets.length} tickets
                </span>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    style={{
                      padding: '0.38rem 0.75rem',
                      background: '#ffffff',
                      border: '1px solid var(--border-color)',
                      borderRadius: '6px',
                      cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                      opacity: currentPage === 1 ? 0.4 : 1,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                    }}
                  >
                    <ChevronLeft size={15} />
                    <span>Prev</span>
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
                    <button
                      key={pg}
                      type="button"
                      onClick={() => setCurrentPage(pg)}
                      style={{
                        minWidth: '32px',
                        height: '32px',
                        background: currentPage === pg ? 'var(--primary)' : '#ffffff',
                        color: currentPage === pg ? '#ffffff' : 'var(--text-main)',
                        border: '1px solid',
                        borderColor: currentPage === pg ? 'var(--primary)' : 'var(--border-color)',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: 700,
                        fontSize: '0.82rem',
                      }}
                    >
                      {pg}
                    </button>
                  ))}

                  <button
                    type="button"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    style={{
                      padding: '0.38rem 0.75rem',
                      background: '#ffffff',
                      border: '1px solid var(--border-color)',
                      borderRadius: '6px',
                      cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                      opacity: currentPage === totalPages ? 0.4 : 1,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                    }}
                  >
                    <span>Next</span>
                    <ChevronRight size={15} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {/* =========================================================================
          VIEW 2: CREATE TICKET FORM (When currentView === 'create')
          ========================================================================= */}
      {currentView === 'create' && (
        <form onSubmit={handleCreateSubmit} className="ticket-form-section" noValidate>
          {/* Important Requirement Note Banner */}
          <div className="ticket-autofill-banner">
            <CheckCircle2 size={18} color="#0284c7" />
            <div>
              <strong>Automatic Generation Notice:</strong> Ticket ID, Contact Email, Company ID,
              Created Date, and Initial Status (<strong>Open</strong>) are automatically generated and
              managed by the system.
            </div>
          </div>

          {/* Section A: Ticket & Profile System Information (Auto-generated & Auto-filled) */}
          <div className="ticket-section-box">
            <div className="ticket-section-header">
              <span>1. SYSTEM IDENTIFICATION & PROFILE (AUTOMATICALLY GENERATED)</span>
            </div>

            <div className="ticket-grid-3col">
              {/* Ticket ID */}
              <div className="form-field-group">
                <label>
                  Ticket ID <span className="auto-badge-pill">Auto-generated</span>
                </label>
                <input
                  type="text"
                  value={generateTicketId()}
                  readOnly
                  className="form-control-input readonly-autofilled-field"
                  title="Unique ticket number generated automatically"
                />
              </div>

              {/* Contact Email */}
              <div className="form-field-group">
                <label>
                  Contact Email <span className="auto-badge-pill">Auto-filled</span>
                </label>
                <input
                  type="email"
                  value={defaultEmail}
                  readOnly
                  className="form-control-input readonly-autofilled-field"
                  title="Admin registered email from account profile"
                />
              </div>

              {/* Company ID & Name */}
              <div className="form-field-group">
                <label>
                  Company ID <span className="auto-badge-pill">Auto-filled</span>
                </label>
                <input
                  type="text"
                  value={`${defaultCompanyId} — ${defaultCompanyName}`}
                  readOnly
                  className="form-control-input readonly-autofilled-field"
                  title="Registered Company ID"
                />
              </div>

              {/* Created Date */}
              <div className="form-field-group">
                <label>
                  Created Date <span className="auto-badge-pill">Auto-generated</span>
                </label>
                <input
                  type="text"
                  value={getFormattedNow()}
                  readOnly
                  className="form-control-input readonly-autofilled-field"
                />
              </div>

              {/* Initial Status */}
              <div className="form-field-group">
                <label>
                  Initial Status <span className="auto-badge-pill">Auto-assigned</span>
                </label>
                <div style={{ display: 'flex', alignItems: 'center', height: '40px' }}>
                  <span className="badge-status open">
                    <span className="badge-status-dot" />
                    <span>Open</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Section B: Issue Details & Required Input Fields */}
          <div className="ticket-section-box">
            <div className="ticket-section-header">
              <span>2. ISSUE SPECIFICATION & DETAILS</span>
            </div>

            <div className="ticket-grid-3col">
              {/* Subject */}
              <div className="form-field-group" style={{ gridColumn: 'span 2' }}>
                <label>
                  Subject * <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(Short issue title)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. GST Verification timeout during branch creation..."
                  value={createForm.subject}
                  onChange={(e) => {
                    setCreateForm({ ...createForm, subject: e.target.value });
                    if (formErrors.subject) setFormErrors({ ...formErrors, subject: null });
                  }}
                  className={`form-control-input ${formErrors.subject ? 'has-error' : ''}`}
                  autoFocus
                />
                <FieldError error={formErrors.subject} />
              </div>

              {/* Category */}
              <div className="form-field-group">
                <label>Category *</label>
                <select
                  value={createForm.category}
                  onChange={(e) => setCreateForm({ ...createForm, category: e.target.value })}
                  className="form-control-select"
                >
                  <option value="Technical Issue">Technical Issue</option>
                  <option value="Billing">Billing</option>
                  <option value="Account">Account</option>
                  <option value="Feature Request">Feature Request</option>
                  <option value="Other">Other</option>
                </select>
                <FieldError error={formErrors.category} />
              </div>

              {/* Priority */}
              <div className="form-field-group">
                <label>Priority *</label>
                <select
                  value={createForm.priority}
                  onChange={(e) => setCreateForm({ ...createForm, priority: e.target.value })}
                  className="form-control-select"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>
                <FieldError error={formErrors.priority} />
              </div>
            </div>

            {/* Description */}
            <div className="form-field-group" style={{ marginTop: '0.5rem' }}>
              <label>
                Description * <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(Detailed issue explanation)</span>
              </label>
              <textarea
                placeholder="Explain the problem in detail: what steps were taken, any error codes received, and how this impacts your workflow..."
                value={createForm.description}
                onChange={(e) => {
                  setCreateForm({ ...createForm, description: e.target.value });
                  if (formErrors.description) setFormErrors({ ...formErrors, description: null });
                }}
                rows={4}
                className={`form-control-textarea ${formErrors.description ? 'has-error' : ''}`}
              />
              <FieldError error={formErrors.description} />
            </div>

            {/* Attachment (File Upload) */}
            <div className="form-field-group" style={{ marginTop: '0.5rem' }}>
              <label>
                Attachment <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(Screenshot, document, error image)</span>
              </label>

              {!uploadedFile ? (
                <label className="ticket-upload-box">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    accept="image/*,.pdf,.doc,.docx,.txt"
                  />
                  <div className="ticket-upload-icon">
                    <Upload size={20} />
                  </div>
                  <div style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    Click to browse or drop file here
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Supports PNG, JPG, PDF, DOCX (Max 10MB)
                  </div>
                </label>
              ) : (
                <div className="ticket-attached-file">
                  <div className="ticket-attached-left">
                    <Paperclip size={16} color="var(--primary)" />
                    <span>{uploadedFile.name}</span>
                    <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                      ({uploadedFile.size})
                    </span>
                  </div>
                  <button
                    type="button"
                    className="btn-remove-attachment"
                    onClick={() => setUploadedFile(null)}
                    title="Remove attachment"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Form Actions */}
          <div className="ticket-form-actions">
            <button
              type="button"
              className="btn-secondary-action"
              onClick={handleBackToList}
            >
              Cancel
            </button>

            <button type="submit" className="btn-primary-action">
              <CheckCircle2 size={16} />
              <span>Submit Ticket</span>
            </button>
          </div>
        </form>
      )}

      {/* =========================================================================
          VIEW 3: TICKET DETAILS PAGE (When currentView === 'details')
          ========================================================================= */}
      {currentView === 'details' && selectedTicket && (
        <div className="ticket-details-view">
          {/* Quick Actions & Reopen Banner */}
          {(selectedTicket.status === 'Resolved' || selectedTicket.status === 'Closed') && (
            <div className="reopen-banner">
              <div className="reopen-banner-left">
                <span className="reopen-banner-title">
                  This ticket has been marked as {selectedTicket.status}.
                </span>
                <span className="reopen-banner-sub">
                  If the issue still persists or requires additional review, you can reopen it directly.
                </span>
              </div>
              <button
                type="button"
                className="btn-reopen-ticket"
                onClick={handleReopenTicket}
              >
                <RotateCcw size={15} />
                <span>Reopen Ticket</span>
              </button>
            </div>
          )}

          {/* 1. Ticket Metadata Strip */}
          <div className="ticket-metadata-strip">
            <div className="metadata-col">
              <span className="metadata-label">Ticket ID</span>
              <span className="metadata-value" style={{ color: 'var(--primary)' }}>
                {selectedTicket.id}
              </span>
            </div>

            <div className="metadata-col">
              <span className="metadata-label">Category</span>
              <span className="metadata-value">{selectedTicket.category}</span>
            </div>

            <div className="metadata-col">
              <span className="metadata-label">Priority</span>
              <div>
                <span className={`badge-priority ${selectedTicket.priority.toLowerCase()}`}>
                  {selectedTicket.priority}
                </span>
              </div>
            </div>

            <div className="metadata-col">
              <span className="metadata-label">Status</span>
              <div>
                <span className={`badge-status ${selectedTicket.status.toLowerCase().replace(/\s+/g, '_')}`}>
                  <span className="badge-status-dot" />
                  <span>{selectedTicket.status}</span>
                </span>
              </div>
            </div>

            <div className="metadata-col">
              <span className="metadata-label">Created Date</span>
              <span className="metadata-value" style={{ fontSize: '0.82rem' }}>
                {selectedTicket.createdDate}
              </span>
            </div>

            <div className="metadata-col">
              <span className="metadata-label">Last Updated</span>
              <span className="metadata-value" style={{ fontSize: '0.82rem' }}>
                {selectedTicket.lastUpdatedDate}
              </span>
            </div>
          </div>

          {/* 2. Super Admin Official Remarks / Resolution */}
          {selectedTicket.superAdminRemarks && (
            <div className="superadmin-remarks-box">
              <div className="superadmin-remarks-header">
                <div className="superadmin-title-badge">
                  <ShieldCheck size={20} color="#15803d" />
                  <span>Super Admin Response / Remarks</span>
                </div>
                <span className="superadmin-verified-tag">
                  Official Response
                </span>
              </div>
              <p className="superadmin-remarks-text">
                {selectedTicket.superAdminRemarks}
              </p>
            </div>
          )}

          {/* 3. Original Issue Description & Attachments */}
          <div className="ticket-content-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0, color: 'var(--text-main)' }}>
                {selectedTicket.subject}
              </h2>
              {selectedTicket.status !== 'Closed' && selectedTicket.status !== 'Resolved' && (
                <button
                  type="button"
                  className="btn-secondary-action"
                  style={{ padding: '0.35rem 0.85rem', fontSize: '0.8rem' }}
                  onClick={handleCloseTicket}
                  title="Mark ticket as closed if resolved"
                >
                  <CheckCircle2 size={14} color="#10b981" />
                  <span>Mark as Closed</span>
                </button>
              )}
            </div>

            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Reported by <strong>{selectedTicket.contactEmail}</strong> ({selectedTicket.companyName})
            </div>

            <p className="ticket-desc-text">
              {selectedTicket.description}
            </p>

            {/* Attachments */}
            {selectedTicket.attachments && selectedTicket.attachments.length > 0 && (
              <div className="ticket-attachments-list">
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                  Attachments ({selectedTicket.attachments.length}):
                </span>
                {selectedTicket.attachments.map((att, idx) => (
                  <div key={idx} className="attachment-pill">
                    <Paperclip size={14} color="var(--primary)" />
                    <span>{att.name}</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.74rem' }}>
                      ({att.size})
                    </span>
                    <Download size={13} style={{ cursor: 'pointer', marginLeft: '2px' }} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 4. Conversation History Thread */}
          <div className="conversation-thread-card">
            <div className="conversation-thread-header">
              <MessageSquare size={18} color="var(--primary)" />
              <span>Conversation History ({selectedTicket.conversation?.length || 0} messages)</span>
            </div>

            <div className="conversation-list">
              {selectedTicket.conversation && selectedTicket.conversation.map((msg) => {
                const isSuperAdmin = msg.role.includes('Super Admin');
                return (
                  <div
                    key={msg.id}
                    className={`message-item ${isSuperAdmin ? 'superadmin' : 'admin'}`}
                  >
                    <div className={`message-avatar ${isSuperAdmin ? 'superadmin' : 'admin'}`}>
                      {isSuperAdmin ? 'SA' : (msg.sender ? msg.sender.charAt(0).toUpperCase() : 'A')}
                    </div>

                    <div className="message-body">
                      <div className="message-header-line">
                        <div className="message-sender-name">
                          <span>{msg.sender}</span>
                          <span className={`sender-role-pill ${isSuperAdmin ? 'superadmin' : 'admin'}`}>
                            {msg.role}
                          </span>
                        </div>
                        <span className="message-time">{msg.time}</span>
                      </div>

                      <p className="message-text">{msg.message}</p>

                      {msg.attachment && (
                        <div style={{ marginTop: '0.4rem' }}>
                          <span className="attachment-pill" style={{ padding: '0.25rem 0.55rem', fontSize: '0.76rem' }}>
                            <Paperclip size={12} color="var(--primary)" />
                            <span>{msg.attachment}</span>
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 5. Reply Box for Additional Information */}
          <form onSubmit={handleSendReply} className="ticket-reply-box">
            <div style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--text-main)' }}>
              Reply / Provide Additional Information
            </div>

            <textarea
              placeholder="Type your response or question to the Super Admin support team..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="reply-textarea"
            />

            {replyFile && (
              <div className="ticket-attached-file">
                <div className="ticket-attached-left">
                  <Paperclip size={14} color="var(--primary)" />
                  <span>{replyFile.name}</span>
                  <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                    ({replyFile.size})
                  </span>
                </div>
                <button
                  type="button"
                  className="btn-remove-attachment"
                  onClick={() => setReplyFile(null)}
                >
                  <X size={15} />
                </button>
              </div>
            )}

            <div className="reply-footer">
              <label className="reply-attach-btn">
                <input
                  type="file"
                  onChange={(e) => {
                    const f = e.target.files[0];
                    if (f) {
                      const sz = (f.size / 1024).toFixed(0);
                      setReplyFile({
                        name: f.name,
                        size: sz > 1024 ? `${(sz / 1024).toFixed(1)} MB` : `${sz} KB`,
                      });
                    }
                  }}
                  style={{ display: 'none' }}
                />
                <Paperclip size={14} />
                <span>Attach File</span>
              </label>

              <button
                type="submit"
                className="btn-send-reply"
                disabled={!replyText.trim() && !replyFile}
              >
                <Send size={15} />
                <span>Send Reply</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
