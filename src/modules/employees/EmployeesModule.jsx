import React, { useState } from 'react';
import { Search, Plus, Filter, MoreVertical, Mail } from 'lucide-react';
import { Table } from '../../components/common/Table/Table';
import { Badge } from '../../components/common/Badge/Badge';
import { employeesData } from '../../services/mockData';
import { formatDate, formatCurrency } from '../../utils/formatters';
import './EmployeesModule.css';

export const EmployeesModule = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');

  const filteredEmployees = employeesData.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDept === 'All' || emp.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  const columns = [
    {
      title: 'Employee',
      key: 'name',
      render: (_, row) => (
        <div className="employee-cell">
          <img src={row.avatar} alt={row.name} className="emp-avatar" />
          <div>
            <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{row.name}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{row.id}</div>
          </div>
        </div>
      ),
    },
    { title: 'Job Title', key: 'role' },
    { title: 'Department', key: 'department' },
    {
      title: 'Email',
      key: 'email',
      render: (email) => (
        <div className="flex items-center gap-1" style={{ color: 'var(--text-secondary)' }}>
          <Mail size={14} />
          <span>{email}</span>
        </div>
      ),
    },
    {
      title: 'Joined Date',
      key: 'joinDate',
      render: (date) => formatDate(date),
    },
    {
      title: 'Salary (Annual)',
      key: 'salary',
      render: (salary) => formatCurrency(salary),
    },
    {
      title: 'Status',
      key: 'status',
      render: (status) => <Badge status={status} />,
    },
    {
      title: 'Actions',
      key: 'id',
      render: () => (
        <button style={{ color: 'var(--text-muted)', cursor: 'pointer' }}>
          <MoreVertical size={16} />
        </button>
      ),
    },
  ];

  return (
    <div className="employees-container">
      <div className="module-header">
        <div className="module-title-box">
          <h1>Employee Directory</h1>
          <p>Manage all company personnel, roles, and profiles</p>
        </div>
        <button className="btn-add-primary">
          <Plus size={16} />
          <span>Add Employee</span>
        </button>
      </div>

      <div className="filters-bar">
        <div className="filter-input-group">
          <Search size={16} color="var(--text-muted)" />
          <input
            type="text"
            className="search-input"
            placeholder="Search by name, role or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter size={16} color="var(--text-muted)" />
          <select
            className="filter-select"
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
          >
            <option value="All">All Departments</option>
            <option value="Engineering">Engineering</option>
            <option value="Design">Design</option>
            <option value="Marketing">Marketing</option>
            <option value="Human Resources">Human Resources</option>
          </select>
        </div>
      </div>

      <Table
        columns={columns}
        data={filteredEmployees}
        emptyMessage="No employees found matching the filters."
      />
    </div>
  );
};
