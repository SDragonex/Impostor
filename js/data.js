/**
 * Slovník kategorií a slov pro hru Impostor.
 * Aktualizováno pro větší variabilitu a přidány ikony kategorií.
 */
const WORD_DICTIONARY = {
  zvirata: {
    name: 'Zvířata',
    icon: 'ph-paw-print',
    words: [
      'Slon', 'Delfín', 'Panda', 'Tučňák', 'Medvěd',
      'Klokan', 'Sova', 'Žirafa', 'Veverka', 'Krokodýl',
      'Papoušek', 'Vlk', 'Lama', 'Chameleon', 'Včela',
      'Tygr', 'Zebra', 'Gorila', 'Netopýr', 'Orel',
      'Želva', 'Hroch', 'Chobotnice', 'Lenochod', 'Plameňák'
    ]
  },
  mesta: {
    name: 'Města & Státy',
    icon: 'ph-buildings',
    words: [
      'Praha', 'Paříž', 'Tokio', 'New York', 'Řím',
      'Barcelona', 'Sydney', 'Káhira', 'Reykjavík', 'Dubaj',
      'Amsterdam', 'Londýn', 'Vídeň', 'Lisabon', 'Bangkok',
      'Berlín', 'Los Angeles', 'Rio de Janeiro', 'Benátky',
      'Istanbul', 'Singapur', 'Buenos Aires', 'Havana', 'Soul'
    ]
  },
  filmy: {
    name: 'Filmy & Seriály',
    icon: 'ph-film-slate',
    words: [
      'Titanic', 'Matrix', 'Shrek', 'Avatar', 'Frozen',
      'Gladiátor', 'Joker', 'Inception', 'Rocky', 'Coco',
      'Interstellar', 'Pulp Fiction', 'Vzhůru do oblak', 'Čelisti', 'Ratatouille',
      'Pán prstenů', 'Harry Potter', 'Jurský park', 'Terminátor', 'Forrest Gump',
      'Lví král', 'Spider-Man', 'Návrat do budoucnosti', 'Toy Story', 'Stranger Things'
    ]
  },
  jidlo: {
    name: 'Jídlo & Nápoje',
    icon: 'ph-fork-knife',
    words: [
      'Pizza', 'Sushi', 'Guláš', 'Palačinka', 'Tiramisu',
      'Hamburger', 'Pho', 'Lasagne', 'Trdelník', 'Curry',
      'Bramborák', 'Croissant', 'Pad Thai', 'Cheesecake', 'Ramen',
      'Tacos', 'Kebab', 'Svíčková', 'Paella', 'Waffle',
      'Burrito', 'Donut', 'Muffin', 'Falafel', 'Štrúdl'
    ]
  },
  povolani: {
    name: 'Povolání & Role',
    icon: 'ph-briefcase',
    words: [
      'Lékař', 'Hasič', 'Pilot', 'Učitel', 'Kuchař',
      'Programátor', 'Farmář', 'Detektiv', 'Architekt', 'Záchranář',
      'Novinář', 'Veterinář', 'Kadeřník', 'Astronaut', 'Právník',
      'Policista', 'Zpěvák', 'Herec', 'Malíř', 'Spisovatel',
      'Fotograf', 'Řidič', 'Tesař', 'Zahradník', 'Tajný agent'
    ]
  },
  sport: {
    name: 'Sport & Hry',
    icon: 'ph-trophy',
    words: [
      'Fotbal', 'Tenis', 'Basketbal', 'Plavání', 'Lyžování',
      'Box', 'Golf', 'Volejbal', 'Judo', 'Cyklistika',
      'Hokej', 'Atletika', 'Surfování', 'Šerm', 'Lezení',
      'Gymnastika', 'Ragby', 'Krasobruslení', 'Florbal', 'Badminton',
      'Baseball', 'Snowboarding', 'Karate', 'Stolní tenis', 'Šipky'
    ]
  },
  priroda: {
    name: 'Příroda & Svět',
    icon: 'ph-tree',
    words: [
      'Sopka', 'Vodopád', 'Poušť', 'Ledovec', 'Džungle',
      'Útes', 'Jezero', 'Polární záře', 'Gejzír', 'Ostrov',
      'Jeskyně', 'Bažina', 'Savana', 'Tundra', 'Korálový útes',
      'Les', 'Prales', 'Oceán', 'Pláž', 'Kaňon',
      'Hora', 'Řeka', 'Tornádo', 'Zátoka', 'Lavina'
    ]
  },
  technologie: {
    name: 'Technologie & Sci-Fi',
    icon: 'ph-cpu',
    words: [
      'Smartphone', 'Robot', 'Dron', 'Satelit', '3D tiskárna',
      'Virtuální realita', 'Bluetooth', 'Wi-Fi', 'Tablet', 'Laser',
      'Solární panel', 'Elektromobil', 'Hologram', 'GPS navigace', 'Mikročip',
      'Sluchátka', 'Konzole', 'Umělá inteligence', 'Teleskop', 'Baterie',
      'Kyborg', 'Časostroj', 'Reaktor', 'Superpočítač', 'Nanoboti'
    ]
  },
  osobnosti: {
    name: 'Slavné osobnosti',
    icon: 'ph-identification-badge',
    words: [
      'Albert Einstein', 'Marilyn Monroe', 'Leonardo da Vinci', 'Elvis Presley', 'Karel Gott',
      'Michael Jackson', 'Kleopatra', 'Winston Churchill', 'Freddie Mercury', 'Madonna',
      'Charlie Chaplin', 'Julius Caesar', 'Mozart', 'William Shakespeare', 'Jára Cimrman',
      'Tom Cruise', 'Angelina Jolie', 'Steve Jobs', 'Bill Gates', 'Elon Musk',
      'Papež František', 'Královna Alžběta', 'Nelson Mandela', 'Mahátma Gándhí', 'Nikola Tesla'
    ]
  },
  doprava: {
    name: 'Doprava & Stroje',
    icon: 'ph-airplane-tilt',
    words: [
      'Letadlo', 'Vlak', 'Trajekt', 'Tramvaj', 'Metro',
      'Autobus', 'Vrtulník', 'Ponorka', 'Kolo', 'Koloběžka',
      'Kamion', 'Motorka', 'Skútr', 'Lanovka', 'Vznášedlo',
      'Plachetnice', 'Jachta', 'Vesmírná raketa', 'Traktor', 'Dodávka',
      'Sanitka', 'Hasičské auto', 'Policejní auto', 'Limuzína', 'Karavan'
    ]
  },
  znacky: {
    name: 'Značky & Produkty',
    icon: 'ph-tag',
    words: [
      'Apple', 'Google', 'Nike', 'Coca-Cola', 'Lego',
      'Škoda', 'IKEA', "McDonald's", 'Samsung', 'Adidas',
      'Netflix', 'Spotify', 'Amazon', 'PlayStation', 'Tesla',
      'BMW', 'Mercedes', 'Gucci', 'Rolex', 'Sony',
      'Nintendo', 'Red Bull', 'Starbucks', 'KFC', 'Disney'
    ]
  },
  hudba: {
    name: 'Hudební svět',
    icon: 'ph-music-notes',
    words: [
      'Kytara', 'Klavír', 'Housle', 'Bicí', 'Flétna',
      'Trubka', 'Saxofon', 'Harfa', 'Akordeon', 'Cello',
      'Syntetizátor', 'Baskytara', 'Tamburína', 'Pozoun', 'Klarinet',
      'Ukulele', 'Dudy', 'Činely', 'Triangl', 'Harmonika',
      'Mikrofon', 'Reproduktor', 'Zesilovač', 'Gramofon', 'Noty'
    ]
  },
  cesko: {
    name: 'Česko & Popkultura',
    icon: 'ph-flag',
    words: [
      'Kofola', 'Svíčková', 'Krteček', 'Chlebíček', 'Karlův most',
      'Tatranky', 'Švejk', 'Pivo', 'Rohlík', 'Vepřo-knedlo-zelo',
      'Pražský hrad', 'Křemílek a Vochomůrka', 'Mach a Šebestová', 'Becherovka', 'Sněžka',
      'Forman', 'Zlaté české ručičky', 'Rumburak', 'Olomoucké tvarůžky', 'Kofila',
      'Zimní stadion', 'Škodovka', 'Tramvaj T3', 'Sousedská hlídka', 'Pivovarský sklep'
    ]
  },
  party: {
    name: 'Párty & Noční život',
    icon: 'ph-martini',
    words: [
      'Karaoke', 'Šampaňské', 'Půlnoční pizza', 'DJ', 'Taneční parket',
      'Ztracené klíče', 'Tequila', 'Selfie', 'Barmanka', 'Diskokoule',
      'Výzva na panáka', 'VIP salonek', 'Vstupní náramek', 'Konfety', 'Přípitek',
      'Účet za bar', 'Noční rozvoz', 'Ztracený hlas', 'Tancování na stole', 'Světelná show',
      'Ochranka klubu', 'Párty brýle', 'Ledový kbelík', 'Závěrečná píseň', 'Ranní kebab'
    ]
  }
};

