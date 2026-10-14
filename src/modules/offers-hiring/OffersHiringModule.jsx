import React, { useState } from 'react';
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Calendar,
  Clock,
  CheckCircle,
  CheckCircle2,
  AlertCircle,
  XCircle,
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
  ChevronRight,
  ChevronLeft,
  HelpCircle,
  Check,
  AlertTriangle,
  RotateCcw,
  FileText,
  Download,
  Printer,
  DollarSign,
  Building,
  MapPin,
  RefreshCw,
  FileCheck,
  X,
  FileSpreadsheet,
  Save,
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import './OffersHiringModule.css';

// =========================================================================
// 1. ELIGIBLE CANDIDATES WITH "HIRE" RECOMMENDATION (From Interviews Module)
// =========================================================================
const hireRecommendedCandidates = [
  {
    candidateId: 'CAN-REF-1042',
    name: 'Rajesh Kumar',
    jobId: 'JOB-2026-001',
    jobTitle: 'Senior Frontend Engineer (JOB-2026-001)',
    department: 'Engineering & Technology',
    designation: 'Senior Frontend Engineer (React/TypeScript)',
    interviewRef: 'INT-2026-001 (Technical Round)',
    interviewRating: '4.8 / 5',
    recommendation: 'Hire',
    recommendedSalary: '₹28,50,000 / annum',
    defaultLocation: 'Chennai Campus (Hybrid)',
  },
  {
    candidateId: 'CAN-REF-2015',
    name: 'Aishwarya Lakshmi',
    jobId: 'JOB-2026-002',
    jobTitle: 'Lead Product Designer (JOB-2026-002)',
    department: 'Design & UX',
    designation: 'Lead Product Designer - Design Systems',
    interviewRef: 'INT-2026-002 (Managerial Round)',
    interviewRating: '4.7 / 5',
    recommendation: 'Hire',
    recommendedSalary: '₹32,00,000 / annum',
    defaultLocation: 'Bengaluru HQ (Office)',
  },
  {
    candidateId: 'CAN-REF-5002',
    name: 'Venkatesh S',
    jobId: 'JOB-2026-005',
    jobTitle: 'Enterprise Account Executive (JOB-2026-005)',
    department: 'Business Development',
    designation: 'Senior Enterprise Account Executive',
    interviewRef: 'INT-2026-005 (Final Executive Round)',
    interviewRating: '4.6 / 5',
    recommendation: 'Hire',
    recommendedSalary: '₹38,00,000 / annum',
    defaultLocation: 'Mumbai Corporate Office',
  },
  {
    candidateId: 'CAN-REF-3008',
    name: 'Nathiya Ramesh',
    jobId: 'JOB-2026-003',
    jobTitle: 'HR Executive (JOB-2026-003)',
    department: 'Human Resources',
    designation: 'Senior HR Executive - Talent Acquisition',
    interviewRef: 'INT-2026-004 (HR Round)',
    interviewRating: '4.4 / 5',
    recommendation: 'Hire',
    recommendedSalary: '₹18,50,000 / annum',
    defaultLocation: 'Chennai Campus (Office)',
  },
  {
    candidateId: 'CAN-REF-7011',
    name: 'Karthikeyan Selvam',
    jobId: 'JOB-2026-007',
    jobTitle: 'Software Developer (JOB-2026-007)',
    department: 'Engineering & Technology',
    designation: 'Software Engineer - Full Stack',
    interviewRef: 'INT-2026-008 (Technical Round)',
    interviewRating: '4.5 / 5',
    recommendation: 'Hire',
    recommendedSalary: '₹20,00,000 / annum',
    defaultLocation: 'Chennai Campus (Hybrid)',
  },
];

// Available Jobs List
const availableJobs = [
  { id: 'JOB-2026-001', title: 'Senior Frontend Engineer (JOB-2026-001)', department: 'Engineering & Technology' },
  { id: 'JOB-2026-002', title: 'Lead Product Designer (JOB-2026-002)', department: 'Design & UX' },
  { id: 'JOB-2026-003', title: 'HR Executive (JOB-2026-003)', department: 'Human Resources' },
  { id: 'JOB-2026-004', title: 'DevOps & Cloud Architect (JOB-2026-004)', department: 'Engineering & Technology' },
  { id: 'JOB-2026-005', title: 'Enterprise Account Executive (JOB-2026-005)', department: 'Business Development' },
  { id: 'JOB-2026-007', title: 'Software Developer (JOB-2026-007)', department: 'Engineering & Technology' },
];

