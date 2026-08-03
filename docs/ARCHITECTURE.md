# Architektura aplikace Impostor

## Přehled

Aplikace je **single-page application (SPA)** bez build kroku. Veškerá logika běží v prohlížeči klienta.

```
┌─────────────────────────────────────────────────┐
│                   index.html                     │
│  (obrazovky, Tailwind CDN, načtení skriptů)     │
└───────────────┬─────────────────┬───────────────┘
                │                 │
        ┌───────▼───────┐ ┌───────▼───────┐
        │   js/data.js  │ │   js/app.js   │
        │  WORD_DICT    │ │  game logic   │
        │  pickRandom   │ │  UI routing   │
        └───────────────┘ └───────┬───────┘
                                  │
                          ┌───────▼───────┐
                          │ localStorage  │
                          │ impostor-game │
                          │    -state     │
                          └───────────────┘
```

---

## Obrazovky (screen routing)

Routing je implementován togglem CSS třídy `hidden` na `<section>` elementech. Aktivní obrazovka je uložena v `gameState.screen`.

| Screen ID | Enum | Popis |
|-----------|------|--------|
| `screen-setup` | `setup` | Konfigurace před hrou |
| `screen-pass` | `pass` | „Předej hráči N“ |
| `screen-role` | `role` | Odhalení role |
| `screen-gameplay` | `gameplay` | Timer + reference slovníku |
| `screen-resolution` | `resolution` | Výzva k hlasování |
| `screen-result` | `result` | Finální odhalení |

Funkce `showScreen(name)` centralizuje přepínání a synchronizaci s localStorage.

---

## Datový model

### setupConfig (persistovaný)

```javascript
{
  playerCount: 4,           // 3–10
  impostorCount: 1,         // 1–2
  timerMinutes: 5,          // 3 | 5 | 7
  vibrateOnEnd: true,
  showCategoryToImpostor: false
}
```

### gameState (persistovaný během hry)

```javascript
{
  screen: 'pass',
  categoryKey: 'zvirata',
  categoryName: 'Zvířata',
  word: 'Slon',
  impostorIndices: [2],     // 0-based indexy impostorů
  currentPlayerIndex: 0,
  roleRevealed: false,
  timerRemainingSec: 300,
  timerPaused: false
}
```

### WORD_DICTIONARY (statický, v data.js)

```javascript
{
  zvirata: {
    name: 'Zvířata',
    words: ['Slon', 'Delfín', ...]
  },
  // ...
}
```

---

## Generování rolí

1. `pickRandomWord()` – náhodná kategorie + slovo z `WORD_DICTIONARY`
2. `shuffle([0..n-1])` – Fisher-Yates permutace hráčů
3. Prvních `impostorCount` indexů z permutace = impostoři

Tím je zajištěna **uniformní náhodnost** – každá podmnožina hráčů stejné velikosti má stejnou pravděpodobnost.

```javascript
const playerIndices = shuffle(Array.from({ length: n }, (_, i) => i));
const impostorIndices = playerIndices.slice(0, impostorCount).sort((a, b) => a - b);
```

---

## Timer

- Interval: `setInterval` každých 1000 ms
- Stav: `timerRemainingSec`, `timerPaused`
- UI: `formatTime()`, progress bar šířka v %
- Konec: `onTimerEnd()` → vibrace (volitelně) → obrazovka resolution
- Pause: zastaví interval, obnoví tlačítkem

Při obnovení stránky se timer **nepočítá automaticky v pozadí** – obnoví se uložený `timerRemainingSec`. Pro přesný odpočet v reálném čase by bylo potřeba ukládat timestamp (`Date.now()`); aktuální implementace je záměrně jednoduchá.

---

## Ochrana proti nechtěným klikům

Po zobrazení role:

1. Tlačítko `#btn-hide-role` je `disabled`
2. Po `HIDE_ROLE_DELAY_MS` (1000 ms) se aktivuje
3. Text role má `user-select: none`

---

## localStorage

| Klíč | Hodnota |
|------|---------|
| `impostor-game-state` | JSON `{ setupConfig, gameState }` |

- **Ukládání:** při každé změně obrazovky / timeru
- **Mazání:** nová hra, „Hrát znovu“, „Nová hra“ v banneru
- **Resume banner:** zobrazen, pokud existuje uložený stav mimo `setup`

---

## PWA vrstva

| Soubor | Účel |
|--------|------|
| `manifest.json` | Název, barvy, ikona, standalone display |
| `sw.js` | Cache-first pro lokální assety, network-first pro CDN |
| `assets/icon.svg` | Maskovatelná ikona |

Service Worker se registruje na konci `index.html`. Verze cache: `impostor-v1` – při změně assety zvyšte verzi.

---

## Závislosti

| Zdroj | Typ | Poznámka |
|-------|-----|----------|
| Tailwind CDN | Externí | Styling utility tříd |
| Vlastní JS/CSS | Lokální | Logika a komponenty |

**Bez npm.** Pro produkci s plným offline režimem lze Tailwind předkompilovat – viz DEPLOYMENT.md.

---

## Rozšíření (návrhy)

1. **Vlastní jména hráčů** – pole `playerNames[]` v setupConfig
2. **Historie kol** – sessionStorage, bez ovlivnění současné hry
3. **Více jazyků** – i18n objekt + `lang` parametr v URL
4. **Zvukový signál** – Web Audio API místo vibrace na desktopu
5. **Timestamp timer** – přesný odpočet po refreshi

---

## Testování (manuální checklist)

- [ ] 3 hráči, 1 impostor – celý flow
- [ ] 10 hráčů, 2 impostory
- [ ] 2 impostory disabled při 4 hráčích
- [ ] Hide role disabled 1 s
- [ ] Refresh během pass fáze → resume
- [ ] Pause / unpause timer
- [ ] Předčasné ukončení diskuse
- [ ] Mobilní viewport (320px)
- [ ] Instalace PWA (Chrome Android / Safari iOS)
