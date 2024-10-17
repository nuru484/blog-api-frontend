import React, { useState } from 'react';
import signupFetch from '@/api/signupFetch';
import SignUpForm from '@/components/SignUpForm';
import { APIError } from '../api';
import useLoginAfterSignup from '@/hooks/loginAfterSignup';

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

      // Login function after successful signup
      await loginAfterSignup(credentials);
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
            setError(`${error.message}`);
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
