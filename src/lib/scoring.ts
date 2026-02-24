import { CriteriaResult, CriteriaStatus, PlaceDetails, Review } from './types';
import { getBenchmark } from './sector-benchmarks';

const CRITERIA_WEIGHTS: Record<string, { label: string; weight: number }> = {
  businessDescription: { label: 'Description du profil', weight: 15 },
  reviewFrequency: { label: "Fréquence d'avis", weight: 15 },
  googleRating: { label: 'Note Google', weight: 15 },
  reviewReplies: { label: 'Réponses aux avis', weight: 10 },
  numberOfImages: { label: 'Nombre de photos', weight: 10 },
  postFrequency: { label: 'Fréquence des posts', weight: 10 },
  postKeywords: { label: 'Mots-clés dans les posts', weight: 5 },
  servicesList: { label: 'Liste des services', weight: 10 },
  serviceDescriptions: { label: 'Descriptions des services', weight: 5 },
  serviceArea: { label: 'Zone de service', weight: 5 },
};

function getCategoryKeywords(category: string): string[] {
  const keywordMap: Record<string, string[]> = {
    restaurant: ['restaurant', 'cuisine', 'menu', 'plat', 'repas', 'gastronomie', 'chef'],
    dentist: ['dentiste', 'dentaire', 'soins', 'implant', 'orthodontie', 'blanchiment'],
    lawyer: ['avocat', 'juridique', 'droit', 'conseil', 'litige', 'défense'],
    plumber: ['plombier', 'plomberie', 'dépannage', 'fuite', 'canalisation', 'chauffe-eau'],
    hair_salon: ['coiffeur', 'coiffure', 'coupe', 'coloration', 'mèches', 'brushing'],
    general_practitioner: ['médecin', 'consultation', 'généraliste', 'santé', 'médical'],
    real_estate_agency: ['immobilier', 'agence', 'vente', 'location', 'appartement', 'maison'],
    gym: ['sport', 'salle', 'fitness', 'musculation', 'entraînement', 'coaching'],
    auto_repair: ['garage', 'auto', 'réparation', 'mécanique', 'entretien', 'vidange'],
    bakery: ['boulangerie', 'pain', 'pâtisserie', 'viennoiserie', 'artisan'],
  };
  return keywordMap[category] ?? ['professionnel', 'service', 'qualité'];
}

export function evaluateDescription(description: string | undefined, category: string): { status: CriteriaStatus; detail: string } {
  if (!description || description.length === 0) {
    return { status: 'fail', detail: 'Aucune description trouvée sur votre fiche.' };
  }
  if (description.length < 150) {
    return { status: 'partial', detail: `Description trop courte (${description.length} caractères). Minimum recommandé : 250 caractères.` };
  }
  const keywords = getCategoryKeywords(category);
  const hasKeywords = keywords.some(kw => description.toLowerCase().includes(kw));
  if (hasKeywords && description.length >= 250) {
    return { status: 'pass', detail: `Description complète (${description.length} car.) et contient des mots-clés pertinents.` };
  }
  return { status: 'partial', detail: `Description présente mais ${!hasKeywords ? 'manque de mots-clés sectoriels' : 'trop courte'}.` };
}

export function evaluateReviewFrequency(reviews: Review[], category: string): { status: CriteriaStatus; detail: string } {
  const benchmark = getBenchmark(category);
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
  const recentReviews = reviews.filter(r => new Date(r.date) > threeMonthsAgo);
  const weeklyRate = recentReviews.length / 13;
  if (weeklyRate >= benchmark.minReviewsPerWeek) {
    return { status: 'pass', detail: `${recentReviews.length} avis sur 3 mois (${weeklyRate.toFixed(1)}/semaine). Supérieur au benchmark.` };
  }
  return { status: 'fail', detail: `Seulement ${recentReviews.length} avis sur 3 mois. Objectif : ${Math.ceil(benchmark.minReviewsPerWeek * 13)} avis/trimestre.` };
}

