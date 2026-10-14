import React, { useState, useEffect } from 'react';
import {
  Briefcase,
  Users,
  Calendar,
  Zap,
  Bell,
  Clock,
  ShieldCheck,
  FileText,
  ArrowRight,
  User,
  AlertCircle,
  RotateCw,
} from 'lucide-react';
import { companyRecruitmentData } from '../../services/mockData';
import { Link } from 'react-router-dom';
import './Dashboard.css';

// Smooth Eased Numerical Count-Up Component
const CountUpNumber = ({ value = 0, duration = 1400, animationKey = 0 }) => {
  const [displayVal, setDisplayVal] = useState(0);

  useEffect(() => {
    let animFrame;
    let startTime = null;
    setDisplayVal(0);

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Fluid easeOutCubic curve
      const ease = 1 - Math.pow(1 - progress, 3);
      setDisplayVal(Math.round(ease * value));

      if (progress < 1) {
        animFrame = requestAnimationFrame(step);
      } else {
        setDisplayVal(value);
      }
    };

    const timer = setTimeout(() => {
      animFrame = requestAnimationFrame(step);
    }, 50);

    return () => {
      clearTimeout(timer);
      if (animFrame) cancelAnimationFrame(animFrame);
    };
  }, [value, duration, animationKey]);

  return <>{displayVal.toLocaleString()}</>;
};

