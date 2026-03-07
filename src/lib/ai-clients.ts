import Anthropic from '@anthropic-ai/sdk';
import OpenAI from 'openai';
import { PlaceDetails, CriteriaResult, OptimizationSuggestion } from './types';
import { getBenchmark } from './sector-benchmarks';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function generateAISummaryWithClaude(
  details: PlaceDetails,
  criteria: CriteriaResult[],
  score: number,
  competitors: { name: string; rating: number; reviewCount: number }[],
): Promise<string> {
  const benchmark = getBenchmark(details.primaryType);
  const failedCriteria = criteria.filter(c => c.status === 'fail');
  const passedCriteria = criteria.filter(c => c.status === 'pass');

  const topCompetitor = competitors[0];

  const message = await anthropic.messages.create({
    model: 'claude-3-5-haiku-latest',
    max_tokens: 500,
    messages: [
      {
        role: 'user',
        content: `Tu es un expert en SEO local et Google Business Profile. Rédige un audit en 4-5 phrases maximum pour cet établissement.

DONNÉES DE LA FICHE :
- Nom : ${details.name}
- Type : ${details.primaryTypeDisplayName} (${details.primaryType})
- Adresse : ${details.address}
- Note Google : ${details.rating}/5 (${details.userRatingCount} avis)
- Photos : ${details.photoCount}
- Description : ${details.editorialSummary ? `"${details.editorialSummary}"` : 'AUCUNE'}
- Site web : ${details.websiteUri || 'NON RENSEIGNÉ'}
- Téléphone : ${details.phoneNumber || 'NON RENSEIGNÉ'}
- Score d'optimisation : ${score}/100

BENCHMARKS SECTEUR (${benchmark.displayNameFr}) :
- Note moyenne : ${benchmark.avgRating}/5
- Nombre d'avis moyen : ${benchmark.avgReviewCount}
- Photos moyennes : ${benchmark.avgPhotoCount}

CRITÈRES EN ÉCHEC (${failedCriteria.length}) : ${failedCriteria.map(c => c.label).join(', ') || 'Aucun'}
CRITÈRES VALIDÉS (${passedCriteria.length}) : ${passedCriteria.map(c => c.label).join(', ') || 'Aucun'}

${topCompetitor ? `CONCURRENT N°1 : ${topCompetitor.name} (${topCompetitor.rating}/5, ${topCompetitor.reviewCount} avis)` : ''}

CONSIGNES :
1. Identifie les 2-3 problèmes les plus critiques
2. Compare aux benchmarks du secteur
3. Estime l'impact en termes de clients perdus
4. Termine par une note d'espoir (c'est corrigeable)
Ton : direct, professionnel, légèrement urgent. En français. Pas de markdown ni de listes.`,
      },
    ],
  });

  const textBlock = message.content.find(b => b.type === 'text');
  return textBlock?.text ?? 'Impossible de générer le résumé.';
}

