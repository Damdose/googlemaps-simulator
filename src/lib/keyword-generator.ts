import { KeywordSuggestion } from './types';

const KEYWORD_TEMPLATES: Record<string, string[]> = {
  restaurant: [
    'restaurant', 'restaurant français', 'bon restaurant', 'meilleur restaurant',
    'restaurant gastronomique', 'restaurant pas cher', 'restaurant terrasse',
    'où manger', 'restaurant midi', 'restaurant livraison', 'brunch', 'bistrot',
  ],
  bakery: [
    'boulangerie', 'boulangerie artisanale', 'meilleure boulangerie',
    'pain artisanal', 'pâtisserie', 'viennoiserie', 'croissant',
    'boulangerie ouverte dimanche', 'pain bio', 'boulangerie près de moi',
  ],
  lawyer: [
    'avocat', 'cabinet avocat', 'avocat pénaliste', 'avocat droit pénal',
    'avocat garde à vue', 'meilleur avocat', 'avocat urgence',
    'avocat droit de la famille', 'avocat divorce', 'consultation avocat',
    'avocat tribunal', 'défense pénale',
  ],
  attorney: [
    'avocat', 'cabinet avocat', 'avocat pénaliste', 'avocat droit pénal',
    'avocat garde à vue', 'meilleur avocat', 'avocat urgence',
    'avocat droit de la famille', 'avocat divorce', 'consultation avocat',
    'avocat tribunal', 'défense pénale',
  ],
  dentist: [
    'dentiste', 'cabinet dentaire', 'dentiste urgence', 'implant dentaire',
    'orthodontiste', 'blanchiment dentaire', 'dentiste sans douleur',
    'chirurgien dentiste', 'couronne dentaire', 'prothèse dentaire',
  ],
  hair_salon: [
    'coiffeur', 'salon de coiffure', 'coiffeur homme', 'coiffeur femme',
    'coloration', 'coupe de cheveux', 'meilleur coiffeur',
    'coiffeur pas cher', 'barbier', 'brushing', 'mèches', 'balayage',
  ],
  beauty_salon: [
    'salon de beauté', 'institut de beauté', 'soin visage', 'épilation',
    'manucure', 'pédicure', 'massage', 'onglerie', 'esthéticienne',
  ],
  general_practitioner: [
    'médecin généraliste', 'cabinet médical', 'médecin traitant',
    'consultation médicale', 'docteur généraliste', 'médecin sans rdv',
    'médecin de famille', 'visite médicale', 'centre médical',
  ],
  doctor: [
    'médecin', 'docteur', 'cabinet médical', 'médecin spécialiste',
    'consultation médicale', 'médecin sans rdv', 'centre médical',
  ],
  plumber: [
    'plombier', 'plombier urgence', 'dépannage plomberie', 'fuite eau',
    'plombier chauffagiste', 'débouchage canalisation', 'chauffe-eau',
    'réparation plomberie', 'plombier pas cher', 'installation sanitaire',
  ],
  electrician: [
    'électricien', 'électricien urgence', 'dépannage électrique',
    'installation électrique', 'tableau électrique', 'panne électrique',
    'électricien pas cher', 'mise aux normes électriques',
  ],
  real_estate_agency: [
    'agence immobilière', 'immobilier', 'appartement à vendre',
    'location appartement', 'estimation immobilière', 'achat immobilier',
    'maison à vendre', 'agent immobilier', 'gestion locative',
  ],
  gym: [
    'salle de sport', 'fitness', 'musculation', 'coach sportif',
    'salle de musculation', 'gym', 'crossfit', 'cours de sport',
    'abonnement sport', 'remise en forme',
  ],
  auto_repair: [
    'garage auto', 'garage automobile', 'réparation voiture', 'mécanique auto',
    'vidange', 'contrôle technique', 'pneu', 'carrosserie',
    'entretien voiture', 'garage pas cher',
  ],
  pharmacy: [
    'pharmacie', 'pharmacie de garde', 'pharmacie ouverte',
    'parapharmacie', 'pharmacie en ligne', 'ordonnance',
  ],
  hotel: [
    'hôtel', 'hôtel pas cher', 'meilleur hôtel', 'hôtel centre-ville',
    'réservation hôtel', 'chambre hôtel', 'hôtel avec parking',
    'hôtel de charme', 'hébergement',
  ],
  cafe: [
    'café', 'salon de thé', 'coffee shop', 'brunch', 'petit déjeuner',
    'meilleur café', 'terrasse café', 'café wifi',
  ],
  veterinarian: [
    'vétérinaire', 'clinique vétérinaire', 'vétérinaire urgence',
    'vétérinaire chat', 'vétérinaire chien', 'cabinet vétérinaire',
  ],
  accounting: [
    'comptable', 'expert comptable', 'cabinet comptable',
    'bilan comptable', 'déclaration fiscale', 'conseil fiscal',
  ],
  store: [
    'magasin', 'boutique', 'commerce', 'achat', 'shopping',
  ],
};

