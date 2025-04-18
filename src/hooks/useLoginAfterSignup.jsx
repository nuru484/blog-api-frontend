import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';
import loginFetch from '../api/loginFetch';

const useLoginAfterSignup = () => {
  const { setAccessToken, setRefreshToken } = useAuth();
  const navigate = useNavigate();

  const loginAfterSignup = async (credentials) => {
    try {
      const response = await loginFetch(credentials);

      setAccessToken(response.accessToken);
      setRefreshToken(response.refreshToken);

      console.log('Logged in successfully');

      navigate('/');
    } catch (error) {
      console.error('Login failed after signup:', error);
    }
  };

  return loginAfterSignup;
};

export default useLoginAfterSignup;
