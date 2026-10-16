import React, { useState } from 'react';
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Calendar,
  Clock,
  Video,
  Phone,
  MapPin,
  CheckCircle,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Star,
  UserCheck,
  Send,
  Eye,
  History,
  Award,
  Users,
  Briefcase,
  Layers,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Check,
  Sliders,
  AlertTriangle,
  RotateCcw,
  FileText,
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import './InterviewsModule.css';

// 1. Published Jobs Available for Interview Mapping
const availableJobs = [
  { id: 'JOB-2026-001', title: 'Senior Frontend Engineer (JOB-2026-001)', department: 'Engineering & Technology' },
  { id: 'JOB-2026-007', title: 'Software Developer (JOB-2026-007)', department: 'Engineering & Technology' },
  { id: 'JOB-2026-002', title: 'Lead Product Designer (JOB-2026-002)', department: 'Design & UX' },
  { id: 'JOB-2026-004', title: 'DevOps & Cloud Architect (JOB-2026-004)', department: 'Engineering & Technology' },
  { id: 'JOB-2026-003', title: 'HR Executive (JOB-2026-003)', department: 'Human Resources' },
  { id: 'JOB-2026-005', title: 'Enterprise Account Executive (JOB-2026-005)', department: 'Business Development' },
];

// 2. Qualified Candidates from Screening Module (Screening -> Interviews Connection)
const qualifiedScreeningCandidates = [
  {
    candidateId: 'CAN-REF-1042',
    name: 'Rajesh Kumar',
    jobId: 'JOB-2026-001',
    jobTitle: 'Senior Frontend Engineer (JOB-2026-001)',
    screeningScore: 92,
    screeningResult: 'Qualified',
    currentStage: 'Screening Qualified',
    suggestedRound: 'Technical',
    status: 'Ready to Schedule',
  },
  {
    candidateId: 'CAN-REF-2015',
    name: 'Aishwarya Lakshmi',
    jobId: 'JOB-2026-002',
    jobTitle: 'Lead Product Designer (JOB-2026-002)',
    screeningScore: 94,
    screeningResult: 'Qualified',
    currentStage: 'Screening Qualified',
    suggestedRound: 'Technical',
    status: 'Ready to Schedule',
  },
  {
    candidateId: 'CAN-REF-3008',
    name: 'Nathiya Ramesh',
    jobId: 'JOB-2026-003',
    jobTitle: 'HR Executive (JOB-2026-003)',
    screeningScore: 92,
    screeningResult: 'Qualified',
    currentStage: 'Screening Qualified',
    suggestedRound: 'Managerial',
    status: 'Ready to Schedule',
  },
  {
    candidateId: 'CAN-REF-7011',
    name: 'Karthikeyan Selvam',
    jobId: 'JOB-2026-007',
    jobTitle: 'Software Developer (JOB-2026-007)',
    screeningScore: 88,
    screeningResult: 'Qualified',
    currentStage: 'Screening Qualified',
    suggestedRound: 'Technical',
    status: 'Ready to Schedule',
  },
];

