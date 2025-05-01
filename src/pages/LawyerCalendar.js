import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import { mockEvents } from '../data/mockEvents';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Dialog, TextField, MenuItem, Button } from '@mui/material';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const locales = { 'en-US': require('date-fns/locale/en-US') };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function LawyerCalendar({ lawyerName = "Atty. Juan Dela Cruz" }) {
  const [events, setEvents] = useState(mockEvents.filter(e => e.lawyer === lawyerName));
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    type: 'consultation',
    start: new Date(),
    end: new Date(),
    client: '',
    caseNumber: '',
    court: ''
  });

  const eventStyleGetter = (event) => ({
    style: {
      backgroundColor: {
        hearing: '#ff6b6b',
        consultation: '#4ecdc4',
        personal: '#ffe66d'
      }[event.type],
      color: '#222',
      borderRadius: '6px',
      border: 'none',
      padding: '2px 6px',
      fontWeight: '600',
      cursor: 'pointer',
    }
  });

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setNewEvent({
      title: event.title,
      type: event.type,
      start: event.start,
      end: event.end,
      client: event.client || '',
      caseNumber: event.caseNumber || '',
      court: event.court || ''
    });
    setShowEventModal(true);
  };

  // This is called when you click a day cell in month view
  const handleDrillDown = (date, view) => {
    setSelectedDate(date);
  };

  const handleSubmitEvent = () => {
    if (selectedEvent) {
      const updatedEvents = events.map(evt =>
        evt.id === selectedEvent.id ? { ...selectedEvent, ...newEvent } : evt
      );
      setEvents(updatedEvents);
    } else {
      const newId = events.length > 0 ? Math.max(...events.map(e => e.id)) + 1 : 1;
      setEvents([...events, { ...newEvent, id: newId, lawyer: lawyerName }]);
    }
    setShowEventModal(false);
    setSelectedEvent(null);
    setNewEvent({
      title: '',
      type: 'consultation',
      start: new Date(),
      end: new Date(),
      client: '',
      caseNumber: '',
      court: ''
    });
  };

  const dailyEvents = selectedDate
    ? events.filter(event => event.start.toDateString() === selectedDate.toDateString())
      .sort((a, b) => a.start - b.start)
    : [];

  return (
    <div style={styles.container}>
      <div style={styles.calendarSection}>
        <div style={styles.header}>
          <h2>{lawyerName}'s Calendar</h2>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setSelectedEvent(null);
              setShowEventModal(true);
              setNewEvent({
                title: '',
                type: 'consultation',
                start: new Date(),
                end: new Date(),
                client: '',
                caseNumber: '',
                court: ''
              });
            }}
          >
            + New Event
          </Button>
        </div>

        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 700 }}
          eventPropGetter={eventStyleGetter}
          onSelectEvent={handleSelectEvent}
          onDrillDown={handleDrillDown}
          selectable={false}
          view="month"
          views={['month']}
          // No components prop: this uses the default toolbar!
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
                      <strong>{event.title}</strong>
                      {event.client && <div>Client: {event.client}</div>}
                      {event.caseNumber && <div>Case #: {event.caseNumber}</div>}
                      {event.court && <div>Court: {event.court}</div>}
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

      <Dialog open={showEventModal} onClose={() => setShowEventModal(false)}>
        <div style={styles.modalContent}>
          <h3>{selectedEvent ? 'Edit Event' : 'Create New Event'}</h3>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TextField
              label="Event Title"
              fullWidth
              margin="normal"
              value={newEvent.title}
              onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
            />
            <DateTimePicker
              label="Start Time"
              value={newEvent.start}
              onChange={date => setNewEvent({ ...newEvent, start: date })}
              renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
            />
            <DateTimePicker
              label="End Time"
              value={newEvent.end}
              onChange={date => setNewEvent({ ...newEvent, end: date })}
              renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
            />
            <TextField
              select
              label="Event Type"
              fullWidth
              margin="normal"
              value={newEvent.type}
              onChange={e => setNewEvent({ ...newEvent, type: e.target.value })}
            >
              {['consultation', 'hearing', 'personal'].map(type => (
                <MenuItem key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Client Name"
              fullWidth
              margin="normal"
              value={newEvent.client}
              onChange={e => setNewEvent({ ...newEvent, client: e.target.value })}
            />
            <TextField
              label="Case Number"
              fullWidth
              margin="normal"
              value={newEvent.caseNumber}
              onChange={e => setNewEvent({ ...newEvent, caseNumber: e.target.value })}
            />
            <TextField
              label="Court"
              fullWidth
              margin="normal"
              value={newEvent.court}
              onChange={e => setNewEvent({ ...newEvent, court: e.target.value })}
            />
            <div style={styles.modalActions}>
              <Button onClick={() => setShowEventModal(false)}>Cancel</Button>
              <Button variant="contained" color="primary" onClick={handleSubmitEvent}>
                {selectedEvent ? 'Update' : 'Create'} Event
              </Button>
            </div>
          </LocalizationProvider>
        </div>
      </Dialog>
    </div>
  );
}

const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '2rem',
    padding: '2rem',
    maxWidth: 1400,
    margin: '0 auto',
    backgroundColor: '#f5f7fa',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
  },
  calendarSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: '1.5rem',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
  },
  dailyView: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: '1.5rem',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
    height: 'fit-content',
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
    width: 100,
    color: '#666',
    fontSize: '0.9rem',
  },
  eventCard: {
    flex: 1,
    padding: '0.8rem',
    borderRadius: 8,
    color: '#222',
  },
  modalContent: {
    padding: '2rem',
    minWidth: 400,
  },
  modalActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '1rem',
    marginTop: '1.5rem',
  },
};
