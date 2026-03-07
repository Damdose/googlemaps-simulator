import { KeywordSuggestion } from './types';

const CITY_SEARCH_MULTIPLIER: Record<string, number> = {
  'paris': 3.0, 'marseille': 1.4, 'lyon': 1.3, 'toulouse': 1.1, 'nice': 0.9,
  'nantes': 0.9, 'montpellier': 0.8, 'strasbourg': 0.8, 'bordeaux': 0.85,
  'lille': 0.8, 'rennes': 0.7, 'reims': 0.5, 'toulon': 0.5, 'saint-étienne': 0.5,
  'le havre': 0.45, 'grenoble': 0.5, 'dijon': 0.5, 'angers': 0.45,
  'nîmes': 0.4, 'aix-en-provence': 0.45, 'clermont-ferrand': 0.45,
  'le mans': 0.4, 'brest': 0.4, 'tours': 0.45, 'amiens': 0.4,
  'limoges': 0.35, 'perpignan': 0.35, 'metz': 0.4, 'besançon': 0.35,
  'orléans': 0.4, 'rouen': 0.45, 'caen': 0.4, 'mulhouse': 0.35, 'nancy': 0.4,
  'argenteuil': 0.3, 'montreuil': 0.3, 'saint-denis': 0.3, 'versailles': 0.35,
  'boulogne-billancourt': 0.3, 'avignon': 0.35, 'cannes': 0.35, 'antibes': 0.3,
  'pau': 0.3, 'calais': 0.25, 'dunkerque': 0.25, 'valence': 0.3,
  'troyes': 0.25, 'la rochelle': 0.35, 'chambéry': 0.3, 'annecy': 0.35,
  'bayonne': 0.3, 'colmar': 0.25, 'lorient': 0.25, 'quimper': 0.25,
};

const CATEGORY_BASE_VOLUMES: Record<string, number> = {
  restaurant: 8100, bakery: 2900, lawyer: 2400, attorney: 2400,
  dentist: 3600, hair_salon: 2900, beauty_salon: 1600,
  general_practitioner: 2400, doctor: 2900, plumber: 1900,
  electrician: 1600, real_estate_agency: 2400, gym: 2400,
  auto_repair: 1300, pharmacy: 1600, hotel: 4400, cafe: 2400,
  veterinarian: 1300, accounting: 1000, store: 1900,
};

