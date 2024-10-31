import React, { useState } from 'react';
import signupFetch from '@/api/signupFetch';
import SignUpForm from '@/components/SignUpForm';
import useLoginAfterSignup from '@/hooks/useLoginAfterSignup';
import { handleAPIError } from '@/lib/errorHandler';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const SignUpPage = ({ role }) => {
  const [credentials, setCredentials] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
    role,
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const loginAfterSignup = useLoginAfterSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);
    try {
      const response = await signupFetch(credentials);

      console.log('Signup successful');

      setIsDialogOpen(true);
    } catch (error) {
      handleAPIError(error, setError);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    try {
      await loginAfterSignup(credentials);
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Login after signup failed:', error);
      handleAPIError(error, setError);
    }
  };

  return (
    <>
      <SignUpForm
        credentials={credentials}
        setCredentials={setCredentials}
        handleSubmit={handleSubmit}
        loading={loading}
        error={error}
      />

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent className="bg-blue-600 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">
              Sign Up Successful
            </AlertDialogTitle>
            <AlertDialogDescription className="text-blue-100">
              Click Login to log in automatically or Cancel to stay on this
              page.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-blue-500 text-white hover:bg-blue-600">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleLogin}
              className="bg-white text-blue-600 hover:bg-blue-100"
            >
              Login
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default SignUpPage;
