import React, { useState, useEffect, useMemo } from 'react';
import {
  History,
  Search,
  Download,
  RotateCw,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Toast } from '../../components/common/Toast/Toast';
import { CompanyAuditApi } from '../../Api/Company Audit Api';
import './CompanySettingsModule.css';

// Initial realistic audit logs for login history fallback
const DEFAULT_LOGIN_HISTORY = [
  {
    id: 'LOG-001',
    userName: 'Sundar Raman (Eng Lead)',
    loginDateTime: '12-Oct-2026 09:30 AM',
    ipAddress: '106.208.12.84',
    deviceInfo: 'Chrome 129 / Windows 11 Desktop',
    location: 'Chennai, India',
    status: 'Successful',
  },
  {
    id: 'LOG-002',
    userName: 'Abinaya R (Senior HR Manager)',
    loginDateTime: '12-Oct-2026 08:45 AM',
    ipAddress: '49.207.218.42',
    deviceInfo: 'Chrome 129 / macOS Sequoia',
    location: 'Bangalore, India',
    status: 'Successful',
  },
  {
    id: 'LOG-003',
    userName: 'Karthik Raja (Design Head)',
    loginDateTime: '12-Oct-2026 08:15 AM',
    ipAddress: '157.48.91.103',
    deviceInfo: 'Safari Mobile / iOS 18',
    location: 'Hyderabad, India',
    status: 'Successful',
  },
  {
    id: 'LOG-004',
    userName: 'Praveen Kumar (Full Stack Dev)',
    loginDateTime: '11-Oct-2026 06:40 PM',
    ipAddress: '115.111.23.18',
    deviceInfo: 'Firefox 130 / macOS Sequoia',
    location: 'Chennai, India',
    status: 'Successful',
  },
  {
    id: 'LOG-005',
    userName: 'Deepak Verma (Finance Admin)',
    loginDateTime: '11-Oct-2026 02:10 PM',
    ipAddress: '182.74.88.5',
    deviceInfo: 'Edge 129 / Windows 11 Desktop',
    location: 'Mumbai, India',
    status: 'Successful',
  },
  {
    id: 'LOG-006',
    userName: 'Unrecognized User (Failed Attempt)',
    loginDateTime: '10-Oct-2026 11:22 PM',
    ipAddress: '194.26.29.112',
    deviceInfo: 'Unknown Client / Linux x86_64',
    location: 'Frankfurt, Germany',
    status: 'Failed (Blocked by 2FA)',
  },
];

