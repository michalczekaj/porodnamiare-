/* PoródNaMiarę.pl — ostrzeżenie dla przeglądarek wbudowanych w aplikacje (audyt 2026-09-25).
   Problem: w Instagramie / Facebooku / Messengerze / TikToku strona otwiera się w przeglądarce
   aplikacji. Ona ma OSOBNĄ pamięć (localStorage) — odpowiedzi z kreatora i znacznik zakupu nie
   przechodzą do Safari/Chrome, a pobranie PDF (jsPDF → plik) często w ogóle nie działa.
   Link „Kup" otwiera się w nowej karcie, więc PayHip i /dziekujemy mogą trafić do innej przeglądarki
   niż kreator → klient płaci i nie może pobrać planu.
   Dołączyć na /kreator i /dziekujemy (opcjonalnie wszędzie):
     <script src="/js/inapp-browser.js?v=1" defer></script> */
(function () {
  'use strict';
  var ua = navigator.userAgent || '';
  var inApp = /FBAN|FBAV|FB_IAB|FBIOS|Instagram|Messenger|Line\/|TikTok|musical_ly|Snapchat|Pinterest|LinkedInApp/i.test(ua) ||
              (/Android/.test(ua) && /; wv\)/.test(ua));
  if (!inApp) return;
  var ios = /iPhone|iPad|iPod/.test(ua);

  var T = {
    pl: [ios ? 'Otwierasz stronę w przeglądarce aplikacji. Aby zapisać odpowiedzi i pobrać PDF, otwórz ją w Safari: menu ••• lub ⋯ → „Otwórz w przeglądarce".'
             : 'Otwierasz stronę w przeglądarce aplikacji. Aby zapisać odpowiedzi i pobrać PDF, otwórz ją w Chrome: menu ⋮ → „Otwórz w Chrome".', 'Kopiuj link', 'Skopiowano ✓'],
    en: [ios ? 'You are in an in-app browser. To save your answers and download the PDF, open this page in Safari: ••• menu → "Open in browser".'
             : 'You are in an in-app browser. To save your answers and download the PDF, open this page in Chrome: ⋮ menu → "Open in Chrome".', 'Copy link', 'Copied ✓'],
    de: [ios ? 'Sie nutzen den Browser einer App. Um Antworten zu speichern und das PDF herunterzuladen, öffnen Sie die Seite in Safari: Menü ••• → „Im Browser öffnen".'
             : 'Sie nutzen den Browser einer App. Um Antworten zu speichern und das PDF herunterzuladen, öffnen Sie die Seite in Chrome: Menü ⋮ → „In Chrome öffnen".', 'Link kopieren', 'Kopiert ✓'],
    uk: [ios ? 'Ви відкрили сторінку у вбудованому браузері застосунку. Щоб зберегти відповіді й завантажити PDF, відкрийте її в Safari: меню ••• → «Відкрити в браузері».'
             : 'Ви відкрили сторінку у вбудованому браузері застосунку. Щоб зберегти відповіді й завантажити PDF, відкрийте її в Chrome: меню ⋮ → «Відкрити в Chrome».', 'Копіювати посилання', 'Скопійовано ✓'],
    ru: [ios ? 'Вы открыли страницу во встроенном браузере приложения. Чтобы сохранить ответы и скачать PDF, откройте её в Safari: меню ••• → «Открыть в браузере».'
             : 'Вы открыли страницу во встроенном браузере приложения. Чтобы сохранить ответы и скачать PDF, откройте её в Chrome: меню ⋮ → «Открыть в Chrome».', 'Копировать ссылку', 'Скопировано ✓']
  };
  var lang = 'pl';
  try { lang = localStorage.getItem('lang') || document.documentElement.lang || 'pl'; } catch (e) {}
  var t = T[lang] || T.pl;

  function show() {
    if (document.getElementById('pnmInApp')) return;
    var b = document.createElement('div');
    b.id = 'pnmInApp';
    b.setAttribute('role', 'alert');
    b.style.cssText = 'position:sticky;top:0;z-index:9998;background:#FCD34D;color:#3A3341;padding:12px 16px;' +
                      'font:600 14px/1.45 Figtree,system-ui,sans-serif;text-align:center';
    var p = document.createElement('p');
    p.style.margin = '0 0 8px';
    p.textContent = t[0];
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = t[1];
    btn.style.cssText = 'background:#3E3852;color:#fff;border:0;border-radius:999px;padding:8px 16px;font:inherit;cursor:pointer';
    btn.addEventListener('click', function () {
      var url = location.href;
      var done = function () { btn.textContent = t[2]; };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(done, function () { window.prompt('', url); });
      else window.prompt('', url);
    });
    b.appendChild(p);
    b.appendChild(btn);
    document.body.insertBefore(b, document.body.firstChild);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', show); else show();
})();
