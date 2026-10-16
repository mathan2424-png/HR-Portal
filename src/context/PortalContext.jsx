import React, { createContext, useContext, useState } from 'react';

const PortalContext = createContext();

export const PortalProvider = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('hr_portal_authenticated') === 'true';
  });
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('hr_portal_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return {
      name: 'MATHAN67',
      username: 'MATHAN67',
      email: 'mathan67@hrms.com',
      role: 'Super Admin',
      avatarInitial: 'M',
    };
  });
  const [notifications, setNotifications] = useState([
    {
      id: 'NTF-2026-001',
      notificationType: 'Interview',
      title: 'Interview Accepted by Candidate',
      message: 'Nathiya  Sharma (CAN-1042) accepted Technical Round interview invitation for 14-Oct-2026 at 10:30 AM IST.',
      dateTime: '12-Oct-2026 05:15 PM',
      readStatus: 'Unread',
      recipient: 'Sundar Raman (Eng Lead)',
    },
    {
      id: 'NTF-2026-002',
      notificationType: 'Candidate response',
      title: 'Candidate Response Received',
      message: 'Anand Kumar responded "Interested" to Lead Product Designer (JOB-2026-002) job alert broadcast.',
      dateTime: '12-Oct-2026 04:30 PM',
      readStatus: 'Unread',
      recipient: 'Abinaya R (Senior HR Manager)',
    },
    {
      id: 'NTF-2026-003',
      notificationType: 'Screening',
      title: 'Screening Assessment Completed',
      message: 'Karthik V completed Cloud Infrastructure & Kubernetes screening assessment with a score of 84% (Qualified).',
      dateTime: '12-Oct-2026 02:45 PM',
      readStatus: 'Read',
      recipient: 'Sundar Raman (Eng Lead)',
    },
    {
      id: 'NTF-2026-004',
      notificationType: 'Subscription',
      title: 'Monthly Plan Credits Refilled',
      message: 'Your Enterprise Recruitment Plan was replenished with 5,000 candidate match credits and 3,000 alert broadcasts.',
      dateTime: '11-Oct-2026 11:00 AM',
      readStatus: 'Read',
      recipient: 'Company Administrator (Rajeshwaran K)',
    },
    {
      id: 'NTF-2026-005',
      notificationType: 'Payment',
      title: 'Subscription Invoice Generated & Paid',
      message: 'Invoice #INV-2026-104 for ₹49,999 + GST processed successfully via Corporate Auto-Debit.',
      dateTime: '10-Oct-2026 09:15 AM',
      readStatus: 'Read',
      recipient: 'Finance Admin (Deepak Verma)',
    },
    {
      id: 'NTF-2026-006',
      notificationType: 'Interview',
      title: 'Reschedule Requested by Candidate',
      message: 'Karthik V requested reschedule for DevOps Technical round due to conflicting official travel commitments.',
      dateTime: '09-Oct-2026 03:20 PM',
      readStatus: 'Read',
      recipient: 'Abinaya R (Senior HR Manager)',
    },
    {
      id: 'NTF-2026-007',
      notificationType: 'Candidate response',
      title: 'Offer Letter Signed & Accepted',
      message: 'Deepa Rajan (CAN-1046) signed offer letter for Talent Acquisition Lead. Scheduled joining on 05-Nov-2026.',
      dateTime: '08-Oct-2026 06:10 PM',
      readStatus: 'Read',
      recipient: 'Company Administrator (Rajeshwaran K)',
    },
  ]);

  const unreadCount = notifications.filter((n) => n.readStatus === 'Unread').length;

  const toggleSidebar = () => setSidebarCollapsed((prev) => !prev);

  const markAllRead = () => {
    setNotifications((prev) =>
      prev.map((item) => ({ ...item, readStatus: 'Read' }))
    );
  };

  const markNotificationAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, readStatus: 'Read' } : item))
    );
  };

  const login = (userDataOrUsername) => {
    setIsAuthenticated(true);
    localStorage.setItem('hr_portal_authenticated', 'true');

    let userObj;
    if (userDataOrUsername && typeof userDataOrUsername === 'object') {
      const roleStr = typeof userDataOrUsername.role === 'object'
        ? (userDataOrUsername.role?.roleName || 'Employer')
        : (userDataOrUsername.role || 'Employer');

      const isBranchAdmin = Boolean(
        userDataOrUsername.isBranchAdmin ||
        userDataOrUsername.branchId ||
        userDataOrUsername.branch ||
        roleStr.toLowerCase().includes('branch')
      );

      const branchName = userDataOrUsername.branchName || userDataOrUsername.branch?.branchName || (isBranchAdmin ? 'Tambaram Branch' : null);

      userObj = {
        ...userDataOrUsername,
        name: userDataOrUsername.name || userDataOrUsername.username || 'MATHAN67',
        username: userDataOrUsername.username || 'MATHAN67',
        email: userDataOrUsername.email || `${(userDataOrUsername.username || 'mathan67').toLowerCase()}@hrms.com`,
        role: roleStr,
        isBranchAdmin,
        branchName,
        branch: userDataOrUsername.branch || (branchName ? { branchName } : null),
        branchId: userDataOrUsername.branchId || userDataOrUsername.branch?.id || null,
        avatarInitial: (userDataOrUsername.name || userDataOrUsername.username || 'M').charAt(0).toUpperCase(),
      };
    } else {
      const uName = (userDataOrUsername || 'MATHAN67').trim();
      const isBranch = uName.toLowerCase().includes('branch') || uName.toLowerCase().includes('tam');
      userObj = {
        name: uName.toUpperCase(),
        username: uName,
        email: uName.includes('@') ? uName : `${uName.toLowerCase()}@hrms.com`,
        role: isBranch ? 'Sub-Branch Admin' : 'Super Admin',
        isBranchAdmin: isBranch,
        branchName: isBranch ? 'Tambaram Branch' : null,
        avatarInitial: uName.charAt(0).toUpperCase(),
      };
    }

    setCurrentUser(userObj);
    localStorage.setItem('hr_portal_user', JSON.stringify(userObj));
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('hr_portal_authenticated');
    localStorage.removeItem('hr_portal_user');
    localStorage.removeItem('hr_portal_token');
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
        setNotifications,
        unreadCount,
        markAllRead,
        markNotificationAsRead,
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
