// src/api/likesFetch.jsx
import { backendFetch } from '.';
import { getCookie, setCookie } from '@/lib/cookies';

export const likePostRequest = async (postId, userId) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (!userId) {
    let guestName = getCookie('guestName');

    if (!guestName) {
      const randomNumber = Math.floor(Math.random() * 100000);
      guestName = `guest${randomNumber}`;

      setCookie('guestName', guestName, 365);
    }

    options.body = JSON.stringify({ guestName });
  }

  return await backendFetch(`/api/v1/like/${postId}/${userId}`, options);
};

export const unlikePostRequest = async (postId, userId) => {
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (!userId) {
    let guestName = getCookie('guestName');

    if (!guestName) {
      return;
    }

    options.body = JSON.stringify({ guestName });
  }

  return await backendFetch(`/api/v1/like/${postId}/${userId}`, options);
};