// =========================================================================
// 2. INITIAL OFFERS & HIRING RECORDS
// =========================================================================
const initialOffers = [
  {
    id: 'OFF-2026-001',
    version: 'v1',
    candidateId: 'CAN-REF-2015',
    candidateName: 'Aishwarya Lakshmi',
    candidate: 'Aishwarya Lakshmi (CAN-REF-2015)',
    jobId: 'JOB-2026-002',
    jobTitle: 'Lead Product Designer (JOB-2026-002)',
    designation: 'Lead Product Designer - Design Systems',
    department: 'Design & UX',
    employmentType: 'Full-time',
    salaryCtc: '₹32,00,000 / annum',
    salaryAnnualNumber: 3200000,
    salaryBreakdown: {
      basic: '₹16,00,000 (50%)',
      hra: '₹8,00,000 (25%)',
      specialAllowance: '₹4,80,000 (15%)',
      performanceBonus: '₹3,20,000 (10%)',
    },
    workLocation: 'Bengaluru HQ (Office)',
    joiningDate: '28-Oct-2026',
    offerSentDate: '16-Oct-2026',
    offerValidUntil: '23-Oct-2026',
    offerStatus: 'Accepted',
    joiningStatus: 'Joined',
    actualJoiningDate: '28-Oct-2026',
    joiningConfirmedBy: 'Karthik Raja (Design Head)',
    joiningConfirmedDate: '28-Oct-2026 10:15 AM',
    notJoinedReason: '',
    interviewRef: 'INT-2026-002 (Managerial Round - Rating: 4.7/5)',
    offerDocument: 'Offer_Letter_Aishwarya_Lakshmi_OFF001.pdf',
    additionalTerms: '6 months probation period, standard IP assignment, 30 days notice buyout.',
    responseDate: '17-Oct-2026 11:30 AM',
    responseNotes: 'Candidate happily accepted via Candidate Portal.',
    auditHistory: [
      { action: 'Offer Generated (v1)', date: '16-Oct-2026 10:00 AM', user: 'Abinaya R (Senior HR Manager)', notes: 'Initial offer generated based on Hire recommendation.' },
      { action: 'Offer Dispatched', date: '16-Oct-2026 10:45 AM', user: 'Abinaya R (Senior HR Manager)', notes: 'Official offer letter sent via Candidate Email & App notification.' },
      { action: 'Offer Accepted', date: '17-Oct-2026 11:30 AM', user: 'Candidate (Aishwarya Lakshmi)', notes: 'Candidate digitally signed acceptance.' },
      { action: 'Joining Confirmed', date: '28-Oct-2026 10:15 AM', user: 'Karthik Raja (Design Head)', notes: 'Candidate physically reported; onboarding kit and access credentials handed over. Status marked as HIRED.' },
    ],
  },
  {
    id: 'OFF-2026-002',
    version: 'v1',
    candidateId: 'CAN-REF-1042',
    candidateName: 'Rajesh Kumar',
    candidate: 'Rajesh Kumar (CAN-REF-1042)',
    jobId: 'JOB-2026-001',
    jobTitle: 'Senior Frontend Engineer (JOB-2026-001)',
    designation: 'Senior Frontend Engineer (React/TypeScript)',
    department: 'Engineering & Technology',
    employmentType: 'Full-time',
    salaryCtc: '₹28,50,000 / annum',
    salaryAnnualNumber: 2850000,
    salaryBreakdown: {
      basic: '₹14,25,000 (50%)',
      hra: '₹7,12,500 (25%)',
      specialAllowance: '₹4,27,500 (15%)',
      performanceBonus: '₹2,85,000 (10%)',
    },
    workLocation: 'Chennai Campus (Hybrid)',
    joiningDate: '01-Nov-2026',
    offerSentDate: '15-Oct-2026',
    offerValidUntil: '24-Oct-2026',
    offerStatus: 'Accepted',
    joiningStatus: 'Pending',
    actualJoiningDate: '',
    joiningConfirmedBy: '',
    joiningConfirmedDate: '',
    notJoinedReason: '',
    interviewRef: 'INT-2026-001 (Technical Round - Rating: 4.8/5)',
    offerDocument: 'Offer_Letter_Rajesh_Kumar_OFF002.pdf',
    additionalTerms: 'Hybrid work policy: 3 days in campus, 2 days remote. Standard health insurance for family.',
    responseDate: '16-Oct-2026 04:15 PM',
    responseNotes: 'Candidate accepted offer. Currently serving 15-day notice period with previous firm.',
    auditHistory: [
      { action: 'Offer Generated (v1)', date: '15-Oct-2026 02:00 PM', user: 'Abinaya R (Senior HR Manager)', notes: 'Draft offer created with annual CTC ₹28.5 LPA.' },
      { action: 'Offer Dispatched', date: '15-Oct-2026 02:30 PM', user: 'Abinaya R (Senior HR Manager)', notes: 'Sent to candidate with offer validity 24-Oct-2026.' },
      { action: 'Offer Accepted', date: '16-Oct-2026 04:15 PM', user: 'Candidate (Rajesh Kumar)', notes: 'Accepted. Joining status set to Pending until 01-Nov-2026.' },
    ],
  },
  {
    id: 'OFF-2026-003',
    version: 'v2',
    candidateId: 'CAN-REF-5002',
    candidateName: 'Venkatesh S',
    candidate: 'Venkatesh S (CAN-REF-5002)',
    jobId: 'JOB-2026-005',
    jobTitle: 'Enterprise Account Executive (JOB-2026-005)',
    designation: 'Senior Enterprise Account Executive',
    department: 'Business Development',
    employmentType: 'Full-time',
    salaryCtc: '₹38,00,000 / annum',
    salaryAnnualNumber: 3800000,
    salaryBreakdown: {
      basic: '₹19,00,000 (50%)',
      hra: '₹9,50,000 (25%)',
      specialAllowance: '₹5,70,000 (15%)',
      performanceBonus: '₹3,80,000 (10%)',
    },
    workLocation: 'Mumbai Corporate Office',
    joiningDate: '10-Nov-2026',
    offerSentDate: '14-Oct-2026',
    offerValidUntil: '25-Oct-2026',
    offerStatus: 'Sent',
    joiningStatus: 'Pending',
    actualJoiningDate: '',
    joiningConfirmedBy: '',
    joiningConfirmedDate: '',
    notJoinedReason: '',
    interviewRef: 'INT-2026-005 (Final Executive Round - Rating: 4.6/5)',
    offerDocument: 'Offer_Letter_Venkatesh_S_OFF003_v2.pdf',
    additionalTerms: 'Annual uncapped quarterly commission plan, executive wellness package, company laptop.',
    responseDate: '',
    responseNotes: 'Candidate reviewing compensation and commission structure breakdown.',
    auditHistory: [
      { action: 'Offer Generated (v1)', date: '13-Oct-2026 11:00 AM', user: 'Abinaya R (Senior HR Manager)', notes: 'Initial offer of ₹35.0 LPA drafted.' },
      { action: 'Offer Revised (v2)', date: '14-Oct-2026 03:00 PM', user: 'Rajeshwaran K (VP Sales)', notes: 'Revised to ₹38.0 LPA with enhanced stock options. History preserved.' },
      { action: 'Offer Dispatched (v2)', date: '14-Oct-2026 03:30 PM', user: 'Abinaya R (Senior HR Manager)', notes: 'Dispatched to candidate.' },
    ],
  },
  {
    id: 'OFF-2026-004',
    version: 'v1',
    candidateId: 'CAN-REF-3008',
    candidateName: 'Nathiya Ramesh',
    candidate: 'Nathiya Ramesh (CAN-REF-3008)',
    jobId: 'JOB-2026-003',
    jobTitle: 'HR Executive (JOB-2026-003)',
    designation: 'Senior HR Executive - Talent Acquisition',
    department: 'Human Resources',
    employmentType: 'Full-time',
    salaryCtc: '₹18,50,000 / annum',
    salaryAnnualNumber: 1850000,
    salaryBreakdown: {
      basic: '₹9,25,000 (50%)',
      hra: '₹4,62,500 (25%)',
      specialAllowance: '₹2,77,500 (15%)',
      performanceBonus: '₹1,85,000 (10%)',
    },
    workLocation: 'Chennai Campus (Office)',
    joiningDate: '05-Nov-2026',
    offerSentDate: 'Pending Send',
    offerValidUntil: '26-Oct-2026',
    offerStatus: 'Draft',
    joiningStatus: 'Pending',
    actualJoiningDate: '',
    joiningConfirmedBy: '',
    joiningConfirmedDate: '',
    notJoinedReason: '',
    interviewRef: 'INT-2026-004 (HR Round - Rating: 4.4/5)',
    offerDocument: 'Offer_Letter_Nathiya_Ramesh_OFF004.pdf',
    additionalTerms: '3 months probation, performance review at 6 months.',
    responseDate: '',
    responseNotes: 'Draft offer created. Pending HR Director final sign-off before dispatch.',
    auditHistory: [
      { action: 'Draft Created', date: '14-Oct-2026 04:45 PM', user: 'Abinaya R (Senior HR Manager)', notes: 'Draft offer generated.' },
    ],
  },
  {
    id: 'OFF-2026-005',
    version: 'v1',
    candidateId: 'CAN-REF-1048',
    candidateName: 'Subhashini M',
    candidate: 'Subhashini M (CAN-REF-1048)',
    jobId: 'JOB-2026-001',
    jobTitle: 'Senior Frontend Engineer (JOB-2026-001)',
    designation: 'Senior Frontend Engineer',
    department: 'Engineering & Technology',
    employmentType: 'Full-time',
    salaryCtc: '₹26,00,000 / annum',
    salaryAnnualNumber: 2600000,
    salaryBreakdown: {
      basic: '₹13,00,000 (50%)',
      hra: '₹6,50,000 (25%)',
      specialAllowance: '₹3,90,000 (15%)',
      performanceBonus: '₹2,60,000 (10%)',
    },
    workLocation: 'Chennai Campus (Office)',
    joiningDate: '24-Oct-2026',
    offerSentDate: '08-Oct-2026',
    offerValidUntil: '14-Oct-2026',
    offerStatus: 'Declined',
    joiningStatus: 'Not Joined',
    actualJoiningDate: '',
    joiningConfirmedBy: '',
    joiningConfirmedDate: '',
    notJoinedReason: 'Candidate accepted competing counter-offer from existing employer.',
    interviewRef: 'INT-2026-006 (Technical Round)',
    offerDocument: 'Offer_Letter_Subhashini_M_OFF005.pdf',
    additionalTerms: 'Standard employment agreement.',
    responseDate: '12-Oct-2026 02:45 PM',
    responseNotes: 'Declined with regret due to retention counter-offer.',
    auditHistory: [
      { action: 'Offer Dispatched', date: '08-Oct-2026 10:00 AM', user: 'Abinaya R', notes: 'Offer sent.' },
      { action: 'Offer Declined', date: '12-Oct-2026 02:45 PM', user: 'Candidate', notes: 'Reason: Competing offer.' },
    ],
  },
  {
    id: 'OFF-2026-006',
    version: 'v1',
    candidateId: 'CAN-REF-1049',
    candidateName: 'Manoj Krishnan',
    candidate: 'Manoj Krishnan (CAN-REF-1049)',
    jobId: 'JOB-2026-004',
    jobTitle: 'DevOps & Cloud Architect (JOB-2026-004)',
    designation: 'Lead DevOps Engineer',
    department: 'Engineering & Technology',
    employmentType: 'Full-time',
    salaryCtc: '₹30,00,000 / annum',
    salaryAnnualNumber: 3000000,
    salaryBreakdown: {
      basic: '₹15,00,000 (50%)',
      hra: '₹7,50,000 (25%)',
      specialAllowance: '₹4,50,000 (15%)',
      performanceBonus: '₹3,00,000 (10%)',
    },
    workLocation: 'Chennai Campus (Hybrid)',
    joiningDate: '01-Oct-2026',
    offerSentDate: '20-Sep-2026',
    offerValidUntil: '28-Sep-2026',
    offerStatus: 'Expired',
    joiningStatus: 'Not Joined',
    actualJoiningDate: '',
    joiningConfirmedBy: '',
    joiningConfirmedDate: '',
    notJoinedReason: 'Offer validity expired without response from candidate.',
    interviewRef: 'INT-2026-007 (HR Round)',
    offerDocument: 'Offer_Letter_Manoj_Krishnan_OFF006.pdf',
    additionalTerms: 'Standard employment terms.',
    responseDate: '',
    responseNotes: 'Lapsed after validity deadline.',
    auditHistory: [
      { action: 'Offer Dispatched', date: '20-Sep-2026 11:00 AM', user: 'Abinaya R', notes: 'Dispatched to candidate.' },
      { action: 'Offer Expired', date: '28-Sep-2026 11:59 PM', user: 'System (Cron)', notes: 'Validity expired automatically.' },
    ],
  },
];

