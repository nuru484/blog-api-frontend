import { useState, useCallback } from 'react';
import CreateCommentForm from '@/components/CreateCommentForm';
import { handleAPIError } from '@/lib/errorHandler';
import { createComment } from '@/api/commentFetch';
import { useBlogContext } from '@/context/BlogContext';

const useCreateComment = (postId) => {
  const [commentContent, setCommentContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { setPosts } = useBlogContext();

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);
      setError('');

      try {
        const response = await createComment(postId, commentContent);

        setCommentContent('');

        if (response && response.comment) {
          setPosts((prevPosts) =>
            prevPosts.map((post) => {
              if (post.id === postId) {
                return {
                  ...post,
                  comments: [...post.comments, response.comment],
                };
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
    },
    [postId, commentContent]
  );

  const handleChange = useCallback((e) => {
    setCommentContent(e.target.value);
  }, []);

  return (
    <CreateCommentForm
      loading={loading}
      error={error}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      comment={commentContent}
    />
  );
};

export default useCreateComment;
