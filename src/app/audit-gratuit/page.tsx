'use client';

import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import {
  CheckCircle,
  Clock,
  Sparkle,
} from '@phosphor-icons/react';
import PlaceSearchInput from '@/components/audit/PlaceSearchInput';
import { PlaceResult } from '@/lib/types';

function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function AuditGratuitPage() {
  const router = useRouter();

  function handlePlaceSelect(place: PlaceResult) {
    const params = new URLSearchParams({
      place_id: place.placeId,
      name: place.name,
      address: place.address,
      lat: String(place.lat),
      lng: String(place.lng),
      type: place.primaryType,
      type_name: place.primaryTypeDisplayName,
    });
    router.push(`/audit/configure?${params.toString()}`);
  }

  return (
    <main>
      <section className="relative overflow-hidden px-4 sm:px-6 pb-12 sm:pb-16 md:pb-24 pt-10 sm:pt-16 md:pt-20">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="hero-dot-grid absolute inset-0" />
          <div className="hero-glow" />
        </div>

        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <div className="mb-4 sm:mb-6 inline-flex items-center gap-2 rounded-full border border-warm-200 bg-white px-5 py-2.5 text-sm font-semibold shadow-soft">
              <Sparkle weight="fill" className="h-4 w-4 text-accent-dark" />
              100% gratuit · Sans engagement
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="text-balance text-heading-xl text-warm-900 sm:text-display-lg md:text-display-xl">
              Auditez votre visibilité{' '}
              <span className="serif-accent serif-accent-animated">Google Maps</span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mx-auto mt-4 sm:mt-6 max-w-2xl text-body-sm sm:text-body-lg text-warm-600">
              Découvrez votre score d&apos;optimisation, visualisez vos positions sur une heatmap,
              analysez vos concurrents et recevez des recommandations IA personnalisées.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-4 sm:px-6 pb-14 sm:pb-24">
        <Reveal>
          <div className="mx-auto grid max-w-6xl gap-8 rounded-4xl border border-warm-200 bg-white p-5 sm:p-8 shadow-elevated lg:grid-cols-[1.2fr_1fr] lg:p-12">
            <div>
              <p className="section-label mb-4">Commencez votre audit</p>
              <h2 className="text-heading-xl text-warm-900">
                Vérifiez votre potentiel local en 30 secondes.
              </h2>
              <p className="mt-4 text-body text-warm-600">
                Entrez le nom de votre établissement et obtenez un diagnostic complet
                de votre visibilité sur Google Maps.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-warm-600">
                <li className="flex items-center gap-2">
                  <CheckCircle weight="fill" className="h-4 w-4 text-positive" /> Score d&apos;optimisation sur 100
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle weight="fill" className="h-4 w-4 text-positive" /> Heatmap de vos positions locales
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle weight="fill" className="h-4 w-4 text-positive" /> Analyse de vos 3 concurrents
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle weight="fill" className="h-4 w-4 text-positive" /> Recommandations IA personnalisées
                </li>
              </ul>
              <p className="mt-6 flex items-center gap-2 text-sm text-warm-500">
                <Clock weight="bold" className="h-4 w-4 text-warm-400" />
                Gratuit, sans carte bancaire, résultat immédiat.
              </p>
            </div>

            <div className="flex flex-col justify-center rounded-2xl sm:rounded-3xl border border-warm-200 bg-warm-50 p-6">
              <p className="mb-4 text-lg font-semibold text-warm-900">Cherchez votre établissement</p>
              <PlaceSearchInput onSelect={handlePlaceSelect} />
              <p className="mt-3 text-xs text-warm-400">
                Tapez le nom de votre commerce, restaurant, cabinet...
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="rounded-t-[1.5rem] sm:rounded-t-[2.5rem] bg-warm-900 px-4 sm:px-6 py-14 sm:py-20 text-white">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-heading-xl text-white">
              Vous préférez qu&apos;on le fasse ensemble ?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-body-sm sm:text-body-lg text-white/60">
              Prenez rendez-vous avec un expert SEO local pour un audit approfondi de 30 minutes.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/rendez-vous" className="btn-accent">
                Prendre rendez-vous
              </Link>
              <a href="tel:+33760554000" className="btn-secondary !bg-white/10 !border-white/20 !text-white hover:!bg-white/20">
                Nous appeler
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
