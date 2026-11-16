# Pflege der Webseite glutnest.eu

Produkt-Webseite für Glutnest, die Feuerwehr-Verwaltung. Reines HTML/CSS ohne Build-Schritt, ohne externe Schriften, Skripte oder Tracker.

## Aufbau

| Pfad | Inhalt |
|---|---|
| `index.html` | Startseite |
| `roadmap/` | Roadmap (Stand wird von Hand gepflegt) |
| `impressum/`, `datenschutz/` | Rechtstexte |
| `assets/` | CSS, Hell/Dunkel-Umschalter, Favicon |
| `bilder/` | Screenshots aus Glutnest (nur Beispieldaten, WebP) |

## Lokal ansehen

```sh
python3 -m http.server 8000
# http://localhost:8000
```

## Veröffentlichung

Die Seite läuft als Docker-Container (nginx ohne Root-Rechte, Port 8080) hinter Traefik.

- Jeder Merge nach `main` baut über GitHub Actions (`.github/workflows/image.yml`) das Image `ghcr.io/siliconserver/glutnest.eu` für amd64 und arm64 und veröffentlicht es mit den Tags `latest`, `main` und `sha-…`. Git-Tags `v1.2.3` ergeben zusätzlich `1.2.3`.
- Pull Requests bauen das Image nur zum Test, ohne es zu veröffentlichen.
- `Dockerfile` und `docker/nginx.conf` legen fest, was ausgeliefert wird. Neue Ordner der Seite müssen im `Dockerfile` und in `.dockerignore` ergänzt werden.

### Lokal als Container testen

```sh
docker build -t glutnest-web .
docker run --rm -p 8080:8080 glutnest-web
# http://localhost:8080
```

### Auf dem Server

1. `deploy/docker-compose.yml` z. B. nach `/opt/glutnest-web/` kopieren. Die Voreinstellungen passen zum vorhandenen Traefik (Netz `proxy`, Entrypoint `websecure`, Zertifikat über `letsencryptdns`).
2. DNS: `glutnest.eu` und `www.glutnest.eu` als A-/AAAA-Record auf den Server zeigen lassen. `www` leitet auf `glutnest.eu` um.
3. Falls das Paket auf ghcr.io privat ist: einmal `docker login ghcr.io` mit einem Token mit `read:packages`, oder das Paket unter GitHub → Packages → glutnest.eu → Package settings auf **Public** stellen.
4. Starten bzw. aktualisieren:

```sh
docker compose pull && docker compose up -d
```

Wer automatisch aktualisieren will, kann z. B. Watchtower nur für diesen Container einsetzen.

## Screenshots tauschen

Bilder als WebP (ca. 1280 px breit) nach `bilder/` legen. Keine echten Personendaten verwenden.

## Dokumentation (/doku/)

Quelle in `doku/` (MkDocs Material, Markdown unter `doku/docs/`, Navigation in
`doku/mkdocs.yml`). Gebaut wird im Dockerfile (erste Stufe); `inline_auslagern.py`
verschiebt die Inline-Skripte von Material in Dateien, damit die CSP ohne
`unsafe-inline` auskommt. Lokal ansehen:

```sh
pip install -r doku/requirements.txt
cd doku && mkdocs serve
```

Glutnest verlinkt einzelne Seiten direkt (Link unten auf jeder Seite). Seiten nicht
umbenennen, ohne die Zuordnung in Glutnest (`core/doku.py`) anzupassen.
