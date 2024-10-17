// src/pages/SignUpPage.jsx
import React, { useState } from 'react';
import signupFetch from '@/api/signupFetch';
import SignUpForm from '@/components/SignUpForm';
import useLoginAfterSignup from '@/hooks/loginAfterSignup';
import { handleAPIError } from '@/utils/lib/errorHandler';

const SignUpPage = () => {
  const [credentials, setCredentials] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'USER',
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const loginAfterSignup = useLoginAfterSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);
    try {
      const response = await signupFetch(credentials);

      console.log('Signup successful');

      // Login after successful signup
      await loginAfterSignup(credentials);
    } catch (error) {
      handleAPIError(error, setError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SignUpForm
      credentials={credentials}
      setCredentials={setCredentials}
      handleSubmit={handleSubmit}
      loading={loading}
      error={error}
    />
  );
};

export default SignUpPage;
