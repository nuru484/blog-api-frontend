import React, { useState } from 'react';
import loginFetch from '../api/login';
import useAuth from '../hooks/useAuth';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
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
