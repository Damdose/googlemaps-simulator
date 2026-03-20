'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import {
  CheckCircle,
  ArrowRight,
  CaretDown,
  Star,
} from '@phosphor-icons/react';
import FreehandIcon from '@/components/FreehandIcon';

const SERVICES = [
  {
    id: 'audit-gratuit',
    icon: 'chart-bar' as const,
    tag: 'Gratuit',
    title: 'Audit Gratuit',
    headline: 'Découvrez où vous en êtes sur Google Maps.',
    description:
      'En 30 secondes, obtenez un diagnostic complet de votre visibilité locale : score d\'optimisation, positions sur la carte, analyse concurrentielle et recommandations IA personnalisées.',
    price: 'Gratuit',
    priceSuffix: '',
    features: [
      'Score d\'optimisation sur 100',
      'Heatmap de vos positions locales',
      'Analyse de vos 3 concurrents principaux',
      'Recommandations IA personnalisées',
      'Estimation de revenus manqués',
      'Analyse de visibilité IA (ChatGPT, Gemini)',
    ],
    stats: [
      { value: '30s', label: 'Pour obtenir votre rapport' },
      { value: '15+', label: 'Métriques analysées' },
      { value: '3', label: 'Concurrents identifiés' },
    ],
    cta: 'Lancer l\'audit',
    ctaHref: '/audit-gratuit',
    detailHref: '/services/audit-gratuit',
    highlighted: false,
    badge: '100% gratuit',
    accentColor: 'bg-positive/10 text-positive',
    accentBorder: 'border-positive/20',
  },
  {
    id: 'optimisation-fiche-google',
    icon: 'pencil' as const,
    tag: 'One-shot · 500€',
    title: 'Optimisation Fiche Google',
    headline: 'Une fiche qui convertit les recherches en clients.',
    description:
      'On passe votre fiche Google au peigne fin et on optimise chaque détail : catégories, description SEO, photos, Q&A, posts. Livrée en 5 jours avec un rapport complet.',
    price: '500€',
    priceSuffix: '',
    features: [
      'Audit complet de la fiche existante',
      'Optimisation catégories, attributs, description SEO',
      'Upload et structuration des photos',
      'Setup Q&A, produits/services, horaires',
      'Publication des premiers posts Google',
      'Cohérence NAP sur les annuaires principaux',
    ],
    stats: [
      { value: '92/100', label: 'Score moyen post-opti' },
      { value: '5 jours', label: 'Délai de livraison' },
      { value: '+70%', label: 'de visibilité en moy.' },
    ],
    cta: 'Prendre rendez-vous',
    ctaHref: '/rendez-vous',
    detailHref: '/services/optimisation-fiche-google',
    highlighted: true,
    badge: 'Populaire',
    accentColor: 'bg-accent/10 text-accent-dark',
    accentBorder: 'border-accent/20',
  },
  {
    id: 'boost-avis-experience',
    icon: 'check-badge' as const,
    tag: 'Sur devis',
    title: 'Boost Avis Expérience',
    headline: 'De vrais clients, de vrais avis Google.',
    description:
      'Des étudiants sélectionnés visitent votre établissement, vivent une expérience réelle et laissent un avis Google authentique et détaillé. 100% conforme aux CGU.',
    price: 'Sur devis',
    priceSuffix: '',
    features: [
      'Des étudiants visitent votre établissement',
      'Expérience réelle (repas, soin, service…)',
      'Avis Google authentique et détaillé',
      '100% conforme aux CGU Google',
      'Suivi et reporting des avis publiés',
      'Accompagnement pour répondre aux avis',
    ],
    stats: [
      { value: '+0.4', label: 'de note moyenne / mois' },
      { value: '24+', label: 'Avis publiés / mois' },
      { value: '100%', label: 'Conforme CGU Google' },
    ],
    cta: 'Candidater',
    ctaHref: '/rendez-vous',
    detailHref: '/services/boost-avis-experience',
    highlighted: false,
    badge: 'Candidature requise',
    accentColor: 'bg-warm-100 text-warm-700',
    accentBorder: 'border-warm-200',
  },
  {
    id: 'google-ads-local',
    icon: 'megaphone' as const,
    tag: 'Dès 400€/mois',
    title: 'Google Ads Local',
    headline: 'Des appels qualifiés, pas juste des clics.',
    description:
      'On gère vos campagnes Search locales et vos Local Service Ads pour transformer chaque euro de budget pub en clients réels. Reporting mensuel transparent.',
    price: '400€',
    priceSuffix: '/mois + budget pub',
    features: [
      'Création et gestion des campagnes Search local',
      'Setup Local Service Ads (LSA) si éligible',
      'Tracking appels, formulaires, visites',
      'Reporting mensuel coût par lead',
      'Optimisation continue enchères et ciblage',
      'Call de suivi mensuel avec votre account manager',
    ],
    stats: [
      { value: '4,20€', label: 'CPL moyen' },
      { value: '3,2x', label: 'ROI moyen à 90 jours' },
      { value: '96%', label: 'De clients reconduits' },
    ],
    cta: 'Prendre rendez-vous',
    ctaHref: '/rendez-vous',
    detailHref: '/services/google-ads-local',
    highlighted: false,
    badge: null,
    accentColor: 'bg-warm-100 text-warm-700',
    accentBorder: 'border-warm-200',
  },
];

