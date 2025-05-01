import React, { useState, useMemo } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import { mockEvents } from '../data/mockEvents';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = { 'en-US': require('date-fns/locale/en-US') };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function MasterCalendar() {
  const [selectedLawyer, setSelectedLawyer] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedDate, setSelectedDate] = useState(null);

  // Get unique lawyers for filter dropdown
  const lawyers = useMemo(() => {
    const unique = new Set(mockEvents.map(e => e.lawyer).filter(Boolean));
    return Array.from(unique).sort();
  }, []);

  // Get unique event types for filter dropdown
  const eventTypes = useMemo(() => {
    const unique = new Set(mockEvents.map(e => e.type).filter(Boolean));
    return Array.from(unique).sort();
  }, []);

  // Filter events by lawyer and type
  const filteredEvents = useMemo(() => {
    return mockEvents.filter(event => {
      const lawyerMatch = selectedLawyer === 'all' || event.lawyer === selectedLawyer;
      const typeMatch = selectedType === 'all' || event.type === selectedType;
      return lawyerMatch && typeMatch;
    });
  }, [selectedLawyer, selectedType]);

  // Events for the selected date
  const dailyEvents = useMemo(() => {
    if (!selectedDate) return [];
    return filteredEvents
      .filter(event => event.start.toDateString() === selectedDate.toDateString())
      .sort((a, b) => a.start - b.start);
  }, [selectedDate, filteredEvents]);

  const eventStyleGetter = (event) => ({
    style: {
      backgroundColor: {
        hearing: '#ff6b6b',
        consultation: '#4ecdc4',
        personal: '#ffe66d',
        private: '#ffe66d',
      }[event.type] || '#b2bec3',
      color: '#222',
      borderRadius: '6px',
      border: 'none',
      padding: '2px 6px',
      fontWeight: '600',
      cursor: 'default',
    }
  });

  // When user clicks a day cell (month view)
  const handleDrillDown = (date, view) => {
    setSelectedDate(date);
  };

  return (
    <div style={styles.container}>
      <h2>Master Calendar</h2>

      <div style={styles.filters}>
        <label>
          Filter by Lawyer:&nbsp;
          <select
            value={selectedLawyer}
            onChange={e => setSelectedLawyer(e.target.value)}
            style={styles.select}
          >
            <option value="all">All</option>
            {lawyers.map(lawyer => (
              <option key={lawyer} value={lawyer}>{lawyer}</option>
            ))}
          </select>
        </label>

        <label>
          Filter by Event Type:&nbsp;
          <select
            value={selectedType}
            onChange={e => setSelectedType(e.target.value)}
            style={styles.select}
          >
            <option value="all">All</option>
            {eventTypes.map(type => (
              <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
            ))}
          </select>
        </label>
      </div>

      <div style={styles.main}>
        <div style={styles.calendarWrapper}>
          <Calendar
            localizer={localizer}
            events={filteredEvents}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 700 }}
            eventPropGetter={eventStyleGetter}
            onDrillDown={handleDrillDown}
            selectable={false}
            view="month"
            views={['month']}
            drilldownView="day"
          />
        </div>

        <div style={styles.dailyView}>
          {selectedDate ? (
            <>
              <h3>Schedule for {format(selectedDate, 'MMMM do, yyyy')}</h3>
              {dailyEvents.length === 0 ? (
                <p>No events scheduled for this day.</p>
              ) : (
                <div style={styles.timeline}>
                  {dailyEvents.map(event => (
                    <div key={event.id} style={styles.timelineItem}>
                      <div style={styles.timeSlot}>
                        {format(event.start, 'HH:mm')} - {format(event.end, 'HH:mm')}
                      </div>
                      <div style={{ ...styles.eventCard, backgroundColor: eventStyleGetter(event).style.backgroundColor }}>
                        <strong>{event.title}</strong><br />
                        {event.lawyer && <span>Lawyer: {event.lawyer}<br /></span>}
                        {event.client && <span>Client: {event.client}<br /></span>}
                        {event.caseNumber && <span>Case #: {event.caseNumber}<br /></span>}
                        {event.court && <span>Court: {event.court}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <h3>Select a date on the calendar to see the schedule</h3>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 1100,
    margin: '2rem auto',
    padding: '1rem',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  filters: {
    display: 'flex',
    gap: '1.5rem',
    marginBottom: '1rem',
    alignItems: 'center',
  },
  select: {
    padding: '0.3rem 0.6rem',
    fontSize: '1rem',
    borderRadius: 6,
    border: '1px solid #ccc',
  },
  main: {
    display: 'flex',
    gap: '2rem',
  },
  calendarWrapper: {
    flex: 2,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: '1rem',
    boxShadow: '0 4px 8px rgb(0 0 0 / 0.1)',
  },
  dailyView: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: '1rem',
    boxShadow: '0 4px 8px rgb(0 0 0 / 0.1)',
    minHeight: 600,
  },
  timeline: {
    marginTop: '1rem',
  },
  timelineItem: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1rem',
  },
  timeSlot: {
    width: 80,
    color: '#666',
    fontSize: '0.9rem',
  },
  eventCard: {
    flex: 1,
    padding: '0.8rem',
    borderRadius: 8,
    color: '#222',
  },
};
