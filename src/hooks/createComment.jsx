import { useState, useCallback } from 'react';
import CreateCommentForm from '@/components/CreateCommentForm';
import { handleAPIError } from '@/lib/errorHandler';
import { createComment } from '@/api/commentFetch';

const useCreateComment = () => {
  const [comment, setComment] = useState({
    title: '',
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
        await createComment(comment);
        console.log('Comment created successfully');
      } catch (error) {
        handleAPIError(error, setError);
      } finally {
        setLoading(false);
      }
    },
    [comment]
  );

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setComment((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  }, []);

  return (
    <CreateCommentForm
      loading={loading}
      error={error}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      comment={comment}
    />
  );
};

export default useCreateComment;
