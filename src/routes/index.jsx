import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import ProtectedRoute from './ProtectedRoute';
import Home from '../pages/Home';
import LoginPage from '../pages/LoginPage';
import SignUpPage from '@/pages/SignUpPage';

const Routes = () => {
  const { token } = useAuth();

  // Public routes accessible to all users
  const routesForPublic = [
    {
      path: '/signup',
      element: <SignUpPage />,
    },
  ];

  // Routes accessible only to authenticated users
  const routesForAuthenticatedOnly = [
    {
      path: '/',
      element: <ProtectedRoute />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
      ],
    },
  ];

  // Routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/login',
      element: <LoginPage />,
    },
  ];

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
