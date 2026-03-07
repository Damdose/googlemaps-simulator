'use client';

import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { RiPriceTag3Line, RiBarChart2Fill, RiMapPin2Fill } from 'react-icons/ri';
import { HeatmapCell } from '@/lib/types';

const HeatmapMapView = dynamic(() => import('./HeatmapMapView'), {
  ssr: false,
  loading: () => (
    <div className="aspect-square w-full max-w-lg mx-auto rounded-2xl bg-warm-100 animate-pulse flex items-center justify-center">
      <span className="text-body-sm text-warm-400">Chargement de la carte...</span>
    </div>
  ),
});

interface HeatmapOverlayProps {
  cells: HeatmapCell[];
  keyword: string;
  gridSize?: number;
  centerLat?: number;
  centerLng?: number;
  radiusKm?: number;
}

export default function HeatmapOverlay({
  cells,
  keyword,
  gridSize = 7,
  centerLat,
  centerLng,
  radiusKm = 5,
}: HeatmapOverlayProps) {
  const keywordCells = useMemo(
    () => cells.filter(c => c.keyword === keyword),
    [cells, keyword],
  );

  const { avgPosition, rankedCount } = useMemo(() => {
    const ranked = keywordCells.filter(c => c.position !== null);
    const avg = ranked.reduce((sum, c) => sum + (c.position ?? 0), 0) / (ranked.length || 1);
    return { avgPosition: avg, rankedCount: ranked.length };
  }, [keywordCells]);

  const mapCenter = useMemo(() => {
    if (centerLat && centerLng) return { lat: centerLat, lng: centerLng };
    if (keywordCells.length > 0) {
      const midIdx = Math.floor(keywordCells.length / 2);
      return { lat: keywordCells[midIdx].lat, lng: keywordCells[midIdx].lng };
    }
    return { lat: 48.8566, lng: 2.3522 };
  }, [centerLat, centerLng, keywordCells]);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <p className="flex items-center gap-1.5 text-body-sm text-warm-600">
          <RiPriceTag3Line className="w-3.5 h-3.5 text-warm-400" />
          Mot-clé : <strong className="text-warm-900">&ldquo;{keyword}&rdquo;</strong>
        </p>
        <div className="flex items-center gap-5 text-body-sm text-warm-500">
          <span className="flex items-center gap-1.5">
            <RiBarChart2Fill className="w-3.5 h-3.5 text-warm-400" />
            Position moy. : <strong className="text-warm-800">{avgPosition.toFixed(1)}</strong>
          </span>
          <span className="flex items-center gap-1.5">
            <RiMapPin2Fill className="w-3.5 h-3.5 text-warm-400" />
            Classé : <strong className="text-warm-800">{rankedCount}/{keywordCells.length}</strong>
          </span>
        </div>
      </div>

      <div className="relative aspect-square w-full max-w-lg mx-auto rounded-2xl overflow-hidden border border-warm-200 shadow-soft">
        <HeatmapMapView
          cells={keywordCells}
          centerLat={mapCenter.lat}
          centerLng={mapCenter.lng}
          radiusKm={radiusKm}
          gridSize={gridSize}
        />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
        {[
          { label: '#1-3', color: '#2D8B57' },
          { label: '#4-7', color: '#4A9B6B' },
          { label: '#8-13', color: '#D49530' },
          { label: '#14-20', color: '#D97A3E' },
          { label: '20+ / NC', color: '#C94432' },
        ].map(item => (
          <div key={item.label} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: item.color }} />
            <span className="text-warm-500 font-medium">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
