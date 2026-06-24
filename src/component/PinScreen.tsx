import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Paper, CircularProgress, keyframes } from '@mui/material';

interface PinScreenProps {
  onSuccess: () => void;
}

const MESSAGES = [
  'Distinct Trade Medium',
  'Consolidated Trade Compliance',
  'Controlled End to End Services',
  'Traceable Ecosystem',
  'Self Service Deskboard',
  'Facilitated Procurement Partnering',
  'Administered Individualized Accounts',
  'Listed of Categorized & Classified Rates',
  'Regulated Accessible Financial Services'
];

const marqueeAnim = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const PinScreen: React.FC<PinScreenProps> = ({ onSuccess }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    if (pin === '4198') {
      setError(false);
      onSuccess();
      setLoading(false);
    } else {
      setError(true);
      setPin('');
      setLoading(false);
    }
  };

  const allMessages = MESSAGES.join('   •   ');

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
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
        maxWidth: 500,
        width: '90%',
        borderRadius: 3,
        overflow: 'hidden'
      }}>

        <Box
          component="img"
          src="/logo.png"
          alt="Logo"
          sx={{
            height: 60,
            borderRadius: 1,
            mb: 3,
            opacity: 0.95
          }}
        />

        <Box
          sx={{
            width: '100%',
            bgcolor: 'background.paper',
            py: 2,
            mb: 4,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderTop: '1px solid',
            borderBottom: '1px solid',
            borderColor: 'divider'
          }}
        >
          <Typography
            variant="overline"
            sx={{
              fontWeight: 800,
              color: 'primary.main',
              letterSpacing: '0.15em',
              mb: 1,
              fontSize: '0.75rem'
            }}
          >
            Feature enriched by
          </Typography>

          <Box sx={{ width: '100%', overflow: 'hidden' }}>
            <Box
              sx={{
                display: 'inline-block',
                whiteSpace: 'nowrap',
                animation: `${marqueeAnim} 50s linear infinite`,
                width: 'max-content'
              }}
            >
              <Typography sx={{ display: 'inline-block', px: 2, fontWeight: 600, color: 'text.secondary', fontSize: '0.95rem' }}>
                {allMessages}   •
              </Typography>
              <Typography sx={{ display: 'inline-block', px: 2, fontWeight: 600, color: 'text.secondary', fontSize: '0.95rem' }}>
                {allMessages}   •
              </Typography>
            </Box>
          </Box>
        </Box>

        <Typography variant="h5" gutterBottom fontWeight="700" color="text.primary">
          Restricted Access
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4, textAlign: 'center', px: 2, lineHeight: 1.6 }}>
          Please enter your authorized 4-digit PIN to securely access the platform.
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
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
