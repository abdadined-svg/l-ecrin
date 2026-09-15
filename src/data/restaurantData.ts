import { Dish, TastingMenu, WineItem, DiningSpace, PressReview, RestaurantInfo, Reservation, GiftVoucher } from '../types';

export const RESTAURANT_INFO: RestaurantInfo = {
  name: "L'Écrin",
  tagline: "Haute Gastronomie & Art de Vivre",
  michelinStars: 3,
  chefName: "Alexandre de Saint-Germain",
  chefTitle: "Chef Étoilé & Meilleur Ouvrier de France",
  sommelierName: "Hélène Margaux",
  headPastryChef: "Claire Valmont",
  address: {
    street: "14, Place Vendôme",
    postalCode: "75001",
    city: "Paris",
    country: "France"
  },
  phone: "+33 (0)1 42 68 80 00",
  email: "reservations@lecrin-paris.com",
  hours: [
    {
      dayRange: "Du Mardi au Samedi",
      lunch: "12h15 – 14h00",
      dinner: "19h45 – 22h00",
      closed: "Fermeture Dimanche & Lundi"
    }
  ],
  dressCode: "Tenue soignée exigée. Veste de rigueur pour les messieurs.",
  valetService: true
};

export const TASTING_MENUS: TastingMenu[] = [
  {
    id: "menu-initiation",
    name: "Menu Éveil des Sens",
    subtitle: "L'essence de notre terroir en 5 créations",
    coursesCount: 5,
    price: 195,
    winePairingPrice: 120,
    description: "Une traversée poétique des récoltes maraîchères et des criées côtières, pensée pour un premier voyage au cœur de la cuisine de l'Écrin.",
    service: "dejeuner",
    steps: [
      {
        sequence: "Prélude",
        dishTitle: "Caviar Osciètre Impérial de Sologne",
        description: "En gelée d'eau de mer iodée, émulsion de céleri-branche fumé et croustillant de sarrasin breton.",
        winePairing: "Champagne Blanc de Blancs Extra Brut, Domaine Jacques Selosse"
      },
      {
        sequence: "Premier Mouvement",
        dishTitle: "Langoustine Royale de Casier",
        description: "Raidie au beurre noisette de baratte, mousseline de panais à la vanille bourbon et réduction de carapaces au poivre de Timut.",
        winePairing: "Meursault Premier Cru 'Les Charmes' 2020, Domaine des Comtes Lafon"
      },
      {
        sequence: "Deuxième Mouvement",
        dishTitle: "Turbot Sauvage de Petit Bateau",
        description: "Nacré sur l'arête, étuvée de jeunes poireaux crayons, sabayon au vin jaune du Jura et truffe noire d'hiver.",
        winePairing: "Château-Chalon 2015, Domaine Macle"
      },
      {
        sequence: "Point d'Orgue",
        dishTitle: "Pigeon de Vendée Royal",
        description: "Le suprême rôti au sautoir, les cuisses confites aux herbes sauvages, déclinaison de betteraves acidulées et jus perlé.",
        winePairing: "Côte-Rôtie 'La Landonne' 2017, Domaine Guigal"
      },
      {
        sequence: "Épilogue Sucré",
        dishTitle: "La Vanille Sauvage & Noisette du Piémont",
        description: "Nuage glacé à la vanille de Madagascar, praliné croustillant fleur de sel et caramel chaud parfumé au cognac Napoléon.",
        winePairing: "Sauternes Premier Cru Classé 2011, Château Guiraud"
      }
    ]
  },
  {
    id: "menu-symphonie",
    name: "Menu Symphonie Céleste",
    subtitle: "La haute cuisine d'auteur en 7 actes",
    coursesCount: 7,
    price: 280,
    winePairingPrice: 175,
    description: "Le dialogue intime entre les produits d'exception et la précision du geste culinaire, couronné par trois étoiles au Guide Michelin.",
    service: "les_deux",
    isPopular: true,
    steps: [
      {
        sequence: "L'Accueil",
        dishTitle: "Huître Creuse N°2 Cadoret & Osciètre",
        description: "Pochée dans son eau de roche, granité d'agrumes de Menton et voile d'oxalis pourpre.",
        winePairing: "Champagne Grand Siècle N°26, Maison Laurent-Perrier"
      },
      {
        sequence: "Terre & Mer",
        dishTitle: "Noix de Saint-Jacques d'Erquy",
        description: "Carpaccio tiédi aux lamelles de truffe blanche d'Alba, bouillon dashi infusé aux écorces d'agrumes et genièvre.",
        winePairing: "Chablis Grand Cru 'Les Clos' 2019, Domaine François Raveneau"
      },
      {
        sequence: "Le Terroir",
        dishTitle: "Morille Ronde Farcie au Ris de Veau",
        description: "Glaçage au jus de canard réduit, sabayon au vin de paille et chapelure d'échalotes frites.",
        winePairing: "Savennières 'Clos de la Coulée de Serrant' 2018, Nicolas Joly"
      },
      {
        sequence: "La Mer",
        dishTitle: "Homard Bleu de Bretagne",
        description: "Tronçon cuit en carapace au foin d'alpage, mousseline d'artichaut camus, bisque liée au corail et estragon du jardin.",
        winePairing: "Corton-Charlemagne Grand Cru 2018, Maison Louis Latour"
      },
      {
        sequence: "L'Élevage",
        dishTitle: "Filet de Chevreuil ou Bœuf Wagyu Kagoshima A5",
        description: "Saisi à la flamme de sarments de vigne, millefeuille de pomme de terre truffée et jus de carcasse au cacao amer.",
        winePairing: "Pauillac Grand Cru Classé 2010, Château Pontet-Canet"
      },
      {
        sequence: "L'Affinage",
        dishTitle: "Chariot de Fromages de Maître Antony",
        description: "Sélection d'alpages et terroirs d'antan, pâte pressée, croûte lavée, pâte persillée et condiment figue-noix.",
        winePairing: "Vin Jaune d'Arbois 2014, Domaine Rolet"
      },
      {
        sequence: "La Finale",
        dishTitle: "Le Cacao Grand Cru Criollo & Ébène",
        description: "Coque soufflée d'or fin, ganache soyeuse 75%, crémeux tonka et sorbet à l'infusion de cabosse torréfiée.",
        winePairing: "Rivesaltes Ambré Hors d'Âge, Domaine Parcé Frères"
      }
    ]
  },
  {
    id: "menu-quintessence",
    name: "Menu Quintessence du Chef",
    subtitle: "L'apogée gastronomique en 9 mouvements d'orfèvre",
    coursesCount: 9,
    price: 360,
    winePairingPrice: 240,
    description: "Une expérience sensorielle totale. Réservée aux esthètes en quête de créations éphémères, de millésimes rares et de cuissons absolues.",
    service: "diner",
    steps: [
      {
        sequence: "Ouverture",
        dishTitle: "Tartare de Thon Rouge de Ligne & Caviar Beluga",
        description: "Empreinte d'huile d'olive de Nyons AOP, gelée de pomme verte Granny Smith et caviar Beluga Royal.",
        winePairing: "Champagne Dom Pérignon Vintage 2013"
      },
      {
        sequence: "Élégance Côtière",
        dishTitle: "Langoustine Bretonne Fumeuse",
        description: "Saisie quelques secondes, voile de lard de Colonnata affiné et réduction de pin maritime.",
        winePairing: "Condrieu 'La Doriane' 2021, E. Guigal"
      },
      {
        sequence: "Jardin des Sens",
        dishTitle: "Légumes Oubliés des Maraîchers Parisiens",
        description: "En déclinaison de textures : confits, crus, croustillants, arrosés d'une infusion chaude de foin et fleurs de sureau.",
        winePairing: "Hermitage Blanc 'Chante-Alouette' 2019, M. Chapoutier"
      },
      {
        sequence: "Noble Estran",
        dishTitle: "Bar de Ligne de l'Île d'Yeu",
        description: "Écailles croustillantes, émulsion au champagne Krug, étuvée de fenouil sauvage et perles de citron caviar.",
        winePairing: "Bâtard-Montrachet Grand Cru 2017, Domaine Leflaive"
      },
      {
        sequence: "Générosité d'Automne",
        dishTitle: "Foie Gras Poêlé au Safran du Quercy",
        description: "Pain d'épices d'antan maison, poire pochée au vin de Porto et jus corsé aux épices douces.",
        winePairing: "Tokaji Aszú 6 Puttonyos 2013, Oremus"
      },
      {
        sequence: "L'Écrin Carné",
        dishTitle: "Veau de Lait Élevé sous la Mère de Corrèze",
        description: "Le quasi piqué à la truffe noire Melanosporum, polenta crémeuse au parmesan 36 mois et sucs de cuisson truffés.",
        winePairing: "Pomerol, Château La Conseillante 2015"
      },
      {
        sequence: "La Pause de l'Échanson",
        dishTitle: "Trou Normand Contemporain",
        description: "Givre de Calvados Domfrontais 30 ans d'âge, pomme acidulée au cidre fermier et fleur d'oranger.",
        winePairing: "Calvados Pays d'Auge Michel Huard"
      },
      {
        sequence: "La Cloche d'Alpage",
        dishTitle: "L'Assiette des Maîtres Fromagers",
        description: "Comté d'Exception 42 mois de garde, Mont d'Or truffé et Roquefort artisanal aux mendiants caramélisés.",
        winePairing: "Porto Vintage 2003, Niepoort"
      },
      {
        sequence: "L'Apothéose Gourmande",
        dishTitle: "La Sphère Dorée à la Mandarine Impériale",
        description: "Soufflé chaud minute aux zestes confits de Corse, cœur coulant de grand chocolat Caraïbe et glace au lait cru infusé à la fleur de sel.",
        winePairing: "Château d'Yquem Premier Cru Supérieur 2009"
      }
    ]
  }
];

