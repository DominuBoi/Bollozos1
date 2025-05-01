import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/header.css';

export default function Header({ role, onLogout }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();

    const confirmLogout = window.confirm('Are you sure you want to log out?');
    if (!confirmLogout) return;

    localStorage.clear();

    if (onLogout) onLogout();

    navigate('/');
  };

  return (
    <nav className="nav">
      <div className="navLeft">
        <Link to="/" className={`homeBtn${location.pathname === '/' ? ' active' : ''}`}>
          Home
        </Link>
        <div className="brand">
          <span className="logo" role="img" aria-label="scales of justice">
            ⚖️
          </span>
          <span className="officeName">Bollozos Law Office</span>
        </div>
      </div>
      <ul className="navList">
        {role === 'Lawyer' ? (
          <>
            <li>
              <Link to="/dashboard" className="navLink">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/manage-schedule" className="navLink">
                Manage My Schedule
              </Link>
            </li>
            <li>
              <Link to="/master-calendar" className="navLink">
                View Master Calendar
              </Link>
            </li>
            <li>
              <Link to="/login" className="navLink" onClick={handleLogout}>
                Logout
              </Link>
            </li>
          </>
        ) : role === 'Secretary' ? (
          <>
            <li>
              <Link to="/dashboard" className="navLink">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/master-calendar" className="navLink">
                View Master Calendar
              </Link>
            </li>
            <li>
              <Link to="/login" className="navLink" onClick={handleLogout}>
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/about" className="navLink">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="navLink">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/appointment" className="bookAppointmentBtn">
                Book Appointment
              </Link>
            </li>
            <li>
              <Link to="/login" className="navLink">
                Login
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
