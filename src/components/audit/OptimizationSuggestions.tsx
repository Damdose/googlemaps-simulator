'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Lightbulb, Copy, Check } from 'lucide-react';
import { OptimizationSuggestion } from '@/lib/types';

interface OptimizationSuggestionsProps {
  suggestions: OptimizationSuggestion[];
}

function SuggestionCard({ suggestion }: { suggestion: OptimizationSuggestion }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  function handleCopy(text: string) {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="border border-warm-200 rounded-xl overflow-hidden bg-white">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-warm-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <Lightbulb className="w-5 h-5 text-cta shrink-0" />
          <span className="font-semibold text-warm-800">{suggestion.criteriaLabel}</span>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-warm-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-warm-400" />
        )}
      </button>

      {isExpanded && (
        <div className="px-5 pb-5 pt-0 space-y-4">
          <div className="p-3 rounded-lg bg-red-50 border border-red-100">
            <p className="text-sm text-red-700 font-medium">État actuel</p>
            <p className="text-sm text-red-600 mt-1">{suggestion.currentState}</p>
          </div>

          <div className="p-3 rounded-lg bg-green-50 border border-green-100">
            <p className="text-sm text-green-700 font-medium">Recommandation</p>
            <p className="text-sm text-green-600 mt-1">{suggestion.recommendation}</p>
          </div>

          {suggestion.improvedContent && (
            <div className="p-3 rounded-lg bg-primary-light border border-primary/20">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm text-primary font-medium">Contenu suggéré</p>
                <button
                  onClick={() => handleCopy(suggestion.improvedContent!)}
                  className="flex items-center gap-1 text-xs text-primary hover:text-primary-dark transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copié !' : 'Copier'}
                </button>
              </div>
              <p className="text-sm text-primary/80 mt-1 leading-relaxed italic">
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
      {suggestions.map(s => (
        <SuggestionCard key={s.criteriaKey} suggestion={s} />
      ))}
    </div>
  );
}
