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

export const fetchUnpublishedPosts = async (accessToken) => {
  return await backendFetch(`/api/v1/posts/unpublished`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: accessToken ? `Bearer ${accessToken}` : '',
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
    },
  });
};

export const publishPostRequest = async (postId, accessToken) => {
  return await backendFetch(`/api/v1/posts/${postId}/publish`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: accessToken ? `Bearer ${accessToken}` : '',
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
