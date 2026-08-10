/* ==========================================================================
   PoródNaMiarę.pl — warstwa UI kreatora (opisy kroków, etykiety pól,
   placeholdery, podsumowanie, strefy zakupu/pobrania).
   Klucz = dokładny polski tekst widoczny w DOM (canonical).
   Ładowany razem z js/i18n-kreator.js; rozszerza obiekt window.PNM_I18N.
   ========================================================================== */
(function (global) {
  'use strict';

  // ---- Teksty statyczne w DOM kreatora (klucz = dokładny tekst PL) ----
  var TXT = {
    "Imię i nazwisko rodzącej *": { en: "Mother's full name *", de: "Vor- und Nachname der Mutter *", uk: "Ім'я та прізвище породіллі *", ru: "Имя и фамилия роженицы *" },
    "Osoba towarzysząca (ojciec dziecka / bliska osoba) *": { en: "Support person (baby's father / close person) *", de: "Begleitperson (Vater des Kindes / nahestehende Person) *", uk: "Особа супроводу (батько дитини / близька людина) *", ru: "Сопровождающий (отец ребёнка / близкий человек) *" },
    "Płeć dziecka *": { en: "Baby's sex *", de: "Geschlecht des Kindes *", uk: "Стать дитини *", ru: "Пол ребёнка *" },
    "Przewidywany termin porodu *": { en: "Expected due date *", de: "Voraussichtlicher Geburtstermin *", uk: "Очікувана дата пологів *", ru: "Предполагаемая дата родов *" },
    "Gdyby dziecko wymagało opieki neonatologicznej": { en: "If the baby needs neonatal care", de: "Falls das Kind neonatologische Betreuung benötigt", uk: "Якщо дитині знадобиться неонатальна допомога", ru: "Если ребёнку понадобится неонатальная помощь" },
    "49 zł": { en: "49 PLN", de: "49 PLN", uk: "49 злотих", ru: "49 злотых" },
    "99 zł": { en: "99 PLN", de: "99 PLN", uk: "99 злотих", ru: "99 злотых" },
    "219 zł": { en: "219 PLN", de: "219 PLN", uk: "219 злотих", ru: "219 злотых" },
    "Podstawowy": { en: "Basic", de: "Basis", uk: "Базовий", ru: "Базовый" },
    "Premium+": { en: "Premium+", de: "Premium+", uk: "Premium+", ru: "Premium+" },
    "Dokończ zakup, aby pobrać plan.": { en: "Complete your purchase to download the plan.", de: "Schließen Sie den Kauf ab, um den Plan herunterzuladen.", uk: "Завершіть покупку, щоб завантажити план.", ru: "Завершите покупку, чтобы скачать план." },
    "Przygotowuję dokument…": { en: "Preparing document…", de: "Dokument wird vorbereitet…", uk: "Готуємо документ…", ru: "Готовим документ…" },
    "Gotowe! Sprawdźcie folder Pobrane.": { en: "Done! Check your Downloads folder.", de: "Fertig! Prüfen Sie den Ordner „Downloads“.", uk: "Готово! Перевірте теку «Завантаження».", ru: "Готово! Проверьте папку «Загрузки»." },

    // --- intro / nawigacja ---
    "Przejdź przez 13 kroków — zaznacz to, co dla Was ważne. Podgląd tworzy się na bieżąco. Pełny, profesjonalny dokument PDF (z brandem i formatowaniem) otrzymasz po zakupie.": { en: "Go through 13 steps — tick what matters to you. The preview builds live. You'll download the full, professionally formatted PDF after buying a package.", de: "Gehen Sie 13 Schritte durch — markieren Sie, was Ihnen wichtig ist. Die Vorschau entsteht live. Das vollständige, professionell formatierte PDF erhalten Sie nach dem Kauf eines Pakets.", uk: "Пройдіть 13 кроків — позначте те, що для вас важливе. Перегляд формується наживо. Повний, професійно оформлений PDF завантажите після покупки пакета.", ru: "Пройдите 13 шагов — отметьте то, что для вас важно. Предпросмотр формируется в реальном времени. Полный, профессионально оформленный PDF (с брендингом и форматированием) получите после покупки." },
    "% ukończone": { en: "% complete", de: "% abgeschlossen", uk: "% завершено", ru: "% завершено" },
    "🌍 Język treści kreatora:": { en: "🌍 Creator content language:", de: "🌍 Sprache der Generator-Inhalte:", uk: "🌍 Мова вмісту конструктора:", ru: "🌍 Язык содержимого конструктора:" },
    "Pole wymagane do przejścia do następnego kroku.": { en: "This field is required to continue to the next step.", de: "Dieses Feld ist erforderlich, um zum nächsten Schritt zu gelangen.", uk: "Це поле обов'язкове для переходу до наступного кроку.", ru: "Поле обязательно для перехода к следующему шагу." },

    // --- opisy kroków (p pod h3) ---
    "Zaczynamy od podstaw. Te informacje trafią na pierwszą stronę planu i pomogą personelowi szybko się zorientować.": { en: "Let's start with the basics. This information goes on the first page of the plan and helps staff get oriented quickly.", de: "Beginnen wir mit den Grundlagen. Diese Angaben stehen auf der ersten Seite des Plans und helfen dem Personal, sich schnell zu orientieren.", uk: "Почнемо з основ. Ця інформація потрапить на першу сторінку плану й допоможе персоналу швидко зорієнтуватися.", ru: "Начнём с основ. Эта информация попадёт на первую страницу плана и поможет персоналу быстро сориентироваться." },
    "Jak ma wyglądać otoczenie porodu? Zaznacz to, co dla Was ważne.": { en: "What should the birth environment be like? Tick what matters to you.", de: "Wie soll das Geburtsumfeld aussehen? Markieren Sie, was Ihnen wichtig ist.", uk: "Яким має бути середовище пологів? Позначте те, що для вас важливе.", ru: "Какой должна быть обстановка родов? Отметьте то, что для вас важно." },
    "Kto ma być przy Was i jak ma wyglądać obecność personelu.": { en: "Who should be with you, and how staff presence should be handled.", de: "Wer soll bei Ihnen sein und wie soll die Anwesenheit des Personals aussehen.", uk: "Хто має бути поруч з вами і як має виглядати присутність персоналу.", ru: "Кто должен быть рядом с вами и как должно выглядеть присутствие персонала." },
    "Zabiegi przygotowujące — Wasze preferencje.": { en: "Preparatory procedures — your preferences.", de: "Vorbereitende Maßnahmen — Ihre Präferenzen.", uk: "Підготовчі процедури — ваші побажання.", ru: "Подготовительные процедуры — ваши пожелания." },
    "Jak chcecie, żeby przebiegał sam poród.": { en: "How you would like the birth itself to unfold.", de: "Wie die Geburt selbst verlaufen soll.", uk: "Як ви хочете, щоб проходили самі пологи.", ru: "Как вы хотите, чтобы проходили сами роды." },
    "Metody radzenia sobie z bólem — od naturalnych po farmakologiczne. Bezpieczeństwo zawsze jest nadrzędne.": { en: "Ways of coping with pain — from natural to pharmacological. Safety always comes first.", de: "Methoden zur Schmerzbewältigung — von natürlich bis medikamentös. Sicherheit hat immer Vorrang.", uk: "Методи подолання болю — від природних до фармакологічних. Безпека завжди понад усе.", ru: "Методы преодоления боли — от естественных до медикаментозных. Безопасность всегда превыше всего." },
    "Nacięcie krocza, wywoływanie porodu i III okres (łożysko).": { en: "Episiotomy, labour induction and the third stage (placenta).", de: "Dammschnitt, Geburtseinleitung und Nachgeburtsphase (Plazenta).", uk: "Розріз промежини, індукція пологів і третій період (плацента).", ru: "Разрез промежности, индукция родов и третий период (плацента)." },
    "Nawet przy cesarskim cięciu macie wpływ na wiele elementów.": { en: "Even with a caesarean section, you still have a say in many things.", de: "Auch bei einem Kaiserschnitt haben Sie auf vieles Einfluss.", uk: "Навіть при кесаревому розтині ви впливаєте на багато елементів.", ru: "Даже при кесаревом сечении вы влияете на многие моменты." },
    "Najważniejsza część planu. Priorytetem jest zdrowie i bezpieczeństwo dziecka — akceptujecie wszystkie procedury ratujące zdrowie i życie.": { en: "The most important part of the plan. The baby's health and safety come first — you accept all life- and health-saving procedures.", de: "Der wichtigste Teil des Plans. Gesundheit und Sicherheit des Kindes haben Vorrang — Sie akzeptieren alle lebens- und gesundheitsrettenden Maßnahmen.", uk: "Найважливіша частина плану. Пріоритет — здоров'я і безпека дитини; ви погоджуєтесь на всі процедури, що рятують здоров'я і життя.", ru: "Самая важная часть плана. Приоритет — здоровье и безопасность ребёнка; вы соглашаетесь на все процедуры, спасающие здоровье и жизнь." },
    "Zdrowie dziecka jest priorytetem. Poniższe elementy profilaktyki ratują zdrowie i życie.": { en: "The baby's health is the priority. The prophylaxis below saves health and lives.", de: "Die Gesundheit des Kindes hat Priorität. Die folgenden Prophylaxemaßnahmen retten Gesundheit und Leben.", uk: "Здоров'я дитини — пріоритет. Наведені нижче елементи профілактики рятують здоров'я і життя.", ru: "Здоровье ребёнка — приоритет. Приведённые ниже меры профилактики спасают здоровье и жизнь." },
    "Wasze stanowisko wobec szczepień w szpitalu. Przy odroczeniu WZW B ważny jest ujemny wynik HBsAg u matki.": { en: "Your position on in-hospital vaccination. If you delay the hepatitis B vaccine, a negative maternal HBsAg result matters.", de: "Ihre Haltung zu Impfungen im Krankenhaus. Bei Aufschub der Hepatitis-B-Impfung ist ein negatives HBsAg-Ergebnis der Mutter wichtig.", uk: "Ваша позиція щодо щеплень у лікарні. При відкладенні щеплення від гепатиту B важливий негативний результат HBsAg у матері.", ru: "Ваша позиция в отношении прививок в больнице. При отсрочке прививки от гепатита B важен отрицательный результат HBsAg у матери." },
    "Ostatni krok — pobyt na oddziale po porodzie.": { en: "Final step — your stay on the ward after the birth.", de: "Letzter Schritt — der Aufenthalt auf der Station nach der Geburt.", uk: "Останній крок — перебування у відділенні після пологів.", ru: "Последний шаг — пребывание в отделении после родов." },
    "Sprawdźcie wybory przed zakupem. Każdą sekcję możecie jeszcze poprawić.": { en: "Review your choices before buying. You can still edit any section.", de: "Prüfen Sie Ihre Auswahl vor dem Kauf. Jeden Abschnitt können Sie noch ändern.", uk: "Перевірте вибір перед покупкою. Кожен розділ ще можна виправити.", ru: "Проверьте свой выбор перед покупкой. Каждый раздел ещё можно изменить." },
    "Scenariusz, o którym nikt nie chce myśleć — i właśnie dlatego warto zapisać go wcześniej. Dotyczy porodu przedwczesnego, adaptacji noworodka lub przeniesienia na oddział.": { en: "A scenario nobody wants to think about — which is exactly why it is worth writing down in advance. It covers preterm birth, a premature baby or complications.", de: "Ein Szenario, an das niemand denken möchte — genau deshalb lohnt es sich, es vorab festzuhalten. Es betrifft Frühgeburt, die Anpassung des Neugeborenen oder die Verlegung auf eine Station.", uk: "Сценарій, про який ніхто не хоче думати — саме тому варто записати його заздалегідь. Стосується передчасних пологів, адаптації новонародженого або переведення у відділення.", ru: "Сценарий, о котором никто не хочет думать — и именно поэтому его стоит записать заранее. Касается преждевременных родов, адаптации новорождённого или перевода в отделение." },

    // --- etykiety pól ---
    "Imię i nazwisko rodzącej": { en: "Mother's full name", de: "Vor- und Nachname der Mutter", uk: "Ім'я та прізвище породіллі", ru: "Имя и фамилия роженицы" },
    "Osoba towarzysząca (ojciec dziecka / bliska osoba)": { en: "Support person (baby's father / close person)", de: "Begleitperson (Vater des Kindes / nahestehende Person)", uk: "Особа супроводу (батько дитини / близька людина)", ru: "Сопровождающий (отец ребёнка / близкий человек)" },
    "Płeć dziecka": { en: "Baby's sex", de: "Geschlecht des Kindes", uk: "Стать дитини", ru: "Пол ребёнка" },
    "— dobierzemy kolorystykę planu": { en: "— we'll match the plan's colour scheme", de: "— wir passen die Farbgebung des Plans an", uk: "— підберемо кольорову гаму плану", ru: "— подберём цветовую гамму плана" },
    "Imię dziecka (jeśli już wybrane)": { en: "Baby's name (if already chosen)", de: "Name des Kindes (falls bereits gewählt)", uk: "Ім'я дитини (якщо вже обрано)", ru: "Имя ребёнка (если уже выбрано)" },
    "Przewidywany termin porodu": { en: "Expected due date", de: "Voraussichtlicher Geburtstermin", uk: "Очікувана дата пологів", ru: "Предполагаемая дата родов" },
    "Lekarz prowadzący / położna (opcjonalnie)": { en: "Attending doctor / midwife (optional)", de: "Behandelnder Arzt / Hebamme (optional)", uk: "Лікар / акушерка (необов'язково)", ru: "Лечащий врач / акушерка (по желанию)" },
    "Grupa krwi i Rh matki": { en: "Mother's blood group and Rh", de: "Blutgruppe und Rh der Mutter", uk: "Група крові та Rh матері", ru: "Группа крови и Rh матери" },
    "Dane istotne dla bezpieczeństwa noworodka": { en: "Information relevant to newborn safety", de: "Für die Sicherheit des Neugeborenen relevante Angaben", uk: "Дані, важливі для безпеки новонародженого", ru: "Данные, важные для безопасности новорождённого" },
    "(opcjonalnie — z dokumentacji ciąży)": { en: "(optional — from your pregnancy records)", de: "(optional — aus den Schwangerschaftsunterlagen)", uk: "(необов'язково — з документації вагітності)", ru: "(по желанию — из документации беременности)" },
    "Wynik HBsAg decyduje o bezpieczeństwie odroczenia szczepienia WZW B. GBS wpływa na postępowanie przy porodzie.": { en: "The HBsAg result determines whether delaying the hepatitis B vaccine is safe. GBS affects management during labour.", de: "Das HBsAg-Ergebnis entscheidet, ob ein Aufschub der Hepatitis-B-Impfung sicher ist. GBS beeinflusst das Vorgehen bei der Geburt.", uk: "Результат HBsAg визначає безпечність відкладення щеплення від гепатиту B. СГБ впливає на тактику під час пологів.", ru: "Результат HBsAg определяет безопасность отсрочки прививки от гепатита B. СГБ влияет на тактику во время родов." },
    "HBsAg matki (WZW B):": { en: "Mother's HBsAg (hepatitis B):", de: "HBsAg der Mutter (Hepatitis B):", uk: "HBsAg матері (гепатит B):", ru: "HBsAg матери (гепатит B):" },
    "GBS (paciorkowiec grupy B):": { en: "GBS (group B streptococcus):", de: "GBS (B-Streptokokken):", uk: "СГБ (стрептокок групи B):", ru: "СГБ (стрептококк группы B):" },

    // --- placeholdery ---
    "Imię i nazwisko osoby towarzyszącej": { en: "Support person's full name", de: "Vor- und Nachname der Begleitperson", uk: "Ім'я та прізвище особи супроводу", ru: "Имя и фамилия сопровождающего" },
    "np. Wiktoria / Antoni": { en: "e.g. Emma / Oliver", de: "z. B. Emma / Leon", uk: "напр. Вікторія / Антон", ru: "напр. Виктория / Антон" },
    "np. 10.09.2026": { en: "e.g. 10/09/2026", de: "z. B. 10.09.2026", uk: "напр. 10.09.2026", ru: "напр. 10.09.2026" },
    "np. dr / położna prowadząca": { en: "e.g. Dr / lead midwife", de: "z. B. Dr. / betreuende Hebamme", uk: "напр. лікар / провідна акушерка", ru: "напр. врач / ведущая акушерка" },
    "np. A Rh+": { en: "e.g. A Rh+", de: "z. B. A Rh+", uk: "напр. A Rh+", ru: "напр. A Rh+" },

    // --- strefa zakupu / pobrania ---
    "Wasz plan jest gotowy": { en: "Your plan is ready", de: "Ihr Plan ist fertig", uk: "Ваш план готовий", ru: "Ваш план готов" },
    "Wybierzcie pakiet, a zaraz po płatności wrócicie tutaj i pobierzecie gotowy dokument PDF. Wasze odpowiedzi są zapisane w tej przeglądarce.": { en: "Choose a package — right after payment you'll come back here and download the finished PDF. Your answers are saved in this browser.", de: "Wählen Sie ein Paket — direkt nach der Zahlung kehren Sie hierher zurück und laden das fertige PDF herunter. Ihre Antworten sind in diesem Browser gespeichert.", uk: "Оберіть пакет — одразу після оплати ви повернетесь сюди й завантажите готовий PDF. Ваші відповіді збережені в цьому браузері.", ru: "Выберите пакет — сразу после оплаты вы вернётесь сюда и скачаете готовый PDF-документ. Ваши ответы сохранены в этом браузере." },
    "Plan porodu PDF": { en: "Birth plan PDF", de: "Geburtsplan-PDF", uk: "PDF плану пологів", ru: "PDF плана родов" },
    "Plan + 3 poradniki PDF": { en: "Plan + 3 PDF guides", de: "Plan + 3 PDF-Ratgeber", uk: "План + 3 PDF-довідники", ru: "План + 3 PDF-руководства" },
    "Plan + 7 PDF + przegląd": { en: "Plan + 7 PDFs + review", de: "Plan + 7 PDFs + Durchsicht", uk: "План + 7 PDF + перевірка", ru: "План + 7 PDF + проверка" },
    "POLECANY": { en: "RECOMMENDED", de: "EMPFOHLEN", uk: "РЕКОМЕНДОВАНО", ru: "РЕКОМЕНДУЕМ" },
    "💳 BLIK, karta, Apple Pay, Google Pay, PayPal przez PayHip · dostawa natychmiast": { en: "💳 BLIK, card, Apple Pay, Google Pay, PayPal via PayHip · instant delivery", de: "💳 BLIK, Karte, Apple Pay, Google Pay, PayPal über PayHip · sofortige Lieferung", uk: "💳 BLIK, картка, Apple Pay, Google Pay, PayPal через PayHip · миттєва доставка", ru: "💳 BLIK, карта, Apple Pay, Google Pay, PayPal через PayHip · мгновенная доставка" },
    "Dziękujemy! Plan jest gotowy do pobrania": { en: "Thank you! Your plan is ready to download", de: "Danke! Ihr Plan steht zum Download bereit", uk: "Дякуємо! План готовий до завантаження", ru: "Спасибо! План готов к скачиванию" },
    "Kliknijcie poniżej, a dokument zapisze się na Waszym urządzeniu. Wydrukujcie dwa egzemplarze: jeden do torby, drugi dla położnej.": { en: "Click below and the document will save to your device. Print two copies: one for your bag, one for the midwife.", de: "Klicken Sie unten und das Dokument wird auf Ihrem Gerät gespeichert. Drucken Sie zwei Exemplare: eines für die Tasche, eines für die Hebamme.", uk: "Натисніть нижче — документ збережеться на вашому пристрої. Роздрукуйте два примірники: один у сумку, другий для акушерки.", ru: "Нажмите ниже — документ сохранится на вашем устройстве. Распечатайте два экземпляра: один в сумку, второй для акушерки." },
    "Rodzicie obcojęzyczni? Pobierzcie też własną kopię": { en: "Not a Polish speaker? Download your own copy too", de: "Sie sprechen kein Polnisch? Laden Sie auch Ihre eigene Kopie herunter", uk: "Не розмовляєте польською? Завантажте також власну копію", ru: "Не говорите по-польски? Скачайте также свою копию" },
    "Personel dostaje wersję polską. Wy możecie mieć tę samą treść we własnym języku.": { en: "Staff get the Polish version. You can have the same content in your own language.", de: "Das Personal erhält die polnische Fassung. Sie können denselben Inhalt in Ihrer eigenen Sprache haben.", uk: "Персонал отримує польську версію. Ви можете мати той самий зміст своєю мовою.", ru: "Персонал получает польскую версию. У вас может быть то же содержание на вашем языке." },
    "Pobierz kopię w tym języku →": { en: "Download a copy in this language →", de: "Kopie in dieser Sprache herunterladen →", uk: "Завантажити копію цією мовою →", ru: "Скачать копию на этом языке →" },
    "Podgląd Waszego planu będzie pojawiał się tutaj na bieżąco, w miarę zaznaczania opcji.": { en: "A preview of your plan will appear here live as you tick options.", de: "Eine Vorschau Ihres Plans erscheint hier live, während Sie Optionen markieren.", uk: "Перегляд вашого плану з'являтиметься тут наживо, у міру позначення опцій.", ru: "Предпросмотр вашего плана будет появляться здесь в реальном времени, по мере отметки опций." },
    "Kup i pobierz swój plan PDF →": { en: "Buy and download your PDF plan →", de: "Plan als PDF kaufen und herunterladen →", uk: "Купити і завантажити свій PDF-план →", ru: "Купить и скачать свой PDF-план →" },
    "Najpierw wybierasz pakiet i płacisz, potem od razu pobierasz gotowy plan PDF oraz pozostałe produkty z pakietu.": { en: "First you choose a package and pay, then you immediately download the finished PDF plan and the other products in the package.", de: "Zuerst wählen Sie ein Paket und zahlen, dann laden Sie sofort den fertigen PDF-Plan und die übrigen Produkte des Pakets herunter.", uk: "Спочатку обираєте пакет і оплачуєте, потім одразу завантажуєте готовий PDF-план та інші продукти пакета.", ru: "Сначала выбираете пакет и оплачиваете, затем сразу скачиваете готовый PDF-план и остальные продукты пакета." },
    "Zacznij od nowa": { en: "Start over", de: "Neu beginnen", uk: "Почати спочатку", ru: "Начать заново" },
    "Zobacz podsumowanie": { en: "See summary", de: "Zusammenfassung ansehen", uk: "Переглянути підсумок", ru: "Посмотреть итоги" }
  };

  // ---- Teksty generowane w JS (podsumowanie, nagłówki) ----
  var SUM = {
    pl: { basic: "Dane podstawowe", change: "Zmień", mother: "Rodząca", partner: "Osoba towarzysząca", child: "Dziecko", due: "Termin", doctor: "Lekarz/położna", blood: "Grupa krwi i Rh matki", items: "poz.",
      none: "Nie zaznaczyliście jeszcze żadnych preferencji. Wróćcie do wcześniejszych kroków.",
      fullPre: "Wasz kompletny plan —", fullMid: "preferencji w", fullEnd: "sekcjach.",
      selPre: "Wybraliście", selMid: "preferencji w", selEnd: "sekcjach. Pierwsze", selEnd2: "widzicie w całości — pozostałe odblokujecie po zakupie.",
      ctaH: "Gotowe — czas odebrać swój plan", ctaP: "Po zakupie pobierzesz pełny dokument PDF z brandem, formatowaniem i miejscem na podpisy.", ctaBtn: "Wybierz pakiet i pobierz plan →",
      step: "Krok", of: "z", complete: "% ukończone" },
    en: { basic: "Key details", change: "Edit", mother: "Mother", partner: "Support person", child: "Baby", due: "Due date", doctor: "Doctor/midwife", blood: "Mother's blood group and Rh", items: "items",
      none: "You haven't selected any preferences yet. Go back to the earlier steps.",
      fullPre: "Your complete plan —", fullMid: "preferences across", fullEnd: "sections.",
      selPre: "You selected", selMid: "preferences across", selEnd: "sections. You can see the first", selEnd2: "in full — the rest unlock after purchase.",
      ctaH: "All set — time to collect your plan", ctaP: "After purchase you'll download the full PDF with branding, formatting and space for signatures.", ctaBtn: "Choose a package and download your plan →",
      step: "Step", of: "of", complete: "% complete" },
    de: { basic: "Wichtige Angaben", change: "Ändern", mother: "Mutter", partner: "Begleitperson", child: "Kind", due: "Geburtstermin", doctor: "Arzt/Hebamme", blood: "Blutgruppe und Rh der Mutter", items: "Pos.",
      none: "Sie haben noch keine Präferenzen ausgewählt. Kehren Sie zu den vorherigen Schritten zurück.",
      fullPre: "Ihr vollständiger Plan —", fullMid: "Präferenzen in", fullEnd: "Abschnitten.",
      selPre: "Sie haben", selMid: "Präferenzen in", selEnd: "Abschnitten gewählt. Die ersten", selEnd2: "sehen Sie vollständig — die übrigen schalten Sie nach dem Kauf frei.",
      ctaH: "Fertig — Zeit, Ihren Plan abzuholen", ctaP: "Nach dem Kauf laden Sie das vollständige PDF mit Branding, Formatierung und Platz für Unterschriften herunter.", ctaBtn: "Paket wählen und Plan herunterladen →",
      step: "Schritt", of: "von", complete: "% abgeschlossen" },
    uk: { basic: "Ключові дані", change: "Змінити", mother: "Породілля", partner: "Особа супроводу", child: "Дитина", due: "Дата пологів", doctor: "Лікар/акушерка", blood: "Група крові та Rh матері", items: "поз.",
      none: "Ви ще не позначили жодних побажань. Поверніться до попередніх кроків.",
      fullPre: "Ваш повний план —", fullMid: "побажань у", fullEnd: "розділах.",
      selPre: "Ви обрали", selMid: "побажань у", selEnd: "розділах. Перші", selEnd2: "бачите повністю — решту розблокуєте після покупки.",
      ctaH: "Готово — час отримати свій план", ctaP: "Після покупки завантажите повний PDF з брендуванням, форматуванням і місцем для підписів.", ctaBtn: "Обрати пакет і завантажити план →",
      step: "Крок", of: "з", complete: "% завершено" },
    ru: { basic: "Ключевые данные", change: "Изменить", mother: "Роженица", partner: "Сопровождающий", child: "Ребёнок", due: "Дата родов", doctor: "Врач/акушерка", blood: "Группа крови и Rh матери", items: "поз.",
      none: "Вы ещё не отметили ни одного пожелания. Вернитесь к предыдущим шагам.",
      fullPre: "Ваш полный план —", fullMid: "пожеланий в", fullEnd: "разделах.",
      selPre: "Вы выбрали", selMid: "пожеланий в", selEnd: "разделах. Первые", selEnd2: "видите полностью — остальные разблокируете после покупки.",
      ctaH: "Готово — время получить свой план", ctaP: "После покупки скачаете полный PDF с брендингом, форматированием и местом для подписей.", ctaBtn: "Выбрать пакет и скачать план →",
      step: "Шаг", of: "из", complete: "% завершено" }
  };

  function ready(fn) {
    if (global.PNM_I18N) { fn(); return; }
    var tries = 0;
    var iv = setInterval(function () {
      if (global.PNM_I18N || ++tries > 100) { clearInterval(iv); if (global.PNM_I18N) fn(); }
    }, 30);
  }

  ready(function () {
    var I = global.PNM_I18N;
    I.txt = TXT;
    I.sum = SUM;

    // Tłumaczy pojedynczy statyczny tekst kreatora; brak wpisu -> oryginał PL
    I.tx = function (pl, lang) {
      if (!lang || lang === 'pl') return pl;
      var e = TXT[pl];
      return (e && e[lang]) ? e[lang] : pl;
    };
    // Skróty do tekstów generowanych w JS
    I.s = function (lang) { return SUM[lang] || SUM.pl; };
  });
})(window);
