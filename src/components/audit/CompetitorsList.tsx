'use client';

import { RiStarFill, RiExternalLinkLine, RiMapPin2Fill, RiImageLine, RiAlertLine } from 'react-icons/ri';
import { Competitor } from '@/lib/types';

interface CompetitorsListProps {
  competitors: Competitor[];
  businessName: string;
}

export default function CompetitorsList({ competitors, businessName }: CompetitorsListProps) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4">
        {competitors.map((comp, i) => (
          <div
            key={comp.placeId}
            className="card-hover flex items-start gap-4"
          >
            <div className="w-11 h-11 rounded-full bg-warm-100 flex items-center justify-center shrink-0 font-semibold text-warm-600 text-sm">
              #{i + 1}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold text-warm-900 truncate">{comp.name}</h4>
                <a
                  href={comp.googleMapsUri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-warm-300 hover:text-warm-600 transition-colors"
                >
                  <RiExternalLinkLine className="w-3.5 h-3.5" />
                </a>
              </div>

              <p className="flex items-center gap-1.5 text-body-sm text-warm-500 mb-2.5">
                <RiMapPin2Fill className="w-3.5 h-3.5 shrink-0 text-warm-400" />
                <span className="truncate">{comp.address}</span>
              </p>

              <div className="flex items-center gap-5 text-sm">
                <div className="flex items-center gap-1.5">
                  <RiStarFill className="w-4 h-4 fill-accent text-accent" />
                  <span className="font-semibold text-warm-800">{comp.rating}</span>
                  <span className="text-warm-400">({comp.reviewCount})</span>
                </div>
                <div className="flex items-center gap-1.5 text-warm-500">
                  <RiImageLine className="w-3.5 h-3.5 text-warm-400" />
                  <span>{comp.photoCount} photos</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card bg-accent-light border-accent/10">
        <p className="text-body-sm text-warm-700">
          <span className="inline-flex items-center gap-1.5"><RiAlertLine className="w-4 h-4 text-accent-dark shrink-0" /><strong>{businessName}</strong></span> est en retard sur {competitors[0]?.name ?? 'le leader'} en nombre d&apos;avis
          et note Google. Combler cet écart est la priorité n°1.
        </p>
      </div>
    </div>
  );
}
