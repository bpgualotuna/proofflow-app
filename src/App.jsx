import { useState, useEffect, useMemo } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { getTheme } from './theme';
import { getPayments } from './api/payments';
import Sidebar from './components/layout/Sidebar';
import TopBar from './components/layout/TopBar';
import StatsGrid from './components/dashboard/StatsGrid';
import BlockchainFeed from './components/dashboard/BlockchainFeed';
import PaymentForm from './components/PaymentForm';
import PaymentTable from './components/PaymentTable';
import VerifyPanel from './components/VerifyPanel';
import PaymentModal from './components/PaymentModal';
import './App.css';

function App() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastEventId, setLastEventId] = useState('');
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  const muiTheme = useMemo(() => getTheme(theme), [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const loadData = async () => {
    try {
      const data = await getPayments();
      setPayments(data);
    } catch (error) {
      console.error('Error cargando pagos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 10000);
    return () => clearInterval(interval);
  }, []);

  const stats = {
    total: payments.length,
    pending: payments.filter(p => p.status === 'pending').length,
    approved: payments.filter(p => p.status === 'approved').length,
    rejected: payments.filter(p => p.status === 'rejected').length
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return (
          <>
            <StatsGrid stats={stats} onOpenPaymentModal={() => setPaymentModalOpen(true)} />
            <div className="dashboard-sections">
              <div className="data-column">
                <PaymentTable 
                  payments={payments} 
                  onAction={loadData} 
                  onEventCaptured={setLastEventId} 
                />
                <VerifyPanel lastEventId={lastEventId} />
              </div>
              <div className="actions-column">
                <BlockchainFeed />
              </div>
            </div>
          </>
        );
      case 'Analytics':
        return (
          <div className="premium-card p-8 animate-fade-in-up" style={{ border: '1px solid var(--border-strong)' }}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: 'var(--accent-primary)' }}>MÓDULO</p>
                <h2 className="text-2xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>Analytics</h2>
                <p className="text-xs font-bold mt-1 uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Visualización de datos en tiempo real</p>
              </div>
              <span className="text-[10px] font-black px-3 py-1 rounded-lg" style={{ background: 'rgba(59,130,246,0.12)', color: '#3b82f6' }}>PRÓXIMAMENTE</span>
            </div>
            {/* Animated bar chart skeleton */}
            <div className="mt-2 flex items-end gap-3 h-40 px-4 py-3 rounded-xl" style={{ background: 'var(--border-subtle)', border: '1px solid var(--border-strong)' }}>
              {[60, 85, 40, 95, 70, 55, 80, 45, 90, 65, 75, 50].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-md animate-pulse"
                  style={{
                    height: `${h}%`,
                    background: `linear-gradient(to top, rgba(6,182,212,0.5), rgba(59,130,246,0.3))`,
                    animationDelay: `${i * 80}ms`,
                  }}
                />
              ))}
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              {['Volumen de Tx', 'Tasa de Aprobación', 'Tiempo Promedio'].map((label, i) => (
                <div key={i} className="p-4 rounded-xl" style={{ background: 'var(--border-subtle)', border: '1px solid var(--border-strong)' }}>
                  <p className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: 'var(--text-muted)' }}>{label}</p>
                  <div className="h-4 w-20 rounded animate-pulse" style={{ background: 'var(--border-strong)' }} />
                </div>
              ))}
            </div>
          </div>
        );
      case 'Auditoría':
        return (
          <div className="premium-card p-10 animate-fade-in-up" style={{ border: '1px solid var(--border-strong)' }}>

            {/* Header */}
            <div className="flex items-start justify-between mb-8">
              <div>
                <p
                  className="text-[11px] font-black uppercase tracking-[0.3em] mb-2"
                  style={{ color: '#10b981' }}
                >
                  MÓDULO
                </p>
                <h2
                  className="text-3xl font-black tracking-tight mb-2"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Centro de Auditoría
                </h2>
                <p
                  className="text-[13px] font-semibold uppercase tracking-widest"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Reportes de cumplimiento y logs de blockchain
                </p>
              </div>
              <span
                className="text-[11px] font-black px-4 py-1.5 rounded-xl flex-shrink-0"
                style={{ background: 'rgba(16,185,129,0.12)', color: '#10b981' }}
              >
                PRÓXIMAMENTE
              </span>
            </div>

            {/* Section label */}
            <p
              className="text-[11px] font-black uppercase tracking-[0.3em] mb-4"
              style={{ color: 'var(--text-muted)' }}
            >
              Registro de Eventos Recientes
            </p>

            {/* Log entries */}
            <div className="space-y-4">
              {[
                { type: 'TX',   color: '#06b6d4', icon: '⛓',  time: '14:55:01', msg: 'Transacción #0028 validada en cadena',           sub: 'Hash: 0xPF82...A3D1' },
                { type: 'AUTH', color: '#10b981', icon: '🔐', time: '14:50:32', msg: 'Acceso de administrador autenticado',             sub: 'IP: 192.168.1.5' },
                { type: 'ALERT',color: '#f59e0b', icon: '⚠️',  time: '14:32:10', msg: 'Threshold de monto superado — revisión manual', sub: 'Monto: $12,500 USD' },
                { type: 'SYNC', color: '#8b5cf6', icon: '🔁',  time: '14:10:44', msg: 'Sincronización completada: 9 nodos activos',    sub: 'Red: Avalanche Fuji' },
              ].map((entry, i) => (
                <div
                  key={i}
                  className="flex items-center gap-5 px-6 py-5 rounded-2xl transition-all"
                  style={{
                    background: `linear-gradient(90deg, ${entry.color}0A 0%, var(--border-subtle) 60%)`,
                    border: `1px solid ${entry.color}25`,
                  }}
                >
                  {/* Icon box */}
                  <div
                    className="flex items-center justify-center w-11 h-11 rounded-xl flex-shrink-0 text-lg"
                    style={{ background: `${entry.color}18` }}
                  >
                    {entry.icon}
                  </div>

                  {/* Badge */}
                  <span
                    className="text-[11px] font-black px-3 py-1 rounded-lg flex-shrink-0 uppercase tracking-wider"
                    style={{ background: `${entry.color}18`, color: entry.color }}
                  >
                    {entry.type}
                  </span>

                  {/* Message + sub */}
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-[14px] font-bold leading-tight mb-0.5"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {entry.msg}
                    </p>
                    <p
                      className="text-[12px] font-medium"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {entry.sub}
                    </p>
                  </div>

                  {/* Timestamp */}
                  <span
                    className="text-[12px] font-mono font-semibold flex-shrink-0"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {entry.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      case 'Settings':
        return (
          <div className="premium-card p-8 animate-fade-in-up" style={{ border: '1px solid var(--border-strong)' }}>
            <div className="mb-6">
              <p className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: 'var(--accent-primary)' }}>MÓDULO</p>
              <h2 className="text-2xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>Configuración</h2>
              <p className="text-xs font-bold mt-1 uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Gestión de Red, API Keys y Preferencias del Sistema</p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {[
                { title: 'Red & Nodos', desc: 'Configuración de cluster, endpoints y latencia', color: '#06b6d4', items: ['RPC Endpoint', 'Timeout de conexión', 'Nodos mínimos'] },
                { title: 'API Keys', desc: 'Gestión de claves de acceso a servicios externos', color: '#8b5cf6', items: ['Clave primaria', 'Clave de respaldo', 'Alcance de permisos'] },
                { title: 'Apariencia', desc: 'Preferencias visuales y de notificaciones', color: '#10b981', items: ['Tema', 'Densidad de datos', 'Alertas en tiempo real'] },
              ].map((section, i) => (
                <div key={i} className="p-5 rounded-xl" style={{ background: 'var(--border-subtle)', border: '1px solid var(--border-strong)' }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${section.color}18` }}>
                      <span className="w-3 h-3 rounded-full" style={{ background: section.color, display: 'block' }} />
                    </div>
                    <div>
                      <p className="text-sm font-black" style={{ color: 'var(--text-primary)' }}>{section.title}</p>
                      <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{section.desc}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {section.items.map((item, j) => (
                      <span key={j} className="text-[10px] font-bold px-2 py-1 rounded-md" style={{ background: 'var(--border-strong)', color: 'var(--text-secondary)' }}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <div className="dashboard-layout" data-theme={theme}>
        {/* FIXED SIDEBAR */}
        <Sidebar activeTab={activeTab} onNavigate={setActiveTab} />
      
      {/* MAIN CONTENT AREA */}
      <main className="main-content">
        <TopBar theme={theme} toggleTheme={toggleTheme} />
        
        {renderContent()}

        {/* FOOTER: Professional Minimalist */}
        <footer className="mt-12 py-8 border-t-2 border-slate-300 dark:border-slate-700 flex justify-between items-center transition-colors">
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400">ProofFlow OS v4.1.0</span>
            <div className="h-1 w-1 rounded-full bg-slate-400 dark:bg-slate-600"></div>
            <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400">Digital Asset Compliance System</span>
          </div>
          <p className="text-[10px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-tighter">© 2026 DeepMind Labs</p>
        </footer>
      </main>

        {/* ATMOSPHERIC LAYER: Theme-Aware depth */}
        <div className="fixed inset-0 pointer-events-none -z-10 bg-[var(--bg-main)] transition-colors duration-500"></div>
      </div>

      {/* Modal de Nueva Operación */}
      <PaymentModal 
        open={paymentModalOpen} 
        onClose={() => setPaymentModalOpen(false)} 
        onCreated={loadData} 
      />
    </ThemeProvider>
  );
}

export default App;
