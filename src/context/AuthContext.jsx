import React, { createContext, useEffect, useState } from 'react';
import { encryptStorage } from '../utils/encryptedStorage';
import backendFetch from '../api';

const AuthContext = createContext({
  accessToken: null,
  refreshToken: null,
  authUser: null,
  isAuth: false,
  setAccessToken: () => null,
  setRefreshToken: () => null,
  setAuthUser: () => null,
  setIsAuth: () => false,
  logout: () => null,
});

// Helper function to retrieve tokens from encrypted storage
const retrieveTokenFromEncryptedStorage = () => {
  try {
    const accessToken = encryptStorage.getItem('jwtAccessToken') || null;
    const refreshToken = encryptStorage.getItem('jwtRefreshToken') || null;
    return { accessToken, refreshToken };
  } catch (error) {
    console.error('Error retrieving tokens:', error);
    return { accessToken: null, refreshToken: null };
  }
};

export const AuthContextProvider = ({ children }) => {
  const { accessToken: initialAccessToken, refreshToken: initialRefreshToken } =
    retrieveTokenFromEncryptedStorage();

  const [accessToken, setAccessToken] = useState(initialAccessToken);
  const [refreshToken, setRefreshToken] = useState(initialRefreshToken);
  const [authUser, setAuthUser] = useState(null);
  const [isAuth, setIsAuth] = useState(!!initialAccessToken);
  const [loading, setLoading] = useState(true);

  // Effect to store tokens in encrypted storage
  useEffect(() => {
    if (accessToken && refreshToken) {
      encryptStorage.setItem('jwtAccessToken', accessToken);
      encryptStorage.setItem('jwtRefreshToken', refreshToken);
    } else {
      encryptStorage.removeItem('jwtAccessToken');
      encryptStorage.removeItem('jwtRefreshToken');
    }
  }, [accessToken, refreshToken]);

  // Fetch user details based on token
  useEffect(() => {
    const getUserFromToken = async () => {
      setLoading(true);
      try {
        const response = await backendFetch(`/api/v1/user-token`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: accessToken ? `Bearer ${accessToken}` : '',
          },
        });

        if (!response.ok) {
          if (response.status === 401 && refreshToken) {
            // Attempt to refresh token using refresh token
            const refreshResponse = await backendFetch(`/api/v1/refreshToken`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ refreshToken }),
            });

            if (!refreshResponse.ok) {
              throw new Error('Token refresh failed');
            }

            const { accessToken: newAccessToken, user } =
              await refreshResponse.json();
            setAccessToken(newAccessToken);
            setAuthUser(user);
            setIsAuth(true);
          } else {
            throw new Error('Error fetching user details');
          }
        } else {
          const userData = await response.json();
          setAuthUser(userData);
          setIsAuth(true);
        }
      } catch (error) {
        console.error('Authentication error:', error);
        setAuthUser(null);
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    };

    if (accessToken) {
      getUserFromToken();
    } else {
      setLoading(false);
    }
  }, [accessToken, refreshToken]);

  // Logout function to clear tokens and reset state
  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    setAuthUser(null);
    setIsAuth(false);
    encryptStorage.removeItem('jwtAccessToken');
    encryptStorage.removeItem('jwtRefreshToken');
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        authUser,
        isAuth,
        setAccessToken,
        setRefreshToken,
        setAuthUser,
        setIsAuth,
        logout,
      }}
    >
      {loading ? 'Loading...' : children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
