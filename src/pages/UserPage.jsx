import useCreatePost from '@/hooks/createPost';

const UserPage = () => {
  const CreatePost = useCreatePost();
  return CreatePost;
};

export default UserPage;
