'use client';

import { MapPin, Minus, Plus } from 'lucide-react';

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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-warm-800">Zone d&apos;analyse</h3>
        <span className="text-sm font-medium text-warm-500">
          Rayon : {radiusKm} km
        </span>
      </div>

      <p className="text-sm text-warm-500">
        Définissez le périmètre autour de votre établissement pour l&apos;analyse de ranking.
      </p>

      {/* Placeholder map — will be replaced by Google Maps or Mapbox */}
      <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-warm-100 border-2 border-warm-200">
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Simulated map with concentric circles */}
          <div className="relative">
            {[1, 0.75, 0.5, 0.25].map((scale, i) => (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary/20"
                style={{
                  width: `${280 * scale}px`,
                  height: `${280 * scale}px`,
                  backgroundColor: `rgba(27, 94, 59, ${0.03 * (4 - i)})`,
                }}
              />
            ))}
            <div className="relative z-10 flex flex-col items-center gap-2">
              <MapPin className="w-8 h-8 text-primary fill-primary/20" />
              <div className="bg-white px-3 py-1.5 rounded-lg shadow-card text-xs font-medium text-warm-700">
                {centerLat.toFixed(4)}, {centerLng.toFixed(4)}
              </div>
            </div>
          </div>
        </div>

        {/* Map placeholder text */}
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs text-warm-500">
          Carte interactive (Google Maps) — sera intégrée au Sprint 2
        </div>
      </div>

      {/* Radius control */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => adjustRadius(-1)}
          disabled={radiusKm <= minRadius}
          className="w-10 h-10 rounded-lg border border-warm-200 flex items-center justify-center hover:bg-warm-50 disabled:opacity-30 transition-colors"
        >
          <Minus className="w-4 h-4 text-warm-600" />
        </button>

        <div className="flex-1">
          <input
            type="range"
            min={minRadius}
            max={maxRadius}
            value={radiusKm}
            onChange={e => onRadiusChange(Number(e.target.value))}
            className="w-full accent-primary h-2 rounded-full appearance-none bg-warm-200 cursor-pointer"
          />
          <div className="flex justify-between mt-1 text-xs text-warm-400">
            <span>{minRadius} km</span>
            <span>{maxRadius} km</span>
          </div>
        </div>

        <button
          onClick={() => adjustRadius(1)}
          disabled={radiusKm >= maxRadius}
          className="w-10 h-10 rounded-lg border border-warm-200 flex items-center justify-center hover:bg-warm-50 disabled:opacity-30 transition-colors"
        >
          <Plus className="w-4 h-4 text-warm-600" />
        </button>
      </div>

      <p className="text-center text-sm font-medium text-primary">
        Zone d&apos;analyse : rayon de {radiusKm} km autour de votre établissement
      </p>
    </div>
  );
}