export const A_LA_CARTE_DISHES: Dish[] = [
  {
    id: "carte-entree-1",
    name: "Caviar Osciètre Impérial & Émulsion Glacée",
    subname: "Sologne, France",
    description: "Caviar d'esturgeon de Sologne, velouté glacé d'artichaut de Bretagne et tuile croustillante au sarrasin doré.",
    category: "entree",
    price: 110,
    allergens: ["Poissons", "Lactose"],
    isSignature: true,
    winePairing: "Champagne Ruinart Blanc de Blancs",
    imageUrl: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1200&q=85"
  },
  {
    id: "carte-entree-2",
    name: "Langoustines Royales au Beurre Noisette",
    subname: "Criée du Guilvinec",
    description: "Raidies à la flamme vive, mousseline de panais à la fève tonka, émulsion de carapaces et citron yuzu.",
    category: "entree",
    price: 95,
    allergens: ["Crustacés", "Lactose"],
    isSignature: true,
    winePairing: "Meursault Domaine des Comtes Lafon",
    imageUrl: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=1200&q=85"
  },
  {
    id: "carte-entree-3",
    name: "Foie Gras de Canard Poêlé & Safran du Quercy",
    subname: "Sud-Ouest",
    description: "Éclat de noisettes grillées, réduction de porto rouge ancien, poire Conférence tiédie aux épices douces.",
    category: "entree",
    price: 85,
    allergens: ["Lactose", "Fruits à coque"],
    winePairing: "Sauternes Château Suduiraut",
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85"
  },
  {
    id: "carte-entree-4",
    name: "Artichaut Violet Épineux en Deux Cuissons",
    subname: "Jardins d'Île-de-France",
    description: "Fond braisé au jus d'herbes folles, carpaccio cru mariné au citron de Sorrente et émulsion truffée.",
    category: "entree",
    price: 70,
    allergens: [],
    isVegetarian: true,
    winePairing: "Chablis Premier Cru Fourchaume",
    imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=85"
  },
  {
    id: "carte-plat-1",
    name: "Turbot Sauvage Nacré & Huître Tiède",
    subname: "Pêche côtière de l'Île d'Yeu",
    description: "Cuit sur l'arête à basse température, fondue de poireaux crayons, sabayon au vin jaune et truffe noire râpée.",
    category: "plat",
    price: 135,
    allergens: ["Poissons", "Mollusques", "Lactose"],
    isSignature: true,
    winePairing: "Corton-Charlemagne Grand Cru 2018",
    imageUrl: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1200&q=85"
  },
  {
    id: "carte-plat-2",
    name: "Homard Bleu en Deux Services",
    subname: "Baie de Morlaix",
    description: "La queue laquée au miel de bruyère et corail, les pinces en raviole fine d'herbes aromatiques sous un bouillon corsé.",
    category: "plat",
    price: 160,
    allergens: ["Crustacés", "Gluten", "Lactose"],
    isSignature: true,
    winePairing: "Puligny-Montrachet Premier Cru",
    imageUrl: "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=1200&q=85"
  },
  {
    id: "carte-plat-3",
    name: "Pigeon Royal de Vendée Rôti au Sautoir",
    subname: "Maison Mieral",
    description: "Cuisse confite aux sarments, jus de carcasse parfumé au poivre de Sichuan, étuvée de blettes et mousseline de céleri.",
    category: "plat",
    price: 125,
    allergens: ["Lactose", "Céleri"],
    winePairing: "Côte-Rôtie Domaine Jamet",
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85"
  },
  {
    id: "carte-plat-4",
    name: "Bœuf Wagyu Kagoshima A5 & Truffe Noire",
    subname: "Préfecture de Kagoshima, Japon",
    description: "Saisi à la braise de chêne japonais, millefeuille croustillant de pommes Agria truffées, moelle étuvée et réduction grand cru.",
    category: "plat",
    price: 180,
    allergens: ["Lactose"],
    isSignature: true,
    winePairing: "Pauillac Château Pichon Baron 2012",
    imageUrl: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=1200&q=85"
  },
  {
    id: "carte-fromage-1",
    name: "Le Chariot des Maîtres Affineurs Bernard Antony",
    subname: "Sélection d'Alpages & Abbayes de France",
    description: "Comté 42 mois, Beaufort d'été, Époisses de Bourgogne affiné au marc, Sainte-Maure de Touraine et Fourme d'Ambert.",
    category: "fromage",
    price: 45,
    allergens: ["Lactose"],
    winePairing: "Vin Jaune d'Arbois ou Porto Colheita",
    imageUrl: "https://images.unsplash.com/photo-1452195100486-9cc805987862?auto=format&fit=crop&w=1200&q=85"
  },
  {
    id: "carte-dessert-1",
    name: "Le Soufflé Minute à la Vanille de Madagascar",
    subname: "Grand Cru Bourbon",
    description: "Cœur coulant caramel fleur de sel de Guérande, quenelle de glace au lait cru de ferme battu à la minute.",
    category: "dessert",
    price: 42,
    allergens: ["Gluten", "Œufs", "Lactose"],
    isSignature: true,
    winePairing: "Château d'Yquem Premier Cru",
    imageUrl: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=1200&q=85"
  },
  {
    id: "carte-dessert-2",
    name: "La Sphère Chocolat Noir Grand Cru & Ébène",
    subname: "Origine Guanaja 70%",
    description: "Dentelle d'or fin 24 carats, mousse aérienne à l'infusion de poivre sauvage de Madagascar et sorbet cacao intense.",
    category: "dessert",
    price: 40,
    allergens: ["Lactose", "Œufs"],
    isSignature: true,
    winePairing: "Maury Vintage Domaine Mas Amiel",
    imageUrl: "https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=1200&q=85"
  },
  {
    id: "carte-dessert-3",
    name: "Déclinaison d'Agrumes Rares de Menton",
    subname: "Vergers de la Riviera",
    description: "Confit de cédrat, sorbet mandarine sanguine, meringue craquante au poivre timut et infusion tiède à la verveine.",
    category: "dessert",
    price: 38,
    allergens: ["Œufs"],
    isVegetarian: true,
    winePairing: "Muscat de Beaumes-de-Venise",
    imageUrl: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=1200&q=85"
  }
];

