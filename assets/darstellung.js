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
