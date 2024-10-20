// src/api/likesFetch.jsx
import { backendFetch } from '.';

function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `; expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value || ''}${expires}; path=/`;
}

export function getCookie(name) {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

export const likePost = async (postId, userId) => {
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

  return await backendFetch(`/api/v1/like/${postId}/`, options);
};

export const unlikePost = async (postId, userId) => {
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

  return await backendFetch(`/api/v1/like/${postId}/`, options);
};
