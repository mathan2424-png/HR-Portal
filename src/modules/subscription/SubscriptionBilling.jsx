import React, { useState, useMemo } from 'react';
import {
  Download,
  CreditCard,
  Plus,
  RefreshCw,
  Zap,
  Calendar,
  ShieldCheck,
  FileText,
  X,
  Check,
  Briefcase,
  Users,
  Cpu,
  Bell,
  Clock,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Eye,
} from 'lucide-react';
import { Badge } from '../../components/common/Badge/Badge';
import { Toast } from '../../components/common/Toast/Toast';
import './SubscriptionBilling.css';

export const SubscriptionBilling = () => {
  // STRICTLY and ONLY the user-requested specification:
  // 3 Subscription & Billing (All prices in Indian Rupee ₹)
  // Use: View the company's plan, usage, payments and invoices.
  // • Current Plan: Subscribed plan.
  // • Subscription Status: Current subscription status.
  // • Start / End Date: Subscription period.
  // • Renewal Date: Next renewal date.
  // • Auto Renewal: On/Off.
  // • Plan Usage: Used and remaining limits.
  // • Upgrade / Renew: Available subscription actions.
  // • Add-ons: Available/purchased additional credits.
  // • Payment History: Past payment records.
  // • Invoices: Invoice number, date, amount and download option.

  const [subscriptions, setSubscriptions] = useState([
    {
      id: 'SUB-101',
      currentPlan: 'Enterprise Pro (Annual)',
      tier: 'Enterprise tier • 10 Recruiter Seats',
      status: 'Active',
      startDate: '01-Nov-2025',
      endDate: '31-Oct-2026',
      renewalDate: '01-Nov-2026',
      autoRenewal: true,
      usage: {
        percentUsed: 60,
        mainLimit: '8 Jobs Left',
        jobsUsed: 12,
        jobsTotal: 20,
        jobsRemaining: 8,
        resumesUsed: 340,
        resumesTotal: 500,
        resumesRemaining: 160,
        screeningsUsed: 166,
        screeningsTotal: 250,
        screeningsRemaining: 84,
        seatsUsed: 7,
        seatsTotal: 10,
        seatsRemaining: 3,
        alertsUsed: 215,
        alertsTotal: 500,
        alertsRemaining: 285,
      },
      addons: ['+100 Resume Views', '+50 AI Screenings'],
      paymentHistory: {
        amount: '₹4,80,000',
        date: '01-Nov-2025',
        status: 'Paid',
      },
      invoice: {
        invoiceNo: 'INV-2025-001',
        date: '01-Nov-2025',
        amount: '₹4,80,000',
      },
    },
    {
      id: 'SUB-102',
      currentPlan: 'Growth Team Tier (Annual)',
      tier: 'Growth tier • 5 Recruiter Seats',
      status: 'Active',
      startDate: '15-Jan-2026',
      endDate: '14-Jan-2027',
      renewalDate: '15-Jan-2027',
      autoRenewal: true,
      usage: {
        percentUsed: 45,
        mainLimit: '8 Jobs Left',
        jobsUsed: 7,
        jobsTotal: 15,
        jobsRemaining: 8,
        resumesUsed: 140,
        resumesTotal: 300,
        resumesRemaining: 160,
        screeningsUsed: 60,
        screeningsTotal: 150,
        screeningsRemaining: 90,
        seatsUsed: 4,
        seatsTotal: 5,
        seatsRemaining: 1,
        alertsUsed: 110,
        alertsTotal: 250,
        alertsRemaining: 140,
      },
      addons: ['+50 AI Screenings'],
      paymentHistory: {
        amount: '₹2,40,000',
        date: '15-Jan-2026',
        status: 'Paid',
      },
      invoice: {
        invoiceNo: 'INV-2026-004',
        date: '15-Jan-2026',
        amount: '₹2,40,000',
      },
    },
    {
      id: 'SUB-103',
      currentPlan: 'Starter Recruiter Pack',
      tier: 'Starter tier • 2 Recruiter Seats',
      status: 'Expired',
      startDate: '01-Oct-2024',
      endDate: '30-Sep-2025',
      renewalDate: '01-Oct-2025',
      autoRenewal: false,
      usage: {
        percentUsed: 100,
        mainLimit: '0 Jobs Left',
        jobsUsed: 5,
        jobsTotal: 5,
        jobsRemaining: 0,
        resumesUsed: 100,
        resumesTotal: 100,
        resumesRemaining: 0,
        screeningsUsed: 50,
        screeningsTotal: 50,
        screeningsRemaining: 0,
        seatsUsed: 2,
        seatsTotal: 2,
        seatsRemaining: 0,
        alertsUsed: 50,
        alertsTotal: 50,
        alertsRemaining: 0,
      },
      addons: [],
      paymentHistory: {
        amount: '₹95,000',
        date: '01-Oct-2024',
        status: 'Paid',
      },
      invoice: {
        invoiceNo: 'INV-2024-089',
        date: '01-Oct-2024',
        amount: '₹95,000',
      },
    },
    {
      id: 'SUB-104',
      currentPlan: 'Custom Talent Add-on Pack',
      tier: 'Add-on Credits Booster',
      status: 'Active',
      startDate: '05-Dec-2025',
      endDate: '04-Dec-2026',
      renewalDate: '05-Dec-2026',
      autoRenewal: false,
      usage: {
        percentUsed: 30,
        mainLimit: '14 Jobs Left',
        jobsUsed: 6,
        jobsTotal: 20,
        jobsRemaining: 14,
        resumesUsed: 180,
        resumesTotal: 600,
        resumesRemaining: 420,
        screeningsUsed: 90,
        screeningsTotal: 300,
        screeningsRemaining: 210,
        seatsUsed: 5,
        seatsTotal: 10,
        seatsRemaining: 5,
        alertsUsed: 95,
        alertsTotal: 400,
        alertsRemaining: 305,
      },
      addons: ['+200 Resumes Pack', '+100 Screening Pack'],
      paymentHistory: {
        amount: '₹65,000',
        date: '05-Dec-2025',
        status: 'Paid',
      },
      invoice: {
        invoiceNo: 'INV-2025-055',
        date: '05-Dec-2025',
        amount: '₹65,000',
      },
    },
  ]);

  // Toast State: { message: string, type: 'success' | 'delete' | 'info' | 'warning' }
  const [toast, setToast] = useState(null);

  // In-Page View Management (Matching Company Details Pattern - No Popups!)
  // currentView: 'list' | 'upgrade' | 'renew' | 'view'
  const [currentView, setCurrentView] = useState('list');
  const [selectedSubscription, setSelectedSubscription] = useState(subscriptions[0]);
  const [selectedUpgradeTier, setSelectedUpgradeTier] = useState('Enterprise Elite (Annual)');

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Trigger Toast (type: 'success' (green), 'delete' (red), 'info' (blue))
  const triggerToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // View Open Handlers
  const handleOpenUpgrade = (sub) => {
    setSelectedSubscription(sub || subscriptions[0]);
    setCurrentView('upgrade');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenRenew = (sub) => {
    setSelectedSubscription(sub || subscriptions[0]);
    setCurrentView('renew');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenView = (sub) => {
    setSelectedSubscription(sub);
    setCurrentView('view');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setCurrentView('list');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle Auto-Renewal for a record
  const handleToggleAutoRenewal = (subId) => {
    setSubscriptions((prev) =>
      prev.map((sub) => {
        if (sub.id === subId) {
          const nextState = !sub.autoRenewal;
          triggerToast(
            nextState
              ? `Auto renewal enabled for ${sub.currentPlan}!`
              : `Auto renewal disabled for ${sub.currentPlan}.`,
            nextState ? 'success' : 'delete'
          );
          return { ...sub, autoRenewal: nextState };
        }
        return sub;
      })
    );
  };

  // Download Invoice PDF
  const handleDownloadInvoice = (inv) => {
    triggerToast(
      `Downloading Invoice ${inv.invoiceNo} (${inv.amount}) as PDF...`,
      'info'
    );
  };

  // Confirm Upgrade
  const handleConfirmUpgrade = (tierName) => {
    setSubscriptions((prev) =>
      prev.map((s) => (s.id === selectedSubscription?.id ? { ...s, currentPlan: tierName } : s))
    );
    handleBackToList();
    triggerToast(
      `Subscription plan upgraded to ${tierName} successfully!`,
      'success'
    );
  };

  // Confirm Renewal
  const handleConfirmRenewal = () => {
    handleBackToList();
    triggerToast(
      `Subscription renewed successfully until 31-Oct-2027!`,
      'success'
    );
  };

  // Filtered & Paginated records
  const filteredSubscriptions = useMemo(() => {
    return subscriptions.filter((sub) => {
      const matchSearch =
        !searchTerm.trim() ||
        sub.currentPlan.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.tier.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.invoice.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus = statusFilter === 'ALL' || sub.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [subscriptions, searchTerm, statusFilter]);

  const totalPages = Math.ceil(filteredSubscriptions.length / itemsPerPage) || 1;

  const paginatedSubscriptions = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredSubscriptions.slice(start, start + itemsPerPage);
  }, [filteredSubscriptions, currentPage, itemsPerPage]);

  return (
    <div className="sub-module-wrapper animate-fade-in">
      {/* Floating Animated Toast Notification (Image Reference Matched) */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          duration={3500}
          onClose={() => setToast(null)}
        />
      )}

      {/* 1. Header Title & Actions Row (Matching Company Details Pattern) */}
      <div className="sub-page-header">
        <div className="sub-header-left">
          <h1 className="sub-main-title">
            {currentView === 'list'
              ? 'Subscription & Billing'
              : currentView === 'upgrade'
              ? 'Upgrade Subscription Plan'
              : currentView === 'renew'
              ? 'Renew Subscription Plan'
              : `Subscription Details — ${selectedSubscription?.currentPlan || 'Enterprise Pro'}`}
          </h1>
        </div>

        {currentView === 'list' ? (
          <div className="sub-header-actions">
            <button
              type="button"
              className="btn-renew-action"
              onClick={() => handleOpenRenew(subscriptions[0])}
              title="Renew active subscription"
            >
              <RefreshCw size={15} />
              <span>Renew Plan</span>
            </button>
            <button
              type="button"
              className="btn-upgrade-plan"
              onClick={() => handleOpenUpgrade(subscriptions[0])}
              title="Upgrade subscription tier"
            >
              <Zap size={15} />
              <span>Upgrade Plan</span>
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="btn-back-to-list"
            onClick={handleBackToList}
            title="Back to Subscriptions List"
          >
            <ArrowLeft size={16} strokeWidth={2.5} />
            <span>Back to List</span>
          </button>
        )}
      </div>

      

      {/* 3. Main White Container Card - Subscription & Billing List Table */}
      <div className="sub-main-card">
        {/* =========================================================================
            VIEW 1: DIRECTORY TABLE LIST VIEW (When currentView === 'list')
            ========================================================================= */}
        {currentView === 'list' && (
          <>
            {/* Toolbar: Search (Left) + Filter (Right) */}
            <div className="sub-toolbar">
              <div className="sub-search-box">
                <Search size={16} className="text-muted" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="sub-search-input"
                />
              </div>

              <div className="sub-filter-group">
                <Filter size={15} className="text-muted" />
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="sub-filter-select"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="Expired">Expired</option>
                </select>
              </div>
            </div>

            {/* Table Container */}
            <div className="sub-table-responsive">
              <table className="sub-table">
                <thead>
                  <tr>
                    <th style={{ width: '50px', textAlign: 'center' }}>S.NO</th>
                    <th style={{ width: '180px' }}>CURRENT PLAN</th>
                    <th style={{ width: '110px' }}>STATUS</th>
                    <th style={{ width: '190px' }}>START / END DATE</th>
                    <th style={{ width: '130px' }}>RENEWAL DATE</th>
                    <th style={{ width: '140px', textAlign: 'center' }}>AUTO RENEWAL</th>
                    <th style={{ width: '180px' }}>PLAN USAGE</th>
                    <th style={{ width: '160px' }}>ADD-ONS</th>
                    <th style={{ width: '140px' }}>PAYMENT HISTORY</th>
                    <th style={{ width: '150px' }}>INVOICES</th>
                    <th style={{ width: '150px', textAlign: 'center' }}>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedSubscriptions.length > 0 ? (
                    paginatedSubscriptions.map((sub, index) => {
                      const sNo = (currentPage - 1) * itemsPerPage + index + 1;
                      return (
                        <tr key={sub.id}>
                          {/* S.No */}
                          <td style={{ textAlign: 'center', fontWeight: 600, color: 'var(--text-muted)' }}>
                            {sNo}
                          </td>

                          {/* 1. Current Plan */}
                          <td>
                            <div className="sub-plan-cell">
                              <span className="sub-plan-name">{sub.currentPlan}</span>
                              <span className="sub-plan-tier">{sub.tier}</span>
                            </div>
                          </td>

                          {/* 2. Subscription Status */}
                          <td>
                            <Badge status={sub.status} />
                          </td>

                          {/* 3. Start / End Date */}
                          <td>
                            <div className="sub-date-cell">
                              <span className="sub-date-range">
                                {sub.startDate} – {sub.endDate}
                              </span>
                            </div>
                          </td>

                          {/* 4. Renewal Date */}
                          <td>
                            <div className="sub-renewal-cell">
                              <span className="sub-renewal-date">{sub.renewalDate}</span>
                            </div>
                          </td>

                          {/* 5. Auto Renewal Toggle Switch */}
                          <td style={{ textAlign: 'center' }}>
                            <div className="sub-toggle-wrapper">
                              <button
                                type="button"
                                className={`sub-toggle-switch ${sub.autoRenewal ? 'active' : ''}`}
                                onClick={() => handleToggleAutoRenewal(sub.id)}
                                aria-label="Toggle Auto Renewal"
                                title={`Auto Renewal is ${sub.autoRenewal ? 'ON' : 'OFF'}. Click to toggle.`}
                              >
                                <span className="sub-toggle-thumb">
                                  {sub.autoRenewal ? (
                                    <Check size={11} strokeWidth={3} color="#2563eb" />
                                  ) : (
                                    <X size={10} strokeWidth={2.5} color="#94a3b8" />
                                  )}
                                </span>
                              </button>
                              <span className={`sub-toggle-text ${sub.autoRenewal ? 'on' : 'off'}`}>
                                {sub.autoRenewal ? 'ON' : 'OFF'}
                              </span>
                            </div>
                          </td>

                          {/* 6. Plan Usage */}
                          <td>
                            <div className="sub-usage-cell">
                              <div className="sub-usage-top">
                                <span className="sub-usage-limit-highlight">
                                  {sub.usage.mainLimit}
                                </span>
                                <span className="sub-usage-nums">
                                  {sub.usage.jobsUsed}/{sub.usage.jobsTotal} Jobs
                                </span>
                              </div>
                              <div className="sub-usage-progress-bar">
                                <div
                                  className={`sub-progress-fill ${
                                    sub.usage.percentUsed > 80
                                      ? 'danger'
                                      : sub.usage.percentUsed > 50
                                      ? 'warning'
                                      : 'normal'
                                  }`}
                                  style={{ width: `${sub.usage.percentUsed}%` }}
                                />
                              </div>
                            </div>
                          </td>

                          {/* 7. Add-ons */}
                          <td>
                            <div className="sub-addons-cell">
                              {sub.addons.length > 0 ? (
                                sub.addons.map((addon) => (
                                  <span key={addon} className="sub-addon-pill">
                                    {addon}
                                  </span>
                                ))
                              ) : (
                                <span className="sub-text-none">None</span>
                              )}
                            </div>
                          </td>

                          {/* 8. Payment History */}
                          <td>
                            <div className="sub-payment-cell">
                              <span className="sub-pay-amount">{sub.paymentHistory.amount}</span>
                              <span className="sub-pay-method">{sub.paymentHistory.method}</span>
                            </div>
                          </td>

                          {/* 9. Invoices */}
                          <td>
                            <div className="sub-invoice-meta">
                              <span className="sub-inv-number">{sub.invoice.invoiceNo}</span>
                              <span className="sub-inv-date">{sub.invoice.date}</span>
                            </div>
                          </td>

                          {/* 10. Upgrade / Renew / View / Download Actions */}
                          <td style={{ textAlign: 'center' }}>
                            <div className="sub-row-actions">
                              <button
                                type="button"
                                className="btn-action-icon invoice"
                                onClick={() => handleDownloadInvoice(sub.invoice)}
                                title={`Download Invoice ${sub.invoice.invoiceNo} (PDF)`}
                                aria-label={`Download Invoice ${sub.invoice.invoiceNo} (PDF)`}
                              >
                                <Download size={14} />
                              </button>
                              {sub.status === 'Active' ? (
                                <button
                                  type="button"
                                  className="btn-action-icon upgrade"
                                  onClick={() => handleOpenUpgrade(sub)}
                                  title="Upgrade Plan"
                                  aria-label="Upgrade Plan"
                                >
                                  <Zap size={14} />
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  className="btn-action-icon renew"
                                  onClick={() => handleOpenRenew(sub)}
                                  title="Renew Plan"
                                  aria-label="Renew Plan"
                                >
                                  <RefreshCw size={14} />
                                </button>
                              )}
                              <button
                                type="button"
                                className="btn-action-icon view"
                                onClick={() => handleOpenView(sub)}
                                title="View Plan Details & Full Usage"
                                aria-label="View Plan Details & Full Usage"
                              >
                                <Eye size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={11} className="sub-empty-cell">
                        No matching subscription records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="sub-pagination-row">
              <span className="sub-pagination-info">
                Showing{' '}
                {filteredSubscriptions.length === 0
                  ? 0
                  : (currentPage - 1) * itemsPerPage + 1}{' '}
                to{' '}
                {Math.min(currentPage * itemsPerPage, filteredSubscriptions.length)} of{' '}
                {filteredSubscriptions.length} records
              </span>

              {totalPages > 1 && (
                <div className="sub-pagination-controls">
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
              )}
            </div>
          </>
        )}

        {/* =========================================================================
            VIEW 2: IN-PAGE UPGRADE PLAN VIEW (Table is hidden, No Popups!)
            ========================================================================= */}
        {currentView === 'upgrade' && (
          <div className="inpage-sub-view animate-fade-in">
            {/* Section 1: Current Plan Summary */}
            <div className="inpage-section-box">
              <div className="inpage-section-header">1. CURRENT ACTIVE PLAN</div>
              <div className="inpage-plan-current-card">
                <div className="ipc-header">
                  <div>
                    <span className="ipc-badge">CURRENT SUBSCRIBED TIER</span>
                    <h3 className="ipc-name">{selectedSubscription?.currentPlan || 'Enterprise Pro (Annual)'}</h3>
                    <p className="ipc-sub">{selectedSubscription?.tier || 'Enterprise tier • 10 Recruiter Seats'}</p>
                  </div>
                  <div className="ipc-price-tag">
                    <span className="ipc-price">₹4,80,000</span>
                    <span className="ipc-freq">/ year</span>
                  </div>
                </div>

                <div className="inpage-grid-4col">
                  <div className="ipc-stat">
                    <span className="ipc-stat-label">Active Job Postings</span>
                    <span className="ipc-stat-val">20 Jobs</span>
                  </div>
                  <div className="ipc-stat">
                    <span className="ipc-stat-label">Resume Views</span>
                    <span className="ipc-stat-val">500 Views</span>
                  </div>
                  <div className="ipc-stat">
                    <span className="ipc-stat-label">AI Screenings</span>
                    <span className="ipc-stat-val">250 Tests</span>
                  </div>
                  <div className="ipc-stat">
                    <span className="ipc-stat-label">Recruiter Seats</span>
                    <span className="ipc-stat-val">10 Seats</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Select Higher Enterprise Tier */}
            <div className="inpage-section-box">
              <div className="inpage-section-header">2. SELECT HIGHER ENTERPRISE TIER</div>
              <p className="inpage-section-desc">
                Scale your hiring operations by selecting a higher enterprise tier. Remaining days on your current plan will be credited automatically.
              </p>

              <div className="inpage-tier-selection-grid">
                {/* Tier 1: Recommended */}
                <div
                  className={`inpage-tier-card ${
                    selectedUpgradeTier === 'Enterprise Elite (Annual)' ? 'selected' : ''
                  }`}
                  onClick={() => setSelectedUpgradeTier('Enterprise Elite (Annual)')}
                >
                  <div className="itc-top">
                    <div>
                      <span className="itc-tag recommended">RECOMMENDED TIER</span>
                      <h4 className="itc-name">Enterprise Elite (Annual)</h4>
                    </div>
                    <span className="itc-price">₹7,20,000 / year</span>
                  </div>

                  <ul className="itc-features-list">
                    <li><Check size={15} color="#00aa55" strokeWidth={2.5} /> 50 Active Job Postings (2.5x capacity)</li>
                    <li><Check size={15} color="#00aa55" strokeWidth={2.5} /> 1,500 Resume Profile Views (3x)</li>
                    <li><Check size={15} color="#00aa55" strokeWidth={2.5} /> 750 Automated AI Screenings (3x)</li>
                    <li><Check size={15} color="#00aa55" strokeWidth={2.5} /> 25 Recruiter Seats (2.5x)</li>
                    <li><Check size={15} color="#00aa55" strokeWidth={2.5} /> Priority 24/7 Dedicated Support & SLA</li>
                  </ul>

                  <div className="itc-select-radio">
                    <input
                      type="radio"
                      name="upgradeTier"
                      checked={selectedUpgradeTier === 'Enterprise Elite (Annual)'}
                      onChange={() => setSelectedUpgradeTier('Enterprise Elite (Annual)')}
                    />
                    <span>{selectedUpgradeTier === 'Enterprise Elite (Annual)' ? 'Selected Plan' : 'Select Plan'}</span>
                  </div>
                </div>

                {/* Tier 2: Ultimate */}
                <div
                  className={`inpage-tier-card ${
                    selectedUpgradeTier === 'Enterprise Global Ultimate (Annual)' ? 'selected' : ''
                  }`}
                  onClick={() => setSelectedUpgradeTier('Enterprise Global Ultimate (Annual)')}
                >
                  <div className="itc-top">
                    <div>
                      <span className="itc-tag ultimate">MAXIMUM CAPACITY</span>
                      <h4 className="itc-name">Enterprise Global Ultimate (Annual)</h4>
                    </div>
                    <span className="itc-price">₹12,00,000 / year</span>
                  </div>

                  <ul className="itc-features-list">
                    <li><Check size={15} color="#00aa55" strokeWidth={2.5} /> Unlimited Active Job Postings</li>
                    <li><Check size={15} color="#00aa55" strokeWidth={2.5} /> 5,000 Resume Profile Views (10x)</li>
                    <li><Check size={15} color="#00aa55" strokeWidth={2.5} /> 2,500 Automated AI Screenings (10x)</li>
                    <li><Check size={15} color="#00aa55" strokeWidth={2.5} /> 50 Recruiter Seats (5x)</li>
                    <li><Check size={15} color="#00aa55" strokeWidth={2.5} /> Custom API Integrations, Webhooks & Account Manager</li>
                  </ul>

                  <div className="itc-select-radio">
                    <input
                      type="radio"
                      name="upgradeTier"
                      checked={selectedUpgradeTier === 'Enterprise Global Ultimate (Annual)'}
                      onChange={() => setSelectedUpgradeTier('Enterprise Global Ultimate (Annual)')}
                    />
                    <span>{selectedUpgradeTier === 'Enterprise Global Ultimate (Annual)' ? 'Selected Plan' : 'Select Plan'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Billing & Payment Confirmation */}
            <div className="inpage-section-box">
              <div className="inpage-section-header">3. BILLING ADJUSTMENT & SUMMARY</div>
              <div className="inpage-grid-3col">
                <div className="form-field-group">
                  <label>Payment Method</label>
                  <input
                    type="text"
                    readOnly
                    className="form-control-input"
                  />
                </div>
                <div className="form-field-group">
                  <label>Prorated Credit Applied</label>
                  <input
                    type="text"
                    value="₹1,20,000 (Calculated for 180 unused days)"
                    readOnly
                    className="form-control-input"
                  />
                </div>
                <div className="form-field-group">
                  <label>Next Billing Renewal Date</label>
                  <input
                    type="text"
                    value="01-Nov-2026"
                    readOnly
                    className="form-control-input"
                  />
                </div>
              </div>
            </div>

            {/* Bottom In-Page Form Actions */}
            <div className="inpage-form-actions">
              <button
                type="button"
                className="btn-cancel-action"
                onClick={handleBackToList}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn-save-header-action"
                onClick={() => handleConfirmUpgrade(selectedUpgradeTier)}
              >
                <Zap size={16} />
                <span>Confirm & Upgrade to {selectedUpgradeTier.split(' ')[0]} {selectedUpgradeTier.split(' ')[1]}</span>
              </button>
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 3: IN-PAGE RENEW PLAN VIEW (Table is hidden, No Popups!)
            ========================================================================= */}
        {currentView === 'renew' && (
          <div className="inpage-sub-view animate-fade-in">
            {/* Section 1: Renewal Breakdown */}
            <div className="inpage-section-box">
              <div className="inpage-section-header">1. SUBSCRIPTION RENEWAL BREAKDOWN</div>
              <p className="inpage-section-desc">
                Review your renewal term, scheduled billing cycle, and billing details before confirming extension.
              </p>

              <div className="inpage-grid-3col">
                <div className="form-field-group">
                  <label>Subscribed Plan</label>
                  <input
                    type="text"
                    value={selectedSubscription?.currentPlan || 'Enterprise Pro (Annual)'}
                    readOnly
                    className="form-control-input"
                  />
                </div>
                <div className="form-field-group">
                  <label>Current Active Period</label>
                  <input
                    type="text"
                    value={`${selectedSubscription?.startDate || '01-Nov-2025'} to ${selectedSubscription?.endDate || '31-Oct-2026'}`}
                    readOnly
                    className="form-control-input"
                  />
                </div>
                <div className="form-field-group">
                  <label>New Renewal Period</label>
                  <input
                    type="text"
                    value="01-Nov-2026 to 31-Oct-2027 (365 days)"
                    readOnly
                    className="form-control-input"
                    style={{ fontWeight: 700, color: 'var(--primary)' }}
                  />
                </div>

                <div className="form-field-group">
                  <label>Annual Renewal Fee</label>
                  <input
                    type="text"
                    value="₹4,80,000 / year (Inclusive of taxes)"
                    readOnly
                    className="form-control-input"
                    style={{ fontWeight: 700, color: '#00703c' }}
                  />
                </div>
                <div className="form-field-group">
                  <label>Recruiter Seats Included</label>
                  <input
                    type="text"
                    value="10 Recruiter Admin Seats"
                    readOnly
                    className="form-control-input"
                  />
                </div>
                <div className="form-field-group">
                  <label>Automatic Renewal Policy</label>
                  <input
                    type="text"
                    value="Enabled (Next billing 01-Nov-2027)"
                    readOnly
                    className="form-control-input"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Payment Method */}
            <div className="inpage-section-box">
              <div className="inpage-section-header">2. CORPORATE PAYMENT & BILLING ADDRESS</div>
              <div className="inpage-grid-2col">
                <div className="form-field-group">
                  <label>Payment Method</label>
                  <input
                    type="text"
                    readOnly
                    className="form-control-input"
                  />
                </div>
                <div className="form-field-group">
                  <label>GST / Tax Identification</label>
                  <input
                    type="text"
                    value="33AABCM1206D1ZM (Verified & Active)"
                    readOnly
                    className="form-control-input"
                  />
                </div>
                <div className="form-field-group" style={{ gridColumn: 'span 2' }}>
                  <label>Billing Organization & Address</label>
                  <input
                    type="text"
                    value="Marutham Technologies Pvt. Ltd., Ascendas IT Park, 4th Floor, CSIR Road, Taramani, Chennai - 600113"
                    readOnly
                    className="form-control-input"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="inpage-form-actions">
              <button
                type="button"
                className="btn-cancel-action"
                onClick={handleBackToList}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn-save-header-action"
                onClick={handleConfirmRenewal}
              >
                <Check size={16} />
                <span>Confirm & Renew Subscription</span>
              </button>
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 4: IN-PAGE VIEW DETAILS (Table is hidden, No Popups!)
            ========================================================================= */}
        {currentView === 'view' && selectedSubscription && (
          <div className="inpage-sub-view animate-fade-in">
            {/* Section 1: Overview */}
            <div className="inpage-section-box">
              <div className="inpage-section-header">1. CURRENT PLAN & SUBSCRIPTION DETAILS</div>
              <div className="inpage-grid-3col">
                <div className="form-field-group">
                  <label>Plan Name</label>
                  <div className="inpage-view-text bold">{selectedSubscription.currentPlan}</div>
                </div>
                <div className="form-field-group">
                  <label>Subscription Tier</label>
                  <div className="inpage-view-text">{selectedSubscription.tier}</div>
                </div>
                <div className="form-field-group">
                  <label>Subscription Status</label>
                  <div><Badge status={selectedSubscription.status} /></div>
                </div>

                <div className="form-field-group">
                  <label>Subscription Period</label>
                  <div className="inpage-view-text">{selectedSubscription.startDate} – {selectedSubscription.endDate}</div>
                </div>
                <div className="form-field-group">
                  <label>Next Renewal Date</label>
                  <div className="inpage-view-text bold" style={{ color: 'var(--primary)' }}>
                    {selectedSubscription.renewalDate}
                  </div>
                </div>
                <div className="form-field-group">
                  <label>Auto-Renewal Setting</label>
                  <div className="inpage-view-text">
                    {selectedSubscription.autoRenewal ? (
                      <span className="badge-active-addon" style={{ background: '#ecfdf5', color: '#047857', border: '1px solid #a7f3d0' }}>
                        ● Enabled (Active)
                      </span>
                    ) : (
                      <span className="badge-active-addon" style={{ background: '#fef2f2', color: '#b91c1c', border: '1px solid #fecaca' }}>
                        ○ Disabled
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Quota & Usage Limits */}
            <div className="inpage-section-box">
              <div className="inpage-section-header">2. PLAN RESOURCE USAGE & REMAINING LIMITS</div>
              <div className="inpage-usage-grid">
                {/* Active Jobs */}
                <div className="inpage-usage-card">
                  <div className="iuc-top">
                    <Briefcase size={16} color="var(--primary)" />
                    <span className="iuc-title">Active Job Postings</span>
                    <strong className="iuc-left">{selectedSubscription.usage.jobsRemaining} Left</strong>
                  </div>
                  <div className="iuc-numbers">
                    {selectedSubscription.usage.jobsUsed} / {selectedSubscription.usage.jobsTotal} Jobs
                  </div>
                  <div className="sub-usage-progress-bar">
                    <div
                      className="sub-progress-fill"
                      style={{ width: `${(selectedSubscription.usage.jobsUsed / selectedSubscription.usage.jobsTotal) * 100}%` }}
                    />
                  </div>
                  <div className="iuc-footer">
                    <span>{Math.round((selectedSubscription.usage.jobsUsed / selectedSubscription.usage.jobsTotal) * 100)}% Used</span>
                    <span>{selectedSubscription.usage.jobsRemaining} Jobs Remaining</span>
                  </div>
                </div>

                {/* Resumes */}
                <div className="inpage-usage-card">
                  <div className="iuc-top">
                    <FileText size={16} color="var(--primary)" />
                    <span className="iuc-title">Resume Profile Views</span>
                    <strong className="iuc-left">{selectedSubscription.usage.resumesRemaining} Left</strong>
                  </div>
                  <div className="iuc-numbers">
                    {selectedSubscription.usage.resumesUsed} / {selectedSubscription.usage.resumesTotal} Profiles
                  </div>
                  <div className="sub-usage-progress-bar">
                    <div
                      className="sub-progress-fill"
                      style={{ width: `${(selectedSubscription.usage.resumesUsed / selectedSubscription.usage.resumesTotal) * 100}%` }}
                    />
                  </div>
                  <div className="iuc-footer">
                    <span>{Math.round((selectedSubscription.usage.resumesUsed / selectedSubscription.usage.resumesTotal) * 100)}% Used</span>
                    <span>{selectedSubscription.usage.resumesRemaining} Profiles Remaining</span>
                  </div>
                </div>

                {/* AI Screenings */}
                <div className="inpage-usage-card">
                  <div className="iuc-top">
                    <Cpu size={16} color="var(--primary)" />
                    <span className="iuc-title">Automated AI Screenings</span>
                    <strong className="iuc-left">{selectedSubscription.usage.screeningsRemaining} Left</strong>
                  </div>
                  <div className="iuc-numbers">
                    {selectedSubscription.usage.screeningsUsed} / {selectedSubscription.usage.screeningsTotal} Assessments
                  </div>
                  <div className="sub-usage-progress-bar">
                    <div
                      className="sub-progress-fill"
                      style={{ width: `${(selectedSubscription.usage.screeningsUsed / selectedSubscription.usage.screeningsTotal) * 100}%` }}
                    />
                  </div>
                  <div className="iuc-footer">
                    <span>{Math.round((selectedSubscription.usage.screeningsUsed / selectedSubscription.usage.screeningsTotal) * 100)}% Used</span>
                    <span>{selectedSubscription.usage.screeningsRemaining} Assessments Remaining</span>
                  </div>
                </div>

                {/* Seats */}
                <div className="inpage-usage-card">
                  <div className="iuc-top">
                    <Users size={16} color="var(--primary)" />
                    <span className="iuc-title">HR Recruiter Seats</span>
                    <strong className="iuc-left">{selectedSubscription.usage.seatsRemaining} Left</strong>
                  </div>
                  <div className="iuc-numbers">
                    {selectedSubscription.usage.seatsUsed} / {selectedSubscription.usage.seatsTotal} Seats
                  </div>
                  <div className="sub-usage-progress-bar">
                    <div
                      className="sub-progress-fill"
                      style={{ width: `${(selectedSubscription.usage.seatsUsed / selectedSubscription.usage.seatsTotal) * 100}%` }}
                    />
                  </div>
                  <div className="iuc-footer">
                    <span>{Math.round((selectedSubscription.usage.seatsUsed / selectedSubscription.usage.seatsTotal) * 100)}% Used</span>
                    <span>{selectedSubscription.usage.seatsRemaining} Seats Remaining</span>
                  </div>
                </div>

                {/* Alerts */}
                <div className="inpage-usage-card">
                  <div className="iuc-top">
                    <Bell size={16} color="var(--primary)" />
                    <span className="iuc-title">Candidate Alerts</span>
                    <strong className="iuc-left">{selectedSubscription.usage.alertsRemaining} Left</strong>
                  </div>
                  <div className="iuc-numbers">
                    {selectedSubscription.usage.alertsUsed} / {selectedSubscription.usage.alertsTotal} Alerts
                  </div>
                  <div className="sub-usage-progress-bar">
                    <div
                      className="sub-progress-fill"
                      style={{ width: `${(selectedSubscription.usage.alertsUsed / selectedSubscription.usage.alertsTotal) * 100}%` }}
                    />
                  </div>
                  <div className="iuc-footer">
                    <span>{Math.round((selectedSubscription.usage.alertsUsed / selectedSubscription.usage.alertsTotal) * 100)}% Used</span>
                    <span>{selectedSubscription.usage.alertsRemaining} Alerts Remaining</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Add-ons */}
            <div className="inpage-section-box">
              <div className="inpage-section-header">3. ADD-ONS & ADDITIONAL PURCHASED CREDITS</div>
              <div className="inpage-addons-list">
                {selectedSubscription.addons.length > 0 ? (
                  selectedSubscription.addons.map((a) => (
                    <div key={a} className="inpage-addon-chip">
                      <Sparkles size={14} color="var(--primary)" />
                      <span>{a}</span>
                      <span className="badge-active-addon">Active Pack</span>
                    </div>
                  ))
                ) : (
                  <p className="text-muted" style={{ margin: 0, fontSize: '0.88rem' }}>
                    No add-on packs attached to this subscription cycle.
                  </p>
                )}
              </div>
            </div>

            {/* Section 4: Payment History & Invoice */}
            <div className="inpage-section-box">
              <div className="inpage-section-header">4. PAYMENT HISTORY & INVOICE RECORD</div>
              <div className="inpage-grid-3col">
                <div className="form-field-group">
                  <label>Billed Amount</label>
                  <div className="inpage-view-text bold" style={{ color: 'var(--primary)', fontSize: '1.05rem' }}>
                    {selectedSubscription.paymentHistory.amount}
                  </div>
                </div>
                <div className="form-field-group">
                  <label>Payment Method</label>
                  <div className="inpage-view-text">{selectedSubscription.paymentHistory.method}</div>
                </div>
                <div className="form-field-group">
                  <label>Payment Status</label>
                  <div><Badge status={selectedSubscription.paymentHistory.status} /></div>
                </div>

                <div className="form-field-group">
                  <label>Invoice Number</label>
                  <div className="inpage-view-text bold">{selectedSubscription.invoice.invoiceNo}</div>
                </div>
                <div className="form-field-group">
                  <label>Invoice Date</label>
                  <div className="inpage-view-text">{selectedSubscription.invoice.date}</div>
                </div>
                <div className="form-field-group">
                  <label>Export PDF Document</label>
                  <button
                    type="button"
                    className="btn-download-pdf-inpage"
                    onClick={() => handleDownloadInvoice(selectedSubscription.invoice)}
                  >
                    <Download size={14} />
                    <span>Download Invoice PDF</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="inpage-form-actions">
              <button
                type="button"
                className="btn-back-to-list"
                onClick={handleBackToList}
              >
                <ArrowLeft size={16} />
                <span>Back to Subscriptions</span>
              </button>

              <div style={{ display: 'flex', gap: '0.65rem' }}>
                <button
                  type="button"
                  className="btn-renew-action"
                  onClick={() => handleOpenRenew(selectedSubscription)}
                >
                  <RefreshCw size={15} />
                  <span>Renew Subscription</span>
                </button>
                <button
                  type="button"
                  className="btn-upgrade-plan"
                  onClick={() => handleOpenUpgrade(selectedSubscription)}
                >
                  <Zap size={15} />
                  <span>Upgrade Tier</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
