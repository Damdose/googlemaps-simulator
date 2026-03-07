const API_KEY = process.env.GOOGLE_PLACES_API_KEY!;
const BASE_URL = 'https://places.googleapis.com/v1';

export interface AutocompleteResult {
  placeId: string;
  mainText: string;
  secondaryText: string;
  types: string[];
}

export interface PlaceDetailsResult {
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
  reviews: {
    author: string;
    rating: number;
    text: string;
    date: string;
    relativeDate: string;
    ownerResponse: string | null;
  }[];
  editorialSummary: string;
  googleMapsUri: string;
}

interface PlacePrediction {
  placeId: string;
  structuredFormat?: { mainText?: { text?: string }; secondaryText?: { text?: string } };
  text?: { text?: string };
  types?: string[];
}

interface PlaceSuggestion {
  placePrediction?: PlacePrediction;
}

interface PlaceResource {
  id?: string;
  displayName?: { text?: string };
  formattedAddress?: string;
  location?: { latitude?: number; longitude?: number };
  rating?: number;
  userRatingCount?: number;
  primaryType?: string;
  primaryTypeDisplayName?: { text?: string };
  websiteUri?: string;
  nationalPhoneNumber?: string;
  regularOpeningHours?: { weekdayDescriptions?: string[] };
  photos?: unknown[];
  reviews?: {
    authorAttribution?: { displayName?: string };
    rating?: number;
    text?: { text?: string };
    publishTime?: string;
    relativePublishTimeDescription?: string;
  }[];
  editorialSummary?: { text?: string };
  googleMapsUri?: string;
}

export async function autocomplete(input: string, sessionToken?: string): Promise<AutocompleteResult[]> {
  const body: Record<string, unknown> = {
    input,
    languageCode: 'fr',
    includedRegionCodes: ['fr'],
    includedPrimaryTypes: ['establishment'],
  };
  if (sessionToken) {
    body.sessionToken = sessionToken;
  }

  const res = await fetch(`${BASE_URL}/places:autocomplete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': API_KEY,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Places Autocomplete error: ${res.status} — ${err}`);
  }

  const data: { suggestions?: PlaceSuggestion[] } = await res.json();

  if (!data.suggestions) return [];

  return data.suggestions
    .filter((s): s is PlaceSuggestion & { placePrediction: PlacePrediction } => !!s.placePrediction)
    .map(s => {
      const p = s.placePrediction;
      return {
        placeId: p.placeId,
        mainText: p.structuredFormat?.mainText?.text ?? p.text?.text ?? '',
        secondaryText: p.structuredFormat?.secondaryText?.text ?? '',
        types: p.types ?? [],
      };
    });
}

export interface NearbyPlace {
  placeId: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  rating: number;
  reviewCount: number;
  photoCount: number;
  googleMapsUri: string;
}

export async function searchNearby(
  lat: number,
  lng: number,
  radiusMeters: number,
  includedType: string,
  maxResults: number = 10,
): Promise<NearbyPlace[]> {
  const body = {
    includedPrimaryTypes: [includedType],
    locationRestriction: {
      circle: {
        center: { latitude: lat, longitude: lng },
        radius: radiusMeters,
      },
    },
    maxResultCount: maxResults,
    languageCode: 'fr',
  };

  const fieldMask = [
    'places.id',
    'places.displayName',
    'places.formattedAddress',
    'places.location',
    'places.rating',
    'places.userRatingCount',
    'places.photos',
    'places.googleMapsUri',
  ].join(',');

  const res = await fetch(`${BASE_URL}/places:searchNearby`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': API_KEY,
      'X-Goog-FieldMask': fieldMask,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Nearby Search error: ${res.status} — ${err}`);
  }

  const data: { places?: PlaceResource[] } = await res.json();

  return (data.places ?? []).map(p => ({
    placeId: p.id ?? '',
    name: p.displayName?.text ?? '',
    address: p.formattedAddress ?? '',
    lat: p.location?.latitude ?? 0,
    lng: p.location?.longitude ?? 0,
    rating: p.rating ?? 0,
    reviewCount: p.userRatingCount ?? 0,
    photoCount: Array.isArray(p.photos) ? p.photos.length : 0,
    googleMapsUri: p.googleMapsUri ?? '',
  }));
}

export async function getPlaceDetails(placeId: string): Promise<PlaceDetailsResult> {
  const fieldMask = [
    'id',
    'displayName',
    'formattedAddress',
    'location',
    'rating',
    'userRatingCount',
    'primaryType',
    'primaryTypeDisplayName',
    'websiteUri',
    'nationalPhoneNumber',
    'regularOpeningHours',
    'photos',
    'reviews',
    'editorialSummary',
    'googleMapsUri',
  ].join(',');

  const res = await fetch(`${BASE_URL}/places/${placeId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': API_KEY,
      'X-Goog-FieldMask': fieldMask,
    },
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Places Details error: ${res.status} — ${err}`);
  }

  const p: PlaceResource = await res.json();

  const reviewsWithResponses = (p.reviews ?? []).map(r => ({
    author: r.authorAttribution?.displayName ?? 'Anonyme',
    rating: r.rating ?? 0,
    text: r.text?.text ?? '',
    date: r.publishTime ?? '',
    relativeDate: r.relativePublishTimeDescription ?? '',
    ownerResponse: null as string | null,
  }));

  const openingHours = p.regularOpeningHours?.weekdayDescriptions ?? [];

  return {
    placeId: p.id ?? placeId,
    name: p.displayName?.text ?? '',
    address: p.formattedAddress ?? '',
    lat: p.location?.latitude ?? 0,
    lng: p.location?.longitude ?? 0,
    rating: p.rating ?? 0,
    userRatingCount: p.userRatingCount ?? 0,
    primaryType: p.primaryType ?? '',
    primaryTypeDisplayName: p.primaryTypeDisplayName?.text ?? '',
    websiteUri: p.websiteUri ?? '',
    phoneNumber: p.nationalPhoneNumber ?? '',
    openingHours,
    photoCount: p.photos?.length ?? 0,
    reviews: reviewsWithResponses,
    editorialSummary: p.editorialSummary?.text ?? '',
    googleMapsUri: p.googleMapsUri ?? '',
  };
}
