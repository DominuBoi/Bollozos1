import React, { useState } from 'react';
import '../styles/appointmentForm.css';

const AppointmentForm = () => {
  const [form, setForm] = useState({ name: '', email: '', date: '', time: '' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    alert('Appointment requested! We will contact you soon.');
    setForm({ name: '', email: '', date: '', time: '' });
  };

  return (
    <form className="appointment-form" onSubmit={handleSubmit}>
      <h2>Book an Appointment</h2>
      <input name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required />
      <input type="email" name="email" placeholder="Your Email" value={form.email} onChange={handleChange} required />
      <input type="date" name="date" value={form.date} onChange={handleChange} required />
      <input type="time" name="time" value={form.time} onChange={handleChange} required />
      <button type="submit">Book Now</button>
    </form>
  );
};

export default AppointmentForm;
