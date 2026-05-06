import React, { Suspense } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { AppContainer } from './layout/AppContainer';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HelmetProvider } from 'react-helmet-async';

function App() {
  return (
    <React.Fragment>
      <Suspense fallback={
        <Box sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress />
        </Box>
      }>
        <HelmetProvider>
          <ToastContainer />
          {/* <ErrorSnackBar /> */}
          <AppContainer />
        </HelmetProvider>
      </Suspense>
    </React.Fragment>
  );
}

export default App;
