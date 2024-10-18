// src/api/postsFetch.jsx
import { backendFetch } from '.';

export const fetchPublishedPosts = async () => {
  return await backendFetch('/api/v1/posts/published', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const createPost = async (credentials, accessToken) => {
  return await backendFetch('/api/v1/post', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: accessToken ? `Bearer ${accessToken}` : '',
    },
    body: JSON.stringify(credentials),
  });
};
