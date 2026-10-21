import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, LogOut, Bell, Check, GitBranch } from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import './Header.css';

export const Header = () => {
  const {
    toggleSidebar,
    currentUser,
    logout,
    notifications = [],
    unreadCount = 0,
    markAllRead,
    markNotificationAsRead,
  } = usePortal();
  const navigate = useNavigate();
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const menuRef = useRef(null);
  const notificationRef = useRef(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const day = String(now.getDate()).padStart(2, '0');
      const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      const month = months[now.getMonth()];
      const year = now.getFullYear();

      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? String(hours).padStart(2, '0') : '12';

      setCurrentDateTime(`${day} ${month.slice(0, 3)} ${year} • ${hours}:${minutes}:${seconds} ${ampm}`);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setNotificationOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setMenuOpen(false);
    if (logout) logout();
    navigate('/login');
  };

  const getTypeClass = (type = '') => {
    const t = type.toLowerCase();
    if (t.includes('interview')) return 'tag-interview';
    if (t.includes('candidate') || t.includes('response')) return 'tag-candidate';
    if (t.includes('screening')) return 'tag-screening';
    if (t.includes('subscription')) return 'tag-subscription';
    if (t.includes('payment')) return 'tag-payment';
    if (t.includes('support')) return 'tag-support';
    if (t.includes('enquiry')) return 'tag-enquiry';
    if (t.includes('help')) return 'tag-help';
    return 'tag-default';
  };

  const formatShortTime = (dtStr = '') => {
    if (!dtStr) return '';
    const parts = dtStr.split(' ');
    if (parts.length >= 3) {
      return `${parts[1]} ${parts[2]}`;
    }
    return dtStr;
  };

  return (
    <header className="portal-header">
      <div className="header-left">
        <button
          onClick={toggleSidebar}
          className="header-hamburger-btn"
          title="Toggle Navigation"
          aria-label="Toggle Navigation"
        >
          <Menu size={22} />
        </button>
      </div>

      <div className="header-right">
        {/* Sub-Branch Display Banner */}
        {(currentUser?.branchName || currentUser?.branch?.branchName) && (
          <div
            className="header-branch-pill"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.35rem 0.8rem',
              background: 'rgba(14, 116, 144, 0.08)',
              color: 'var(--primary, #0e7490)',
              borderRadius: '9999px',
              fontSize: '0.82rem',
              fontWeight: 700,
              border: '1px solid rgba(14, 116, 144, 0.25)',
            }}
          >
            <GitBranch size={14} />
            <span>{currentUser.branchName || currentUser.branch?.branchName}</span>
          </div>
        )}

        <div className="header-datetime-text">
          {currentDateTime}
        </div>

        {/* Notification Bell with Dropdown (Matches requested Image 2) */}
        <div className="header-notification-wrapper" ref={notificationRef}>
          <button
            type="button"
            className={`header-bell-btn ${notificationOpen ? 'active' : ''}`}
            onClick={() => {
              setNotificationOpen((prev) => !prev);
              setMenuOpen(false);
            }}
            title="Notifications"
            aria-label="Notifications"
          >
            <Bell size={19} />
            {unreadCount > 0 && <span className="header-bell-dot" />}
          </button>

          {notificationOpen && (
            <div className="header-notification-dropdown">
              <div className="notification-dropdown-header">
                <div className="notification-dropdown-title-wrap">
                  <span className="notification-dropdown-title">NOTIFICATIONS</span>
                  {unreadCount > 0 && (
                    <span className="notification-dropdown-badge">{unreadCount}</span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    type="button"
                    className="notification-mark-read-btn"
                    onClick={() => {
                      if (markAllRead) markAllRead();
                    }}
                  >
                    <Check size={14} />
                    <span>Mark all read</span>
                  </button>
                )}
              </div>

              <div className="notification-dropdown-list">
                {notifications.length === 0 ? (
                  <div className="notification-dropdown-empty">
                    No notifications available
                  </div>
                ) : (
                  notifications.map((item) => {
                    const isUnread = item.readStatus === 'Unread';
                    return (
                      <div
                        key={item.id}
                        className={`notification-dropdown-item ${isUnread ? 'unread' : ''}`}
                        onClick={() => {
                          if (markNotificationAsRead) markNotificationAsRead(item.id);
                          setNotificationOpen(false);
                          navigate('/notifications');
                        }}
                      >
                        <div className="notification-item-top">
                          <span className={`notification-item-tag ${getTypeClass(item.notificationType)}`}>
                            {item.notificationType.toUpperCase()}
                          </span>
                          <span className="notification-item-title" title={item.title}>
                            {item.title}
                          </span>
                          <span className="notification-item-time">
                            {formatShortTime(item.dateTime)}
                          </span>
                        </div>
                        <div className="notification-item-snippet" title={item.message}>
                          {item.message}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              <div className="notification-dropdown-footer">
                <button
                  type="button"
                  className="notification-view-all-btn"
                  onClick={() => {
                    setNotificationOpen(false);
                    navigate('/notifications');
                  }}
                >
                  View All Notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Account Menu */}
        <div className="header-user-menu-wrapper" ref={menuRef}>
          <div
            className="header-avatar-circle"
            title="Administrator Account"
            onClick={() => {
              setMenuOpen((prev) => !prev);
              setNotificationOpen(false);
            }}
          >
            <span>{currentUser?.avatarInitial || 'A'}</span>
          </div>

          {menuOpen && (
            <div className="header-user-dropdown">
              <div className="header-user-info-box">
                <div className="header-user-dropdown-name" title={currentUser?.name || 'Administrator'}>
                  {currentUser?.name || 'Administrator'}
                </div>
                <div className="header-user-dropdown-email" title={currentUser?.email || 'admin@hrms.com'}>
                  {currentUser?.email || 'admin@hrms.com'}
                </div>
                <div
                  className="header-user-dropdown-role"
                  title={`Role: ${currentUser?.role || 'Administrator'}${currentUser?.branchName || currentUser?.branch?.branchName ? ` • ${currentUser.branchName || currentUser.branch?.branchName}` : ''}`}
                >
                  Role: {currentUser?.role || 'Administrator'}
                  {(currentUser?.branchName || currentUser?.branch?.branchName) && (
                    <span> • {currentUser.branchName || currentUser.branch?.branchName}</span>
                  )}
                </div>
              </div>
              <button
                type="button"
                className="header-dropdown-logout-btn"
                onClick={handleLogout}
              >
                <LogOut size={15} />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
