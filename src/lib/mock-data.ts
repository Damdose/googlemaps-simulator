import {
  PlaceResult,
  PlaceDetails,
  KeywordSuggestion,
  AuditReport,
  Competitor,
  AIVisibilityResult,
  OptimizationSuggestion,
} from './types';
import { evaluateAllCriteria, calculateOverallScore } from './scoring';
import { generateMockHeatmapData } from './heatmap-grid';
import { getBenchmark } from './sector-benchmarks';

export const MOCK_SEARCH_SUGGESTIONS: PlaceResult[] = [
  { placeId: 'ChIJ_1', name: 'Cabinet Médical Dr. Martin', address: '15 Rue de Rivoli, 75001 Paris', lat: 48.8606, lng: 2.3476, primaryType: 'general_practitioner', primaryTypeDisplayName: 'Médecin généraliste' },
  { placeId: 'ChIJ_2', name: 'Cabinet Médical Saint-Lazare', address: '42 Rue d\'Amsterdam, 75009 Paris', lat: 48.8789, lng: 2.3276, primaryType: 'general_practitioner', primaryTypeDisplayName: 'Médecin généraliste' },
  { placeId: 'ChIJ_3', name: 'Restaurant La Belle Époque', address: '12 Rue de Rivoli, 75001 Paris', lat: 48.8566, lng: 2.3522, primaryType: 'restaurant', primaryTypeDisplayName: 'Restaurant' },
  { placeId: 'ChIJ_4', name: 'Coiffure Élégance', address: '8 Rue du Faubourg, 75010 Paris', lat: 48.8720, lng: 2.3560, primaryType: 'hair_salon', primaryTypeDisplayName: 'Salon de coiffure' },
  { placeId: 'ChIJ_5', name: 'Boulangerie Au Pain Doré', address: '23 Avenue des Ternes, 75017 Paris', lat: 48.8780, lng: 2.2980, primaryType: 'bakery', primaryTypeDisplayName: 'Boulangerie' },
];

export const MOCK_PLACE_DETAILS: PlaceDetails = {
  placeId: 'ChIJ_1',
  name: 'Cabinet Médical Dr. Martin',
  address: '15 Rue de Rivoli, 75001 Paris',
  lat: 48.8606,
  lng: 2.3476,
  rating: 3.9,
  userRatingCount: 34,
  primaryType: 'general_practitioner',
  primaryTypeDisplayName: 'Médecin généraliste',
  websiteUri: 'https://dr-martin-paris.fr',
  phoneNumber: '01 42 60 15 30',
  openingHours: [
    'Lundi: 09:00 – 12:30, 14:00 – 19:00',
    'Mardi: 09:00 – 12:30, 14:00 – 19:00',
    'Mercredi: 09:00 – 12:30',
    'Jeudi: 09:00 – 12:30, 14:00 – 19:00',
    'Vendredi: 09:00 – 12:30, 14:00 – 18:00',
    'Samedi: Fermé',
    'Dimanche: Fermé',
  ],
  photoCount: 8,
  reviews: [
    { author: 'Marie L.', rating: 5, text: 'Médecin très compétent et à l\'écoute. Le cabinet est propre et bien organisé.', date: '2026-02-10', relativeDate: 'il y a 2 semaines', ownerResponse: 'Merci Marie pour ce retour encourageant !' },
    { author: 'Pierre D.', rating: 4, text: 'Bon médecin, temps d\'attente un peu long mais consultation de qualité.', date: '2026-01-25', relativeDate: 'il y a 1 mois', ownerResponse: null },
    { author: 'Sophie M.', rating: 2, text: 'Difficile d\'avoir un rendez-vous. Le secrétariat ne répond pas toujours.', date: '2026-01-15', relativeDate: 'il y a 1 mois', ownerResponse: 'Nous avons pris note, Sophie. Nous améliorons notre accueil.' },
    { author: 'Jean B.', rating: 5, text: 'Mon médecin traitant depuis 5 ans. Toujours satisfait.', date: '2025-12-20', relativeDate: 'il y a 2 mois', ownerResponse: null },
    { author: 'Lucie T.', rating: 3, text: 'Cabinet correct, mais un peu vieillot. Le médecin est compétent.', date: '2025-12-05', relativeDate: 'il y a 3 mois', ownerResponse: null },
  ],
  editorialSummary: 'Cabinet médical généraliste.',
  googleMapsUri: 'https://maps.google.com/?cid=12345',
};

