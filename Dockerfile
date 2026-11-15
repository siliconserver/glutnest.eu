# Statische Webseite glutnest.eu, ausgeliefert von nginx ohne Root-Rechte.
FROM nginxinc/nginx-unprivileged:1.27-alpine

LABEL org.opencontainers.image.title="glutnest.eu" \
      org.opencontainers.image.description="Produkt-Webseite für Glutnest" \
      org.opencontainers.image.source="https://github.com/siliconserver/glutnest.eu"

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --chown=nginx:nginx index.html 404.html robots.txt sitemap.xml /usr/share/nginx/html/
COPY --chown=nginx:nginx assets /usr/share/nginx/html/assets
COPY --chown=nginx:nginx bilder /usr/share/nginx/html/bilder
COPY --chown=nginx:nginx roadmap /usr/share/nginx/html/roadmap
COPY --chown=nginx:nginx impressum /usr/share/nginx/html/impressum
COPY --chown=nginx:nginx datenschutz /usr/share/nginx/html/datenschutz

EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1:8080/healthz || exit 1
