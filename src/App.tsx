import React, { useEffect } from 'react';
import './App.css';
import { authUser, checkAuth } from './services/Auth';
import Router from './router';
import { ThemeProvider } from '@mui/material';
import { theme } from './styles/theme';
import './styles/sharedStyles.scss';

function App() {
  let usuarioAutenticado = checkAuth();

  useEffect(() => {
    async function authentication() {
      if (!usuarioAutenticado)
        authUser();
    }
    
    authentication();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  );
}

export default App;
