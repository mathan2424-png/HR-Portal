import React from 'react';
import { CalendarCheck, Clock, AlertCircle } from 'lucide-react';
import { StatCard } from '../../components/common/StatCard/StatCard';
import { Table } from '../../components/common/Table/Table';
import { Badge } from '../../components/common/Badge/Badge';

export const AttendanceModule = () => {
  const attendanceLogs = [
    { id: 'ATT-1', name: 'Kavitha Ramachandran', checkIn: '08:55 AM', checkOut: '05:30 PM', workHours: '8h 35m', status: 'Present' },
    { id: 'ATT-2', name: 'Saravanan S', checkIn: '09:05 AM', checkOut: '--', workHours: 'In Progress', status: 'Present' },
    { id: 'ATT-3', name: 'Vigneshwaran P', checkIn: '09:45 AM', checkOut: '--', workHours: 'In Progress', status: 'Late' },
    { id: 'ATT-4', name: 'Abinaya R', checkIn: '--', checkOut: '--', workHours: '0h', status: 'On Leave' },
    { id: 'ATT-5', name: 'Dhakshan S', checkIn: '08:40 AM', checkOut: '05:15 PM', workHours: '8h 35m', status: 'Present' },
  ];

  const columns = [
    { title: 'Employee', key: 'name' },
    { title: 'Check In', key: 'checkIn' },
    { title: 'Check Out', key: 'checkOut' },
    { title: 'Working Hours', key: 'workHours' },
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
          <h1>Attendance & Timesheet</h1>
          <p>Monitor daily attendance, check-ins, late entries, and overtime hours</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <StatCard
          title="On-Time Rate"
          value="94.2%"
          icon={CalendarCheck}
          trend="+2.1%"
          subtitle="this week"
          iconBg="var(--color-success-bg)"
          iconColor="var(--color-success)"
        />
        <StatCard
          title="Avg. Working Hours"
          value="8.2 hrs"
          icon={Clock}
          subtitle="company standard: 8 hrs"
          iconBg="var(--primary-light)"
          iconColor="var(--primary)"
        />
        <StatCard
          title="Late Arrivals"
          value="6"
          icon={AlertCircle}
          trend="-3"
          trendDirection="down"
          subtitle="today"
          iconBg="var(--color-warning-bg)"
          iconColor="var(--color-warning)"
        />
      </div>

      <div className="surface-card">
        <h2 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Today's Live Check-in Log</h2>
        <Table columns={columns} data={attendanceLogs} />
      </div>
    </div>
  );
};
