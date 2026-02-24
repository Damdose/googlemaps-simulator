import { NextRequest, NextResponse } from 'next/server';
import { getPlaceDetails } from '@/lib/google-places';

export async function GET(req: NextRequest) {
  try {
    const placeId = req.nextUrl.searchParams.get('place_id');

    if (!placeId) {
      return NextResponse.json(
        { error: 'place_id requis' },
        { status: 400 },
      );
    }

    const details = await getPlaceDetails(placeId);
    return NextResponse.json(details);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Place details error:', message);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des détails', detail: message },
      { status: 500 },
    );
  }
}
