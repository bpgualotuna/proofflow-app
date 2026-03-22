import { useState } from 'react';
import { updateStatus } from '../api/payments';
import DashboardCard from './common/DashboardCard';
import StatusBadge from './common/StatusBadge';

const formatAmount = (num) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);

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
    <DashboardCard title="Registro Consolidado" icon="📊" className="overflow-hidden">
      <div className="overflow-x-auto -mx-8 -mb-8">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-900/50 border-y border-slate-200 dark:border-white/5 transition-colors">
              <th className="px-8 py-4 text-[10px] uppercase font-black tracking-widest text-slate-400 dark:text-slate-500">Hash ID</th>
              <th className="px-8 py-4 text-[10px] uppercase font-black tracking-widest text-slate-400 dark:text-slate-500">Concepto / Entidad</th>
              <th className="px-8 py-4 text-[10px] uppercase font-black tracking-widest text-slate-400 dark:text-slate-500 text-right">Balance</th>
              <th className="px-8 py-4 text-[10px] uppercase font-black tracking-widest text-slate-400 dark:text-slate-500 text-center">Estatus</th>
              <th className="px-8 py-4 text-[10px] uppercase font-black tracking-widest text-slate-400 dark:text-slate-500 text-center">Gesti&oacute;n</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-white/5 transition-colors">
            {payments.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-8 py-20 text-center text-[11px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest italic">
                  No se detectan registros activos en la red
                </td>
              </tr>
            ) : (
              payments.map((p) => (
                <tr key={p._id} className="hover:bg-cyan-500/[0.02] dark:hover:bg-cyan-500/[0.02] transition-colors group">
                  <td className="px-8 py-5 font-mono text-[10px] text-slate-400 dark:text-slate-500">
                    <span className="text-slate-300 dark:text-slate-700">#</span>{p._id.slice(-6).toUpperCase()}
                  </td>
                  <td className="px-8 py-5">
                    <p className="text-xs font-bold text-slate-900 dark:text-slate-200 mb-0.5 transition-colors">{p.description}</p>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">UID: {p.createdBy}</p>
                  </td>
                  <td className="px-8 py-5 text-sm font-bold text-right text-cyan-600 dark:text-cyan-400 tabular-nums transition-colors">
                    {formatAmount(p.amount)}
                  </td>
                  <td className="px-8 py-5 text-center">
                    <StatusBadge status={p.status} />
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex justify-center gap-2">
                      {p.status === 'pending' ? (
                        <>
                          <button
                            onClick={() => handle(p._id, 'approved')}
                            disabled={!!loadingId}
                            className="h-8 w-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all text-xs flex items-center justify-center shadow-lg shadow-emerald-500/5"
                          >
                            ✓
                          </button>
                          <button
                            onClick={() => handle(p._id, 'rejected')}
                            disabled={!!loadingId}
                            className="h-8 w-8 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-500 hover:bg-rose-500 hover:text-white transition-all text-xs flex items-center justify-center shadow-lg shadow-rose-500/5"
                          >
                            ✕
                          </button>
                        </>
                      ) : (
                        <span className="h-8 w-8 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/5 text-slate-300 dark:text-slate-700 flex items-center justify-center text-[10px] transition-colors">
                          L
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </DashboardCard>
  );
}
