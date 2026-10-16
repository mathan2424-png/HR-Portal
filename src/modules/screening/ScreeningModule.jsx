import React, { useState } from 'react';
import {
  Search,
  Plus,
  Send,
  Eye,
  Edit2,
  Trash2,
  FileQuestion,
  Award,
  CheckCircle,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  Users,
  Briefcase,
  History,
  HelpCircle,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  BookOpen,
  Sliders,
  ShieldAlert,
  ArrowRight,
  ArrowLeft,
  Filter,
  CheckSquare,
  Square,
  UserCheck,
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import './ScreeningModule.css';

// 1. Available Published Jobs for Screening Mapping
const publishedJobs = [
  {
    id: 'JOB-2026-001',
    title: 'Senior Frontend Engineer (JOB-2026-001)',
    department: 'Engineering & Technology',
  },
  {
    id: 'JOB-2026-007',
    title: 'Software Developer (JOB-2026-007)',
    department: 'Engineering & Technology',
  },
  {
    id: 'JOB-2026-002',
    title: 'Lead Product Designer (JOB-2026-002)',
    department: 'Design & UX',
  },
  {
    id: 'JOB-2026-004',
    title: 'DevOps & Cloud Architect (JOB-2026-004)',
    department: 'Engineering & Technology',
  },
  {
    id: 'JOB-2026-003',
    title: 'HR Executive (JOB-2026-003)',
    department: 'Human Resources',
  },
  {
    id: 'JOB-2026-005',
    title: 'Enterprise Account Executive (JOB-2026-005)',
    department: 'Business Development',
  },
];

// 2. Initial Screening Assessments List
const initialScreenings = [
  {
    id: 'SCRN-2026-001',
    name: 'Frontend Architecture & React 19 Coding Test',
    jobId: 'JOB-2026-001',
    jobTitle: 'Senior Frontend Engineer (JOB-2026-001)',
    department: 'Engineering & Technology',
    duration: '45 Mins',
    totalQuestions: 12,
    totalMarks: 100,
    passMark: 75,
    candidatesAssigned: 12,
    completedCount: 9,
    pendingCount: 3,
    status: 'Active',
    version: '1.0',
    hasPendingManualReview: true,
    questions: [
      {
        id: 'Q-001',
        text: 'Explain how React 19 Server Components handle data mutations and streaming boundaries.',
        type: 'Descriptive',
        marks: 20,
        mandatory: true,
      },
      {
        id: 'Q-002',
        text: 'Which hook in React 19 provides direct access to form action pending state?',
        type: 'MCQ',
        marks: 10,
        mandatory: true,
      },
      {
        id: 'Q-003',
        text: 'What are the performance implications of using Next.js App Router parallel routes with nested suspense?',
        type: 'Descriptive',
        marks: 20,
        mandatory: true,
      },
      {
        id: 'Q-004',
        text: 'Implement a debounce function with leading and trailing execution options in TypeScript.',
        type: 'Code Assessment',
        marks: 25,
        mandatory: true,
      },
      {
        id: 'Q-005',
        text: 'State management: Compare Zustand vs Redux Toolkit in micro-frontends.',
        type: 'Descriptive',
        marks: 25,
        mandatory: false,
      },
    ],
    results: [
      {
        candidateId: 'CAN-REF-1042',
        candidateName: 'Rajesh Kumar',
        assignedDate: '10-Oct-2026',
        submittedDate: '12-Oct-2026 03:45 PM',
        marksObtained: 92,
        result: 'Qualified',
        status: 'Completed',
        manualReviewNeeded: false,
        descriptiveAnswer:
          'React 19 Server Components execute solely on the server, generating a static virtual DOM stream that hydrates zero client-side JavaScript bundle for pure components.',
        reviewerFeedback: 'Excellent architectural understanding and clean TypeScript implementation.',
      },
      {
        candidateId: 'CAN-REF-1038',
        candidateName: 'Gopinath Sundaram',
        assignedDate: '10-Oct-2026',
        submittedDate: '12-Oct-2026 01:20 PM',
        marksObtained: 71,
        result: 'Review Required',
        status: 'Completed',
        manualReviewNeeded: true,
        descriptiveAnswer:
          'Server components stream UI chunks via suspense boundaries. Mutations use Server Actions with revalidatePath.',
        reviewerFeedback: 'Solid concepts, descriptive answers require score confirmation.',
      },
      {
        candidateId: 'CAN-REF-1055',
        candidateName: 'Vijay Anand',
        assignedDate: '11-Oct-2026',
        submittedDate: null,
        marksObtained: 0,
        result: 'Pending',
        status: 'Pending',
        manualReviewNeeded: false,
        descriptiveAnswer: null,
        reviewerFeedback: null,
      },
    ],
    history: [
      { date: '01-Oct-2026 10:00 AM', event: 'Screening created by Sundar Raman (Engineering Lead)' },
      { date: '02-Oct-2026 02:30 PM', event: '12 Questions mapped and validated. Status moved to Ready.' },
      { date: '10-Oct-2026 04:00 PM', event: 'Dispatched to 12 candidates. Status updated to Active.' },
    ],
  },
  {
    id: 'SCRN-2026-002',
    name: 'UI/UX Design Challenge & Systems Thinking',
    jobId: 'JOB-2026-002',
    jobTitle: 'Lead Product Designer (JOB-2026-002)',
    department: 'Design & UX',
    duration: '60 Mins',
    totalQuestions: 8,
    totalMarks: 100,
    passMark: 70,
    candidatesAssigned: 5,
    completedCount: 4,
    pendingCount: 1,
    status: 'Active',
    version: '1.0',
    hasPendingManualReview: false,
    questions: [
      {
        id: 'Q-101',
        text: 'How do you structure design tokens in Figma for automatic dark mode transformation?',
        type: 'Descriptive',
        marks: 25,
        mandatory: true,
      },
      {
        id: 'Q-102',
        text: 'Explain the difference between usability benchmarking and comparative heuristic evaluation.',
        type: 'Descriptive',
        marks: 25,
        mandatory: true,
      },
    ],
    results: [
      {
        candidateId: 'CAN-REF-2015',
        candidateName: 'Aishwarya Lakshmi',
        assignedDate: '09-Oct-2026',
        submittedDate: '11-Oct-2026 09:30 AM',
        marksObtained: 94,
        result: 'Qualified',
        status: 'Completed',
        manualReviewNeeded: false,
        descriptiveAnswer:
          'Design tokens are divided into Global (primitive colors), Alias (semantic intent), and Component-specific tiers.',
        reviewerFeedback: 'Outstanding Figma systems mastery.',
      },
    ],
    history: [
      { date: '02-Oct-2026 11:00 AM', event: 'Screening created by Karthik Raja (Design Head)' },
      { date: '09-Oct-2026 01:00 PM', event: 'Dispatched to 5 design candidates.' },
    ],
  },
  {
    id: 'SCRN-2026-003',
    name: 'HR Leadership & Competency Screening',
    jobId: 'JOB-2026-003',
    jobTitle: 'HR Executive (JOB-2026-003)',
    department: 'Human Resources',
    duration: '30 Mins',
    totalQuestions: 10,
    totalMarks: 100,
    passMark: 75,
    candidatesAssigned: 10,
    completedCount: 7,
    pendingCount: 3,
    status: 'Active',
    version: '1.0',
    hasPendingManualReview: true,
    questions: [
      {
        id: 'Q-201',
        text: 'How do you handle difficult offer negotiations while maintaining positive candidate sentiment?',
        type: 'Descriptive',
        marks: 25,
        mandatory: true,
      },
    ],
    results: [
      {
        candidateId: 'CAN-REF-3008',
        candidateName: 'Nathiya Ramesh',
        assignedDate: '08-Oct-2026',
        submittedDate: '10-Oct-2026 01:15 PM',
        marksObtained: 92,
        result: 'Qualified',
        status: 'Completed',
        manualReviewNeeded: false,
        descriptiveAnswer:
          'Anchor discussions around total rewards, career growth ladders and transparent compensation bands.',
        reviewerFeedback: 'Exceptional negotiation clarity and professionalism.',
      },
    ],
    history: [
      { date: '04-Oct-2026 09:30 AM', event: 'Screening created by Abinaya R (Senior HR Manager)' },
    ],
  },
  {
    id: 'SCRN-2026-004',
    name: 'Cloud Infrastructure & Kubernetes Assessment',
    jobId: 'JOB-2026-004',
    jobTitle: 'DevOps & Cloud Architect (JOB-2026-004)',
    department: 'Engineering & Technology',
    duration: '50 Mins',
    totalQuestions: 15,
    totalMarks: 100,
    passMark: 80,
    candidatesAssigned: 8,
    completedCount: 6,
    pendingCount: 2,
    status: 'Active',
    version: '1.0',
    hasPendingManualReview: false,
    questions: [],
    results: [],
    history: [
      { date: '03-Oct-2026 02:00 PM', event: 'Screening created by Sundar Raman' },
    ],
  },
  {
    id: 'SCRN-2026-005',
    name: 'Full-Stack JavaScript & Node.js Evaluation',
    jobId: 'JOB-2026-007',
    jobTitle: 'Software Developer (JOB-2026-007)',
    department: 'Engineering & Technology',
    duration: '45 Mins',
    totalQuestions: 10,
    totalMarks: 100,
    passMark: 75,
    candidatesAssigned: 0,
    completedCount: 0,
    pendingCount: 0,
    status: 'Ready',
    version: '1.0',
    hasPendingManualReview: false,
    questions: [
      {
        id: 'Q-301',
        text: 'Write an asynchronous pipeline using Node.js Streams with backpressure handling.',
        type: 'Code Assessment',
        marks: 30,
        mandatory: true,
      },
    ],
    results: [],
    history: [
      { date: '06-Oct-2026 03:00 PM', event: 'Created & 10 questions validated. Ready for dispatch.' },
    ],
  },
  {
    id: 'SCRN-2026-006',
    name: 'B2B Enterprise Sales & Discovery Assessment',
    jobId: 'JOB-2026-005',
    jobTitle: 'Enterprise Account Executive (JOB-2026-005)',
    department: 'Business Development',
    duration: '30 Mins',
    totalQuestions: 0,
    totalMarks: 0,
    passMark: 70,
    candidatesAssigned: 0,
    completedCount: 0,
    pendingCount: 0,
    status: 'Draft',
    version: '1.0',
    hasPendingManualReview: false,
    questions: [],
    results: [],
    history: [
      { date: '07-Oct-2026 11:30 AM', event: 'Draft configuration initialized. Pending question mapping.' },
    ],
  },
];

export const ScreeningModule = () => {
  const { setNotifications } = usePortal();

  // State: Screenings List
  const [screenings, setScreenings] = useState(initialScreenings);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [departmentFilter, setDepartmentFilter] = useState('All');

  // Active Dropdown Row ID
  const [activeActionsRowId, setActiveActionsRowId] = useState(null);

  // Toast
  const [toastMessage, setToastMessage] = useState('');
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 4000);
  };

  // Modals State
  const [addScreeningModalOpen, setAddScreeningModalOpen] = useState(false);
  const [editScreeningModalOpen, setEditScreeningModalOpen] = useState(false);
  const [addQuestionsModalOpen, setAddQuestionsModalOpen] = useState(false);
  const [viewDetailsModalOpen, setViewDetailsModalOpen] = useState(false);
  const [sendScreeningModalOpen, setSendScreeningModalOpen] = useState(false);
  const [candidateResultsModalOpen, setCandidateResultsModalOpen] = useState(false);
  const [reviewAnswersModalOpen, setReviewAnswersModalOpen] = useState(false);
  const [viewHistoryModalOpen, setViewHistoryModalOpen] = useState(false);

  // Selected Target Screening for Modals
  const [targetScreening, setTargetScreening] = useState(null);

  // Form State: Add / Edit Screening
  const [screeningFormData, setScreeningFormData] = useState({
    id: '',
    name: '',
    jobId: 'JOB-2026-001',
    duration: '45 Mins',
    totalMarks: 100,
    passMark: 75,
    status: 'Draft',
  });

  // Form State: Add Question
  const [questionFormData, setQuestionFormData] = useState({
    targetScreeningId: 'SCRN-2026-001',
    text: '',
    type: 'MCQ',
    marks: 10,
    mandatory: true,
    passCriteria: 'Standard Evaluation',
  });

  // Send Screening Modal State
  const [selectedCandidateRecipients, setSelectedCandidateRecipients] = useState([
    { id: 'CAN-REF-7011', name: 'Karthikeyan Selvam', score: 95, selected: true },
    { id: 'CAN-REF-7024', name: 'Praveen Venkatesh', score: 92, selected: true },
    { id: 'CAN-REF-7035', name: 'Meenakshi Sundaram', score: 89, selected: true },
  ]);
  const [sendExpiryDays, setSendExpiryDays] = useState('5');
  const [sendInstructions, setSendInstructions] = useState('');

  // Review Answers Modal State
  const [reviewCandidate, setReviewCandidate] = useState(null);
  const [manualMarksAwarded, setManualMarksAwarded] = useState(20);
  const [evaluatorNotes, setEvaluatorNotes] = useState('');

  // Filtered Screenings List
  const filteredScreenings = screenings.filter((s) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      s.id.toLowerCase().includes(term) ||
      s.name.toLowerCase().includes(term) ||
      s.jobTitle.toLowerCase().includes(term);

    const matchesStatus = statusFilter === 'All' ? true : s.status === statusFilter;
    const matchesDept =
      departmentFilter === 'All' ? true : s.department === departmentFilter;

    return matchesSearch && matchesStatus && matchesDept;
  });

  // Main Screening Table Pagination State (8 items per page)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredScreenings.length / itemsPerPage) || 1;
  const paginatedScreenings = filteredScreenings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Candidate Results Modal Pagination State (8 items per page)
  const [resultsPage, setResultsPage] = useState(1);
  const resultsPerPage = 8;
  const targetResults = targetScreening?.results || [];
  const totalResultsPages = Math.ceil(targetResults.length / resultsPerPage) || 1;
  const paginatedResults = targetResults.slice(
    (resultsPage - 1) * resultsPerPage,
    resultsPage * resultsPerPage
  );

  // =========================================================================
  // HANDLERS: ADD / EDIT SCREENING
  // =========================================================================
  const handleOpenAddScreening = () => {
    const nextId = `SCRN-2026-${String(screenings.length + 1).padStart(3, '0')}`;
    setScreeningFormData({
      id: nextId,
      name: '',
      jobId: 'JOB-2026-001',
      duration: '45 Mins',
      totalMarks: 100,
      passMark: 75,
      status: 'Draft',
    });
    setAddScreeningModalOpen(true);
  };

  const handleSaveNewScreening = (e) => {
    e.preventDefault();
    if (!screeningFormData.name.trim()) {
      showToast('Please enter an assessment screening name.');
      return;
    }

    const selectedJob = publishedJobs.find((j) => j.id === screeningFormData.jobId);
    const newScreening = {
      id: screeningFormData.id,
      name: screeningFormData.name,
      jobId: screeningFormData.jobId,
      jobTitle: selectedJob ? selectedJob.title : screeningFormData.jobId,
      department: selectedJob ? selectedJob.department : 'Engineering & Technology',
      duration: screeningFormData.duration,
      totalQuestions: 0,
      totalMarks: Number(screeningFormData.totalMarks),
      passMark: Number(screeningFormData.passMark),
      candidatesAssigned: 0,
      completedCount: 0,
      pendingCount: 0,
      status: 'Draft',
      version: '1.0',
      hasPendingManualReview: false,
      questions: [],
      results: [],
      history: [
        {
          date: new Date().toLocaleString('en-GB'),
          event: `Screening created for ${selectedJob ? selectedJob.title : ''}`,
        },
      ],
    };

    setScreenings([newScreening, ...screenings]);
    setAddScreeningModalOpen(false);
    showToast(`Screening "${newScreening.name}" created successfully as Draft!`);
  };

  const handleOpenEditScreening = (scrn) => {
    setTargetScreening(scrn);
    setScreeningFormData({
      id: scrn.id,
      name: scrn.name,
      jobId: scrn.jobId,
      duration: scrn.duration,
      totalMarks: scrn.totalMarks,
      passMark: scrn.passMark,
      status: scrn.status,
    });
    setActiveActionsRowId(null);
    setEditScreeningModalOpen(true);
  };

  const handleSaveEditScreening = (e) => {
    e.preventDefault();
    setScreenings((prev) =>
      prev.map((s) =>
        s.id === targetScreening.id
          ? {
              ...s,
              name: screeningFormData.name,
              duration: screeningFormData.duration,
              passMark: Number(screeningFormData.passMark),
              totalMarks: Number(screeningFormData.totalMarks),
              status: screeningFormData.status,
            }
          : s
      )
    );
    setEditScreeningModalOpen(false);
    showToast(`Screening "${targetScreening.id}" settings updated!`);
  };

  // =========================================================================
  // HANDLERS: ADD / MANAGE QUESTIONS
  // =========================================================================
  const handleOpenAddQuestions = (specificScreening = null) => {
    const scrn = specificScreening || screenings[0];
    setTargetScreening(scrn);
    setQuestionFormData({
      targetScreeningId: scrn ? scrn.id : screenings[0]?.id,
      text: '',
      type: 'MCQ',
      marks: 10,
      mandatory: true,
      passCriteria: 'Standard Evaluation',
    });
    setActiveActionsRowId(null);
    setAddQuestionsModalOpen(true);
  };

  const handleSaveNewQuestion = (e) => {
    e.preventDefault();
    if (!questionFormData.text.trim()) {
      showToast('Please enter question text.');
      return;
    }

    const scrnId = questionFormData.targetScreeningId;
    const newQ = {
      id: `Q-${Date.now().toString().slice(-4)}`,
      text: questionFormData.text,
      type: questionFormData.type,
      marks: Number(questionFormData.marks),
      mandatory: questionFormData.mandatory,
    };

    setScreenings((prev) =>
      prev.map((s) => {
        if (s.id === scrnId) {
          const updatedQs = [...s.questions, newQ];
          const newTotalMarks = updatedQs.reduce((acc, q) => acc + q.marks, 0);
          const newStatus = s.status === 'Draft' ? 'Ready' : s.status;
          return {
            ...s,
            questions: updatedQs,
            totalQuestions: updatedQs.length,
            totalMarks: newTotalMarks > s.totalMarks ? newTotalMarks : s.totalMarks,
            status: newStatus,
          };
        }
        return s;
      })
    );

    setQuestionFormData((prev) => ({ ...prev, text: '' }));
    showToast(`Question added! Status updated to "Ready" for assessment dispatch.`);
  };

  const handleDeleteQuestion = (scrnId, qId) => {
    setScreenings((prev) =>
      prev.map((s) => {
        if (s.id === scrnId) {
          const updatedQs = s.questions.filter((q) => q.id !== qId);
          return {
            ...s,
            questions: updatedQs,
            totalQuestions: updatedQs.length,
            status: updatedQs.length === 0 ? 'Draft' : s.status,
          };
        }
        return s;
      })
    );
    showToast('Question removed.');
  };

  // =========================================================================
  // HANDLERS: SEND SCREENING
  // =========================================================================
  const handleOpenSendScreening = (scrn) => {
    // Rule: Send Screening questions ready/published aana piragudhaan enable aaganum!
    if (scrn.status === 'Draft' || scrn.totalQuestions === 0) {
      showToast(
        'Cannot send screening: Questions not ready. Please map questions first to enable sending.'
      );
      return;
    }

    setTargetScreening(scrn);
    setSendInstructions(
      `Please complete this screening assessment for ${scrn.jobTitle} within 5 days.`
    );
    setActiveActionsRowId(null);
    setSendScreeningModalOpen(true);
  };

  const handleExecuteSendScreening = () => {
    const selectedRecipients = selectedCandidateRecipients.filter((c) => c.selected);
    if (selectedRecipients.length === 0) {
      showToast('Please select at least one candidate recipient.');
      return;
    }

    const count = selectedRecipients.length;
    const nowStr = new Date().toLocaleString('en-GB');

    // Create new candidate result entries in Pending status
    const newResults = selectedRecipients.map((rec) => ({
      candidateId: rec.id,
      candidateName: rec.name,
      assignedDate: nowStr,
      submittedDate: null,
      marksObtained: 0,
      result: 'Pending',
      status: 'Pending',
      manualReviewNeeded: false,
      descriptiveAnswer: null,
      reviewerFeedback: null,
    }));

    setScreenings((prev) =>
      prev.map((s) => {
        if (s.id === targetScreening.id) {
          return {
            ...s,
            candidatesAssigned: s.candidatesAssigned + count,
            pendingCount: s.pendingCount + count,
            status: 'Active',
            results: [...newResults, ...s.results],
            history: [
              {
                date: nowStr,
                event: `Dispatched screening assessment to ${count} candidate(s).`,
              },
              ...s.history,
            ],
          };
        }
        return s;
      })
    );

    if (setNotifications) {
      setNotifications((prev) => [
        {
          id: `NTF-SCRN-DISP-${Date.now()}`,
          notificationType: 'Screening',
          title: `Screening Dispatched: ${targetScreening.name}`,
          message: `Assessment sent to ${count} candidate(s) for ${targetScreening.jobTitle}.`,
          dateTime: nowStr,
          readStatus: 'Unread',
          recipient: 'Recruitment Team',
        },
        ...prev,
      ]);
    }

    setSendScreeningModalOpen(false);
    showToast(`Successfully dispatched screening to ${count} candidate(s)!`);
  };

  // =========================================================================
  // HANDLERS: CANDIDATE RESULTS & REVIEW ANSWERS
  // =========================================================================
  const handleOpenCandidateResults = (scrn) => {
    setTargetScreening(scrn);
    setActiveActionsRowId(null);
    setCandidateResultsModalOpen(true);
  };

  const handleOpenReviewAnswers = (scrn, specificCandidate = null) => {
    setTargetScreening(scrn);
    const candidateToReview =
      specificCandidate ||
      scrn.results.find((r) => r.manualReviewNeeded) ||
      scrn.results[0];

    if (!candidateToReview) {
      showToast('No submitted candidate responses available for manual answer review.');
      return;
    }

    setReviewCandidate(candidateToReview);
    setManualMarksAwarded(20);
    setEvaluatorNotes('Answers demonstrate solid domain knowledge and design fundamentals.');
    setActiveActionsRowId(null);
    setReviewAnswersModalOpen(true);
  };

  const handleFinalizeManualEvaluation = () => {
    if (!reviewCandidate || !targetScreening) return;

    const finalMarks = Math.min(
      targetScreening.totalMarks,
      reviewCandidate.marksObtained + Number(manualMarksAwarded)
    );
    const isQualified = finalMarks >= targetScreening.passMark;
    const finalResult = isQualified ? 'Qualified' : 'Not Qualified';

    setScreenings((prev) =>
      prev.map((s) => {
        if (s.id === targetScreening.id) {
          const updatedResults = s.results.map((r) => {
            if (r.candidateId === reviewCandidate.candidateId) {
              return {
                ...r,
                marksObtained: finalMarks,
                result: finalResult,
                manualReviewNeeded: false,
                reviewerFeedback: evaluatorNotes,
              };
            }
            return r;
          });

          const stillHasPendingManual = updatedResults.some((r) => r.manualReviewNeeded);

          return {
            ...s,
            results: updatedResults,
            hasPendingManualReview: stillHasPendingManual,
          };
        }
        return s;
      })
    );

    setReviewAnswersModalOpen(false);
    showToast(
      `Evaluation finalized for ${reviewCandidate.candidateId}! Final Score: ${finalMarks} (${finalResult}).`
    );
  };

  const handleMoveCandidateToShortlisted = (candidateId) => {
    showToast(`Candidate ${candidateId} successfully moved to "Shortlisted" stage!`);
  };

  const handleOpenViewDetails = (scrn) => {
    setTargetScreening(scrn);
    setActiveActionsRowId(null);
    setViewDetailsModalOpen(true);
  };

  const handleOpenViewHistory = (scrn) => {
    setTargetScreening(scrn);
    setActiveActionsRowId(null);
    setViewHistoryModalOpen(true);
  };

  // Status Badge Class Helper
  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'status-active';
      case 'ready':
        return 'status-ready';
      case 'closed':
        return 'status-closed';
      case 'draft':
      default:
        return 'status-draft';
    }
  };

  const isAnySubPageOpen =
    addScreeningModalOpen ||
    (editScreeningModalOpen && targetScreening) ||
    (addQuestionsModalOpen && targetScreening) ||
    (sendScreeningModalOpen && targetScreening) ||
    (candidateResultsModalOpen && targetScreening) ||
    (reviewAnswersModalOpen && reviewCandidate && targetScreening) ||
    (viewDetailsModalOpen && targetScreening) ||
    (viewHistoryModalOpen && targetScreening);

  return (
    <div className="screening-page-container animate-fade-in">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="screening-toast-alert">
          <CheckCircle2 size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {!isAnySubPageOpen && (
        <>
          {/* =========================================================================
              MODULE HEADER: Title, Subtitle, and Top-Right Action Buttons
              ========================================================================= */}
          <div className="screening-page-header">
            <div className="screening-header-left">
              <div>
                <h1 className="screening-page-title">Screening</h1>
              </div>
        </div>

        {/* Top-Right Action Buttons: Add Screening & Add Questions */}
        <div className="screening-header-actions">
          <button
            type="button"
            className="btn-add-questions-top"
            onClick={() => handleOpenAddQuestions()}
          >
            <FileQuestion size={16} />
            <span>Add Questions</span>
          </button>

          <button
            type="button"
            className="btn-add-screening-top"
            onClick={handleOpenAddScreening}
          >
            <Plus size={16} />
            <span>Add Screening</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          TOP KPI METRIC CARDS
          ========================================================================= */}
      <div className="screening-kpi-quad-grid">
        <div className="screening-kpi-card">
          <div className="kpi-icon-wrap blue">
            <BookOpen size={18} />
          </div>
          <div className="kpi-info">
            <span className="kpi-num">
              {screenings.filter((s) => s.status === 'Active' || s.status === 'Ready').length}
            </span>
            <span className="kpi-title">Active & Ready Screenings</span>
          </div>
        </div>

        <div className="screening-kpi-card">
          <div className="kpi-icon-wrap purple">
            <FileQuestion size={18} />
          </div>
          <div className="kpi-info">
            <span className="kpi-num">
              {screenings.reduce((acc, s) => acc + s.totalQuestions, 0)}
            </span>
            <span className="kpi-title">Total Questions in Bank</span>
          </div>
        </div>

        <div className="screening-kpi-card">
          <div className="kpi-icon-wrap green">
            <Users size={18} />
          </div>
          <div className="kpi-info">
            <span className="kpi-num">
              {screenings.reduce((acc, s) => acc + s.candidatesAssigned, 0)}
            </span>
            <span className="kpi-title">Candidates Assigned</span>
          </div>
        </div>

        <div className="screening-kpi-card">
          <div className="kpi-icon-wrap amber">
            <Clock size={18} />
          </div>
          <div className="kpi-info">
            <span className="kpi-num">
              {screenings.reduce((acc, s) => acc + s.pendingCount, 0)}
            </span>
            <span className="kpi-title">Pending Submissions</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          CENTER TOOLBAR
          ========================================================================= */}
      <div className="screening-toolbar-card">
        <div className="toolbar-left-group">
          <div className="screening-search-box">
            <Search size={15} className="search-icon" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="screening-search-input"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="screening-filter-select"
          >
            <option value="All">All Statuses</option>
            <option value="Ready">Ready</option>
            <option value="Active">Active</option>
            <option value="Draft">Draft</option>
            <option value="Closed">Closed</option>
          </select>

          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="screening-filter-select"
          >
            <option value="All">All Departments</option>
            <option value="Engineering & Technology">Engineering & Technology</option>
            <option value="Design & UX">Design & UX</option>
            <option value="Human Resources">Human Resources</option>
            <option value="Business Development">Business Development</option>
          </select>
        </div>

        
      </div>

      {/* =========================================================================
          SCREENING LIST TABLE
          ========================================================================= */}
      <div className="screening-table-card">
        <div className="table-responsive-wrapper">
          <table className="screening-data-table">
            <thead>
              <tr>
                <th style={{ width: '50px', textAlign: 'center' }}>S.No</th>
                <th>Screening ID</th>
                <th>Screening Name</th>
                <th>Job Title</th>
                <th style={{ textAlign: 'center' }}>Total Questions</th>
                <th style={{ textAlign: 'center' }}>Total Marks</th>
                <th style={{ textAlign: 'center' }}>Pass Mark</th>
                <th style={{ textAlign: 'center' }}>Candidates Assigned</th>
                <th style={{ textAlign: 'center' }}>Completed Count</th>
                <th style={{ textAlign: 'center' }}>Pending Count</th>
                <th style={{ textAlign: 'center' }}>Status</th>
                <th style={{ textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredScreenings.length === 0 ? (
                <tr>
                  <td colSpan="12" className="table-empty-cell">
                    No screenings found matching your filter criteria.
                  </td>
                </tr>
              ) : (
                paginatedScreenings.map((scrn, idx) => {
                  const serialNumber = (currentPage - 1) * itemsPerPage + idx + 1;
                  const canSend = scrn.status !== 'Draft' && scrn.totalQuestions > 0;
                  return (
                    <tr key={scrn.id}>
                      {/* S.No */}
                      <td style={{ textAlign: 'center', fontWeight: 600 }}>{serialNumber}</td>

                      {/* Screening ID */}
                      <td>
                        <span className="screening-id-code">{scrn.id}</span>
                      </td>

                      {/* Screening Name */}
                      <td>
                        <div className="screening-name-cell">
                          <span className="scrn-name-main">{scrn.name}</span>
                          <span className="scrn-duration-sub">
                            <Clock size={11} /> {scrn.duration} • Ver {scrn.version}
                          </span>
                        </div>
                      </td>

                      {/* Job Title */}
                      <td>
                        <div className="job-title-cell">
                          <span className="job-title-text">{scrn.jobTitle}</span>
                          <span className="job-dept-sub">{scrn.department}</span>
                        </div>
                      </td>

                      {/* Total Questions */}
                      <td style={{ textAlign: 'center' }}>
                        <span className={`count-pill-badge ${scrn.totalQuestions === 0 ? 'empty' : 'blue'}`}>
                          <FileQuestion size={12} /> {scrn.totalQuestions}
                        </span>
                      </td>

                      {/* Total Marks */}
                      <td style={{ textAlign: 'center', fontWeight: 700 }}>
                        {scrn.totalMarks}
                      </td>

                      {/* Pass Mark */}
                      <td style={{ textAlign: 'center' }}>
                        <span className="pass-mark-pill">{scrn.passMark}%</span>
                      </td>

                      {/* Candidates Assigned */}
                      <td style={{ textAlign: 'center' }}>
                        <span className="count-pill-badge neutral">
                          <Users size={12} /> {scrn.candidatesAssigned}
                        </span>
                      </td>

                      {/* Completed Count */}
                      <td style={{ textAlign: 'center' }}>
                        <span className="count-pill-badge green">
                          <CheckCircle2 size={12} /> {scrn.completedCount}
                        </span>
                      </td>

                      {/* Pending Count */}
                      <td style={{ textAlign: 'center' }}>
                        <span className="count-pill-badge amber">
                          <Clock size={12} /> {scrn.pendingCount}
                        </span>
                      </td>

                      {/* Status */}
                      <td style={{ textAlign: 'center' }}>
                        <span className={`status-badge-chip ${getStatusBadgeClass(scrn.status)}`}>
                          {scrn.status}
                        </span>
                      </td>

                      {/* Row Actions: Send Screening, Candidate Results, Review Answers + Dropdown */}
                      <td style={{ textAlign: 'center' }}>
                        <div className="screening-actions-flex">
                          {/* 1. Quick Send Screening Action */}
                          <button
                            type="button"
                            className={`btn-row-action send ${!canSend ? 'disabled' : ''}`}
                            onClick={() => handleOpenSendScreening(scrn)}
                            disabled={!canSend}
                            title={
                              !canSend
                                ? 'Questions must be added and status Ready/Active to send screening'
                                : 'Send screening to eligible candidates'
                            }
                          >
                            <Send size={14} />
                          </button>

                          {/* 2. Candidate Results Action */}
                          <button
                            type="button"
                            className="btn-row-action results"
                            onClick={() => handleOpenCandidateResults(scrn)}
                            title="Candidate Results: View Candidate-wise marks and results"
                          >
                            <Award size={14} />
                          </button>

                          {/* 3. Review Answers Action (Highlights if manual review pending) */}
                          <button
                            type="button"
                            className={`btn-row-action review ${
                              scrn.hasPendingManualReview ? 'pending-alert' : ''
                            }`}
                            onClick={() => handleOpenReviewAnswers(scrn)}
                            title={
                              scrn.hasPendingManualReview
                                ? 'Manual Evaluation Pending: Review Descriptive Answers'
                                : 'Review Descriptive Answers'
                            }
                          >
                            <BookOpen size={14} />
                            {scrn.hasPendingManualReview && (
                              <span className="mini-alert-dot" />
                            )}
                          </button>

                          {/* 4. More Actions Dropdown Menu */}
                          <div className="actions-dropdown-container">
                            <button
                              type="button"
                              className="btn-dropdown-trigger"
                              onClick={() =>
                                setActiveActionsRowId(
                                  activeActionsRowId === scrn.id ? null : scrn.id
                                )
                              }
                              title="More Management Operations"
                            >
                              •••
                            </button>

                            {activeActionsRowId === scrn.id && (
                              <div
                                className="actions-dropdown-menu animate-fade-in"
                                onMouseLeave={() => setActiveActionsRowId(null)}
                              >
                                <button
                                  type="button"
                                  className="dropdown-menu-item"
                                  onClick={() => handleOpenViewDetails(scrn)}
                                >
                                  <Eye size={13} />
                                  <span>View Details</span>
                                </button>

                                <button
                                  type="button"
                                  className="dropdown-menu-item"
                                  onClick={() => handleOpenEditScreening(scrn)}
                                >
                                  <Edit2 size={13} />
                                  <span>Edit Settings</span>
                                </button>

                                <button
                                  type="button"
                                  className="dropdown-menu-item"
                                  onClick={() => handleOpenAddQuestions(scrn)}
                                >
                                  <FileQuestion size={13} />
                                  <span>Manage Questions</span>
                                </button>

                                <button
                                  type="button"
                                  className="dropdown-menu-item"
                                  onClick={() => handleOpenViewHistory(scrn)}
                                >
                                  <History size={13} />
                                  <span>View History</span>
                                </button>
                              </div>
                            )}
                          </div>
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
            Showing {filteredScreenings.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{' '}
            {Math.min(currentPage * itemsPerPage, filteredScreenings.length)} of{' '}
            {filteredScreenings.length} Entries
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
          PAGE VIEW 1: ADD SCREENING SUBPAGE VIEW
          ========================================================================= */}
      {addScreeningModalOpen && (
        <div className="screening-subpage-view animate-fade-in">
          <div className="screening-subpage-nav">
            <button
              type="button"
              className="btn-back-link"
              onClick={() => setAddScreeningModalOpen(false)}
            >
              <ArrowLeft size={16} />
              <span>Back to Screening Assessments</span>
            </button>
          </div>

          <div className="screening-subpage-header-card">
            <div className="modal-title-wrap">
              <div className="modal-icon-ring blue">
                <Plus size={20} />
              </div>
              <div>
                <h2 className="screening-modal-title">Add Screening Assessment</h2>
                <p className="screening-modal-subtitle">
                  Configure question bank, scoring criteria, passing marks, and time limits
                </p>
              </div>
            </div>
          </div>

          <div className="screening-subpage-body-card">
            <form onSubmit={handleSaveNewScreening}>
              <div className="screening-modal-body">
                {/* Job Selection (Important Logic Rule 1: First select Job) */}
                <div className="modal-form-section">
                  <label className="modal-section-label">
                    Select Related Published Job <span className="req-star">*</span>
                  </label>
                  <select
                    value={screeningFormData.jobId}
                    onChange={(e) =>
                      setScreeningFormData({ ...screeningFormData, jobId: e.target.value })
                    }
                    className="modal-select-input"
                    required
                  >
                    {publishedJobs.map((j) => (
                      <option key={j.id} value={j.id}>
                        {j.title} ({j.department})
                      </option>
                    ))}
                  </select>
                  <span className="modal-sub-hint">
                    Questions and candidates will be strictly mapped to this job role.
                  </span>
                </div>

                {/* Screening Name */}
                <div className="modal-form-section">
                  <label className="modal-section-label">
                    Screening Assessment Name <span className="req-star">*</span>
                  </label>
                  <input
                    type="text"
                    value={screeningFormData.name}
                    onChange={(e) =>
                      setScreeningFormData({ ...screeningFormData, name: e.target.value })
                    }
                    placeholder="e.g. Frontend Architecture & React 19 Coding Test"
                    className="modal-text-input"
                    required
                  />
                </div>

                {/* Duration & Marks Grid */}
                <div className="modal-grid-two-cols">
                  <div className="modal-form-section">
                    <label className="modal-section-label">Duration</label>
                    <select
                      value={screeningFormData.duration}
                      onChange={(e) =>
                        setScreeningFormData({
                          ...screeningFormData,
                          duration: e.target.value,
                        })
                      }
                      className="modal-select-input"
                    >
                      <option value="30 Mins">30 Mins</option>
                      <option value="45 Mins">45 Mins (Recommended)</option>
                      <option value="60 Mins">60 Mins</option>
                      <option value="90 Mins">90 Mins</option>
                    </select>
                  </div>

                  <div className="modal-form-section">
                    <label className="modal-section-label">Total Marks</label>
                    <input
                      type="number"
                      value={screeningFormData.totalMarks}
                      onChange={(e) =>
                        setScreeningFormData({
                          ...screeningFormData,
                          totalMarks: e.target.value,
                        })
                      }
                      className="modal-text-input"
                    />
                  </div>
                </div>

                <div className="modal-grid-two-cols">
                  <div className="modal-form-section">
                    <label className="modal-section-label">Qualifying Pass Mark (%)</label>
                    <input
                      type="number"
                      value={screeningFormData.passMark}
                      onChange={(e) =>
                        setScreeningFormData({
                          ...screeningFormData,
                          passMark: e.target.value,
                        })
                      }
                      className="modal-text-input"
                    />
                  </div>

                  <div className="modal-form-section">
                    <label className="modal-section-label">Initial Status</label>
                    <div className="status-preview-box">
                      <span className="status-badge-chip status-draft">Draft</span>
                      <span className="hint-text">
                        Becomes "Ready" once questions are added.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="screening-subpage-footer-card">
                <button
                  type="button"
                  className="btn-modal-cancel"
                  onClick={() => setAddScreeningModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-modal-submit">
                  <Plus size={15} />
                  <span>Create Screening</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          PAGE VIEW 2: EDIT SCREENING SUBPAGE VIEW
          ========================================================================= */}
      {editScreeningModalOpen && targetScreening && (
        <div className="screening-subpage-view animate-fade-in">
          <div className="screening-subpage-nav">
            <button
              type="button"
              className="btn-back-link"
              onClick={() => setEditScreeningModalOpen(false)}
            >
              <ArrowLeft size={16} />
              <span>Back to Screening Assessments</span>
            </button>
          </div>

          <div className="screening-subpage-header-card">
            <div className="modal-title-wrap">
              <div className="modal-icon-ring blue">
                <Edit2 size={20} />
              </div>
              <div>
                <h2 className="screening-modal-title">Edit Screening Settings</h2>
                <p className="screening-modal-subtitle">
                  {targetScreening.name} ({targetScreening.id})
                </p>
              </div>
            </div>
          </div>

          <div className="screening-subpage-body-card">
            <form onSubmit={handleSaveEditScreening}>
              <div className="screening-modal-body">
                {/* Important Logic: Candidates already attempt pannita screening questions restricted editing warning */}
                {targetScreening.candidatesAssigned > 0 && (
                  <div className="restricted-editing-callout">
                    <ShieldAlert size={18} className="alert-icon" />
                    <div>
                      <strong>Restricted Editing & Result Accuracy Protection:</strong>
                      <p>
                        {targetScreening.candidatesAssigned} candidate(s) have already attempted
                        or been assigned this screening. Direct question modification is restricted
                        to preserve result accuracy. General settings and pass thresholds can be
                        updated.
                      </p>
                    </div>
                  </div>
                )}

                <div className="modal-form-section">
                  <label className="modal-section-label">Screening Name</label>
                  <input
                    type="text"
                    value={screeningFormData.name}
                    onChange={(e) =>
                      setScreeningFormData({ ...screeningFormData, name: e.target.value })
                    }
                    className="modal-text-input"
                    required
                  />
                </div>

                <div className="modal-grid-two-cols">
                  <div className="modal-form-section">
                    <label className="modal-section-label">Duration</label>
                    <select
                      value={screeningFormData.duration}
                      onChange={(e) =>
                        setScreeningFormData({
                          ...screeningFormData,
                          duration: e.target.value,
                        })
                      }
                      className="modal-select-input"
                    >
                      <option value="30 Mins">30 Mins</option>
                      <option value="45 Mins">45 Mins</option>
                      <option value="60 Mins">60 Mins</option>
                      <option value="90 Mins">90 Mins</option>
                    </select>
                  </div>

                  <div className="modal-form-section">
                    <label className="modal-section-label">Pass Mark (%)</label>
                    <input
                      type="number"
                      value={screeningFormData.passMark}
                      onChange={(e) =>
                        setScreeningFormData({
                          ...screeningFormData,
                          passMark: e.target.value,
                        })
                      }
                      className="modal-text-input"
                    />
                  </div>
                </div>

                <div className="modal-form-section">
                  <label className="modal-section-label">Status</label>
                  <select
                    value={screeningFormData.status}
                    onChange={(e) =>
                      setScreeningFormData({
                        ...screeningFormData,
                        status: e.target.value,
                      })
                    }
                    className="modal-select-input"
                  >
                    <option value="Draft">Draft</option>
                    <option value="Ready">Ready</option>
                    <option value="Active">Active</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
              </div>

              <div className="screening-subpage-footer-card">
                <button
                  type="button"
                  className="btn-modal-cancel"
                  onClick={() => setEditScreeningModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-modal-submit">
                  <Check size={15} />
                  <span>Update Settings</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          PAGE VIEW 3: ADD / MANAGE QUESTIONS SUBPAGE VIEW
          ========================================================================= */}
      {addQuestionsModalOpen && targetScreening && (
        <div className="screening-subpage-view animate-fade-in">
          <div className="screening-subpage-nav">
            <button
              type="button"
              className="btn-back-link"
              onClick={() => setAddQuestionsModalOpen(false)}
            >
              <ArrowLeft size={16} />
              <span>Back to Screening Assessments</span>
            </button>
          </div>

          <div className="screening-subpage-header-card">
            <div className="modal-title-wrap">
              <div className="modal-icon-ring purple">
                <FileQuestion size={20} />
              </div>
              <div>
                <h2 className="screening-modal-title">Manage Questions</h2>
                <p className="screening-modal-subtitle">
                  Screening: {targetScreening.name} ({targetScreening.id})
                </p>
              </div>
            </div>
          </div>

          <div className="screening-subpage-body-card">
            <div className="screening-modal-body">
              {/* Question Mapping Logic Rule 2: Screening select pannama questions create panna allow pannina, later mapping compulsory */}
              <div className="modal-form-section">
                <label className="modal-section-label">
                  Mapped Screening Assessment <span className="req-star">*</span>
                </label>
                <select
                  value={questionFormData.targetScreeningId}
                  onChange={(e) => {
                    const chosen = screenings.find((s) => s.id === e.target.value);
                    setTargetScreening(chosen);
                    setQuestionFormData({
                      ...questionFormData,
                      targetScreeningId: e.target.value,
                    });
                  }}
                  className="modal-select-input"
                >
                  {screenings.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.id}) • {s.jobTitle}
                    </option>
                  ))}
                </select>
              </div>

              {/* Add New Question Form */}
              <form onSubmit={handleSaveNewQuestion} className="new-question-box">
                <h4 className="box-title">
                  <Plus size={14} /> Add New Assessment Question
                </h4>

                <div className="modal-form-section">
                  <label className="modal-section-label">Question Text</label>
                  <textarea
                    value={questionFormData.text}
                    onChange={(e) =>
                      setQuestionFormData({ ...questionFormData, text: e.target.value })
                    }
                    placeholder="Enter assessment question, code prompt, or scenario..."
                    rows="2"
                    className="modal-textarea-input"
                    required
                  />
                </div>

                <div className="modal-grid-three-cols">
                  <div className="modal-form-section">
                    <label className="modal-section-label">Question Type</label>
                    <select
                      value={questionFormData.type}
                      onChange={(e) =>
                        setQuestionFormData({ ...questionFormData, type: e.target.value })
                      }
                      className="modal-select-input"
                    >
                      <option value="MCQ">Multiple Choice (MCQ)</option>
                      <option value="Descriptive">Descriptive / Long Text</option>
                      <option value="Code Assessment">Code Assessment</option>
                      <option value="Yes/No">Yes / No</option>
                      <option value="Numeric">Numeric</option>
                    </select>
                  </div>

                  <div className="modal-form-section">
                    <label className="modal-section-label">Marks</label>
                    <input
                      type="number"
                      value={questionFormData.marks}
                      onChange={(e) =>
                        setQuestionFormData({
                          ...questionFormData,
                          marks: e.target.value,
                        })
                      }
                      className="modal-text-input"
                      required
                    />
                  </div>

                  <div className="modal-form-section">
                    <label className="modal-section-label">Mandatory</label>
                    <label className="checkbox-toggle-label">
                      <input
                        type="checkbox"
                        checked={questionFormData.mandatory}
                        onChange={(e) =>
                          setQuestionFormData({
                            ...questionFormData,
                            mandatory: e.target.checked,
                          })
                        }
                      />
                      <span>Required Question</span>
                    </label>
                  </div>
                </div>

                <div className="add-q-btn-row">
                  <button type="submit" className="btn-add-q-inline">
                    <Plus size={14} /> Add to Assessment
                  </button>
                </div>
              </form>

              {/* Current Questions List for this Screening */}
              <div className="current-questions-list-section">
                <h4 className="section-title">
                  Mapped Questions ({targetScreening.questions.length})
                </h4>

                {targetScreening.questions.length === 0 ? (
                  <div className="empty-questions-notice">
                    <AlertCircle size={18} />
                    <span>
                      No questions mapped yet. Assessment is currently in <strong>Draft</strong>. Add
                      questions above to make it <strong>Ready</strong> for sending.
                    </span>
                  </div>
                ) : (
                  <div className="questions-card-list">
                    {targetScreening.questions.map((q, qIndex) => (
                      <div key={q.id} className="question-list-card">
                        <div className="q-left">
                          <span className="q-badge-num">Q{qIndex + 1}</span>
                          <div className="q-text-wrap">
                            <span className="q-text">{q.text}</span>
                            <div className="q-tags-row">
                              <span className="q-tag type">{q.type}</span>
                              <span className="q-tag marks">{q.marks} Marks</span>
                              {q.mandatory && (
                                <span className="q-tag mandatory">Mandatory</span>
                              )}
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          className="btn-delete-q"
                          onClick={() => handleDeleteQuestion(targetScreening.id, q.id)}
                          title="Remove question"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="screening-subpage-footer-card">
              <button
                type="button"
                className="btn-modal-cancel"
                onClick={() => setAddQuestionsModalOpen(false)}
              >
                Back to Screening Assessments
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          PAGE VIEW 4: SEND SCREENING SUBPAGE VIEW
          ========================================================================= */}
      {sendScreeningModalOpen && targetScreening && (
        <div className="screening-subpage-view animate-fade-in">
          <div className="screening-subpage-nav">
            <button
              type="button"
              className="btn-back-link"
              onClick={() => setSendScreeningModalOpen(false)}
            >
              <ArrowLeft size={16} />
              <span>Back to Screening Assessments</span>
            </button>
          </div>

          <div className="screening-subpage-header-card">
            <div className="modal-title-wrap">
              <div className="modal-icon-ring blue">
                <Send size={20} />
              </div>
              <div>
                <h2 className="screening-modal-title">Send Screening Assessment</h2>
                <p className="screening-modal-subtitle">
                  {targetScreening.name} • {targetScreening.jobTitle}
                </p>
              </div>
            </div>
          </div>

          <div className="screening-subpage-body-card">
            <div className="screening-modal-body">
              {/* Target Candidate Summary */}
              <div className="modal-recipients-summary-box">
                <div className="recipients-stat">
                  <span className="rec-lbl">Assessment Name:</span>
                  <span className="rec-val">
                    <strong>{targetScreening.name}</strong>
                  </span>
                </div>
                <div className="recipients-stat">
                  <span className="rec-lbl">Pass Threshold:</span>
                  <span className="rec-val green">
                    <Award size={14} />
                    <strong>{targetScreening.passMark}% Required</strong>
                  </span>
                </div>
              </div>

              {/* Select Eligible Candidates Pool */}
              <div className="modal-form-section">
                <label className="modal-section-label">
                  Select Candidate Recipients ({selectedCandidateRecipients.filter((c) => c.selected).length} Selected)
                </label>
                <div className="candidates-selection-checklist">
                  {selectedCandidateRecipients.map((cand) => (
                    <label
                      key={cand.id}
                      className={`cand-select-card ${cand.selected ? 'active' : ''}`}
                    >
                      <input
                        type="checkbox"
                        checked={cand.selected}
                        onChange={() =>
                          setSelectedCandidateRecipients((prev) =>
                            prev.map((c) =>
                              c.id === cand.id ? { ...c, selected: !c.selected } : c
                            )
                          )
                        }
                      />
                      <div className="cand-info-wrap">
                        <span className="cand-name">{cand.name}</span>
                        <span className="cand-ref">{cand.id}</span>
                      </div>
                      <span className="cand-score-tag">Match: {cand.score}%</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Expiry & Instructions */}
              <div className="modal-grid-two-cols">
                <div className="modal-form-section">
                  <label className="modal-section-label">Assessment Expiry (Days)</label>
                  <select
                    value={sendExpiryDays}
                    onChange={(e) => setSendExpiryDays(e.target.value)}
                    className="modal-select-input"
                  >
                    <option value="3">3 Days</option>
                    <option value="5">5 Days (Recommended)</option>
                    <option value="7">7 Days</option>
                  </select>
                </div>

                <div className="modal-form-section">
                  <label className="modal-section-label">Automated Delivery</label>
                  <div className="delivery-channels-pill">
                    <CheckCircle size={14} /> Email & Candidate Portal
                  </div>
                </div>
              </div>

              <div className="modal-form-section">
                <label className="modal-section-label">Instructions / Message Note</label>
                <textarea
                  value={sendInstructions}
                  onChange={(e) => setSendInstructions(e.target.value)}
                  rows="2"
                  className="modal-textarea-input"
                />
              </div>
            </div>

            <div className="screening-subpage-footer-card">
              <button
                type="button"
                className="btn-modal-cancel"
                onClick={() => setSendScreeningModalOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn-modal-submit"
                onClick={handleExecuteSendScreening}
                disabled={
                  selectedCandidateRecipients.filter((c) => c.selected).length === 0
                }
              >
                <Send size={15} />
                <span>
                  Dispatch to {selectedCandidateRecipients.filter((c) => c.selected).length}{' '}
                  Candidates
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          PAGE VIEW 5: CANDIDATE RESULTS SUBPAGE VIEW
          ========================================================================= */}
      {candidateResultsModalOpen && targetScreening && !reviewAnswersModalOpen && (
        <div className="screening-subpage-view animate-fade-in">
          <div className="screening-subpage-nav">
            <button
              type="button"
              className="btn-back-link"
              onClick={() => setCandidateResultsModalOpen(false)}
            >
              <ArrowLeft size={16} />
              <span>Back to Screening Assessments</span>
            </button>
          </div>

          <div className="screening-subpage-header-card">
            <div className="modal-title-wrap">
              <div className="modal-icon-ring green">
                <Award size={20} />
              </div>
              <div>
                <h2 className="screening-modal-title">Candidate Results</h2>
                <p className="screening-modal-subtitle">
                  {targetScreening.name} • Pass Mark: {targetScreening.passMark}%
                </p>
              </div>
            </div>
          </div>

          <div className="screening-subpage-body-card">
            <div className="screening-modal-body">
              {/* Important Logic: Screening send pannina piragu results page access pannalaam.
                  Candidate submit pannala-na Pending; submit panninaalum manual evaluation pending-na Review Required */}
              <div className="results-table-wrapper">
                <table className="results-table">
                  <thead>
                    <tr>
                      <th style={{ width: '50px', textAlign: 'center' }}>S.No</th>
                      <th>Candidate ID</th>
                      <th>Candidate Name</th>
                      <th>Assigned Date</th>
                      <th>Submitted Date</th>
                      <th style={{ textAlign: 'center' }}>Marks Obtained</th>
                      <th style={{ textAlign: 'center' }}>Result Status</th>
                      <th style={{ textAlign: 'center' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {targetResults.length === 0 ? (
                      <tr>
                        <td colSpan="8" className="table-empty-cell">
                          No candidate evaluation results available yet. Dispatched candidates will appear here once submitted.
                        </td>
                      </tr>
                    ) : (
                      paginatedResults.map((r, idx) => (
                        <tr key={r.candidateId}>
                          <td style={{ textAlign: 'center', fontWeight: 600 }}>
                            {(resultsPage - 1) * resultsPerPage + idx + 1}
                          </td>
                          <td>
                            <span className="cand-code">{r.candidateId}</span>
                          </td>
                          <td>
                            <span className="cand-name">{r.candidateName}</span>
                          </td>
                          <td>
                            <span className="date-sub">{r.assignedDate}</span>
                          </td>
                          <td>
                            <span className="date-sub">
                              {r.submittedDate || 'Pending Submission'}
                            </span>
                          </td>
                          <td style={{ textAlign: 'center' }}>
                            <span className="marks-badge">
                              {r.submittedDate ? `${r.marksObtained} / ${targetScreening.totalMarks}` : '-'}
                            </span>
                          </td>
                          <td style={{ textAlign: 'center' }}>
                            <span
                              className={`result-chip ${
                                r.result === 'Qualified'
                                  ? 'qualified'
                                  : r.result === 'Review Required'
                                  ? 'review'
                                  : r.result === 'Pending'
                                  ? 'pending'
                                  : 'failed'
                              }`}
                            >
                              {r.result}
                            </span>
                          </td>
                          <td style={{ textAlign: 'center' }}>
                            {r.manualReviewNeeded ? (
                              <button
                                type="button"
                                className="btn-results-action evaluate"
                                onClick={() => handleOpenReviewAnswers(targetScreening, r)}
                              >
                                Review Answers
                              </button>
                            ) : r.result === 'Qualified' ? (
                              <button
                                type="button"
                                className="btn-results-action shortlist"
                                onClick={() =>
                                  handleMoveCandidateToShortlisted(r.candidateId)
                                }
                              >
                                <UserCheck size={12} /> Shortlist
                              </button>
                            ) : (
                              <span className="action-none-text">-</span>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Candidate Results Pagination Footer */}
              <div className="companies-pagination-row">
                <div className="pagination-entries-count">
                  Showing {targetResults.length > 0 ? (resultsPage - 1) * resultsPerPage + 1 : 0} to{' '}
                  {Math.min(resultsPage * resultsPerPage, targetResults.length)} of{' '}
                  {targetResults.length} Entries
                </div>
                <div className="pagination-controls">
                  <button
                    type="button"
                    className={`pagination-nav-btn ${resultsPage === 1 ? 'disabled' : ''}`}
                    disabled={resultsPage === 1}
                    onClick={() => setResultsPage((p) => Math.max(1, p - 1))}
                  >
                    <ChevronLeft size={16} />
                  </button>
                  {Array.from({ length: totalResultsPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      type="button"
                      className={`pagination-page-btn ${resultsPage === page ? 'active' : ''}`}
                      onClick={() => setResultsPage(page)}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    type="button"
                    className={`pagination-nav-btn ${resultsPage === totalResultsPages ? 'disabled' : ''}`}
                    disabled={resultsPage === totalResultsPages}
                    onClick={() => setResultsPage((p) => Math.min(totalResultsPages, p + 1))}
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>

            <div className="screening-subpage-footer-card">
              <button
                type="button"
                className="btn-modal-cancel"
                onClick={() => setCandidateResultsModalOpen(false)}
              >
                Back to Screening Assessments
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          PAGE VIEW 6: REVIEW ANSWERS SUBPAGE VIEW
          ========================================================================= */}
      {reviewAnswersModalOpen && reviewCandidate && targetScreening && (
        <div className="screening-subpage-view animate-fade-in">
          <div className="screening-subpage-nav">
            <button
              type="button"
              className="btn-back-link"
              onClick={() => setReviewAnswersModalOpen(false)}
            >
              <ArrowLeft size={16} />
              <span>Back to Candidate Results</span>
            </button>
          </div>

          <div className="screening-subpage-header-card">
            <div className="modal-title-wrap">
              <div className="modal-icon-ring amber">
                <BookOpen size={20} />
              </div>
              <div>
                <h2 className="screening-modal-title">Review Descriptive Answers</h2>
                <p className="screening-modal-subtitle">
                  Candidate: {reviewCandidate.candidateName} ({reviewCandidate.candidateId})
                </p>
              </div>
            </div>
          </div>

          <div className="screening-subpage-body-card">
            <div className="screening-modal-body">
              {/* Question & Answer Box */}
              <div className="candidate-answer-card">
                <div className="answer-card-header">
                  <span className="q-label">Question:</span>
                  <span className="q-title">
                    Explain how React 19 Server Components handle data mutations and streaming boundaries.
                  </span>
                </div>

                <div className="candidate-submission-content">
                  <span className="sub-label">Candidate Answer:</span>
                  <p className="sub-text">
                    "{reviewCandidate.descriptiveAnswer ||
                      'React 19 Server Components execute on the server and stream UI chunks via suspense boundaries. Mutations use Server Actions with revalidatePath to invalidate client cache seamlessly.'}"
                  </p>
                </div>
              </div>

              {/* Recruiter Evaluation Form */}
              <div className="modal-form-section">
                <label className="modal-section-label">
                  Manual Marks Awarded (Max 25 Marks) <span className="req-star">*</span>
                </label>
                <input
                  type="number"
                  max="25"
                  min="0"
                  value={manualMarksAwarded}
                  onChange={(e) => setManualMarksAwarded(e.target.value)}
                  className="modal-text-input"
                  required
                />
              </div>

              <div className="modal-form-section">
                <label className="modal-section-label">Evaluator Feedback & Notes</label>
                <textarea
                  value={evaluatorNotes}
                  onChange={(e) => setEvaluatorNotes(e.target.value)}
                  rows="3"
                  className="modal-textarea-input"
                />
              </div>
            </div>

            <div className="screening-subpage-footer-card">
              <button
                type="button"
                className="btn-modal-cancel"
                onClick={() => setReviewAnswersModalOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn-modal-submit"
                onClick={handleFinalizeManualEvaluation}
              >
                <CheckCircle size={15} />
                <span>Finalize Score & Qualify</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          PAGE VIEW 7: VIEW DETAILS SUBPAGE VIEW
          ========================================================================= */}
      {viewDetailsModalOpen && targetScreening && (
        <div className="screening-subpage-view animate-fade-in">
          <div className="screening-subpage-nav">
            <button
              type="button"
              className="btn-back-link"
              onClick={() => setViewDetailsModalOpen(false)}
            >
              <ArrowLeft size={16} />
              <span>Back to Screening Assessments</span>
            </button>
          </div>

          <div className="screening-subpage-header-card">
            <div className="modal-title-wrap">
              <div className="modal-icon-ring blue">
                <Eye size={20} />
              </div>
              <div>
                <h2 className="screening-modal-title">Screening Details</h2>
                <p className="screening-modal-subtitle">
                  {targetScreening.name} ({targetScreening.id})
                </p>
              </div>
            </div>
          </div>

          <div className="screening-subpage-body-card">
            <div className="screening-modal-body">
              <div className="details-info-grid">
                <div className="details-info-item">
                  <span className="lbl">Screening ID</span>
                  <span className="val bold">{targetScreening.id}</span>
                </div>
                <div className="details-info-item">
                  <span className="lbl">Status</span>
                  <span className={`status-badge-chip ${getStatusBadgeClass(targetScreening.status)}`}>
                    {targetScreening.status}
                  </span>
                </div>
                <div className="details-info-item">
                  <span className="lbl">Related Job</span>
                  <span className="val">{targetScreening.jobTitle}</span>
                </div>
                <div className="details-info-item">
                  <span className="lbl">Department</span>
                  <span className="val">{targetScreening.department}</span>
                </div>
                <div className="details-info-item">
                  <span className="lbl">Duration</span>
                  <span className="val">{targetScreening.duration}</span>
                </div>
                <div className="details-info-item">
                  <span className="lbl">Pass Criteria</span>
                  <span className="val green">{targetScreening.passMark}% Passing Score</span>
                </div>
                <div className="details-info-item">
                  <span className="lbl">Total Questions</span>
                  <span className="val">{targetScreening.totalQuestions} Questions</span>
                </div>
                <div className="details-info-item">
                  <span className="lbl">Total Marks</span>
                  <span className="val">{targetScreening.totalMarks} Marks</span>
                </div>
              </div>
            </div>

            <div className="screening-subpage-footer-card">
              <button
                type="button"
                className="btn-modal-cancel"
                onClick={() => setViewDetailsModalOpen(false)}
              >
                Back to Screening Assessments
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          PAGE VIEW 8: VIEW HISTORY SUBPAGE VIEW
          ========================================================================= */}
      {viewHistoryModalOpen && targetScreening && (
        <div className="screening-subpage-view animate-fade-in">
          <div className="screening-subpage-nav">
            <button
              type="button"
              className="btn-back-link"
              onClick={() => setViewHistoryModalOpen(false)}
            >
              <ArrowLeft size={16} />
              <span>Back to Screening Assessments</span>
            </button>
          </div>

          <div className="screening-subpage-header-card">
            <div className="modal-title-wrap">
              <div className="modal-icon-ring purple">
                <History size={20} />
              </div>
              <div>
                <h2 className="screening-modal-title">Assignment & Result History</h2>
                <p className="screening-modal-subtitle">
                  {targetScreening.name} ({targetScreening.id})
                </p>
              </div>
            </div>
          </div>

          <div className="screening-subpage-body-card">
            <div className="screening-modal-body">
              <div className="history-timeline-list">
                {targetScreening.history.map((h, i) => (
                  <div key={i} className="timeline-item">
                    <div className="timeline-marker" />
                    <div className="timeline-content">
                      <span className="timeline-date">{h.date}</span>
                      <span className="timeline-event">{h.event}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="screening-subpage-footer-card">
              <button
                type="button"
                className="btn-modal-cancel"
                onClick={() => setViewHistoryModalOpen(false)}
              >
                Back to Screening Assessments
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
