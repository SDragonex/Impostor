# Nasazení na GitHub Pages

## Metoda 1: GitHub UI (nejjednodušší)

1. Vytvořte repozitář na GitHubu, např. `impostor-game`
2. Nahrajte všechny soubory z kořene projektu
3. **Settings → Pages**
4. Source: **Deploy from a branch**
5. Branch: `main` (nebo `master`), folder: **`/ (root)`**
6. Save

Po ~1 minutě bude hra na:

```
https://<username>.github.io/impostor-game/
```

> Pokud je repozitář pojmenovaný `<username>.github.io`, URL bude `https://<username>.github.io/` (bez subpath).

---

## Metoda 2: GitHub Actions (doporučeno pro CI)

Workflow soubor `.github/workflows/pages.yml` automaticky publikuje při pushi na `main`.

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4

      - name: Setup Pages
        uses: actions/configure-pages@v5

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: .

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

V **Settings → Pages** nastavte Source na **GitHub Actions**.

---

## Lokální vývoj

### Statický server

```bash
# Node (npx, bez instalace do projektu)
npx serve .

# Python
python -m http.server 8080

# PHP
php -S localhost:8080
```

### Test PWA lokálně

Service Worker vyžaduje **HTTPS nebo localhost**. Na `localhost` funguje registrace SW.

Pro test na telefonu v lokální síti:

```bash
npx serve . -l 3000
```

Telefon musí být ve stejné Wi-Fi; otevřete `http://<IP-počítače>:3000`.

> PWA instalace z HTTP (ne localhost) nebude fungovat – na produkci použijte GitHub Pages (HTTPS).

---

## Vlastní doména

1. V kořeni repozitáře vytvořte soubor `CNAME`:

   ```
   impostor.vase-domena.cz
   ```

2. U registrátora domény nastavte DNS:

   | Typ | Host | Hodnota |
   |-----|------|---------|
   | CNAME | impostor | `<username>.github.io` |

3. V GitHub **Settings → Pages → Custom domain** zadejte doménu
4. Zapněte **Enforce HTTPS**

---

## Subpath vs root

Projekt je navržen pro **root** nebo **subpath** (`/impostor-game/`).

Relativní cesty (`./css/styles.css`, `./js/app.js`) fungují v obou případech.

`manifest.json` → `"start_url": "./index.html"` – kompatibilní se subpath.

---

## Plný offline režim (volitelné vylepšení)

Tailwind CDN vyžaduje síť při první návštěvě. Pro 100% offline:

1. Nainstalujte Tailwind CLI do dev prostředí (mimo produkční repo, nebo v `dev/` složce)
2. Předkompilujte CSS do `css/tailwind.css`
3. Odstraňte `<script src="https://cdn.tailwindcss.com">` z index.html
4. Přidejte `<link rel="stylesheet" href="css/tailwind.css">`
5. Aktualizujte `sw.js` cache seznam

Alternativa: použít [Tailwind Play CDN export](https://tailwindcss.com/docs/installation/play-cdn) jednorázově.

---

## Kontrola po nasazení

- [ ] Hlavní stránka se načte bez 404
- [ ] `manifest.json` dostupný (DevTools → Application → Manifest)
- [ ] Service Worker registrovaný (Application → Service Workers)
- [ ] Celý herní flow na mobilu
- [ ] Ikona při „Přidat na plochu“

---

## Troubleshooting

| Problém | Řešení |
|---------|--------|
| Bílá stránka | Zkontrolujte konzoli – cesty k JS/CSS |
| SW nefunguje | HTTPS? Cache staré verze – hard refresh |
| Tailwind styly chybí | CDN blokováno – zkuste jinou síť / offline build |
| Resume banner nezmizí | localStorage – vymažte klíč `impostor-game-state` |
