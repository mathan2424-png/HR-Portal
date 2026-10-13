import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, LogOut, Shield } from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import './Header.css';

export const Header = () => {
  const { toggleSidebar, currentUser, logout } = usePortal();
  const navigate = useNavigate();
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

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

      setCurrentDateTime(`${day}-${month}-${year} ${hours}:${minutes}:${seconds} ${ampm}`);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
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
        <div className="header-datetime-text">
          {currentDateTime}
        </div>

        <div className="header-user-menu-wrapper" ref={menuRef}>
          <div
            className="header-avatar-circle"
            title="Administrator Account"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span>{currentUser?.avatarInitial || 'A'}</span>
          </div>

          {menuOpen && (
            <div className="header-user-dropdown">
              <div className="header-user-info-box">
                <div className="header-user-dropdown-name">
                  {currentUser?.name || 'Administrator'}
                </div>
                <div className="header-user-dropdown-email">
                  {currentUser?.email || 'admin@hrms.com'}
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
