'use client';

import { useRef } from 'react';
import Image from 'next/image';
import {
  RiArrowLeftLine,
  RiCalendarScheduleFill,
  RiCheckboxCircleFill,
  RiTimeLine,
  RiGiftFill,
  RiShieldCheckFill,
  RiStarFill,
  RiFlashlightFill,
} from 'react-icons/ri';
import Script from 'next/script';
import { motion, useInView } from 'framer-motion';

const TESTIMONIALS = [
  {
    name: 'Marie L.',
    role: 'Directrice de boulangerie',
    avatar: 'https://i.pravatar.cc/80?img=47',
    text: 'En 30 minutes, Damien a mis le doigt sur exactement pourquoi mes concurrents m\'apparaissaient avant moi. Le plan d\'action était clair et actionnable dès le lendemain.',
    stars: 5,
  },
  {
    name: 'Thomas G.',
    role: 'Gérant en plomberie',
    avatar: 'https://i.pravatar.cc/80?img=12',
    text: 'Je ne savais même pas que ma fiche Google avait autant de lacunes. Après l\'audit, j\'ai mis en place les recommandations et mes appels entrants ont doublé en 6 semaines.',
    stars: 5,
  },
  {
    name: 'Sophie M.',
    role: 'Fondatrice d\'institut de beauté',
    avatar: 'https://i.pravatar.cc/80?img=44',
    text: 'Un audit vraiment sérieux et sans blabla commercial. La heatmap m\'a montré visuellement les zones où je n\'existais pas. Très utile et 100% gratuit comme promis.',
    stars: 5,
  },
  {
    name: 'David R.',
    role: 'Gérant d\'entreprise de déménagement',
    avatar: 'https://i.pravatar.cc/80?img=33',
    text: 'Ce qui m\'a convaincu c\'est la transparence : on m\'a montré exactement où j\'étais et où étaient mes concurrents sur la carte. Maintenant je sais sur quoi concentrer mes efforts.',
    stars: 5,
  },
];

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

