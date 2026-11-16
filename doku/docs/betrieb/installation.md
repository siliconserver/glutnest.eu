# Installation

## 1. Dateien und Zugang

Mit der Lizenz bekommt ihr die Zugangsdaten zum Container-Register und die Dateien
`docker-compose.yml`, `.env.example` und den Ordner `docker/`. Legt sie in einen Ordner
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

## Die Dienste

| Dienst | Aufgabe |
|---|---|
| `web` | die Anwendung |
| `worker`, `beat` | Hintergrundaufgaben und Zeitplan (Mails, Sicherungen, Update-Hinweis) |
| `db` | PostgreSQL-Datenbank |
| `redis` | Warteschlange |
| `backup` | nächtliches Backup |
| `traefik` | HTTPS und Zertifikate (abschaltbar) |

Alle Daten liegen im Ordner `data/` neben der `docker-compose.yml`.
