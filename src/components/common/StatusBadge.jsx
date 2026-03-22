export default function StatusBadge({ status }) {
  const configs = {
    pending: { 
      label: 'Pendiente', 
      classes: 'bg-amber-400/10 text-amber-600 dark:text-amber-400 border-amber-400/20' 
    },
    approved: { 
      label: 'Completado', 
      classes: 'bg-cyan-400/10 text-cyan-600 dark:text-cyan-400 border-cyan-400/20' 
    },
    rejected: { 
      label: 'Fallido', 
      classes: 'bg-rose-400/10 text-rose-600 dark:text-rose-400 border-rose-400/20' 
    }
  };

  const config = configs[status] || configs.pending;

  return (
    <div className={`px-3 py-1 rounded-full border text-[9px] font-black uppercase tracking-widest inline-flex items-center gap-1.5 transition-colors ${config.classes}`}>
      <span className="h-1 w-1 rounded-full bg-current animate-pulse"></span>
      {config.label}
    </div>
  );
}
