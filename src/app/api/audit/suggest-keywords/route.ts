import { NextRequest, NextResponse } from 'next/server';
import { getRelatedKeywords, getKeywordVolumes } from '@/lib/dataforseo';
import { getBenchmark } from '@/lib/sector-benchmarks';

export async function POST(req: NextRequest) {
  try {
    const { primaryType, address } = await req.json();

    if (!primaryType || !address) {
      return NextResponse.json({ error: 'primaryType et address requis' }, { status: 400 });
    }

    const benchmark = getBenchmark(primaryType);
    const city = extractCity(address);
    const seedKeyword = `${benchmark.displayNameFr.toLowerCase()} ${city}`.trim();

    let keywords: { keyword: string; searchVolume: number }[] = [];

    try {
      // Option A: Related keywords from DataForSEO Labs
      const related = await getRelatedKeywords(seedKeyword);
      if (related.length > 0) {
        keywords = related.map(r => ({
          keyword: r.keyword,
          searchVolume: r.searchVolume,
        }));
      }
    } catch (err) {
      console.error('Related keywords failed, trying search volume:', err);
    }

    // Fallback / complement: generate keyword templates + get their volumes
    if (keywords.length < 5) {
      const templates = generateTemplates(benchmark.displayNameFr.toLowerCase(), city, address);
      try {
        const volumes = await getKeywordVolumes(templates);
        const fromVolumes = volumes
          .filter(v => v.searchVolume > 0)
          .map(v => ({ keyword: v.keyword, searchVolume: v.searchVolume }));

        // Merge without duplicates
        const existingSet = new Set(keywords.map(k => k.keyword.toLowerCase()));
        for (const kv of fromVolumes) {
          if (!existingSet.has(kv.keyword.toLowerCase())) {
            keywords.push(kv);
            existingSet.add(kv.keyword.toLowerCase());
          }
        }
      } catch (err) {
        console.error('Keyword volumes failed:', err);
      }
    }

    // Sort by volume descending, limit to 15
    keywords.sort((a, b) => b.searchVolume - a.searchVolume);
    keywords = keywords.slice(0, 15);

    return NextResponse.json({ keywords, seedKeyword });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Suggest keywords error:', message);
    return NextResponse.json(
      { error: 'Erreur lors de la suggestion de mots-clés', detail: message },
      { status: 500 },
    );
  }
}

function extractCity(address: string): string {
  const parts = address.split(',').map(p => p.trim());
  for (const part of parts) {
    const match = part.match(/\d{5}\s+(.+)/);
    if (match) return match[1];
  }
  if (parts.length >= 2) {
    const candidate = parts[parts.length - 2];
    if (candidate && !['France', 'Belgique', 'Suisse'].includes(candidate)) {
      return candidate;
    }
  }
  return 'Paris';
}

function generateTemplates(category: string, city: string, address: string): string[] {
  const district = extractDistrict(address);
  const templates: string[] = [
    `${category} ${city}`,
    `meilleur ${category} ${city}`,
    `${category} pas cher ${city}`,
    `${category} avis ${city}`,
    `${category} près de moi`,
    `${category} ouvert ${city}`,
    `trouver ${category} ${city}`,
    `bon ${category} ${city}`,
  ];
  if (district) {
    templates.push(`${category} ${district}`);
    templates.push(`meilleur ${category} ${district}`);
  }
  return templates;
}

function extractDistrict(address: string): string | null {
  const zipMatch = address.match(/75(\d{3})/);
  if (zipMatch) {
    const arr = parseInt(zipMatch[1], 10);
    if (arr >= 1 && arr <= 20) return `paris ${arr}${arr === 1 ? 'er' : 'e'}`;
  }
  const distMatch = address.match(/(Lyon|Marseille)\s*(\d{1,2})/i);
  if (distMatch) return `${distMatch[1].toLowerCase()} ${distMatch[2]}`;
  return null;
}
