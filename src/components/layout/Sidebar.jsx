export default function Sidebar({ activeTab, onNavigate, className = '' }) {
  const menuItems = [
    { name: 'Dashboard', icon: '⚡' },
    { name: 'Analytics', icon: '📊' },
    { name: 'Auditoría', icon: '🛡️' },
    { name: 'Settings', icon: '⚙️' },
  ];

  return (
    <aside className={`w-[300px] h-screen fixed left-0 top-0 bg-[var(--bg-sidebar)] border-r-2 border-slate-300 dark:border-slate-700 flex flex-col z-20 transition-all ${className}`}>
      {/* BRANDING: Ultra-Spacious v3.3 - Maximum Breathing Room */}
      <div className="px-12 pt-20 pb-16 mb-16 border-b-2 border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/20">
        <div className="flex flex-col">
          <div className="mb-10 cursor-pointer" onClick={() => onNavigate('Dashboard')}>
            <div className="h-32 w-32 flex items-center justify-center relative group mx-auto">
              <img 
                src="/logo.png" 
                alt="ProofFlow" 
                className="h-28 w-auto relative z-10 transition-all duration-500 group-hover:scale-110 drop-shadow-2xl" 
              />
              <div className="absolute inset-0 bg-cyan-500/20 dark:bg-cyan-500/25 blur-[60px] rounded-full animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 blur-[40px] rounded-full"></div>
            </div>
          </div>
          
          <div className="text-center">
            <h1 className="text-5xl font-black tracking-tighter text-slate-900 dark:text-white leading-[0.9] mb-8 transition-colors bg-gradient-to-r from-slate-900 via-cyan-600 to-slate-900 dark:from-white dark:via-cyan-400 dark:to-white bg-clip-text text-transparent">
              ProofFlow
            </h1>
            <div className="flex items-center justify-center gap-4">
              <span className="h-2 w-2 rounded-full bg-cyan-500 shadow-[0_0_15px_#22d3ee] animate-pulse"></span>
              <p className="text-[15px] font-black text-cyan-500 dark:text-cyan-400 uppercase tracking-[0.4em] leading-none opacity-90 transition-colors">
                Fintech OS
              </p>
              <span className="h-2 w-2 rounded-full bg-cyan-500 shadow-[0_0_15px_#22d3ee] animate-pulse"></span>
            </div>
          </div>
        </div>
      </div>

      {/* NAVIGATION: Generous Gutter & Spacing */}
      <nav className="flex-1 px-8 space-y-3">
        {menuItems.map((item) => {
          const isActive = activeTab === item.name;
          return (
            <button
              key={item.name}
              onClick={() => onNavigate(item.name)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[14px] font-bold transition-all duration-300 group relative border-2 ${
                isActive 
                ? 'text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 border-cyan-500/30 shadow-lg shadow-cyan-500/10' 
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50 border-transparent hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              {isActive && (
                <span className="absolute left-0 w-1.5 h-6 bg-cyan-500 dark:bg-cyan-400 rounded-r-full shadow-[0_0_15px_#22d3ee]"></span>
              )}
              <span className={`text-lg ${isActive ? 'opacity-100' : 'opacity-50 group-hover:opacity-100 transition-opacity'}`}>
                {item.icon}
              </span>
              {item.name}
            </button>
          );
        })}
      </nav>

      {/* SYSTEM STATUS */}
      <div className="p-10">
        <div className="p-5 rounded-[24px] bg-slate-100 dark:bg-slate-900/40 border-2 border-slate-300 dark:border-slate-700 transition-colors shadow-sm">
          <div className="flex items-center gap-3 mb-1.5">
            <span className="h-2 w-2 rounded-full bg-cyan-500 shadow-[0_0_10px_#22d3ee]"></span>
            <span className="text-[11px] font-black text-slate-700 dark:text-slate-300 uppercase tracking-widest">System Active</span>
          </div>
          <p className="text-[10px] font-bold text-slate-500 dark:text-slate-500 tracking-tight">Node Cluster: Fuji-Avalanche</p>
        </div>
      </div>
    </aside>
  );
}
