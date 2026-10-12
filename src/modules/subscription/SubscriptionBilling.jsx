import React, { useState } from 'react';
import {
  Download,
  CreditCard,
  Plus,
  RefreshCw,
  Zap,
  CheckCircle2,
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
} from 'lucide-react';
import { Badge } from '../../components/common/Badge/Badge';
import './SubscriptionBilling.css';

export const SubscriptionBilling = () => {
  // 1. Current Plan & Subscription Details
  const [currentPlan, setCurrentPlan] = useState('Enterprise Pro (Annual)');
  const [subscriptionStatus, setSubscriptionStatus] = useState('Active');
  const startDate = '01-Nov-2025';
  const endDate = '31-Oct-2026';
  const renewalDate = '01-Nov-2026';
  const [autoRenewal, setAutoRenewal] = useState(true);

  // Alert/Toast feedback state
  const [toastMessage, setToastMessage] = useState('');

  // Modals for Upgrade & Renew actions
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [isRenewModalOpen, setIsRenewModalOpen] = useState(false);

  // 2. Plan Usage Limits (Used and Remaining)
  const [planUsageLimits, setPlanUsageLimits] = useState([
    {
      title: 'Active Job Postings',
      used: 12,
      total: 20,
      remaining: 8,
      unit: 'Jobs',
      icon: Briefcase,
    },
    {
      title: 'Resume Profile Views',
      used: 340,
      total: 500,
      remaining: 160,
      unit: 'Profiles',
      icon: FileText,
    },
    {
      title: 'Automated Screenings',
      used: 166,
      total: 250,
      remaining: 84,
      unit: 'Assessments',
      icon: Cpu,
    },
    {
      title: 'HR Recruiter Seats',
      used: 7,
      total: 10,
      remaining: 3,
      unit: 'Seats',
      icon: Users,
    },
    {
      title: 'Candidate Alerts',
      used: 215,
      total: 500,
      remaining: 285,
      unit: 'Alerts',
      icon: Bell,
    },
  ]);

  // 3. Add-ons: Available & Purchased Credits
  const [addons, setAddons] = useState([
    {
      id: 'ADD-01',
      name: '+100 Resume Views Pack',
      price: '$99 / pack',
      description: 'Unlock 100 extra candidate full resumes without upgrading plan tier.',
      status: 'Purchased (Active)',
      active: true,
    },
    {
      id: 'ADD-02',
      name: '+50 Automated AI Screenings',
      price: '$149 / pack',
      description: 'Run 50 additional automated test scorecards and video assessments.',
      status: 'Available',
      active: false,
    },
    {
      id: 'ADD-03',
      name: '+1 Extra HR Recruiter Seat',
      price: '$49 / month',
      description: 'Grant recruiter role and dashboard access to an additional team member.',
      status: 'Available',
      active: false,
    },
    {
      id: 'ADD-04',
      name: '+250 Candidate Alerts Pack',
      price: '$79 / pack',
      description: 'Send 250 extra automated SMS & WhatsApp notification alerts to matched candidates.',
      status: 'Available',
      active: false,
    },
  ]);

  // 4. Payment History & Invoices
  const [invoices, setInvoices] = useState([
    {
      invoiceNo: 'INV-2025-001',
      date: '01-Nov-2025',
      description: 'Enterprise Pro Annual Subscription (10 Seats)',
      method: 'MasterCard •••• 4242',
      amount: '$4,800.00',
      status: 'Paid',
    },
    {
      invoiceNo: 'INV-2026-002',
      date: '15-Jan-2026',
      description: 'Add-on: +100 Resume Views Pack',
      method: 'MasterCard •••• 4242',
      amount: '$99.00',
      status: 'Paid',
    },
    {
      invoiceNo: 'INV-2026-003',
      date: '12-Jul-2026',
      description: 'Add-on: +50 AI Screenings Pack',
      method: 'MasterCard •••• 4242',
      amount: '$149.00',
      status: 'Paid',
    },
    {
      invoiceNo: 'INV-2026-004',
      date: '05-Sep-2026',
      description: 'Add-on: +250 Candidate Alerts Pack',
      method: 'MasterCard •••• 4242',
      amount: '$79.00',
      status: 'Paid',
    },
  ]);

  // Show Toast
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 4000);
  };

  // Toggle Auto-Renewal
  const handleToggleAutoRenewal = () => {
    const nextState = !autoRenewal;
    setAutoRenewal(nextState);
    triggerToast(
      nextState
        ? 'Automatic plan renewal has been enabled for ' + renewalDate + '.'
        : 'Automatic plan renewal has been disabled.'
    );
  };

  // Download Invoice PDF
  const handleDownloadInvoice = (inv) => {
    triggerToast(`Downloading Invoice ${inv.invoiceNo} (${inv.amount}) as PDF...`);
  };

  // Purchase Add-on
  const handlePurchaseAddon = (addon) => {
    setAddons((prev) =>
      prev.map((a) =>
        a.id === addon.id ? { ...a, status: 'Purchased (Active)', active: true } : a
      )
    );
    triggerToast(`Add-on "${addon.name}" activated successfully! Credits added.`);
  };

  // Confirm Upgrade
  const handleConfirmUpgrade = (tierName, price) => {
    setCurrentPlan(tierName);
    setIsUpgradeModalOpen(false);
    triggerToast(`Plan successfully upgraded to ${tierName}! New limits are now active.`);
  };

  // Confirm Renewal
  const handleConfirmRenewal = () => {
    setIsRenewModalOpen(false);
    triggerToast(`Subscription renewed successfully until 31-Oct-2027.`);
  };

  return (
    <div className="sub-module-wrapper animate-fade-in">
      {/* 1. Header Title & Top Actions */}
      <div className="sub-page-header">
        <div className="sub-header-left">
          <h1 className="sub-main-title">Subscription & Billing</h1>
          
        </div>

        {/* Upgrade / Renew Actions */}
        <div className="sub-header-actions">
          <button
            type="button"
            className="btn-renew-action"
            onClick={() => setIsRenewModalOpen(true)}
            title="Renew current subscription"
          >
            <RefreshCw size={15} />
            <span>Renew Plan</span>
          </button>
          <button
            type="button"
            className="btn-upgrade-plan"
            onClick={() => setIsUpgradeModalOpen(true)}
            title="Upgrade subscription tier"
          >
            <Zap size={15} />
            <span>Upgrade Plan</span>
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="sub-toast-banner animate-fade-in">
          <CheckCircle2 size={16} />
          <span>{toastMessage}</span>
          <button
            type="button"
            className="toast-close-btn"
            onClick={() => setToastMessage('')}
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* 2. Main White Container Card (Identical to Company Details card) */}
      <div className="sub-main-card">
        {/* SECTION 1: Current Plan & Subscription Details */}
        <div className="sub-section-box">
          <div className="sub-section-header">
            <span>1. CURRENT PLAN & SUBSCRIPTION DETAILS</span>
            <span className="sub-section-badge">Billed Annually</span>
          </div>

          <div className="plan-metrics-grid">
            {/* Current Plan */}
            <div className="plan-metric-card">
              <span className="plan-metric-label">Current Plan</span>
              <div className="plan-metric-value">{currentPlan}</div>
              <div className="plan-metric-sub">Enterprise tier • 10 Recruiter Seats</div>
            </div>

            {/* Subscription Status */}
            <div className="plan-metric-card">
              <span className="plan-metric-label">Subscription Status</span>
              <div className="plan-metric-value">
                <Badge status={subscriptionStatus} />
              </div>
              <div className="plan-metric-sub">All enterprise services active</div>
            </div>

            {/* Start / End Date */}
            <div className="plan-metric-card">
              <span className="plan-metric-label">Subscription Period</span>
              <div className="plan-metric-value text-compact">
                {startDate} – {endDate}
              </div>
              <div className="plan-metric-sub">365 days cycle (Active)</div>
            </div>

            {/* Renewal Date */}
            <div className="plan-metric-card">
              <span className="plan-metric-label">Renewal Date</span>
              <div className="plan-metric-value text-compact">
                {renewalDate}
              </div>
              <div className="plan-metric-sub">Next scheduled payment date</div>
            </div>
          </div>

          {/* Auto Renewal Toggle Row */}
          <div className="auto-renewal-panel">
            <div className="auto-renewal-info">
              <div className="auto-renewal-title">
                <Clock size={16} color="var(--primary)" />
                <span>Automatic Plan Renewal</span>
              </div>
              <p className="auto-renewal-desc">
                When enabled, your subscription automatically renews on {renewalDate} using your default billing payment method.
              </p>
            </div>

            <div
              className="toggle-switch-cluster"
              onClick={handleToggleAutoRenewal}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleToggleAutoRenewal()}
            >
              <span className={`toggle-label-text ${autoRenewal ? 'active' : ''}`}>
                {autoRenewal ? 'Auto Renewal: ON' : 'Auto Renewal: OFF'}
              </span>
              <div className={`toggle-switch-track ${autoRenewal ? 'on' : ''}`}>
                <div className="toggle-switch-handle" />
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: Plan Usage (Used and Remaining Limits) */}
        <div className="sub-section-box">
          <div className="sub-section-header">
            <span>2. PLAN RESOURCE USAGE & REMAINING LIMITS</span>
            <span className="sub-section-badge">Quota Cycle Active</span>
          </div>

          <div className="usage-limits-grid">
            {planUsageLimits.map((item) => {
              const Icon = item.icon;
              const percentUsed = Math.min(100, Math.round((item.used / item.total) * 100));
              const isHighUsage = percentUsed >= 80;

              return (
                <div key={item.title} className="usage-item-card">
                  <div className="usage-card-top">
                    <div className="usage-title-with-icon">
                      <div className="usage-icon-bubble">
                        <Icon size={14} color="var(--primary)" />
                      </div>
                      <span className="usage-title-text">{item.title}</span>
                    </div>
                    <span className={`usage-left-pill ${isHighUsage ? 'warning' : 'normal'}`}>
                      {item.remaining} Left
                    </span>
                  </div>

                  <div className="usage-numbers-row">
                    <span className="usage-used-number">{item.used}</span>
                    <span className="usage-total-label">/ {item.total} {item.unit}</span>
                  </div>

                  <div className="usage-bar-track">
                    <div
                      className={`usage-bar-fill ${isHighUsage ? 'fill-warning' : 'fill-primary'}`}
                      style={{ width: `${percentUsed}%` }}
                    />
                  </div>

                  <div className="usage-footer-meta">
                    <span>{percentUsed}% Used</span>
                    <span>{item.remaining} {item.unit} Remaining</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION 3: Add-ons (Available & Purchased Credits) */}
        <div className="sub-section-box">
          <div className="sub-section-header">
            <span>3. ADD-ONS & ADDITIONAL PURCHASED CREDITS</span>
            <span className="sub-section-badge">{addons.length} Packs Available</span>
          </div>

          <div className="addons-cards-grid">
            {addons.map((addon) => (
              <div key={addon.id} className="addon-pack-card">
                <div className="addon-pack-header">
                  <div className="addon-pack-name">{addon.name}</div>
                  <div className="addon-pack-price">{addon.price}</div>
                </div>

                <p className="addon-pack-desc">{addon.description}</p>

                <div className="addon-pack-footer">
                  <span
                    className={`addon-status-pill ${
                      addon.active ? 'active-pill' : 'available-pill'
                    }`}
                  >
                    {addon.status}
                  </span>

                  <button
                    type="button"
                    className="btn-addon-action"
                    onClick={() => handlePurchaseAddon(addon)}
                  >
                    <Plus size={13} />
                    <span>{addon.active ? 'Buy More' : 'Add Pack'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 4: Payment History & Invoices */}
        <div className="sub-section-box">
          <div className="sub-section-header">
            <span>4. PAYMENT HISTORY & INVOICES</span>
            <span className="sub-section-badge">{invoices.length} Invoices</span>
          </div>

          <div className="sub-table-container">
            <table className="sub-invoices-table">
              <thead>
                <tr>
                  <th style={{ width: '60px' }}>S.NO</th>
                  <th>INVOICE NO</th>
                  <th>DATE</th>
                  <th>DESCRIPTION</th>
                  <th>PAYMENT METHOD</th>
                  <th>AMOUNT</th>
                  <th>STATUS</th>
                  <th style={{ textAlign: 'center' }}>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv, idx) => (
                  <tr key={inv.invoiceNo}>
                    {/* S.NO */}
                    <td style={{ fontWeight: 600 }}>{idx + 1}</td>

                    {/* INVOICE NO */}
                    <td>
                      <div className="invoice-no-cell">
                        <FileText size={15} color="var(--primary)" />
                        <strong>{inv.invoiceNo}</strong>
                      </div>
                    </td>

                    {/* DATE */}
                    <td style={{ whiteSpace: 'nowrap' }}>{inv.date}</td>

                    {/* DESCRIPTION */}
                    <td>{inv.description}</td>

                    {/* PAYMENT METHOD */}
                    <td style={{ whiteSpace: 'nowrap' }}>
                      <div className="payment-method-cell">
                        <CreditCard size={14} color="var(--text-muted)" />
                        <span>{inv.method}</span>
                      </div>
                    </td>

                    {/* AMOUNT */}
                    <td style={{ whiteSpace: 'nowrap' }}>
                      <strong className="invoice-amount-text">{inv.amount}</strong>
                    </td>

                    {/* STATUS */}
                    <td>
                      <Badge status={inv.status} />
                    </td>

                    {/* ACTION */}
                    <td style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
                      <button
                        type="button"
                        className="btn-download-pdf"
                        onClick={() => handleDownloadInvoice(inv)}
                        title="Download Invoice PDF"
                      >
                        <Download size={13} />
                        <span>Download</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* UPGRADE PLAN MODAL */}
      {isUpgradeModalOpen && (
        <div className="sub-modal-overlay" onClick={() => setIsUpgradeModalOpen(false)}>
          <div className="sub-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="sub-modal-header">
              <div className="sub-modal-title">
                <Zap size={18} color="var(--primary)" />
                <span>Upgrade Subscription Plan</span>
              </div>
              <button
                type="button"
                className="sub-modal-close"
                onClick={() => setIsUpgradeModalOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="sub-modal-body">
              <p className="sub-modal-intro">
                Scale your hiring operations by selecting a higher enterprise tier. Remaining days on your current plan will be credited automatically.
              </p>

              <div className="upgrade-tiers-list">
                {/* Current Plan */}
                <div className="upgrade-tier-box current">
                  <div className="upgrade-tier-top">
                    <div>
                      <span className="upgrade-tier-tag current-tag">Current Plan</span>
                      <h4 className="upgrade-tier-name">Enterprise Pro (Annual)</h4>
                    </div>
                    <span className="upgrade-tier-price">$4,800 / year</span>
                  </div>
                  <ul className="upgrade-tier-features">
                    <li><Check size={14} color="var(--color-success)" /> 20 Active Job Postings</li>
                    <li><Check size={14} color="var(--color-success)" /> 500 Resume Profile Views</li>
                    <li><Check size={14} color="var(--color-success)" /> 250 AI Screenings</li>
                    <li><Check size={14} color="var(--color-success)" /> 10 Recruiter Seats</li>
                  </ul>
                </div>

                {/* Upgrade Option 1 */}
                <div className="upgrade-tier-box recommended">
                  <div className="upgrade-tier-top">
                    <div>
                      <span className="upgrade-tier-tag recommended-tag">Recommended Tier</span>
                      <h4 className="upgrade-tier-name">Enterprise Elite (Annual)</h4>
                    </div>
                    <span className="upgrade-tier-price">$7,200 / year</span>
                  </div>
                  <ul className="upgrade-tier-features">
                    <li><Check size={14} color="var(--color-success)" /> 50 Active Job Postings (2.5x)</li>
                    <li><Check size={14} color="var(--color-success)" /> 1,500 Resume Profile Views (3x)</li>
                    <li><Check size={14} color="var(--color-success)" /> 750 Automated AI Screenings (3x)</li>
                    <li><Check size={14} color="var(--color-success)" /> 25 Recruiter Seats (2.5x)</li>
                    <li><Check size={14} color="var(--color-success)" /> Priority 24/7 Dedicated Support</li>
                  </ul>
                  <button
                    type="button"
                    className="btn-select-tier primary"
                    onClick={() => handleConfirmUpgrade('Enterprise Elite (Annual)', '$7,200')}
                  >
                    <span>Upgrade to Enterprise Elite</span>
                    <ArrowRight size={15} />
                  </button>
                </div>

                {/* Upgrade Option 2 */}
                <div className="upgrade-tier-box">
                  <div className="upgrade-tier-top">
                    <div>
                      <span className="upgrade-tier-tag">Custom Scale</span>
                      <h4 className="upgrade-tier-name">Enterprise Unlimited (Annual)</h4>
                    </div>
                    <span className="upgrade-tier-price">$12,000 / year</span>
                  </div>
                  <ul className="upgrade-tier-features">
                    <li><Check size={14} color="var(--color-success)" /> Unlimited Job Postings</li>
                    <li><Check size={14} color="var(--color-success)" /> Unlimited Resume Views & AI Screenings</li>
                    <li><Check size={14} color="var(--color-success)" /> Unlimited Recruiter Seats</li>
                    <li><Check size={14} color="var(--color-success)" /> Custom ATS Integrations & Dedicated Manager</li>
                  </ul>
                  <button
                    type="button"
                    className="btn-select-tier outline"
                    onClick={() => handleConfirmUpgrade('Enterprise Unlimited (Annual)', '$12,000')}
                  >
                    <span>Upgrade to Unlimited</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </div>

            <div className="sub-modal-footer">
              <button
                type="button"
                className="btn-modal-cancel"
                onClick={() => setIsUpgradeModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RENEW PLAN MODAL */}
      {isRenewModalOpen && (
        <div className="sub-modal-overlay" onClick={() => setIsRenewModalOpen(false)}>
          <div className="sub-modal-card compact" onClick={(e) => e.stopPropagation()}>
            <div className="sub-modal-header">
              <div className="sub-modal-title">
                <RefreshCw size={18} color="var(--primary)" />
                <span>Renew Subscription Plan</span>
              </div>
              <button
                type="button"
                className="sub-modal-close"
                onClick={() => setIsRenewModalOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="sub-modal-body">
              <p className="sub-modal-intro">
                Renew your current <strong>{currentPlan}</strong> subscription early to ensure uninterrupted recruitment operations.
              </p>

              <div className="renew-summary-card">
                <div className="renew-summary-row">
                  <span>Current Plan:</span>
                  <strong>{currentPlan}</strong>
                </div>
                <div className="renew-summary-row">
                  <span>New Period:</span>
                  <strong>01-Nov-2026 to 31-Oct-2027</strong>
                </div>
                <div className="renew-summary-row">
                  <span>Billed Amount:</span>
                  <strong style={{ color: 'var(--primary)', fontSize: '1.05rem' }}>$4,800.00 / year</strong>
                </div>
                <div className="renew-summary-row">
                  <span>Payment Method:</span>
                  <span>MasterCard •••• 4242</span>
                </div>
              </div>
            </div>

            <div className="sub-modal-footer">
              <button
                type="button"
                className="btn-modal-cancel"
                onClick={() => setIsRenewModalOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn-confirm-renew"
                onClick={handleConfirmRenewal}
              >
                <Check size={16} />
                <span>Confirm & Renew Subscription</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
