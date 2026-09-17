import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Cpu, Book, Rocket, AlertTriangle } from 'lucide-react';
import Dashboard from './components/Dashboard';
import Missions from './components/Missions';
import Archives from './components/Archives';
import Troubleshooting from './components/Troubleshooting';

const TOTAL_TASKS = 18; // sum of all mission tasks

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [fxVariant, setFxVariant] = useState(1); // 1 = mocny, 2 = średni, 3 = słaby

  const changeTab = (tab: string) => {
    if (tab === activeTab) return;
    setActiveTab(tab);
    // Losujemy wariant: 33% szans na mocny, 33% na średni, 33% na lekki (subtelny)
    const rand = Math.random();
    if (rand < 0.33) setFxVariant(1);
    else if (rand < 0.66) setFxVariant(2);
    else setFxVariant(3);
  };

  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});

  const completedCount = useMemo(() => 
    Object.values(completedTasks).filter(Boolean).length,
    [completedTasks]
  );

  const progressPercent = Math.round((completedCount / TOTAL_TASKS) * 100);

  const toggleTask = (key: string) => {
    setCompletedTasks(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const getSupernovaGradient = (tab: string) => {
    switch(tab) {
      case 'missions': return 'radial-gradient(circle, rgba(16,255,150,0.8) 0%, rgba(16,185,129,0.3) 30%, transparent 70%)';
      case 'archives': return 'radial-gradient(circle, rgba(180,130,255,0.8) 0%, rgba(139,92,246,0.3) 30%, transparent 70%)';
      case 'sos': return 'radial-gradient(circle, rgba(255,100,100,0.8) 0%, rgba(239,68,68,0.3) 30%, transparent 70%)';
      default: return 'radial-gradient(circle, rgba(100,240,255,0.8) 0%, rgba(6,182,212,0.3) 30%, transparent 70%)';
    }
  };

  const getLaserColor = (tab: string) => {
    switch(tab) {
      case 'missions': return '#10b981';
      case 'archives': return '#8b5cf6';
      case 'sos': return '#ef4444';
      default: return '#06b6d4';
    }
  };

  return (
    <div className="h-screen w-screen bg-[#04060a] text-[#8e98b0] font-sans selection:bg-cyan-900 overflow-hidden flex flex-col relative">
      
      {/* ZOPTYMALIZOWANE TŁO SCI-FI (POTATO-PC FRIENDLY) */}
      
      {/* 1. Tło kosmosu - statyczne i bez kosztownego mix-blend-screen */}
      <div 
        className="fixed inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `url("${import.meta.env.BASE_URL}bg-space.jpg")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      ></div>
      
      {/* 2. Płynąca siatka taktyczna (tłumaczenie GPU, bez mask-image) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden opacity-30">
        <div 
          className="absolute w-[120vw] h-[120vh] -top-[10vh] -left-[10vw] bg-grid"
          style={{
             backgroundImage: `
               linear-gradient(to right, rgba(6, 182, 212, 0.15) 1px, transparent 1px),
               linear-gradient(to bottom, rgba(6, 182, 212, 0.15) 1px, transparent 1px)
             `,
             backgroundSize: '40px 40px',
             willChange: 'transform'
          }}
        ></div>
        
        {/* Zamiast zabójczego dla GPU mask-image, stosujemy nakładkę radial-gradient (tani trick optyczny) */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at center, transparent 0%, #04060a 80%)' }}></div>
      </div>

      {/* 3. Blask Reaktora - używa naturalnego wygaszania gradientu ZAMIAST masakrycznego filtra blur() */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 bg-reactor" 
        style={{ 
          background: 'radial-gradient(circle at center, rgba(8,145,178,0.12) 0%, transparent 60%)',
          willChange: 'opacity'
        }}
      ></div>

      {/* Top Header Navigation */}
      <header className="border-b border-cyan-900/50 bg-[#04060a]/95 p-4 shadow-[0_0_30px_rgba(8,145,178,0.15)] flex flex-col z-10 relative">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-950 to-indigo-950 border border-cyan-500/50 rounded flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.3)] relative overflow-hidden group">
              <div className="absolute inset-0 bg-cyan-400/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              <Rocket className="text-cyan-400 drop-shadow-[0_0_8px_#22d3ee] z-10" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-indigo-300 tracking-widest uppercase">
                Docker Command Center
              </h1>
              <p className="text-xs text-cyan-500/80 font-mono tracking-widest">DOCKER W AKCJI: INICJACJA</p>
            </div>
          </div>
          
          <nav className="flex gap-2">
            {[
              { id: 'dashboard', icon: <Cpu size={18} />, label: 'Odprawa' },
              { id: 'missions', icon: <Terminal size={18} />, label: 'Misje' },
              { id: 'archives', icon: <Book size={18} />, label: 'Archiwum' },
              { id: 'sos', icon: <AlertTriangle size={18} />, label: 'SOS' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => changeTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 font-mono text-sm uppercase tracking-wider transition-all duration-300 border-b-2 rounded-t-sm ${
                  activeTab === tab.id 
                    ? tab.id === 'sos'
                      ? 'border-red-400 text-red-200 bg-gradient-to-t from-red-900/40 to-transparent shadow-[inset_0_-20px_20px_-20px_rgba(248,113,113,0.5)]'
                      : 'border-cyan-400 text-cyan-200 bg-gradient-to-t from-cyan-900/40 to-transparent shadow-[inset_0_-20px_20px_-20px_rgba(6,182,212,0.5)]' 
                    : 'border-transparent text-slate-500 hover:text-cyan-400 hover:bg-slate-900/50'
                }`}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Progress Bar */}
        <div className="mt-3 flex items-center gap-3">
          <span className="text-xs font-mono text-slate-500 uppercase tracking-widest whitespace-nowrap">Postęp Misji:</span>
          <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden relative border border-slate-700">
            <motion.div
              className="h-full rounded-full relative"
              style={{
                background: progressPercent === 100
                  ? 'linear-gradient(90deg, #10b981, #34d399)'
                  : 'linear-gradient(90deg, #0e7490, #06b6d4, #22d3ee)'
              }}
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_30%,rgba(255,255,255,0.2)_50%,transparent_70%)] animate-[shimmer_2s_infinite]"></div>
            </motion.div>
          </div>
          <span className={`text-xs font-mono font-bold ${progressPercent === 100 ? 'text-emerald-400' : 'text-cyan-400'}`}>
            {completedCount}/{TOTAL_TASKS} ({progressPercent}%)
          </span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 relative p-6 w-full mx-auto z-10 flex flex-col items-center overflow-hidden min-h-0">
        
        {/* EFEKT SUPERNOWEJ (Błysk przy zmianie zakładki ze zmienną intensywnością) */}
        <AnimatePresence mode="wait">
          {fxVariant !== 3 && (
            <motion.div
              key={`supernova-${activeTab}`}
              initial={{ opacity: fxVariant === 1 ? 1 : 0.6, scale: 0.1, x: '-50%', y: '-50%' }}
              animate={{ opacity: 0, scale: fxVariant === 1 ? 4 : 2.5, x: '-50%', y: '-50%' }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute top-1/2 left-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] pointer-events-none z-50 rounded-full mix-blend-screen"
              style={{ background: getSupernovaGradient(activeTab) }}
            />
          )}
          <motion.div
            key={`laser-${activeTab}`}
            initial={{ opacity: fxVariant === 1 ? 1 : 0.7, scaleX: 0, scaleY: fxVariant === 1 ? 4 : 2, x: '-50%', y: '-50%' }}
            animate={{ opacity: 0, scaleX: fxVariant === 1 ? 2.5 : 1.5, scaleY: 0, x: '-50%', y: '-50%' }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute top-1/2 left-1/2 w-[100vw] h-[2px] pointer-events-none z-50 mix-blend-screen"
            style={{ 
              background: '#fff', 
              boxShadow: `0 0 40px ${fxVariant === 1 ? '6px' : '3px'} ${getLaserColor(activeTab)}, 0 0 15px 3px #fff` 
            }}
          />
        </AnimatePresence>

        <div className="w-full max-w-6xl flex-1 relative flex flex-col min-h-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex-1 overflow-y-auto custom-scrollbar pr-4 pb-10 w-full h-full min-h-0"
            >
              {activeTab === 'dashboard' && <Dashboard onStart={() => changeTab('missions')} completedCount={completedCount} totalTasks={TOTAL_TASKS} />}
              {activeTab === 'missions' && <Missions completedTasks={completedTasks} toggleTask={toggleTask} />}
              {activeTab === 'archives' && <Archives />}
              {activeTab === 'sos' && <Troubleshooting />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
      
      {/* Footer Bar */}
      <footer className="border-t border-cyan-900/30 bg-[#04060a]/95 p-3 text-center text-[10px] text-slate-500 font-mono flex justify-between px-8 z-10 relative">
        <div className="flex gap-4">
          <span><span className="text-cyan-700">HOST:</span> WSB_MERITO_LAB</span>
          <span><span className="text-cyan-700">KERNEL:</span> DOCKER_DESKTOP</span>
        </div>
        <div className="flex gap-4">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_5px_#10b981]"></span>
            SYSTEM ONLINE
          </span>
          <span><span className="text-cyan-700">ENCRYPTION:</span> ENABLED</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
