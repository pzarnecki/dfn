import { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { CheckCircle2, ChevronRight, TerminalSquare, Info, X, ScrollText, Copy, Check, Clock } from 'lucide-react';

function CopyBlock({ code, label }: { code: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="my-3">
      <div className="flex items-center justify-between bg-slate-800/80 border-t border-x border-slate-600 px-3 py-1.5 rounded-t text-xs">
        <span className="text-slate-400 font-mono">{label}</span>
        <button onClick={handleCopy} className="flex items-center gap-1 text-cyan-400 hover:text-cyan-200 transition-colors">
          {copied ? <><Check size={12}/> Skopiowano!</> : <><Copy size={12}/> Kopiuj</>}
        </button>
      </div>
      <pre className="bg-black/70 p-3 rounded-b border border-slate-700 text-emerald-400 font-mono text-sm shadow-[inset_0_0_15px_rgba(0,0,0,0.6)] overflow-x-auto whitespace-pre-wrap">{code}</pre>
    </div>
  );
}

const missions = [
  {
    id: 1,
    title: 'Pierwszy Kontakt (Hello Web)',
    description: 'Uruchomienie gotowego serwera webowego (Nginx) za pomocą Dockera.',
    time: '~15 min',
    tasks: [
      'Otwórz terminal (PowerShell lub CMD).',
      'Uruchom: docker run -d -p 8080:80 nginx',
      'Wejdź w przeglądarce na localhost:8080',
      'Sprawdź status: docker ps',
      'Zatrzymaj kontener: docker stop [ID]'
    ],
    tutorial: {
      title: 'ZAPISKI Z ODPRAWY: NGINX',
      content: (
        <div className="space-y-6 text-slate-300 pr-4">
          <p className="text-cyan-400 font-mono border-l-2 border-cyan-400 pl-3">
            Cel: Nauczyć się podstawowej komendy powołującej kontenery do życia.
          </p>
          
          <div>
            <h4 className="text-white font-bold mb-2">1. Uruchomienie Terminala</h4>
            <p>W środowisku Windows pracujemy w PowerShellu. Kliknij menu Start, wpisz <code>PowerShell</code> i uruchom program. Upewnij się, że w tle działa aplikacja <strong>Docker Desktop</strong> (ikona wieloryba w zasobniku systemowym)!</p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-2">2. Uruchamiamy serwer webowy</h4>
            <CopyBlock label="PowerShell" code="docker run -d -p 8080:80 nginx" />
            <ul className="list-none space-y-3 mt-3">
              <li className="flex gap-2"><span className="text-cyan-400 font-bold min-w-20">docker run</span> <span className="text-slate-400">główna komenda; jeśli nie masz obrazu Nginx, Docker sam pobierze go z internetu!</span></li>
              <li className="flex gap-2"><span className="text-cyan-400 font-bold min-w-20">-d</span> <span className="text-slate-400">"detach" - uruchamia w tle. Terminal nie zostanie zablokowany logami serwera.</span></li>
              <li className="flex gap-2"><span className="text-cyan-400 font-bold min-w-20">-p 8080:80</span> <span className="text-slate-400">"port" - tunel między Twoim Windowsem (port 8080) a kontenerem (port 80, domyślny dla stron WWW).</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-2">3. Sprawdzanie statusu</h4>
            <CopyBlock label="PowerShell" code="docker ps" />
            <p>Zobaczysz tabelkę z listą działających kontenerów. Zapamiętaj pierwsze znaki z kolumny <code>CONTAINER ID</code> (np. <code>a1b2c3d4</code>).</p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-2">4. Sprzątanie pola walki</h4>
            <CopyBlock label="PowerShell — podmień ID!" code="docker stop a1b2c3d4" />
            <p>Lub jeśli chcesz od razu usunąć kontener (siłowo):</p>
            <CopyBlock label="PowerShell — podmień ID!" code="docker rm -f a1b2c3d4" />
          </div>
        </div>
      )
    }
  },
  {
    id: 2,
    title: 'Konstrukcja (Dockerfile)',
    description: 'Tworzenie własnego obrazu z generatorem memów.',
    time: '~20 min',
    tasks: [
      'Utwórz folder "memy" i plik "index.html".',
      'Stwórz plik "Dockerfile" (bez rozszerzenia!).',
      'Zbuduj obraz: docker build -t mem-app .',
      'Uruchom swój obraz: docker run -d -p 8081:80 mem-app'
    ],
    tutorial: {
      title: 'ZAPISKI Z ODPRAWY: DOCKERFILE',
      content: (
        <div className="space-y-6 text-slate-300 pr-4">
          <p className="text-cyan-400 font-mono border-l-2 border-cyan-400 pl-3">
            Cel: Nauczyć się automatyzować tworzenie obrazów za pomocą przepisu.
          </p>

          <div>
            <h4 className="text-white font-bold mb-2">1. Tworzenie folderu projektu</h4>
            <CopyBlock label="PowerShell" code={`mkdir memy\ncd memy`} />
          </div>

          <div>
            <h4 className="text-white font-bold mb-2">2. Tworzenie pliku index.html</h4>
            <p>Otwórz VS Code lub Notatnik i utwórz plik <code>index.html</code> z poniższą zawartością:</p>
            <CopyBlock label="index.html" code={`<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8">
  <title>Generator Memów</title>
  <style>
    body { 
      font-family: Arial; 
      background: #1a1a2e; 
      color: white; 
      text-align: center; 
      padding: 40px; 
    }
    img { 
      max-width: 400px; 
      border-radius: 12px; 
      margin: 20px; 
    }
    button { 
      background: #0ea5e9; 
      color: white; 
      border: none; 
      padding: 12px 24px; 
      font-size: 18px; 
      border-radius: 8px; 
      cursor: pointer; 
    }
    button:hover { background: #0284c7; }
    #caption { 
      font-size: 28px; 
      font-weight: bold; 
      margin-top: 10px; 
    }
  </style>
</head>
<body>
  <h1>🐳 Docker Meme Generator</h1>
  <img id="meme-img" 
       src="https://cataas.com/cat/says/Docker%20Rules" 
       alt="Meme" />
  <div id="caption">Naciśnij przycisk!</div>
  <button onclick="generate()">Generuj Mem!</button>
  <script>
    const captions = [
      "U mnie działa!",
      "Kto potrzebuje VM?",
      "docker run --rm -it życie",
      "FROM scratch... jak moja wiedza",
      "CTRL+C nie pomoże",
      "Kontener > Bałagan na pulpicie"
    ];
    function generate() {
      const cap = captions[Math.floor(Math.random() * captions.length)];
      document.getElementById('caption').textContent = cap;
      document.getElementById('meme-img').src = 
        'https://cataas.com/cat/says/' + encodeURIComponent(cap);
    }
  </script>
</body>
</html>`} />
          </div>

          <div>
            <h4 className="text-white font-bold mb-2">3. Tworzenie Dockerfile</h4>
            <p>Stwórz w tym samym folderze plik o nazwie <strong>dokładnie</strong> <code>Dockerfile</code> (bez .txt!):</p>
            <CopyBlock label="Dockerfile" code={`FROM nginx:alpine
COPY ./index.html /usr/share/nginx/html/index.html`} />
            <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-400">
              <li><strong>FROM:</strong> Bazujemy na gotowym, lekkim obrazie z Nginx (wersja alpine to tylko kilka MB!).</li>
              <li><strong>COPY:</strong> Kopiujemy nasz plik HTML do folderu, z którego Nginx serwuje strony.</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-2">4. Budowanie i uruchamianie</h4>
            <CopyBlock label="PowerShell (będąc w folderze 'memy')" code={`docker build -t mem-app .
docker run -d -p 8081:80 mem-app`} />
            <p className="text-orange-400 mt-2 p-2 bg-orange-950/20 border border-orange-900/50 text-sm">
              <strong>KRYTYCZNE:</strong> Kropka na końcu <code>docker build</code> oznacza "szukaj Dockerfile tutaj, w tym folderze". Bez niej dostaniesz błąd!
            </p>
            <p className="mt-2">Otwórz przeglądarkę: <code>localhost:8081</code> — powinieneś zobaczyć generator memów!</p>
          </div>
        </div>
      )
    }
  },
  {
    id: 3,
    title: 'Połączenie (Sieci)',
    description: 'Łączenie bazy danych z naszą aplikacją.',
    time: '~25 min',
    tasks: [
      'Stwórz sieć: docker network create wsb-net',
      'Uruchom bazę: docker run -d --name baza --network wsb-net redis',
      'Utwórz pliki aplikacji (app.py + Dockerfile)',
      'Zbuduj i uruchom apkę z licznikiem odwiedzin',
      'Zrozum mechanizm DNS w kontenerach'
    ],
    tutorial: {
      title: 'ZAPISKI Z ODPRAWY: NETWORKING',
      content: (
        <div className="space-y-6 text-slate-300 pr-4">
          <p className="text-cyan-400 font-mono border-l-2 border-cyan-400 pl-3">
            Cel: Sprawić, aby dwa kontenery "rozmawiały" ze sobą w izolowanej sieci.
          </p>

          <div>
            <h4 className="text-white font-bold mb-2">1. Tworzenie wirtualnej sieci</h4>
            <CopyBlock label="PowerShell" code="docker network create wsb-net" />
            <p>Domyślnie kontenery to izolowane bunkry. Tworzymy "kabel sieciowy", aby mogły się ze sobą komunikować.</p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-2">2. Uruchomienie bazy danych Redis</h4>
            <CopyBlock label="PowerShell" code="docker run -d --name baza --network wsb-net redis" />
            <p>Kluczowe parametry: <code>--name baza</code> (nadajemy nazwę DNS) i <code>--network wsb-net</code> (podłączamy do naszego kabla).</p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-2">3. Tworzymy aplikację (Licznik odwiedzin)</h4>
            <p>Utwórz folder <code>licznik</code> i stwórz w nim dwa pliki:</p>
            <CopyBlock label="PowerShell" code={`mkdir licznik\ncd licznik`} />
            
            <CopyBlock label="app.py" code={`from flask import Flask
import redis

app = Flask(__name__)
db = redis.Redis(host='baza', port=6379)

@app.route('/')
def hello():
    count = db.incr('hits')
    return f'''
    <html>
    <body style="background:#1a1a2e;color:white;text-align:center;padding:40px;font-family:Arial">
      <h1>🐳 Licznik Odwiedzin</h1>
      <p style="font-size:60px">{count}</p>
      <p>Ta strona została odwiedzona <strong>{count}</strong> razy.</p>
      <p style="color:#888">Dane przechowywane w Redisie (osobny kontener!)</p>
    </body>
    </html>
    '''

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)`} />

            <CopyBlock label="requirements.txt" code={`flask
redis`} />

            <CopyBlock label="Dockerfile" code={`FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY app.py .
CMD ["python", "app.py"]`} />
          </div>

          <div>
            <h4 className="text-white font-bold mb-2">4. Budowanie i uruchamianie</h4>
            <CopyBlock label="PowerShell (w folderze 'licznik')" code={`docker build -t licznik-app .
docker run -d --name apka --network wsb-net -p 5000:5000 licznik-app`} />
            <p>Otwórz <code>localhost:5000</code> — każde odświeżenie zwiększy licznik! Dane są zapisywane w Redisie, który działa w osobnym kontenerze.</p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-2">💡 Magia DNS Dockera</h4>
            <p>Zauważ, że w <code>app.py</code> używamy <code>host='baza'</code> — to nazwa, którą nadaliśmy kontenerowi z Redisem. Docker automatycznie tłumaczy ją na adres IP. Nie musisz znać żadnych numerów!</p>
          </div>
        </div>
      )
    }
  },
  {
    id: 4,
    title: 'Finałowa Batalia',
    description: 'Wdrożenie interaktywnej gry i rywalizacja "kto szybciej?".',
    time: '~30 min',
    tasks: [
      'Utwórz folder "gra" i skopiuj pliki gry.',
      'Napisz wieloetapowy Dockerfile (Multi-stage build).',
      'Zbuduj obraz: docker build -t wsb-gra .',
      'Uruchom na porcie 3000: docker run -d -p 3000:80 wsb-gra'
    ],
    tutorial: {
      title: 'ZAPISKI Z ODPRAWY: MULTI-STAGE BUILD',
      content: (
        <div className="space-y-6 text-slate-300 pr-4">
          <p className="text-orange-400 font-mono border-l-2 border-orange-400 pl-3">
            Cel Główny: Zbudowanie profesjonalnej aplikacji i turniej o tytuł mistrza Docker Space Defense!
          </p>

          <div>
            <h4 className="text-white font-bold mb-2">1. Przygotowanie plików gry</h4>
            <p>Utwórz folder <code>gra</code> i skopiuj do niego plik gry.</p>
            <CopyBlock label="PowerShell" code={`mkdir gra\ncd gra`} />
            <p className="mt-2">Plik gry (<code>index.html</code>) jest dostępny u prowadzącego lub pod adresem wskazanym na tablicy. Zapisz go do folderu <code>gra</code>.</p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-2">2. Multi-stage Dockerfile</h4>
            <p>To zaawansowana technika: budujemy obraz w <strong>dwóch etapach</strong>. Dzięki temu finalny obraz jest malutki!</p>
            <CopyBlock label="Dockerfile" code={`# Etap 1: Serwer produkcyjny (bez zbędnych narzędzi)
FROM nginx:alpine

# Kopiujemy grę do folderu, z którego Nginx serwuje pliki
COPY ./index.html /usr/share/nginx/html/index.html

# Informujemy, że kontener nasłuchuje na porcie 80
EXPOSE 80`} />

            <p className="mt-2 text-slate-400 text-sm">
              <strong>Uwaga:</strong> W prawdziwym projekcie (np. React, Angular) Stage 1 zawierałby <code>npm install && npm run build</code> na pełnym obrazie Node.js, a Stage 2 kopiowałby tylko gotowe pliki do Nginx. Tu gra jest gotowa, więc wystarczy jeden etap z Nginx.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-2">3. Budowanie i uruchamianie</h4>
            <CopyBlock label="PowerShell (w folderze 'gra')" code={`docker build -t wsb-gra .
docker run -d -p 3000:80 wsb-gra`} />
            <p>Otwórz <code>localhost:3000</code> — gra się uruchomi!</p>
          </div>

          <div className="border border-orange-500/50 bg-orange-950/30 p-4 rounded mt-4 shadow-[0_0_15px_rgba(249,115,22,0.2)]">
            <h4 className="text-orange-400 font-bold mb-2 flex items-center gap-2">
              ⚠️ ZADANIE BOJOWE — WYŚCIG!
            </h4>
            <p>Od momentu uruchomienia gry, <strong>kto pierwszy zdobędzie 1000 punktów</strong>, wygrywa i zgłasza to prowadzącemu! Sterowanie: strzałki lewo/prawo + spacja do strzelania.</p>
          </div>
        </div>
      )
    }
  }
];

// Animation variants for the holographic slide-in
const deckVariants: Variants = {
  hidden: { x: '100%', opacity: 0, scale: 0.9, rotateY: 45 },
  visible: { 
    x: 0, opacity: 1, scale: 1, rotateY: 0,
    transition: { type: 'spring', damping: 20, stiffness: 100, staggerChildren: 0.1 }
  },
  exit: { 
    x: '100%', opacity: 0, scale: 0.9, rotateY: -45,
    transition: { duration: 0.3 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 }
};

interface MissionsProps {
  completedTasks: Record<string, boolean>;
  toggleTask: (key: string) => void;
}

export default function Missions({ completedTasks, toggleTask }: MissionsProps) {
  const [activeMission, setActiveMission] = useState(1);
  const [showTutorial, setShowTutorial] = useState(false);

  const currentMissionObj = missions.find(m => m.id === activeMission);

  return (
    <div className="flex flex-col md:flex-row gap-6 h-full mt-4">
      {/* Sidebar with mission list */}
      <div className="w-full md:w-1/3 flex flex-col gap-2 relative z-10">
        <h3 className="text-cyan-500 font-mono uppercase text-sm mb-2 px-2 tracking-widest">Dostępne Misje</h3>
        {missions.map((mission) => {
          const missionTasksDone = mission.tasks.filter((_, i) => completedTasks[`${mission.id}-${i}`]).length;
          const allDone = missionTasksDone === mission.tasks.length;
          return (
            <button
              key={mission.id}
              onClick={() => { setActiveMission(mission.id); setShowTutorial(false); }}
              className={`text-left p-4 rounded-sm border transition-all relative overflow-hidden ${
                activeMission === mission.id
                  ? 'bg-cyan-950/40 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.3)] text-white'
                  : allDone 
                    ? 'bg-emerald-950/20 border-emerald-700/50 text-emerald-300'
                    : 'bg-slate-900/30 border-slate-800 text-slate-400 hover:bg-slate-800/50 hover:border-slate-700'
              }`}
            >
              {activeMission === mission.id && <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-400 shadow-[0_0_10px_#22d3ee]"></div>}
              
              <div className="flex items-center justify-between">
                <span className="font-bold font-mono text-xs uppercase opacity-70">Zadanie 0{mission.id}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-slate-500 flex items-center gap-1"><Clock size={10}/>{mission.time}</span>
                  {activeMission === mission.id && <ChevronRight size={16} className="text-cyan-400" />}
                </div>
              </div>
              <div className="font-semibold mt-1 glitch-hover">{mission.title}</div>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex-1 h-1 bg-slate-700 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-500 ${allDone ? 'bg-emerald-400' : 'bg-cyan-500'}`} 
                       style={{ width: `${(missionTasksDone / mission.tasks.length) * 100}%` }}></div>
                </div>
                <span className="text-[10px] font-mono text-slate-500">{missionTasksDone}/{mission.tasks.length}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main mission view */}
      <div className="w-full md:w-2/3 border border-slate-700 bg-slate-900/80 relative overflow-hidden flex flex-col" style={{ perspective: '1000px' }}>
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-900/20 blur-3xl pointer-events-none rounded-full"></div>

        <AnimatePresence mode="wait">
          {!showTutorial ? (
            <motion.div
              key="mission-tasks"
              initial={{ opacity: 0, z: -100, rotateX: 10 }}
              animate={{ opacity: 1, z: 0, rotateX: 0 }}
              exit={{ opacity: 0, z: -100, rotateX: -10 }}
              transition={{ duration: 0.3 }}
              className="p-8 flex-1 flex flex-col"
            >
              <div className="flex items-start justify-between mb-2 flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  <TerminalSquare className="text-cyan-400 drop-shadow-[0_0_5px_#22d3ee]" size={28} />
                  <h2 className="text-2xl font-bold text-white uppercase tracking-wider">{currentMissionObj?.title}</h2>
                </div>
                
                <button 
                  onClick={() => setShowTutorial(true)}
                  className="flex items-center gap-2 bg-cyan-900/50 hover:bg-cyan-600 border border-cyan-400 text-cyan-200 hover:text-white px-5 py-2.5 rounded-sm transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)] group relative overflow-hidden"
                  title="Pokaż szczegółowe instrukcje i kody"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  <Info size={18} className="group-hover:rotate-12 transition-transform" />
                  <span className="font-mono text-sm uppercase font-bold tracking-widest">Odprawa + Kod</span>
                </button>
              </div>
              
              <div className="flex items-center gap-4 text-slate-400 mb-8 border-b border-slate-700 pb-6">
                <p className="text-lg flex-1">{currentMissionObj?.description}</p>
                <span className="text-xs font-mono bg-slate-800 px-3 py-1 rounded border border-slate-700 flex items-center gap-1 whitespace-nowrap">
                  <Clock size={12}/> {currentMissionObj?.time}
                </span>
              </div>
              
              <h3 className="text-emerald-400 font-mono uppercase text-sm mb-4 tracking-widest flex items-center gap-2">
                <CheckCircle2 size={16}/> Lista Celów:
              </h3>
              
              <div className="space-y-3 overflow-y-auto pr-2 custom-scrollbar flex-1">
                {currentMissionObj?.tasks.map((task, index) => {
                  const key = `${currentMissionObj.id}-${index}`;
                  const isCompleted = completedTasks[key];
                  return (
                    <div 
                      key={index}
                      onClick={() => toggleTask(key)}
                      className={`p-4 border rounded-sm flex items-start gap-4 cursor-pointer transition-all ${
                        isCompleted 
                          ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-200 shadow-[0_0_10px_rgba(16,185,129,0.2)]' 
                          : 'bg-slate-800/40 border-slate-700 hover:bg-slate-700/80 hover:border-cyan-500/30 text-slate-200'
                      }`}
                    >
                      <div className={`mt-0.5 shrink-0 transition-all ${
                          isCompleted ? 'text-emerald-400 scale-110 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]' : 'text-slate-600'
                        }`}>
                        <CheckCircle2 size={22} />
                      </div>
                      <span className={`text-[15px] ${isCompleted ? 'line-through opacity-70' : ''}`}>{task}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="mission-tutorial"
              variants={deckVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute inset-0 bg-slate-900 p-8 z-20 flex flex-col border-l-4 border-cyan-400 shadow-[-10px_0_30px_rgba(6,182,212,0.15)]"
            >
              <div className="hologram-scanline"></div>

              <div className="flex justify-between items-center mb-6 border-b border-cyan-900/50 pb-4 relative z-10">
                <motion.div variants={itemVariants} className="flex items-center gap-3">
                  <div className="bg-cyan-500/20 border border-cyan-500/50 p-2 rounded shadow-[0_0_10px_rgba(6,182,212,0.5)]">
                    <Info className="text-cyan-300" size={26} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-cyan-300 font-mono tracking-wider drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]">
                      {currentMissionObj?.tutorial.title}
                    </h2>
                    <p className="text-xs text-cyan-600 font-mono">STATUS: ODKODOWANO | TRYB: POMOC + KOD ŹRÓDŁOWY</p>
                  </div>
                </motion.div>
                
                <motion.button 
                  variants={itemVariants}
                  onClick={() => setShowTutorial(false)}
                  className="text-slate-400 hover:text-white bg-slate-800 hover:bg-red-900/50 hover:border-red-500 border border-transparent p-2 rounded transition-all"
                  title="Zamknij"
                >
                  <X size={24} />
                </motion.button>
              </div>
              
              <motion.div 
                variants={itemVariants} 
                className="flex-1 overflow-y-auto pr-4 custom-scrollbar relative z-10 text-[15px] leading-relaxed"
              >
                <div className="sticky top-0 right-0 float-right bg-slate-900/80 border border-slate-700 text-xs px-2 py-1 rounded text-slate-400 flex items-center gap-1 mb-2 z-20">
                  <ScrollText size={12}/> Przewijaj w dół
                </div>
                
                {currentMissionObj?.tutorial.content}
                
                <div className="h-8"></div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="mt-4 pt-4 border-t border-cyan-900/50 flex justify-end relative z-10">
                <button 
                  onClick={() => setShowTutorial(false)}
                  className="bg-cyan-700/80 hover:bg-cyan-500 text-white px-8 py-3 rounded-sm font-mono text-sm uppercase font-bold tracking-widest transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:shadow-[0_0_25px_rgba(6,182,212,0.8)] flex items-center gap-2"
                >
                  <CheckCircle2 size={18}/> Wracam do zadań
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
