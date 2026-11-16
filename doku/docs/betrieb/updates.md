# Updates

Gibt es eine neue Version, zeigt Glutnest im Seitenfuß **Update verfügbar** und auf der
Seite „Über Glutnest“ einen Hinweis. Was neu ist, steht dort in den Versionshinweisen.

So spielt ihr das Update ein:

```sh
cd /opt/glutnest
docker compose pull
docker compose up -d
```

Die Datenbank wird beim Start automatisch angepasst. Ein Backup vorher schadet nie:
`docker compose run --rm backup jetzt`.

Bringt ein Update eine neue `docker-compose.yml` oder neue Dateien im Ordner `docker/`
mit, steht das in den Versionshinweisen. Ersetzt dann diese Dateien. Eure `.env` und
eure `docker-compose.override.yml` bleiben, wie sie sind.

## Update-Hinweis abschalten

Glutnest fragt einmal am Tag `https://glutnest.eu/version.json` ab, ohne Angaben zur
Wehr. Hat der Server kein Internet, schaltet ihr das mit `GLUTNEST_UPDATE_URL=` (leer)
in der `.env` ab.
