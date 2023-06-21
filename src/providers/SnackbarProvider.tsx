import Alert, { AlertColor } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { ReactNode, createContext, useState } from "react";

type SnackbarContextType = {
  openSnackbar: (message: string, severity: AlertColor) => void;
};

interface SnackbarProps {
  message: string;
  severity: AlertColor;
}

export const SnackbarContext = createContext<SnackbarContextType>({
  openSnackbar: () => {},
});

type SnackbarProviderProps = {
  children: ReactNode;
};

export const SnackbarProvider = ({ children }: SnackbarProviderProps) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbar, setSnackbar] = useState<SnackbarProps>({message: '', severity: 'success'});

  const openSnackbar = (message: string, severity: AlertColor) => {
    setSnackbar({message: message, severity: severity});
    setSnackbarOpen(true);
  };

  const closeSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <SnackbarContext.Provider value={{ openSnackbar }}>
      {children}
      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={4000} 
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={closeSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};