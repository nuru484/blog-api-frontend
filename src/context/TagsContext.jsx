// src/context/TagsContext.jsx
import { createContext, useState, useEffect } from 'react';
import { handleAPIError } from '@/lib/errorHandler';
import { TagsFetch } from '@/api/tagsFetch';

export const TagsContext = createContext();

export const TagsContextProvider = ({ children }) => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch tags on mount
  useEffect(() => {
    const fetchTags = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await TagsFetch();
        // console.log(response);
        setTags(response.tags);
      } catch (error) {
        handleAPIError(error, setError);
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, []);

  return (
    <TagsContext.Provider
      value={{
        tags,
        setTags,
        loading,
        error,
      }}
    >
      {children}
    </TagsContext.Provider>
  );
};
