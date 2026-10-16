import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
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
  Search,
  Filter,
  BarChart3,
  TrendingUp,
  Award,
  Layers,
  ArrowRight,
  ArrowLeft,
  Eye,
  FileSpreadsheet,
  Printer,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  Calendar,
  Building,
  Target,
  Percent,
} from 'lucide-react';
import './RecruitmentReportsModule.css';

export const RecruitmentReportsModule = () => {
  // 4 Core Sub-modules requested:
  // 1. Recruitment Overview: Overall recruitment summary
  // 2. Candidate & Matching Report: Job-wise matching and candidate responses
  // 3. Screening Report: Assessment progress and qualification results
  // 4. Interviews & Hiring Report: Interview outcomes, offers and joining
  const [searchParams, setSearchParams] = useSearchParams();
  const urlTab = searchParams.get('tab');
  const validTabs = ['overview', 'matching', 'screening', 'interviews'];
  const [activeTab, setActiveTab] = useState(
    urlTab && validTabs.includes(urlTab) ? urlTab : 'overview'
  );

  useEffect(() => {
    if (urlTab && validTabs.includes(urlTab)) {
      setActiveTab(urlTab);
    }
  }, [urlTab]);

  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    setSearchParams({ tab: newTab });
  };

  // Common Top Filters
  const [dateRangeFilter, setDateRangeFilter] = useState('This Month (Oct 2026)');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [jobFilter, setJobFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Sub-module specific filters
  const [alertStatusFilter, setAlertStatusFilter] = useState('All');
  const [screeningStatusFilter, setScreeningStatusFilter] = useState('All');
  const [interviewStatusFilter, setInterviewStatusFilter] = useState('All');
  const [offerStatusFilter, setOfferStatusFilter] = useState('All');
  const [joiningStatusFilter, setJoiningStatusFilter] = useState('All');

  // Toast State
  const [toastMessage, setToastMessage] = useState('');
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3500);
  };

  // Modals State
  const [drilldownModalOpen, setDrilldownModalOpen] = useState(false);
  const [selectedReportRow, setSelectedReportRow] = useState(null);
  const [modalType, setModalType] = useState('overview'); // 'overview' | 'matching' | 'screening' | 'interviews'


  // =========================================================================
  // 1. DATA: RECRUITMENT OVERVIEW (Department & Job-wise Funnel Metrics)
  // =========================================================================
  const recruitmentOverviewData = [
    {
      id: 'JOB-2026-001',
      title: 'Senior Frontend Engineer (JOB-2026-001)',
      department: 'Engineering & Technology',
      publishedDate: '04-Sep-2026',
      totalJobs: 1,
      interested: 45,
      screened: 28,
      qualified: 21,
      interviewed: 9,
      offersSent: 4,
      hired: 3,
      conversionRate: '6.7%',
      avgTimeToHire: '18 Days',
      status: 'Active',
    },
    {
      id: 'JOB-2026-002',
      title: 'Lead Product Designer (JOB-2026-002)',
      department: 'Design & UX',
      publishedDate: '11-Sep-2026',
      totalJobs: 1,
      interested: 32,
      screened: 20,
      qualified: 16,
      interviewed: 6,
      offersSent: 2,
      hired: 2,
      conversionRate: '6.3%',
      avgTimeToHire: '15 Days',
      status: 'Filled',
    },
    {
      id: 'JOB-2026-003',
      title: 'HR Executive (JOB-2026-003)',
      department: 'Human Resources',
      publishedDate: '06-Sep-2026',
      totalJobs: 1,
      interested: 28,
      screened: 12,
      qualified: 9,
      interviewed: 4,
      offersSent: 2,
      hired: 2,
      conversionRate: '7.1%',
      avgTimeToHire: '15 Days',
      status: 'Filled',
    },
    {
      id: 'JOB-2026-004',
      title: 'DevOps & Cloud Architect (JOB-2026-004)',
      department: 'Engineering & Technology',
      publishedDate: '22-Aug-2026',
      totalJobs: 1,
      interested: 36,
      screened: 22,
      qualified: 15,
      interviewed: 7,
      offersSent: 3,
      hired: 2,
      conversionRate: '5.6%',
      avgTimeToHire: '27 Days',
      status: 'Active',
    },
    {
      id: 'JOB-2026-005',
      title: 'Enterprise Account Executive (JOB-2026-005)',
      department: 'Business Development',
      publishedDate: '18-Aug-2026',
      totalJobs: 1,
      interested: 52,
      screened: 15,
      qualified: 11,
      interviewed: 6,
      offersSent: 3,
      hired: 1,
      conversionRate: '1.9%',
      avgTimeToHire: '36 Days',
      status: 'Active',
    },
    {
      id: 'JOB-2026-007',
      title: 'Software Developer (JOB-2026-007)',
      department: 'Engineering & Technology',
      publishedDate: '15-Sep-2026',
      totalJobs: 1,
      interested: 18,
      screened: 10,
      qualified: 8,
      interviewed: 3,
      offersSent: 1,
      hired: 1,
      conversionRate: '5.5%',
      avgTimeToHire: '20 Days',
      status: 'Active',
    },
  ];

  // =========================================================================
  // 2. DATA: CANDIDATE & MATCHING REPORT (12 requested columns)
  // =========================================================================
  const candidateMatchingReportData = [
    {
      jobId: 'JOB-2026-001',
      jobTitle: 'Senior Frontend Engineer (JOB-2026-001)',
      department: 'Engineering & Technology',
      totalNotified: 350,
      matchedCandidates: 84,
      interestedCount: 45,
      notInterestedCount: 18,
      maybeLaterCount: 12,
      noResponseCount: 9,
      averageMatchScore: '89.2%',
      alertStatus: 'Sent',
      candidatesList: [
        { id: 'CAN-REF-1042', name: 'Rajesh Kumar', score: '94%', skillsMatch: '96%', expMatch: 'Yes', response: 'Interested', date: '08-Sep-2026', screeningSent: 'Yes (Score: 92%)' },
        { id: 'CAN-REF-1048', name: 'Subhashini M', score: '88%', skillsMatch: '90%', expMatch: 'Yes', response: 'Interested', date: '09-Sep-2026', screeningSent: 'Yes (Score: 78%)' },
        { id: 'CAN-REF-1050', name: 'Praveen Chandran', score: '86%', skillsMatch: '88%', expMatch: 'Yes', response: 'Maybe Later', date: '10-Sep-2026', screeningSent: 'No' },
        { id: 'CAN-REF-1052', name: 'Anitha Velu', score: '84%', skillsMatch: '82%', expMatch: 'Yes', response: 'Not Interested', date: '11-Sep-2026', screeningSent: 'No' },
      ],
    },
    {
      jobId: 'JOB-2026-002',
      jobTitle: 'Lead Product Designer (JOB-2026-002)',
      department: 'Design & UX',
      totalNotified: 240,
      matchedCandidates: 56,
      interestedCount: 32,
      notInterestedCount: 14,
      maybeLaterCount: 6,
      noResponseCount: 4,
      averageMatchScore: '91.5%',
      alertStatus: 'Sent',
      candidatesList: [
        { id: 'CAN-REF-2015', name: 'Aishwarya Lakshmi', score: '96%', skillsMatch: '98%', expMatch: 'Yes', response: 'Interested', date: '12-Sep-2026', screeningSent: 'Yes (Score: 94%)' },
        { id: 'CAN-REF-2018', name: 'Harish Babu', score: '90%', skillsMatch: '92%', expMatch: 'Yes', response: 'Interested', date: '14-Sep-2026', screeningSent: 'Yes (Score: 82%)' },
        { id: 'CAN-REF-2022', name: 'Swetha Nathan', score: '87%', skillsMatch: '88%', expMatch: 'Yes', response: 'Maybe Later', date: '15-Sep-2026', screeningSent: 'No' },
      ],
    },
    {
      jobId: 'JOB-2026-003',
      jobTitle: 'HR Executive (JOB-2026-003)',
      department: 'Human Resources',
      totalNotified: 160,
      matchedCandidates: 42,
      interestedCount: 28,
      notInterestedCount: 8,
      maybeLaterCount: 4,
      noResponseCount: 2,
      averageMatchScore: '86.4%',
      alertStatus: 'Sent',
      candidatesList: [
        { id: 'CAN-REF-3008', name: 'Nathiya Ramesh', score: '93%', skillsMatch: '94%', expMatch: 'Yes', response: 'Interested', date: '08-Sep-2026', screeningSent: 'Yes (Score: 92%)' },
        { id: 'CAN-REF-3012', name: 'Divya Shankar', score: '85%', skillsMatch: '88%', expMatch: 'Yes', response: 'Interested', date: '09-Sep-2026', screeningSent: 'Yes (Score: 76%)' },
      ],
    },
    {
      jobId: 'JOB-2026-004',
      jobTitle: 'DevOps & Cloud Architect (JOB-2026-004)',
      department: 'Engineering & Technology',
      totalNotified: 280,
      matchedCandidates: 68,
      interestedCount: 36,
      notInterestedCount: 16,
      maybeLaterCount: 10,
      noResponseCount: 6,
      averageMatchScore: '87.8%',
      alertStatus: 'Sent',
      candidatesList: [
        { id: 'CAN-REF-4011', name: 'Karthik V', score: '95%', skillsMatch: '96%', expMatch: 'Yes', response: 'Interested', date: '25-Aug-2026', screeningSent: 'Yes (Score: 90%)' },
        { id: 'CAN-REF-1049', name: 'Manoj Krishnan', score: '82%', skillsMatch: '85%', expMatch: 'Yes', response: 'Interested', date: '28-Aug-2026', screeningSent: 'Yes (Score: 68%)' },
      ],
    },
    {
      jobId: 'JOB-2026-005',
      jobTitle: 'Enterprise Account Executive (JOB-2026-005)',
      department: 'Business Development',
      totalNotified: 220,
      matchedCandidates: 92,
      interestedCount: 52,
      notInterestedCount: 22,
      maybeLaterCount: 11,
      noResponseCount: 7,
      averageMatchScore: '84.0%',
      alertStatus: 'Sent',
      candidatesList: [
        { id: 'CAN-REF-5002', name: 'Venkatesh S', score: '92%', skillsMatch: '95%', expMatch: 'Yes', response: 'Interested', date: '22-Aug-2026', screeningSent: 'Yes (Score: 89%)' },
        { id: 'CAN-REF-5010', name: 'Siddharth M', score: '83%', skillsMatch: '85%', expMatch: 'Yes', response: 'Interested', date: '24-Aug-2026', screeningSent: 'Yes (Score: 72%)' },
      ],
    },
    {
      jobId: 'JOB-2026-007',
      jobTitle: 'Software Developer (JOB-2026-007)',
      department: 'Engineering & Technology',
      totalNotified: 180,
      matchedCandidates: 45,
      interestedCount: 18,
      notInterestedCount: 12,
      maybeLaterCount: 9,
      noResponseCount: 6,
      averageMatchScore: '85.5%',
      alertStatus: 'Sent',
      candidatesList: [
        { id: 'CAN-REF-7011', name: 'Karthikeyan Selvam', score: '91%', skillsMatch: '92%', expMatch: 'Yes', response: 'Interested', date: '18-Sep-2026', screeningSent: 'Yes (Score: 88%)' },
      ],
    },
  ];

  // =========================================================================
  // 3. DATA: SCREENING REPORT (12 requested columns)
  // =========================================================================
  const screeningReportData = [
    {
      screeningId: 'SCR-2026-001',
      screeningName: 'Frontend Core & React 19 Architecture',
      jobTitle: 'Senior Frontend Engineer (JOB-2026-001)',
      candidatesAssigned: 32,
      completedCount: 28,
      pendingCount: 4,
      qualifiedCount: 21,
      notQualifiedCount: 5,
      reviewRequiredCount: 2, // Manual review pending (excluded from final count)
      averageScore: '84.6%',
      status: 'Active',
      resultsList: [
        { candId: 'CAN-REF-1042', name: 'Rajesh Kumar', obtained: 92, total: 100, pct: '92%', result: 'Qualified', date: '12-Sep-2026', review: 'Evaluated' },
        { candId: 'CAN-REF-1048', name: 'Subhashini M', obtained: 78, total: 100, pct: '78%', result: 'Qualified', date: '13-Sep-2026', review: 'Evaluated' },
        { candId: 'CAN-REF-1055', name: 'Vikram S', obtained: 82, total: 100, pct: '82%', result: 'Pending Review', date: '14-Sep-2026', review: 'Manual Review Pending' },
        { candId: 'CAN-REF-1060', name: 'Dinesh Kumar', obtained: 58, total: 100, pct: '58%', result: 'Not Qualified', date: '15-Sep-2026', review: 'Evaluated' },
      ],
    },
    {
      screeningId: 'SCR-2026-002',
      screeningName: 'Design Systems & Figma Component Mastery',
      jobTitle: 'Lead Product Designer (JOB-2026-002)',
      candidatesAssigned: 22,
      completedCount: 20,
      pendingCount: 2,
      qualifiedCount: 16,
      notQualifiedCount: 3,
      reviewRequiredCount: 1,
      averageScore: '87.5%',
      status: 'Active',
      resultsList: [
        { candId: 'CAN-REF-2015', name: 'Aishwarya Lakshmi', obtained: 94, total: 100, pct: '94%', result: 'Qualified', date: '15-Sep-2026', review: 'Evaluated' },
        { candId: 'CAN-REF-2018', name: 'Harish Babu', obtained: 82, total: 100, pct: '82%', result: 'Qualified', date: '16-Sep-2026', review: 'Evaluated' },
        { candId: 'CAN-REF-2025', name: 'Meena Kumari', obtained: 62, total: 100, pct: '62%', result: 'Not Qualified', date: '17-Sep-2026', review: 'Evaluated' },
      ],
    },
    {
      screeningId: 'SCR-2026-003',
      screeningName: 'HR Compliance & Talent Sourcing Metrics',
      jobTitle: 'HR Executive (JOB-2026-003)',
      candidatesAssigned: 14,
      completedCount: 12,
      pendingCount: 2,
      qualifiedCount: 9,
      notQualifiedCount: 3,
      reviewRequiredCount: 0,
      averageScore: '83.0%',
      status: 'Active',
      resultsList: [
        { candId: 'CAN-REF-3008', name: 'Nathiya Ramesh', obtained: 92, total: 100, pct: '92%', result: 'Qualified', date: '10-Sep-2026', review: 'Evaluated' },
        { candId: 'CAN-REF-3012', name: 'Divya Shankar', obtained: 76, total: 100, pct: '76%', result: 'Qualified', date: '11-Sep-2026', review: 'Evaluated' },
      ],
    },
    {
      screeningId: 'SCR-2026-004',
      screeningName: 'Kubernetes Multi-Cluster & Terraform',
      jobTitle: 'DevOps & Cloud Architect (JOB-2026-004)',
      candidatesAssigned: 26,
      completedCount: 22,
      pendingCount: 4,
      qualifiedCount: 15,
      notQualifiedCount: 5,
      reviewRequiredCount: 2,
      averageScore: '81.2%',
      status: 'Active',
      resultsList: [
        { candId: 'CAN-REF-4011', name: 'Karthik V', obtained: 90, total: 100, pct: '90%', result: 'Qualified', date: '01-Sep-2026', review: 'Evaluated' },
        { candId: 'CAN-REF-1049', name: 'Manoj Krishnan', obtained: 68, total: 100, pct: '68%', result: 'Not Qualified', date: '02-Sep-2026', review: 'Evaluated' },
      ],
    },
    {
      screeningId: 'SCR-2026-005',
      screeningName: 'Enterprise SaaS ARR Closure Metrics',
      jobTitle: 'Enterprise Account Executive (JOB-2026-005)',
      candidatesAssigned: 18,
      completedCount: 15,
      pendingCount: 3,
      qualifiedCount: 11,
      notQualifiedCount: 3,
      reviewRequiredCount: 1,
      averageScore: '82.0%',
      status: 'Active',
      resultsList: [
        { candId: 'CAN-REF-5002', name: 'Venkatesh S', obtained: 89, total: 100, pct: '89%', result: 'Qualified', date: '28-Aug-2026', review: 'Evaluated' },
      ],
    },
  ];

  // =========================================================================
  // 4. DATA: INTERVIEWS & HIRING REPORT (14 requested columns)
  // =========================================================================
  const interviewsHiringReportData = [
    {
      jobTitle: 'Senior Frontend Engineer (JOB-2026-001)',
      department: 'Engineering & Technology',
      candidatesInterviewed: 9, // Unique candidate count
      interviewsScheduled: 16,
      interviewsCompleted: 13, // Total round records completed
      hireRecommendation: 4,
      holdCount: 3,
      rejectCount: 2,
      offersSent: 4,
      offersAccepted: 3,
      offersDeclined: 1,
      joiningPending: 1, // Rajesh Kumar
      candidatesJoined: 2,
      candidatesDetails: [
        { candName: 'Rajesh Kumar (CAN-REF-1042)', round: 'Technical (R1)', date: '15-Oct-2026', interviewer: 'Sundar Raman', rating: '4.8 / 5', rec: 'Hire', offerStatus: 'Accepted', expJoining: '01-Nov-2026', actJoining: '—', outcome: 'Joining Pending' },
        { candName: 'Subhashini M (CAN-REF-1048)', round: 'Technical (R1)', date: '12-Oct-2026', interviewer: 'Sundar Raman', rating: '2.0 / 5', rec: 'Reject', offerStatus: 'Declined', expJoining: '24-Oct-2026', actJoining: '—', outcome: 'Declined' },
      ],
    },
    {
      jobTitle: 'Lead Product Designer (JOB-2026-002)',
      department: 'Design & UX',
      candidatesInterviewed: 6,
      interviewsScheduled: 10,
      interviewsCompleted: 9,
      hireRecommendation: 3,
      holdCount: 2,
      rejectCount: 1,
      offersSent: 2,
      offersAccepted: 2,
      offersDeclined: 0,
      joiningPending: 0,
      candidatesJoined: 2, // Aishwarya Lakshmi + 1
      candidatesDetails: [
        { candName: 'Aishwarya Lakshmi (CAN-REF-2015)', round: 'Managerial (R2)', date: '16-Oct-2026', interviewer: 'Karthik Raja', rating: '4.7 / 5', rec: 'Hire', offerStatus: 'Accepted', expJoining: '28-Oct-2026', actJoining: '28-Oct-2026', outcome: 'Hired' },
      ],
    },
    {
      jobTitle: 'HR Executive (JOB-2026-003)',
      department: 'Human Resources',
      candidatesInterviewed: 4,
      interviewsScheduled: 6,
      interviewsCompleted: 5,
      hireRecommendation: 2,
      holdCount: 1,
      rejectCount: 1,
      offersSent: 2,
      offersAccepted: 2,
      offersDeclined: 0,
      joiningPending: 0,
      candidatesJoined: 2,
      candidatesDetails: [
        { candName: 'Nathiya Ramesh (CAN-REF-3008)', round: 'HR (R1)', date: '14-Oct-2026', interviewer: 'Abinaya R', rating: '4.4 / 5', rec: 'Hire', offerStatus: 'Draft', expJoining: '05-Nov-2026', actJoining: '—', outcome: 'Offer Pending' },
      ],
    },
    {
      jobTitle: 'DevOps & Cloud Architect (JOB-2026-004)',
      department: 'Engineering & Technology',
      candidatesInterviewed: 7,
      interviewsScheduled: 12,
      interviewsCompleted: 9,
      hireRecommendation: 2,
      holdCount: 3,
      rejectCount: 2,
      offersSent: 3,
      offersAccepted: 2,
      offersDeclined: 0,
      joiningPending: 1,
      candidatesJoined: 1,
      candidatesDetails: [
        { candName: 'Karthik V (CAN-REF-4011)', round: 'Technical (R1)', date: '17-Oct-2026', interviewer: 'Vigneshwaran M', rating: '—', rec: 'Hold', offerStatus: '—', expJoining: '—', actJoining: '—', outcome: 'Reschedule Requested' },
        { candName: 'Manoj Krishnan (CAN-REF-1049)', round: 'HR (R1)', date: '11-Oct-2026', interviewer: 'Abinaya R', rating: '1.0 / 5', rec: 'Reject', offerStatus: 'Expired', expJoining: '01-Oct-2026', actJoining: '—', outcome: 'Not Joined' },
      ],
    },
    {
      jobTitle: 'Enterprise Account Executive (JOB-2026-005)',
      department: 'Business Development',
      candidatesInterviewed: 6,
      interviewsScheduled: 8,
      interviewsCompleted: 6,
      hireRecommendation: 2,
      holdCount: 2,
      rejectCount: 2,
      offersSent: 3,
      offersAccepted: 2,
      offersDeclined: 0,
      joiningPending: 1, // Venkatesh S
      candidatesJoined: 1,
      candidatesDetails: [
        { candName: 'Venkatesh S (CAN-REF-5002)', round: 'Final (R2)', date: '13-Oct-2026', interviewer: 'Rajeshwaran K', rating: '4.6 / 5', rec: 'Hire', offerStatus: 'Sent', expJoining: '10-Nov-2026', actJoining: '—', outcome: 'Offer Sent' },
      ],
    },
  ];

  // =========================================================================
  // EXPORT GENERATORS: CSV, EXCEL & PRINTABLE PDF
  // =========================================================================
  const handleExportCSV = () => {
    let csvContent = 'data:text/csv;charset=utf-8,';
    let filename = `Recruitment_Report_${activeTab}_${Date.now()}.csv`;

    if (activeTab === 'overview') {
      csvContent += 'S.No,Job ID,Job Title,Department,Published Date,Interested,Screened,Interviewed,Offers Released,Hired,Conversion Rate\n';
      recruitmentOverviewData.forEach((row, i) => {
        csvContent += `${i + 1},${row.id},"${row.title}","${row.department}",${row.publishedDate},${row.interested},${row.screened},${row.interviewed},${row.offersSent},${row.hired},${row.conversionRate}\n`;
      });
    } else if (activeTab === 'matching') {
      csvContent += 'S.No,Job ID,Job Title,Department,Total Notified,Matched,Interested,Not Interested,Maybe Later,No Response,Avg Match Score\n';
      candidateMatchingReportData.forEach((row, i) => {
        csvContent += `${i + 1},${row.jobId},"${row.jobTitle}","${row.department}",${row.totalNotified},${row.matchedCandidates},${row.interestedCount},${row.notInterestedCount},${row.maybeLaterCount},${row.noResponseCount},${row.averageMatchScore}\n`;
      });
    } else if (activeTab === 'screening') {
      csvContent += 'S.No,Screening ID,Screening Name,Job Title,Assigned,Completed,Pending,Qualified,Not Qualified,Review Required,Average Score\n';
      screeningReportData.forEach((row, i) => {
        csvContent += `${i + 1},${row.screeningId},"${row.screeningName}","${row.jobTitle}",${row.candidatesAssigned},${row.completedCount},${row.pendingCount},${row.qualifiedCount},${row.notQualifiedCount},${row.reviewRequiredCount},${row.averageScore}\n`;
      });
    } else if (activeTab === 'interviews') {
      csvContent += 'S.No,Job Title,Candidates Interviewed,Scheduled,Completed,Hire Rec,Hold,Reject,Offers Sent,Offers Accepted,Offers Declined,Joining Pending,Candidates Joined\n';
      interviewsHiringReportData.forEach((row, i) => {
        csvContent += `${i + 1},"${row.jobTitle}",${row.candidatesInterviewed},${row.interviewsScheduled},${row.interviewsCompleted},${row.hireRecommendation},${row.holdCount},${row.rejectCount},${row.offersSent},${row.offersAccepted},${row.offersDeclined},${row.joiningPending},${row.candidatesJoined}\n`;
      });
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast(`Exported "${filename}" successfully in CSV format!`);
  };

  const handleExportPDF = () => {
    window.print();
  };

  // =========================================================================
  // DRILL-DOWN MODAL HANDLERS
  // =========================================================================
  const handleOpenDrilldown = (type, rowData) => {
    setModalType(type);
    setSelectedReportRow(rowData);
    setDrilldownModalOpen(true);
  };

  // =========================================================================
  // TAB-WISE PAGINATION & FILTERED DATA ARRAYS (8 items per page)
  // =========================================================================
  const itemsPerPage = 8;

  // 1. Overview Tab
  const [overviewPage, setOverviewPage] = useState(1);
  const filteredOverviewData = recruitmentOverviewData
    .filter((r) => (departmentFilter === 'All' ? true : r.department === departmentFilter))
    .filter(
      (r) =>
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  const totalOverviewPages = Math.ceil(filteredOverviewData.length / itemsPerPage) || 1;
  const paginatedOverviewData = filteredOverviewData.slice(
    (overviewPage - 1) * itemsPerPage,
    overviewPage * itemsPerPage
  );

  // 2. Candidate Matching Tab
  const [matchingPage, setMatchingPage] = useState(1);
  const filteredMatchingData = candidateMatchingReportData
    .filter((r) => (departmentFilter === 'All' ? true : r.department === departmentFilter))
    .filter(
      (r) =>
        r.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.jobId.toLowerCase().includes(searchQuery.toLowerCase())
    );
  const totalMatchingPages = Math.ceil(filteredMatchingData.length / itemsPerPage) || 1;
  const paginatedMatchingData = filteredMatchingData.slice(
    (matchingPage - 1) * itemsPerPage,
    matchingPage * itemsPerPage
  );

  // 3. Screening Tab
  const [screeningPage, setScreeningPage] = useState(1);
  const filteredScreeningData = screeningReportData
    .filter((r) =>
      screeningStatusFilter === 'All' ? true : r.status === screeningStatusFilter
    )
    .filter(
      (r) =>
        r.screeningName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.screeningId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.jobTitle.toLowerCase().includes(searchQuery.toLowerCase())
    );
  const totalScreeningPages = Math.ceil(filteredScreeningData.length / itemsPerPage) || 1;
  const paginatedScreeningData = filteredScreeningData.slice(
    (screeningPage - 1) * itemsPerPage,
    screeningPage * itemsPerPage
  );

  // 4. Interviews & Hiring Tab
  const [interviewsPage, setInterviewsPage] = useState(1);
  const filteredInterviewsData = interviewsHiringReportData
    .filter((r) => (departmentFilter === 'All' ? true : r.department === departmentFilter))
    .filter((r) => r.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()));
  const totalInterviewsPages = Math.ceil(filteredInterviewsData.length / itemsPerPage) || 1;
  const paginatedInterviewsData = filteredInterviewsData.slice(
    (interviewsPage - 1) * itemsPerPage,
    interviewsPage * itemsPerPage
  );

  return (
    <div className="reports-page-container animate-fade-in">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="reports-toast-alert">
          <CheckCircle2 size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {!drilldownModalOpen && (
        <>
          {/* =========================================================================
              TOP SECTION: Header Title, Date Range Filter & Quick Export Actions
              ========================================================================= */}
          <div className="reports-page-header">
        <div className="reports-header-left">
          <div>
            <h1 className="reports-page-title">Reports</h1>
            
          </div>
        </div>

        <div className="reports-header-actions">
          <select
            value={dateRangeFilter}
            onChange={(e) => setDateRangeFilter(e.target.value)}
            className="reports-filter-select"
          >
            <option value="This Month (Oct 2026)">This Month (Oct 2026)</option>
            <option value="Last 30 Days">Last 30 Days</option>
            <option value="This Quarter (Q4 2026)">This Quarter (Q4 2026)</option>
            <option value="Year to Date 2026">Year to Date 2026</option>
            <option value="All Time">All Time</option>
          </select>

          <button
            type="button"
            className="btn-export-report"
            onClick={handleExportCSV}
            title="Export Active Report Data to CSV / Excel"
          >
            <FileSpreadsheet size={15} />
            <span>Export CSV</span>
          </button>

          <button
            type="button"
            className="btn-export-report pdf"
            onClick={handleExportPDF}
            title="Print or Export Report to PDF"
          >
            <Printer size={15} />
            <span>Export PDF</span>
          </button>
        </div>
      </div>


      {/* =========================================================================
          REPORT TAB 1: RECRUITMENT OVERVIEW
          ========================================================================= */}
      {activeTab === 'overview' && (
        <div className="report-submodule-container animate-fade-in">
          {/* Summary Section: Exactly the 7 requested KPI Cards */}
          <div className="overview-kpi-seven-grid">
            <div className="rep-kpi-card">
              <div className="kpi-icon-wrap blue"><Briefcase size={16} /></div>
              <div className="kpi-info">
                <span className="kpi-num">18</span>
                <span className="kpi-title">Total Jobs</span>
              </div>
            </div>

            <div className="rep-kpi-card">
              <div className="kpi-icon-wrap blue"><Building size={16} /></div>
              <div className="kpi-info">
                <span className="kpi-num">14</span>
                <span className="kpi-title">Published Jobs</span>
              </div>
            </div>

            <div className="rep-kpi-card">
              <div className="kpi-icon-wrap purple"><Users size={16} /></div>
              <div className="kpi-info">
                <span className="kpi-num">186</span>
                <span className="kpi-title">Interested Candidates</span>
              </div>
            </div>

            <div className="rep-kpi-card">
              <div className="kpi-icon-wrap amber"><ClipboardCheck size={16} /></div>
              <div className="kpi-info">
                <span className="kpi-num">84</span>
                <span className="kpi-title">Screening Completed</span>
              </div>
            </div>

            <div className="rep-kpi-card">
              <div className="kpi-icon-wrap green"><CalendarCheck size={16} /></div>
              <div className="kpi-info">
                <span className="kpi-num">48</span>
                <span className="kpi-title">Interviews Completed</span>
              </div>
            </div>

            <div className="rep-kpi-card">
              <div className="kpi-icon-wrap purple"><FileCheck size={16} /></div>
              <div className="kpi-info">
                <span className="kpi-num">14</span>
                <span className="kpi-title">Offers Sent</span>
              </div>
            </div>

            <div className="rep-kpi-card hired-card">
              <div className="kpi-icon-wrap emerald"><Award size={16} /></div>
              <div className="kpi-info">
                <span className="kpi-num">10</span>
                <span className="kpi-title">Candidates Hired</span>
              </div>
            </div>
          </div>

          {/* Data Section: Filters Toolbar */}
          <div className="reports-toolbar-card">
            <div className="toolbar-left-group">
              <div className="reports-search-box">
                <Search size={15} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search job title, department, requisition..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="reports-search-input"
                />
              </div>

              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="reports-filter-select"
              >
                <option value="All">All Departments</option>
                <option value="Engineering & Technology">Engineering & Technology</option>
                <option value="Design & UX">Design & UX</option>
                <option value="Human Resources">Human Resources</option>
                <option value="Business Development">Business Development</option>
              </select>
            </div>
          </div>

          {/* Data Section: Recruitment Overview Table */}
          <div className="reports-table-card">
            <div className="table-responsive-wrapper">
              <table className="reports-data-table">
                <thead>
                  <tr>
                    <th style={{ width: '45px', textAlign: 'center' }}>S.No</th>
                    <th>Job ID</th>
                    <th>Job Title</th>
                    <th>Department</th>
                    <th>Published Date</th>
                    <th style={{ textAlign: 'center' }}>Interested</th>
                    <th style={{ textAlign: 'center' }}>Screened</th>
                    <th style={{ textAlign: 'center' }}>Interviewed</th>
                    <th style={{ textAlign: 'center' }}>Offers Released</th>
                    <th style={{ textAlign: 'center' }}>Candidates Hired</th>
                    <th style={{ textAlign: 'center' }}>Conversion Rate</th>
                    <th style={{ textAlign: 'center' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOverviewData.length === 0 ? (
                    <tr>
                      <td colSpan="12" className="table-empty-cell">
                        No recruitment overview records found matching your filter criteria.
                      </td>
                    </tr>
                  ) : (
                    paginatedOverviewData.map((item, idx) => {
                      const serialNumber = (overviewPage - 1) * itemsPerPage + idx + 1;
                      return (
                      <tr key={item.id}>
                        <td style={{ textAlign: 'center', fontWeight: 600 }}>{serialNumber}</td>
                        <td><span className="code-badge blue">{item.id}</span></td>
                        <td><span className="font-bold">{item.title}</span></td>
                        <td><span className="dept-tag">{item.department}</span></td>
                        <td><span className="date-sub">{item.publishedDate}</span></td>
                        <td style={{ textAlign: 'center' }}><span className="count-pill purple">{item.interested}</span></td>
                        <td style={{ textAlign: 'center' }}><span className="count-pill amber">{item.screened}</span></td>
                        <td style={{ textAlign: 'center' }}><span className="count-pill blue">{item.interviewed}</span></td>
                        <td style={{ textAlign: 'center' }}><span className="count-pill purple">{item.offersSent}</span></td>
                        <td style={{ textAlign: 'center' }}><span className="count-pill emerald">{item.hired}</span></td>
                        <td style={{ textAlign: 'center' }}><span className="rate-badge">{item.conversionRate}</span></td>
                        <td style={{ textAlign: 'center' }}>
                          <button
                            type="button"
                            className="btn-view-details"
                            onClick={() => handleOpenDrilldown('overview', item)}
                          >
                            <Eye size={13} />
                            <span>View Details</span>
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
                Showing {filteredOverviewData.length > 0 ? (overviewPage - 1) * itemsPerPage + 1 : 0} to{' '}
                {Math.min(overviewPage * itemsPerPage, filteredOverviewData.length)} of{' '}
                {filteredOverviewData.length} Entries
              </div>
              <div className="pagination-controls">
                <button
                  type="button"
                  className={`pagination-nav-btn ${overviewPage === 1 ? 'disabled' : ''}`}
                  disabled={overviewPage === 1}
                  onClick={() => setOverviewPage((p) => Math.max(1, p - 1))}
                >
                  <ChevronLeft size={16} />
                </button>
                {Array.from({ length: totalOverviewPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    type="button"
                    className={`pagination-page-btn ${overviewPage === page ? 'active' : ''}`}
                    onClick={() => setOverviewPage(page)}
                  >
                    {page}
                  </button>
                ))}
                <button
                  type="button"
                  className={`pagination-nav-btn ${overviewPage === totalOverviewPages ? 'disabled' : ''}`}
                  disabled={overviewPage === totalOverviewPages}
                  onClick={() => setOverviewPage((p) => Math.min(totalOverviewPages, p + 1))}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          REPORT TAB 2: CANDIDATE & MATCHING REPORT (12 requested columns)
          ========================================================================= */}
      {activeTab === 'matching' && (
        <div className="report-submodule-container animate-fade-in">
          {/* Summary Section KPI Cards */}
          <div className="reports-kpi-quad-grid">
            <div className="rep-kpi-card">
              <div className="kpi-icon-wrap blue"><BellRing size={16} /></div>
              <div className="kpi-info">
                <span className="kpi-num">1,230</span>
                <span className="kpi-title">Total Candidates Notified</span>
              </div>
            </div>

            <div className="rep-kpi-card">
              <div className="kpi-icon-wrap purple"><Users size={16} /></div>
              <div className="kpi-info">
                <span className="kpi-num">387</span>
                <span className="kpi-title">Matched Candidates</span>
              </div>
            </div>

            <div className="rep-kpi-card">
              <div className="kpi-icon-wrap green"><CheckCircle2 size={16} /></div>
              <div className="kpi-info">
                <span className="kpi-num">186</span>
                <span className="kpi-title">Interested Responses</span>
              </div>
            </div>

            <div className="rep-kpi-card">
              <div className="kpi-icon-wrap amber"><Percent size={16} /></div>
              <div className="kpi-info">
                <span className="kpi-num">88.5%</span>
                <span className="kpi-title">Average Match Score</span>
              </div>
            </div>
          </div>

          {/* Data Section: Filters Toolbar */}
          <div className="reports-toolbar-card">
            <div className="toolbar-left-group">
              <div className="reports-search-box">
                <Search size={15} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search Job ID, Job Title, Department..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="reports-search-input"
                />
              </div>

              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="reports-filter-select"
              >
                <option value="All">All Departments</option>
                <option value="Engineering & Technology">Engineering & Technology</option>
                <option value="Design & UX">Design & UX</option>
                <option value="Human Resources">Human Resources</option>
                <option value="Business Development">Business Development</option>
              </select>

              <select
                value={alertStatusFilter}
                onChange={(e) => setAlertStatusFilter(e.target.value)}
                className="reports-filter-select"
              >
                <option value="All">All Alert Statuses</option>
                <option value="Sent">Sent</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Draft">Draft</option>
              </select>
            </div>
          </div>

          {/* Table: Exactly 12 columns requested */}
          <div className="reports-table-card">
            <div className="table-responsive-wrapper">
              <table className="reports-data-table">
                <thead>
                  <tr>
                    <th style={{ width: '45px', textAlign: 'center' }}>S.No</th>
                    <th>Job ID</th>
                    <th>Job Title</th>
                    <th>Department</th>
                    <th style={{ textAlign: 'center' }}>Total Candidates Notified</th>
                    <th style={{ textAlign: 'center' }}>Matched Candidates</th>
                    <th style={{ textAlign: 'center' }}>Interested Count</th>
                    <th style={{ textAlign: 'center' }}>Not Interested Count</th>
                    <th style={{ textAlign: 'center' }}>Maybe Later Count</th>
                    <th style={{ textAlign: 'center' }}>No Response Count</th>
                    <th style={{ textAlign: 'center' }}>Average Match Score</th>
                    <th style={{ textAlign: 'center' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMatchingData.length === 0 ? (
                    <tr>
                      <td colSpan="11" className="table-empty-cell">
                        No matching report records found matching your filter criteria.
                      </td>
                    </tr>
                  ) : (
                    paginatedMatchingData.map((item, idx) => {
                      const serialNumber = (matchingPage - 1) * itemsPerPage + idx + 1;
                      return (
                      <tr key={item.jobId}>
                        <td style={{ textAlign: 'center', fontWeight: 600 }}>{serialNumber}</td>
                        <td><span className="code-badge blue">{item.jobId}</span></td>
                        <td><span className="font-bold">{item.jobTitle}</span></td>
                        <td><span className="dept-tag">{item.department}</span></td>
                        <td style={{ textAlign: 'center' }}><span className="count-pill blue">{item.totalNotified}</span></td>
                        <td style={{ textAlign: 'center' }}><span className="count-pill purple">{item.matchedCandidates}</span></td>
                        <td style={{ textAlign: 'center' }}><span className="count-pill emerald">{item.interestedCount}</span></td>
                        <td style={{ textAlign: 'center' }}><span className="count-pill rose">{item.notInterestedCount}</span></td>
                        <td style={{ textAlign: 'center' }}><span className="count-pill amber">{item.maybeLaterCount}</span></td>
                        <td style={{ textAlign: 'center' }}><span className="count-pill gray">{item.noResponseCount}</span></td>
                        <td style={{ textAlign: 'center' }}><span className="score-pill">{item.averageMatchScore}</span></td>
                        <td style={{ textAlign: 'center' }}>
                          <button
                            type="button"
                            className="btn-view-details"
                            onClick={() => handleOpenDrilldown('matching', item)}
                          >
                            <Eye size={13} />
                            <span>View Details</span>
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
                Showing {filteredMatchingData.length > 0 ? (matchingPage - 1) * itemsPerPage + 1 : 0} to{' '}
                {Math.min(matchingPage * itemsPerPage, filteredMatchingData.length)} of{' '}
                {filteredMatchingData.length} Entries
              </div>
              <div className="pagination-controls">
                <button
                  type="button"
                  className={`pagination-nav-btn ${matchingPage === 1 ? 'disabled' : ''}`}
                  disabled={matchingPage === 1}
                  onClick={() => setMatchingPage((p) => Math.max(1, p - 1))}
                >
                  <ChevronLeft size={16} />
                </button>
                {Array.from({ length: totalMatchingPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    type="button"
                    className={`pagination-page-btn ${matchingPage === page ? 'active' : ''}`}
                    onClick={() => setMatchingPage(page)}
                  >
                    {page}
                  </button>
                ))}
                <button
                  type="button"
                  className={`pagination-nav-btn ${matchingPage === totalMatchingPages ? 'disabled' : ''}`}
                  disabled={matchingPage === totalMatchingPages}
                  onClick={() => setMatchingPage((p) => Math.min(totalMatchingPages, p + 1))}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          REPORT TAB 3: SCREENING REPORT (12 requested columns)
          ========================================================================= */}
      {activeTab === 'screening' && (
        <div className="report-submodule-container animate-fade-in">
          {/* Summary Section KPI Cards */}
          <div className="reports-kpi-quad-grid">
            <div className="rep-kpi-card">
              <div className="kpi-icon-wrap blue"><ClipboardCheck size={16} /></div>
              <div className="kpi-info">
                <span className="kpi-num">112</span>
                <span className="kpi-title">Candidates Assigned</span>
              </div>
            </div>

            <div className="rep-kpi-card">
              <div className="kpi-icon-wrap amber"><Clock size={16} /></div>
              <div className="kpi-info">
                <span className="kpi-num">97</span>
                <span className="kpi-title">Completed Assessments</span>
              </div>
            </div>

            <div className="rep-kpi-card">
              <div className="kpi-icon-wrap green"><CheckCircle2 size={16} /></div>
              <div className="kpi-info">
                <span className="kpi-num">72</span>
                <span className="kpi-title">Qualified Candidates</span>
              </div>
            </div>

            <div className="rep-kpi-card">
              <div className="kpi-icon-wrap purple"><AlertCircle size={16} /></div>
              <div className="kpi-info">
                <span className="kpi-num">5</span>
                <span className="kpi-title">Manual Review Pending</span>
              </div>
            </div>
          </div>

          {/* Data Section: Filters Toolbar */}
          <div className="reports-toolbar-card">
            <div className="toolbar-left-group">
              <div className="reports-search-box">
                <Search size={15} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search Screening ID, assessment name, job title..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="reports-search-input"
                />
              </div>

              <select
                value={screeningStatusFilter}
                onChange={(e) => setScreeningStatusFilter(e.target.value)}
                className="reports-filter-select"
              >
                <option value="All">All Assessment Statuses</option>
                <option value="Active">Active</option>
                <option value="Ready">Ready</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>

          {/* Table: Exactly 12 columns requested */}
          <div className="reports-table-card">
            <div className="table-responsive-wrapper">
              <table className="reports-data-table">
                <thead>
                  <tr>
                    <th style={{ width: '45px', textAlign: 'center' }}>S.No</th>
                    <th>Screening ID</th>
                    <th>Screening Name</th>
                    <th>Job Title</th>
                    <th style={{ textAlign: 'center' }}>Candidates Assigned</th>
                    <th style={{ textAlign: 'center' }}>Completed Count</th>
                    <th style={{ textAlign: 'center' }}>Pending Count</th>
                    <th style={{ textAlign: 'center' }}>Qualified Count</th>
                    <th style={{ textAlign: 'center' }}>Not Qualified Count</th>
                    <th style={{ textAlign: 'center' }}>Review Required</th>
                    <th style={{ textAlign: 'center' }}>Average Score</th>
                    <th style={{ textAlign: 'center' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredScreeningData.length === 0 ? (
                    <tr>
                      <td colSpan="12" className="table-empty-cell">
                        No screening assessment report records found matching your filter criteria.
                      </td>
                    </tr>
                  ) : (
                    paginatedScreeningData.map((item, idx) => {
                      const serialNumber = (screeningPage - 1) * itemsPerPage + idx + 1;
                      return (
                      <tr key={item.screeningId}>
                        <td style={{ textAlign: 'center', fontWeight: 600 }}>{serialNumber}</td>
                        <td><span className="code-badge blue">{item.screeningId}</span></td>
                        <td><span className="font-bold">{item.screeningName}</span></td>
                        <td><span className="dept-tag">{item.jobTitle}</span></td>
                        <td style={{ textAlign: 'center' }}><span className="count-pill blue">{item.candidatesAssigned}</span></td>
                        <td style={{ textAlign: 'center' }}><span className="count-pill amber">{item.completedCount}</span></td>
                        <td style={{ textAlign: 'center' }}><span className="count-pill gray">{item.pendingCount}</span></td>
                        <td style={{ textAlign: 'center' }}><span className="count-pill emerald">{item.qualifiedCount}</span></td>
                        <td style={{ textAlign: 'center' }}><span className="count-pill rose">{item.notQualifiedCount}</span></td>
                        <td style={{ textAlign: 'center' }}>
                          <span className={`count-pill ${item.reviewRequiredCount > 0 ? 'review-alert' : 'gray'}`}>
                            {item.reviewRequiredCount}
                          </span>
                        </td>
                        <td style={{ textAlign: 'center' }}><span className="score-pill">{item.averageScore}</span></td>
                        <td style={{ textAlign: 'center' }}>
                          <button
                            type="button"
                            className="btn-view-details"
                            onClick={() => handleOpenDrilldown('screening', item)}
                          >
                            <Eye size={13} />
                            <span>View Results</span>
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
                Showing {filteredScreeningData.length > 0 ? (screeningPage - 1) * itemsPerPage + 1 : 0} to{' '}
                {Math.min(screeningPage * itemsPerPage, filteredScreeningData.length)} of{' '}
                {filteredScreeningData.length} Entries
              </div>
              <div className="pagination-controls">
                <button
                  type="button"
                  className={`pagination-nav-btn ${screeningPage === 1 ? 'disabled' : ''}`}
                  disabled={screeningPage === 1}
                  onClick={() => setScreeningPage((p) => Math.max(1, p - 1))}
                >
                  <ChevronLeft size={16} />
                </button>
                {Array.from({ length: totalScreeningPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    type="button"
                    className={`pagination-page-btn ${screeningPage === page ? 'active' : ''}`}
                    onClick={() => setScreeningPage(page)}
                  >
                    {page}
                  </button>
                ))}
                <button
                  type="button"
                  className={`pagination-nav-btn ${screeningPage === totalScreeningPages ? 'disabled' : ''}`}
                  disabled={screeningPage === totalScreeningPages}
                  onClick={() => setScreeningPage((p) => Math.min(totalScreeningPages, p + 1))}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          REPORT TAB 4: INTERVIEWS & HIRING REPORT (14 requested columns)
          ========================================================================= */}
      {activeTab === 'interviews' && (
        <div className="report-submodule-container animate-fade-in">
          {/* Summary Section KPI Cards */}
          <div className="reports-kpi-quad-grid">
            <div className="rep-kpi-card">
              <div className="kpi-icon-wrap blue"><Users size={16} /></div>
              <div className="kpi-info">
                <span className="kpi-num">32</span>
                <span className="kpi-title">Unique Candidates Interviewed</span>
              </div>
            </div>

            <div className="rep-kpi-card">
              <div className="kpi-icon-wrap amber"><CalendarCheck size={16} /></div>
              <div className="kpi-info">
                <span className="kpi-num">48</span>
                <span className="kpi-title">Total Rounds Completed</span>
              </div>
            </div>

            <div className="rep-kpi-card">
              <div className="kpi-icon-wrap purple"><FileCheck size={16} /></div>
              <div className="kpi-info">
                <span className="kpi-num">14</span>
                <span className="kpi-title">Offers Sent</span>
              </div>
            </div>

            <div className="rep-kpi-card hired-card">
              <div className="kpi-icon-wrap emerald"><Award size={16} /></div>
              <div className="kpi-info">
                <span className="kpi-num">10</span>
                <span className="kpi-title">Confirmed Joined (Hired)</span>
              </div>
            </div>
          </div>


          {/* Data Section: Filters Toolbar */}
          <div className="reports-toolbar-card">
            <div className="toolbar-left-group">
              <div className="reports-search-box">
                <Search size={15} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search Job Title, Department..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="reports-search-input"
                />
              </div>

              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="reports-filter-select"
              >
                <option value="All">All Departments</option>
                <option value="Engineering & Technology">Engineering & Technology</option>
                <option value="Design & UX">Design & UX</option>
                <option value="Human Resources">Human Resources</option>
                <option value="Business Development">Business Development</option>
              </select>
            </div>
          </div>

          {/* Table: Exactly 14 columns requested */}
          <div className="reports-table-card">
            <div className="table-responsive-wrapper">
              <table className="reports-data-table">
                <thead>
                  <tr>
                    <th style={{ width: '45px', textAlign: 'center' }}>S.No</th>
                    <th>Job Title</th>
                    <th style={{ textAlign: 'center' }}>Candidates Interviewed</th>
                    <th style={{ textAlign: 'center' }}>Interviews Scheduled</th>
                    <th style={{ textAlign: 'center' }}>Interviews Completed</th>
                    <th style={{ textAlign: 'center' }}>Hire Recommendation</th>
                    <th style={{ textAlign: 'center' }}>Hold Count</th>
                    <th style={{ textAlign: 'center' }}>Reject Count</th>
                    <th style={{ textAlign: 'center' }}>Offers Sent</th>
                    <th style={{ textAlign: 'center' }}>Offers Accepted</th>
                    <th style={{ textAlign: 'center' }}>Offers Declined</th>
                    <th style={{ textAlign: 'center' }}>Joining Pending</th>
                    <th style={{ textAlign: 'center' }}>Candidates Joined</th>
                    <th style={{ textAlign: 'center' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInterviewsData.length === 0 ? (
                    <tr>
                      <td colSpan="14" className="table-empty-cell">
                        No interview report records found matching your filter criteria.
                      </td>
                    </tr>
                  ) : (
                    paginatedInterviewsData.map((item, idx) => {
                      const serialNumber = (interviewsPage - 1) * itemsPerPage + idx + 1;
                      return (
                      <tr key={item.jobTitle}>
                        <td style={{ textAlign: 'center', fontWeight: 600 }}>{serialNumber}</td>
                        <td><span className="font-bold">{item.jobTitle}</span></td>
                        <td style={{ textAlign: 'center' }}><span className="count-pill blue">{item.candidatesInterviewed}</span></td>
                        <td style={{ textAlign: 'center' }}><span className="count-pill amber">{item.interviewsScheduled}</span></td>
                        <td style={{ textAlign: 'center' }}><span className="count-pill blue">{item.interviewsCompleted}</span></td>
                        <td style={{ textAlign: 'center' }}><span className="count-pill emerald">{item.hireRecommendation}</span></td>
                        <td style={{ textAlign: 'center' }}><span className="count-pill amber">{item.holdCount}</span></td>
                        <td style={{ textAlign: 'center' }}><span className="count-pill rose">{item.rejectCount}</span></td>
                        <td style={{ textAlign: 'center' }}><span className="count-pill purple">{item.offersSent}</span></td>
                        <td style={{ textAlign: 'center' }}><span className="count-pill emerald">{item.offersAccepted}</span></td>
                        <td style={{ textAlign: 'center' }}><span className="count-pill rose">{item.offersDeclined}</span></td>
                        <td style={{ textAlign: 'center' }}><span className="count-pill amber">{item.joiningPending}</span></td>
                        <td style={{ textAlign: 'center' }}><span className="count-pill emerald font-bold">{item.candidatesJoined}</span></td>
                        <td style={{ textAlign: 'center' }}>
                          <button
                            type="button"
                            className="btn-view-details"
                            onClick={() => handleOpenDrilldown('interviews', item)}
                          >
                            <Eye size={13} />
                            <span>View Details</span>
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
                Showing {filteredInterviewsData.length > 0 ? (interviewsPage - 1) * itemsPerPage + 1 : 0} to{' '}
                {Math.min(interviewsPage * itemsPerPage, filteredInterviewsData.length)} of{' '}
                {filteredInterviewsData.length} Entries
              </div>
              <div className="pagination-controls">
                <button
                  type="button"
                  className={`pagination-nav-btn ${interviewsPage === 1 ? 'disabled' : ''}`}
                  disabled={interviewsPage === 1}
                  onClick={() => setInterviewsPage((p) => Math.max(1, p - 1))}
                >
                  <ChevronLeft size={16} />
                </button>
                {Array.from({ length: totalInterviewsPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    type="button"
                    className={`pagination-page-btn ${interviewsPage === page ? 'active' : ''}`}
                    onClick={() => setInterviewsPage(page)}
                  >
                    {page}
                  </button>
                ))}
                <button
                  type="button"
                  className={`pagination-nav-btn ${interviewsPage === totalInterviewsPages ? 'disabled' : ''}`}
                  disabled={interviewsPage === totalInterviewsPages}
                  onClick={() => setInterviewsPage((p) => Math.min(totalInterviewsPages, p + 1))}
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

      {drilldownModalOpen && selectedReportRow ? (
        /* =========================================================================
            REPORT DRILL-DOWN FULL PAGE VIEW (Replacing Modal)
            ========================================================================= */
        <div className="reports-drilldown-page animate-fade-in">
          {/* Top Subpage Navigation Bar */}
          <div className="drilldown-subpage-nav">
            <button
              type="button"
              className="btn-back-link"
              onClick={() => setDrilldownModalOpen(false)}
            >
              <ArrowLeft size={16} />
              <span>Back to Reports</span>
            </button>
            <div className="drilldown-nav-actions">
              <button
                type="button"
                className="btn-drilldown-action"
                onClick={handleExportPDF}
                title="Export or Print Report"
              >
                <Printer size={15} />
                <span>Export PDF</span>
              </button>
              <button
                type="button"
                className="btn-drilldown-action primary"
                onClick={handleExportCSV}
                title="Export Detailed CSV"
              >
                <Download size={15} />
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          {/* Subpage Header Card */}
          <div className="drilldown-page-header-card">
            <div className="drilldown-header-content">
              <div className="modal-icon-ring blue">
                <BarChart3 size={20} />
              </div>
              <div className="drilldown-header-titles">
                <h2 className="drilldown-page-title">
                  {modalType === 'overview' && `Recruitment Funnel Details: ${selectedReportRow.title}`}
                  {modalType === 'matching' && `Candidate Matching Details: ${selectedReportRow.jobTitle}`}
                  {modalType === 'screening' && `Assessment Evaluation Results: ${selectedReportRow.screeningName}`}
                  {modalType === 'interviews' && `Interview & Offer Progression: ${selectedReportRow.jobTitle}`}
                </h2>
                <div className="drilldown-meta-row">
                  <span className="drilldown-meta-pill">Cycle: {dateRangeFilter}</span>
                  <span className="drilldown-meta-pill">Active Tenant Security</span>
                  {selectedReportRow.department && (
                    <span className="drilldown-meta-pill dept">{selectedReportRow.department}</span>
                  )}
                  {selectedReportRow.status && (
                    <span className="drilldown-meta-pill status">{selectedReportRow.status}</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Subpage Content Section */}
          <div className="drilldown-page-body-card">
            {/* Type 1: Overview Funnel Modal */}
            {modalType === 'overview' && (
              <div className="drilldown-overview-content">
                <div className="funnel-metrics-row">
                  <div className="funnel-step-box">
                    <span className="funnel-num">{selectedReportRow.interested}</span>
                    <span className="funnel-step-lbl">Interested</span>
                  </div>
                  <ArrowRight size={16} className="funnel-arrow" />
                  <div className="funnel-step-box">
                    <span className="funnel-num">{selectedReportRow.screened}</span>
                    <span className="funnel-step-lbl">Screened</span>
                  </div>
                  <ArrowRight size={16} className="funnel-arrow" />
                  <div className="funnel-step-box">
                    <span className="funnel-num">{selectedReportRow.qualified}</span>
                    <span className="funnel-step-lbl">Qualified</span>
                  </div>
                  <ArrowRight size={16} className="funnel-arrow" />
                  <div className="funnel-step-box">
                    <span className="funnel-num">{selectedReportRow.interviewed}</span>
                    <span className="funnel-step-lbl">Interviewed</span>
                  </div>
                  <ArrowRight size={16} className="funnel-arrow" />
                  <div className="funnel-step-box">
                    <span className="funnel-num">{selectedReportRow.offersSent}</span>
                    <span className="funnel-step-lbl">Offer Sent</span>
                  </div>
                  <ArrowRight size={16} className="funnel-arrow" />
                  <div className="funnel-step-box hired">
                    <span className="funnel-num">{selectedReportRow.hired}</span>
                    <span className="funnel-step-lbl">Hired</span>
                  </div>
                </div>

                <div className="details-overview-grid">
                  <div className="details-cell">
                    <span className="lbl">Job ID</span>
                    <span className="val bold">{selectedReportRow.id}</span>
                  </div>
                  <div className="details-cell">
                    <span className="lbl">Department</span>
                    <span className="val">{selectedReportRow.department}</span>
                  </div>
                  <div className="details-cell">
                    <span className="lbl">Published Date</span>
                    <span className="val">{selectedReportRow.publishedDate}</span>
                  </div>
                  <div className="details-cell">
                    <span className="lbl">Average Time to Hire</span>
                    <span className="val bold">{selectedReportRow.avgTimeToHire}</span>
                  </div>
                  <div className="details-cell">
                    <span className="lbl">Requisition Status</span>
                    <span className="val green bold">{selectedReportRow.status}</span>
                  </div>
                  <div className="details-cell">
                    <span className="lbl">Overall Conversion Rate</span>
                    <span className="val bold highlight">{selectedReportRow.conversionRate}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Type 2: Matching Drilldown Modal */}
            {modalType === 'matching' && (
              <div className="drilldown-table-wrap">
                <p className="drilldown-intro-note">
                  Candidate responses and algorithmic matching scores for <strong>{selectedReportRow.jobTitle}</strong>. Personal identities are masked based on viewer permissions.
                </p>
                <div className="drilldown-table-container">
                  <table className="drilldown-table">
                    <thead>
                      <tr>
                        <th>Candidate ID</th>
                        <th>Name</th>
                        <th>Match Score</th>
                        <th>Skills Match</th>
                        <th>Experience Match</th>
                        <th>Response</th>
                        <th>Response Date</th>
                        <th>Screening Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedReportRow.candidatesList && selectedReportRow.candidatesList.length > 0 ? (
                        selectedReportRow.candidatesList.map((cand) => (
                          <tr key={cand.id}>
                            <td><span className="code-badge blue">{cand.id}</span></td>
                            <td><span className="font-bold">{cand.name}</span></td>
                            <td><span className="score-pill">{cand.score}</span></td>
                            <td>{cand.skillsMatch}</td>
                            <td>{cand.expMatch}</td>
                            <td>
                              <span className={`count-pill ${cand.response === 'Interested' ? 'emerald' : cand.response === 'Maybe Later' ? 'amber' : 'rose'}`}>
                                {cand.response}
                              </span>
                            </td>
                            <td>{cand.date}</td>
                            <td><span className="dept-tag">{cand.screeningSent}</span></td>
                          </tr>
                        ))
                      ) : (
                        <tr><td colSpan="8" className="table-empty-cell">No candidate responses recorded yet.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Type 3: Screening Drilldown Modal */}
            {modalType === 'screening' && (
              <div className="drilldown-table-wrap">
                <p className="drilldown-intro-note">
                  Candidate scores and evaluation results for <strong>{selectedReportRow.screeningName}</strong>. Cutoff pass criteria: 75%.
                </p>
                <div className="drilldown-table-container">
                  <table className="drilldown-table">
                    <thead>
                      <tr>
                        <th>Candidate Reference</th>
                        <th>Name</th>
                        <th>Marks Obtained</th>
                        <th>Total Marks</th>
                        <th>Percentage</th>
                        <th>Result Outcome</th>
                        <th>Submission Date</th>
                        <th>Evaluation Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedReportRow.resultsList && selectedReportRow.resultsList.length > 0 ? (
                        selectedReportRow.resultsList.map((res) => (
                          <tr key={res.candId}>
                            <td><span className="code-badge blue">{res.candId}</span></td>
                            <td><span className="font-bold">{res.name}</span></td>
                            <td><strong>{res.obtained}</strong></td>
                            <td>{res.total}</td>
                            <td><span className="score-pill">{res.pct}</span></td>
                            <td>
                              <span className={`count-pill ${res.result === 'Qualified' ? 'emerald' : res.result === 'Pending Review' ? 'amber' : 'rose'}`}>
                                {res.result}
                              </span>
                            </td>
                            <td>{res.date}</td>
                            <td><span className="dept-tag">{res.review}</span></td>
                          </tr>
                        ))
                      ) : (
                        <tr><td colSpan="8" className="table-empty-cell">No submissions recorded for this assessment.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Type 4: Interviews & Hiring Drilldown Modal */}
            {modalType === 'interviews' && (
              <div className="drilldown-table-wrap">
                <p className="drilldown-intro-note">
                  Interview rounds, panel evaluations, offer release, and joining records for <strong>{selectedReportRow.jobTitle}</strong>.
                </p>
                <div className="drilldown-table-container">
                  <table className="drilldown-table">
                    <thead>
                      <tr>
                        <th>Candidate</th>
                        <th>Round</th>
                        <th>Date</th>
                        <th>Interviewer Panel</th>
                        <th>Rating</th>
                        <th>Recommendation</th>
                        <th>Offer Status</th>
                        <th>Joining Date</th>
                        <th>Final Outcome</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedReportRow.candidatesDetails && selectedReportRow.candidatesDetails.length > 0 ? (
                        selectedReportRow.candidatesDetails.map((intv, idx) => (
                          <tr key={idx}>
                            <td><span className="font-bold">{intv.candName}</span></td>
                            <td><span className="dept-tag">{intv.round}</span></td>
                            <td>{intv.date}</td>
                            <td>{intv.interviewer}</td>
                            <td><strong>{intv.rating}</strong></td>
                            <td>
                              <span className={`count-pill ${intv.rec === 'Hire' ? 'emerald' : intv.rec === 'Hold' ? 'amber' : 'rose'}`}>
                                {intv.rec}
                              </span>
                            </td>
                            <td><span className="dept-tag">{intv.offerStatus}</span></td>
                            <td>{intv.actJoining !== '—' ? intv.actJoining : intv.expJoining}</td>
                            <td>
                              <span className={`count-pill ${intv.outcome === 'Hired' ? 'emerald font-bold' : intv.outcome === 'Joining Pending' ? 'amber' : 'gray'}`}>
                                {intv.outcome}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr><td colSpan="9" className="table-empty-cell">No interview progression records found.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Subpage Footer Action */}
          <div className="drilldown-page-footer-card">
            <button
              type="button"
              className="btn-modal-cancel"
              onClick={() => setDrilldownModalOpen(false)}
            >
              ← Back to Reports
            </button>
            <button
              type="button"
              className="btn-modal-submit"
              onClick={handleExportCSV}
            >
              <Download size={15} />
              <span>Export Full Detailed CSV</span>
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};
