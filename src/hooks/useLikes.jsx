import { handleAPIError } from '@/lib/errorHandler';
import { likePostRequest, unlikePostRequest } from '@/api/likesFetch';
import usePostContext from './usePostContext';
import { getCookie } from '@/lib/cookies';
import { useState } from 'react';

const useLikes = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { posts, setPosts } = usePostContext();

  const unlikePost = async (postId, userId) => {
    setError('');
    setLoading(true);
    const originalPosts = [...posts];

    try {
      const identifier = userId || getCookie('guestName');

      setPosts((prevPosts) =>
        prevPosts.map((post) => {
          if (post.id === postId) {
            const updatedLikes = post.likes.filter(
              (like) =>
                like.userId !== identifier && like.guestName !== identifier
            );
            return { ...post, likes: updatedLikes };
          }
          return post;
        })
      );

      const response = await unlikePostRequest(postId, userId);

      if (!response) {
        throw new Error('Failed to unlike the post.');
      }
    } catch (error) {
      setPosts(originalPosts);
      handleAPIError(error, setError);
    } finally {
      setLoading(false);
    }
  };

  const likePost = async (postId, userId) => {
    setError('');
    setLoading(true);
    const originalPosts = [...posts];

    try {
      const guestName = userId ? null : getCookie('guestName');

      if (!userId && !guestName) {
        throw new Error('User identifier not found');
      }

      const newLike = {
        id: Date.now(),
        userId: userId || null,
        guestName: guestName || null,
        createdAt: new Date().toISOString(),
      };

      setPosts((prevPosts) =>
        prevPosts.map((post) => {
          if (post.id === postId) {
            const alreadyLiked = post.likes.some(
              (like) =>
                (userId && like.userId === userId) ||
                (!userId && like.guestName === guestName)
            );
            if (!alreadyLiked) {
              return { ...post, likes: [...post.likes, newLike] };
            }
          }
          return post;
        })
      );

      const response = await likePostRequest(postId, userId);

      if (response && response.like) {
        setPosts((prevPosts) =>
          prevPosts.map((post) => {
            if (post.id === postId) {
              return {
                ...post,
                likes: post.likes.map((like) =>
                  like.id === newLike.id ? response.like : like
                ),
              };
            }
            return post;
          })
        );
      } else {
        throw new Error('Failed to like the post.');
      }
    } catch (error) {
      setPosts(originalPosts);
      handleAPIError(error, setError);
    } finally {
      setLoading(false);
    }
  };

  return { likePost, unlikePost };
};

export default useLikes;
