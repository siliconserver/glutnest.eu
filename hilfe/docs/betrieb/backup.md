# Backup und Wiederherstellung

## Nächtliches Backup

Der Dienst `backup` sichert jede Nacht Datenbank und Dateien nach
`data/backup/JJJJ-MM-TT_HHMM/`.

| Variable | Standard | Bedeutung |
|---|---|---|
| `BACKUP_UHRZEIT` | `02:30` | Uhrzeit der Sicherung |
| `BACKUP_TAGE` | `14` | ältere Sicherungen werden gelöscht |
| `BACKUP_PASSWORT` | leer | verschlüsselt die Sicherung (dringend empfohlen) |

```sh
docker compose run --rm backup jetzt     # sofort sichern
docker compose run --rm backup liste     # vorhandene Sicherungen
docker compose logs backup               # Protokoll
```

!!! warning "Außer Haus lagern"
    Eine Sicherung auf derselben Platte schützt nicht vor Plattenschaden, Brand oder
    Verschlüsselungstrojanern. Kopiert `data/backup` regelmäßig auf ein anderes System,
    zum Beispiel ein NAS oder einen Speicher in Deutschland.

## Wiederherstellen

```sh
docker compose stop web worker beat
docker compose run --rm backup liste
docker compose run --rm backup wiederherstellen 2026-11-14_0230
docker compose start web worker beat
```

Bei einer verschlüsselten Sicherung muss `BACKUP_PASSWORT` das Passwort von damals sein.
Die Wiederherstellung läuft in einem Schritt: Schlägt sie fehl, bleibt die Datenbank
unverändert.

**Auf einem neuen Server:** Glutnest wie bei der [Installation](installation.md)
einrichten, mit **demselben** `DJANGO_SECRET_KEY`, einmal starten, die Sicherung nach
`data/backup/` kopieren und wie oben zurückspielen.

Zusätzlich kann jede Wehr ihre eigenen Daten sichern, siehe
[Sicherung der Wehr](../verwaltung/sicherung.md).
