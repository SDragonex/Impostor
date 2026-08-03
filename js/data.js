/**
 * Slovník kategorií a slov pro hru Impostor.
 * Aktualizováno pro větší variabilitu a přidány ikony kategorií.
 */
const WORD_DICTIONARY = {
  zvirata: {
    name: 'Zvířata',
    icon: 'ph-animal',
    words: [
      'Slon', 'Delfín', 'Panda', 'Tučňák', 'Medvěd',
      'Klokan', 'Sova', 'Žirafa', 'Veverka', 'Krokodýl',
      'Papoušek', 'Vlk', 'Lama', 'Chameleon', 'Včela',
      'Tygr', 'Zebra', 'Gorila', 'Netopýr', 'Orel',
      'Želva', 'Hroch', 'Chobotnice', 'Lenochod', 'Plameňák'
    ]
  },
  mesta: {
    name: 'Města',
    icon: 'ph-building',
    words: [
      'Praha', 'Paříž', 'Tokio', 'New York', 'Rím',
      'Barcelona', 'Sydney', 'Káhira', 'Reykjavík', 'Dubaj',
      'Amsterdam', 'Londýn', 'Vídeň', 'Lisabon', 'Bangkok',
      'Berlín', 'Los Angeles', 'Rio de Janeiro', 'Moskva', 'Benátky',
      'Istanbul', 'Singapur', 'Buenos Aires', 'Havana', 'Soul'
    ]
  },
  filmy: {
    name: 'Filmy',
    icon: 'ph-film-reel',
    words: [
      'Titanic', 'Matrix', 'Shrek', 'Avatar', 'Frozen',
      'Gladiátor', 'Joker', 'Inception', 'Rocky', 'Coco',
      'Interstellar', 'Pulp Fiction', 'Up', 'Jaws', 'Ratatouille',
      'Pán prstenů', 'Harry Potter', 'Jurský park', 'Terminátor', 'Forrest Gump',
      'Lví král', 'Spider-Man', 'Návrat do budoucnosti', 'Vykoupení z věznice Shawshank', 'Toy Story'
    ]
  },
  jidlo: {
    name: 'Jídlo',
    icon: 'ph-plate-wheat',
    words: [
      'Pizza', 'Sushi', 'Guláš', 'Palačinka', 'Tiramisu',
      'Hamburger', 'Pho', 'Lasagne', 'Trdelník', 'Curry',
      'Bramborák', 'Croissant', 'Pad Thai', 'Cheesecake', 'Ramen',
      'Tacos', 'Kebab', 'Svíčková', 'Paella', 'Waffle',
      'Burrito', 'Donut', 'Muffin', 'Falafel', 'Štrúdl'
    ]
  },
  povolani: {
    name: 'Povolání',
    icon: 'ph-briefcase',
    words: [
      'Lékař', 'Hasič', 'Pilot', 'Učitel', 'Kuchař',
      'Programátor', 'Farmář', 'Detektiv', 'Architekt', 'Záchranář',
      'Novinář', 'Veterinář', 'Kadeřník', 'Astronaut', 'Právník',
      'Policista', 'Zpěvák', 'Herec', 'Malíř', 'Spisovatel',
      'Fotograf', 'Řidič', 'Tesař', 'Zahradník', 'Instalatér'
    ]
  },
  sport: {
    name: 'Sport',
    icon: 'ph-basketball',
    words: [
      'Fotbal', 'Tenis', 'Basketbal', 'Plavání', 'Lyžování',
      'Box', 'Golf', 'Volejbal', 'Judo', 'Cyklistika',
      'Hokej', 'Atletika', 'Surfování', 'Šerm', 'Lezení',
      'Gymnastika', 'Ragby', 'Krasobruslení', 'Florbal', 'Badminton',
      'Baseball', 'Snowboarding', 'Karate', 'Stolní tenis', 'Šipky'
    ]
  },
  priroda: {
    name: 'Příroda',
    icon: 'ph-leaf',
    words: [
      'Sopka', 'Vodopád', 'Poušť', 'Ledovec', 'Džungle',
      'Útes', 'Jezero', 'Aurora', 'Gejzír', 'Ostrov',
      'Jeskyně', 'Bažina', 'Savana', 'Tundra', 'Korál',
      'Les', 'Prales', 'Oceán', 'Pláž', 'Kaňon',
      'Hora', 'Řeka', 'Stalaktit', 'Záliv', 'Tornádo'
    ]
  },
  technologie: {
    name: 'Technologie',
    icon: 'ph-robot',
    words: [
      'Smartphone', 'Robot', 'Dron', 'Satelit', 'Tiskárna 3D',
      'Virtuální realita', 'Bluetooth', 'Wi-Fi', 'Tablet', 'Laser',
      'Solární panel', 'Elektromobil', 'Hologram', 'GPS', 'Čip',
      'Sluchátka', 'Klávesnice', 'Monitor', 'Smartwatch', 'Konzole',
      'Server', 'Mikroskop', 'Teleskop', 'Baterie', 'Nabíječka'
    ]
  },
  osobnosti: {
    name: 'Slavné osobnosti',
    icon: 'ph-user-focus',
    words: [
      'Albert Einstein', 'Marilyn Monroe', 'Leonardo da Vinci', 'Elvis Presley', 'Karel Gott',
      'Michael Jackson', 'Cleopatra', 'Winston Churchill', 'Freddie Mercury', 'Madonna',
      'Charlie Chaplin', 'Julius Caesar', 'Mozart', 'William Shakespeare', 'Jára Cimrman',
      'Tom Cruise', 'Angelina Jolie', 'Steve Jobs', 'Bill Gates', 'Elon Musk',
      'Papež František', 'Královna Alžběta', 'Nelson Mandela', 'Mahátma Gándhí', 'Abraham Lincoln'
    ]
  },
  doprava: {
    name: 'Doprava',
    icon: 'ph-car',
    words: [
      'Letadlo', 'Vlak', 'Trajekt', 'Tramvaj', 'Metro',
      'Autobus', 'Vrtulník', 'Ponorka', 'Kolo', 'Koloběžka',
      'Kamion', 'Motorka', 'Skútr', 'Lanovka', 'Vznášedlo',
      'Plachetnice', 'Jachta', 'Raketa', 'Traktor', 'Dodávka',
      'Sanitka', 'Hasičské auto', 'Policejní auto', 'Limuzína', 'Karavan'
    ]
  },
  znacky: {
    name: 'Značky a firmy',
    icon: 'ph-tag',
    words: [
      'Apple', 'Google', 'Nike', 'Coca-Cola', 'Lego',
      'Škoda', 'IKEA', "McDonald's", 'Samsung', 'Adidas',
      'Netflix', 'Spotify', 'Amazon', 'Facebook', 'Tesla',
      'BMW', 'Mercedes', 'Gucci', 'Rolex', 'Sony',
      'Nintendo', 'Red Bull', 'Starbucks', 'KFC', 'Disney'
    ]
  },
  hudba: {
    name: 'Hudba (Nástroje)',
    icon: 'ph-music-note',
    words: [
      'Kytara', 'Klavír', 'Housle', 'Buben', 'Flétna',
      'Trubka', 'Saxofon', 'Harfa', 'Akordeon', 'Cello',
      'Syntetizátor', 'Baskytara', 'Tamburína', 'Pozoun', 'Klarinet',
      'Bendžo', 'Ukulele', 'Dudy', 'Činely', 'Triangl',
      'Varhany', 'Xylofon', 'Harmonika', 'Gong', 'Kontrabas'
    ]
  }
};

/** Seznam všech kategorií pro zobrazení impostorovi */
function getAllCategories() {
  return Object.values(WORD_DICTIONARY).map((c) => c.name);
}

/** Náhodná kategorie a slovo, volitelně filtrovaná podle vybraných klíčů */
function pickRandomWord(selectedKeys) {
  const allKeys = Object.keys(WORD_DICTIONARY);
  const keys = (selectedKeys && selectedKeys.length > 0) ? selectedKeys : allKeys;
  const categoryKey = keys[Math.floor(Math.random() * keys.length)];
  const category = WORD_DICTIONARY[categoryKey];
  const word = category.words[Math.floor(Math.random() * category.words.length)];
  return {
    categoryKey,
    categoryName: category.name,
    word,
    icon: category.icon
  };
}
