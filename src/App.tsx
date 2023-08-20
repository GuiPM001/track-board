import React, { useEffect } from 'react';
import authService from './services/Auth';
import Router from './router';
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
    <SnackbarProvider>
      <Router />
    </SnackbarProvider>
  );
}

export default App;
