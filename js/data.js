/**
 * Slovník kategorií a slov pro hru Impostor.
 * Rozsáhlá databáze slov (50–60+ slov na kategorii) a bohatý výběr Undercover dvojic.
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
      'Želva', 'Hroch', 'Chobotnice', 'Lenochod', 'Plameňák',
      'Koala', 'Lev', 'Gepard', 'Nosorožec', 'Ježek',
      'Křeček', 'Morče', 'Velryba', 'Žralok', 'Mravenec',
      'Pavouk', 'Komár', 'Šnek', 'Labuť', 'Vrána',
      'Pštros', 'Bobr', 'Vydra', 'Daněk', 'Jelen',
      'Liška', 'Rys', 'Kobra', 'Medúza', 'Rejnok',
      'Surikata', 'Tuleň', 'Mrož', 'Krtek', 'Ještěrka',
      'Čáp', 'Kůň', 'Osel', 'Koza', 'Ovce', 'Prase', 'Mravenečník'
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
      'Burrito', 'Donut', 'Muffin', 'Falafel', 'Štrúdl',
      'Řízek', 'Špagety', 'Hranolky', 'Hot dog', 'Knedlík',
      'Bramborový salát', 'Rajská omáčka', 'Čočková polévka', 'Bramboračka', 'Tatarák',
      'Čokoláda', 'Zmrzlina', 'Krupicová kaše', 'Lívance', 'Panna cotta',
      'Nachos', 'Quesadilla', 'Tortilla', 'Hummus', 'Sendvič',
      'Bageta', 'Toast', 'Buchty', 'Koláč', 'Bábovka',
      'Perník', 'Puding', 'Medovník', 'Větrník', 'Laskonka',
      'Káva', 'Čaj', 'Horká čokoláda', 'Kakao', 'Limonáda',
      'Džus', 'Smoothie', 'Mléčný koktejl', 'Mošt', 'Ledový čaj'
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
      'Lví král', 'Spider-Man', 'Návrat do budoucnosti', 'Toy Story', 'Stranger Things',
      'Star Wars', 'Avengers', 'Batman', 'Piráti z Karibiku', 'Simpsonovi',
      'Přátelé', 'Hra o trůny', 'Teorie velkého třesku', 'Wednesday', 'Breaking Bad',
      'James Bond', 'Sherlock Holmes', 'Doba ledová', 'Madagaskar', 'Kung Fu Panda',
      'Příšerky s.r.o.', 'Hledá se Nemo', 'Aladin', 'Kráska a zvíře', 'Mulan',
      'Tarzan', 'Pátý element', 'Smrtonosná past', 'Rambo', 'Top Gun',
      'Vetřelec', 'Predátor', 'Ghostbusters', 'Kmotr', 'La La Land',
      'Žraločí tornádo', 'Rychle a zběsile', 'Pán času', 'Zaklínač', 'Maska'
    ]
  },
  mesta: {
    name: 'Města & Státy',
    icon: 'ph-buildings',
    words: [
      'Praha', 'Paříž', 'Tokio', 'New York', 'Řím',
      'Barcelona', 'Sydney', 'Káhira', 'Reykjavík', 'Dubaj',
      'Amsterdam', 'Londýn', 'Vídeň', 'Lisabon', 'Bangkok',
      'Berlín', 'Los Angeles', 'Rio de Janeiro', 'Benátky', 'Istanbul',
      'Singapur', 'Buenos Aires', 'Havana', 'Soul', 'Toronto',
      'Madrid', 'Athény', 'Budapešť', 'Varšava', 'Oslo',
      'Kodaň', 'Helsinky', 'Stockholm', 'Dublin', 'Bern',
      'Brusel', 'Miami', 'San Francisco', 'Las Vegas', 'Chicago',
      'Hong Kong', 'Nové Dillí', 'Kapské Město', 'Mexico City', 'Peking',
      'Marrákeš', 'Machu Picchu', 'Antarktida', 'Havaj', 'Island',
      'Japonsko', 'Itálie', 'Egypt', 'Brazílie', 'Austrálie',
      'Kanada', 'Mexiko', 'Švýcarsko', 'Norsko', 'Řecko'
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
      'Fotograf', 'Řidič', 'Tesař', 'Zahradník', 'Tajný agent',
      'Zubař', 'Psycholog', 'Vědec', 'Bankéř', 'Politik',
      'Barman', 'Číšník', 'Letuška', 'Strojvůdce', 'Zámečník',
      'Instalatér', 'Zedník', 'Elektrikář', 'Automechanik', 'Voják',
      'Námořník', 'Archeolog', 'Kněz', 'Soudce', 'Špión',
      'Diplomat', 'Modelka', 'Režisér', 'Kouzelník', 'Šéfkuchař',
      'Cukrář', 'Knihovník', 'Trenér', 'Plavčík', 'Vyhazovač',
      'Hrobník', 'Popelář', 'Kominík', 'Myslivec', 'Kaskadér'
    ]
  },
  sport: {
    name: 'Sport & Pohyb',
    icon: 'ph-trophy',
    words: [
      'Fotbal', 'Tenis', 'Basketbal', 'Plavání', 'Lyžování',
      'Box', 'Golf', 'Volejbal', 'Judo', 'Cyklistika',
      'Hokej', 'Atletika', 'Surfování', 'Šerm', 'Lezení',
      'Gymnastika', 'Ragby', 'Krasobruslení', 'Florbal', 'Badminton',
      'Baseball', 'Snowboarding', 'Karate', 'Stolní tenis', 'Šipky',
      'Biatlon', 'Skoky na lyžích', 'Veslování', 'Kanoistika', 'Potápění',
      'Vodní pólo', 'Triatlon', 'Rychlobruslení', 'Zápas', 'Taekwondo',
      'MMA', 'Kriket', 'Curling', 'Bowling', 'Biliár',
      'Šachy', 'Skateboard', 'Parkour', 'Paintball', 'Bungee jumping',
      'Parašutismus', 'Rafting', 'Horská turistika', 'Jóga', 'Pilates',
      'Běh', 'Štafeta', 'Vzpírání', 'Překážkový běh', 'Motokros',
      'Kanoe', 'Kitesurfing', 'Vybíjená', 'Nohejbal', 'Přetahování lanem'
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
      'Hora', 'Řeka', 'Tornádo', 'Zátoka', 'Lavina',
      'Fjord', 'Údolí', 'Louka', 'Step', 'Pramen',
      'Potok', 'Oáza', 'Písečná duna', 'Písečná bouře', 'Tsunami',
      'Zemětřesení', 'Blýskání', 'Duha', 'Krupobití', 'Hustá mlha',
      'Sněhová vánice', 'Tajfun', 'Krápník', 'Zkamenělina', 'Kráter',
      'Hvězdné nebe', 'Zatmění slunce', 'Mořská hlubina', 'Mořské dno', 'Mangrovy',
      'Stolová hora', 'Laguna', 'Příliv a odliv', 'Meteory', 'Průsmyk'
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
      'Kyborg', 'Časostroj', 'Reaktor', 'Superpočítač', 'Nanoboti',
      'Chytré hodinky', 'Powerbanka', 'Nabíječka', 'Projektor', 'Klávesnice',
      'Optická myš', 'Herní monitor', 'Webkamera', 'Flash disk', 'Externí disk',
      'Server', 'Cloud', 'Kyberprostor', 'Vesmírná stanice', 'Raketoplán',
      'Teleport', 'Antigravitace', 'Exoskelet', 'Kvantový počítač', 'Algoritmus',
      'Čtečka otisků', 'Rozpoznávání tváře', 'Dotykový displej', 'Optické vlákno', 'Radar',
      'Sonar', 'Noční vidění', 'Elektromagnet', 'Černá skříňka', 'Chytrá domácnost'
    ]
  },
  cesko: {
    name: 'Česko & Popkultura',
    icon: 'ph-flag',
    words: [
      'Kofola', 'Svíčková', 'Krteček', 'Chlebíček', 'Karlův most',
      'Tatranky', 'Švejk', 'Pivo', 'Rohlík', 'Vepřo-knedlo-zelo',
      'Pražský hrad', 'Křemílek a Vochomůrka', 'Mach a Šebestová', 'Becherovka', 'Sněžka',
      'Miloš Forman', 'Zlaté české ručičky', 'Rumburak', 'Olomoucké tvarůžky', 'Kofila',
      'Zimní stadion', 'Škodovka', 'Tramvaj T3', 'Sousedská hlídka', 'Pivovarský sklep',
      'Jára Cimrman', 'Karel Gott', 'Pat a Mat', 'Hurvínek', 'Bob a Bobek',
      'Spejbl', 'Rumcajs', 'Mrazík', 'Pelíšky', 'Slunce seno',
      'Kolja', 'Tři oříšky pro Popelku', 'Na samotě u lesa', 'Nagano 1998', 'Jaromír Jágr',
      'Petr Čech', 'Ester Ledecká', 'Emil Zátopek', 'Jan Žižka', 'Karel IV.',
      'Václav Havel', 'Pražský orloj', 'Karlštejn', 'Ještěd', 'Propast Macocha',
      'Pravčická brána', 'Šumava', 'Lipno', 'Morava', 'Vinařský sklípek',
      'Špekáček', 'Utopenec', 'Nakládaný hermelín', 'Brambůrky', 'Studentská pečeť'
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
      'Ochranka klubu', 'Párty brýle', 'Ledový kbelík', 'Závěrečná píseň', 'Ranní kebab',
      'Pivo na ex', 'Ztracená peněženka', 'Ranní kocovina', 'Červený kelímek', 'Beer pong',
      'Šatna v klubu', 'Fronta na toaletu', 'Poslední runda', 'Aperol Spritz', 'Gin s tonikem',
      'Mojito', 'Cuba Libre', 'Jägerbomb', 'Panák na uvítanou', 'Limbo tanec',
      'Hlasitá hudba', 'Pěnová párty', 'Oslava narozenin', 'Rozlučka se svobodou', 'Karnevalový kostým',
      'Párty čepička', 'Prskavka', 'Půlnoční ohňostroj', 'Barmanská show', 'Společná fotka',
      'Písničky na přání', 'Noční rozhovory', 'Ztracený kamarád', 'První ranní tramvaj', 'Energetický nápoj',
      'Chlebíčky z oslavy', 'Bouchací kuličky', 'Stolní fotbálek', 'Deskovky s alkoholem', 'Semafor párty'
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
      'Papež František', 'Královna Alžběta', 'Nelson Mandela', 'Mahátma Gándhí', 'Nikola Tesla',
      'Vincent van Gogh', 'Pablo Picasso', 'Beethoven', 'Stephen Hawking', 'Isaac Newton',
      'Marie Curie-Skłodowska', 'Neil Armstrong', 'Kryštof Kolumbus', 'Alexandr Veliký', 'Napoleon Bonaparte',
      'Abraham Lincoln', 'Martin Luther King', 'Bob Marley', 'John Lennon', 'Eminem',
      'Beyoncé', 'Taylor Swift', 'Keanu Reeves', 'Arnold Schwarzenegger', 'Sylvester Stallone',
      'Leonardo DiCaprio', 'Brad Pitt', 'Johnny Depp', 'Robert Downey Jr.', 'Lionel Messi',
      'Cristiano Ronaldo', 'Michael Jordan', 'Usain Bolt', 'Jaromír Jágr', 'David Beckham'
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
      'Sanitka', 'Hasičské auto', 'Policejní auto', 'Limuzína', 'Karavan',
      'Horkovzdušný balon', 'Parník', 'Kanoe', 'Kajak', 'Šlapadlo',
      'Rychlovlak', 'Tandemové kolo', 'Rikša', 'Gondola', 'Kočár s koňmi',
      'Psí spřežení', 'Sněžný skútr', 'Čtyřkolka', 'Buldozer', 'Jeřáb',
      'Bagr', 'Popelářský vůz', 'Odtahovka', 'Závodní formule', 'Monorail',
      'Letištní terminál', 'Nádraží', 'Přístav', 'Autobusová zastávka', 'Semafor',
      'Železniční závora', 'Dálnice', 'Tunel', 'Visutý most', 'Kruhový objezd'
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
      'Nintendo', 'Red Bull', 'Starbucks', 'KFC', 'Disney',
      'Microsoft', 'Intel', 'YouTube', 'Instagram', 'TikTok',
      'Facebook', 'Puma', 'Zara', 'H&M', 'Chanel',
      'Louis Vuitton', 'Ferrari', 'Porsche', 'Audi', 'Volkswagen',
      'Ford', 'Toyota', 'Nivea', 'Gillette', 'Nutella',
      'Snickers', 'KitKat', 'Milka', 'Haribo', 'Pepsi',
      'Monster Energy', 'Heineken', 'Pilsner Urquell', 'Uber', 'Booking'
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
      'Mikrofon', 'Reproduktor', 'Zesilovač', 'Gramofon', 'Noty',
      'Elektrická kytara', 'Kontrabas', 'Xylofon', 'Gong', 'Zvonkohra',
      'Mandolína', 'Banjo', 'Foukací harmonika', 'Ladička', 'Metronom',
      'Dirigentská hůlka', 'Notový pult', 'Bezdrátová sluchátka', 'Zvuková karta', 'Písňový text',
      'Chytlavý refrén', 'Kytarové sólo', 'Pěvecký duet', 'Rockový koncert', 'Hudební festival',
      'Zkušebna kapely', 'Nahrávací studio', 'Zlatá deska', 'Videoklip', 'Symfonický orchestr',
      'Pěvecký sbor', 'Rocková kapela', 'Jazzový klub', 'Hip hop', 'Gramofonová deska'
    ]
  },
  domacnost: {
    name: 'Domácnost & Každodenní věci',
    icon: 'ph-house',
    words: [
      'Postel', 'Lednička', 'Pračka', 'Vysavač', 'Žehlička',
      'Mikrovlnka', 'Rychlovarná konvice', 'Toustovač', 'Myčka nádobí', 'Televize',
      'Zrcadlo', 'Nástěnné hodiny', 'Ranní budík', 'Stolní lampa', 'Polštář',
      'Peřina', 'Měkký ručník', 'Zubní kartáček', 'Hřeben', 'Fén na vlasy',
      'Tekuté mýdlo', 'Šampon', 'Kancelářské nůžky', 'Svazek klíčů', 'Peněženka',
      'Skládací deštník', 'Sluneční brýle', 'Kniha na nočním stolku', 'Zápisník', 'Propiska',
      'Keramický hrnek', 'Mělký talíř', 'Vinná sklenička', 'Příbor', 'Teplá deka',
      'Pánev na smažení', 'Hrnec s pokličkou', 'Otvírák na konzervy', 'Dřevěné prkénko', 'Koš na prádlo',
      'Ramínko na šaty', 'Šatní skříň', 'Pohodlná pohovka', 'Ušák křeslo', 'Měkký koberec',
      'Záclona', 'Květináč s rostlinou', 'Dálkový ovladač', 'Kapesní baterka', 'Vonná svíčka'
    ]
  },
  hry: {
    name: 'Hry & Gaming',
    icon: 'ph-game-controller',
    words: [
      'Minecraft', 'Grand Theft Auto', 'Zaklínač', 'Pokémon', 'Fortnite',
      'Roblox', 'Counter-Strike', 'League of Legends', 'World of Warcraft', 'Super Mario',
      'Tetris', 'Pac-Man', 'Doom', 'The Sims', 'Call of Duty',
      'FIFA', 'Cyberpunk', 'Diablo', "Assassin's Creed", 'Dark Souls',
      'Need for Speed', 'Angry Birds', 'Clash of Clans', 'God of War', 'Half-Life',
      'Portal', 'Skyrim', 'Resident Evil', 'Among Us', 'Fall Guys',
      'Joystick', 'Herní gamepad', 'Herní křeslo', 'Herní headset', 'Grafická karta',
      'Platforma Steam', 'Závěrečný boss', 'Spawn point', 'Loot box', 'Herní cheater',
      'Speedrun', 'Easter egg', 'Level up', 'Okamžitý respawn', 'Ukazatel zdraví',
      'Inventář předmětů', 'Uložená pozice', 'Herní studio', 'Pixel art', 'Virtuální realita'
    ]
  }
};

// --- Bohatý seznam slovních párů pro herní mód UNDERCOVER (Falešné slovo) ---
const UNDERCOVER_PAIRS = [
  // Nápoje & Jídlo
  { wordA: 'Káva', wordB: 'Čaj', category: 'Horké nápoje' },
  { wordA: 'Pivo', wordB: 'Víno', category: 'Společenské nápoje' },
  { wordA: 'Vodka', wordB: 'Rum', category: 'Tvrdý alkohol' },
  { wordA: 'Whisky', wordB: 'Koňak', category: 'Zralý alkohol' },
  { wordA: 'Pizza', wordB: 'Hamburger', category: 'Rychlé občerstvení' },
  { wordA: 'Hranolky', wordB: 'Krokety', category: 'Bramborové přílohy' },
  { wordA: 'Palačinka', wordB: 'Lívanec', category: 'Sladká jídla' },
  { wordA: 'Croissant', wordB: 'Rohlík', category: 'Pečivo' },
  { wordA: 'Šunka', wordB: 'Slanina', category: 'Uzeniny' },
  { wordA: 'Kečup', wordB: 'Hořčice', category: 'Dochucovadla' },
  { wordA: 'Čokoláda', wordB: 'Zmrzlina', category: 'Sladkosti' },
  { wordA: 'Jablko', wordB: 'Hruška', category: 'Ovoce' },
  { wordA: 'Pomeranč', wordB: 'Mandarinka', category: 'Citrusy' },
  { wordA: 'Meloun', wordB: 'Dýně', category: 'Velké plody' },
  { wordA: 'Brambůrky', wordB: 'Popcorn', category: 'Slané mlsání' },

  // Zvířata & Příroda
  { wordA: 'Kocour', wordB: 'Lev', category: 'Kočkovité šelmy' },
  { wordA: 'Pes', wordB: 'Vlk', category: 'Psovité šelmy' },
  { wordA: 'Žralok', wordB: 'Delfín', category: 'Mořští tvorové' },
  { wordA: 'Kůň', wordB: 'Zebra', category: 'Kopytníci' },
  { wordA: 'Slon', wordB: 'Mamut', category: 'Chobotnatci' },
  { wordA: 'Včela', wordB: 'Vosa', category: 'Bodavý hmyz' },
  { wordA: 'Papoušek', wordB: 'Korela', category: 'Ptáci' },
  { wordA: 'Žába', wordB: 'Čolek', category: 'Obojživelníci' },
  { wordA: 'Slunce', wordB: 'Měsíc', category: 'Vesmírná tělesa' },
  { wordA: 'Zima', wordB: 'Léto', category: 'Roční období' },
  { wordA: 'Řeka', wordB: 'Potok', category: 'Vodní toky' },
  { wordA: 'Moře', wordB: 'Oceán', category: 'Slané vody' },
  { wordA: 'Rybník', wordB: 'Jezero', category: 'Sladké vody' },
  { wordA: 'Hora', wordB: 'Sopka', category: 'Přírodní vyvýšeniny' },
  { wordA: 'Les', wordB: 'Džungle', category: 'Zalesněná krajina' },
  { wordA: 'Blesk', wordB: 'Hrom', category: 'Letní bouřka' },
  { wordA: 'Sníh', wordB: 'Kroupy', category: 'Ledové srážky' },

  // Předměty & Domácnost
  { wordA: 'Kniha', wordB: 'Časopis', category: 'Čtení a tisk' },
  { wordA: 'Kytara', wordB: 'Housle', category: 'Strunné nástroje' },
  { wordA: 'Nůž', wordB: 'Vidlička', category: 'Jídelní příbory' },
  { wordA: 'Lžíce', wordB: 'Naběračka', category: 'Kuchyňské náčiní' },
  { wordA: 'Sprcha', wordB: 'Vana', category: 'Očista v koupelně' },
  { wordA: 'Svíčka', wordB: 'Baterka', category: 'Zdroje světla' },
  { wordA: 'Klíč', wordB: 'Zámek', category: 'Zabezpečení' },
  { wordA: 'Deštník', wordB: 'Pláštěnka', category: 'Ochrana před deštěm' },
  { wordA: 'Brýle', wordB: 'Kontaktní čočky', category: 'Zrakové pomůcky' },
  { wordA: 'Polštář', wordB: 'Peřina', category: 'Lůžkoviny' },
  { wordA: 'Křeslo', wordB: 'Gauč', category: 'Nábytek k sezení' },
  { wordA: 'Lednička', wordB: 'Mrazák', category: 'Chlazení potravin' },
  { wordA: 'Mikrovlnka', wordB: 'Trouba', category: 'Příprava jídla' },
  { wordA: 'Vysavač', wordB: 'Smeták', category: 'Úklid podlahy' },
  { wordA: 'Zrcadlo', wordB: 'Okno', category: 'Skleněné tabule' },
  { wordA: 'Šampon', wordB: 'Mýdlo', category: 'Hygienické potřeby' },

  // Technologie & Zábava
  { wordA: 'Klávesnice', wordB: 'Psací stroj', category: 'Zadávání textu' },
  { wordA: 'Notebook', wordB: 'Tablet', category: 'Přenosná elektronika' },
  { wordA: 'Smartphone', wordB: 'Chytré hodinky', category: 'Chytrá zařízení' },
  { wordA: 'Sluchátka', wordB: 'Reproduktor', category: 'Zvuková technika' },
  { wordA: 'Instagram', wordB: 'TikTok', category: 'Sociální sítě' },
  { wordA: 'YouTube', wordB: 'Netflix', category: 'Sledování videí' },
  { wordA: 'Kino', wordB: 'Divadlo', category: 'Kulturní představení' },
  { wordA: 'Šachy', wordB: 'Dáma', category: 'Deskové hry' },
  { wordA: 'Minecraft', wordB: 'Roblox', category: 'Stavitelské videohry' },

  // Doprava & Město
  { wordA: 'Kolo', wordB: 'Koloběžka', category: 'Městská vozítka' },
  { wordA: 'Letadlo', wordB: 'Vrtulník', category: 'Letecká technika' },
  { wordA: 'Vlak', wordB: 'Metro', category: 'Kolejová doprava' },
  { wordA: 'Praha', wordB: 'Brno', category: 'Morava a Čechy' },
  { wordA: 'Výtah', wordB: 'Eskalátor', category: 'Pohyb po budově' },
  { wordA: 'Hrad', wordB: 'Zámek', category: 'Historická sídla' },
  { wordA: 'Nádraží', wordB: 'Letiště', category: 'Dopravní terminály' },
  { wordA: 'Most', wordB: 'Tunel', category: 'Dopravní stavby' },

  // Lidé, Role & Superhrdinové
  { wordA: 'Doktor', wordB: 'Záchranář', category: 'Zdravotnická pomoc' },
  { wordA: 'Zubař', wordB: 'Lékař', category: 'Ordinace' },
  { wordA: 'Policista', wordB: 'Detektiv', category: 'Zákon a pořádek' },
  { wordA: 'Učitel', wordB: 'Profesor', category: 'Vzdělávání' },
  { wordA: 'Herec', wordB: 'Dabér', category: 'Herectví' },
  { wordA: 'Básník', wordB: 'Spisovatel', category: 'Literatura' },
  { wordA: 'Upír', wordB: 'Vlkodlak', category: 'Hororová monstra' },
  { wordA: 'Čaroděj', wordB: 'Kouzelník', category: 'Nadpřirozené schopnosti' },
  { wordA: 'Batman', wordB: 'Superman', category: 'Superhrdinové' },
  { wordA: 'Zloděj', wordB: 'Špión', category: 'Tajní vetřelci' },

  // Sport & Pohyb
  { wordA: 'Tenis', wordB: 'Badminton', category: 'Raketové sporty' },
  { wordA: 'Hokej', wordB: 'Florbal', category: 'Hokejové sporty' },
  { wordA: 'Fotbal', wordB: 'Ragby', category: 'Trávníkové sporty' },
  { wordA: 'Lyže', wordB: 'Snowboard', category: 'Zimní svahy' },
  { wordA: 'Běh', wordB: 'Chůze', category: 'Základní lidský pohyb' },
  { wordA: 'Plavání', wordB: 'Potápění', category: 'Pohyb pod vodou' },
  { wordA: 'Sauna', wordB: 'Pára', category: 'Horké lázně' },
  { wordA: 'Zlato', wordB: 'Stříbro', category: 'Medaile a kovy' },
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
