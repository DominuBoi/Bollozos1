import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const tempAccounts = [
  { email: 'secretary@example.com', password: 'secret123', role: 'Secretary' },
  { email: 'admin@example.com', password: 'admin123', role: 'Admin' },
  { email: 'lawyer@example.com', password: 'lawyer123', role: 'Lawyer' },
];

export default function Login({ setLoggedInRole }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const user = tempAccounts.find(
      (acc) => acc.email === email && acc.password === password
    );

    if (user) {
      setLoggedInRole(user.role);
      localStorage.setItem('role', user.role);

      if (user.role === 'Lawyer') {
        navigate('/dashboard');
      } else if (user.role === 'Secretary') {
        navigate('/dashboard'); // Secretary dashboard route
      } else {
        navigate('/');
      }
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2>Login</h2>

        {error && <p style={styles.error}>{error}</p>}

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="username"
          style={styles.input}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
          style={styles.input}
        />

        <button type="submit" style={styles.button}>Log In</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 400,
    margin: '4rem auto',
    padding: '1rem',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    backgroundColor: '#f5f7ff',
    padding: '2rem',
    borderRadius: 12,
    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
  },
  input: {
    padding: '0.5rem',
    fontSize: '1rem',
    borderRadius: 6,
    border: '1px solid #ccc',
  },
  button: {
    backgroundColor: '#667eea',
    color: 'white',
    border: 'none',
    padding: '0.75rem',
    borderRadius: 6,
    fontWeight: '600',
    cursor: 'pointer',
  },
  error: {
    color: '#ff6b6b',
    fontWeight: '600',
  },
};
