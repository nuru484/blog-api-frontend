import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import loginFetch from '../api/login';
import useAuth from '../hooks/useAuth';
import LoginForm from '../components/LoginForm';
import { APIError } from '../api';

const LoginPage = () => {
  const { setAccessToken, setRefreshToken, isAuth } = useAuth();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate('/admin-page');
    }
  }, [isAuth, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);
    try {
      const response = await loginFetch(credentials);
      // ... handle successful login

      // Set tokens using useAuth hook
      setAccessToken(response.accessToken);
      setRefreshToken(response.refreshToken);

      console.log('Logged in successfully');

      // Navigate to admin page immediately after successful login
      navigate('/admin-page');
    } catch (error) {
      if (error instanceof APIError) {
        switch (error.type) {
          case 'NETWORK_ERROR':
            setError(
              'Unable to connect to the server. Please check your internet connection.'
            );
            break;
          case 'ABORT_ERROR':
            setError('The request was aborted. Please try again.');
            break;
          case 'PARSE_ERROR':
            setError(
              'There was a problem processing the server response. Please try again.'
            );
            break;
          default:
            setError(`Login failed: ${error.message}`);
        }
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
      console.error(`An error occurred: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginForm
      credentials={credentials}
      setCredentials={setCredentials}
      handleSubmit={handleSubmit}
      loading={loading}
      error={error}
    />
  );
};

export default LoginPage;
