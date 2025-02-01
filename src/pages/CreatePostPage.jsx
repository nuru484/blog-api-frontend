// CreatePostPage.jsx
import usePostForm from '@/hooks/usePostForm';
import PostForm from '@/components/PostForm';
import useAuth from '@/hooks/useAuth';

const CreatePostPage = () => {
  const formProps = usePostForm();
  const { authUser } = useAuth();

  return authUser && <PostForm {...formProps} isEditing={false} />;
};

export default CreatePostPage;
