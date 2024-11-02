import { useState, useCallback, useEffect } from 'react';
import useAuth from './useAuth';
import { createPost, updatePostRequest } from '@/api/postsFetch';
import useTagContext from './useTagsContext';
import { handleAPIError } from '@/lib/errorHandler';
import usePostContext from './usePostContext';

const usePostForm = (initialPost = null, onClose = null) => {
  const [post, setPost] = useState({
    title: initialPost?.title || '',
    content: initialPost?.content || '',
    published: initialPost?.published || false,
    tagIDs: initialPost?.tagIDs || [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [selectedTags, setSelectedTags] = useState(initialPost?.tagIDs || []);

  const { tags } = useTagContext();
  const { accessToken } = useAuth();
  const { posts, setPosts } = usePostContext();

  // Update form when initialPost changes (for editing mode)
  useEffect(() => {
    if (initialPost) {
      setPost({
        title: initialPost.title,
        content: initialPost.content,
        published: initialPost.published,
        tagIDs: initialPost.tagIDs,
      });
      setSelectedTags(initialPost.tagIDs);
    }
  }, [initialPost]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);
      setError('');
      setSuccess(false);

      try {
        let response;

        if (initialPost) {
          response = await updatePostRequest(initialPost.id, post, accessToken);
          console.log(response);

          setPosts((prevPosts) =>
            prevPosts.map((post) =>
              post.id === response.post.id ? response.post : post
            )
          );
        } else {
          // Create new post
          response = await createPost(post, accessToken);

          if (response && response.post.published === true) {
            setPosts((prevPosts) => [...(prevPosts || []), response.post]);
          }
        }

        setSuccess(true);

        // Reset form for create mode, close modal for edit mode
        if (!initialPost) {
          setPost({
            title: '',
            content: '',
            published: false,
            tagIDs: [],
          });
          setSelectedTags([]);
        }

        setTimeout(() => {
          setSuccess(false);
          if (initialPost && onClose) {
            onClose();
          }
        }, 3000);
      } catch (error) {
        handleAPIError(error, setError);
      } finally {
        setLoading(false);
      }
    },
    [post, accessToken, initialPost, onClose]
  );

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setPost((prevPost) => ({
      ...prevPost,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }, []);

  const handleEditorChange = (content) => {
    setPost((prevPost) => ({
      ...prevPost,
      content,
    }));
  };

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

  return {
    post,
    setPost,
    loading,
    error,
    success,
    handleSubmit,
    handleChange,
    handleEditorChange,
    handleTagSelection,
    availableTags: tags,
  };
};

export default usePostForm;
