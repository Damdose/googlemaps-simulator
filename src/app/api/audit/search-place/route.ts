import { NextRequest, NextResponse } from 'next/server';
import { autocomplete } from '@/lib/google-places';

export async function POST(req: NextRequest) {
  try {
    const { input, sessionToken } = await req.json();

    if (!input || typeof input !== 'string' || input.length < 2) {
      return NextResponse.json({ results: [] });
    }

    const results = await autocomplete(input, sessionToken);
    return NextResponse.json({ results });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Search place error:', message);
    return NextResponse.json(
      { error: 'Erreur lors de la recherche', detail: message },
      { status: 500 },
    );
  }
}
