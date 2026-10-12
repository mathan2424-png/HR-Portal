import React from 'react';
import { CreditCard, DollarSign, Download, ArrowUpRight } from 'lucide-react';
import { StatCard } from '../../components/common/StatCard/StatCard';
import { Table } from '../../components/common/Table/Table';
import { Badge } from '../../components/common/Badge/Badge';
import { formatCurrency } from '../../utils/formatters';

export const PayrollModule = () => {
  const payrollBatches = [
    { id: 'PAY-2026-10', month: 'October 2026', totalAmount: 485000, employeesCount: 248, status: 'Pending', payDate: '2026-10-31' },
    { id: 'PAY-2026-09', month: 'September 2026', totalAmount: 472000, employeesCount: 242, status: 'Paid', payDate: '2026-09-30' },
    { id: 'PAY-2026-08', month: 'August 2026', totalAmount: 468000, employeesCount: 239, status: 'Paid', payDate: '2026-08-31' },
  ];

  const columns = [
    { title: 'Batch ID', key: 'id' },
    { title: 'Billing Month', key: 'month' },
    {
      title: 'Disbursement Amount',
      key: 'totalAmount',
      render: (amount) => <strong>{formatCurrency(amount)}</strong>,
    },
    { title: 'Employees', key: 'employeesCount' },
    { title: 'Disbursement Date', key: 'payDate' },
    {
      title: 'Status',
      key: 'status',
      render: (status) => <Badge status={status} />,
    },
    {
      title: 'Payslip Export',
      key: 'id',
      render: () => (
        <button className="flex items-center gap-1" style={{ color: 'var(--primary)', fontSize: '0.8rem', fontWeight: 600 }}>
          <Download size={14} /> Download
        </button>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="module-header">
        <div>
          <h1>Payroll & Compensation</h1>
          <p>Manage monthly salary disbursements, tax deductions, bonuses, and payslips</p>
        </div>
        <button className="btn-add-primary">
          <ArrowUpRight size={16} /> Run Payroll
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <StatCard
          title="Monthly Net Payroll"
          value="$485,000"
          icon={DollarSign}
          trend="+2.8%"
          subtitle="vs last month"
          iconBg="var(--primary-light)"
          iconColor="var(--primary)"
        />
        <StatCard
          title="Avg. Salary / Emp"
          value="$6,250"
          icon={CreditCard}
          subtitle="per month"
          iconBg="var(--color-info-bg)"
          iconColor="var(--color-info)"
        />
        <StatCard
          title="Benefits & Deductions"
          value="$58,400"
          icon={CreditCard}
          subtitle="health, 401k, tax"
          iconBg="var(--accent-purple)"
          iconColor="#fff"
        />
      </div>

      <div className="surface-card">
        <h2 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Payroll History & Batches</h2>
        <Table columns={columns} data={payrollBatches} />
      </div>
    </div>
  );
};