export const WINE_SELECTION: WineItem[] = [
  {
    id: "wine-1",
    name: "Dom Pérignon Vintage 2013",
    domain: "Champagne Moët & Chandon",
    vintage: "2013",
    region: "Champagne",
    country: "France",
    notes: "Notes de fleurs blanches, d'abricot sec, de brioche chaude et d'iode subtil.",
    sommelierWord: "Une minéralité vibrante, alliance absolue de la tension et de l'ampleur.",
    bottlePrice: 420,
    glassPrice: 75,
    type: "champagne",
    isRare: true
  },
  {
    id: "wine-2",
    name: "Krug Grande Cuvée 171ème Édition",
    domain: "Maison Krug",
    vintage: "Multi-Millésime",
    region: "Champagne",
    country: "France",
    notes: "Noisette grillée, pâte d'amande, fruits confits et fraîcheur citronnée infinie.",
    sommelierWord: "Un orchestre de 120 vins de plus de dix millésimes différents.",
    bottlePrice: 480,
    type: "champagne",
    isRare: true
  },
  {
    id: "wine-3",
    name: "Meursault Premier Cru 'Charmes'",
    domain: "Domaine des Comtes Lafon",
    vintage: "2019",
    region: "Bourgogne - Côte de Beaune",
    country: "France",
    notes: "Beurre frais, noisette, pierre à fusil, pêche blanche et finale saline.",
    sommelierWord: "L'archétype du grand blanc de Bourgogne alliant opulence et droiture.",
    bottlePrice: 380,
    glassPrice: 65,
    type: "blanc"
  },
  {
    id: "wine-4",
    name: "Bâtard-Montrachet Grand Cru",
    domain: "Domaine Leflaive",
    vintage: "2017",
    region: "Bourgogne",
    country: "France",
    notes: "Fleurs d'oranger, tilleul, amande amère, texture soyeuse et persistance phénoménale.",
    sommelierWord: "Un vin d'une noblesse rare, destiné à escorter notre homard bleu ou notre turbot.",
    bottlePrice: 1250,
    type: "blanc",
    isRare: true
  },
  {
    id: "wine-5",
    name: "Pomerol",
    domain: "Château La Conseillante",
    vintage: "2015",
    region: "Bordeaux - Rive Droite",
    country: "France",
    notes: "Violette, truffe noire, coulis de mûre, cèdre et tanins d'une sensualité veloutée.",
    sommelierWord: "Le velours pur d'un grand millésime d'anthologie sur le plateau de Pomerol.",
    bottlePrice: 560,
    glassPrice: 95,
    type: "rouge"
  },
  {
    id: "wine-6",
    name: "Romanée-Saint-Vivant Grand Cru",
    domain: "Domaine de la Romanée-Conti",
    vintage: "2014",
    region: "Bourgogne - Vosne-Romanée",
    country: "France",
    notes: "Rose fanée, épices d'Orient, sous-bois d'automne, griotte noire et élégance aérienne.",
    sommelierWord: "L'émotion mystique de la Bourgogne. Disponible uniquement sur allocation.",
    bottlePrice: 3900,
    type: "rouge",
    isRare: true
  },
  {
    id: "wine-7",
    name: "Château d'Yquem Premier Cru Supérieur",
    domain: "Château d'Yquem",
    vintage: "2009",
    region: "Bordeaux - Sauternes",
    country: "France",
    notes: "Zeste d'orange amère, safran, mangue rôtie, miel d'acacia et fraîcheur étourdissante.",
    sommelierWord: "La lumière liquide du soleil couchant sur les coteaux de Sauternes.",
    bottlePrice: 890,
    glassPrice: 140,
    type: "digestif",
    isRare: true
  }
];

