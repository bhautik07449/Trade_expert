import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Paper } from '@mui/material';

interface PinScreenProps {
  onSuccess: () => void;
}

const PinScreen: React.FC<PinScreenProps> = ({ onSuccess }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '1234') {
      setError(false);
      onSuccess();
    } else {
      setError(true);
      setPin('');
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
        bgcolor: 'background.default',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
      }}
    >
      <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: 400, width: '90%' }}>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          Enter PIN to Access
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3, textAlign: 'center' }}>
          Please enter the 4-digit PIN code to view this website.
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
            sx={{ mb: 3 }}
            inputProps={{
              maxLength: 4,
              style: { textAlign: 'center', letterSpacing: '0.5em', fontSize: '1.2rem' }
            }}
            autoFocus
          />
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            fullWidth 
            size="large"
            disabled={pin.length !== 4}
          >
            Enter Website
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default PinScreen;
