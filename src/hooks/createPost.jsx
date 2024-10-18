import { useState, useEffect, useCallback } from 'react';
import { createPost } from '@/api/postsFetch';
import useAuth from './useAuth';
import CreatePostForm from '@/components/CreatePostForm';
import { handleAPIError } from '@/lib/errorHandler';

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

  const availableTags = [
    { name: 'Astronomy', id: 3 },
    { name: 'Technology', id: 2 },
    { name: 'Science', id: 4 },
    { name: 'Programming', id: 5 },
  ];

  const { accessToken } = useAuth();

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);
      setError('');

      try {
        await createPost(post, accessToken);
        console.log('Post created successfully');
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
      availableTags={availableTags}
    />
  );
};

export default useCreatePost;