export const DINING_SPACES: DiningSpace[] = [
  {
    id: "salon-or",
    title: "Le Grand Salon Cristal",
    subtitle: "L'art de recevoir sous les dorures du XVIIIe siècle",
    capacity: "45 couverts",
    atmosphere: "Lumière feutrée, lustres de Baccarat, boiseries d'époque et nappage d'organdi.",
    description: "Au cœur de l'hôtel particulier, notre salle principale offre une acoustique intimiste où les tables sont espacées avec une générosité royale pour préserver la discrétion de chaque conversation.",
    image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=85",
    features: ["Lustres historiques en cristal", "Tables rondes espacées de 3 mètres", "Argenterie Christofle", "Porcelaine Bernardaud"]
  },
  {
    id: "table-chef",
    title: "La Table du Chef Privilégiée",
    subtitle: "Au plus près de l'émotion et du geste",
    capacity: "2 à 6 convives",
    atmosphere: "Face au passe d'envoi de la brigade, en immersion silencieuse et feutrée.",
    description: "Installée dans une alcôve privée donnant directement sur le ballet millimétré de la brigade, la Table du Chef propose un service orchestré personnellement par Alexandre de Saint-Germain.",
    image: "https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=1200&q=85",
    features: ["Présentation directe par le Chef", "Menu surprise inédit en 9 temps", "Accords de flacons rares", "Visite des cuisines"]
  },
  {
    id: "jardin-hiver",
    title: "La Verrière & Le Jardin d'Hiver",
    subtitle: "Une respiration végétale au cœur de Paris",
    capacity: "25 couverts",
    atmosphere: "Baignée de lumière naturelle le jour, voûte étoilée la nuit.",
    description: "Surplombant un patio arboré de buis centenaires, de jasmin et d'herbes aromatiques cultivées pour notre cuisine, cette verrière contemporaine conjugue minéralité et quiétude absolue.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85",
    features: ["Patio végétal privatisable", "Végétaux aromatiques vivants", "Toit verrière panoramique", "Ambiance romantique feutrée"]
  },
  {
    id: "cave-voutee",
    title: "Le Salon Sommelier & La Cave",
    subtitle: "L'écrin de 1 800 références de terroirs d'anthologie",
    capacity: "Jusqu'à 12 convives",
    atmosphere: "Pierres de taille du XVIIe siècle, température et hygrométrie parfaites.",
    description: "Dédié aux dégustations de millésimes centenaires et aux dîners d'exception, ce salon secret invite à un voyage sensoriel guidé par notre Cheffe Sommelière Hélène Margaux.",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=85",
    features: ["Flacons de collections privées", "Dégustation à l'aveugle possible", "Privatisation exclusive", "Accord sur-mesure"]
  }
];

