import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/header.css'; // Make sure to have the CSS file

export default function Header({ role }) {
  const location = useLocation();

  return (
    <nav className="nav">
      <div className="navLeft">
        <Link to="/" className={`homeBtn${location.pathname === '/' ? ' active' : ''}`}>Home</Link>
        <div className="brand">
          <span className="logo" role="img" aria-label="scales of justice">⚖️</span>
          <span className="officeName">Bollozos Law Office</span>
        </div>
      </div>
      <ul className="navList">
        {role === 'Lawyer' ? (
          <>
            <li><Link to="/dashboard" className="navLink">Dashboard</Link></li>
            <li><Link to="/manage-schedule" className="navLink">Manage My Schedule</Link></li>
            <li><Link to="/master-calendar" className="navLink">View Master Calendar</Link></li>
            <li><Link to="/login" className="navLink">Logout</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/about" className="navLink">About Us</Link></li>
            <li><Link to="/contact" className="navLink">Contact Us</Link></li>
            <li>
              <Link to="/appointment" className="bookAppointmentBtn">
                Book Appointment
              </Link>
            </li>
            <li><Link to="/login" className="navLink">Login</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}
