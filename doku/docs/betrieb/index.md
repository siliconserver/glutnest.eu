# Für Administratoren

Dieser Teil richtet sich an die Person, die Glutnest auf einem eigenen Server betreibt.
Nutzt ihr Glutnest in der Cloud, kümmern wir uns um all das, und ihr braucht diesen
Teil nicht.

Glutnest läuft als Docker-Compose-Projekt auf einem Linux-Server. Ihr braucht:

- einen Server mit Docker und Docker Compose, zum Beispiel einen kleinen virtuellen
  Server oder einen Rechner im Gerätehaus. Als Richtwert für eine Wehr mit rund
  150 Aktiven: 2 CPU-Kerne, 4 GB Arbeitsspeicher, 40 GB Platte.
- eine Domain oder Subdomain, z. B. `glutnest.feuerwehr-musterstadt.de`
- Ports 80 und 443 von außen erreichbar, wenn Glutnest das Zertifikat selbst holt
- einen Mailserver für Erinnerungen (optional, aber empfohlen)

Kapitel:

- [Installation](installation.md)
- [Reverse Proxy](proxy.md): vorhandenes Traefik, nginx oder Caddy
- [Updates](updates.md)
- [Backup und Wiederherstellung](backup.md)
- [Mailserver](mail.md)
- [Sicherheit](sicherheit.md)