// 3. Initial Scheduled Interviews List
const initialInterviews = [
  {
    id: 'INT-2026-001',
    candidateId: 'CAN-REF-1042',
    candidateName: 'Rajesh Kumar',
    candidate: 'Rajesh Kumar (CAN-REF-1042)',
    jobId: 'JOB-2026-001',
    jobTitle: 'Senior Frontend Engineer (JOB-2026-001)',
    interviewRound: 'Technical',
    roundNumber: 1,
    interviewType: 'Online',
    date: '2026-10-15',
    startTime: '10:30 AM',
    endTime: '11:30 AM',
    dateTime: '15-Oct-2026 10:30 AM',
    timeZone: 'IST (UTC+05:30)',
    meetingLinkLocation: 'https://meet.google.com/hrc-admn-xyz',
    interviewerPanel: 'Sundar Raman (Eng Lead)',
    interviewStatus: 'Completed',
    rating: '4.8',
    recommendation: 'Hire',
    feedback: 'Exceptional mastery in React 19 architecture, SSR concurrent features, and TypeScript micro-frontends.',
    strengths: 'Deep system design expertise, clean code, good communication',
    areasToImprove: 'Familiarity with GraphQL federated mesh',
    nextStep: 'Next round',
    reviewedBy: 'Sundar Raman (Eng Lead)',
    reviewDate: '15-Oct-2026 11:45 AM',
    instructions: 'Please have your GitHub repository and IDE ready for live component design test.',
    history: [
      { round: 'Round 1: Technical', date: '15-Oct-2026', interviewer: 'Sundar Raman', rating: '4.8/5', recommendation: 'Hire' },
    ],
  },
  {
    id: 'INT-2026-002',
    candidateId: 'CAN-REF-2015',
    candidateName: 'Aishwarya Lakshmi',
    candidate: 'Aishwarya Lakshmi (CAN-REF-2015)',
    jobId: 'JOB-2026-002',
    jobTitle: 'Lead Product Designer (JOB-2026-002)',
    interviewRound: 'Managerial',
    roundNumber: 2,
    interviewType: 'Online',
    date: '2026-10-16',
    startTime: '02:00 PM',
    endTime: '03:00 PM',
    dateTime: '16-Oct-2026 02:00 PM',
    timeZone: 'IST (UTC+05:30)',
    meetingLinkLocation: 'https://teams.microsoft.com/l/meetup-join/des-rev-002',
    interviewerPanel: 'Karthik Raja (Design Head), Anitha Murugesan (Director)',
    interviewStatus: 'Accepted',
    rating: '4.7',
    recommendation: 'Hire',
    feedback: 'Strong leadership vision, cross-functional empathy, and comprehensive design systems governance.',
    strengths: 'Design tokens, B2B SaaS empathy, Figma component architecture',
    areasToImprove: 'Mobile native design nuances',
    nextStep: 'Offer',
    reviewedBy: 'Karthik Raja (Design Head)',
    reviewDate: '16-Oct-2026 03:15 PM',
    instructions: 'Prepare to walk through your design system case study in Figma.',
    history: [
      { round: 'Round 1: Portfolio Deep Dive', date: '12-Oct-2026', interviewer: 'Karthik Raja', rating: '4.5/5', recommendation: 'Hire' },
      { round: 'Round 2: Managerial', date: '16-Oct-2026', interviewer: 'Karthik Raja, Anitha Murugesan', rating: '4.7/5', recommendation: 'Hire' },
    ],
  },
  {
    id: 'INT-2026-003',
    candidateId: 'CAN-REF-4011',
    candidateName: 'Karthik V',
    candidate: 'Karthik V (CAN-REF-4011)',
    jobId: 'JOB-2026-004',
    jobTitle: 'DevOps & Cloud Architect (JOB-2026-004)',
    interviewRound: 'Technical',
    roundNumber: 1,
    interviewType: 'In-person',
    date: '2026-10-17',
    startTime: '11:00 AM',
    endTime: '12:00 PM',
    dateTime: '17-Oct-2026 11:00 AM',
    timeZone: 'IST (UTC+05:30)',
    meetingLinkLocation: 'Admin Tower, Conference Room 4B, Chennai Campus',
    interviewerPanel: 'Vigneshwaran M (Principal Architect)',
    interviewStatus: 'Reschedule Requested',
    rating: null,
    recommendation: 'Hold',
    feedback: 'Awaiting rescheduled session due to candidate official travel commitments.',
    strengths: '',
    areasToImprove: '',
    nextStep: 'Hold',
    reviewedBy: '',
    reviewDate: '',
    instructions: 'Please report to Reception Desk on 4th Floor at least 10 minutes prior.',
    history: [],
  },
  {
    id: 'INT-2026-004',
    candidateId: 'CAN-REF-3008',
    candidateName: 'Nathiya Ramesh',
    candidate: 'Nathiya Ramesh (CAN-REF-3008)',
    jobId: 'JOB-2026-003',
    jobTitle: 'HR Executive (JOB-2026-003)',
    interviewRound: 'HR',
    roundNumber: 1,
    interviewType: 'Phone',
    date: '2026-10-14',
    startTime: '04:30 PM',
    endTime: '05:00 PM',
    dateTime: '14-Oct-2026 04:30 PM',
    timeZone: 'IST (UTC+05:30)',
    meetingLinkLocation: '+91 98401 23456 (HR Direct Line)',
    interviewerPanel: 'Abinaya R (Senior HR Manager)',
    interviewStatus: 'Completed',
    rating: '4.4',
    recommendation: 'Hire',
    feedback: 'High proficiency in niche tech talent sourcing, pipeline metrics, and employer branding.',
    strengths: 'Boolean search velocity, compensation negotiation, candidate engagement',
    areasToImprove: 'Executive search experience',
    nextStep: 'Next round',
    reviewedBy: 'Abinaya R (Senior HR Manager)',
    reviewDate: '14-Oct-2026 05:15 PM',
    instructions: 'Phone interview. Recruiter will dial candidate registered mobile number.',
    history: [
      { round: 'Round 1: HR Initial Call', date: '14-Oct-2026', interviewer: 'Abinaya R', rating: '4.4/5', recommendation: 'Hire' },
    ],
  },
  {
    id: 'INT-2026-005',
    candidateId: 'CAN-REF-5002',
    candidateName: 'Venkatesh S',
    candidate: 'Venkatesh S (CAN-REF-5002)',
    jobId: 'JOB-2026-005',
    jobTitle: 'Enterprise Account Executive (JOB-2026-005)',
    interviewRound: 'Final',
    roundNumber: 2,
    interviewType: 'Online',
    date: '2026-10-13',
    startTime: '11:30 AM',
    endTime: '12:30 PM',
    dateTime: '13-Oct-2026 11:30 AM',
    timeZone: 'IST (UTC+05:30)',
    meetingLinkLocation: 'https://zoom.us/j/98127391823',
    interviewerPanel: 'Rajeshwaran K (VP Sales)',
    interviewStatus: 'Completed',
    rating: '4.6',
    recommendation: 'Hire',
    feedback: 'Impressive track record of SaaS ARR deal closures, consultative selling and territory expansion.',
    strengths: 'Enterprise closing, customer discovery, value framing',
    areasToImprove: 'Channel partner sales experience',
    nextStep: 'Offer',
    reviewedBy: 'Rajeshwaran K (VP Sales)',
    reviewDate: '13-Oct-2026 12:45 PM',
    instructions: 'Final executive round with VP Sales.',
    history: [
      { round: 'Round 1: Sales Discovery Pitch', date: '09-Oct-2026', interviewer: 'Rajeshwaran K', rating: '4.3/5', recommendation: 'Hire' },
      { round: 'Round 2: Final Executive Round', date: '13-Oct-2026', interviewer: 'Rajeshwaran K', rating: '4.6/5', recommendation: 'Hire' },
    ],
  },
  {
    id: 'INT-2026-006',
    candidateId: 'CAN-REF-1048',
    candidateName: 'Subhashini M',
    candidate: 'Subhashini M (CAN-REF-1048)',
    jobId: 'JOB-2026-001',
    jobTitle: 'Senior Frontend Engineer (JOB-2026-001)',
    interviewRound: 'Technical',
    roundNumber: 1,
    interviewType: 'Online',
    date: '2026-10-12',
    startTime: '03:00 PM',
    endTime: '04:00 PM',
    dateTime: '12-Oct-2026 03:00 PM',
    timeZone: 'IST (UTC+05:30)',
    meetingLinkLocation: 'https://meet.google.com/xyz-fe-eval',
    interviewerPanel: 'Sundar Raman (Eng Lead)',
    interviewStatus: 'Cancelled',
    rating: '2.0',
    recommendation: 'Reject',
    feedback: 'Candidate accepted competing offer prior to technical assessment round.',
    strengths: '',
    areasToImprove: '',
    nextStep: 'Reject',
    reviewedBy: 'Sundar Raman (Eng Lead)',
    reviewDate: '12-Oct-2026 03:30 PM',
    instructions: '',
    history: [],
  },
  {
    id: 'INT-2026-007',
    candidateId: 'CAN-REF-1049',
    candidateName: 'Manoj Krishnan',
    candidate: 'Manoj Krishnan (CAN-REF-1049)',
    jobId: 'JOB-2026-004',
    jobTitle: 'DevOps & Cloud Architect (JOB-2026-004)',
    interviewRound: 'HR',
    roundNumber: 1,
    interviewType: 'Online',
    date: '2026-10-11',
    startTime: '10:00 AM',
    endTime: '10:30 AM',
    dateTime: '11-Oct-2026 10:00 AM',
    timeZone: 'IST (UTC+05:30)',
    meetingLinkLocation: 'https://meet.google.com/hrc-admn-int',
    interviewerPanel: 'Abinaya R (Senior HR Manager)',
    interviewStatus: 'No Show',
    rating: '1.0',
    recommendation: 'Reject',
    feedback: 'Candidate did not attend interview session or provide prior reschedule notification.',
    strengths: '',
    areasToImprove: '',
    nextStep: 'Reject',
    reviewedBy: 'Abinaya R (Senior HR Manager)',
    reviewDate: '11-Oct-2026 10:35 AM',
    instructions: '',
    history: [],
  },
];

