import { handleAPIError } from '@/lib/errorHandler';
import { likePostRequest } from '@/api/likesFetch';
import { unlikePostRequest } from '@/api/likesFetch';
import usePostContext from './usePostContext';
import { getCookie } from '@/lib/cookies';
import { useState } from 'react';

const useLikes = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { posts, setPosts } = usePostContext();

  const unlikePost = async (postId, userId) => {
    try {
      const post = posts.find((p) => p.id === postId);

      if (
        post &&
        post.likes.some((like) =>
          like.userId === userId ? userId : getCookie('guestName')
        )
      ) {
        const response = await unlikePostRequest(postId);

        if (response) {
          setPosts((prevPosts) =>
            prevPosts.map((post) => {
              if (post.id === postId) {
                const updatedLikes = post.likes.filter(
                  (like) => like.id !== response.like.id
                );
                return { ...post, likes: updatedLikes };
              }
              return post;
            })
          );
        }

        return;
      }
    } catch (error) {
      handleAPIError(error, setError);
    }
  };

  const likePost = async (postId) => {
    setError('');
    setLoading(true);
    try {
      const response = await likePostRequest(postId);

      if (response && response.like) {
        setPosts((prevPosts) =>
          prevPosts.map((post) => {
            if (post.id === postId) {
              const alreadyLiked = post.likes.some(
                (like) => like.id === response.like.id
              );

              if (!alreadyLiked) {
                return { ...post, likes: [...post.likes, response.like] };
              }
            }
            return post;
          })
        );
      }
    } catch (error) {
      handleAPIError(error, setError);
    } finally {
      setLoading(false);
    }
  };

  return { likePost, unlikePost };
};

export default useLikes;
