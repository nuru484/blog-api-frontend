import CreatePostForm from '@/components/CreatePostForm';
import { createPost } from '@/api/postsFetch';
import { handleAPIError } from '@/lib/errorHandler';
import useAuth from '@/hooks/useAuth';
import { useState } from 'react';

const UserPage = () => {
  const [post, setPost] = useState({
    title: '',
    content: '',
    published: false,
    tags: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const availableTags = ['Tag1', 'Tag2', 'Tag3'];

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

  const handleTagChange = (e) => {
    const options = e.target.options;
    const selectedTags = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedTags.push(options[i].value);
      }
    }
    setPost((prev) => ({
      ...prev,
      tags: selectedTags,
    }));
  };

  return (
    <CreatePostForm
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      handleTagChange={handleTagChange}
      post={post}
      setPost={setPost}
      availableTags={availableTags}
    />
  );
};

export default UserPage;