export const InterviewsModule = () => {
  const { setNotifications } = usePortal();

  // Interviews State
  const [interviews, setInterviews] = useState(initialInterviews);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [roundFilter, setRoundFilter] = useState('All');
  const [recommendationFilter, setRecommendationFilter] = useState('All');

  // Toast State
  const [toastMessage, setToastMessage] = useState('');
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 4000);
  };

  // Modals State
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [viewDetailsModalOpen, setViewDetailsModalOpen] = useState(false);
  const [targetInterview, setTargetInterview] = useState(null);

  // Form State: Schedule Interview
  const [scheduleFormData, setScheduleFormData] = useState({
    id: '',
    jobId: 'JOB-2026-001',
    candidateId: 'CAN-REF-1042',
    interviewRound: 'Technical',
    interviewType: 'Online',
    date: '2026-10-18',
    startTime: '10:30 AM',
    endTime: '11:30 AM',
    timeZone: 'IST (UTC+05:30)',
    meetingLinkLocation: 'https://meet.google.com/hrc-int-new',
    interviewerPanel: 'Sundar Raman (Eng Lead)',
    instructions: 'Please be online 5 minutes before scheduled start time.',
  });

  // Slot Overlap Warning State
  const [slotConflictWarning, setSlotConflictWarning] = useState('');

  // Form State: Submit Feedback
  const [feedbackFormData, setFeedbackFormData] = useState({
    rating: 4.5,
    recommendation: 'Hire',
    feedback: '',
    strengths: '',
    areasToImprove: '',
    nextStep: 'Next round',
    reviewedBy: 'Sundar Raman (Eng Lead)',
  });

  // Check Overlapping Slot for the same interviewer
  const checkInterviewerSlotConflict = (interviewer, date, startTime) => {
    const conflict = interviews.find(
      (item) =>
        item.interviewerPanel.toLowerCase().includes(interviewer.toLowerCase().split(' ')[0]) &&
        item.date === date &&
        item.startTime === startTime &&
        item.interviewStatus !== 'Cancelled'
    );
    if (conflict) {
      setSlotConflictWarning(
        `⚠️ Slot Conflict Warning: ${interviewer} already has an interview scheduled on ${date} at ${startTime} (ID: ${conflict.id}).`
      );
    } else {
      setSlotConflictWarning('');
    }
  };

  // =========================================================================
  // HANDLERS: SCHEDULE INTERVIEW
  // =========================================================================
  const handleOpenScheduleModal = (preselectedCandidate = null, nextRoundSuggested = null) => {
    const nextNum = interviews.length + 1;
    const nextId = `INT-2026-${String(nextNum).padStart(3, '0')}`;

    const cand = preselectedCandidate || qualifiedScreeningCandidates[0];
    const initialJobId = cand ? cand.jobId : availableJobs[0].id;
    const initialRound = nextRoundSuggested || (cand ? cand.suggestedRound : 'Technical');

    setScheduleFormData({
      id: nextId,
      jobId: initialJobId,
      candidateId: cand ? cand.candidateId : qualifiedScreeningCandidates[0]?.candidateId,
      interviewRound: initialRound,
      interviewType: 'Online',
      date: '2026-10-18',
      startTime: '10:30 AM',
      endTime: '11:30 AM',
      timeZone: 'IST (UTC+05:30)',
      meetingLinkLocation: 'https://meet.google.com/hrc-admn-eval',
      interviewerPanel: 'Sundar Raman (Eng Lead)',
      instructions: 'Please join prepared with relevant project demonstrations.',
    });

    checkInterviewerSlotConflict('Sundar Raman (Eng Lead)', '2026-10-18', '10:30 AM');
    setScheduleModalOpen(true);
  };

  const handleExecuteScheduleInterview = (e) => {
    e.preventDefault();

    // Validations:
    if (!scheduleFormData.date || !scheduleFormData.startTime || !scheduleFormData.endTime) {
      showToast('Interview date, start time, and end time are required.');
      return;
    }
    if (!scheduleFormData.interviewerPanel.trim()) {
      showToast('Assigned interviewer/panel is required.');
      return;
    }
    if (scheduleFormData.interviewType === 'Online' && !scheduleFormData.meetingLinkLocation.trim()) {
      showToast('Meeting link is required for Online interviews.');
      return;
    }
    if (scheduleFormData.interviewType === 'In-person' && !scheduleFormData.meetingLinkLocation.trim()) {
      showToast('Physical location/venue is required for In-person interviews.');
      return;
    }

    const cand = qualifiedScreeningCandidates.find((c) => c.candidateId === scheduleFormData.candidateId);
    const candidateName = cand ? cand.name : 'Candidate';
    const candidateString = `${candidateName} (${scheduleFormData.candidateId})`;
    const selectedJob = availableJobs.find((j) => j.id === scheduleFormData.jobId);
    const jobTitleString = selectedJob ? selectedJob.title : scheduleFormData.jobId;

    const formattedDateTime = `${scheduleFormData.date} ${scheduleFormData.startTime}`;

    const newInterviewRecord = {
      id: scheduleFormData.id,
      candidateId: scheduleFormData.candidateId,
      candidateName: candidateName,
      candidate: candidateString,
      jobId: scheduleFormData.jobId,
      jobTitle: jobTitleString,
      interviewRound: scheduleFormData.interviewRound,
      roundNumber: 1,
      interviewType: scheduleFormData.interviewType,
      date: scheduleFormData.date,
      startTime: scheduleFormData.startTime,
      endTime: scheduleFormData.endTime,
      dateTime: formattedDateTime,
      timeZone: scheduleFormData.timeZone,
      meetingLinkLocation: scheduleFormData.meetingLinkLocation,
      interviewerPanel: scheduleFormData.interviewerPanel,
      interviewStatus: 'Scheduled',
      rating: null,
      recommendation: 'Pending',
      feedback: 'Interview scheduled. Pending evaluation.',
      strengths: '',
      areasToImprove: '',
      nextStep: '',
      reviewedBy: '',
      reviewDate: '',
      instructions: scheduleFormData.instructions,
      history: [
        {
          round: `Round: ${scheduleFormData.interviewRound}`,
          date: scheduleFormData.date,
          interviewer: scheduleFormData.interviewerPanel,
          rating: 'Pending',
          recommendation: 'Scheduled',
        },
      ],
    };

    setInterviews([newInterviewRecord, ...interviews]);

    // Push into Live Portal Context Notifications
    if (setNotifications) {
      setNotifications((prev) => [
        {
          id: `NTF-INT-${Date.now()}`,
          notificationType: 'Interview',
          title: `Interview Scheduled: ${scheduleFormData.interviewRound} Round`,
          message: `${scheduleFormData.interviewRound} round scheduled for ${candidateString} on ${formattedDateTime} with ${scheduleFormData.interviewerPanel}.`,
          dateTime: new Date().toLocaleString('en-GB'),
          readStatus: 'Unread',
          recipient: scheduleFormData.interviewerPanel,
        },
        ...prev,
      ]);
    }

    setScheduleModalOpen(false);
    showToast(`Interview "${scheduleFormData.id}" scheduled successfully for ${candidateName}!`);
  };

  // =========================================================================
  // HANDLERS: SUBMIT FEEDBACK & RESULTS
  // =========================================================================
  const handleOpenFeedbackModal = (item) => {
    setTargetInterview(item);
    setFeedbackFormData({
      rating: item.rating ? Number(item.rating) : 4.5,
      recommendation: item.recommendation && item.recommendation !== 'Pending' ? item.recommendation : 'Hire',
      feedback: item.feedback && item.feedback !== 'Interview scheduled. Pending evaluation.' ? item.feedback : '',
      strengths: item.strengths || '',
      areasToImprove: item.areasToImprove || '',
      nextStep: item.nextStep || 'Next round',
      reviewedBy: item.interviewerPanel || 'Sundar Raman (Eng Lead)',
    });
    setFeedbackModalOpen(true);
  };

  const handleSaveFeedback = (e) => {
    e.preventDefault();
    if (!feedbackFormData.feedback.trim()) {
      showToast('Please enter detailed interviewer feedback comments.');
      return;
    }

    const nowStr = new Date().toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const updatedInterviews = interviews.map((item) => {
      if (item.id === targetInterview.id) {
        const updatedHistory = [
          ...item.history,
          {
            round: `${item.interviewRound} (Round ${item.roundNumber || 1})`,
            date: item.date,
            interviewer: item.interviewerPanel,
            rating: `${feedbackFormData.rating} / 5`,
            recommendation: feedbackFormData.recommendation,
          },
        ];

        return {
          ...item,
          interviewStatus: 'Completed',
          rating: String(feedbackFormData.rating),
          recommendation: feedbackFormData.recommendation,
          feedback: feedbackFormData.feedback,
          strengths: feedbackFormData.strengths,
          areasToImprove: feedbackFormData.areasToImprove,
          nextStep: feedbackFormData.nextStep,
          reviewedBy: feedbackFormData.reviewedBy,
          reviewDate: nowStr,
          history: updatedHistory,
        };
      }
      return item;
    });

    setInterviews(updatedInterviews);
    setFeedbackModalOpen(false);
    showToast(
      `Feedback submitted for ${targetInterview.candidateName}: Recommendation "${feedbackFormData.recommendation}"!`
    );
  };

  // =========================================================================
  // HANDLERS: SCHEDULE NEXT ROUND (Preserves history & creates new Interview ID)
  // =========================================================================
  const handleScheduleNextRound = (item) => {
    let nextRoundName = 'Managerial';
    if (item.interviewRound === 'Technical') nextRoundName = 'Managerial';
    else if (item.interviewRound === 'Managerial') nextRoundName = 'Final';
    else if (item.interviewRound === 'HR') nextRoundName = 'Technical';
    else nextRoundName = 'Final';

    const candObj = {
      candidateId: item.candidateId,
      name: item.candidateName,
      jobId: item.jobId,
      suggestedRound: nextRoundName,
    };

    handleOpenScheduleModal(candObj, nextRoundName);
    showToast(`Scheduling ${nextRoundName} round for ${item.candidateName}. Previous round history is preserved.`);
  };

  // Move Candidate to Offers & Hiring
  const handleMoveToOffersHiring = (item) => {
    showToast(
      `Candidate "${item.candidateName}" moved to Offers & Hiring pipeline! Ready for Offer Letter release.`
    );
  };

  const handleOpenViewDetails = (item) => {
    setTargetInterview(item);
    setViewDetailsModalOpen(true);
  };

  // Filtered Interviews List
  const filteredInterviews = interviews.filter((item) => {
    const term = searchQuery.toLowerCase();
    const matchesSearch =
      item.id.toLowerCase().includes(term) ||
      item.candidate.toLowerCase().includes(term) ||
      item.jobTitle.toLowerCase().includes(term) ||
      item.interviewerPanel.toLowerCase().includes(term);

    const matchesStatus = statusFilter === 'All' ? true : item.interviewStatus === statusFilter;
    const matchesRound = roundFilter === 'All' ? true : item.interviewRound === roundFilter;
    const matchesRec =
      recommendationFilter === 'All' ? true : item.recommendation === recommendationFilter;

    return matchesSearch && matchesStatus && matchesRound && matchesRec;
  });

  // Interviews Table Pagination State (8 items per page)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredInterviews.length / itemsPerPage) || 1;
  const paginatedInterviews = filteredInterviews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Badge Class Helpers
  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'status-completed';
      case 'accepted':
        return 'status-accepted';
      case 'reschedule requested':
        return 'status-reschedule';
      case 'scheduled':
        return 'status-scheduled';
      case 'cancelled':
        return 'status-cancelled';
      case 'no show':
        return 'status-noshow';
      default:
        return 'status-neutral';
    }
  };

  const getRecBadgeClass = (rec) => {
    switch (rec?.toLowerCase()) {
      case 'hire':
        return 'rec-hire';
      case 'hold':
        return 'rec-hold';
      case 'reject':
        return 'rec-reject';
      default:
        return 'rec-pending';
    }
  };

  const isAnySubPageOpen =
    scheduleModalOpen ||
    (feedbackModalOpen && targetInterview) ||
    (viewDetailsModalOpen && targetInterview);

  return (
    <div className="interviews-page-container animate-fade-in">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="interviews-toast-alert">
          <CheckCircle2 size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {!isAnySubPageOpen && (
        <>
          {/* =========================================================================
              MODULE HEADER: Title, Subtitle, and Top-Right Schedule Interview Button
              ========================================================================= */}
      <div className="interviews-page-header">
        <div className="interviews-header-left">
          <div>
            <h1 className="interviews-page-title">Interviews</h1>
            
          </div>
        </div>

        {/* Top-Right: Schedule Interview Button */}
        <div className="interviews-header-actions">
          <button
            type="button"
            className="btn-schedule-interview-top"
            onClick={() => handleOpenScheduleModal()}
          >
            <Plus size={16} />
            <span>Schedule Interview</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          TOP KPI METRIC CARDS
          ========================================================================= */}
      <div className="interviews-kpi-quad-grid">
        <div className="interviews-kpi-card">
          <div className="kpi-icon-wrap blue">
            <Calendar size={18} />
          </div>
          <div className="kpi-info">
            <span className="kpi-num">
              {interviews.filter((i) => i.interviewStatus === 'Scheduled' || i.interviewStatus === 'Accepted').length}
            </span>
            <span className="kpi-title">Active Scheduled Slots</span>
          </div>
        </div>

        <div className="interviews-kpi-card">
          <div className="kpi-icon-wrap green">
            <CheckCircle2 size={18} />
          </div>
          <div className="kpi-info">
            <span className="kpi-num">
              {interviews.filter((i) => i.interviewStatus === 'Completed').length}
            </span>
            <span className="kpi-title">Interviews Completed</span>
          </div>
        </div>

        <div className="interviews-kpi-card">
          <div className="kpi-icon-wrap purple">
            <UserCheck size={18} />
          </div>
          <div className="kpi-info">
            <span className="kpi-num">
              {interviews.filter((i) => i.recommendation === 'Hire').length}
            </span>
            <span className="kpi-title">Recommended for Hire</span>
          </div>
        </div>

        <div className="interviews-kpi-card">
          <div className="kpi-icon-wrap amber">
            <Clock size={18} />
          </div>
          <div className="kpi-info">
            <span className="kpi-num">
              {interviews.filter((i) => i.recommendation === 'Pending').length}
            </span>
            <span className="kpi-title">Pending Feedback</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SCREENING -> INTERVIEWS CONNECTION BANNER
          (Qualified Candidates from Screening Ready for Interview Scheduling)
          ========================================================================= */}
      <div className="screening-connection-banner">
        <div className="connection-header-row">
          <div className="connection-title-wrap">
            <ShieldCheck size={18} className="shield-icon" />
            <div>
              <span className="banner-title">Screening Qualified Candidates (Ready to Schedule)</span>
            </div>
          </div>
          <span className="qualified-count-badge">
            {qualifiedScreeningCandidates.length} Candidates Qualified
          </span>
        </div>

        <div className="qualified-candidates-pills-row">
          {qualifiedScreeningCandidates.map((cand) => (
            <div key={cand.candidateId} className="qualified-candidate-pill-card">
              <div className="pill-cand-info">
                <span className="cand-name">{cand.name}</span>
                <span className="cand-job-sub">{cand.jobTitle}</span>
                <span className="cand-score-tag">
                  <CheckCircle2 size={13} />
                  <span>Screening: {cand.screeningScore}% (Qualified)</span>
                </span>
              </div>
              <button
                type="button"
                className="btn-quick-schedule-candidate"
                onClick={() => handleOpenScheduleModal(cand, cand.suggestedRound)}
                title={`Schedule ${cand.suggestedRound} interview for ${cand.name}`}
              >
                <Calendar size={14} />
                <span>Schedule {cand.suggestedRound}</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* =========================================================================
          CENTER TOOLBAR
          ========================================================================= */}
      <div className="interviews-toolbar-card">
        <div className="toolbar-left-group">
          <div className="interviews-search-box">
            <Search size={15} className="search-icon" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="interviews-search-input"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="interviews-filter-select"
          >
            <option value="All">All Interview Statuses</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Accepted">Accepted</option>
            <option value="Completed">Completed</option>
            <option value="Reschedule Requested">Reschedule Requested</option>
            <option value="Cancelled">Cancelled</option>
            <option value="No Show">No Show</option>
          </select>

          <select
            value={roundFilter}
            onChange={(e) => setRoundFilter(e.target.value)}
            className="interviews-filter-select"
          >
            <option value="All">All Rounds</option>
            <option value="HR">HR Round</option>
            <option value="Technical">Technical Round</option>
            <option value="Managerial">Managerial Round</option>
            <option value="Final">Final Round</option>
          </select>

          <select
            value={recommendationFilter}
            onChange={(e) => setRecommendationFilter(e.target.value)}
            className="interviews-filter-select"
          >
            <option value="All">All Recommendations</option>
            <option value="Hire">Hire</option>
            <option value="Hold">Hold</option>
            <option value="Reject">Reject</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
      </div>

      {/* =========================================================================
          INTERVIEWS MAIN TABLE (12 REQUIRED COLUMNS)
          ========================================================================= */}
      <div className="interviews-table-card">
        <div className="table-responsive-wrapper">
          <table className="interviews-data-table">
            <thead>
              <tr>
                <th style={{ width: '45px', textAlign: 'center' }}>S.No</th>
                <th>Interview ID</th>
                <th>Candidate</th>
                <th>Job Title</th>
                <th style={{ textAlign: 'center' }}>Interview Round</th>
                <th style={{ textAlign: 'center' }}>Interview Type</th>
                <th>Date & Time</th>
                <th>Interviewer / Panel</th>
                <th style={{ textAlign: 'center' }}>Interview Status</th>
                <th style={{ textAlign: 'center' }}>Rating</th>
                <th style={{ textAlign: 'center' }}>Recommendation</th>
                <th style={{ textAlign: 'center', minWidth: '160px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInterviews.length === 0 ? (
                <tr>
                  <td colSpan="12" className="table-empty-cell">
                    No scheduled interviews found matching your filter criteria.
                  </td>
                </tr>
              ) : (
                paginatedInterviews.map((item, idx) => {
                  const serialNumber = (currentPage - 1) * itemsPerPage + idx + 1;
                  return (
                  <tr key={item.id}>
                    {/* 1. S.No */}
                    <td style={{ textAlign: 'center', fontWeight: 600 }}>{serialNumber}</td>

                    {/* 2. Interview ID */}
                    <td>
                      <span className="interview-id-code">{item.id}</span>
                    </td>

                    {/* 3. Candidate */}
                    <td>
                      <div className="candidate-cell">
                        <span className="candidate-name-main">{item.candidateName}</span>
                        <span className="candidate-ref-sub">{item.candidateId}</span>
                      </div>
                    </td>

                    {/* 4. Job Title */}
                    <td>
                      <span className="job-title-text">{item.jobTitle}</span>
                    </td>

                    {/* 5. Interview Round */}
                    <td style={{ textAlign: 'center' }}>
                      <span className={`round-badge-pill round-${item.interviewRound.toLowerCase()}`}>
                        {item.interviewRound} (R{item.roundNumber || 1})
                      </span>
                    </td>

                    {/* 6. Interview Type */}
                    <td style={{ textAlign: 'center' }}>
                      <span className={`type-badge-chip type-${item.interviewType.toLowerCase().replace('-', '')}`}>
                        {item.interviewType === 'Online' && <Video size={12} />}
                        {item.interviewType === 'Phone' && <Phone size={12} />}
                        {item.interviewType === 'In-person' && <MapPin size={12} />}
                        <span>{item.interviewType}</span>
                      </span>
                    </td>

                    {/* 7. Date & Time */}
                    <td>
                      <div className="date-time-cell">
                        <span className="date-main">{item.dateTime}</span>
                        <span className="tz-sub">{item.timeZone}</span>
                      </div>
                    </td>

                    {/* 8. Interviewer / Panel */}
                    <td>
                      <span className="interviewer-name-text">{item.interviewerPanel}</span>
                    </td>

                    {/* 9. Interview Status */}
                    <td style={{ textAlign: 'center' }}>
                      <span className={`status-badge-chip ${getStatusBadgeClass(item.interviewStatus)}`}>
                        {item.interviewStatus}
                      </span>
                    </td>

                    {/* 10. Rating */}
                    <td style={{ textAlign: 'center' }}>
                      {item.rating ? (
                        <div className="rating-pill-box">
                          <Star size={12} className="star-filled" />
                          <span>{item.rating} / 5</span>
                        </div>
                      ) : (
                        <span className="rating-pending-text">-</span>
                      )}
                    </td>

                    {/* 11. Recommendation */}
                    <td style={{ textAlign: 'center' }}>
                      <span className={`rec-badge-chip ${getRecBadgeClass(item.recommendation)}`}>
                        {item.recommendation}
                      </span>
                    </td>

                    {/* 12. Actions: View / Submit Feedback / Schedule Next Round / Move to Offer */}
                    <td style={{ textAlign: 'center', minWidth: '160px' }}>
                      <div className="interview-actions-flex">
                        {/* View Details */}
                        <button
                          type="button"
                          className="btn-action-icon view"
                          onClick={() => handleOpenViewDetails(item)}
                          title="View Interview Details & History"
                        >
                          <Eye size={14} />
                        </button>

                        {/* Submit Feedback Button (Icon-Only) */}
                        <button
                          type="button"
                          className="btn-action-icon feedback"
                          onClick={() => handleOpenFeedbackModal(item)}
                          title={item.feedback && item.feedback !== 'Interview scheduled. Pending evaluation.' ? 'Edit Feedback / Evaluation' : 'Submit Interview Feedback'}
                        >
                          <FileText size={14} />
                        </button>

                        {/* Schedule Next Round (Visible when candidate is Hire and has rounds remaining) */}
                        {item.recommendation === 'Hire' && item.nextStep === 'Next round' && (
                          <button
                            type="button"
                            className="btn-action-icon next-round"
                            onClick={() => handleScheduleNextRound(item)}
                            title="Schedule Next Round (Creates new round record)"
                          >
                            <Calendar size={14} />
                          </button>
                        )}

                        {/* Move to Offers & Hiring (When final round is Hire or Offer is selected) */}
                        {item.recommendation === 'Hire' && item.nextStep === 'Offer' && (
                          <button
                            type="button"
                            className="btn-action-icon offer"
                            onClick={() => handleMoveToOffersHiring(item)}
                            title="Generate Job Offer (Move to Offers & Hiring)"
                          >
                            <Award size={14} />
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

        {/* Pagination Footer */}
        <div className="companies-pagination-row">
          <div className="pagination-entries-count">
            Showing {filteredInterviews.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{' '}
            {Math.min(currentPage * itemsPerPage, filteredInterviews.length)} of{' '}
            {filteredInterviews.length} Entries
          </div>
          <div className="pagination-controls">
            <button
              type="button"
              className={`pagination-nav-btn ${currentPage === 1 ? 'disabled' : ''}`}
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                type="button"
                className={`pagination-page-btn ${currentPage === page ? 'active' : ''}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
            <button
              type="button"
              className={`pagination-nav-btn ${currentPage === totalPages ? 'disabled' : ''}`}
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
        </>
      )}

      {/* =========================================================================
          PAGE VIEW 1: SCHEDULE INTERVIEW SUBPAGE VIEW
          ========================================================================= */}
      {scheduleModalOpen && (
        <div className="interviews-subpage-view animate-fade-in">
          <div className="interviews-subpage-nav">
            <button
              type="button"
              className="btn-back-link"
              onClick={() => setScheduleModalOpen(false)}
            >
              <ArrowLeft size={16} />
              <span>Back to Interviews</span>
            </button>
          </div>

          <div className="interviews-subpage-header-card">
            <div className="modal-title-wrap">
              <div className="modal-icon-ring blue">
                <Calendar size={20} />
              </div>
              <div>
                <h2 className="interviews-modal-title">Schedule Candidate Interview</h2>
                <p className="interviews-modal-subtitle">
                  Assign panel, set interview type, and coordinate timing slots with real-time screening validation
                </p>
              </div>
            </div>
          </div>

          <div className="interviews-subpage-body-card">
            <form onSubmit={handleExecuteScheduleInterview}>
              <div className="interviews-modal-body">
                {/* Overlapping Slot Conflict Alert */}
                {slotConflictWarning && (
                  <div className="slot-conflict-alert animate-fade-in">
                    <AlertTriangle size={18} className="warn-icon" />
                    <span>{slotConflictWarning}</span>
                  </div>
                )}

                {/* Job & Candidate Selection (Screening Qualified Only Rule) */}
                <div className="modal-grid-two-cols">
                  <div className="modal-form-section">
                    <label className="modal-section-label">
                      Published Job Role <span className="req-star">*</span>
                    </label>
                    <select
                      value={scheduleFormData.jobId}
                      onChange={(e) =>
                        setScheduleFormData({ ...scheduleFormData, jobId: e.target.value })
                      }
                      className="modal-select-input"
                      required
                    >
                      {availableJobs.map((j) => (
                        <option key={j.id} value={j.id}>
                          {j.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="modal-form-section">
                    <label className="modal-section-label">
                      Candidate (Screening Qualified Only) <span className="req-star">*</span>
                    </label>
                    <select
                      value={scheduleFormData.candidateId}
                      onChange={(e) =>
                        setScheduleFormData({
                          ...scheduleFormData,
                          candidateId: e.target.value,
                        })
                      }
                      className="modal-select-input"
                      required
                    >
                      {qualifiedScreeningCandidates.map((c) => (
                        <option key={c.candidateId} value={c.candidateId}>
                          {c.name} ({c.candidateId}) • Score: {c.screeningScore}% (Qualified)
                        </option>
                      ))}
                    </select>
                    <span className="modal-sub-hint">
                      * Screening result "Qualified" is strictly required for initial interview scheduling.
                    </span>
                  </div>
                </div>

                {/* Round & Type Selection */}
                <div className="modal-grid-two-cols">
                  <div className="modal-form-section">
                    <label className="modal-section-label">
                      Interview Round <span className="req-star">*</span>
                    </label>
                    <select
                      value={scheduleFormData.interviewRound}
                      onChange={(e) =>
                        setScheduleFormData({
                          ...scheduleFormData,
                          interviewRound: e.target.value,
                        })
                      }
                      className="modal-select-input"
                    >
                      <option value="HR">HR Round</option>
                      <option value="Technical">Technical Round</option>
                      <option value="Managerial">Managerial Round</option>
                      <option value="Final">Final Round</option>
                    </select>
                  </div>

                  <div className="modal-form-section">
                    <label className="modal-section-label">
                      Interview Type <span className="req-star">*</span>
                    </label>
                    <select
                      value={scheduleFormData.interviewType}
                      onChange={(e) =>
                        setScheduleFormData({
                          ...scheduleFormData,
                          interviewType: e.target.value,
                        })
                      }
                      className="modal-select-input"
                    >
                      <option value="Online">Online Video (Google Meet / Teams / Zoom)</option>
                      <option value="Phone">Phone Call</option>
                      <option value="In-person">In-person (Campus Venue)</option>
                    </select>
                  </div>
                </div>

                {/* Date, Start Time, End Time & Timezone Grid */}
                <div className="modal-grid-four-cols">
                  <div className="modal-form-section">
                    <label className="modal-section-label">
                      Date <span className="req-star">*</span>
                    </label>
                    <input
                      type="date"
                      value={scheduleFormData.date}
                      onChange={(e) => {
                        setScheduleFormData({ ...scheduleFormData, date: e.target.value });
                        checkInterviewerSlotConflict(
                          scheduleFormData.interviewerPanel,
                          e.target.value,
                          scheduleFormData.startTime
                        );
                      }}
                      className="modal-text-input"
                      required
                    />
                  </div>

                  <div className="modal-form-section">
                    <label className="modal-section-label">
                      Start Time <span className="req-star">*</span>
                    </label>
                    <input
                      type="text"
                      value={scheduleFormData.startTime}
                      onChange={(e) => {
                        setScheduleFormData({
                          ...scheduleFormData,
                          startTime: e.target.value,
                        });
                        checkInterviewerSlotConflict(
                          scheduleFormData.interviewerPanel,
                          scheduleFormData.date,
                          e.target.value
                        );
                      }}
                      placeholder="e.g. 10:30 AM"
                      className="modal-text-input"
                      required
                    />
                  </div>

                  <div className="modal-form-section">
                    <label className="modal-section-label">
                      End Time <span className="req-star">*</span>
                    </label>
                    <input
                      type="text"
                      value={scheduleFormData.endTime}
                      onChange={(e) =>
                        setScheduleFormData({
                          ...scheduleFormData,
                          endTime: e.target.value,
                        })
                      }
                      placeholder="e.g. 11:30 AM"
                      className="modal-text-input"
                      required
                    />
                  </div>

                  <div className="modal-form-section">
                    <label className="modal-section-label">Time Zone</label>
                    <input
                      type="text"
                      value={scheduleFormData.timeZone}
                      onChange={(e) =>
                        setScheduleFormData({
                          ...scheduleFormData,
                          timeZone: e.target.value,
                        })
                      }
                      className="modal-text-input"
                    />
                  </div>
                </div>

                {/* Meeting Link / Location Field */}
                <div className="modal-form-section">
                  <label className="modal-section-label">
                    {scheduleFormData.interviewType === 'Online'
                      ? 'Meeting Link (URL)'
                      : scheduleFormData.interviewType === 'Phone'
                      ? 'Phone Number'
                      : 'Physical Location / Campus Room'}{' '}
                    <span className="req-star">*</span>
                  </label>
                  <input
                    type="text"
                    value={scheduleFormData.meetingLinkLocation}
                    onChange={(e) =>
                      setScheduleFormData({
                        ...scheduleFormData,
                        meetingLinkLocation: e.target.value,
                      })
                    }
                    placeholder={
                      scheduleFormData.interviewType === 'Online'
                        ? 'https://meet.google.com/xyz-int-link'
                        : scheduleFormData.interviewType === 'Phone'
                        ? '+91 98401 23456'
                        : 'Admin Tower, Conference Room 4B, Chennai Campus'
                    }
                    className="modal-text-input"
                    required
                  />
                </div>

                {/* Interviewer Panel Selection */}
                <div className="modal-form-section">
                  <label className="modal-section-label">
                    Interviewer / Panel <span className="req-star">*</span>
                  </label>
                  <select
                    value={scheduleFormData.interviewerPanel}
                    onChange={(e) => {
                      setScheduleFormData({
                        ...scheduleFormData,
                        interviewerPanel: e.target.value,
                      });
                      checkInterviewerSlotConflict(
                        e.target.value,
                        scheduleFormData.date,
                        scheduleFormData.startTime
                      );
                    }}
                    className="modal-select-input"
                    required
                  >
                    <option value="Sundar Raman (Eng Lead)">Sundar Raman (Engineering Lead)</option>
                    <option value="Karthik Raja (Design Head)">Karthik Raja (Design Head)</option>
                    <option value="Abinaya R (Senior HR Manager)">Abinaya R (Senior HR Manager)</option>
                    <option value="Vigneshwaran M (Principal Architect)">Vigneshwaran M (Principal Architect)</option>
                    <option value="Rajeshwaran K (VP Sales)">Rajeshwaran K (VP Sales)</option>
                  </select>
                </div>

                {/* Instructions to Candidate */}
                <div className="modal-form-section">
                  <label className="modal-section-label">Instructions / Preparation Notes</label>
                  <textarea
                    value={scheduleFormData.instructions}
                    onChange={(e) =>
                      setScheduleFormData({
                        ...scheduleFormData,
                        instructions: e.target.value,
                      })
                    }
                    rows="2"
                    className="modal-textarea-input"
                    placeholder="Candidate preparation details..."
                  />
                </div>
              </div>

              <div className="interviews-subpage-footer-card">
                <button
                  type="button"
                  className="btn-modal-cancel"
                  onClick={() => setScheduleModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-modal-submit">
                  <Calendar size={15} />
                  <span>Confirm Schedule</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          PAGE VIEW 2: SUBMIT FEEDBACK & INTERVIEW RESULTS SUBPAGE VIEW
          ========================================================================= */}
      {feedbackModalOpen && targetInterview && (
        <div className="interviews-subpage-view animate-fade-in">
          <div className="interviews-subpage-nav">
            <button
              type="button"
              className="btn-back-link"
              onClick={() => setFeedbackModalOpen(false)}
            >
              <ArrowLeft size={16} />
              <span>Back to Interviews</span>
            </button>
          </div>

          <div className="interviews-subpage-header-card">
            <div className="modal-title-wrap">
              <div className="modal-icon-ring green">
                <Award size={20} />
              </div>
              <div>
                <h2 className="interviews-modal-title">Submit Interview Results & Feedback</h2>
                <p className="interviews-modal-subtitle">
                  {targetInterview.candidateName} • {targetInterview.interviewRound} Round ({targetInterview.id})
                </p>
              </div>
            </div>
          </div>

          <div className="interviews-subpage-body-card">
            <form onSubmit={handleSaveFeedback}>
              <div className="interviews-modal-body">
                {/* Rating (1 - 5 Scale) */}
                <div className="modal-form-section">
                  <label className="modal-section-label">
                    Interview Rating (1.0 to 5.0) <span className="req-star">*</span>
                  </label>
                  <div className="interactive-rating-bar">
                    {[1, 2, 3, 4, 5].map((starVal) => (
                      <button
                        type="button"
                        key={starVal}
                        className={`star-select-btn ${
                          feedbackFormData.rating >= starVal ? 'active' : ''
                        }`}
                        onClick={() =>
                          setFeedbackFormData({ ...feedbackFormData, rating: starVal })
                        }
                      >
                        <Star size={18} />
                        <span>{starVal}.0</span>
                      </button>
                    ))}
                    <span className="current-rating-label">
                      Selected: <strong>{feedbackFormData.rating} / 5</strong>
                    </span>
                  </div>
                </div>

                {/* Recommendation (Hire / Hold / Reject) */}
                <div className="modal-form-section">
                  <label className="modal-section-label">
                    Recommendation <span className="req-star">*</span>
                  </label>
                  <div className="recommendation-radio-grid">
                    <label
                      className={`rec-radio-card hire ${
                        feedbackFormData.recommendation === 'Hire' ? 'active' : ''
                      }`}
                    >
                      <input
                        type="radio"
                        name="recOption"
                        value="Hire"
                        checked={feedbackFormData.recommendation === 'Hire'}
                        onChange={() =>
                          setFeedbackFormData({ ...feedbackFormData, recommendation: 'Hire' })
                        }
                      />
                      <UserCheck size={16} />
                      <div>
                        <strong>Hire</strong>
                        <span>Eligible for next round or offer</span>
                      </div>
                    </label>

                    <label
                      className={`rec-radio-card hold ${
                        feedbackFormData.recommendation === 'Hold' ? 'active' : ''
                      }`}
                    >
                      <input
                        type="radio"
                        name="recOption"
                        value="Hold"
                        checked={feedbackFormData.recommendation === 'Hold'}
                        onChange={() =>
                          setFeedbackFormData({ ...feedbackFormData, recommendation: 'Hold' })
                        }
                      />
                      <Clock size={16} />
                      <div>
                        <strong>Hold</strong>
                        <span>Further panel review required</span>
                      </div>
                    </label>

                    <label
                      className={`rec-radio-card reject ${
                        feedbackFormData.recommendation === 'Reject' ? 'active' : ''
                      }`}
                    >
                      <input
                        type="radio"
                        name="recOption"
                        value="Reject"
                        checked={feedbackFormData.recommendation === 'Reject'}
                        onChange={() =>
                          setFeedbackFormData({ ...feedbackFormData, recommendation: 'Reject' })
                        }
                      />
                      <XCircle size={16} />
                      <div>
                        <strong>Reject</strong>
                        <span>Does not meet round expectations</span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Next Step Selector */}
                <div className="modal-form-section">
                  <label className="modal-section-label">
                    Recommended Next Step <span className="req-star">*</span>
                  </label>
                  <select
                    value={feedbackFormData.nextStep}
                    onChange={(e) =>
                      setFeedbackFormData({ ...feedbackFormData, nextStep: e.target.value })
                    }
                    className="modal-select-input"
                  >
                    <option value="Next round">Next round (Schedule subsequent round)</option>
                    <option value="Offer">Offer (Move to Offers & Hiring)</option>
                    <option value="Hold">Hold (Candidate on hold)</option>
                    <option value="Reject">Reject (Recruitment outcome rejected)</option>
                  </select>
                </div>

                {/* Detailed Feedback */}
                <div className="modal-form-section">
                  <label className="modal-section-label">
                    Interviewer Comments & Technical Evaluation <span className="req-star">*</span>
                  </label>
                  <textarea
                    value={feedbackFormData.feedback}
                    onChange={(e) =>
                      setFeedbackFormData({ ...feedbackFormData, feedback: e.target.value })
                    }
                    rows="3"
                    className="modal-textarea-input"
                    placeholder="Enter thorough feedback on candidate skills, domain depth, and architecture reasoning..."
                    required
                  />
                </div>

                {/* Strengths & Areas to Improve Grid */}
                <div className="modal-grid-two-cols">
                  <div className="modal-form-section">
                    <label className="modal-section-label">Key Strengths (Optional)</label>
                    <input
                      type="text"
                      value={feedbackFormData.strengths}
                      onChange={(e) =>
                        setFeedbackFormData({
                          ...feedbackFormData,
                          strengths: e.target.value,
                        })
                      }
                      placeholder="e.g. React 19, TypeScript, Clean Code"
                      className="modal-text-input"
                    />
                  </div>

                  <div className="modal-form-section">
                    <label className="modal-section-label">Areas to Improve (Optional)</label>
                    <input
                      type="text"
                      value={feedbackFormData.areasToImprove}
                      onChange={(e) =>
                        setFeedbackFormData({
                          ...feedbackFormData,
                          areasToImprove: e.target.value,
                        })
                      }
                      placeholder="e.g. System telemetry, GraphQL"
                      className="modal-text-input"
                    />
                  </div>
                </div>

                {/* Reviewed By */}
                <div className="modal-form-section">
                  <label className="modal-section-label">Reviewed By</label>
                  <input
                    type="text"
                    value={feedbackFormData.reviewedBy}
                    onChange={(e) =>
                      setFeedbackFormData({
                        ...feedbackFormData,
                        reviewedBy: e.target.value,
                      })
                    }
                    className="modal-text-input"
                  />
                </div>
              </div>

              <div className="interviews-subpage-footer-card">
                <button
                  type="button"
                  className="btn-modal-cancel"
                  onClick={() => setFeedbackModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-modal-submit">
                  <CheckCircle size={15} />
                  <span>Submit Results & Feedback</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          PAGE VIEW 3: VIEW INTERVIEW DETAILS & ROUND-BY-ROUND HISTORY SUBPAGE VIEW
          ========================================================================= */}
      {viewDetailsModalOpen && targetInterview && (
        <div className="interviews-subpage-view animate-fade-in">
          <div className="interviews-subpage-nav">
            <button
              type="button"
              className="btn-back-link"
              onClick={() => setViewDetailsModalOpen(false)}
            >
              <ArrowLeft size={16} />
              <span>Back to Interviews</span>
            </button>
          </div>

          <div className="interviews-subpage-header-card">
            <div className="modal-title-wrap">
              <div className="modal-icon-ring blue">
                <Eye size={20} />
              </div>
              <div>
                <h2 className="interviews-modal-title">
                  Interview Details & Progression: {targetInterview.id}
                </h2>
                <p className="interviews-modal-subtitle">
                  {targetInterview.candidateName} • {targetInterview.jobTitle}
                </p>
              </div>
            </div>
          </div>

          <div className="interviews-subpage-body-card">
            <div className="interviews-modal-body">
              {/* Overview Details Grid */}
              <div className="details-overview-grid">
                <div className="details-cell">
                  <span className="lbl">Candidate ID & Name</span>
                  <span className="val bold">{targetInterview.candidate}</span>
                </div>
                <div className="details-cell">
                  <span className="lbl">Interview Round</span>
                  <span className="val green bold">
                    {targetInterview.interviewRound} Round (Round {targetInterview.roundNumber || 1})
                  </span>
                </div>
                <div className="details-cell">
                  <span className="lbl">Date & Time</span>
                  <span className="val">{targetInterview.dateTime}</span>
                </div>
                <div className="details-cell">
                  <span className="lbl">Meeting Link / Location</span>
                  <span className="val link-val">{targetInterview.meetingLinkLocation}</span>
                </div>
                <div className="details-cell">
                  <span className="lbl">Interviewer Panel</span>
                  <span className="val">{targetInterview.interviewerPanel}</span>
                </div>
                <div className="details-cell">
                  <span className="lbl">Interview Status</span>
                  <span className={`status-badge-chip ${getStatusBadgeClass(targetInterview.interviewStatus)}`}>
                    {targetInterview.interviewStatus}
                  </span>
                </div>
                <div className="details-cell">
                  <span className="lbl">Rating</span>
                  <span className="val rating">
                    {targetInterview.rating ? `⭐ ${targetInterview.rating} / 5` : 'Pending'}
                  </span>
                </div>
                <div className="details-cell">
                  <span className="lbl">Recommendation</span>
                  <span className={`rec-badge-chip ${getRecBadgeClass(targetInterview.recommendation)}`}>
                    {targetInterview.recommendation}
                  </span>
                </div>
              </div>

              {/* Feedback Content Box */}
              <div className="details-feedback-box">
                <span className="feedback-lbl">Interviewer Comments</span>
                <p className="feedback-text">
                  "{targetInterview.feedback || 'No comments recorded yet.'}"
                </p>
                {targetInterview.strengths && (
                  <div className="feedback-sub-tag-row">
                    <span className="tag-lbl">Strengths:</span>
                    <span className="tag-val">{targetInterview.strengths}</span>
                  </div>
                )}
                {targetInterview.areasToImprove && (
                  <div className="feedback-sub-tag-row">
                    <span className="tag-lbl">Areas to Improve:</span>
                    <span className="tag-val">{targetInterview.areasToImprove}</span>
                  </div>
                )}
              </div>

              {/* Multi-Round History (Important logic: Previous round feedback overwrite panna koodadhu) */}
              <div className="details-multi-rounds-section">
                <span className="rounds-sec-title">Round-by-Round Progression History</span>
                <div className="rounds-history-cards">
                  {targetInterview.history && targetInterview.history.length > 0 ? (
                    targetInterview.history.map((hist, hIdx) => (
                      <div key={hIdx} className="round-hist-card">
                        <div className="hist-top-row">
                          <span className="hist-round-name">{hist.round}</span>
                          <span className="hist-rating">{hist.rating}</span>
                        </div>
                        <div className="hist-meta-row">
                          <span>Date: {hist.date}</span>
                          <span>•</span>
                          <span>Panel: {hist.interviewer}</span>
                          <span>•</span>
                          <span className="hist-rec">Result: {hist.recommendation}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="no-history-sub">First round scheduled. Subsequent rounds will preserve history here.</div>
                  )}
                </div>
              </div>
            </div>

            <div className="interviews-subpage-footer-card">
              <button
                type="button"
                className="btn-modal-cancel"
                onClick={() => setViewDetailsModalOpen(false)}
              >
                Close
              </button>

              {targetInterview.recommendation === 'Hire' && targetInterview.nextStep === 'Offer' && (
                <button
                  type="button"
                  className="btn-modal-submit"
                  onClick={() => {
                    setViewDetailsModalOpen(false);
                    handleMoveToOffersHiring(targetInterview);
                  }}
                >
                  <Award size={15} />
                  <span>Move Candidate to Offers & Hiring</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
