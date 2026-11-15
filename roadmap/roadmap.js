const ISSUES = "https://github.com/siliconserver/glutnest.eu/issues/";
const issue = n => `<a class="chip" href="${ISSUES}${n}">#${n}</a>`;

const releases = [
  { v: "0.22.0", d: "15.11.", t: "Ganze Plattform wiederherstellen", p: [
    ["Notfall-Wiederherstellung aller Wehren aus einer Sicherung"],
    ["Wartungsseite während des Zurückspielens, danach automatisch aktuell"]] },
  { v: "0.21.0", d: "15.11.", t: "Datenschutz (DSGVO)", p: [
    ["Aufbewahrungsfristen je Wehr, Glutnest zeigt Abgelaufenes an", 27],
    ["Datenauskunft je Person als ZIP, auch unter „Meine Daten“", 27],
    ["Mitglied nach Austritt löschen, Unterlagen der Wehr bleiben", 27],
    ["Gefahrstoff-Exposition an Einsätzen und Diensten vermerken", 27],
    ["Vorlagen für Verarbeitungsverzeichnis, TOM und AVV", 27]] },
  { v: "0.20.0", d: "15.11.", t: "Wiederherstellen aus Plattform-Sicherung", p: [
    ["Einzelne Wehren aus einer Sicherung der Plattform zurückholen"],
    ["Heruntergeladene Sicherung einer Wehr wieder hochladen"]] },
  { v: "0.19.0", d: "15.11.", t: "Backup jederzeit auslösen", p: [
    ["„Jetzt sichern“ und Zustand des Backup-Dienstes auf einen Blick"]],
    fix: "Klare Hinweise, wenn der Server Sicherungen nicht speichern kann" },
  { v: "0.18.0", d: "15.11.", t: "Ersteinrichtung & Plattform-Lizenz", p: [
    ["Ersteinrichtung im Browser in drei Schritten", 30],
    ["Mehrere Wehren auf einem Server mit Plattform-Lizenz", 12]] },
  { v: "0.17.0", d: "15.11.", t: "Lizenz", p: [
    ["Lizenz mit Laufzeit, Benutzerzahl und Modulen, offline geprüft", 12],
    ["Alle Updates inklusive, solange die Lizenz gilt", 12],
    ["Grundpaket immer dabei, Zusatzmodule einzeln wählbar", 12],
    ["30 Tage Testbetrieb mit allen Modulen", 12]] },
  { v: "0.16.0", d: "14.11.", t: "Sicherung & Plattform-Verwaltung", p: [
    ["Sicherung und Wiederherstellung je Wehr in den Einstellungen", 46],
    ["Plattform-Verwaltung im Glutnest-Design mit Backup-Verlauf", 50]],
    fix: "0.16.1: Wünsche und Fehler jetzt öffentlich auf GitHub" },
  { v: "0.15.0", d: "14.11.", t: "Kommunikation & Kleiderkammer", p: [
    ["Mitteilungen, Umfragen und Dokumentenablage", 22],
    ["Kleiderkammer & PSA mit Lebensdauer und Prüfungen", 21],
    ["Nachweise (PDF/Foto) an Qualifikationen, Ehrungen …", 48],
    ["Einsatzort auf OpenStreetMap-Karte", 49],
    ["Mailserver je Wehr, Backup-Status per Mail", 46],
    ["Content-Security-Policy für alle Seiten"]] },
  { v: "0.14.0", d: "14.11.", t: "Protokoll, Statistik & Kalender", p: [
    ["Audit-Log, manipulationssicher, 1 Jahr Aufbewahrung", 32],
    ["Statistik je Jahr/Standort, Jahresbericht als PDF", 23],
    ["Kalender mit Zu-/Absagen und iCal-Abo", 20]],
    fix: "0.14.1 / 0.14.2: Dienstgrad-Historie, Funktion FEZ" },
  { v: "0.13.0", d: "14.11.", t: "Ehrungen & Jubiläen", p: [
    ["Ehrungskatalog (RLP vorbelegt), fällige Ehrungen", 34],
    ["Jubiläen, runde Geburtstage, Dienstjahre"]] },
  { v: "0.12.0", d: "14.11.", t: "Automatische Backups", p: [
    ["Tägliche Sicherung, optional verschlüsselt", 31],
    ["Wiederherstellung mit Prüfsummen, in CI getestet"]] },
  { v: "0.11.0", d: "14.11.", t: "Fälligkeiten & Erinnerungen", p: [
    ["Startseite zeigt Fälliges nach eigenen Rechten", 39],
    ["Erinnerungs-Mails zu Qualifikationen und Mängeln", 35]] },
  { v: "0.10.0", d: "14.11.", t: "Einstellungen", p: [
    ["Einstellungsmenü mit Reitern je Recht"],
    ["Standorte/Gruppen im Browser, eigene Funktionen & Qualifikationen", 45]] },
  { v: "0.9.0", d: "14.11.", t: "Übungen & Dienste", p: [
    ["Dienstplanung je Standort/Gruppe", 6],
    ["Anwesenheit per Antippen, auch am Handy"],
    ["Auswertung je Mitglied, Atemschutz aus Übung"]] },
  { v: "0.8.0", d: "14.11.", t: "Leitstellen-Import", p: [
    ["Einsatz aus iSE Cobra 4 (MAÜ-XML) übernehmen", 44],
    ["Datensparsam: keine Melder- oder Patientendaten"]] },
  { v: "0.7.0", d: "14.11.", t: "Einsatzberichte", p: [
    ["Einsatzbericht mit Kräften, Fahrzeugen, Geräten", 5],
    ["Freigabe Entwurf → geprüft → abgeschlossen"],
    ["Fahrtenbuch- und Atemschutz-Übernahme, Druckansicht"]],
    fix: "0.7.1: Anhänge mit Bezeichnung, Fotogalerie" },
  { v: "0.6.0", d: "14.11.", t: "Atemschutz", p: [
    ["Geräteträger mit berechneter Einsatzbereitschaft", 9],
    ["G 26.3 verschlüsselt mit eigenem Recht"]] },
  { v: "0.5.0", d: "14.11.", t: "Geräte & Prüfungen", p: [
    ["Inventar, Prüfarten nach DGUV/DIN, Prüfprotokolle", 8],
    ["QR-Etiketten, Beladeplan je Fahrzeug", 38]] },
  { v: "0.4.0", d: "13.11.", t: "Fahrzeuge", p: [
    ["Fahrzeugstamm, Fristen, Fahrtenbuch, Mängel", 7],
    ["Seite „Über Glutnest“, automatische Releases", 40]] },
  { v: "0.3.0", d: "13.11.", t: "Personal & Qualifikationen", p: [
    ["Mitglieder, Qualifikationen, Funktionen, Dienstgrade", 4],
    ["Bankverbindung verschlüsselt, „Meine Daten“, CSV"]] },
  { v: "0.2.0", d: "13.11.", t: "Rollen, 2FA & Themes", p: [
    ["Frei konfigurierbare Rollen, Pflicht-2FA (TOTP)", 3],
    ["Themes Wache/Klar/Leitstand, Hell/Dunkel, Logo", 29]] },
  { v: "0.1.0", d: "13.11.", t: "Grundgerüst", p: [
    ["Django, Mandanten mit Row-Level-Security", 2],
    ["Docker Compose mit Traefik, Image in GHCR"]] },
];