export const MOCK_KEYWORDS: KeywordSuggestion[] = [
  { keyword: 'médecin généraliste paris', searchVolume: 2400, selected: true },
  { keyword: 'cabinet médical paris', searchVolume: 1900, selected: false },
  { keyword: 'médecin paris 1er', searchVolume: 880, selected: true },
  { keyword: 'consultation médicale paris', searchVolume: 720, selected: false },
  { keyword: 'docteur généraliste paris', searchVolume: 590, selected: false },
  { keyword: 'médecin traitant paris', searchVolume: 480, selected: true },
  { keyword: 'médecin sans rdv paris', searchVolume: 390, selected: false },
  { keyword: 'généraliste paris centre', searchVolume: 260, selected: false },
  { keyword: 'médecin de famille paris', searchVolume: 210, selected: false },
  { keyword: 'consultation sans rendez-vous paris', searchVolume: 170, selected: false },
  { keyword: 'cabinet médecin paris 1', searchVolume: 140, selected: false },
  { keyword: 'visite médicale paris', searchVolume: 110, selected: false },
];

export const MOCK_COMPETITORS: Competitor[] = [
  { placeId: 'comp_1', name: 'Dr. Dupont - Médecin Généraliste', address: '30 Rue de Turbigo, 75003 Paris', rating: 4.7, reviewCount: 128, photoCount: 22, lat: 48.8645, lng: 2.3530, googleMapsUri: 'https://maps.google.com/?cid=1001' },
  { placeId: 'comp_2', name: 'Centre Médical Châtelet', address: '5 Place du Châtelet, 75001 Paris', rating: 4.5, reviewCount: 96, photoCount: 35, lat: 48.8580, lng: 2.3470, googleMapsUri: 'https://maps.google.com/?cid=1002' },
  { placeId: 'comp_3', name: 'Cabinet Dr. Bernard', address: '18 Rue des Halles, 75001 Paris', rating: 4.3, reviewCount: 54, photoCount: 12, lat: 48.8600, lng: 2.3450, googleMapsUri: 'https://maps.google.com/?cid=1003' },
];

export const MOCK_AI_VISIBILITY: AIVisibilityResult[] = [
  { llm: 'ChatGPT', icon: '/icons/chatgpt.svg', found: false, loading: false },
  { llm: 'Claude', icon: '/icons/claude.svg', found: false, loading: false },
  { llm: 'Gemini', icon: '/icons/gemini.svg', found: true, loading: false },
  { llm: 'Perplexity', icon: '/icons/perplexity.svg', found: false, loading: false },
  { llm: 'Grok', icon: '/icons/grok.svg', found: null, loading: false },
  { llm: 'Llama', icon: '/icons/llama.svg', found: false, loading: false },
];

