// src/api/index.js

// Instance of Error
class APIError extends Error {
  constructor(message, status, type) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.type = type;
  }
}

const serverURL = import.meta.env.VITE_SERVER_URL;

const backendFetch = async (apiEndpointURL, options = {}) => {
  try {
    const response = await fetch(`${serverURL}${apiEndpointURL}`, {
      mode: 'cors',
      ...options,
    });

    if (!response.ok) {
      let errorMessage = 'An error occurred';
      let errorType = 'UNKNOWN_ERROR';

      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
        errorType = errorData.type || errorType;
      } catch (parseError) {
        // If parsing fails, use default error message
      }

      throw new APIError(errorMessage, response.status, errorType);
    }

    try {
      return await response.json();
    } catch (parseError) {
      throw new APIError(
        'Failed to parse response as JSON',
        200,
        'PARSE_ERROR'
      );
    }
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    } else if (error.name === 'AbortError') {
      throw new APIError('Request was aborted', 0, 'ABORT_ERROR');
    } else if (error.name === 'TypeError') {
      throw new APIError('Network error', 0, 'NETWORK_ERROR');
    } else {
      throw new APIError('An unexpected error occurred', 0, 'UNEXPECTED_ERROR');
    }
  }
};

export { backendFetch, APIError };
