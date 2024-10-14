// src/components/LoginForm.jsx
import React, { useState } from 'react';
import loginFetch from '../api/login';

const LoginForm = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await loginFetch(credentials);
      console.log('Logged in successfully');
    } catch (error) {
      console.error(`An error occurred: ${error.message}`);
      setError(`An error occurred: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={credentials.email}
        onChange={(e) =>
          setCredentials({ ...credentials, email: e.target.value })
        }
      />
      <input
        type="password"
        placeholder="Password"
        value={credentials.password}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
      />
      <button type="submit" disabled={loading}>
        Login
      </button>{' '}
      {loading && <p>Logging In...</p>}
      {error && <p>{error}</p>}
    </form>
  );
};

export default LoginForm;
