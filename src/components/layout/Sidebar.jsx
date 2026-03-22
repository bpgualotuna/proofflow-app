export default function Sidebar({ activeTab, onNavigate, className = '' }) {
  const menuItems = [
    { name: 'Dashboard', icon: '⚡' },
    { name: 'Analytics', icon: '📊' },
    { name: 'Auditoría', icon: '🛡️' },
    { name: 'Settings', icon: '⚙️' },
  ];

  return (
    <aside className={`w-[300px] h-screen fixed left-0 top-0 bg-[var(--bg-sidebar)] border-r border-slate-200 dark:border-white/5 flex flex-col z-20 transition-all ${className}`}>
      {/* BRANDING: Ultra-Spacious v3.3 - Maximum Breathing Room */}
      <div className="px-12 pt-20 pb-16 mb-16 border-b border-slate-200 dark:border-white/5 bg-slate-500/[0.02]">
        <div className="flex flex-col">
          <div className="mb-14 cursor-pointer" onClick={() => onNavigate('Dashboard')}>
            <div className="h-20 w-20 flex items-center justify-center relative group">
              <img src="/logo.png" alt="PF" className="h-16 w-auto relative z-10 transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-cyan-500/10 dark:bg-cyan-500/15 blur-[40px] rounded-full"></div>
            </div>
          </div>
          
          <div>
            <h1 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white leading-[0.9] mb-6 transition-colors">
              ProofFlow
            </h1>
            <div className="flex items-center gap-4">
              <span className="h-2 w-2 rounded-full bg-cyan-500 shadow-[0_0_15px_#22d3ee]"></span>
              <p className="text-[14px] font-black text-cyan-500 dark:text-cyan-400 uppercase tracking-[0.4em] leading-none opacity-80 transition-colors">
                Fintech OS
              </p>
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
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[14px] font-bold transition-all duration-300 group relative ${
                isActive 
                ? 'text-cyan-600 dark:text-cyan-400 bg-cyan-500/[0.05]' 
                : 'text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-500/[0.05]'
              }`}
            >
              {isActive && (
                <span className="absolute left-0 w-1.5 h-6 bg-cyan-500 dark:bg-cyan-400 rounded-r-full shadow-[0_0_15px_#22d3ee]"></span>
              )}
              <span className={`text-lg ${isActive ? 'opacity-100' : 'opacity-30 group-hover:opacity-100 transition-opacity'}`}>
                {item.icon}
              </span>
              {item.name}
            </button>
          );
        })}
      </nav>

      {/* SYSTEM STATUS */}
      <div className="p-10">
        <div className="p-5 rounded-[24px] bg-slate-500/[0.05] dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 transition-colors">
          <div className="flex items-center gap-3 mb-1.5">
            <span className="h-2 w-2 rounded-full bg-cyan-500 shadow-[0_0_10px_#22d3ee]"></span>
            <span className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">System Active</span>
          </div>
          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-600 tracking-tight">Node Cluster: Fuji-Avalanche</p>
        </div>
      </div>
    </aside>
  );
}