document.getElementById("erledigt").innerHTML = releases.map(r => `
  <article class="release">
    <div class="release-kopf"><span class="chip version">v${r.v}</span><span class="datum">${r.d}2026</span></div>
    <h3>${r.t}</h3>
    <ul>${r.p.map(([text, n]) => `<li>${text}${n ? issue(n) : ""}</li>`).join("")}</ul>
    ${r.fix ? `<div class="fix">${r.fix}</div>` : ""}
  </article>`).join("");

const karte = ([n, titel, text]) => `
  <div class="karte"><h3>${titel} ${issue(n)}</h3><p>${text}</p></div>`;

document.getElementById("phase1").innerHTML = [
  [26, "Sicherheit", "Als Nächstes: Grundschutz steht (2FA, CSP, Verschlüsselung, Trennung der Wehren); offen sind regelmäßige Sicherheitsprüfungen und ein Pentest vor dem Verkauf"],
  [11, "Bundesländer-Konfiguration", "Kataloge, Begriffe, Fristen und Statistikfelder je Land; RLP zuerst"],
  [10, "Datenimport", "Arigon, MP Feuer, Divera und Excel/CSV mit Feldzuordnung, Vorschau und Probelauf; vorerst zurückgestellt"],
].map(karte).join("");

document.getElementById("phase2").innerHTML = [
  [33, "Mehrere Standorte je Mitglied", "Mitgliedschaft in mehreren Standorten und Gruppen mit Historie"],
  [36, "PDF-Export Mitgliederlisten", "Gefilterte Liste als PDF mit Wehrlogo"],
  [43, "Einsatzberichte: Reste", "Serverseitiges PDF, Stichworte je Land, Vier-Augen-Prüfung, defekte Geräte melden"],
  [41, "Geräte: Sammelprüfung & Soll/Ist", "Viele Geräte in einem Durchgang prüfen, Soll-Beladung, Gerätetausch"],
].map(karte).join("");