export default function RendezVousPage() {
  return (
    <>
      <main>
        {/* ═══════════════════════ HERO ═══════════════════════ */}
        <section className="relative overflow-hidden px-4 sm:px-6 pb-12 sm:pb-16 md:pb-24 pt-8 sm:pt-12 md:pt-16">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="hero-dot-grid absolute inset-0" />
            <div className="hero-glow" />
          </div>

          <div className="mx-auto max-w-7xl">
            <a
              href="/"
              className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-warm-500 transition-colors hover:text-warm-900"
            >
              <RiArrowLeftLine className="h-4 w-4" />
              Retour à l&apos;accueil
            </a>

            <div className="grid items-start gap-6 sm:gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
              {/* Left column - Copy */}
              <div>
                <Reveal>
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-light px-4 py-2 text-sm font-semibold text-accent-dark">
                    <RiGiftFill className="h-4 w-4" />
                    Audit 100% gratuit · Sans engagement
                  </div>
                </Reveal>

                <Reveal delay={0.06}>
                  <h1 className="text-heading-xl text-warm-900 sm:text-display">
                    Découvrez pourquoi vos concurrents vous{' '}
                    <span className="serif-accent">dépassent</span> sur Google Maps.
                  </h1>
                </Reveal>

                <Reveal delay={0.12}>
                  <p className="mt-5 text-body-sm sm:text-body-lg text-warm-600">
                    Réservez 30 minutes avec un expert SEO local. On analyse votre visibilité,
                    on identifie vos opportunités et on vous livre un plan d&apos;action concret
                    — gratuitement.
                  </p>
                </Reveal>

                <Reveal delay={0.18}>
                  <div className="mt-8 space-y-3">
                    {[
                      'Analyse complète de votre fiche Google',
                      'Heatmap de vos positions par zone',
                      'Benchmark de vos 3 concurrents directs',
                      'Recommandations personnalisées & priorisées',
                      'Estimation du trafic que vous perdez',
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <RiCheckboxCircleFill className="mt-0.5 h-5 w-5 shrink-0 text-positive" />
                        <span className="text-warm-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </Reveal>

                <Reveal delay={0.24}>
                  <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-warm-500">
                    <span className="inline-flex items-center gap-1.5">
                      <RiTimeLine className="h-4 w-4 text-warm-400" />
                      30 min
                    </span>
                    <span className="h-1 w-1 rounded-full bg-warm-300" />
                    <span className="inline-flex items-center gap-1.5">
                      <RiShieldCheckFill className="h-4 w-4 text-warm-400" />
                      Zéro engagement
                    </span>
                    <span className="h-1 w-1 rounded-full bg-warm-300" />
                    <span className="inline-flex items-center gap-1.5">
                      <RiFlashlightFill className="h-4 w-4 text-warm-400" />
                      En visio ou téléphone
                    </span>
                  </div>
                </Reveal>

                {/* Social proof */}
                <Reveal delay={0.3}>
                  <div className="mt-10 flex items-center gap-4 rounded-2xl border border-warm-200 bg-white p-4 shadow-soft">
                    <div className="flex -space-x-2">
                      {TESTIMONIALS.slice(0, 4).map((t, i) => (
                        <div
                          key={t.name}
                          className="relative h-9 w-9 overflow-hidden rounded-full border-2 border-white"
                          style={{ zIndex: 4 - i }}
                        >
                          <Image
                            src={t.avatar}
                            alt={t.name}
                            fill
                            className="object-cover"
                            sizes="36px"
                          />
                        </div>
                      ))}
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <RiStarFill key={i} className="h-3.5 w-3.5 fill-accent text-accent" />
                        ))}
                        <span className="ml-1 text-sm font-semibold text-warm-800">4.9/5</span>
                      </div>
                      <p className="text-xs text-warm-500">
                        +1 000 entreprises ont déjà fait leur audit
                      </p>
                    </div>
                  </div>
                </Reveal>
              </div>

              {/* Right column - Calendly */}
              <Reveal delay={0.15}>
                <div className="overflow-hidden rounded-2xl sm:rounded-3xl border border-warm-200 bg-white shadow-elevated">
                  <div className="border-b border-warm-100 bg-warm-50 px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-warm-900 text-white">
                        <RiCalendarScheduleFill className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-warm-900">Appel audit gratuit</p>
                        <p className="text-sm text-warm-500">Choisissez le créneau qui vous arrange</p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="calendly-inline-widget"
                    data-url="https://calendly.com/damien-tamazout/call-decouverte?hide_gdpr_banner=1&hide_event_type_details=1"
                    style={{ minWidth: '320px', height: '680px' }}
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ═══════════════════════ TESTIMONIALS ═══════════════════════ */}
        <section className="border-t border-warm-200 bg-warm-50 px-4 sm:px-6 py-14 sm:py-20">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <div className="mb-10 text-center">
                <p className="text-sm font-semibold uppercase tracking-widest text-accent">Témoignages</p>
                <h2 className="mt-2 text-heading-lg text-warm-900">
                  Ce que disent nos clients
                </h2>
              </div>
            </Reveal>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {TESTIMONIALS.map((t, i) => (
                <Reveal key={t.name} delay={i * 0.08}>
                  <div className="flex h-full flex-col rounded-2xl border border-warm-200 bg-white p-6 shadow-soft">
                    <div className="mb-4 flex items-center gap-1">
                      {Array.from({ length: t.stars }).map((_, s) => (
                        <RiStarFill key={s} className="h-4 w-4 text-accent" />
                      ))}
                    </div>
                    <p className="flex-1 text-sm leading-relaxed text-warm-700">
                      &ldquo;{t.text}&rdquo;
                    </p>
                    <div className="mt-5 flex items-center gap-3">
                      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-warm-200">
                        <Image
                          src={t.avatar}
                          alt={t.name}
                          fill
                          className="object-cover"
                          sizes="40px"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-warm-900">{t.name}</p>
                        <p className="text-xs text-warm-500">{t.role}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

      </main>

      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />

      <style jsx global>{`
        .calendly-inline-widget iframe {
          border-radius: 0 0 24px 24px;
        }
      `}</style>
    </>
  );
}