export function evaluateRating(rating: number, reviewCount: number, category: string): { status: CriteriaStatus; detail: string } {
  const benchmark = getBenchmark(category);
  if (rating >= 4.5 && reviewCount >= benchmark.avgReviewCount) {
    return { status: 'pass', detail: `Note de ${rating}/5 avec ${reviewCount} avis. Excellente performance.` };
  }
  if (rating >= 4.0) {
    return { status: 'partial', detail: `Note de ${rating}/5 correcte mais ${reviewCount < benchmark.avgReviewCount ? `seulement ${reviewCount} avis (benchmark: ${benchmark.avgReviewCount})` : 'en dessous de 4.5'}.` };
  }
  return { status: 'fail', detail: `Note de ${rating}/5 en dessous du seuil de 4.0. ${reviewCount} avis au total.` };
}

export function evaluateReviewReplies(reviews: Review[]): { status: CriteriaStatus; detail: string } {
  if (reviews.length === 0) {
    return { status: 'unknown', detail: 'Pas assez de données pour évaluer les réponses aux avis.' };
  }
  const repliedCount = reviews.filter(r => r.ownerResponse !== null).length;
  const replyRate = repliedCount / reviews.length;
  if (replyRate >= 0.5) {
    return { status: 'pass', detail: `${Math.round(replyRate * 100)}% des avis ont une réponse du propriétaire.` };
  }
  return { status: 'fail', detail: `Seulement ${Math.round(replyRate * 100)}% de réponses aux avis. Objectif : > 50%.` };
}

export function evaluatePhotos(photoCount: number, category: string): { status: CriteriaStatus; detail: string } {
  const benchmark = getBenchmark(category);
  if (photoCount >= benchmark.avgPhotoCount * 2) {
    return { status: 'pass', detail: `${photoCount} photos — excellent, bien au-dessus du benchmark (${benchmark.avgPhotoCount}).` };
  }
  if (photoCount >= benchmark.avgPhotoCount) {
    return { status: 'partial', detail: `${photoCount} photos — dans la moyenne. Les leaders en ont ${benchmark.avgPhotoCount * 2}+.` };
  }
  return { status: 'fail', detail: `Seulement ${photoCount} photos. Minimum recommandé : ${benchmark.avgPhotoCount}.` };
}

export function evaluateAllCriteria(details: PlaceDetails): CriteriaResult[] {
  const category = details.primaryType;

  const descResult = evaluateDescription(details.editorialSummary, category);
  const reviewFreqResult = evaluateReviewFrequency(details.reviews, category);
  const ratingResult = evaluateRating(details.rating, details.userRatingCount, category);
  const repliesResult = evaluateReviewReplies(details.reviews);
  const photosResult = evaluatePhotos(details.photoCount, category);

  return [
    { key: 'businessDescription', ...CRITERIA_WEIGHTS.businessDescription, ...descResult },
    { key: 'reviewFrequency', ...CRITERIA_WEIGHTS.reviewFrequency, ...reviewFreqResult },
    { key: 'googleRating', ...CRITERIA_WEIGHTS.googleRating, ...ratingResult },
    { key: 'reviewReplies', ...CRITERIA_WEIGHTS.reviewReplies, ...repliesResult },
    { key: 'numberOfImages', ...CRITERIA_WEIGHTS.numberOfImages, ...photosResult },
    { key: 'postFrequency', ...CRITERIA_WEIGHTS.postFrequency, status: 'unknown' as CriteriaStatus, detail: 'Non vérifiable via l\'API — nécessite un accès direct à la fiche.' },
    { key: 'postKeywords', ...CRITERIA_WEIGHTS.postKeywords, status: 'unknown' as CriteriaStatus, detail: 'Non vérifiable via l\'API — nécessite un accès direct à la fiche.' },
    { key: 'servicesList', ...CRITERIA_WEIGHTS.servicesList, status: 'unknown' as CriteriaStatus, detail: 'Non vérifiable via l\'API — nécessite un accès direct à la fiche.' },
    { key: 'serviceDescriptions', ...CRITERIA_WEIGHTS.serviceDescriptions, status: 'unknown' as CriteriaStatus, detail: 'Non vérifiable via l\'API — nécessite un accès direct à la fiche.' },
    { key: 'serviceArea', ...CRITERIA_WEIGHTS.serviceArea, status: 'unknown' as CriteriaStatus, detail: 'Non vérifiable via l\'API — nécessite un accès direct à la fiche.' },
  ];
}

export function calculateOverallScore(criteria: CriteriaResult[]): number {
  let score = 0;
  for (const c of criteria) {
    if (c.status === 'pass') score += c.weight;
    else if (c.status === 'partial') score += c.weight * 0.5;
  }
  return Math.round(score);
}
