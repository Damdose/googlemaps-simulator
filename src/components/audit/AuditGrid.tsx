'use client';

import { CriteriaResult, CriteriaStatus } from '@/lib/types';

const statusConfig: Record<CriteriaStatus, { color: string; bg: string; border: string; label: string; dotColor: string }> = {
  pass: { color: 'text-positive', bg: 'bg-positive/5', border: 'border-positive/10', label: 'OK', dotColor: '#2D8B57' },
  partial: { color: 'text-warning', bg: 'bg-warning/5', border: 'border-warning/10', label: 'Partiel', dotColor: '#D49530' },
  fail: { color: 'text-critical', bg: 'bg-critical/5', border: 'border-critical/10', label: 'Échec', dotColor: '#C94432' },
  unknown: { color: 'text-warm-400', bg: 'bg-warm-50', border: 'border-warm-100', label: 'Non vérifié', dotColor: '#B5A899' },
};

interface AuditGridProps {
  criteria: CriteriaResult[];
}

export default function AuditGrid({ criteria }: AuditGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {criteria.map(c => {
        const config = statusConfig[c.status];
        return (
          <div
            key={c.key}
            className={`rounded-2xl border p-5 ${config.bg} ${config.border} transition-all duration-200 hover:shadow-soft hover:-translate-y-0.5`}
          >
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: config.dotColor + '15' }}>
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: config.dotColor }} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <h3 className="font-semibold text-warm-900 text-sm">{c.label}</h3>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wide ${config.color} ${config.bg}`}>
                    {config.label}
                  </span>
                </div>
                <p className="text-xs text-warm-500 leading-relaxed">{c.detail}</p>
                <div className="mt-2.5 flex items-center gap-1.5">
                  <div className="flex-1 h-1.5 bg-warm-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${c.weight}%`,
                        backgroundColor: config.dotColor,
                      }}
                    />
                  </div>
                  <span className="text-[10px] text-warm-400 font-medium">{c.weight}%</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
