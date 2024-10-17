// src/utils/lib/errorHandler.js
import { APIError } from '@/api';

// Custom error handler for API errors
export const handleAPIError = async (error, setError) => {
  if (error instanceof APIError) {
    switch (error.type) {
      case 'NETWORK_ERROR':
        setError(
          'Unable to connect to the server. Please check your internet connection.'
        );
        break;
      case 'ABORT_ERROR':
        setError('The request was aborted. Please try again.');
        break;
      case 'PARSE_ERROR':
        setError(
          'There was a problem processing the server response. Please try again.'
        );
        break;
      default:
        setError(`${error.message}`);
    }
  } else {
    setError('An unexpected error occurred. Please try again.');
  }
  console.error(`An error occurred: ${error.message}`);
};

// Validation error handler
export const handleValidationError = (field, message) => {
  console.error(`Validation error on ${field}: ${message}`);
  return { field, message };
};

// General error handler
export const handleError = (error) => {
  console.error('An error occurred:', error.message);
  return { message: 'Something went wrong. Please try again later.' };
};
