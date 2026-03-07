'use client';

import { useEffect, useState } from 'react';

interface ScoreGaugeProps {
  score: number;
  size?: number;
  strokeWidth?: number;
}

function getScoreColor(score: number): string {
  if (score >= 80) return '#2D8B57';
  if (score >= 60) return '#4A9B6B';
  if (score >= 40) return '#D49530';
  if (score >= 20) return '#D97A3E';
  return '#C94432';
}

function getScoreLabel(score: number): string {
  if (score >= 80) return 'Excellent';
  if (score >= 60) return 'Bon';
  if (score >= 40) return 'À améliorer';
  if (score >= 20) return 'Faible';
  return 'Critique';
}

export default function ScoreGauge({ score, size = 200, strokeWidth = 10 }: ScoreGaugeProps) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  useEffect(() => {
    const duration = 1500;
    const startTime = Date.now();
    function animate() {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedScore(Math.round(eased * score));
      if (progress < 1) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }, [score]);

  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;
  const color = getScoreColor(score);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="#F0EBE3"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-100"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-semibold tracking-tight" style={{ color }}>
            {animatedScore}
          </span>
          <span className="text-sm text-warm-400 font-medium">/100</span>
        </div>
      </div>
      <span
        className="text-xs font-semibold uppercase tracking-wider px-4 py-1.5 rounded-full"
        style={{ backgroundColor: color + '12', color }}
      >
        {getScoreLabel(score)}
      </span>
    </div>
  );
}
