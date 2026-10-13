import React from 'react';
import { Briefcase, UserCheck, Users, Plus } from 'lucide-react';
import { StatCard } from '../../components/common/StatCard/StatCard';
import { Table } from '../../components/common/Table/Table';
import { Badge } from '../../components/common/Badge/Badge';

export const RecruitmentModule = () => {
  const jobListings = [
    { id: 'JOB-01', title: 'Senior Frontend Engineer', dept: 'Engineering', applicants: 34, stage: 'Technical Interview', status: 'Active' },
    { id: 'JOB-02', title: 'Product Marketing Manager', dept: 'Marketing', applicants: 18, stage: 'Shortlisting', status: 'Active' },
    { id: 'JOB-03', title: 'HR Generalist', dept: 'Human Resources', applicants: 25, stage: 'Final Round', status: 'Active' },
    { id: 'JOB-04', title: 'UI/UX Designer', dept: 'Design', applicants: 52, stage: 'Offer Sent', status: 'Active' },
  ];

  const columns = [
    { title: 'Job Title', key: 'title' },
    { title: 'Department', key: 'dept' },
    { title: 'Applicants', key: 'applicants', render: (num) => <strong>{num} Candidates</strong> },
    { title: 'Current Stage', key: 'stage' },
    {
      title: 'Status',
      key: 'status',
      render: (status) => <Badge status={status} />,
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="module-header">
        <div>
          <h1>Recruitment & Talent Acquisition</h1>
        </div>
        <button className="btn-add-primary">
          <Plus size={16} /> Post New Job
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <StatCard
          title="Open Jobs"
          value="8"
          icon={Briefcase}
          subtitle="4 departments"
          iconBg="var(--primary-light)"
          iconColor="var(--primary)"
        />
        <StatCard
          title="Active Applicants"
          value="129"
          icon={Users}
          trend="+18 this week"
          iconBg="var(--color-info-bg)"
          iconColor="var(--color-info)"
        />
        <StatCard
          title="Offers Accepted"
          value="5"
          icon={UserCheck}
          subtitle="this month"
          iconBg="var(--color-success-bg)"
          iconColor="var(--color-success)"
        />
      </div>

      <div className="surface-card">
        <h2 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Active Job Openings</h2>
        <Table columns={columns} data={jobListings} />
      </div>
    </div>
  );
};