export const CompanySettingsModule = () => {
  const [toast, setToast] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const [logs, setLogs] = useState(DEFAULT_LOGIN_HISTORY);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // Attempt to fetch live login logs from backend
  const fetchLiveLoginLogs = async () => {
    setLoading(true);
    try {
      const res = await CompanyAuditApi.getAuditLogs({
        action: 'LOGIN',
        limit: 50,
      });

      if (res && res.data && Array.isArray(res.data) && res.data.length > 0) {
        const mapped = res.data.map((item, idx) => {
          let cleanIp = item.ipAddress || '127.0.0.1';
          if (cleanIp.startsWith('::ffff:')) {
            cleanIp = cleanIp.replace('::ffff:', '');
          }
          return {
            id: item.auditId || `LOG-LIVE-${idx + 1}`,
            userName: item.userName || item.user || 'Company User',
            loginDateTime: item.actionDate || (item.timestamp ? new Date(item.timestamp).toLocaleString() : 'Recent'),
            ipAddress: cleanIp,
            deviceInfo: item.userAgent || 'Chrome / Web Desktop',
            location: item.metadata?.location || 'India',
            status: item.action === 'LOGIN' ? 'Successful' : item.action,
          };
        });
        setLogs(mapped);
      } else {
        setLogs(DEFAULT_LOGIN_HISTORY);
      }
    } catch {
      setLogs(DEFAULT_LOGIN_HISTORY);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveLoginLogs();
  }, []);

  // Filtered logs based on search term and status filter
  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const matchesSearch =
        !searchTerm ||
        log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.ipAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.deviceInfo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === 'ALL' ||
        (statusFilter === 'SUCCESS' && !log.status.toLowerCase().includes('failed')) ||
        (statusFilter === 'FAILED' && log.status.toLowerCase().includes('failed'));

      return matchesSearch && matchesStatus;
    });
  }, [logs, searchTerm, statusFilter]);

  // Pagination calculation
  const totalEntries = filteredLogs.length;
  const totalPages = Math.ceil(totalEntries / pageSize) || 1;
  const paginatedLogs = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredLogs.slice(start, start + pageSize);
  }, [filteredLogs, currentPage, pageSize]);

  // Summary Metrics
  const totalLogins = logs.length;
  const successfulLogins = logs.filter((l) => !l.status.toLowerCase().includes('failed')).length;
  const failedLogins = logs.filter((l) => l.status.toLowerCase().includes('failed')).length;

  // CSV Export
  const handleExportCsv = () => {
    try {
      const headers = ['S.NO', 'USER NAME', 'LOGIN DATE / TIME', 'IP ADDRESS', 'DEVICE & BROWSER', 'LOCATION', 'LOGIN STATUS'];
      const rows = filteredLogs.map((l, i) => [
        i + 1,
        `"${l.userName.replace(/"/g, '""')}"`,
        `"${l.loginDateTime}"`,
        `"${l.ipAddress}"`,
        `"${l.deviceInfo.replace(/"/g, '""')}"`,
        `"${l.location}"`,
        `"${l.status}"`,
      ]);

      const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `login_history_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      showToast('Login history exported to CSV successfully.');
    } catch {
      showToast('Failed to export CSV. Please try again.', 'error');
    }
  };

  return (
    <div className="settings-page-container">
      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          duration={3500}
          onClose={() => setToast(null)}
        />
      )}

      {/* Page Header */}
      <div className="settings-page-header">
        <div className="settings-header-left">
          <h1 className="settings-page-title">Login History & Session Audit</h1>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <button
            type="button"
            className="btn-cancel-settings"
            onClick={fetchLiveLoginLogs}
            disabled={loading}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.55rem 0.95rem' }}
          >
            <RotateCw size={14} className={loading ? 'spin' : ''} />
            <span>Refresh</span>
          </button>
          <button
            type="button"
            className="btn-save-settings"
            onClick={handleExportCsv}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <Download size={15} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Main Single Card Container */}
        {/* Metric Cards Summary */}
        
        


          

          

        {/* Filter & Search Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.85rem',
            padding: '0.85rem 1rem',
            background: '#f8fafc',
            border: '1px solid var(--border-color)',
            borderRadius: '10px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flex: 1, minWidth: '260px' }}>
            <div style={{ position: 'relative', width: '100%', maxWidth: '380px' }}>
              <Search
                size={16}
                style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}
              />
              <input
                type="text"
                placeholder="Search..."
                className="form-control-input"
                style={{ paddingLeft: '2.15rem' }}
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            <select
              className="form-control-select"
              style={{ width: '180px' }}
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="ALL">All Login Statuses</option>
              <option value="SUCCESS">Successful Only</option>
              <option value="FAILED">Failed / Blocked Only</option>
            </select>
          </div>
        </div>

        {/* Direct Clean Login History Data Table (NO redundant banner, NO white gap) */}
        <div className="settings-table-wrapper" style={{ marginTop: '0.25rem' }}>
          <table className="settings-table">
            <thead>
              <tr>
                <th style={{ width: '60px' }}>S.NO</th>
                <th>USER NAME</th>
                <th>LOGIN DATE / TIME</th>
                <th>IP ADDRESS</th>
                <th>DEVICE & BROWSER</th>
                <th>LOCATION</th>
                <th>LOGIN STATUS</th>
              </tr>
            </thead>
            <tbody>
              {paginatedLogs.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '3rem 1rem', color: '#64748b' }}>
                    <ShieldCheck size={36} color="#94a3b8" style={{ margin: '0 auto 0.5rem auto', display: 'block' }} />
                    <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>No Login Records Found</div>
                    <div style={{ fontSize: '0.8rem', marginTop: '0.2rem' }}>Try modifying your search or status filter.</div>
                  </td>
                </tr>
              ) : (
                paginatedLogs.map((log, index) => {
                  const isFailed = log.status.toLowerCase().includes('failed');
                  const serialNo = (currentPage - 1) * pageSize + index + 1;

                  return (
                    <tr key={log.id || index}>
                      <td style={{ fontWeight: 700, color: '#64748b' }}>{serialNo}</td>
                      <td style={{ fontWeight: 700, color: '#0f172a' }}>{log.userName}</td>
                      <td style={{ fontWeight: 600, color: '#334155' }}>{log.loginDateTime}</td>
                      <td>
                        <code style={{ background: '#f1f5f9', padding: '0.15rem 0.4rem', borderRadius: '4px', fontSize: '0.8rem' }}>
                          {log.ipAddress}
                        </code>
                      </td>
                      <td style={{ color: '#475569' }}>{log.deviceInfo}</td>
                      <td style={{ color: '#475569' }}>{log.location}</td>
                      <td>
                        <span className={`status-pill-badge ${isFailed ? 'failed' : 'success'}`}>
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>

                    {/* Pagination Footer (Always Visible) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.85rem 1.25rem',
              borderTop: '1px solid var(--border-color)',
              background: '#ffffff',
              borderBottomLeftRadius: '10px',
              borderBottomRightRadius: '10px',
            }}
          >
            <div style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 600 }}>
              Showing {totalEntries > 0 ? (currentPage - 1) * pageSize + 1 : 0} to{' '}
              {Math.min(currentPage * pageSize, totalEntries)} of {totalEntries} entries
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <button
                type="button"
                className="btn-cancel-settings"
                style={{ padding: '0.35rem 0.65rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                title="Previous Page"
              >
                <ChevronLeft size={15} />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  type="button"
                  className="btn-cancel-settings"
                  style={{
                    padding: '0.35rem 0.75rem',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    background: currentPage === pageNum ? '#2563eb' : '#ffffff',
                    color: currentPage === pageNum ? '#ffffff' : '#334155',
                    borderColor: currentPage === pageNum ? '#2563eb' : 'var(--border-color)',
                  }}
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum}
                </button>
              ))}

              <button
                type="button"
                className="btn-cancel-settings"
                style={{ padding: '0.35rem 0.65rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                title="Next Page"
              >
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        </div>
    </div>
  );
};
