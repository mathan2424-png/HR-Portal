import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Building2,
  CreditCard,
  ShieldCheck,
  GitFork,
  Briefcase,
  Sparkles,
  UserCheck,
  ClipboardCheck,
  CalendarCheck,
  FileCheck,
  BarChart3,
  Bell,
  Settings,
  ScrollText,
} from 'lucide-react';
import logoImg from '../../assets/logo.png';
import { usePortal } from '../../context/PortalContext';
import './Sidebar.css';

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
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
  { path: '/reports', label: 'Recruitment Reports', icon: BarChart3 },
  { path: '/notifications', label: 'Notifications', icon: Bell },
  { path: '/settings', label: 'Settings & Security', icon: Settings },
  { path: '/audit-log', label: 'Company Audit Log', icon: ScrollText },
];

export const Sidebar = () => {
  const { sidebarCollapsed } = usePortal();

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
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              title={sidebarCollapsed ? item.label : undefined}
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
