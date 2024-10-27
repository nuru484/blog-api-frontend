import React, { createContext, useEffect, useState } from 'react';
import encryptStorage from '../lib/encryptedStorage';
import Loading from '@/components/ui/loading';
import { backendFetch } from '../api';

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

  useEffect(() => {
    const getUserFromToken = async () => {
      setLoading(true);
      try {
        console.log(
          'Attempting to retrieve user data with access token:',
          accessToken
        );

        // Initial fetch for user data using access token
        const response = await backendFetch(`/api/v1/user-token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: accessToken ? `Bearer ${accessToken}` : '',
          },
        });

        if (!response.ok && response.status === 401 && refreshToken) {
          console.log('Access token expired, attempting to refresh token...');

          const refreshResponse = await backendFetch(`/api/v1/refreshToken`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken }),
          });

          if (!refreshResponse.ok) {
            console.error('Refresh token invalid or expired. Logging out...');
            logout(); // Log out if refresh fails
            return;
          }

          const { accessToken: newAccessToken, user } =
            await refreshResponse.json();
          setAccessToken(newAccessToken);
          setAuthUser(user);
          setIsAuth(true);
        } else if (response.ok) {
          // If access token is valid, set the user data
          const userData = await response.json();
          setAuthUser(userData);
          setIsAuth(true);
        }
      } catch (error) {
        console.error('Authentication error:', error);
        logout(); // Log out on any error during authentication
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

  const logout = () => {
    // Clear tokens and reset authentication state
    setAccessToken(null);
    setRefreshToken(null);
    setAuthUser(null);
    setIsAuth(false);

    // Remove tokens from encrypted storage
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
      {loading ? (
        <div className="flex items-center justify-center my-5">
          <Loading height={24} width={24} color="#1D4ED8" />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export default AuthContext;