export const OffersHiringModule = () => {
  const { setNotifications } = usePortal();

  // Offers State
  const [offers, setOffers] = useState(initialOffers);
  const [searchQuery, setSearchQuery] = useState('');
  const [offerStatusFilter, setOfferStatusFilter] = useState('All');
  const [joiningStatusFilter, setJoiningStatusFilter] = useState('All');

  // Toast State
  const [toastMessage, setToastMessage] = useState('');
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 4000);
  };

  // Modals State
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [responseModalOpen, setResponseModalOpen] = useState(false);
  const [joiningModalOpen, setJoiningModalOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [reviseModalOpen, setReviseModalOpen] = useState(false);
  const [targetOffer, setTargetOffer] = useState(null);

  // Form State: Create / Edit Offer
  const [formData, setFormData] = useState({
    id: '',
    version: 'v1',
    candidateId: 'CAN-REF-1042',
    candidateName: 'Rajesh Kumar',
    jobId: 'JOB-2026-001',
    jobTitle: 'Senior Frontend Engineer (JOB-2026-001)',
    designation: 'Senior Frontend Engineer (React/TypeScript)',
    department: 'Engineering & Technology',
    interviewRef: 'INT-2026-001 (Technical Round)',
    employmentType: 'Full-time',
    salaryCtc: '₹28,50,000 / annum',
    workLocation: 'Chennai Campus (Hybrid)',
    joiningDate: '2026-11-01',
    offerValidUntil: '2026-10-25',
    offerDocument: 'Offer_Letter_Generated.pdf',
    additionalTerms: '6 months probation, hybrid working arrangement (3 days office, 2 days remote).',
    offerStatus: 'Draft',
    allowOverrideException: false,
  });

  // Form State: Revise Offer
  const [reviseData, setReviseData] = useState({
    newSalaryCtc: '',
    newDesignation: '',
    newJoiningDate: '',
    newOfferValidUntil: '',
    revisionNotes: '',
  });

  // Form State: Update Joining
  const [joiningFormData, setJoiningFormData] = useState({
    joiningStatus: 'Joined',
    actualJoiningDate: new Date().toISOString().split('T')[0],
    joiningConfirmation: true,
    notJoinedReason: '',
    updatedBy: 'Abinaya R (Senior HR Manager)',
  });

  // Form State: Candidate Response Simulator
  const [responseActionType, setResponseActionType] = useState('accept');
  const [declineReason, setDeclineReason] = useState('');

  // =========================================================================
  // HANDLERS: CREATE / EDIT OFFER
  // =========================================================================
  const handleOpenCreateModal = (preselectedCandidate = null) => {
    const nextNum = offers.length + 1;
    const generatedId = `OFF-2026-${String(nextNum).padStart(3, '0')}`;

    const cand = preselectedCandidate || hireRecommendedCandidates[0];
    const initialJob = availableJobs.find((j) => j.id === cand.jobId) || availableJobs[0];

    setFormData({
      id: generatedId,
      version: 'v1',
      candidateId: cand.candidateId,
      candidateName: cand.name,
      jobId: cand.jobId,
      jobTitle: cand.jobTitle,
      designation: cand.designation,
      department: cand.department,
      interviewRef: cand.interviewRef,
      employmentType: 'Full-time',
      salaryCtc: cand.recommendedSalary,
      workLocation: cand.defaultLocation || 'Chennai Campus (Hybrid)',
      joiningDate: '2026-11-05',
      offerValidUntil: '2026-10-28',
      offerDocument: `Offer_Letter_${cand.name.replace(/\s+/g, '_')}_${generatedId}.pdf`,
      additionalTerms: '6 months probation, standard IP assignment, 30 days notice buyout eligible.',
      offerStatus: 'Draft',
      allowOverrideException: false,
    });

    setIsEditMode(false);
    setCreateModalOpen(true);
  };

  const handleCandidateSelectChange = (candId) => {
    const cand = hireRecommendedCandidates.find((c) => c.candidateId === candId);
    if (cand) {
      setFormData((prev) => ({
        ...prev,
        candidateId: cand.candidateId,
        candidateName: cand.name,
        jobId: cand.jobId,
        jobTitle: cand.jobTitle,
        designation: cand.designation,
        department: cand.department,
        interviewRef: cand.interviewRef,
        salaryCtc: cand.recommendedSalary,
        workLocation: cand.defaultLocation,
        offerDocument: `Offer_Letter_${cand.name.replace(/\s+/g, '_')}_${prev.id}.pdf`,
      }));
    }
  };

  const handleOpenEditDraft = (item) => {
    if (item.offerStatus !== 'Draft') {
      showToast('Only Draft offers can be directly edited. Use "Revise Offer" for dispatched offers.');
      return;
    }
    setFormData({
      ...item,
      allowOverrideException: false,
    });
    setIsEditMode(true);
    setCreateModalOpen(true);
  };

  const handleSaveOffer = (shouldSend = false) => {
    // Validations:
    if (!formData.candidateId || !formData.designation || !formData.salaryCtc || !formData.joiningDate || !formData.offerValidUntil) {
      showToast('Candidate, Designation, Salary, Joining Date, and Offer Validity are required.');
      return;
    }

    // Check duplicate active offer for same candidate and job (when not editing)
    if (!isEditMode) {
      const activeDuplicate = offers.find(
        (o) =>
          o.candidateId === formData.candidateId &&
          o.jobId === formData.jobId &&
          ['Draft', 'Sent', 'Accepted'].includes(o.offerStatus)
      );
      if (activeDuplicate) {
        showToast(`An active offer (${activeDuplicate.id}) already exists for this candidate. Use Revise Offer instead.`);
        return;
      }
    }

    const candString = `${formData.candidateName} (${formData.candidateId})`;
    const statusToSet = shouldSend ? 'Sent' : formData.offerStatus || 'Draft';
    const sentDateToSet = shouldSend ? new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : (formData.offerSentDate || 'Pending Send');

    const nowStr = new Date().toLocaleString('en-GB');

    if (isEditMode) {
      const updated = offers.map((item) => {
        if (item.id === formData.id) {
          return {
            ...item,
            ...formData,
            candidate: candString,
            offerStatus: statusToSet,
            offerSentDate: sentDateToSet,
            auditHistory: [
              ...item.auditHistory,
              {
                action: shouldSend ? 'Offer Sent to Candidate' : 'Draft Modified',
                date: nowStr,
                user: 'Abinaya R (Senior HR Manager)',
                notes: shouldSend ? 'Dispatched to candidate portal & registered email.' : 'Updated offer compensation/details.',
              },
            ],
          };
        }
        return item;
      });
      setOffers(updated);
      showToast(`Offer "${formData.id}" ${shouldSend ? 'sent to candidate' : 'updated'} successfully!`);
    } else {
      const newRecord = {
        ...formData,
        candidate: candString,
        offerStatus: statusToSet,
        joiningStatus: 'Pending',
        actualJoiningDate: '',
        offerSentDate: sentDateToSet,
        responseDate: '',
        responseNotes: '',
        salaryBreakdown: {
          basic: '50% of CTC',
          hra: '25% of CTC',
          specialAllowance: '15% of CTC',
          performanceBonus: '10% of CTC',
        },
        auditHistory: [
          {
            action: shouldSend ? 'Offer Created & Sent' : 'Draft Offer Created',
            date: nowStr,
            user: 'Abinaya R (Senior HR Manager)',
            notes: `Generated with annual compensation: ${formData.salaryCtc}`,
          },
        ],
      };

      setOffers([newRecord, ...offers]);

      // Push portal notification
      if (setNotifications) {
        setNotifications((prev) => [
          {
            id: `NTF-OFF-${Date.now()}`,
            notificationType: 'Offer',
            title: `Offer ${shouldSend ? 'Sent' : 'Drafted'}: ${formData.designation}`,
            message: `Offer letter ${formData.id} ${shouldSend ? 'dispatched to' : 'drafted for'} ${candString}.`,
            dateTime: new Date().toLocaleString('en-GB'),
            readStatus: 'Unread',
            recipient: formData.candidateName,
          },
          ...prev,
        ]);
      }

      showToast(`Offer "${formData.id}" ${shouldSend ? 'created & sent to' : 'saved as draft for'} ${formData.candidateName}!`);
    }

    setCreateModalOpen(false);
  };

  // =========================================================================
  // HANDLERS: SEND OFFER ACTION
  // =========================================================================
  const handleQuickSendOffer = (item) => {
    const nowSentDate = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const nowStr = new Date().toLocaleString('en-GB');

    const updated = offers.map((o) => {
      if (o.id === item.id) {
        return {
          ...o,
          offerStatus: 'Sent',
          offerSentDate: nowSentDate,
          auditHistory: [
            ...o.auditHistory,
            {
              action: 'Offer Dispatched to Candidate',
              date: nowStr,
              user: 'Abinaya R (Senior HR Manager)',
              notes: 'Official offer letter and compensation packet dispatched via notification channel.',
            },
          ],
        };
      }
      return o;
    });

    setOffers(updated);
    showToast(`Offer "${item.id}" dispatched to candidate ${item.candidateName}! Offer Status = Sent.`);
  };

  // =========================================================================
  // HANDLERS: CANDIDATE RESPONSE SIMULATOR (Accept, Decline, Expire, Withdraw)
  // =========================================================================
  const handleOpenResponseModal = (item) => {
    setTargetOffer(item);
    setResponseActionType('accept');
    setDeclineReason('');
    setResponseModalOpen(true);
  };

  const handleExecuteCandidateResponse = (e) => {
    e.preventDefault();
    if (!targetOffer) return;

    const nowStr = new Date().toLocaleString('en-GB');

    let updatedOfferStatus = 'Sent';
    let updatedJoiningStatus = targetOffer.joiningStatus;
    let actionLabel = '';
    let notesText = '';

    if (responseActionType === 'accept') {
      updatedOfferStatus = 'Accepted';
      updatedJoiningStatus = 'Pending';
      actionLabel = 'Candidate Accepted Offer';
      notesText = 'Candidate signed and accepted offer letter. Joining Status set to Pending.';
    } else if (responseActionType === 'decline') {
      updatedOfferStatus = 'Declined';
      updatedJoiningStatus = 'Not Joined';
      actionLabel = 'Candidate Declined Offer';
      notesText = declineReason || 'Candidate declined offer terms.';
    } else if (responseActionType === 'expire') {
      updatedOfferStatus = 'Expired';
      updatedJoiningStatus = 'Not Joined';
      actionLabel = 'Offer Validity Expired';
      notesText = 'Offer expired without response from candidate within validity window.';
    } else if (responseActionType === 'withdraw') {
      updatedOfferStatus = 'Withdrawn';
      updatedJoiningStatus = 'Not Joined';
      actionLabel = 'Company Withdrew Offer';
      notesText = declineReason || 'Offer withdrawn by company management.';
    }

    const updated = offers.map((o) => {
      if (o.id === targetOffer.id) {
        return {
          ...o,
          offerStatus: updatedOfferStatus,
          joiningStatus: updatedJoiningStatus,
          responseDate: nowStr,
          responseNotes: notesText,
          notJoinedReason: ['decline', 'expire', 'withdraw'].includes(responseActionType) ? notesText : '',
          auditHistory: [
            ...o.auditHistory,
            {
              action: actionLabel,
              date: nowStr,
              user: responseActionType === 'withdraw' ? 'HR Management' : 'Candidate (via Portal)',
              notes: notesText,
            },
          ],
        };
      }
      return o;
    });

    setOffers(updated);
    setResponseModalOpen(false);
    showToast(`Candidate response recorded: Offer Status is now "${updatedOfferStatus}".`);
  };

  // =========================================================================
  // HANDLERS: UPDATE JOINING STATUS
  // =========================================================================
  const handleOpenJoiningModal = (item) => {
    setTargetOffer(item);
    setJoiningFormData({
      joiningStatus: item.joiningStatus || 'Joined',
      actualJoiningDate: item.actualJoiningDate || new Date().toISOString().split('T')[0],
      joiningConfirmation: true,
      notJoinedReason: item.notJoinedReason || '',
      updatedBy: 'Abinaya R (Senior HR Manager)',
    });
    setJoiningModalOpen(true);
  };

  const handleSaveJoiningStatus = (e) => {
    e.preventDefault();
    if (!targetOffer) return;

    if (joiningFormData.joiningStatus === 'Joined' && !joiningFormData.actualJoiningDate) {
      showToast('Actual joining date is required when candidate has joined.');
      return;
    }

    if (joiningFormData.joiningStatus === 'Not Joined' && !joiningFormData.notJoinedReason.trim()) {
      showToast('Please specify the reason why candidate did not join.');
      return;
    }

    const nowStr = new Date().toLocaleString('en-GB');

    const updated = offers.map((o) => {
      if (o.id === targetOffer.id) {
        return {
          ...o,
          joiningStatus: joiningFormData.joiningStatus,
          actualJoiningDate: joiningFormData.joiningStatus === 'Joined' ? joiningFormData.actualJoiningDate : '',
          joiningConfirmedBy: joiningFormData.joiningStatus === 'Joined' ? joiningFormData.updatedBy : '',
          joiningConfirmedDate: joiningFormData.joiningStatus === 'Joined' ? nowStr : '',
          notJoinedReason: joiningFormData.joiningStatus === 'Not Joined' ? joiningFormData.notJoinedReason : '',
          auditHistory: [
            ...o.auditHistory,
            {
              action: `Joining Status: ${joiningFormData.joiningStatus}`,
              date: nowStr,
              user: joiningFormData.updatedBy,
              notes:
                joiningFormData.joiningStatus === 'Joined'
                  ? `Candidate verified and onboarded on ${joiningFormData.actualJoiningDate}. Recruitment outcome: HIRED.`
                  : `Candidate did not join. Reason: ${joiningFormData.notJoinedReason}`,
            },
          ],
        };
      }
      return o;
    });

    setOffers(updated);
    setJoiningModalOpen(false);

    if (joiningFormData.joiningStatus === 'Joined') {
      showToast(`🎉 Onboarding Confirmed! ${targetOffer.candidateName} is now marked as JOINED / HIRED!`);
    } else {
      showToast(`Joining status updated to "${joiningFormData.joiningStatus}" for ${targetOffer.candidateName}.`);
    }
  };

  // =========================================================================
  // HANDLERS: REVISE OFFER (Creates Version 2 while preserving history)
  // =========================================================================
  const handleOpenReviseModal = (item) => {
    setTargetOffer(item);
    const currVerNum = parseInt(item.version?.replace('v', '') || '1', 10);
    const nextVer = `v${currVerNum + 1}`;

    setReviseData({
      newSalaryCtc: item.salaryCtc,
      newDesignation: item.designation,
      newJoiningDate: item.joiningDate,
      newOfferValidUntil: '2026-10-31',
      revisionNotes: 'Revised compensation and allowances based on negotiation.',
    });
    setReviseModalOpen(true);
  };

  const handleExecuteReviseOffer = (e) => {
    e.preventDefault();
    if (!targetOffer) return;

    const currVerNum = parseInt(targetOffer.version?.replace('v', '') || '1', 10);
    const nextVer = `v${currVerNum + 1}`;
    const nowStr = new Date().toLocaleString('en-GB');

    const updated = offers.map((o) => {
      if (o.id === targetOffer.id) {
        return {
          ...o,
          version: nextVer,
          salaryCtc: reviseData.newSalaryCtc,
          designation: reviseData.newDesignation,
          joiningDate: reviseData.newJoiningDate,
          offerValidUntil: reviseData.newOfferValidUntil,
          offerStatus: 'Sent',
          offerSentDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
          auditHistory: [
            ...o.auditHistory,
            {
              action: `Offer Revised to ${nextVer}`,
              date: nowStr,
              user: 'Abinaya R (Senior HR Manager)',
              notes: `New CTC: ${reviseData.newSalaryCtc}. Notes: ${reviseData.revisionNotes}`,
            },
          ],
        };
      }
      return o;
    });

    setOffers(updated);
    setReviseModalOpen(false);
    showToast(`Revised offer (${nextVer}) generated for ${targetOffer.candidateName}! Previous version history preserved.`);
  };

  // Preview & Details Modals
  const handleOpenPreview = (item) => {
    setTargetOffer(item);
    setPreviewModalOpen(true);
  };

  const handleOpenDetails = (item) => {
    setTargetOffer(item);
    setDetailsModalOpen(true);
  };

  // Filtered Offers
  const filteredOffers = offers.filter((item) => {
    const term = searchQuery.toLowerCase();
    const matchesSearch =
      item.id.toLowerCase().includes(term) ||
      item.candidate.toLowerCase().includes(term) ||
      item.jobTitle.toLowerCase().includes(term) ||
      item.designation.toLowerCase().includes(term) ||
      item.salaryCtc.toLowerCase().includes(term);

    const matchesOfferStatus =
      offerStatusFilter === 'All' ? true : item.offerStatus === offerStatusFilter;
    const matchesJoiningStatus =
      joiningStatusFilter === 'All' ? true : item.joiningStatus === joiningStatusFilter;

    return matchesSearch && matchesOfferStatus && matchesJoiningStatus;
  });

  // Badge Helpers
  const getOfferStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'accepted':
        return 'status-accepted';
      case 'sent':
        return 'status-sent';
      case 'draft':
        return 'status-draft';
      case 'declined':
        return 'status-declined';
      case 'expired':
        return 'status-expired';
      case 'withdrawn':
        return 'status-withdrawn';
      default:
        return 'status-neutral';
    }
  };

  const getJoiningStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'joined':
        return 'joining-joined';
      case 'pending':
        return 'joining-pending';
      case 'not joined':
        return 'joining-notjoined';
      default:
        return 'joining-neutral';
    }
  };

  const isAnySubPageOpen =
    createModalOpen ||
    (previewModalOpen && targetOffer) ||
    (responseModalOpen && targetOffer) ||
    (joiningModalOpen && targetOffer) ||
    (reviseModalOpen && targetOffer) ||
    (detailsModalOpen && targetOffer);

  return (
    <div className="offers-page-container animate-fade-in">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="offers-toast-alert">
          <CheckCircle2 size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {!isAnySubPageOpen && (
        <>
          {/* =========================================================================
              MODULE HEADER: Title, Subtitle, and Top-Right Create Offer Button
              ========================================================================= */}
          <div className="offers-page-header">
            <div className="offers-header-left">
              <div>
                <h1 className="offers-page-title">Offers & Hiring</h1>
              </div>
        </div>

        {/* Top-Right: Create Offer Button */}
        <div className="offers-header-actions">
          <button
            type="button"
            id="btn-top-create-offer"
            className="btn-create-offer-top"
            onClick={() => handleOpenCreateModal()}
          >
            <Plus size={16} />
            <span>Create Offer</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          TOP KPI METRIC CARDS
          ========================================================================= */}
      <div className="offers-kpi-quad-grid">
        <div className="offers-kpi-card">
          <div className="kpi-icon-wrap blue">
            <FileText size={18} />
          </div>
          <div className="kpi-info">
            <span className="kpi-num">{offers.length}</span>
            <span className="kpi-title">Total Offers Generated</span>
          </div>
        </div>

        <div className="offers-kpi-card">
          <div className="kpi-icon-wrap purple">
            <Send size={18} />
          </div>
          <div className="kpi-info">
            <span className="kpi-num">{offers.filter((o) => o.offerStatus === 'Sent').length}</span>
            <span className="kpi-title">Active Dispatched Offers</span>
          </div>
        </div>

        <div className="offers-kpi-card">
          <div className="kpi-icon-wrap amber">
            <Clock size={18} />
          </div>
          <div className="kpi-info">
            <span className="kpi-num">
              {offers.filter((o) => o.offerStatus === 'Accepted' && o.joiningStatus === 'Pending').length}
            </span>
            <span className="kpi-title">Accepted • Pending Joining</span>
          </div>
        </div>

        <div className="offers-kpi-card">
          <div className="kpi-icon-wrap green">
            <CheckCircle2 size={18} />
          </div>
          <div className="kpi-info">
            <span className="kpi-num">
              {offers.filter((o) => o.joiningStatus === 'Joined').length}
            </span>
            <span className="kpi-title">Confirmed Joined (Hired)</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          RECRUITMENT PIPELINE BANNER: INTERVIEWS -> OFFERS & HIRING CONNECTION
          ========================================================================= */}
      <div className="hire-connection-banner">
        <div className="connection-header-row">
          <div className="connection-title-wrap">
            <ShieldCheck size={18} className="shield-icon" />
            <div>
              <span className="banner-title">
                Candidates Recommended for Hire (Ready for Offer Letter)
              </span>

            </div>
          </div>

          <div className="pipeline-flow-tag">
            <span>Interview Hire</span>
            <ArrowRight size={12} />
            <span>Create Offer</span>
            <ArrowRight size={12} />
            <span>Offer Accepted</span>
            <ArrowRight size={12} />
            <strong style={{ color: '#059669' }}>Joined / Hired</strong>
          </div>
        </div>

        <div className="hire-candidates-pills-row">
          {hireRecommendedCandidates.map((cand) => (
            <div key={cand.candidateId} className="hire-candidate-pill-card">
              <div className="pill-cand-info">
                <span className="cand-name">{cand.name}</span>
                <span className="cand-job-sub">{cand.designation}</span>
                <span className="cand-rec-tag">
                  ⭐ {cand.interviewRating} • Rec: {cand.recommendation}
                </span>
              </div>
              <button
                type="button"
                className="btn-quick-create-offer"
                onClick={() => handleOpenCreateModal(cand)}
                title={`Generate Offer for ${cand.name}`}
              >
                <Plus size={13} />
                <span>Create Offer</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* =========================================================================
          CENTER TOOLBAR & SEARCH / FILTERS
          ========================================================================= */}
      <div className="offers-toolbar-card">
        <div className="toolbar-left-group">
          <div className="offers-search-box">
            <Search size={15} className="search-icon" />
            <input
              type="text"
              placeholder="Search Offer ID, candidate, job, designation, or salary..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="offers-search-input"
            />
          </div>

          <select
            value={offerStatusFilter}
            onChange={(e) => setOfferStatusFilter(e.target.value)}
            className="offers-filter-select"
          >
            <option value="All">All Offer Statuses</option>
            <option value="Draft">Draft</option>
            <option value="Sent">Sent</option>
            <option value="Accepted">Accepted</option>
            <option value="Declined">Declined</option>
            <option value="Expired">Expired</option>
            <option value="Withdrawn">Withdrawn</option>
          </select>

          <select
            value={joiningStatusFilter}
            onChange={(e) => setJoiningStatusFilter(e.target.value)}
            className="offers-filter-select"
          >
            <option value="All">All Joining Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Joined">Joined (Hired)</option>
            <option value="Not Joined">Not Joined</option>
          </select>
        </div>

        <div className="toolbar-right-group">
          <span className="offers-counter-text">
            Showing <strong>{filteredOffers.length}</strong> of {offers.length} Offer Records
          </span>
        </div>
      </div>

      {/* =========================================================================
          OFFERS MAIN TABLE (EXACT 10 COLUMNS REQUESTED + S.NO)
          ========================================================================= */}
      <div className="offers-table-card">
        <div className="table-responsive-wrapper">
          <table className="offers-data-table">
            <thead>
              <tr>
                <th style={{ width: '45px', textAlign: 'center' }}>S.No</th>
                <th>Offer ID</th>
                <th>Candidate</th>
                <th>Job Title</th>
                <th>Designation</th>
                <th>Salary / CTC</th>
                <th>Joining Date</th>
                <th>Offer Sent Date</th>
                <th style={{ textAlign: 'center' }}>Offer Status</th>
                <th style={{ textAlign: 'center' }}>Joining Status</th>
                <th style={{ textAlign: 'center', minWidth: '175px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOffers.length === 0 ? (
                <tr>
                  <td colSpan="11" className="table-empty-cell">
                    No offer records found matching your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredOffers.map((item, idx) => (
                  <tr key={item.id}>
                    {/* 1. S.No */}
                    <td style={{ textAlign: 'center', fontWeight: 600 }}>{idx + 1}</td>

                    {/* 2. Offer ID with Version Badge */}
                    <td>
                      <div className="offer-id-cell">
                        <span className="offer-id-code">{item.id}</span>
                        {item.version && <span className="version-tag">{item.version}</span>}
                      </div>
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

                    {/* 5. Designation */}
                    <td>
                      <span className="designation-text">{item.designation}</span>
                    </td>

                    {/* 6. Salary / CTC */}
                    <td>
                      <span className="salary-ctc-badge">{item.salaryCtc}</span>
                    </td>

                    {/* 7. Joining Date */}
                    <td>
                      <div className="date-cell">
                        <span className="date-main">{item.joiningDate}</span>
                        {item.actualJoiningDate && (
                          <span className="actual-date-sub">Joined: {item.actualJoiningDate}</span>
                        )}
                      </div>
                    </td>

                    {/* 8. Offer Sent Date */}
                    <td>
                      <span className="sent-date-text">{item.offerSentDate}</span>
                    </td>

                    {/* 9. Offer Status */}
                    <td style={{ textAlign: 'center' }}>
                      <span className={`status-badge-chip ${getOfferStatusBadge(item.offerStatus)}`}>
                        {item.offerStatus}
                      </span>
                    </td>

                    {/* 10. Joining Status */}
                    <td style={{ textAlign: 'center' }}>
                      <span className={`joining-badge-chip ${getJoiningStatusBadge(item.joiningStatus)}`}>
                        {item.joiningStatus}
                      </span>
                    </td>

                    {/* 11. Actions: View / Edit / Send Offer / Update Joining */}
                    <td style={{ textAlign: 'center', minWidth: '175px' }}>
                      <div className="offer-actions-flex">
                        {/* View Offer Details */}
                        <button
                          type="button"
                          className="btn-action-icon view"
                          onClick={() => handleOpenDetails(item)}
                          title="View Offer Details & Audit History"
                        >
                          <Eye size={13} />
                        </button>

                        {/* Preview Offer Letter */}
                        <button
                          type="button"
                          className="btn-action-icon preview"
                          onClick={() => handleOpenPreview(item)}
                          title="Preview Official Offer Letter"
                        >
                          <FileText size={13} />
                        </button>

                        {/* Edit (Available for Drafts) */}
                        {item.offerStatus === 'Draft' && (
                          <button
                            type="button"
                            className="btn-action-icon edit"
                            onClick={() => handleOpenEditDraft(item)}
                            title="Edit Draft Offer"
                          >
                            <Edit2 size={13} />
                          </button>
                        )}

                        {/* Send Offer (For Drafts) */}
                        {item.offerStatus === 'Draft' && (
                          <button
                            type="button"
                            className="btn-action-icon send"
                            onClick={() => handleQuickSendOffer(item)}
                            title="Send Offer to Candidate"
                          >
                            <Send size={13} />
                          </button>
                        )}

                        {/* Candidate Response Simulator (For Sent offers to test Accept/Decline/Expire/Withdraw) */}
                        {item.offerStatus === 'Sent' && (
                          <button
                            type="button"
                            className="btn-action-icon response"
                            onClick={() => handleOpenResponseModal(item)}
                            title="Record or Simulate Candidate Response"
                          >
                            <UserCheck size={13} />
                          </button>
                        )}

                        {/* Revise Offer (Available for Dispatched or Sent offers to bump to v2) */}
                        {['Sent', 'Accepted'].includes(item.offerStatus) && (
                          <button
                            type="button"
                            className="btn-action-icon revise"
                            onClick={() => handleOpenReviseModal(item)}
                            title="Create Revised Offer Version (e.g. v2)"
                          >
                            <RefreshCw size={13} />
                          </button>
                        )}

                        {/* Update Joining (When Offer is Accepted) */}
                        {item.offerStatus === 'Accepted' && (
                          <button
                            type="button"
                            className={`btn-action-icon ${item.joiningStatus === 'Joined' ? 'joined' : 'joining'}`}
                            onClick={() => handleOpenJoiningModal(item)}
                            title={item.joiningStatus === 'Joined' ? 'Confirmed Joined (Hired)' : 'Update Candidate Joining Status'}
                          >
                            <CheckCircle size={13} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="table-footer-bar">
          <span className="table-count-info">
            Total <strong>{filteredOffers.length}</strong> recruitment offer records
          </span>
          
        </div>
      </div>
        </>
      )}

      {/* =========================================================================
          PAGE VIEW 1: CREATE / EDIT OFFER SUBPAGE VIEW
          ========================================================================= */}
      {createModalOpen && (
        <div className="offers-subpage-view animate-fade-in">
          <div className="offers-subpage-nav">
            <button
              type="button"
              className="btn-back-link"
              onClick={() => setCreateModalOpen(false)}
            >
              <ArrowLeft size={16} />
              <span>Back to Offers & Hiring</span>
            </button>
          </div>

          <div className="offers-subpage-header-card">
            <div className="modal-title-wrap">
              <div className="modal-icon-ring blue">
                <Award size={20} />
              </div>
              <div>
                <h2 className="offers-modal-title">
                  {isEditMode ? `Edit Draft Offer: ${formData.id}` : 'Create Candidate Job Offer'}
                </h2>
                <p className="offers-modal-subtitle">
                  Configure compensation, designations, terms, and generate official employment letter
                </p>
              </div>
            </div>
          </div>

          <div className="offers-subpage-body-card">
            <div className="offers-modal-body">
              {/* Candidate Selection (Hire Recommended Only) */}
              <div className="modal-grid-two-cols">
                <div className="modal-form-section">
                  <label className="modal-section-label">
                    Select Candidate (Hire Recommended) <span className="req-star">*</span>
                  </label>
                  <select
                    value={formData.candidateId}
                    onChange={(e) => handleCandidateSelectChange(e.target.value)}
                    className="modal-select-input"
                    disabled={isEditMode}
                    required
                  >
                    {hireRecommendedCandidates.map((c) => (
                      <option key={c.candidateId} value={c.candidateId}>
                        {c.name} ({c.candidateId}) • {c.jobTitle}
                      </option>
                    ))}
                  </select>
                  <span className="modal-sub-hint">
                    * Final interview recommendation "Hire" is required for standard offer generation.
                  </span>
                </div>

                <div className="modal-form-section">
                  <label className="modal-section-label">Related Job Requisition</label>
                  <input
                    type="text"
                    value={formData.jobTitle}
                    className="modal-text-input readonly"
                    readOnly
                  />
                </div>
              </div>

              {/* Interview Ref & Department */}
              <div className="modal-grid-two-cols">
                <div className="modal-form-section">
                  <label className="modal-section-label">Final Interview Reference</label>
                  <input
                    type="text"
                    value={formData.interviewRef}
                    className="modal-text-input readonly"
                    readOnly
                  />
                </div>

                <div className="modal-form-section">
                  <label className="modal-section-label">Department</label>
                  <input
                    type="text"
                    value={formData.department}
                    className="modal-text-input readonly"
                    readOnly
                  />
                </div>
              </div>

              {/* Designation & Employment Type */}
              <div className="modal-grid-two-cols">
                <div className="modal-form-section">
                  <label className="modal-section-label">
                    Offered Designation / Position <span className="req-star">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    placeholder="e.g. Senior Frontend Engineer"
                    className="modal-text-input"
                    required
                  />
                </div>

                <div className="modal-form-section">
                  <label className="modal-section-label">Employment Type <span className="req-star">*</span></label>
                  <select
                    value={formData.employmentType}
                    onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
                    className="modal-select-input"
                  >
                    <option value="Full-time">Full-time Regular</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract / Consultant</option>
                  </select>
                </div>
              </div>

              {/* Salary / CTC & Work Location */}
              <div className="modal-grid-two-cols">
                <div className="modal-form-section">
                  <label className="modal-section-label">
                    Annual Salary / CTC <span className="req-star">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.salaryCtc}
                    onChange={(e) => setFormData({ ...formData, salaryCtc: e.target.value })}
                    placeholder="e.g. ₹28,50,000 / annum"
                    className="modal-text-input"
                    required
                  />
                </div>

                <div className="modal-form-section">
                  <label className="modal-section-label">Work Location <span className="req-star">*</span></label>
                  <select
                    value={formData.workLocation}
                    onChange={(e) => setFormData({ ...formData, workLocation: e.target.value })}
                    className="modal-select-input"
                  >
                    <option value="Chennai Campus (Hybrid)">Chennai Campus (Hybrid)</option>
                    <option value="Chennai Campus (Office)">Chennai Campus (Office)</option>
                    <option value="Bengaluru HQ (Office)">Bengaluru HQ (Office)</option>
                    <option value="Bengaluru HQ (Hybrid)">Bengaluru HQ (Hybrid)</option>
                    <option value="Mumbai Corporate Office">Mumbai Corporate Office</option>
                    <option value="Remote (India)">Remote (India)</option>
                  </select>
                </div>
              </div>

              {/* Joining Date & Offer Valid Until */}
              <div className="modal-grid-two-cols">
                <div className="modal-form-section">
                  <label className="modal-section-label">
                    Expected Joining Date <span className="req-star">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.joiningDate}
                    onChange={(e) => setFormData({ ...formData, joiningDate: e.target.value })}
                    className="modal-text-input"
                    required
                  />
                </div>

                <div className="modal-form-section">
                  <label className="modal-section-label">
                    Offer Valid Until (Acceptance Deadline) <span className="req-star">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.offerValidUntil}
                    onChange={(e) => setFormData({ ...formData, offerValidUntil: e.target.value })}
                    className="modal-text-input"
                    required
                  />
                </div>
              </div>

              {/* Additional Terms */}
              <div className="modal-form-section">
                <label className="modal-section-label">Additional Terms & Conditions</label>
                <textarea
                  value={formData.additionalTerms}
                  onChange={(e) => setFormData({ ...formData, additionalTerms: e.target.value })}
                  rows="2"
                  className="modal-textarea-input"
                  placeholder="e.g. 6 months probation period, family medical insurance, equipment policy..."
                />
              </div>

              {/* Authorized Override Checkbox (if needed) */}
              <div className="override-checkbox-row">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.allowOverrideException}
                    onChange={(e) =>
                      setFormData({ ...formData, allowOverrideException: e.target.checked })
                    }
                  />
                  <span>
                    Authorized HR Override (Allow exception if candidate has pending round clearances)
                  </span>
                </label>
              </div>
            </div>

            <div className="offers-subpage-footer-card">
              <button
                type="button"
                className="btn-modal-cancel"
                onClick={() => setCreateModalOpen(false)}
              >
                Cancel
              </button>

              <button
                type="button"
                id="btn-modal-preview-letter"
                className="btn-modal-secondary"
                onClick={() => {
                  setTargetOffer(formData);
                  setPreviewModalOpen(true);
                }}
              >
                <Eye size={15} />
                <span>Preview Letter</span>
              </button>

              <button
                type="button"
                id="btn-modal-save-draft"
                className="btn-modal-draft"
                onClick={() => handleSaveOffer(false)}
              >
                <Save size={15} />
                <span>Save Draft</span>
              </button>

              <button
                type="button"
                id="btn-modal-send-now"
                className="btn-modal-submit"
                onClick={() => handleSaveOffer(true)}
              >
                <Send size={15} />
                <span>Send Offer Now</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          PAGE VIEW 2: OFFICIAL OFFER LETTER PREVIEW SUBPAGE VIEW
          ========================================================================= */}
      {previewModalOpen && targetOffer && (
        <div className="offers-subpage-view animate-fade-in">
          <div className="offers-subpage-nav">
            <button
              type="button"
              className="btn-back-link"
              onClick={() => setPreviewModalOpen(false)}
            >
              <ArrowLeft size={16} />
              <span>Back to Offers & Hiring</span>
            </button>
          </div>

          <div className="offers-subpage-header-card">
            <div className="modal-title-wrap">
              <div className="modal-icon-ring green">
                <FileText size={20} />
              </div>
              <div>
                <h2 className="offers-modal-title">Formal Offer Letter Preview</h2>
                <p className="offers-modal-subtitle">
                  {targetOffer.candidateName} • {targetOffer.designation} ({targetOffer.id})
                </p>
              </div>
            </div>
          </div>

          <div className="offers-subpage-body-card">
            <div className="offers-modal-body offer-letter-sheet">
              {/* Company Letterhead */}
              <div className="letterhead-header">
                <div>
                  <h2 className="letterhead-company">ACME TECHNOLOGIES ENTERPRISE HRMS</h2>
                  <p className="letterhead-address">
                    Tech Park IV, OMR IT Corridor, Chennai, Tamil Nadu - 600096
                  </p>
                  <p className="letterhead-contact">Email: careers@acmetech.com | Web: https://acmetech.internal</p>
                </div>
                <div className="letterhead-ref">
                  <span><strong>Ref:</strong> {targetOffer.id} ({targetOffer.version || 'v1'})</span>
                  <span><strong>Date:</strong> {new Date().toLocaleDateString('en-GB')}</span>
                </div>
              </div>

              <hr className="letter-divider" />

              {/* Candidate Address */}
              <div className="letter-candidate-meta">
                <p><strong>To:</strong></p>
                <p className="cand-letter-name">{targetOffer.candidateName}</p>
                <p className="cand-letter-id">Candidate ID: {targetOffer.candidateId}</p>
                <p>Tamil Nadu, India</p>
              </div>

              {/* Salutation & Offer Statement */}
              <div className="letter-body-content">
                <p>Dear <strong>{targetOffer.candidateName}</strong>,</p>
                <p>
                  Following your evaluation and interviews for <strong>{targetOffer.jobTitle}</strong>, we are thrilled to formally offer you the position of <strong>{targetOffer.designation}</strong> with Acme Technologies Enterprise.
                </p>
                <p>
                  Your expertise, problem-solving skills, and culture alignment make you an ideal addition to our <strong>{targetOffer.department}</strong> team.
                </p>

                {/* Key Employment Terms Table */}
                <h4 className="letter-sec-title">Summary of Terms & Compensation:</h4>
                <table className="letter-terms-table">
                  <tbody>
                    <tr>
                      <td className="term-lbl">Designation:</td>
                      <td className="term-val"><strong>{targetOffer.designation}</strong></td>
                    </tr>
                    <tr>
                      <td className="term-lbl">Department:</td>
                      <td className="term-val">{targetOffer.department}</td>
                    </tr>
                    <tr>
                      <td className="term-lbl">Employment Type:</td>
                      <td className="term-val">{targetOffer.employmentType}</td>
                    </tr>
                    <tr>
                      <td className="term-lbl">Annual CTC / Compensation:</td>
                      <td className="term-val highlight-ctc"><strong>{targetOffer.salaryCtc}</strong></td>
                    </tr>
                    <tr>
                      <td className="term-lbl">Work Location:</td>
                      <td className="term-val">{targetOffer.workLocation}</td>
                    </tr>
                    <tr>
                      <td className="term-lbl">Expected Date of Joining:</td>
                      <td className="term-val"><strong>{targetOffer.joiningDate}</strong></td>
                    </tr>
                    <tr>
                      <td className="term-lbl">Offer Acceptance Deadline:</td>
                      <td className="term-val" style={{ color: '#dc2626' }}><strong>{targetOffer.offerValidUntil}</strong></td>
                    </tr>
                    <tr>
                      <td className="term-lbl">Terms & Policies:</td>
                      <td className="term-val">{targetOffer.additionalTerms}</td>
                    </tr>
                  </tbody>
                </table>

                <p className="letter-instructions">
                  Please signify your formal acceptance of this offer by signing below and returning a duplicate copy or confirming via the Candidate Mobile Portal on or before <strong>{targetOffer.offerValidUntil}</strong>.
                </p>
              </div>

              {/* Signatures */}
              <div className="letter-signatures-row">
                <div className="sig-block">
                  <div className="sig-line"></div>
                  <p className="sig-name">Abinaya R</p>
                  <p className="sig-title">Senior Talent Acquisition Manager</p>
                  <p className="sig-company">Acme Technologies Enterprise</p>
                </div>

                <div className="sig-block right">
                  <div className="sig-line"></div>
                  <p className="sig-name">{targetOffer.candidateName}</p>
                  <p className="sig-title">Candidate Signature & Acceptance</p>
                  <p className="sig-company">Date: ________________________</p>
                </div>
              </div>
            </div>

            <div className="offers-subpage-footer-card">
              <button
                type="button"
                className="btn-modal-cancel"
                onClick={() => setPreviewModalOpen(false)}
              >
                Back to Offers & Hiring
              </button>

              <button
                type="button"
                className="btn-modal-secondary"
                onClick={() => {
                  window.print();
                }}
              >
                <Printer size={15} />
                <span>Print / Save PDF</span>
              </button>

              {targetOffer.offerStatus === 'Draft' && (
                <button
                  type="button"
                  className="btn-modal-submit"
                  onClick={() => {
                    setPreviewModalOpen(false);
                    handleQuickSendOffer(targetOffer);
                  }}
                >
                  <Send size={15} />
                  <span>Send Offer to Candidate</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          PAGE VIEW 3: CANDIDATE RESPONSE SIMULATOR SUBPAGE VIEW
          ========================================================================= */}
      {responseModalOpen && targetOffer && (
        <div className="offers-subpage-view animate-fade-in">
          <div className="offers-subpage-nav">
            <button
              type="button"
              className="btn-back-link"
              onClick={() => setResponseModalOpen(false)}
            >
              <ArrowLeft size={16} />
              <span>Back to Offers & Hiring</span>
            </button>
          </div>

          <div className="offers-subpage-header-card">
            <div className="modal-title-wrap">
              <div className="modal-icon-ring purple">
                <UserCheck size={20} />
              </div>
              <div>
                <h2 className="offers-modal-title">Record Candidate Offer Response</h2>
                <p className="offers-modal-subtitle">
                  {targetOffer.candidateName} • Offer ID: {targetOffer.id}
                </p>
              </div>
            </div>
          </div>

          <div className="offers-subpage-body-card">
            <form onSubmit={handleExecuteCandidateResponse}>
              <div className="offers-modal-body">
                <div className="modal-form-section">
                  <label className="modal-section-label">Candidate Action / Status Update</label>
                  <div className="response-action-options">
                    <label
                      className={`response-radio-card accept ${responseActionType === 'accept' ? 'active' : ''
                        }`}
                    >
                      <input
                        type="radio"
                        name="resType"
                        value="accept"
                        checked={responseActionType === 'accept'}
                        onChange={() => setResponseActionType('accept')}
                      />
                      <div>
                        <strong>Candidate Accepts Offer</strong>
                        <span>Offer Status = Accepted • Joining Status = Pending</span>
                      </div>
                    </label>

                    <label
                      className={`response-radio-card decline ${responseActionType === 'decline' ? 'active' : ''
                        }`}
                    >
                      <input
                        type="radio"
                        name="resType"
                        value="decline"
                        checked={responseActionType === 'decline'}
                        onChange={() => setResponseActionType('decline')}
                      />
                      <div>
                        <strong>Candidate Declines Offer</strong>
                        <span>Offer Status = Declined • Capture reason</span>
                      </div>
                    </label>

                    <label
                      className={`response-radio-card expire ${responseActionType === 'expire' ? 'active' : ''
                        }`}
                    >
                      <input
                        type="radio"
                        name="resType"
                        value="expire"
                        checked={responseActionType === 'expire'}
                        onChange={() => setResponseActionType('expire')}
                      />
                      <div>
                        <strong>Validity Date Expires</strong>
                        <span>Offer Status = Expired (Past deadline)</span>
                      </div>
                    </label>

                    <label
                      className={`response-radio-card withdraw ${responseActionType === 'withdraw' ? 'active' : ''
                        }`}
                    >
                      <input
                        type="radio"
                        name="resType"
                        value="withdraw"
                        checked={responseActionType === 'withdraw'}
                        onChange={() => setResponseActionType('withdraw')}
                      />
                      <div>
                        <strong>Company Withdraws Offer</strong>
                        <span>Offer Status = Withdrawn • Capture reason</span>
                      </div>
                    </label>
                  </div>
                </div>

                {['decline', 'withdraw'].includes(responseActionType) && (
                  <div className="modal-form-section">
                    <label className="modal-section-label">
                      Reason for {responseActionType === 'decline' ? 'Decline' : 'Withdrawal'}{' '}
                      <span className="req-star">*</span>
                    </label>
                    <textarea
                      value={declineReason}
                      onChange={(e) => setDeclineReason(e.target.value)}
                      rows="2"
                      className="modal-textarea-input"
                      placeholder="e.g. Candidate accepted competing counter-offer / Position requisition frozen..."
                      required
                    />
                  </div>
                )}
              </div>

              <div className="offers-subpage-footer-card">
                <button
                  type="button"
                  className="btn-modal-cancel"
                  onClick={() => setResponseModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-modal-submit">
                  <CheckCircle size={15} />
                  <span>Confirm Status Update</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          PAGE VIEW 4: JOINING TRACKING & CONFIRMATION SUBPAGE VIEW
          ========================================================================= */}
      {joiningModalOpen && targetOffer && (
        <div className="offers-subpage-view animate-fade-in">
          <div className="offers-subpage-nav">
            <button
              type="button"
              className="btn-back-link"
              onClick={() => setJoiningModalOpen(false)}
            >
              <ArrowLeft size={16} />
              <span>Back to Offers & Hiring</span>
            </button>
          </div>

          <div className="offers-subpage-header-card">
            <div className="modal-title-wrap">
              <div className="modal-icon-ring green">
                <UserCheck size={20} />
              </div>
              <div>
                <h2 className="offers-modal-title">Track & Confirm Candidate Joining</h2>
                <p className="offers-modal-subtitle">
                  {targetOffer.candidateName} • Expected Joining: {targetOffer.joiningDate}
                </p>
              </div>
            </div>
          </div>

          <div className="offers-subpage-body-card">
            <form onSubmit={handleSaveJoiningStatus}>
              <div className="offers-modal-body">
                {/* Notice banner */}
                <div className="joining-flow-info-box">
                  <strong>Joining tracking logic:</strong> Offer accepted aana udane candidate Hired nu mark aagadhu. Joining physically/digitally confirm aana mattum Joining Status = <strong>Joined</strong> and outcome = <strong>Hired</strong>.
                </div>

                {/* Joining Status Selector */}
                <div className="modal-form-section">
                  <label className="modal-section-label">Joining Status <span className="req-star">*</span></label>
                  <div className="joining-radio-row">
                    <label
                      className={`joining-opt-btn ${joiningFormData.joiningStatus === 'Joined' ? 'active joined' : ''
                        }`}
                    >
                      <input
                        type="radio"
                        name="jStatus"
                        value="Joined"
                        checked={joiningFormData.joiningStatus === 'Joined'}
                        onChange={() =>
                          setJoiningFormData({ ...joiningFormData, joiningStatus: 'Joined' })
                        }
                      />
                      <span>Joined (Confirm Hired)</span>
                    </label>

                    <label
                      className={`joining-opt-btn ${joiningFormData.joiningStatus === 'Pending' ? 'active pending' : ''
                        }`}
                    >
                      <input
                        type="radio"
                        name="jStatus"
                        value="Pending"
                        checked={joiningFormData.joiningStatus === 'Pending'}
                        onChange={() =>
                          setJoiningFormData({ ...joiningFormData, joiningStatus: 'Pending' })
                        }
                      />
                      <span>Pending (Awaiting Date)</span>
                    </label>

                    <label
                      className={`joining-opt-btn ${joiningFormData.joiningStatus === 'Not Joined' ? 'active notjoined' : ''
                        }`}
                    >
                      <input
                        type="radio"
                        name="jStatus"
                        value="Not Joined"
                        checked={joiningFormData.joiningStatus === 'Not Joined'}
                        onChange={() =>
                          setJoiningFormData({ ...joiningFormData, joiningStatus: 'Not Joined' })
                        }
                      />
                      <span>Not Joined (No Show)</span>
                    </label>
                  </div>
                </div>

                {/* When Joined */}
                {joiningFormData.joiningStatus === 'Joined' && (
                  <>
                    <div className="modal-form-section">
                      <label className="modal-section-label">
                        Actual Joining Date <span className="req-star">*</span>
                      </label>
                      <input
                        type="date"
                        value={joiningFormData.actualJoiningDate}
                        onChange={(e) =>
                          setJoiningFormData({ ...joiningFormData, actualJoiningDate: e.target.value })
                        }
                        className="modal-text-input"
                        required
                      />
                    </div>

                    <div className="confirmation-checkbox-wrap">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={joiningFormData.joiningConfirmation}
                          onChange={(e) =>
                            setJoiningFormData({
                              ...joiningFormData,
                              joiningConfirmation: e.target.checked,
                            })
                          }
                          required
                        />
                        <span>
                          Authorized HR Confirmation: I verify candidate has physically/remotely reported, completed document verification, and is active in company payroll.
                        </span>
                      </label>
                    </div>
                  </>
                )}

                {/* When Not Joined */}
                {joiningFormData.joiningStatus === 'Not Joined' && (
                  <div className="modal-form-section">
                    <label className="modal-section-label">
                      Not Joined Reason <span className="req-star">*</span>
                    </label>
                    <textarea
                      value={joiningFormData.notJoinedReason}
                      onChange={(e) =>
                        setJoiningFormData({ ...joiningFormData, notJoinedReason: e.target.value })
                      }
                      rows="2"
                      className="modal-textarea-input"
                      placeholder="e.g. Candidate withdrew due to relocation constraints / Competing counter-offer..."
                      required
                    />
                  </div>
                )}

                <div className="modal-form-section">
                  <label className="modal-section-label">Updated By</label>
                  <input
                    type="text"
                    value={joiningFormData.updatedBy}
                    className="modal-text-input readonly"
                    readOnly
                  />
                </div>
              </div>

              <div className="offers-subpage-footer-card">
                <button
                  type="button"
                  className="btn-modal-cancel"
                  onClick={() => setJoiningModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-modal-submit">
                  <CheckCircle size={15} />
                  <span>Save Joining Record</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          PAGE VIEW 5: REVISE OFFER SUBPAGE VIEW
          ========================================================================= */}
      {reviseModalOpen && targetOffer && (
        <div className="offers-subpage-view animate-fade-in">
          <div className="offers-subpage-nav">
            <button
              type="button"
              className="btn-back-link"
              onClick={() => setReviseModalOpen(false)}
            >
              <ArrowLeft size={16} />
              <span>Back to Offers & Hiring</span>
            </button>
          </div>

          <div className="offers-subpage-header-card">
            <div className="modal-title-wrap">
              <div className="modal-icon-ring amber">
                <RefreshCw size={20} />
              </div>
              <div>
                <h2 className="offers-modal-title">
                  Revise Offer: {targetOffer.id} (Next Version: v{parseInt(targetOffer.version?.replace('v', '') || '1', 10) + 1})
                </h2>
                <p className="offers-modal-subtitle">
                  {targetOffer.candidateName} • Current Version ({targetOffer.version || 'v1'}) will be archived in history.
                </p>
              </div>
            </div>
          </div>

          <div className="offers-subpage-body-card">
            <form onSubmit={handleExecuteReviseOffer}>
              <div className="offers-modal-body">
                <div className="revision-info-box">
                  <strong>Revision Policy:</strong> Sent or accepted offers are not silently edited. A new version is generated and dispatched to the candidate, while preserving the complete version history.
                </div>

                <div className="modal-form-section">
                  <label className="modal-section-label">
                    Revised Annual Salary / CTC <span className="req-star">*</span>
                  </label>
                  <input
                    type="text"
                    value={reviseData.newSalaryCtc}
                    onChange={(e) => setReviseData({ ...reviseData, newSalaryCtc: e.target.value })}
                    className="modal-text-input"
                    required
                  />
                </div>

                <div className="modal-form-section">
                  <label className="modal-section-label">
                    Revised Designation <span className="req-star">*</span>
                  </label>
                  <input
                    type="text"
                    value={reviseData.newDesignation}
                    onChange={(e) =>
                      setReviseData({ ...reviseData, newDesignation: e.target.value })
                    }
                    className="modal-text-input"
                    required
                  />
                </div>

                <div className="modal-grid-two-cols">
                  <div className="modal-form-section">
                    <label className="modal-section-label">Expected Joining Date</label>
                    <input
                      type="date"
                      value={reviseData.newJoiningDate}
                      onChange={(e) =>
                        setReviseData({ ...reviseData, newJoiningDate: e.target.value })
                      }
                      className="modal-text-input"
                    />
                  </div>

                  <div className="modal-form-section">
                    <label className="modal-section-label">New Offer Validity Deadline</label>
                    <input
                      type="date"
                      value={reviseData.newOfferValidUntil}
                      onChange={(e) =>
                        setReviseData({ ...reviseData, newOfferValidUntil: e.target.value })
                      }
                      className="modal-text-input"
                    />
                  </div>
                </div>

                <div className="modal-form-section">
                  <label className="modal-section-label">Revision Reason / Negotiation Notes</label>
                  <textarea
                    value={reviseData.revisionNotes}
                    onChange={(e) =>
                      setReviseData({ ...reviseData, revisionNotes: e.target.value })
                    }
                    rows="2"
                    className="modal-textarea-input"
                    placeholder="e.g. Higher compensation approved by Finance based on candidate competing offer..."
                  />
                </div>
              </div>

              <div className="offers-subpage-footer-card">
                <button
                  type="button"
                  className="btn-modal-cancel"
                  onClick={() => setReviseModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-modal-submit">
                  <RefreshCw size={15} />
                  <span>Issue Revised Offer</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          PAGE VIEW 6: VIEW OFFER DETAILS & AUDIT HISTORY SUBPAGE VIEW
          ========================================================================= */}
      {detailsModalOpen && targetOffer && (
        <div className="offers-subpage-view animate-fade-in">
          <div className="offers-subpage-nav">
            <button
              type="button"
              className="btn-back-link"
              onClick={() => setDetailsModalOpen(false)}
            >
              <ArrowLeft size={16} />
              <span>Back to Offers & Hiring</span>
            </button>
          </div>

          <div className="offers-subpage-header-card">
            <div className="modal-title-wrap">
              <div className="modal-icon-ring blue">
                <Eye size={20} />
              </div>
              <div>
                <h2 className="offers-modal-title">
                  Offer Details & Audit Progression: {targetOffer.id}
                </h2>
                <p className="offers-modal-subtitle">
                  {targetOffer.candidateName} • {targetOffer.jobTitle} ({targetOffer.version || 'v1'})
                </p>
              </div>
            </div>
          </div>

          <div className="offers-subpage-body-card">
            <div className="offers-modal-body">
              {/* Overview Details Grid */}
              <div className="details-overview-grid">
                <div className="details-cell">
                  <span className="lbl">Candidate Name & ID</span>
                  <span className="val bold">{targetOffer.candidate}</span>
                </div>
                <div className="details-cell">
                  <span className="lbl">Offered Designation</span>
                  <span className="val bold">{targetOffer.designation}</span>
                </div>
                <div className="details-cell">
                  <span className="lbl">Related Job Requisition</span>
                  <span className="val">{targetOffer.jobTitle}</span>
                </div>
                <div className="details-cell">
                  <span className="lbl">Department</span>
                  <span className="val">{targetOffer.department}</span>
                </div>
                <div className="details-cell">
                  <span className="lbl">Salary / CTC</span>
                  <span className="val salary">{targetOffer.salaryCtc}</span>
                </div>
                <div className="details-cell">
                  <span className="lbl">Work Location</span>
                  <span className="val">{targetOffer.workLocation}</span>
                </div>
                <div className="details-cell">
                  <span className="lbl">Expected Joining Date</span>
                  <span className="val">{targetOffer.joiningDate}</span>
                </div>
                <div className="details-cell">
                  <span className="lbl">Offer Validity Deadline</span>
                  <span className="val">{targetOffer.offerValidUntil}</span>
                </div>
                <div className="details-cell">
                  <span className="lbl">Offer Status</span>
                  <span className={`status-badge-chip ${getOfferStatusBadge(targetOffer.offerStatus)}`}>
                    {targetOffer.offerStatus}
                  </span>
                </div>
                <div className="details-cell">
                  <span className="lbl">Joining Status</span>
                  <span className={`joining-badge-chip ${getJoiningStatusBadge(targetOffer.joiningStatus)}`}>
                    {targetOffer.joiningStatus}
                  </span>
                </div>
              </div>

              {/* Response & Joining Confirmation Box */}
              {targetOffer.joiningStatus === 'Joined' && (
                <div className="joined-confirmation-box">
                  <CheckCircle2 size={18} className="conf-icon" />
                  <div>
                    <span className="conf-title">Candidate Confirmed Joined (Hired)</span>
                    <span className="conf-sub">
                      Actual Joining Date: <strong>{targetOffer.actualJoiningDate}</strong> • Confirmed by: {targetOffer.joiningConfirmedBy}
                    </span>
                  </div>
                </div>
              )}

              {targetOffer.notJoinedReason && (
                <div className="declined-reason-box">
                  <AlertCircle size={18} className="warn-icon" />
                  <div>
                    <span className="conf-title">Not Joined / Declined Reason</span>
                    <span className="conf-sub">{targetOffer.notJoinedReason}</span>
                  </div>
                </div>
              )}

              {/* Audit History Timeline */}
              <div className="audit-timeline-section">
                <span className="timeline-title">Offer Audit Trail & State Transitions</span>
                <div className="timeline-items">
                  {targetOffer.auditHistory && targetOffer.auditHistory.length > 0 ? (
                    targetOffer.auditHistory.map((item, idx) => (
                      <div key={idx} className="timeline-item">
                        <div className="timeline-dot"></div>
                        <div className="timeline-content">
                          <div className="timeline-top">
                            <span className="timeline-action">{item.action}</span>
                            <span className="timeline-date">{item.date}</span>
                          </div>
                          <p className="timeline-notes">"{item.notes}"</p>
                          <span className="timeline-user">User: {item.user}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="no-history-sub">No audit trail recorded yet.</p>
                  )}
                </div>
              </div>
            </div>

            <div className="offers-subpage-footer-card">
              <button
                type="button"
                className="btn-modal-cancel"
                onClick={() => setDetailsModalOpen(false)}
              >
                Close
              </button>

              <button
                type="button"
                className="btn-modal-secondary"
                onClick={() => {
                  setDetailsModalOpen(false);
                  handleOpenPreview(targetOffer);
                }}
              >
                <FileText size={15} />
                <span>View Offer Letter</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
