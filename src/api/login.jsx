// src/api/login.jsx

import backendFetch from '.';

const loginFetch = async (credentials) => {
  return await backendFetch('/api/v1/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
};

export default loginFetch;
