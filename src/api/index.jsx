// src/api/index.js
const serverURL = import.meta.env.VITE_SERVER_URL;

const backendFetch = async (apiEndpointURL, options = {}) => {
  const response = await fetch(`${serverURL}${apiEndpointURL}`, {
    mode: 'cors',
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }

  try {
    return await response.json();
  } catch (error) {
    throw new Error('Failed to parse response as JSON');
  }
};

export default backendFetch;