function extractCity(address: string): string {
  const parts = address.split(',').map(p => p.trim());

  for (const part of parts) {
    // Match "75008 Paris" or "Paris" pattern
    const match = part.match(/(?:\d{5}\s+)?([A-ZÀ-Ÿa-zà-ÿ-]+(?:\s+[A-ZÀ-Ÿa-zà-ÿ-]+)*)$/);
    if (match) {
      const candidate = match[1].trim();
      // Skip country names and too short strings
      if (candidate.length > 2 && !['France', 'Belgique', 'Suisse', 'Canada'].includes(candidate)) {
        return candidate;
      }
    }
  }

  // Fallback: try second-to-last comma segment
  if (parts.length >= 2) {
    const segment = parts[parts.length - 2].trim();
    const cityMatch = segment.match(/(?:\d{5}\s+)?(.+)/);
    if (cityMatch) return cityMatch[1].trim();
  }

  return '';
}

function extractDistrict(address: string): string | null {
  // Match Paris arrondissement patterns like "75008" or "Paris 8e"
  const zipMatch = address.match(/75(\d{3})/);
  if (zipMatch) {
    const arr = parseInt(zipMatch[1], 10);
    if (arr >= 1 && arr <= 20) {
      return `paris ${arr}${arr === 1 ? 'er' : 'e'}`;
    }
  }

  // Match "Lyon 3e" etc.
  const distMatch = address.match(/(Lyon|Marseille|Paris)\s*(\d{1,2})/i);
  if (distMatch) {
    return `${distMatch[1].toLowerCase()} ${distMatch[2]}`;
  }

  return null;
}

function findBestTemplates(primaryType: string): string[] {
  // Direct match
  if (KEYWORD_TEMPLATES[primaryType]) {
    return KEYWORD_TEMPLATES[primaryType];
  }

  // Fuzzy match: check if type contains a known key
  const lowerType = primaryType.toLowerCase().replace(/_/g, ' ');
  for (const [key, templates] of Object.entries(KEYWORD_TEMPLATES)) {
    const normalizedKey = key.replace(/_/g, ' ');
    if (lowerType.includes(normalizedKey) || normalizedKey.includes(lowerType)) {
      return templates;
    }
  }

  // Fallback: generic templates using the type name itself
  const typeName = primaryType.replace(/_/g, ' ');
  return [
    typeName, `meilleur ${typeName}`, `${typeName} pas cher`,
    `${typeName} près de moi`, `${typeName} avis`, `trouver ${typeName}`,
  ];
}

function generateMockVolume(): number {
  // Generate realistic-looking search volumes (weighted towards lower values)
  const tiers = [
    { min: 50, max: 200, weight: 30 },
    { min: 200, max: 500, weight: 25 },
    { min: 500, max: 1000, weight: 20 },
    { min: 1000, max: 2500, weight: 15 },
    { min: 2500, max: 5000, weight: 8 },
    { min: 5000, max: 12000, weight: 2 },
  ];

  const rand = Math.random() * 100;
  let cumulative = 0;
  for (const tier of tiers) {
    cumulative += tier.weight;
    if (rand <= cumulative) {
      const raw = tier.min + Math.random() * (tier.max - tier.min);
      return Math.round(raw / 10) * 10;
    }
  }
  return 100;
}

export function generateKeywordsForBusiness(
  primaryType: string,
  address: string,
): KeywordSuggestion[] {
  const city = extractCity(address);
  const district = extractDistrict(address);
  const templates = findBestTemplates(primaryType);

  const keywordSet = new Set<string>();
  const suggestions: KeywordSuggestion[] = [];

  function addKeyword(keyword: string, boostVolume = false) {
    const normalized = keyword.toLowerCase().trim();
    if (keywordSet.has(normalized) || normalized.length < 5) return;
    keywordSet.add(normalized);

    let volume = generateMockVolume();
    if (boostVolume) volume = Math.round(volume * 1.5);

    suggestions.push({
      keyword: normalized,
      searchVolume: volume,
      selected: false,
    });
  }

  // [template] + [ville]
  for (const t of templates.slice(0, 8)) {
    if (city) addKeyword(`${t} ${city}`, true);
  }

  // [template] + [quartier/arrondissement]
  if (district) {
    for (const t of templates.slice(0, 4)) {
      addKeyword(`${t} ${district}`);
    }
  }

  // [template] + "près de moi"
  for (const t of templates.slice(0, 3)) {
    addKeyword(`${t} près de moi`);
  }

  // Sort by volume descending
  suggestions.sort((a, b) => b.searchVolume - a.searchVolume);

  // Pre-select the top 3
  for (let i = 0; i < Math.min(3, suggestions.length); i++) {
    suggestions[i].selected = true;
  }

  return suggestions.slice(0, 15);
}