// --- Slovní páry pro herní mód UNDERCOVER (Falešné slovo) ---
const UNDERCOVER_PAIRS = [
  { wordA: 'Káva', wordB: 'Čaj', category: 'Horké nápoje' },
  { wordA: 'Kocour', wordB: 'Lev', category: 'Šelmy' },
  { wordA: 'Pizza', wordB: 'Hamburger', category: 'Rychlé občerstvení' },
  { wordA: 'Slunce', wordB: 'Měsíc', category: 'Vesmírná tělesa' },
  { wordA: 'Kytara', wordB: 'Housle', category: 'Strunné nástroje' },
  { wordA: 'Pivo', wordB: 'Víno', category: 'Společenské nápoje' },
  { wordA: 'Kolo', wordB: 'Koloběžka', category: 'Jednostopá vozidla' },
  { wordA: 'Letadlo', wordB: 'Vrtulník', category: 'Letecká doprava' },
  { wordA: 'Praha', wordB: 'Brno', category: 'Česká města' },
  { wordA: 'Zima', wordB: 'Léto', category: 'Roční období' },
  { wordA: 'Kniha', wordB: 'Časopis', category: 'Čtení a tisk' },
  { wordA: 'Tenis', wordB: 'Badminton', category: 'Raketové sporty' },
  { wordA: 'Zlato', wordB: 'Stříbro', category: 'Drahé kovy' },
  { wordA: 'Jablko', wordB: 'Hruška', category: 'Ovoce' },
  { wordA: 'Doktor', wordB: 'Záchranář', category: 'Zdravotnictví' },
  { wordA: 'Hrad', wordB: 'Zámek', category: 'Historická sídla' },
  { wordA: 'Řeka', wordB: 'Potok', category: 'Vodní toky' },
  { wordA: 'Nůž', wordB: 'Vidlička', category: 'Příbory' },
  { wordA: 'Pes', wordB: 'Vlk', category: 'Psovité šelmy' },
  { wordA: 'Kino', wordB: 'Divadlo', category: 'Kulturní zábava' },
  { wordA: 'Čokoláda', wordB: 'Zmrzlina', category: 'Sladkosti' },
  { wordA: 'Sprcha', wordB: 'Vana', category: 'Koupelna' },
  { wordA: 'Šachy', wordB: 'Dáma', category: 'Deskové hry' },
  { wordA: 'Vlak', wordB: 'Metro', category: 'Kolejová doprava' },
  { wordA: 'Svíčka', wordB: 'Baterka', category: 'Zdroje světla' },
];

