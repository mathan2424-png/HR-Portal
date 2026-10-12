import React from 'react';
import './Table.css';

export const Table = ({ columns, data, keyField = 'id', emptyMessage = 'No records found' }) => {
  if (!data || data.length === 0) {
    return (
      <div className="table-wrapper" style={{ padding: '2.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <table className="custom-table">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={col.key || index} style={col.headerStyle}>
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={row[keyField] || rowIndex}>
              {columns.map((col, colIndex) => (
                <td key={col.key || colIndex} style={col.cellStyle}>
                  {col.render ? col.render(row[col.key], row, rowIndex) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
