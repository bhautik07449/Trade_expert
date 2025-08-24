// src/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#A77B58',     // Muted coffee brown
      dark: '#7A5A3A',     // Darker shade for hover states
      light: '#E8D8C1',    // Light beige for backgrounds
    },
    secondary: {
      main: '#5F4B3B',     // Deep brown-gray for sidebar/header
      dark: '#3E3126',     // For strong highlights
      light: '#B8A393',    // For subtle accents
    },
    error: {
      main: '#C75C5C'      // Soft red for error states
    },
    info: {
      main: '#AAB0AE'      // Muted gray-green info color
    },
    text: {
      primary: '#3B3027',  // Main text color (dark brown)
      secondary: '#756B63',// Subtext or labels
      disabled: '#B8B2AA', // Placeholder, disabled states
    },
    background: {
      default: '#F5F0EB',  // Light beige background
      paper: '#FFFFFF'     // For cards, modals, sheets
    },
    divider: '#D6CEC4'     // Light neutral divider
  },
  typography: {
    fontFamily: `'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif`,
    fontSize: 14,
  },
  shape: {
    borderRadius: 8,
  },
});

export default theme;