export async function generateSuggestionsWithClaude(
  details: PlaceDetails,
  criteria: CriteriaResult[],
): Promise<OptimizationSuggestion[]> {
  const failedOrPartial = criteria.filter(c => c.status === 'fail' || c.status === 'partial');

  if (failedOrPartial.length === 0) return [];

  const benchmark = getBenchmark(details.primaryType);

  const message = await anthropic.messages.create({
    model: 'claude-3-5-haiku-latest',
    max_tokens: 1500,
    messages: [
      {
        role: 'user',
        content: `Tu es un expert en optimisation Google Business Profile. Génère des recommandations concrètes pour cet établissement.

ÉTABLISSEMENT : ${details.name} (${details.primaryTypeDisplayName})
Adresse : ${details.address}
Note : ${details.rating}/5 (${details.userRatingCount} avis)
Photos : ${details.photoCount} (benchmark secteur : ${benchmark.avgPhotoCount})
Description : ${details.editorialSummary ? `"${details.editorialSummary}"` : 'AUCUNE'}
Site web : ${details.websiteUri || 'NON'}

CRITÈRES EN ÉCHEC OU PARTIELS :
${failedOrPartial.map(c => `- ${c.label} (${c.status}) : ${c.detail}`).join('\n')}

Pour chaque critère en échec, retourne un JSON array avec :
- criteriaKey: la clé du critère
- criteriaLabel: le nom du critère
- currentState: l'état actuel constaté (1 phrase)
- recommendation: la recommandation concrète (2-3 phrases)
- improvedContent: si applicable, un exemple de contenu optimisé (pour la description uniquement)

Retourne UNIQUEMENT le JSON array, sans markdown, sans explication. En français.`,
      },
    ],
  });

  const textBlock = message.content.find(b => b.type === 'text');
  const raw = textBlock?.text ?? '[]';

  try {
    const jsonMatch = raw.match(/\[[\s\S]*\]/);
    if (!jsonMatch) return [];
    const parsed = JSON.parse(jsonMatch[0]);
    return parsed.map((s: Record<string, string>) => ({
      criteriaKey: s.criteriaKey ?? '',
      criteriaLabel: s.criteriaLabel ?? '',
      currentState: s.currentState ?? '',
      recommendation: s.recommendation ?? '',
      improvedContent: s.improvedContent ?? undefined,
    }));
  } catch {
    console.error('Failed to parse AI suggestions JSON');
    return [];
  }
}

async function checkClaudeVisibility(
  businessName: string,
  category: string,
  city: string,
): Promise<boolean | null> {
  try {
    const message = await anthropic.messages.create({
      model: 'claude-3-5-haiku-latest',
      max_tokens: 300,
      messages: [
        { role: 'user', content: `Quel est le meilleur ${category} à ${city} ?` },
      ],
    });

    const text = message.content.find(b => b.type === 'text')?.text ?? '';
    const nameLower = businessName.toLowerCase();
    return text.toLowerCase().includes(nameLower) ||
      text.toLowerCase().includes(nameLower.split(' ')[0]);
  } catch (err) {
    console.error('Claude visibility check failed:', err);
    return null;
  }
}

async function checkChatGPTVisibility(
  businessName: string,
  category: string,
  city: string,
): Promise<boolean | null> {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      max_tokens: 300,
      messages: [
        { role: 'user', content: `Quel est le meilleur ${category} à ${city} ?` },
      ],
    });

    const text = completion.choices[0]?.message?.content ?? '';
    const nameLower = businessName.toLowerCase();
    return text.toLowerCase().includes(nameLower) ||
      text.toLowerCase().includes(nameLower.split(' ')[0]);
  } catch (err) {
    console.error('ChatGPT visibility check failed:', err);
    return null;
  }
}

function extractCityFromAddress(address: string): string {
  const parts = address.split(',').map(p => p.trim());
  for (const part of parts) {
    const match = part.match(/\d{5}\s+(.+)/);
    if (match) return match[1];
  }
  if (parts.length >= 2) return parts[parts.length - 2];
  return '';
}

export async function runAllAIVisibilityChecks(
  businessName: string,
  primaryType: string,
  address: string,
): Promise<{ llm: string; icon: string; found: boolean | null; loading: boolean }[]> {
  const city = extractCityFromAddress(address);
  const benchmark = getBenchmark(primaryType);
  const categoryFr = benchmark.displayNameFr.toLowerCase();

  const [claudeFound, chatgptFound] = await Promise.all([
    checkClaudeVisibility(businessName, categoryFr, city),
    checkChatGPTVisibility(businessName, categoryFr, city),
  ]);

  return [
    { llm: 'ChatGPT', icon: '/icons/chatgpt.svg', found: chatgptFound, loading: false },
    { llm: 'Claude', icon: '/icons/claude.svg', found: claudeFound, loading: false },
  ];
}
