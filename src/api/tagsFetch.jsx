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

export const createTag = async (name) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  };

  return await backendFetch(`/api/v1/tag`, options);
};
