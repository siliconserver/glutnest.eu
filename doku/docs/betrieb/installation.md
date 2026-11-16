# Installation

## 1. Dateien und Zugang

Mit der Lizenz bekommt ihr die Zugangsdaten zum Container-Register und die Dateien
`docker-compose.yml`, `docker-compose.override.example.yml`, `.env.example` und den
Ordner `docker/`. Legt sie in einen Ordner
auf dem Server, z. B. `/opt/glutnest`, und meldet euch einmal am Register an:

```sh
docker login ghcr.io
```

## 2. Einstellungen

```sh
cp .env.example .env
```

In der `.env` mindestens anpassen:

| Variable | Bedeutung |
|---|---|
| `GLUTNEST_DOMAIN` | Adresse, unter der Glutnest erreichbar ist |
| `ACME_EMAIL` | Mailadresse für Let's Encrypt |
| `DJANGO_SECRET_KEY` | langer Zufallswert, z. B. aus `openssl rand -base64 48` |
| `DJANGO_ALLOWED_HOSTS`, `DJANGO_CSRF_TRUSTED_ORIGINS` | eure Domain |
| `POSTGRES_PASSWORD`, `POSTGRES_APP_PASSWORD` | zwei verschiedene, lange Passwörter |
| `BACKUP_PASSWORT` | Passwort für die Verschlüsselung der Backups |

!!! danger "DJANGO_SECRET_KEY nie ändern"
    Mit diesem Schlüssel sind Bankverbindungen, Gesundheitsdaten und die
    Zwei-Faktor-Anmeldungen verschlüsselt. Ändert er sich, sind diese Daten nicht mehr
    lesbar. Bewahrt ihn zusammen mit dem Backup-Passwort sicher außerhalb des Servers auf.

## 3. Starten

```sh
docker compose pull
docker compose up -d
```

Glutnest holt das HTTPS-Zertifikat selbst bei Let's Encrypt. Läuft auf dem Server schon
ein Reverse Proxy, siehe [Reverse Proxy](proxy.md).

## 4. Einrichtung im Browser

Öffnet die Adresse im Browser. Glutnest fragt nach einem **Einrichtungscode**:

```sh
docker compose exec web python manage.py einrichtungscode
```

Danach legt ihr die Wehr mit Bundesland und Standorten an und das erste Konto mit
Verwaltungsrechten. Glutnest legt passende Kataloge und Rollenvorlagen für euer
Bundesland an. Sobald es ein Konto gibt, ist die Einrichtung abgeschaltet.

## Aufbau

Nach der Installation sieht der Ordner so aus:

```
/opt/glutnest/
├── docker-compose.yml            # Dienste von Glutnest, kommt mit jeder Version
├── docker-compose.override.yml   # optional: eure eigenen Anpassungen
├── .env                          # eure Einstellungen und Passwörter
├── docker/                       # Hilfsdateien (Backup, Datenbank-Einrichtung)
└── data/                         # alle Daten von Glutnest
```

- **`docker-compose.yml`** beschreibt, welche Dienste laufen und wie sie zusammenhängen.
  Diese Datei gehört zu Glutnest und wird bei Updates ersetzt. Ändert sie deshalb nicht
  selbst.
- **`.env`** enthält alles, was eure Installation ausmacht: Domain, Passwörter, Version
  und Proxy-Einstellungen. Die `docker-compose.yml` liest ihre Werte daraus.
- **`data/`** enthält Datenbank, hochgeladene Dateien, Backups und Zertifikate. Diesen
  Ordner sichert ihr, siehe [Backup](backup.md).

### Die Dienste

| Dienst | Aufgabe |
|---|---|
| `web` | die Anwendung |
| `worker`, `beat` | Hintergrundaufgaben und Zeitplan (Mails, Sicherungen, Update-Hinweis) |
| `db` | PostgreSQL-Datenbank |
| `redis` | Warteschlange |
| `backup` | nächtliches Backup |
| `rechte` | läuft einmal beim Start und setzt die Rechte auf die Datenordner |
| `traefik` | HTTPS und Zertifikate (abschaltbar über `COMPOSE_PROFILES`) |

`web`, `worker` und `beat` nutzen dasselbe Glutnest-Image. Welche Version läuft, legt
`GLUTNEST_VERSION` in der `.env` fest.

## Eigene Anpassungen

Braucht ihr etwas, das die `.env` nicht abdeckt, legt ihr neben die
`docker-compose.yml` eine Datei `docker-compose.override.yml`. Docker Compose liest
sie automatisch mit ein und legt sie über die mitgelieferte Datei. Ihr schreibt nur
hinein, was anders sein soll. Bei Updates bleibt sie unberührt.

Beispiele:

```yaml
services:
  # Glutnest ohne eigenes Traefik nur lokal für nginx oder Caddy freigeben
  web:
    ports:
      - "127.0.0.1:8000:8000"

  # Arbeitsspeicher für die Hintergrundaufgaben begrenzen
  worker:
    mem_limit: 1g
```

Für ein schon vorhandenes Traefik liegt eine fertige Vorlage bei, siehe
[Reverse Proxy](proxy.md).

Ob alles richtig zusammengesetzt ist, zeigt:

```sh
docker compose config
```

!!! tip
    Steht eine Einstellung auch in der `.env`, ändert sie dort. Die Override-Datei ist
    für alles andere gedacht, zum Beispiel Ports, Netzwerke, zusätzliche Ordner oder
    Grenzen für Speicher und CPU.
