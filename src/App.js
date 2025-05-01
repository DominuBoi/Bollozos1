import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Appointment from './pages/Appointment';
import Login from './pages/Login';
import LawyerDashboard from './pages/LawyerDashboard';
import LawyerCalendar from './pages/LawyerCalendar';
import MasterCalendar from './pages/MasterCalendar';
import SecretaryDashboard from './pages/SecretaryDashboard';
import SecretaryMasterCalendar from './pages/SecretaryMasterCalendar';

function App() {
  const [loggedInRole, setLoggedInRole] = useState(localStorage.getItem('role') || null);

  const handleLogout = () => {
    setLoggedInRole(null);
    localStorage.clear();
  };

  return (
    <Router>
      <Header role={loggedInRole} onLogout={handleLogout} />

      <main style={{ minHeight: 'calc(100vh - 60px)' }}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/login" element={<Login setLoggedInRole={setLoggedInRole} />} />

          {/* Lawyer-only routes */}
          {loggedInRole === 'Lawyer' && (
            <>
              <Route
                path="/dashboard"
                element={<LawyerDashboard onLogout={handleLogout} />}
              />
              <Route
                path="/manage-schedule"
                element={<LawyerCalendar onBack={() => window.history.back()} />}
              />
              <Route path="/master-calendar" element={<MasterCalendar />} />
            </>
          )}

          {/* Secretary-only routes */}
          {loggedInRole === 'Secretary' && (
            <>
              <Route path="/dashboard" element={<SecretaryDashboard />} />
              <Route path="/master-calendar" element={<SecretaryMasterCalendar />} />
            </>
          )}

          {/* Optional: Redirect unknown routes to home or 404 */}
          {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
        </Routes>
      </main>
    </Router>
  );
}

export default App;
