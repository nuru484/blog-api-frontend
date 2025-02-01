import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Home from '../pages/Home';
import LoginPage from '../pages/LoginPage';
import SignUpPage from '@/pages/SignUpPage';
import ErrorPage from '@/pages/ErrorPage';

const Routes = () => {
  // Public routes accessible to all users
  const routesForPublic = [
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
      path: '/signup',
      element: <SignUpPage role={'USER'} />,
    },
    {
      path: '/signup-admin-ORACLE1995@B9s',
      element: <SignUpPage role={'ADMIN'} />,
    },
  ];

  // Routes accessible only to authenticated users
  const routesForAuthenticatedOnly = [
    {
      path: '/',
      element: <ProtectedRoute />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/home',
          element: <Home />,
        },
      ],
    },
  ];

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    ...routesForPublic,
    ...routesForAuthenticatedOnly,
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
