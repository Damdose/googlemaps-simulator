'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import {
  ChartBar,
  CheckCircle,
  ChatCenteredDots,
  Lightning,
  Megaphone,
  NotePencil,
  SealCheck,
  ShieldCheck,
  Target,
  TrendUp,
  Users,
} from '@phosphor-icons/react';

const PRICING_PLANS = [
  {
    Icon: ChartBar,
    tag: 'Gratuit',
    title: 'Audit Gratuit',
    price: 'Gratuit',
    priceSuffix: '',
    promise: 'Découvrez votre score d\'optimisation, vos positions et vos axes d\'amélioration.',
    features: [
      'Score d\'optimisation sur 100',
      'Heatmap de vos positions locales',
      'Analyse de vos 3 concurrents principaux',
      'Recommandations IA personnalisées',
      'Résultat immédiat, sans engagement',
    ],
    cta: 'Lancer l\'audit',
    ctaHref: '/audit-gratuit',
    highlighted: false,
    badge: '100% gratuit',
  },
  {
    Icon: NotePencil,
    tag: 'One-shot',
    title: 'Optimisation Fiche Google',
    price: '500€',
    priceSuffix: '',
    promise: 'Une fiche Google 100% optimisée qui convertit les recherches en clients.',
    features: [
      'Audit complet de la fiche existante',
      'Optimisation catégories, attributs, description',
      'Upload et structuration des photos',
      'Setup Q&A, produits/services, horaires',
      'Publication des premiers posts Google',
      'Cohérence NAP sur les annuaires principaux',
    ],
    cta: 'Prendre rendez-vous',
    ctaHref: '/rendez-vous',
    highlighted: true,
    badge: 'Populaire',
  },
  {
    Icon: SealCheck,
    tag: 'Sélectif',
    title: 'Boost Avis Expérience',
    price: 'Sur devis',
    priceSuffix: '',
    promise: 'De vrais clients, de vraies visites, de vrais avis Google.',
    features: [
      'Des étudiants visitent votre établissement',
      'Ils vivent une expérience réelle (repas, soin, service…)',
      'Ils laissent un avis Google authentique et détaillé',
      '100% conforme aux CGU Google',
    ],
    cta: 'Candidater',
    ctaHref: '/rendez-vous',
    highlighted: false,
    badge: 'Candidature requise',
  },
  {
    Icon: Megaphone,
    tag: 'Récurrent',
    title: 'Google Ads Local',
    price: '400€',
    priceSuffix: '/mois + budget pub',
    promise: 'Des appels et des visites qualifiés, pas juste des clics.',
    features: [
      'Création et gestion des campagnes Search local',
      'Setup Local Service Ads (LSA) si éligible',
      'Tracking appels, formulaires, visites',
      'Reporting mensuel coût par lead',
      'Optimisation continue enchères et ciblage',
    ],
    cta: 'Prendre rendez-vous',
    ctaHref: '/rendez-vous',
    highlighted: false,
    badge: null,
  },
];

