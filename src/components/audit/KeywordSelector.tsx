'use client';

import { useState } from 'react';
import { RiSearchLine, RiCheckLine, RiLoader4Line } from 'react-icons/ri';
import { KeywordSuggestion } from '@/lib/types';

interface KeywordSelectorProps {
  keywords: KeywordSuggestion[];
  maxSelection: number;
  onChange: (keywords: KeywordSuggestion[]) => void;
  loading?: boolean;
}

export default function KeywordSelector({ keywords, maxSelection, onChange, loading }: KeywordSelectorProps) {
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
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-warm-900">Mots-clés cibles</h3>
        <span className={`text-xs font-semibold uppercase tracking-wide px-3 py-1.5 rounded-full ${
          selectedCount === 0 ? 'bg-critical/10 text-critical' :
          selectedCount < maxSelection ? 'bg-accent-light text-accent-dark' :
          'bg-warm-900/10 text-warm-900'
        }`}>
          {selectedCount}/{maxSelection}
        </span>
      </div>

      <p className="text-body-sm text-warm-500">
        Choisissez 1 à {maxSelection} mots-clés. Chaque mot-clé génère une heatmap dans le rapport.
      </p>

      <div className="relative">
        <RiSearchLine className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-400" />
        <input
          type="text"
          value={filter}
          onChange={e => setFilter(e.target.value)}
          placeholder="Filtrer les mots-clés..."
          className="w-full pl-11 pr-4 py-3 rounded-full border border-warm-200 text-sm focus:border-warm-400 focus:ring-3 focus:ring-accent/10 outline-none bg-white transition-all duration-200"
        />
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-12 gap-3">
          <RiLoader4Line className="w-6 h-6 animate-spin text-warm-400" />
          <p className="text-sm text-warm-500">Recherche des volumes réels…</p>
        </div>
      ) : (
        <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
          {filtered.length === 0 ? (
            <p className="text-sm text-warm-400 text-center py-8">Aucun mot-clé trouvé</p>
          ) : (
            filtered.map(kw => {
              const originalIndex = keywords.indexOf(kw);
              const isDisabled = !kw.selected && selectedCount >= maxSelection;
              return (
                <button
                  key={kw.keyword}
                  onClick={() => toggleKeyword(originalIndex)}
                  disabled={isDisabled}
                  className={`w-full flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all duration-200 ${
                    kw.selected
                      ? 'bg-accent-light border-accent/20 shadow-soft'
                      : isDisabled
                        ? 'bg-warm-50 border-warm-100 opacity-40 cursor-not-allowed'
                        : 'bg-white border-warm-100 hover:border-warm-200 hover:shadow-soft'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors ${
                    kw.selected ? 'bg-warm-900 border-warm-900' : 'border-warm-300'
                  }`}>
                    {kw.selected && <RiCheckLine className="w-3.5 h-3.5 text-white" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-semibold truncate ${kw.selected ? 'text-warm-900' : 'text-warm-800'}`}>
                      {kw.keyword}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="text-sm font-semibold text-warm-600 tabular-nums">
                      {kw.searchVolume.toLocaleString('fr-FR')}
                    </span>
                    <span className="text-[10px] text-warm-400">/mois</span>
                  </div>
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
