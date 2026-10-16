import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { LoginPage } from '../modules/auth/LoginPage';
import { usePortal } from '../context/PortalContext';
import { Dashboard } from '../modules/dashboard/Dashboard';
import { CompanyProfile } from '../modules/company-profile/CompanyProfile';
import { SubscriptionBilling } from '../modules/subscription/SubscriptionBilling';

import { UsersRoles } from '../modules/users-roles/UsersRoles';
import { DepartmentsModule } from '../modules/departments/DepartmentsModule';
import { JobsModule } from '../modules/jobs/JobsModule';
import { CandidateMatching } from '../modules/candidate-matching/CandidateMatching';
import { CandidateResponses } from '../modules/candidate-responses/CandidateResponses';
import { ScreeningModule } from '../modules/screening/ScreeningModule';
import { InterviewsModule } from '../modules/interviews/InterviewsModule';
import { OffersHiringModule } from '../modules/offers-hiring/OffersHiringModule';
import { RecruitmentReportsModule } from '../modules/recruitment-reports/RecruitmentReportsModule';
import { NotificationsModule } from '../modules/notifications/NotificationsModule';
import { CompanySettingsModule } from '../modules/settings/CompanySettingsModule';
import { AuditLogModule } from '../modules/audit-log/AuditLogModule';
import { MastersModule } from '../modules/masters/MastersModule';
import { HelpSupportModule } from '../modules/support/HelpSupportModule';

const ProtectedLayout = () => {
  const { isAuthenticated } = usePortal();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <Layout />;
};

// Route protection: Sub-Branch Admins cannot access Company or Subscription & Billing modules
const MainAdminOnlyRoute = ({ children }) => {
  const { currentUser } = usePortal();
  const isBranchAdmin = Boolean(
    currentUser?.isBranchAdmin ||
    currentUser?.branchId ||
    currentUser?.role?.toLowerCase().includes('branch')
  );

  if (isBranchAdmin) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Standalone Authentication Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signin" element={<LoginPage />} />

      {/* Protected Portal Layout */}
      <Route path="/" element={<ProtectedLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="masters" element={<MastersModule />} />
        <Route path="taxonomy" element={<MastersModule />} />
        <Route path="company-profile" element={<MainAdminOnlyRoute><CompanyProfile /></MainAdminOnlyRoute>} />
        <Route path="company-details" element={<MainAdminOnlyRoute><CompanyProfile /></MainAdminOnlyRoute>} />
        <Route path="jobs" element={<JobsModule />} />
        <Route path="candidate-matching" element={<CandidateMatching />} />
        <Route path="matching-alerts" element={<CandidateMatching />} />
        <Route path="candidate-responses" element={<CandidateResponses />} />
        <Route path="responses" element={<CandidateResponses />} />
        <Route path="candidates" element={<CandidateResponses />} />
        <Route path="screenings" element={<ScreeningModule />} />
        <Route path="screening" element={<ScreeningModule />} />
        <Route path="interviews" element={<InterviewsModule />} />
        <Route path="interview-schedule" element={<InterviewsModule />} />
        <Route path="offers" element={<OffersHiringModule />} />
        <Route path="offers-hiring" element={<OffersHiringModule />} />
        <Route path="hiring" element={<OffersHiringModule />} />
        <Route path="team" element={<UsersRoles />} />
        <Route path="users-roles" element={<UsersRoles />} />
        <Route path="departments" element={<DepartmentsModule />} />
        <Route path="departments-branches" element={<DepartmentsModule />} />
        <Route path="reports" element={<RecruitmentReportsModule />} />
        <Route path="recruitment-reports" element={<RecruitmentReportsModule />} />
        <Route path="notifications" element={<NotificationsModule />} />
        <Route path="subscription" element={<MainAdminOnlyRoute><SubscriptionBilling /></MainAdminOnlyRoute>} />
        <Route path="settings" element={<CompanySettingsModule />} />
        <Route path="company-settings" element={<CompanySettingsModule />} />
        <Route path="security" element={<CompanySettingsModule />} />
        <Route path="audit-log" element={<AuditLogModule />} />
        <Route path="audit" element={<AuditLogModule />} />
        <Route path="help-support" element={<HelpSupportModule />} />
        <Route path="support" element={<HelpSupportModule />} />
        <Route path="tickets" element={<HelpSupportModule />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};
