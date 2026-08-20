/* PoródNaMiarę — inicjacja checkoutu PayHip (wspólne dla „/” oraz „/kreator”).
   Problem, który to rozwiązuje: mechanizm odblokowania (sid + znacznik zakupu + metadane
   w URL) był wcześniej ustawiany WYŁĄCZNIE w kreatorze. Klient kupujący pakiet ze strony
   głównej (albo skądkolwiek indziej) nie dostawał sid → webhook nie zapisywał claimu
   (martwa ścieżka JWT), a /dziekujemy nie miało z czego przyznać dostępu offline (pnm_paid)
   → po powrocie kreator znów żądał płatności.

   Ten moduł przechwytuje kliknięcie w link zakupu jednego z 3 pakietów kreatora
   (jUaCl / PAcED / JjgRA) na dowolnej stronie i:
     1) generuje jednorazowy sid,
     2) zapisuje pnm_sid + pnm_checkout (tier),
     3) przepisuje URL na udokumentowany format PayHip z metadanymi:
        https://payhip.com/buy?link=KEY&metadata[sid]=SID
   Klucz produktu czytany jest ze stabilnego źródła (data-payhip-key ustawianego raz przy
   podpięciu), więc wielokrotne kliknięcie / powrót z bfcache nie psują URL-a. */
(function () {
  'use strict';

  // Tylko 3 pakiety odblokowujące kreator. Pozostałe linki payhip (poradniki na stronach
  // produktów) świadomie POMIJAMY — ich zakup nie odblokowuje generatora PDF.
  var TIERS = { jUaCl: 'podstawowy', PAcED: 'premium', JjgRA: 'premiumplus' };

  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  function keyFromHref(h) { var m = /\/b\/([A-Za-z0-9]+)/.exec(h || ''); return m ? m[1] : null; }

  // UUID v4 — crypto.randomUUID → getRandomValues → Math.random (najsłabszy fallback).
  function uuid() {
    try { if (window.crypto && crypto.randomUUID) return crypto.randomUUID(); } catch (e) {}
    var b = null;
    try { if (window.crypto && crypto.getRandomValues) b = crypto.getRandomValues(new Uint8Array(16)); } catch (e) {}
    if (b) {
      b[6] = (b[6] & 0x0f) | 0x40; b[8] = (b[8] & 0x3f) | 0x80;
      var s = '', i;
      for (i = 0; i < 16; i++) { s += (b[i] + 256).toString(16).slice(1); if (i === 3 || i === 5 || i === 7 || i === 9) s += '-'; }
      return s;
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8); return v.toString(16);
    });
  }

  function bind(a) {
    if (a.__pnmCoBound) return;
    var key = a.getAttribute('data-payhip-key') || keyFromHref(a.getAttribute('href'));
    if (!key || !TIERS[key]) return;              // pomijamy linki spoza 3 pakietów kreatora
    a.setAttribute('data-payhip-key', key);       // stabilne źródło klucza (odporne na mutację href)
    a.__pnmCoBound = true;
    a.addEventListener('click', function () {
      // Hook: kreator zapisuje tu bieżące odpowiedzi zanim opuścimy stronę.
      try { if (typeof window.PNM_beforeCheckout === 'function') window.PNM_beforeCheckout(); } catch (e) {}
      var sid = uuid();
      lsSet('pnm_sid', sid);
      lsSet('pnm_sid_ts', String(Date.now()));
      lsSet('pnm_checkout', JSON.stringify({ tier: TIERS[key], key: key, ts: Date.now() }));
      a.href = 'https://payhip.com/buy?link=' + encodeURIComponent(key) + '&metadata[sid]=' + encodeURIComponent(sid);
    });
  }

  function scan() {
    var els = document.querySelectorAll('a[href*="payhip.com/b/"], .pay-link, #cta-podstawowy, #cta-premium, #cta-premiumplus');
    Array.prototype.forEach.call(els, bind);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', scan);
  else scan();

  // Umożliwia ponowne podpięcie po dynamicznym dołożeniu linków (np. zmiana języka).
  window.PNM_bindCheckoutLinks = scan;
})();
