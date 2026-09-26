/* PoródNaMiarę.pl — „Ustawienia cookies" (audyt 2026-09-25).
   RODO art. 7 ust. 3: wycofanie zgody musi być tak łatwe jak jej udzielenie. Wcześniej jedyny sposób
   to było „wyczyszczenie danych strony w przeglądarce" (polityka prywatności, pkt 5).
   Skrypt sam dokłada w stopce, obok linku do polityki prywatności, przycisk „Ustawienia cookies"
   (w języku strony). Kliknięcie usuwa zapisaną decyzję i ciasteczka Google Analytics, a potem
   przeładowuje stronę — baner zgody pojawia się ponownie.
   Działa też każdy element z atrybutem data-cookie-settings.
   Dołączony na każdej stronie:  <script src="/js/cookie-settings.js?v=1" defer></script> */
(function () {
  'use strict';

  var LABEL = { pl: 'Ustawienia cookies', en: 'Cookie settings', de: 'Cookie-Einstellungen', uk: 'Налаштування cookie', ru: 'Настройки cookie' };

  function lang() {
    var l = '';
    try { l = localStorage.getItem('lang') || ''; } catch (e) {}
    if (!LABEL[l]) l = (document.documentElement.lang || 'pl').slice(0, 2);
    if (l === 'ua') l = 'uk';
    return LABEL[l] ? l : 'pl';
  }

  function clearGaCookies() {
    var host = location.hostname.replace(/^www\./, '');
    document.cookie.split(';').forEach(function (c) {
      var name = c.split('=')[0].trim();
      if (/^(_ga|_ga_.+|_gid|_gat.*)$/.test(name)) {
        ['', '; domain=' + host, '; domain=.' + host].forEach(function (d) {
          document.cookie = name + '=; Max-Age=0; path=/' + d;
        });
      }
    });
  }

  function reopen(e) {
    if (e) e.preventDefault();
    try {
      localStorage.removeItem('pnm_consent_analytics');
      localStorage.removeItem('pnm_cookie_consent'); // stary klucz z 2 artykułów blogowych
    } catch (x) {}
    clearGaCookies();
    location.reload();
  }

  function inject() {
    if (document.querySelector('[data-cookie-settings]')) return;
    var anchor = document.querySelector('footer a[href="/polityka-prywatnosci"]');
    var footer = document.querySelector('footer');
    if (!anchor && !footer) return;
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.setAttribute('data-cookie-settings', '');
    btn.textContent = LABEL[lang()];
    btn.style.cssText = 'background:none;border:0;padding:0;margin:0;color:inherit;font:inherit;cursor:pointer;text-decoration:underline';
    if (anchor) {
      anchor.parentNode.insertBefore(btn, anchor.nextSibling);
      anchor.parentNode.insertBefore(document.createTextNode(' · '), btn);
    } else {
      var p = document.createElement('p');
      p.style.cssText = 'margin-top:8px;text-align:center';
      p.appendChild(btn);
      footer.appendChild(p);
    }
    var sw = document.getElementById('langSwitch');
    if (sw) sw.addEventListener('change', function () { setTimeout(function () { btn.textContent = LABEL[lang()]; }, 0); });
  }

  document.addEventListener('click', function (e) {
    var t = e.target && e.target.closest ? e.target.closest('[data-cookie-settings]') : null;
    if (t) reopen(e);
  });
  window.pnmCookieSettings = reopen;

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', inject); else inject();
})();
