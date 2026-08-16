# PoródNaMiarę.pl — paczka produkcyjna (Vercel)

WAŻNE: strona musi być otwierana z całym folderem (index.html + img/ + pliki).
Jeśli otworzysz sam index.html bez folderu img/, zdjęcia się nie wyświetlą —
to nie błąd strony. Po wgraniu na Vercel wszystko działa automatycznie.

## 1. Wdrożenie na Vercel (10 minut)
1. Rozpakuj zip. Wejdź na vercel.com/new → "Deploy without Git" albo:
   utwórz repo na GitHub, wgraj pliki, w Vercel: New Project → Import → Deploy.
   Framework preset: "Other" (strona statyczna, zero konfiguracji).
2. Settings → Domains → dodaj: porodnamiare.pl oraz www.porodnamiare.pl.
   U rejestratora domeny ustaw rekordy, które pokaże Vercel:
   A @ = 76.76.21.21, CNAME www = cname.vercel-dns.com.
   HTTPS włączy się samo (certyfikat automatyczny).

## 2. Stripe (płatności międzynarodowe)
1. Załóż konto stripe.com → aktywuj płatności (karty, BLIK, Apple Pay, Google Pay,
   Link — wszystko w Settings → Payment methods).
2. Products → utwórz "Plan porodu Podstawowy" 49 PLN i "Plan porodu Premium" 99 PLN.
3. Dla każdego: Create payment link. W opcjach linku:
   - włącz "Collect customers' email",
   - dodaj Custom field: "Imiona rodziców" (tekst),
   - After payment → pokaż komunikat: "Dziękujemy! Twój plan wyślemy w 24 h
     na podany e-mail. Odpisz na maila z potwierdzeniem, załączając zrzut
     podglądu planu z kreatora."
4. W index.html podmień:
   https://buy.stripe.com/TWOJ_LINK_PODSTAWOWY  → Twój link Podstawowy
   https://buy.stripe.com/TWOJ_LINK_PREMIUM     → Twój link Premium

## 3. E-mail kontakt@porodnamiare.pl (bezpłatnie)
Cloudflare Email Routing: dodaj domenę do Cloudflare (darmowy plan) →
Email → Routing → przekieruj kontakt@porodnamiare.pl na Twoją skrzynkę.

## 4. Prawo — uzupełnij przed pierwszą sprzedażą
- regulamin.html §1 i polityka-prywatnosci.html pkt 1: wpisz swoje dane
  (imię i nazwisko, adres; NIP po założeniu JDG).
- Na start wystarczy działalność nierejestrowana (limit miesięcznego
  przychodu wg aktualnych przepisów), potem JDG.

## 5. SEO — pierwsze 48 h po starcie
- Google Search Console: dodaj domenę (weryfikacja DNS przez Vercel/Cloudflare),
  wyślij sitemap: https://porodnamiare.pl/sitemap.xml
- Bing Webmaster Tools: import z Search Console (1 klik).
- Profil Google Business nie dotyczy (biznes online), ale załóż profile:
  Instagram, TikTok, Pinterest (ogromny ruch parentingowy) — linkuj do strony.

## 6. Newsletter (kolejny krok)
Załóż MailerLite (darmowy do 1000 subskrybentów) → utwórz formularz →
podmień oba formularze mailto (sekcja lead magnet + popup) na embed MailerLite.

## Hasztagi
#planporodu #porodnamiare #swiadomyporod #ciaza #zostanetata #noworodek
#przygotowaniedoporodu #tataniemowlaka #rodzew2026 #birthplan

## Bio do social mediów
"Twój poród. Twój plan. 💗 Spersonalizowane plany porodu tworzone przez tatę
dla rodziców. Najbardziej rozbudowana sekcja noworodkowa na rynku. ⬇️"

## 7. Bing / inne wyszukiwarki
1. bing.com/webmasters → "Import from Google Search Console" (1 klik) LUB
   dodaj ręcznie i wklej kod weryfikacyjny w index.html
   (<meta name="msvalidate.01" ...> — podmień TODO_KOD_WERYFIKACJI_BING).
2. Wyślij sitemap.xml również w Bing.
3. IndexNow (natychmiastowe indeksowanie Bing/Yandex/Seznam): w Vercel
   wystarczy darmowa integracja "IndexNow" z Marketplace lub ping ręczny:
   https://www.bing.com/indexnow?url=https://porodnamiare.pl/&key=TWOJ_KLUCZ

## 8. Wersje językowe
Strona ma przełącznik PL / EN / UA / RU (zapamiętywany w przeglądarce).
Warstwa marketingowa jest tłumaczona; dokument planu porodu celowo
generowany jest po polsku — to argument sprzedażowy dla rodzin
ukraińsko- i rosyjskojęzycznych rodzących w polskich szpitalach
(interfejs w ich języku, dokument zrozumiały dla personelu).

## 9. Rynki międzynarodowe — architektura
Strony krajowe (realia lokalne + lokalne ceny):
  /de → Niemcy (niemiecki, ceny w EUR, realia: Hebamme, PDA, U1/U2, wit. K doustnie)
  /ua → Ukraina (ukraiński, ceny w UAH, realia wg protokołów MOZ)
  /ru → rosyjskojęzyczni RODZĄCY W POLSCE (interfejs RU, dokument PL, ceny PLN)
WAŻNE — Stripe NIE obsługuje płatności z Rosji. Strona /ru celowo targetuje
diasporę rosyjskojęzyczną w Polsce/UE — to legalny i płatny rynek.

Domeny krajowe (opcjonalnie, później): kup np. geburtsplan-nach-mass.de,
dodaj w Vercel → Domains do tego samego projektu i ustaw redirect 301
w vercel.json: {"source":"/","has":[{"type":"host","value":"twojadomena.de"}],
"destination":"https://porodnamiare.pl/de","permanent":true}.
Na start subkatalogi + hreflang w zupełności wystarczą (tak robi Airbnb czy Stripe).

Stripe dla rynków: utwórz osobne Payment Links w EUR (DE: 29/49 €)
i UAH (UA: 490/990 ₴) i podmień w de/index.html oraz ua/index.html
(placeholdery DE_BASIS, DE_PREMIUM, UA_BASIC, UA_PREMIUM).

Niemcy — przed startem sprzedaży wymagane prawnie: Impressum (dane firmy)
i Widerrufsbelehrung po niemiecku. Placeholder jest w stopce /de.

## 10. Po tej aktualizacji (lipiec 2026)
- Kreator ma przycisk „Kopiuj podsumowanie planu”. W Stripe Payment Link dodaj
  Custom field (tekst, wymagane): "Podsumowanie planu (wklej z kreatora)".
- W Stripe ustaw po płatności redirect na: https://porodnamiare.pl/dziekujemy
  (strona istnieje; noindex; służy też jako cel konwersji w analityce).
- /de ma wyłączone płatności do czasu Impressum+Widerruf (ochrona przed Abmahnung);
  przycisk zbiera niewiążące pre-ordery mailowo.
- Nagłówki HSTS i Permissions-Policy są aktywne w vercel.json.
