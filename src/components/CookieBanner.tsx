'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const COOKIE_CONSENT_KEY = 'siva_cookie_consent';

type ConsentState = 'undecided' | 'accepted' | 'rejected';

export default function CookieBanner() {
  const [consent, setConsent] = useState<ConsentState>('accepted');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (stored === 'accepted' || stored === 'rejected') {
      setConsent(stored);
    } else {
      setConsent('undecided');
    }
    setMounted(true);
  }, []);

  function accept() {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    setConsent('accepted');
  }

  function reject() {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'rejected');
    setConsent('rejected');
  }

  if (!mounted || consent !== 'undecided') return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 w-[calc(100%-2rem)] max-w-sm animate-in slide-in-from-bottom-4 fade-in duration-500">
      <div className="rounded-2xl border border-warm-200 bg-white p-5 shadow-xl shadow-warm-900/10">
        <p className="text-sm font-semibold text-warm-900">
          Ce site utilise des cookies
        </p>
        <p className="mt-1.5 text-xs leading-relaxed text-warm-500">
          Nous utilisons des cookies pour améliorer votre expérience et analyser le trafic.
          Consultez notre{' '}
          <Link href="/cookies" className="text-accent-dark underline underline-offset-2 hover:text-accent">
            politique de cookies
          </Link>{' '}
          pour en savoir plus.
        </p>
        <div className="mt-4 flex items-center gap-2.5">
          <button
            onClick={accept}
            className="rounded-lg bg-warm-900 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-warm-800"
          >
            Accepter
          </button>
          <button
            onClick={reject}
            className="rounded-lg border border-warm-200 bg-white px-4 py-2 text-xs font-semibold text-warm-600 transition-colors hover:bg-warm-50 hover:text-warm-900"
          >
            Refuser
          </button>
        </div>
      </div>
    </div>
  );
}
