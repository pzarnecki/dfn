import { ShieldAlert, Terminal, Play, ServerCrash } from 'lucide-react';
import { motion } from 'framer-motion';

interface DashboardProps {
  onStart: () => void;
  completedCount: number;
  totalTasks: number;
}

export default function Dashboard({ onStart, completedCount, totalTasks }: DashboardProps) {
  const allDone = completedCount === totalTasks;

  return (
    <div className="flex flex-col gap-6 w-full mx-auto mt-8 pb-10">
      <div className="border border-cyan-900/50 bg-cyan-950/20 p-8 rounded-lg relative overflow-hidden">
        
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold text-cyan-400 mb-2 uppercase tracking-widest font-mono">
            Raport Sytuacyjny
          </h2>
          <div className="h-1 w-24 bg-cyan-500 mb-6 shadow-[0_0_10px_rgba(6,182,212,0.8)]"></div>
          
          <p className="text-lg leading-relaxed text-slate-300 mb-6 relative z-10">
            Witajcie na pokładzie! Jesteście uczestnikami operacji <strong className="text-cyan-300">"Docker w Akcji: Buduj Aplikacje jak Profesjonaliści!"</strong>. 
            Przejdziecie od uruchomienia prostego serwera webowego, przez stworzenie generatora memów, aż po wdrożenie interaktywnej gry.
          </p>
          
          {/* PO CO TO NAM POTRZEBNE? */}
          <div className="bg-slate-900/80 border border-indigo-500/50 p-6 rounded-sm mb-8 relative z-10">
            <h3 className="text-indigo-400 font-bold uppercase mb-3 flex items-center gap-2">
              <ServerCrash size={20} />
              Po co nam w ogóle ten Docker?
            </h3>
            <div className="text-slate-300 text-sm space-y-3">
              <p>
                Wyobraź sobie, że napisałeś świetną grę. U Ciebie na komputerze działa idealnie. Wysyłasz ją koledze, a u niego wyskakuje błąd: <em>"Brakująca biblioteka"</em> albo <em>"Zła wersja programu"</em>. Klasyczne <strong>"U mnie działa!"</strong>.
              </p>
              <p>
                <strong>Docker rozwiązuje ten problem.</strong> Pakuje Twoją aplikację wraz z całym systemem, bibliotekami i ustawieniami do jednej "paczki" (kontenera). Taki kontener możesz wysłać komukolwiek, uruchomić na Windowsie, Macu czy serwerze w chmurze — i <strong>zawsze</strong> zadziała identycznie.
              </p>
              <p className="text-indigo-300 font-mono text-xs mt-2 p-2 bg-indigo-950/30 border border-indigo-900/50">
                To dlatego firmy takie jak Google, Netflix czy Spotify opierają na tym całą swoją infrastrukturę. Netflix uruchamia tysiące kontenerów w kilka sekund, gdy rośnie ruch (np. premiera nowego sezonu)!
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 relative z-10">
            <div className="bg-slate-900/50 border border-slate-700 p-4 rounded-sm flex items-start gap-3">
              <Terminal className="text-emerald-400 mt-1" />
              <div>
                <h3 className="text-emerald-400 font-bold uppercase text-sm mb-1">Środowisko (Windows)</h3>
                <p className="text-sm text-slate-400">Docker Desktop, PowerShell (lub CMD), Notatnik / VS Code, Przeglądarka</p>
              </div>
            </div>
            <div className="bg-slate-900/50 border border-slate-700 p-4 rounded-sm flex items-start gap-3">
              <ShieldAlert className="text-orange-400 mt-1" />
              <div>
                <h3 className="text-orange-400 font-bold uppercase text-sm mb-1">Cel Końcowy</h3>
                <p className="text-sm text-slate-400">Płynne uruchamianie, budowanie i łączenie kontenerów — jak profesjonalista.</p>
              </div>
            </div>
          </div>

          <button 
            onClick={onStart}
            className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-3 rounded-sm font-bold uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(6,182,212,0.5)] hover:shadow-[0_0_25px_rgba(6,182,212,0.8)] relative z-10"
          >
            <Play size={20} fill="currentColor" />
            {completedCount === 0 ? 'Rozpocznij Misję' : 'Wróć do Misji'}
          </button>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'STATUS SYSTEMU', value: allDone ? 'UKOŃCZONO!' : 'GOTOWY', color: allDone ? 'text-emerald-400' : 'text-emerald-500' },
          { label: 'CZAS MISJI', value: '90 MINUT', color: 'text-cyan-500' },
          { label: 'POSTĘP', value: `${completedCount} / ${totalTasks}`, color: allDone ? 'text-emerald-400' : 'text-cyan-500' }
        ].map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + (i * 0.1) }}
            className="border border-slate-800 bg-slate-900/30 p-4 text-center"
          >
            <div className="text-xs text-slate-500 font-mono mb-1">{stat.label}</div>
            <div className={`text-xl font-bold font-mono ${stat.color}`}>{stat.value}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
