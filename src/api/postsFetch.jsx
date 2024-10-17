// src/api/postsFetch.jsx

import { backendFetch } from '.';

const fetctPublishedPosts = async () => {
  return await backendFetch('/api/v1/posts/published', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export default fetctPublishedPosts;
