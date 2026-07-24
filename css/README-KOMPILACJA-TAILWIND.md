# Tailwind — kompilacja lokalna

CDN został usunięty. Strona używa skompilowanego pliku `css/tailwind.min.css` (~30 KB
zamiast ~400 KB JS-a), dzięki czemu CSP nie wymaga już `unsafe-eval`.

## WAŻNE: po każdej zmianie klas w HTML trzeba przekompilować

Tailwind skanuje pliki HTML i generuje tylko użyte klasy. Jeśli dodasz nową klasę
w HTML i nie przekompilujesz — **nie zadziała**.

## Jak przekompilować

```
npm install tailwindcss@3.4.17
npx tailwindcss -c tailwind.config.js -i src/in.css -o css/tailwind.min.css --minify
```

Pliki `tailwind.config.js` i `src/in.css` znajdują się w tym katalogu.

## Tryb obserwowania przy pracy

```
npx tailwindcss -c tailwind.config.js -i src/in.css -o css/tailwind.min.css --watch
```