export const PRESS_REVIEWS: PressReview[] = [
  {
    id: "rev-1",
    guideOrMedia: "Guide Michelin",
    ratingOrAward: "Trois Étoiles Michelin",
    quote: "Une cuisine d'une pureté saisissante où chaque assiette célèbre l'émotion nue du produit. Alexandre de Saint-Germain hisse la haute cuisine française au rang d'art absolu.",
    criticName: "Inspecteur Principal",
    year: "2025"
  },
  {
    id: "rev-2",
    guideOrMedia: "Gault & Millau",
    ratingOrAward: "19.5 / 20 — 5 Toques d'Or",
    quote: "L'Écrin ne se contente pas d'exceller, il redéfinit les contours du raffinement. Un service de salle aristocratique, des accords de sommellerie bouleversants.",
    criticName: "Palmarès Gastronomique",
    year: "2024"
  },
  {
    id: "rev-3",
    guideOrMedia: "Les Grandes Tables du Monde",
    ratingOrAward: "Membre d'Excellence",
    quote: "Une expérience d'hospitalité rare où l'art de la table à la française retrouve sa plus haute splendeur intemporelle.",
    criticName: "Comité International",
    year: "2025"
  },
  {
    id: "rev-4",
    guideOrMedia: "Le Figaro Économie & Luxe",
    ratingOrAward: "Table de l'Année",
    quote: "L'accord parfait entre mémoire classique et fulgurance contemporaine. Une des tables les plus convoitées du monde.",
    criticName: "François-Régis Gaudry",
    year: "2024"
  }
];

