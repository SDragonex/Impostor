/**
 * Slovník kategorií a slov pro hru Impostor.
 * Každá kategorie obsahuje 10–15 slov v češtině.
 */
const WORD_DICTIONARY = {
  zvirata: {
    name: 'Zvířata',
    words: [
      'Slon', 'Delfín', 'Panda', 'Tučňák', 'Medvěd',
      'Klokan', 'Sova', 'Žirafa', 'Veverka', 'Krokodýl',
      'Papoušek', 'Vlk', 'Lama', 'Chameleon', 'Včela',
    ],
  },
  mesta: {
    name: 'Města',
    words: [
      'Praha', 'Paříž', 'Tokio', 'New York', 'Rím',
      'Barcelona', 'Sydney', 'Káhira', 'Reykjavík', 'Dubaj',
      'Amsterdam', 'Londýn', 'Vídeň', 'Lisabon', 'Bangkok',
    ],
  },
  filmy: {
    name: 'Filmy',
    words: [
      'Titanic', 'Matrix', 'Shrek', 'Avatar', 'Frozen',
      'Gladiátor', 'Joker', 'Inception', 'Rocky', 'Coco',
      'Interstellar', 'Pulp Fiction', 'Up', 'Jaws', 'Ratatouille',
    ],
  },
  jidlo: {
    name: 'Jídlo',
    words: [
      'Pizza', 'Sushi', 'Guláš', 'Palačinka', 'Tiramisu',
      'Hamburger', 'Pho', 'Lasagne', 'Trdelník', 'Curry',
      'Bramborák', 'Croissant', 'Pad Thai', 'Cheesecake', 'Ramen',
    ],
  },
  povolani: {
    name: 'Povolání',
    words: [
      'Lékař', 'Hasič', 'Pilot', 'Učitel', 'Kuchař',
      'Programátor', 'Farmář', 'Detektiv', 'Architekt', 'Záchranář',
      'Novinář', 'Veterinář', 'Kadeřník', 'Astronaut', 'Právník',
    ],
  },
  sport: {
    name: 'Sport',
    words: [
      'Fotbal', 'Tenis', 'Basketbal', 'Plavání', 'Lyžování',
      'Box', 'Golf', 'Volejbal', 'Judo', 'Cyklistika',
      'Hokej', 'Atletika', 'Surfování', 'Šerm', 'Lezení',
    ],
  },
  priroda: {
    name: 'Příroda',
    words: [
      'Sopka', 'Vodopád', 'Poušť', 'Ledovec', 'Džungle',
      'Útes', 'Jezero', 'Aurora', 'Gejzír', 'Ostrov',
      'Jeskyně', 'Bažina', 'Savana', 'Tundra', 'Korál',
    ],
  },
  technologie: {
    name: 'Technologie',
    words: [
      'Smartphone', 'Robot', 'Dron', 'Satelit', 'Tiskárna 3D',
      'Virtuální realita', 'Bluetooth', 'Wi-Fi', 'Tablet', 'Laser',
      'Solární panel', 'Elektromobil', 'Hologram', 'GPS', 'Čip',
    ],
  },
};

/** Seznam všech kategorií pro zobrazení impostorovi */
function getAllCategories() {
  return Object.values(WORD_DICTIONARY).map((c) => c.name);
}

/** Náhodná kategorie a slovo */
function pickRandomWord() {
  const keys = Object.keys(WORD_DICTIONARY);
  const categoryKey = keys[Math.floor(Math.random() * keys.length)];
  const category = WORD_DICTIONARY[categoryKey];
  const word = category.words[Math.floor(Math.random() * category.words.length)];
  return {
    categoryKey,
    categoryName: category.name,
    word,
  };
}