const KEYWORD_TEMPLATES: Record<string, { services: string[]; intents: string[] }> = {
  restaurant: {
    services: ['restaurant gastronomique', 'restaurant terrasse', 'brunch', 'restaurant livraison', 'bistrot', 'restaurant midi'],
    intents: ['où manger', 'bon restaurant', 'meilleur restaurant', 'restaurant pas cher'],
  },
  bakery: {
    services: ['boulangerie artisanale', 'pâtisserie', 'pain artisanal', 'viennoiserie', 'croissant'],
    intents: ['meilleure boulangerie', 'boulangerie ouverte dimanche', 'pain bio'],
  },
  lawyer: {
    services: ['avocat pénaliste', 'avocat divorce', 'avocat droit de la famille', 'avocat droit pénal', 'défense pénale'],
    intents: ['meilleur avocat', 'avocat urgence', 'consultation avocat'],
  },
  attorney: {
    services: ['avocat pénaliste', 'avocat divorce', 'avocat droit de la famille', 'avocat droit pénal'],
    intents: ['meilleur avocat', 'avocat urgence', 'consultation avocat'],
  },
  dentist: {
    services: ['implant dentaire', 'orthodontiste', 'blanchiment dentaire', 'chirurgien dentiste', 'couronne dentaire'],
    intents: ['dentiste urgence', 'dentiste sans douleur', 'meilleur dentiste'],
  },
  hair_salon: {
    services: ['coiffeur homme', 'coiffeur femme', 'coloration', 'balayage', 'barbier', 'mèches'],
    intents: ['meilleur coiffeur', 'coiffeur pas cher', 'coupe de cheveux'],
  },
  beauty_salon: {
    services: ['soin visage', 'épilation', 'manucure', 'pédicure', 'massage', 'onglerie'],
    intents: ['meilleur institut de beauté', 'esthéticienne'],
  },
  general_practitioner: {
    services: ['médecin traitant', 'consultation médicale', 'visite médicale', 'médecin de famille'],
    intents: ['médecin sans rdv', 'médecin urgence', 'docteur généraliste'],
  },
  doctor: {
    services: ['médecin spécialiste', 'consultation médicale', 'centre médical'],
    intents: ['médecin sans rdv', 'médecin urgence'],
  },
  plumber: {
    services: ['dépannage plomberie', 'débouchage canalisation', 'chauffe-eau', 'installation sanitaire'],
    intents: ['plombier urgence', 'plombier pas cher', 'fuite eau'],
  },
  electrician: {
    services: ['installation électrique', 'tableau électrique', 'mise aux normes électriques'],
    intents: ['électricien urgence', 'dépannage électrique', 'panne électrique'],
  },
  real_estate_agency: {
    services: ['estimation immobilière', 'gestion locative', 'location appartement', 'appartement à vendre'],
    intents: ['meilleure agence immobilière', 'achat immobilier', 'maison à vendre'],
  },
  gym: {
    services: ['coach sportif', 'musculation', 'crossfit', 'cours de sport', 'remise en forme'],
    intents: ['meilleure salle de sport', 'abonnement sport', 'fitness'],
  },
  auto_repair: {
    services: ['vidange', 'contrôle technique', 'carrosserie', 'entretien voiture', 'pneu'],
    intents: ['garage pas cher', 'réparation voiture', 'mécanique auto'],
  },
  pharmacy: {
    services: ['parapharmacie', 'pharmacie de garde', 'pharmacie ouverte'],
    intents: ['pharmacie de garde', 'pharmacie ouverte dimanche'],
  },
  hotel: {
    services: ['chambre hôtel', 'hôtel avec parking', 'hôtel de charme', 'hébergement'],
    intents: ['hôtel pas cher', 'meilleur hôtel', 'réservation hôtel'],
  },
  cafe: {
    services: ['salon de thé', 'coffee shop', 'brunch', 'petit déjeuner'],
    intents: ['meilleur café', 'café wifi', 'terrasse café'],
  },
  veterinarian: {
    services: ['vétérinaire chat', 'vétérinaire chien', 'clinique vétérinaire'],
    intents: ['vétérinaire urgence', 'meilleur vétérinaire'],
  },
  accounting: {
    services: ['expert comptable', 'bilan comptable', 'déclaration fiscale', 'conseil fiscal'],
    intents: ['meilleur comptable', 'cabinet comptable'],
  },
};

function extractCity(address: string): string {
  const parts = address.split(',').map(p => p.trim());
  const skipWords = ['France', 'Belgique', 'Suisse', 'Canada', 'Luxembourg'];

  for (const part of parts) {
    const zipMatch = part.match(/\d{5}\s+(.+)/);
    if (zipMatch) {
      const city = zipMatch[1].trim();
      if (!skipWords.includes(city)) return city;
    }
  }

  if (parts.length >= 3) {
    const segment = parts[parts.length - 2].trim();
    const zipMatch = segment.match(/(?:\d{5}\s+)?(.+)/);
    if (zipMatch) {
      const city = zipMatch[1].trim();
      if (city.length > 2 && !skipWords.includes(city)) return city;
    }
  }

  for (const part of parts) {
    const candidate = part.replace(/^\d+\s+/, '').trim();
    if (candidate.length > 2 && !skipWords.includes(candidate) && !/^\d/.test(candidate)) {
      const hasNumber = /\d/.test(part);
      if (!hasNumber) return candidate;
    }
  }

  return '';
}

function extractDistrict(address: string): string | null {
  const zipMatch = address.match(/75(\d{3})/);
  if (zipMatch) {
    const arr = parseInt(zipMatch[1], 10);
    if (arr >= 1 && arr <= 20) {
      return `Paris ${arr}${arr === 1 ? 'er' : 'e'}`;
    }
  }

  const distMatch = address.match(/(Lyon|Marseille|Paris)\s*(\d{1,2})/i);
  if (distMatch) {
    return `${distMatch[1]} ${distMatch[2]}e`;
  }

  return null;
}

