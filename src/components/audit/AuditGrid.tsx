'use client';

import { CheckCircle2, XCircle, AlertTriangle, HelpCircle } from 'lucide-react';
import { CriteriaResult, CriteriaStatus } from '@/lib/types';

interface AuditGridProps {
  criteria: CriteriaResult[];
}

const statusConfig: Record<CriteriaStatus, { icon: typeof CheckCircle2; color: string; bg: string; label: string }> = {
  pass: { icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50 border-green-200', label: 'OK' },
  partial: { icon: AlertTriangle, color: 'text-yellow-600', bg: 'bg-yellow-50 border-yellow-200', label: 'Partiel' },
  fail: { icon: XCircle, color: 'text-red-500', bg: 'bg-red-50 border-red-200', label: 'Échec' },
  unknown: { icon: HelpCircle, color: 'text-warm-400', bg: 'bg-warm-50 border-warm-200', label: 'Non vérifié' },
};

export default function AuditGrid({ criteria }: AuditGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {criteria.map(c => {
        const config = statusConfig[c.status];
        const Icon = config.icon;
        return (
          <div
            key={c.key}
            className={`rounded-xl border p-4 ${config.bg} transition-all hover:shadow-soft`}
          >
            <div className="flex items-start gap-3">
              <Icon className={`w-6 h-6 shrink-0 mt-0.5 ${config.color}`} />
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-warm-800 text-sm">{c.label}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${config.color} ${config.bg}`}>
                    {config.label}
                  </span>
                </div>
                <p className="text-xs text-warm-600 leading-relaxed">{c.detail}</p>
                <div className="mt-2 flex items-center gap-1">
                  <span className="text-[10px] text-warm-400 font-medium">Poids : {c.weight}%</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
