import { NextRequest } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

const SYSTEM_PROMPT = `Tu es l'assistant virtuel de Siva, une agence spécialisée en SEO local et Google Business Profile.

À PROPOS DE SIVA :
- Agence SEO locale qui aide les commerces de proximité à dominer Google Maps
- +150 entreprises accompagnées, note de 4.9/5 sur Google (67 avis)
- Services : Optimisation de fiche Google (500€ one-shot), Google Ads Local (400€/mois + budget pub), Boost Avis Expérience (sur devis)
- Méthodologie : Audit gratuit → Prise de rendez-vous → Accompagnement continu
- L'audit gratuit inclut : score d'optimisation sur 100, heatmap des positions locales, analyse des 3 concurrents principaux, recommandations IA personnalisées
- Outils utilisés : Google Business, DataForSEO, Claude AI, Leaflet Maps
- Contact : +33 7 60 55 40 00, contact@siva.local
- Promesse : transparence radicale, pas de contrat long (résiliable à tout moment), reporting hebdomadaire, ROI first

STATS CLÉS :
- 46% des recherches Google ont une intention locale
- Résultats visibles en 2-4 semaines (quick wins), résultats significatifs en 60-90 jours
- L'audit est 100% gratuit, sans engagement, sans carte bancaire

TON : Amical, professionnel, direct. Tu vouvoies le visiteur. Tu es enthousiaste mais pas agressif commercialement. Tu donnes des réponses concises (2-4 phrases max). Si la question porte sur un sujet hors SEO local/Google Business, redirige poliment vers le sujet.

OBJECTIF : Répondre aux questions des visiteurs sur les services Siva, le SEO local, Google Business Profile, et les orienter vers l'audit gratuit ou la prise de rendez-vous quand c'est pertinent.`;

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  const stream = anthropic.messages.stream({
    model: 'claude-3-5-haiku-latest',
    max_tokens: 400,
    system: SYSTEM_PROMPT,
    messages: messages.map((m: { role: string; content: string }) => ({
      role: m.role as 'user' | 'assistant',
      content: m.content,
    })),
  });

  const encoder = new TextEncoder();

  const readable = new ReadableStream({
    async start(controller) {
      try {
        for await (const event of stream) {
          if (
            event.type === 'content_block_delta' &&
            event.delta.type === 'text_delta'
          ) {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        controller.close();
      } catch (err) {
        console.error('Chat stream error:', err);
        controller.error(err);
      }
    },
  });

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache',
    },
  });
}
