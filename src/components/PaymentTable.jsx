import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  IconButton, 
  Chip,
  Typography,
  Box,
  Tooltip
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import LockIcon from '@mui/icons-material/Lock';
import { updateStatus } from '../api/payments';

const formatAmount = (num) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);

const StatusChip = ({ status }) => {
  const config = {
    pending: { label: 'Pendiente', color: 'warning', icon: '⏳' },
    approved: { label: 'Aprobado', color: 'success', icon: '✓' },
    rejected: { label: 'Rechazado', color: 'error', icon: '✕' },
  };
  
  const { label, color, icon } = config[status] || config.pending;
  
  return (
    <Chip 
      label={
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <span>{icon}</span>
          <span style={{ fontSize: '0.7rem', fontWeight: 900, letterSpacing: '0.1em' }}>{label}</span>
        </Box>
      }
      color={color}
      size="small"
      sx={{ 
        borderRadius: 2,
        fontWeight: 900,
        textTransform: 'uppercase',
      }}
    />
  );
};

export default function PaymentTable({ payments, onAction, onEventCaptured }) {
  const [loadingId, setLoadingId] = useState(null);

  const handle = async (id, status) => {
    setLoadingId(id + status);
    try {
      const result = await updateStatus(id, status, 'Root_Admin');
      if (result.event?._id) onEventCaptured(result.event._id);
      onAction();
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <Card sx={{ mb: 3, border: '2px solid', borderColor: 'divider' }}>
      <CardContent sx={{ p: 0 }}>
        <Box sx={{ p: 3, pb: 2 }}>
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
            📊 Registro Consolidado
          </Typography>
        </Box>
        
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'action.hover' }}>
                <TableCell sx={{ fontWeight: 900, fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Hash ID</TableCell>
                <TableCell sx={{ fontWeight: 900, fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Concepto / Entidad</TableCell>
                <TableCell align="right" sx={{ fontWeight: 900, fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Balance</TableCell>
                <TableCell align="center" sx={{ fontWeight: 900, fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Estatus</TableCell>
                <TableCell align="center" sx={{ fontWeight: 900, fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Gestión</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {payments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 8 }}>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        fontWeight: 700, 
                        textTransform: 'uppercase', 
                        letterSpacing: '0.15em',
                        color: 'text.disabled',
                        fontStyle: 'italic',
                      }}
                    >
                      No se detectan registros activos en la red
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                payments.map((p) => (
                  <TableRow 
                    key={p._id} 
                    sx={{ 
                      '&:hover': { bgcolor: 'action.hover' },
                      transition: 'background-color 0.2s',
                    }}
                  >
                    <TableCell>
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          fontFamily: 'monospace', 
                          fontSize: '0.7rem',
                          color: 'text.secondary',
                        }}
                      >
                        #{p._id.slice(-6).toUpperCase()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 700, fontSize: '0.8rem', mb: 0.5 }}>
                        {p.description}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.7rem' }}>
                        UID: {p.createdBy}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          fontWeight: 700, 
                          color: 'primary.main',
                          fontFamily: 'monospace',
                        }}
                      >
                        {formatAmount(p.amount)}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <StatusChip status={p.status} />
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                        {p.status === 'pending' ? (
                          <>
                            <Tooltip title="Aprobar">
                              <IconButton
                                size="small"
                                onClick={() => handle(p._id, 'approved')}
                                disabled={!!loadingId}
                                sx={{
                                  bgcolor: 'success.main',
                                  color: 'white',
                                  '&:hover': { bgcolor: 'success.dark' },
                                  width: 32,
                                  height: 32,
                                }}
                              >
                                <CheckCircleIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Rechazar">
                              <IconButton
                                size="small"
                                onClick={() => handle(p._id, 'rejected')}
                                disabled={!!loadingId}
                                sx={{
                                  bgcolor: 'error.main',
                                  color: 'white',
                                  '&:hover': { bgcolor: 'error.dark' },
                                  width: 32,
                                  height: 32,
                                }}
                              >
                                <CancelIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </>
                        ) : (
                          <IconButton
                            size="small"
                            disabled
                            sx={{
                              bgcolor: 'action.disabledBackground',
                              width: 32,
                              height: 32,
                            }}
                          >
                            <LockIcon fontSize="small" />
                          </IconButton>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
