# Etap 1: Budowanie aplikacji (działa na architekturze ARM dla Raspberry Pi)
FROM node:20-alpine AS builder

WORKDIR /app

# Kopiowanie plików konfiguracyjnych i instalacja zależności
COPY package*.json ./
RUN npm ci

# Kopiowanie reszty kodu
COPY . .

# Zmiana base na '/' dla domeny docker.zarnecki.org, 
# bo github pages używało '/dfn/'
RUN sed -i "s/base: '\/dfn\/'/base: '\/'/g" vite.config.ts

# Budowanie wersji produkcyjnej Vite
RUN npm run build

# Etap 2: Serwowanie plików statycznych przez super-lekki Nginx
FROM nginx:alpine

# Kopiowanie zbudowanych plików z poprzedniego etapu
COPY --from=builder /app/dist /usr/share/nginx/html

# Zastępujemy domyślną konfigurację Nginxa, naszą własną dla aplikacji Single Page Application
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
