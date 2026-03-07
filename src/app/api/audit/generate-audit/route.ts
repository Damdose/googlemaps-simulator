import { NextRequest, NextResponse } from 'next/server';
import { getPlaceDetails, searchNearby } from '@/lib/google-places';
import { evaluateAllCriteria, calculateOverallScore } from '@/lib/scoring';
import { generateAISummary, generateSuggestions } from '@/lib/report-generator';
import {
  generateAISummaryWithClaude,
  generateSuggestionsWithClaude,
  runAllAIVisibilityChecks,
} from '@/lib/ai-clients';
import { getBenchmark } from '@/lib/sector-benchmarks';
import { generateGrid, generateMockHeatmapData } from '@/lib/heatmap-grid';
import { getHeatmapData } from '@/lib/dataforseo';
import { PlaceDetails, AuditReport, Competitor, HeatmapCell } from '@/lib/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      placeId,
      keywords,
      radiusKm = 5,
    }: {
      placeId: string;
      keywords: { keyword: string; searchVolume: number }[];
      radiusKm: number;
    } = body;

    if (!placeId) {
      return NextResponse.json({ error: 'place_id requis' }, { status: 400 });
    }

    // 1. Fetch real Place Details
    const rawDetails = await getPlaceDetails(placeId);

    const placeDetails: PlaceDetails = {
      placeId: rawDetails.placeId,
      name: rawDetails.name,
      address: rawDetails.address,
      lat: rawDetails.lat,
      lng: rawDetails.lng,
      rating: rawDetails.rating,
      userRatingCount: rawDetails.userRatingCount,
      primaryType: rawDetails.primaryType,
      primaryTypeDisplayName: rawDetails.primaryTypeDisplayName,
      websiteUri: rawDetails.websiteUri,
      phoneNumber: rawDetails.phoneNumber,
      openingHours: rawDetails.openingHours,
      photoCount: rawDetails.photoCount,
      reviews: rawDetails.reviews.map(r => ({
        ...r,
        ownerResponse: r.ownerResponse ?? null,
      })),
      editorialSummary: rawDetails.editorialSummary,
      googleMapsUri: rawDetails.googleMapsUri,
    };

    // 2. Score the business using real data
    const criteriaResults = evaluateAllCriteria(placeDetails);
    const overallScore = calculateOverallScore(criteriaResults);

    // 3. Fetch real competitors via Nearby Search
    let competitors: Competitor[] = [];
    try {
      const nearbyType = rawDetails.primaryType || 'establishment';
      const nearbyResults = await searchNearby(
        rawDetails.lat,
        rawDetails.lng,
        radiusKm * 1000,
        nearbyType,
        10,
      );

      competitors = nearbyResults
        .filter(p => p.placeId !== placeId)
        .sort((a, b) => (b.rating * b.reviewCount) - (a.rating * a.reviewCount))
        .slice(0, 3)
        .map(p => ({
          placeId: p.placeId,
          name: p.name,
          address: p.address,
          rating: p.rating,
          reviewCount: p.reviewCount,
          photoCount: p.photoCount,
          lat: p.lat,
          lng: p.lng,
          googleMapsUri: p.googleMapsUri,
        }));
    } catch (err) {
      console.error('Nearby search failed:', err);
    }

    // 4. Calculate revenue estimate
    const benchmark = getBenchmark(rawDetails.primaryType);
    const totalSearchVolume = keywords.reduce((sum, k) => sum + k.searchVolume, 0);
    const revenueEstimate = Math.round(totalSearchVolume * 0.20 * benchmark.avgBasketEur);
    const revenueExplanation = `Estimation basée sur ${totalSearchVolume.toLocaleString('fr-FR')} recherches mensuelles × 20% de taux de clic manqué × ${benchmark.avgBasketEur}€ de panier moyen (${benchmark.displayNameFr}).`;

    // 5. Generate AI summary + suggestions + visibility in parallel
    const competitorSummary = competitors.map(c => ({
      name: c.name,
      rating: c.rating,
      reviewCount: c.reviewCount,
    }));

    const [aiSummary, aiSuggestions, aiVisibility] = await Promise.all([
      generateAISummaryWithClaude(placeDetails, criteriaResults, overallScore, competitorSummary)
        .catch(err => {
          console.error('Claude summary failed, using template:', err);
          return generateAISummary(placeDetails, criteriaResults, overallScore);
        }),
      generateSuggestionsWithClaude(placeDetails, criteriaResults)
        .catch(err => {
          console.error('Claude suggestions failed, using template:', err);
          return generateSuggestions(placeDetails, criteriaResults);
        }),
      runAllAIVisibilityChecks(rawDetails.name, rawDetails.primaryType, rawDetails.address)
        .catch(err => {
          console.error('AI visibility checks failed:', err);
          return [
            { llm: 'ChatGPT', icon: '/icons/chatgpt.svg', found: null as boolean | null, loading: false },
            { llm: 'Claude', icon: '/icons/claude.svg', found: null as boolean | null, loading: false },
          ];
        }),
    ]);

    // 6. Heatmap — real DataForSEO Maps SERP with mock fallback
    let heatmapData: HeatmapCell[] = [];
    try {
      const HEATMAP_GRID_SIZE = 5; // 5x5 = 25 points per keyword (cost-efficient)
      const gridPoints = generateGrid(rawDetails.lat, rawDetails.lng, radiusKm, HEATMAP_GRID_SIZE);

      const heatmapResults = await Promise.all(
        keywords.map(async kw => {
          try {
            const results = await getHeatmapData(
              kw.keyword,
              gridPoints,
              placeId,
              rawDetails.name,
              radiusKm * 1000,
            );
            return results.map(r => ({
              lat: r.lat,
              lng: r.lng,
              row: r.row,
              col: r.col,
              position: r.position,
              keyword: r.keyword,
            }));
          } catch (kwErr) {
            console.error(`Heatmap failed for "${kw.keyword}", using mock:`, kwErr);
            return generateMockHeatmapData(rawDetails.lat, rawDetails.lng, radiusKm, kw.keyword, HEATMAP_GRID_SIZE);
          }
        }),
      );
      heatmapData = heatmapResults.flat();
    } catch (heatmapErr) {
      console.error('Heatmap generation failed entirely, using mock:', heatmapErr);
      heatmapData = keywords.flatMap(kw =>
        generateMockHeatmapData(rawDetails.lat, rawDetails.lng, radiusKm, kw.keyword),
      );
    }

    const report: AuditReport = {
      id: `audit_${Date.now()}`,
      placeDetails,
      config: {
        placeId,
        businessName: rawDetails.name,
        businessAddress: rawDetails.address,
        businessCategory: rawDetails.primaryType,
        businessLat: rawDetails.lat,
        businessLng: rawDetails.lng,
        keywords: keywords.map(k => ({ ...k, selected: true })),
        zoneCenterLat: rawDetails.lat,
        zoneCenterLng: rawDetails.lng,
        zoneRadiusKm: radiusKm,
      },
      overallScore,
      criteriaResults,
      revenueEstimate,
      revenueExplanation,
      competitors,
      heatmapData,
      aiVisibility,
      aiSummary,
      suggestions: aiSuggestions,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(report);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Generate audit error:', message);
    return NextResponse.json(
      { error: 'Erreur lors de la génération de l\'audit', detail: message },
      { status: 500 },
    );
  }
}
