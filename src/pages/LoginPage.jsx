// src/pages/LoginPage.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import loginFetch from '../api/loginFetch';
import useAuth from '../hooks/useAuth';
import LoginForm from '../components/LoginForm';
import { handleAPIError } from '@/lib/errorHandler';
import encryptStorage from '@/lib/encryptedStorage';

const LoginPage = () => {
  const { setAccessToken, setRefreshToken, isAuth, setIsAuth } = useAuth();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate('/');
    }
  }, [setIsAuth, isAuth, navigate]);

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

      console.log(response);

      encryptStorage.setItem('jwtAccessToken', response.accessToken);
      encryptStorage.setItem('jwtRefreshToken', response.refreshToken);

      setIsAuth(true);
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
