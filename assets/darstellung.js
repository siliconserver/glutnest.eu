/* Hell/Dunkel/Auto, Wahl wird lokal im Browser gemerkt (kein Cookie). */
(function () {
  var wurzel = document.documentElement;
  var schluessel = "glutnest-darstellung";
  function setze(wert) {
    if (wert === "auto") delete wurzel.dataset.darstellung; else wurzel.dataset.darstellung = wert;
    document.querySelectorAll(".umschalter button").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.wert === wert));
    });
    try { localStorage.setItem(schluessel, wert); } catch (e) {}
  }
  var start = new URLSearchParams(location.search).get("darstellung");
  try { start = start || localStorage.getItem(schluessel); } catch (e) {}
  start = start || "auto";
  setze(start);
  document.addEventListener("DOMContentLoaded", function () { setze(wurzel.dataset.darstellung || "auto"); });
  document.addEventListener("click", function (e) {
    var b = e.target.closest(".umschalter button");
    if (b) setze(b.dataset.wert);
  });
})();

/* Menü auf dem Handy auf- und zuklappen. */
(function () {
  function schalte(nav, offen) {
    nav.classList.toggle("offen", offen);
    var k = nav.querySelector(".menue-knopf");
    k.setAttribute("aria-expanded", String(offen));
    k.setAttribute("aria-label", offen ? "Menü schließen" : "Menü öffnen");
  }
  document.addEventListener("click", function (e) {
    var nav = document.querySelector(".nav");
    if (!nav || !nav.querySelector(".menue-knopf")) return;
    if (e.target.closest(".menue-knopf")) schalte(nav, !nav.classList.contains("offen"));
    else if (e.target.closest(".nav-links a") || !e.target.closest(".nav")) schalte(nav, false);
  });
  document.addEventListener("keydown", function (e) {
    var nav = document.querySelector(".nav.offen");
    if (nav && e.key === "Escape") { schalte(nav, false); nav.querySelector(".menue-knopf").focus(); }
  });
})();

/* Aktuelle Glutnest-Version aus /version.json (wird bei jedem Release automatisch aktualisiert). */
document.addEventListener("DOMContentLoaded", function () {
  var ziele = document.querySelectorAll("[data-version]");
  if (!ziele.length || !window.fetch) return;
  fetch("/version.json", { cache: "no-cache" })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (d) {
      var m = d && /^(\d+)\.(\d+)/.exec(d.version || "");
      if (m) ziele.forEach(function (z) { z.textContent = m[1] + "." + m[2]; });
    })
    .catch(function () {});
});
