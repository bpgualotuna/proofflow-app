import { Card, CardContent, Box, Typography, Chip, Divider } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import CloudDoneIcon from '@mui/icons-material/CloudDone';

export default function BlockchainFeed() {
  const events = [
    { id: 1, type: 'SYNC', msg: 'BLOQUE #0028 CONFIRMACIÓN FINALIZADA', time: '14:55:01', color: '#10b981' },
    { id: 2, type: 'TX', msg: 'CONTRATO 0XPF82... REGISTRADO OK', time: '14:50:32', color: '#06b6d4' },
    { id: 3, type: 'PEER', msg: '9 NODOS ACTIVOS EN AVALANCHE FUJI', time: '14:32:10', color: '#8b5cf6' }
  ];

  return (
    <Card sx={{ flex: 1, border: '2px solid', borderColor: 'divider' }}>
      <CardContent sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Typography 
            variant="caption" 
            sx={{ 
              fontWeight: 900, 
              textTransform: 'uppercase', 
              letterSpacing: '0.2em',
              fontSize: '0.65rem',
              color: 'text.secondary',
            }}
          >
            🔗 Live Chain Feed
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {events.map((ev, index) => (
            <Box key={ev.id}>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5, pt: 0.5 }}>
                  <FiberManualRecordIcon 
                    sx={{ 
                      fontSize: 10, 
                      color: ev.color,
                      filter: `drop-shadow(0 0 4px ${ev.color}80)`,
                    }} 
                  />
                  {index < events.length - 1 && (
                    <Box 
                      sx={{ 
                        width: 1, 
                        height: 40, 
                        bgcolor: 'divider',
                      }} 
                    />
                  )}
                </Box>
                
                <Box sx={{ flex: 1, pb: index < events.length - 1 ? 2 : 0 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                    <Chip 
                      label={ev.type}
                      size="small"
                      sx={{ 
                        height: 20,
                        fontSize: '0.6rem',
                        fontWeight: 900,
                        letterSpacing: '0.1em',
                        bgcolor: `${ev.color}20`,
                        color: ev.color,
                      }}
                    />
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        fontFamily: 'monospace',
                        fontSize: '0.65rem',
                        color: 'text.disabled',
                      }}
                    >
                      {ev.time}
                    </Typography>
                  </Box>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      fontWeight: 900,
                      fontSize: '0.7rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      lineHeight: 1.4,
                      color: 'text.primary',
                    }}
                  >
                    {ev.msg}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box 
          sx={{ 
            p: 2, 
            borderRadius: 2,
            bgcolor: (theme) => theme.palette.mode === 'light' ? 'success.light' : 'success.main',
            backgroundImage: (theme) => theme.palette.mode === 'light' 
              ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(16, 185, 129, 0.08) 100%)'
              : 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.05) 100%)',
            border: 2,
            borderColor: 'success.main',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box 
              sx={{ 
                width: 32, 
                height: 32, 
                borderRadius: 1.5,
                bgcolor: (theme) => theme.palette.mode === 'light' ? 'success.main' : 'success.main',
                backgroundImage: (theme) => theme.palette.mode === 'light'
                  ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.3) 0%, rgba(16, 185, 129, 0.15) 100%)'
                  : 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(16, 185, 129, 0.1) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CloudDoneIcon sx={{ fontSize: 18, color: 'success.dark' }} />
            </Box>
            <Box>
              <Typography 
                variant="caption" 
                sx={{ 
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontSize: '0.65rem',
                  color: 'text.primary',
                  display: 'block',
                }}
              >
                Avalanche Network
              </Typography>
              <Typography 
                variant="caption" 
                sx={{ 
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  fontSize: '0.6rem',
                  color: 'text.secondary',
                }}
              >
                C-Chain Bridge v1.2
              </Typography>
            </Box>
          </Box>
          <Chip 
            label="Connected"
            size="small"
            color="success"
            sx={{ 
              fontWeight: 900,
              fontSize: '0.6rem',
              letterSpacing: '0.1em',
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}
