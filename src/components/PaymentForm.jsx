import { useState } from 'react';
import { Card, CardContent, TextField, Button, Typography, Box, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { createPayment } from '../api/payments';

export default function PaymentForm({ onCreated }) {
  const [formData, setFormData] = useState({ amount: '', description: '', createdBy: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createPayment(formData);
      setFormData({ amount: '', description: '', createdBy: '' });
      onCreated();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card sx={{ mb: 3, border: '2px solid', borderColor: 'divider' }}>
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
            ✨ Nueva Operación
          </Typography>
        </Box>
        
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <TextField
              label="Monto"
              type="number"
              fullWidth
              required
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              placeholder="0.00"
              InputLabelProps={{ 
                sx: { fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' } 
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  fontWeight: 700,
                },
              }}
            />

            <TextField
              label="Descripción"
              fullWidth
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Concepto del pago..."
              InputLabelProps={{ 
                sx: { fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' } 
              }}
            />

            <TextField
              label="Solicitante"
              fullWidth
              required
              value={formData.createdBy}
              onChange={(e) => setFormData({ ...formData, createdBy: e.target.value })}
              placeholder="Nombre completo"
              InputLabelProps={{ 
                sx: { fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' } 
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
              sx={{
                py: 1.5,
                mt: 1,
                fontSize: '0.7rem',
                fontWeight: 900,
                letterSpacing: '0.15em',
                background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #0891b2 0%, #06b6d4 100%)',
                },
              }}
            >
              {loading ? 'Procesando...' : 'Registrar Pago'}
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
}
