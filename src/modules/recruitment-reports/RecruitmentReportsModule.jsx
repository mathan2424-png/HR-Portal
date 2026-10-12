import React, { useState } from 'react';
import {
  Download,
  Briefcase,
  Users,
  BellRing,
  ClipboardCheck,
  CalendarCheck,
  FileCheck,
  UserCheck,
  Clock,
  CreditCard,
  CheckCircle2,
} from 'lucide-react';
import './RecruitmentReportsModule.css';

export const RecruitmentReportsModule = () => {
  // STRICTLY and ONLY the 9 user-requested reports:
  // 1. Job Report: Jobs created, active, closed, filled and expired.
  // 2. Candidate Report: Matched, interested, shortlisted, interviewed and hired.
  // 3. Alert Report: Alerts sent, delivered, viewed and responded.
  // 4. Screening Report: Screening completion and qualification.
  // 5. Interview Report: Scheduled, completed, cancelled and no-show.
  // 6. Hiring Report: Offers, accepted offers, joined and not joined.
  // 7. Recruiter Report: Recruiter workload and recruitment performance.
  // 8. Time to Hire: Time taken from job creation/publishing to hiring.
  // 9. Usage Report: Company plan usage and remaining credits.

  const [activeTab, setActiveTab] = useState('overview');
  const [selectedCycle, setSelectedCycle] = useState('Current Cycle (Oct 2026)');
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3500);
  };

  const handleExport = (reportName) => {
    showToast(`Exporting ${reportName} in CSV format...`);
  };

  // 1. Job Report Data
  const jobReportData = [
    { id: 'JOB-REP-01', title: 'Senior Frontend Engineer (JOB-2026-001)', department: 'Engineering', created: 6, active: 4, closed: 1, filled: 1, expired: 0, status: 'Active' },
    { id: 'JOB-REP-02', title: 'Lead Product Designer (JOB-2026-002)', department: 'Design', created: 3, active: 1, closed: 0, filled: 2, expired: 0, status: 'Filled' },
    { id: 'JOB-REP-03', title: 'DevOps & Cloud Architect (JOB-2026-004)', department: 'Infrastructure', created: 4, active: 3, closed: 1, filled: 0, expired: 0, status: 'Active' },
    { id: 'JOB-REP-04', title: 'Senior Technical Recruiter (JOB-2026-003)', department: 'Human Resources', created: 2, active: 1, closed: 0, filled: 1, expired: 0, status: 'Filled' },
    { id: 'JOB-REP-05', title: 'Enterprise Account Executive (JOB-2026-005)', department: 'Sales', created: 5, active: 2, closed: 1, filled: 1, expired: 1, status: 'Active' },
    { id: 'JOB-REP-06', title: 'Product Security Specialist (JOB-2026-006)', department: 'Security', created: 4, active: 1, closed: 1, filled: 0, expired: 2, status: 'Expired' },
  ];

  // 2. Candidate Report Data
  const candidateReportData = [
    { id: 'CAN-REP-01', job: 'Senior Frontend Engineer (JOB-2026-001)', matched: 84, interested: 42, shortlisted: 18, interviewed: 9, hired: 3, conversionRate: '3.6%' },
    { id: 'CAN-REP-02', job: 'Lead Product Designer (JOB-2026-002)', matched: 56, interested: 31, shortlisted: 12, interviewed: 6, hired: 2, conversionRate: '3.5%' },
    { id: 'CAN-REP-03', job: 'DevOps & Cloud Architect (JOB-2026-004)', matched: 68, interested: 35, shortlisted: 14, interviewed: 7, hired: 2, conversionRate: '2.9%' },
    { id: 'CAN-REP-04', job: 'Senior Technical Recruiter (JOB-2026-003)', matched: 42, interested: 26, shortlisted: 8, interviewed: 4, hired: 1, conversionRate: '2.4%' },
    { id: 'CAN-REP-05', job: 'Enterprise Account Executive (JOB-2026-005)', matched: 92, interested: 52, shortlisted: 20, interviewed: 10, hired: 3, conversionRate: '3.3%' },
  ];

  // 3. Alert Report Data
  const alertReportData = [
    { id: 'ALT-REP-01', job: 'Senior Frontend Engineer (JOB-2026-001)', alertsSent: 350, delivered: 338, viewed: 245, responded: 112, responseRate: '32.0%' },
    { id: 'ALT-REP-02', job: 'Lead Product Designer (JOB-2026-002)', alertsSent: 240, delivered: 232, viewed: 168, responded: 84, responseRate: '35.0%' },
    { id: 'ALT-REP-03', job: 'DevOps & Cloud Architect (JOB-2026-004)', alertsSent: 280, delivered: 268, viewed: 190, responded: 76, responseRate: '27.1%' },
    { id: 'ALT-REP-04', job: 'Senior Technical Recruiter (JOB-2026-003)', alertsSent: 160, delivered: 154, viewed: 115, responded: 52, responseRate: '32.5%' },
    { id: 'ALT-REP-05', job: 'Enterprise Account Executive (JOB-2026-005)', alertsSent: 220, delivered: 210, viewed: 152, responded: 58, responseRate: '26.4%' },
  ];

  // 4. Screening Report Data
  const screeningReportData = [
    { id: 'SCR-REP-01', screeningName: 'Frontend Core & React 19 Architecture', job: 'Senior Frontend Engineer', sent: 32, completed: 28, completionRate: '87.5%', qualified: 21, disqualified: 7 },
    { id: 'SCR-REP-02', screeningName: 'Design Systems & Figma Component Mastery', job: 'Lead Product Designer', sent: 22, completed: 20, completionRate: '90.9%', qualified: 16, disqualified: 4 },
    { id: 'SCR-REP-03', screeningName: 'Kubernetes Multi-Cluster & Terraform', job: 'DevOps & Cloud Architect', sent: 26, completed: 22, completionRate: '84.6%', qualified: 15, disqualified: 7 },
    { id: 'SCR-REP-04', screeningName: 'Technical Recruiter Sourcing Velocity', job: 'Senior Technical Recruiter', sent: 14, completed: 12, completionRate: '85.7%', qualified: 9, disqualified: 3 },
    { id: 'SCR-REP-05', screeningName: 'Enterprise SaaS ARR Closure Metrics', job: 'Enterprise Account Executive', sent: 18, completed: 15, completionRate: '83.3%', qualified: 11, disqualified: 4 },
  ];

  // 5. Interview Report Data
  const interviewReportData = [
    { id: 'INT-REP-01', job: 'Senior Frontend Engineer', round: 'Technical Round', scheduled: 16, completed: 13, cancelled: 2, noShow: 1, showUpRate: '81.3%' },
    { id: 'INT-REP-02', job: 'Lead Product Designer', round: 'Portfolio & Managerial', scheduled: 10, completed: 9, cancelled: 1, noShow: 0, showUpRate: '90.0%' },
    { id: 'INT-REP-03', job: 'DevOps & Cloud Architect', round: 'System Design Round', scheduled: 12, completed: 9, cancelled: 2, noShow: 1, showUpRate: '75.0%' },
    { id: 'INT-REP-04', job: 'Senior Technical Recruiter', round: 'HR Leadership Round', scheduled: 6, completed: 5, cancelled: 1, noShow: 0, showUpRate: '83.3%' },
    { id: 'INT-REP-05', job: 'Enterprise Account Executive', round: 'Executive Pitch Round', scheduled: 8, completed: 6, cancelled: 1, noShow: 1, showUpRate: '75.0%' },
  ];

  // 6. Hiring Report Data
  const hiringReportData = [
    { id: 'HIR-REP-01', job: 'Senior Frontend Engineer', designation: 'Staff Software Engineer', offers: 4, acceptedOffers: 3, joined: 2, notJoined: 1, acceptanceRate: '75.0%' },
    { id: 'HIR-REP-02', job: 'Lead Product Designer', designation: 'Principal Product Designer', offers: 2, acceptedOffers: 2, joined: 2, notJoined: 0, acceptanceRate: '100.0%' },
    { id: 'HIR-REP-03', job: 'DevOps & Cloud Architect', designation: 'Senior Cloud Architect', offers: 3, acceptedOffers: 2, joined: 1, notJoined: 1, acceptanceRate: '66.7%' },
    { id: 'HIR-REP-04', job: 'Senior Technical Recruiter', designation: 'Talent Acquisition Lead', offers: 2, acceptedOffers: 2, joined: 2, notJoined: 0, acceptanceRate: '100.0%' },
    { id: 'HIR-REP-05', job: 'Enterprise Account Executive', designation: 'Director of Enterprise Sales', offers: 3, acceptedOffers: 2, joined: 1, notJoined: 1, acceptanceRate: '66.7%' },
  ];

  // 7. Recruiter Report Data
  const recruiterReportData = [
    { id: 'REC-REP-01', recruiter: 'Abinaya R', workload: 8, candidatesScreened: 48, interviewsSet: 22, offersReleased: 5, hired: 4, performance: '94% (Top Performer)' },
    { id: 'REC-REP-02', recruiter: 'Kavitha Sundaram', workload: 6, candidatesScreened: 36, interviewsSet: 18, offersReleased: 4, hired: 3, performance: '90% (Exceeds Goal)' },
    { id: 'REC-REP-03', recruiter: 'Karthik Raja', workload: 5, candidatesScreened: 28, interviewsSet: 14, offersReleased: 3, hired: 2, performance: '86% (On Target)' },
    { id: 'REC-REP-04', recruiter: 'Priya Nair', workload: 5, candidatesScreened: 24, interviewsSet: 10, offersReleased: 2, hired: 2, performance: '85% (On Target)' },
  ];

  // 8. Time to Hire Report Data
  const timeToHireData = [
    { id: 'TTH-REP-01', jobTitle: 'Senior Frontend Engineer', jobCreated: '02-Sep-2026', jobPublished: '04-Sep-2026', offerAccepted: '22-Sep-2026', hiredDate: '01-Oct-2026', timeToHireDays: '18 Days', velocity: 'Fast' },
    { id: 'TTH-REP-02', jobTitle: 'Lead Product Designer', jobCreated: '10-Sep-2026', jobPublished: '11-Sep-2026', offerAccepted: '26-Sep-2026', hiredDate: '05-Oct-2026', timeToHireDays: '15 Days', velocity: 'Very Fast' },
    { id: 'TTH-REP-03', jobTitle: 'DevOps & Cloud Architect', jobCreated: '20-Aug-2026', jobPublished: '22-Aug-2026', offerAccepted: '18-Sep-2026', hiredDate: '08-Oct-2026', timeToHireDays: '27 Days', velocity: 'On Track' },
    { id: 'TTH-REP-04', jobTitle: 'Senior Technical Recruiter', jobCreated: '05-Sep-2026', jobPublished: '06-Sep-2026', offerAccepted: '21-Sep-2026', hiredDate: '01-Oct-2026', timeToHireDays: '15 Days', velocity: 'Very Fast' },
    { id: 'TTH-REP-05', jobTitle: 'Enterprise Account Executive', jobCreated: '15-Aug-2026', jobPublished: '18-Aug-2026', offerAccepted: '24-Sep-2026', hiredDate: '10-Oct-2026', timeToHireDays: '36 Days', velocity: 'Extended' },
  ];

  // 9. Usage Report Data
  const usageReportData = [
    { id: 'USG-REP-01', billingCycle: 'October 2026', service: 'Candidate Match Credits', allottedCredits: 5000, creditsUsed: 1850, remainingCredits: 3150, utilization: '37.0%' },
    { id: 'USG-REP-02', billingCycle: 'October 2026', service: 'Job Alert Broadcasts', allottedCredits: 3000, creditsUsed: 1250, remainingCredits: 1750, utilization: '41.7%' },
    { id: 'USG-REP-03', billingCycle: 'October 2026', service: 'Candidate Resume Unlocks', allottedCredits: 500, creditsUsed: 184, remainingCredits: 316, utilization: '36.8%' },
    { id: 'USG-REP-04', billingCycle: 'October 2026', service: 'AI Screening Evaluations', allottedCredits: 1000, creditsUsed: 310, remainingCredits: 690, utilization: '31.0%' },
    { id: 'USG-REP-05', billingCycle: 'September 2026', service: 'Full Recruitment Suite Usage', allottedCredits: 9500, creditsUsed: 3594, remainingCredits: 5906, utilization: '37.8%' },
  ];

  return (
    <div className="reports-page-container">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="reports-toast-alert">
          <CheckCircle2 size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="reports-page-header">
        <div className="reports-header-left">
          <h1 className="reports-page-title">Recruitment Reports</h1>
          
        </div>

        <div className="reports-header-actions">
          <select
            value={selectedCycle}
            onChange={(e) => setSelectedCycle(e.target.value)}
            className="reports-filter-select"
          >
            <option value="Current Cycle (Oct 2026)">Current Cycle (Oct 2026)</option>
            <option value="Last 30 Days">Last 30 Days</option>
            <option value="Q3 2026 (Jul - Sep)">Q3 2026 (Jul - Sep)</option>
            <option value="Year to Date 2026">Year to Date 2026</option>
          </select>

          <button
            type="button"
            className="btn-export-report"
            onClick={() => handleExport(activeTab)}
          >
            <Download size={15} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Executive Overview Grid: Strictly the 9 requested reports */}
      <div className="reports-kpi-grid">
        {/* 1. Job Report */}
        <div
          className={`report-kpi-card ${activeTab === 'job' ? 'active' : ''}`}
          onClick={() => setActiveTab('job')}
        >
          <div className="report-kpi-top">
            <div className="report-kpi-title-box">
              <div className="report-kpi-icon">
                <Briefcase size={16} />
              </div>
              <span className="report-kpi-title">Job Report</span>
            </div>
            <span className="report-kpi-badge highlight">12 Active</span>
          </div>
          <div className="report-kpi-main-stat">24 Jobs</div>
          <div className="report-kpi-subtext">
            Created: 24 | Active: 12 | Closed: 4 | Filled: 5 | Expired: 3
          </div>
          <div className="report-kpi-bar-wrapper">
            <div className="report-kpi-bar-fill" style={{ width: '50%' }}></div>
          </div>
        </div>

        {/* 2. Candidate Report */}
        <div
          className={`report-kpi-card ${activeTab === 'candidate' ? 'active' : ''}`}
          onClick={() => setActiveTab('candidate')}
        >
          <div className="report-kpi-top">
            <div className="report-kpi-title-box">
              <div className="report-kpi-icon">
                <Users size={16} />
              </div>
              <span className="report-kpi-title">Candidate Report</span>
            </div>
            <span className="report-kpi-badge">342 Matched</span>
          </div>
          <div className="report-kpi-main-stat">11 Hired</div>
          <div className="report-kpi-subtext">
            Matched: 342 | Interested: 186 | Shortlisted: 64 | Interviewed: 32 | Hired: 11
          </div>
          <div className="report-kpi-bar-wrapper">
            <div className="report-kpi-bar-fill success" style={{ width: '54%' }}></div>
          </div>
        </div>

        {/* 3. Alert Report */}
        <div
          className={`report-kpi-card ${activeTab === 'alert' ? 'active' : ''}`}
          onClick={() => setActiveTab('alert')}
        >
          <div className="report-kpi-top">
            <div className="report-kpi-title-box">
              <div className="report-kpi-icon">
                <BellRing size={16} />
              </div>
              <span className="report-kpi-title">Alert Report</span>
            </div>
            <span className="report-kpi-badge highlight">30.6% Response</span>
          </div>
          <div className="report-kpi-main-stat">1,250 Sent</div>
          <div className="report-kpi-subtext">
            Sent: 1,250 | Delivered: 1,190 | Viewed: 840 | Responded: 382
          </div>
          <div className="report-kpi-bar-wrapper">
            <div className="report-kpi-bar-fill" style={{ width: '95%' }}></div>
          </div>
        </div>

        {/* 4. Screening Report */}
        <div
          className={`report-kpi-card ${activeTab === 'screening' ? 'active' : ''}`}
          onClick={() => setActiveTab('screening')}
        >
          <div className="report-kpi-top">
            <div className="report-kpi-title-box">
              <div className="report-kpi-icon">
                <ClipboardCheck size={16} />
              </div>
              <span className="report-kpi-title">Screening Report</span>
            </div>
            <span className="report-kpi-badge highlight">86% Completion</span>
          </div>
          <div className="report-kpi-main-stat">84 Completed</div>
          <div className="report-kpi-subtext">
            Total Sent: 98 | Completed: 84 | Qualified: 62 | Disqualified: 22
          </div>
          <div className="report-kpi-bar-wrapper">
            <div className="report-kpi-bar-fill success" style={{ width: '86%' }}></div>
          </div>
        </div>

        {/* 5. Interview Report */}
        <div
          className={`report-kpi-card ${activeTab === 'interview' ? 'active' : ''}`}
          onClick={() => setActiveTab('interview')}
        >
          <div className="report-kpi-top">
            <div className="report-kpi-title-box">
              <div className="report-kpi-icon">
                <CalendarCheck size={16} />
              </div>
              <span className="report-kpi-title">Interview Report</span>
            </div>
            <span className="report-kpi-badge">81% Show-up</span>
          </div>
          <div className="report-kpi-main-stat">48 Scheduled</div>
          <div className="report-kpi-subtext">
            Scheduled: 48 | Completed: 39 | Cancelled: 6 | No Show: 3
          </div>
          <div className="report-kpi-bar-wrapper">
            <div className="report-kpi-bar-fill warning" style={{ width: '81%' }}></div>
          </div>
        </div>

        {/* 6. Hiring Report */}
        <div
          className={`report-kpi-card ${activeTab === 'hiring' ? 'active' : ''}`}
          onClick={() => setActiveTab('hiring')}
        >
          <div className="report-kpi-top">
            <div className="report-kpi-title-box">
              <div className="report-kpi-icon">
                <FileCheck size={16} />
              </div>
              <span className="report-kpi-title">Hiring Report</span>
            </div>
            <span className="report-kpi-badge highlight">87.5% Accepted</span>
          </div>
          <div className="report-kpi-main-stat">16 Offers</div>
          <div className="report-kpi-subtext">
            Offers: 16 | Accepted: 14 | Joined: 11 | Not Joined: 3
          </div>
          <div className="report-kpi-bar-wrapper">
            <div className="report-kpi-bar-fill success" style={{ width: '87%' }}></div>
          </div>
        </div>

        {/* 7. Recruiter Report */}
        <div
          className={`report-kpi-card ${activeTab === 'recruiter' ? 'active' : ''}`}
          onClick={() => setActiveTab('recruiter')}
        >
          <div className="report-kpi-top">
            <div className="report-kpi-title-box">
              <div className="report-kpi-icon">
                <UserCheck size={16} />
              </div>
              <span className="report-kpi-title">Recruiter Report</span>
            </div>
            <span className="report-kpi-badge">4 Recruiters</span>
          </div>
          <div className="report-kpi-main-stat">24 Open Jobs</div>
          <div className="report-kpi-subtext">
            Workload: 24 Requisitions | 136 Screened | 64 Interviews | 11 Hired
          </div>
          <div className="report-kpi-bar-wrapper">
            <div className="report-kpi-bar-fill" style={{ width: '92%' }}></div>
          </div>
        </div>

        {/* 8. Time to Hire */}
        <div
          className={`report-kpi-card ${activeTab === 'timeToHire' ? 'active' : ''}`}
          onClick={() => setActiveTab('timeToHire')}
        >
          <div className="report-kpi-top">
            <div className="report-kpi-title-box">
              <div className="report-kpi-icon">
                <Clock size={16} />
              </div>
              <span className="report-kpi-title">Time to Hire</span>
            </div>
            <span className="report-kpi-badge highlight">Fast Velocity</span>
          </div>
          <div className="report-kpi-main-stat">18.2 Days Avg</div>
          <div className="report-kpi-subtext">
            From Job Creation & Publishing to Candidate Joining Date
          </div>
          <div className="report-kpi-bar-wrapper">
            <div className="report-kpi-bar-fill success" style={{ width: '78%' }}></div>
          </div>
        </div>

        {/* 9. Usage Report */}
        <div
          className={`report-kpi-card ${activeTab === 'usage' ? 'active' : ''}`}
          onClick={() => setActiveTab('usage')}
        >
          <div className="report-kpi-top">
            <div className="report-kpi-title-box">
              <div className="report-kpi-icon">
                <CreditCard size={16} />
              </div>
              <span className="report-kpi-title">Usage Report</span>
            </div>
            <span className="report-kpi-badge highlight">3,150 Left</span>
          </div>
          <div className="report-kpi-main-stat">1,850 Used</div>
          <div className="report-kpi-subtext">
            Company Plan: 5,000 Credits | Used: 1,850 | Remaining: 3,150 Credits
          </div>
          <div className="report-kpi-bar-wrapper">
            <div className="report-kpi-bar-fill" style={{ width: '37%' }}></div>
          </div>
        </div>
      </div>

      {/* Main Single Card with Nav Tabs & Breakdown Tables */}
      <div className="reports-main-card">
        {/* Navigation Tabs */}
        <div className="reports-tabs-nav">
          <button
            type="button"
            className={`reports-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            All Reports Overview
          </button>
          <button
            type="button"
            className={`reports-tab-btn ${activeTab === 'job' ? 'active' : ''}`}
            onClick={() => setActiveTab('job')}
          >
            1. Job Report
          </button>
          <button
            type="button"
            className={`reports-tab-btn ${activeTab === 'candidate' ? 'active' : ''}`}
            onClick={() => setActiveTab('candidate')}
          >
            2. Candidate Report
          </button>
          <button
            type="button"
            className={`reports-tab-btn ${activeTab === 'alert' ? 'active' : ''}`}
            onClick={() => setActiveTab('alert')}
          >
            3. Alert Report
          </button>
          <button
            type="button"
            className={`reports-tab-btn ${activeTab === 'screening' ? 'active' : ''}`}
            onClick={() => setActiveTab('screening')}
          >
            4. Screening Report
          </button>
          <button
            type="button"
            className={`reports-tab-btn ${activeTab === 'interview' ? 'active' : ''}`}
            onClick={() => setActiveTab('interview')}
          >
            5. Interview Report
          </button>
          <button
            type="button"
            className={`reports-tab-btn ${activeTab === 'hiring' ? 'active' : ''}`}
            onClick={() => setActiveTab('hiring')}
          >
            6. Hiring Report
          </button>
          <button
            type="button"
            className={`reports-tab-btn ${activeTab === 'recruiter' ? 'active' : ''}`}
            onClick={() => setActiveTab('recruiter')}
          >
            7. Recruiter Report
          </button>
          <button
            type="button"
            className={`reports-tab-btn ${activeTab === 'timeToHire' ? 'active' : ''}`}
            onClick={() => setActiveTab('timeToHire')}
          >
            8. Time to Hire
          </button>
          <button
            type="button"
            className={`reports-tab-btn ${activeTab === 'usage' ? 'active' : ''}`}
            onClick={() => setActiveTab('usage')}
          >
            9. Usage Report
          </button>
        </div>

        {/* 1. Job Report Table */}
        {(activeTab === 'job' || activeTab === 'overview') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div className="report-section-header">
              <span>1. JOB REPORT (JOBS CREATED, ACTIVE, CLOSED, FILLED AND EXPIRED)</span>
              <span style={{ fontSize: '0.74rem', opacity: 0.9 }}>Total Positions: {jobReportData.length}</span>
            </div>
            <div className="reports-table-wrapper">
              <table className="reports-table">
                <thead>
                  <tr>
                    <th>S.NO</th>
                    <th>JOB REFERENCE & TITLE</th>
                    <th>DEPARTMENT</th>
                    <th>JOBS CREATED</th>
                    <th>ACTIVE</th>
                    <th>CLOSED</th>
                    <th>FILLED</th>
                    <th>EXPIRED</th>
                    <th>OVERALL STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {jobReportData.map((row, idx) => (
                    <tr key={row.id}>
                      <td style={{ fontWeight: 700, color: '#64748b' }}>{idx + 1}</td>
                      <td style={{ fontWeight: 700 }}>{row.title}</td>
                      <td>{row.department}</td>
                      <td><span className="badge-count blue">{row.created}</span></td>
                      <td><span className="badge-count green">{row.active}</span></td>
                      <td><span className="badge-count gray">{row.closed}</span></td>
                      <td><span className="badge-count purple">{row.filled}</span></td>
                      <td><span className="badge-count red">{row.expired}</span></td>
                      <td>
                        <span className={`badge-count ${row.status === 'Active' ? 'green' : row.status === 'Filled' ? 'purple' : 'red'}`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 2. Candidate Report Table */}
        {(activeTab === 'candidate' || activeTab === 'overview') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div className="report-section-header">
              <span>2. CANDIDATE REPORT (MATCHED, INTERESTED, SHORTLISTED, INTERVIEWED AND HIRED)</span>
              <span style={{ fontSize: '0.74rem', opacity: 0.9 }}>Pipeline Breakdown</span>
            </div>
            <div className="reports-table-wrapper">
              <table className="reports-table">
                <thead>
                  <tr>
                    <th>S.NO</th>
                    <th>JOB REFERENCE</th>
                    <th>MATCHED</th>
                    <th>INTERESTED</th>
                    <th>SHORTLISTED</th>
                    <th>INTERVIEWED</th>
                    <th>HIRED</th>
                    <th>CONVERSION RATE</th>
                  </tr>
                </thead>
                <tbody>
                  {candidateReportData.map((row, idx) => (
                    <tr key={row.id}>
                      <td style={{ fontWeight: 700, color: '#64748b' }}>{idx + 1}</td>
                      <td style={{ fontWeight: 700 }}>{row.job}</td>
                      <td><span className="badge-count blue">{row.matched}</span></td>
                      <td><span className="badge-count amber">{row.interested}</span></td>
                      <td><span className="badge-count purple">{row.shortlisted}</span></td>
                      <td><span className="badge-count blue">{row.interviewed}</span></td>
                      <td><span className="badge-count green">{row.hired}</span></td>
                      <td><span className="rate-pill">{row.conversionRate}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. Alert Report Table */}
        {(activeTab === 'alert' || activeTab === 'overview') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div className="report-section-header">
              <span>3. ALERT REPORT (ALERTS SENT, DELIVERED, VIEWED AND RESPONDED)</span>
              <span style={{ fontSize: '0.74rem', opacity: 0.9 }}>Outreach Metrics</span>
            </div>
            <div className="reports-table-wrapper">
              <table className="reports-table">
                <thead>
                  <tr>
                    <th>S.NO</th>
                    <th>JOB / CAMPAIGN</th>
                    <th>ALERTS SENT</th>
                    <th>DELIVERED</th>
                    <th>VIEWED</th>
                    <th>RESPONDED</th>
                    <th>RESPONSE RATE</th>
                  </tr>
                </thead>
                <tbody>
                  {alertReportData.map((row, idx) => (
                    <tr key={row.id}>
                      <td style={{ fontWeight: 700, color: '#64748b' }}>{idx + 1}</td>
                      <td style={{ fontWeight: 700 }}>{row.job}</td>
                      <td><span className="badge-count blue">{row.alertsSent}</span></td>
                      <td><span className="badge-count green">{row.delivered}</span></td>
                      <td><span className="badge-count amber">{row.viewed}</span></td>
                      <td><span className="badge-count purple">{row.responded}</span></td>
                      <td><span className="rate-pill">{row.responseRate}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 4. Screening Report Table */}
        {(activeTab === 'screening' || activeTab === 'overview') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div className="report-section-header">
              <span>4. SCREENING REPORT (SCREENING COMPLETION AND QUALIFICATION)</span>
              <span style={{ fontSize: '0.74rem', opacity: 0.9 }}>Assessments</span>
            </div>
            <div className="reports-table-wrapper">
              <table className="reports-table">
                <thead>
                  <tr>
                    <th>S.NO</th>
                    <th>SCREENING NAME</th>
                    <th>RELATED JOB</th>
                    <th>SENT</th>
                    <th>COMPLETED</th>
                    <th>COMPLETION RATE</th>
                    <th>QUALIFIED</th>
                    <th>NOT QUALIFIED</th>
                  </tr>
                </thead>
                <tbody>
                  {screeningReportData.map((row, idx) => (
                    <tr key={row.id}>
                      <td style={{ fontWeight: 700, color: '#64748b' }}>{idx + 1}</td>
                      <td style={{ fontWeight: 700 }}>{row.screeningName}</td>
                      <td>{row.job}</td>
                      <td><span className="badge-count gray">{row.sent}</span></td>
                      <td><span className="badge-count blue">{row.completed}</span></td>
                      <td><span className="rate-pill">{row.completionRate}</span></td>
                      <td><span className="badge-count green">{row.qualified}</span></td>
                      <td><span className="badge-count red">{row.disqualified}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 5. Interview Report Table */}
        {(activeTab === 'interview' || activeTab === 'overview') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div className="report-section-header">
              <span>5. INTERVIEW REPORT (SCHEDULED, COMPLETED, CANCELLED AND NO-SHOW)</span>
              <span style={{ fontSize: '0.74rem', opacity: 0.9 }}>Evaluation Pipeline</span>
            </div>
            <div className="reports-table-wrapper">
              <table className="reports-table">
                <thead>
                  <tr>
                    <th>S.NO</th>
                    <th>JOB REFERENCE</th>
                    <th>ROUND TYPE</th>
                    <th>SCHEDULED</th>
                    <th>COMPLETED</th>
                    <th>CANCELLED</th>
                    <th>NO-SHOW</th>
                    <th>SHOW-UP RATE</th>
                  </tr>
                </thead>
                <tbody>
                  {interviewReportData.map((row, idx) => (
                    <tr key={row.id}>
                      <td style={{ fontWeight: 700, color: '#64748b' }}>{idx + 1}</td>
                      <td style={{ fontWeight: 700 }}>{row.job}</td>
                      <td>{row.round}</td>
                      <td><span className="badge-count blue">{row.scheduled}</span></td>
                      <td><span className="badge-count green">{row.completed}</span></td>
                      <td><span className="badge-count amber">{row.cancelled}</span></td>
                      <td><span className="badge-count red">{row.noShow}</span></td>
                      <td><span className="rate-pill">{row.showUpRate}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 6. Hiring Report Table */}
        {(activeTab === 'hiring' || activeTab === 'overview') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div className="report-section-header">
              <span>6. HIRING REPORT (OFFERS, ACCEPTED OFFERS, JOINED AND NOT JOINED)</span>
              <span style={{ fontSize: '0.74rem', opacity: 0.9 }}>Onboarding Progression</span>
            </div>
            <div className="reports-table-wrapper">
              <table className="reports-table">
                <thead>
                  <tr>
                    <th>S.NO</th>
                    <th>JOB & DESIGNATION</th>
                    <th>DESIGNATION</th>
                    <th>OFFERS RELEASED</th>
                    <th>ACCEPTED OFFERS</th>
                    <th>JOINED</th>
                    <th>NOT JOINED</th>
                    <th>ACCEPTANCE RATE</th>
                  </tr>
                </thead>
                <tbody>
                  {hiringReportData.map((row, idx) => (
                    <tr key={row.id}>
                      <td style={{ fontWeight: 700, color: '#64748b' }}>{idx + 1}</td>
                      <td style={{ fontWeight: 700 }}>{row.job}</td>
                      <td>{row.designation}</td>
                      <td><span className="badge-count blue">{row.offers}</span></td>
                      <td><span className="badge-count purple">{row.acceptedOffers}</span></td>
                      <td><span className="badge-count green">{row.joined}</span></td>
                      <td><span className="badge-count red">{row.notJoined}</span></td>
                      <td><span className="rate-pill">{row.acceptanceRate}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 7. Recruiter Report Table */}
        {(activeTab === 'recruiter' || activeTab === 'overview') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div className="report-section-header">
              <span>7. RECRUITER REPORT (RECRUITER WORKLOAD AND RECRUITMENT PERFORMANCE)</span>
              <span style={{ fontSize: '0.74rem', opacity: 0.9 }}>Team Productivities</span>
            </div>
            <div className="reports-table-wrapper">
              <table className="reports-table">
                <thead>
                  <tr>
                    <th>S.NO</th>
                    <th>RECRUITER NAME</th>
                    <th>WORKLOAD (ACTIVE JOBS)</th>
                    <th>CANDIDATES SCREENED</th>
                    <th>INTERVIEWS SET</th>
                    <th>OFFERS RELEASED</th>
                    <th>HIRED COUNT</th>
                    <th>PERFORMANCE SCORE</th>
                  </tr>
                </thead>
                <tbody>
                  {recruiterReportData.map((row, idx) => (
                    <tr key={row.id}>
                      <td style={{ fontWeight: 700, color: '#64748b' }}>{idx + 1}</td>
                      <td style={{ fontWeight: 700 }}>{row.recruiter}</td>
                      <td><span className="badge-count blue">{row.workload} Jobs</span></td>
                      <td><span className="badge-count gray">{row.candidatesScreened}</span></td>
                      <td><span className="badge-count amber">{row.interviewsSet}</span></td>
                      <td><span className="badge-count purple">{row.offersReleased}</span></td>
                      <td><span className="badge-count green">{row.hired}</span></td>
                      <td><span className="rate-pill">{row.performance}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 8. Time to Hire Report Table */}
        {(activeTab === 'timeToHire' || activeTab === 'overview') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div className="report-section-header">
              <span>8. TIME TO HIRE (TIME TAKEN FROM JOB CREATION/PUBLISHING TO HIRING)</span>
              <span style={{ fontSize: '0.74rem', opacity: 0.9 }}>Hiring Velocity Analysis</span>
            </div>
            <div className="reports-table-wrapper">
              <table className="reports-table">
                <thead>
                  <tr>
                    <th>S.NO</th>
                    <th>JOB POSITION</th>
                    <th>JOB CREATED DATE</th>
                    <th>JOB PUBLISHED DATE</th>
                    <th>OFFER ACCEPTED DATE</th>
                    <th>ACTUAL HIRED DATE</th>
                    <th>TIME TO HIRE</th>
                    <th>VELOCITY BENCHMARK</th>
                  </tr>
                </thead>
                <tbody>
                  {timeToHireData.map((row, idx) => (
                    <tr key={row.id}>
                      <td style={{ fontWeight: 700, color: '#64748b' }}>{idx + 1}</td>
                      <td style={{ fontWeight: 700 }}>{row.jobTitle}</td>
                      <td>{row.jobCreated}</td>
                      <td>{row.jobPublished}</td>
                      <td>{row.offerAccepted}</td>
                      <td>{row.hiredDate}</td>
                      <td>
                        <span className="badge-count green" style={{ fontWeight: 800 }}>
                          {row.timeToHireDays}
                        </span>
                      </td>
                      <td>
                        <span className={`badge-count ${row.velocity === 'Fast' || row.velocity === 'Very Fast' ? 'green' : row.velocity === 'On Track' ? 'blue' : 'amber'}`}>
                          {row.velocity}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 9. Usage Report Table */}
        {(activeTab === 'usage' || activeTab === 'overview') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div className="report-section-header">
              <span>9. USAGE REPORT (COMPANY PLAN USAGE AND REMAINING CREDITS)</span>
              <span style={{ fontSize: '0.74rem', opacity: 0.9 }}>Subscription Consumption</span>
            </div>
            <div className="reports-table-wrapper">
              <table className="reports-table">
                <thead>
                  <tr>
                    <th>S.NO</th>
                    <th>BILLING CYCLE</th>
                    <th>SERVICE CATEGORY</th>
                    <th>ALLOTTED CREDITS</th>
                    <th>CREDITS USED</th>
                    <th>REMAINING CREDITS</th>
                    <th>PLAN UTILIZATION</th>
                  </tr>
                </thead>
                <tbody>
                  {usageReportData.map((row, idx) => (
                    <tr key={row.id}>
                      <td style={{ fontWeight: 700, color: '#64748b' }}>{idx + 1}</td>
                      <td>{row.billingCycle}</td>
                      <td style={{ fontWeight: 700 }}>{row.service}</td>
                      <td><span className="badge-count gray">{row.allottedCredits.toLocaleString()}</span></td>
                      <td><span className="badge-count blue">{row.creditsUsed.toLocaleString()}</span></td>
                      <td><span className="badge-count green" style={{ fontWeight: 800 }}>{row.remainingCredits.toLocaleString()}</span></td>
                      <td>
                        <div className="cell-progress-wrapper">
                          <div className="cell-progress-bar">
                            <div className="cell-progress-val" style={{ width: row.utilization }}></div>
                          </div>
                          <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>{row.utilization}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Bottom Report Footer */}
        <div className="reports-table-footer">
          <div>
            Data synchronized from candidate ATS pipelines, alert delivery gateways, and billing records.
          </div>
          <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>
            Showing 9 of 9 recruitment performance reports
          </div>
        </div>
      </div>
    </div>
  );
};
