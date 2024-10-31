// src/api/tagsFetch.jsx
import { backendFetch } from '.';

export const TagsFetch = async () => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return await backendFetch(`/api/v1/tags`, options);
};

export const createTagFetch = async (name) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  };

  return await backendFetch(`/api/v1/tag`, options);
};

export const updateTagFetch = async (tagId, name) => {
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  };

  return await backendFetch(`/api/v1/tag/${tagId}`, options);
};

export const deleteTagFetch = async (tagId) => {
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return await backendFetch(`/api/v1/tags/${tagId}`, options);
};
