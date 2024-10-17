// src/api/signupFetch.jsx
import { backendFetch } from '.';

const signupFetch = async (credentials) => {
  return await backendFetch('/api/v1/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
};

export default signupFetch;
