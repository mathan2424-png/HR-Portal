import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Building2,
  CreditCard,
  ShieldCheck,
  GitFork,
  Database,
  Briefcase,
  Sparkles,
  UserCheck,
  ClipboardCheck,
  CalendarCheck,
  FileCheck,
  BarChart3,
  Settings,
  LifeBuoy,
  ChevronDown,
} from 'lucide-react';
import logoImg from '../../assets/logo.png';
import compactLogoImg from '../../assets/image.png';
import { usePortal } from '../../context/PortalContext';
import './Sidebar.css';

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  {
    path: '/masters',
    label: 'Masters',
    icon: Database,
    hasDropdown: true,
    children: [
      { path: '/masters?tab=job-categories', label: 'Job Categories', tab: 'job-categories' },
      { path: '/masters?tab=skills', label: 'Skills & Proficiencies', tab: 'skills' },
      { path: '/masters?tab=industries', label: 'Industries', tab: 'industries' },
      { path: '/masters?tab=locations', label: 'Primary Job Locations', tab: 'locations' },
      { path: '/masters?tab=employment-types', label: 'Employment Types', tab: 'employment-types' },
      { path: '/masters?tab=work-modes', label: 'Work Modes', tab: 'work-modes' },
      { path: '/masters?tab=qualifications', label: 'Academic Qualifications', tab: 'qualifications' },
    ],
  },
  { path: '/company-profile', label: 'Company Details', icon: Building2 },
  { path: '/subscription', label: 'Subscription & Billing', icon: CreditCard },
  { path: '/users-roles', label: 'Users & Roles', icon: ShieldCheck },
  { path: '/departments', label: 'Departments', icon: GitFork },
  { path: '/jobs', label: 'Jobs', icon: Briefcase },
  { path: '/candidate-matching', label: 'Matching & Alerts', icon: Sparkles },
  { path: '/candidate-responses', label: 'Candidate Responses', icon: UserCheck },
  { path: '/screenings', label: 'Screening', icon: ClipboardCheck },
  { path: '/interviews', label: 'Interviews', icon: CalendarCheck },
  { path: '/offers', label: 'Offers & Hiring', icon: FileCheck },
  {
    path: '/reports',
    label: 'Recruitment Reports',
    icon: BarChart3,
    hasDropdown: true,
    children: [
      { path: '/reports?tab=overview', label: 'Recruitment Overview', tab: 'overview' },
      { path: '/reports?tab=matching', label: 'Candidate & Matching Report', tab: 'matching' },
      { path: '/reports?tab=screening', label: 'Screening Report', tab: 'screening' },
      { path: '/reports?tab=interviews', label: 'Interviews & Hiring Report', tab: 'interviews' },
    ],
  },
  { path: '/help-support', label: 'Help & Support', icon: LifeBuoy },
  {
    path: '/settings',
    label: 'Settings & Security',
    icon: Settings,
    hasDropdown: true,
    children: [
      { path: '/settings', label: 'Login History', tab: 'history' },
      { path: '/audit-log', label: 'Company Audit Log' },
    ],
  },
];

