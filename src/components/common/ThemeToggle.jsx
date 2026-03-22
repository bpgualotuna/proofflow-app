export default function ThemeToggle({ theme, toggleTheme }) {
  return (
    <button
      onClick={toggleTheme}
      className="h-10 px-4 rounded-xl bg-slate-200/50 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700 hover:border-cyan-500 transition-all flex items-center gap-2 group shadow-sm"
      aria-label="Toggle Theme"
    >
      <span className="text-lg group-hover:rotate-12 transition-transform">
        {theme === 'light' ? '🌙' : '☀️'}
      </span>
      <span className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-widest hidden sm:block">
        {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
      </span>
    </button>
  );
}
