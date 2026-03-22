import { Box, Typography, Avatar, Chip } from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ThemeToggle from '../common/ThemeToggle';

export default function TopBar({ theme, toggleTheme }) {
  const today = new Date().toLocaleDateString('es-ES', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        mb: 4,
        py: 1,
      }}
    >
      <Box>
        <Typography 
          variant="caption" 
          sx={{ 
            fontWeight: 900, 
            textTransform: 'uppercase', 
            letterSpacing: '0.3em',
            fontSize: '0.65rem',
            color: 'primary.main',
            display: 'block',
            mb: 0.5,
          }}
        >
          Terminal de Control
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ 
            fontWeight: 700,
            fontSize: '0.85rem',
            color: 'text.secondary',
            textTransform: 'capitalize',
          }}
        >
          {today}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 2,
            cursor: 'pointer',
            transition: 'transform 0.2s',
            '&:hover': {
              transform: 'scale(1.02)',
            },
          }}
        >
          <Box sx={{ textAlign: 'right', display: { xs: 'none', sm: 'block' } }}>
            <Typography 
              variant="caption" 
              sx={{ 
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                fontSize: '0.7rem',
                color: 'text.primary',
                display: 'block',
              }}
            >
              M. Administrador
            </Typography>
            <Chip 
              label="Privilegios Root"
              size="small"
              icon={<AdminPanelSettingsIcon />}
              sx={{ 
                height: 20,
                fontSize: '0.6rem',
                fontWeight: 700,
                mt: 0.5,
              }}
            />
          </Box>
          <Avatar 
            sx={{ 
              width: 48, 
              height: 48,
              background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
              fontWeight: 900,
              fontSize: '0.9rem',
              letterSpacing: '0.05em',
              boxShadow: '0 4px 12px rgba(6, 182, 212, 0.3)',
            }}
          >
            PF
          </Avatar>
        </Box>
      </Box>
    </Box>
  );
}