// --- Párty modifikátory (Bonusové výzvy kola) ---
const PARTY_CHALLENGES = [
  { id: 'single_word', title: 'Jedno slovo', desc: 'Každý smí říct přesně jedno jediné slovo.' },
  { id: 'rhyme', title: 'Rýmování', desc: 'Tvoje nápověda se musí rýmovat s nápovědou předchozího hráče.' },
  { id: 'no_e', title: 'Zákaz písmene E', desc: 'V nápovědě nesmíš použít písmeno „E“!' },
  { id: 'question', title: 'Pouze otázka', desc: 'Nápověda musí mít formu otázky.' },
  { id: 'whisper', title: 'Šepot v místnosti', desc: 'Celou svou nápovědu musíš zašeptat.' },
  { id: 'accent', title: 'Cizí přízvuk', desc: 'Nápovědu musíš říct s cizím nebo vtipným přízvukem.' },
  { id: 'pantomime', title: 'Gesto beze slov', desc: 'Nesmíš promluvit! Nápovědu předveď jedním gestem.' },
  { id: 'song', title: 'Zpívaná nápověda', desc: 'Nápovědu musíš zazpívat jako operní árii nebo refrén.' },
];

/** Načtení uživatelských vlastních slov z localStorage */
function getCustomWords() {
  try {
    const raw = localStorage.getItem('impostor-custom-words');
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

function saveCustomWords(wordsArray) {
  try {
    localStorage.setItem('impostor-custom-words', JSON.stringify(wordsArray));
  } catch {}
}

/** Seznam všech kategorií pro zobrazení impostorovi */
function getAllCategories() {
  return Object.values(WORD_DICTIONARY).map((c) => c.name);
}

/** Náhodná kategorie a slovo, volitelně filtrovaná podle vybraných klíčů */
function pickRandomWord(selectedKeys) {
  // Zkontrolujeme, zda hráč nechce použít vlastní slova
  const customWords = getCustomWords();
  if (selectedKeys && selectedKeys.includes('custom') && customWords.length >= 3) {
    const word = customWords[Math.floor(Math.random() * customWords.length)];
    return {
      categoryKey: 'custom',
      categoryName: 'Vlastní balíček',
      word,
      icon: 'ph-sparkle'
    };
  }

  const allKeys = Object.keys(WORD_DICTIONARY);
  const keys = (selectedKeys && selectedKeys.length > 0) 
    ? selectedKeys.filter((k) => k !== 'custom')
    : allKeys;
  
  const finalKeys = keys.length > 0 ? keys : allKeys;
  const categoryKey = finalKeys[Math.floor(Math.random() * finalKeys.length)];
  const category = WORD_DICTIONARY[categoryKey];
  const word = category.words[Math.floor(Math.random() * category.words.length)];
  return {
    categoryKey,
    categoryName: category.name,
    word,
    icon: category.icon
  };
}

/** Výběr páru pro Undercover mód */
function pickUndercoverPair() {
  const pair = UNDERCOVER_PAIRS[Math.floor(Math.random() * UNDERCOVER_PAIRS.length)];
  // Náhodně prohodíme, kdo má které slovo
  const swap = Math.random() < 0.5;
  return {
    categoryName: pair.category,
    wordCivilians: swap ? pair.wordA : pair.wordB,
    wordUndercover: swap ? pair.wordB : pair.wordA,
  };
}

/** Výběr náhodné párty výzvy */
function pickRandomChallenge() {
  return PARTY_CHALLENGES[Math.floor(Math.random() * PARTY_CHALLENGES.length)];
}
