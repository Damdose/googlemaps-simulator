'use client';

import { TrendingDown, ArrowRight } from 'lucide-react';

interface RevenueEstimateProps {
  amount: number;
  explanation: string;
}

export default function RevenueEstimate({ amount, explanation }: RevenueEstimateProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-50 to-orange-50 border border-red-100 p-8">
      <div className="absolute top-0 right-0 w-32 h-32 bg-red-100/50 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="relative">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
            <TrendingDown className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <p className="text-sm text-warm-600 font-medium">Revenus estimés perdus</p>
            <p className="text-xs text-warm-400">chaque mois</p>
          </div>
        </div>

        <p className="text-5xl font-bold text-red-600 mb-3">
          {amount.toLocaleString('fr-FR')}&nbsp;€<span className="text-lg font-normal text-red-400">/mois</span>
        </p>

        <p className="text-sm text-warm-600 leading-relaxed mb-6">{explanation}</p>

        <button className="group flex items-center gap-2 bg-cta hover:bg-cta-hover text-white font-semibold px-6 py-3 rounded-xl transition-colors">
          Récupérez ces revenus
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
