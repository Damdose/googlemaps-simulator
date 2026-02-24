export interface PlaceResult {
  placeId: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  primaryType: string;
  primaryTypeDisplayName: string;
}

export interface PlaceDetails {
  placeId: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  rating: number;
  userRatingCount: number;
  primaryType: string;
  primaryTypeDisplayName: string;
  websiteUri: string;
  phoneNumber: string;
  openingHours: string[];
  photoCount: number;
  reviews: Review[];
  editorialSummary: string;
  googleMapsUri: string;
}

export interface Review {
  author: string;
  rating: number;
  text: string;
  date: string;
  relativeDate: string;
  ownerResponse: string | null;
}

export interface KeywordSuggestion {
  keyword: string;
  searchVolume: number;
  cpc?: number;
  competition?: string;
  selected: boolean;
}

export interface AuditConfig {
  placeId: string;
  businessName: string;
  businessAddress: string;
  businessCategory: string;
  businessLat: number;
  businessLng: number;
  keywords: KeywordSuggestion[];
  zoneCenterLat: number;
  zoneCenterLng: number;
  zoneRadiusKm: number;
}

export type CriteriaStatus = 'pass' | 'partial' | 'fail' | 'unknown';

export interface CriteriaResult {
  key: string;
  label: string;
  status: CriteriaStatus;
  weight: number;
  detail: string;
}

export interface Competitor {
  placeId: string;
  name: string;
  address: string;
  rating: number;
  reviewCount: number;
  photoCount: number;
  lat: number;
  lng: number;
  googleMapsUri: string;
}

export interface HeatmapCell {
  lat: number;
  lng: number;
  row: number;
  col: number;
  position: number | null; // null = not ranked
  keyword: string;
}

export interface AIVisibilityResult {
  llm: string;
  icon: string;
  found: boolean | null; // null = not tested
  loading: boolean;
}

export interface OptimizationSuggestion {
  criteriaKey: string;
  criteriaLabel: string;
  currentState: string;
  recommendation: string;
  improvedContent?: string;
}

export interface AuditReport {
  id: string;
  placeDetails: PlaceDetails;
  config: AuditConfig;
  overallScore: number;
  criteriaResults: CriteriaResult[];
  revenueEstimate: number;
  revenueExplanation: string;
  competitors: Competitor[];
  heatmapData: HeatmapCell[];
  aiVisibility: AIVisibilityResult[];
  aiSummary: string;
  suggestions: OptimizationSuggestion[];
  createdAt: string;
  email?: string;
}

export interface SectorBenchmark {
  googleCategory: string;
  displayNameFr: string;
  avgBasketEur: number;
  avgRating: number;
  avgReviewCount: number;
  avgPhotoCount: number;
  minReviewsPerWeek: number;
}
