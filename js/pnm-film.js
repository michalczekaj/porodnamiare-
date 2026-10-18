/* PoródNaMiarę.pl — film „Dzień porodu z planem" na stronie głównej (2026-10).
   Buduje kadr w <div id="pnmFilm">, style: /css/pnm-film.css.
   - 7 scen (~42 s), start automatyczny, gdy kadr jest w połowie widoczny; pauza po zjechaniu ekranu
     lub ukryciu karty; przy prefers-reduced-motion brak autostartu i animacji (sam przycisk „Odtwórz").
   - Teksty w 5 językach; język bierze z <html lang> i reaguje na przełącznik języka strony.
   - Treści wyłącznie z faktów podanych na stronie (16 kroków, 120+ preferencji, 8 obszarów Standardu,
     2 h skóra do skóry, darmowy podgląd, 30 dni zwrotu, ceny 49/99/219 zł).
   - Zdarzenia: „Film start", „Film obejrzany", „Film CTA kreator", „Film CTA pakiety" (Plausible/GA4 przez pnmTrack). */
(function () {
  'use strict';
  var root = document.getElementById('pnmFilm');
  if (!root || !window.requestAnimationFrame) return;
  var section = root.closest ? (root.closest('section') || root) : root;

  var T = {
    pl: {
      kick: "Film · 45 sekund", h: "Jeden dzień. Jeden dokument. Spokój na cały poród.",
      sub: "Zobaczcie, co zmienia dobrze przygotowany plan porodu — dla mamy, dla taty i dla dziecka.",
      region: "Film o planie porodu", startBig: "Odtwórz film", play: "Odtwórz", pause: "Pauza", replay: "Obejrzyj jeszcze raz", scene: "Scena",
      s1k: "03:12 · Noc", s1t: "Zaczyna się.", s1l: "Pierwszy skurcz rzadko przychodzi w dogodnym momencie. Wtedy trudno myśleć jasno — i mamie, i tacie.",
      s2k: "Izba przyjęć", s2t: "Pytania, na które trzeba odpowiedzieć teraz.", s2l: "Mama ma skurcze. Odpowiadać musi ten, kto stoi obok — najczęściej tata.",
      q1: "Znieczulenie — tak czy nie?", q2: "Kto zostaje przy porodzie?", q3: "Odpępnienie od razu czy później?", q4: "Kontakt skóra do skóry?",
      q5: "Szczepienia w pierwszej dobie?", q6: "Karmienie piersią?", q7: "A jeśli cesarskie cięcie?",
      s3k: "Perspektywa taty", s3t: "Tata nie musi stać z boku.", s3l: "Z planem wie, o co pytać, czego pilnować i jak realnie wspierać mamę i dziecko.",
      s4k: "Wcześniej · w domu, w spokoju", s4t: "Decyzje zapadają przy stole, nie na korytarzu.", s4l: "16 kroków kreatora, 120+ gotowych preferencji i wyjaśnienie przy każdej decyzji. Wypełnienie i podgląd są darmowe.",
      s5k: "Standard Opieki Okołoporodowej 2026", s5t: "Wszystkie 8 obszarów w jednym dokumencie.", s5l: "Personel ma obowiązek zapoznać się z planem i omówić go z Wami. Dwa wydruki: jeden do torby, drugi dla położnej.",
      stampSub: "Standard 2026",
      a1: "Miejsce i warunki porodu", a2: "Osoby towarzyszące", a3: "Łagodzenie bólu", a4: "Świadoma zgoda", a5: "Karmienie", a6: "Opieka nad noworodkiem", a7: "Sytuacje szczególne", a8: "Potrzeby szczególne",
      s6k: "Pierwsze godziny życia", s6t: "Ten czas należy do Waszej trójki.", s6l: "Dwie godziny kontaktu skóra do skóry, opóźnione odpępnienie i klauzula, która stawia życie dziecka ponad każdym punktem planu.",
      s7k: "Michał · tata Wiktorii", s7t: "Napisałem ten plan dla mojej córki. Teraz Wasza kolej.", s7l: "Kreator i podgląd są darmowe — płacicie dopiero przy pobraniu PDF. 30 dni gwarancji zwrotu.",
      cta1: "Stwórz swój plan porodu", cta2: "Porównaj pakiety", p1: "Podstawowy", p2: "Premium", p3: "Premium+", pop: "najpopularniejszy"
    },
    en: {
      kick: "Film · 45 seconds", h: "One day. One document. Calm through the whole birth.",
      sub: "See what a well-prepared birth plan changes — for mum, for dad and for your baby.",
      region: "Film about the birth plan", startBig: "Play the film", play: "Play", pause: "Pause", replay: "Watch again", scene: "Scene",
      s1k: "03:12 · Night", s1t: "It begins.", s1l: "The first contraction rarely comes at a convenient time. That is exactly when it is hard to think clearly — for mum and for dad.",
      s2k: "Admissions", s2t: "Questions that need answers right now.", s2l: "Mum is having contractions. The one who has to answer is whoever stands beside her — usually dad.",
      q1: "Pain relief — yes or no?", q2: "Who stays for the birth?", q3: "Clamp the cord now or later?", q4: "Skin-to-skin contact?",
      q5: "Vaccines on day one?", q6: "Breastfeeding?", q7: "What if it’s a C-section?",
      s3k: "Dad’s perspective", s3t: "Dad doesn’t have to stand on the sidelines.", s3l: "With a plan he knows what to ask, what to watch for and how to truly support mum and baby.",
      s4k: "Beforehand · at home, in peace", s4t: "Decisions made at the table, not in the corridor.", s4l: "16 guided steps, 120+ ready preferences and an explanation for every decision. Filling it in and the preview are free.",
      s5k: "Perinatal Care Standard 2026", s5t: "All 8 areas in one document.", s5l: "Staff are required to read your plan and discuss it with you. Two printouts: one for the bag, one for the midwife.",
      stampSub: "Standard 2026",
      a1: "Place & conditions", a2: "Birth companions", a3: "Pain relief", a4: "Informed consent", a5: "Feeding", a6: "Newborn care", a7: "Special situations", a8: "Special needs",
      s6k: "The first hours of life", s6t: "This time belongs to the three of you.", s6l: "Two hours of skin-to-skin contact, delayed cord clamping and a clause that puts your baby’s life above every point of the plan.",
      s7k: "Michał · Wiktoria’s dad", s7t: "I wrote this plan for my daughter. Now it’s your turn.", s7l: "The creator and preview are free — you only pay when you download the PDF. 30-day money-back guarantee.",
      cta1: "Create your birth plan", cta2: "Compare packages", p1: "Basic", p2: "Premium", p3: "Premium+", pop: "most popular"
    },
    de: {
      kick: "Film · 45 Sekunden", h: "Ein Tag. Ein Dokument. Ruhe für die ganze Geburt.",
      sub: "Sehen Sie, was ein gut vorbereiteter Geburtsplan verändert — für die Mutter, für den Vater und für Ihr Kind.",
      region: "Film über den Geburtsplan", startBig: "Film abspielen", play: "Abspielen", pause: "Pause", replay: "Noch einmal ansehen", scene: "Szene",
      s1k: "03:12 · Nacht", s1t: "Es geht los.", s1l: "Die erste Wehe kommt selten zu einem günstigen Zeitpunkt. Genau dann fällt klares Denken schwer — der Mutter wie dem Vater.",
      s2k: "Aufnahme im Kreißsaal", s2t: "Fragen, die jetzt beantwortet werden müssen.", s2l: "Die Mutter hat Wehen. Antworten muss, wer neben ihr steht — meistens der Vater.",
      q1: "Schmerzmittel — ja oder nein?", q2: "Wer bleibt bei der Geburt?", q3: "Abnabeln sofort oder später?", q4: "Haut-zu-Haut-Kontakt?",
      q5: "Impfungen am ersten Tag?", q6: "Stillen?", q7: "Und wenn es ein Kaiserschnitt wird?",
      s3k: "Die Perspektive des Vaters", s3t: "Der Vater muss nicht am Rand stehen.", s3l: "Mit dem Plan weiß er, was er fragen, worauf er achten und wie er Mutter und Kind wirklich unterstützen kann.",
      s4k: "Vorher · zu Hause, in Ruhe", s4t: "Entscheidungen am Tisch, nicht auf dem Flur.", s4l: "16 Schritte, über 120 fertige Präferenzen und eine Erklärung zu jeder Entscheidung. Ausfüllen und Vorschau sind kostenlos.",
      s5k: "Standard der perinatalen Versorgung 2026", s5t: "Alle 8 Bereiche in einem Dokument.", s5l: "Das Personal muss den Plan zur Kenntnis nehmen und mit Ihnen besprechen. Zwei Ausdrucke: einer für die Kliniktasche, einer für die Hebamme.",
      stampSub: "Standard 2026",
      a1: "Ort & Bedingungen", a2: "Begleitpersonen", a3: "Schmerzlinderung", a4: "Informierte Zustimmung", a5: "Ernährung des Babys", a6: "Neugeborenenpflege", a7: "Besondere Situationen", a8: "Besondere Bedürfnisse",
      s6k: "Die ersten Lebensstunden", s6t: "Diese Zeit gehört Ihnen dreien.", s6l: "Zwei Stunden Haut-zu-Haut-Kontakt, verzögertes Abnabeln und eine Klausel, die das Leben Ihres Kindes über jeden Punkt des Plans stellt.",
      s7k: "Michał · Wiktorias Papa", s7t: "Ich habe diesen Plan für meine Tochter geschrieben. Jetzt sind Sie dran.", s7l: "Generator und Vorschau sind kostenlos — Sie zahlen erst beim Download des PDF. 30 Tage Geld-zurück-Garantie.",
      cta1: "Erstellen Sie Ihren Geburtsplan", cta2: "Pakete vergleichen", p1: "Basis", p2: "Premium", p3: "Premium+", pop: "am beliebtesten"
    },
    uk: {
      kick: "Фільм · 45 секунд", h: "Один день. Один документ. Спокій на весь час пологів.",
      sub: "Подивіться, що змінює добре підготовлений план пологів — для мами, для тата і для дитини.",
      region: "Фільм про план пологів", startBig: "Відтворити фільм", play: "Відтворити", pause: "Пауза", replay: "Переглянути ще раз", scene: "Сцена",
      s1k: "03:12 · Ніч", s1t: "Починається.", s1l: "Перша перейма рідко приходить у зручний момент. Саме тоді найважче мислити ясно — і мамі, і татові.",
      s2k: "Приймальне відділення", s2t: "Питання, на які треба відповісти просто зараз.", s2l: "У мами перейми. Відповідати має той, хто стоїть поруч, — найчастіше тато.",
      q1: "Знеболення — так чи ні?", q2: "Хто залишається на пологах?", q3: "Перетискати пуповину одразу чи пізніше?", q4: "Контакт шкіра до шкіри?",
      q5: "Щеплення в першу добу?", q6: "Грудне вигодовування?", q7: "А якщо кесарів розтин?",
      s3k: "Погляд тата", s3t: "Тато не мусить стояти осторонь.", s3l: "З планом він знає, про що питати, на що зважати і як по-справжньому підтримати маму й дитину.",
      s4k: "Заздалегідь · вдома, спокійно", s4t: "Рішення ухвалюються за столом, а не в коридорі.", s4l: "16 кроків, понад 120 готових побажань і пояснення до кожного рішення. Заповнення й попередній перегляд — безкоштовні.",
      s5k: "Стандарт перинатальної допомоги 2026", s5t: "Усі 8 сфер в одному документі.", s5l: "Персонал зобов’язаний ознайомитися з планом і обговорити його з вами. Два роздруки: один у сумку, другий для акушерки.",
      stampSub: "Стандарт 2026",
      a1: "Місце й умови пологів", a2: "Супровідні особи", a3: "Знеболення", a4: "Інформована згода", a5: "Годування", a6: "Догляд за новонародженим", a7: "Особливі ситуації", a8: "Особливі потреби",
      s6k: "Перші години життя", s6t: "Цей час належить вам трьом.", s6l: "Дві години контакту шкіра до шкіри, відтерміноване перетискання пуповини і застереження, що ставить життя дитини понад будь-який пункт плану.",
      s7k: "Міхал · тато Вікторії", s7t: "Я написав цей план для своєї доньки. Тепер ваша черга.", s7l: "Конструктор і попередній перегляд безкоштовні — ви платите лише при завантаженні PDF. 30 днів гарантії повернення коштів.",
      cta1: "Створіть свій план пологів", cta2: "Порівняти пакети", p1: "Базовий", p2: "Преміум", p3: "Преміум+", pop: "найпопулярніший"
    },
    ru: {
      kick: "Фильм · 45 секунд", h: "Один день. Один документ. Спокойствие на все роды.",
      sub: "Посмотрите, что меняет хорошо подготовленный план родов — для мамы, для папы и для ребёнка.",
      region: "Фильм о плане родов", startBig: "Смотреть фильм", play: "Воспроизвести", pause: "Пауза", replay: "Посмотреть ещё раз", scene: "Сцена",
      s1k: "03:12 · Ночь", s1t: "Начинается.", s1l: "Первая схватка редко приходит в удобный момент. Именно тогда труднее всего мыслить ясно — и маме, и папе.",
      s2k: "Приёмное отделение", s2t: "Вопросы, на которые нужно ответить прямо сейчас.", s2l: "У мамы схватки. Отвечать придётся тому, кто стоит рядом, — чаще всего папе.",
      q1: "Обезболивание — да или нет?", q2: "Кто останется на родах?", q3: "Пересекать пуповину сразу или позже?", q4: "Контакт кожа к коже?",
      q5: "Прививки в первые сутки?", q6: "Грудное вскармливание?", q7: "А если кесарево сечение?",
      s3k: "Взгляд папы", s3t: "Папе не нужно стоять в стороне.", s3l: "С планом он знает, о чём спрашивать, за чем следить и как по-настоящему поддержать маму и ребёнка.",
      s4k: "Заранее · дома, спокойно", s4t: "Решения принимаются за столом, а не в коридоре.", s4l: "16 шагов, более 120 готовых пожеланий и пояснение к каждому решению. Заполнение и предпросмотр — бесплатно.",
      s5k: "Стандарт перинатальной помощи 2026", s5t: "Все 8 областей в одном документе.", s5l: "Персонал обязан ознакомиться с планом и обсудить его с вами. Две распечатки: одна в сумку, вторая для акушерки.",
      stampSub: "Стандарт 2026",
      a1: "Место и условия родов", a2: "Сопровождающие", a3: "Обезболивание", a4: "Информированное согласие", a5: "Кормление", a6: "Уход за новорождённым", a7: "Особые ситуации", a8: "Особые потребности",
      s6k: "Первые часы жизни", s6t: "Это время принадлежит вам троим.", s6l: "Два часа контакта кожа к коже, отсроченное пересечение пуповины и оговорка, которая ставит жизнь ребёнка выше любого пункта плана.",
      s7k: "Михал · папа Виктории", s7t: "Я написал этот план для своей дочери. Теперь ваша очередь.", s7l: "Конструктор и предпросмотр бесплатны — вы платите только при скачивании PDF. 30 дней гарантии возврата денег.",
      cta1: "Создайте свой план родов", cta2: "Сравнить пакеты", p1: "Базовый", p2: "Премиум", p3: "Премиум+", pop: "самый популярный"
    }
  };

  function lang() {
    var l = (document.documentElement.getAttribute('lang') || 'pl').slice(0, 2).toLowerCase();
    if (l === 'ua') l = 'uk';
    return T[l] ? l : 'pl';
  }
  function tr(k) { var d = T[lang()]; return d && d[k] != null ? d[k] : (T.pl[k] || ''); }

  var SVG_OPEN = '<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">';
  var FONT = 'font-family="Figtree, system-ui, -apple-system, Segoe UI, sans-serif"';
  var HEART = 'M0 -38C-22 -82 -104 -70 -104 -6C-104 44 -46 82 0 116C46 82 104 44 104 -6C104 -70 22 -82 0 -38Z';

  function stars() {
    var s = [[700, 110, 2.4, .3], [760, 220, 1.6, .9], [640, 330, 2, .5], [1310, 110, 2.2, 1.2], [1420, 200, 1.8, .4], [1500, 90, 2.6, 1.6],
      [1360, 330, 1.6, 2], [1480, 380, 2, .8], [940, 160, 1.6, 1.1], [990, 250, 1.4, 1.8], [720, 450, 1.6, 2.2], [1270, 250, 1.8, .6], [1110, 120, 1.3, 1.4]];
    return s.map(function (p) { return '<circle class="pf-star" style="--d:' + p[3] + 's" cx="' + p[0] + '" cy="' + p[1] + '" r="' + p[2] + '" fill="#FAF5EF"/>'; }).join('');
  }

  function artNight() {
    return SVG_OPEN + '<defs>' +
      '<linearGradient id="pfgSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2C2848"/><stop offset="1" stop-color="#47406A"/></linearGradient>' +
      '<radialGradient id="pfgMoon"><stop offset="0" stop-color="#F6DDA8" stop-opacity=".5"/><stop offset="1" stop-color="#F6DDA8" stop-opacity="0"/></radialGradient>' +
      '<radialGradient id="pfgClock"><stop offset="0" stop-color="#F3C77E" stop-opacity=".3"/><stop offset="1" stop-color="#F3C77E" stop-opacity="0"/></radialGradient>' +
      '<mask id="pfmMoon"><circle cx="1150" cy="190" r="44" fill="#fff"/><circle cx="1172" cy="176" r="40" fill="#000"/></mask>' +
      '</defs><g class="pf-shift">' +
      '<g class="pf-in" style="--d:.1s"><path d="M880 560V250a180 180 0 0 1 360 0v310z" fill="url(#pfgSky)"/></g>' +
      stars() +
      '<circle class="pf-moon" cx="1150" cy="190" r="130" fill="url(#pfgMoon)"/>' +
      '<circle class="pf-moon" cx="1150" cy="190" r="44" fill="#F6DDA8" mask="url(#pfmMoon)"/>' +
      '<g class="pf-in" style="--d:.1s"><path d="M880 560V250a180 180 0 0 1 360 0v310zM1060 70v490M880 330h360" fill="none" stroke="#EDDFD3" stroke-opacity=".38" stroke-width="7" stroke-linejoin="round"/>' +
      '<rect x="846" y="556" width="428" height="16" rx="8" fill="#EDDFD3" fill-opacity=".22"/></g>' +
      '<g class="pf-up" style="--d:.8s"><circle cx="1395" cy="512" r="160" fill="url(#pfgClock)"/>' +
      '<rect x="1300" y="470" width="190" height="86" rx="22" fill="#14111B" stroke="#F3C77E" stroke-opacity=".35" stroke-width="2"/>' +
      '<text x="1384" y="530" text-anchor="end" ' + FONT + ' font-weight="700" font-size="46" fill="#F3C77E">03</text>' +
      '<text class="pf-colon" x="1395" y="527" text-anchor="middle" ' + FONT + ' font-weight="700" font-size="46" fill="#F3C77E">:</text>' +
      '<text x="1406" y="530" text-anchor="start" ' + FONT + ' font-weight="700" font-size="46" fill="#F3C77E">12</text></g>' +
      '<g stroke="#EDDFD3" stroke-opacity=".12" stroke-width="1.5" class="pf-in" style="--d:.5s"><path d="M860 640H1540M860 700H1540M860 760H1540"/></g>' +
      '<path class="pf-draw" style="--dur:5s;--d:.6s" d="M860 760C900 760 930 758 960 756C1040 762 1090 636 1180 630C1270 624 1310 752 1400 758S1500 760 1540 760" fill="none" stroke="#F0A6B0" stroke-width="4" stroke-linecap="round"/>' +
      '<circle class="pf-pulse pf-tb" style="--d:3.3s" cx="1180" cy="630" r="10" fill="#F0A6B0"/>' +
      '</g></svg>';
  }

  function artAsk() {
    var lines = ['M600 40L1000 330', 'M1520 40L1120 330', 'M600 860L1000 480', 'M1520 860L1120 480',
      'M700 112V765', 'M820 200V651', 'M920 272V556', 'M1420 112V765', 'M1300 200V651', 'M1200 272V556'];
    var paths = lines.map(function (d, i) {
      return '<path class="pf-draw" style="--dur:1.4s;--d:' + (0.1 + i * 0.07).toFixed(2) + 's" d="' + d + '" fill="none" stroke="#EDDFD3" stroke-opacity=".32" stroke-width="3" stroke-linecap="round"/>';
    }).join('');
    return SVG_OPEN + '<defs><radialGradient id="pfgDoor"><stop offset="0" stop-color="#FFF4E2" stop-opacity=".75"/><stop offset="1" stop-color="#FFF4E2" stop-opacity="0"/></radialGradient></defs>' +
      '<g class="pf-shift">' +
      '<circle class="pf-in" style="--d:.2s" cx="1060" cy="405" r="280" fill="url(#pfgDoor)"/>' +
      '<rect class="pf-in" style="--d:.3s" x="1000" y="330" width="120" height="150" rx="4" fill="#F7EEDF"/>' +
      '<ellipse class="pf-in" style="--d:.5s" cx="1060" cy="522" rx="150" ry="18" fill="#FFF4E2" fill-opacity=".14"/>' +
      paths +
      '<g fill="#FFF4E2" fill-opacity=".85"><ellipse class="pf-in" style="--d:.6s" cx="1060" cy="95" rx="72" ry="10"/><ellipse class="pf-in" style="--d:.8s" cx="1060" cy="190" rx="46" ry="7"/><ellipse class="pf-in" style="--d:1s" cx="1060" cy="262" rx="28" ry="5"/></g>' +
      '<path class="pf-in" style="--d:1.1s" d="M1052 284h16v10h10v16h-10v10h-16v-10h-10v-16h10z" fill="#F0A6B0"/>' +
      '</g></svg>';
  }

  function artKreator() {
    var dots = '', i, rows = '', w1 = [230, 190, 250, 170], w2 = [170, 210, 140, 190];
    for (i = 0; i < 16; i++) {
      var cx = (820 + i * 31.33).toFixed(1);
      dots += '<circle cx="' + cx + '" cy="232" r="6" fill="#EDDFD3"/>' +
        '<circle class="pf-dot pf-tb" style="--d:' + (0.7 + i * 0.24).toFixed(2) + 's" cx="' + cx + '" cy="232" r="6.5" fill="#A0525E"/>';
    }
    for (i = 0; i < 4; i++) {
      var y = 270 + i * 52;
      rows += '<rect x="820" y="' + y + '" width="24" height="24" rx="6" fill="#fff" stroke="#A0525E" stroke-width="2"/>' +
        '<path class="pf-draw" style="--dur:.45s;--d:' + (1.2 + i * 0.7).toFixed(1) + 's" d="M826 ' + (y + 12) + 'l5 6l9-11" fill="none" stroke="#A0525E" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>' +
        '<rect x="858" y="' + (y + 3) + '" width="' + w1[i] + '" height="9" rx="4.5" fill="#3A3341" fill-opacity=".72"/>' +
        '<rect x="858" y="' + (y + 16) + '" width="' + w2[i] + '" height="7" rx="3.5" fill="#3A3341" fill-opacity=".3"/>';
    }
    return SVG_OPEN + '<defs><radialGradient id="pfgLamp"><stop offset="0" stop-color="#F3C77E" stop-opacity=".42"/><stop offset="1" stop-color="#F3C77E" stop-opacity="0"/></radialGradient></defs>' +
      '<g class="pf-shift"><g transform="translate(60 0)"><circle class="pf-in" cx="900" cy="140" r="470" fill="url(#pfgLamp)"/>' +
      '<g class="pf-up" style="--d:.15s">' +
      '<rect x="770" y="150" width="580" height="370" rx="20" fill="#16121D" stroke="#EDDFD3" stroke-opacity=".25" stroke-width="2"/>' +
      '<rect x="790" y="170" width="540" height="330" rx="8" fill="#FAF5EF"/>' +
      '<path d="M790 178a8 8 0 0 1 8-8h524a8 8 0 0 1 8 8v28H790z" fill="#3E3852"/>' +
      '<circle cx="812" cy="188" r="6" fill="#F0A6B0"/><rect x="826" y="184" width="90" height="8" rx="4" fill="#FAF5EF" fill-opacity=".7"/>' +
      '<rect x="820" y="231" width="470" height="2" fill="#EDDFD3"/>' + dots + rows +
      '<g class="pf-card pf-tb" style="--d:3.9s"><rect x="1160" y="258" width="140" height="196" rx="8" fill="#fff" stroke="#EDDFD3" stroke-width="2"/>' +
      '<path d="M1160 266a8 8 0 0 1 8-8h124a8 8 0 0 1 8 8v26h-140z" fill="#F7E9E7"/>' +
      '<rect x="1174" y="306" width="96" height="7" rx="3.5" fill="#3A3341" fill-opacity=".55"/><rect x="1174" y="322" width="112" height="6" rx="3" fill="#3A3341" fill-opacity=".25"/>' +
      '<rect x="1174" y="336" width="84" height="6" rx="3" fill="#3A3341" fill-opacity=".25"/><rect x="1174" y="356" width="104" height="7" rx="3.5" fill="#3A3341" fill-opacity=".55"/>' +
      '<rect x="1174" y="372" width="92" height="6" rx="3" fill="#3A3341" fill-opacity=".25"/><rect x="1174" y="386" width="108" height="6" rx="3" fill="#3A3341" fill-opacity=".25"/>' +
      '<rect x="1174" y="418" width="48" height="22" rx="6" fill="#A0525E"/><text x="1198" y="434" text-anchor="middle" ' + FONT + ' font-weight="700" font-size="13" fill="#fff">PDF</text></g>' +
      '<path d="M690 528h740l-34 30H724z" fill="#3A3341"/><path d="M690 528h740" stroke="#EDDFD3" stroke-opacity=".35" stroke-width="2"/>' +
      '<rect x="1010" y="530" width="100" height="6" rx="3" fill="#000" fill-opacity=".3"/>' +
      '</g></g></g></svg>';
  }

  function artBaby() {
    var motes = [[780, 720, 3, 0, 7], [860, 760, 2, 1.2, 6], [940, 700, 3.5, 2.4, 8], [1010, 770, 2, .6, 6.5], [1120, 730, 3, 1.8, 7.5],
      [1200, 760, 2.5, .3, 6], [1280, 710, 2, 2.8, 7], [1340, 750, 3, 1, 8], [900, 640, 2, 3.2, 6], [1240, 650, 2.5, 3.6, 7]];
    var m = motes.map(function (p) {
      return '<circle class="pf-mote" style="--d:' + p[3] + 's;--t:' + p[4] + 's" cx="' + p[0] + '" cy="' + p[1] + '" r="' + p[2] + '" fill="#FFE3B0" opacity="0"/>';
    }).join('');
    return SVG_OPEN + '<defs><radialGradient id="pfgSun"><stop offset="0" stop-color="#FFE7BC"/><stop offset=".5" stop-color="#F3C77E" stop-opacity=".8"/><stop offset="1" stop-color="#F3C77E" stop-opacity="0"/></radialGradient></defs>' +
      '<g class="pf-shift">' +
      '<g class="pf-sun"><circle cx="1060" cy="720" r="340" fill="url(#pfgSun)" opacity=".7"/></g>' +
      '<path d="M-300 800C300 760 900 748 1900 780V900H-300z" fill="#2A1F33" fill-opacity=".5"/>' + m +
      '<circle cx="1060" cy="400" r="215" fill="none" stroke="#FAF5EF" stroke-opacity=".16" stroke-width="3"/>' +
      '<circle class="pf-draw" style="--dur:6s;--d:.4s;--len:1351" cx="1060" cy="400" r="215" fill="none" stroke="#F3C77E" stroke-width="4" stroke-linecap="round" transform="rotate(-90 1060 400)"/>' +
      '<g class="pf-hearts">' +
      '<g transform="translate(1060 378) scale(1.2)"><g class="pf-beat pf-tb"><path d="' + HEART + '" fill="rgba(250,245,239,.06)" stroke="#FAF5EF" stroke-width="4" stroke-linejoin="round"/></g></g>' +
      '<g transform="translate(1060 392) scale(.42)"><g class="pf-beat pf-tb" style="--d:.18s"><path d="' + HEART + '" fill="#F0A6B0"/></g></g>' +
      '</g></g></svg>';
  }

  function photo(src, w, h) {
    return '<div class="pf-photo"><img data-src="' + src + '" alt="" width="' + w + '" height="' + h + '" loading="lazy" decoding="async"></div><div class="pf-leak"></div>';
  }

  // Pozycje dymków: x/y = desktop (prawa część kadru), mx/my = telefon i tablet.
  var BUBBLES = [[61, 16, 28, 27, ''], [82, 21, 72, 33, ''], [65, 37, 30, 52, ''], [85, 46, 71, 60, ''], [61, 60, 30, 68, 'pf-m-hide'], [80, 68, 66, 82, ''], [67, 84, 50, 88, 'pf-m-hide']];
  function artAskHtml() {
    return artAsk() + BUBBLES.map(function (b, i) {
      return '<span class="pf-bub ' + b[4] + '" style="--x:' + b[0] + '%;--y:' + b[1] + '%;--mx:' + b[2] + '%;--my:' + b[3] + '%;--d:' + (0.5 + i * 0.6).toFixed(1) + 's" data-pft="q' + (i + 1) + '"></span>';
    }).join('');
  }
  function artPlanHtml() {
    var li = '';
    for (var i = 1; i <= 8; i++) li += '<li style="--d:' + (0.9 + i * 0.28).toFixed(2) + 's" data-pft="a' + i + '"></li>';
    return '<div class="pf-paperbox"><div class="pf-paper"><img data-src="/img/plan-porodu-wiktorii-wydruk-strona1.webp" alt="" width="924" height="1316" loading="lazy" decoding="async">' +
      '<div class="pf-stamp"><b>8/8</b><span data-pft="stampSub"></span></div></div></div><ul class="pf-areas">' + li + '</ul>';
  }

  var SCENES = [
    { cls: 'pf-s-night', dur: 6500, art: artNight },
    { cls: 'pf-s-ask', dur: 7200, art: artAskHtml },
    { cls: 'pf-s-dad', dur: 6500, art: function () { return photo('/img/michal-tata-brzuch-anny-sylwetka-dziecka.webp', 1000, 595); } },
    { cls: 'pf-s-kreator', dur: 7000, art: artKreator },
    { cls: 'pf-s-plan', dur: 7500, art: artPlanHtml },
    { cls: 'pf-s-baby', dur: 7000, art: artBaby },
    { cls: 'pf-s-final', dur: 0, art: function () { return photo('/img/michal-anna-zachod-slonca-dlonie-brzuch-ciaza.webp', 900, 1125); } }
  ];
  var LAST = SCENES.length - 1;

  var I_PLAY = '<svg class="pf-i-play" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 2.5v11l9-5.5z"/></svg>';
  var I_PAUSE = '<svg class="pf-i-pause" viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 2.5h3v11h-3zM9.5 2.5h3v11h-3z"/></svg>';

  function build() {
    var h = '<div class="pf-frame">';
    SCENES.forEach(function (s) { h += '<div class="pf-scene ' + s.cls + '" aria-hidden="true">' + s.art() + '</div>'; });
    h += '<div class="pf-shade"></div><div class="pf-vig"></div><div class="pf-grain"></div><div class="pf-brand">PoródNaMiarę.pl</div>';
    h += '<div class="pf-top"><div class="pf-segs">';
    SCENES.forEach(function (s, i) { h += '<button type="button" class="pf-seg" data-i="' + i + '"><i></i></button>'; });
    h += '</div><button type="button" class="pf-btn pf-pp">' + I_PAUSE + I_PLAY + '</button></div>';
    h += '</div><div class="pf-caps">';
    for (var i = 0; i < LAST; i++) {
      var n = i + 1;
      h += '<div class="pf-cap" aria-hidden="true"><p class="pf-ck" data-pft="s' + n + 'k"></p><h3 class="pf-ct" data-pft="s' + n + 't"></h3><p class="pf-cl" data-pft="s' + n + 'l"></p></div>';
    }
    h += '<div class="pf-cap pf-cap-final" aria-hidden="true"><p class="pf-ck" data-pft="s7k"></p><h3 class="pf-ct" data-pft="s7t"></h3><p class="pf-cl" data-pft="s7l"></p>' +
      '<div class="pf-cta-wrap"><ul class="pf-prices"><li><span data-pft="p1"></span> <b>49 zł</b></li><li class="pf-pop"><span data-pft="p2"></span> <b>99 zł</b> <small data-pft="pop"></small></li><li><span data-pft="p3"></span> <b>219 zł</b></li></ul>' +
      '<div class="pf-ctas"><a class="pf-cta1" href="/kreator" data-pnm-event="Film CTA kreator" data-pft="cta1"></a><a class="pf-cta2" href="#cennik" data-pnm-event="Film CTA pakiety" data-pft="cta2"></a></div>' +
      '<button type="button" class="pf-replay" data-pft="replay"></button></div></div>';
    h += '</div>';
    h += '<button type="button" class="pf-poster"><span class="pf-poster-in"><span class="pf-play">' + I_PLAY.replace('pf-i-play', '') + '</span><span class="pf-poster-l" data-pft="startBig"></span></span></button>';
    root.innerHTML = h;
    root.setAttribute('role', 'region');

    // Długości linii do animacji rysowania (stroke-dashoffset).
    var draws = root.querySelectorAll('path.pf-draw');
    for (var j = 0; j < draws.length; j++) {
      try {
        var len = Math.ceil(draws[j].getTotalLength()) + 2;
        draws[j].style.setProperty('--len', len);
        draws[j].style.strokeDasharray = len;
      } catch (e) { draws[j].style.strokeDasharray = 'none'; }
    }
    var circ = root.querySelectorAll('circle.pf-draw');
    for (j = 0; j < circ.length; j++) circ[j].style.strokeDasharray = circ[j].style.getPropertyValue('--len') || 'none';
  }

  function applyLang() {
    var els = section.querySelectorAll('[data-pft]');
    for (var i = 0; i < els.length; i++) els[i].textContent = tr(els[i].getAttribute('data-pft'));
    root.setAttribute('aria-label', tr('region'));
    poster.setAttribute('aria-label', tr('startBig'));
    for (i = 0; i < segs.length; i++) segs[i].setAttribute('aria-label', tr('scene') + ' ' + (i + 1) + ': ' + tr('s' + (i + 1) + 't'));
    updateBtn();
  }

  build();
  var scenes = root.querySelectorAll('.pf-scene');
  var caps = root.querySelectorAll('.pf-cap');
  var segs = root.querySelectorAll('.pf-seg');
  var fills = root.querySelectorAll('.pf-seg i');
  var pp = root.querySelector('.pf-pp');
  var poster = root.querySelector('.pf-poster');

  var reduce = false;
  try { reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}

  var idx = -1, elapsed = 0, last = 0, raf = 0, playing = false, started = false, userPaused = false, inView = false, sentEnd = false;

  function track(name) { try { if (typeof window.pnmTrack === 'function') window.pnmTrack(name); } catch (e) {} }

  function setFill(i, f) { fills[i].style.transform = 'scaleX(' + f + ')'; }

  function restart(el, on) {
    el.classList.remove('is-on');
    if (on) { void el.offsetWidth; el.classList.add('is-on'); }
    el.setAttribute('aria-hidden', on ? 'false' : 'true');
  }

  function setScene(i) {
    idx = i; elapsed = 0;
    for (var j = 0; j < scenes.length; j++) {
      restart(scenes[j], j === i);
      restart(caps[j], j === i);
      setFill(j, j < i ? 1 : 0);
      if (j === i) segs[j].setAttribute('aria-current', 'step'); else segs[j].removeAttribute('aria-current');
    }
    scenes[i].setAttribute('aria-hidden', 'true'); // grafika kadru jest dekoracyjna; treść niosą napisy
    if (i === LAST) {
      setFill(LAST, 1);
      stopLoop();
      root.classList.add('is-ended');
      root.classList.remove('is-paused');
      if (!sentEnd) { sentEnd = true; track('Film obejrzany'); }
    } else {
      root.classList.remove('is-ended');
    }
    updateBtn();
  }

  function frame(now) {
    if (!playing) return;
    var dt = now - last; last = now;
    if (dt > 250) dt = 16; // powrót z uśpionej karty — bez skoku
    elapsed += dt;
    var d = SCENES[idx].dur;
    setFill(idx, Math.min(1, elapsed / d));
    if (elapsed >= d) setScene(idx + 1);
    if (playing) raf = window.requestAnimationFrame(frame);
  }
  function stopLoop() { playing = false; if (raf) window.cancelAnimationFrame(raf); raf = 0; }
  function startLoop() {
    stopLoop();
    playing = true; last = performance.now();
    raf = window.requestAnimationFrame(frame);
  }

  function play() {
    loadImages();
    if (!started) { started = true; track('Film start'); }
    root.classList.remove('is-idle', 'is-paused');
    if (idx < 0 || idx === LAST) setScene(0);
    startLoop();
    updateBtn();
  }
  function pause(byUser) {
    if (byUser) userPaused = true;
    if (!playing) return;
    stopLoop();
    root.classList.add('is-paused');
    updateBtn();
  }
  function goTo(i) {
    loadImages();
    userPaused = false;
    if (!started) { started = true; track('Film start'); }
    root.classList.remove('is-idle', 'is-paused');
    setScene(i);
    if (i < LAST) startLoop();
    updateBtn();
  }

  function updateBtn() {
    if (!pp) return;
    var label = playing ? tr('pause') : (idx === LAST ? tr('replay') : tr('play'));
    pp.setAttribute('aria-label', label);
    pp.setAttribute('title', label);
  }

  pp.addEventListener('click', function () {
    if (playing) pause(true);
    else { userPaused = false; play(); }
  });
  poster.addEventListener('click', function () { userPaused = false; play(); });
  root.querySelector('.pf-replay').addEventListener('click', function () { userPaused = false; setScene(0); play(); });
  for (var s = 0; s < segs.length; s++) {
    segs[s].addEventListener('click', function (e) { goTo(+e.currentTarget.getAttribute('data-i')); });
  }

  // Zdjęcia scen pobieramy dopiero, gdy kadr zbliża się do ekranu (nie obciążają pierwszego ładowania).
  function loadImages() {
    var imgs = root.querySelectorAll('img[data-src]');
    for (var i = 0; i < imgs.length; i++) { imgs[i].src = imgs[i].getAttribute('data-src'); imgs[i].removeAttribute('data-src'); }
  }
  if ('IntersectionObserver' in window) {
    var near = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) { loadImages(); near.disconnect(); }
    }, { rootMargin: '700px 0px' });
    near.observe(root);
  } else { loadImages(); }

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      var r = entries[0].intersectionRatio;
      if (r >= 0.5) {
        inView = true;
        if (userPaused || document.hidden) return;
        if (!started) { if (!reduce) play(); }
        else if (!playing && idx < LAST) play();
      } else if (r < 0.2) {
        inView = false;
        pause(false);
      }
    }, { threshold: [0, 0.2, 0.5] }).observe(root);
  }
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) pause(false);
    else if (inView && started && !userPaused && idx < LAST) play();
  });

  // Przełącznik języka strony zmienia <html lang> — napisy filmu idą za nim.
  if ('MutationObserver' in window) {
    new MutationObserver(applyLang).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  }
  setScene(0); // plansza startowa: tło pierwszej sceny, animacje zamrożone do startu
  applyLang();
})();
