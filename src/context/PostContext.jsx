// src/context/PostContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { handleAPIError } from '@/lib/errorHandler';
import { fetchPosts } from '@/api/postsFetch';

export const PostContext = createContext();

export const PostContextProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apiRoute, setApiRoute] = useState('posts/published');

  const handleApiToFetch = async (route) => {
    setApiRoute(route);
  };

  // Fetch posts on mount
  useEffect(() => {
    const fetchPostsFunction = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetchPosts(apiRoute);
        setPosts(response.posts);
      } catch (error) {
        handleAPIError(error, setError);
      } finally {
        setLoading(false);
      }
    };

    fetchPostsFunction();
  }, [apiRoute]);

  return (
    <PostContext.Provider
      value={{
        posts,
        setPosts,
        loading,
        error,
        handleApiToFetch,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
