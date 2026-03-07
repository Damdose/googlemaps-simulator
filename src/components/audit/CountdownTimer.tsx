'use client';

import { useEffect, useState } from 'react';
import { RiTimeLine } from 'react-icons/ri';

interface CountdownTimerProps {
  durationMinutes?: number;
}

export default function CountdownTimer({ durationMinutes = 20 }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    const storageKey = 'audit_offer_start';
    let startTime = parseInt(localStorage.getItem(storageKey) ?? '0', 10);

    if (!startTime) {
      startTime = Date.now();
      localStorage.setItem(storageKey, String(startTime));
    }

    const endTime = startTime + durationMinutes * 60 * 1000;

    function tick() {
      const remaining = Math.max(0, endTime - Date.now());
      setTimeLeft(remaining);
    }

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [durationMinutes]);

  if (timeLeft === null) return null;

  const minutes = Math.floor(timeLeft / 60000);
  const seconds = Math.floor((timeLeft % 60000) / 1000);
  const isExpired = timeLeft <= 0;

  if (isExpired) return null;

  return (
    <div className="inline-flex items-center gap-1.5 text-sm font-medium bg-accent/20 text-accent-dark px-3 py-1 rounded-full">
      <RiTimeLine className="w-3.5 h-3.5" />
      <span className="font-semibold tabular-nums">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
    </div>
  );
}
