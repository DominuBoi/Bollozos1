// src/pages/SecretaryDashboard.js
import React from 'react';
export default function SecretaryDashboard({ onLogout }) {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Secretary Dashboard</h2>
      <p>Welcome, Secretary! This is your dashboard.</p>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}
