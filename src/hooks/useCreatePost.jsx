import useAuth from './useAuth';
import CreatePostForm from '@/components/CreatePostForm';
import { createPost } from '@/api/postsFetch';
import { useState, useCallback, useEffect } from 'react';
import useTagContext from './useTagsContext';

const useCreatePost = () => {
  const [post, setPost] = useState({
    title: '',
    content: '',
    published: false,
    tagIDs: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  const { tags } = useTagContext();
  const { accessToken } = useAuth();

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);
      setError('');

      try {
        await createPost(post, accessToken);
      } catch (error) {
        handleAPIError(error, setError);
      } finally {
        setLoading(false);
      }
    },
    [post, accessToken]
  );

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setPost((prevPost) => ({
      ...prevPost,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }, []);

  useEffect(() => {
    setPost((prevPost) => ({
      ...prevPost,
      tagIDs: selectedTags,
    }));
  }, [selectedTags]);

  const handleTagSelection = useCallback((e) => {
    const selected = Array.from(e.target.options)
      .filter((option) => option.selected)
      .map((option) => parseInt(option.value, 10));
    setSelectedTags(selected);
  }, []);

  return (
    <CreatePostForm
      loading={loading}
      error={error}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      handleTagSelection={handleTagSelection}
      post={post}
      setPost={setPost}
      availableTags={tags}
    />
  );
};

export default useCreatePost;
