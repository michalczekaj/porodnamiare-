/* PoródNaMiarę.pl — pomiar lejka sprzedaży (audyt 2026-09-25).
   Dziś serwis nie mierzy ŻADNEJ konwersji (jedyne zdarzenie w kodzie to video_play na /o-michale).
   Ten moduł:
     1) udostępnia window.pnmTrack(nazwa, {parametry}) — wysyła do Plausible (zawsze, bez cookies)
        i do GA4 (tylko jeśli użytkownik wyraził zgodę i gtag jest załadowany),
     2) automatycznie liczy: klik „Kup" (z pakietem), klik WhatsApp, pobranie darmowego wzoru,
        zapis e-mail w formularzach Brevo, oraz dowolny element z atrybutem data-pnm-event="Nazwa".
   Dołączyć na każdej stronie:  <script src="/js/pnm-analytics.js?v=1" defer></script>
   W Plausible: Settings → Goals → Add goal → Custom event — dodać nazwy z listy w README. */
(function () {
  'use strict';

  function track(name, props) {
    try { if (typeof window.plausible === 'function') window.plausible(name, props ? { props: props } : undefined); } catch (e) {}
    try { if (typeof window.gtag === 'function') window.gtag('event', name.replace(/\s+/g, '_').toLowerCase(), props || {}); } catch (e) {}
  }
  window.pnmTrack = track;

  var TIERS = { jUaCl: 'podstawowy', PAcED: 'premium', JjgRA: 'premiumplus' };

  // Faza capture na document — liczy także linki, które skrypty stron przepisują przy kliknięciu.
  document.addEventListener('click', function (e) {
    var t = e.target;
    if (!t || !t.closest) return;

    var custom = t.closest('[data-pnm-event]');
    if (custom) track(custom.getAttribute('data-pnm-event'));

    var a = t.closest('a[href]');
    if (!a) return;
    if (a.getAttribute('aria-disabled') === 'true') return; // zablokowany przez bramkę zgody — to nie jest checkout
    var href = a.getAttribute('href') || '';
    var key = a.getAttribute('data-payhip-key') || (/payhip\.com\/(?:b\/|buy\?link=)([A-Za-z0-9]+)/.exec(href) || [])[1];
    if (key) { track('Checkout', { produkt: TIERS[key] || key, strona: location.pathname }); return; }
    if (/wa\.me\//.test(href)) { track('WhatsApp', { strona: location.pathname }); return; }
    if (/\/pliki\/[^?#]+\.pdf/.test(href)) { track('Darmowy wzor PDF', { strona: location.pathname }); }
  }, true);

  document.addEventListener('submit', function (e) {
    var f = e.target;
    if (f && /sibforms\.com/.test(f.getAttribute('action') || '')) {
      track('Zapis e-mail', { formularz: f.id || 'popup', strona: location.pathname });
    }
  }, true);
})();
