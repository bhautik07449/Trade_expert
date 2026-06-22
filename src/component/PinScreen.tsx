import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Paper, CircularProgress, Fade } from '@mui/material';

interface PinScreenProps {
  onSuccess: () => void;
}

const MESSAGES = [
  'Distinct Trade Medium',
  'Consolidated Trade Compliance',
  'Controlled End to End Services',
  'Traceable Ecosystem',
  'Self Service Deskboard'
];

const PinScreen: React.FC<PinScreenProps> = ({ onSuccess }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false)

  const [messageIndex, setMessageIndex] = useState(0);
  const [messageVisible, setMessageVisible] = useState(true);

  useEffect(() => {
    const cycleTime = 3000;
    const fadeOutTime = 500;

    const interval = setInterval(() => {
      setMessageVisible(false);

      setTimeout(() => {
        setMessageIndex((prev) => (prev + 1) % MESSAGES.length);
        setMessageVisible(true);
      }, fadeOutTime);
    }, cycleTime);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    setLoading(true)
    e.preventDefault();
    if (pin === '4198') {
      setError(false);
      onSuccess();
      setLoading(false)
    } else {
      setError(true);
      setPin('');
      setLoading(false)
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: '#f8f9fa',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      }}
    >
      <Paper elevation={6} sx={{
        p: { xs: 4, md: 5 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: 460,
        width: '90%',
        borderRadius: 3
      }}>
        <Box sx={{ height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', mb: 2 }}>
          <Fade in={messageVisible} timeout={400}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: 'primary.main',
                textAlign: 'center',
                letterSpacing: '0.05em',
              }}
            >
              {MESSAGES[messageIndex]}
            </Typography>
          </Fade>
        </Box>

        <Box
          component="img"
          src="/logo.jpg"
          alt="Logo"
          sx={{
            height: 50,
            borderRadius: 1,
            opacity: 0.9
          }}
        />

        <Typography variant="h5" gutterBottom fontWeight="700" color="text.primary">
          Restricted Access
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4, textAlign: 'center', px: 2 }}>
          Please enter the 4-digit PIN to securely access the platform.
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
          <TextField
            fullWidth
            type="password"
            label="4-Digit PIN"
            variant="outlined"
            value={pin}
            onChange={(e) => {
              const val = e.target.value;
              if (/^\d*$/.test(val) && val.length <= 4) {
                setPin(val);
              }
            }}
            error={error}
            helperText={error ? 'Incorrect PIN. Please try again.' : ''}
            sx={{ mb: 4 }}
            inputProps={{
              maxLength: 4,
              style: { textAlign: 'center', letterSpacing: '0.8em', fontSize: '1.5rem', fontWeight: 600 }
            }}
            autoFocus
            disabled={loading}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            disabled={pin.length !== 4 || loading}
            sx={{ py: 1.5, fontSize: '1.1rem', fontWeight: 600, textTransform: 'none', borderRadius: 2 }}
          >
            {loading ? <CircularProgress size={26} color="inherit" /> : 'Enter Platform'}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default PinScreen;
