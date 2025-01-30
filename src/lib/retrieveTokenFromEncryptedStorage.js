import encryptStorage from './encryptedStorage';

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

export default retrieveTokenFromEncryptedStorage;
