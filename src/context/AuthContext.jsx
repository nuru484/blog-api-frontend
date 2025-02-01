import { createContext, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { backendFetch } from '../api';
import { handleAPIError } from '@/lib/errorHandler';
import retrieveTokenFromEncryptedStorage from '@/lib/retrieveTokenFromEncryptedStorage';
import encryptStorage from '@/lib/encryptedStorage';

const AuthContext = createContext({
  authUser: null,
  logout: () => {},
  loading: true,
  error: null,
});

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  useEffect(() => {
    const { accessToken: storedAccessToken, refreshToken: storedRefreshToken } =
      retrieveTokenFromEncryptedStorage();

    setAccessToken(storedAccessToken);
    setRefreshToken(storedRefreshToken);
  }, []);

  const logout = () => {
    setAuthUser(null);
    setAccessToken(null);
    setRefreshToken(null);
    encryptStorage.setItem('jwtAccessToken', null);
    encryptStorage.setItem('jwtRefreshToken', null);
  };

  const tokenRefresh = useCallback(async () => {
    try {
      const refreshResponse = await backendFetch(`/api/v1/refreshToken`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });

      if (refreshResponse?.newAccessToken) {
        setAccessToken(refreshResponse.newAccessToken);
        return refreshResponse.newAccessToken;
      } else {
        logout();
      }
    } catch (error) {
      handleAPIError(error, setError);
      logout();
    }
  }, [refreshToken]);

  useEffect(() => {
    const getUserFromToken = async () => {
      if (!accessToken) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        let tokenToUse = accessToken;

        const response = await backendFetch(`/api/v1/user-token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tokenToUse}`,
          },
        });

        if (response?.user) {
          setAuthUser(response.user);
        }
      } catch (error) {
        if (error.response?.status === 401 && refreshToken) {
          // If token is expired, refresh it
          const newToken = await tokenRefresh();
          if (newToken) {
            getUserFromToken();
          }
        } else {
          handleAPIError(error, setError);
          logout();
        }
      } finally {
        setLoading(false);
      }
    };

    getUserFromToken();
  }, [accessToken, refreshToken, tokenRefresh]);

  return (
    <AuthContext.Provider
      value={{
        authUser,
        logout,
        loading,
        error,
        setAccessToken,
        setRefreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
