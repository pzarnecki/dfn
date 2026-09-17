import { motion } from 'framer-motion';
import { AlertTriangle, Bug, Wifi, ShieldX, HardDrive, RefreshCw } from 'lucide-react';

const problems = [
  {
    icon: <ShieldX size={20} />,
    error: '"error during connect: ... Is the docker daemon running?"',
    cause: 'Docker Desktop nie jest uruchomiony.',
    solution: 'Kliknij ikonę Docker Desktop w menu Start i poczekaj, aż ikona wieloryba w zasobniku systemowym przestanie się animować (status: "Docker is running").',
    color: 'red'
  },
  {
    icon: <HardDrive size={20} />,
    error: '"Bind for 0.0.0.0:8080 failed: port is already allocated"',
    cause: 'Port 8080 jest już zajęty przez inny kontener (lub program).',
    solution: 'Użyj innego portu (np. -p 8081:80 zamiast -p 8080:80) albo zatrzymaj stary kontener komendą: docker rm -f $(docker ps -q)',
    color: 'orange'
  },
  {
    icon: <Bug size={20} />,
    error: '"COPY failed: file not found in build context"',
    cause: 'Docker nie może znaleźć pliku, który próbujesz skopiować (np. index.html).',
    solution: 'Upewnij się, że PowerShell jest otwarty W TYM SAMYM folderze, co Dockerfile i index.html. Wpisz dir (lub ls), żeby sprawdzić, co jest w folderze.',
    color: 'yellow'
  },
  {
    icon: <Wifi size={20} />,
    error: '"Could not resolve host: hub.docker.com" / timeout',
    cause: 'Brak połączenia z internetem lub zablokowany dostęp do Docker Hub.',
    solution: 'Sprawdź połączenie z internetem. Jeśli jesteś w sieci firmowej/szkolnej, poproś prowadzącego o odblokowanie hub.docker.com.',
    color: 'blue'
  },
  {
    icon: <RefreshCw size={20} />,
    error: '"no matching manifest for windows/amd64"',
    cause: 'Docker próbuje pobrać obraz Linuxowy, ale jest ustawiony na tryb Windows containers.',
    solution: 'Kliknij prawym przyciskiem na ikonę Docker w zasobniku → "Switch to Linux containers..."',
    color: 'purple'
  },
  {
    icon: <Bug size={20} />,
    error: 'Strona nie ładuje się (localhost:8080 → "nie można wyświetlić")',
    cause: 'Kontener mógł się natychmiast wyłączyć (crashnąć).',
    solution: 'Wpisz: docker ps -a (pokaże WSZYSTKIE kontenery, też wyłączone). Jeśli STATUS to "Exited", sprawdź logi: docker logs [ID_kontenera]',
    color: 'orange'
  },
  {
    icon: <ShieldX size={20} />,
    error: '"permission denied" przy komendach Docker',
    cause: 'Brak uprawnień do uruchamiania Dockera.',
    solution: 'Upewnij się, że Docker Desktop jest zainstalowany dla Twojego użytkownika. Na Linuxie: dodaj się do grupy docker komendą sudo usermod -aG docker $USER i przeloguj się.',
    color: 'red'
  }
];

const colorMap: Record<string, string> = {
  red: 'border-red-500/50 bg-red-950/10',
  orange: 'border-orange-500/50 bg-orange-950/10',
  yellow: 'border-yellow-500/50 bg-yellow-950/10',
  blue: 'border-blue-500/50 bg-blue-950/10',
  purple: 'border-purple-500/50 bg-purple-950/10'
};

const iconColorMap: Record<string, string> = {
  red: 'text-red-400',
  orange: 'text-orange-400',
  yellow: 'text-yellow-400',
  blue: 'text-blue-400',
  purple: 'text-purple-400'
};

export default function Troubleshooting() {
  return (
    <div className="w-full mx-auto mt-4 p-4 pb-10">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-red-400 uppercase tracking-widest font-mono mb-2 flex items-center gap-3">
          <AlertTriangle size={28} />
          SOS — Coś Nie Działa?
        </h2>
        <p className="text-slate-400">Najczęstsze problemy i ich rozwiązania. Jeśli nic tu nie pasuje — wołaj prowadzącego!</p>
      </div>

      <div className="space-y-4">
        {problems.map((problem, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`border rounded-sm p-5 ${colorMap[problem.color]}`}
          >
            <div className="flex items-start gap-4">
              <div className={`mt-1 shrink-0 ${iconColorMap[problem.color]}`}>
                {problem.icon}
              </div>
              <div className="space-y-2 flex-1">
                <code className="text-red-300 text-sm bg-black/40 px-2 py-1 rounded block overflow-x-auto">
                  {problem.error}
                </code>
                <p className="text-slate-400 text-sm">
                  <strong className="text-slate-200">Przyczyna:</strong> {problem.cause}
                </p>
                <p className="text-emerald-300 text-sm bg-emerald-950/20 border border-emerald-900/30 p-2 rounded">
                  <strong>✅ Rozwiązanie:</strong> {problem.solution}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 border border-slate-700 bg-slate-900/50 p-6 rounded-sm text-center">
        <p className="text-slate-400 text-lg mb-2">Nadal nie działa?</p>
        <p className="text-2xl">🙋 Podnieś rękę — prowadzący pomoże!</p>
      </div>
    </div>
  );
}
