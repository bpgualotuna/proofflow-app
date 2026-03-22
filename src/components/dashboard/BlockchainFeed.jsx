import { useState, useEffect } from 'react';
import DashboardCard from '../common/DashboardCard';

export default function BlockchainFeed() {
  const [events, setEvents] = useState([
    { id: 1, type: 'SYNC', msg: 'BLOQUE #0028 CONFIRMACIÓN FINALIZADA', time: '14:55:01' },
    { id: 2, type: 'TX', msg: 'CONTRATO 0XPF82... REGISTRADO OK', time: '14:50:32' },
    { id: 3, type: 'PEER', msg: '9 NODOS ACTIVOS EN AVALANCHE FUJI', time: '14:32:10' }
  ]);

  return (
    <DashboardCard title="Live Chain Feed" icon="🔗" className="flex-1">
      <div className="space-y-4">
        {events.map((ev) => (
          <div key={ev.id} className="flex gap-4 group transition-all">
            <div className="flex flex-col items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)] transition-all group-hover:scale-125"></div>
              <div className="flex-1 w-[1px] bg-slate-100 dark:bg-white/5"></div>
            </div>
            <div className="flex-1 pb-4">
              <div className="flex justify-between items-start mb-1">
                <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{ev.type}</span>
                <span className="text-[9px] font-bold text-slate-300 dark:text-slate-700 tabular-nums">{ev.time}</span>
              </div>
              <p className="text-[10px] font-black text-slate-700 dark:text-slate-300 leading-tight uppercase tracking-tight group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                {ev.msg}
              </p>
            </div>
          </div>
        ))}

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-emerald-500/5 border border-slate-100 dark:border-emerald-500/10 flex items-center justify-between transition-colors">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-xs">A</div>
            <div>
              <p className="text-[9px] font-black text-slate-900 dark:text-white uppercase tracking-widest">Avalanche Network</p>
              <p className="text-[8px] font-bold text-slate-400 dark:text-slate-600 uppercase">C-Chain Bridge v1.2</p>
            </div>
          </div>
          <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">Connected</span>
        </div>
      </div>
    </DashboardCard>
  );
}
