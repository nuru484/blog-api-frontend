// src/api/index.js

const backendFetch = async (url, options = {}) => {
  const response = await fetch(url, {
    mode: 'cors',
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }

  return await response.json();
};

export default backendFetch;
