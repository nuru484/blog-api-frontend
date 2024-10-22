import { Link } from 'react-router-dom';

const LoginButton = () => {
  return (
    <div>
      <Link
        to="login"
        className="bg-blue-600 text-white px-6 py-2 rounded-full shadow-lg font-medium hover:bg-blue-700"
      >
        Log In
      </Link>
    </div>
  );
};

export default LoginButton;
