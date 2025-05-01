import React, { useState, useMemo } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import { mockEvents as initialEvents } from '../data/mockEvents';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {
  Dialog,
  TextField,
  MenuItem,
  Button,
  Box,
  Typography,
} from '@mui/material';
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

export default function SecretaryMasterCalendar() {
  const [events, setEvents] = useState(initialEvents);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    type: 'consultation',
    start: new Date(),
    end: new Date(),
    lawyer: '',
    client: '',
    caseNumber: '',
    court: '',
  });

  // Filters state
  const [filterLawyer, setFilterLawyer] = useState('all');
  const [filterType, setFilterType] = useState('all');

  // Unique lawyers and event types for filter dropdowns
  const lawyers = useMemo(() => {
    const unique = new Set(events.map(e => e.lawyer).filter(Boolean));
    return Array.from(unique).sort();
  }, [events]);

  const eventTypes = useMemo(() => {
    const unique = new Set(events.map(e => e.type).filter(Boolean));
    return Array.from(unique).sort();
  }, [events]);

  // Filter events based on filters
  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const lawyerMatch = filterLawyer === 'all' || event.lawyer === filterLawyer;
      const typeMatch = filterType === 'all' || event.type === filterType;
      return lawyerMatch && typeMatch;
    });
  }, [events, filterLawyer, filterType]);

  const handleDrillDown = (date) => {
    setSelectedDate(date);
  };

  const handleAddEvent = () => {
    setNewEvent({
      title: '',
      type: 'consultation',
      start: selectedDate ? new Date(selectedDate) : new Date(),
      end: selectedDate ? new Date(selectedDate) : new Date(),
      lawyer: lawyers[0] || '',
      client: '',
      caseNumber: '',
      court: '',
    });
    setShowEventModal(true);
  };

  const handleSubmitEvent = () => {
    const newId = events.length > 0 ? Math.max(...events.map(e => e.id)) + 1 : 1;
    setEvents([...events, { ...newEvent, id: newId }]);
    setShowEventModal(false);
  };

  const dailyEvents = selectedDate
    ? filteredEvents.filter(
        (event) =>
          event.start.toDateString() === selectedDate.toDateString()
      ).sort((a, b) => a.start - b.start)
    : [];

  const eventStyleGetter = (event) => ({
    style: {
      backgroundColor: {
        hearing: '#ff6b6b',
        consultation: '#4ecdc4',
        personal: '#ffe66d',
      }[event.type],
      color: '#222',
      borderRadius: '6px',
      border: 'none',
      padding: '2px 6px',
      fontWeight: '600',
      cursor: 'pointer',
    },
  });

  return (
    <Box sx={{ maxWidth: 1200, margin: '2rem auto', padding: '1rem' }}>
      <Typography variant="h4" gutterBottom>
        Secretary Master Calendar
      </Typography>

      {/* Filters */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <TextField
          select
          label="Filter by Lawyer"
          value={filterLawyer}
          onChange={(e) => setFilterLawyer(e.target.value)}
          size="small"
          sx={{ minWidth: 180 }}
        >
          <MenuItem value="all">All</MenuItem>
          {lawyers.map((lawyer) => (
            <MenuItem key={lawyer} value={lawyer}>
              {lawyer}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Filter by Event Type"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          size="small"
          sx={{ minWidth: 180 }}
        >
          <MenuItem value="all">All</MenuItem>
          {eventTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <Box sx={{ display: 'flex', gap: 3 }}>
        <Box sx={{ flex: 2, bgcolor: 'background.paper', borderRadius: 2, p: 2, boxShadow: 1 }}>
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
        </Box>
        <Box sx={{ flex: 1, bgcolor: 'background.paper', borderRadius: 2, p: 2, boxShadow: 1, minHeight: 600 }}>
          {selectedDate ? (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                  Schedule for {format(selectedDate, 'MMMM do, yyyy')}
                </Typography>
                <Button variant="contained" onClick={handleAddEvent}>
                  + Add Event
                </Button>
              </Box>
              {dailyEvents.length === 0 ? (
                <Typography>No events scheduled for this day.</Typography>
              ) : (
                dailyEvents.map((event) => (
                  <Box
                    key={event.id}
                    sx={{
                      display: 'flex',
                      gap: 1,
                      mb: 2,
                      p: 1,
                      borderRadius: 1,
                      bgcolor: eventStyleGetter(event).style.backgroundColor,
                      color: '#222',
                    }}
                  >
                    <Box sx={{ width: 80, fontSize: '0.9rem', color: '#555' }}>
                      {format(event.start, 'HH:mm')} - {format(event.end, 'HH:mm')}
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography fontWeight="bold">{event.title}</Typography>
                      {event.lawyer && <Typography>Lawyer: {event.lawyer}</Typography>}
                      {event.client && <Typography>Client: {event.client}</Typography>}
                      {event.caseNumber && <Typography>Case #: {event.caseNumber}</Typography>}
                      {event.court && <Typography>Court: {event.court}</Typography>}
                    </Box>
                  </Box>
                ))
              )}
            </>
          ) : (
            <Typography>Select a date on the calendar to see the schedule</Typography>
          )}
        </Box>
      </Box>

      <Dialog open={showEventModal} onClose={() => setShowEventModal(false)}>
        <Box sx={{ p: 3, minWidth: 400 }}>
          <Typography variant="h6" gutterBottom>
            Create New Event
          </Typography>
          <TextField
            label="Event Title"
            fullWidth
            margin="normal"
            value={newEvent.title}
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
          />
          <TextField
            select
            label="Event Type"
            fullWidth
            margin="normal"
            value={newEvent.type}
            onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
          >
            {['consultation', 'hearing', 'personal'].map((type) => (
              <MenuItem key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Lawyer"
            fullWidth
            margin="normal"
            value={newEvent.lawyer}
            onChange={(e) => setNewEvent({ ...newEvent, lawyer: e.target.value })}
          >
            {lawyers.map((lawyer) => (
              <MenuItem key={lawyer} value={lawyer}>
                {lawyer}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Client Name"
            fullWidth
            margin="normal"
            value={newEvent.client}
            onChange={(e) => setNewEvent({ ...newEvent, client: e.target.value })}
          />
          <TextField
            label="Case Number"
            fullWidth
            margin="normal"
            value={newEvent.caseNumber}
            onChange={(e) => setNewEvent({ ...newEvent, caseNumber: e.target.value })}
          />
          <TextField
            label="Court"
            fullWidth
            margin="normal"
            value={newEvent.court}
            onChange={(e) => setNewEvent({ ...newEvent, court: e.target.value })}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
            <Button onClick={() => setShowEventModal(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleSubmitEvent}>
              Create Event
            </Button>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
}
