// src/main.jsx

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { AuthContextProvider } from './context/AuthContext.jsx';
import { PostContextProvider } from './context/PostContext';
import Routes from './routes/index.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <PostContextProvider>
        <Routes />
      </PostContextProvider>
    </AuthContextProvider>
  </StrictMode>
);
