const AUTH = Buffer.from(
  `${process.env.DATAFORSEO_LOGIN}:${process.env.DATAFORSEO_PASSWORD}`,
).toString('base64');

const BASE_URL = 'https://api.dataforseo.com/v3';

async function dfsFetch(endpoint: string, body: unknown): Promise<unknown> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${AUTH}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`DataForSEO error ${res.status}: ${text}`);
  }

  return res.json();
}

// ─── KEYWORD VOLUMES ───────────────────────────────────────────────

export interface KeywordVolume {
  keyword: string;
  searchVolume: number;
  cpc: number;
  competition: number;
}

export async function getKeywordVolumes(
  keywords: string[],
  locationName: string = 'France',
  languageCode: string = 'fr',
): Promise<KeywordVolume[]> {
  const data = await dfsFetch('/keywords_data/google_ads/search_volume/live', [
    {
      keywords,
      location_name: locationName,
      language_code: languageCode,
    },
  ]) as { tasks?: { result?: { keyword: string; search_volume: number; cpc: number; competition: number }[] }[] };

  const results = data?.tasks?.[0]?.result ?? [];
  return results.map(r => ({
    keyword: r.keyword,
    searchVolume: r.search_volume ?? 0,
    cpc: r.cpc ?? 0,
    competition: r.competition ?? 0,
  }));
}

// ─── RELATED KEYWORDS ──────────────────────────────────────────────

export async function getRelatedKeywords(
  seedKeyword: string,
  locationCode: number = 2250, // France
  languageCode: string = 'fr',
): Promise<KeywordVolume[]> {
  const data = await dfsFetch('/dataforseo_labs/google/related_keywords/live', [
    {
      keyword: seedKeyword,
      location_code: locationCode,
      language_code: languageCode,
      limit: 20,
    },
  ]) as { tasks?: { result?: { items?: { keyword_data?: { keyword: string; keyword_info?: { search_volume: number; cpc: number; competition: number } } }[] }[] }[] };

  const items = data?.tasks?.[0]?.result?.[0]?.items ?? [];
  return items
    .map(item => ({
      keyword: item.keyword_data?.keyword ?? '',
      searchVolume: item.keyword_data?.keyword_info?.search_volume ?? 0,
      cpc: item.keyword_data?.keyword_info?.cpc ?? 0,
      competition: item.keyword_data?.keyword_info?.competition ?? 0,
    }))
    .filter(k => k.searchVolume > 0)
    .sort((a, b) => b.searchVolume - a.searchVolume);
}

// ─── GOOGLE MAPS SERP (HEATMAP) ───────────────────────────────────

export interface MapsSerpResult {
  position: number | null;
  keyword: string;
  lat: number;
  lng: number;
}

export async function getMapsSerpPosition(
  keyword: string,
  lat: number,
  lng: number,
  targetPlaceId: string,
  targetName: string,
  radiusMeters: number = 5000,
): Promise<number | null> {
  const locationCoordinate = `${lat},${lng},${radiusMeters}`;

  const data = await dfsFetch('/serp/google/maps/live/advanced', [
    {
      keyword,
      location_coordinate: locationCoordinate,
      language_code: 'fr',
      device: 'desktop',
      os: 'windows',
      depth: 20,
    },
  ]) as { tasks?: { result?: { items?: { type: string; place_id?: string; title?: string; rank_absolute?: number }[] }[] }[] };

  const items = data?.tasks?.[0]?.result?.[0]?.items ?? [];
  const mapsResults = items.filter(i => i.type === 'maps_search');

  // Try matching by place_id first
  const byPlaceId = mapsResults.find(r => r.place_id === targetPlaceId);
  if (byPlaceId) return byPlaceId.rank_absolute ?? null;

  // Fallback: match by name (fuzzy)
  const normalizedTarget = targetName.toLowerCase().trim();
  const byName = mapsResults.find(r =>
    r.title?.toLowerCase().includes(normalizedTarget) ||
    normalizedTarget.includes(r.title?.toLowerCase() ?? '___'),
  );
  if (byName) return byName.rank_absolute ?? null;

  return null; // Not found in top 20
}

export async function getHeatmapData(
  keyword: string,
  gridPoints: { lat: number; lng: number; row: number; col: number }[],
  targetPlaceId: string,
  targetName: string,
  radiusMeters: number = 5000,
): Promise<{ lat: number; lng: number; row: number; col: number; position: number | null; keyword: string }[]> {
  // Batch all requests in parallel (DataForSEO allows 2000/min)
  const results = await Promise.all(
    gridPoints.map(async point => {
      try {
        const position = await getMapsSerpPosition(
          keyword,
          point.lat,
          point.lng,
          targetPlaceId,
          targetName,
          radiusMeters,
        );
        return { ...point, position, keyword };
      } catch (err) {
        console.error(`Heatmap point failed (${point.row},${point.col}):`, err);
        return { ...point, position: null, keyword };
      }
    }),
  );

  return results;
}