const VALUE_PROPS = [
  {
    icon: 'target' as const,
    title: 'Reflétez votre ambition locale',
    description:
      'Démarquez-vous de la concurrence et affirmez votre présence avec une fiche Google optimisée à la hauteur de votre business.',
  },
  {
    icon: 'trend-up' as const,
    title: 'Boostez votre trafic local',
    description:
      'Placez votre fiche en pole position sur Google Maps grâce à notre expertise SEO local. On ne laisse rien au hasard.',
  },
  {
    icon: 'users' as const,
    title: 'Transformez votre trafic en clients',
    description:
      'Faites de chaque recherche locale une opportunité. Votre fiche est conçue pour convertir les recherches en appels et visites.',
  },
  {
    icon: 'shield' as const,
    title: 'Mesurez vos résultats',
    description:
      'Un reporting clair, des KPI lisibles, et des arbitrages orientés business au lieu de vanity metrics.',
  },
  {
    icon: 'chat' as const,
    title: 'Construisez votre réputation',
    description:
      'Mise en place d\'un système continu pour collecter plus d\'avis qualifiés et augmenter le taux de conversion.',
  },
  {
    icon: 'lightning' as const,
    title: 'Reprenez le contrôle',
    description:
      'Déployez votre stratégie locale librement grâce à notre accompagnement et un tableau de bord en temps réel.',
  },
];

const JOURNEY_STEPS = [
  {
    num: '01',
    icon: 'chart-bar' as const,
    title: 'Diagnostic',
    description: 'Lancez un audit gratuit pour comprendre votre situation actuelle sur Google Maps.',
    service: 'Audit Gratuit',
    href: '#audit-gratuit',
  },
  {
    num: '02',
    icon: 'pencil' as const,
    title: 'Optimisation',
    description: 'On optimise votre fiche Google pour qu\'elle convertisse les recherches en clients.',
    service: 'Optimisation Fiche',
    href: '#optimisation-fiche-google',
  },
  {
    num: '03',
    icon: 'check-badge' as const,
    title: 'Réputation',
    description: 'Des vrais clients visitent votre établissement et laissent des avis authentiques.',
    service: 'Boost Avis',
    href: '#boost-avis-experience',
  },
  {
    num: '04',
    icon: 'megaphone' as const,
    title: 'Acquisition',
    description: 'Des campagnes Ads locales qui génèrent des appels et des visites qualifiés.',
    service: 'Google Ads Local',
    href: '#google-ads-local',
  },
];

