// src/components/LoginForm.jsx
import React, { useState } from 'react';
import loginFetch from '../api/login';
import useAuth from '../hooks/useAuth';
import backendFetch from '../api';

const LoginForm = () => {
  const { setAccessToken, setRefreshToken } = useAuth();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);
    try {
      const response = await loginFetch(credentials);

      // Set tokens using useAuth hook
      setAccessToken(response.accessToken);
      setRefreshToken(response.refreshToken);

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
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={credentials.password}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Logging In...' : 'Login'}
      </button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default LoginForm;
