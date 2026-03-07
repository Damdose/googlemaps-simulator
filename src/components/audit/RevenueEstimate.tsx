'use client';

import { RiLineChartLine } from 'react-icons/ri';

interface RevenueEstimateProps {
  amount: number;
  explanation: string;
}

export default function RevenueEstimate({ amount, explanation }: RevenueEstimateProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-warm-900 p-8 sm:p-10">
      <div className="absolute top-0 right-0 w-40 h-40 bg-accent/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />

      <div className="relative">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-full bg-critical/20 flex items-center justify-center">
            <RiLineChartLine className="w-6 h-6 text-critical" />
          </div>
          <div>
            <p className="font-semibold text-white">Revenus estimés perdus</p>
            <p className="text-body-sm text-white/40">chaque mois</p>
          </div>
        </div>

        <p className="text-5xl sm:text-6xl font-semibold text-accent tracking-tight mb-4">
          {amount.toLocaleString('fr-FR')}&nbsp;€
          <span className="text-xl font-normal text-accent/50">/mois</span>
        </p>

        <p className="text-body text-white/60 leading-relaxed mb-8 max-w-lg">{explanation}</p>

        <button className="btn-accent">
          Récupérez ces revenus
        </button>
      </div>
    </div>
  );
}
