import { EncryptStorage } from 'encrypt-storage';

/**
 * Asynchronous function to retrieve the encryption key from the environment.
 *
 */
const getEncryptionKey = async () => {
  return import.meta.env.VITE_STORAGE_ENCRYPTION_KEY;
};

/**
 * Asynchronous function to initialize an instance of EncryptStorage with the encryption key.
 *
 */
const initializeEncryptStorage = async () => {
  const encryptionKey = await getEncryptionKey();
  if (!encryptionKey) {
    throw new Error('Encryption key is not available.');
  }

  return new EncryptStorage(encryptionKey);
};

const encryptStorage = await initializeEncryptStorage();

export default encryptStorage;
