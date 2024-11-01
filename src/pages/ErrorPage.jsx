import { useRouteError, Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  bg-gray-200 font-sans">
      <div className="text-center p-6 mx-4 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Oh noo! There is an error
        </h1>
        <p className="text-gray-700 mb-4">
          {error?.statusText || error?.message || 'Something went wrong!'}
        </p>
        <Link
          to="/"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <ChevronLeft size={20} className="mr-2" />
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
