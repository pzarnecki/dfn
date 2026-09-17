import { motion } from 'framer-motion';
import { Database, Server, Laptop, ExternalLink, FileDown, Gamepad2 } from 'lucide-react';

export default function Archives() {
  return (
    <div className="w-full mx-auto mt-4 p-4 pb-10">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white uppercase tracking-widest font-mono mb-2">Archiwa Wiedzy</h2>
        <p className="text-slate-400">Teoria, materiały referencyjne i narzędzia niezbędne do ukończenia misji.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Docker vs VM */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border border-slate-700 bg-slate-900/50 p-6 rounded-sm relative"
        >
          <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-cyan-500"></div>
          <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-cyan-500"></div>
          
          <h3 className="text-cyan-400 font-bold uppercase mb-4 flex items-center gap-2">
            <Server size={18} />
            Docker vs Maszyna Wirtualna
          </h3>
          
          <div className="space-y-4 text-sm text-slate-300">
            <p><strong>Maszyna Wirtualna (VM)</strong> zawiera pełny system operacyjny (np. 20GB). Jest ciężka i uruchamia się minutami.</p>
            <p><strong>Docker (Kontener)</strong> współdzieli jądro systemu z hostem. Na Windowsie działa przez WSL2 (wbudowany Linux). Kontener zawiera tylko Twoją aplikację (np. 50MB) i startuje w ułamku sekundy.</p>
            <div className="mt-4 p-3 bg-cyan-950/30 border border-cyan-900/50 text-cyan-200">
              <strong className="block mb-1">Analogia: Mieszkanie vs Kontener morski</strong>
              VM to jak wynajmowanie całego mieszkania dla każdej aplikacji (z kuchnią, łazienką, meblami). Kontener Docker to jak wynajmowanie jednego pokoju w akademiku — korzystasz ze wspólnej kuchni (jądro systemu), ale Twój pokój (aplikacja) jest w pełni odizolowany.
            </div>
          </div>
        </motion.div>

        {/* Przydatne komendy */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="border border-slate-700 bg-slate-900/50 p-6 rounded-sm relative"
        >
          <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-emerald-500"></div>
          <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-emerald-500"></div>

          <h3 className="text-emerald-400 font-bold uppercase mb-4 flex items-center gap-2">
            <Database size={18} />
            Kluczowe Komendy (PowerShell)
          </h3>
          
          <ul className="space-y-2 font-mono text-xs">
            {[
              { cmd: 'docker run -d -p 80:80 [obraz]', desc: 'uruchom kontener w tle z mapowaniem portów' },
              { cmd: 'docker ps', desc: 'lista działających kontenerów' },
              { cmd: 'docker ps -a', desc: 'lista WSZYSTKICH kontenerów (też zatrzymanych)' },
              { cmd: 'docker stop [id]', desc: 'zatrzymaj kontener' },
              { cmd: 'docker rm -f [id]', desc: 'wymuś usunięcie kontenera' },
              { cmd: 'docker build -t [nazwa] .', desc: 'zbuduj obraz z Dockerfile' },
              { cmd: 'docker logs [id]', desc: 'pokaż logi kontenera (do debugowania!)' },
              { cmd: 'docker images', desc: 'lista pobranych/zbudowanych obrazów' },
              { cmd: 'docker network create [nazwa]', desc: 'stwórz wirtualną sieć' }
            ].map((item) => (
              <li key={item.cmd} className="p-2 bg-black/50 border border-slate-800 rounded flex flex-col sm:flex-row sm:items-center gap-1">
                <span className="text-emerald-500 flex-1">{item.cmd}</span>
                <span className="text-slate-500 text-[10px]">— {item.desc}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Ściągawka PDF */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="border border-indigo-700/50 bg-indigo-950/20 p-6 rounded-sm flex flex-col justify-between"
        >
          <div>
            <h3 className="text-indigo-400 font-bold uppercase mb-3 flex items-center gap-2">
              <FileDown size={18} />
              Ściągawka do Wydruku
            </h3>
            <p className="text-slate-400 text-sm mb-4">
              Wszystkie najważniejsze komendy Dockera na jednej stronie A4. Otwórz w przeglądarce, kliknij "Drukuj" i miej ją zawsze pod ręką!
            </p>
          </div>
          <a 
            href={`${import.meta.env.BASE_URL}cheatsheet.html`} 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center justify-center gap-2 bg-indigo-700/50 hover:bg-indigo-600 text-white px-6 py-3 rounded transition-colors font-mono text-sm uppercase tracking-widest shadow-[0_0_15px_rgba(99,102,241,0.3)]"
          >
            <FileDown size={16} /> Otwórz Ściągawkę
          </a>
        </motion.div>

        {/* Gra do Misji 4 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="border border-orange-700/50 bg-orange-950/20 p-6 rounded-sm flex flex-col justify-between"
        >
          <div>
            <h3 className="text-orange-400 font-bold uppercase mb-3 flex items-center gap-2">
              <Gamepad2 size={18} />
              Gra: Docker Space Defense
            </h3>
            <p className="text-slate-400 text-sm mb-4">
              To jest gra, którą konteneryzujesz w Misji 4 (Finałowa Batalia). Możesz ją podejrzeć tutaj, ale pamiętaj — w trakcie warsztatów musisz ją uruchomić samodzielnie w Dockerze!
            </p>
          </div>
          <a 
            href={`${import.meta.env.BASE_URL}game/index.html`} 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center justify-center gap-2 bg-orange-700/50 hover:bg-orange-600 text-white px-6 py-3 rounded transition-colors font-mono text-sm uppercase tracking-widest shadow-[0_0_15px_rgba(249,115,22,0.3)]"
          >
            <Gamepad2 size={16} /> Podgląd Gry
          </a>
        </motion.div>

        {/* Linki Zewnętrzne */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="col-span-1 lg:col-span-2 border border-slate-700 bg-slate-900/50 p-6 rounded-sm"
        >
          <h3 className="text-orange-400 font-bold uppercase mb-4 flex items-center gap-2">
            <Laptop size={18} />
            Materiały Zewnętrzne
          </h3>
          
          <div className="flex flex-wrap gap-4">
            <a href="https://docs.docker.com/get-started/" target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded text-sm transition-colors text-slate-300">
              <ExternalLink size={14} /> Docker: Oficjalny tutorial
            </a>
            <a href="https://hub.docker.com/" target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded text-sm transition-colors text-slate-300">
              <ExternalLink size={14} /> Docker Hub (Katalog Obrazów)
            </a>
            <a href="https://docs.docker.com/desktop/install/windows-install/" target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded text-sm transition-colors text-slate-300">
              <ExternalLink size={14} /> Instalacja Docker Desktop (Windows)
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
