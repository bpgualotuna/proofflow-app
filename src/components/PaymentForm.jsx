import { useState } from 'react';
import { createPayment } from '../api/payments';
import DashboardCard from './common/DashboardCard';

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
    <DashboardCard title="Nueva Operación" icon="✨" className="mb-6">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">Monto</label>
          <input
            type="number"
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-xl px-4 py-3 focus:border-cyan-500 transition-all outline-none text-sm font-bold"
            placeholder="0.00"
            value={formData.amount}
            required
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">Descripción</label>
          <input
            type="text"
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-xl px-4 py-3 focus:border-cyan-500 transition-all outline-none text-sm"
            placeholder="Concepto del pago..."
            value={formData.description}
            required
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">Solicitante</label>
          <input
            type="text"
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-xl px-4 py-3 focus:border-cyan-500 transition-all outline-none text-sm"
            placeholder="Nombre completo"
            value={formData.createdBy}
            required
            onChange={(e) => setFormData({ ...formData, createdBy: e.target.value })}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary py-4 rounded-xl text-xs font-black uppercase tracking-[0.2em] shadow-lg shadow-cyan-500/10 mt-2"
        >
          {loading ? 'Procesando...' : 'Registrar Pago'}
        </button>
      </form>
    </DashboardCard>
  );
}
