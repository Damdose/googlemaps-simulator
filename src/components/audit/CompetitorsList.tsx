'use client';

import { Star, MapPin, Image as ImageIcon, ExternalLink } from 'lucide-react';
import { Competitor } from '@/lib/types';

interface CompetitorsListProps {
  competitors: Competitor[];
  businessName: string;
}

export default function CompetitorsList({ competitors, businessName }: CompetitorsListProps) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-warm-500">
        Top 3 des concurrents les mieux classés dans votre zone pour votre mot-clé principal.
      </p>

      <div className="grid gap-4">
        {competitors.map((comp, i) => (
          <div
            key={comp.placeId}
            className="flex items-start gap-4 p-5 rounded-xl bg-white border border-warm-200 hover:shadow-soft transition-shadow"
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-lg font-bold text-primary">#{i + 1}</span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold text-warm-800 truncate">{comp.name}</h4>
                <a
                  href={comp.googleMapsUri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-warm-400 hover:text-primary transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="flex items-center gap-1 text-sm text-warm-500 mb-2">
                <MapPin className="w-3.5 h-3.5" />
                <span className="truncate">{comp.address}</span>
              </div>

              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-gold text-gold" />
                  <span className="font-semibold text-warm-700">{comp.rating}</span>
                  <span className="text-warm-400">({comp.reviewCount} avis)</span>
                </div>
                <div className="flex items-center gap-1 text-warm-500">
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>{comp.photoCount} photos</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 rounded-xl bg-cta-light border border-cta/20">
        <p className="text-sm text-warm-700">
          <strong>{businessName}</strong> est en retard sur {competitors[0]?.name ?? 'le leader'} en nombre d&apos;avis
          et note Google. Combler cet écart est la priorité n°1.
        </p>
      </div>
    </div>
  );
}
