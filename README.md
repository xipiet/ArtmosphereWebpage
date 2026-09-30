# Artmosphere - Orakel

- Web-Auftritt von Artmosphere <br/>
- Statische Seite: `index.html`, `src/main.js`, `src/main.css`, gebaut mit Vite <br/>

## Lokal entwickeln

- Node 24 installieren <br/>
- git clone https://github.com/xipiet/ArtmosphereWebpage.git <br/>
- cd ArtmosphereWebpage <br/>
- npm install <br/>
- npm run dev <br/>

`npm run dev` ist nur zum Entwickeln und gehört **nicht** auf den Server: Der Dev-Server liefert das ganze Projekt aus, auch `.git`. <br/>
Bilder und Videos, die per Pfad eingebunden sind (`/pictures/...`), gehören nach `public/`, sonst fehlen sie im Build. <br/>

## Aufsetzen auf dem Server

Die Seite wird mit `npm run build` gebaut, nginx liefert nur den Ordner `dist/` aus. <br/>

- apt install -y git nginx curl <br/>
- curl -fsSL https://deb.nodesource.com/setup_24.x | bash - <br/>
- apt install -y nodejs <br/>
- git clone https://github.com/xipiet/ArtmosphereWebpage.git /opt/artmosphere <br/>
- cd /opt/artmosphere <br/>
- npm ci <br/>
- npm run build <br/>
- Inhalt von `/etc/nginx/sites-available/default` ersetzen durch:

```nginx
server {
    listen 80 default_server;
    root /opt/artmosphere/dist;
    index index.html;
}
```

- systemctl reload nginx <br/>
- Nginx Proxy Manager: `web.artmosphere.cc` → `http://<IP>:80` <br/>

## Update

- cd /opt/artmosphere <br/>
- git pull <br/>
- npm ci <br/>
- npm run build <br/>
