import React, { useState, useMemo } from 'react';
import { mockEvents } from '../data/mockEvents';
import format from 'date-fns/format';
import { TextField, MenuItem } from '@mui/material';

const eventColors = {
  consultation: '#4ecdc4',
  hearing: '#ff6b6b',
  personal: '#ffe66d',
  private: '#ffe66d',
};

export default function SecretaryDashboard() {
  const [selectedLawyer, setSelectedLawyer] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const lawyers = useMemo(() => {
    const unique = new Set(mockEvents.map(e => e.lawyer).filter(Boolean));
    return Array.from(unique).sort();
  }, []);

  const eventTypes = useMemo(() => {
    const unique = new Set(mockEvents.map(e => e.type).filter(Boolean));
    return Array.from(unique).sort();
  }, []);

  const filteredEvents = useMemo(() => {
    return mockEvents.filter(event => {
      const lawyerMatch = selectedLawyer === 'all' || event.lawyer === selectedLawyer;
      const typeMatch = selectedType === 'all' || event.type === selectedType;
      return lawyerMatch && typeMatch;
    });
  }, [selectedLawyer, selectedType]);

  return (
    <div style={styles.container}>
      <h2>Secretary Dashboard</h2>

      <div style={styles.filters}>
        <TextField
          select
          label="Filter by Lawyer"
          value={selectedLawyer}
          onChange={e => setSelectedLawyer(e.target.value)}
          style={styles.select}
          size="small"
        >
          <MenuItem value="all">All</MenuItem>
          {lawyers.map(lawyer => (
            <MenuItem key={lawyer} value={lawyer}>
              {lawyer}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Filter by Event Type"
          value={selectedType}
          onChange={e => setSelectedType(e.target.value)}
          style={styles.select}
          size="small"
        >
          <MenuItem value="all">All</MenuItem>
          {eventTypes.map(type => (
            <MenuItem key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </MenuItem>
          ))}
        </TextField>
      </div>

      <div style={styles.timeline}>
        {filteredEvents.length === 0 ? (
          <p>No events found.</p>
        ) : (
          filteredEvents
            .sort((a, b) => a.start - b.start)
            .map(event => (
              <div
                key={event.id}
                style={{
                  ...styles.timelineItem,
                  borderLeft: `6px solid ${eventColors[event.type] || '#ccc'}`,
                  backgroundColor: `${eventColors[event.type] ? eventColors[event.type] + '22' : '#f9f9ff'}`,
                }}
              >
                <div>
                  <strong>{format(event.start, 'PPPp')}</strong>
                  <div>{event.title}</div>
                  <div>Lawyer: {event.lawyer}</div>
                  {event.client && <div>Client: {event.client}</div>}
                  {event.caseNumber && <div>Case #: {event.caseNumber}</div>}
                  {event.court && <div>Court: {event.court}</div>}
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 900,
    margin: '2rem auto',
    padding: '1rem',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  filters: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1rem',
  },
  select: {
    minWidth: 180,
  },
  timeline: {
    marginTop: '1rem',
  },
  timelineItem: {
    padding: '1rem',
    borderBottom: '1px solid #eee',
    borderRadius: 8,
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
};
