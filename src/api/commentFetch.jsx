// src/api/commentFetch.jsx
import { backendFetch } from '.';
import { getCookie, setCookie } from '@/lib/cookies';

export const createComment = async (postId, content, userId) => {
  let bodyData = { content };

  if (userId) {
    bodyData.userId = userId;
  } else {
    let guestName = getCookie('guestName');
    if (!guestName) {
      const randomNumber = Math.floor(Math.random() * 100000);
      guestName = `guest${randomNumber}`;
      setCookie('guestName', guestName, 365);
    }
    bodyData.guestName = guestName;
  }

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodyData),
  };

  return await backendFetch(`/api/v1/comment/posts/${postId}`, options);
};
