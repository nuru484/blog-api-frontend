import { ArrowRight, User, Lock, Eye } from 'lucide-react';

const LoginForm = ({
  credentials,
  setCredentials,
  handleSubmit,
  loading,
  error,
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8  w-96">
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
            <svg
              className="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
          </div>
        </div>
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-2">
          Welcome!
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Sign in to your account
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 relative">
            <User className="absolute top-3 left-3 text-gray-400" size={20} />
            <input
              type="email"
              placeholder="Email"
              value={credentials.email}
              onChange={(e) =>
                setCredentials({
                  ...credentials,
                  email: e.target.value,
                })
              }
              required
              className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <div className="mb-4 relative">
            <Lock className="absolute top-3 left-3 text-gray-400" size={20} />
            <input
              type="password"
              placeholder="Password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({
                  ...credentials,
                  password: e.target.value,
                })
              }
              required
              className="w-full pl-10 pr-10 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <Eye
              className="absolute top-3 right-3 text-gray-400 cursor-pointer"
              size={20}
            />
          </div>
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center text-sm text-gray-500">
              <input type="checkbox" className="mr-2" />
              remember me?
            </label>
            <a href="#" className="text-sm text-indigo-500 hover:underline">
              forgot password?
            </a>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            {loading ? 'Logging In...' : 'Login'}{' '}
            <ArrowRight className="inline-block ml-1" size={18} />
          </button>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
