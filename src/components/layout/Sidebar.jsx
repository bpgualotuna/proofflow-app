import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import ShieldIcon from '@mui/icons-material/Shield';
import SettingsIcon from '@mui/icons-material/Settings';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const NAV_ITEMS = [
  {
    id: 'Dashboard',
    label: 'Dashboard',
    icon: DashboardIcon,
    description: 'Vista general',
  },
  {
    id: 'Analytics',
    label: 'Analytics',
    icon: BarChartIcon,
    description: 'Métricas y gráficos',
    badge: 'BETA',
  },
  {
    id: 'Auditoría',
    label: 'Auditoría',
    icon: ShieldIcon,
    description: 'Logs y cumplimiento',
  },
  {
    id: 'Settings',
    label: 'Settings',
    icon: SettingsIcon,
    description: 'Configuración del sistema',
  },
];

export default function Sidebar({ activeTab, onNavigate }) {
  return (
    <aside
      className="w-[300px] h-screen fixed left-0 top-0 flex flex-col z-20 transition-colors duration-300"
      style={{
        background: 'var(--bg-sidebar)',
        borderRight: '1px solid var(--border-strong)',
      }}
    >
      {/* ── BRANDING ─────────────────────────────────── */}
      <div
        className="flex flex-col items-center pt-10 pb-8 px-8"
        style={{ borderBottom: '1px solid var(--border-strong)' }}
      >
        <button
          onClick={() => onNavigate('Dashboard')}
          className="flex flex-col items-center gap-4 group focus:outline-none"
          aria-label="Ir al Dashboard"
        >
          {/* Logo */}
          <div className="relative h-20 w-20 flex items-center justify-center">
            <div className="absolute inset-0 rounded-2xl bg-cyan-500/15 blur-lg animate-pulse" />
            <img
              src="/logo.png"
              alt="ProofFlow"
              className="h-16 w-auto relative z-10 transition-transform duration-500 group-hover:scale-110 drop-shadow-xl"
            />
          </div>

          {/* Name & subtitle */}
          <div className="text-center">
            <h1
              className="text-2xl font-black tracking-tight leading-none mb-2"
              style={{
                background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              ProofFlow
            </h1>
            <div className="flex items-center justify-center gap-2">
              <FiberManualRecordIcon sx={{ fontSize: 7, color: '#06b6d4' }} className="animate-pulse" />
              <span
                className="text-[11px] font-black uppercase tracking-[0.35em]"
                style={{ color: '#06b6d4' }}
              >
                Fintech OS
              </span>
              <FiberManualRecordIcon sx={{ fontSize: 7, color: '#06b6d4' }} className="animate-pulse" />
            </div>
          </div>
        </button>
      </div>

      {/* ── NAVIGATION ───────────────────────────────── */}
      <nav
        className="flex-1 px-5 py-6 overflow-y-auto"
        role="navigation"
        aria-label="Menú principal"
      >
        <p
          className="text-[10px] font-black uppercase tracking-[0.3em] px-3 mb-4"
          style={{ color: 'var(--text-muted)' }}
        >
          Navegación
        </p>

        <ul className="space-y-2">
          {NAV_ITEMS.map(({ id, label, icon: Icon, description, badge }) => {
            const isActive = activeTab === id;
            return (
              <li key={id}>
                <button
                  onClick={() => onNavigate(id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`
                    w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl
                    text-left font-semibold relative
                    transition-all duration-200 group
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500
                  `}
                  style={{
                    background: isActive
                      ? 'linear-gradient(90deg, rgba(6,182,212,0.13) 0%, rgba(6,182,212,0.04) 100%)'
                      : 'transparent',
                    color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'var(--border-subtle)';
                      e.currentTarget.style.color = 'var(--text-primary)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = 'var(--text-secondary)';
                    }
                  }}
                >
                  {/* Active left-border glow */}
                  {isActive && (
                    <span
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-r-full"
                      style={{
                        background: 'var(--accent-primary)',
                        boxShadow: '0 0 12px rgba(6,182,212,0.8)',
                      }}
                    />
                  )}

                  {/* Icon box */}
                  <span
                    className="flex items-center justify-center w-10 h-10 rounded-xl flex-shrink-0 transition-all duration-200"
                    style={{
                      background: isActive
                        ? 'rgba(6,182,212,0.15)'
                        : 'var(--border-subtle)',
                    }}
                  >
                    <Icon
                      sx={{
                        fontSize: 20,
                        color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                        transition: 'color 0.2s',
                      }}
                    />
                  </span>

                  {/* Label + description */}
                  <span className="flex-1 min-w-0">
                    <span
                      className="block text-[14px] font-bold leading-tight mb-0.5"
                      style={{ color: isActive ? 'var(--accent-primary)' : 'var(--text-primary)' }}
                    >
                      {label}
                    </span>
                    <span
                      className="block text-[11px] font-medium truncate"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {description}
                    </span>
                  </span>

                  {/* Optional badge */}
                  {badge && (
                    <span
                      className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md flex-shrink-0"
                      style={{
                        background: 'rgba(59,130,246,0.14)',
                        color: '#3b82f6',
                      }}
                    >
                      {badge}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* ── USER STRIP ───────────────────────────────── */}
      <div className="px-5 pb-3">
        <div
          className="px-4 py-3 rounded-2xl flex items-center gap-3"
          style={{
            background: 'var(--border-subtle)',
            border: '1px solid var(--border-strong)',
          }}
        >
          {/* Avatar */}
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-[12px] font-black text-white"
            style={{
              background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
              boxShadow: '0 2px 10px rgba(6,182,212,0.35)',
            }}
          >
            PF
          </div>
          <div className="flex-1 min-w-0">
            <p
              className="text-[13px] font-bold truncate leading-tight mb-0.5"
              style={{ color: 'var(--text-primary)' }}
            >
              M. Administrador
            </p>
            <div className="flex items-center gap-1">
              <AdminPanelSettingsIcon sx={{ fontSize: 11, color: 'var(--accent-primary)' }} />
              <span
                className="text-[10px] font-bold"
                style={{ color: 'var(--accent-primary)' }}
              >
                Privilegios Root
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── SYSTEM STATUS ────────────────────────────── */}
      <div className="px-5 pb-6">
        <div
          className="rounded-2xl p-4"
          style={{
            background: 'var(--border-subtle)',
            border: '1px solid var(--border-strong)',
          }}
        >
          {/* Header row */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full animate-pulse flex-shrink-0"
                style={{ background: '#10b981', boxShadow: '0 0 8px rgba(16,185,129,0.7)' }}
              />
              <span
                className="text-[11px] font-black uppercase tracking-widest"
                style={{ color: 'var(--text-primary)' }}
              >
                System Active
              </span>
            </div>
            <span
              className="text-[9px] font-bold px-1.5 py-0.5 rounded-md"
              style={{
                background: 'rgba(16,185,129,0.15)',
                color: '#10b981',
              }}
            >
              v4.1.0
            </span>
          </div>

          {/* Network info */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold" style={{ color: 'var(--text-muted)' }}>
                Cluster
              </span>
              <span className="text-[11px] font-bold" style={{ color: 'var(--text-secondary)' }}>
                Fuji-Avalanche
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold" style={{ color: 'var(--text-muted)' }}>
                Latencia
              </span>
              <span className="text-[11px] font-bold" style={{ color: '#10b981' }}>
                12 ms
              </span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
