// src/main.jsx

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { AuthContextProvider } from './context/AuthContext.jsx';
import { BlogContextProvider } from './context/BlogContext';
import Routes from './routes/index.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <BlogContextProvider>
        <Routes />
      </BlogContextProvider>
    </AuthContextProvider>
  </StrictMode>
);
