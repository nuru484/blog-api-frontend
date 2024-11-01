import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import ProtectedRoute from './ProtectedRoute';
import Home from '../pages/Home';
import LoginPage from '../pages/LoginPage';
import SignUpPage from '@/pages/SignUpPage';
import ErrorPage from '@/pages/ErrorPage';

const Routes = () => {
  const { token } = useAuth();

  // Public routes accessible to all users
  const routesForPublic = [
    {
      path: '/signup',
      element: <SignUpPage role={'USER'} />,
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
      errorElement: <ErrorPage />,
    },
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      path: '/signup-admin-ORACLE1995@B9s',
      element: <SignUpPage role={'ADMIN'} />,
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
