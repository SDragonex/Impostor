# Pokyny pro přispěvatele a rozšiřování slovníku: Impostor 🤝

Děkujeme za zájem o rozvoj a zkvalitňování hry **Impostor**. Tento dokument specifikuje standardy pro přidávání nového obsahu a rozšiřování kódu.

---

## 1. Rozšiřování slovníku a témat ([`js/data.js`](../js/data.js))

Veškerá herní slovní zásoba se nachází v souboru `js/data.js`. Databáze je rozdělena na 3 hlavní pilíře:

### 1.1 Přidání nového slova do existující kategorie

Při doplňování slov do kategorií dodržujte tato pravidla:
- **Jazyk:** Přirozená čeština s diakritikou (např. `Štrúdl`, `Klokan`).
- **Forma:** Přednostně podstatná jména v 1. pádě jednotného čísla.
- **Srozumitelnost:** Slovo musí být známé široké veřejnosti, aby i méně specializovaní hráči byli schopni dávat nápovědy.
- **Žádné duplicity:** Zkontrolujte, zda se slovo již nenachází v dané kategorii ani v příbuzném okruhu.

```javascript
// Příklad v js/data.js
zvirata: {
  name: 'Zvířata',
  icon: 'ph-paw-print',
  words: [
    'Slon', 'Delfín',
    'NovéSlovo', // ← Přidejte sem
  ]
}
```

### 1.2 Přidání nové kategorie

Každá nová kategorie musí splňovat následující parametry:
1. **Unikátní klíč:** Malá písmena bez diakritiky (např. `mytologie`, `historie`).
2. **Platná ikona Phosphor:** Vždy ověřte, že ikona existuje v knihovně Phosphor Icons (např. `ph-books`, `ph-sword`).
3. **Minimální rozsah:** Každá nová kategorie musí obsahovat **minimálně 50 prověřených slov**, aby byla zachována rovnováha s ostatními 16 okruhy.

```javascript
mytologie: {
  name: 'Bohové & Mytologie',
  icon: 'ph-lightning',
  words: [
    'Zeus', 'Thor', 'Anubis', 'Poseidon', 'Héra',
    // ... celkem alespoň 50 slov
  ]
}
```

### 1.3 Přidání páru pro Undercover mód (`UNDERCOVER_PAIRS`)

Undercover dvojice vyžadují vysokou míru citlivosti:
- Obě slova musí pocházet ze stejného kontextu a mít podobné vlastnosti, ale nesmí to být přesná synonyma.
- **Příklad skvělé dvojice:** `Káva` vs. `Čaj` (obojí se pije z hrnku a je teplé, ale liší se barvou a původem).
- **Nevhodná dvojice:** `Pes` vs. `Vesmírná raketa` (příliš odlišné, odhalení za 2 vteřiny).

```javascript
{ wordA: 'Croissant', wordB: 'Rohlík', category: 'Pečivo' },
{ wordA: 'Šunka', wordB: 'Slanina', category: 'Uzeniny' },
```

---

## 2. Vývojové a kódové standardy

1. **Zero-Dependency Policy:** Do projektu se nepřidávají žádné externí npm balíčky, bundlery ani knihovny třetích stran. Veškeré úpravy musí být v čistém Vanilla JavaScriptu (ES6+).
2. **Design Tokens & Tmavý režim:** Nepoužívejte natvrdo zapsané barvy (hex kódy v atributech). Vždy používejte sémantické CSS proměnné definované v `css/styles.css`:
   - `var(--text-ink)` pro primární písmo
   - `var(--stamp-red)` pro varování, impostoří prvky a pečetě
   - `var(--stamp-green)` pro schválení a civilní prvky
   - `var(--bg-card)` a `var(--bg-surface)` pro podklady
3. **Čistota syntaxe:** Před odesláním Pull Requestu vždy spusťte kontrolu syntaxe:
   ```bash
   node -c js/data.js js/audio.js js/app.js sw.js
   ```

---

## 3. Postup odeslání příspěvku (Pull Request workflow)

1. Vytvořte si fork repozitáře.
2. Vytvořte feature větev (`git checkout -b feature/nove-kategorie`).
3. Proveďte změny a otestujte funkčnost lokálně (`npx serve .`).
4. Proveďte commit s popisnou zprávou (`git commit -m "feat(data): přidána nová témata pro deskové hry"`).
5. Vytvořte Pull Request proti větvi `main`.
