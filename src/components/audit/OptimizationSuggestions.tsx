'use client';

import { useState } from 'react';
import { RiArrowDownSLine, RiFileCopyLine, RiCheckLine, RiAlertLine, RiCheckboxCircleFill, RiFileEditFill } from 'react-icons/ri';
import { OptimizationSuggestion } from '@/lib/types';

interface OptimizationSuggestionsProps {
  suggestions: OptimizationSuggestion[];
}

function SuggestionCard({ suggestion, index }: { suggestion: OptimizationSuggestion; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  function handleCopy(text: string) {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="card overflow-hidden p-0">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-warm-50/50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="w-9 h-9 rounded-full bg-accent-light border border-accent/20 flex items-center justify-center shrink-0 text-sm font-semibold text-accent-dark">
            {index + 1}
          </div>
          <span className="font-semibold text-warm-900">{suggestion.criteriaLabel}</span>
        </div>
        <RiArrowDownSLine className={`w-5 h-5 text-warm-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
      </button>

      {isExpanded && (
        <div className="px-5 pb-5 space-y-3">
          <div className="p-4 rounded-xl bg-critical/5 border border-critical/10">
            <p className="flex items-center gap-1.5 text-sm text-critical font-semibold mb-1.5">
              <RiAlertLine className="w-4 h-4" />
              État actuel
            </p>
            <p className="text-body-sm text-warm-600">{suggestion.currentState}</p>
          </div>

          <div className="p-4 rounded-xl bg-positive/5 border border-positive/10">
            <p className="flex items-center gap-1.5 text-sm text-positive font-semibold mb-1.5">
              <RiCheckboxCircleFill className="w-4 h-4" />
              Recommandation
            </p>
            <p className="text-body-sm text-warm-600">{suggestion.recommendation}</p>
          </div>

          {suggestion.improvedContent && (
            <div className="p-4 rounded-xl bg-accent-light border border-accent/10">
              <div className="flex items-center justify-between mb-1.5">
                <p className="flex items-center gap-1.5 text-sm text-warm-900 font-semibold">
                  <RiFileEditFill className="w-3.5 h-3.5" />
                  Contenu suggéré
                </p>
                <button
                  onClick={() => handleCopy(suggestion.improvedContent!)}
                  className="flex items-center gap-1.5 text-xs text-warm-600 hover:text-warm-900 transition-colors font-medium"
                >
                  {copied ? <RiCheckLine className="w-3.5 h-3.5" /> : <RiFileCopyLine className="w-3.5 h-3.5" />}
                  {copied ? 'Copié' : 'Copier'}
                </button>
              </div>
              <p className="text-body-sm text-warm-600 leading-relaxed italic">
                &ldquo;{suggestion.improvedContent}&rdquo;
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function OptimizationSuggestions({ suggestions }: OptimizationSuggestionsProps) {
  return (
    <div className="space-y-3">
      {suggestions.map((s, i) => (
        <SuggestionCard key={s.criteriaKey} suggestion={s} index={i} />
      ))}
    </div>
  );
}
