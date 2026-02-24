'use client';

import { useState } from 'react';
import { HeatmapCell } from '@/lib/types';
import { getPositionColor, getPositionLabel } from '@/lib/heatmap-grid';

interface HeatmapOverlayProps {
  cells: HeatmapCell[];
  keyword: string;
  gridSize?: number;
}

export default function HeatmapOverlay({ cells, keyword, gridSize = 7 }: HeatmapOverlayProps) {
  const [hoveredCell, setHoveredCell] = useState<HeatmapCell | null>(null);

  const keywordCells = cells.filter(c => c.keyword === keyword);
  const avgPosition =
    keywordCells.filter(c => c.position !== null).reduce((sum, c) => sum + (c.position ?? 0), 0) /
    (keywordCells.filter(c => c.position !== null).length || 1);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-warm-600">
          Mot-clé : <strong className="text-warm-800">&ldquo;{keyword}&rdquo;</strong>
        </p>
        <p className="text-sm text-warm-500">
          Position moyenne : <strong className="text-warm-700">{avgPosition.toFixed(1)}</strong>
        </p>
      </div>

      <div className="relative aspect-square w-full max-w-md mx-auto rounded-xl overflow-hidden border-2 border-warm-200 bg-warm-100">
        {/* Grid overlay */}
        <div className="absolute inset-0 grid" style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)`, gridTemplateRows: `repeat(${gridSize}, 1fr)` }}>
          {keywordCells.map((cell, i) => (
            <div
              key={i}
              className="relative border border-white/30 cursor-pointer transition-all hover:scale-110 hover:z-10"
              style={{ backgroundColor: getPositionColor(cell.position) + 'CC' }}
              onMouseEnter={() => setHoveredCell(cell)}
              onMouseLeave={() => setHoveredCell(null)}
            >
              <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-xs drop-shadow-md">
                {getPositionLabel(cell.position)}
              </span>
            </div>
          ))}
        </div>

        {/* Center marker */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-warm-800 shadow-lg z-20 pointer-events-none" />

        {/* Tooltip */}
        {hoveredCell && (
          <div className="absolute top-2 left-2 bg-white rounded-lg shadow-elevated p-3 z-30 text-xs">
            <p className="font-semibold text-warm-800">
              Position : {getPositionLabel(hoveredCell.position)}
            </p>
            <p className="text-warm-500 mt-0.5">
              GPS: {hoveredCell.lat.toFixed(4)}, {hoveredCell.lng.toFixed(4)}
            </p>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
        {[
          { label: '#1-3', color: '#15803D' },
          { label: '#4-7', color: '#4ADE80' },
          { label: '#8-13', color: '#EAB308' },
          { label: '#14-20', color: '#F97316' },
          { label: '20+ / NC', color: '#EF4444' },
        ].map(item => (
          <div key={item.label} className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: item.color }} />
            <span className="text-warm-600">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
