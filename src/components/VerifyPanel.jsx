import { useState } from 'react';
import { Card, CardContent, TextField, Button, Box, Typography, Alert, CircularProgress } from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';
import WarningIcon from '@mui/icons-material/Warning';
import SearchIcon from '@mui/icons-material/Search';
import { verifyPayment } from '../api/payments';

export default function VerifyPanel({ lastEventId }) {
  const [eventId, setEventId] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    const id = eventId || lastEventId;
    if (!id) return;
    
    setLoading(true);
    try {
      const data = await verifyPayment(id);
      setResult(data);
    } catch (error) {
      setResult({ isValid: false, error: 'Fallo en la verificación de integridad' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card sx={{ border: '2px solid', borderColor: 'divider' }}>
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
            🔍 Auditoría de Integridad
          </Typography>
        </Box>

        <form onSubmit={handleVerify}>
          <Box sx={{ display: 'flex', gap: 1.5, mb: 3 }}>
            <TextField
              fullWidth
              size="small"
              placeholder={lastEventId ? `Auto-detect: ${lastEventId.slice(-8)}...` : "Hash del evento..."}
              value={eventId}
              onChange={(e) => setEventId(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  fontFamily: 'monospace',
                  fontSize: '0.85rem',
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              disabled={loading || (!eventId && !lastEventId)}
              startIcon={loading ? <CircularProgress size={16} color="inherit" /> : <SearchIcon />}
              sx={{
                minWidth: 120,
                fontWeight: 900,
                fontSize: '0.7rem',
                letterSpacing: '0.1em',
              }}
            >
              {loading ? '...' : 'Verificar'}
            </Button>
          </Box>
        </form>

        {result && (
          <Alert
            severity={result.isValid ? 'success' : 'error'}
            icon={result.isValid ? <VerifiedIcon /> : <WarningIcon />}
            sx={{
              borderRadius: 3,
              '& .MuiAlert-message': {
                width: '100%',
              },
            }}
          >
            <Typography 
              variant="body2" 
              sx={{ 
                fontWeight: 900, 
                textTransform: 'uppercase', 
                letterSpacing: '0.1em',
                fontSize: '0.75rem',
                mb: 0.5,
              }}
            >
              {result.isValid ? 'Integridad Verificada' : 'Error de Validación'}
            </Typography>
            <Typography 
              variant="caption" 
              sx={{ 
                fontWeight: 700, 
                textTransform: 'uppercase',
                fontSize: '0.65rem',
                opacity: 0.8,
              }}
            >
              {result.isValid ? 'Consenso de red alcanzado' : result.error}
            </Typography>
          </Alert>
        )}

        <Box 
          sx={{ 
            mt: 3, 
            pt: 3, 
            borderTop: 1, 
            borderColor: 'divider',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography 
            variant="caption" 
            sx={{ 
              fontWeight: 700, 
              textTransform: 'uppercase', 
              letterSpacing: '0.15em',
              fontSize: '0.6rem',
              color: 'text.disabled',
              fontStyle: 'italic',
            }}
          >
            Avalanche Fuji C-Chain Verified
          </Typography>
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            {[1, 2, 3].map(i => (
              <Box 
                key={i} 
                sx={{ 
                  width: 4, 
                  height: 4, 
                  borderRadius: '50%', 
                  bgcolor: 'action.disabled',
                }} 
              />
            ))}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
