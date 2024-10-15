import App from './App';
import LoginForm from './components/LoginForm';

const routes = [
  {
    path: '/',
    element: <App />,
    // errorElement: <ErrorPage />,
  },
  {
    path: 'login',
    element: <LoginForm />,
  },
];

export default routes;
