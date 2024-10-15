// src/api/index.js
const serverURL = import.meta.env.VITE_SERVER_URL;

const backendFetch = async (apiEndpointURL, options = {}) => {
  const response = await fetch(`${serverURL}${apiEndpointURL}`, {
    mode: 'cors',
    ...options,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch!');
  }

  try {
    return await response.json();
  } catch (error) {
    throw new Error('Failed to parse response as JSON');
  }
};

export default backendFetch;
