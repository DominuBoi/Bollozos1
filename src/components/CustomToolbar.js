// src/components/CustomToolbar.js
import React from 'react';

export default function CustomToolbar({ label, onNavigate }) {
  return (
    <div style={toolbarStyle}>
      <button onClick={() => onNavigate('PREV')} style={buttonStyle}>‹</button>
      <button onClick={() => onNavigate('TODAY')} style={buttonStyle}>Today</button>
      <button onClick={() => onNavigate('NEXT')} style={buttonStyle}>›</button>
      <span style={labelStyle}>{label}</span>
    </div>
  );
}

const toolbarStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '0.5rem 1rem',
  fontWeight: '600',
  fontSize: '1.1rem',
  userSelect: 'none',
};

const buttonStyle = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  fontSize: '1.3rem',
  padding: '0 0.5rem',
  color: '#333',
};

const labelStyle = {
  flexGrow: 1,
  textAlign: 'center',
  cursor: 'default',
};
