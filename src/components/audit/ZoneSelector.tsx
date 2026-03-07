'use client';

import dynamic from 'next/dynamic';
import { RiSubtractLine, RiAddLine } from 'react-icons/ri';

const ZoneMap = dynamic(() => import('./ZoneMap'), {
  ssr: false,
  loading: () => (
    <div className="aspect-[4/3] rounded-2xl bg-warm-100 animate-pulse flex items-center justify-center">
      <span className="text-body-sm text-warm-400">Chargement de la carte...</span>
    </div>
  ),
});

interface ZoneSelectorProps {
  centerLat: number;
  centerLng: number;
  radiusKm: number;
  onRadiusChange: (radius: number) => void;
}

export default function ZoneSelector({
  centerLat,
  centerLng,
  radiusKm,
  onRadiusChange,
}: ZoneSelectorProps) {
  const minRadius = 1;
  const maxRadius = 20;

  function adjustRadius(delta: number) {
    const newRadius = Math.min(maxRadius, Math.max(minRadius, radiusKm + delta));
    onRadiusChange(newRadius);
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-warm-900">Zone d&apos;analyse</h3>
        <span className="text-xs font-semibold uppercase tracking-wide px-3 py-1.5 rounded-full bg-warm-900/10 text-warm-900">
          {radiusKm} km
        </span>
      </div>

      <p className="text-body-sm text-warm-500">
        Définissez le périmètre autour de votre établissement pour l&apos;analyse de ranking.
      </p>

      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-warm-200 shadow-soft">
        <ZoneMap
          centerLat={centerLat}
          centerLng={centerLng}
          radiusKm={radiusKm}
        />
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => adjustRadius(-1)}
          disabled={radiusKm <= minRadius}
          className="w-10 h-10 rounded-full border border-warm-200 flex items-center justify-center hover:bg-warm-50 hover:border-warm-300 disabled:opacity-30 transition-all duration-200"
        >
          <RiSubtractLine className="w-4 h-4 text-warm-600" />
        </button>

        <div className="flex-1">
          <input
            type="range"
            min={minRadius}
            max={maxRadius}
            value={radiusKm}
            onChange={e => onRadiusChange(Number(e.target.value))}
            className="w-full accent-warm-900 h-1.5 rounded-full appearance-none bg-warm-200 cursor-pointer"
          />
          <div className="flex justify-between mt-1.5 text-[11px] text-warm-400 font-medium">
            <span>{minRadius} km</span>
            <span>{maxRadius} km</span>
          </div>
        </div>

        <button
          onClick={() => adjustRadius(1)}
          disabled={radiusKm >= maxRadius}
          className="w-10 h-10 rounded-full border border-warm-200 flex items-center justify-center hover:bg-warm-50 hover:border-warm-300 disabled:opacity-30 transition-all duration-200"
        >
          <RiAddLine className="w-4 h-4 text-warm-600" />
        </button>
      </div>

      <div className="flex items-center justify-center gap-2 text-body-sm text-warm-600 font-medium">
        Rayon de {radiusKm} km autour de votre établissement
      </div>
    </div>
  );
}
