// src/components/AddEventForm.js
import React, { useState } from 'react';

export default function AddEventForm({ onAddEvent }) {
  const [formData, setFormData] = useState({
    title: '',
    type: 'consultation',
    start: '',
    end: '',
    client: '',
    caseNumber: '',
    court: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      ...formData,
      start: new Date(formData.start),
      end: new Date(formData.end)
    };
    onAddEvent(newEvent);
    setFormData({ /* reset form */ });
  };

  return (
    <form onSubmit={handleSubmit} className="event-form">
      <h3>Add New Event</h3>
      
      <label>
        Event Type:
        <select 
          value={formData.type} 
          onChange={(e) => setFormData({...formData, type: e.target.value})}
        >
          <option value="hearing">Hearing</option>
          <option value="consultation">Consultation</option>
          <option value="personal">Personal</option>
        </select>
      </label>

      <label>
        Title:
        <input 
          type="text" 
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          required 
        />
      </label>

      {/* Add more fields as needed */}

      <button type="submit">Add Event</button>
    </form>
  );
}
