# PoródNaMiarę.pl — instrukcja uruchomienia sprzedaży

Strona jest technicznie gotowa. Poniżej wyłącznie to, co musisz zrobić Ty.
Kolejność ma znaczenie — punkty 1–3 są obowiązkowe przed pierwszą sprzedażą.

═══════════════════════════════════════════
## 1. REGULAMIN — WYMÓG PRAWNY (15 minut)
═══════════════════════════════════════════

Plik: `regulamin.html`, sekcja §1.

Wpisz swoje dane: imię i nazwisko, adres do korespondencji, adres e-mail.
Ustawa o prawach konsumenta wymaga, żeby te dane były dostępne PRZED zakupem.
Bez tego sprzedaż jest niezgodna z prawem.

NIP nie jest potrzebny przy działalności nierejestrowanej.
Limit przychodu działalności nierejestrowanej: ok. 3 499 zł miesięcznie
(75% minimalnego wynagrodzenia). Po przekroczeniu — rejestracja działalności.
Prowadź prostą ewidencję sprzedaży (data, kwota, numer zamówienia PayHip).

═══════════════════════════════════════════
## 2. PAYHIP — KONFIGURACJA (1–2 godziny)
═══════════════════════════════════════════

### 2a. Konto
1. Rejestracja na payhip.com → wybierz konto indywidualne (bez firmy)
2. Settings → Payments → połącz konto bankowe do wypłat
3. Settings → Payments → włącz **BLIK**, karty, Apple Pay, Google Pay
   BLIK to w Polsce większość płatności mobilnych — bez niego tracisz połowę sprzedaży

### 2b. Utwórz 3 produkty

| Produkt | Cena | Co zawiera |
|---|---|---|
| Plan porodu — Podstawowy | 49 zł | plan generowany na stronie |
| Plan porodu — Premium | 99 zł | plan + 3 poradniki PDF |
| Plan porodu — Premium+ | 179 zł | plan + 7 poradników PDF + przegląd mailem |

Dla każdego produktu:
- Add New Product → **Digital Product**
- Wgraj pliki PDF (patrz punkt 3)
- Włącz **Instant Delivery**
- Limit pobrań: **5**, wygaśnięcie linku: **30 dni**
- **After purchase redirect URL:** `https://porodnamiare.pl/dziekujemy`
  ⚠️ To jest krytyczne — bez tego klient nie wróci po swój plan

### 2c. Podmień linki w kodzie

Skopiuj z PayHip linki produktów (format `payhip.com/b/XXXX`) i zastąp
w plikach placeholdery:

```
TWOJ_LINK_PODSTAWOWY   → link produktu 49 zł
TWOJ_LINK_PREMIUM      → link produktu 99 zł
PREMIUM_PLUS_LINK      → link produktu 179 zł
PLAN_POLOZU_LINK       → jeśli sprzedajesz osobno
LAKTACJA_LINK          → jw.
CESARSKIE_LINK         → jw.
CHUSTO_LINK            → jw.
TATA_LINK              → jw.
TORBA_PREMIUM_LINK     → jw.
WYPRAWKA_LINK          → jw.
YOUR_EN_PRODUCT        → wersja angielska (en/index.html)
YOUR_DE_PRODUCT        → wersja niemiecka (de/index.html)
YOUR_UA_PRODUCT        → wersja ukraińska (ua/index.html)
```

Znajdź je poleceniem w folderze projektu:
```
findstr /s /i "TWOJ_LINK PREMIUM_PLUS_LINK YOUR_EN_PRODUCT" *.html
```

═══════════════════════════════════════════
## 3. PDF-y DO PAKIETÓW — CO MUSISZ PRZYGOTOWAĆ
═══════════════════════════════════════════

Plan porodu generuje się automatycznie na stronie — **nie musisz go przygotowywać**.
Potrzebujesz natomiast plików dodatkowych, które PayHip wyśle mailem po zakupie.

### Pakiet Podstawowy (49 zł)
Wystarczy jeden plik-potwierdzenie, np. `Instrukcja-pobrania-planu.pdf`:
> „Dziękujemy za zakup. Wróć na porodnamiare.pl/dziekujemy i kliknij
> »Pobierz swój plan porodu«. Twoje odpowiedzi są zapisane w przeglądarce."

To spełnia wymóg natychmiastowej dostawy produktu cyfrowego.

### Pakiet Premium (99 zł) — 3 pliki
1. `Plan-polozu.pdf` — kalendarz pierwszych 6 tygodni po porodzie
2. `Checklist-dla-taty.pdf` — rozszerzona wersja artykułu z bloga
3. `Torba-do-szpitala.pdf` — lista z podziałem: mama / dziecko / tata