export const INITIAL_RESERVATIONS: Reservation[] = [
  {
    id: "res-001",
    confirmationCode: "ECRIN-9821",
    date: "2026-09-12",
    time: "20:00",
    service: "diner",
    guests: 2,
    menuChoice: "Menu Symphonie Céleste (7 temps)",
    civility: "M.",
    firstName: "Jean-Philippe",
    lastName: "de Montmirail",
    email: "jp.montmirail@chateau-heritage.fr",
    phone: "+33 6 12 34 56 78",
    occasion: "Anniversaire de mariage (30 ans)",
    dietaryRestrictions: "Aucun crustacé pour madame",
    specialRequests: "Table discrète près de la verrière si possible.",
    winePairingRequested: true,
    status: "confirmée",
    tablePreference: "jardin",
    createdAt: "2026-09-08T14:20:00Z"
  },
  {
    id: "res-002",
    confirmationCode: "ECRIN-7734",
    date: "2026-09-12",
    time: "20:30",
    service: "diner",
    guests: 4,
    menuChoice: "Menu Quintessence du Chef (9 temps)",
    civility: "Mme",
    firstName: "Victoria",
    lastName: "Sterling",
    email: "v.sterling@mayfair-invest.co.uk",
    phone: "+44 7700 900123",
    occasion: "Dîner de célébration",
    dietaryRestrictions: "Une personne végétarienne",
    specialRequests: "Prévoir un mot personnalisé pour l'anniversaire.",
    winePairingRequested: true,
    status: "confirmée",
    tablePreference: "table_chef",
    createdAt: "2026-09-07T18:45:00Z"
  },
  {
    id: "res-003",
    confirmationCode: "ECRIN-4412",
    date: "2026-09-13",
    time: "12h30",
    service: "dejeuner",
    guests: 2,
    menuChoice: "Menu Éveil des Sens (5 temps)",
    civility: "M.",
    firstName: "Antoine",
    lastName: "Lefebvre",
    email: "a.lefebvre@avocats-associes.paris",
    phone: "+33 6 98 76 54 32",
    occasion: "Déjeuner d'affaires confidentiel",
    dietaryRestrictions: "",
    specialRequests: "Facture détaillée au nom du cabinet.",
    winePairingRequested: false,
    status: "confirmée",
    tablePreference: "salle",
    createdAt: "2026-09-09T09:10:00Z"
  }
];

