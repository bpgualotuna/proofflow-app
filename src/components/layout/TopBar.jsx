import ThemeToggle from '../common/ThemeToggle';

export default function TopBar({ theme, toggleTheme }) {
  const today = new Date().toLocaleDateString('es-ES', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <header className="flex items-center justify-between mb-8 py-2">
      <div className="space-y-1">
        <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-cyan-500">
          Terminal de Control
        </h2>
        <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 capitalize">
          {today}
        </h3>
      </div>

      <div className="flex items-center gap-8">
        {/* Theme Toggle integrated elegantly */}
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="text-right hidden sm:block">
            <p className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-wider">M. Administrador</p>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">Privilegios Root</p>
          </div>
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-slate-200 to-slate-400 p-[1px] shadow-lg transition-transform group-hover:scale-105">
            <div className="h-full w-full rounded-2xl bg-slate-900 dark:bg-black flex items-center justify-center text-xs font-black text-white uppercase">
              PF
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
