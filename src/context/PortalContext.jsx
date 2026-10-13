import React, { createContext, useContext, useState } from 'react';

const PortalContext = createContext();

export const PortalProvider = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('hr_portal_authenticated') !== 'false';
  });
  const [currentUser, setCurrentUser] = useState({
    name: 'Administrator',
    email: 'admin@hrms.com',
    role: 'Super Admin',
    avatarInitial: 'A',
  });
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New leave application from Nathiya  Sharma', time: '10m ago', unread: true },
    { id: 2, title: 'Payroll generation ready for review', time: '1h ago', unread: true },
    { id: 3, title: 'Quarterly review meetings scheduled', time: 'Yesterday', unread: false },
  ]);

  const toggleSidebar = () => setSidebarCollapsed((prev) => !prev);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const login = (email) => {
    setIsAuthenticated(true);
    localStorage.setItem('hr_portal_authenticated', 'true');
    if (email) {
      setCurrentUser((prev) => ({
        ...prev,
        email,
        name: email.includes('@') ? email.split('@')[0].toUpperCase() : 'Administrator',
        avatarInitial: email.charAt(0).toUpperCase(),
      }));
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.setItem('hr_portal_authenticated', 'false');
  };

  return (
    <PortalContext.Provider
      value={{
        sidebarCollapsed,
        setSidebarCollapsed,
        toggleSidebar,
        globalSearch,
        setGlobalSearch,
        notifications,
        markAllRead,
        isAuthenticated,
        currentUser,
        login,
        logout,
      }}
    >
      {children}
    </PortalContext.Provider>
  );
};

export const usePortal = () => {
  const context = useContext(PortalContext);
  if (!context) {
    throw new Error('usePortal must be used within a PortalProvider');
  }
  return context;
};
