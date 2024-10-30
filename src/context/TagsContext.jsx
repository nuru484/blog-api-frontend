// src/context/TagsContext.jsx
import { createContext, useState, useEffect } from 'react';
import { handleAPIError } from '@/lib/errorHandler';
import { TagsFetch } from '@/api/tagsFetch';

export const TagsContext = createContext();

export const TagsContextProvider = ({ children }) => {
  const [tags, setTags] = useState(() => {
    const storedTags = localStorage.getItem('tags');
    return storedTags ? JSON.parse(storedTags) : [];
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTags = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await TagsFetch();
        setTags(response.tags);
        localStorage.setItem('tags', JSON.stringify(response.tags));
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
