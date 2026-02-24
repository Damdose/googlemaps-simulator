'use client';

import { CheckCircle2, XCircle, HelpCircle, Loader2 } from 'lucide-react';
import { AIVisibilityResult } from '@/lib/types';

interface AIVisibilityGridProps {
  results: AIVisibilityResult[];
}

const LLM_COLORS: Record<string, string> = {
  ChatGPT: '#10A37F',
  Claude: '#D97706',
  Gemini: '#4285F4',
  Perplexity: '#20808D',
  Grok: '#1D9BF0',
  Llama: '#6366F1',
};

export default function AIVisibilityGrid({ results }: AIVisibilityGridProps) {
  const foundCount = results.filter(r => r.found === true).length;
  const testedCount = results.filter(r => r.found !== null).length;

  return (
    <div className="space-y-4">
      <p className="text-sm text-warm-500">
        Nous avons demandé à {testedCount} assistants IA : &ldquo;Quel est le meilleur{' '}
        établissement de ce type dans votre zone ?&rdquo;
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {results.map(r => {
          const color = LLM_COLORS[r.llm] ?? '#6B7280';
          return (
            <div
              key={r.llm}
              className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${
                r.found === true
                  ? 'bg-green-50 border-green-200'
                  : r.found === false
                    ? 'bg-red-50 border-red-200'
                    : 'bg-warm-50 border-warm-200'
              }`}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm shrink-0"
                style={{ backgroundColor: color }}
              >
                {r.llm.slice(0, 2).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-sm text-warm-800 truncate">{r.llm}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  {r.loading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 text-warm-400 animate-spin" />
                      <span className="text-xs text-warm-400">Vérification...</span>
                    </>
                  ) : r.found === true ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                      <span className="text-xs text-green-600 font-medium">Trouvé</span>
                    </>
                  ) : r.found === false ? (
                    <>
                      <XCircle className="w-3.5 h-3.5 text-red-500" />
                      <span className="text-xs text-red-500 font-medium">Non trouvé</span>
                    </>
                  ) : (
                    <>
                      <HelpCircle className="w-3.5 h-3.5 text-warm-400" />
                      <span className="text-xs text-warm-400">Non testé</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-4 rounded-xl bg-warm-50 border border-warm-200">
        <p className="text-sm text-warm-600">
          <strong>Résultat :</strong> Votre établissement est mentionné par{' '}
          <strong className={foundCount > 0 ? 'text-green-600' : 'text-red-500'}>
            {foundCount}/{testedCount}
          </strong>{' '}
          assistants IA. {foundCount === 0
            ? "C'est un problème majeur pour votre visibilité future."
            : foundCount < testedCount / 2
              ? 'Il y a une marge de progression importante.'
              : 'Bonne présence, continuez à renforcer votre profil.'}
        </p>
      </div>
    </div>
  );
}
