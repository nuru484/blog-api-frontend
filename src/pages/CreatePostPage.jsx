// CreatePostPage.jsx
import usePostForm from '@/hooks/usePostForm';
import PostForm from '@/components/PostForm';
import useAuth from '@/hooks/useAuth';

const CreatePostPage = () => {
  const formProps = usePostForm();
  const { isAuth } = useAuth();

  return isAuth && <PostForm {...formProps} isEditing={false} />;
};

export default CreatePostPage;
