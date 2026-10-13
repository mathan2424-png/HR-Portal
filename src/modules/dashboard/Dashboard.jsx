import React from 'react';
import {
  Briefcase,
  Users,
  FileCheck,
  Calendar,
  Award,
  Zap,
  Bell,
  ArrowRight,
  Plus,
  Clock,
  CheckCircle2,
  AlertTriangle,
  CreditCard,
  UserCheck,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  MessageSquare,
  FileText,
  TrendingUp,
} from 'lucide-react';
import { companyRecruitmentData } from '../../services/mockData';
import { Badge } from '../../components/common/Badge/Badge';
import { Link } from 'react-router-dom';
import './Dashboard.css';

export const Dashboard = () => {
  const {
    companyProfile,
    jobSummary,
    candidateSummary,
    screeningSummary,
    interviewSummary,
    hiringSummary,
    planUsage,
    importantAlerts,
    upcomingInterviewsList,
    activeJobsOverview,
  } = companyRecruitmentData;

  return (
    <div className="dashboard-page animate-fade-in">
      {/* 1. Top Header Row: Company Title, Tier Badge & Quick Actions */}
      <div className="dashboard-header-row">
        <div className="header-title-group">
          <div className="company-heading-wrap">
            <h1 className="dashboard-company-name">{companyProfile.name}</h1>
            <span className="premium-plan-chip">
              <Sparkles size={13} />
              <span>{companyProfile.plan}</span>
            </span>
            <span className="verified-account-badge">
              <CheckCircle2 size={13} color="var(--color-success)" />
              <span>Verified Account</span>
            </span>
          </div>
        </div>

        <div className="dashboard-header-actions">
          <Link to="/subscription" className="btn-header-secondary">
            <CreditCard size={15} color="var(--primary)" />
            <span>Manage Subscription</span>
          </Link>
          <Link to="/jobs" className="btn-header-primary">
            <Plus size={16} strokeWidth={2.5} />
            <span>Post New Job</span>
          </Link>
        </div>
      </div>

      {/* 2. Important Alerts Section (Upcoming interviews, pending actions, plan-limit alerts, subscription alerts) */}
      <section className="dashboard-alerts-card">
        <div className="alerts-card-header">
          <div className="alerts-title-box">
            <div className="alerts-icon-ring">
              <Bell size={16} />
            </div>
            <div>
              <h2 className="alerts-heading">Important Alerts & Pending Items</h2>
              <p className="alerts-subtext">Real-time alerts requiring immediate or upcoming action</p>
            </div>
          </div>
          <span className="alerts-count-tag">{importantAlerts.length} Active Alerts</span>
        </div>

        <div className="alerts-quad-grid">
          {importantAlerts.map((alert) => (
            <div key={alert.id} className={`premium-alert-item ${alert.type}`}>
              <div className="alert-item-top">
                <span className="alert-category-pill">{alert.badge}</span>
                <span className="alert-time-tag">
                  <Clock size={11} />
                  <span>{alert.time}</span>
                </span>
              </div>
              <h4 className="alert-headline">{alert.title}</h4>
              <p className="alert-summary">{alert.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Core Recruitment Summaries (Jobs, Candidates, Screenings, Interviews, Hiring) */}
      <div className="summaries-five-grid">
        {/* 3.1 Job Summary: Active, draft, paused, closed and filled jobs */}
        <div className="recruitment-summary-card">
          <div className="summary-header">
            <div className="summary-title-cluster">
              <div className="summary-icon-avatar bg-blue">
                <Briefcase size={20} />
              </div>
              <div>
                <h3 className="summary-title">Job Summary</h3>
                <span className="summary-sub">Active & Closed Roles</span>
              </div>
            </div>
            <div className="summary-big-metric">{jobSummary.total}</div>
          </div>

          {/* Segmented Distribution Bar */}
          <div className="sleek-segmented-meter">
            <div
              className="meter-slice"
              style={{ width: `${(jobSummary.active / jobSummary.total) * 100}%`, background: 'var(--color-success)' }}
              title={`Active: ${jobSummary.active}`}
            />
            <div
              className="meter-slice"
              style={{ width: `${(jobSummary.draft / jobSummary.total) * 100}%`, background: '#94a3b8' }}
              title={`Draft: ${jobSummary.draft}`}
            />
            <div
              className="meter-slice"
              style={{ width: `${(jobSummary.paused / jobSummary.total) * 100}%`, background: 'var(--color-warning)' }}
              title={`Paused: ${jobSummary.paused}`}
            />
            <div
              className="meter-slice"
              style={{ width: `${(jobSummary.filled / jobSummary.total) * 100}%`, background: 'var(--primary)' }}
              title={`Filled: ${jobSummary.filled}`}
            />
            <div
              className="meter-slice"
              style={{ width: `${(jobSummary.closed / jobSummary.total) * 100}%`, background: '#cbd5e1' }}
              title={`Closed: ${jobSummary.closed}`}
            />
          </div>

          {/* Breakdown Status Pills */}
          <div className="summary-pill-tags-grid">
            <div className="status-metric-tag">
              <span className="dot dot-success" />
              <span>Active: <strong>{jobSummary.active}</strong></span>
            </div>
            <div className="status-metric-tag">
              <span className="dot dot-muted" />
              <span>Draft: <strong>{jobSummary.draft}</strong></span>
            </div>
            <div className="status-metric-tag">
              <span className="dot dot-warning" />
              <span>Paused: <strong>{jobSummary.paused}</strong></span>
            </div>
            <div className="status-metric-tag">
              <span className="dot dot-primary" />
              <span>Filled: <strong>{jobSummary.filled}</strong></span>
            </div>
            <div className="status-metric-tag">
              <span className="dot dot-slate" />
              <span>Closed: <strong>{jobSummary.closed}</strong></span>
            </div>
          </div>
        </div>

        {/* 3.2 Candidate Summary: Matched, interested, shortlisted and rejected */}
        <div className="recruitment-summary-card">
          <div className="summary-header">
            <div className="summary-title-cluster">
              <div className="summary-icon-avatar bg-teal">
                <Users size={20} />
              </div>
              <div>
                <h3 className="summary-title">Candidate Summary</h3>
                <span className="summary-sub">Talent Pipeline Funnel</span>
              </div>
            </div>
            <div className="summary-big-metric">{candidateSummary.total}</div>
          </div>

          {/* Segmented Distribution Bar */}
          <div className="sleek-segmented-meter">
            <div
              className="meter-slice"
              style={{ width: `${(candidateSummary.matched / candidateSummary.total) * 100}%`, background: 'var(--secondary)' }}
              title={`Matched: ${candidateSummary.matched}`}
            />
            <div
              className="meter-slice"
              style={{ width: `${(candidateSummary.interested / candidateSummary.total) * 100}%`, background: 'var(--color-info)' }}
              title={`Interested: ${candidateSummary.interested}`}
            />
            <div
              className="meter-slice"
              style={{ width: `${(candidateSummary.shortlisted / candidateSummary.total) * 100}%`, background: 'var(--color-success)' }}
              title={`Shortlisted: ${candidateSummary.shortlisted}`}
            />
            <div
              className="meter-slice"
              style={{ width: `${(candidateSummary.rejected / candidateSummary.total) * 100}%`, background: 'var(--color-danger)' }}
              title={`Rejected: ${candidateSummary.rejected}`}
            />
          </div>

          {/* Breakdown Status Pills */}
          <div className="summary-pill-tags-grid">
            <div className="status-metric-tag">
              <span className="dot dot-teal" />
              <span>Matched: <strong>{candidateSummary.matched}</strong></span>
            </div>
            <div className="status-metric-tag">
              <span className="dot dot-info" />
              <span>Interested: <strong>{candidateSummary.interested}</strong></span>
            </div>
            <div className="status-metric-tag">
              <span className="dot dot-success" />
              <span>Shortlisted: <strong>{candidateSummary.shortlisted}</strong></span>
            </div>
            <div className="status-metric-tag">
              <span className="dot dot-danger" />
              <span>Rejected: <strong>{candidateSummary.rejected}</strong></span>
            </div>
          </div>
        </div>

        {/* 3.3 Screening Summary: Pending and completed screenings */}
        <div className="recruitment-summary-card">
          <div className="summary-header">
            <div className="summary-title-cluster">
              <div className="summary-icon-avatar bg-purple">
                <FileCheck size={20} />
              </div>
              <div>
                <h3 className="summary-title">Screening Summary</h3>
                <span className="summary-sub">AI & Skill Tests</span>
              </div>
            </div>
            <div className="summary-big-metric">{screeningSummary.total}</div>
          </div>

          {/* Segmented Distribution Bar */}
          <div className="sleek-segmented-meter">
            <div
              className="meter-slice"
              style={{ width: `${(screeningSummary.completed / screeningSummary.total) * 100}%`, background: 'var(--color-success)' }}
              title={`Completed: ${screeningSummary.completed}`}
            />
            <div
              className="meter-slice"
              style={{ width: `${(screeningSummary.pending / screeningSummary.total) * 100}%`, background: 'var(--color-warning)' }}
              title={`Pending: ${screeningSummary.pending}`}
            />
          </div>

          {/* Breakdown Status Pills */}
          <div className="summary-pill-tags-grid">
            <div className="status-metric-tag">
              <span className="dot dot-warning" />
              <span>Pending: <strong>{screeningSummary.pending}</strong></span>
            </div>
            <div className="status-metric-tag">
              <span className="dot dot-success" />
              <span>Completed: <strong>{screeningSummary.completed}</strong></span>
            </div>
            <div className="status-metric-tag highlight-accent">
              <TrendingUp size={12} color="var(--primary)" />
              <span>Pass Rate: <strong style={{ color: 'var(--primary)' }}>{screeningSummary.passRate}</strong></span>
            </div>
          </div>
        </div>

        {/* 3.4 Interview Summary: Upcoming, completed and cancelled interviews */}
        <div className="recruitment-summary-card">
          <div className="summary-header">
            <div className="summary-title-cluster">
              <div className="summary-icon-avatar bg-sky">
                <Calendar size={20} />
              </div>
              <div>
                <h3 className="summary-title">Interview Summary</h3>
                <span className="summary-sub">Scheduled Video & F2F</span>
              </div>
            </div>
            <div className="summary-big-metric">{interviewSummary.total}</div>
          </div>

          {/* Segmented Distribution Bar */}
          <div className="sleek-segmented-meter">
            <div
              className="meter-slice"
              style={{ width: `${(interviewSummary.upcoming / interviewSummary.total) * 100}%`, background: 'var(--primary)' }}
              title={`Upcoming: ${interviewSummary.upcoming}`}
            />
            <div
              className="meter-slice"
              style={{ width: `${(interviewSummary.completed / interviewSummary.total) * 100}%`, background: 'var(--color-success)' }}
              title={`Completed: ${interviewSummary.completed}`}
            />
            <div
              className="meter-slice"
              style={{ width: `${(interviewSummary.cancelled / interviewSummary.total) * 100}%`, background: 'var(--color-danger)' }}
              title={`Cancelled: ${interviewSummary.cancelled}`}
            />
          </div>

          {/* Breakdown Status Pills */}
          <div className="summary-pill-tags-grid">
            <div className="status-metric-tag">
              <span className="dot dot-primary" />
              <span>Upcoming: <strong>{interviewSummary.upcoming}</strong></span>
            </div>
            <div className="status-metric-tag">
              <span className="dot dot-success" />
              <span>Completed: <strong>{interviewSummary.completed}</strong></span>
            </div>
            <div className="status-metric-tag">
              <span className="dot dot-danger" />
              <span>Cancelled: <strong>{interviewSummary.cancelled}</strong></span>
            </div>
          </div>
        </div>

        {/* 3.5 Hiring Summary: Offers, accepted offers and hires */}
        <div className="recruitment-summary-card hiring-highlight-card">
          <div className="summary-header">
            <div className="summary-title-cluster">
              <div className="summary-icon-avatar bg-emerald">
                <Award size={20} />
              </div>
              <div>
                <h3 className="summary-title">Hiring Summary</h3>
                <span className="summary-sub">Offers & Onboarded</span>
              </div>
            </div>
            <div className="hiring-metric-display">
              <span className="hiring-metric-number">{hiringSummary.hired}</span>
              <span className="hiring-metric-label">Hires Made</span>
            </div>
          </div>

          {/* 3 Stats Grid */}
          <div className="hiring-stat-triad">
            <div className="stat-triad-box">
              <span className="triad-label">Offers Sent</span>
              <span className="triad-val">{hiringSummary.offersSent}</span>
            </div>
            <div className="stat-triad-box">
              <span className="triad-label">Offers Accepted</span>
              <span className="triad-val text-primary">{hiringSummary.offersAccepted}</span>
            </div>
            <div className="stat-triad-box highlight-success">
              <span className="triad-label">Acceptance Rate</span>
              <span className="triad-val text-success">{hiringSummary.acceptanceRate}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Plan Usage Quota: Used and remaining jobs, alerts, resume access, screening and user seats */}
      <section className="dashboard-plan-card">
        <div className="plan-card-header">
          <div>
            <div className="plan-card-title-row">
              <h2 className="plan-card-heading">Company Plan Usage & Resource Quotas</h2>
              <span className="tier-tag">{companyProfile.plan} Tier</span>
            </div>
            <p className="plan-card-subtext">
              Track used and remaining limits for active jobs, candidate alerts, resume database access, screenings, and HR seats.
            </p>
          </div>
          <Link to="/subscription" className="btn-plan-manage">
            <Zap size={14} />
            <span>Manage Plan Limits</span>
          </Link>
        </div>

        <div className="plan-quotas-five-grid">
          {/* 1. Job Quota */}
          <div className="quota-metric-box">
            <div className="quota-box-header">
              <span className="quota-box-title">Job Postings Limit</span>
              <span className="quota-status-pill green">{planUsage.jobs.remaining} Left</span>
            </div>
            <div className="quota-figures">
              <span className="quota-active-val">{planUsage.jobs.used}</span>
              <span className="quota-total-val">/ {planUsage.jobs.total} jobs</span>
            </div>
            <div className="quota-track">
              <div
                className="quota-fill"
                style={{
                  width: `${(planUsage.jobs.used / planUsage.jobs.total) * 100}%`,
                  background: 'var(--primary)',
                }}
              />
            </div>
            <div className="quota-sub-meta">
              <span>{Math.round((planUsage.jobs.used / planUsage.jobs.total) * 100)}% Used</span>
              <span>{planUsage.jobs.remaining} jobs remaining</span>
            </div>
          </div>

          {/* 2. Candidate Alerts Quota */}
          <div className="quota-metric-box">
            <div className="quota-box-header">
              <span className="quota-box-title">Candidate Alerts Quota</span>
              <span className="quota-status-pill teal">{planUsage.alerts?.remaining || 550} Left</span>
            </div>
            <div className="quota-figures">
              <span className="quota-active-val">{planUsage.alerts?.used || 1450}</span>
              <span className="quota-total-val">/ {planUsage.alerts?.total || 2000} alerts</span>
            </div>
            <div className="quota-track">
              <div
                className="quota-fill"
                style={{
                  width: `${((planUsage.alerts?.used || 1450) / (planUsage.alerts?.total || 2000)) * 100}%`,
                  background: 'var(--secondary)',
                }}
              />
            </div>
            <div className="quota-sub-meta">
              <span>{Math.round(((planUsage.alerts?.used || 1450) / (planUsage.alerts?.total || 2000)) * 100)}% Used</span>
              <span>{planUsage.alerts?.remaining || 550} alerts left</span>
            </div>
          </div>

          {/* 3. Resume Access Quota */}
          <div className="quota-metric-box">
            <div className="quota-box-header">
              <span className="quota-box-title">Resume Database Access</span>
              <span className="quota-status-pill amber">{planUsage.resumes.remaining} Left</span>
            </div>
            <div className="quota-figures">
              <span className="quota-active-val">{planUsage.resumes.used}</span>
              <span className="quota-total-val">/ {planUsage.resumes.total} profiles</span>
            </div>
            <div className="quota-track">
              <div
                className="quota-fill"
                style={{
                  width: `${(planUsage.resumes.used / planUsage.resumes.total) * 100}%`,
                  background: 'var(--color-warning)',
                }}
              />
            </div>
            <div className="quota-sub-meta">
              <span>{Math.round((planUsage.resumes.used / planUsage.resumes.total) * 100)}% Used</span>
              <span>{planUsage.resumes.remaining} unlocks remaining</span>
            </div>
          </div>

          {/* 4. Screening Quota */}
          <div className="quota-metric-box">
            <div className="quota-box-header">
              <span className="quota-box-title">Screening Assessments</span>
              <span className="quota-status-pill purple">{planUsage.screenings.remaining} Left</span>
            </div>
            <div className="quota-figures">
              <span className="quota-active-val">{planUsage.screenings.used}</span>
              <span className="quota-total-val">/ {planUsage.screenings.total} assessments</span>
            </div>
            <div className="quota-track">
              <div
                className="quota-fill"
                style={{
                  width: `${(planUsage.screenings.used / planUsage.screenings.total) * 100}%`,
                  background: 'var(--accent-purple)',
                }}
              />
            </div>
            <div className="quota-sub-meta">
              <span>{Math.round((planUsage.screenings.used / planUsage.screenings.total) * 100)}% Used</span>
              <span>{planUsage.screenings.remaining} assessments left</span>
            </div>
          </div>

          {/* 5. HR User Seats Quota */}
          <div className="quota-metric-box">
            <div className="quota-box-header">
              <span className="quota-box-title">HR Recruiter Seats</span>
              <span className="quota-status-pill green">{planUsage.userSeats.remaining} Available</span>
            </div>
            <div className="quota-figures">
              <span className="quota-active-val">{planUsage.userSeats.used}</span>
              <span className="quota-total-val">/ {planUsage.userSeats.total} active seats</span>
            </div>
            <div className="quota-track">
              <div
                className="quota-fill"
                style={{
                  width: `${(planUsage.userSeats.used / planUsage.userSeats.total) * 100}%`,
                  background: 'var(--color-success)',
                }}
              />
            </div>
            <div className="quota-sub-meta">
              <span>{Math.round((planUsage.userSeats.used / planUsage.userSeats.total) * 100)}% Allocated</span>
              <span>{planUsage.userSeats.remaining} seats open</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Live Activity Tables: Upcoming Interviews Schedule & Active Jobs */}
      <div className="dashboard-activity-dual-grid">
        {/* Left: Upcoming Interviews Schedule */}
        <div className="activity-container-card">
          <div className="activity-header-bar">
            <div>
              <h3 className="activity-heading">Upcoming Interviews Schedule</h3>
              <p className="activity-subtext">Confirmed candidate interview rounds</p>
            </div>
            <span className="activity-meta-count">{upcomingInterviewsList.length} Scheduled</span>
          </div>

          <div className="activity-items-list">
            {upcomingInterviewsList.map((item) => (
              <div key={item.id} className="interview-schedule-item">
                <div className="candidate-info-group">
                  <img
                    src={item.candidateAvatar}
                    alt={item.candidateName}
                    className="candidate-avatar-thumb"
                  />
                  <div>
                    <h4 className="candidate-name-text">{item.candidateName}</h4>
                    <span className="candidate-role-sub">
                      {item.jobTitle} • <span className="interview-type-tag">{item.type}</span>
                    </span>
                  </div>
                </div>

                <div className="interview-timing-group">
                  <div className="time-badge">
                    <Clock size={12} color="var(--primary)" />
                    <span>{item.dateTime}</span>
                  </div>
                  <span className="interviewer-name">Interviewer: {item.interviewer}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Active Jobs Pipeline */}
        <div className="activity-container-card">
          <div className="activity-header-bar">
            <div>
              <h3 className="activity-heading">Active Jobs Recruitment Pipeline</h3>
              <p className="activity-subtext">Live talent progression per open role</p>
            </div>
            <span className="activity-meta-count">{activeJobsOverview.length} Active Roles</span>
          </div>

          <div className="activity-items-list">
            {activeJobsOverview.map((job) => (
              <div key={job.id} className="job-pipeline-item">
                <div>
                  <h4 className="job-pipeline-title">{job.title}</h4>
                  <span className="job-dept-text">{job.department}</span>
                </div>

                <div className="job-pipeline-stats">
                  <div className="pipeline-numbers">
                    <span className="matched-count">{job.matched} Matched</span>
                    <span className="shortlist-meta">
                      {job.shortlisted} Shortlisted • {job.interviews} Intv
                    </span>
                  </div>
                  <span className="job-status-chip">{job.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
