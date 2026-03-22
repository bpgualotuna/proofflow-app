import { useState, forwardRef } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  TextField, 
  Button, 
  Box, 
  CircularProgress,
  IconButton,
  Typography,
  Slide
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { createPayment } from '../api/payments';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function PaymentModal({ open, onClose, onCreated }) {
  const [formData, setFormData] = useState({ amount: '', description: '', createdBy: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createPayment(formData);
      setFormData({ amount: '', description: '', createdBy: '' });
      onCreated();
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setFormData({ amount: '', description: '', createdBy: '' });
      onClose();
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      TransitionComponent={Transition}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          border: '2px solid',
          borderColor: 'divider',
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        pb: 2,
        borderBottom: 2,
        borderColor: 'divider',
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 900, 
              textTransform: 'uppercase', 
              letterSpacing: '0.1em',
              fontSize: '1rem',
            }}
          >
            ✨ Nueva Operación
          </Typography>
        </Box>
        <IconButton 
          onClick={handleClose} 
          disabled={loading}
          sx={{ 
            color: 'text.secondary',
            '&:hover': { 
              bgcolor: 'error.main', 
              color: 'white' 
            }
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ pt: 3, pb: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              label="Monto"
              type="number"
              fullWidth
              required
              autoFocus
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
              multiline
              rows={3}
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
          </Box>
        </DialogContent>

        <DialogActions sx={{ 
          p: 3, 
          pt: 2,
          borderTop: 2,
          borderColor: 'divider',
          gap: 2 
        }}>
          <Button
            onClick={handleClose}
            disabled={loading}
            variant="outlined"
            sx={{
              fontWeight: 900,
              fontSize: '0.7rem',
              letterSpacing: '0.1em',
              px: 3,
            }}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
            sx={{
              px: 4,
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
        </DialogActions>
      </form>
    </Dialog>
  );
}
