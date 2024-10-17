// src/utils/lib/errorHandler.js
import { APIError } from '@/api';

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
      case 'VALIDATION_ERROR':
        // Handle validation errors
        if (Array.isArray(error.details)) {
          const errorMessages = error.details.map((err) => err.msg).join('. ');
          setError(errorMessages);
        } else {
          setError('Validation failed. Please check your input and try again.');
        }
        break;
      default:
        setError(`${error.message}`);
    }
  } else {
    setError('An unexpected error occurred. Please try again.');
  }
  console.error(`An error occurred: ${error.message}`);
};
