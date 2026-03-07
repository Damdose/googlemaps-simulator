'use client';

import { useEffect, useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { X, MapPin, Sparkle, ChartBar, NavigationArrow } from '@phosphor-icons/react';

const STORAGE_KEY = 'siva_exit_popup_shown';
const AUDIT_PATHS = ['/audit', '/audit-gratuit'];

function MapIllustration() {
  return (
    <div className="relative mx-auto h-44 w-full max-w-xs overflow-hidden rounded-2xl bg-gradient-to-br from-warm-100 via-warm-50 to-white">
      {/* Grid lines */}
      <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="exit-grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="rgba(209,199,186,0.4)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#exit-grid)" />
      </svg>

      {/* Roads */}
      <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-warm-300/60" />
      <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-warm-300/60" />
      <div className="absolute left-[25%] top-0 h-full w-px rotate-12 bg-warm-200/40" />
      <div className="absolute left-0 top-[35%] h-px w-full -rotate-6 bg-warm-200/40" />

      {/* Heatmap zones */}
      <div className="absolute left-[30%] top-[25%] h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-positive/15 blur-md" />
      <div className="absolute left-[60%] top-[45%] h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-md" />
      <div className="absolute left-[75%] top-[30%] h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-critical/15 blur-md" />

      {/* Pin markers */}
      <div className="absolute left-[30%] top-[25%] -translate-x-1/2 -translate-y-1/2">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-positive text-white shadow-md">
          <span className="text-[10px] font-bold">1</span>
        </div>
        <div className="mx-auto h-1.5 w-1.5 -translate-y-0.5 rounded-full bg-positive/40" />
      </div>

      <div className="absolute left-[60%] top-[45%] -translate-x-1/2 -translate-y-1/2">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-dark text-white shadow-md">
          <span className="text-[10px] font-bold">5</span>
        </div>
        <div className="mx-auto h-1.5 w-1.5 -translate-y-0.5 rounded-full bg-accent-dark/40" />
      </div>

      <div className="absolute left-[75%] top-[30%] -translate-x-1/2 -translate-y-1/2">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-critical text-white shadow-md">
          <span className="text-[10px] font-bold">12</span>
        </div>
        <div className="mx-auto h-1.5 w-1.5 -translate-y-0.5 rounded-full bg-critical/40" />
      </div>

      <div className="absolute left-[45%] top-[65%] -translate-x-1/2 -translate-y-1/2">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-warning text-white shadow-md">
          <span className="text-[10px] font-bold">8</span>
        </div>
        <div className="mx-auto h-1.5 w-1.5 -translate-y-0.5 rounded-full bg-warning/40" />
      </div>

      {/* Cursor / navigation arrow */}
      <div className="absolute bottom-4 right-5 animate-float">
        <NavigationArrow weight="fill" className="h-5 w-5 -rotate-12 text-warm-900" />
      </div>

      {/* Pulsing ring */}
      <div className="absolute left-[60%] top-[45%] -translate-x-1/2 -translate-y-1/2">
        <div className="h-10 w-10 animate-ping rounded-full bg-accent/20" style={{ animationDuration: '2.5s' }} />
      </div>

      {/* Subtle gradient overlay at edges */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-warm-200/50" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white/80 to-transparent" />
    </div>
  );
}

export default function ExitIntentPopup() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  const isAuditPage = AUDIT_PATHS.some((p) => pathname.startsWith(p));

  const show = useCallback(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    sessionStorage.setItem(STORAGE_KEY, '1');
    setVisible(true);
  }, []);

  useEffect(() => {
    if (isAuditPage) return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    let armed = false;
    const armTimer = setTimeout(() => {
      armed = true;
    }, 5000);

    const handleMouseLeave = (e: MouseEvent) => {
      if (!armed) return;
      if (e.clientY <= 0) show();
    };

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearTimeout(armTimer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isAuditPage, show]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      onClick={() => setVisible(false)}
    >
      <div className="absolute inset-0 bg-warm-900/60 backdrop-blur-sm animate-fade-in" />

      <div
        className="relative z-10 w-full max-w-md animate-slide-up overflow-hidden rounded-3xl border border-warm-200 bg-white shadow-elevated"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setVisible(false)}
          className="absolute right-3 top-3 z-20 rounded-full bg-white/80 p-1.5 text-warm-400 backdrop-blur-sm transition-colors hover:bg-warm-100 hover:text-warm-700"
          aria-label="Fermer"
        >
          <X weight="bold" className="h-5 w-5" />
        </button>

        {/* Map illustration */}
        <div className="px-6 pt-6 sm:px-8 sm:pt-8">
          <MapIllustration />
        </div>

        {/* Content */}
        <div className="px-6 pb-7 pt-5 sm:px-8 sm:pb-8">
          <h2 className="text-center text-heading-xl text-warm-900 sm:text-display">
            Attendez, ne partez pas{' '}
            <span className="serif-accent">les mains vides</span>
          </h2>

          <p className="mx-auto mt-2.5 max-w-sm text-center text-body-sm text-warm-500">
            Découvrez gratuitement pourquoi vos concurrents vous dépassent sur Google Maps.
          </p>

          <div className="mt-5 flex items-center justify-center gap-6 text-xs text-warm-500">
            <span className="flex items-center gap-1.5">
              <Sparkle weight="fill" className="h-3.5 w-3.5 text-accent-dark" />
              Score sur 100
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin weight="fill" className="h-3.5 w-3.5 text-accent-dark" />
              Heatmap locale
            </span>
            <span className="flex items-center gap-1.5">
              <ChartBar weight="fill" className="h-3.5 w-3.5 text-accent-dark" />
              Analyse IA
            </span>
          </div>

          <div className="mt-6 flex flex-col items-center gap-3">
            <Link
              href="/audit-gratuit"
              className="btn-primary btn-hero w-full max-w-xs justify-center text-center"
              onClick={() => setVisible(false)}
            >
              Lancer mon audit gratuit
            </Link>
            <button
              onClick={() => setVisible(false)}
              className="text-xs text-warm-400 transition-colors hover:text-warm-600"
            >
              Non merci, je continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
