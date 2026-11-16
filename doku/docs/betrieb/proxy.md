# Reverse Proxy

## Mitgeliefertes Traefik

Standard: `COMPOSE_PROFILES=traefik` in der `.env`. Glutnest startet ein eigenes Traefik,
das Zertifikate bei Let's Encrypt holt.

## Vorhandenes Traefik

1. `COMPOSE_PROFILES=` leer lassen.
2. `TRAEFIK_NETWORK` auf das Docker-Netzwerk eures Traefik setzen (`docker network ls`),
   `TRAEFIK_ENTRYPOINT` und `TRAEFIK_CERTRESOLVER` auf die Namen aus eurer Konfiguration.
3. `cp docker-compose.override.example.yml docker-compose.override.yml`
4. `docker compose up -d`

## nginx oder Caddy

`COMPOSE_PROFILES=` leer lassen und Port 8000 des Dienstes `web` nur lokal freigeben,
zum Beispiel über eine `docker-compose.override.yml` (siehe
[Eigene Anpassungen](installation.md#eigene-anpassungen)).
Der Proxy muss TLS übernehmen, `X-Forwarded-Proto: https` setzen und den `Host`-Header
unverändert weiterreichen. `GLUTNEST_PROXYS` gibt an, wie viele Proxys vor Glutnest
stehen (Standard 1).

```nginx
location / {
    proxy_pass http://127.0.0.1:8000;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto https;
}
```

```
glutnest.example.org {
    reverse_proxy 127.0.0.1:8000
}
```

!!! warning
    Port 8000 darf nicht direkt aus dem Internet erreichbar sein.
