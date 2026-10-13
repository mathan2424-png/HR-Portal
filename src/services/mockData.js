/**
 * Company-Side Recruitment & Subscription Admin Mock Data
 * Aligned with Section 2.1 Dashboard specifications
 */

export const companyRecruitmentData = {
  companyProfile: {
    name: 'Marutham Technologies Pvt. Ltd.',
    subdomain: 'marutham.hrportal.in',
    plan: 'Enterprise Pro',
    renewalDate: '2026-11-01',
    activeHRUsers: 7,
    maxHRUsers: 10,
  },

  // 1. Job Summary: Active, draft, paused, closed and filled jobs
  jobSummary: {
    total: 30,
    active: 12,
    draft: 3,
    paused: 2,
    closed: 5,
    filled: 8,
  },

  // 2. Candidate Summary: Matched, interested, shortlisted and rejected candidates
  candidateSummary: {
    total: 855,
    matched: 480,
    interested: 215,
    shortlisted: 68,
    rejected: 92,
  },

  // 3. Screening Summary: Pending and completed screenings
  screeningSummary: {
    total: 166,
    pending: 24,
    completed: 142,
    passRate: '79.2%',
  },

  // 4. Interview Summary: Upcoming, completed and cancelled interviews
  interviewSummary: {
    total: 56,
    upcoming: 8,
    completed: 45,
    cancelled: 3,
  },

  // 5. Hiring Summary: Offers, accepted offers and hires
  hiringSummary: {
    offersSent: 14,
    offersAccepted: 11,
    hired: 10,
    acceptanceRate: '78.6%',
  },

  // 6. Plan Usage: Used and remaining jobs, alerts, resume access, screening and user seats
  planUsage: {
    jobs: {
      used: 12,
      total: 20,
      remaining: 8,
      unit: 'Active Jobs',
    },
    alerts: {
      used: 1450,
      total: 2000,
      remaining: 550,
      unit: 'Candidate Alerts',
    },
    resumes: {
      used: 340,
      total: 500,
      remaining: 160,
      unit: 'Resumes Viewed',
    },
    screenings: {
      used: 166,
      total: 250,
      remaining: 84,
      unit: 'Screenings',
    },
    userSeats: {
      used: 7,
      total: 10,
      remaining: 3,
      unit: 'HR Seats',
    },
  },

  // 7. Important Alerts: Upcoming interviews, pending actions, plan-limit alerts and subscription alerts
  importantAlerts: [
    {
      id: 'ALT-1',
      type: 'interview',
      badge: 'Upcoming Interview',
      title: 'Senior Frontend Engineer Interview in 45 mins',
      description: 'Candidate: Rithesh K with Technical Lead Sundar Raman',
      time: 'Today, 02:00 PM',
      severity: 'info',
    },
    {
      id: 'ALT-2',
      type: 'action',
      badge: 'Pending Action',
      title: '3 Candidates Awaiting Screening Assessment',
      description: 'Role: Product Designer - Review pending automated AI test scorecards',
      time: 'Requires Attention',
      severity: 'warning',
    },
    {
      id: 'ALT-3',
      type: 'plan_limit',
      badge: 'Plan Limit Warning',
      title: 'Resume Access Quota at 68% Usage',
      description: '160 of 500 candidate resume profile unlocks remaining this billing cycle',
      time: 'Quota Notice',
      severity: 'warning',
    },
    {
      id: 'ALT-4',
      type: 'subscription',
      badge: 'Subscription Renewal',
      title: 'Enterprise Pro Plan Renews on Nov 1, 2026',
      description: 'Annual billing with 10 HR seats and premium ATS features',
      time: 'In 20 Days',
      severity: 'success',
    },
  ],

  // Upcoming Interviews Schedule
  upcomingInterviewsList: [
    {
      id: 'INT-01',
      candidateName: 'Rithesh K',
      candidateAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
      jobTitle: 'Senior Frontend Engineer',
      interviewer: 'Sundar Raman (Tech Lead)',
      dateTime: 'Today, 02:00 PM',
      type: 'Technical Round 2',
      status: 'Confirmed',
    },
    {
      id: 'INT-02',
      candidateName: 'Nathiya  Dharshini M',
      candidateAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
      jobTitle: 'Product Design Lead',
      interviewer: 'Anitha Murugesan (VP Design)',
      dateTime: 'Tomorrow, 11:30 AM',
      type: 'Portfolio Review',
      status: 'Confirmed',
    },
    {
      id: 'INT-03',
      candidateName: 'Kavitha Ramachandran',
      candidateAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      jobTitle: 'DevOps & Cloud Architect',
      interviewer: 'Saravanan S & HR Panel',
      dateTime: 'Oct 15, 03:00 PM',
      type: 'Cultural & Values',
      status: 'Confirmed',
    },
  ],

  // Recent Active Jobs
  activeJobsOverview: [
    {
      id: 'JOB-101',
      title: 'Senior Frontend Engineer',
      department: 'Engineering',
      matched: 84,
      shortlisted: 12,
      interviews: 4,
      status: 'Active',
      postedDate: '2026-10-02',
    },
    {
      id: 'JOB-102',
      title: 'Lead Product Designer',
      department: 'Design & UX',
      matched: 62,
      shortlisted: 8,
      interviews: 3,
      status: 'Active',
      postedDate: '2026-10-05',
    },
    {
      id: 'JOB-103',
      title: 'HR Operations Manager',
      department: 'Human Resources',
      matched: 45,
      shortlisted: 6,
      interviews: 2,
      status: 'Active',
      postedDate: '2026-10-08',
    },
    {
      id: 'JOB-104',
      title: 'DevOps Architect',
      department: 'Cloud & Infrastructure',
      matched: 38,
      shortlisted: 4,
      interviews: 1,
      status: 'Paused',
      postedDate: '2026-09-28',
    },
  ],
};

export const employeesData = [
  {
    id: 'CAN-001',
    name: 'Rithesh K',
    role: 'Senior Frontend Engineer',
    department: 'Engineering',
    email: 'Rithesh.k@applicant.com',
    status: 'Shortlisted',
    joinDate: '2026-10-02',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    salary: 95000,
  },
  {
    id: 'CAN-002',
    name: 'Nathiya  Dharshini M',
    role: 'Product Design Lead',
    department: 'Design & UX',
    email: 'Nathiya .d@applicant.com',
    status: 'Interested',
    joinDate: '2026-10-05',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    salary: 88000,
  },
  {
    id: 'CAN-003',
    name: 'Kavitha Ramachandran',
    role: 'DevOps & Cloud Architect',
    department: 'Engineering',
    email: 'kavitha.r@applicant.com',
    status: 'Shortlisted',
    joinDate: '2026-10-08',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    salary: 110000,
  },
  {
    id: 'CAN-004',
    name: 'Vigneshwaran P',
    role: 'HR Operations Lead',
    department: 'Human Resources',
    email: 'vigneshwaran.p@applicant.com',
    status: 'Matched',
    joinDate: '2026-10-10',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    salary: 72000,
  },
];

export const hrStats = {
  totalEmployees: 855,
  activeToday: 480,
  onLeave: 24,
  openPositions: 12,
};

export const recentLeaveRequests = [];
export const departmentStats = [];
