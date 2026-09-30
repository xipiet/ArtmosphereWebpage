# Artmosphere - Orakel

- Web-Auftritt von Artmosphere <br/>

## Installation

- git clone <br/>
- cd ArtmosphereWebpage <br/>
- Node & npm installieren  <br/>
- curl -fsSL https://deb.nodesource.com/setup_24.x | sudo -E bash -
- sudo apt install -y nodejs
- npm init -y <br/>
- npm install <br/>
- npm install ogl <br/>
- npm install gsap <br/>
(sollte die benutzten packages automatisch installieren, ansonsten manuell)  <br/>
- npm run dev -- --host <br/>

### Aufsetzen auf dem Host

Läuft als systemd-Service `vite-dev` auf Port 5173. <br/>

- Repo nach `/root` klonen: `git clone https://github.com/xipiet/ArtmosphereWebpage.git`, dann Node + `npm install` wie oben <br/>
- `/etc/systemd/system/vite-dev.service` anlegen:

```ini
[Unit]
Description=ViteDevServer
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/root/ArtmosphereWebpage
ExecStart=/usr/bin/npm run dev -- --host
Restart=always
Environment=NODE_ENV=development

[Install]
WantedBy=multi-user.target
```

- sudo systemctl daemon-reload <br/>
- sudo systemctl enable --now vite-dev <br/>
- Nginx Proxy Manager: `web.artmosphere.cc` → `http://<IP>:5173` <br/>
- Neue Domains in `vite.config.js` unter `allowedHosts` eintragen, sonst blockt Vite <br/>

## Update

- sudo systemctl stop vite-dev <br/>
- cd /root/ArtmosphereWebpage <br/>
- git pull <br/>
- reboot <br/>
