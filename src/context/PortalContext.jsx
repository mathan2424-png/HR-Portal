import React, { createContext, useContext, useState } from 'react';

const PortalContext = createContext();

export const PortalProvider = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New leave application from Priya Sharma', time: '10m ago', unread: true },
    { id: 2, title: 'Payroll generation ready for review', time: '1h ago', unread: true },
    { id: 3, title: 'Quarterly review meetings scheduled', time: 'Yesterday', unread: false },
  ]);

  const toggleSidebar = () => setSidebarCollapsed(prev => !prev);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  return (
    <PortalContext.Provider
      value={{
        sidebarCollapsed,
        toggleSidebar,
        globalSearch,
        setGlobalSearch,
        notifications,
        markAllRead,
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
