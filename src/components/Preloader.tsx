import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Shield } from 'lucide-react';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [showLogo, setShowLogo] = useState(false);

  const bootSequence = [
    { text: "INICJALIZACJA PROTOKOŁÓW WSB MERITO...", delay: 300 },
    { text: "ŁĄCZENIE Z KLASTREM DOCKER...", delay: 800 },
    { text: "WERYFIKACJA OBRAZÓW SYSTEMOWYCH...", delay: 1400 },
    { text: "MOUNTOWANIE WOLUMENÓW...", delay: 2000 },
    { text: "URUCHAMIANIE RDZENIA APLIKACJI...", delay: 2600 },
    { text: "SYSTEM GOTOWY.", delay: 3200 }
  ];

  useEffect(() => {
    // Logo appears after a short delay
    const logoTimer = setTimeout(() => setShowLogo(true), 200);

    // Logs typing
    bootSequence.forEach((log) => {
      setTimeout(() => {
        setLogs(prev => [...prev, log.text]);
      }, log.delay);
    });

    // Progress bar
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15 + 5);
      });
    }, 300);

    // Complete
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 4000);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(completeTimer);
      clearInterval(interval);
    };
  }, []);

  return (
    <motion.div 
      className="fixed inset-0 z-[100] bg-[#020408] flex flex-col items-center justify-center font-mono text-cyan-400 overflow-hidden"
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Scanline & Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,3px_100%] z-10 opacity-30"></div>
      <div className="absolute inset-0 z-20" style={{ background: 'radial-gradient(circle at center, transparent 0%, #020408 90%)' }}></div>

      <div className="relative z-30 flex flex-col items-center w-full max-w-2xl px-8">
        
        <AnimatePresence>
          {showLogo && (
            <motion.div 
              initial={{ opacity: 0, y: -20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="mb-12 flex flex-col items-center"
            >
              <div className="relative w-24 h-24 flex items-center justify-center border-2 border-cyan-500/50 rounded-lg bg-cyan-950/30 rotate-45 mb-8 shadow-[0_0_30px_rgba(6,182,212,0.2)]">
                <div className="-rotate-45 flex items-center justify-center text-cyan-300">
                  <Shield size={48} className="absolute opacity-20" />
                  <span className="text-4xl font-bold font-sans tracking-tighter drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">M</span>
                </div>
                {/* Scanning line across logo */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent w-full h-[200%] -top-1/2"
                  animate={{ y: ["-100%", "100%"] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                />
              </div>
              <h1 className="text-2xl md:text-3xl tracking-[0.3em] font-bold text-white text-center drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                WSB <span className="text-cyan-400">MERITO</span> LAB
              </h1>
              <p className="text-cyan-600 tracking-widest text-sm mt-3 animate-pulse">DOCKER COMMAND CENTER INIT</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="w-full h-40 flex flex-col-reverse justify-start overflow-hidden text-xs md:text-sm text-cyan-500/70 text-left mb-6 relative">
          <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-[#020408] to-transparent z-10"></div>
          {logs.map((log, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 py-1.5"
            >
              <Terminal size={14} className="text-cyan-600 shrink-0" />
              <span>{log}</span>
            </motion.div>
          )).reverse()}
        </div>

        <div className="w-full">
          <div className="flex justify-between text-[10px] md:text-xs mb-2 tracking-widest text-cyan-600">
            <span>ŁADOWANIE ZASOBÓW</span>
            <span>{Math.min(progress, 100)}%</span>
          </div>
          <div className="h-1.5 w-full bg-slate-900 border border-cyan-900/50 rounded overflow-hidden">
            <motion.div 
              className="h-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]"
              initial={{ width: "0%" }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ ease: "easeOut", duration: 0.2 }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
