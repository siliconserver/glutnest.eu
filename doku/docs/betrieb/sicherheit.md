# Sicherheit

Glutnest ist von Anfang an auf den Schutz persönlicher Daten ausgelegt:

- Zugriff nur über HTTPS, Zwei-Faktor-Anmeldung für alle Konten
- Sperre nach zu vielen Fehlversuchen bei Passwort und Code
- Rechte je Modul und Standort, Daten mehrerer Wehren auf Datenbankebene getrennt
- Bankverbindungen, Gesundheitsdaten und Zwei-Faktor-Geheimnisse verschlüsselt
- unveränderbares Protokoll aller Änderungen und Zugriffe auf sensible Daten
- Container laufen ohne Root-Rechte, das Image wird bei jeder Änderung auf bekannte
  Sicherheitslücken geprüft

Was ihr selbst tun solltet:

- Updates zeitnah einspielen
- `DJANGO_SECRET_KEY`, Datenbank- und Backup-Passwörter lang und zufällig wählen und
  außerhalb des Servers aufbewahren
- Backups außer Haus lagern
- Server-Betriebssystem aktuell halten, SSH nur mit Schlüssel

Eine Sicherheitslücke gefunden? Bitte an
[kontakt@glutnest.eu](mailto:kontakt@glutnest.eu), nicht öffentlich.
