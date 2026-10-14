import React, { useState } from 'react';
import {
  Search,
  Filter,
  ChevronRight,
  ChevronLeft,
  ArrowLeft,
  Send,
  CheckCircle,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  Eye,
  Lock,
  Unlock,
  Users,
  Sparkles,
  Briefcase,
  Award,
  CheckSquare,
  Square,
  RefreshCw,
  Layers,
  ShieldCheck,
  FileText,
  DollarSign,
  MapPin,
  Calendar,
  ThumbsUp,
  ThumbsDown,
  HelpCircle,
  UserCheck,
  Check,
  Sliders,
  ChevronDown,
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import './CandidateResponses.css';

// 1. Initial Job-Wise Responses Summary Data (Main Table)
const initialJobsResponseSummary = [
  {
    id: 'JOB-2026-007',
    jobTitle: 'Software Developer',
    department: 'Engineering & Technology',
    publishedDate: '06-Oct-2026',
    totalNotified: 60,
    interestedCount: 45,
    notInterestedCount: 8,
    maybeLaterCount: 5,
    noResponseCount: 2,
    screeningSentCount: 0,
  },
  {
    id: 'JOB-2026-003',
    jobTitle: 'HR Executive',
    department: 'Human Resources',
    publishedDate: '04-Oct-2026',
    totalNotified: 45,
    interestedCount: 28,
    notInterestedCount: 7,
    maybeLaterCount: 6,
    noResponseCount: 4,
    screeningSentCount: 10,
  },
  {
    id: 'JOB-2026-002',
    jobTitle: 'UI/UX Designer',
    department: 'Design & UX',
    publishedDate: '02-Oct-2026',
    totalNotified: 30,
    interestedCount: 16,
    notInterestedCount: 6,
    maybeLaterCount: 5,
    noResponseCount: 3,
    screeningSentCount: 5,
  },
  {
    id: 'JOB-2026-001',
    jobTitle: 'Senior Frontend Engineer',
    department: 'Engineering & Technology',
    publishedDate: '01-Oct-2026',
    totalNotified: 50,
    interestedCount: 38,
    notInterestedCount: 6,
    maybeLaterCount: 4,
    noResponseCount: 2,
    screeningSentCount: 12,
  },
  {
    id: 'JOB-2026-004',
    jobTitle: 'DevOps & Cloud Architect',
    department: 'Engineering & Technology',
    publishedDate: '03-Oct-2026',
    totalNotified: 35,
    interestedCount: 20,
    notInterestedCount: 8,
    maybeLaterCount: 4,
    noResponseCount: 3,
    screeningSentCount: 8,
  },
  {
    id: 'JOB-2026-005',
    jobTitle: 'Enterprise Account Executive',
    department: 'Business Development',
    publishedDate: '05-Oct-2026',
    totalNotified: 25,
    interestedCount: 15,
    notInterestedCount: 5,
    maybeLaterCount: 3,
    noResponseCount: 2,
    screeningSentCount: 4,
  },
];

// 2. Candidate Responses Data for all Published Jobs
const initialCandidatesData = [
  // Candidates for Software Developer (JOB-2026-007)
  {
    id: 'CAN-REF-7011',
    jobId: 'JOB-2026-007',
    candidateName: 'Karthikeyan Selvam',
    permissionGranted: true,
    specialty: 'Full-Stack JavaScript & Node Developer',
    matchScore: 95,
    skillsMatch: '95% (JavaScript, Node.js, React, SQL)',
    skillsMatchedCount: '4/4 Matched',
    experienceMatch: 'Meets Required',
    experienceDetail: '3.5 Yrs (Req: 2 - 5 Yrs)',
    experienceSuitable: true,
    locationMatch: 'Suitable',
    locationDetail: 'Chennai HQ Campus',
    salaryMatch: 'Within Budget',
    salaryDetail: 'Exp: ₹9.5L vs ₹8-14L',
    availability: 'Immediate',
    response: 'Interested',
    responseDate: '12-Oct-2026 04:15 PM',
    screeningStatus: 'Not Sent',
    screeningAssessment: null,
    screeningScore: null,
    screeningResult: null,
    recruitmentStage: 'Interested',
    notes: 'Strong backend logic & portfolio on GitHub. Validated for immediate screening.',
  },
  {
    id: 'CAN-REF-7024',
    jobId: 'JOB-2026-007',
    candidateName: 'Praveen Venkatesh',
    permissionGranted: false,
    specialty: 'Core Java & Spring Boot Developer',
    matchScore: 92,
    skillsMatch: '90% (Java, Spring Boot, Microservices, SQL)',
    skillsMatchedCount: '4/4 Matched',
    experienceMatch: 'Meets Required',
    experienceDetail: '4.0 Yrs (Req: 2 - 5 Yrs)',
    experienceSuitable: true,
    locationMatch: 'Suitable',
    locationDetail: 'Chennai HQ / Hybrid',
    salaryMatch: 'Within Budget',
    salaryDetail: 'Exp: ₹11L vs ₹8-14L',
    availability: '15 Days Notice',
    response: 'Interested',
    responseDate: '12-Oct-2026 02:40 PM',
    screeningStatus: 'Not Sent',
    screeningAssessment: null,
    screeningScore: null,
    screeningResult: null,
    recruitmentStage: 'Interested',
    notes: 'Good experience in enterprise APIs and SQL performance tuning.',
  },
  {
    id: 'CAN-REF-7035',
    jobId: 'JOB-2026-007',
    candidateName: 'Meenakshi Sundaram',
    permissionGranted: true,
    specialty: 'React & Python Full-Stack Engineer',
    matchScore: 89,
    skillsMatch: '85% (React, Python, Django, REST APIs)',
    skillsMatchedCount: '3/4 Matched',
    experienceMatch: 'Meets Required',
    experienceDetail: '3.0 Yrs (Req: 2 - 5 Yrs)',
    experienceSuitable: true,
    locationMatch: 'Suitable',
    locationDetail: 'Chennai HQ Campus',
    salaryMatch: 'Within Budget',
    salaryDetail: 'Exp: ₹10L vs ₹8-14L',
    availability: '30 Days Notice',
    response: 'Interested',
    responseDate: '11-Oct-2026 06:10 PM',
    screeningStatus: 'Not Sent',
    screeningAssessment: null,
    screeningScore: null,
    screeningResult: null,
    recruitmentStage: 'Interested',
    notes: 'Ex-startup engineer, comfortable with full-stack delivery cycles.',
  },
  {
    id: 'CAN-REF-7048',
    jobId: 'JOB-2026-007',
    candidateName: 'Sanjay Krishnan',
    permissionGranted: false,
    specialty: 'Software Engineer - Backend',
    matchScore: 86,
    skillsMatch: '85% (Node.js, PostgreSQL, Docker)',
    skillsMatchedCount: '3/4 Matched',
    experienceMatch: 'Meets Required',
    experienceDetail: '2.5 Yrs (Req: 2 - 5 Yrs)',
    experienceSuitable: true,
    locationMatch: 'Suitable',
    locationDetail: 'Chennai HQ Campus',
    salaryMatch: 'Within Budget',
    salaryDetail: 'Exp: ₹8.5L vs ₹8-14L',
    availability: 'Immediate',
    response: 'Interested',
    responseDate: '11-Oct-2026 11:20 AM',
    screeningStatus: 'Not Sent',
    screeningAssessment: null,
    screeningScore: null,
    screeningResult: null,
    recruitmentStage: 'Interested',
    notes: 'Immediate joiner, eager for backend technical screening.',
  },
  {
    id: 'CAN-REF-7059',
    jobId: 'JOB-2026-007',
    candidateName: 'Deepak Raj',
    permissionGranted: true,
    specialty: 'Junior Software Engineer',
    matchScore: 78,
    skillsMatch: '75% (JavaScript, React.js)',
    skillsMatchedCount: '2/4 Matched',
    experienceMatch: 'Meets Required',
    experienceDetail: '2.0 Yrs (Req: 2 - 5 Yrs)',
    experienceSuitable: true,
    locationMatch: 'Not Suitable',
    locationDetail: 'Bengaluru (Prefers Remote)',
    salaryMatch: 'Within Budget',
    salaryDetail: 'Exp: ₹8L vs ₹8-14L',
    availability: 'Notice Period',
    response: 'Interested',
    responseDate: '10-Oct-2026 03:00 PM',
    screeningStatus: 'Not Sent',
    screeningAssessment: null,
    screeningScore: null,
    screeningResult: null,
    recruitmentStage: 'Interested',
    notes: 'Location suitability requires recruiter review before screening dispatch.',
  },
  {
    id: 'CAN-REF-7062',
    jobId: 'JOB-2026-007',
    candidateName: 'Ashok V',
    permissionGranted: false,
    specialty: 'QA Automation Engineer',
    matchScore: 68,
    skillsMatch: '60% (Python, Selenium)',
    skillsMatchedCount: '1/4 Matched',
    experienceMatch: 'Meets Required',
    experienceDetail: '3.0 Yrs (Req: 2 - 5 Yrs)',
    experienceSuitable: true,
    locationMatch: 'Suitable',
    locationDetail: 'Chennai HQ Campus',
    salaryMatch: 'Within Budget',
    salaryDetail: 'Exp: ₹9L vs ₹8-14L',
    availability: 'Notice Period',
    response: 'Not Interested',
    responseDate: '10-Oct-2026 12:45 PM',
    screeningStatus: 'Not Sent',
    screeningAssessment: null,
    screeningScore: null,
    screeningResult: null,
    recruitmentStage: 'Matched',
    notes: 'Candidate looking strictly for SDET / Test Automation roles.',
  },

  // Candidates for HR Executive (JOB-2026-003)
  {
    id: 'CAN-REF-3008',
    jobId: 'JOB-2026-003',
    candidateName: 'Nathiya Ramesh',
    permissionGranted: true,
    specialty: 'Senior Technical Talent Partner',
    matchScore: 94,
    skillsMatch: '95% (Tech Sourcing, Screening, ATS, Negotiation)',
    skillsMatchedCount: '4/4 Matched',
    experienceMatch: 'Meets Required',
    experienceDetail: '4.5 Yrs (Req: 3 - 6 Yrs)',
    experienceSuitable: true,
    locationMatch: 'Suitable',
    locationDetail: 'Chennai HQ Campus',
    salaryMatch: 'Within Budget',
    salaryDetail: 'Exp: ₹12L vs ₹10-15L',
    availability: 'Immediate',
    response: 'Interested',
    responseDate: '10-Oct-2026 01:15 PM',
    screeningStatus: 'Completed',
    screeningAssessment: 'HR Leadership & Competency Screening',
    screeningScore: 92,
    screeningResult: 'Qualified',
    recruitmentStage: 'Shortlisted',
    notes: 'Scored 92% in screening assessment. Highly qualified for technical recruitment lead.',
  },
  {
    id: 'CAN-REF-3015',
    jobId: 'JOB-2026-003',
    candidateName: 'Divya Bharathi',
    permissionGranted: true,
    specialty: 'HR Operations & Employee Relations',
    matchScore: 90,
    skillsMatch: '90% (Onboarding, HRIS, Talent Acquisition)',
    skillsMatchedCount: '3/4 Matched',
    experienceMatch: 'Meets Required',
    experienceDetail: '4.0 Yrs (Req: 3 - 6 Yrs)',
    experienceSuitable: true,
    locationMatch: 'Suitable',
    locationDetail: 'Chennai HQ Campus',
    salaryMatch: 'Within Budget',
    salaryDetail: 'Exp: ₹11L vs ₹10-15L',
    availability: '15 Days Notice',
    response: 'Interested',
    responseDate: '10-Oct-2026 04:30 PM',
    screeningStatus: 'Pending',
    screeningAssessment: 'HR Leadership & Competency Screening',
    screeningScore: null,
    screeningResult: null,
    recruitmentStage: 'Screening',
    notes: 'Assessment link dispatched via email. Awaiting candidate submission.',
  },
  {
    id: 'CAN-REF-3022',
    jobId: 'JOB-2026-003',
    candidateName: 'Subash Chandra Bose',
    permissionGranted: false,
    specialty: 'Campus Recruiter & Employer Branding',
    matchScore: 84,
    skillsMatch: '80% (Sourcing, Screening, Campus Drives)',
    skillsMatchedCount: '3/4 Matched',
    experienceMatch: 'Meets Required',
    experienceDetail: '3.5 Yrs (Req: 3 - 6 Yrs)',
    experienceSuitable: true,
    locationMatch: 'Suitable',
    locationDetail: 'Chennai HQ Campus',
    salaryMatch: 'Within Budget',
    salaryDetail: 'Exp: ₹10L vs ₹10-15L',
    availability: 'Immediate',
    response: 'Interested',
    responseDate: '11-Oct-2026 10:00 AM',
    screeningStatus: 'Not Sent',
    screeningAssessment: null,
    screeningScore: null,
    screeningResult: null,
    recruitmentStage: 'Interested',
    notes: 'Strong campus hiring background, eligible for assessment dispatch.',
  },

  // Candidates for UI/UX Designer (JOB-2026-002)
  {
    id: 'CAN-REF-2015',
    jobId: 'JOB-2026-002',
    candidateName: 'Aishwarya Lakshmi',
    permissionGranted: true,
    specialty: 'Principal Design System Specialist',
    matchScore: 96,
    skillsMatch: '95% (Figma, Design Systems, UX Research, Prototyping)',
    skillsMatchedCount: '4/4 Matched',
    experienceMatch: 'Meets Required',
    experienceDetail: '6.5 Yrs (Req: 5 - 9 Yrs)',
    experienceSuitable: true,
    locationMatch: 'Suitable',
    locationDetail: 'Coimbatore Tech Park',
    salaryMatch: 'Within Budget',
    salaryDetail: 'Exp: ₹26L vs ₹20-30L',
    availability: 'Immediate',
    response: 'Interested',
    responseDate: '11-Oct-2026 09:30 AM',
    screeningStatus: 'Completed',
    screeningAssessment: 'UI/UX Design Challenge & Systems Thinking',
    screeningScore: 94,
    screeningResult: 'Qualified',
    recruitmentStage: 'Shortlisted',
    notes: 'Flawless design portfolio and passed practical design evaluation.',
  },
  {
    id: 'CAN-REF-2028',
    jobId: 'JOB-2026-002',
    candidateName: 'Harish Kalyan',
    permissionGranted: false,
    specialty: 'Senior Product Designer',
    matchScore: 91,
    skillsMatch: '90% (Figma, Design Systems, UX Research)',
    skillsMatchedCount: '3/4 Matched',
    experienceMatch: 'Meets Required',
    experienceDetail: '6.0 Yrs (Req: 5 - 9 Yrs)',
    experienceSuitable: true,
    locationMatch: 'Suitable',
    locationDetail: 'Coimbatore Tech Park',
    salaryMatch: 'Within Budget',
    salaryDetail: 'Exp: ₹24L vs ₹20-30L',
    availability: '15 Days Notice',
    response: 'Interested',
    responseDate: '11-Oct-2026 02:15 PM',
    screeningStatus: 'Pending',
    screeningAssessment: 'UI/UX Design Challenge & Systems Thinking',
    screeningScore: null,
    screeningResult: null,
    recruitmentStage: 'Screening',
    notes: 'Screening challenge dispatched; due in 4 days.',
  },
  {
    id: 'CAN-REF-2034',
    jobId: 'JOB-2026-002',
    candidateName: 'Monisha V',
    permissionGranted: true,
    specialty: 'SaaS UX & Interaction Designer',
    matchScore: 86,
    skillsMatch: '85% (Figma, Prototyping, Design Systems)',
    skillsMatchedCount: '3/4 Matched',
    experienceMatch: 'Meets Required',
    experienceDetail: '5.2 Yrs (Req: 5 - 9 Yrs)',
    experienceSuitable: true,
    locationMatch: 'Suitable',
    locationDetail: 'Coimbatore Tech Park',
    salaryMatch: 'Within Budget',
    salaryDetail: 'Exp: ₹22L vs ₹20-30L',
    availability: '30 Days Notice',
    response: 'Interested',
    responseDate: '11-Oct-2026 05:40 PM',
    screeningStatus: 'Not Sent',
    screeningAssessment: null,
    screeningScore: null,
    screeningResult: null,
    recruitmentStage: 'Interested',
    notes: 'Portfolio reviewed by lead designer. Eligible for screening dispatch.',
  },

  // Candidates for Senior Frontend Engineer (JOB-2026-001)
  {
    id: 'CAN-REF-1042',
    jobId: 'JOB-2026-001',
    candidateName: 'Rajesh Kumar',
    permissionGranted: true,
    specialty: 'Senior React & Next.js Specialist',
    matchScore: 96,
    skillsMatch: '95% (React.js, TypeScript, Next.js, Redux)',
    skillsMatchedCount: '4/5 Matched',
    experienceMatch: 'Meets Required',
    experienceDetail: '5.5 Yrs (Req: 4 - 8 Yrs)',
    experienceSuitable: true,
    locationMatch: 'Suitable',
    locationDetail: 'Chennai HQ Campus',
    salaryMatch: 'Within Budget',
    salaryDetail: 'Exp: ₹22L vs ₹18-28L',
    availability: 'Immediate',
    response: 'Interested',
    responseDate: '12-Oct-2026 03:45 PM',
    screeningStatus: 'Completed',
    screeningAssessment: 'Frontend Architecture & React 19 Coding Test',
    screeningScore: 92,
    screeningResult: 'Qualified',
    recruitmentStage: 'Shortlisted',
    notes: 'Exceeded pass criteria (Score 92%). Moved to shortlisted stage.',
  },
  {
    id: 'CAN-REF-1038',
    jobId: 'JOB-2026-001',
    candidateName: 'Gopinath Sundaram',
    permissionGranted: true,
    specialty: 'Lead Frontend UI Architect',
    matchScore: 94,
    skillsMatch: '90% (React.js, TypeScript, Next.js, Tailwind)',
    skillsMatchedCount: '4/5 Matched',
    experienceMatch: 'Meets Required',
    experienceDetail: '6.0 Yrs (Req: 4 - 8 Yrs)',
    experienceSuitable: true,
    locationMatch: 'Suitable',
    locationDetail: 'Chennai HQ Campus',
    salaryMatch: 'Within Budget',
    salaryDetail: 'Exp: ₹24L vs ₹18-28L',
    availability: '15 Days Notice',
    response: 'Interested',
    responseDate: '12-Oct-2026 01:20 PM',
    screeningStatus: 'Completed',
    screeningAssessment: 'Frontend Architecture & React 19 Coding Test',
    screeningScore: 71,
    screeningResult: 'Review Required',
    recruitmentStage: 'Screening',
    notes: 'Scored 71% (Threshold 75%). Core React concepts solid, needs review on SSR performance optimization.',
  },
  {
    id: 'CAN-REF-1055',
    jobId: 'JOB-2026-001',
    candidateName: 'Vijay Anand',
    permissionGranted: false,
    specialty: 'Full-Stack React & Node Engineer',
    matchScore: 91,
    skillsMatch: '90% (React.js, Next.js, Redux, Node.js)',
    skillsMatchedCount: '4/5 Matched',
    experienceMatch: 'Meets Required',
    experienceDetail: '4.8 Yrs (Req: 4 - 8 Yrs)',
    experienceSuitable: true,
    locationMatch: 'Suitable',
    locationDetail: 'Chennai HQ Campus',
    salaryMatch: 'Within Budget',
    salaryDetail: 'Exp: ₹20L vs ₹18-28L',
    availability: '30 Days Notice',
    response: 'Interested',
    responseDate: '12-Oct-2026 11:15 AM',
    screeningStatus: 'Pending',
    screeningAssessment: 'Frontend Architecture & React 19 Coding Test',
    screeningScore: null,
    screeningResult: null,
    recruitmentStage: 'Screening',
    notes: 'Assessment invitation sent; pending submission from candidate.',
  },
  {
    id: 'CAN-REF-1064',
    jobId: 'JOB-2026-001',
    candidateName: 'Swetha Ramachandran',
    permissionGranted: true,
    specialty: 'TypeScript & Component Systems Engineer',
    matchScore: 88,
    skillsMatch: '85% (React.js, TypeScript, TailwindCSS)',
    skillsMatchedCount: '3/5 Matched',
    experienceMatch: 'Meets Required',
    experienceDetail: '5.0 Yrs (Req: 4 - 8 Yrs)',
    experienceSuitable: true,
    locationMatch: 'Suitable',
    locationDetail: 'Chennai HQ / Hybrid',
    salaryMatch: 'Within Budget',
    salaryDetail: 'Exp: ₹23L vs ₹18-28L',
    availability: '30 Days Notice',
    response: 'Interested',
    responseDate: '11-Oct-2026 04:50 PM',
    screeningStatus: 'Not Sent',
    screeningAssessment: null,
    screeningScore: null,
    screeningResult: null,
    recruitmentStage: 'Interested',
    notes: 'Strong component system architecture experience. Eligible for screening.',
  },
  {
    id: 'CAN-REF-1071',
    jobId: 'JOB-2026-001',
    candidateName: 'Kishore Kumar',
    permissionGranted: false,
    specialty: 'Web Performance & React Engineer',
    matchScore: 86,
    skillsMatch: '80% (React.js, TypeScript, Redux)',
    skillsMatchedCount: '3/5 Matched',
    experienceMatch: 'Meets Required',
    experienceDetail: '4.2 Yrs (Req: 4 - 8 Yrs)',
    experienceSuitable: true,
    locationMatch: 'Suitable',
    locationDetail: 'Chennai HQ Campus',
    salaryMatch: 'Within Budget',
    salaryDetail: 'Exp: ₹19L vs ₹18-28L',
    availability: 'Immediate',
    response: 'Interested',
    responseDate: '11-Oct-2026 09:10 AM',
    screeningStatus: 'Not Sent',
    screeningAssessment: null,
    screeningScore: null,
    screeningResult: null,
    recruitmentStage: 'Interested',
    notes: 'Immediate joiner, profile meets requirements.',
  },
];

// Available Screening Assessment Templates
const availableAssessments = [
  {
    id: 'ASM-FE-001',
    name: 'Frontend Architecture & React 19 Coding Test',
    duration: '45 mins',
    passThreshold: 75,
    category: 'Engineering & Technology',
  },
  {
    id: 'ASM-BE-002',
    name: 'Backend Microservices & Node.js Architecture',
    duration: '60 mins',
    passThreshold: 75,
    category: 'Engineering & Technology',
  },
  {
    id: 'ASM-UX-003',
    name: 'UI/UX Design Challenge & Systems Thinking',
    duration: '60 mins',
    passThreshold: 75,
    category: 'Design & UX',
  },
  {
    id: 'ASM-HR-004',
    name: 'HR Leadership & Competency Screening',
    duration: '30 mins',
    passThreshold: 75,
    category: 'Human Resources',
  },
  {
    id: 'ASM-GEN-005',
    name: 'General Technical Aptitude & Logic Assessment',
    duration: '40 mins',
    passThreshold: 70,
    category: 'General',
  },
];

export const CandidateResponses = () => {
  const { setNotifications } = usePortal();

  // State: 'main' (Job Summary Table) | 'details' (Interested Candidates Table)
  const [viewMode, setViewMode] = useState('main');
  const [selectedJobId, setSelectedJobId] = useState(null);

  // Data State
  const [jobsSummary, setJobsSummary] = useState(initialJobsResponseSummary);
  const [candidates, setCandidates] = useState(initialCandidatesData);

  // Main Table Search / Filter
  const [mainSearchTerm, setMainSearchTerm] = useState('');
  const [mainDeptFilter, setMainDeptFilter] = useState('All');

  // Details Table Search / Filter
  const [detailsSearchTerm, setDetailsSearchTerm] = useState('');
  const [responseFilter, setResponseFilter] = useState('Interested'); // 'Interested' | 'All' | others
  const [screeningFilter, setScreeningFilter] = useState('All');
  const [scoreFilter, setScoreFilter] = useState('All');

  // Candidate Selection State in Details Table
  const [selectedCandidateIds, setSelectedCandidateIds] = useState([]);

  // Send Screening Assessment Modal
  const [screeningModalOpen, setScreeningModalOpen] = useState(false);
  const [selectedAssessmentId, setSelectedAssessmentId] = useState('ASM-FE-001');
  const [assessmentExpiryDays, setAssessmentExpiryDays] = useState('5');
  const [screeningNotes, setScreeningNotes] = useState('');
  const [singleTargetCandidate, setSingleTargetCandidate] = useState(null);

  // Candidate Profile Drawer / Modal
  const [profileModalCandidate, setProfileModalCandidate] = useState(null);

  // Toast State
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 4000);
  };

  // Selected Job Object
  const selectedJob = jobsSummary.find((j) => j.id === selectedJobId);

  // Filter Main Table Jobs
  const filteredJobs = jobsSummary.filter((job) => {
    const term = mainSearchTerm.toLowerCase();
    const matchesSearch =
      job.id.toLowerCase().includes(term) ||
      job.jobTitle.toLowerCase().includes(term) ||
      job.department.toLowerCase().includes(term);

    const matchesDept =
      mainDeptFilter === 'All' ? true : job.department === mainDeptFilter;

    return matchesSearch && matchesDept;
  });

  // Filter Details Table Candidates
  const filteredCandidates = candidates.filter((cand) => {
    if (cand.jobId !== selectedJobId) return false;

    const term = detailsSearchTerm.toLowerCase();
    const matchesSearch =
      cand.id.toLowerCase().includes(term) ||
      cand.candidateName.toLowerCase().includes(term) ||
      cand.specialty.toLowerCase().includes(term) ||
      cand.skillsMatch.toLowerCase().includes(term) ||
      cand.locationDetail.toLowerCase().includes(term);

    const matchesResponse =
      responseFilter === 'All' ? true : cand.response === responseFilter;

    const matchesScreening =
      screeningFilter === 'All' ? true : cand.screeningStatus === screeningFilter;

    const matchesScore =
      scoreFilter === 'All'
        ? true
        : scoreFilter === '90'
        ? cand.matchScore >= 90
        : scoreFilter === '80'
        ? cand.matchScore >= 80
        : cand.matchScore >= 70;

    return matchesSearch && matchesResponse && matchesScreening && matchesScore;
  });

  // Pagination State (Consistent with Company Details)
  const [mainPage, setMainPage] = useState(1);
  const [detailsPage, setDetailsPage] = useState(1);
  const itemsPerPage = 8;

  const totalMainPages = Math.ceil(filteredJobs.length / itemsPerPage) || 1;
  const paginatedJobs = filteredJobs.slice((mainPage - 1) * itemsPerPage, mainPage * itemsPerPage);

  const totalDetailsPages = Math.ceil(filteredCandidates.length / itemsPerPage) || 1;
  const paginatedCandidates = filteredCandidates.slice((detailsPage - 1) * itemsPerPage, detailsPage * itemsPerPage);

  // Handle Opening Details for a Job
  const handleOpenJobDetails = (jobId, defaultResponseFilter = 'Interested') => {
    setSelectedJobId(jobId);
    setResponseFilter(defaultResponseFilter);
    setScreeningFilter('All');
    setScoreFilter('All');
    setDetailsSearchTerm('');
    setSelectedCandidateIds([]);
    setDetailsPage(1);
    setViewMode('details');
  };

  // Toggle Single Candidate Checkbox
  const handleToggleCandidateSelect = (cand) => {
    // Rule: Cannot select if not Interested
    if (cand.response !== 'Interested') {
      showToast('Only candidates who responded "Interested" are eligible for screening.');
      return;
    }
    // Rule: Cannot select if already completed
    if (cand.screeningStatus === 'Completed') {
      showToast(`Candidate ${cand.id} has already completed the screening assessment.`);
      return;
    }

    setSelectedCandidateIds((prev) =>
      prev.includes(cand.id) ? prev.filter((id) => id !== cand.id) : [...prev, cand.id]
    );
  };

  // Select All Eligible Candidates
  const eligibleCandidatesToSelect = filteredCandidates.filter(
    (c) => c.response === 'Interested' && c.screeningStatus !== 'Completed'
  );

  const handleToggleSelectAll = () => {
    if (selectedCandidateIds.length === eligibleCandidatesToSelect.length && eligibleCandidatesToSelect.length > 0) {
      setSelectedCandidateIds([]);
    } else {
      setSelectedCandidateIds(eligibleCandidatesToSelect.map((c) => c.id));
    }
  };

  // Open Screening Modal for Selected or Single Candidate
  const handleOpenScreeningModal = (singleCandidate = null) => {
    if (singleCandidate) {
      if (singleCandidate.response !== 'Interested') {
        showToast('Only candidates with response "Interested" are eligible for screening.');
        return;
      }
      if (singleCandidate.screeningStatus === 'Completed') {
        showToast(`Candidate ${singleCandidate.id} has already completed screening.`);
        return;
      }
      setSingleTargetCandidate(singleCandidate);
      setSelectedCandidateIds([singleCandidate.id]);
    } else {
      setSingleTargetCandidate(null);
      if (selectedCandidateIds.length === 0) {
        showToast('Please select at least one eligible candidate to send screening.');
        return;
      }
    }

    // Auto-select relevant assessment by job department
    if (selectedJob?.department === 'Design & UX') {
      setSelectedAssessmentId('ASM-UX-003');
    } else if (selectedJob?.department === 'Human Resources') {
      setSelectedAssessmentId('ASM-HR-004');
    } else {
      setSelectedAssessmentId('ASM-FE-001');
    }

    setScreeningNotes(
      `Please complete this technical assessment for ${selectedJob?.jobTitle} within 5 days.`
    );
    setScreeningModalOpen(false);
    setViewMode('screening-form');
  };

  // Execute Send Screening Dispatch
  const handleExecuteSendScreening = () => {
    const targetIds = singleTargetCandidate
      ? [singleTargetCandidate.id]
      : selectedCandidateIds;

    if (targetIds.length === 0) return;

    const chosenAssessment =
      availableAssessments.find((a) => a.id === selectedAssessmentId) ||
      availableAssessments[0];

    const nowStr = new Date().toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    // Update Candidates Data
    let newlySentCount = 0;
    setCandidates((prev) =>
      prev.map((c) => {
        if (targetIds.includes(c.id)) {
          // If was not previously sent, count towards newly sent
          if (c.screeningStatus === 'Not Sent') {
            newlySentCount++;
          }
          return {
            ...c,
            screeningStatus: 'Pending',
            screeningAssessment: chosenAssessment.name,
            recruitmentStage: 'Screening',
            screeningSentDate: nowStr,
          };
        }
        return c;
      })
    );

    // Update Job Summary Screening Sent Count
    setJobsSummary((prev) =>
      prev.map((j) => {
        if (j.id === selectedJobId) {
          return {
            ...j,
            screeningSentCount: j.screeningSentCount + newlySentCount,
          };
        }
        return j;
      })
    );

    // Push into Live Portal Notifications
    if (setNotifications) {
      const newNotif = {
        id: `NTF-SCRN-${Date.now()}`,
        notificationType: 'Screening',
        title: `Screening Assessment Dispatched (${targetIds.length} Candidates)`,
        message: `Dispatched "${chosenAssessment.name}" to ${targetIds.length} candidate(s) for ${selectedJob?.jobTitle}.`,
        dateTime: nowStr,
        readStatus: 'Unread',
        recipient: 'Recruitment Team',
      };
      setNotifications((prev) => [newNotif, ...prev]);
    }

    setScreeningModalOpen(false);
    setSelectedCandidateIds([]);
    setSingleTargetCandidate(null);
    setViewMode('details');
    showToast(
      `Successfully sent "${chosenAssessment.name}" to ${targetIds.length} candidate(s)! Status updated to Pending.`
    );
  };

  // Simulate / Record Candidate Completing Screening Assessment
  const handleRecordScreeningCompletion = (cand, targetScore = 88) => {
    const isQualified = targetScore >= 75;
    const resultText = isQualified ? 'Qualified' : 'Review Required';

    setCandidates((prev) =>
      prev.map((c) =>
        c.id === cand.id
          ? {
              ...c,
              screeningStatus: 'Completed',
              screeningScore: targetScore,
              screeningResult: resultText,
              recruitmentStage: isQualified ? 'Shortlisted' : 'Screening',
            }
          : c
      )
    );

    if (profileModalCandidate && profileModalCandidate.id === cand.id) {
      setProfileModalCandidate((prev) => ({
        ...prev,
        screeningStatus: 'Completed',
        screeningScore: targetScore,
        screeningResult: resultText,
        recruitmentStage: isQualified ? 'Shortlisted' : 'Screening',
      }));
    }

    showToast(
      `Recorded completion for ${cand.id}: Score ${targetScore}% (${resultText}).`
    );
  };

  // Move Qualified Candidate to Next Stage: Shortlisted
  const handleMoveToShortlisted = (cand) => {
    setCandidates((prev) =>
      prev.map((c) =>
        c.id === cand.id
          ? {
              ...c,
              recruitmentStage: 'Shortlisted',
            }
          : c
      )
    );

    if (profileModalCandidate && profileModalCandidate.id === cand.id) {
      setProfileModalCandidate((prev) => ({
        ...prev,
        recruitmentStage: 'Shortlisted',
      }));
    }

    showToast(`Candidate ${cand.id} successfully moved to "Shortlisted" stage!`);
  };

  // Toggle Candidate Name Permission
  const handleTogglePermission = (candId) => {
    setCandidates((prev) =>
      prev.map((c) => {
        if (c.id === candId) {
          const updatedState = !c.permissionGranted;
          showToast(
            updatedState
              ? `Candidate Name Unlocked with consent.`
              : `Candidate Name Locked (Confidential Mode).`
          );
          return { ...c, permissionGranted: updatedState };
        }
        return c;
      })
    );

    if (profileModalCandidate && profileModalCandidate.id === candId) {
      setProfileModalCandidate((prev) => ({
        ...prev,
        permissionGranted: !prev.permissionGranted,
      }));
    }
  };

  // Helper for Score Badge Styling
  const getScoreBadgeClass = (score) => {
    if (score >= 90) return 'score-high';
    if (score >= 80) return 'score-mid';
    return 'score-fair';
  };

  return (
    <div className="responses-page-container animate-fade-in">
      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="responses-toast-alert">
          <CheckCircle2 size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* =========================================================================
          MODULE HEADER
          ========================================================================= */}
      <div className="responses-page-header">
        <div className="responses-header-left">
          <div className="responses-title-row">
            {viewMode !== 'main' && (
              <button
                type="button"
                className="btn-back-to-list"
                onClick={() => {
                  if (viewMode === 'screening-form' || viewMode === 'profile-view') {
                    setViewMode('details');
                  } else {
                    setViewMode('main');
                  }
                }}
                title={viewMode === 'details' ? 'Back to All Jobs' : 'Back to Candidates'}
              >
                <ArrowLeft size={16} strokeWidth={2.5} />
                <span>{viewMode === 'details' ? 'Back to All Jobs' : 'Back to Candidates'}</span>
              </button>
            )}

            <div>
              <h1 className="responses-page-title">
                {viewMode === 'main'
                  ? 'Candidate Responses'
                  : viewMode === 'details'
                  ? `Candidate Responses: ${selectedJob?.jobTitle}`
                  : viewMode === 'screening-form'
                  ? `Send Screening Assessment: ${selectedJob?.jobTitle}`
                  : `Candidate Profile: ${profileModalCandidate?.candidateName || profileModalCandidate?.id}`}
              </h1>
              
            </div>
          </div>
        </div>

        {/* Global Action / Counter Header */}
        <div className="responses-header-actions">
          {viewMode === 'main' && (
            <div className="responses-stat-pill">
              <Briefcase size={14} className="stat-pill-icon" />
              <span className="stat-pill-val">{jobsSummary.length} Jobs</span>
              <span className="stat-pill-lbl">Actively Monitored</span>
            </div>
          )}
          
        </div>
      </div>

      {/* =========================================================================
          VIEW 1: CANDIDATE RESPONSES — MAIN TABLE (JOB-WISE SUMMARY)
          ========================================================================= */}
      {viewMode === 'main' && (
        <div className="responses-main-view animate-fade-in">
          {/* Top 4 Executive KPI Cards */}
          <div className="responses-kpi-grid">
            <div className="responses-kpi-card">
              <div className="kpi-icon-wrap blue">
                <Users size={18} />
              </div>
              <div className="kpi-info">
                <span className="kpi-num">
                  {jobsSummary.reduce((acc, j) => acc + j.totalNotified, 0)}
                </span>
                <span className="kpi-title">Total Candidates Notified</span>
              </div>
            </div>

            <div className="responses-kpi-card">
              <div className="kpi-icon-wrap green">
                <ThumbsUp size={18} />
              </div>
              <div className="kpi-info">
                <span className="kpi-num">
                  {jobsSummary.reduce((acc, j) => acc + j.interestedCount, 0)}
                </span>
                <span className="kpi-title">Total Interested Responses</span>
              </div>
            </div>

            <div className="responses-kpi-card">
              <div className="kpi-icon-wrap purple">
                <Send size={18} />
              </div>
              <div className="kpi-info">
                <span className="kpi-num">
                  {jobsSummary.reduce((acc, j) => acc + j.screeningSentCount, 0)}
                </span>
                <span className="kpi-title">Screening Assessments Sent</span>
              </div>
            </div>

            <div className="responses-kpi-card">
              <div className="kpi-icon-wrap amber">
                <Clock size={18} />
              </div>
              <div className="kpi-info">
                <span className="kpi-num">
                  {jobsSummary.reduce((acc, j) => acc + j.noResponseCount, 0)}
                </span>
                <span className="kpi-title">Pending / No Response</span>
              </div>
            </div>
          </div>

          {/* Main Table Toolbar */}
          <div className="responses-toolbar-card">
            <div className="toolbar-left-group">
              <div className="responses-search-box">
                <Search size={15} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={mainSearchTerm}
                  onChange={(e) => {
                    setMainSearchTerm(e.target.value);
                    setMainPage(1);
                  }}
                  className="responses-search-input"
                />
              </div>

              <select
                value={mainDeptFilter}
                onChange={(e) => {
                  setMainDeptFilter(e.target.value);
                  setMainPage(1);
                }}
                className="responses-filter-select"
              >
                <option value="All">All Departments</option>
                <option value="Engineering & Technology">Engineering & Technology</option>
                <option value="Human Resources">Human Resources</option>
                <option value="Design & UX">Design & UX</option>
                <option value="Business Development">Business Development</option>
              </select>
            </div>
          </div>

          {/* Candidate Responses — Main Table */}
          <div className="responses-table-card">
            <div className="table-responsive-wrapper">
              <table className="responses-data-table">
                <thead>
                  <tr>
                    <th style={{ width: '55px', textAlign: 'center' }}>S.No</th>
                    <th>Job ID</th>
                    <th>Job Title</th>
                    <th>Department</th>
                    <th>Published Date</th>
                    <th style={{ textAlign: 'center' }}>Total Candidates Notified</th>
                    <th style={{ textAlign: 'center' }}>Interested Count</th>
                    <th style={{ textAlign: 'center' }}>Not Interested Count</th>
                    <th style={{ textAlign: 'center' }}>Maybe Later Count</th>
                    <th style={{ textAlign: 'center' }}>No Response Count</th>
                    <th style={{ textAlign: 'center' }}>Screening Sent Count</th>
                    <th style={{ textAlign: 'center' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredJobs.length === 0 ? (
                    <tr>
                      <td colSpan="12" className="table-empty-cell">
                        No published jobs found matching your search criteria.
                      </td>
                    </tr>
                  ) : (
                    paginatedJobs.map((job, idx) => {
                      const sNo = (mainPage - 1) * itemsPerPage + idx + 1;
                      return (
                        <tr key={job.id}>
                          {/* S.No */}
                          <td style={{ textAlign: 'center', fontWeight: 600 }}>{sNo}</td>

                          {/* Job ID */}
                          <td>
                            <span className="job-id-code">{job.id}</span>
                          </td>

                          {/* Job Title */}
                          <td>
                            <div className="job-title-cell">
                              <span className="job-name-main">{job.jobTitle}</span>
                            </div>
                          </td>

                          {/* Department */}
                          <td>
                            <span className="dept-tag-chip">{job.department}</span>
                          </td>

                          {/* Published Date */}
                          <td>
                            <span className="date-text-cell">{job.publishedDate}</span>
                          </td>

                          {/* Total Candidates Notified */}
                          <td style={{ textAlign: 'center' }}>
                            <span className="count-pill-neutral">
                              <Users size={12} /> {job.totalNotified}
                            </span>
                          </td>

                          {/* Interested Count */}
                          <td style={{ textAlign: 'center' }}>
                            <span className="count-pill-interested">
                              <ThumbsUp size={12} /> {job.interestedCount}
                            </span>
                          </td>

                          {/* Not Interested Count */}
                          <td style={{ textAlign: 'center' }}>
                            <span className="count-pill-not-interested">
                              <ThumbsDown size={12} /> {job.notInterestedCount}
                            </span>
                          </td>

                          {/* Maybe Later Count */}
                          <td style={{ textAlign: 'center' }}>
                            <span className="count-pill-maybe">
                              <Clock size={12} /> {job.maybeLaterCount}
                            </span>
                          </td>

                          {/* No Response Count */}
                          <td style={{ textAlign: 'center' }}>
                            <span className="count-pill-no-response">
                              <HelpCircle size={12} /> {job.noResponseCount}
                            </span>
                          </td>

                          {/* Screening Sent Count */}
                          <td style={{ textAlign: 'center' }}>
                            <span className="count-pill-screening-sent">
                              <Send size={12} /> {job.screeningSentCount}
                            </span>
                          </td>

                          {/* Actions: View Interested / View All Responses (Icon Only) */}
                          <td style={{ textAlign: 'center' }}>
                            <div className="table-actions-cluster">
                              <button
                                type="button"
                                className="action-icon-button interested"
                                onClick={() => handleOpenJobDetails(job.id, 'Interested')}
                                title="View Interested Candidates"
                              >
                                <ThumbsUp size={16} />
                              </button>

                              <button
                                type="button"
                                className="action-icon-button view"
                                onClick={() => handleOpenJobDetails(job.id, 'All')}
                                title="View All Candidate Responses"
                              >
                                <Eye size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer (Consistent with Company Details) */}
            <div className="companies-pagination-row">
              <div className="pagination-entries-count">
                Showing {filteredJobs.length > 0 ? (mainPage - 1) * itemsPerPage + 1 : 0} to{' '}
                {Math.min(mainPage * itemsPerPage, filteredJobs.length)} of{' '}
                {filteredJobs.length} entries
              </div>
              <div className="pagination-controls">
                <button
                  type="button"
                  className={`pagination-nav-btn ${mainPage === 1 ? 'disabled' : ''}`}
                  disabled={mainPage === 1}
                  onClick={() => setMainPage((p) => Math.max(1, p - 1))}
                  title="Previous Page"
                >
                  <ChevronLeft size={16} />
                </button>
                {Array.from({ length: totalMainPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    type="button"
                    className={`pagination-page-btn ${mainPage === page ? 'active' : ''}`}
                    onClick={() => setMainPage(page)}
                  >
                    {page}
                  </button>
                ))}
                <button
                  type="button"
                  className={`pagination-nav-btn ${mainPage === totalMainPages ? 'disabled' : ''}`}
                  disabled={mainPage === totalMainPages}
                  onClick={() => setMainPage((p) => Math.min(totalMainPages, p + 1))}
                  title="Next Page"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 2: VIEW INTERESTED CANDIDATES — DETAILS TABLE
          ========================================================================= */}
      {viewMode === 'details' && selectedJob && (
        <div className="responses-details-view animate-fade-in">
          {/* Selected Job Overview Header Banner */}
          <div className="job-details-overview-banner">
            <div className="overview-left">
              <div className="overview-title-row">
                <span className="overview-job-id">{selectedJob.id}</span>
                <h2 className="overview-job-title">{selectedJob.jobTitle}</h2>
                <span className="overview-dept-badge">{selectedJob.department}</span>
              </div>
              <p className="overview-meta-text">
                Published on <strong>{selectedJob.publishedDate}</strong> • Total Candidates Notified:{' '}
                <strong>{selectedJob.totalNotified}</strong>
              </p>
            </div>

            {/* Mini Summary Counters */}
            <div className="overview-counters-row">
              <div
                className={`overview-counter-pill ${
                  responseFilter === 'Interested' ? 'active' : ''
                }`}
                onClick={() => setResponseFilter('Interested')}
                title="Filter to Interested only"
              >
                <ThumbsUp size={14} />
                <span className="num">{selectedJob.interestedCount}</span>
                <span className="lbl">Interested</span>
              </div>

              <div
                className={`overview-counter-pill ${
                  responseFilter === 'Not Interested' ? 'active' : ''
                }`}
                onClick={() => setResponseFilter('Not Interested')}
                title="Filter to Not Interested"
              >
                <ThumbsDown size={14} />
                <span className="num">{selectedJob.notInterestedCount}</span>
                <span className="lbl">Not Interested</span>
              </div>

              <div
                className={`overview-counter-pill ${
                  responseFilter === 'Maybe Later' ? 'active' : ''
                }`}
                onClick={() => setResponseFilter('Maybe Later')}
                title="Filter to Maybe Later"
              >
                <Clock size={14} />
                <span className="num">{selectedJob.maybeLaterCount}</span>
                <span className="lbl">Maybe Later</span>
              </div>

              <div className="overview-counter-pill screening">
                <Send size={14} />
                <span className="num">{selectedJob.screeningSentCount}</span>
                <span className="lbl">Screening Sent</span>
              </div>
            </div>
          </div>


          {/* Details Table Toolbar & Action Bar */}
          <div className="details-toolbar-card">
            <div className="toolbar-left-group">
              <div className="responses-search-box">
                <Search size={15} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search reference, skills, name..."
                  value={detailsSearchTerm}
                  onChange={(e) => {
                    setDetailsSearchTerm(e.target.value);
                    setDetailsPage(1);
                  }}
                  className="responses-search-input"
                />
              </div>

              <select
                value={responseFilter}
                onChange={(e) => {
                  setResponseFilter(e.target.value);
                  setDetailsPage(1);
                }}
                className="responses-filter-select"
              >
                <option value="All">All Responses</option>
                <option value="Interested">Interested Only</option>
                <option value="Not Interested">Not Interested</option>
                <option value="Maybe Later">Maybe Later</option>
                <option value="No Response">No Response</option>
              </select>

              <select
                value={screeningFilter}
                onChange={(e) => {
                  setScreeningFilter(e.target.value);
                  setDetailsPage(1);
                }}
                className="responses-filter-select"
              >
                <option value="All">All Screening Statuses</option>
                <option value="Not Sent">Not Sent</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>

              <select
                value={scoreFilter}
                onChange={(e) => {
                  setScoreFilter(e.target.value);
                  setDetailsPage(1);
                }}
                className="responses-filter-select"
              >
                <option value="All">All Match Scores</option>
                <option value="90">90%+ High Match</option>
                <option value="80">80%+ Good Match</option>
                <option value="70">70%+ Fair Match</option>
              </select>
            </div>

            {/* Selection & Send Screening Action Button */}
            <div className="toolbar-right-group">
              <span className="selected-counter-text">
                <strong>{selectedCandidateIds.length}</strong> of{' '}
                {eligibleCandidatesToSelect.length} Eligible Selected
              </span>

              <button
                type="button"
                className="btn-select-all-toggle"
                onClick={handleToggleSelectAll}
                disabled={eligibleCandidatesToSelect.length === 0}
              >
                {selectedCandidateIds.length === eligibleCandidatesToSelect.length &&
                eligibleCandidatesToSelect.length > 0 ? (
                  <>
                    <CheckSquare size={14} />
                    <span>Deselect All</span>
                  </>
                ) : (
                  <>
                    <Square size={14} />
                    <span>Select All Eligible ({eligibleCandidatesToSelect.length})</span>
                  </>
                )}
              </button>

              {/* Main Button: Send Screening to Selected Candidates */}
              <button
                type="button"
                className="btn-send-screening-primary"
                onClick={() => handleOpenScreeningModal()}
                disabled={selectedCandidateIds.length === 0}
              >
                <Send size={15} />
                <span>
                  {selectedCandidateIds.length > 0
                    ? `Send Screening to Selected (${selectedCandidateIds.length})`
                    : 'Send Screening to Selected Candidates'}
                </span>
              </button>
            </div>
          </div>

          {/* Details Table */}
          <div className="responses-table-card">
            <div className="table-responsive-wrapper">
              <table className="responses-data-table details-table">
                <thead>
                  <tr>
                    <th style={{ width: '45px', textAlign: 'center' }}>
                      <input
                        type="checkbox"
                        checked={
                          eligibleCandidatesToSelect.length > 0 &&
                          selectedCandidateIds.length === eligibleCandidatesToSelect.length
                        }
                        onChange={handleToggleSelectAll}
                        disabled={eligibleCandidatesToSelect.length === 0}
                        title="Select All Eligible Candidates"
                      />
                    </th>
                    <th>Candidate ID</th>
                    <th>Candidate Name</th>
                    <th>Match Score</th>
                    <th>Skills Match</th>
                    <th>Experience Match</th>
                    <th>Location Match</th>
                    <th>Salary Match</th>
                    <th>Availability</th>
                    <th>Response Date</th>
                    <th>Screening Status</th>
                    <th style={{ textAlign: 'center' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCandidates.length === 0 ? (
                    <tr>
                      <td colSpan="12" className="table-empty-cell">
                        No candidates found for "{selectedJob.jobTitle}" matching your filters.
                      </td>
                    </tr>
                  ) : (
                    paginatedCandidates.map((cand) => {
                      const isSelected = selectedCandidateIds.includes(cand.id);
                      const isEligible =
                        cand.response === 'Interested' && cand.screeningStatus !== 'Completed';

                      return (
                        <tr
                          key={cand.id}
                          className={`${isSelected ? 'row-selected' : ''} ${
                            !isEligible ? 'row-ineligible' : ''
                          }`}
                        >
                          {/* 1. Select Checkbox */}
                          <td style={{ textAlign: 'center' }}>
                            <input
                              type="checkbox"
                              checked={isSelected}
                              disabled={!isEligible}
                              onChange={() => handleToggleCandidateSelect(cand)}
                              title={
                                cand.response !== 'Interested'
                                  ? 'Candidate response is not Interested'
                                  : cand.screeningStatus === 'Completed'
                                  ? 'Screening already completed'
                                  : 'Select candidate for screening'
                              }
                            />
                          </td>

                          {/* 2. Candidate ID */}
                          <td>
                            <div className="candidate-id-cell">
                              <span className="cand-ref-code">{cand.id}</span>
                              <span className="cand-specialty-sub">{cand.specialty}</span>
                            </div>
                          </td>

                          {/* 3. Candidate Name (Permission irundha mattum show pannavum) */}
                          <td>
                            <div className="candidate-name-cell">
                              {cand.permissionGranted ? (
                                <div className="name-unlocked-row">
                                  <span className="unlocked-name-text">{cand.candidateName}</span>
                                  <button
                                    type="button"
                                    className="btn-privacy-toggle unlocked"
                                    onClick={() => handleTogglePermission(cand.id)}
                                    title="Consent Granted. Click to lock / anonymize."
                                  >
                                    <Unlock size={12} />
                                  </button>
                                </div>
                              ) : (
                                <div className="name-locked-row">
                                  <span className="locked-name-text">
                                    [Confidential Candidate]
                                  </span>
                                  <button
                                    type="button"
                                    className="btn-privacy-toggle locked"
                                    onClick={() => handleTogglePermission(cand.id)}
                                    title="Candidate Consent Hidden. Click to unlock with recruiter authorization."
                                  >
                                    <Lock size={12} />
                                    <span>Unlock</span>
                                  </button>
                                </div>
                              )}
                            </div>
                          </td>

                          {/* 4. Match Score */}
                          <td>
                            <div className="match-score-cell">
                              <span className={`score-badge ${getScoreBadgeClass(cand.matchScore)}`}>
                                {cand.matchScore}%
                              </span>
                              <div className="score-mini-track">
                                <div
                                  className={`score-mini-fill ${getScoreBadgeClass(cand.matchScore)}`}
                                  style={{ width: `${cand.matchScore}%` }}
                                />
                              </div>
                            </div>
                          </td>

                          {/* 5. Skills Match */}
                          <td>
                            <div className="skills-match-cell">
                              <span className="skills-match-text">{cand.skillsMatch}</span>
                              <span className="skills-matched-pill">{cand.skillsMatchedCount}</span>
                            </div>
                          </td>

                          {/* 6. Experience Match */}
                          <td>
                            <div className="experience-match-cell">
                              <span className="exp-suitable-tag">
                                <CheckCircle size={12} /> {cand.experienceMatch}
                              </span>
                              <span className="exp-sub-detail">{cand.experienceDetail}</span>
                            </div>
                          </td>

                          {/* 7. Location Match */}
                          <td>
                            <div className="location-match-cell">
                              <span
                                className={`loc-suitable-chip ${
                                  cand.locationMatch === 'Suitable' ? 'suitable' : 'not-suitable'
                                }`}
                              >
                                {cand.locationMatch === 'Suitable' ? (
                                  <Check size={11} />
                                ) : (
                                  <XCircle size={11} />
                                )}
                                <span>{cand.locationMatch}</span>
                              </span>
                              <span className="loc-sub-detail">{cand.locationDetail}</span>
                            </div>
                          </td>

                          {/* 8. Salary Match */}
                          <td>
                            <div className="salary-match-cell">
                              <span className="salary-status-tag">
                                <DollarSign size={11} /> {cand.salaryMatch}
                              </span>
                              <span className="salary-detail-text">{cand.salaryDetail}</span>
                            </div>
                          </td>

                          {/* 9. Availability */}
                          <td>
                            <span
                              className={`availability-pill avail-${cand.availability
                                .toLowerCase()
                                .replace(/[^a-z0-9]+/g, '-')}`}
                            >
                              {cand.availability}
                            </span>
                          </td>

                          {/* 10. Response Date */}
                          <td>
                            <div className="response-date-cell">
                              <span className="response-status-badge">
                                {cand.response === 'Interested' && <ThumbsUp size={11} />}
                                {cand.response === 'Not Interested' && <ThumbsDown size={11} />}
                                {cand.response === 'Maybe Later' && <Clock size={11} />}
                                <span>{cand.response}</span>
                              </span>
                              <span className="response-date-sub">{cand.responseDate}</span>
                            </div>
                          </td>

                          {/* 11. Screening Status (Not Sent / Pending / Completed) */}
                          <td>
                            <div className="screening-status-cell">
                              <span
                                className={`screening-status-chip status-${cand.screeningStatus
                                  .toLowerCase()
                                  .replace(/\s+/g, '-')}`}
                              >
                                {cand.screeningStatus === 'Not Sent' && <AlertCircle size={12} />}
                                {cand.screeningStatus === 'Pending' && <Clock size={12} />}
                                {cand.screeningStatus === 'Completed' && <CheckCircle2 size={12} />}
                                <span>{cand.screeningStatus}</span>
                              </span>

                              {/* If Completed, show Result (Qualified / Review Required) */}
                              {cand.screeningStatus === 'Completed' && (
                                <div className="screening-result-row">
                                  <span
                                    className={`result-tag ${
                                      cand.screeningResult === 'Qualified'
                                        ? 'qualified'
                                        : 'review-required'
                                    }`}
                                  >
                                    {cand.screeningResult}: {cand.screeningScore}%
                                  </span>
                                </div>
                              )}

                              {cand.screeningStatus === 'Pending' && (
                                <button
                                  type="button"
                                  className="btn-simulate-complete"
                                  onClick={() => handleRecordScreeningCompletion(cand, 88)}
                                  title="Simulate candidate submission (Score 88%)"
                                >
                                  Record Result
                                </button>
                              )}
                            </div>
                          </td>

                          {/* 12. Actions: View Profile / Send Screening (Icon Only) */}
                          <td style={{ textAlign: 'center' }}>
                            <div className="table-actions-cluster">
                              <button
                                type="button"
                                className="action-icon-button view"
                                onClick={() => {
                                  setProfileModalCandidate(cand);
                                  setViewMode('profile-view');
                                }}
                                title="View Candidate Profile & Matching Details"
                              >
                                <Eye size={16} />
                              </button>

                              {cand.screeningStatus === 'Completed' ? (
                                cand.recruitmentStage === 'Shortlisted' ? (
                                  <span className="stage-shortlisted-pill" title="Shortlisted Candidate">
                                    <Check size={13} />
                                  </span>
                                ) : (
                                  <button
                                    type="button"
                                    className="action-icon-button shortlist"
                                    onClick={() => handleMoveToShortlisted(cand)}
                                    title="Candidate Qualified: Move to Shortlisted"
                                  >
                                    <UserCheck size={16} />
                                  </button>
                                )
                              ) : (
                                <button
                                  type="button"
                                  className="action-icon-button send"
                                  onClick={() => handleOpenScreeningModal(cand)}
                                  disabled={cand.response !== 'Interested'}
                                  title={
                                    cand.response !== 'Interested'
                                      ? 'Only Interested candidates can be screened'
                                      : 'Send Screening Assessment'
                                  }
                                >
                                  <Send size={15} />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer (Consistent with Company Details) */}
            <div className="companies-pagination-row">
              <div className="pagination-entries-count">
                Showing {filteredCandidates.length > 0 ? (detailsPage - 1) * itemsPerPage + 1 : 0} to{' '}
                {Math.min(detailsPage * itemsPerPage, filteredCandidates.length)} of{' '}
                {filteredCandidates.length} entries
              </div>
              <div className="pagination-controls">
                <button
                  type="button"
                  className={`pagination-nav-btn ${detailsPage === 1 ? 'disabled' : ''}`}
                  disabled={detailsPage === 1}
                  onClick={() => setDetailsPage((p) => Math.max(1, p - 1))}
                  title="Previous Page"
                >
                  <ChevronLeft size={16} />
                </button>
                {Array.from({ length: totalDetailsPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    type="button"
                    className={`pagination-page-btn ${detailsPage === page ? 'active' : ''}`}
                    onClick={() => setDetailsPage(page)}
                  >
                    {page}
                  </button>
                ))}
                <button
                  type="button"
                  className={`pagination-nav-btn ${detailsPage === totalDetailsPages ? 'disabled' : ''}`}
                  disabled={detailsPage === totalDetailsPages}
                  onClick={() => setDetailsPage((p) => Math.min(totalDetailsPages, p + 1))}
                  title="Next Page"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 3: SEND SCREENING ASSESSMENT (IN-PAGE VIEW, NO POPUP!)
          ========================================================================= */}
      {viewMode === 'screening-form' && (
        <div className="inpage-card-container animate-fade-in">
          <div className="inpage-card-header">
            <div className="inpage-card-title-wrap">
              <div className="modal-icon-ring blue">
                <Send size={18} />
              </div>
              <div>
                <h3 className="inpage-card-title">Send Screening Assessment</h3>
                <p className="inpage-card-subtitle">
                  Target Job: {selectedJob?.jobTitle} ({selectedJob?.id})
                </p>
              </div>
            </div>
            <button
              type="button"
              className="btn-back-to-list"
              onClick={() => setViewMode('details')}
              title="Back to Candidates"
            >
              <ArrowLeft size={16} strokeWidth={2.5} />
              <span>Back to Candidates</span>
            </button>
          </div>

          <div className="responses-modal-body">
              {/* Recipient Summary Box */}
              <div className="modal-recipients-summary-box">
                <div className="recipients-stat">
                  <span className="rec-lbl">Recipients Count:</span>
                  <span className="rec-val">
                    <Users size={14} />
                    <strong>
                      {singleTargetCandidate ? 1 : selectedCandidateIds.length} Candidate(s)
                    </strong>
                  </span>
                </div>
                <div className="recipients-stat">
                  <span className="rec-lbl">Eligibility Validation:</span>
                  <span className="rec-val green">
                    <ShieldCheck size={14} />
                    <strong>Interested & Eligible</strong>
                  </span>
                </div>
              </div>

              {/* Assessment Template Selection */}
              <div className="modal-form-section">
                <label className="modal-section-label">
                  Select Screening Assessment <span className="req-star">*</span>
                </label>
                <div className="assessment-options-list">
                  {availableAssessments.map((asm) => (
                    <label
                      key={asm.id}
                      className={`assessment-option-item ${
                        selectedAssessmentId === asm.id ? 'active' : ''
                      }`}
                    >
                      <input
                        type="radio"
                        name="selectedAssessment"
                        value={asm.id}
                        checked={selectedAssessmentId === asm.id}
                        onChange={() => setSelectedAssessmentId(asm.id)}
                      />
                      <div className="asm-item-details">
                        <div className="asm-title-row">
                          <span className="asm-name">{asm.name}</span>
                          <span className="asm-badge">{asm.category}</span>
                        </div>
                        <div className="asm-meta-row">
                          <span>
                            <Clock size={12} /> Duration: {asm.duration}
                          </span>
                          <span>•</span>
                          <span>
                            <Award size={12} /> Pass Criteria: Min {asm.passThreshold}%
                          </span>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Expiry Days & Passing Threshold */}
              <div className="modal-grid-two-cols">
                <div className="modal-form-section">
                  <label className="modal-section-label">Assessment Expiry (Days)</label>
                  <select
                    value={assessmentExpiryDays}
                    onChange={(e) => setAssessmentExpiryDays(e.target.value)}
                    className="modal-select-input"
                  >
                    <option value="3">3 Days</option>
                    <option value="5">5 Days (Recommended)</option>
                    <option value="7">7 Days</option>
                    <option value="10">10 Days</option>
                  </select>
                </div>

                <div className="modal-form-section">
                  <label className="modal-section-label">Duplicate Screening Rule</label>
                  <div className="rule-badge-box">
                    <CheckCircle size={13} className="rule-icon" />
                    <span>Duplicate screening automatically avoided for completed tests</span>
                  </div>
                </div>
              </div>

              {/* Instructions / Notes */}
              <div className="modal-form-section">
                <label className="modal-section-label">Recruiter Instructions to Candidate</label>
                <textarea
                  value={screeningNotes}
                  onChange={(e) => setScreeningNotes(e.target.value)}
                  rows="3"
                  className="modal-textarea-input"
                  placeholder="Add custom assessment guidelines..."
                />
              </div>
            </div>

            {/* Form Footer */}
            <div className="responses-modal-footer">
              <button
                type="button"
                className="btn-modal-cancel"
                onClick={() => setViewMode('details')}
              >
                Cancel
              </button>

              <button
                type="button"
                className="btn-modal-submit"
                onClick={handleExecuteSendScreening}
              >
                <Send size={15} />
                <span>
                  Dispatch Screening to{' '}
                  {singleTargetCandidate ? 1 : selectedCandidateIds.length} Candidate(s)
                </span>
              </button>
            </div>
          </div>
        )}

      {/* =========================================================================
          VIEW 4: CANDIDATE PROFILE & MATCHING DETAILS (IN-PAGE VIEW, NO POPUP!)
          ========================================================================= */}
      {viewMode === 'profile-view' && profileModalCandidate && (
        <div className="inpage-card-container animate-fade-in">
          <div className="inpage-card-header">
            <div className="inpage-card-title-wrap">
              <div className="modal-icon-ring purple">
                <Users size={18} />
              </div>
              <div>
                <h3 className="inpage-card-title">
                  Candidate Profile: {profileModalCandidate.id}
                </h3>
                <p className="inpage-card-subtitle">
                  {profileModalCandidate.permissionGranted
                    ? profileModalCandidate.candidateName
                    : '[Confidential Candidate • Consent Required]'}
                </p>
              </div>
            </div>
            <button
              type="button"
              className="btn-back-to-list"
              onClick={() => setViewMode('details')}
              title="Back to Candidates"
            >
              <ArrowLeft size={16} strokeWidth={2.5} />
              <span>Back to Candidates</span>
            </button>
          </div>

          <div className="responses-modal-body">
              {/* Permission & Identity Card */}
              <div className="profile-identity-card">
                <div className="identity-status-row">
                  <div className="identity-tag">
                    {profileModalCandidate.permissionGranted ? (
                      <span className="unlocked-badge">
                        <Unlock size={13} /> Name & Contact Unlocked
                      </span>
                    ) : (
                      <span className="locked-badge">
                        <Lock size={13} /> Name Masked (Confidential)
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    className="btn-toggle-permission-modal"
                    onClick={() => handleTogglePermission(profileModalCandidate.id)}
                  >
                    {profileModalCandidate.permissionGranted ? (
                      <>
                        <Lock size={13} />
                        <span>Lock Name</span>
                      </>
                    ) : (
                      <>
                        <Unlock size={13} />
                        <span>Authorize & Unlock Name</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="profile-specialty-title">
                  {profileModalCandidate.specialty}
                </div>
                <div className="profile-notes-text">
                  "{profileModalCandidate.notes}"
                </div>
              </div>

              {/* Match Criteria Quad Grid */}
              <div className="profile-criteria-grid">
                <div className="criteria-card">
                  <span className="crit-lbl">Match Score</span>
                  <span
                    className={`crit-val score ${getScoreBadgeClass(
                      profileModalCandidate.matchScore
                    )}`}
                  >
                    {profileModalCandidate.matchScore}%
                  </span>
                </div>

                <div className="criteria-card">
                  <span className="crit-lbl">Experience</span>
                  <span className="crit-val green">
                    <CheckCircle size={13} /> {profileModalCandidate.experienceMatch}
                  </span>
                  <span className="crit-sub">{profileModalCandidate.experienceDetail}</span>
                </div>

                <div className="criteria-card">
                  <span className="crit-lbl">Location Suitability</span>
                  <span
                    className={`crit-val ${
                      profileModalCandidate.locationMatch === 'Suitable'
                        ? 'green'
                        : 'red'
                    }`}
                  >
                    {profileModalCandidate.locationMatch}
                  </span>
                  <span className="crit-sub">{profileModalCandidate.locationDetail}</span>
                </div>

                <div className="criteria-card">
                  <span className="crit-lbl">Salary Match</span>
                  <span className="crit-val blue">
                    {profileModalCandidate.salaryMatch}
                  </span>
                  <span className="crit-sub">{profileModalCandidate.salaryDetail}</span>
                </div>
              </div>

              {/* Skills Verification Breakdown */}
              <div className="profile-section-box">
                <div className="section-box-header">
                  <Sparkles size={15} />
                  <span>Skills Match Breakdown</span>
                </div>
                <div className="skills-breakdown-content">
                  <span className="skills-full-text">
                    {profileModalCandidate.skillsMatch}
                  </span>
                </div>
              </div>

              {/* Screening & Recruitment Stage Status */}
              <div className="profile-section-box">
                <div className="section-box-header">
                  <Layers size={15} />
                  <span>Screening & Recruitment Progression</span>
                </div>
                <div className="stage-progression-content">
                  <div className="stage-row">
                    <span className="stage-lbl">Response:</span>
                    <span className="stage-val">
                      {profileModalCandidate.response} ({profileModalCandidate.responseDate})
                    </span>
                  </div>
                  <div className="stage-row">
                    <span className="stage-lbl">Screening Status:</span>
                    <span
                      className={`screening-status-chip status-${profileModalCandidate.screeningStatus
                        .toLowerCase()
                        .replace(/\s+/g, '-')}`}
                    >
                      {profileModalCandidate.screeningStatus}
                    </span>
                  </div>
                  {profileModalCandidate.screeningAssessment && (
                    <div className="stage-row">
                      <span className="stage-lbl">Assigned Test:</span>
                      <span className="stage-val">
                        {profileModalCandidate.screeningAssessment}
                      </span>
                    </div>
                  )}
                  {profileModalCandidate.screeningScore && (
                    <div className="stage-row">
                      <span className="stage-lbl">Test Score & Result:</span>
                      <span
                        className={`result-tag ${
                          profileModalCandidate.screeningResult === 'Qualified'
                            ? 'qualified'
                            : 'review-required'
                        }`}
                      >
                        {profileModalCandidate.screeningScore}% (
                        {profileModalCandidate.screeningResult})
                      </span>
                    </div>
                  )}
                  <div className="stage-row">
                    <span className="stage-lbl">Current Stage:</span>
                    <span className="stage-val bold">
                      {profileModalCandidate.recruitmentStage}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="responses-modal-footer">
              <button
                type="button"
                className="btn-modal-cancel"
                onClick={() => setViewMode('details')}
              >
                Back to Candidates
              </button>

              {profileModalCandidate.screeningStatus === 'Completed' &&
              profileModalCandidate.screeningResult === 'Qualified' &&
              profileModalCandidate.recruitmentStage !== 'Shortlisted' ? (
                <button
                  type="button"
                  className="btn-modal-submit green"
                  onClick={() => handleMoveToShortlisted(profileModalCandidate)}
                >
                  <UserCheck size={15} />
                  <span>Move Candidate to Shortlisted</span>
                </button>
              ) : profileModalCandidate.screeningStatus === 'Not Sent' &&
                profileModalCandidate.response === 'Interested' ? (
                <button
                  type="button"
                  className="btn-modal-submit"
                  onClick={() => {
                    const cand = profileModalCandidate;
                    handleOpenScreeningModal(cand);
                  }}
                >
                  <Send size={15} />
                  <span>Send Screening Assessment</span>
                </button>
              ) : null}
            </div>
          </div>
      )}
    </div>
  );
};
