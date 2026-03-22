import { createTheme } from '@mui/material/styles';

export const getTheme = (mode) => createTheme({
  palette: {
    mode,
    primary: {
      main: '#06b6d4',
      light: '#22d3ee',
      dark: '#0891b2',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#2563eb',
      light: '#3b82f6',
      dark: '#1e40af',
    },
    success: {
      main: '#10b981',
      light: '#34d399',
      dark: '#059669',
    },
    error: {
      main: '#ef4444',
      light: '#f87171',
      dark: '#dc2626',
    },
    warning: {
      main: '#f59e0b',
      light: '#fbbf24',
      dark: '#d97706',
    },
    background: {
      default: mode === 'light' ? '#f8fafc' : '#020617',
      paper: mode === 'light' ? '#ffffff' : '#1e293b',
    },
    text: {
      primary: mode === 'light' ? '#0f172a' : '#f8fafc',
      secondary: mode === 'light' ? '#475569' : '#94a3b8',
    },
  },
  typography: {
    fontFamily: "'Inter', 'Outfit', sans-serif",
    h1: {
      fontFamily: "'Outfit', sans-serif",
      fontWeight: 900,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontFamily: "'Outfit', sans-serif",
      fontWeight: 800,
      letterSpacing: '-0.02em',
    },
    h3: {
      fontFamily: "'Outfit', sans-serif",
      fontWeight: 700,
    },
    button: {
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '12px 24px',
          fontSize: '0.75rem',
          fontWeight: 900,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 10px 25px -5px rgba(6, 182, 212, 0.2)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: mode === 'light' 
            ? '0 4px 6px -1px rgb(0 0 0 / 0.1)' 
            : '0 10px 15px -3px rgb(0 0 0 / 0.5)',
          border: mode === 'light' 
            ? '2px solid rgba(0, 0, 0, 0.08)' 
            : '2px solid rgba(255, 255, 255, 0.1)',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: mode === 'light'
              ? '0 20px 40px -15px rgba(0, 0, 0, 0.15)'
              : '0 20px 40px -15px rgba(0, 0, 0, 0.6)',
            borderColor: mode === 'light' 
              ? 'rgba(6, 182, 212, 0.3)' 
              : 'rgba(6, 182, 212, 0.4)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
          },
        },
      },
    },
  },
});
