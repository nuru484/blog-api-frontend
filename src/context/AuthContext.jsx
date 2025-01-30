import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import encryptStorage from '../lib/encryptedStorage';
import Loading from '@/components/ui/loading';
import { backendFetch } from '../api';
import { handleAPIError } from '@/lib/errorHandler';
import { jwtDecode } from 'jwt-decode';
import retrieveTokenFromEncryptedStorage from '@/lib/retrieveTokenFromEncryptedStorage';

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

const tokenRefresh = async () => {
  setLoading(true);
  setError(null);

  try {
    const refreshResponse = await backendFetch(`/api/v1/refreshToken`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    setAccessToken(refreshResponse.newAccessToken);
  } catch (error) {
    handleAPIError(error, setError);
    logout();
  } finally {
    setLoading(false);
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
  const [error, setError] = useState(null);

  useEffect(() => {
    if (accessToken) {
      try {
        const decodedToken = jwtDecode(accessToken);
        const expiryTime = decodedToken.exp * 1000;

        const timeUntilExpiry = expiryTime - Date.now() - 60000;

        if (timeUntilExpiry > 0) {
          const timeoutId = setTimeout(() => {
            tokenRefresh();
          }, timeUntilExpiry);

          return () => clearTimeout(timeoutId);
        }
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  });

  useEffect(() => {
    const getUserFromToken = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await backendFetch(`/api/v1/user-token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: accessToken ? `Bearer ${accessToken}` : '',
          },
        });

        if (response && response.user) {
          setAuthUser(response);
          setIsAuth(true);
        }
      } catch (error) {
        handleAPIError(error, setError);
        tokenRefresh();
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
AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
