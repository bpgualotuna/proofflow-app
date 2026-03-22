import { useState } from 'react';
import { verifyPayment } from '../api/payments';
import DashboardCard from './common/DashboardCard';

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
    <DashboardCard title="Auditoría de Integridad" icon="🔍" footer="Avalanche Fuji C-Chain Verified">
      <div className="space-y-6">
        <form onSubmit={handleVerify} className="flex gap-3">
          <input
            type="text"
            className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-xl px-4 py-3 focus:border-cyan-500 transition-all outline-none"
            placeholder={lastEventId ? `Auto-detect: ${lastEventId.slice(-8)}...` : "Hash del evento..."}
            value={eventId}
            onChange={(e) => setEventId(e.target.value)}
          />
          <button type="submit" className="btn-primary" disabled={loading || (!eventId && !lastEventId)}>
            {loading ? '...' : 'Verificar'}
          </button>
        </form>

        {result && (
          <div className={`p-6 rounded-2xl border transition-all ${
            result.isValid 
            ? 'bg-emerald-500/[0.03] dark:bg-emerald-500/5 border-emerald-500/20' 
            : 'bg-rose-500/[0.03] dark:bg-rose-500/5 border-rose-500/20'
          }`}>
            <div className="flex items-center gap-4">
              <div className={`h-12 w-12 rounded-xl flex items-center justify-center text-xl ${
                result.isValid ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
              }`}>
                {result.isValid ? '🛡️' : '⚠️'}
              </div>
              <div>
                <p className="text-sm font-black uppercase text-slate-900 dark:text-white tracking-widest transition-colors">
                  {result.isValid ? 'Integridad Verificada' : 'Error de Validación'}
                </p>
                <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">
                  {result.isValid ? 'Consenso de red alcanzado' : result.error}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardCard>
  );
}
