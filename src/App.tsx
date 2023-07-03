import React, { useEffect } from 'react';
import authService from './services/Auth';
import Router from './router';
import { ThemeProvider } from '@mui/material';
import { theme } from './styles/theme';
import './styles/sharedStyles.scss';
import { SnackbarProvider } from './providers/SnackbarProvider';

function App() {
  let usuarioAutenticado = authService.checkAuth();

  useEffect(() => {
    async function authentication() {
      if (!usuarioAutenticado) {
        authService.authUser();
      }
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
