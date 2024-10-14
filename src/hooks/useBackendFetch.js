// src/hooks/useBackendFetch.js
import { useState, useEffect } from 'react';

import backendFetch from '../api/backendFetch';

const useBackendFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const responseData = await backendFetch(url, options);
        setData(responseData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, error, loading };
};

export default useBackendFetch;
