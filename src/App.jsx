import { useState, useEffect } from 'react';
import { getPayments } from './api/payments';
import Sidebar from './components/layout/Sidebar';
import TopBar from './components/layout/TopBar';
import StatsGrid from './components/dashboard/StatsGrid';
import BlockchainFeed from './components/dashboard/BlockchainFeed';
import PaymentForm from './components/PaymentForm';
import PaymentTable from './components/PaymentTable';
import VerifyPanel from './components/VerifyPanel';
import './App.css';

function App() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastEventId, setLastEventId] = useState('');
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [activeTab, setActiveTab] = useState('Dashboard');

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
            <StatsGrid stats={stats} />
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
                <PaymentForm onCreated={loadData} />
                <BlockchainFeed />
              </div>
            </div>
          </>
        );
      case 'Analytics':
        return (
          <div className="premium-card p-20 text-center">
            <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-tighter">Módulo de Analytics</h2>
            <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-[11px]">Visualización de datos en tiempo real (Próximamente)</p>
            <div className="mt-12 h-40 bg-slate-100 dark:bg-white/5 rounded-3xl animate-pulse"></div>
          </div>
        );
      case 'Auditoría':
        return (
          <div className="premium-card p-20 text-center border-emerald-500/20">
            <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-tighter">Centro de Auditoría</h2>
            <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-[11px]">Reportes de cumplimiento y logs de blockchain</p>
            <div className="mt-8 flex justify-center gap-4">
              {[1,2,3].map(i => <div key={i} className="h-24 w-24 bg-emerald-500/10 rounded-2xl border border-emerald-500/20"></div>)}
            </div>
          </div>
        );
      case 'Settings':
        return (
          <div className="premium-card p-20 text-center">
            <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-tighter">Configuración</h2>
            <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-[11px]">Gestión de Red, API Keys y Preferencias de Sistema</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-layout" data-theme={theme}>
      {/* FIXED SIDEBAR */}
      <Sidebar activeTab={activeTab} onNavigate={setActiveTab} />
      
      {/* MAIN CONTENT AREA */}
      <main className="main-content">
        <TopBar theme={theme} toggleTheme={toggleTheme} />
        
        {renderContent()}

        {/* FOOTER: Professional Minimalist */}
        <footer className="mt-12 py-8 border-t border-slate-200 dark:border-white/5 flex justify-between items-center transition-colors">
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-700">ProofFlow OS v4.1.0</span>
            <div className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-800"></div>
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-700">Digital Asset Compliance System</span>
          </div>
          <p className="text-[10px] font-black text-slate-400 dark:text-slate-700 uppercase tracking-tighter">© 2026 DeepMind Labs</p>
        </footer>
      </main>

      {/* ATMOSPHERIC LAYER: Theme-Aware depth */}
      <div className="fixed inset-0 pointer-events-none -z-10 bg-[var(--bg-main)] transition-colors duration-500"></div>
    </div>
  );
}

export default App;
