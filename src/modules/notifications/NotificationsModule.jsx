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
  MailCheck,
  MailOpen,
} from 'lucide-react';
import './NotificationsModule.css';

export const NotificationsModule = () => {
  // STRICTLY and ONLY the 7 user-requested fields:
  // 1. Notification ID: Unique notification.
  // 2. Notification Type: Candidate response, interview, screening, subscription, payment, etc.
  // 3. Title: Notification title.
  // 4. Message: Notification message.
  // 5. Date / Time: Notification time.
  // 6. Read Status: Read/Unread.
  // 7. Recipient: Company user receiving it.

  const [notifications, setNotifications] = useState([
    {
      id: 'NTF-2026-001',
      notificationType: 'Interview',
      title: 'Interview Accepted by Candidate',
      message: 'Priya Sharma (CAN-1042) accepted Technical Round interview invitation for 14-Oct-2026 at 10:30 AM IST.',
      dateTime: '12-Oct-2026 05:15 PM',
      readStatus: 'Unread',
      recipient: 'Sundar Raman (Eng Lead)',
    },
    {
      id: 'NTF-2026-002',
      notificationType: 'Candidate response',
      title: 'Candidate Response Received',
      message: 'Anand Kumar responded "Interested" to Lead Product Designer (JOB-2026-002) job alert broadcast.',
      dateTime: '12-Oct-2026 04:30 PM',
      readStatus: 'Unread',
      recipient: 'Abinaya R (Senior HR Manager)',
    },
    {
      id: 'NTF-2026-003',
      notificationType: 'Screening',
      title: 'Screening Assessment Completed',
      message: 'Karthik V completed Cloud Infrastructure & Kubernetes screening assessment with a score of 84% (Qualified).',
      dateTime: '12-Oct-2026 02:45 PM',
      readStatus: 'Read',
      recipient: 'Sundar Raman (Eng Lead)',
    },
    {
      id: 'NTF-2026-004',
      notificationType: 'Subscription',
      title: 'Monthly Plan Credits Refilled',
      message: 'Your Enterprise Recruitment Plan was replenished with 5,000 candidate match credits and 3,000 alert broadcasts.',
      dateTime: '11-Oct-2026 11:00 AM',
      readStatus: 'Read',
      recipient: 'Company Administrator (Rajeshwaran K)',
    },
    {
      id: 'NTF-2026-005',
      notificationType: 'Payment',
      title: 'Subscription Invoice Generated & Paid',
      message: 'Invoice #INV-2026-104 for ₹49,999 + GST processed successfully via Corporate Auto-Debit.',
      dateTime: '10-Oct-2026 09:15 AM',
      readStatus: 'Read',
      recipient: 'Finance Admin (Deepak Verma)',
    },
    {
      id: 'NTF-2026-006',
      notificationType: 'Interview',
      title: 'Reschedule Requested by Candidate',
      message: 'Karthik V requested reschedule for DevOps Technical round due to conflicting official travel commitments.',
      dateTime: '09-Oct-2026 03:20 PM',
      readStatus: 'Read',
      recipient: 'Abinaya R (Senior HR Manager)',
    },
    {
      id: 'NTF-2026-007',
      notificationType: 'Candidate response',
      title: 'Offer Letter Signed & Accepted',
      message: 'Deepa Rajan (CAN-1046) signed offer letter for Talent Acquisition Lead. Scheduled joining on 05-Nov-2026.',
      dateTime: '08-Oct-2026 06:10 PM',
      readStatus: 'Read',
      recipient: 'Company Administrator (Rajeshwaran K)',
    },
  ]);

  // Views: 'list' | 'form'
  const [currentView, setCurrentView] = useState('list');
  const [editingId, setEditingId] = useState(null);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [readStatusFilter, setReadStatusFilter] = useState('All');
  const [toastMessage, setToastMessage] = useState('');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Form State (strictly the 7 requested fields)
  const initialFormState = {
    id: '',
    notificationType: 'Candidate response',
    title: '',
    message: '',
    dateTime: '',
    readStatus: 'Unread',
    recipient: '',
  };

  const [formData, setFormData] = useState(initialFormState);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3500);
  };

  const handleOpenAdd = () => {
    const nextNum = notifications.length + 1;
    const generatedId = `NTF-2026-${String(nextNum).padStart(3, '0')}`;
    setFormData({
      ...initialFormState,
      id: generatedId,
      dateTime: '12-Oct-2026 05:40 PM',
      recipient: 'Abinaya R (Senior HR Manager)',
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

  const handleSaveNotification = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Please enter Notification Title.');
      return;
    }
    if (!formData.message.trim()) {
      alert('Please enter Notification Message.');
      return;
    }
    if (!formData.recipient.trim()) {
      alert('Please specify Recipient user.');
      return;
    }

    if (editingId) {
      setNotifications((prev) =>
        prev.map((item) => (item.id === editingId ? { ...formData } : item))
      );
      showToast(`Notification "${formData.id}" updated successfully!`);
    } else {
      setNotifications((prev) => [formData, ...prev]);
      showToast(`Notification "${formData.id}" dispatched successfully!`);
    }

    setCurrentView('list');
    setEditingId(null);
  };

  const toggleReadStatus = (id) => {
    setNotifications((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newStatus = item.readStatus === 'Unread' ? 'Read' : 'Unread';
          return { ...item, readStatus: newStatus };
        }
        return item;
      })
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((item) => ({ ...item, readStatus: 'Read' }))
    );
    showToast('All notifications marked as read.');
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to delete notification "${title}" (${id})?`)) {
      setNotifications((prev) => prev.filter((item) => item.id !== id));
      showToast(`Notification "${id}" removed.`);
    }
  };

  // Filter & Search Logic
  const filteredNotifications = notifications.filter((item) => {
    const matchesSearch =
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.notificationType.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType =
      typeFilter === 'All' || item.notificationType === typeFilter;

    const matchesReadStatus =
      readStatusFilter === 'All' || item.readStatus === readStatusFilter;

    return matchesSearch && matchesType && matchesReadStatus;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage) || 1;
  const paginatedNotifications = filteredNotifications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const unreadCount = notifications.filter((n) => n.readStatus === 'Unread').length;

  const getTypeClass = (type) => {
    switch (type) {
      case 'Candidate response':
        return 'candidate-response';
      case 'Interview':
        return 'interview';
      case 'Screening':
        return 'screening';
      case 'Subscription':
        return 'subscription';
      case 'Payment':
        return 'payment';
      default:
        return '';
    }
  };

  return (
    <div className="notifications-page-container">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="notifications-toast-alert">
          <CheckCircle2 size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Page Header */}
      <div className="notifications-page-header">
        {currentView === 'list' ? (
          <>
            <div className="notifications-header-left">
              <h1 className="notifications-page-title">Notifications</h1>
              
            </div>
            <div className="notifications-header-actions">
              {unreadCount > 0 && (
                <button
                  type="button"
                  className="btn-mark-all-read"
                  onClick={markAllAsRead}
                >
                  <MailOpen size={15} />
                  <span>Mark All as Read</span>
                </button>
              )}
              <button
                className="btn-add-notification"
                onClick={handleOpenAdd}
                id="btn-create-notification"
              >
                <Plus size={16} />
                <span>Create Notification</span>
              </button>
            </div>
          </>
        ) : (
          <div className="notifications-inpage-header-left">
            <button
              type="button"
              className="btn-back-notifications"
              onClick={handleCancelForm}
            >
              <ArrowLeft size={16} />
              <span>Back to Notifications</span>
            </button>
            <h1 className="notifications-page-title">
              {editingId ? `Edit Notification: ${formData.id}` : 'Create Notification Dispatch'}
            </h1>
          </div>
        )}
      </div>

      {/* Main Single Card Container */}
      <div className="notifications-main-card">
        {currentView === 'list' ? (
          <>
            {/* Toolbar & Filters */}
            <div className="notifications-toolbar">
              <div className="notifications-toolbar-left">
                <div className="notifications-search-box">
                  <Search size={16} className="text-muted" />
                  <input
                    type="text"
                    placeholder="Search title, message, recipient, ID..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="notifications-search-input"
                  />
                </div>

                <select
                  value={typeFilter}
                  onChange={(e) => {
                    setTypeFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="notifications-filter-select"
                >
                  <option value="All">All Types</option>
                  <option value="Candidate response">Candidate response</option>
                  <option value="Interview">Interview</option>
                  <option value="Screening">Screening</option>
                  <option value="Subscription">Subscription</option>
                  <option value="Payment">Payment</option>
                </select>

                <select
                  value={readStatusFilter}
                  onChange={(e) => {
                    setReadStatusFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="notifications-filter-select"
                >
                  <option value="All">All Statuses</option>
                  <option value="Unread">Unread</option>
                  <option value="Read">Read</option>
                </select>
              </div>

              {/* Quick Stat Chips */}
              <div className="notifications-toolbar-stats">
                <span className="notifications-stat-chip">
                  Total: {notifications.length}
                </span>
                <span className="notifications-stat-chip unread">
                  Unread: {unreadCount}
                </span>
                <span className="notifications-stat-chip candidate">
                  Candidate: {notifications.filter((n) => n.notificationType === 'Candidate response').length}
                </span>
                <span className="notifications-stat-chip payment">
                  Billing: {notifications.filter((n) => n.notificationType === 'Subscription' || n.notificationType === 'Payment').length}
                </span>
              </div>
            </div>

            {/* Modern Data Table */}
            <div className="notifications-table-wrapper">
              <table className="notifications-table">
                <thead>
                  <tr>
                    <th>S.NO</th>
                    <th>NOTIFICATION ID</th>
                    <th>NOTIFICATION TYPE</th>
                    <th>TITLE</th>
                    <th>MESSAGE</th>
                    <th>DATE / TIME</th>
                    <th>READ STATUS</th>
                    <th>RECIPIENT</th>
                    <th style={{ textAlign: 'center' }}>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedNotifications.length > 0 ? (
                    paginatedNotifications.map((item, index) => {
                      const serialNumber = (currentPage - 1) * itemsPerPage + index + 1;
                      const isUnread = item.readStatus === 'Unread';
                      return (
                        <tr key={item.id} className={isUnread ? 'is-unread' : ''}>
                          {/* S.NO */}
                          <td style={{ fontWeight: 700, color: '#64748b' }}>
                            {serialNumber}
                          </td>

                          {/* Notification ID */}
                          <td>
                            <span className="ntf-id-badge">{item.id}</span>
                          </td>

                          {/* Notification Type */}
                          <td>
                            <span className={`ntf-type-pill ${getTypeClass(item.notificationType)}`}>
                              {item.notificationType}
                            </span>
                          </td>

                          {/* Title */}
                          <td>
                            <div className="ntf-title-cell">
                              {isUnread && <span className="ntf-unread-dot" title="Unread notification"></span>}
                              <span className="ntf-title-text">{item.title}</span>
                            </div>
                          </td>

                          {/* Message */}
                          <td>
                            <div className="ntf-msg-cell" title={item.message}>
                              {item.message}
                            </div>
                          </td>

                          {/* Date / Time */}
                          <td style={{ fontWeight: 600, color: '#475569', fontSize: '0.82rem' }}>
                            {item.dateTime}
                          </td>

                          {/* Read Status */}
                          <td>
                            <span className={`ntf-read-pill ${isUnread ? 'unread' : 'read'}`}>
                              {item.readStatus}
                            </span>
                          </td>

                          {/* Recipient */}
                          <td>
                            <span className="ntf-recipient-name">{item.recipient}</span>
                          </td>

                          {/* Actions */}
                          <td style={{ textAlign: 'center' }}>
                            <div className="ntf-row-actions">
                              <button
                                type="button"
                                className="action-icon-btn"
                                title={isUnread ? 'Mark as Read' : 'Mark as Unread'}
                                onClick={() => toggleReadStatus(item.id)}
                              >
                                {isUnread ? <MailCheck size={15} /> : <MailOpen size={15} />}
                              </button>
                              <button
                                type="button"
                                className="action-icon-btn edit"
                                title="Edit Notification"
                                onClick={() => handleOpenEdit(item)}
                              >
                                <Edit2 size={15} />
                              </button>
                              <button
                                type="button"
                                className="action-icon-btn delete"
                                title="Delete Notification"
                                onClick={() => handleDelete(item.id, item.title)}
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
                        <div className="notifications-empty-state">
                          <p>No notifications found matching your search or filters.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Table Footer Pagination */}
            <div className="notifications-table-footer">
              <div>
                Showing {filteredNotifications.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{' '}
                {Math.min(currentPage * itemsPerPage, filteredNotifications.length)} of{' '}
                {filteredNotifications.length} notifications
              </div>

              <div className="notifications-pagination-controls">
                <button
                  type="button"
                  className="btn-notifications-page"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                >
                  <ChevronLeft size={16} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    type="button"
                    className={`btn-notifications-page ${currentPage === page ? 'active' : ''}`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))}

                <button
                  type="button"
                  className="btn-notifications-page"
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
          <form onSubmit={handleSaveNotification} className="inpage-notification-form">
            {/* Section 1: Notification Details & Recipient */}
            <div className="inpage-section-box">
              <div className="inpage-section-header">
                1. NOTIFICATION DETAILS & RECIPIENT
              </div>
              <div className="inpage-grid-2col">
                {/* 1. Notification ID */}
                <div className="form-field-group">
                  <label>Notification ID *</label>
                  <input
                    type="text"
                    className="form-control-input readonly"
                    value={formData.id}
                    readOnly
                  />
                </div>

                {/* 2. Notification Type */}
                <div className="form-field-group">
                  <label>Notification Type *</label>
                  <select
                    className="form-control-select"
                    value={formData.notificationType}
                    onChange={(e) => handleInputChange('notificationType', e.target.value)}
                  >
                    <option value="Candidate response">Candidate response</option>
                    <option value="Interview">Interview</option>
                    <option value="Screening">Screening</option>
                    <option value="Subscription">Subscription</option>
                    <option value="Payment">Payment</option>
                  </select>
                </div>

                {/* 7. Recipient */}
                <div className="form-field-group">
                  <label>Recipient (Company User) *</label>
                  <input
                    type="text"
                    className="form-control-input"
                    placeholder="e.g. Abinaya R (Senior HR Manager) or All Admins"
                    value={formData.recipient}
                    onChange={(e) => handleInputChange('recipient', e.target.value)}
                    required
                  />
                </div>

                {/* 6. Read Status */}
                <div className="form-field-group">
                  <label>Read Status *</label>
                  <select
                    className="form-control-select"
                    value={formData.readStatus}
                    onChange={(e) => handleInputChange('readStatus', e.target.value)}
                  >
                    <option value="Unread">Unread</option>
                    <option value="Read">Read</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 2: Content & Dispatch Schedule */}
            <div className="inpage-section-box">
              <div className="inpage-section-header">
                2. CONTENT & DISPATCH SCHEDULE
              </div>
              <div className="inpage-grid-2col">
                {/* 3. Title */}
                <div className="form-field-group">
                  <label>Notification Title *</label>
                  <input
                    type="text"
                    className="form-control-input"
                    placeholder="e.g. Candidate Interview Accepted"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    required
                  />
                </div>

                {/* 5. Date / Time */}
                <div className="form-field-group">
                  <label>Date / Time *</label>
                  <input
                    type="text"
                    className="form-control-input"
                    placeholder="e.g. 12-Oct-2026 05:40 PM"
                    value={formData.dateTime}
                    onChange={(e) => handleInputChange('dateTime', e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* 4. Message */}
              <div className="form-field-group" style={{ marginTop: '0.25rem' }}>
                <label>Notification Message *</label>
                <textarea
                  className="form-control-textarea"
                  rows="3"
                  placeholder="Enter full notification message content..."
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Bottom Form Actions */}
            <div className="inpage-form-footer">
              <button
                type="button"
                className="btn-cancel-notification"
                onClick={handleCancelForm}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-save-notification"
                id="btn-save-notification"
              >
                <Save size={16} />
                <span>Save Notification</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
