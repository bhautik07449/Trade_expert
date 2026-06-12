import React from 'react';
import { Box, Typography, Button, Container, useTheme, keyframes } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ConstructionIcon from '@mui/icons-material/Construction';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
`;

const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
`;

export default function ComingSoon() {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, #f3f4f6 100%)`,
        px: 2,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            textAlign: 'center',
            zIndex: 2,
            position: 'relative'
          }}
        >
          {/* Animated Icon */}
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 100,
              height: 100,
              borderRadius: '50%',
              bgcolor: 'primary.light',
              color: 'primary.main',
              mb: 4,
              animation: `${float} 4s ease-in-out infinite`,
              boxShadow: '0 20px 40px rgba(0,0,0,0.08)'
            }}
          >
            <ConstructionIcon sx={{ fontSize: 50, animation: `${pulse} 2s infinite ease-in-out` }} />
          </Box>

          {/* Heading */}
          <Typography
            variant="h2"
            sx={{
              fontWeight: 900,
              color: 'text.primary',
              mb: 2,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              letterSpacing: '-1px'
            }}
          >
            Coming <Box component="span" sx={{ color: 'primary.main' }}>Soon</Box>
          </Typography>

          {/* Subheading */}
          <Typography
            variant="h6"
            sx={{
              color: 'text.secondary',
              mb: 5,
              fontWeight: 400,
              lineHeight: 1.6
            }}
          >
            We're working hard to bring you something amazing. 
            Stay tuned for updates!
          </Typography>

          {/* Action Button */}
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => navigate('/')}
            startIcon={<ArrowBackIcon />}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 30,
              textTransform: 'none',
              fontWeight: 700,
              fontSize: '1rem',
              boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 12px 20px rgba(0,0,0,0.15)',
              },
              transition: 'all 0.3s ease'
            }}
          >
            Back to Home
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
