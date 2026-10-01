# Artmosphere - Orakel

- Web-Auftritt von Artmosphere <br/>
- Statische Seite: `index.html`, `src/main.js`, `src/main.css`, `src/events.js`, gebaut mit Vite <br/>

## Lokal entwickeln

- Node 24 installieren <br/>
- git clone https://github.com/xipiet/ArtmosphereWebpage.git <br/>
- cd ArtmosphereWebpage <br/>
- npm install <br/>
- npm run dev <br/>

`npm run dev` ist nur zum Entwickeln und gehört **nicht** auf den Server: Der Dev-Server liefert das ganze Projekt aus, auch `.git`. <br/>
Bilder und Videos, die per Pfad eingebunden sind (`/pictures/...`), gehören nach `public/`, sonst fehlen sie im Build. <br/>

## Events eintragen

- Termine stehen in `src/events.js`, danach auf dem Server updaten (siehe unten) <br/>
- Ob ein Event oben bei „Next Events“ oder unten bei „Past Events“ steht, ergibt sich automatisch aus dem Datum <br/>

## Aufsetzen auf dem Server

Die Seite wird mit `npm run build` gebaut. Ein systemd-Service startet `serve`, der nur den Ordner `dist/` auf Port 3000 ausliefert (Einstellungen in `serve.json`). <br/>

- apt install -y git curl <br/>
- curl -fsSL https://deb.nodesource.com/setup_24.x | bash - <br/>
- apt install -y nodejs <br/>
  (Node genau so über apt installieren, **nicht** über nvm: nvm-Node liegt in `/root` und ist für den Service unsichtbar, er bricht dann mit `node: No such file or directory` ab) <br/>
- git clone https://github.com/xipiet/ArtmosphereWebpage.git /opt/artmosphere <br/>
- cd /opt/artmosphere <br/>
- npm ci <br/>
- npm run build <br/>
- `/etc/systemd/system/artmosphere.service` anlegen:

```ini
[Unit]
Description=Artmosphere Webseite
After=network.target

[Service]
WorkingDirectory=/opt/artmosphere
ExecStart=/opt/artmosphere/node_modules/.bin/serve -l 3000 -L --no-port-switching
Environment=NO_UPDATE_CHECK=1
User=www-data
Restart=always

[Install]
WantedBy=multi-user.target
```

- systemctl daemon-reload <br/>
- systemctl enable --now artmosphere <br/>
- Nginx Proxy Manager: `web.artmosphere.cc` → `http://<IP>:3000` <br/>

## Update

- cd /opt/artmosphere <br/>
- git pull <br/>
- npm ci <br/>
- npm run build <br/>
- systemctl restart artmosphere <br/>
