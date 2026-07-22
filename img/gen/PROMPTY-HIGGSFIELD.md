# Prompty do generowania grafik — PoródNaMiarę.pl

## Zasady wspólne (dopisz do KAŻDEGO promptu)

**Styl bazowy:**
```
soft natural daylight, warm muted palette of dusty rose (#A0525E), cream (#FAF5EF)
and deep plum (#3E3852), shallow depth of field, photorealistic editorial photography,
calm and tender mood, no text, no logos, no watermarks
```

**Negatywne (wykluczenia):**
```
no visible medical procedures, no blood, no needles, no distress, no clinical coldness,
no stock-photo smiles, no text overlays, no watermark, no deformed hands, no extra fingers
```

**Format:** 16:9 (1600×900) dla nagłówków artykułów · 4:5 (1000×1250) dla sekcji strony głównej
**Eksport:** WebP, jakość 82, docelowo poniżej 180 KB

⚠️ **Twarze:** unikaj generowania rozpoznawalnych twarzy w zbliżeniu. Bezpieczniejsze
kadry: dłonie, sylwetki od tyłu, kadr od ramion w dół, rozmyte tło.

---

## Slot 1 — `krew-hero.webp` (16:9)
Nagłówek artykułu o krwi pępowinowej.
```
Close-up of a newborn baby's tiny hand resting in a parent's palm, soft hospital
bedsheets in background, morning light through window, extremely shallow depth of field,
tender and hopeful atmosphere
```

## Slot 2 — `krew-laboratorium.webp` (16:9)
Sekcja o przechowywaniu materiału.
```
Abstract macro photograph of cryogenic storage, soft blue-white vapor,
clean modern laboratory environment out of focus, minimal and elegant,
scientific but warm, no people
```

## Slot 3 — `krew-odpepnienie.webp` (16:9)
Sekcja o konflikcie odpępnienie vs objętość.
```
Mother holding newborn skin-to-skin on her chest, viewed from the side,
soft blanket, warm window light, face not fully visible, intimate and peaceful,
first moments after birth
```

## Slot 4 — `hero-glowny.webp` (4:5)
Sekcja hero na stronie głównej (zastępuje `img/hero.webp`).
```
Expectant couple sitting together at a kitchen table reviewing printed documents,
warm home interior, morning light, seen from behind and slightly above,
calm preparation mood, papers and a cup of tea on the table
```

## Slot 5 — `tata-noworodek.webp` (4:5)
Sekcja „Dlaczego my" / artykuły dla taty.
```
Father holding newborn baby skin-to-skin against his bare chest, seated in a quiet
hospital room, viewed from the side, soft window light, protective and tender,
face partially out of frame
```

## Slot 6 — `plan-dokument.webp` (16:9)
Sekcja produktowa / cennik.
```
Flat lay of a printed birth plan document on a linen surface, next to a pen,
dried flowers and a folded baby blanket, top-down view, soft shadows,
editorial product photography, dusty rose accents
```

## Slot 7 — `szpital-przyjecie.webp` (16:9)
Artykuł o dostępności znieczulenia / wyborze szpitala.
```
Modern hospital corridor with soft natural light from large windows,
empty and calm, warm tones, architectural photography, no people, reassuring
```

## Slot 8 — `pierwsza-pomoc.webp` (16:9)
Artykuł o pierwszej pomocy.
```
Parent's hands gently supporting a sleeping infant on a soft blanket,
calm domestic setting, warm daylight, protective gesture, no medical equipment
```

---

## Workflow po wygenerowaniu

1. Pobierz z Higgsfield w najwyższej jakości
2. Konwersja: `cwebp -q 82 wejscie.png -o img/gen/nazwa.webp`
3. Sprawdź wagę: powyżej 200 KB obniż jakość do 78
4. Wgraj do `img/gen/` i zacommituj przez GitHub Desktop
5. Grafiki podmienią placeholdery automatycznie — nazwy plików są już wpięte w kod

## Uwaga prawna

Grafiki generowane przez AI nie mogą przedstawiać rzeczywistych osób ani sugerować,
że są dokumentacją prawdziwych zdarzeń medycznych. Nie używaj ich jako „zdjęć klientów"
ani „historii pacjentów" — to byłoby wprowadzanie w błąd. Do sekcji „O Michale"
i opinii klientów używaj wyłącznie prawdziwych zdjęć.
