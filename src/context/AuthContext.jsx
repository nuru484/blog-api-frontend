import { createContext, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { backendFetch } from '../api';
import { handleAPIError } from '@/lib/errorHandler';
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

  // Get tokens from storage only when needed, not at component declaration
  const getTokens = useCallback(
    () => ({
      accessToken: encryptStorage.getItem('jwtAccessToken'),
      refreshToken: encryptStorage.getItem('jwtRefreshToken'),
    }),
    []
  );

  const logout = useCallback(() => {
    setAuthUser(null);
    encryptStorage.setItem('jwtAccessToken', null);
    encryptStorage.setItem('jwtRefreshToken', null);
  }, []);

  const tokenRefresh = useCallback(async () => {
    const { refreshToken } = getTokens();
    if (!refreshToken) {
      logout();
      return null;
    }

    try {
      const refreshResponse = await backendFetch(`/api/v1/refreshToken`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });

      if (refreshResponse?.newAccessToken) {
        encryptStorage.setItem(
          'jwtAccessToken',
          refreshResponse.newAccessToken
        );
        return refreshResponse.newAccessToken;
      } else {
        logout();
        return null;
      }
    } catch (error) {
      handleAPIError(error, setError);
      logout();
      return null;
    }
  }, [getTokens, logout]);

  const getUserFromToken = useCallback(
    async (forceRefresh = false) => {
      const { accessToken, refreshToken } = getTokens();

      if (!accessToken) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        let tokenToUse = accessToken;

        // If refresh is forced, get a new token first
        if (forceRefresh && refreshToken) {
          const newToken = await tokenRefresh();
          if (!newToken) return;
          tokenToUse = newToken;
        }

        const response = await backendFetch(`/api/v1/user-token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tokenToUse}`,
          },
        });

        if (response?.user) {
          setAuthUser(response.user);
        } else {
          setAuthUser(null);
        }
      } catch (error) {
        console.log(`The error: ${error}`);

        // Check for 401 Unauthorized error
        if (error.response?.status === 401 && refreshToken && !forceRefresh) {
          console.log('Token expired, attempting refresh');
          const newToken = await tokenRefresh();
          if (newToken) {
            // Retry with the new token, but prevent infinite loop
            return getUserFromToken(true);
          }
        } else {
          handleAPIError(error, setError);
          logout();
        }
      } finally {
        setLoading(false);
      }
    },
    [getTokens, tokenRefresh, logout]
  );

  // Set up token refresh interval
  useEffect(() => {
    const { accessToken, refreshToken } = getTokens();

    if (!accessToken || !refreshToken) {
      setLoading(false);
      return;
    }

    // Initialize authentication on mount
    getUserFromToken();

    // Set up periodic token refresh (e.g., every 10 minutes)
    const refreshInterval = setInterval(() => {
      const { accessToken, refreshToken } = getTokens();
      if (accessToken && refreshToken) {
        tokenRefresh().then((newToken) => {
          if (newToken) {
            console.log('Token refreshed during interval');
          }
        });
      } else {
        clearInterval(refreshInterval);
      }
    }, 10 * 60 * 1000); // 10 minutes

    return () => clearInterval(refreshInterval);
  }, [getTokens, getUserFromToken, tokenRefresh]);

  return (
    <AuthContext.Provider
      value={{
        authUser,
        logout,
        loading,
        error,
        refreshAuth: () => getUserFromToken(false),
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
