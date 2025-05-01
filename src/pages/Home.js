import React from 'react';
import '../styles/home.css';

export default function Home() {
  return (
    <div className="home-hero">
      <div className="home-content">
        <h1 className="blue-title">Welcome to Our Law Firm</h1>
        <p className="blue-desc">
          “Justice delayed is justice denied.” - William E. Gladstone
        </p>
        <button className="blue-btn">Book Appointment</button>
      </div>
    </div>
  );
}
