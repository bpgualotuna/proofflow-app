const StatItem = ({ label, value, icon, color }) => (
  <div className="premium-card p-6 border-none hover:shadow-xl hover:shadow-cyan-500/5 transition-all group overflow-hidden relative">
    <div className="relative z-10 flex items-center justify-between mb-4">
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
        {label}
      </p>
      <span className="text-lg grayscale opacity-20 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110">
        {icon}
      </span>
    </div>
    <div className="relative z-10">
      <h4 className={`text-3xl font-black tracking-tighter transition-colors ${color}`}>
        {value}
      </h4>
    </div>
    
    {/* Subtle Inner Glow on Hover */}
    <div className={`absolute -right-4 -bottom-4 w-24 h-24 blur-3xl opacity-0 group-hover:opacity-10 transition-opacity rounded-full bg-current ${color}`}></div>
  </div>
);

export default function StatsGrid({ stats }) {
  const formatMoney = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      <StatItem label="Ingresos Totales" value={formatMoney(2150)} icon="💰" color="text-cyan-500 dark:text-cyan-400" />
      <StatItem label="Pendientes" value={stats.pending} icon="⏳" color="text-amber-500 dark:text-amber-400" />
      <StatItem label="Aprobados" value={stats.approved} icon="✅" color="text-emerald-500 dark:text-emerald-400" />
      <StatItem label="Rechazados" value={stats.rejected} icon="❌" color="text-rose-500 dark:text-rose-400" />
    </div>
  );
}
