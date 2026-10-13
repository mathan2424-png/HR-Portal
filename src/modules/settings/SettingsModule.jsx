import React, { useState } from 'react';
import { Palette, Building, Save, Check } from 'lucide-react';

export const SettingsModule = () => {
  const [saved, setSaved] = useState(false);
  const [companyName, setCompanyName] = useState('Marutham Technologies Pvt. Ltd.');

  const brandPalette = [
    { name: 'Primary Blue', hex: '#2563EB' },
    { name: 'Secondary Teal', hex: '#0F766E' },
    { name: 'Accent Purple', hex: '#7C3AED' },
    { name: 'Success Green', hex: '#16A34A' },
    { name: 'Warning Amber', hex: '#D97706' },
    { name: 'Error Red', hex: '#DC2626' },
    { name: 'Info Sky Blue', hex: '#0284C7' },
    { name: 'Background', hex: '#F8FAFC' },
    { name: 'Card Background', hex: '#FFFFFF' },
    { name: 'Primary Text', hex: '#0F172A' },
    { name: 'Secondary Text', hex: '#64748B' },
    { name: 'Border', hex: '#E2E8F0' },
  ];

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="module-header">
        <div>
          <h1>Settings & Customization</h1>
          <p>Configure company profile, security policies, and design color tokens</p>
        </div>
        <button className="btn-add-primary" onClick={handleSave}>
          {saved ? <Check size={16} /> : <Save size={16} />}
          <span>{saved ? 'Saved Successfully' : 'Save Changes'}</span>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Color Code & Theme Customizer */}
        <div className="surface-card flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Palette size={20} color="var(--primary)" />
            <h3 style={{ fontSize: '1.1rem' }}>Design & Color Codes</h3>
          </div>
          <p style={{ fontSize: '0.85rem' }}>
            You can send your specific brand color codes anytime. They are centralized in <code>src/styles/variables.css</code>.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Active Design Tokens ({brandPalette.length} Colors):</span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '0.5rem' }}>
              {brandPalette.map((color) => (
                <div
                  key={color.name}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-app)',
                  }}
                >
                  <span
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '6px',
                      backgroundColor: color.hex,
                      border: '1px solid rgba(0,0,0,0.1)',
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ overflow: 'hidden' }}>
                    <div style={{ fontSize: '0.72rem', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {color.name}
                    </div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{color.hex}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              padding: '1rem',
              borderRadius: '8px',
              backgroundColor: 'var(--bg-app)',
              border: '1px dashed var(--border-color)',
              marginTop: '0.5rem',
            }}
          >
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              💡 <strong>Tip:</strong> Send any hex codes (e.g. <code>#1E40AF</code>, <code>#0F172A</code>) or brand guidelines, and we will update all components, charts, and buttons instantly.
            </p>
          </div>
        </div>

        {/* Company Profile Settings */}
        <div className="surface-card flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Building size={20} color="var(--primary)" />
            <h3 style={{ fontSize: '1.1rem' }}>Organization Details</h3>
          </div>

          <div className="flex flex-col gap-3">
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>
                Company Name
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.55rem 0.85rem',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>
                Admin Contact Email
              </label>
              <input
                type="email"
                defaultValue="admin@company.com"
                style={{
                  width: '100%',
                  padding: '0.55rem 0.85rem',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>
                Default Work Timezone
              </label>
              <input
                type="text"
                defaultValue="UTC+05:30 (India Standard Time)"
                style={{
                  width: '100%',
                  padding: '0.55rem 0.85rem',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
