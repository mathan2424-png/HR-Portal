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
  ScrollText,
  ChevronDown,
  LogOut,
} from 'lucide-react';
import logoImg from '../../assets/logo.png';
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
  { path: '/departments', label: 'Departments & Branches', icon: GitFork },
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
  { path: '/settings', label: 'Settings & Security', icon: Settings },
  { path: '/audit-log', label: 'Company Audit Log', icon: ScrollText },
];

export const Sidebar = () => {
  const { sidebarCollapsed, setSidebarCollapsed, logout } = usePortal();
  const location = useLocation();
  const navigate = useNavigate();

  const isMastersActive =
    location.pathname.startsWith('/masters') || location.pathname.startsWith('/taxonomy');
  const isReportsActive =
    location.pathname.startsWith('/reports') || location.pathname.startsWith('/recruitment-reports');

  const [mastersOpen, setMastersOpen] = useState(isMastersActive);
  const [reportsOpen, setReportsOpen] = useState(isReportsActive);

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

  const handleDropdownToggle = (item, e) => {
    e.preventDefault();
    const isMasters = item.path === '/masters';
    const isOpen = isMasters ? mastersOpen : reportsOpen;
    const setOpen = isMasters ? setMastersOpen : setReportsOpen;
    const isActive = isMasters ? isMastersActive : isReportsActive;

    if (sidebarCollapsed) {
      setSidebarCollapsed(false);
      setOpen(true);
      navigate(item.path);
      return;
    }
    setOpen((prev) => !prev);
    if (!isActive) {
      navigate(item.path);
    }
  };

  const handleOutsideNavClick = () => {
    setMastersOpen(false);
    setReportsOpen(false);
  };

  return (
    <aside className={`portal-sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-brand">
          <img src={logoImg} alt="HR Portal Logo" className="brand-logo-img" />
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;

          if (item.hasDropdown) {
            const isMasters = item.path === '/masters';
            const isItemActive = isMasters ? isMastersActive : isReportsActive;
            const isOpen = isMasters ? mastersOpen : reportsOpen;

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
                      const isSubActive =
                        isItemActive &&
                        (currentTab
                          ? subItem.tab === currentTab
                          : subItem.tab === 'overview' || subItem.path === item.path);

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

      <div className="sidebar-footer">

      </div>
    </aside>
  );
};
