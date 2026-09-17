import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, MonitorPlay, Box, Layers, ShieldCheck, Zap, ServerCrash, TerminalSquare, Maximize2, X, Database, Globe } from 'lucide-react';

const slides = [
  {
    id: 'intro',
    title: 'DOCKER COMMAND CENTER',
    subtitle: 'Wprowadzenie do Konteneryzacji',
    icon: <MonitorPlay className="w-16 h-16 text-cyan-400 mb-4 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]" />,
    content: (
      <div className="space-y-4 text-slate-300 text-lg">
        <p>Witaj w interaktywnym module szkoleniowym.</p>
        <p>Ta prezentacja przygotuje Cię do dzisiejszej misji. Dowiesz się, czym jest Docker, jak działa i dlaczego zrewolucjonizował świat IT.</p>
        <p className="text-cyan-400 font-mono text-sm mt-8 border border-cyan-900/50 p-4 bg-cyan-950/20 rounded shadow-[inset_0_0_10px_rgba(6,182,212,0.2)]">
          Naciśnij strzałkę w prawo (na ekranie lub klawiaturze), aby rozpocząć transmisję danych.
        </p>
      </div>
    )
  },
  {
    id: 'what-is-docker',
    title: 'CZYM JEST DOCKER?',
    subtitle: 'Koniec z wymówką "U mnie działa!"',
    icon: <Box className="w-16 h-16 text-indigo-400 mb-4 drop-shadow-[0_0_15px_rgba(129,140,248,0.8)]" />,
    content: (
      <div className="space-y-4 text-slate-300 text-lg">
        <p>Docker to platforma, która pozwala spakować aplikację wraz ze wszystkimi jej zależnościami (bibliotekami, konfiguracją) do jednego, standaryzowanego pudełka — <strong>Kontenera</strong>.</p>
        <div className="bg-slate-900/80 p-4 border-l-4 border-indigo-500 my-4 shadow-[inset_0_0_10px_rgba(99,102,241,0.2)]">
          <p className="italic text-indigo-200">Gwarantuje to, że oprogramowanie będzie działać tak samo na Twoim laptopie, na serwerze testowym i w potężnej chmurze obliczeniowej.</p>
        </div>
      </div>
    )
  },
  {
    id: 'examples-real-world',
    title: 'DOCKER W PRAKTYCE',
    subtitle: 'Kto na tym zyskuje?',
    icon: <ServerCrash className="w-16 h-16 text-cyan-400 mb-4 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]" />,
    content: (
      <div className="space-y-4 text-slate-300 text-lg">
        <h4 className="text-cyan-400 font-bold uppercase mb-2">Prawdziwe przykłady użycia:</h4>
        <ul className="space-y-4 text-sm md:text-base">
          <li className="bg-slate-900/60 p-4 rounded border border-red-900/50 relative overflow-hidden group">
            <div className="absolute inset-0 bg-red-900/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <strong className="text-red-400 text-lg block mb-1">Netflix</strong> Posiada setki mikroserwisów (jeden od rekomendacji, inny od bilingu, inny od strumieniowania). Kiedy w piątek wieczorem rośnie ruch, automatycznie "odpalają" tysiące kontenerów Dockera, aby sprostać obciążeniu, a w nocy je gaszą. Kontenery startują w sekundy!
          </li>
          <li className="bg-slate-900/60 p-4 rounded border border-green-900/50 relative overflow-hidden group">
            <div className="absolute inset-0 bg-green-900/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <strong className="text-green-400 text-lg block mb-1">Spotify</strong> Wykorzystuje kontenery, aby programiści mogli testować nowe funkcje na swoich komputerach dokładnie w takim samym środowisku, jakie działa na serwerach milionów użytkowników. Znika problem różnic w systemach operacyjnych!
          </li>
        </ul>
      </div>
    )
  },
  {
    id: 'vm-vs-containers',
    title: 'KONTENERY VS VM',
    subtitle: 'Dlaczego kontenery wygrywają?',
    icon: <Layers className="w-16 h-16 text-emerald-400 mb-4 drop-shadow-[0_0_15px_rgba(16,185,129,0.8)]" />,
    content: (
      <div className="space-y-4 text-slate-300 text-lg">
        <p>Tradycyjne maszyny wirtualne (VM) emulują cały sprzęt i wymagają instalacji <strong>pełnego systemu operacyjnego</strong>. Są ciężkie i wolne.</p>
        <p>Kontenery Docker współdzielą rdzeń (kernel) systemu gospodarza. Są niezwykle lekkie, uruchamiają się w ułamku sekundy i zużywają ułamek zasobów RAM i CPU.</p>
        <div className="grid grid-cols-2 gap-4 mt-6 font-mono text-sm relative">
          <div className="border border-slate-700 bg-slate-900/50 p-4 rounded text-slate-300 flex flex-col items-center text-center">
            <span className="block font-bold mb-2 text-slate-400 text-lg">WIRTUALNA MASZYNA</span>
            <span className="text-xs">[Aplikacja A]</span>
            <span className="text-xs mb-1">[Biblioteki (1 GB)]</span>
            <span className="text-xs bg-slate-800 w-full rounded py-1 border border-slate-600">[Pełny OS Windows/Linux (20 GB)]</span>
            <span className="mt-2 text-slate-500 font-bold">Start: Minuty</span>
          </div>
          <div className="border border-cyan-500/50 bg-cyan-950/20 p-4 rounded text-cyan-200 flex flex-col items-center justify-between text-center shadow-[0_0_15px_rgba(6,182,212,0.15)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="w-full">
              <span className="block font-bold mb-2 text-cyan-400 text-lg">KONTENER DOCKER</span>
              <span className="text-xs block">[Aplikacja A]</span>
              <span className="text-xs mb-1 block">[Tylko potrzebne Biblioteki (50 MB)]</span>
            </div>
            <span className="text-xs bg-cyan-900/50 text-cyan-400 font-bold w-full rounded py-1 border border-cyan-500/30">Współdzieli system gospodarza</span>
            <span className="mt-2 text-cyan-400 font-bold">Start: Sekundy</span>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'images-containers',
    title: 'OBRAZY I KONTENERY',
    subtitle: 'Przepis i Ciasto',
    icon: <Zap className="w-16 h-16 text-yellow-400 mb-4 drop-shadow-[0_0_15px_rgba(250,204,21,0.8)]" />,
    content: (
      <div className="space-y-4 text-slate-300 text-lg">
        <ul className="space-y-6">
          <li className="flex gap-4 items-start bg-slate-900/50 p-4 rounded border border-slate-700/50">
            <div className="bg-yellow-950/50 p-2 rounded border border-yellow-700/50 min-w-max shadow-[0_0_10px_rgba(250,204,21,0.2)]">
              <span className="font-bold text-yellow-400 uppercase font-mono">Obraz (Image)</span>
            </div>
            <p className="text-sm md:text-base">To niezmienny szablon, "przepis" z instrukcjami jak stworzyć kontener. Pobieramy je z Docker Hub (np. obraz Ubuntu, Nginx, Node.js).</p>
          </li>
          <li className="flex gap-4 items-start bg-slate-900/50 p-4 rounded border border-slate-700/50">
            <div className="bg-cyan-950/50 p-2 rounded border border-cyan-700/50 min-w-max shadow-[0_0_10px_rgba(34,211,238,0.2)]">
              <span className="font-bold text-cyan-400 uppercase font-mono">Kontener</span>
            </div>
            <p className="text-sm md:text-base">To uruchomiona, żywa instancja obrazu. To samo środowisko "upieczone" z przepisu. Możesz mieć setki kontenerów z jednego obrazu.</p>
          </li>
        </ul>
      </div>
    )
  },
  {
    id: 'tutorials',
    title: 'TUTORIALE DO MISJI',
    subtitle: 'Co będziemy robić?',
    icon: <TerminalSquare className="w-16 h-16 text-orange-400 mb-4 drop-shadow-[0_0_15px_rgba(251,146,60,0.8)]" />,
    content: (
      <div className="space-y-4 text-slate-300 text-sm md:text-base">
        <p>Gdy przejdziesz do zakładki <strong>MISJE</strong>, każde zadanie posiada ukryty przycisk <strong>"ODPRAWA + KOD"</strong>. Pokaże Ci on dokładny tutorial, komendy i kody źródłowe! Oto przedsmak tego, co Cię czeka:</p>
        <div className="space-y-4">
          <div className="bg-slate-900/60 p-4 border-l-4 border-orange-500 rounded transition-all hover:bg-slate-800/80">
            <strong className="text-orange-400 text-lg">Misja 1: Hello Web</strong> <br/>
            Uruchomimy prawdziwy serwer WWW (Nginx) wpisując zaledwie jedną komendę: <code className="text-cyan-300">docker run -d -p 8080:80 nginx</code>. Zero instalacji, sam czysty kod!
          </div>
          <div className="bg-slate-900/60 p-4 border-l-4 border-orange-500 rounded transition-all hover:bg-slate-800/80">
            <strong className="text-orange-400 text-lg">Misja 2: Dockerfile</strong> <br/>
            Stworzysz własny obraz na podstawie pliku <code>Dockerfile</code>. Zapakujemy Twój własny generator memów w kontener!
          </div>
          <div className="bg-slate-900/60 p-4 border-l-4 border-orange-500 rounded transition-all hover:bg-slate-800/80">
            <strong className="text-orange-400 text-lg">Misja 3: Sieci i Baza Danych</strong> <br/>
            Połączymy dwa kontenery (Apkę w Pythonie i bazę Redis) prywatną siecią. Nauczymy się o wbudowanym systemie DNS w Dockerze.
          </div>
        </div>
        <p className="text-xs text-orange-300/80 mt-4 font-mono uppercase bg-orange-900/20 p-2 text-center rounded border border-orange-500/30 shadow-[0_0_10px_rgba(249,115,22,0.1)]">Pamiętaj, by korzystać z odpraw ("Odprawa + Kod") na każdej misji!</p>
      </div>
    )
  },
  {
    id: 'ready',
    title: 'JESTEŚ GOTOWY',
    subtitle: 'Zakończenie transmisji',
    icon: <ShieldCheck className="w-20 h-20 text-cyan-400 mb-4 drop-shadow-[0_0_20px_rgba(34,211,238,1)]" />,
    content: (
      <div className="space-y-6 text-center text-slate-300 text-lg mt-4">
        <p>Teoria opanowana. Czas przejść do praktyki i ubrudzić ręce kodem.</p>
        <p>Przejdź do zakładki <strong className="text-cyan-400">MISJE</strong> i postępuj zgodnie z instrukcjami taktycznymi.</p>
        <div className="animate-pulse text-cyan-300 font-mono mt-8 border border-cyan-500/50 bg-cyan-900/20 inline-block p-4 rounded-md shadow-[0_0_15px_rgba(6,182,212,0.4)]">
          SYSTEM GOTOWY DO PRZYJĘCIA KOMEND
        </div>
      </div>
    )
  }
];

export default function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [visualModal, setVisualModal] = useState<string | null>(null);
  const [ambientFlicker, setAmbientFlicker] = useState(1);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (visualModal) {
        if (e.key === 'Escape') setVisualModal(null);
        return;
      }
      
      if (e.key === 'ArrowRight') {
        setCurrentSlide(prev => {
          if (prev < slides.length - 1) {
            setDirection(1);
            return prev + 1;
          }
          return prev;
        });
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlide(prev => {
          if (prev > 0) {
            setDirection(-1);
            return prev - 1;
          }
          return prev;
        });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [visualModal, slides.length]);

  // Subtle ambient flicker (Starcraft style "alive" background)
  useEffect(() => {
    const flickerInterval = setInterval(() => {
      if (Math.random() > 0.8) {
        setAmbientFlicker(0.85); // slight dim
        setTimeout(() => setAmbientFlicker(1), 100); // restore
        
        if (Math.random() > 0.6) {
          setTimeout(() => {
            setAmbientFlicker(0.9);
            setTimeout(() => setAmbientFlicker(1), 50);
          }, 200);
        }
      }
    }, 2000);
    return () => clearInterval(flickerInterval);
  }, []);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setDirection(1);
      setCurrentSlide(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide(prev => prev - 1);
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 800 : -800,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 45 : -45,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 800 : -800,
      opacity: 0,
      scale: 0.8,
      rotateY: direction < 0 ? 45 : -45,
    })
  };

  return (
    <div className="flex flex-col h-full w-full max-w-6xl mx-auto pt-4 pb-10">
      
      {/* Deck Container */}
      <div 
        className="relative flex-1 bg-[#050b14] border border-cyan-900/50 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.15)] flex items-center justify-center perspective-[2000px] transition-opacity duration-75"
        style={{ opacity: ambientFlicker }}
      >
        
        {/* Animated Background Grid (Starcraft vibes) */}
        <div 
          className="absolute inset-0 z-0 opacity-20 pointer-events-none mix-blend-screen"
          style={{
            backgroundImage: `linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)`,
            backgroundSize: '30px 30px',
            animation: 'pan-bg 20s linear infinite'
          }}
        />
        <style>{`
          @keyframes pan-bg {
            from { background-position: 0 0; }
            to { background-position: -60px -60px; }
          }
        `}</style>
        
        {/* Scanline effect */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_4px,3px_100%] z-50 opacity-30"></div>

        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
              scale: { duration: 0.4 },
              rotateY: { duration: 0.5 }
            }}
            className="absolute w-full h-full flex flex-col items-center justify-center p-4 md:p-12 text-center"
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex flex-col items-center shrink-0 mb-6"
            >
              {slides[currentSlide].icon}
              <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-indigo-300 tracking-widest uppercase mb-2">
                {slides[currentSlide].title}
              </h2>
              <div className="text-lg md:text-xl text-cyan-500/80 font-mono tracking-widest flex items-center justify-center gap-4 flex-wrap">
                {slides[currentSlide].subtitle}
                
                {/* Visualizer button for slides that have complex concepts */}
                {['what-is-docker', 'vm-vs-containers', 'examples-real-world', 'images-containers'].includes(slides[currentSlide].id) && (
                  <button
                    onClick={() => setVisualModal(slides[currentSlide].id)}
                    className="flex items-center gap-1.5 px-3 py-1 bg-cyan-900/50 hover:bg-cyan-600/80 border border-cyan-500/50 rounded-sm text-xs font-bold text-cyan-100 transition-all shadow-[0_0_10px_rgba(6,182,212,0.3)] hover:shadow-[0_0_20px_rgba(6,182,212,0.6)]"
                  >
                    <Maximize2 size={14} /> 
                    WIĘCEJ
                  </button>
                )}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="w-full max-w-4xl text-left bg-slate-950/80 p-6 md:p-8 rounded-xl border border-cyan-900/30 shadow-[0_0_30px_rgba(0,0,0,0.8),inset_0_0_15px_rgba(6,182,212,0.1)] backdrop-blur-md relative overflow-hidden flex flex-col"
              style={{ maxHeight: 'calc(100vh - 280px)' }}
            >
              {/* Subtle ambient light inside content box */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent shrink-0 z-20"></div>
              
              {/* Scrollable content area with custom scrollbar */}
              <div className="relative z-10 overflow-y-auto custom-scrollbar flex-1 pr-2 pb-6 w-full">
                {slides[currentSlide].content}
              </div>
              
              {/* Fade out mask at the bottom to indicate scrolling */}
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-slate-950 to-transparent z-20 pointer-events-none rounded-b-xl"></div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Controls */}
        <button 
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 p-3 md:p-4 text-cyan-500 hover:text-cyan-300 disabled:opacity-0 transition-all duration-300 z-40 bg-slate-900/80 rounded-full border border-cyan-900/80 hover:bg-slate-800 hover:scale-110 hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] backdrop-blur-sm"
        >
          <ChevronLeft size={32} />
        </button>
        
        <button 
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 p-3 md:p-4 text-cyan-500 hover:text-cyan-300 disabled:opacity-0 transition-all duration-300 z-40 bg-slate-900/80 rounded-full border border-cyan-900/80 hover:bg-slate-800 hover:scale-110 hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] backdrop-blur-sm"
        >
          <ChevronRight size={32} />
        </button>
        
        {/* Visualization Modal Overlay */}
        <AnimatePresence>
          {visualModal && (
            <motion.div
              initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
              animate={{ opacity: 1, backdropFilter: 'blur(8px)' }}
              exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
              className="absolute inset-0 z-[100] bg-black/80 flex items-center justify-center p-4 md:p-8"
              onClick={() => setVisualModal(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: -20 }}
                transition={{ type: "spring", damping: 25 }}
                className="bg-[#050b14] border border-cyan-500/50 p-6 rounded-xl shadow-[0_0_50px_rgba(6,182,212,0.3)] max-w-5xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar relative"
                onClick={e => e.stopPropagation()}
              >
                <div className="sticky top-0 bg-[#050b14]/90 backdrop-blur-md z-50 pt-2 pb-4 mb-6 border-b border-slate-700 flex justify-between items-center">
                  <h3 className="text-xl md:text-2xl font-bold text-cyan-400 font-mono tracking-widest uppercase">
                    {visualModal === 'vm-vs-containers' && 'Architektura Systemu'}
                    {visualModal === 'what-is-docker' && 'Konteneryzacja vs Wirtualizacja'}
                    {visualModal === 'examples-real-world' && 'Jak działa infrastruktura w chmurze'}
                    {visualModal === 'images-containers' && 'Skąd brać obrazy? (Docker Hub)'}
                  </h3>
                  <button onClick={() => setVisualModal(null)} className="text-slate-400 hover:text-red-400 transition-colors bg-slate-900 p-2 rounded-full border border-slate-700 hover:border-red-500">
                    <X size={24} />
                  </button>
                </div>
                
                {/* Visualizer content based on ID */}
                
                {visualModal === 'what-is-docker' && (
                  <div className="text-center font-mono">
                    <div className="bg-red-950/40 border border-red-500/50 p-4 rounded text-red-200 mb-8 max-w-2xl mx-auto flex items-center justify-center gap-3">
                      <Zap size={24} className="text-red-400" />
                      <p className="font-bold">ZROZUM RÓŻNICĘ: Docker to KONTENERYZACJA, nie wirtualizacja!</p>
                    </div>
                    
                    <p className="text-slate-300 mb-8 max-w-2xl mx-auto text-lg">
                      Konteneryzacja (Docker) dzieli ten sam system operacyjny hosta. Wirtualizacja (VirtualBox, VMware) dzieli sam fizyczny sprzęt i tworzy osobne systemy operacyjne dla każdej apki. Pomyśl o kontenerze jak o szczelnym akwarium dla Twojej aplikacji z własnymi ścianami, ale wciąż stojącym na tym samym regale.
                    </p>
                    <div className="inline-block relative">
                      <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full animate-pulse"></div>
                      <div className="border-2 border-cyan-400 bg-cyan-950/50 p-8 rounded-xl relative z-10 w-full max-w-lg mx-auto flex flex-col items-center shadow-[inset_0_0_30px_rgba(6,182,212,0.2)]">
                        <div className="bg-indigo-600 border border-indigo-400 text-white font-bold py-4 w-full text-center rounded shadow-[0_0_15px_rgba(79,70,229,0.5)] mb-4 text-xl tracking-widest">
                          TWOJA APLIKACJA
                        </div>
                        <div className="grid grid-cols-2 gap-4 w-full">
                          <div className="bg-slate-800 border border-slate-600 text-slate-300 p-3 text-center rounded text-sm">Node.js / Python</div>
                          <div className="bg-slate-800 border border-slate-600 text-slate-300 p-3 text-center rounded text-sm">Zmienne Środowiska</div>
                          <div className="bg-slate-800 border border-slate-600 text-slate-300 p-3 text-center rounded text-sm col-span-2">Pliki konfiguracyjne</div>
                        </div>
                        
                        <div className="absolute -bottom-4 bg-cyan-400 text-black font-bold px-4 py-1 rounded-full text-sm shadow-[0_0_10px_#22d3ee]">
                          KONTENER
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {visualModal === 'examples-real-world' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-mono">
                    <div className="bg-slate-900/50 border border-slate-700 p-6 rounded-xl flex flex-col">
                      <h4 className="text-red-500 text-xl font-bold mb-4 flex items-center gap-2"><MonitorPlay /> NETFLIX SCALING</h4>
                      <p className="text-sm text-slate-300 mb-6 flex-1">
                        Gdy Netflix wypuszcza nowy sezon "Stranger Things", nagle miliony osób na raz chcą go oglądać. Zwykły serwer by padł. 
                        Dzięki Dockerowi, system Netflixa (Orkiestrator np. Kubernetes) mówi: "Odpalić 50 000 kontenerów z aplikacją wideo w ciągu 3 sekund!".
                      </p>
                      <div className="relative h-48 border border-red-900/30 rounded bg-black/50 overflow-hidden flex items-end justify-center p-2 gap-1">
                        {/* CSS animated bars representing containers scaling up */}
                        {[...Array(12)].map((_, i) => (
                          <motion.div 
                            key={i}
                            className="bg-red-600 w-full rounded-t shadow-[0_0_10px_rgba(220,38,38,0.5)]"
                            initial={{ height: "10%" }}
                            animate={{ height: `${Math.random() * 60 + 20}%` }}
                            transition={{ repeat: Infinity, repeatType: "mirror", duration: 1 + Math.random() }}
                          />
                        ))}
                      </div>
                      <div className="text-center mt-2 text-red-400 text-xs font-bold">Dynamiczne Tworzenie Kontenerów</div>
                    </div>
                    
                    <div className="bg-slate-900/50 border border-slate-700 p-6 rounded-xl flex flex-col">
                      <h4 className="text-green-500 text-xl font-bold mb-4 flex items-center gap-2"><ShieldCheck /> SPOTIFY DEPLOYMENT</h4>
                      <p className="text-sm text-slate-300 mb-6 flex-1">
                        Muzyka nie może przestać grać. Programiści Spotify testują swój kod w kontenerze na swoim MacBooku. Kiedy kod jest gotowy, wysyłają dokładnie ten sam, zamknięty "obraz" na serwery. Zero zaskoczeń.
                      </p>
                      
                      <div className="grid grid-cols-3 gap-2 h-48 items-center text-center text-xs">
                        <div className="bg-slate-800 p-2 rounded border border-slate-600 flex flex-col items-center justify-center h-24">
                          <span className="mb-2 text-slate-400">MacBook</span>
                          <div className="w-8 h-8 bg-green-500 rounded-sm"></div>
                        </div>
                        <div className="flex justify-center text-cyan-400 font-bold">
                          ➔ ➔ ➔
                        </div>
                        <div className="bg-slate-800 p-2 rounded border border-slate-600 flex flex-col items-center justify-center h-24 relative group">
                          <span className="mb-2 text-slate-400">Serwer Linux</span>
                          <div className="w-8 h-8 bg-green-500 rounded-sm drop-shadow-[0_0_15px_rgba(34,197,94,0.8)]"></div>
                        </div>
                      </div>
                      <div className="text-center mt-2 text-green-400 text-xs font-bold">Gwarancja 1:1 identycznego środowiska</div>
                    </div>
                  </div>
                )}
                
                {visualModal === 'images-containers' && (
                  <div className="font-mono">
                    <p className="text-slate-300 mb-8 max-w-3xl mx-auto text-center text-lg">
                      Skąd biorą się obrazy? Masz dwie główne opcje: pobrać gotowe z oficjalnego rejestru lub napisać własny przepis budowania.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Docker Hub section */}
                      <div className="bg-blue-950/20 border border-blue-900 p-6 rounded-xl relative">
                        <h4 className="text-blue-400 text-xl font-bold mb-4 flex items-center gap-2 justify-center border-b border-blue-900/50 pb-2">
                          <Globe /> DOCKER HUB (Gotowce)
                        </h4>
                        <p className="text-slate-300 text-sm mb-6 text-center">
                          Publiczny rejestr obrazów (jak App Store). Firmy umieszczają tam oficjalne, przetestowane wersje programów.
                        </p>
                        
                        <div className="space-y-3 relative z-10">
                          <div className="flex items-center gap-3 bg-slate-900 border border-slate-700 p-3 rounded text-sm hover:border-blue-500 transition-colors">
                            <Database className="text-purple-400" />
                            <div><strong className="text-purple-300">Bazy Danych:</strong> Postgres, MySQL, Redis</div>
                          </div>
                          <div className="flex items-center gap-3 bg-slate-900 border border-slate-700 p-3 rounded text-sm hover:border-blue-500 transition-colors">
                            <ServerCrash className="text-green-400" />
                            <div><strong className="text-green-300">Serwery:</strong> Nginx, Apache, Tomcat</div>
                          </div>
                          <div className="flex items-center gap-3 bg-slate-900 border border-slate-700 p-3 rounded text-sm hover:border-blue-500 transition-colors">
                            <TerminalSquare className="text-yellow-400" />
                            <div><strong className="text-yellow-300">Języki:</strong> Python, Node.js (wersje LTS)</div>
                          </div>
                        </div>
                        <div className="mt-4 p-2 bg-black/80 rounded border border-blue-900 text-center text-cyan-400 font-bold text-xs relative z-10 shadow-[0_0_10px_rgba(59,130,246,0.2)]">
                          komenda: docker pull [nazwa]
                        </div>
                      </div>
                      
                      {/* Custom Dockerfile section */}
                      <div className="bg-orange-950/20 border border-orange-900 p-6 rounded-xl relative">
                        <h4 className="text-orange-400 text-xl font-bold mb-4 flex items-center gap-2 justify-center border-b border-orange-900/50 pb-2">
                          <TerminalSquare /> DOCKERFILE (Twój kod)
                        </h4>
                        <p className="text-slate-300 text-sm mb-6 text-center">
                          Jesteś programistą i stworzyłeś aplikację? Piszesz plik tekstowy <code>Dockerfile</code>, który uczy Dockera jak zbudować Twój własny obraz od zera.
                        </p>
                        
                        <div className="bg-slate-950 border border-slate-700 rounded overflow-hidden relative z-10">
                          <div className="bg-slate-800 px-3 py-1 text-xs text-slate-400 border-b border-slate-700 flex justify-between">
                            <span>Dockerfile</span>
                            <span className="text-orange-500/50">Własny przepis</span>
                          </div>
                          <pre className="p-4 text-xs text-slate-300 font-mono leading-relaxed overflow-x-auto">
<span className="text-purple-400">FROM</span> node:18-alpine <span className="text-slate-500"># Baza z Docker Hub</span>
<span className="text-purple-400">WORKDIR</span> /app      <span className="text-slate-500"># Tworzy folder</span>
<span className="text-purple-400">COPY</span> . .          <span className="text-slate-500"># Kopiuje Twoje pliki z kodem</span>
<span className="text-purple-400">RUN</span> npm install   <span className="text-slate-500"># Instaluje zależności</span>
<span className="text-purple-400">CMD</span> ["npm", "start"] <span className="text-slate-500"># Komenda uruchomienia</span>
                          </pre>
                        </div>
                        <div className="mt-4 p-2 bg-black/80 rounded border border-orange-900 text-center text-orange-400 font-bold text-xs relative z-10 shadow-[0_0_10px_rgba(249,115,22,0.2)]">
                          komenda: docker build -t [moja_nazwa] .
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {visualModal === 'vm-vs-containers' && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-center font-mono">
                    <div className="space-y-2">
                      <h4 className="text-slate-400 mb-4 font-bold border-b border-slate-700 pb-2">MASZYNA WIRTUALNA</h4>
                      <div className="flex gap-2 justify-center">
                        <div className="bg-blue-900/50 border border-blue-500/50 p-3 rounded w-1/2">App A</div>
                        <div className="bg-purple-900/50 border border-purple-500/50 p-3 rounded w-1/2">App B</div>
                      </div>
                      <div className="flex gap-2 justify-center">
                        <div className="bg-blue-950 border border-blue-700/50 p-2 rounded w-1/2 text-xs">Bins/Libs</div>
                        <div className="bg-purple-950 border border-purple-700/50 p-2 rounded w-1/2 text-xs">Bins/Libs</div>
                      </div>
                      <div className="flex gap-2 justify-center">
                        <div className="bg-slate-800 border border-slate-600 p-4 rounded w-1/2 text-xs h-16 flex items-center justify-center">Guest OS</div>
                        <div className="bg-slate-800 border border-slate-600 p-4 rounded w-1/2 text-xs h-16 flex items-center justify-center">Guest OS</div>
                      </div>
                      <div className="bg-slate-700 border border-slate-500 p-3 rounded w-full mt-2">Hypervisor</div>
                      <div className="bg-slate-900 border border-slate-600 p-3 rounded w-full">Host Operating System</div>
                      <div className="bg-slate-950 border border-slate-800 p-3 rounded w-full text-sm">Infrastructure (Hardware)</div>
                    </div>
                    
                    <div className="space-y-2 relative">
                      <div className="absolute inset-0 bg-cyan-900/10 pointer-events-none rounded-xl blur-xl"></div>
                      <h4 className="text-cyan-400 mb-4 font-bold border-b border-cyan-900 pb-2">DOCKER</h4>
                      <div className="flex gap-2 justify-center">
                        <div className="bg-blue-900/80 border border-blue-400 p-3 rounded w-1/2 text-white shadow-[0_0_10px_rgba(59,130,246,0.3)]">App A</div>
                        <div className="bg-purple-900/80 border border-purple-400 p-3 rounded w-1/2 text-white shadow-[0_0_10px_rgba(168,85,247,0.3)]">App B</div>
                      </div>
                      <div className="flex gap-2 justify-center mb-6">
                        <div className="bg-blue-950/80 border border-blue-500/30 p-2 rounded w-1/2 text-xs text-blue-200">Bins/Libs</div>
                        <div className="bg-purple-950/80 border border-purple-500/30 p-2 rounded w-1/2 text-xs text-purple-200">Bins/Libs</div>
                      </div>
                      {/* Empty space where Guest OS used to be to show how much smaller it is */}
                      <div className="h-16 flex items-center justify-center">
                        <span className="text-emerald-400 font-bold animate-pulse text-sm">← Brak ciężkiego Guest OS! →</span>
                      </div>
                      
                      <div className="bg-cyan-900 border border-cyan-400 p-3 rounded w-full mt-2 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]">Docker Engine</div>
                      <div className="bg-slate-900 border border-slate-600 p-3 rounded w-full">Host Operating System</div>
                      <div className="bg-slate-950 border border-slate-800 p-3 rounded w-full text-sm">Infrastructure (Hardware)</div>
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Progress Indicator */}
      <div className="flex justify-center items-center gap-4 mt-8">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              if (idx !== currentSlide) {
                setDirection(idx > currentSlide ? 1 : -1);
                setCurrentSlide(idx);
              }
            }}
            className={`transition-all duration-500 relative group flex items-center justify-center ${
              idx === currentSlide 
                ? 'w-10 h-3' 
                : 'w-3 h-3'
            }`}
          >
            <div className={`absolute rounded-full transition-all duration-500 ${
              idx === currentSlide
                ? 'bg-cyan-400 inset-0 shadow-[0_0_12px_#22d3ee]'
                : 'bg-slate-700 inset-0 group-hover:bg-cyan-700'
            }`} />
          </button>
        ))}
      </div>
      
      <div className="text-center mt-4 text-xs font-mono text-slate-500 tracking-widest">
        SLAJD {currentSlide + 1} Z {slides.length}
      </div>
    </div>
  );
}
