'use client';

import { RiLoader4Line, RiCheckboxCircleFill, RiCloseCircleLine, RiCircleLine, RiAlertLine, RiLineChartFill, RiSparklingFill } from 'react-icons/ri';
import { AIVisibilityResult } from '@/lib/types';

interface AIVisibilityGridProps {
  results: AIVisibilityResult[];
}

const LLM_META: Record<string, { color: string; label: string }> = {
  ChatGPT: { color: '#10A37F', label: 'Ch' },
  Claude: { color: '#D97706', label: 'Cl' },
  Gemini: { color: '#4285F4', label: 'Ge' },
  Perplexity: { color: '#20808D', label: 'Px' },
  Grok: { color: '#1D9BF0', label: 'Gk' },
  Llama: { color: '#6366F1', label: 'Ll' },
};

export default function AIVisibilityGrid({ results }: AIVisibilityGridProps) {
  const foundCount = results.filter(r => r.found === true).length;
  const testedCount = results.filter(r => r.found !== null).length;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {results.map(r => {
          const meta = LLM_META[r.llm] ?? { color: '#6B7280', label: '??' };
          return (
            <div
              key={r.llm}
              className={`card p-4 flex items-center gap-3.5 transition-all hover:-translate-y-0.5 ${
                r.found === true
                  ? 'bg-positive/5 border-positive/10'
                  : r.found === false
                    ? 'bg-critical/5 border-critical/10'
                    : ''
              }`}
            >
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center text-white font-semibold text-xs shrink-0"
                style={{ backgroundColor: meta.color }}
              >
                {meta.label}
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-sm text-warm-900 truncate">{r.llm}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  {r.loading ? (
                    <>
                      <RiLoader4Line className="w-3.5 h-3.5 text-warm-400 animate-spin" />
                      <span className="text-xs text-warm-400">Vérification...</span>
                    </>
                  ) : r.found === true ? (
                    <span className="flex items-center gap-1 text-xs text-positive font-medium">
                      <RiCheckboxCircleFill className="w-3.5 h-3.5" />
                      Trouvé
                    </span>
                  ) : r.found === false ? (
                    <span className="flex items-center gap-1 text-xs text-critical font-medium">
                      <RiCloseCircleLine className="w-3.5 h-3.5" />
                      Non trouvé
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs text-warm-400">
                      <RiCircleLine className="w-3.5 h-3.5" />
                      Non testé
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="card bg-warm-50">
        <p className="text-body-sm text-warm-600">
          <span className="inline-flex items-center gap-1.5">
            {foundCount === 0 ? (
              <RiAlertLine className="w-4 h-4 text-critical shrink-0" />
            ) : foundCount < testedCount / 2 ? (
              <RiLineChartFill className="w-4 h-4 text-warning shrink-0" />
            ) : (
              <RiSparklingFill className="w-4 h-4 text-positive shrink-0" />
            )}
            <strong className="text-warm-800">Résultat :</strong>
          </span>{' '}
          Votre établissement est mentionné par{' '}
          <strong className={foundCount > 0 ? 'text-positive' : 'text-critical'}>
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