export const Sidebar = () => {
  const { sidebarCollapsed, setSidebarCollapsed, currentUser } = usePortal();
  const location = useLocation();
  const navigate = useNavigate();

  const isMastersActive =
    location.pathname.startsWith('/masters') || location.pathname.startsWith('/taxonomy');
  const isReportsActive =
    location.pathname.startsWith('/reports') || location.pathname.startsWith('/recruitment-reports');
  const isSettingsActive =
    location.pathname.startsWith('/settings') ||
    location.pathname.startsWith('/company-settings') ||
    location.pathname.startsWith('/security') ||
    location.pathname.startsWith('/audit-log') ||
    location.pathname.startsWith('/audit');

  const [mastersOpen, setMastersOpen] = useState(isMastersActive);
  const [reportsOpen, setReportsOpen] = useState(isReportsActive);
  const [settingsOpen, setSettingsOpen] = useState(isSettingsActive);

  const isBranchAdmin = Boolean(
    currentUser?.isBranchAdmin ||
    currentUser?.branchId ||
    currentUser?.role?.toLowerCase().includes('branch')
  );

  // Sub-Branch Admin cannot view or access Company or Subscription & Billing modules
  const visibleNavItems = navItems.filter((item) => {
    if (isBranchAdmin) {
      if (item.path === '/company-profile' || item.path === '/subscription') {
        return false;
      }
    }
    return true;
  });

  // Auto-expand if user navigates to any sub-route
  useEffect(() => {
    if (isMastersActive) {
      setMastersOpen(true);
    } else {
      setMastersOpen(false);
    }
  }, [isMastersActive]);

  useEffect(() => {
    if (isReportsActive) {
      setReportsOpen(true);
    } else {
      setReportsOpen(false);
    }
  }, [isReportsActive]);

  useEffect(() => {
    if (isSettingsActive) {
      setSettingsOpen(true);
    } else {
      setSettingsOpen(false);
    }
  }, [isSettingsActive]);

  const handleDropdownToggle = (item, e) => {
    e.preventDefault();
    let isOpen, setOpen, isActive;
    if (item.path === '/masters') {
      isOpen = mastersOpen;
      setOpen = setMastersOpen;
      isActive = isMastersActive;
    } else if (item.path === '/reports') {
      isOpen = reportsOpen;
      setOpen = setReportsOpen;
      isActive = isReportsActive;
    } else if (item.path === '/settings') {
      isOpen = settingsOpen;
      setOpen = setSettingsOpen;
      isActive = isSettingsActive;
    }

    if (sidebarCollapsed) {
      setSidebarCollapsed(false);
      if (setOpen) setOpen(true);
      navigate(item.path);
      return;
    }
    if (setOpen) {
      setOpen((prev) => !prev);
    }
    if (!isActive) {
      navigate(item.path);
    }
  };

  const handleOutsideNavClick = () => {
    setMastersOpen(false);
    setReportsOpen(false);
    setSettingsOpen(false);
  };

  return (
    <aside className={`portal-sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <Link
          to="/"
          className="sidebar-brand"
          title={sidebarCollapsed ? "Expand Sidebar • HR Portal" : "HR Portal"}
          onClick={sidebarCollapsed ? (e) => { e.preventDefault(); setSidebarCollapsed(false); } : undefined}
        >
          <img
            src={sidebarCollapsed ? compactLogoImg : logoImg}
            alt="HR Portal Logo"
            className={`brand-logo-img ${sidebarCollapsed ? 'compact' : 'full'}`}
          />
        </Link>
      </div>

      <nav className="sidebar-nav">
        {visibleNavItems.map((item) => {
          const Icon = item.icon;

          if (item.hasDropdown) {
            const isMasters = item.path === '/masters';
            const isReports = item.path === '/reports';
            const isSettings = item.path === '/settings';

            const isItemActive = isMasters
              ? isMastersActive
              : isReports
              ? isReportsActive
              : isSettingsActive;
            const isOpen = isMasters
              ? mastersOpen
              : isReports
              ? reportsOpen
              : settingsOpen;

            return (
              <div key={item.path} className="nav-dropdown-group">
                <button
                  type="button"
                  className={`nav-dropdown-toggle ${isItemActive ? 'active' : ''}`}
                  onClick={(e) => handleDropdownToggle(item, e)}
                  title={sidebarCollapsed ? item.label : undefined}
                >
                  <div className="nav-dropdown-toggle-left">
                    <span className="nav-item-icon">
                      <Icon size={18} />
                    </span>
                    {!sidebarCollapsed && (
                      <span className="nav-item-label">{item.label}</span>
                    )}
                  </div>
                  {!sidebarCollapsed && (
                    <ChevronDown
                      size={16}
                      className={`nav-chevron ${isOpen ? 'open' : ''}`}
                    />
                  )}
                </button>

                {/* Submenu Dropdown */}
                {!sidebarCollapsed && isOpen && (
                  <div className="nav-submenu-list">
                    {item.children.map((subItem) => {
                      const searchParams = new URLSearchParams(location.search);
                      const currentTab = searchParams.get('tab');
                      let isSubActive = false;

                      if (isSettings) {
                        if (subItem.path.startsWith('/audit-log')) {
                          isSubActive =
                            location.pathname.startsWith('/audit-log') ||
                            location.pathname.startsWith('/audit');
                        } else {
                          isSubActive =
                            (location.pathname.startsWith('/settings') ||
                              location.pathname.startsWith('/security') ||
                              location.pathname.startsWith('/company-settings')) &&
                            !location.pathname.startsWith('/audit-log') &&
                            !location.pathname.startsWith('/audit');
                        }
                      } else {
                        isSubActive =
                          isItemActive &&
                          (currentTab
                            ? subItem.tab === currentTab
                            : subItem.tab === 'overview' || subItem.path === item.path);
                      }

                      return (
                        <Link
                          key={subItem.path}
                          to={subItem.path}
                          className={`nav-submenu-item ${isSubActive ? 'active' : ''}`}
                        >
                          <span className="nav-submenu-dot" />
                          <span className="nav-submenu-label">{subItem.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              title={sidebarCollapsed ? item.label : undefined}
              onClick={handleOutsideNavClick}
            >
              <span className="nav-item-icon">
                <Icon size={18} />
              </span>
              {!sidebarCollapsed && (
                <>
                  <span className="nav-item-label">{item.label}</span>
                  {item.badge && <span className="nav-badge">{item.badge}</span>}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};
