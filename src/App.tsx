import React, { Suspense, useState, useEffect } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { AppContainer } from './layout/AppContainer';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HelmetProvider } from 'react-helmet-async';
import PinScreen from './component/PinScreen';

function SplashScreen() {
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'background.default',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
      }}
    >
      <Box
        component="img"
        src="/logo.jpg"
        alt="Logo"
        sx={{
          width: { xs: 150, md: 200 },
          mb: 4,
          animation: 'pulse 2s infinite ease-in-out',
          '@keyframes pulse': {
            '0%': { transform: 'scale(1)', opacity: 1 },
            '50%': { transform: 'scale(1.05)', opacity: 0.8 },
            '100%': { transform: 'scale(1)', opacity: 1 },
          }
        }}
      />
      <CircularProgress color="primary" />
    </Box>
  )
}

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('site_pin_auth') === 'true';
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  if (!isAuthenticated) {
    return (
      <PinScreen onSuccess={() => {
        setIsAuthenticated(true);
        sessionStorage.setItem('site_pin_auth', 'true');
      }} />
    );
  }

  return (
    <React.Fragment>
      <Suspense fallback={<SplashScreen />}>
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
