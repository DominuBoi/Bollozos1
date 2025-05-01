// src/pages/AdminDashboard.js
import React from 'react';
export default function AdminDashboard({ onLogout }) {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Admin Dashboard</h2>
      <p>Welcome, Admin! This is your dashboard.</p>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}
