// src/api/postsFetch.jsx
import { backendFetch } from '.';

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

export const fetchPosts = async (apiRoute) => {
  return await backendFetch(`/api/v1/${apiRoute}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
    },
  });
};

export const deletePostRequest = async (postId, accessToken) => {
  return await backendFetch(`/api/v1/posts/${postId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: accessToken ? `Bearer ${accessToken}` : '',
    },
  });
};
