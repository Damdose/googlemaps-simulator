import { SectorBenchmark } from './types';

export const SECTOR_BENCHMARKS: SectorBenchmark[] = [
  { googleCategory: 'restaurant', displayNameFr: 'Restaurant', avgBasketEur: 25, avgRating: 4.2, avgReviewCount: 150, avgPhotoCount: 80, minReviewsPerWeek: 2.0 },
  { googleCategory: 'dentist', displayNameFr: 'Dentiste', avgBasketEur: 80, avgRating: 4.5, avgReviewCount: 60, avgPhotoCount: 30, minReviewsPerWeek: 0.5 },
  { googleCategory: 'lawyer', displayNameFr: 'Avocat', avgBasketEur: 200, avgRating: 4.3, avgReviewCount: 30, avgPhotoCount: 15, minReviewsPerWeek: 0.3 },
  { googleCategory: 'plumber', displayNameFr: 'Plombier', avgBasketEur: 150, avgRating: 4.4, avgReviewCount: 40, avgPhotoCount: 20, minReviewsPerWeek: 0.5 },
  { googleCategory: 'hair_salon', displayNameFr: 'Coiffeur', avgBasketEur: 40, avgRating: 4.3, avgReviewCount: 80, avgPhotoCount: 50, minReviewsPerWeek: 1.0 },
  { googleCategory: 'general_practitioner', displayNameFr: 'Médecin', avgBasketEur: 60, avgRating: 3.8, avgReviewCount: 20, avgPhotoCount: 10, minReviewsPerWeek: 0.3 },
  { googleCategory: 'real_estate_agency', displayNameFr: 'Agence immobilière', avgBasketEur: 5000, avgRating: 4.1, avgReviewCount: 40, avgPhotoCount: 30, minReviewsPerWeek: 0.5 },
  { googleCategory: 'gym', displayNameFr: 'Salle de sport', avgBasketEur: 45, avgRating: 4.2, avgReviewCount: 100, avgPhotoCount: 60, minReviewsPerWeek: 1.5 },
  { googleCategory: 'auto_repair', displayNameFr: 'Garage auto', avgBasketEur: 300, avgRating: 4.3, avgReviewCount: 50, avgPhotoCount: 25, minReviewsPerWeek: 0.5 },
  { googleCategory: 'bakery', displayNameFr: 'Boulangerie', avgBasketEur: 8, avgRating: 4.4, avgReviewCount: 100, avgPhotoCount: 40, minReviewsPerWeek: 1.0 },
  { googleCategory: 'cafe', displayNameFr: 'Café', avgBasketEur: 12, avgRating: 4.3, avgReviewCount: 120, avgPhotoCount: 50, minReviewsPerWeek: 1.5 },
  { googleCategory: 'hotel', displayNameFr: 'Hôtel', avgBasketEur: 120, avgRating: 4.1, avgReviewCount: 200, avgPhotoCount: 100, minReviewsPerWeek: 3.0 },
  { googleCategory: 'pharmacy', displayNameFr: 'Pharmacie', avgBasketEur: 30, avgRating: 4.2, avgReviewCount: 30, avgPhotoCount: 10, minReviewsPerWeek: 0.3 },
  { googleCategory: 'veterinarian', displayNameFr: 'Vétérinaire', avgBasketEur: 70, avgRating: 4.4, avgReviewCount: 50, avgPhotoCount: 20, minReviewsPerWeek: 0.5 },
  { googleCategory: 'electrician', displayNameFr: 'Électricien', avgBasketEur: 120, avgRating: 4.3, avgReviewCount: 30, avgPhotoCount: 15, minReviewsPerWeek: 0.3 },
];

const DEFAULT_BENCHMARK: SectorBenchmark = {
  googleCategory: 'default',
  displayNameFr: 'Entreprise',
  avgBasketEur: 50,
  avgRating: 4.2,
  avgReviewCount: 50,
  avgPhotoCount: 30,
  minReviewsPerWeek: 0.5,
};

export function getBenchmark(googleCategory: string): SectorBenchmark {
  return SECTOR_BENCHMARKS.find(b => b.googleCategory === googleCategory) ?? DEFAULT_BENCHMARK;
}
