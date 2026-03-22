import { Card, CardContent, Typography, Box, Grow, Fab } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import AddIcon from '@mui/icons-material/Add';

// eslint-disable-next-line react/prop-types
const StatItem = ({ label, value, icon: IconComponent, color, delay }) => (
  <Grow in={true} timeout={500 + delay * 100}>
    <Card 
      sx={{ 
        position: 'relative',
        overflow: 'hidden',
        border: '2px solid',
        borderColor: 'divider',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: `0 20px 40px -15px ${color}30`,
          borderColor: color,
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography 
            variant="caption" 
            sx={{ 
              fontWeight: 900, 
              textTransform: 'uppercase', 
              letterSpacing: '0.15em',
              fontSize: '0.65rem',
              color: 'text.secondary',
            }}
          >
            {label}
          </Typography>
          <IconComponent sx={{ fontSize: 28, color, opacity: 0.3 }} />
        </Box>
        <Typography 
          variant="h3" 
          sx={{ 
            fontWeight: 900, 
            color,
            letterSpacing: '-0.02em',
          }}
        >
          {value}
        </Typography>
        <Box
          sx={{
            position: 'absolute',
            right: -20,
            bottom: -20,
            width: 100,
            height: 100,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${color}15 0%, transparent 70%)`,
            pointerEvents: 'none',
          }}
        />
      </CardContent>
    </Card>
  </Grow>
);

export default function StatsGrid({ stats, onOpenPaymentModal }) {
  const formatMoney = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  const statsData = [
    { label: 'Ingresos Totales', value: formatMoney(2150), icon: TrendingUpIcon, color: '#06b6d4', delay: 0 },
    { label: 'Pendientes', value: stats.pending, icon: HourglassEmptyIcon, color: '#f59e0b', delay: 1 },
    { label: 'Aprobados', value: stats.approved, icon: CheckCircleIcon, color: '#10b981', delay: 2 },
    { label: 'Rechazados', value: stats.rejected, icon: CancelIcon, color: '#ef4444', delay: 3 },
  ];

  return (
    <Box sx={{ position: 'relative', mb: 6 }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }, gap: 3 }}>
        {statsData.map((stat, index) => (
          <StatItem key={index} {...stat} />
        ))}
      </Box>
      
      {/* Botón flotante para nueva operación */}
      <Fab
        color="primary"
        aria-label="nueva operación"
        onClick={onOpenPaymentModal}
        sx={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          width: 64,
          height: 64,
          background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
          boxShadow: '0 8px 24px rgba(6, 182, 212, 0.4)',
          '&:hover': {
            background: 'linear-gradient(135deg, #0891b2 0%, #06b6d4 100%)',
            transform: 'scale(1.1)',
            boxShadow: '0 12px 32px rgba(6, 182, 212, 0.5)',
          },
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          zIndex: 1000,
        }}
      >
        <AddIcon sx={{ fontSize: 32 }} />
      </Fab>
    </Box>
  );
}
