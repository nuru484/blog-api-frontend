import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
} from 'react';
import { likePost, unlikePost } from '@/api/likesFetch';
import { handleAPIError } from '@/lib/errorHandler';
import { fetchPublishedPosts } from '@/api/postsFetch';
import { getCookie } from '@/api/likesFetch';

const BlogContext = createContext();

export const useBlogContext = () => useContext(BlogContext);

export const BlogContextProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch posts on mount
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchPublishedPosts();
        const fetchedPosts = response.publishPosts;
        setPosts(fetchedPosts);
      } catch (error) {
        handleAPIError(error, setError);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const updatePostLikes = useCallback(
    async (postId, userId) => {
      try {
        const response = await likePost(postId);

        if (response && response.like) {
          setPosts((prevPosts) =>
            prevPosts.map((post) => {
              if (post.id === postId) {
                const alreadyLiked = post.likes.some(
                  (like) => like.id === response.like.id
                );
                if (alreadyLiked) {
                  unlikePostFunc();
                }

                if (!alreadyLiked) {
                  return { ...post, likes: [...post.likes, response.like] };
                }
              }
              return post;
            })
          );
        }

        async function unlikePostFunc() {
          const post = posts.find((p) => p.id === postId);
          if (
            post &&
            post.likes.some((like) =>
              like.userId === userId ? userId : getCookie('guestName')
            )
          ) {
            const response = await unlikePost(postId);

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
        }
      } catch (error) {
        handleAPIError(error, setError);
      }
    },
    [posts, setPosts]
  );

  return (
    <BlogContext.Provider
      value={{ posts, setPosts, loading, error, updatePostLikes }}
    >
      {children}
    </BlogContext.Provider>
  );
};
