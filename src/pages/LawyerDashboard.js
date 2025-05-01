import React, { useState } from 'react';
import { mockEvents } from '../data/mockEvents';

export default function LawyerDashboard() {
  const lawyerName = "Atty. Juan Dela Cruz"; // Hardcoded for demo

  // State for selected event type filter
  const [filterType, setFilterType] = useState('all');

  // Filter upcoming events for this lawyer and by type
  const upcomingEvents = mockEvents
    .filter(event => event.lawyer === lawyerName && event.start >= new Date())
    .filter(event => filterType === 'all' || event.type === filterType)
    .sort((a, b) => a.start - b.start);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Welcome, {lawyerName}</h1>
      </header>

      <section>
        <h2>Upcoming Events</h2>

        {/* Event type filter dropdown */}
        <div style={styles.filterContainer}>
          <label htmlFor="event-type" style={styles.filterLabel}>Filter by Event Type:</label>
          <select
            id="event-type"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            style={styles.select}
          >
            <option value="all">All</option>
            <option value="hearing">Hearing</option>
            <option value="consultation">Consultation</option>
            <option value="personal">Personal</option>
          </select>
        </div>

        {upcomingEvents.length === 0 ? (
          <p>No upcoming events.</p>
        ) : (
          <ul style={styles.eventList}>
            {upcomingEvents.map(event => (
              <li key={event.id} style={styles.eventItem}>
                <div style={styles.titleRow}>
                  <strong>{event.title}</strong>
                  <span style={{ ...styles.badge, ...badgeColors[event.type] }}>
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
    marginBottom: '2rem',
  },
  filterContainer: {
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  filterLabel: {
    fontWeight: '600',
  },
  select: {
    padding: '0.3rem 0.6rem',
    fontSize: '1rem',
    borderRadius: 6,
    border: '1px solid #ccc',
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
