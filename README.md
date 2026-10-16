# Impostor: Top Secret Dossier 🗂️

[![PWA Ready](https://img.shields.io/badge/PWA-Ready-success.svg)](#technologický-stack)
[![Offline Capable](https://img.shields.io/badge/Offline-100%25-blue.svg)](#pwa--offline-provoz)
[![Zero Dependencies](https://img.shields.io/badge/Runtime%20Dependencies-0-orange.svg)](#technologický-stack)
[![Words Database](https://img.shields.io/badge/Slovník-917%2B%20slov-red.svg)](#databáze-a-herní-okruhy)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**Impostor** je prémiová společenská dedukční hra pro jedno zařízení (Pass & Play), navržená v autentické vizuální estetice tajného vyšetřovacího spisu z 90. let (*Top Secret Dossier*). 

Hráči postupně přebírají zařízení, lámou voskovou pečeť na papírové obálce a nahlížejí do přísně tajného zadání. Všichni civilní agenti znají totožné tajné slovo – kromě **Impostora**, který slovo nezná a musí z nápověd ostatních blafovat, nebo **Undercover agenta**, který obdržel klamné, velmi podobné slovo.

---

## 🎯 Klíčové přednosti produktu

- 📜 **Minimalistická papírová estetika (90s / 00s Dossier):** Autentická textura manilového papíru, úřední razítka z psacího stroje a plnohodnotný noční archivní režim (*Midnight Archival Carbon*) se slonovinovým písmem.
- 🕯️ **Interaktivní vosková pečeť:** Taktilní mechanismus odpečetění obálky s plynulou animací a možností opětovného zapečetění před předáním zařízení dalšímu hráči.
- 🔊 **Procedurální Web Audio syntezátor (`js/audio.js`):** 100% syntetizované mechanické a organické zvuky přímo v prohlížeči (rozlomení pečeti, šustění papíru, dopad razítka, tikot mechanických stopek, zvonek). Žádné externí MP3/WAV soubory ani síťové prodlevy.
- 📚 **Masivní český slovník (917+ hesel v 16 kategoriích):** Vyvážený obsah od zvířat a gastronomie až po hry, popkulturu a technologie.
- 🕵️ **Mód Undercover (Falešné slovo):** Více než 80 promyšlených dvojic příbuzných slov (např. *Káva vs. Čaj*, *Minecraft vs. Roblox*, *Batman vs. Superman*), kde vetřelec sám neví, že je vetřelcem, dokud nezačne diskuse.
- 👥 **Správa vyšetřovacího týmu (Squad Manager):** Trvalé ukládání jmen hráčů v zařízení + inteligentní generátor stylových kódových přezdívek.
- ⚖️ **Interaktivní Hlasovací aréna & Výslechový modal:** Fyzické klikání na podezřelé agenty, dramatická výslechová sekvence se suspense fází a mechanika **Poslední šance Impostora** (uhodnutí slova pro zvrácení porážky).
- 🎲 **Párty modifikátory (Chaos karty):** Volitelná pravidla pro nápovědy v každém kole (např. *pouze jednoslovné nápovědy*, *rýmování*, *nápověda formou otázky*).
- ✏️ **Editor vlastních balíčků:** Možnost vytvořit a uložit interní slovník přímo v rozhraní hry.
- 📊 **Celo-večerní Scoreboard:** Automatické sledování skóre Tým vs. Impostoři napříč odehranými koly.

---

## 🎮 Herní režimy

| Režim | Popis | Vhodné pro |
| :--- | :--- | :--- |
| **Klasický Impostor** | Jeden nebo více vetřelců vůbec nezná tajné slovo a musí splynout s davem a uhodnout téma. | 3–12 hráčů, základní party hra |
| **Undercover (Falešné slovo)** | Vetřelec dostane nepatrně odlišné slovo z téže oblasti (*Káva vs. Čaj*). Netuší, že je v jiné roli! | Zkušenější party, jemné blafování |
| **Hardcore vyšetřování** | Zkrácená 3minutová diskuse, úplný zákaz zobrazení kategorie a nejpřísnější pravidla dedukce. | Náročné hráče a detektivní duely |

---

## 📚 Databáze a herní okruhy

Slovník [`js/data.js`](js/data.js) obsahuje celkem **917 unikátních českých hesel** rozdělených do 16 tematických okruhů, navržených speciálně pro party hry:

```
├── Zvířata (62 slov)              ├── Česko & Popkultura (60 slov)
├── Jídlo & Nápoje (65 slov)       ├── Párty & Noční život (60 slov)
├── Filmy & Seriály (60 slov)      ├── Slavné osobnosti (55 slov)
├── Města & Státy (60 slov)        ├── Doprava & Stroje (55 slov)
├── Povolání & Role (60 slov)      ├── Značky & Produkty (55 slov)
├── Sport & Pohyb (60 slov)        ├── Hudební svět (55 slov)
├── Příroda & Svět (55 slov)       ├── Domácnost & Každodenní věci (50 slov)
└── Technologie & Sci-Fi (55 slov) └── Hry & Gaming (50 slov)
```

Navíc obsahuje **83 vyladěných Undercover dvojic** a **8 párty výzev kola**.

---

## 🚀 Rychlý start

Aplikace nevyžaduje žádné kompilátory, build systémy ani Node.js backend. Běží okamžitě na jakémkoliv statickém webovém serveru.

### 1. Klonování repozitáře
```bash
git clone https://github.com/dchaker/impostor.git
cd impostor
```

### 2. Spuštění lokálního serveru
Spusťte libovolný lokální HTTP server:

```bash
# Pomocí npx (Node.js)
npx serve .

# Nebo pomocí Pythonu
python -m http.server 8080

# Nebo pomocí PHP
php -S localhost:8080
```

Otevřete `http://localhost:3000` (nebo `http://localhost:8080`) v prohlížeči na počítači nebo mobilním telefonu.

---

## 📱 PWA & Offline provoz

Hra je certifikovaná Progressive Web App (PWA):
1. **Instalace na plochu:** Na mobilním zařízení zvolte v menu prohlížeče *„Přidat na plochu“* (Add to Home Screen). Aplikace se spustí v celoobrazovkovém režimu bez adresního řádku.
2. **Plná offline funkčnost:** Service Worker (`sw.js` s verzí `impostor-v5`) ukládá veškeré rozhraní, styly, logiku i syntetizér zvuků do lokální cache zařízení. Po prvním otevření hra funguje kdekoliv bez nutnosti internetového připojení (na chatě, v letadle i v podzemí).

---

## 🏛️ Architektura a technologie

```
┌────────────────────────────────────────────────────────┐
│                      index.html                        │
│   Sémantické rozhraní, dialogy, SVG pečeť a layout     │
└───────────────┬───────────────────┬────────────────────┘
                │                   │
        ┌───────▼────────┐  ┌───────▼────────┐
        │   js/data.js   │  │   js/audio.js  │
        │ 917 slov, 16   │  │ Web Audio API  │
        │ okruhů, 83 parů│  │ syntezátor     │
        └───────┬────────┘  └───────┬────────┘
                │                   │
        ┌───────▼───────────────────▼────────┐
        │             js/app.js              │
        │  Stavový automat, Pass & Play tok, │
        │  hlasovací mechanika, localStorage │
        └───────────────────┬────────────────┘
                            │
                    ┌───────▼────────┐
                    │     sw.js      │
                    │ PWA v5 Offline │
                    └────────────────┘
```

- **Jádro:** Čistý Vanilla JavaScript (ES6+) bez frameworků a runtime závislostí.
- **Audio engine:** Procedurální syntezátor využívající `AudioContext` s nulovou latencí a nulovou paměťovou stopou.
- **Styling:** Tailwind CSS (utility layout) zkombinovaný s přísným balíčkem vlastních CSS proměnných pro papírovou typografii a noční archivní režim (`css/styles.css`).
- **Ikonografie:** Phosphor Icons duotone/bold.
- **Perzistence:** `localStorage` pro synchronizaci stavu rozehrané hry, jmen týmu, historie skóre a vlastních balíčků.

---

## 📖 Kompletní dokumentace

Podrobné informace o projektu jsou k dispozici v adresáři [`docs/`](docs/):

| Dokument | Obsah |
| :--- | :--- |
| [📘 **docs/GAME_RULES.md**](docs/GAME_RULES.md) | Oficiální pravidla hry, role, moderátorská příručka, bodování a tipy pro party. |
| [🏗️ **docs/ARCHITECTURE.md**](docs/ARCHITECTURE.md) | Technická architektura, stavový model, audio syntezátor a audit bezpečnosti stavu. |
| [🚀 **docs/DEPLOYMENT.md**](docs/DEPLOYMENT.md) | Produkční nasazení (GitHub Pages, Vercel, Netlify), vlastní doména, HTTPS a PWA audit. |
| [🤝 **docs/CONTRIBUTING.md**](docs/CONTRIBUTING.md) | Standardy pro rozšiřování slovníku, kódové konvence a příspěvky do repozitáře. |

---

## 📄 Licence

Tento projekt je licencován pod otevřenou licencí [MIT](LICENSE). Můžete jej volně používat, upravovat i hostovat pro soukromé i komerční účely.