export const INITIAL_GIFT_VOUCHERS: GiftVoucher[] = [
  {
    id: "voucher-001",
    voucherCode: "CADEAU-ECRIN-552",
    title: "Coffret Dégustation Céleste pour Deux",
    experienceName: "Menu Symphonie Céleste en 7 temps avec accords Mets & Vins",
    guestsCount: 2,
    price: 910,
    purchaserName: "Gérard de Boissieu",
    purchaserEmail: "gerard.boissieu@patrimoine.fr",
    recipientName: "Camille et Nicolas Vaneck",
    personalMessage: "Très joyeux anniversaire de mariage ! Que cette soirée sous les étoiles de l'Écrin soit inoubliable.",
    includeWinePairing: true,
    expirationDate: "2027-09-15",
    status: "valide",
    createdAt: "2026-09-01T11:00:00Z"
  }
];

export const GALLERY_ITEMS: {
  id: string;
  title: string;
  category: 'Plat' | 'Geste du Chef' | 'Salle' | 'Cave';
  imageUrl: string;
  aspect: 'vertical' | 'horizontal' | 'large' | 'carre';
  description?: string;
}[] = [
  {
    id: "gal-1",
    title: "La Précision du Dressage",
    category: "Geste du Chef",
    imageUrl: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1200&q=85",
    aspect: "vertical",
    description: "Le Chef Alexandre de Saint-Germain ajustant l'équilibre aromatique d'une création avant le départ en salle."
  },
  {
    id: "gal-2",
    title: "Caviar Osciètre & Émulsion Marine",
    category: "Plat",
    imageUrl: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1200&q=85",
    aspect: "horizontal",
    description: "La pureté iodée de l'or noir de Sologne mariée à un velouté glacé d'artichaut."
  },
  {
    id: "gal-3",
    title: "Le Grand Salon aux Cristaux",
    category: "Salle",
    imageUrl: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=85",
    aspect: "large",
    description: "Les lustres de Baccarat diffusant une douce clarté dorée sur les nappages de lin brut."
  },
  {
    id: "gal-4",
    title: "Langoustine Royale Nacrée",
    category: "Plat",
    imageUrl: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=1200&q=85",
    aspect: "carre",
    description: "Raidie en quelques secondes au beurre noisette de baratte."
  },
  {
    id: "gal-5",
    title: "La Cave Voûtée Historique",
    category: "Cave",
    imageUrl: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=85",
    aspect: "vertical",
    description: "Les pierres de taille du XVIIIe siècle abritant nos 1 800 flacons de grands crus d'anthologie."
  },
  {
    id: "gal-6",
    title: "L'Orfèvrerie Sucrée",
    category: "Plat",
    imageUrl: "https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=1200&q=85",
    aspect: "horizontal",
    description: "La sphère de chocolat Guanaja dentelée d'or fin 24 carats par Claire Valmont."
  },
  {
    id: "gal-7",
    title: "La Flamme & Le Passe",
    category: "Geste du Chef",
    imageUrl: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=85",
    aspect: "large",
    description: "L'intensité feutrée et silencieuse du coup de feu au sein de la brigade."
  }
];

