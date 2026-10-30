import React, { useState, useEffect, useRef } from 'react';
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
  Users,
  RotateCcw,
  Check,
  MoreHorizontal,
  UserPlus,
  KeyRound,
} from 'lucide-react';
import { Toast } from '../../components/common/Toast/Toast';
import { ConfirmDeleteModal } from '../../components/common/ConfirmDeleteModal';
import { ChangePasswordModal } from '../../components/common/ChangePasswordModal/ChangePasswordModal';
import { FieldError } from '../../components/common/FieldError/FieldError';
import {
  validateEmail,
  validateName,
  validatePhone,
  sanitizeNameInput,
  sanitizePhoneInput,
} from '../../utils/validation';
import './UsersRoles.css';
import { UsersRolesApi } from '../../Api/UserRolesApi';

export const UsersRoles = () => {
  const [userErrors, setUserErrors] = useState({});
  const [roleErrors, setRoleErrors] = useState({});

  // Helper to normalize permissions from backend API response
const parseRolePermissions = (roleObj) => {
  if (!roleObj) return {};
  if (roleObj.permissionsMap && typeof roleObj.permissionsMap === 'object' && Object.keys(roleObj.permissionsMap).length > 0) {
    return roleObj.permissionsMap;
  }
  if (Array.isArray(roleObj.permissions) && roleObj.permissions.length > 0) {
    const map = {};
    roleObj.permissions.forEach((p) => {
      const mod = p.module;
      const modName = (mod && typeof mod === 'object' ? (mod.name || mod.key) : '') || String(mod || 'General');
      if (modName) {
        map[modName] = {
          view: Boolean(p.canView ?? p.view),
          add: Boolean(p.canCreate ?? p.canAdd ?? p.add),
          edit: Boolean(p.canEdit ?? p.edit),
          delete: Boolean(p.canDelete ?? p.delete),
        };
      }
    });
    return map;
  }
  return {};
};

  // 1. Defined System Roles - 100% loaded dynamically from backend API
  const [systemRoles, setSystemRoles] = useState([]);
  const [isRolesLoading, setIsRolesLoading] = useState(false);
  const [viewingPermsLoading, setViewingPermsLoading] = useState(false);
  const [availableModules, setAvailableModules] = useState([
    'Dashboard',
    'Job Management',
    'Candidate Management',
    'Platform Reports',
    'Support',
    'Roles & Permissions',
    'Platform Settings',
    'Audit & Security',
    'Company Details',
    'Company Subscription',
    'Company Usage',
    'Subscription Plans',
    'Payments & Invoices',
    'Masters',
  ]);

  // 2. Users Table Data (Fetched dynamically from backend API)
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // 3. Search, Filter & Pagination UI States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRoleFilter, setSelectedRoleFilter] = useState('All Roles');
  const [activeCardRoleFilter, setActiveCardRoleFilter] = useState(null);
  const [activeCardRoleId, setActiveCardRoleId] = useState(null);
  const [openMenuRoleId, setOpenMenuRoleId] = useState(null);
  const [editingRoleId, setEditingRoleId] = useState(null);
  const [viewingPermsRole, setViewingPermsRole] = useState(null);

  // ─── LOAD USERS FROM BACKEND API WITH FILTERS & PAGINATION ───
  const loadUsers = async (
    page = currentPage,
    search = searchTerm,
    role = activeCardRoleFilter || selectedRoleFilter,
    roleId = activeCardRoleId
  ) => {
    setIsLoading(true);
    try {
      const params = {
        page,
        limit: itemsPerPage,
      };
      if (search && search.trim()) {
        params.search = search.trim();
      }
      const effRole = activeCardRoleFilter || (selectedRoleFilter !== 'All Roles' ? selectedRoleFilter : null);
      if (effRole && effRole !== 'All Roles') {
        params.role = effRole;
      }
      if (roleId) {
        params.roleId = roleId;
      }

      const res = await UsersRolesApi.getUsers(params);
      let usersList = [];
      if (Array.isArray(res?.data)) {
        usersList = res.data;
      } else if (Array.isArray(res?.data?.users)) {
        usersList = res.data.users;
      } else if (Array.isArray(res?.users)) {
        usersList = res.users;
      } else if (Array.isArray(res)) {
        usersList = res;
      }

      const normalized = usersList.map((u) => {
        const roleNameFromObj = typeof u.role === 'object' ? (u.role?.roleName || u.role?.name) : null;
        const resolvedRoleName =
          u.roleName ||
          roleNameFromObj ||
          (typeof u.role === 'string' && !/^[0-9a-fA-F]{24}$/.test(u.role) ? u.role : '') ||
          'Super Admin';

        return {
          userId: u.userId || u.employeeId || u._id || u.id,
          _id: u._id || u.id,
          employeeName: u.employeeName || u.name || u.fullName || '',
          email: u.email || u.workEmail || '',
          mobile: u.mobile || u.workMobile || u.phoneNumber || '',
          employeeId: u.employeeId || '',
          designation: u.designation || '',
          department: u.department || '',
          branch: u.branch || u.branchName || '',
          role: resolvedRoleName,
          roleName: resolvedRoleName,
          roleId: u.roleId || (typeof u.role === 'object' ? u.role?._id : '') || '',
          assignedJobs: u.assignedJobs || u.assignedJobsScope || '',
          status: u.status || (u.isActive ? 'Active' : 'Inactive'),
          lastLogin: u.lastLogin || 'Pending First Login',
        };
      });
      setUsers(normalized);

      // Pagination metadata from backend response
      const paginationMeta = res?.pagination || res?.data?.pagination;
      if (paginationMeta) {
        setTotalUsers(paginationMeta.total ?? normalized.length);
        setTotalPages(paginationMeta.totalPages ?? (Math.ceil((paginationMeta.total || normalized.length) / itemsPerPage) || 1));
      } else {
        const tot = res?.total ?? normalized.length;
        setTotalUsers(tot);
        setTotalPages(Math.ceil(tot / itemsPerPage) || 1);
      }
    } catch (err) {
      console.error('Failed to load users from API:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const loadRoles = async () => {
    try {
      setIsRolesLoading(true);
      const res = await UsersRolesApi.getRoles();
      const rolesList = Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : [];
      if (rolesList.length > 0) {
        const modSet = new Set();
        const mappedRoles = rolesList.map((r, idx) => {
          const perms = parseRolePermissions(r);
          Object.keys(perms).forEach((m) => modSet.add(m));
          const rawName = r.roleName || r.name || 'Custom Role';
          const rName =
            typeof rawName === 'string'
              ? rawName
                  .replace(/^\[?ROLE[_-]?\d+\]?[\s:-]+/i, '')
                  .replace(/[\s:-]+\(?ROLE[_-]?\d+\)?$/i, '')
                  .trim() || rawName
              : 'Custom Role';
          return {
            id: r.code || `ROLE-0${idx + 1}`,
            code: r.code || getRoleCode(r),
            roleId: r.roleId || r._id || r.id,
            _id: r._id || r.id,
            name: rName,
            description: r.description || `${rName} operational access role.`,
            chips: r.chips || (r.code === 'SUPER_ADMIN' || rName === 'Super Admin' ? ['Full Access'] : ['View', 'Edit']),
            permissions: perms,
            rawPermissions: r.permissions || [],
            memberCount: typeof r.memberCount === 'number' ? r.memberCount : (r.totalMembers || 0),
            totalMembers: typeof r.totalMembers === 'number' ? r.totalMembers : (r.memberCount || 0),
          };
        });

        if (modSet.size > 0) {
          setAvailableModules(Array.from(modSet));
        }

        setSystemRoles(mappedRoles);
      }
    } catch (err) {
      console.error('Failed to load roles from API:', err);
    } finally {
      setIsRolesLoading(false);
    }
  };

  useEffect(() => {
    loadRoles();
  }, []);

  // Live Server-side Query whenever page, search term, or role filter changes (debounced 300ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      loadUsers(currentPage, searchTerm, activeCardRoleFilter || selectedRoleFilter, activeCardRoleId);
    }, 300);

    return () => clearTimeout(timer);
  }, [currentPage, searchTerm, selectedRoleFilter, activeCardRoleFilter, activeCardRoleId]);

  const rolesScrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasMovedRef = useRef(false);

  const scrollRoles = (direction) => {
    if (rolesScrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      rolesScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleMouseDown = (e) => {
    if (e.button !== 0 || !rolesScrollRef.current) return;
    isDownRef.current = true;
    hasMovedRef.current = false;
    startXRef.current = e.pageX - rolesScrollRef.current.offsetLeft;
    scrollLeftRef.current = rolesScrollRef.current.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (!isDownRef.current || !rolesScrollRef.current) return;
    const x = e.pageX - rolesScrollRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.4;
    if (Math.abs(x - startXRef.current) > 6) {
      hasMovedRef.current = true;
      if (!isDragging) setIsDragging(true);
      e.preventDefault();
      rolesScrollRef.current.scrollLeft = scrollLeftRef.current - walk;
    }
  };

  const handleMouseUpOrLeave = () => {
    isDownRef.current = false;
    if (isDragging) {
      setTimeout(() => {
        hasMovedRef.current = false;
        setIsDragging(false);
      }, 50);
    } else {
      hasMovedRef.current = false;
      setIsDragging(false);
    }
  };

  // Open Permissions Modal with LIVE backend response
  const handleOpenPermissionsModal = async (e, role) => {
    if (e && e.stopPropagation) e.stopPropagation();
    // Open immediately with parsed role permissions from API list
    setViewingPermsRole(role);
    setViewingPermsLoading(true);

    const rId = role.roleId || role._id || role.id;
    if (rId) {
      try {
        const res = await UsersRolesApi.getRoleById(rId);
        const roleData = res?.data || (res?.success ? res : null);
        if (roleData) {
          const freshPerms = parseRolePermissions(roleData);
          setViewingPermsRole((current) => ({
            ...current,
            ...roleData,
            name: roleData.roleName || roleData.name || role.name,
            code: roleData.code || role.code,
            permissions: freshPerms,
            rawPermissions: roleData.permissions || [],
          }));
        }
      } catch (err) {
        console.error('Failed to fetch role permissions from backend:', err);
      } finally {
        setViewingPermsLoading(false);
      }
    } else {
      setViewingPermsLoading(false);
    }
  };

  // Close role three-dots menu when clicking outside
  useEffect(() => {
    const handleOutsideClick = () => setOpenMenuRoleId(null);
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  const getRoleCode = (role) => {
    if (!role) return 'ROLE';
    if (role.code && !/^[0-9a-fA-F]{24}$/.test(role.code)) return role.code;
    const name = role.name || role.roleName || '';
    return name.toUpperCase().trim().replace(/[^A-Z0-9]+/g, '_') || 'ROLE';
  };

  const getRoleUserCount = (role) => {
    if (!role) return 0;
    if (typeof role.memberCount === 'number') return role.memberCount;
    if (typeof role.totalMembers === 'number') return role.totalMembers;
    return 0;
  };

  // Views: 'list' | 'add-user' | 'edit-user' | 'view-user'
  const [currentView, setCurrentView] = useState('list');
  const [editingUserId, setEditingUserId] = useState(null);

  // Add Role Form State (In-Page View)
  const getFreshNewRolePermissions = () => {
    const perms = {};
    availableModules.forEach((m) => {
      perms[m] = { view: true, add: false, edit: false, delete: false };
    });
    return perms;
  };

  const initialNewRoleState = {
    name: '',
    description: '',
    permissions: getFreshNewRolePermissions(),
  };
  const [newRoleForm, setNewRoleForm] = useState(initialNewRoleState);

  // Add / Edit User Form State - ensure all fields are blank for new user creation
  const initialUserFormData = {
    userId: '',
    employeeName: '',
    email: '',
    mobile: '',
    employeeId: '',
    designation: '',
    department: '',
    branch: '',
    role: '',
    assignedJobs: '',
    status: 'Active',
    lastLogin: 'Pending First Login',
  };
  const [userFormData, setUserFormData] = useState(initialUserFormData);


  // Toast Notification State
  const [toast, setToast] = useState(null); // { message: string, type: 'success' | 'delete' | 'info' | 'warning' }

  // Custom Modern Delete Confirmation Modal State
  const [deleteConfirm, setDeleteConfirm] = useState({
    isOpen: false,
    type: null, // 'user' | 'role'
    id: null,
    name: '',
    roleObj: null,
    isLoading: false,
  });

  // Change Password Modal State
  const [changePasswordModal, setChangePasswordModal] = useState({
    isOpen: false,
    user: null,
    isLoading: false,
  });

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const handleOpenChangeUserPassword = (user) => {
    setChangePasswordModal({
      isOpen: true,
      user,
      isLoading: false,
    });
  };

  const handleSaveUserPassword = async ({ newPassword }) => {
    if (!changePasswordModal.user) return;
    setChangePasswordModal((prev) => ({ ...prev, isLoading: true }));
    try {
      const userId = changePasswordModal.user._id || changePasswordModal.user.userId;
      const res = await UsersRolesApi.updateUser(userId, { password: newPassword });
      if (res && (res.success || res.status === 'success' || res.data)) {
        showToast(`Password updated successfully for ${changePasswordModal.user.employeeName || 'user'}.`, 'success');
        setChangePasswordModal({ isOpen: false, user: null, isLoading: false });
      } else {
        showToast(res?.message || 'Failed to update user password.', 'error');
        setChangePasswordModal((prev) => ({ ...prev, isLoading: false }));
      }
    } catch (err) {
      console.error('Password change error:', err);
      showToast('An unexpected error occurred while updating password.', 'error');
      setChangePasswordModal((prev) => ({ ...prev, isLoading: false }));
    }
  };

  // Open In-Page "Add Role" View (Hides table, shows Add Role form)
  const handleOpenCreateRole = () => {
    setEditingRoleId(null);
    setNewRoleForm(initialNewRoleState);
    setRoleErrors({});
    setCurrentView('add-role');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenEditRole = (e, role) => {
    if (e && e.stopPropagation) e.stopPropagation();
    setOpenMenuRoleId(null);
    setEditingRoleId(role.roleId || role._id || role.id);
    setNewRoleForm({
      name: role.name || '',
      description: role.description || '',
      permissions: role.permissions || initialNewRoleState.permissions,
    });
    setRoleErrors({});
    setCurrentView('edit-role');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteRole = (e, role) => {
    if (e && e.stopPropagation) e.stopPropagation();
    setOpenMenuRoleId(null);
    setDeleteConfirm({
      isOpen: true,
      type: 'role',
      id: role.roleId || role._id || role.id,
      name: role.name,
      roleObj: role,
      isLoading: false,
    });
  };

  // Toggle single permission circle in matrix
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

  // Presets: Select All, View Only, Clear All
  const handlePresetSelectAll = () => {
    setNewRoleForm((prev) => {
      const updated = {};
      Object.keys(prev.permissions).forEach((mod) => {
        updated[mod] = { view: true, add: true, edit: true, delete: true };
      });
      return { ...prev, permissions: updated };
    });
  };

  const handlePresetViewOnly = () => {
    setNewRoleForm((prev) => {
      const updated = {};
      Object.keys(prev.permissions).forEach((mod) => {
        updated[mod] = { view: true, add: false, edit: false, delete: false };
      });
      return { ...prev, permissions: updated };
    });
  };

  const handlePresetClearAll = () => {
    setNewRoleForm((prev) => {
      const updated = {};
      Object.keys(prev.permissions).forEach((mod) => {
        updated[mod] = { view: false, add: false, edit: false, delete: false };
      });
      return { ...prev, permissions: updated };
    });
  };

  // Save new role or update existing role from in-page view
  const handleSaveRole = async (e) => {
    e.preventDefault();
    const roleNameErr = validateName(newRoleForm.name, 'Role name', true);
    if (roleNameErr) {
      setRoleErrors({ name: roleNameErr });
      return;
    }
    setRoleErrors({});

    const rolePayload = {
      roleName: newRoleForm.name.trim(),
      description: newRoleForm.description.trim() || 'Custom configured operational access role.',
      permissions: newRoleForm.permissions,
    };

    try {
      let res;
      if (editingRoleId) {
        res = await UsersRolesApi.updateRole(editingRoleId, rolePayload);
      } else {
        res = await UsersRolesApi.createRole(rolePayload);
      }
      if (res && res.success) {
        const backendMsg = res.message || res.data?.message || (editingRoleId ? 'Role updated successfully' : 'Role created successfully');
        showToast(backendMsg, 'success');
        await loadRoles();
        setEditingRoleId(null);
        setCurrentView('list');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const errMsg = res?.message || res?.data?.message || 'Failed to save role';
        showToast(errMsg, 'error');
      }
    } catch (err) {
      console.error('Failed to save role:', err);
      const errMsg = err.response?.data?.message || err.message || 'Failed to save role';
      showToast(errMsg, 'error');
    }
  };

  // User In-Page Form Handlers - ensure no user details are auto-filled
  const handleOpenAddUser = (presetRole = null) => {
    // Only pre-assign the specific role if requested (e.g. adding a user under a role)
    const roleToAssign =
      typeof presetRole === 'string' && presetRole.trim()
        ? presetRole.trim()
        : (presetRole && !presetRole.nativeEvent && (presetRole.name || presetRole.roleName))
          ? (presetRole.name || presetRole.roleName)
          : (systemRoles[0]?.name || '');

    setUserFormData({
      ...initialUserFormData,
      userId: '',
      employeeName: '',
      email: '',
      mobile: '',
      employeeId: '',
      designation: '',
      department: '',
      branch: '',
      role: roleToAssign,
      assignedJobs: '',
      status: 'Active',
      lastLogin: 'Pending First Login',
    });
    setUserErrors({});
    setEditingUserId(null);
    setCurrentView('add-user');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRoleMenuAddUser = (e, role) => {
    if (e && e.stopPropagation) e.stopPropagation();
    setOpenMenuRoleId(null);
    const roleName = role?.name || role?.roleName || (typeof role === 'string' ? role : '');
    handleOpenAddUser(roleName);
  };

  const handleOpenEditUser = (user) => {
    setUserFormData({ ...user });
    setUserErrors({});
    setEditingUserId(user._id || user.userId);
    setCurrentView('edit-user');
  };

  const handleOpenViewUser = (user) => {
    setUserFormData({ ...user });
    setUserErrors({});
    setEditingUserId(user.userId);
    setCurrentView('view-user');
  };

  const handleBackToList = () => {
    setUserErrors({});
    setRoleErrors({});
    setCurrentView('list');
    setEditingUserId(null);
    setEditingRoleId(null);
  };

  const handleSaveUser = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const errors = {};

    const nameErr = validateName(userFormData.employeeName, 'Full name', true);
    if (nameErr) errors.employeeName = nameErr;

    const emailErr = validateEmail(userFormData.email, 'Email', true);
    if (emailErr) errors.email = emailErr;

    if (userFormData.mobile && userFormData.mobile.trim()) {
      const mobileErr = validatePhone(userFormData.mobile, 'Work mobile', false);
      if (mobileErr) errors.mobile = mobileErr;
    }

    if (!userFormData.role || !userFormData.role.trim()) {
      errors.role = 'Please select a role for this user';
    }

    if (Object.keys(errors).length > 0) {
      setUserErrors(errors);
      window.scrollTo({ top: 120, behavior: 'smooth' });
      return;
    }

    setUserErrors({});

    const payload = {
      fullName: userFormData.employeeName,
      workEmail: userFormData.email,
      workMobile: userFormData.mobile,
      employeeId: userFormData.employeeId,
      designation: userFormData.designation,
      department: userFormData.department,
      branch: userFormData.branch,
      role: userFormData.role,
      assignedJobsScope: userFormData.assignedJobs,
      status: userFormData.status,
    };

    try {
      if (editingUserId) {
        const res = await UsersRolesApi.updateUser(editingUserId, payload);
        if (res && res.success) {
          const backendMsg = res.message || res.data?.message || 'User updated successfully';
          showToast(backendMsg, 'success');
          await Promise.all([loadUsers(), loadRoles()]);
          setCurrentView('list');
          setEditingUserId(null);
        } else {
          const errMsg = res?.message || res?.data?.message || 'Failed to update user';
          showToast(errMsg, 'error');
        }
      } else {
        const res = await UsersRolesApi.createUser(payload);
        if (res && res.success) {
          const backendMsg = res.message || res.data?.message || 'User created successfully';
          showToast(backendMsg, 'success');
          await Promise.all([loadUsers(), loadRoles()]);
          setCurrentView('list');
          setEditingUserId(null);
        } else {
          const errMsg = res?.message || res?.data?.message || 'Failed to create user';
          showToast(errMsg, 'error');
        }
      }
    } catch (error) {
      console.error('Error saving user:', error);
      const errMsg = error.response?.data?.message || error.message || 'Failed to save user';
      showToast(errMsg, 'error');
    }
  };

  const handleDeleteUser = (userId, name) => {
    setDeleteConfirm({
      isOpen: true,
      type: 'user',
      id: userId,
      name: name,
      roleObj: null,
      isLoading: false,
    });
  };

  const handleConfirmDelete = async () => {
    if (!deleteConfirm.id) return;
    setDeleteConfirm((prev) => ({ ...prev, isLoading: true }));

    if (deleteConfirm.type === 'user') {
      try {
        const res = await UsersRolesApi.deleteUser(deleteConfirm.id);
        if (res && res.success) {
          const backendMsg = res.message || res.data?.message || 'User deleted successfully';
          showToast(backendMsg, 'delete');
          await Promise.all([loadUsers(), loadRoles()]);
        } else {
          const errMsg = res?.message || res?.data?.message || 'Failed to delete user';
          showToast(errMsg, 'error');
        }
      } catch (apiErr) {
        console.error('Backend delete failed:', apiErr);
        const errMsg = apiErr.response?.data?.message || apiErr.message || 'Failed to delete user';
        showToast(errMsg, 'error');
      } finally {
        setDeleteConfirm({ isOpen: false, type: null, id: null, name: '', roleObj: null, isLoading: false });
      }
    } else if (deleteConfirm.type === 'role') {
      const rId = deleteConfirm.id;
      const role = deleteConfirm.roleObj;
      try {
        const res = await UsersRolesApi.deleteRole(rId);
        if (res && res.success) {
          const backendMsg = res.message || res.data?.message || 'Role deleted successfully';
          showToast(backendMsg, 'delete');
          await loadRoles();
          if (activeCardRoleId === rId || (role && activeCardRoleFilter === role.name)) {
            setActiveCardRoleFilter(null);
            setActiveCardRoleId(null);
            setSelectedRoleFilter('All Roles');
          }
        } else {
          const errMsg = res?.message || res?.data?.message || 'Failed to delete role';
          showToast(errMsg, 'error');
        }
      } catch (err) {
        console.error('Failed to delete role:', err);
        const errMsg = err.response?.data?.message || err.message || 'Failed to delete role';
        showToast(errMsg, 'error');
      } finally {
        setDeleteConfirm({ isOpen: false, type: null, id: null, name: '', roleObj: null, isLoading: false });
      }
    }
  };

  // Users list and pagination are driven directly by backend API response
  const filteredUsers = users;
  const paginatedUsers = users;

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
      {/* Floating Animated Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          duration={3500}
          onClose={() => setToast(null)}
        />
      )}

      {/* Custom Modern Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={deleteConfirm.isOpen}
        title="Confirm Delete"
        message={
          deleteConfirm.type === 'user'
            ? deleteConfirm.name
              ? `Are you sure you want to delete user "${deleteConfirm.name}"? This action cannot be undone.`
              : 'Are you sure you want to delete this user? This action cannot be undone.'
            : deleteConfirm.name
              ? `Are you sure you want to delete role "${deleteConfirm.name}"? This action cannot be undone.`
              : 'Are you sure you want to delete this role? This action cannot be undone.'
        }
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={deleteConfirm.isLoading}
        onConfirm={handleConfirmDelete}
        onCancel={() =>
          setDeleteConfirm({ isOpen: false, type: null, id: null, name: '', roleObj: null, isLoading: false })
        }
      />

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={changePasswordModal.isOpen}
        targetTitle={changePasswordModal.user?.employeeName || changePasswordModal.user?.userId}
        targetType="User Account"
        isLoading={changePasswordModal.isLoading}
        onClose={() => setChangePasswordModal((prev) => ({ ...prev, isOpen: false, isLoading: false }))}
        onSubmit={handleSaveUserPassword}
      />

      {/* Header */}
      <div className="users-page-header">
        <div className="users-header-left">
          <h1 className="users-page-title">
            {currentView === 'add-role'
              ? 'Add Role'
              : currentView === 'edit-role'
                ? 'Edit Role'
                : currentView === 'add-user'
                  ? 'Add User'
                  : currentView === 'edit-user'
                    ? 'Edit User'
                    : currentView === 'view-user'
                      ? 'User Details'
                      : 'Roles & Permissions'}
          </h1>
        </div>

        {currentView === 'list' ? (
          <div className="users-header-actions">
            {/* 1. SEPARATE "Create Role" BUTTON */}
            <button
              type="button"
              className="btn-create-role-header"
              onClick={handleOpenCreateRole}
              id="btn-create-role"
            >
              <Shield size={16} />
              <span>Create Role</span>
            </button>

            {/* 2. "Add User" BUTTON */}
            <button
              type="button"
              className="btn-add-user-header"
              onClick={() => handleOpenAddUser(null)}
              id="btn-add-user"
            >
              <Plus size={16} />
              <span>Add User</span>
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="btn-back-to-list"
            onClick={handleBackToList}
            title="Back to Users & Roles"
          >
            <ArrowLeft size={16} />
            <span>Back to Users & Roles</span>
          </button>
        )}
      </div>

      {currentView === 'list' && (
        <>
          {/* =====================================================================
             SECTION: Defined System Roles (Compact, Clean Minimal UI)
             ===================================================================== */}
          <div className="defined-roles-card">
            <div className="defined-roles-header">
              <div className="defined-roles-title-box">
                <ShieldCheck size={16} />
                <span className="defined-roles-title">
                  Defined System Roles ({systemRoles.length})
                </span>
              </div>

              <div className="defined-roles-header-actions">
                {activeCardRoleFilter && (
                  <button
                    type="button"
                    className="btn-clear-role-filter"
                    onClick={() => {
                      setActiveCardRoleFilter(null);
                      setActiveCardRoleId(null);
                      setSelectedRoleFilter('All Roles');
                      setCurrentPage(1);
                    }}
                    title="Clear role filter"
                  >
                    <RotateCcw size={11} />
                    <span>Filtered: <strong>{activeCardRoleFilter}</strong> (Reset)</span>
                  </button>
                )}

                {systemRoles.length > 3 && (
                  <div className="roles-scroll-arrows">
                    <button
                      type="button"
                      className="btn-role-scroll"
                      onClick={() => scrollRoles('left')}
                      title="Scroll Left"
                      aria-label="Scroll Left"
                    >
                      <ChevronLeft size={14} />
                    </button>
                    <button
                      type="button"
                      className="btn-role-scroll"
                      onClick={() => scrollRoles('right')}
                      title="Scroll Right"
                      aria-label="Scroll Right"
                    >
                      <ChevronRight size={14} />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Roles Cards Grid - Horizontal Single Row with Click & Drag to Scroll */}
            <div
              className={`roles-cards-grid ${isDragging ? 'is-dragging' : ''}`}
              ref={rolesScrollRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUpOrLeave}
              onMouseLeave={handleMouseUpOrLeave}
            >
              {systemRoles.map((role) => {
                const cardKey = role.roleId || role._id || role.id || role.name;
                const isSelected =
                  activeCardRoleFilter &&
                  activeCardRoleFilter.toLowerCase() === role.name.toLowerCase();
                const userCount = getRoleUserCount(role);
                const isMenuOpen = openMenuRoleId === cardKey;

                return (
                  <div
                    key={cardKey}
                    className={`role-system-card ${isSelected ? 'active-filter' : ''}`}
                    onClick={() => {
                      if (hasMovedRef.current) return;
                      if (isSelected) {
                        setActiveCardRoleFilter(null);
                        setActiveCardRoleId(null);
                        setSelectedRoleFilter('All Roles');
                      } else {
                        setActiveCardRoleFilter(role.name);
                        setActiveCardRoleId(role.roleId || role._id || role.id);
                        setSelectedRoleFilter(role.name);
                      }
                      setCurrentPage(1);
                    }}
                    title={`Filter by ${role.name}`}
                  >
                    {/* Top Row: Name on Left, Three Dots Menu on Right */}
                    <div className="role-card-top-row">
                      <span className="role-card-name" title={role.name}>
                        {role.name}
                      </span>
                      <div className="role-menu-container">
                        <button
                          type="button"
                          className="role-menu-dots-btn"
                          title="Role options"
                          aria-label="Role options"
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenMenuRoleId(isMenuOpen ? null : cardKey);
                          }}
                        >
                          <MoreHorizontal size={16} />
                        </button>

                        {isMenuOpen && (
                          <div
                            className="role-dropdown-menu"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button
                              type="button"
                              className="role-dropdown-item"
                              onClick={(e) => handleRoleMenuAddUser(e, role)}
                            >
                              <UserPlus size={15} color="#2563eb" />
                              <span>Add User</span>
                            </button>
                            <button
                              type="button"
                              className="role-dropdown-item"
                              onClick={(e) => handleOpenEditRole(e, role)}
                            >
                              <Edit2 size={15} color="#475569" />
                              <span>Edit</span>
                            </button>
                            <button
                              type="button"
                              className="role-dropdown-item delete"
                              onClick={(e) => handleDeleteRole(e, role)}
                            >
                              <Trash2 size={15} color="#ef4444" />
                              <span>Delete</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="role-card-divider" />

                    {/* Bottom Row: User count pill on left, Permissions button on right */}
                    <div className="role-card-bottom-row">
                      <span className="role-user-count-pill">
                        {userCount} {userCount === 1 ? 'User' : 'Users'}
                      </span>
                      <button
                        type="button"
                        className="btn-role-permissions"
                        onClick={(e) => handleOpenPermissionsModal(e, role)}
                        title={`View permissions for ${role.name}`}
                      >
                        Permissions
                      </button>
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
                  placeholder="Search..."
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
                  const val = e.target.value;
                  setSelectedRoleFilter(val);
                  if (val === 'All Roles') {
                    setActiveCardRoleFilter(null);
                    setActiveCardRoleId(null);
                  } else {
                    setActiveCardRoleFilter(val);
                    const matched = systemRoles.find((r) => r.name.toLowerCase() === val.toLowerCase());
                    setActiveCardRoleId(matched ? (matched.roleId || matched._id || matched.id) : null);
                  }
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
                    <th style={{ textAlign: 'center', width: '150px' }}>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan="7" style={{ textAlign: 'center', padding: '2.5rem', color: '#64748b' }}>
                        Loading users from server...
                      </td>
                    </tr>
                  ) : paginatedUsers.length > 0 ? (
                    paginatedUsers.map((user, index) => {
                      const serialNumber = (currentPage - 1) * itemsPerPage + index + 1;
                      return (
                        <tr key={user.userId || user._id || index}>
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
                            <span className={`user-status-pill ${(user.status || 'Active').toLowerCase()}`}>
                              <span className="user-status-dot"></span>
                              <span>{user.status || 'Active'}</span>
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
                                className="action-btn-circle password"
                                title="Change Password"
                                onClick={() => handleOpenChangeUserPassword(user)}
                              >
                                <KeyRound size={15} />
                              </button>
                              <button
                                type="button"
                                className="action-btn-circle delete"
                                title="Delete User"
                                onClick={() => handleDeleteUser(user._id || user.userId, user.employeeName)}
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
                Showing {totalUsers > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{' '}
                {Math.min(currentPage * itemsPerPage, totalUsers)} of{' '}
                {totalUsers} users
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
      )}

      {/* =====================================================================
         VIEW 2: DEDICATED IN-PAGE "ADD / EDIT ROLE" VIEW (Table & Cards are Hidden!)
         ===================================================================== */}
      {(currentView === 'add-role' || currentView === 'edit-role') && (
        <div className="inpage-role-card">
          <form onSubmit={handleSaveRole} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Role Details */}
            <div className="role-details-grid">
              <div className="role-form-group">
                <label>Role Name *</label>
                <input
                  type="text"
                  className={`role-input-control ${roleErrors.name ? 'has-error' : ''}`}
                  placeholder="Enter role name (letters only)"
                  value={newRoleForm.name}
                  onChange={(e) => {
                    const clean = sanitizeNameInput(e.target.value);
                    setNewRoleForm({ ...newRoleForm, name: clean });
                    if (roleErrors.name) setRoleErrors({});
                  }}
                  autoFocus
                />
                <FieldError error={roleErrors.name} />
              </div>

              <div className="role-form-group">
                <label>Description</label>
                <textarea
                  className="role-textarea-control"
                  placeholder="Describe this role and its responsibilities..."
                  rows="2"
                  value={newRoleForm.description}
                  onChange={(e) => setNewRoleForm({ ...newRoleForm, description: e.target.value })}
                />
              </div>
            </div>

            {/* Section Banner with Presets */}
            <div className="role-section-banner">
              <div className="role-section-banner-left">
                <Lock size={16} />
                <span>ROLE PERMISSIONS MATRIX</span>
              </div>
              <div className="role-preset-actions">
                <button
                  type="button"
                  className="role-preset-btn"
                  onClick={handlePresetSelectAll}
                  title="Select all View, Add, Edit, Delete permissions"
                >
                  Select All
                </button>
                <button
                  type="button"
                  className="role-preset-btn"
                  onClick={handlePresetViewOnly}
                  title="Set View only for all modules"
                >
                  View Only
                </button>
                <button
                  type="button"
                  className="role-preset-btn"
                  onClick={handlePresetClearAll}
                  title="Deselect all permissions"
                >
                  Clear All
                </button>
              </div>
            </div>

            {/* Permissions Matrix Full Table */}
            <div className="inpage-permissions-wrapper">
              <table className="inpage-permissions-table">
                <thead>
                  <tr>
                    <th>MODULE'S</th>
                    <th>
                      <div
                        className="perm-th-col"
                        onClick={() => handleToggleAllColumn('view')}
                        title="Click to toggle all VIEW permissions"
                      >
                        <span>VIEW</span>
                        <div className="perm-circle-checkbox">
                          {Object.values(newRoleForm.permissions).every((m) => m.view) && (
                            <span className="perm-circle-dot" />
                          )}
                        </div>
                      </div>
                    </th>
                    <th>
                      <div
                        className="perm-th-col"
                        onClick={() => handleToggleAllColumn('add')}
                        title="Click to toggle all ADD permissions"
                      >
                        <span>ADD</span>
                        <div className="perm-circle-checkbox">
                          {Object.values(newRoleForm.permissions).every((m) => m.add) && (
                            <span className="perm-circle-dot" />
                          )}
                        </div>
                      </div>
                    </th>
                    <th>
                      <div
                        className="perm-th-col"
                        onClick={() => handleToggleAllColumn('edit')}
                        title="Click to toggle all EDIT permissions"
                      >
                        <span>EDIT</span>
                        <div className="perm-circle-checkbox">
                          {Object.values(newRoleForm.permissions).every((m) => m.edit) && (
                            <span className="perm-circle-dot" />
                          )}
                        </div>
                      </div>
                    </th>
                    <th>
                      <div
                        className="perm-th-col"
                        onClick={() => handleToggleAllColumn('delete')}
                        title="Click to toggle all DELETE permissions"
                      >
                        <span>DELETE</span>
                        <div className="perm-circle-checkbox">
                          {Object.values(newRoleForm.permissions).every((m) => m.delete) && (
                            <span className="perm-circle-dot" />
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
                            {rowPerms.view && <Check size={13} strokeWidth={3} />}
                          </div>
                        </td>
                        <td>
                          <div
                            className={`perm-circle-checkbox ${rowPerms.add ? 'checked' : ''}`}
                            onClick={() => handleTogglePermission(moduleName, 'add')}
                          >
                            {rowPerms.add && <Check size={13} strokeWidth={3} />}
                          </div>
                        </td>
                        <td>
                          <div
                            className={`perm-circle-checkbox ${rowPerms.edit ? 'checked' : ''}`}
                            onClick={() => handleTogglePermission(moduleName, 'edit')}
                          >
                            {rowPerms.edit && <Check size={13} strokeWidth={3} />}
                          </div>
                        </td>
                        <td>
                          <div
                            className={`perm-circle-checkbox ${rowPerms.delete ? 'checked' : ''}`}
                            onClick={() => handleTogglePermission(moduleName, 'delete')}
                          >
                            {rowPerms.delete && <Check size={13} strokeWidth={3} />}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Bottom Actions */}
            <div className="inpage-role-footer">
              <button
                type="button"
                className="btn-role-cancel"
                onClick={handleBackToList}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-role-submit"
              >
                <Shield size={16} />
                <span>{editingRoleId ? 'Update Role' : 'Create Role'}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* =====================================================================
         VIEW 3: IN-PAGE USER ADD / EDIT / VIEW FORM
         ===================================================================== */}
      {(currentView === 'add-user' || currentView === 'edit-user' || currentView === 'view-user') && (
        <div className="inpage-user-form-card">
          <div className="inpage-user-section-banner">
            {currentView === 'add-user'
              ? 'ADD NEW COMPANY USER'
              : currentView === 'edit-user'
                ? `EDIT USER: ${userFormData.employeeName} (${userFormData.userId})`
                : `VIEW USER PROFILE: ${userFormData.employeeName} (${userFormData.userId})`}
          </div>

          <form onSubmit={handleSaveUser} noValidate autoComplete="off" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className="inpage-user-grid-3col">
              {/* User ID */}
              <div className="role-form-group">
                <label>User ID</label>
                <input
                  type="text"
                  className="role-input-control"
                  style={{ background: '#f8fafc' }}
                  value={userFormData.userId}
                  placeholder={currentView === 'add-user' ? 'Auto-generated on save' : ''}
                  readOnly
                />
              </div>

              {/* Full Name */}
              <div className="role-form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  autoComplete="off"
                  className={`role-input-control ${userErrors.employeeName ? 'has-error' : ''}`}
                  placeholder="e.g. Saravanan S (letters only)"
                  value={userFormData.employeeName}
                  onChange={(e) => {
                    const clean = sanitizeNameInput(e.target.value);
                    setUserFormData({ ...userFormData, employeeName: clean });
                    if (userErrors.employeeName) setUserErrors((prev) => ({ ...prev, employeeName: null }));
                  }}
                  disabled={currentView === 'view-user'}
                />
                <FieldError error={userErrors.employeeName} />
              </div>

              {/* Email */}
              <div className="role-form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  autoComplete="off"
                  className={`role-input-control ${userErrors.email ? 'has-error' : ''}`}
                  placeholder="e.g. saravanan.admin@company.com"
                  value={userFormData.email}
                  onChange={(e) => {
                    setUserFormData({ ...userFormData, email: e.target.value });
                    if (userErrors.email) setUserErrors((prev) => ({ ...prev, email: null }));
                  }}
                  disabled={currentView === 'view-user'}
                />
                <FieldError error={userErrors.email} />
              </div>
            </div>

            <div className="inpage-user-grid-2col">
              {/* Mobile */}
              <div className="role-form-group">
                <label>Work Mobile</label>
                <input
                  type="text"
                  name="mobile"
                  autoComplete="off"
                  className={`role-input-control ${userErrors.mobile ? 'has-error' : ''}`}
                  placeholder="e.g. +91 98401 23456 (digits only)"
                  value={userFormData.mobile}
                  onChange={(e) => {
                    const clean = sanitizePhoneInput(e.target.value);
                    setUserFormData({ ...userFormData, mobile: clean });
                    if (userErrors.mobile) setUserErrors((prev) => ({ ...prev, mobile: null }));
                  }}
                  disabled={currentView === 'view-user'}
                />
                <FieldError error={userErrors.mobile} />
              </div>

              {/* Designation */}
              <div className="role-form-group">
                <label>Designation</label>
                <input
                  type="text"
                  name="designation"
                  autoComplete="off"
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
                  name="department"
                  autoComplete="off"
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
                  name="branch"
                  autoComplete="off"
                  className="role-input-control"
                  placeholder="e.g. Chennai HQ"
                  value={userFormData.branch}
                  onChange={(e) => setUserFormData({ ...userFormData, branch: e.target.value })}
                  disabled={currentView === 'view-user'}
                />
              </div>

              {/* ROLE: Chosen from defined system roles! */}
              <div className="role-form-group">
                <label>Role *</label>
                <select
                  className={`role-input-control ${userErrors.role ? 'has-error' : ''}`}
                  value={userFormData.role}
                  onChange={(e) => {
                    setUserFormData({ ...userFormData, role: e.target.value });
                    if (userErrors.role) setUserErrors((prev) => ({ ...prev, role: null }));
                  }}
                  disabled={currentView === 'view-user'}
                >
                  {!userFormData.role && <option value="">Select a role</option>}
                  {systemRoles.map((r) => (
                    <option key={r.id || r._id || r.name} value={r.name}>
                      {r.name}
                    </option>
                  ))}
                </select>
                <FieldError error={userErrors.role} />
              </div>
            </div>

            <div className="inpage-user-grid-2col">
              {/* Assigned Jobs */}
              <div className="role-form-group">
                <label>Assigned Jobs Scope</label>
                <input
                  type="text"
                  name="assignedJobs"
                  autoComplete="off"
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
                  <span>Save User Details</span>
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      {/* =====================================================================
         MODAL: VIEW ROLE PERMISSIONS (Triggered by "Permissions" button)
         ===================================================================== */}
      {viewingPermsRole && (
        <div
          className="role-perms-modal-backdrop"
          onClick={() => setViewingPermsRole(null)}
        >
          <div
            className="role-perms-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="role-perms-modal-header">
              <div>
                <h3 className="role-perms-modal-title">
                  {viewingPermsRole.name} Permissions
                </h3>
                <p className="role-perms-modal-sub">
                  {getRoleUserCount(viewingPermsRole)}{' '}
                  {getRoleUserCount(viewingPermsRole) === 1 ? 'User assigned' : 'Users assigned'}
                  {viewingPermsRole.description ? ` • ${viewingPermsRole.description}` : ''}
                </p>
              </div>
              <button
                type="button"
                className="role-perms-modal-close"
                onClick={() => setViewingPermsRole(null)}
                title="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="role-perms-modal-body">
              {viewingPermsLoading ? (
                <div style={{ textAlign: 'center', padding: '2.5rem', color: '#64748b' }}>
                  Loading permissions from backend...
                </div>
              ) : (
                <table className="role-perms-table">
                  <thead>
                    <tr>
                      <th>Module</th>
                      <th style={{ textAlign: 'center' }}>View</th>
                      <th style={{ textAlign: 'center' }}>Add</th>
                      <th style={{ textAlign: 'center' }}>Edit</th>
                      <th style={{ textAlign: 'center' }}>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {viewingPermsRole.permissions &&
                    Object.keys(viewingPermsRole.permissions).length > 0 ? (
                      Object.entries(viewingPermsRole.permissions).map(
                        ([modName, perms]) => (
                          <tr key={modName}>
                            <td style={{ fontWeight: 500 }}>{modName}</td>
                            <td style={{ textAlign: 'center' }}>
                              {perms?.view ? (
                                <Check size={16} color="#16a34a" />
                              ) : (
                                <span style={{ color: '#cbd5e1' }}>—</span>
                              )}
                            </td>
                            <td style={{ textAlign: 'center' }}>
                              {perms?.add ? (
                                <Check size={16} color="#16a34a" />
                              ) : (
                                <span style={{ color: '#cbd5e1' }}>—</span>
                              )}
                            </td>
                            <td style={{ textAlign: 'center' }}>
                              {perms?.edit ? (
                                <Check size={16} color="#16a34a" />
                              ) : (
                                <span style={{ color: '#cbd5e1' }}>—</span>
                              )}
                            </td>
                            <td style={{ textAlign: 'center' }}>
                              {perms?.delete ? (
                                <Check size={16} color="#16a34a" />
                              ) : (
                                <span style={{ color: '#cbd5e1' }}>—</span>
                              )}
                            </td>
                          </tr>
                        )
                      )
                    ) : (
                      <tr>
                        <td
                          colSpan="5"
                          style={{
                            textAlign: 'center',
                            color: '#64748b',
                            padding: '1.5rem',
                          }}
                        >
                          No permissions configured in backend database for this role.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
