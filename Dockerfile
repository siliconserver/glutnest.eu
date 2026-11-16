# Statische Webseite glutnest.eu, ausgeliefert von nginx ohne Root-Rechte.

# Handbuch (/hilfe/) mit MkDocs Material bauen. Inline-Skripte werden danach
# in Dateien ausgelagert, damit die strenge CSP (script-src 'self') greift.
FROM python:3.13-alpine AS hilfe
WORKDIR /hilfe
COPY hilfe/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY hilfe/ .
RUN NO_MKDOCS_2_WARNING=1 mkdocs build --strict -d /site \
    && python inline_auslagern.py /site /hilfe/ \
    && find /site -name "*.map" -delete

FROM nginxinc/nginx-unprivileged:1.27-alpine

LABEL org.opencontainers.image.title="glutnest.eu" \
      org.opencontainers.image.description="Produkt-Webseite für Glutnest" \
      org.opencontainers.image.source="https://github.com/siliconserver/glutnest.eu"

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --chown=nginx:nginx index.html 404.html robots.txt sitemap.xml version.json /usr/share/nginx/html/
COPY --chown=nginx:nginx assets /usr/share/nginx/html/assets
COPY --chown=nginx:nginx bilder /usr/share/nginx/html/bilder
COPY --chown=nginx:nginx roadmap /usr/share/nginx/html/roadmap
COPY --chown=nginx:nginx impressum /usr/share/nginx/html/impressum
COPY --chown=nginx:nginx datenschutz /usr/share/nginx/html/datenschutz
COPY --chown=nginx:nginx --from=hilfe /site /usr/share/nginx/html/hilfe

EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1:8080/healthz || exit 1
