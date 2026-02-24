'use client';

import { useState } from 'react';
import { Search, TrendingUp, Check } from 'lucide-react';
import { KeywordSuggestion } from '@/lib/types';

interface KeywordSelectorProps {
  keywords: KeywordSuggestion[];
  maxSelection: number;
  onChange: (keywords: KeywordSuggestion[]) => void;
}

export default function KeywordSelector({ keywords, maxSelection, onChange }: KeywordSelectorProps) {
  const [filter, setFilter] = useState('');
  const selectedCount = keywords.filter(k => k.selected).length;

  const filtered = keywords.filter(k =>
    k.keyword.toLowerCase().includes(filter.toLowerCase()),
  );

  function toggleKeyword(index: number) {
    const keyword = keywords[index];
    if (keyword.selected) {
      const updated = keywords.map((k, i) => (i === index ? { ...k, selected: false } : k));
      onChange(updated);
    } else if (selectedCount < maxSelection) {
      const updated = keywords.map((k, i) => (i === index ? { ...k, selected: true } : k));
      onChange(updated);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-warm-800">Mots-clés cibles</h3>
        <span className={`text-sm font-medium px-3 py-1 rounded-full ${
          selectedCount === 0 ? 'bg-red-50 text-red-500' :
          selectedCount < maxSelection ? 'bg-yellow-50 text-yellow-600' :
          'bg-green-50 text-green-600'
        }`}>
          {selectedCount}/{maxSelection} sélectionnés
        </span>
      </div>

      <p className="text-sm text-warm-500">
        Choisissez 1 à {maxSelection} mots-clés. Chaque mot-clé génère une heatmap dans le rapport.
      </p>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-400" />
        <input
          type="text"
          value={filter}
          onChange={e => setFilter(e.target.value)}
          placeholder="Filtrer les mots-clés..."
          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-warm-200 text-sm focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none bg-white"
        />
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {filtered.map(kw => {
          const originalIndex = keywords.indexOf(kw);
          const isDisabled = !kw.selected && selectedCount >= maxSelection;
          return (
            <button
              key={kw.keyword}
              onClick={() => toggleKeyword(originalIndex)}
              disabled={isDisabled}
              className={`w-full flex items-center gap-3 p-3 rounded-lg border text-left transition-all ${
                kw.selected
                  ? 'bg-primary-light border-primary/30 ring-2 ring-primary/10'
                  : isDisabled
                    ? 'bg-warm-50 border-warm-100 opacity-50 cursor-not-allowed'
                    : 'bg-white border-warm-200 hover:border-warm-300 hover:bg-warm-50'
              }`}
            >
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
                kw.selected ? 'bg-primary border-primary' : 'border-warm-300'
              }`}>
                {kw.selected && <Check className="w-3.5 h-3.5 text-white" />}
              </div>

              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium truncate ${kw.selected ? 'text-primary' : 'text-warm-700'}`}>
                  {kw.keyword}
                </p>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <TrendingUp className="w-3.5 h-3.5 text-warm-400" />
                <span className="text-sm font-semibold text-warm-600">
                  {kw.searchVolume.toLocaleString('fr-FR')}
                </span>
                <span className="text-xs text-warm-400">/mois</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
