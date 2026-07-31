/* PoródNaMiarę.pl — ochrona adresów e-mail przed botami zbierającymi adresy do spamu.
   Adres NIE występuje w kodzie źródłowym HTML w postaci czytelnej dla prostych scraperów —
   jest składany w przeglądarce z rozdzielonych fragmentów po załadowaniu strony. */
(function () {
  'use strict';
  function reveal() {
    document.querySelectorAll('.pnm-email').forEach(function (el) {
      var u = el.getAttribute('data-u'), d = el.getAttribute('data-d');
      if (!u || !d) return;
      var addr = u + '@' + d;
      if (el.tagName === 'A') {
        el.href = 'mailto:' + addr + (el.getAttribute('data-p') || '');
      }
      if (el.dataset.hide !== '1') el.textContent = addr;
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', reveal);
  } else {
    reveal();
  }
})();
