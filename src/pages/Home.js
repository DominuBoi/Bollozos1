import React from 'react';
import '../styles/home.css'; // Your gold/brushed background and styles here

export default function Home() {
  return (
    <div className="home-hero">
      <div className="home-content">
        <h1 className="gold-title">Welcome to Our Law Firm</h1>
        <p className="gold-desc">
          Excellence in legal services with a touch of gold.
        </p>
        <button className="gold-btn">Book Appointment</button>
      </div>
    </div>
  );
}
