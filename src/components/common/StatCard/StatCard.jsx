import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import './StatCard.css';

export const StatCard = ({
  title,
  value,
  icon: Icon,
  trend,
  trendDirection = 'up',
  subtitle,
  iconBg = 'var(--primary-light)',
  iconColor = 'var(--primary)',
}) => {
  return (
    <div className="stat-card">
      <div className="stat-card-header">
        <span className="stat-card-title">{title}</span>
        <div
          className="stat-card-icon-wrapper"
          style={{ backgroundColor: iconBg, color: iconColor }}
        >
          {Icon && <Icon size={22} />}
        </div>
      </div>

      <div className="stat-card-value">{value}</div>

      {(trend || subtitle) && (
        <div className="stat-card-footer">
          {trend && (
            <span className={`stat-card-trend ${trendDirection}`}>
              {trendDirection === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              {trend}
            </span>
          )}
          {subtitle && <span>{subtitle}</span>}
        </div>
      )}
    </div>
  );
};
