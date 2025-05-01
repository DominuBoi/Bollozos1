import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { mockEvents } from '../data/mockEvents';

// Localizer for react-big-calendar
const locales = { 'en-US': require('date-fns/locale/en-US') };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function MasterCalendar() {
  // Get unique lawyer names from events
  const lawyers = Array.from(
    new Set(mockEvents.map(event => event.lawyer).filter(Boolean))
  );

  const [selectedLawyer, setSelectedLawyer] = useState('all');

  // Filter events by selected lawyer
  const filteredEvents =
    selectedLawyer === 'all'
      ? mockEvents
      : mockEvents.filter(event => event.lawyer === selectedLawyer);

  return (
    <div style={styles.container}>
      <h2>Master Calendar</h2>
      <div style={styles.filterBar}>
        <label htmlFor="lawyer-select" style={styles.label}>
          Filter by Lawyer:
        </label>
        <select
          id="lawyer-select"
          value={selectedLawyer}
          onChange={e => setSelectedLawyer(e.target.value)}
          style={styles.select}
        >
          <option value="all">All Lawyers</option>
          {lawyers.map(lawyer => (
            <option key={lawyer} value={lawyer}>
              {lawyer}
            </option>
          ))}
        </select>
      </div>
      <div style={styles.calendarWrapper}>
        <Calendar
          localizer={localizer}
          events={filteredEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
        />
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 1000,
    margin: '2rem auto',
    padding: '1.5rem',
    background: '#fff',
    borderRadius: 12,
    boxShadow: '0 4px 16px rgba(102, 126, 234, 0.10)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  filterBar: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1.5rem',
    gap: '1rem',
  },
  label: {
    fontWeight: 600,
  },
  select: {
    fontSize: '1rem',
    padding: '0.3rem 0.7rem',
    borderRadius: 6,
    border: '1px solid #ccc',
  },
  calendarWrapper: {
    background: '#f5f7ff',
    borderRadius: 10,
    padding: '1rem',
  },
};
