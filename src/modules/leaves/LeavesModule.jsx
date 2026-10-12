import React from 'react';
import { CalendarDays, Check, X, Clock } from 'lucide-react';
import { StatCard } from '../../components/common/StatCard/StatCard';
import { Table } from '../../components/common/Table/Table';
import { Badge } from '../../components/common/Badge/Badge';
import { recentLeaveRequests } from '../../services/mockData';
import { formatDate } from '../../utils/formatters';

export const LeavesModule = () => {
  const columns = [
    { title: 'Leave ID', key: 'id' },
    { title: 'Employee', key: 'employeeName' },
    { title: 'Type', key: 'type' },
    {
      title: 'Duration',
      key: 'startDate',
      render: (_, row) => `${formatDate(row.startDate)} to ${formatDate(row.endDate)} (${row.days} days)`,
    },
    { title: 'Reason', key: 'reason' },
    {
      title: 'Status',
      key: 'status',
      render: (status) => <Badge status={status} />,
    },
    {
      title: 'Action',
      key: 'id',
      render: (_, row) => (
        <div className="flex items-center gap-2">
          {row.status === 'Pending' ? (
            <>
              <button
                className="btn-add-primary"
                style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', backgroundColor: 'var(--color-success)' }}
              >
                <Check size={14} /> Approve
              </button>
              <button
                className="btn-add-primary"
                style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', backgroundColor: 'var(--color-danger)' }}
              >
                <X size={14} /> Reject
              </button>
            </>
          ) : (
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Resolved</span>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="module-header">
        <div>
          <h1>Leave Management</h1>
          <p>Review leave applications, time-off balances, and vacation schedules</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <StatCard
          title="Pending Approvals"
          value="4"
          icon={Clock}
          subtitle="requires HR action"
          iconBg="var(--color-warning-bg)"
          iconColor="var(--color-warning)"
        />
        <StatCard
          title="Approved This Month"
          value="28"
          icon={CalendarDays}
          trend="+5"
          subtitle="vs last month"
          iconBg="var(--color-success-bg)"
          iconColor="var(--color-success)"
        />
        <StatCard
          title="Employees Away Today"
          value="14"
          icon={CalendarDays}
          subtitle="across all offices"
          iconBg="var(--primary-light)"
          iconColor="var(--primary)"
        />
      </div>

      <div className="surface-card">
        <h2 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>All Leave Requests</h2>
        <Table columns={columns} data={recentLeaveRequests} />
      </div>
    </div>
  );
};
