/* PoródNaMiarę.pl — bramka zgody art. 38 ust. 1 pkt 13 ustawy o prawach konsumenta.
   Każdy link do PayHip na stronie produktowej zostaje zablokowany do czasu, aż klient
   świadomie zaznaczy zgodę na natychmiastowe dostarczenie treści cyfrowej i przyjmie do
   wiadomości utratę ustawowego prawa odstąpienia. Dowód zgody (kliknięcie) jest po stronie
   klienta ORAZ egzekwowany technicznie — bez zaznaczenia zakup jest niemożliwy z tej strony.
   Zgoda jest per-strona: dotyczy wyłącznie danego produktu. */
(function () {
  'use strict';
  function init() {
    var links = Array.prototype.slice.call(
      document.querySelectorAll('a[href*="payhip.com"]')
    );
    if (!links.length) return;

    var LABEL = 'Zgadzam się na natychmiastowe dostarczenie treści cyfrowej i przyjmuję do ' +
      'wiadomości utratę prawa odstąpienia od umowy (art. 38 ust. 1 pkt 13 ustawy o prawach ' +
      'konsumenta). Zachowuję 30-dniową gwarancję zwrotu. Szczegóły w ';

    links.forEach(function (link, idx) {
      if (link.dataset.gated === '1') return;
      link.dataset.gated = '1';

      // stan zablokowany
      function lock() {
        link.classList.add('pointer-events-none', 'opacity-50');
        link.setAttribute('aria-disabled', 'true');
      }
      function unlock() {
        link.classList.remove('pointer-events-none', 'opacity-50');
        link.removeAttribute('aria-disabled');
      }
      lock();

      // checkbox + etykieta, wstawione bezpośrednio przed przyciskiem
      var wrap = document.createElement('label');
      wrap.className = 'flex items-start gap-2 text-[13px] text-ink/80 leading-snug ' +
        'max-w-md mx-auto mb-3 text-left cursor-pointer';
      var cbId = 'pnm-consent-' + idx;
      wrap.setAttribute('for', cbId);

      var cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.id = cbId;
      cb.className = 'mt-0.5 flex-shrink-0';

      var span = document.createElement('span');
      span.appendChild(document.createTextNode(LABEL));
      var a = document.createElement('a');
      a.href = '/regulamin';
      a.className = 'underline';
      a.textContent = 'regulaminie';
      span.appendChild(a);
      span.appendChild(document.createTextNode('.'));

      wrap.appendChild(cb);
      wrap.appendChild(span);
      link.parentNode.insertBefore(wrap, link);

      cb.addEventListener('change', function () {
        if (cb.checked) unlock(); else lock();
      });

      // twarde zabezpieczenie: nawet przy próbie kliknięcia klawiaturą/JS-em bez zgody
      link.addEventListener('click', function (e) {
        if (!cb.checked) { e.preventDefault(); cb.focus(); }
      });
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
