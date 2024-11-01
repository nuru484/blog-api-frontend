// CreatePostPage.jsx
import usePostForm from '@/hooks/usePostForm';
import PostForm from '@/components/PostForm';

const CreatePostPage = () => {
  const formProps = usePostForm();

  return <PostForm {...formProps} isEditing={false} />;
};

export default CreatePostPage;