function getCityMultiplier(city: string): number {
  const normalized = city.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  for (const [key, mult] of Object.entries(CITY_SEARCH_MULTIPLIER)) {
    const normalizedKey = key.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    if (normalized.includes(normalizedKey) || normalizedKey.includes(normalized)) {
      return mult;
    }
  }
  return 0.2;
}

function getBaseVolume(primaryType: string): number {
  if (CATEGORY_BASE_VOLUMES[primaryType]) return CATEGORY_BASE_VOLUMES[primaryType];
  const parent = TYPE_PARENT_MAP[primaryType];
  if (parent && CATEGORY_BASE_VOLUMES[parent]) return CATEGORY_BASE_VOLUMES[parent];
  return 1300;
}

function estimateVolume(baseVol: number, cityMult: number, patternMod: number): number {
  const raw = baseVol * cityMult * patternMod;
  if (raw >= 1000) return Math.round(raw / 100) * 100;
  if (raw >= 100) return Math.round(raw / 10) * 10;
  return Math.max(10, Math.round(raw / 10) * 10);
}

const TYPE_PARENT_MAP: Record<string, string> = {
  french_restaurant: 'restaurant', italian_restaurant: 'restaurant',
  japanese_restaurant: 'restaurant', chinese_restaurant: 'restaurant',
  indian_restaurant: 'restaurant', mexican_restaurant: 'restaurant',
  thai_restaurant: 'restaurant', vietnamese_restaurant: 'restaurant',
  korean_restaurant: 'restaurant', mediterranean_restaurant: 'restaurant',
  pizza_restaurant: 'restaurant', seafood_restaurant: 'restaurant',
  steak_house: 'restaurant', sushi_restaurant: 'restaurant',
  argentinian_restaurant: 'restaurant', brazilian_restaurant: 'restaurant',
  lebanese_restaurant: 'restaurant', turkish_restaurant: 'restaurant',
  greek_restaurant: 'restaurant', spanish_restaurant: 'restaurant',
  hamburger_restaurant: 'restaurant', fast_food_restaurant: 'restaurant',
  bar: 'cafe', coffee_shop: 'cafe', tea_house: 'cafe',
  spa: 'beauty_salon', nail_salon: 'beauty_salon',
  barber_shop: 'hair_salon',
  physiotherapist: 'doctor', dermatologist: 'doctor', pediatrician: 'doctor',
  cardiologist: 'doctor', ophthalmologist: 'doctor', psychologist: 'doctor',
};

const TYPE_FRENCH_NAME: Record<string, string> = {
  restaurant: 'restaurant', french_restaurant: 'restaurant français',
  italian_restaurant: 'restaurant italien', japanese_restaurant: 'restaurant japonais',
  chinese_restaurant: 'restaurant chinois', indian_restaurant: 'restaurant indien',
  mexican_restaurant: 'restaurant mexicain', thai_restaurant: 'restaurant thaï',
  vietnamese_restaurant: 'restaurant vietnamien', korean_restaurant: 'restaurant coréen',
  mediterranean_restaurant: 'restaurant méditerranéen', pizza_restaurant: 'pizzeria',
  seafood_restaurant: 'restaurant de fruits de mer', steak_house: 'steakhouse',
  sushi_restaurant: 'restaurant de sushi', argentinian_restaurant: 'restaurant argentin',
  brazilian_restaurant: 'restaurant brésilien', lebanese_restaurant: 'restaurant libanais',
  turkish_restaurant: 'restaurant turc', greek_restaurant: 'restaurant grec',
  spanish_restaurant: 'restaurant espagnol', hamburger_restaurant: 'burger',
  fast_food_restaurant: 'fast food',
  bakery: 'boulangerie', cafe: 'café', coffee_shop: 'café',
  bar: 'bar', tea_house: 'salon de thé',
  hair_salon: 'coiffeur', barber_shop: 'barbier',
  beauty_salon: 'institut de beauté', spa: 'spa', nail_salon: 'onglerie',
  dentist: 'dentiste', doctor: 'médecin',
  general_practitioner: 'médecin généraliste',
  lawyer: 'avocat', attorney: 'avocat',
  plumber: 'plombier', electrician: 'électricien',
  real_estate_agency: 'agence immobilière',
  gym: 'salle de sport', pharmacy: 'pharmacie',
  hotel: 'hôtel', veterinarian: 'vétérinaire',
  accounting: 'expert comptable', auto_repair: 'garage auto',
};

