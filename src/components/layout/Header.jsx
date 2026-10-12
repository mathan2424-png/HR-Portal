import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import './Header.css';

export const Header = () => {
  const { toggleSidebar } = usePortal();
  const [currentDateTime, setCurrentDateTime] = useState('');

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
        <div className="header-avatar-circle" title="Administrator">
          <span>A</span>
        </div>
      </div>
    </header>
  );
};