### Pakiet Premium+ (179 zł) — 7 plików
Powyższe 3 oraz:
4. `Wsparcie-laktacyjne.pdf`
5. `Ciecie-cesarskie-przewodnik.pdf`
6. `Chustowanie-podstawy.pdf`
7. `Szczepienia-kalendarz.pdf`

**Jak je zrobić szybko:** treść masz już w artykułach na blogu.
Skopiuj do dokumentu, dodaj okładkę w tej samej kolorystyce (róż #A0525E,
tło #FAF5EF, nagłówki Fraunces) i wyeksportuj do PDF.
Canva ma darmowe szablony A4 — 30–45 minut na plik.

**Usługa „przegląd mailem" w Premium+:** klient wysyła Ci gotowy plan,
Ty odpisujesz z uwagami. Zajmuje ok. 10 minut i jest jedyną rzeczą,
której konkurencja nie skopiuje.

═══════════════════════════════════════════
## 4. MAILERLITE — ODZYSKIWANIE PORZUCONYCH KREATORÓW
═══════════════════════════════════════════

Bramka e-mail pokazuje się automatycznie po 7. kroku kreatora.
To Twój najgorętszy lead — ktoś, kto zainwestował 10 minut i jeszcze nie kupił.

1. Załóż konto na mailerlite.com (darmowe do 1000 subskrybentów)
2. Utwórz grupę „Kreator — porzucone"
3. Utwórz formularz typu Embedded, skopiuj adres z pola `action`
4. Podmień w plikach placeholder `TWOJ-FORMULARZ.mailerlite.com`
   (występuje w `index.html` ×3 oraz `produkty/torba-do-szpitala.html` ×1)

### Sekwencja 3 maili (Automation → po zapisie do grupy)

**Mail 1 — po 24 h**
Temat: „Wasz plan porodu czeka"
Treść: link do `porodnamiare.pl/#kreator` + zdanie, że postęp jest zapisany.

**Mail 2 — po 3 dniach**
Temat: „3 rzeczy, o które warto zapytać w szpitalu"
Treść: link do artykułu o dostępności znieczulenia. Wartość, nie sprzedaż.

**Mail 3 — po 7 dniach**
Temat: „Zostało kilka kroków"
Treść: przypomnienie + informacja, że podgląd jest darmowy.

═══════════════════════════════════════════
## 5. PLAUSIBLE — ANALITYKA (20 minut)
═══════════════════════════════════════════

Bez tego piszesz artykuły na ślepo.

1. Konto na plausible.io, dodaj domenę porodnamiare.pl
2. W plikach HTML odkomentuj linię (usuń `<!--` i `-->`):
   `<script defer data-domain="porodnamiare.pl" src="https://plausible.io/js/script.js"></script>`
   Występuje na 21 podstronach.

Co obserwować: które artykuły dają wejścia do kreatora,
ilu ludzi dochodzi do podsumowania, ile z tego kończy się zakupem.

═══════════════════════════════════════════
## 6. GRAFIKI I AUDIO (opcjonalne, ale mocne)
═══════════════════════════════════════════

- **Zdjęcie do „O Michale"** → `img/o-michale.webp`
  To największa dźwignia konwersji na całej stronie. Prawdziwe zdjęcie, nie AI.
- **Grafiki Higgsfield** → prompty w `img/gen/PROMPTY-HIGGSFIELD.md`
- **Nagranie audio** → `audio/michal-o-stronie.mp3`, tekst w `audio/SUNO-GOTOWE-DO-WKLEJENIA.md`
- **Muzyka** → podmień `music/porodnamiaresong.mp3` na własny utwór

═══════════════════════════════════════════
## JAK DZIAŁA SPRZEDAŻ — SCHEMAT
═══════════════════════════════════════════

```
Artykuł SEO → Kreator (13 kroków, ZA DARMO)
                  ↓
        po kroku 7: bramka e-mail (można pominąć)
                  ↓
    Podsumowanie + podgląd z blurem i znakiem wodnym
                  ↓
        Wybór pakietu → PayHip (BLIK / karta)
                  ↓
        Redirect na /dziekujemy
                  ↓
    Klik „Pobierz swój plan" → wraca na /?unlocked=1#kreator
                  ↓
    PDF generuje się w przeglądarce i pobiera automatycznie
```

**Dlaczego kreator jest przed płatnością:** człowiek, który przeszedł 13 kroków
i zobaczył imię swojego dziecka w dokumencie, psychologicznie już go posiada.
Płatność jest odebraniem czegoś swojego, a nie zakupem czegoś nieznanego.

**Zabezpieczenie (3 warstwy):**
1. **Podgląd na żywo** — blur na sekcjach 3+, diagonalny znak wodny, blokada
   kopiowania i menu kontekstowego (user-select:none).
2. **Podsumowanie (krok 12)** — pokazuje w całości tylko 2 pierwsze sekcje;
   pozostałe rozmyte pod kłódką aż do zakupu. Wcześniej ujawniało cały plan.
3. **Generator PDF** — wymaga flagi zakupu (window.__freshUnlock). Odblokowanie
   po powrocie z PayHip wymaga też markera rozpoczęcia zakupu (klik pay-link
   lub dotarcie na /dziekujemy), więc samo wpisanie ?unlocked=1 z palca nie działa.

To wciąż ochrona po stronie przeglądarki — zaawansowany użytkownik może ją obejść
(kod działa lokalnie), ale poprzeczka jest realnie wysoka, a cały plan nie jest
już dostępny za darmo w podsumowaniu. Twoja grupa to rodzice w trzecim trymestrze.
Twardą bramkę (webhook PayHip + token serwerowy generujący jednorazowy link)
wdrażamy przy ok. 10 zamówieniach tygodniowo — wcześniej to zabezpieczanie
przychodu, którego jeszcze nie ma.

═══════════════════════════════════════════
## KOSZTY
═══════════════════════════════════════════

| Pozycja | Koszt |
|---|---|
| Vercel (hosting) | 0 zł |
| PayHip | 5% od transakcji, bez abonamentu |
| jsPDF (generator PDF) | 0 zł — licencja MIT |
| Font Lato | 0 zł — Open Font License |
| MailerLite | 0 zł do 1000 subskrybentów |
| Plausible | ok. 9 USD/mies. (jest 30 dni próbnych) |

**Nie musisz płacić za nic, żeby wystartować.**
Generator PDF działa lokalnie w przeglądarce klienta — brak kosztów serwerowych,
brak limitów, brak opłat za wygenerowany dokument.

═══════════════════════════════════════════
## BEZPIECZNE ODBLOKOWANIE PO PŁATNOŚCI (webhook PayHip + JWT) — ~30 min
═══════════════════════════════════════════

Co się zmieniło: dawna flaga `__freshUnlock` (ustawiana samym wejściem na URL
z `?unlocked=1`) była trywialna do obejścia z konsoli przeglądarki i przez
ręczne wejście na /dziekujemy. Teraz odblokowanie następuje WYŁĄCZNIE po
potwierdzeniu realnej płatności przez webhook PayHip, zapisanym w bazie Redis
i wydanym jako podpisany token JWT (RS256, ważny 30 dni). Klucz prywatny
nigdy nie opuszcza serwera. Nowe pliki: `api/payhip-webhook.js`,
`api/unlock.js`, `api/verify.js`, `api/_lib/common.js`, `package.json`.

### 1. Baza Redis (Upstash) — 3 minuty
Uwaga: dawne „Vercel KV” zostało wycofane. Teraz robi się to przez Marketplace:
1. Vercel → Twój projekt → zakładka **Storage** → **Marketplace Database
   Integrations** → wybierz **Upstash** → **Redis** → Create.
2. Połącz z projektem porodnamiare.pl → Vercel sam doda zmienne środowiskowe
   (najczęściej `KV_REST_API_URL` i `KV_REST_API_TOKEN` — jeśli nazwy będą
   inne, sprawdź w Settings → Environment Variables i dopisz brakujące pod
   dokładnie tymi dwiema nazwami, bo tak czyta je kod).

### 2. Klucz API PayHip — 1 minuta
Payhip → Account → Settings → Developer → skopiuj **API key**.
To NIE jest osobny „webhook secret” — PayHip liczy podpis webhooka jako
sha256 z tego samego klucza API, więc jedna wartość służy do obu celów.

### 3. Para kluczy RSA (do podpisywania JWT) — 2 minuty
W terminalu (na swoim komputerze, nie na Vercelu):
```
openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:2048 -out private.pem
openssl rsa -pubout -in private.pem -out public.pem
cat private.pem
cat public.pem
```
Skopiuj całą zawartość obu plików (razem z liniami `-----BEGIN...-----`
i `-----END...-----`) — wkleisz je do zmiennych środowiskowych w kroku 4.
Po wklejeniu usuń `private.pem`/`public.pem` ze swojego dysku (nie trzymaj
ich w repo, w mailu ani w chmurze bez szyfrowania).

### 4. Zmienne środowiskowe w Vercel — 5 minut
Vercel → projekt → Settings → Environment Variables, dodaj (Production +
Preview):

| Nazwa | Wartość |
|---|---|
| `PAYHIP_API_KEY` | klucz API z kroku 2 |
| `RSA_PRIVATE_KEY` | pełna zawartość `private.pem` (wklej z prawdziwymi znakami nowej linii — pole Vercel jest wieloliniowe, nie trzeba nic zamieniać na `\n`) |
| `RSA_PUBLIC_KEY` | pełna zawartość `public.pem` |

Po dodaniu: **Redeploy** projektu (zmienne środowiskowe działają dopiero po
nowym wdrożeniu).

### 5. Webhook w PayHip — 2 minuty
Payhip → Settings → Developer → **Webhooks** → wklej:
```
https://porodnamiare.pl/api/payhip-webhook
```
Zaznacz zdarzenia: **paid** i **refunded** (refunded pozwala automatycznie
cofnąć dostęp przy zwrocie płatności).

### 6. Redirect po checkoucie — 1 minuta
Payhip → Settings → Advanced Settings → Checkout Settings → włącz redirect
i ustaw:
```
https://porodnamiare.pl/dziekujemy
```
(dla wszystkich 3 produktów). To jedyny sposób na PayHip — redirect jest
statyczny i nie doklei numeru transakcji, dlatego identyfikator (`sid`)
generujemy po stronie przeglądarki PRZED wysłaniem na PayHip i wracamy po
niego sami z Reditem po powrocie — nic więcej nie musisz tu konfigurować,
to już działa w kodzie.

### 7. Test end-to-end — 5 minut
1. Wejdź na stronę w trybie incognito, wypełnij kreator, kliknij pakiet
   Podstawowy, zapłać (PayHip ma tryb testowy/sandbox — sprawdź w ich
   dokumentacji jak go włączyć dla Twojego konta, albo zrób jedną realną
   transakcję na 49 zł i zwróć ją sobie potem).
2. Po powrocie na /dziekujemy napis powinien zmienić się na „Płatność
   potwierdzona ✓” w ciągu kilku sekund.
3. Sprawdź w logach Vercel (Deployments → ostatni deploy → Functions →
   `payhip-webhook`), czy webhook faktycznie przyszedł i zwrócił `200`.
4. **Ważne:** w tych samych logach sprawdź w polu `body` prawdziwy kształt
   pola `metadata` — dokumentacja PayHip nie pokazuje jednoznacznie, czy
   dotrze jako `metadata: {sid: "..."}` czy inaczej. Jeśli w logu zobaczysz
   ostrzeżenie „brak sid w metadata”, otwórz `api/payhip-webhook.js`,
   znajdź funkcję `extractSid()` i dopisz właściwą ścieżkę do pola — to
   dosłownie jeden dodatkowy `if`.
5. Kliknij „Pobierz swój plan porodu” — PDF powinien się pobrać bez
   komunikatu „Dokończ zakup”.

### Co to realnie daje, a czego nie
Podpięcie realnej płatności + serwerowa weryfikacja JWT zamyka najprostsze
obejście (ręczne wejście na URL, edycja localStorage) i to jest sedno tego
zadania. Generowanie PDF nadal dzieje się w przeglądarce (jsPDF), więc
technicznie zaawansowany użytkownik może wywołać funkcję generującą wprost
z konsoli deweloperskiej, omijając bramkę w JS — to ograniczenie każdego
rozwiązania czysto klienckiego. Żeby to całkowicie zamknąć, trzeba by
przenieść generowanie PDF na serwer (klient wysyłałby odpowiedzi + JWT,
serwer weryfikowałby token i dopiero wtedy budował PDF do pobrania) — to
osobny, większy projekt, wart rozważenia gdy skala sprzedaży uzasadni koszt
utrzymania. Na teraz zaimplementowane rozwiązanie usuwa realne, łatwe do
znalezienia obejście i jest współmierne do ryzyka.

═══════════════════════════════════════════
## CHECKLISTA PRZED PUBLIKACJĄ
═══════════════════════════════════════════

- [ ] Regulamin §1 uzupełniony o dane sprzedawcy
- [ ] PayHip: 3 produkty, BLIK włączony, Instant Delivery, redirect na /dziekujemy
- [ ] Wszystkie placeholdery linków podmienione
- [ ] PDF-y dla pakietów Premium i Premium+ wgrane do PayHip
- [ ] MailerLite podpięty (formularz + 3 maile)
- [ ] Plausible odkomentowany
- [ ] Test zakupu na własnym koncie (PayHip ma tryb testowy)
- [ ] Test pełnej ścieżki na telefonie: kreator → płatność → pobranie PDF
- [ ] Baza Redis (Upstash) podłączona, zmienne env ustawione, redeploy wykonany
- [ ] Webhook PayHip wskazuje na /api/payhip-webhook, zdarzenia paid+refunded
- [ ] Redirect po checkoucie ustawiony na /dziekujemy dla wszystkich produktów
- [ ] Test end-to-end: zakup → /dziekujemy pokazuje "Płatność potwierdzona" → PDF się pobiera
