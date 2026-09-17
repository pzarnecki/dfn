# Docker Command Center 🚀 (WSB Merito Lab)

Interaktywna platforma szkoleniowa stworzona dla studentów do nauki Dockera i konteneryzacji. Zbudowana w stylu sci-fi / cyberpunk (z inspiracjami z gier takich jak StarCraft), oferuje immersyjne doświadczenie edukacyjne, symulację terminala i modułową prezentację wiedzy.

## 🌟 Główne funkcjonalności

- **Moduł Prezentacji (Odprawa):** Interaktywne slajdy tłumaczące kluczowe pojęcia konteneryzacji z zaawansowanymi schematami (Kluczowe różnice Kontenery vs VM, Architektura Spotify/Netflix).
- **Zarządzanie Misjami:** System zadań edukacyjnych (np. Hello Web, Dockerfile, Sieci).
- **Symulator Terminala (Preloader):** Boot-screen wprowadzający w nastrój cyber-bezpieczeństwa.
- **Optymalizacja dla ARM (Raspberry Pi):** Wbudowane wsparcie do hostowania platformy we własnej infrastrukturze na lekkich urządzeniach.

## 🛠️ Stos technologiczny

- **Frontend:** React 18, TypeScript
- **Stylizacja:** Tailwind CSS
- **Animacje:** Framer Motion
- **Ikony:** Lucide React
- **Budowanie:** Vite
- **Wdrożenie:** Docker (Multi-stage build) + Nginx

## 💻 Uruchomienie lokalne (Dev)

Aby uruchomić aplikację w trybie deweloperskim na swoim komputerze:

```bash
# 1. Zainstaluj zależności
npm install

# 2. Uruchom serwer lokalny
npm run dev
```
Aplikacja będzie dostępna pod adresem: `http://localhost:5173`

## 🐳 Wdrożenie produkcyjne (Docker / Raspberry Pi)

Repozytorium posiada gotowy plik `Dockerfile` (multi-stage) oraz `docker-compose.yml`, zoptymalizowane pod architekturę ARM (Raspberry Pi) i x86.
Obraz używa bardzo lekkiego serwera Nginx do serwowania zbudowanych plików statycznych.

Aby uruchomić aplikację w środowisku produkcyjnym:

```bash
# Uruchomienie kontenera w tle (na domyślnym porcie 5174)
docker-compose up -d --build
```

### Konfiguracja Reverse Proxy (Caddy)

Jeśli korzystasz z Caddy na serwerze (np. na malinie z IP `192.168.162.210`), dodaj poniższy blok do pliku `Caddyfile`:

```caddy
docker.zarnecki.org {
    reverse_proxy 192.168.162.210:5174
}
```

## 🏗️ Budowanie pod GitHub Pages

Aplikacja jest również kompatybilna z GitHub Pages (wdrażana do ścieżki `/dfn/`). Podczas budowy obrazu Docker (`Dockerfile`) ścieżka bazowa jest automatycznie podmieniana na `/`, co pozwala na serwowanie aplikacji bezpośrednio pod korzeniem własnej domeny.
