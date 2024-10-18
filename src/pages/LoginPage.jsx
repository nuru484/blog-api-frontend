// src/pages/LoginPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import loginFetch from '../api/loginFetch';
import useAuth from '../hooks/useAuth';
import LoginForm from '../components/LoginForm';
import { handleAPIError } from '@/lib/errorHandler';

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

      navigate('/profile');
    } catch (error) {
      handleAPIError(error, setError);
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
