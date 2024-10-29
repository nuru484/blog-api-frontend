import useAuth from '../hooks/useAuth';

const AdminPage = () => {
  const { logout } = useAuth();
  return (
    <>
      <h1>Welcom Admin</h1>
      <button onClick={logout}>Logout</button>
    </>
  );
};

export default AdminPage;
