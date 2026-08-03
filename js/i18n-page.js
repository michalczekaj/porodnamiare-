/* Generyczny silnik tłumaczenia podstron (artykuły, o-michale itp.)
   Wymaga: window.PAGE_I18N = {en:{key:'...'}, de:{...}, uk:{...}}
   Elementy do tłumaczenia: <X data-i18n="key">tekst PL</X>
   Elementy z placeholderem: <input data-i18n-ph="key" placeholder="...">
*/
(function () {
  function init() {
    var I18N = window.PAGE_I18N || {};
    var sel = document.getElementById('langSwitch');
    if (!sel) return;
    var PL_DEFAULTS = {}, PL_PH = {};
    document.querySelectorAll('[data-i18n]').forEach(function (el) { PL_DEFAULTS[el.dataset.i18n] = el.innerHTML; });
    document.querySelectorAll('[data-i18n-ph]').forEach(function (el) { PL_PH[el.dataset.i18nPh] = el.placeholder; });

    function setLang(l) {
      var dict = I18N[l];
      document.querySelectorAll('[data-i18n]').forEach(function (el) {
        var k = el.dataset.i18n;
        el.innerHTML = (l === 'pl' || !dict || !dict[k]) ? PL_DEFAULTS[k] : dict[k];
      });
      document.querySelectorAll('[data-i18n-ph]').forEach(function (el) {
        var k = el.dataset.i18nPh;
        el.placeholder = (l === 'pl' || !dict || !dict[k]) ? PL_PH[k] : dict[k];
      });
      document.documentElement.lang = l;
      try { localStorage.setItem('lang', l); } catch (e) {}
      sel.value = l;
    }
    sel.addEventListener('change', function () { setLang(sel.value); });
    var saved = 'pl';
    try { saved = localStorage.getItem('lang') || 'pl'; } catch (e) {}
    if (saved !== 'pl') setLang(saved);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