export const MOCK_SUGGESTIONS: OptimizationSuggestion[] = [
  {
    criteriaKey: 'businessDescription',
    criteriaLabel: 'Description du profil',
    currentState: 'Votre description actuelle fait seulement 30 caractères : "Cabinet médical généraliste."',
    recommendation: 'Rédigez une description de 250+ caractères incluant vos spécialités, votre approche médicale, les services proposés et votre localisation. Utilisez des mots-clés naturels comme "médecin généraliste", "consultation", "Paris 1er".',
    improvedContent: 'Le Cabinet Médical Dr. Martin, situé au cœur du 1er arrondissement de Paris, propose des consultations de médecine générale personnalisées. Spécialisé dans le suivi médical de toute la famille, le Dr. Martin offre une prise en charge complète : bilans de santé, suivi de maladies chroniques, vaccination et médecine préventive. Accessible en métro (stations Châtelet et Rivoli), le cabinet vous accueille sur rendez-vous du lundi au vendredi dans un cadre moderne et chaleureux.',
  },
  {
    criteriaKey: 'numberOfImages',
    criteriaLabel: 'Nombre de photos',
    currentState: 'Vous n\'avez que 8 photos sur votre fiche. Le benchmark pour un cabinet médical est de 10 photos minimum, et les meilleurs en ont 20+.',
    recommendation: 'Ajoutez des photos de la salle d\'attente, du cabinet de consultation, de l\'accueil, de l\'équipe médicale et de la façade de l\'immeuble. Des photos récentes et de qualité renforcent la confiance des patients potentiels.',
  },
  {
    criteriaKey: 'reviewReplies',
    criteriaLabel: 'Réponses aux avis',
    currentState: 'Vous ne répondez qu\'à 40% de vos avis. Deux avis récents (dont un négatif à 2 étoiles) n\'ont pas reçu de réponse.',
    recommendation: 'Répondez à 100% de vos avis dans les 24h. Pour les avis positifs, remerciez personnellement. Pour les avis négatifs, montrez de l\'empathie, reconnaissez le problème et proposez une solution. Ne soyez jamais défensif.',
  },
  {
    criteriaKey: 'googleRating',
    criteriaLabel: 'Note Google',
    currentState: 'Votre note de 3.9/5 est en dessous du seuil critique de 4.0. Avec seulement 34 avis, chaque nouvel avis a un fort impact.',
    recommendation: 'Mettez en place un processus de collecte d\'avis : après chaque consultation satisfaisante, proposez au patient de laisser un avis Google via un QR code ou un SMS de suivi. Visez 4.5+ avec 60+ avis pour dominer votre zone.',
  },
];

export const MOCK_AI_SUMMARY = `Le Cabinet Médical Dr. Martin présente des lacunes significatives qui limitent sa visibilité sur Google Maps. Avec une note de 3.9/5 et seulement 34 avis, vous êtes nettement en dessous de vos concurrents directs (Dr. Dupont : 4.7/5 avec 128 avis). Votre description de fiche est quasi inexistante et vos 8 photos sont insuffisantes pour un cabinet médical. Ces manquements vous coûtent potentiellement 15 à 20 patients par mois qui choisissent vos concurrents. La bonne nouvelle : 80% de ces problèmes sont corrigeables en moins d'une semaine.`;

export function generateMockAuditReport(placeId: string): AuditReport {
  const details = { ...MOCK_PLACE_DETAILS, placeId };
  const criteriaResults = evaluateAllCriteria(details);
  const overallScore = calculateOverallScore(criteriaResults);
  const selectedKeywords = MOCK_KEYWORDS.filter(k => k.selected);
  const benchmark = getBenchmark(details.primaryType);

  const totalSearchVolume = selectedKeywords.reduce((sum, k) => sum + k.searchVolume, 0);
  const revenueEstimate = Math.round(totalSearchVolume * 0.20 * benchmark.avgBasketEur);

  const allHeatmapData = selectedKeywords.flatMap(kw =>
    generateMockHeatmapData(details.lat, details.lng, 5, kw.keyword),
  );

  return {
    id: `audit_${Date.now()}`,
    placeDetails: details,
    config: {
      placeId,
      businessName: details.name,
      businessAddress: details.address,
      businessCategory: details.primaryType,
      businessLat: details.lat,
      businessLng: details.lng,
      keywords: MOCK_KEYWORDS,
      zoneCenterLat: details.lat,
      zoneCenterLng: details.lng,
      zoneRadiusKm: 5,
    },
    overallScore,
    criteriaResults,
    revenueEstimate,
    revenueExplanation: `Estimation basée sur ${totalSearchVolume.toLocaleString('fr-FR')} recherches mensuelles × 20% de taux de clic manqué × ${benchmark.avgBasketEur}€ de panier moyen (${benchmark.displayNameFr}).`,
    competitors: MOCK_COMPETITORS,
    heatmapData: allHeatmapData,
    aiVisibility: MOCK_AI_VISIBILITY,
    aiSummary: MOCK_AI_SUMMARY,
    suggestions: MOCK_SUGGESTIONS,
    createdAt: new Date().toISOString(),
  };
}