const CLIENT_LOGOS = [
  { name: 'Brand 05', logo: '/logos/brand-logo-05.svg' },
  { name: 'Brand 09', logo: '/logos/brand-logo-09.svg' },
  { name: 'Brand 06', logo: '/logos/brand-logo-06.svg' },
  { name: 'Invarion', logo: '/logos/invarion.svg' },
  { name: 'Baincroft', logo: '/logos/baincroft.svg' },
  { name: 'Vector', logo: '/logos/vector-1.svg' },
  { name: 'Givonni', logo: '/logos/givonni.svg' },
  { name: 'Morance', logo: '/logos/morance.svg' },
  { name: 'Eisner Sterling', logo: '/logos/eisnersterling.svg' },
  { name: 'Marcopierre', logo: '/logos/marcopierre.svg' },
  { name: 'Hermosa', logo: '/logos/hermosa.svg' },
];

const TESTIMONIALS_SERVICES = [
  {
    name: 'Sophie M.',
    role: 'Gérante de restaurant',
    company: 'Paris 11e',
    avatar: '👩🏻',
    text: 'Depuis l\'optimisation de notre fiche Google, on reçoit 3x plus d\'appels. Les clients nous trouvent facilement et les avis ont boosté notre crédibilité.',
    rating: 5,
  },
  {
    name: 'Thomas R.',
    role: 'Directeur d\'hôtel',
    company: 'Marseille',
    avatar: '👨🏽',
    text: 'L\'audit gratuit nous a ouvert les yeux sur tout ce qu\'on ratait. En 2 semaines après l\'optimisation, notre fiche est passée de la page 2 à la 1ère position.',
    rating: 5,
  },
  {
    name: 'Nadia K.',
    role: 'Fondatrice de studio bien-être',
    company: 'Lyon',
    avatar: '👩🏾',
    text: 'Le programme Boost Avis a transformé notre réputation en ligne. On est passé de 3.8 à 4.6 étoiles en 3 mois. Les nouveaux clients citent nos avis Google.',
    rating: 5,
  },
];

const FAQ_ITEMS_SERVICES = [
  {
    q: 'Combien de temps faut-il pour voir des résultats ?',
    a: 'L\'audit est instantané (30 secondes). L\'optimisation de fiche Google est livrée en 5 jours avec des premiers résultats visibles sous 1 à 2 semaines. Pour le Boost Avis, les premiers avis sont publiés dès le 1er mois. Les campagnes Ads génèrent des leads dès la première semaine.',
  },
  {
    q: 'Est-ce que l\'audit gratuit est vraiment sans engagement ?',
    a: 'Oui, 100% gratuit et sans engagement. Vous recevez un rapport complet avec votre score d\'optimisation, vos positions sur Google Maps, une analyse concurrentielle et des recommandations personnalisées. Aucune carte bancaire n\'est demandée.',
  },
  {
    q: 'Les avis du programme Boost sont-ils conformes aux CGU Google ?',
    a: 'Absolument. Nos ambassadeurs visitent réellement votre établissement, vivent une expérience authentique et rédigent un avis honnête et détaillé. C\'est 100% conforme aux conditions d\'utilisation de Google.',
  },
  {
    q: 'Puis-je combiner plusieurs services ?',
    a: 'Oui, et c\'est même recommandé. La plupart de nos clients commencent par l\'audit gratuit, enchaînent avec l\'optimisation de fiche, puis activent le Boost Avis ou les Google Ads selon leurs objectifs. Chaque offre s\'intègre dans une stratégie cohérente.',
  },
  {
    q: 'Y a-t-il un engagement de durée ?',
    a: 'L\'audit est sans engagement. L\'optimisation fiche est un one-shot (pas d\'abonnement). Le Boost Avis fonctionne sur candidature avec une période de test. Les Google Ads sont sans engagement, vous pouvez arrêter à tout moment.',
  },
  {
    q: 'Comment mesurez-vous les résultats ?',
    a: 'Chaque service inclut un reporting clair : score d\'optimisation avant/après, évolution des positions sur Google Maps, nombre d\'avis publiés, coût par lead pour les Ads. On suit des KPI business, pas des vanity metrics.',
  },
];

