import useAuth from '../hooks/useAuth';
import useCreatePost from '@/hooks/useCreatePost';

const AdminPage = () => {
  const createPost = useCreatePost();

  const { logout } = useAuth();
  return (
    <>
      <h1>Welcom Admin</h1>
      {createPost}
      <button onClick={logout}>Logout</button>
    </>
  );
};

export default AdminPage;
