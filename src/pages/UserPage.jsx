import useCreatePost from '@/hooks/useCreatePost';

const UserPage = () => {
  const creatPost = useCreatePost();
  return creatPost;
};

export default UserPage;