// SVG Donut Chart with central total metric, multi-stop gradients, ambient aura, and animated stroke sweep
const SummaryDonutChart = ({
  total,
  slices,
  size = 146,
  strokeWidth = 19,
  animationKey = 0,
  chartId = 'donut-0',
  glowColor = 'rgba(37, 99, 235, 0.35)',
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  const [animProgress, setAnimProgress] = useState(0);

  useEffect(() => {
    let animFrame;
    let startTime = null;
    const duration = 1350;
    setAnimProgress(0);

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(1, elapsed / duration);
      const ease = 1 - Math.pow(1 - progress, 3);
      setAnimProgress(ease);

      if (progress < 1) {
        animFrame = requestAnimationFrame(step);
      } else {
        setAnimProgress(1);
      }
    };

    const timer = setTimeout(() => {
      animFrame = requestAnimationFrame(step);
    }, 50);

    return () => {
      clearTimeout(timer);
      if (animFrame) cancelAnimationFrame(animFrame);
    };
  }, [total, animationKey]);

  const renderedSlices = slices.map((slice, index) => {
    const rawPercent = total > 0 ? (slice.value / total) * 100 : 0;
    const percent = rawPercent * animProgress;
    const strokeLength = (percent / 100) * circumference;
    const gap = slices.length > 1 ? 2.5 : 0;
    const adjustedLength = Math.max(0, strokeLength - gap);
    const strokeDasharray = `${adjustedLength} ${circumference - adjustedLength}`;
    const prevPercentSum = slices
      .slice(0, index)
      .reduce((sum, s) => sum + (total > 0 ? (s.value / total) * 100 : 0), 0) * animProgress;
    const strokeDashoffset = -((prevPercentSum / 100) * circumference);

    return {
      ...slice,
      strokeDasharray,
      strokeDashoffset,
      percentStr: `${rawPercent.toFixed(1)}%`,
    };
  });

  // Dynamic sweeping rotation from -270deg to -90deg on load
  const currentRotation = -270 + animProgress * 180;

  return (
    <div className="summary-donut-container" style={{ width: size, height: size }}>
      {/* Ambient Breathing Aura Glow */}
      <div
        className="summary-donut-aura-halo"
        style={{
          background: `radial-gradient(circle, ${glowColor} 0%, rgba(255, 255, 255, 0) 72%)`,
        }}
      />

      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="summary-donut-svg">
        <defs>
          {slices.map((slice, index) => (
            <linearGradient
              key={`grad-${index}`}
              id={`donutGrad-${chartId}-${index}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor={slice.colorStart || slice.color} />
              <stop offset="100%" stopColor={slice.colorEnd || slice.colorStart || slice.color} />
            </linearGradient>
          ))}
          <filter id={`donutGlow-${chartId}`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="3.5" floodColor={glowColor} floodOpacity="0.75" />
          </filter>
        </defs>

        {/* Subtle inner dial ring */}
        <circle
          cx={center}
          cy={center}
          r={radius - strokeWidth / 2 - 2}
          fill="#FAFCFF"
          stroke="rgba(226, 232, 240, 0.7)"
          strokeWidth="1.5"
        />
        {/* Background track */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#F1F5F9"
          strokeWidth={strokeWidth}
        />

        {/* Animated Rotating Gradient Slices Group */}
        <g transform={`rotate(${currentRotation} ${center} ${center})`}>
          {renderedSlices.map((slice, index) => (
            <circle
              key={index}
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke={`url(#donutGrad-${chartId}-${index})`}
              strokeWidth={strokeWidth}
              strokeDasharray={slice.strokeDasharray}
              strokeDashoffset={slice.strokeDashoffset}
              strokeLinecap="butt"
              filter={`url(#donutGlow-${chartId})`}
              className="summary-donut-slice"
            >
              <title>{`${slice.label}: ${slice.value} (${slice.percentStr})`}</title>
            </circle>
          ))}
        </g>
      </svg>
      <div className="summary-donut-inner">
        <span
          className="summary-donut-number"
          style={{
            background: `linear-gradient(135deg, #0F172A 35%, ${slices[0]?.colorStart || '#2563EB'} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          <CountUpNumber value={total} duration={1250} animationKey={animationKey} />
        </span>
        <span className="summary-donut-label">Total</span>
      </div>
    </div>
  );
};

// 4-Tier SVG Funnel Chart with modern gradients, depth glow & soft shadow
const SummaryFunnelChart = ({ steps, chartId = 'candidate' }) => {
  const tiers = [
    { x1: 6, x2: 174, y1: 0, x3: 159, x4: 21, y2: 28 },
    { x1: 23, x2: 157, y1: 32, x3: 142, x4: 38, y2: 60 },
    { x1: 40, x2: 140, y1: 64, x3: 126, x4: 54, y2: 92 },
    { x1: 56, x2: 124, y1: 96, x3: 111, x4: 69, y2: 124 },
  ];

  return (
    <div className="summary-funnel-container">
      {/* Ambient Halo Behind Funnel */}
      <div
        className="summary-donut-aura-halo"
        style={{
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.32) 0%, rgba(255, 255, 255, 0) 72%)',
          width: 176,
          height: 130,
        }}
      />
      <svg width="180" height="126" viewBox="0 0 180 126" className="summary-funnel-svg">
        <defs>
          <filter id={`funnelGlow-${chartId}`} x="-15%" y="-15%" width="130%" height="135%">
            <feDropShadow dx="0" dy="3" stdDeviation="3.5" floodColor="rgba(15, 23, 42, 0.16)" />
          </filter>
          <linearGradient id={`funnelGrad-${chartId}-0`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#38BDF8" />
          </linearGradient>
          <linearGradient id={`funnelGrad-${chartId}-1`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="100%" stopColor="#34D399" />
          </linearGradient>
          <linearGradient id={`funnelGrad-${chartId}-2`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#FBBF24" />
          </linearGradient>
          <linearGradient id={`funnelGrad-${chartId}-3`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DC2626" />
            <stop offset="100%" stopColor="#F87171" />
          </linearGradient>
        </defs>
        {steps.map((step, index) => {
          const tier = tiers[index] || tiers[0];
          const textY = (tier.y1 + tier.y2) / 2 + 5;
          return (
            <g key={index} className="summary-funnel-group">
              <polygon
                points={`${tier.x1},${tier.y1} ${tier.x2},${tier.y1} ${tier.x3},${tier.y2} ${tier.x4},${tier.y2}`}
                fill={`url(#funnelGrad-${chartId}-${index})`}
                stroke="rgba(255, 255, 255, 0.45)"
                strokeWidth="1.2"
                strokeLinejoin="round"
                filter={`url(#funnelGlow-${chartId})`}
                className="funnel-tier-poly"
              />
              <text
                x="90"
                y={textY}
                fill="#ffffff"
                textAnchor="middle"
                fontWeight="800"
                fontSize="13.5"
                fontFamily="inherit"
                style={{ textShadow: '0 1px 3px rgba(0,0,0,0.45)', letterSpacing: '0.02em' }}
              >
                {step.value}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

// SVG Circular Radial Gauge Chart with Mobile Fast-Charging Glow Animation & Target Landing Sweep
const QuotaGaugeChart = ({
  percent,
  colorStart = '#2563EB',
  colorEnd = '#38BDF8',
  glowColor = 'rgba(37, 99, 235, 0.45)',
  id = 'gauge-0',
  size = 100,
  strokeWidth = 9.5,
  label = 'USED',
  animationKey = 0,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedPercent = Math.min(100, Math.max(0, percent));
  const center = size / 2;
  const innerRadius = radius - strokeWidth / 2 - 2.5;

  const [animProgress, setAnimProgress] = useState(0);

  useEffect(() => {
    let animFrame;
    let startTime = null;
    const duration = 1450; // 1.45s fluid spin & sweep

    setAnimProgress(0);

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Fluid easeOutCubic: starts swift, gently slows into target
      const ease = 1 - Math.pow(1 - progress, 3);
      setAnimProgress(ease);

      if (progress < 1) {
        animFrame = requestAnimationFrame(step);
      } else {
        setAnimProgress(1);
      }
    };

    const timer = setTimeout(() => {
      animFrame = requestAnimationFrame(step);
    }, 60);

    return () => {
      clearTimeout(timer);
      if (animFrame) cancelAnimationFrame(animFrame);
    };
  }, [clampedPercent, animationKey]);

  // Current values during animation
  const currentPercent = animProgress * clampedPercent;
  const arcLength = (currentPercent / 100) * circumference;
  // "curcle suthithi target la nikanu"
  // Spins from -360deg into standard 12 o'clock (-90deg) and lands on target!
  const currentRotation = -360 + animProgress * 270;

  return (
    <div className="quota-gauge-container" style={{ width: size, height: size }}>
      {/* Mobile Charging Breathing Aura Glow */}
      <div
        className="charging-aura-halo"
        style={{
          background: `radial-gradient(circle, ${glowColor} 0%, rgba(255, 255, 255, 0) 70%)`,
        }}
      />

      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="quota-gauge-svg">
        <defs>
          <linearGradient id={`gaugeGrad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colorStart} />
            <stop offset="100%" stopColor={colorEnd} />
          </linearGradient>
          <filter id={`gaugeGlow-${id}`} x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="0" stdDeviation="4.5" floodColor={glowColor} floodOpacity="0.8" />
          </filter>
        </defs>

        {/* Soft dial face */}
        <circle
          cx={center}
          cy={center}
          r={innerRadius}
          fill="#FAFCFF"
          stroke="rgba(226, 232, 240, 0.65)"
          strokeWidth="1.2"
        />

        {/* Soft background track */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#F1F5F9"
          strokeWidth={strokeWidth}
        />

        {/* Main Charged Energy Arc (Spins around and lands on target) */}
        <g transform={`rotate(${currentRotation} ${center} ${center})`}>
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={`url(#gaugeGrad-${id})`}
            strokeWidth={strokeWidth}
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeDashoffset={0}
            strokeLinecap="round"
            filter={`url(#gaugeGlow-${id})`}
            className="quota-gauge-arc"
          />
        </g>
      </svg>

      <div className="quota-gauge-inner">
        <span
          className="quota-gauge-num"
          style={{
            background: `linear-gradient(135deg, #0F172A 45%, ${colorStart} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {currentPercent.toFixed(clampedPercent % 1 === 0 ? 0 : 1)}%
        </span>
        <span className="gauge-charging-badge">
          <Zap size={9} className="charging-bolt" style={{ color: colorStart }} />
          <span>{label}</span>
        </span>
      </div>
    </div>
  );
};

export const Dashboard = () => {
  const [animationKey, setAnimationKey] = useState(0);

  const {
    companyProfile,
    jobSummary,
    candidateSummary,
    screeningSummary,
    interviewSummary,
    planUsage,
    importantAlerts,
    upcomingInterviewsList,
    activeJobsOverview,
  } = companyRecruitmentData;

  const quotaItems = [
    {
      id: 'jobs',
      title: 'Job Postings Limit',
      unit: 'jobs',
      used: planUsage.jobs.used,
      total: planUsage.jobs.total,
      remaining: planUsage.jobs.remaining,
      percent: (planUsage.jobs.used / planUsage.jobs.total) * 100,
      badge: `${planUsage.jobs.remaining} Left`,
      badgeClass: 'green',
      icon: Briefcase,
      colorStart: '#2563EB',
      colorEnd: '#38BDF8',
      glowColor: 'rgba(37, 99, 235, 0.4)',
      classKey: 'job',
      label: 'USED',
      subMeta: `${planUsage.jobs.remaining} jobs remaining`,
    },
    {
      id: 'alerts',
      title: 'Candidate Alerts Quota',
      unit: 'alerts',
      used: planUsage.alerts?.used || 1450,
      total: planUsage.alerts?.total || 2000,
      remaining: planUsage.alerts?.remaining || 550,
      percent: ((planUsage.alerts?.used || 1450) / (planUsage.alerts?.total || 2000)) * 100,
      badge: `${planUsage.alerts?.remaining || 550} Left`,
      badgeClass: 'teal',
      icon: Bell,
      colorStart: '#0D9488',
      colorEnd: '#34D399',
      glowColor: 'rgba(13, 148, 136, 0.4)',
      classKey: 'alerts',
      label: 'USED',
      subMeta: `${planUsage.alerts?.remaining || 550} alerts left`,
    },
    {
      id: 'resumes',
      title: 'Resume Database Access',
      unit: 'profiles',
      used: planUsage.resumes.used,
      total: planUsage.resumes.total,
      remaining: planUsage.resumes.remaining,
      percent: (planUsage.resumes.used / planUsage.resumes.total) * 100,
      badge: `${planUsage.resumes.remaining} Left`,
      badgeClass: 'amber',
      icon: FileText,
      colorStart: '#EA580C',
      colorEnd: '#FBBF24',
      glowColor: 'rgba(234, 88, 12, 0.4)',
      classKey: 'resumes',
      label: 'USED',
      subMeta: `${planUsage.resumes.remaining} unlocks left`,
    },
    {
      id: 'screenings',
      title: 'Screening Assessments',
      unit: 'assessments',
      used: planUsage.screenings.used,
      total: planUsage.screenings.total,
      remaining: planUsage.screenings.remaining,
      percent: (planUsage.screenings.used / planUsage.screenings.total) * 100,
      badge: `${planUsage.screenings.remaining} Left`,
      badgeClass: 'purple',
      icon: ShieldCheck,
      colorStart: '#7C3AED',
      colorEnd: '#E879F9',
      glowColor: 'rgba(124, 58, 237, 0.4)',
      classKey: 'screenings',
      label: 'USED',
      subMeta: `${planUsage.screenings.remaining} assessments left`,
    },
    {
      id: 'seats',
      title: 'HR Recruiter Seats',
      unit: 'active seats',
      used: planUsage.userSeats.used,
      total: planUsage.userSeats.total,
      remaining: planUsage.userSeats.remaining,
      percent: (planUsage.userSeats.used / planUsage.userSeats.total) * 100,
      badge: `${planUsage.userSeats.remaining} Available`,
      badgeClass: 'green',
      icon: Users,
      colorStart: '#059669',
      colorEnd: '#4ADE80',
      glowColor: 'rgba(16, 185, 129, 0.4)',
      classKey: 'seats',
      label: 'ALLOCATED',
      subMeta: `${planUsage.userSeats.remaining} seats open`,
    },
  ];

  const alertCards = [
    {
      id: 'ALT-1',
      badge: 'UPCOMING INTERVIEW',
      count: 1,
      icon: User,
      title: 'Senior Frontend Engineer Interview',
      metaIcon: Clock,
      metaText: 'Today, 02:00 PM',
      link: '/interviews',
      classKey: 'blue',
    },
    {
      id: 'ALT-2',
      badge: 'PENDING ACTION',
      count: 3,
      icon: FileText,
      title: 'Candidates Awaiting Screening Assessment',
      metaIcon: Users,
      metaText: '3 candidates',
      link: '/screenings',
      classKey: 'orange',
    },
    {
      id: 'ALT-3',
      badge: 'PLAN LIMIT WARNING',
      count: 1,
      icon: AlertCircle,
      title: 'Resume Access Quota at 68%',
      metaIcon: Clock,
      metaText: '340 / 500 used',
      link: '/subscription',
      classKey: 'purple',
    },
    {
      id: 'ALT-4',
      badge: 'SUBSCRIPTION RENEWAL',
      count: 1,
      icon: RotateCw,
      title: 'Enterprise Pro Plan Renewal',
      metaIcon: Calendar,
      metaText: 'In 20 days',
      link: '/subscription',
      classKey: 'green',
    },
  ];

  return (
    <div className="dashboard-page animate-fade-in">
      {/* 1. Top Header Row: Dashboard Title */}
      <div className="dashboard-header-row">
        <h1 className="dashboard-page-title">Dashboard</h1>
      </div>

      {/* 2. Important Alerts Section (Matches Reference Image) */}
      <section className="dashboard-alerts-card">
        <div className="alerts-card-header">
          <div className="alerts-title-box">
            <div className="alerts-icon-ring">
              <Bell size={18} />
            </div>
            <div>
              <h2 className="alerts-heading">Important Alerts & Pending Items</h2>
              <p className="alerts-subtext">Quick view of what needs your attention</p>
            </div>
          </div>
          <Link to="/notifications" className="alerts-count-tag" title="View all active notifications">
            <span>4 Active Alerts</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        <div className="alerts-quad-grid">
          {alertCards.map((alert) => {
            const Icon = alert.icon;
            const MetaIcon = alert.metaIcon;
            return (
              <Link
                key={alert.id}
                to={alert.link}
                className={`premium-alert-item ${alert.classKey}`}
              >
                {/* Top Row: Icon + Badge + Count */}
                <div className="alert-item-top">
                  <div className="alert-top-left">
                    <div className="alert-type-icon">
                      <Icon size={14} />
                    </div>
                    <span className="alert-category-pill">{alert.badge}</span>
                  </div>
                  <span className="alert-count-badge">{alert.count}</span>
                </div>

                {/* Middle: Title */}
                <h4 className="alert-headline">{alert.title}</h4>

                {/* Bottom Row: Meta Info + Arrow Action */}
                <div className="alert-item-bottom">
                  <span className="alert-meta-info">
                    <MetaIcon size={13} />
                    <span>{alert.metaText}</span>
                  </span>
                  <div className="alert-action-arrow">
                    <ArrowRight size={13} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3. Core Recruitment Summaries (Quad 2x2 Grid) */}
      <div className="summaries-quad-grid">
        {/* Card 1: Job Summary */}
        <div className="summary-quad-card card-job-summary">
          <div className="summary-quad-header">
            <div className="summary-header-left">
              <div className="summary-header-icon">
                <Briefcase size={20} />
              </div>
              <div className="summary-header-titles">
                <h3 className="summary-card-title">Job Summary</h3>
                <span className="summary-card-subtitle">Active & Closed Roles</span>
              </div>
            </div>
            <div className="summary-header-right">
              <span
                className="summary-header-total"
                style={{
                  background: 'linear-gradient(135deg, #0F172A 25%, #2563EB 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                <CountUpNumber value={jobSummary.total} duration={1250} animationKey={animationKey} />
              </span>
              <span className="summary-header-total-label">Total Roles</span>
            </div>
          </div>

          <div className="summary-card-body">
            <div className="summary-visual-side">
              <SummaryDonutChart
                total={jobSummary.total}
                chartId="job"
                glowColor="rgba(37, 99, 235, 0.38)"
                slices={[
                  { label: 'Active', value: jobSummary.active, colorStart: '#10B981', colorEnd: '#34D399' },
                  { label: 'Draft', value: jobSummary.draft, colorStart: '#2563EB', colorEnd: '#38BDF8' },
                  { label: 'Paused', value: jobSummary.paused, colorStart: '#F59E0B', colorEnd: '#FBBF24' },
                  { label: 'Filled', value: jobSummary.filled, colorStart: '#7C3AED', colorEnd: '#C084FC' },
                  { label: 'Closed', value: jobSummary.closed, colorStart: '#64748B', colorEnd: '#94A3B8' },
                ]}
                animationKey={animationKey}
              />
            </div>
            <div className="summary-legend-side">
              <div className="summary-legend-row">
                <div className="legend-label-wrap">
                  <span className="legend-color-dot dot-emerald" />
                  <span className="legend-name">Active</span>
                </div>
                <span className="legend-count">{jobSummary.active}</span>
                <span className="legend-pct">40%</span>
              </div>
              <div className="summary-legend-row">
                <div className="legend-label-wrap">
                  <span className="legend-color-dot dot-blue" />
                  <span className="legend-name">Draft</span>
                </div>
                <span className="legend-count">{jobSummary.draft}</span>
                <span className="legend-pct">10%</span>
              </div>
              <div className="summary-legend-row">
                <div className="legend-label-wrap">
                  <span className="legend-color-dot dot-amber" />
                  <span className="legend-name">Paused</span>
                </div>
                <span className="legend-count">{jobSummary.paused}</span>
                <span className="legend-pct">7%</span>
              </div>
              <div className="summary-legend-row">
                <div className="legend-label-wrap">
                  <span className="legend-color-dot dot-purple" />
                  <span className="legend-name">Filled</span>
                </div>
                <span className="legend-count">{jobSummary.filled}</span>
                <span className="legend-pct">27%</span>
              </div>
              <div className="summary-legend-row">
                <div className="legend-label-wrap">
                  <span className="legend-color-dot dot-slate" />
                  <span className="legend-name">Closed</span>
                </div>
                <span className="legend-count">{jobSummary.closed}</span>
                <span className="legend-pct">17%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Candidate Summary */}
        <div className="summary-quad-card card-candidate-summary">
          <div className="summary-quad-header">
            <div className="summary-header-left">
              <div className="summary-header-icon">
                <Users size={20} />
              </div>
              <div className="summary-header-titles">
                <h3 className="summary-card-title">Candidate Summary</h3>
                <span className="summary-card-subtitle">Talent Pipeline Funnel</span>
              </div>
            </div>
            <div className="summary-header-right">
              <span
                className="summary-header-total"
                style={{
                  background: 'linear-gradient(135deg, #0F172A 25%, #059669 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                <CountUpNumber value={candidateSummary.total} duration={1250} animationKey={animationKey} />
              </span>
              <span className="summary-header-total-label">Total Candidates</span>
            </div>
          </div>

          <div className="summary-card-body">
            <div className="summary-visual-side">
              <SummaryFunnelChart
                chartId="candidate"
                steps={[
                  { label: 'Matched', value: candidateSummary.matched },
                  { label: 'Interested', value: candidateSummary.interested },
                  { label: 'Shortlisted', value: candidateSummary.shortlisted },
                  { label: 'Rejected', value: candidateSummary.rejected },
                ]}
              />
            </div>
            <div className="summary-legend-side">
              <div className="summary-legend-row">
                <div className="legend-label-wrap">
                  <span className="legend-color-dot dot-blue" />
                  <span className="legend-name">Matched</span>
                </div>
                <span className="legend-count">{candidateSummary.matched}</span>
                <span className="legend-pct">56.1%</span>
              </div>
              <div className="summary-legend-row">
                <div className="legend-label-wrap">
                  <span className="legend-color-dot dot-emerald" />
                  <span className="legend-name">Interested</span>
                </div>
                <span className="legend-count">{candidateSummary.interested}</span>
                <span className="legend-pct">25.1%</span>
              </div>
              <div className="summary-legend-row">
                <div className="legend-label-wrap">
                  <span className="legend-color-dot dot-amber" />
                  <span className="legend-name">Shortlisted</span>
                </div>
                <span className="legend-count">{candidateSummary.shortlisted}</span>
                <span className="legend-pct">8.0%</span>
              </div>
              <div className="summary-legend-row">
                <div className="legend-label-wrap">
                  <span className="legend-color-dot dot-rose" />
                  <span className="legend-name">Rejected</span>
                </div>
                <span className="legend-count">{candidateSummary.rejected}</span>
                <span className="legend-pct">10.8%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Screening Summary */}
        <div className="summary-quad-card card-screening-summary">
          <div className="summary-quad-header">
            <div className="summary-header-left">
              <div className="summary-header-icon">
                <ShieldCheck size={20} />
              </div>
              <div className="summary-header-titles">
                <h3 className="summary-card-title">Screening Summary</h3>
                <span className="summary-card-subtitle">AI & Skill Tests</span>
              </div>
            </div>
            <div className="summary-header-right">
              <span
                className="summary-header-total"
                style={{
                  background: 'linear-gradient(135deg, #0F172A 25%, #D97706 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                <CountUpNumber value={screeningSummary.total} duration={1250} animationKey={animationKey} />
              </span>
              <span className="summary-header-total-label">Total Screened</span>
            </div>
          </div>

          <div className="summary-card-body">
            <div className="summary-visual-side">
              <SummaryDonutChart
                total={screeningSummary.total}
                chartId="screening"
                glowColor="rgba(217, 119, 6, 0.38)"
                slices={[
                  { label: 'Pending', value: screeningSummary.pending, colorStart: '#F59E0B', colorEnd: '#FBBF24' },
                  { label: 'Completed', value: screeningSummary.completed, colorStart: '#10B981', colorEnd: '#34D399' },
                ]}
                animationKey={animationKey}
              />
            </div>
            <div className="summary-legend-side">
              <div className="summary-legend-row">
                <div className="legend-label-wrap">
                  <span className="legend-color-dot dot-amber" />
                  <span className="legend-name">Pending</span>
                </div>
                <span className="legend-count">{screeningSummary.pending}</span>
                <span className="legend-pct">14.5%</span>
              </div>
              <div className="summary-legend-row">
                <div className="legend-label-wrap">
                  <span className="legend-color-dot dot-emerald" />
                  <span className="legend-name">Completed</span>
                </div>
                <span className="legend-count">{screeningSummary.completed}</span>
                <span className="legend-pct">85.5%</span>
              </div>
              <div className="summary-legend-row">
                <div className="legend-label-wrap">
                  <span className="legend-color-dot dot-blue" />
                  <span className="legend-name">Pass Rate</span>
                </div>
                <div className="legend-bar-wrap">
                  <div className="legend-bar-fill animated-shimmer-bar" style={{ width: '79.2%' }} />
                </div>
                <span className="legend-pct">79.2%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 4: Interview Summary */}
        <div className="summary-quad-card card-interview-summary">
          <div className="summary-quad-header">
            <div className="summary-header-left">
              <div className="summary-header-icon">
                <Calendar size={20} />
              </div>
              <div className="summary-header-titles">
                <h3 className="summary-card-title">Interview Summary</h3>
                <span className="summary-card-subtitle">Scheduled Video & F2F</span>
              </div>
            </div>
            <div className="summary-header-right">
              <span
                className="summary-header-total"
                style={{
                  background: 'linear-gradient(135deg, #0F172A 25%, #7C3AED 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                <CountUpNumber value={interviewSummary.total} duration={1250} animationKey={animationKey} />
              </span>
              <span className="summary-header-total-label">Total Interviews</span>
            </div>
          </div>

          <div className="summary-card-body">
            <div className="summary-visual-side">
              <SummaryDonutChart
                total={interviewSummary.total}
                chartId="interview"
                glowColor="rgba(124, 58, 237, 0.38)"
                slices={[
                  { label: 'Upcoming', value: interviewSummary.upcoming, colorStart: '#2563EB', colorEnd: '#38BDF8' },
                  { label: 'Completed', value: interviewSummary.completed, colorStart: '#10B981', colorEnd: '#34D399' },
                  { label: 'Cancelled', value: interviewSummary.cancelled, colorStart: '#EF4444', colorEnd: '#F87171' },
                ]}
                animationKey={animationKey}
              />
            </div>
            <div className="summary-legend-side">
              <div className="summary-legend-row">
                <div className="legend-label-wrap">
                  <span className="legend-color-dot dot-blue" />
                  <span className="legend-name">Upcoming</span>
                </div>
                <span className="legend-count">{interviewSummary.upcoming}</span>
                <span className="legend-pct">14.3%</span>
              </div>
              <div className="summary-legend-row">
                <div className="legend-label-wrap">
                  <span className="legend-color-dot dot-emerald" />
                  <span className="legend-name">Completed</span>
                </div>
                <span className="legend-count">{interviewSummary.completed}</span>
                <span className="legend-pct">80.4%</span>
              </div>
              <div className="summary-legend-row">
                <div className="legend-label-wrap">
                  <span className="legend-color-dot dot-rose" />
                  <span className="legend-name">Cancelled</span>
                </div>
                <span className="legend-count">{interviewSummary.cancelled}</span>
                <span className="legend-pct">5.4%</span>
              </div>
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
          </div>

          <div className="plan-header-controls">
            <Link to="/subscription" className="btn-plan-manage">
              <Zap size={14} />
              <span>Manage Plan Limits</span>
            </Link>
          </div>
        </div>

        <div className="plan-quotas-five-grid">
          {quotaItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.id} className={`quota-metric-box ${item.classKey}`}>
                {/* Card Top Row: Icon + Badge (Never clips) */}
                <div className="quota-box-top-row">
                  <div className={`quota-mini-icon ${item.classKey}`}>
                    <Icon size={15} />
                  </div>
                  <span className={`quota-status-pill ${item.badgeClass}`}>
                    <span className="status-ping-dot" />
                    {item.badge}
                  </span>
                </div>

                {/* Quota Headline (Full width, perfectly readable) */}
                <div className="quota-box-title-wrap">
                  <h4 className="quota-card-headline">{item.title}</h4>
                </div>

                {/* Visual Radial Gauge Chart with gradient, dial face and target sweep */}
                <QuotaGaugeChart
                  percent={item.percent}
                  colorStart={item.colorStart}
                  colorEnd={item.colorEnd}
                  glowColor={item.glowColor}
                  id={item.id}
                  size={96}
                  strokeWidth={9}
                  label={item.label}
                  animationKey={0}
                />

                {/* Numerical Counts with Animated Counter */}
                <div className="quota-figures">
                  <span className="quota-active-val">
                    <CountUpNumber value={item.used} duration={1450} animationKey={0} />
                  </span>
                  <span className="quota-total-val">/ {item.total.toLocaleString()} {item.unit}</span>
                </div>

                {/* Non-Wrapping Unified Stat Ribbon */}
                <div className="quota-pill-ribbon">
                  <div className="ribbon-segment used">
                    <span className="ribbon-dot" style={{ backgroundColor: item.colorStart, boxShadow: `0 0 6px ${item.glowColor}` }} />
                    <span className="ribbon-val">
                      <CountUpNumber value={item.used} duration={1450} animationKey={0} />
                    </span>
                    <span className="ribbon-lbl">Used</span>
                  </div>
                  <span className="ribbon-divider" />
                  <div className="ribbon-segment left">
                    <span className="ribbon-dot left-dot" />
                    <span className="ribbon-val">
                      <CountUpNumber value={item.remaining} duration={1450} animationKey={0} />
                    </span>
                    <span className="ribbon-lbl">{item.id === 'seats' ? 'Open' : 'Left'}</span>
                  </div>
                </div>
              </div>
            );
          })}
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
