import React, { useState } from 'react';
import { mockEvents } from '../data/mockEvents';
import LawyerCalendar from './LawyerCalendar';

export default function LawyerDashboard({ onLogout }) {
  const [showCalendar, setShowCalendar] = useState(false);
  const lawyerName = "Atty. Sigma Gooner"; // Hardcoded for demo

  // Filter upcoming events for this lawyer, sorted by start date/time
  const upcomingEvents = mockEvents
    .filter(event => event.lawyer === lawyerName && event.start >= new Date())
    .sort((a, b) => a.start - b.start);

  if (showCalendar) {
    return (
      <LawyerCalendar
        lawyerName={lawyerName}
        onBack={() => setShowCalendar(false)}
      />
    );
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Welcome, {lawyerName}</h1>
        <div>
          <button style={styles.scheduleBtn} onClick={() => setShowCalendar(true)}>
            Manage My Schedule
          </button>
          <button style={styles.logoutBtn} onClick={onLogout}>Logout</button>
        </div>
      </header>

      <section>
        <h2>Upcoming Events</h2>
        {upcomingEvents.length === 0 ? (
          <p>No upcoming events.</p>
        ) : (
          <ul style={styles.eventList}>
            {upcomingEvents.map(event => (
              <li key={event.id} style={styles.eventItem}>
                <div style={styles.titleRow}>
                  <strong>{event.title}</strong>
                  <span style={{...styles.badge, ...badgeColors[event.type]}}>
                    {capitalize(event.type)}
                  </span>
                </div>
                <div style={styles.datetime}>
                  {formatDateTime(event.start)} - {formatTime(event.end)}
                </div>
                {event.client && <div>Client: {event.client}</div>}
                {event.caseNumber && <div>Case #: {event.caseNumber}</div>}
                {event.court && <div>Court: {event.court}</div>}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

// Helper to capitalize first letter
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

// Format date/time nicely
const formatDateTime = (date) => date.toLocaleString(undefined, {
  weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
  hour: '2-digit', minute: '2-digit'
});
const formatTime = (date) => date.toLocaleTimeString(undefined, {
  hour: '2-digit', minute: '2-digit'
});

const badgeColors = {
  hearing: { backgroundColor: '#ff6b6b', color: 'white' },
  consultation: { backgroundColor: '#4ecdc4', color: 'white' },
  personal: { backgroundColor: '#ffe66d', color: '#333' },
};

const styles = {
  container: {
    maxWidth: 700,
    margin: '2rem auto',
    padding: '0 1rem',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#333',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
  },
  logoutBtn: {
    backgroundColor: '#4ecdc4',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: 6,
    cursor: 'pointer',
    fontWeight: '600',
    marginLeft: 12,
  },
  scheduleBtn: {
    backgroundColor: '#667eea',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: 6,
    cursor: 'pointer',
    fontWeight: '600',
    marginRight: 8,
  },
  eventList: {
    listStyle: 'none',
    padding: 0,
  },
  eventItem: {
    backgroundColor: '#f0f9f9',
    borderRadius: 8,
    padding: '1rem',
    marginBottom: '1rem',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
  },
  titleRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  badge: {
    padding: '0.2rem 0.6rem',
    borderRadius: 12,
    fontSize: '0.8rem',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  datetime: {
    fontSize: '0.9rem',
    color: '#555',
    marginBottom: 6,
  },
};