const spaeter = [
  [14, "Alarmierung", "PWA-Push, Rückmeldung komme/komme nicht, Verfügbarkeit, Alarmmonitor"],
  [15, "Native Apps iOS/Android", "Zuverlässige, laute Alarmierung und mobile Erfassung"],
  [16, "SMS- und Sprachanruf-Gateway", "Rückfallebene der Alarmierung"],
  [17, "Leitstelle, DME, Sirenen", "Alarmeingang automatisch übernehmen (Fax/Mail, FMS/ZVEI/POCSAG)"],
  [18, "Single Sign-on (OIDC)", "Microsoft 365, Google, Keycloak; Gruppen zu Rollen"],
  [19, "Dienstplan & Bereitschaften", "Bereitschaften, Tagesverfügbarkeit, Diensttausch"],
  [24, "Jugend- und Kinderfeuerwehr", "Erziehungsberechtigte, Einverständnisse, Leistungsabzeichen, Übertritt"],
  [25, "SaaS-Betrieb", "Mandantenverwaltung, Selbstregistrierung, Abrechnung"],
  [37, "Fahrtenbuch am Fahrzeug-Tablet", "Touch-Fahrtenbuch mit Unterschrift und Gerätekonto"],
  [47, "Landesstatistik-Export", "Jahreszahlen im Format der Landesstatistik (RLP zuerst), bewusst verschoben"],
  [28, "Mehrsprachigkeit", "Österreich und Schweiz, vorgemerkt für ca. 2027"],
];
document.getElementById("spaeter").innerHTML = spaeter.map(([n, titel, text]) => `
  <div class="eintrag"><span><span class="titel">${titel}</span><span class="text">${text}</span></span>${issue(n)}</div>`).join("");

/* Hell/Dunkel */
const wurzel = document.documentElement;
const knoepfe = document.querySelectorAll(".umschalter button");
function setze(wert) {
  if (wert === "auto") delete wurzel.dataset.darstellung; else wurzel.dataset.darstellung = wert;
  knoepfe.forEach(b => b.setAttribute("aria-pressed", String(b.dataset.wert === wert)));
  try { localStorage.setItem("glutnest-darstellung", wert); } catch (e) {}
}
knoepfe.forEach(b => b.addEventListener("click", () => setze(b.dataset.wert)));
let start = new URLSearchParams(location.search).get("darstellung");
try { start = start || localStorage.getItem("glutnest-darstellung"); } catch (e) {}
setze(start || "auto");
