import React, { Suspense } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { AppContainer } from './layout/AppContainer';

function App() {
  return (
    <React.Fragment>
      <Suspense fallback={
        <Box sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress />
        </Box>
      }>
        {/* <ErrorSnackBar /> */}
        <AppContainer />
      </Suspense>
    </React.Fragment>
  );
}

export default App;
