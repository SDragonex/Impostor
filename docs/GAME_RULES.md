# Pravidla hry Impostor

## Cíl hry

**Innocenti** (běžní hráči) chtějí odhalit **Impostora** – hráče, který tajné slovo nezná.

**Impostor** chce zůstat neodhalený, popřípadě uhodnout tajné slovo z nápověd ostatních.

---

## Příprava

1. Sedněte se do kruhu (nebo tak, aby všichni slyšeli).
2. Jeden telefon/tablet – aplikace **Impostor**.
3. Nastavte počet hráčů, impostorů a délku diskuse.
4. Každý hráč **sám** vidí svou roli – nikdo jiný nesmí nahlížet.

---

## Průběh kola

### Fáze 1: Nápovědy (diskuse)

Hráči se střídají v pořadí (doporučeno po směru hodinových ručiček). Každý na řadě řekne:

- **jedno slovo**, nebo
- **krátkou větu** (max. ~5 slov)

… jako nápovědu k tajnému slovu.

#### Co smí

- Metaforické nápovědy („má to chobot“ pro Slona)
- Asociace („viděl jsem to v zoo“)
- Hravé narážky

#### Co nesmí

- Přímo říct tajné slovo
- Velmi obvious nápovědu („začíná na S, 5 písmen“ – domluvte si hranici)
- Mluvit v cizím jazyce, pokud to ostatní neumí

### Fáze 2: Hlasování

Po vypršení času (nebo po dohodě) každý **ústně** hlasuje, kdo je podle něj impostor.

- Můžete hlasovat pro jednoho hráče
- Při 2 impostorech hlasujte pro oba (nebo dle domluvy)

### Fáze 3: Odhalení

Moderátor (nebo poslední hráč s telefonem) stiskne **Odhalit impostora** v aplikaci.

---

## Vítězství

| Situace | Kdo vyhrává |
|---------|-------------|
| Impostor nebyl správně identifikován | **Impostor** |
| Impostor byl chycen | **Innocenti** |
| Impostor správně uhodl slovo (volitelná varianta) | **Impostor** bonus |

---

## Doporučený počet hráčů

| Hráči | Impostoři | Poznámka |
|-------|-----------|----------|
| 3–4 | 1 | Rychlé kolo, méně skrývání |
| 5–7 | 1–2 | Ideální pro party |
| 8–10 | 2 | Více chaosu, delší diskuse |

---

## Tipy pro moderátora

1. **První kolo** – řekněte každému jen „řekni jednu nápovědu“, ať se synchronizujete.
2. **Impostor na začátku** – ať mluví až po 2–3 hráčích, má z čeho čerpat.
3. **Podezřele tichý hráč** – často impostor nebo někdo s těžkým slovem.
4. **Revote** – při remíze hlasování umožněte krátkou obhajobu a druhé kolo.

---

## Volitelné varianty

### Tvrdý režim

- Impostor **nevidí** kategorii (výchozí nastavení)
- Zakázané přímé synonyma

### Lehčí režim

- V setupu zapněte **„Impostor vidí i kategorii“**
- Impostor ví např. „Zvířata“, ale ne konkrétní slovo

### Druhé kolo nápověd

- Po prvním kole každý řekne **druhou** nápovědu
- Prodlouží diskusi bez prodlužování času – nebo nastavte 7 minut

### Bodování (více kol)

| Událost | Body |
|---------|------|
| Innocent správně odhalí impostora | +1 |
| Impostor unikne | +2 impostorovi |
| Impostor uhodne slovo | +1 impostorovi |

Zapisujte body na papír mezi koly.

---

## FAQ

**Může impostor lhát?**  
Ano – impostor nezná slovo, takže jeho nápověda je vždy „vymyšlená“. Innocenti by neměli lhát o tom, že slovo znají.

**Co když někdo omylem vidí roli jiného?**  
Restartujte kolo („Stejné nastavení, nové slovo“).

**Funguje to offline?**  
Po prvním načtení ano (PWA cache). Tailwind CDN vyžaduje síť při první návštěvě, pokud není v cache.

**Je hra vhodná pro děti?**  
Ano – slovník je obecný. Můžete upravit `js/data.js` a odstranit nevhodná slova.