function getTemplatesForType(primaryType: string): { services: string[]; intents: string[] } {
  if (KEYWORD_TEMPLATES[primaryType]) {
    return KEYWORD_TEMPLATES[primaryType];
  }

  const parent = TYPE_PARENT_MAP[primaryType];
  if (parent && KEYWORD_TEMPLATES[parent]) {
    return KEYWORD_TEMPLATES[parent];
  }

  const lowerType = primaryType.toLowerCase().replace(/_/g, ' ');
  for (const [key, tpl] of Object.entries(KEYWORD_TEMPLATES)) {
    const normalizedKey = key.replace(/_/g, ' ');
    if (lowerType.includes(normalizedKey) || normalizedKey.includes(lowerType)) {
      return tpl;
    }
  }

  return {
    services: [],
    intents: [`meilleur ${primaryType.replace(/_/g, ' ')}`, `${primaryType.replace(/_/g, ' ')} pas cher`],
  };
}

function getFrenchTypeName(primaryType: string, displayName: string): string {
  if (TYPE_FRENCH_NAME[primaryType]) {
    return TYPE_FRENCH_NAME[primaryType];
  }
  const lower = displayName.toLowerCase();
  if (lower && !lower.includes('_') && /^[a-zà-ÿéèêëîïôùûüç\s-]+$/.test(lower)) {
    return lower;
  }
  return primaryType.replace(/_/g, ' ');
}

export function generateKeywordsForBusiness(
  primaryType: string,
  primaryTypeDisplayName: string,
  businessName: string,
  address: string,
): KeywordSuggestion[] {
  const city = extractCity(address);
  const district = extractDistrict(address);
  const cityMultiplier = getCityMultiplier(city);
  const baseVolume = getBaseVolume(primaryType);
  const templates = getTemplatesForType(primaryType);

  const categoryName = getFrenchTypeName(primaryType, primaryTypeDisplayName);
  const parentType = TYPE_PARENT_MAP[primaryType];
  const genericName = parentType ? (TYPE_FRENCH_NAME[parentType] ?? parentType) : null;
  const hasSpecificType = genericName && genericName !== categoryName;

  const keywordSet = new Set<string>();
  const suggestions: KeywordSuggestion[] = [];

  function add(keyword: string, patternMod: number) {
    const normalized = keyword.toLowerCase().trim();
    if (keywordSet.has(normalized) || normalized.length < 5) return;
    keywordSet.add(normalized);
    suggestions.push({
      keyword: normalized,
      searchVolume: estimateVolume(baseVolume, cityMultiplier, patternMod),
      selected: false,
    });
  }

  if (city) {
    if (hasSpecificType) {
      add(`${genericName} ${city}`, 1.2);
    }
    add(`${categoryName} ${city}`, 1.0);

    for (const intent of templates.intents.slice(0, 3)) {
      add(`${intent} ${city}`, 0.4);
    }

    for (const service of templates.services.slice(0, 3)) {
      add(`${service} ${city}`, 0.3);
    }
  }

  if (district) {
    if (hasSpecificType) {
      add(`${genericName} ${district}`, 0.4);
    }
    add(`${categoryName} ${district}`, 0.35);
    for (const intent of templates.intents.slice(0, 2)) {
      add(`${intent} ${district}`, 0.2);
    }
  }

  if (hasSpecificType) {
    add(`${genericName} près de moi`, 0.65);
  }
  add(`${categoryName} près de moi`, 0.55);

  for (const intent of templates.intents.slice(0, 2)) {
    add(`${intent} près de moi`, 0.3);
  }

  if (businessName && businessName.length >= 4) {
    const nameLower = businessName.toLowerCase();
    if (!keywordSet.has(nameLower)) {
      keywordSet.add(nameLower);
      suggestions.push({
        keyword: nameLower,
        searchVolume: estimateVolume(baseVolume, cityMultiplier, 0.05),
        selected: false,
      });
    }
  }

  suggestions.sort((a, b) => b.searchVolume - a.searchVolume);

  for (let i = 0; i < Math.min(3, suggestions.length); i++) {
    suggestions[i].selected = true;
  }

  return suggestions.slice(0, 15);
}