function Sticker({
  children,
  className = '',
  rotate = 0,
  float = true,
  floatDuration = 3,
  floatStyle = 'float',
}: {
  children: React.ReactNode;
  className?: string;
  rotate?: number;
  float?: boolean;
  floatDuration?: number;
  floatStyle?: 'float' | 'bob' | 'sway' | 'pulse';
}) {
  const floatAnimations = {
    float: { y: [0, -14, 0], x: [0, 6, 0] },
    bob: { y: [0, -8, 2, -8, 0], x: [0, -3, 0, 3, 0] },
    sway: { y: [0, -4, 0], x: [0, 10, 0, -10, 0], rotate: [rotate - 5, rotate + 5, rotate - 5] },
    pulse: { y: [0, -10, 0], scale: [1, 1.08, 1] },
  };

  const floatTransitions: Record<string, Record<string, unknown>> = {
    float: {
      y: { duration: floatDuration, repeat: Infinity, ease: 'easeInOut', delay: 0.6 },
      x: { duration: floatDuration * 1.4, repeat: Infinity, ease: 'easeInOut', delay: 0.8 },
    },
    bob: {
      y: { duration: floatDuration, repeat: Infinity, ease: 'easeInOut', delay: 0.6 },
      x: { duration: floatDuration * 1.6, repeat: Infinity, ease: 'easeInOut', delay: 0.7 },
    },
    sway: {
      y: { duration: floatDuration * 1.2, repeat: Infinity, ease: 'easeInOut', delay: 0.6 },
      x: { duration: floatDuration, repeat: Infinity, ease: 'easeInOut', delay: 0.6 },
      rotate: { duration: floatDuration * 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 },
    },
    pulse: {
      y: { duration: floatDuration, repeat: Infinity, ease: 'easeInOut', delay: 0.6 },
      scale: { duration: floatDuration * 1.3, repeat: Infinity, ease: 'easeInOut', delay: 0.6 },
    },
  };

  return (
    <motion.span
      className={`inline-block cursor-default select-none drop-shadow-lg ${className}`}
      initial={{ opacity: 0, scale: 0, rotate: rotate - 20 }}
      animate={{
        opacity: 1,
        scale: 1,
        rotate,
        ...(float ? floatAnimations[floatStyle] : {}),
      }}
      transition={{
        opacity: { type: 'spring', stiffness: 260, damping: 20, delay: 0.6 },
        scale: { type: 'spring', stiffness: 260, damping: 20, delay: 0.6 },
        rotate: { type: 'spring', stiffness: 260, damping: 20, delay: 0.6 },
        ...(float ? floatTransitions[floatStyle] : {}),
      }}
      whileHover={{ scale: 1.3, rotate: rotate + 10 }}
    >
      {children}
    </motion.span>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-warm-200/60 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-3 sm:gap-4 py-4 sm:py-6 text-left"
      >
        <span className="text-sm sm:text-[17px] font-semibold text-warm-900">{q}</span>
        <CaretDown
          weight="bold"
          className={`h-5 w-5 shrink-0 text-warm-400 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <p className="pb-4 sm:pb-6 text-body-sm leading-relaxed text-warm-500">{a}</p>
      </motion.div>
    </div>
  );
}

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
      {/* ── 1. Hero ── */}
      <section className="relative overflow-hidden px-4 sm:px-6 pb-6 sm:pb-8 pt-10 sm:pt-16 md:pt-20">
        <Sticker className="absolute left-[4%] top-[12%] text-4xl sm:text-5xl md:text-6xl lg:text-7xl hidden sm:inline-block" rotate={-12} floatDuration={3.2} floatStyle="float">🗺️</Sticker>
        <Sticker className="absolute right-[5%] top-[8%] text-4xl sm:text-5xl md:text-6xl lg:text-7xl hidden sm:inline-block" rotate={8} floatDuration={2.8} floatStyle="pulse">⭐</Sticker>
        <Sticker className="absolute right-[8%] bottom-[10%] text-4xl sm:text-5xl md:text-6xl lg:text-7xl hidden sm:inline-block" rotate={-8} floatDuration={3} floatStyle="sway">📈</Sticker>

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <Reveal>
            <p className="section-label mb-4 justify-center">Nos services</p>
            <h1 className="text-balance text-heading-xl sm:text-display text-warm-900">
              Tout ce qu&apos;il faut pour dominer{' '}
              <span className="serif-accent">Google Maps.</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-body-sm sm:text-body-lg text-warm-500">
              Des offres claires, des résultats concrets. Pas de frais cachés, pas de surprise.
              Choisissez le service adapté à vos enjeux.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── 2. Logo défilant ── */}
      <section className="overflow-hidden border-y border-warm-200 bg-white py-4 sm:py-6">
        <div className="logos-marquee flex items-center gap-12 sm:gap-16">
          {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((client, i) => (
            <div key={i} className="flex h-7 w-24 shrink-0 items-center justify-center sm:h-9 sm:w-32">
              <img
                src={client.logo}
                alt={client.name}
                className="max-h-full max-w-full object-contain opacity-40 grayscale transition-all hover:opacity-70 hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. Comment ça marche ── */}
      <section className="bg-warm-50 px-4 sm:px-6 py-10 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-10 sm:mb-14 text-center">
            <p className="section-label mb-4 justify-center">Comment ça marche</p>
            <h2 className="text-heading-lg sm:text-heading-xl text-warm-900">
              Un parcours en <span className="serif-accent">4 étapes</span>
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-body-sm text-warm-500">
              Chaque offre s&apos;intègre dans une stratégie cohérente pour maximiser votre visibilité locale.
            </p>
          </Reveal>

          <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {JOURNEY_STEPS.map((step, i) => (
              <Reveal key={step.num} delay={i * 0.08}>
                <a
                  href={step.href}
                  className="group relative flex h-full flex-col rounded-2xl border border-warm-200 bg-white p-6 sm:p-7 shadow-soft transition-all duration-300 hover:shadow-card hover:-translate-y-1"
                >
                  <div className="mb-5 flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-warm-100 text-sm font-bold text-warm-500">
                      {step.num}
                    </span>
                    <div className="h-px flex-1 bg-warm-200/60" />
                    <FreehandIcon name={step.icon} size={20} className="text-warm-400" />
                  </div>
                  <h3 className="text-lg font-medium text-warm-900">{step.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-warm-500">
                    {step.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-accent-dark group-hover:gap-2.5 transition-all">
                    {step.service}
                    <ArrowRight weight="bold" className="h-3.5 w-3.5" />
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Pricing – Détail des offres ── */}
      <section className="px-4 sm:px-6 py-10 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-10 sm:mb-14 text-center">
            <p className="section-label mb-4 justify-center">Pricing</p>
            <h2 className="text-heading-lg sm:text-heading-xl text-warm-900">
              Nos <span className="serif-accent">offres</span> en détail
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-body-sm text-warm-500">
              Transparence totale sur ce qu&apos;on fait, combien ça coûte, et les résultats que vous pouvez attendre.
            </p>
          </Reveal>

          <div className="space-y-8 sm:space-y-12">
            {SERVICES.map((service) => (
              <Reveal key={service.id} delay={0.05}>
                <div
                  id={service.id}
                  className={`scroll-mt-28 relative overflow-hidden rounded-2xl sm:rounded-[2rem] transition-all ${
                    service.highlighted
                      ? 'border-2 border-accent/30 bg-white shadow-[0_8px_60px_rgba(240,199,94,0.12)]'
                      : 'border border-warm-200 bg-white shadow-soft'
                  }`}
                >
                  {service.highlighted && (
                    <div className="absolute inset-0 rounded-2xl sm:rounded-[2rem] bg-gradient-to-b from-accent/[0.04] to-transparent pointer-events-none" />
                  )}

                  <div className="relative grid lg:grid-cols-5">
                    <div className="lg:col-span-3 p-6 sm:p-9">
                      <div className="flex flex-wrap items-center gap-3 mb-6">
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-warm-100 text-warm-700">
                          <FreehandIcon name={service.icon} size={20} />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-warm-400">
                          {service.tag}
                        </span>
                        {service.badge && (
                          <span
                            className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] ${
                              service.highlighted
                                ? 'bg-accent text-warm-900 shadow-lg shadow-accent/25'
                                : 'border border-warm-200 bg-warm-50 text-warm-500'
                            }`}
                          >
                            {service.badge}
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-warm-900">
                        {service.title}
                      </h3>
                      <p className="mt-1 text-lg sm:text-xl font-light text-warm-600">
                        {service.headline}
                      </p>

                      <p className="mt-4 text-[15px] leading-relaxed text-warm-500">
                        {service.description}
                      </p>

                      <div className="mt-6">
                        {service.price === 'Sur devis' ? (
                          <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-warm-900">
                            Sur devis
                          </span>
                        ) : service.price === 'Gratuit' ? (
                          <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-positive">
                            Gratuit
                          </span>
                        ) : (
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-warm-900">
                              {service.price}
                            </span>
                            {service.priceSuffix && (
                              <span className="text-sm font-medium text-warm-500">
                                {service.priceSuffix}
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="mt-6 flex flex-wrap gap-6">
                        {service.stats.map((stat) => (
                          <div key={stat.label}>
                            <span className="block text-lg font-bold text-warm-900">
                              {stat.value}
                            </span>
                            <span className="text-xs text-warm-400">{stat.label}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-8 flex flex-wrap items-center gap-3">
                        <Link
                          href={service.ctaHref}
                          className="btn-primary"
                        >
                          {service.cta}
                        </Link>
                        <Link
                          href={service.detailHref}
                          className="btn-secondary gap-1.5"
                        >
                          En savoir plus
                          <ArrowRight weight="bold" className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>

                    <div className="lg:col-span-2 border-t lg:border-t-0 lg:border-l border-warm-200/60 p-6 sm:p-9 flex flex-col justify-center">
                      <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.2em] text-warm-400">
                        Ce qu&apos;on fait
                      </p>
                      <ul className="space-y-3.5">
                        {service.features.map((feature) => (
                          <li
                            key={feature}
                            className="flex items-start gap-3 text-[14px] sm:text-[15px] text-warm-700"
                          >
                            <CheckCircle
                              weight="fill"
                              className="mt-0.5 h-[18px] w-[18px] shrink-0 text-accent-dark"
                            />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4b. Comparatif rapide ── */}
      <section className="bg-warm-100 px-4 sm:px-6 py-10 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <Reveal className="mb-10 sm:mb-14 text-center">
            <h2 className="text-heading-lg sm:text-heading-xl text-warm-900">
              Quelle offre est faite pour <span className="serif-accent">vous</span> ?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-body-sm text-warm-500">
              Un aperçu rapide pour choisir l&apos;offre adaptée à votre situation.
            </p>
          </Reveal>

          <Reveal>
            <div className="overflow-x-auto rounded-2xl border border-warm-200 bg-white shadow-soft">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="border-b border-warm-200/60">
                    <th className="p-5 text-xs font-bold uppercase tracking-[0.15em] text-warm-400">
                      &nbsp;
                    </th>
                    {SERVICES.map((s) => (
                      <th
                        key={s.id}
                        className={`p-5 text-center text-xs font-bold uppercase tracking-[0.1em] ${
                          s.highlighted ? 'text-accent-dark bg-accent/[0.04]' : 'text-warm-500'
                        }`}
                      >
                        {s.title.split(' ').slice(0, 2).join(' ')}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-warm-200/40">
                  <tr>
                    <td className="p-5 font-medium text-warm-700">Prix</td>
                    <td className="p-5 text-center font-semibold text-positive">Gratuit</td>
                    <td className="p-5 text-center font-semibold text-warm-900 bg-accent/[0.04]">500€</td>
                    <td className="p-5 text-center font-semibold text-warm-900">Sur devis</td>
                    <td className="p-5 text-center font-semibold text-warm-900">400€/mois</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-medium text-warm-700">Format</td>
                    <td className="p-5 text-center text-warm-500">Instantané</td>
                    <td className="p-5 text-center text-warm-500 bg-accent/[0.04]">One-shot</td>
                    <td className="p-5 text-center text-warm-500">Récurrent</td>
                    <td className="p-5 text-center text-warm-500">Récurrent</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-medium text-warm-700">Délai résultats</td>
                    <td className="p-5 text-center text-warm-500">30 secondes</td>
                    <td className="p-5 text-center text-warm-500 bg-accent/[0.04]">1-2 semaines</td>
                    <td className="p-5 text-center text-warm-500">Dès le 1er mois</td>
                    <td className="p-5 text-center text-warm-500">Dès la 1ère semaine</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-medium text-warm-700">Idéal si…</td>
                    <td className="p-5 text-center text-warm-500">Vous voulez savoir où vous en êtes</td>
                    <td className="p-5 text-center text-warm-500 bg-accent/[0.04]">Votre fiche est incomplète ou mal optimisée</td>
                    <td className="p-5 text-center text-warm-500">Vous manquez d&apos;avis récents</td>
                    <td className="p-5 text-center text-warm-500">Vous voulez des leads immédiats</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-medium text-warm-700">Engagement</td>
                    <td className="p-5 text-center text-warm-500">Aucun</td>
                    <td className="p-5 text-center text-warm-500 bg-accent/[0.04]">Aucun</td>
                    <td className="p-5 text-center text-warm-500">Candidature</td>
                    <td className="p-5 text-center text-warm-500">Sans engagement</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 5. Avantages – Pourquoi Siva ── */}
      <section className="px-4 sm:px-6 py-14 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-10 sm:mb-16 max-w-3xl">
            <p className="section-label mb-4">Avantages</p>
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
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-warm-100 text-warm-700">
                    <FreehandIcon name={prop.icon} size={20} />
                  </div>
                  <h3 className="text-lg font-medium text-warm-900">{prop.title}</h3>
                  <p className="mt-3 text-body-sm leading-relaxed text-warm-500">
                    {prop.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Social proof ── */}
      <section className="bg-warm-50 px-4 sm:px-6 py-14 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-10 sm:mb-16 text-center">
            <p className="section-label mb-4 justify-center">Ils nous font confiance</p>
            <h2 className="text-balance text-heading-xl text-warm-900 sm:text-display">
              Ce que nos clients <span className="serif-accent">en disent.</span>
            </h2>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {TESTIMONIALS_SERVICES.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.08}>
                <div className="card-hover flex h-full flex-col justify-between bg-white p-6">
                  <div>
                    <div className="mb-3 flex gap-0.5">
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <Star key={j} weight="fill" className="h-4 w-4 text-[#FBBC04]" />
                      ))}
                    </div>
                    <p className="text-[15px] leading-relaxed text-warm-600">&ldquo;{t.text}&rdquo;</p>
                  </div>
                  <div className="mt-6 flex items-center gap-3 border-t border-warm-100 pt-5">
                    <span className="text-2xl">{t.avatar}</span>
                    <div>
                      <p className="text-sm font-semibold text-warm-900">{t.name}</p>
                      <p className="text-xs text-warm-500">{t.role} · {t.company}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. FAQ ── */}
      <section className="px-4 sm:px-6 py-14 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <Reveal className="mb-8 sm:mb-12 text-center">
            <p className="section-label mb-4 justify-center">FAQ</p>
            <h2 className="text-heading-xl text-warm-900">
              Questions <span className="serif-accent">fréquentes</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-warm-200 bg-white px-4 sm:px-6 shadow-soft md:px-8">
              {FAQ_ITEMS_SERVICES.map((item) => (
                <FAQItem key={item.q} q={item.q} a={item.a} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA final ── */}
      <section className="rounded-t-[1.5rem] sm:rounded-t-[2.5rem] bg-warm-900 px-4 sm:px-6 py-14 sm:py-20 text-white">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-heading-xl sm:text-display md:text-display-lg text-white">
              Prêt à <span className="serif-accent text-accent">passer à l&apos;action</span> ?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-body-sm sm:text-body-lg text-white/60">
              Commencez par un audit gratuit ou prenez rendez-vous avec un expert.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/rendez-vous" className="btn-accent">
                Prendre rendez-vous
              </Link>
              <Link
                href="/audit-gratuit"
                className="btn-secondary !bg-white/10 !border-white/20 !text-white hover:!bg-white/20"
              >
                Lancer l&apos;audit gratuit
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
