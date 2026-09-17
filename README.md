# Docker Command Center (WSB Merito Lab)

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](#)
[![React](https://img.shields.io/badge/React-18.x-blue)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF)](https://vitejs.dev/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED)](https://www.docker.com/)

Platforma edukacyjna typu Single Page Application (SPA) zbudowana dla studentów kierunków informatycznych w celu interaktywnej nauki konteneryzacji (Docker) oraz podstaw architektury sieciowej. 

Interfejs aplikacji wykorzystuje gamifikację oraz stylistykę dark-mode/cyberpunk, dostarczając zintegrowane narzędzia m.in. terminal w przeglądarce, interaktywne schematy architektury systemowej (porównania VM vs Kontenery) oraz zbiór zautomatyzowanych misji technicznych.

## Spis treści

- [Wymagania wstępne](#wymagania-wstępne)
- [Architektura](#architektura)
- [Struktura projektu](#struktura-projektu)
- [Uruchomienie lokalne (Development)](#uruchomienie-lokalne-development)
- [Wdrożenie (Production / Self-hosted)](#wdrożenie-production--self-hosted)
- [Publikacja na GitHub Pages](#publikacja-na-github-pages)

## Wymagania wstępne

Aby uruchomić projekt lokalnie lub zbudować obraz, wymagane są:
- [Node.js](https://nodejs.org/) (v18.0.0 lub nowszy)
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/) oraz [Docker Compose](https://docs.docker.com/compose/) (w przypadku wdrożenia na własnym serwerze)

## Architektura

Projekt oparty jest o nowoczesny stos frontendowy:
- **Core:** React 18 z TypeScriptem (Strict Mode)
- **Bundler:** Vite (zoptymalizowany proces budowania statycznych paczek)
- **Stylizacja:** Tailwind CSS v3
- **Animacje:** Framer Motion (zależności fizyczne i modale z zachowaniem stanów)
- **Ikony:** Lucide React

## Struktura projektu

```text
├── Dockerfile             # Multi-stage build (Node.js -> Nginx) dla x86/ARM
├── docker-compose.yml     # Konfiguracja środowiska kontenerowego
├── nginx.conf             # Konfiguracja routingu Nginx pod SPA (fallback do index.html)
├── package.json           # Definicje zależności i skryptów
├── src/
│   ├── App.tsx            # Główny router i zarządzanie stanem aplikacji
│   ├── index.css          # Globalne style Tailwind i dyrektywy CSS
│   ├── main.tsx           # Punkt wejścia React DOM
│   └── components/
│       ├── Preloader.tsx  # Ekran bootowania aplikacji (symulacja konsoli)
│       ├── Presentation.tsx # Zbiór slajdów i wizualizacji (VM vs Docker)
│       ├── Missions.tsx   # Definicje zadań oraz tutoriale do Dockera
│       └── ...            # Pozostałe moduły UI
└── vite.config.ts         # Konfiguracja bundlera
```

## Uruchomienie lokalne (Development)

Proces uruchamia serwer deweloperski z Hot Module Replacement (HMR).

```bash
# Sklonuj repozytorium
git clone https://github.com/pzarnecki/dfn.git
cd dfn

# Zainstaluj zależności
npm install

# Uruchom serwer developerski
npm run dev
```

Aplikacja domyślnie nasłuchuje na porcie `5173`.

## Wdrożenie (Production / Self-hosted)

Platforma zawiera wsparcie dla architektury **ARM (np. Raspberry Pi)** oraz x86_64, używając lekkiego obrazu `nginx:alpine` do serwowania wybudowanych (zminifikowanych) plików statycznych.

### 1. Budowa i uruchomienie z Docker Compose

Domyślna konfiguracja mapuje port `5174` na maszynie hosta do portu `80` w kontenerze. Uruchom polecenie:

```bash
docker-compose up -d --build
```

### 2. Reverse Proxy (Caddy)

Jeśli środowiskiem docelowym jest serwer korzystający z Caddy, dodaj poniższy blok do pliku konfiguracyjnego `Caddyfile`. Pamiętaj, aby zmodyfikować adres IP zgodnie z ustawieniami własnej sieci:

```caddy
# Serwowanie aplikacji na subdomenie, kierowanie ruchu do kontenera Dockera
docker.zarnecki.org {
    reverse_proxy 192.168.162.210:5174
}
```

## Publikacja na GitHub Pages

Skrypty wewnątrz repozytorium (domyślny base path: `/dfn/` w `vite.config.ts`) pozwalają na publikację aplikacji jako statycznej witryny na GitHub Pages.

W przypadku wdrożenia przez Docker (`Dockerfile`), flaga `--base` jest automatycznie przepisywana na `/` (root level domeny) podczas etapu budowania (Build Stage), co gwarantuje kompatybilność obu środowisk bez konfliktów ścieżek URL.
