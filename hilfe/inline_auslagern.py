"""Verschiebt Inline-Skripte von MkDocs Material in eigene Dateien.

Die Webseite erlaubt per Content-Security-Policy nur Skripte vom eigenen Server
(script-src 'self'), keine Inline-Skripte. Nach `mkdocs build` landet jedes
Inline-Skript als Datei unter assets/javascripts/inline-<hash>.js und wird per
src eingebunden. Die Reihenfolge bleibt, die Skripte laufen weiter synchron.

Aufruf: python inline_auslagern.py <site-ordner> <basis-pfad, z. B. /hilfe/>
"""

import hashlib
import re
import sys
from pathlib import Path

INLINE = re.compile(r"<script>(.*?)</script>", re.S)


def main(site: Path, basis: str) -> int:
    ziel = site / "assets" / "javascripts"
    ziel.mkdir(parents=True, exist_ok=True)
    anzahl = 0

    def ersetzen(treffer: re.Match) -> str:
        nonlocal anzahl
        inhalt = treffer[1]
        name = f"inline-{hashlib.sha256(inhalt.encode()).hexdigest()[:12]}.js"
        (ziel / name).write_text(inhalt, encoding="utf-8")
        anzahl += 1
        return f'<script src="{basis}assets/javascripts/{name}"></script>'

    for datei in site.rglob("*.html"):
        text = datei.read_text(encoding="utf-8")
        neu = INLINE.sub(ersetzen, text)
        if neu != text:
            datei.write_text(neu, encoding="utf-8")
    rest = [str(d) for d in site.rglob("*.html") if INLINE.search(d.read_text("utf-8"))]
    if rest:
        print("Inline-Skripte übrig:", rest, file=sys.stderr)
        return 1
    print(f"{anzahl} Inline-Skripte ausgelagert")
    return 0


if __name__ == "__main__":
    sys.exit(main(Path(sys.argv[1]), sys.argv[2]))
