import React, { Suspense } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { AppContainer } from './layout/AppContainer';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <React.Fragment>
      <Suspense fallback={
        <Box sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress />
        </Box>
      }>
        <ToastContainer />
        {/* <ErrorSnackBar /> */}
        <AppContainer />
      </Suspense>
    </React.Fragment>
  );
}

export default App;
