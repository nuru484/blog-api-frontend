import { useState, useCallback } from 'react';
import CreateCommentForm from '@/components/CreateCommentForm';
import { handleAPIError } from '@/lib/errorHandler';
import { createComment } from '@/api/commentFetch';

const useCreateComment = (postId) => {
  const [commentContent, setCommentContent] = useState({
    content: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);
      setError('');

      try {
        await createComment(postId, commentContent);
        console.log('Comment created successfully');
        setCommentContent({ content: '' });
      } catch (error) {
        handleAPIError(error, setError);
      } finally {
        setLoading(false);
      }
    },
    [commentContent]
  );

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setCommentContent((prevComment) => ({
      ...prevComment,
      [name]: value,
    }));
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
