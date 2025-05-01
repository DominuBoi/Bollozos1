import React from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { mockEvents } from '../data/mockEvents';

const locales = { 'en-US': require('date-fns/locale/en-US') };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function LawyerCalendar({ lawyerName = "Atty. Juan Dela Cruz", onBack }) {
  // Filter events for the current lawyer
  const lawyerEvents = mockEvents.filter(event => event.lawyer === lawyerName);

  return (
    <div style={{ maxWidth: 900, margin: '2rem auto', padding: '1rem', background: 'white', borderRadius: 10 }}>
      <button onClick={onBack} style={{ marginBottom: 20, background: '#667eea', color: 'white', border: 'none', borderRadius: 6, padding: '0.5rem 1rem', cursor: 'pointer' }}>
        ← Back to Dashboard
      </button>
      <h2>{lawyerName}'s Calendar</h2>
      <Calendar
        localizer={localizer}
        events={lawyerEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600, marginTop: 20 }}
      />
    </div>
  );
}
