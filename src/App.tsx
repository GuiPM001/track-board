import React, { useEffect } from 'react';
import './App.css';
import { authUser, checkAuth } from './services/Auth';
import Router from './router';
import { ThemeProvider } from '@mui/material';
import { theme } from './styles/theme';
import './styles/sharedStyles.scss';
import { SnackbarProvider } from './providers/SnackbarProvider';

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
      <SnackbarProvider>
        <Router />
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
