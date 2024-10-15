import App from './App';
import LoginPage from './pages/LoginPage';

const routes = [
  {
    path: '/',
    element: <App />,
    // errorElement: <ErrorPage />,
  },
  {
    path: 'login',
    element: <LoginPage />,
  },
];

export default routes;
