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

function App() {
  const [loggedInRole, setLoggedInRole] = useState(null);

  return (
    <Router>
      {/* Header only controls menu, no layout or background */}
      <Header role={loggedInRole} />

      {/* Main content area */}
      <main style={{ minHeight: 'calc(100vh - 60px)' }}>
        <Routes>
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
                element={<LawyerDashboard onLogout={() => setLoggedInRole(null)} />}
              />
              <Route
                path="/manage-schedule"
                element={<LawyerCalendar onBack={() => window.history.back()} />}
              />
              <Route path="/master-calendar" element={<MasterCalendar />} />
            </>
          )}

          {/* Add other role routes here */}
        </Routes>
      </main>
    </Router>
  );
}

export default App;
