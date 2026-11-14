# glutnest.eu

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

Jeder Push bzw. Merge nach `main` veröffentlicht die Seite automatisch über GitHub Actions (`.github/workflows/pages.yml`) auf GitHub Pages.

Einmalige Einrichtung:

1. Repository → Settings → Pages → Source: **GitHub Actions**.
2. Custom domain: `glutnest.eu` (steht auch in `CNAME`), danach **Enforce HTTPS** aktivieren.
3. DNS beim Domain-Anbieter:
   - `glutnest.eu` A-Records: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - optional AAAA: `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`
   - `www.glutnest.eu` CNAME auf `siliconserver.github.io`
4. Empfohlen: Domain unter GitHub → Settings (Profil) → Pages verifizieren, damit niemand sonst sie übernehmen kann.

## Screenshots tauschen

Bilder als WebP (ca. 1280 px breit) nach `bilder/` legen. Keine echten Personendaten verwenden.
