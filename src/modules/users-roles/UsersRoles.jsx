import React, { useState } from 'react';
import {
  Home,
  Shield,
  ShieldCheck,
  Plus,
  Search,
  Edit2,
  Eye,
  Trash2,
  X,
  Lock,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Save,
  CheckCircle2,
  Check,
} from 'lucide-react';
import './UsersRoles.css';

export const UsersRoles = () => {
  // 1. Defined System Roles matching Image 1 & 2
  const [systemRoles, setSystemRoles] = useState([
    {
      id: 'ROLE-01',
      name: 'Super Admin',
      description: 'Full root access to all system domains and security configurations.',
      chips: ['View', 'Create', 'Edit', 'Approve', 'Export'],
      permissions: {
        Dashboard: { view: true, add: true, edit: true, delete: true },
        'Roles Permissions': { view: true, add: true, edit: true, delete: true },
        'Admin Users': { view: true, add: true, edit: true, delete: true },
        'Business Regions': { view: true, add: true, edit: true, delete: true },
        'Jobs & Requirements': { view: true, add: true, edit: true, delete: true },
        'Candidate Matching': { view: true, add: true, edit: true, delete: true },
        'Candidate Responses': { view: true, add: true, edit: true, delete: true },
        'Screening Assessments': { view: true, add: true, edit: true, delete: true },
        'Interviews & Scheduling': { view: true, add: true, edit: true, delete: true },
        'Offers & Hiring': { view: true, add: true, edit: true, delete: true },
        'Recruitment Reports': { view: true, add: true, edit: true, delete: true },
        'Company Settings': { view: true, add: true, edit: true, delete: true },
      },
    },
    {
      id: 'ROLE-02',
      name: 'Product Owner',
      description: 'Manages company configurations, feature modules, and usage allotments.',
      chips: ['View', 'Create', 'Edit', 'Export'],
      permissions: {
        Dashboard: { view: true, add: true, edit: true, delete: false },
        'Roles Permissions': { view: true, add: false, edit: false, delete: false },
        'Admin Users': { view: true, add: true, edit: true, delete: false },
        'Business Regions': { view: true, add: true, edit: true, delete: false },
        'Jobs & Requirements': { view: true, add: true, edit: true, delete: true },
        'Candidate Matching': { view: true, add: true, edit: true, delete: false },
        'Candidate Responses': { view: true, add: true, edit: true, delete: false },
        'Screening Assessments': { view: true, add: true, edit: true, delete: false },
        'Interviews & Scheduling': { view: true, add: true, edit: true, delete: false },
        'Offers & Hiring': { view: true, add: false, edit: false, delete: false },
        'Recruitment Reports': { view: true, add: false, edit: false, delete: false },
        'Company Settings': { view: true, add: true, edit: true, delete: false },
      },
    },
    {
      id: 'ROLE-03',
      name: 'Finance Lead',
      description: 'Access to billing ledgers, invoices, payment disputes, and revenue analytics.',
      chips: ['View', 'Edit', 'Approve', 'Export'],
      permissions: {
        Dashboard: { view: true, add: false, edit: false, delete: false },
        'Roles Permissions': { view: false, add: false, edit: false, delete: false },
        'Admin Users': { view: false, add: false, edit: false, delete: false },
        'Business Regions': { view: true, add: false, edit: false, delete: false },
        'Jobs & Requirements': { view: true, add: false, edit: false, delete: false },
        'Candidate Matching': { view: false, add: false, edit: false, delete: false },
        'Candidate Responses': { view: false, add: false, edit: false, delete: false },
        'Screening Assessments': { view: false, add: false, edit: false, delete: false },
        'Interviews & Scheduling': { view: false, add: false, edit: false, delete: false },
        'Offers & Hiring': { view: true, add: false, edit: true, delete: false },
        'Recruitment Reports': { view: true, add: false, edit: false, delete: false },
        'Company Settings': { view: true, add: false, edit: true, delete: false },
      },
    },
    {
      id: 'ROLE-04',
      name: 'Support Specialist',
      description: 'Handles tenant support tickets, escalations, and incident resolutions.',
      chips: ['View', 'Edit'],
      permissions: {
        Dashboard: { view: true, add: false, edit: false, delete: false },
        'Roles Permissions': { view: false, add: false, edit: false, delete: false },
        'Admin Users': { view: true, add: false, edit: false, delete: false },
        'Business Regions': { view: true, add: false, edit: false, delete: false },
        'Jobs & Requirements': { view: true, add: false, edit: false, delete: false },
        'Candidate Matching': { view: true, add: false, edit: false, delete: false },
        'Candidate Responses': { view: true, add: false, edit: true, delete: false },
        'Screening Assessments': { view: true, add: false, edit: false, delete: false },
        'Interviews & Scheduling': { view: true, add: false, edit: true, delete: false },
        'Offers & Hiring': { view: false, add: false, edit: false, delete: false },
        'Recruitment Reports': { view: false, add: false, edit: false, delete: false },
        'Company Settings': { view: false, add: false, edit: false, delete: false },
      },
    },
  ]);

  // 2. Users Table Data matching Image 1
  const [users, setUsers] = useState([
    {
      userId: 'USR-001',
      employeeName: 'Marcus Vance',
      email: 'marcus.admin@hrportal.example.com',
      mobile: '+1 (555) 019-2831',
      employeeId: 'EMP-1042',
      designation: 'Super Administrator',
      department: 'Executive Administration',
      branch: 'Headquarters',
      role: 'Super Admin',
      assignedJobs: 'All System Requisitions',
      status: 'Active',
      lastLogin: '12-Oct-2026 01:05 PM',
    },
    {
      userId: 'USR-002',
      employeeName: 'Elena Rostova',
      email: 'elena.finance@hrportal.example.com',
      mobile: '+1 (555) 019-2832',
      employeeId: 'EMP-1048',
      designation: 'Lead Finance Controller',
      department: 'Finance & Accounts',
      branch: 'New York Campus',
      role: 'Finance Lead',
      assignedJobs: 'None (Finance View Only)',
      status: 'Active',
      lastLogin: '12-Oct-2026 12:40 PM',
    },
    {
      userId: 'USR-003',
      employeeName: 'Dhakshan S',
      email: 'sdhakshan007@company.com',
      mobile: '+91 86101 88861',
      employeeId: 'EMP-2015',
      designation: 'Lead Technical Recruiter',
      department: 'Talent Acquisition',
      branch: 'Chennai HQ',
      role: 'Product Owner',
      assignedJobs: 'All Engineering Jobs (8)',
      status: 'Active',
      lastLogin: '12-Oct-2026 11:15 AM',
    },
    {
      userId: 'USR-004',
      employeeName: 'Abinaya R',
      email: 'abinaya.r@company.com',
      mobile: '+91 96325 87410',
      employeeId: 'EMP-3091',
      designation: 'Senior HR Manager',
      department: 'Human Resources',
      branch: 'Chennai HQ',
      role: 'Super Admin',
      assignedJobs: 'All Company Jobs',
      status: 'Active',
      lastLogin: '11-Oct-2026 04:20 PM',
    },
    {
      userId: 'USR-005',
      employeeName: 'Karthik V',
      email: 'karthik.v@company.com',
      mobile: '+91 94451 22334',
      employeeId: 'EMP-4102',
      designation: 'Support Engineer',
      department: 'Operations',
      branch: 'Bangalore Tech Park',
      role: 'Support Specialist',
      assignedJobs: 'Technical Screening & Scheduling',
      status: 'Active',
      lastLogin: '10-Oct-2026 09:30 AM',
    },
    {
      userId: 'USR-006',
      employeeName: 'Siddharth Roy',
      email: 'siddharth.r@company.com',
      mobile: '+91 97712 33445',
      employeeId: 'EMP-5020',
      designation: 'Talent Sourcing Specialist',
      department: 'Talent Acquisition',
      branch: 'Remote - India',
      role: 'Support Specialist',
      assignedJobs: 'Design & UX Roles (2)',
      status: 'Invited',
      lastLogin: 'Invited (Pending First Login)',
    },
  ]);

  // UI States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRoleFilter, setSelectedRoleFilter] = useState('All Roles');
  const [activeCardRoleFilter, setActiveCardRoleFilter] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  // Views: 'list' | 'add-user' | 'edit-user' | 'view-user'
  const [currentView, setCurrentView] = useState('list');
  const [editingUserId, setEditingUserId] = useState(null);

  // Modal State for Image 2 "Add Role"
  const [isAddRoleModalOpen, setIsAddRoleModalOpen] = useState(false);

  // Add Role Form State (Image 2)
  const initialNewRoleState = {
    name: '',
    description: '',
    permissions: {
      Dashboard: { view: true, add: false, edit: false, delete: false },
      'Roles Permissions': { view: true, add: false, edit: false, delete: false },
      'Admin Users': { view: true, add: true, edit: false, delete: false },
      'Business Regions': { view: true, add: false, edit: false, delete: false },
      'Jobs & Requirements': { view: true, add: true, edit: true, delete: false },
      'Candidate Matching': { view: true, add: true, edit: false, delete: false },
      'Candidate Responses': { view: true, add: true, edit: true, delete: false },
      'Screening Assessments': { view: true, add: true, edit: true, delete: false },
      'Interviews & Scheduling': { view: true, add: true, edit: true, delete: false },
      'Offers & Hiring': { view: true, add: false, edit: false, delete: false },
      'Recruitment Reports': { view: true, add: false, edit: false, delete: false },
      'Company Settings': { view: false, add: false, edit: false, delete: false },
    },
  };
  const [newRoleForm, setNewRoleForm] = useState(initialNewRoleState);

  // Add / Edit User Form State
  const initialUserFormData = {
    userId: '',
    employeeName: '',
    email: '',
    mobile: '',
    employeeId: '',
    designation: 'Recruiter',
    department: 'Talent Acquisition',
    branch: 'Chennai HQ',
    role: 'Super Admin',
    assignedJobs: 'All Company Jobs',
    status: 'Active',
    lastLogin: 'Pending First Login',
  };
  const [userFormData, setUserFormData] = useState(initialUserFormData);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3500);
  };

  // Open Image 2 "Add Role" Modal
  const handleOpenCreateRole = () => {
    setNewRoleForm(initialNewRoleState);
    setIsAddRoleModalOpen(true);
  };

  const handleCloseCreateRole = () => {
    setIsAddRoleModalOpen(false);
  };

  // Toggle single permission circle in Image 2 matrix
  const handleTogglePermission = (moduleName, permType) => {
    setNewRoleForm((prev) => {
      const currentVal = prev.permissions[moduleName]?.[permType] || false;
      return {
        ...prev,
        permissions: {
          ...prev.permissions,
          [moduleName]: {
            ...prev.permissions[moduleName],
            [permType]: !currentVal,
          },
        },
      };
    });
  };

  // Toggle all permissions for a column (VIEW, ADD, EDIT, DELETE)
  const handleToggleAllColumn = (permType) => {
    setNewRoleForm((prev) => {
      const allCurrent = Object.values(prev.permissions).every((m) => m[permType]);
      const nextVal = !allCurrent;
      const updated = {};
      Object.keys(prev.permissions).forEach((mod) => {
        updated[mod] = {
          ...prev.permissions[mod],
          [permType]: nextVal,
        };
      });
      return {
        ...prev,
        permissions: updated,
      };
    });
  };

  // Save new role from Image 2
  const handleSaveRole = (e) => {
    e.preventDefault();
    if (!newRoleForm.name.trim()) {
      alert('Please enter Role Name.');
      return;
    }

    const nextIdNum = systemRoles.length + 1;
    const roleId = `ROLE-0${nextIdNum}`;

    // Compute chips based on permissions
    const hasView = Object.values(newRoleForm.permissions).some((p) => p.view);
    const hasAdd = Object.values(newRoleForm.permissions).some((p) => p.add);
    const hasEdit = Object.values(newRoleForm.permissions).some((p) => p.edit);
    const hasDelete = Object.values(newRoleForm.permissions).some((p) => p.delete);

    const generatedChips = [];
    if (hasView) generatedChips.push('View');
    if (hasAdd) generatedChips.push('Create');
    if (hasEdit) generatedChips.push('Edit');
    if (hasDelete) generatedChips.push('Delete');
    if (generatedChips.length === 0) generatedChips.push('View');

    const createdRole = {
      id: roleId,
      name: newRoleForm.name.trim(),
      description: newRoleForm.description.trim() || 'Custom configured operational access role.',
      chips: generatedChips,
      permissions: newRoleForm.permissions,
    };

    setSystemRoles((prev) => [...prev, createdRole]);
    setIsAddRoleModalOpen(false);
    showToast(`Role "${createdRole.name}" (${createdRole.id}) created successfully!`);
  };

  // User In-Page Form Handlers
  const handleOpenAddUser = () => {
    const nextIdNumber = users.length + 1;
    setUserFormData({
      ...initialUserFormData,
      userId: `USR-00${nextIdNumber}`,
      employeeId: `EMP-${4000 + nextIdNumber}`,
      role: systemRoles[0]?.name || 'Super Admin',
    });
    setEditingUserId(null);
    setCurrentView('add-user');
  };

  const handleOpenEditUser = (user) => {
    setUserFormData({ ...user });
    setEditingUserId(user.userId);
    setCurrentView('edit-user');
  };

  const handleOpenViewUser = (user) => {
    setUserFormData({ ...user });
    setEditingUserId(user.userId);
    setCurrentView('view-user');
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setEditingUserId(null);
  };

  const handleSaveUser = (e) => {
    e.preventDefault();
    if (!userFormData.employeeName.trim()) {
      alert('Please enter Full Name.');
      return;
    }
    if (!userFormData.email.trim()) {
      alert('Please enter Work Email.');
      return;
    }

    if (editingUserId) {
      setUsers((prev) =>
        prev.map((u) => (u.userId === editingUserId ? { ...userFormData } : u))
      );
      showToast(`User "${userFormData.employeeName}" updated successfully!`);
    } else {
      setUsers((prev) => [userFormData, ...prev]);
      showToast(`User "${userFormData.employeeName}" added successfully!`);
    }

    setCurrentView('list');
    setEditingUserId(null);
  };

  const handleDeleteUser = (userId, name) => {
    if (window.confirm(`Are you sure you want to remove user "${name}" (${userId})?`)) {
      setUsers((prev) => prev.filter((u) => u.userId !== userId));
      showToast(`User "${userId}" removed.`);
    }
  };

  // Filter Users
  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.mobile.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRoleDropdown =
      selectedRoleFilter === 'All Roles' || u.role === selectedRoleFilter;

    const matchesCardFilter =
      !activeCardRoleFilter || u.role === activeCardRoleFilter;

    return matchesSearch && matchesRoleDropdown && matchesCardFilter;
  });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage) || 1;
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getRoleBadgeClass = (roleName) => {
    switch (roleName) {
      case 'Super Admin':
        return 'super-admin';
      case 'Finance Lead':
      case 'Finance':
        return 'finance';
      case 'Product Owner':
        return 'product-owner';
      case 'Support Specialist':
        return 'support';
      default:
        return 'super-admin';
    }
  };

  return (
    <div className="users-roles-page">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="inpage-success-banner">
          <CheckCircle2 size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header matching Image 1 */}
      <div className="users-page-header">
        <div className="users-header-left">
          {/* Breadcrumb matching Image 1 */}
          <div className="users-breadcrumb">
            <span className="breadcrumb-home-icon">
              <Home size={15} />
            </span>
            <span className="breadcrumb-sep">&gt;</span>
            <span className="breadcrumb-current">Roles & Permissions</span>
          </div>
          <h1 className="users-page-title">Roles & Permissions</h1>
          
        </div>

        {currentView === 'list' ? (
          <div className="users-header-actions">
            {/* 1. SEPARATE "Create Role" BUTTON (Opens Image 2 UI) */}
            <button
              type="button"
              className="btn-create-role-header"
              onClick={handleOpenCreateRole}
              id="btn-create-role"
            >
              <Shield size={16} />
              <span>Create Role</span>
            </button>

            {/* 2. "+ Add User" BUTTON */}
            <button
              type="button"
              className="btn-add-user-header"
              onClick={handleOpenAddUser}
              id="btn-add-user"
            >
              <Plus size={16} />
              <span>+ Add User</span>
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="btn-create-role-header"
            onClick={handleBackToList}
          >
            <ArrowLeft size={16} />
            <span>Back to Users & Roles</span>
          </button>
        )}
      </div>

      {currentView === 'list' ? (
        <>
          {/* =====================================================================
             SECTION: Defined System Roles (N) matching Image 1
             ===================================================================== */}
          <div className="defined-roles-card">
            <div className="defined-roles-header">
              <div className="defined-roles-title-box">
                <ShieldCheck size={20} />
                <span className="defined-roles-title">
                  Defined System Roles ({systemRoles.length})
                </span>
              </div>
              <span className="defined-roles-subtext">
                Administrators must belong to an active role before system assignment.
              </span>
            </div>

            {/* Roles Cards Grid */}
            <div className="roles-cards-grid">
              {systemRoles.map((role) => {
                const isSelected = activeCardRoleFilter === role.name;
                return (
                  <div
                    key={role.id}
                    className={`role-system-card ${isSelected ? 'active-filter' : ''}`}
                    onClick={() => {
                      if (activeCardRoleFilter === role.name) {
                        setActiveCardRoleFilter(null);
                        setSelectedRoleFilter('All Roles');
                      } else {
                        setActiveCardRoleFilter(role.name);
                        setSelectedRoleFilter(role.name);
                      }
                      setCurrentPage(1);
                    }}
                    title={`Click to filter users by ${role.name}`}
                  >
                    <div>
                      <div className="role-card-top-row">
                        <span className="role-card-name">{role.name}</span>
                        <span className="role-card-code">{role.id}</span>
                      </div>
                      <p className="role-card-desc">{role.description}</p>
                    </div>

                    <div className="role-card-chips-row">
                      {role.chips.map((chip, idx) => (
                        <span key={idx} className="role-perm-chip">
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* =====================================================================
             SECTION: Users Table & Filters matching Image 1
             ===================================================================== */}
          <div className="users-main-card">
            {/* Toolbar: Search & Role Filter */}
            <div className="users-toolbar-row">
              <div className="users-search-box">
                <Search size={16} className="text-muted" />
                <input
                  type="text"
                  placeholder="Search by User ID, name, email, or role..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>

              <select
                value={selectedRoleFilter}
                onChange={(e) => {
                  setSelectedRoleFilter(e.target.value);
                  setActiveCardRoleFilter(e.target.value === 'All Roles' ? null : e.target.value);
                  setCurrentPage(1);
                }}
                className="users-role-select"
              >
                <option value="All Roles">All Roles</option>
                {systemRoles.map((r) => (
                  <option key={r.id} value={r.name}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Modern Data Table */}
            <div className="users-table-container">
              <table className="users-table">
                <thead>
                  <tr>
                    <th>S.NO</th>
                    <th>USER ID</th>
                    <th>FULL NAME</th>
                    <th>MOBILE</th>
                    <th>ASSIGNED ROLE</th>
                    <th>STATUS</th>
                    <th style={{ textAlign: 'center' }}>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedUsers.length > 0 ? (
                    paginatedUsers.map((user, index) => {
                      const serialNumber = (currentPage - 1) * itemsPerPage + index + 1;
                      return (
                        <tr key={user.userId}>
                          {/* S.NO */}
                          <td style={{ fontWeight: 700, color: '#64748b' }}>
                            {serialNumber}
                          </td>

                          {/* USER ID */}
                          <td>
                            <span className="user-id-text">{user.userId}</span>
                          </td>

                          {/* FULL NAME with Email Underneath */}
                          <td>
                            <div className="user-name-stack">
                              <span className="user-full-name">{user.employeeName}</span>
                              <span className="user-email-sub">{user.email}</span>
                            </div>
                          </td>

                          {/* MOBILE */}
                          <td>{user.mobile}</td>

                          {/* ASSIGNED ROLE */}
                          <td>
                            <span className={`user-role-pill ${getRoleBadgeClass(user.role)}`}>
                              {user.role}
                            </span>
                          </td>

                          {/* STATUS */}
                          <td>
                            <span className={`user-status-pill ${user.status.toLowerCase()}`}>
                              <span className="user-status-dot"></span>
                              <span>{user.status}</span>
                            </span>
                          </td>

                          {/* ACTION */}
                          <td style={{ textAlign: 'center' }}>
                            <div className="user-actions-row">
                              <button
                                type="button"
                                className="action-btn-circle"
                                title="View User Details"
                                onClick={() => handleOpenViewUser(user)}
                              >
                                <Eye size={15} />
                              </button>
                              <button
                                type="button"
                                className="action-btn-circle edit"
                                title="Edit User"
                                onClick={() => handleOpenEditUser(user)}
                              >
                                <Edit2 size={15} />
                              </button>
                              <button
                                type="button"
                                className="action-btn-circle delete"
                                title="Delete User"
                                onClick={() => handleDeleteUser(user.userId, user.employeeName)}
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="7" style={{ textAlign: 'center', padding: '2.5rem', color: '#64748b' }}>
                        No users found matching your search or role filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Table Footer Pagination */}
            <div className="users-table-footer">
              <div>
                Showing {filteredUsers.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{' '}
                {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of{' '}
                {filteredUsers.length} users
              </div>

              <div className="users-pagination-controls">
                <button
                  type="button"
                  className="btn-users-page"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                >
                  <ChevronLeft size={16} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    type="button"
                    className={`btn-users-page ${currentPage === page ? 'active' : ''}`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))}

                <button
                  type="button"
                  className="btn-users-page"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* =====================================================================
           IN-PAGE USER ADD / EDIT / VIEW FORM (Clean, NO permissions clutter!)
           ===================================================================== */
        <div className="inpage-user-form-card">
          <div className="inpage-user-section-banner">
            {currentView === 'add-user'
              ? 'ADD NEW COMPANY USER'
              : currentView === 'edit-user'
                ? `EDIT USER: ${userFormData.employeeName} (${userFormData.userId})`
                : `VIEW USER PROFILE: ${userFormData.employeeName} (${userFormData.userId})`}
          </div>

          <form onSubmit={handleSaveUser} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className="inpage-user-grid-3col">
              {/* User ID */}
              <div className="role-form-group">
                <label>User ID</label>
                <input
                  type="text"
                  className="role-input-control"
                  style={{ background: '#f8fafc' }}
                  value={userFormData.userId}
                  readOnly
                />
              </div>

              {/* Full Name */}
              <div className="role-form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  className="role-input-control"
                  placeholder="e.g. Marcus Vance"
                  value={userFormData.employeeName}
                  onChange={(e) => setUserFormData({ ...userFormData, employeeName: e.target.value })}
                  disabled={currentView === 'view-user'}
                  required
                />
              </div>

              {/* Email */}
              <div className="role-form-group">
                <label>Work Email *</label>
                <input
                  type="email"
                  className="role-input-control"
                  placeholder="e.g. marcus.admin@hrportal.example.com"
                  value={userFormData.email}
                  onChange={(e) => setUserFormData({ ...userFormData, email: e.target.value })}
                  disabled={currentView === 'view-user'}
                  required
                />
              </div>
            </div>

            <div className="inpage-user-grid-3col">
              {/* Mobile */}
              <div className="role-form-group">
                <label>Work Mobile</label>
                <input
                  type="text"
                  className="role-input-control"
                  placeholder="e.g. +1 (555) 019-2831"
                  value={userFormData.mobile}
                  onChange={(e) => setUserFormData({ ...userFormData, mobile: e.target.value })}
                  disabled={currentView === 'view-user'}
                />
              </div>

              {/* Employee ID */}
              <div className="role-form-group">
                <label>Employee ID</label>
                <input
                  type="text"
                  className="role-input-control"
                  placeholder="e.g. EMP-1042"
                  value={userFormData.employeeId}
                  onChange={(e) => setUserFormData({ ...userFormData, employeeId: e.target.value })}
                  disabled={currentView === 'view-user'}
                />
              </div>

              {/* Designation */}
              <div className="role-form-group">
                <label>Designation</label>
                <input
                  type="text"
                  className="role-input-control"
                  placeholder="e.g. Lead Technical Recruiter"
                  value={userFormData.designation}
                  onChange={(e) => setUserFormData({ ...userFormData, designation: e.target.value })}
                  disabled={currentView === 'view-user'}
                />
              </div>
            </div>

            <div className="inpage-user-grid-3col">
              {/* Department */}
              <div className="role-form-group">
                <label>Department</label>
                <input
                  type="text"
                  className="role-input-control"
                  placeholder="e.g. Talent Acquisition"
                  value={userFormData.department}
                  onChange={(e) => setUserFormData({ ...userFormData, department: e.target.value })}
                  disabled={currentView === 'view-user'}
                />
              </div>

              {/* Branch */}
              <div className="role-form-group">
                <label>Branch / Location</label>
                <input
                  type="text"
                  className="role-input-control"
                  placeholder="e.g. Chennai HQ"
                  value={userFormData.branch}
                  onChange={(e) => setUserFormData({ ...userFormData, branch: e.target.value })}
                  disabled={currentView === 'view-user'}
                />
              </div>

              {/* ASSIGNED ROLE: Chosen from defined system roles! */}
              <div className="role-form-group">
                <label>Assigned System Role *</label>
                <select
                  className="role-input-control"
                  value={userFormData.role}
                  onChange={(e) => setUserFormData({ ...userFormData, role: e.target.value })}
                  disabled={currentView === 'view-user'}
                >
                  {systemRoles.map((r) => (
                    <option key={r.id} value={r.name}>
                      {r.name} ({r.id})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="inpage-user-grid-2col">
              {/* Assigned Jobs */}
              <div className="role-form-group">
                <label>Assigned Jobs Scope</label>
                <input
                  type="text"
                  className="role-input-control"
                  placeholder="e.g. All Company Jobs or Specific Roles"
                  value={userFormData.assignedJobs}
                  onChange={(e) => setUserFormData({ ...userFormData, assignedJobs: e.target.value })}
                  disabled={currentView === 'view-user'}
                />
              </div>

              {/* Account Status */}
              <div className="role-form-group">
                <label>Account Status</label>
                <select
                  className="role-input-control"
                  value={userFormData.status}
                  onChange={(e) => setUserFormData({ ...userFormData, status: e.target.value })}
                  disabled={currentView === 'view-user'}
                >
                  <option value="Active">Active</option>
                  <option value="Invited">Invited</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>
            </div>

            {/* Bottom Form Actions */}
            <div className="inpage-user-footer">
              <button
                type="button"
                className="btn-cancel-user"
                onClick={handleBackToList}
              >
                {currentView === 'view-user' ? 'Back to List' : 'Cancel'}
              </button>
              {currentView !== 'view-user' && (
                <button
                  type="submit"
                  className="btn-save-user"
                >
                  <Save size={16} />
                  <span>Save User Details</span>
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      {/* =====================================================================
         IMAGE 2 MODAL: "Add Role" with ROLE PERMISSIONS MATRIX
         ===================================================================== */}
      {isAddRoleModalOpen && (
        <div className="modal-backdrop-overlay" onClick={handleCloseCreateRole}>
          <div
            className="add-role-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="add-role-modal-header">
              <div>
                <h2 className="add-role-modal-title">Add Role</h2>
                <div className="add-role-modal-subtitle">
                  Create a new user role and configure its permissions
                </div>
              </div>
              <button
                type="button"
                className="btn-close-modal"
                onClick={handleCloseCreateRole}
                title="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleSaveRole}>
              <div className="add-role-modal-body">
                {/* Role Name */}
                <div className="role-form-group">
                  <label>Role Name</label>
                  <input
                    type="text"
                    className="role-input-control"
                    placeholder="Enter role name"
                    value={newRoleForm.name}
                    onChange={(e) => setNewRoleForm({ ...newRoleForm, name: e.target.value })}
                    required
                    autoFocus
                  />
                </div>

                {/* Description */}
                <div className="role-form-group">
                  <label>Description</label>
                  <textarea
                    className="role-textarea-control"
                    placeholder="Describe this role"
                    rows="3"
                    value={newRoleForm.description}
                    onChange={(e) => setNewRoleForm({ ...newRoleForm, description: e.target.value })}
                  />
                </div>

                {/* ROLE PERMISSIONS Banner matching Image 2 */}
                <div className="role-permissions-banner">
                  <Lock size={16} />
                  <span>ROLE PERMISSIONS</span>
                </div>

                {/* Permissions Matrix Table matching Image 2 */}
                <div className="permissions-matrix-wrapper">
                  <table className="permissions-matrix-table">
                    <thead>
                      <tr>
                        <th>MODULE'S</th>
                        <th>
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                            <span>VIEW</span>
                            <div
                              className="perm-circle-checkbox"
                              onClick={() => handleToggleAllColumn('view')}
                              title="Toggle all View"
                            >
                              {Object.values(newRoleForm.permissions).every((m) => m.view) && (
                                <span className="perm-circle-dot"></span>
                              )}
                            </div>
                          </div>
                        </th>
                        <th>
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                            <span>ADD</span>
                            <div
                              className="perm-circle-checkbox"
                              onClick={() => handleToggleAllColumn('add')}
                              title="Toggle all Add"
                            >
                              {Object.values(newRoleForm.permissions).every((m) => m.add) && (
                                <span className="perm-circle-dot"></span>
                              )}
                            </div>
                          </div>
                        </th>
                        <th>
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                            <span>EDIT</span>
                            <div
                              className="perm-circle-checkbox"
                              onClick={() => handleToggleAllColumn('edit')}
                              title="Toggle all Edit"
                            >
                              {Object.values(newRoleForm.permissions).every((m) => m.edit) && (
                                <span className="perm-circle-dot"></span>
                              )}
                            </div>
                          </div>
                        </th>
                        <th>
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                            <span>DELETE</span>
                            <div
                              className="perm-circle-checkbox"
                              onClick={() => handleToggleAllColumn('delete')}
                              title="Toggle all Delete"
                            >
                              {Object.values(newRoleForm.permissions).every((m) => m.delete) && (
                                <span className="perm-circle-dot"></span>
                              )}
                            </div>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(newRoleForm.permissions).map((moduleName) => {
                        const rowPerms = newRoleForm.permissions[moduleName];
                        return (
                          <tr key={moduleName}>
                            <td>{moduleName}</td>
                            <td>
                              <div
                                className={`perm-circle-checkbox ${rowPerms.view ? 'checked' : ''}`}
                                onClick={() => handleTogglePermission(moduleName, 'view')}
                              >
                                {rowPerms.view && <Check size={12} strokeWidth={3} />}
                              </div>
                            </td>
                            <td>
                              <div
                                className={`perm-circle-checkbox ${rowPerms.add ? 'checked' : ''}`}
                                onClick={() => handleTogglePermission(moduleName, 'add')}
                              >
                                {rowPerms.add && <Check size={12} strokeWidth={3} />}
                              </div>
                            </td>
                            <td>
                              <div
                                className={`perm-circle-checkbox ${rowPerms.edit ? 'checked' : ''}`}
                                onClick={() => handleTogglePermission(moduleName, 'edit')}
                              >
                                {rowPerms.edit && <Check size={12} strokeWidth={3} />}
                              </div>
                            </td>
                            <td>
                              <div
                                className={`perm-circle-checkbox ${rowPerms.delete ? 'checked' : ''}`}
                                onClick={() => handleTogglePermission(moduleName, 'delete')}
                              >
                                {rowPerms.delete && <Check size={12} strokeWidth={3} />}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="add-role-modal-footer">
                <button
                  type="button"
                  className="btn-modal-cancel"
                  onClick={handleCloseCreateRole}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-modal-submit"
                >
                  Create Role
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
