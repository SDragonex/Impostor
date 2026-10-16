# Příručka pro produkční nasazení: Impostor 🚀

Tento dokument poskytuje kompletní návod na nasazení aplikace **Impostor** na libovolnou cloudovou nebo vlastní hostingovou infrastrukturu s důrazem na HTTPS, PWA podporu a rychlost odezvy.

---

## 1. Možnosti hostingu

Jelikož je aplikace čistě statická (HTML, CSS, JS, SVG), nevyžaduje žádný aplikační server typu Node.js, Python ani PHP.

### 1.1 GitHub Pages (Doporučeno pro automatické CI/CD)

V repozitáři je již nakonfigurován workflow `.github/workflows/pages.yml`, který automaticky publikuje každou změnu větve `main`.

1. Nahrajte kód do vašeho GitHub repozitáře.
2. V nastavení repozitáře přejděte na **Settings → Pages**.
3. V sekci **Build and deployment → Source** zvolte **GitHub Actions**.
4. Po dokončení workflow bude aplikace okamžitě dostupná na přidělené adrese (např. `https://dchaker.github.io/impostor/`).

### 1.2 Vercel / Netlify / Cloudflare Pages

1. Přihlaste se do vašeho Vercel / Netlify účtu a zvolte *„Import Git Repository“*.
2. **Build Settings:**
   - **Framework Preset:** `Other` (nebo `None`)
   - **Build Command:** *(ponechte prázdné)*
   - **Output Directory:** `.` *(kořenový adresář)*
3. Stiskněte **Deploy**. Nasazení proběhne do 10 sekund.

### 1.3 Vlastní server / Docker (Nginx)

Pokud chcete hru provozovat v privátní síti nebo na vlastním VPS, můžete použít lehký Nginx kontejner:

```dockerfile
# Dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Sestavení a spuštění:
```bash
docker build -t impostor-game .
docker run -d -p 8080:80 --name impostor impostor-game
```

---

## 2. Vlastní doména a HTTPS certifikace

PWA (Progressive Web Apps) a moderní Web API (vibrace, Service Worker, Web Audio) vyžadují **zabezpečený protokol HTTPS** (výjimkou je pouze `localhost`).

### 2.1 Nastavení na GitHub Pages
1. V kořeni projektu vytvořte soubor `CNAME` s vaší požadovanou doménou (např. `impostor.mojedomena.cz`).
2. U vašeho registrátora domény nastavte DNS záznam:
   - **Typ:** `CNAME`
   - **Host / Název:** `impostor`
   - **Hodnota / Cíl:** `dchaker.github.io.`
3. V nastavení GitHub repozitáře zaškrtněte volbu **Enforce HTTPS**. Let's Encrypt certifikát bude vygenerován automaticky.

---

## 3. Relativní cesty a subpath architektura

Aplikace je navržena tak, aby fungovala jak v kořeni domény (`https://impostor.app/`), tak v libovolném podsouboru (`https://username.github.io/impostor/`):

- Veškeré odkazy na skripty, kaskádové styly a ikony jsou definovány relativně (`./css/styles.css`, `./js/app.js`).
- V manifestu `manifest.json` je nastaven `start_url: "./index.html"`.
- V `sw.js` jsou assety cachovány s relativní cestou `./`.

---

## 4. Správa verzí mezipaměti Service Workeru (`sw.js`)

Při každé produkční úpravě aplikace (aktualizace stylů, rozšíření slovníku nebo úprava kódu) je nutné zvýšit konstantu verze v [`sw.js`](../sw.js):

```javascript
// sw.js
const CACHE_NAME = 'impostor-v5'; // Zvýšit při každém vydání
```

### Proč je to důležité?
Service Worker při aktivaci porovná existující mezipaměti v zařízení a automaticky vymaže všechny starší verze (`impostor-v1` až `impostor-v4`), čímž zajistí, že všichni hráči ihned uvidí nejnovější verzi aplikace bez nutnosti ručního promazávání mezipaměti prohlížeče.

---

## 5. Kontrolní seznam před spuštěním (Production Checklist)

- [x] Všechny soubory prošly syntaktickou kontrolou (`node -c js/data.js js/audio.js js/app.js sw.js`).
- [x] Žádné hardcoded absolutní URL adresy.
- [x] Ikona PWA `assets/icon.svg` je dostupná a validní.
- [x] Service Worker registrace v `index.html` probíhá bez chyb v konzoli.
- [x] Aplikaci lze nainstalovat na plochu mobilního telefonu (iOS Safari i Android Chrome).
- [x] Hra funguje bezchybně i v režimu Letadlo (Offline test).