const VALUE_PROPS = [
  {
    Icon: Target,
    sticker: '',
    title: 'Reflétez votre ambition locale',
    description:
      'Démarquez-vous de la concurrence et affirmez votre présence avec une fiche Google optimisée à la hauteur de votre business.',
  },
  {
    Icon: TrendUp,
    sticker: '📈',
    title: 'Boostez votre trafic local',
    description:
      'Placez votre fiche en pole position sur Google Maps grâce à notre expertise SEO local. On ne laisse rien au hasard.',
  },
  {
    Icon: Users,
    sticker: '',
    title: 'Transformez votre trafic en clients',
    description:
      'Faites de chaque recherche locale une opportunité. Votre fiche est conçue pour convertir les recherches en appels et visites.',
  },
  {
    Icon: ShieldCheck,
    sticker: '',
    title: 'Mesurez vos résultats',
    description:
      'Un reporting clair, des KPI lisibles, et des arbitrages orientés business au lieu de vanity metrics.',
  },
  {
    Icon: ChatCenteredDots,
    sticker: '⭐',
    title: 'Construisez votre réputation',
    description:
      'Mise en place d\'un système continu pour collecter plus d\'avis qualifiés et augmenter le taux de conversion.',
  },
  {
    Icon: Lightning,
    sticker: '🚀',
    title: 'Reprenez le contrôle',
    description:
      'Déployez votre stratégie locale librement grâce à notre accompagnement et un tableau de bord en temps réel.',
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

export default function ServicesPage() {
  return (
    <main>
      {/* Hero */}
      <section className="px-4 sm:px-6 pb-6 sm:pb-8 pt-10 sm:pt-16 md:pt-20">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <p className="section-label mb-4 justify-center">Nos services</p>
            <h1 className="text-balance text-heading-xl sm:text-display text-warm-900">
              Tout ce qu&apos;il faut pour dominer{' '}
              <span className="serif-accent">Google Maps.</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-body-sm sm:text-body-lg text-warm-500">
              Des offres claires, des résultats concrets. Pas de frais cachés, pas de surprise.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Pricing */}
      <section className="px-4 sm:px-6 py-10 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 md:grid-cols-2 lg:items-center">
            {PRICING_PLANS.map((plan, i) => (
              <Reveal key={plan.title} delay={i * 0.12}>
                <div className={`group relative flex h-full flex-col overflow-hidden rounded-2xl sm:rounded-[2rem] transition-all duration-500 hover:-translate-y-2 ${plan.highlighted ? 'border-2 border-accent/30 bg-white shadow-[0_8px_60px_rgba(240,199,94,0.12)]' : 'border border-warm-200 bg-white shadow-soft hover:shadow-card'}`}>
                  {plan.highlighted && (
                    <div className="absolute inset-0 rounded-2xl sm:rounded-[2rem] bg-gradient-to-b from-accent/[0.04] to-transparent" />
                  )}
                  {plan.badge && (
                    <div className={`absolute right-6 top-6 z-10 rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] ${plan.highlighted ? 'bg-accent text-warm-900 shadow-lg shadow-accent/25' : 'border border-warm-200 bg-warm-50 text-warm-500'}`}>
                      {plan.badge}
                    </div>
                  )}
                  <div className="relative p-5 pb-4 sm:p-9 sm:pb-7">
                    <div className="mb-7 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-warm-100 text-warm-700">
                      <plan.Icon weight="bold" className="h-6 w-6" />
                    </div>
                    <span className="mb-2.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-warm-400">
                      {plan.tag}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-warm-900">{plan.title}</h3>
                    <div className="mt-6">
                      {plan.price === 'Sur devis' ? (
                        <span className="text-[2rem] sm:text-[2.75rem] font-extrabold leading-none tracking-tight text-warm-900">Sur devis</span>
                      ) : (
                        <>
                          <span className="mb-1 block text-xs font-medium text-warm-400">À partir de</span>
                          <div className="flex items-baseline gap-2">
                            <span className="text-[2rem] sm:text-[2.75rem] font-extrabold leading-none tracking-tight text-warm-900">{plan.price}</span>
                            {plan.priceSuffix && (
                              <span className="text-sm font-medium text-warm-500">{plan.priceSuffix}</span>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                    <p className="mt-4 text-[15px] leading-relaxed text-warm-600">{plan.promise}</p>
                  </div>
                  <div className="relative flex flex-1 flex-col px-5 pb-5 sm:px-9 sm:pb-9">
                    <div className="mb-7 h-px bg-warm-200/60" />
                    <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.2em] text-warm-400">
                      Ce qu&apos;on fait
                    </p>
                    <ul className="flex-1 space-y-4">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-xs sm:text-[15px] text-warm-700">
                          <CheckCircle weight="fill" className="mt-0.5 h-[18px] w-[18px] shrink-0 text-accent-dark" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={plan.ctaHref}
                      className={`mt-9 w-full ${plan.highlighted ? 'btn-accent' : 'btn-primary'}`}
                    >
                      {plan.cta}
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="px-4 sm:px-6 py-14 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-10 sm:mb-16 max-w-3xl">
            <h2 className="text-balance text-heading-xl text-warm-900 sm:text-display">
              Pourquoi choisir <span className="serif-accent">Siva</span> ?
            </h2>
            <p className="mt-4 text-body-sm sm:text-body-lg text-warm-500">
              Votre visibilité locale au service de vos enjeux business.
            </p>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {VALUE_PROPS.map((prop, i) => (
              <Reveal key={prop.title} delay={i * 0.06}>
                <div className="card-hover group relative h-full">
                  {prop.sticker && (
                    <span className="absolute -right-3 -top-3 text-5xl opacity-0 transition-all group-hover:opacity-100 group-hover:-translate-y-1">
                      {prop.sticker}
                    </span>
                  )}
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-warm-100 text-warm-700">
                    <prop.Icon weight="bold" className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-medium text-warm-900">{prop.title}</h3>
                  <p className="mt-3 text-body-sm leading-relaxed text-warm-500">{prop.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-t-[1.5rem] sm:rounded-t-[2.5rem] bg-warm-900 px-4 sm:px-6 py-14 sm:py-20 text-white">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-heading-xl text-white sm:text-display">
              Prêt à <span className="serif-accent text-accent">passer à l&apos;action</span> ?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-body-sm sm:text-body-lg text-white/60">
              Commencez par un audit gratuit ou prenez rendez-vous avec un expert.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/rendez-vous" className="btn-accent">
                Prendre rendez-vous
              </Link>
              <Link href="/audit-gratuit" className="btn-secondary !bg-white/10 !border-white/20 !text-white hover:!bg-white/20">
                Lancer l&apos;audit gratuit
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
