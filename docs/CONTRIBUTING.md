# Přispívání do projektu

Děkujeme za zájem rozšířit hru Impostor!

---

## Přidání nových slov

Soubor: `js/data.js`

```javascript
zvirata: {
  name: 'Zvířata',
  words: [
    'Slon',
    'NovéSlovo',  // ← přidejte sem
  ],
},
```

Pravidla:

- Slova v **češtině**, ideálně jednoslovná
- Vyhněte se extrémně neznámým pojmům
- 10–15 slov na kategorii
- Bez duplicit v rámci kategorie

---

## Přidání nové kategorie

```javascript
const WORD_DICTIONARY = {
  // ... existující kategorie

  hudba: {
    name: 'Hudba',
    words: [
      'Kytara', 'Klavír', 'Bubny', 'Saxofon', 'Housle',
      'Discjockey', 'Opera', 'Reggae', 'Techno', 'Orchestr',
      'Hymna', 'Sbor', 'Turntable', 'Basová kytara', 'Flétna',
    ],
  },
};
```

Klíč objektu (`hudba`) = interní ID (malá písmena, bez diakritiky).

---

## Pull Request checklist

- [ ] Nová slova/kategorie v `js/data.js`
- [ ] Manuálně otestovaný celý flow
- [ ] Žádné změny v `package-lock` (projekt nemá npm závislosti)
- [ ] PR popis: co jste přidali a proč

---

## Hlášení chyb

Ideální informace:

1. Prohlížeč a verze
2. Zařízení (mobil/desktop)
3. Kroky k reprodukci
4. Screenshot konzole (F12), pokud možno

---

## Návrhy funkcí

Otevřete Issue s popisem:

- **Problém**, který řešíte
- **Navrhované chování**
- **Alternativy**, které jste zvažovali

Příklady vítaných feature:

- Nové jazykové mutace
- Tmavý/světlý režim přepínač
- Export statistik kol
- Accessibility vylepšení

---

## Kódový styl

- Vanilla ES6+, bez transpileru
- České UI texty
- Anglické názvy proměnných a funkcí v JS
- Konzistentní odsazení (2 mezery)
- Minimální diff – neměňte nesouvisející soubory

---

## Licence

Příspěvky budou licencovány pod MIT (stejně jako projekt).
