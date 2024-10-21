// src/context/PostContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { handleAPIError } from '@/lib/errorHandler';
import { fetchPublishedPosts } from '@/api/postsFetch';

export const PostContext = createContext();

export const PostContextProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch posts on mount
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchPublishedPosts();
        setPosts(response.publishPosts);
      } catch (error) {
        handleAPIError(error, setError);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <PostContext.Provider
      value={{
        posts,
        setPosts,
        loading,
        error,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
