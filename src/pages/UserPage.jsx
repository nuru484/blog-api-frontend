import CreatePostForm from '@/components/CreatePostForm';
import { createPost } from '@/api/postsFetch';
import { handleAPIError } from '@/lib/errorHandler';
import useAuth from '@/hooks/useAuth';
import { useState, useEffect } from 'react';

const UserPage = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(false);

    try {
      const response = await createPost(post, accessToken);
      console.log('Post created successfully');
    } catch (error) {
      handleAPIError(error, setError);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPost((prevPost) => ({
      ...prevPost,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  useEffect(() => {
    setPost((prevPost) => ({
      ...prevPost,
      tagIDs: selectedTags,
    }));
  }, [selectedTags, setPost]);

  const handleTagSelection = (e) => {
    const options = e.target.options;
    const newSelectedTags = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        newSelectedTags.push(parseInt(options[i].value, 10));
      }
    }
    setSelectedTags(newSelectedTags);
  };

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

export default UserPage;