export const GUEST_TESTIMONIALS = [
  {
    id: "test-1",
    author: "Éléonore & Henri de Montmirail",
    city: "Bordeaux",
    rating: 5,
    date: "Il y a 3 semaines",
    context: "Dîner pour nos 25 ans de mariage • Grand Salon Cristal",
    content: "Un moment suspendu hors du temps. La langoustine royale et le ris de veau morille nous ont émus aux larmes. Le service est d'une prévenance aristocratique sans jamais être pesant. Une émotion culinaire inoubliable."
  },
  {
    id: "test-2",
    author: "Lord Julian Vance",
    city: "Londres",
    rating: 5,
    date: "Le mois dernier",
    context: "Menu Quintessence en 9 temps • Table du Chef",
    content: "Watching Chef Alexandre orchestrate his brigade in complete silence was pure artistry. The pairing with the Romanée-Saint-Vivant and the aged turbot was the highlight of my culinary journeys this year."
  },
  {
    id: "test-3",
    author: "Claire & Thomas V.",
    city: "Paris",
    rating: 5,
    date: "Il y a 10 jours",
    context: "Déjeuner d'exception • Verrière du Jardin",
    content: "La lumière tamisée sous la verrière, la délicatesse des herbes cueillies le matin même... L'Écrin prouve que la grande gastronomie française sait être profondément vivante, chaleureuse et humaine."
  }
];
