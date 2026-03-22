import StatusBadge from './StatusBadge';

export default function DashboardCard({ title, icon, children, footer, className = '' }) {
  return (
    <div className={`premium-card p-8 flex flex-col gap-6 group ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xl opacity-60 group-hover:opacity-100 transition-opacity">{icon}</span>
          <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
            {title}
          </h3>
        </div>
        <div className="h-1 w-1 rounded-full bg-slate-200 dark:bg-slate-800"></div>
      </div>

      <div className="flex-1">
        {children}
      </div>

      {footer && (
        <div className="pt-6 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
          <p className="text-[9px] font-bold uppercase tracking-widest text-slate-300 dark:text-slate-700 italic">
            {footer}
          </p>
          <div className="flex gap-1">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-1 w-1 rounded-full bg-slate-100 dark:bg-slate-800"></div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
