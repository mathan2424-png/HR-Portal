import React, { useState } from 'react';
import {
  Search,
  Send,
  ChevronLeft,
  ArrowLeft,
  ChevronRight,
  Clock,
  Calendar,
  AlertCircle,
  CheckCircle,
  XCircle,
  RotateCcw,
  Bell,
  Zap,
  Users,
  Sparkles,
  Briefcase,
  MapPin,
  DollarSign,
  Award,
  Sliders,
  ExternalLink,
  RefreshCw,
  Mail,
  Smartphone,
  Layers,
  CheckSquare,
  Square,
  Trash2,
  Check,
  CheckCircle2,
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import './CandidateMatching.css';

// 1. Published Jobs Available for Candidate Matching
const publishedJobsList = [
  {
    id: 'JOB-2026-001',
    title: 'Senior Frontend Engineer',
    department: 'Engineering & Technology',
    status: 'Published',
    location: 'Chennai HQ Campus',
    workMode: 'Hybrid',
    experienceRequired: '4 - 8 Yrs',
    salaryRange: '₹18,00,000 - ₹28,00,000',
    minExp: 4,
    maxExp: 8,
    requiredSkills: ['React.js', 'TypeScript', 'Next.js', 'Redux', 'TailwindCSS'],
    totalMatchedCount: 38,
    avgScore: 89.2,
    highScore: 96,
  },
  {
    id: 'JOB-2026-002',
    title: 'Lead Product Designer',
    department: 'Design & UX',
    status: 'Published',
    location: 'Coimbatore Tech Park',
    workMode: 'On-site',
    experienceRequired: '5 - 9 Yrs',
    salaryRange: '₹20,00,000 - ₹30,00,000',
    minExp: 5,
    maxExp: 9,
    requiredSkills: ['Figma', 'Design Systems', 'UX Research', 'Prototyping'],
    totalMatchedCount: 24,
    avgScore: 88.5,
    highScore: 94,
  },
  {
    id: 'JOB-2026-004',
    title: 'DevOps & Cloud Architect',
    department: 'Engineering & Technology',
    status: 'Published',
    location: 'Remote - Tamil Nadu',
    workMode: 'Remote',
    experienceRequired: '6 - 10 Yrs',
    salaryRange: '₹25,00,000 - ₹35,00,000',
    minExp: 6,
    maxExp: 10,
    requiredSkills: ['Kubernetes', 'AWS Cloud', 'Terraform', 'Docker', 'CI/CD'],
    totalMatchedCount: 19,
    avgScore: 87.0,
    highScore: 95,
  },
  {
    id: 'JOB-2026-003',
    title: 'Senior Technical Recruiter',
    department: 'Human Resources',
    status: 'Published',
    location: 'Chennai HQ Campus',
    workMode: 'Hybrid',
    experienceRequired: '3 - 6 Yrs',
    salaryRange: '₹10,00,000 - ₹15,00,000',
    minExp: 3,
    maxExp: 6,
    requiredSkills: ['Tech Sourcing', 'ATS Management', 'Screening', 'Offer Negotiation'],
    totalMatchedCount: 45,
    avgScore: 84.8,
    highScore: 92,
  },
  {
    id: 'JOB-2026-005',
    title: 'Enterprise Account Executive',
    department: 'Business Development',
    status: 'Published',
    location: 'Madurai Delivery Center',
    workMode: 'Hybrid',
    experienceRequired: '4 - 7 Yrs',
    salaryRange: '₹14,00,000 - ₹22,00,000',
    minExp: 4,
    maxExp: 7,
    requiredSkills: ['B2B SaaS Sales', 'Enterprise Demos', 'Pipeline Management'],
    totalMatchedCount: 15,
    avgScore: 81.2,
    highScore: 88,
  },
];

// 2. Initial Matched Candidates Database (References only, no duplicate candidate profiles stored)
const initialMatchedCandidates = [
  // For JOB-2026-001 (Senior Frontend Engineer)
  {
    id: 'CAN-REF-1042',
    jobId: 'JOB-2026-001',
    specialty: 'Senior React & Next.js Specialist',
    matchScore: 96,
    skillsMatch: '95% (React.js, TypeScript, Next.js, Redux)',
    skillsMatchedCount: '4/5 Matched',
    experienceMatch: 'Meets Required',
    experienceDetail: '5.5 Yrs (Req: 4 - 8 Yrs)',
    experienceSuitable: true,
    locationMatch: 'Suitable',
    locationDetail: 'Chennai HQ / Hybrid',
    salaryMatch: 'Within Budget',
    salaryDetail: 'Exp: ₹22L vs ₹18-28L',
    availability: 'Immediate',
    lastActive: 'Active 2h ago',
  },
  {
    id: 'CAN-REF-1038',
    jobId: 'JOB-2026-001',
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
    lastActive: 'Active 5h ago',
  },
  {
    id: 'CAN-REF-1055',
    jobId: 'JOB-2026-001',
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
    lastActive: 'Active 1d ago',
  },
  {
    id: 'CAN-REF-1064',
    jobId: 'JOB-2026-001',
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
    lastActive: 'Active 2d ago',
  },
  {
    id: 'CAN-REF-1071',
    jobId: 'JOB-2026-001',
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
    lastActive: 'Active 4h ago',
  },
  {
    id: 'CAN-REF-1083',
    jobId: 'JOB-2026-001',
    specialty: 'Senior Frontend Developer',
    matchScore: 82,
    skillsMatch: '80% (React.js, Redux, TailwindCSS)',
    skillsMatchedCount: '3/5 Matched',
    experienceMatch: 'Meets Required',
    experienceDetail: '4.0 Yrs (Req: 4 - 8 Yrs)',
    experienceSuitable: true,
    locationMatch: 'Not Suitable',
    locationDetail: 'Bengaluru (Relocating)',
    salaryMatch: 'Within Budget',
    salaryDetail: 'Exp: ₹21L vs ₹18-28L',
    availability: '15 Days Notice',
    lastActive: 'Active 1d ago',
  },
  {
    id: 'CAN-REF-1092',
    jobId: 'JOB-2026-001',
    specialty: 'Staff Frontend Engineer',
    matchScore: 79,
    skillsMatch: '75% (React.js, Next.js)',
    skillsMatchedCount: '2/5 Matched',
    experienceMatch: 'Meets Required',
    experienceDetail: '7.5 Yrs (Req: 4 - 8 Yrs)',
    experienceSuitable: true,
    locationMatch: 'Suitable',
    locationDetail: 'Chennai HQ Campus',
    salaryMatch: 'Within Budget',
    salaryDetail: 'Exp: ₹27L vs ₹18-28L',
    availability: 'Notice Period',
    lastActive: 'Active 3d ago',
  },
  {
    id: 'CAN-REF-1104',
    jobId: 'JOB-2026-001',
    specialty: 'UI & JavaScript Engineer',
    matchScore: 74,
    skillsMatch: '70% (React.js, TailwindCSS)',
    skillsMatchedCount: '2/5 Matched',
    experienceMatch: 'Meets Required',
    experienceDetail: '4.0 Yrs (Req: 4 - 8 Yrs)',
    experienceSuitable: true,
    locationMatch: 'Suitable',
    locationDetail: 'Chennai HQ / Hybrid',
    salaryMatch: 'Within Budget',
    salaryDetail: 'Exp: ₹18L vs ₹18-28L',
    availability: 'Other',
    lastActive: 'Active 4d ago',
  },

  // For JOB-2026-002 (Lead Product Designer)
  {
    id: 'CAN-REF-2015',
    jobId: 'JOB-2026-002',
    specialty: 'Principal Design System Lead',
    matchScore: 94,
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
    lastActive: 'Active 1h ago',
  },
  {
    id: 'CAN-REF-2028',
    jobId: 'JOB-2026-002',
    specialty: 'Senior Product & Interaction Designer',
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
    lastActive: 'Active 6h ago',
  },
  {
    id: 'CAN-REF-2034',
    jobId: 'JOB-2026-002',
    specialty: 'SaaS UX & Visual Designer',
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
    lastActive: 'Active 2d ago',
  },
  {
    id: 'CAN-REF-2049',
    jobId: 'JOB-2026-002',
    specialty: 'Mobile & Web UX Researcher',
    matchScore: 80,
    skillsMatch: '75% (Figma, UX Research)',
    skillsMatchedCount: '2/4 Matched',
    experienceMatch: 'Meets Required',
    experienceDetail: '5.0 Yrs (Req: 5 - 9 Yrs)',
    experienceSuitable: true,
    locationMatch: 'Not Suitable',
    locationDetail: 'Hyderabad (Requires Relocation)',
    salaryMatch: 'Within Budget',
    salaryDetail: 'Exp: ₹25L vs ₹20-30L',
    availability: 'Notice Period',
    lastActive: 'Active 3d ago',
  },

  // For JOB-2026-004 (DevOps & Cloud Architect)
  {
    id: 'CAN-REF-4011',
    jobId: 'JOB-2026-004',
    specialty: 'Staff Kubernetes & Cloud Infrastructure Lead',
    matchScore: 95,
    skillsMatch: '95% (Kubernetes, AWS Cloud, Terraform, Docker, CI/CD)',
    skillsMatchedCount: '5/5 Matched',
    experienceMatch: 'Meets Required',
    experienceDetail: '8.5 Yrs (Req: 6 - 10 Yrs)',
    experienceSuitable: true,
    locationMatch: 'Suitable',
    locationDetail: 'Remote - Tamil Nadu',
    salaryMatch: 'Within Budget',
    salaryDetail: 'Exp: ₹32L vs ₹25-35L',
    availability: 'Immediate',
    lastActive: 'Active 30m ago',
  },
  {
    id: 'CAN-REF-4026',
    jobId: 'JOB-2026-004',
    specialty: 'Senior DevOps & SRE Engineer',
    matchScore: 88,
    skillsMatch: '85% (Kubernetes, AWS Cloud, Terraform, Docker)',
    skillsMatchedCount: '4/5 Matched',
    experienceMatch: 'Meets Required',
    experienceDetail: '7.5 Yrs (Req: 6 - 10 Yrs)',
    experienceSuitable: true,
    locationMatch: 'Suitable',
    locationDetail: 'Remote - Tamil Nadu',
    salaryMatch: 'Within Budget',
    salaryDetail: 'Exp: ₹28L vs ₹25-35L',
    availability: '30 Days Notice',
    lastActive: 'Active 3h ago',
  },

  // For JOB-2026-003 (Senior Technical Recruiter)
  {
    id: 'CAN-REF-3008',
    jobId: 'JOB-2026-003',
    specialty: 'Lead Tech Talent Partner',
    matchScore: 92,
    skillsMatch: '95% (Tech Sourcing, Screening, ATS, Negotiation)',
    skillsMatchedCount: '4/4 Matched',
    experienceMatch: 'Meets Required',
    experienceDetail: '4.5 Yrs (Req: 3 - 6 Yrs)',
    experienceSuitable: true,
    locationMatch: 'Suitable',
    locationDetail: 'Chennai HQ Campus',
    salaryMatch: 'Within Budget',
    salaryDetail: 'Exp: ₹13L vs ₹10-15L',
    availability: 'Immediate',
    lastActive: 'Active 1h ago',
  },
  {
    id: 'CAN-REF-3015',
    jobId: 'JOB-2026-003',
    specialty: 'Engineering Recruitment Lead',
    matchScore: 85,
    skillsMatch: '85% (Tech Sourcing, Screening, Negotiation)',
    skillsMatchedCount: '3/4 Matched',
    experienceMatch: 'Meets Required',
    experienceDetail: '4.0 Yrs (Req: 3 - 6 Yrs)',
    experienceSuitable: true,
    locationMatch: 'Suitable',
    locationDetail: 'Chennai HQ Campus',
    salaryMatch: 'Within Budget',
    salaryDetail: 'Exp: ₹12L vs ₹10-15L',
    availability: '15 Days Notice',
    lastActive: 'Active 4h ago',
  },

  // For JOB-2026-005 (Enterprise Account Executive)
  {
    id: 'CAN-REF-5002',
    jobId: 'JOB-2026-005',
    specialty: 'B2B SaaS Enterprise Closer',
    matchScore: 88,
    skillsMatch: '90% (B2B SaaS Sales, Enterprise Demos, Pipeline)',
    skillsMatchedCount: '3/3 Matched',
    experienceMatch: 'Meets Required',
    experienceDetail: '5.5 Yrs (Req: 4 - 7 Yrs)',
    experienceSuitable: true,
    locationMatch: 'Suitable',
    locationDetail: 'Madurai Delivery Center',
    salaryMatch: 'Within Budget',
    salaryDetail: 'Exp: ₹18L vs ₹14-22L',
    availability: 'Immediate',
    lastActive: 'Active 2h ago',
  },
];

// 3. Initial Alert History and Delivery Results Data
const initialAlertHistory = [
  {
    id: 'ALT-DISP-001',
    jobId: 'JOB-2026-001',
    jobTitle: 'Senior Frontend Engineer (JOB-2026-001)',
    alertChannel: 'Email + In-App',
    candidateCount: 38,
    alertStatus: 'Sent',
    alertDateType: 'Sent Date',
    alertDate: '12-Oct-2026 02:30 PM',
    creditsUsed: 38,
    deliveryResults: '36 Delivered (94.7%), 2 Bounced',
    deliveryRate: '94.7%',
    successCount: 36,
    failedCount: 2,
    scheduledTimestamp: null,
  },
  {
    id: 'ALT-DISP-002',
    jobId: 'JOB-2026-002',
    jobTitle: 'Lead Product Designer (JOB-2026-002)',
    alertChannel: 'Email',
    candidateCount: 24,
    alertStatus: 'Sent',
    alertDateType: 'Sent Date',
    alertDate: '11-Oct-2026 11:15 AM',
    creditsUsed: 24,
    deliveryResults: '24 Delivered (100%), 0 Bounced',
    deliveryRate: '100%',
    successCount: 24,
    failedCount: 0,
    scheduledTimestamp: null,
  },
  {
    id: 'ALT-DISP-003',
    jobId: 'JOB-2026-004',
    jobTitle: 'DevOps & Cloud Architect (JOB-2026-004)',
    alertChannel: 'Email + Push',
    candidateCount: 19,
    alertStatus: 'Scheduled',
    alertDateType: 'Scheduled Date',
    alertDate: '16-Oct-2026 10:00 AM',
    creditsUsed: 19,
    deliveryResults: 'Queued for automated dispatch at 10:00 AM',
    deliveryRate: 'Pending',
    successCount: 0,
    failedCount: 0,
    scheduledTimestamp: '2026-10-16T10:00',
  },
  {
    id: 'ALT-DISP-004',
    jobId: 'JOB-2026-003',
    jobTitle: 'Senior Technical Recruiter (JOB-2026-003)',
    alertChannel: 'In-App + Push',
    candidateCount: 45,
    alertStatus: 'Sent',
    alertDateType: 'Sent Date',
    alertDate: '10-Oct-2026 04:45 PM',
    creditsUsed: 45,
    deliveryResults: '45 Delivered (100%), 0 Bounced',
    deliveryRate: '100%',
    successCount: 45,
    failedCount: 0,
    scheduledTimestamp: null,
  },
  {
    id: 'ALT-DISP-005',
    jobId: 'JOB-2026-005',
    jobTitle: 'Enterprise Account Executive (JOB-2026-005)',
    alertChannel: 'Email',
    candidateCount: 15,
    alertStatus: 'Draft',
    alertDateType: 'Draft Date',
    alertDate: 'Not Dispatched (Draft)',
    creditsUsed: 0,
    deliveryResults: 'Draft configuration, not dispatched yet',
    deliveryRate: 'Draft',
    successCount: 0,
    failedCount: 0,
    scheduledTimestamp: null,
  },
  {
    id: 'ALT-DISP-006',
    jobId: 'JOB-2026-001',
    jobTitle: 'Senior Frontend Engineer (JOB-2026-001)',
    alertChannel: 'In-App',
    candidateCount: 12,
    alertStatus: 'Partially Failed',
    alertDateType: 'Sent Date',
    alertDate: '09-Oct-2026 06:10 PM',
    creditsUsed: 12,
    deliveryResults: '9 Delivered (75%), 3 Provider Timeout',
    deliveryRate: '75.0%',
    successCount: 9,
    failedCount: 3,
    scheduledTimestamp: null,
  },
];

export const CandidateMatching = () => {
  const { notifications, setNotifications } = usePortal();

  // 1. Current Active View Tab: 'candidates' | 'history'
  const [activeTab, setActiveTab] = useState('candidates');

  // 2. Selected Published Job (Screen Structure 1)
  const [selectedJobId, setSelectedJobId] = useState('JOB-2026-001');

  // 3. Alert Balance (from Plan)
  const [availableCredits, setAvailableCredits] = useState(550);

  // 4. Candidate List State
  const [matchedCandidates, setMatchedCandidates] = useState(initialMatchedCandidates);
  const [selectedCandidateIds, setSelectedCandidateIds] = useState([]);
  const [candidateSearchTerm, setCandidateSearchTerm] = useState('');
  const [minScoreFilter, setMinScoreFilter] = useState('All');
  const [availabilityFilter, setAvailabilityFilter] = useState('All');
  const [locationFilter, setLocationFilter] = useState('All');

  // 5. Alert History State (Screen Structure 4)
  const [alertHistory, setAlertHistory] = useState(initialAlertHistory);
  const [historySearchTerm, setHistorySearchTerm] = useState('');
  const [historyStatusFilter, setHistoryStatusFilter] = useState('All');

  // 6. Send / Schedule Alerts Modal State (Screen Structure 3)
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [alertChannels, setAlertChannels] = useState({
    email: true,
    inApp: true,
    push: false,
  });
  const [dispatchTiming, setDispatchTiming] = useState('immediate'); // 'immediate' | 'schedule' | 'draft'
  const [scheduledDateTime, setScheduledDateTime] = useState('2026-10-16T10:00');
  const [alertSubject, setAlertSubject] = useState('');
  const [alertNote, setAlertNote] = useState('');

  // 7. Toast Message
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3800);
  };

  // Selected published job object
  const selectedJob =
    publishedJobsList.find((j) => j.id === selectedJobId) || publishedJobsList[0];

  // Candidates for the currently selected published job
  const jobCandidates = matchedCandidates.filter((c) => c.jobId === selectedJobId);

  // Filter candidates based on toolbar inputs
  const filteredCandidates = jobCandidates.filter((cand) => {
    const searchMatch =
      cand.id.toLowerCase().includes(candidateSearchTerm.toLowerCase()) ||
      cand.specialty.toLowerCase().includes(candidateSearchTerm.toLowerCase()) ||
      cand.skillsMatch.toLowerCase().includes(candidateSearchTerm.toLowerCase()) ||
      cand.locationDetail.toLowerCase().includes(candidateSearchTerm.toLowerCase());

    const scoreMatch =
      minScoreFilter === 'All'
        ? true
        : minScoreFilter === '90'
        ? cand.matchScore >= 90
        : minScoreFilter === '80'
        ? cand.matchScore >= 80
        : cand.matchScore >= 70;

    const availMatch =
      availabilityFilter === 'All' ? true : cand.availability === availabilityFilter;

    const locMatch =
      locationFilter === 'All' ? true : cand.locationMatch === locationFilter;

    return searchMatch && scoreMatch && availMatch && locMatch;
  });

  // Candidate Matching Pagination State (8 items per page)
  const [candidatesPage, setCandidatesPage] = useState(1);
  const candidatesPerPage = 8;
  const totalCandidatesPages = Math.ceil(filteredCandidates.length / candidatesPerPage) || 1;
  const paginatedCandidates = filteredCandidates.slice(
    (candidatesPage - 1) * candidatesPerPage,
    candidatesPage * candidatesPerPage
  );

  // Select all or deselect in candidate list
  const handleToggleSelectAll = () => {
    if (selectedCandidateIds.length === filteredCandidates.length) {
      setSelectedCandidateIds([]);
    } else {
      setSelectedCandidateIds(filteredCandidates.map((c) => c.id));
    }
  };

  const handleToggleCandidate = (id) => {
    setSelectedCandidateIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Open the Send / Schedule Alert Modal
  const handleOpenAlertModal = (candidatesToTarget = null) => {
    const targetIds = candidatesToTarget
      ? [candidatesToTarget.id]
      : selectedCandidateIds.length > 0
      ? selectedCandidateIds
      : filteredCandidates.map((c) => c.id);

    if (candidatesToTarget) {
      setSelectedCandidateIds([candidatesToTarget.id]);
    } else if (selectedCandidateIds.length === 0) {
      setSelectedCandidateIds(filteredCandidates.map((c) => c.id));
    }

    setAlertSubject(`Exciting Career Match: ${selectedJob.title} at Marutham Technologies`);
    setAlertNote(
      `Your profile closely matches our required criteria for ${selectedJob.title} (${selectedJob.experienceRequired}, ${selectedJob.workMode} in ${selectedJob.location}). We invite you to review and confirm your interest.`
    );
    setDispatchTiming('immediate');
    setAlertModalOpen(true);
  };

  // Channel toggle handler
  const handleChannelToggle = (channel) => {
    setAlertChannels((prev) => {
      const updated = { ...prev, [channel]: !prev[channel] };
      // Keep at least one channel selected
      if (!updated.email && !updated.inApp && !updated.push) {
        return prev;
      }
      return updated;
    });
  };

  // Execute Dispatch or Schedule Alert
  const handleExecuteAlertDispatch = () => {
    const targetCount = selectedCandidateIds.length || filteredCandidates.length;

    // Calculate channels string
    const activeChannels = [];
    if (alertChannels.email) activeChannels.push('Email');
    if (alertChannels.inApp) activeChannels.push('In-App');
    if (alertChannels.push) activeChannels.push('Push');
    const channelString = activeChannels.join(' + ');

    const nowStr = new Date().toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    let newStatus = 'Sent';
    let dateLabel = `Sent: ${nowStr}`;
    let dateType = 'Sent Date';
    let creditsDeducted = targetCount;
    let deliveryNote = `${targetCount} Delivered (100%), 0 Bounced`;

    if (dispatchTiming === 'schedule') {
      newStatus = 'Scheduled';
      const formattedScheduledDate = new Date(scheduledDateTime).toLocaleString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
      dateLabel = `Scheduled: ${formattedScheduledDate}`;
      dateType = 'Scheduled Date';
      deliveryNote = `Automated queue scheduled for ${formattedScheduledDate}`;
    } else if (dispatchTiming === 'draft') {
      newStatus = 'Draft';
      dateLabel = 'Not Dispatched (Draft)';
      dateType = 'Draft Date';
      creditsDeducted = 0;
      deliveryNote = 'Saved as draft configuration';
    }

    const newAlertRecord = {
      id: `ALT-DISP-${String(alertHistory.length + 1).padStart(3, '0')}`,
      jobId: selectedJob.id,
      jobTitle: `${selectedJob.title} (${selectedJob.id})`,
      alertChannel: channelString,
      candidateCount: targetCount,
      alertStatus: newStatus,
      alertDateType: dateType,
      alertDate: dateLabel,
      creditsUsed: creditsDeducted,
      deliveryResults: deliveryNote,
      deliveryRate: newStatus === 'Sent' ? '100%' : newStatus === 'Scheduled' ? 'Pending' : 'Draft',
      successCount: newStatus === 'Sent' ? targetCount : 0,
      failedCount: 0,
      scheduledTimestamp: dispatchTiming === 'schedule' ? scheduledDateTime : null,
    };

    setAlertHistory([newAlertRecord, ...alertHistory]);
    if (creditsDeducted > 0) {
      setAvailableCredits((prev) => Math.max(0, prev - creditsDeducted));
    }

    // Also push into portal context notifications for live visibility
    if (newStatus === 'Sent' && setNotifications) {
      const portalNotif = {
        id: `NTF-MATCH-${Date.now()}`,
        notificationType: 'Candidate response',
        title: `Job Alert Dispatched to ${targetCount} Candidates`,
        message: `Alert broadcast dispatched for ${selectedJob.title} (${selectedJob.id}) via ${channelString}.`,
        dateTime: nowStr,
        readStatus: 'Unread',
        recipient: 'Recruitment Team',
      };
      setNotifications((prev) => [portalNotif, ...prev]);
    }

    setAlertModalOpen(false);
    setSelectedCandidateIds([]);

    if (newStatus === 'Sent') {
      showToast(`Successfully dispatched alert to ${targetCount} matching candidates via ${channelString}!`);
      setActiveTab('history');
    } else if (newStatus === 'Scheduled') {
      showToast(`Alert scheduled for ${dateLabel}!`);
      setActiveTab('history');
    } else {
      showToast('Alert configuration saved as draft.');
      setActiveTab('history');
    }
  };

  // Quick Resend from History
  const handleQuickResend = (record) => {
    const nowStr = new Date().toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
    setAlertHistory((prev) =>
      prev.map((item) =>
        item.id === record.id
          ? {
              ...item,
              alertStatus: 'Sent',
              alertDateType: 'Sent Date',
              alertDate: `Sent: ${nowStr}`,
              creditsUsed: item.candidateCount,
              deliveryResults: `${item.candidateCount} Delivered (100%), 0 Bounced`,
              deliveryRate: '100%',
              successCount: item.candidateCount,
              failedCount: 0,
            }
          : item
      )
    );
    showToast(`Alert "${record.id}" re-dispatched to ${record.candidateCount} candidates!`);
  };

  // Cancel Scheduled Alert
  const handleCancelScheduled = (record) => {
    if (window.confirm(`Cancel scheduled alert dispatch for "${record.jobTitle}"?`)) {
      setAlertHistory((prev) =>
        prev.map((item) =>
          item.id === record.id
            ? {
                ...item,
                alertStatus: 'Draft',
                alertDateType: 'Draft Date',
                alertDate: 'Cancelled (Draft)',
                deliveryResults: 'Scheduled dispatch was cancelled by user',
                deliveryRate: 'Cancelled',
              }
            : item
        )
      );
      showToast(`Scheduled dispatch cancelled for "${record.id}".`);
    }
  };

  // Delete Record from History
  const handleDeleteHistory = (record) => {
    if (window.confirm(`Remove alert history record "${record.id}"?`)) {
      setAlertHistory((prev) => prev.filter((item) => item.id !== record.id));
      showToast(`Record "${record.id}" removed.`);
    }
  };

  // Filter history records
  const filteredHistory = alertHistory.filter((rec) => {
    const searchMatch =
      rec.id.toLowerCase().includes(historySearchTerm.toLowerCase()) ||
      rec.jobTitle.toLowerCase().includes(historySearchTerm.toLowerCase()) ||
      rec.alertChannel.toLowerCase().includes(historySearchTerm.toLowerCase()) ||
      rec.deliveryResults.toLowerCase().includes(historySearchTerm.toLowerCase());

    const statusMatch =
      historyStatusFilter === 'All' ? true : rec.alertStatus === historyStatusFilter;

    return searchMatch && statusMatch;
  });

  // Alert History Pagination State (8 items per page)
  const [historyPage, setHistoryPage] = useState(1);
  const historyPerPage = 8;
  const totalHistoryPages = Math.ceil(filteredHistory.length / historyPerPage) || 1;
  const paginatedHistory = filteredHistory.slice(
    (historyPage - 1) * historyPerPage,
    historyPage * historyPerPage
  );

  // Score styling helper
  const getScoreBadgeClass = (score) => {
    if (score >= 90) return 'score-high';
    if (score >= 80) return 'score-mid';
    return 'score-fair';
  };

  // Status badge class helper
  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'sent':
        return 'status-sent';
      case 'scheduled':
        return 'status-scheduled';
      case 'processing':
        return 'status-processing';
      case 'partially failed':
        return 'status-partially-failed';
      case 'failed':
        return 'status-failed';
      case 'draft':
      default:
        return 'status-draft';
    }
  };

  return (
    <div className="matching-page-container animate-fade-in">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="matching-toast-alert">
          <CheckCircle2 size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {!alertModalOpen && (
        <>
          {/* =========================================================================
              MODULE HEADER & GLOBAL STATUS
              ========================================================================= */}
          <div className="matching-page-header">
        <div className="matching-header-left">
          <h1 className="matching-page-title">Candidate Matching & Alerts</h1>
         
        </div>

        <div className="matching-header-actions">
          {/* Plan Credits Used Indicator */}
          <div className="matching-credits-pill" title="Plan Quota Credits for Candidate Alerts">
            <Zap size={14} className="credits-bolt" />
            <span className="credits-val">{availableCredits} Alerts</span>
            <span className="credits-lbl">Available</span>
          </div>

          <button
            type="button"
            className="btn-dispatch-alerts-primary"
            onClick={() => handleOpenAlertModal()}
          >
            <Send size={15} />
            <span>Send / Schedule Alerts</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          SCREEN STRUCTURE 1: JOB-WISE MATCHING SUMMARY
          ========================================================================= */}
      <section className="job-summary-card">
        <div className="job-summary-top-row">
          <div className="job-selector-wrap">
            <label className="job-selector-label">
              <Briefcase size={14} />
              <span>Select Published Job:</span>
            </label>
            <select
              value={selectedJobId}
              onChange={(e) => {
                setSelectedJobId(e.target.value);
                setSelectedCandidateIds([]);
              }}
              className="job-selector-dropdown"
            >
              {publishedJobsList.map((job) => (
                <option key={job.id} value={job.id}>
                  {job.title} ({job.id}) • {job.totalMatchedCount} Matched Candidates
                </option>
              ))}
            </select>
          </div>

          <div className="job-status-chip-box">
            <span className="job-published-badge">
              <span className="published-ping-dot" />
              Published & Active
            </span>
            <span className="job-dept-chip">{selectedJob.department}</span>
          </div>
        </div>

        {/* Selected Job Metadata & Criteria Banner */}
        <div className="job-criteria-banner">
          <div className="criteria-metric">
            <span className="criteria-label">Required Experience</span>
            <span className="criteria-value">{selectedJob.experienceRequired}</span>
          </div>
          <div className="criteria-metric">
            <span className="criteria-label">Salary Budget</span>
            <span className="criteria-value">{selectedJob.salaryRange}</span>
          </div>
          <div className="criteria-metric">
            <span className="criteria-label">Primary Location</span>
            <span className="criteria-value">
              <MapPin size={12} /> {selectedJob.location} ({selectedJob.workMode})
            </span>
          </div>
          <div className="criteria-metric skills-metric">
            <span className="criteria-label">Key Matching Skills</span>
            <div className="criteria-skills-tags">
              {selectedJob.requiredSkills.map((sk) => (
                <span key={sk} className="criteria-skill-pill">
                  {sk}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 4 Job-Wise KPI Metric Cards */}
        <div className="job-kpi-quad-grid">
          <div className="job-kpi-card">
            
            <div className="kpi-info">
              <span className="kpi-num">{selectedJob.totalMatchedCount}</span>
              <span className="kpi-title">Eligible Candidates</span>
            </div>
          </div>

          <div className="job-kpi-card">
            
            <div className="kpi-info">
              <span className="kpi-num">{selectedJob.highScore}%</span>
              <span className="kpi-title">Highest Match Score</span>
            </div>
          </div>

          <div className="job-kpi-card">
            
            <div className="kpi-info">
              <span className="kpi-num">{selectedJob.avgScore}%</span>
              <span className="kpi-title">Average Match Score</span>
            </div>
          </div>

          <div className="job-kpi-card">
            
            <div className="kpi-info">
              <span className="kpi-num">{selectedJob.totalMatchedCount}</span>
              <span className="kpi-title">Alert Credits Required</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MODULE NAVIGATION TABS (SCREEN STRUCTURE 2, 3, 4)
          ========================================================================= */}
      <div className="matching-tabs-nav">
        <button
          type="button"
          className={`matching-tab-btn ${activeTab === 'candidates' ? 'active' : ''}`}
          onClick={() => setActiveTab('candidates')}
        >
          <Users size={16} />
          <span>Matched Candidate List</span>
          <span className="tab-badge">{jobCandidates.length}</span>
        </button>

        <button
          type="button"
          className={`matching-tab-btn ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          <Clock size={16} />
          <span>Alert History & Delivery Results</span>
          <span className="tab-badge">{alertHistory.length}</span>
        </button>
      </div>

      {/* =========================================================================
          SCREEN STRUCTURE 2: MATCHED CANDIDATE LIST WITH SCORES & CRITERIA
          ========================================================================= */}
      {activeTab === 'candidates' && (
        <div className="matching-tab-content">
          {/* Candidate Filter & Action Toolbar */}
          <div className="candidate-toolbar-card">
            <div className="toolbar-left-group">
              <div className="candidate-search-box">
                <Search size={15} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={candidateSearchTerm}
                  onChange={(e) => setCandidateSearchTerm(e.target.value)}
                  className="candidate-search-input"
                />
              </div>

              <select
                value={minScoreFilter}
                onChange={(e) => setMinScoreFilter(e.target.value)}
                className="candidate-filter-select"
              >
                <option value="All">All Match Scores</option>
                <option value="90">90%+ High Match</option>
                <option value="80">80%+ Medium Match</option>
                <option value="70">70%+ Fair Match</option>
              </select>

              <select
                value={availabilityFilter}
                onChange={(e) => setAvailabilityFilter(e.target.value)}
                className="candidate-filter-select"
              >
                <option value="All">All Availability</option>
                <option value="Immediate">Immediate</option>
                <option value="15 Days Notice">15 Days Notice</option>
                <option value="30 Days Notice">30 Days Notice</option>
                <option value="Notice Period">Notice Period</option>
              </select>

              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="candidate-filter-select"
              >
                <option value="All">All Location Status</option>
                <option value="Suitable">Suitable Location</option>
                <option value="Not Suitable">Not Suitable</option>
              </select>
            </div>

            {/* Selection & Quick Trigger Action */}
            <div className="toolbar-right-group">
              <span className="selected-counter-text">
                <strong>{selectedCandidateIds.length}</strong> of {filteredCandidates.length} Selected
              </span>

              <button
                type="button"
                className="btn-select-all-toggle"
                onClick={handleToggleSelectAll}
              >
                {selectedCandidateIds.length === filteredCandidates.length &&
                filteredCandidates.length > 0 ? (
                  <>
                    <CheckSquare size={14} />
                    <span>Deselect All</span>
                  </>
                ) : (
                  <>
                    <Square size={14} />
                    <span>Select All ({filteredCandidates.length})</span>
                  </>
                )}
              </button>

              <button
                type="button"
                className="btn-trigger-alerts-action"
                onClick={() => handleOpenAlertModal()}
                disabled={filteredCandidates.length === 0}
              >
                <Send size={14} />
                <span>
                  {selectedCandidateIds.length > 0
                    ? `Alert (${selectedCandidateIds.length}) Candidates`
                    : 'Alert All Candidates'}
                </span>
              </button>
            </div>
          </div>

          {/* Matched Candidates Data Table */}
          <div className="matching-table-card">
            <div className="table-responsive-wrapper">
              <table className="matching-data-table">
                <thead>
                  <tr>
                    <th style={{ width: '45px', textAlign: 'center' }}>
                      <input
                        type="checkbox"
                        checked={
                          filteredCandidates.length > 0 &&
                          selectedCandidateIds.length === filteredCandidates.length
                        }
                        onChange={handleToggleSelectAll}
                        title="Select All"
                      />
                    </th>
                    <th style={{ width: '50px', textAlign: 'center' }}>S.NO</th>
                    <th>Candidate Reference</th>
                    <th>Match Score</th>
                    <th>Skills Match</th>
                    <th>Experience Match</th>
                    <th>Location Match</th>
                    <th>Salary Match</th>
                    <th>Availability</th>
                    <th style={{ textAlign: 'center' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCandidates.length === 0 ? (
                    <tr>
                      <td colSpan="10" className="table-empty-cell">
                        No matched candidates found matching your filter criteria.
                      </td>
                    </tr>
                  ) : (
                    paginatedCandidates.map((cand, index) => {
                      const isSelected = selectedCandidateIds.includes(cand.id);
                      const serialNumber = (candidatesPage - 1) * candidatesPerPage + index + 1;
                      return (
                        <tr key={cand.id} className={isSelected ? 'row-selected' : ''}>
                          {/* Checkbox */}
                          <td style={{ textAlign: 'center' }}>
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleToggleCandidate(cand.id)}
                            />
                          </td>

                          {/* S.NO */}
                          <td style={{ textAlign: 'center', fontWeight: 600 }}>{serialNumber}</td>

                          {/* Candidate Reference */}
                          <td>
                            <div className="candidate-ref-cell">
                              <span className="candidate-ref-code">{cand.id}</span>
                              <span className="candidate-specialty-sub">{cand.specialty}</span>
                            </div>
                          </td>

                          {/* Match Score */}
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

                          {/* Skills Match */}
                          <td>
                            <div className="skills-match-cell">
                              <span className="skills-match-text">{cand.skillsMatch}</span>
                              <span className="skills-matched-pill">{cand.skillsMatchedCount}</span>
                            </div>
                          </td>

                          {/* Experience Match */}
                          <td>
                            <div className="experience-match-cell">
                              <span className="exp-suitable-tag">
                                <CheckCircle size={12} /> Meets Required
                              </span>
                              <span className="exp-sub-detail">{cand.experienceDetail}</span>
                            </div>
                          </td>

                          {/* Location Match */}
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

                          {/* Salary Match */}
                          <td>
                            <div className="salary-match-cell">
                              <span className="salary-status-tag">
                                <DollarSign size={11} /> {cand.salaryMatch}
                              </span>
                              <span className="salary-detail-text">{cand.salaryDetail}</span>
                            </div>
                          </td>

                          {/* Availability */}
                          <td>
                            <span
                              className={`availability-pill avail-${cand.availability
                                .toLowerCase()
                                .replace(/[^a-z0-9]+/g, '-')}`}
                            >
                              {cand.availability}
                            </span>
                          </td>

                          {/* Action */}
                          <td style={{ textAlign: 'center' }}>
                            <button
                              type="button"
                              className="btn-inline-alert"
                              onClick={() => handleOpenAlertModal(cand)}
                              title={`Send alert to candidate ${cand.id}`}
                            >
                              <Send size={13} />
                              <span>Alert</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="companies-pagination-row">
              <div className="pagination-entries-count">
                Showing {filteredCandidates.length > 0 ? (candidatesPage - 1) * candidatesPerPage + 1 : 0} to{' '}
                {Math.min(candidatesPage * candidatesPerPage, filteredCandidates.length)} of{' '}
                {filteredCandidates.length} Entries
              </div>
              <div className="pagination-controls">
                <button
                  type="button"
                  className={`pagination-nav-btn ${candidatesPage === 1 ? 'disabled' : ''}`}
                  disabled={candidatesPage === 1}
                  onClick={() => setCandidatesPage((p) => Math.max(1, p - 1))}
                >
                  <ChevronLeft size={16} />
                </button>
                {Array.from({ length: totalCandidatesPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    type="button"
                    className={`pagination-page-btn ${candidatesPage === page ? 'active' : ''}`}
                    onClick={() => setCandidatesPage(page)}
                  >
                    {page}
                  </button>
                ))}
                <button
                  type="button"
                  className={`pagination-nav-btn ${candidatesPage === totalCandidatesPages ? 'disabled' : ''}`}
                  disabled={candidatesPage === totalCandidatesPages}
                  onClick={() => setCandidatesPage((p) => Math.min(totalCandidatesPages, p + 1))}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SCREEN STRUCTURE 4: ALERT HISTORY AND DELIVERY RESULTS
          ========================================================================= */}
      {activeTab === 'history' && (
        <div className="matching-tab-content">
          {/* History Filter Toolbar */}
          <div className="history-toolbar-card">
            <div className="history-search-box">
              <Search size={15} className="search-icon" />
              <input
                type="text"
                placeholder="Search alert ID, job title, results..."
                value={historySearchTerm}
                onChange={(e) => setHistorySearchTerm(e.target.value)}
                className="history-search-input"
              />
            </div>

            <div className="history-filter-group">
              <select
                value={historyStatusFilter}
                onChange={(e) => setHistoryStatusFilter(e.target.value)}
                className="history-status-select"
              >
                <option value="All">All Alert Statuses</option>
                <option value="Sent">Sent</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Processing">Processing</option>
                <option value="Partially Failed">Partially Failed</option>
                <option value="Failed">Failed</option>
                <option value="Draft">Draft</option>
              </select>
            </div>
          </div>

          {/* Alert History Table */}
          <div className="matching-table-card">
            <div className="table-responsive-wrapper">
              <table className="matching-data-table history-table">
                <thead>
                  <tr>
                    <th style={{ width: '55px', textAlign: 'center' }}>S.NO</th>
                    <th>Alert ID</th>
                    <th>Published Job</th>
                    <th>Alert Channel</th>
                    <th>Candidate Count</th>
                    <th>Alert Status</th>
                    <th>Alert Date</th>
                    <th>Credits Used</th>
                    <th>Delivery Results</th>
                    <th style={{ textAlign: 'center' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredHistory.length === 0 ? (
                    <tr>
                      <td colSpan="10" className="table-empty-cell">
                        No alert history records found matching your filters.
                      </td>
                    </tr>
                  ) : (
                    paginatedHistory.map((item, idx) => {
                      const serialNumber = (historyPage - 1) * historyPerPage + idx + 1;
                      return (
                      <tr key={item.id}>
                        {/* S.NO */}
                        <td style={{ textAlign: 'center', fontWeight: 600 }}>{serialNumber}</td>

                        {/* Alert ID */}
                        <td>
                          <span className="history-alert-id">{item.id}</span>
                        </td>

                        {/* Published Job */}
                        <td>
                          <span className="history-job-title">{item.jobTitle}</span>
                        </td>

                        {/* Alert Channel */}
                        <td>
                          <span className="history-channel-tag">{item.alertChannel}</span>
                        </td>

                        {/* Candidate Count */}
                        <td>
                          <span className="history-count-badge">
                            <Users size={12} /> {item.candidateCount} Candidates
                          </span>
                        </td>

                        {/* Alert Status */}
                        <td>
                          <span className={`status-badge-chip ${getStatusBadgeClass(item.alertStatus)}`}>
                            {item.alertStatus}
                          </span>
                        </td>

                        {/* Alert Date (Clearly distinguished between Scheduled and Sent) */}
                        <td>
                          <div className="history-date-cell">
                            <span className="date-main-text">{item.alertDate}</span>
                            <span className="date-type-sub">{item.alertDateType}</span>
                          </div>
                        </td>

                        {/* Credits Used */}
                        <td>
                          <span className="history-credits-badge">
                            <Zap size={11} /> {item.creditsUsed} Credits
                          </span>
                        </td>

                        {/* Delivery Results */}
                        <td>
                          <div className="history-delivery-cell">
                            <span className="delivery-results-text">{item.deliveryResults}</span>
                            {item.alertStatus === 'Sent' && (
                              <span className="delivery-rate-tag">{item.deliveryRate} Success</span>
                            )}
                          </div>
                        </td>

                        {/* Actions */}
                        <td style={{ textAlign: 'center' }}>
                          <div className="history-actions-row">
                            {item.alertStatus === 'Scheduled' && (
                              <button
                                type="button"
                                className="btn-history-action cancel"
                                onClick={() => handleCancelScheduled(item)}
                                title="Cancel Scheduled Dispatch"
                              >
                                Cancel
                              </button>
                            )}
                            {(item.alertStatus === 'Failed' ||
                              item.alertStatus === 'Partially Failed' ||
                              item.alertStatus === 'Draft') && (
                              <button
                                type="button"
                                className="btn-history-action resend"
                                onClick={() => handleQuickResend(item)}
                                title="Dispatch Now"
                              >
                                <RotateCcw size={12} />
                                <span>Dispatch</span>
                              </button>
                            )}
                            <button
                              type="button"
                              className="btn-history-action delete"
                              onClick={() => handleDeleteHistory(item)}
                              title="Delete Record"
                            >
                              <Trash2 size={13} />
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

            {/* Pagination Footer */}
            <div className="companies-pagination-row">
              <div className="pagination-entries-count">
                Showing {filteredHistory.length > 0 ? (historyPage - 1) * historyPerPage + 1 : 0} to{' '}
                {Math.min(historyPage * historyPerPage, filteredHistory.length)} of{' '}
                {filteredHistory.length} Entries
              </div>
              <div className="pagination-controls">
                <button
                  type="button"
                  className={`pagination-nav-btn ${historyPage === 1 ? 'disabled' : ''}`}
                  disabled={historyPage === 1}
                  onClick={() => setHistoryPage((p) => Math.max(1, p - 1))}
                >
                  <ChevronLeft size={16} />
                </button>
                {Array.from({ length: totalHistoryPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    type="button"
                    className={`pagination-page-btn ${historyPage === page ? 'active' : ''}`}
                    onClick={() => setHistoryPage(page)}
                  >
                    {page}
                  </button>
                ))}
                <button
                  type="button"
                  className={`pagination-nav-btn ${historyPage === totalHistoryPages ? 'disabled' : ''}`}
                  disabled={historyPage === totalHistoryPages}
                  onClick={() => setHistoryPage((p) => Math.min(totalHistoryPages, p + 1))}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )}

      {/* =========================================================================
          SCREEN STRUCTURE 3: SEND OR SCHEDULE ALERTS PAGE VIEW
          ========================================================================= */}
      {alertModalOpen && (
        <div className="matching-alert-fullpage animate-fade-in">
          {/* Navigation Top Bar */}
          <div className="matching-subpage-nav">
            <button
              type="button"
              className="btn-back-link"
              onClick={() => setAlertModalOpen(false)}
            >
              <ArrowLeft size={16} />
              <span>Back to Candidate Matching</span>
            </button>
          </div>

          <div className="matching-page-header-card">
            <div className="modal-title-wrap">
              <div className="modal-icon-ring">
                <Send size={20} />
              </div>
              <div>
                <h2 className="matching-modal-title">Send or Schedule Candidate Alerts</h2>
                <p className="matching-modal-subtitle">
                  Configure multi-channel alert delivery for {selectedJob.title} ({selectedJob.id})
                </p>
              </div>
            </div>
          </div>

          <div className="matching-page-body-card">
            <div className="matching-modal-body">
              {/* Target Candidate Summary */}
              <div className="modal-target-summary-box">
                <div className="target-metric">
                  <span className="target-lbl">Recipients:</span>
                  <span className="target-val">
                    <Users size={14} />
                    <strong>{selectedCandidateIds.length || filteredCandidates.length}</strong> Matched Candidates
                  </span>
                </div>
                <div className="target-metric">
                  <span className="target-lbl">Plan Credits to Use:</span>
                  <span className="target-credits-val">
                    <Zap size={14} />
                    <strong>{selectedCandidateIds.length || filteredCandidates.length} Credits</strong>
                    <span className="target-credits-avail">({availableCredits} Available)</span>
                  </span>
                </div>
              </div>

              {/* Alert Channel Selection */}
              <div className="modal-form-section">
                <label className="modal-section-label">
                  Alert Channels <span className="req-star">*</span>
                  <span className="sub-hint">(Multi-channel notification support)</span>
                </label>
                <div className="channel-cards-grid">
                  <div
                    className={`channel-card ${alertChannels.email ? 'active' : ''}`}
                    onClick={() => handleChannelToggle('email')}
                  >
                    <div className="channel-icon-wrap">
                      <Mail size={16} />
                    </div>
                    <div>
                      <div className="channel-name">Email Alert</div>
                      <div className="channel-desc">Automated HTML email invitation</div>
                    </div>
                    <div className="channel-checkbox">
                      {alertChannels.email && <Check size={12} />}
                    </div>
                  </div>

                  <div
                    className={`channel-card ${alertChannels.inApp ? 'active' : ''}`}
                    onClick={() => handleChannelToggle('inApp')}
                  >
                    <div className="channel-icon-wrap">
                      <Bell size={16} />
                    </div>
                    <div>
                      <div className="channel-name">In-App Alert</div>
                      <div className="channel-desc">Notification to candidate portal</div>
                    </div>
                    <div className="channel-checkbox">
                      {alertChannels.inApp && <Check size={12} />}
                    </div>
                  </div>

                  <div
                    className={`channel-card ${alertChannels.push ? 'active' : ''}`}
                    onClick={() => handleChannelToggle('push')}
                  >
                    <div className="channel-icon-wrap">
                      <Smartphone size={16} />
                    </div>
                    <div>
                      <div className="channel-name">Push Alert</div>
                      <div className="channel-desc">Mobile push notification</div>
                    </div>
                    <div className="channel-checkbox">
                      {alertChannels.push && <Check size={12} />}
                    </div>
                  </div>
                </div>
              </div>

              {/* Alert Timing: Immediate vs Schedule vs Draft */}
              <div className="modal-form-section">
                <label className="modal-section-label">
                  Alert Timing & Dispatch Mode <span className="req-star">*</span>
                </label>
                <div className="timing-options-grid">
                  <label className={`timing-option-card ${dispatchTiming === 'immediate' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="dispatchTiming"
                      value="immediate"
                      checked={dispatchTiming === 'immediate'}
                      onChange={() => setDispatchTiming('immediate')}
                    />
                    <div>
                      <div className="timing-title">
                        <Send size={13} /> Send Immediately
                      </div>
                      <div className="timing-desc">Dispatches to candidate channels right away</div>
                    </div>
                  </label>

                  <label className={`timing-option-card ${dispatchTiming === 'schedule' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="dispatchTiming"
                      value="schedule"
                      checked={dispatchTiming === 'schedule'}
                      onChange={() => setDispatchTiming('schedule')}
                    />
                    <div>
                      <div className="timing-title">
                        <Clock size={13} /> Schedule for Later
                      </div>
                      <div className="timing-desc">Automated dispatch at a future date and time</div>
                    </div>
                  </label>

                  <label className={`timing-option-card ${dispatchTiming === 'draft' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="dispatchTiming"
                      value="draft"
                      checked={dispatchTiming === 'draft'}
                      onChange={() => setDispatchTiming('draft')}
                    />
                    <div>
                      <div className="timing-title">
                        <Calendar size={13} /> Save as Draft
                      </div>
                      <div className="timing-desc">Save configuration without dispatching</div>
                    </div>
                  </label>
                </div>

                {/* Scheduled Date Picker Input */}
                {dispatchTiming === 'schedule' && (
                  <div className="scheduled-input-box animate-fade-in">
                    <label className="schedule-input-lbl">
                      Scheduled Date & Time <span className="req-star">*</span>
                    </label>
                    <input
                      type="datetime-local"
                      value={scheduledDateTime}
                      onChange={(e) => setScheduledDateTime(e.target.value)}
                      className="schedule-datetime-input"
                    />
                    <span className="schedule-hint">
                      Alerts will be queued and sent automatically at the selected time.
                    </span>
                  </div>
                )}
              </div>

              {/* Subject & Message Preview */}
              <div className="modal-form-section">
                <label className="modal-section-label">Alert Subject</label>
                <input
                  type="text"
                  value={alertSubject}
                  onChange={(e) => setAlertSubject(e.target.value)}
                  className="modal-text-input"
                  placeholder="Enter alert subject line..."
                />
              </div>

              <div className="modal-form-section">
                <label className="modal-section-label">Alert Message Note</label>
                <textarea
                  value={alertNote}
                  onChange={(e) => setAlertNote(e.target.value)}
                  rows="3"
                  className="modal-textarea-input"
                  placeholder="Personalized matching note to candidate..."
                />
              </div>
            </div>

            {/* Page Actions Footer */}
            <div className="matching-page-footer-card">
              <button
                type="button"
                className="btn-modal-cancel"
                onClick={() => setAlertModalOpen(false)}
              >
                Cancel
              </button>

              <button
                type="button"
                className="btn-modal-submit"
                onClick={handleExecuteAlertDispatch}
              >
                {dispatchTiming === 'immediate' && (
                  <>
                    <Send size={15} />
                    <span>Send Alerts Now</span>
                  </>
                )}
                {dispatchTiming === 'schedule' && (
                  <>
                    <Clock size={15} />
                    <span>Schedule Alert</span>
                  </>
                )}
                {dispatchTiming === 'draft' && (
                  <>
                    <Calendar size={15} />
                    <span>Save Draft</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
