'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import {
  SealCheck,
  Star,
  TrendUp,
  CaretDown,
  ArrowRight,
} from '@phosphor-icons/react';
import FreehandIcon from '@/components/FreehandIcon';
import BoostAvisFunnel from '@/components/BoostAvisFunnel';

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

const HOW_IT_WORKS = [
  {
    num: '1',
    icon: 'handshake' as const,
    title: 'Candidature & sélection',
    description: 'Vous candidatez et on vérifie que votre établissement est éligible. On sélectionne les meilleurs profils.',
  },
  {
    num: '2',
    icon: 'users' as const,
    title: 'Test par nos ambassadeurs',
    description: 'Nos ambassadeurs se rendent chez vous et vivent l\'expérience comme un client classique (repas, soin, service...).',
  },
  {
    num: '3',
    icon: 'star' as const,
    title: 'Avis Google publié',
    description: 'Après leur visite, ils rédigent et publient un avis détaillé sur votre fiche Google.',
  },
];

const BENEFITS = [
  {
    icon: 'eye' as const,
    title: 'Des avis détaillés',
    description: 'De vrais retours d\'expérience, rédigés après une visite en établissement. Pas de commentaires génériques.',
  },
  {
    icon: 'chart-line' as const,
    title: 'Un rythme naturel',
    description: 'Le volume d\'avis est calibré pour une croissance régulière et cohérente avec votre activité.',
  },
  {
    icon: 'star' as const,
    title: 'Votre note s\'améliore',
    description: 'Des avis argumentés qui reflètent la qualité réelle de votre service.',
  },
  {
    icon: 'map-pin' as const,
    title: 'Plus de visibilité locale',
    description: 'Plus d\'avis récents, meilleur positionnement sur Google Maps dans votre zone.',
  },
];

const RECENT_REVIEWS = [
  { name: 'Léa M.', time: 'il y a 2 jours', rating: 5, text: 'Expérience incroyable ! Le cadre est magnifique, le service impeccable et la cuisine raffinée. Je recommande les yeux fermés.' },
  { name: 'Thomas R.', time: 'il y a 5 jours', rating: 5, text: 'Un vrai coup de cœur. Accueil chaleureux, plats savoureux et desserts maison à tomber. Bravo à toute l\'équipe !' },
  { name: 'Camille D.', time: 'il y a 1 semaine', rating: 5, text: 'Superbe découverte. Rapport qualité-prix excellent, ambiance conviviale. On reviendra avec plaisir.' },
];

const PRICING_TIERS = [
  {
    tier: 1,
    label: 'Lancement',
    range: '30 – 50 avis',
    rate: '24,7€',
    rateLabel: '/ avis',
    discount: null as string | null,
    tagline: 'Idéal pour lancer la dynamique',
  },
  {
    tier: 2,
    label: 'Accélération',
    range: '50 – 150 avis',
    rate: '21,6€',
    rateLabel: '/ avis',
    discount: '–13%',
    tagline: 'Crédibilité & social proof',
  },
  {
    tier: 3,
    label: 'Domination',
    range: '150+ avis',
    rate: '19,5€',
    rateLabel: '/ avis',
    discount: '–21%',
    tagline: 'Domination locale, crédibilité maximale',
  },
];

const TESTIMONIALS = [
  {
    name: 'Marie L.',
    role: 'Restauratrice · Paris',
    avatar: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=120&h=120&fit=crop&crop=center',
    text: 'En 3 mois, on est passé de 4.2 à 4.7 de note moyenne. Les avis sont naturels, détaillés, et nos clients nous disent qu\'ils nous ont trouvés grâce aux avis Google.',
    rating: 5,
  },
  {
    name: 'David K.',
    role: 'Gérant de garage · Toulouse',
    avatar: 'https://images.unsplash.com/photo-1486006920555-c77dcf18193c?w=120&h=120&fit=crop&crop=center',
    text: 'Sandro et son équipe ont triplé nos avis Google en 4 mois. On reçoit maintenant 3x plus de demandes de devis. L\'approche est éthique et les résultats sont là.',
    rating: 5,
  },
  {
    name: 'Lucas P.',
    role: 'Boulanger · Strasbourg',
    avatar: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=120&h=120&fit=crop&crop=center',
    text: 'On hésitait, mais les avis sont d\'une qualité impressionnante. Les étudiants décrivent vraiment leur expérience. Résultat : +60% de nouveaux clients en 90 jours.',
    rating: 5,
  },
];

const FAQ_ITEMS = [
  {
    q: 'Est-ce que ces avis sont de "faux avis" ?',
    a: 'Non, absolument pas. Nos visiteurs se rendent physiquement dans votre établissement, vivent une vraie expérience (repas, soin, service...) et rédigent un avis basé sur cette expérience réelle. C\'est la différence fondamentale avec les services de faux avis.',
  },
  {
    q: 'Y a-t-il un risque de pénalité Google ?',
    a: 'Aucun. Les visites sont réelles, les expériences authentiques et les avis naturels. Nos visiteurs ont des comptes Google actifs avec un historique de vrais avis. C\'est exactement ce que Google encourage : de vrais avis de vrais clients.',
  },
  {
    q: 'Comment sont sélectionnés les visiteurs ?',
    a: 'Nous travaillons avec un réseau d\'étudiants vérifiés. Chaque visiteur a un compte Google actif avec un historique d\'avis. On les matche avec votre type d\'établissement pour que l\'expérience soit pertinente et l\'avis crédible.',
  },
  {
    q: 'Combien d\'avis puis-je recevoir par mois ?',
    a: 'Nous calibrons le volume pour que la croissance des avis paraisse naturelle à Google. En général, entre 8 et 25 avis par mois selon votre historique actuel. Une montée trop brutale serait contre-productive.',
  },
  {
    q: 'Quels types d\'établissements sont éligibles ?',
    a: 'Tous les établissements qui accueillent du public : restaurants, cafés, salons de beauté, garages, commerces, cabinets médicaux, etc. La candidature permet de vérifier que votre activité est compatible avec notre modèle de visites.',
  },
  {
    q: 'Les visiteurs paient-ils leur expérience ?',
    a: 'Non, l\'expérience est offerte dans le cadre du programme (repas, service, soin...). C\'est inclus dans le tarif. C\'est ce qui rend les avis authentiques : les visiteurs vivent une vraie expérience client, pas une visite factice.',
  },
];


export default function BoostAvisExperiencePage() {
  const [testerCount, setTesterCount] = useState(50);
  const [showFunnel, setShowFunnel] = useState(false);

  const totalPrice =
    testerCount <= 50
      ? testerCount * 24.7
      : testerCount <= 150
      ? 50 * 24.7 + (testerCount - 50) * 21.6
      : 50 * 24.7 + 100 * 21.6 + (testerCount - 150) * 19.5;
  const pricePerTester = totalPrice / testerCount;
  const currentTier = testerCount <= 50 ? 1 : testerCount <= 150 ? 2 : 3;
  const savings = testerCount > 50 ? Math.round(testerCount * 24.7 - totalPrice) : 0;
  const sliderPercent = ((testerCount - 30) / (300 - 30)) * 100;

  return (
    <>
    <BoostAvisFunnel isOpen={showFunnel} onClose={() => setShowFunnel(false)} />
    <main>
      {/* ── 1. Hero ── */}
      <section className="relative overflow-hidden px-4 sm:px-6 pb-12 sm:pb-16 md:pb-24 pt-10 sm:pt-16 md:pt-20">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="hero-dot-grid absolute inset-0" />
          <div className="hero-glow" />
        </div>

        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <Reveal>
                <div className="mb-4 sm:mb-6 inline-flex items-center gap-2 rounded-full border border-warm-200 bg-white px-5 py-2.5 text-sm font-semibold shadow-soft">
                  <SealCheck weight="fill" className="h-4 w-4 text-accent-dark" />
                  Sur devis · Candidature requise
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <h1 className="text-balance text-heading-xl text-warm-900 sm:text-display-lg md:text-display-xl">
                  Plus d&apos;avis Google, plus de <span className="serif-accent serif-accent-animated">Clients</span>
                </h1>
              </Reveal>

              <Reveal delay={0.16}>
                <p className="mt-4 sm:mt-6 max-w-xl text-body-sm sm:text-body-lg text-warm-600">
                  Les entreprises avec le plus d&apos;avis attirent le plus de clients. Nous vous aidons à développer votre réputation Google.
                </p>
              </Reveal>

              <Reveal delay={0.24}>
                <div className="mt-6 sm:mt-10 flex flex-col gap-4 sm:flex-row">
                  <button onClick={() => setShowFunnel(true)} className="btn-primary">
                    Obtenir plus d&apos;avis
                  </button>
                  <a href="#concept" className="btn-secondary">
                    Comment ça marche
                  </a>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.3} className="relative hidden min-h-[420px] lg:block">
              <motion.div
                className="absolute right-0 top-0 z-10 w-[320px] overflow-hidden rounded-2xl border border-[#e8eaed] bg-white shadow-card"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="flex items-center gap-2 border-b border-[#e8eaed] px-4 py-3">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                  <span className="text-[13px] font-medium text-[#202124]">Avis Google</span>
                </div>
                <div className="px-4 py-3 space-y-2.5">
                  {RECENT_REVIEWS.map((review, idx) => (
                    <div key={review.name} className={`pb-2.5 ${idx < RECENT_REVIEWS.length - 1 ? 'border-b border-[#e8eaed]' : ''}`}>
                      <div className="mb-1.5 flex items-center gap-2">
                        <div className={`flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold text-white ${idx === 0 ? 'bg-[#1a73e8]' : idx === 1 ? 'bg-[#e8710a]' : 'bg-[#137333]'}`}>
                          {review.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-[12px] font-medium text-[#202124]">{review.name}</span>
                            <span className="text-[10px] text-[#70757a]">{review.time}</span>
                          </div>
                          <div className="flex gap-px mt-0.5">
                            {Array.from({ length: review.rating }).map((_, i) => (
                              <Star key={i} weight="fill" className="h-2.5 w-2.5 text-[#FBBC04]" />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="line-clamp-2 text-[11px] leading-[1.5] text-[#4d5156]">{review.text}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="absolute bottom-0 left-0 z-20 w-[260px] overflow-hidden rounded-2xl border border-[#e8eaed] bg-white shadow-card"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
              >
                <div className="flex items-center gap-1.5 border-b border-[#e8eaed] px-4 py-2.5">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                  <span className="text-[11px] font-medium text-[#202124]">Résumé des avis</span>
                  <span className="ml-auto flex items-center gap-0.5 text-[10px] font-semibold text-[#137333]">
                    <TrendUp weight="bold" className="h-3 w-3" />
                    +0.4
                  </span>
                </div>
                <div className="px-4 py-3">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="text-[2.5rem] font-normal leading-none text-[#202124]">4.8</span>
                    <div>
                      <div className="flex gap-px">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} weight="fill" className="h-4 w-4 text-[#FBBC04]" />
                        ))}
                      </div>
                      <p className="mt-0.5 text-[11px] text-[#70757a]">234 avis</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    {[
                      { stars: 5, pct: 82 },
                      { stars: 4, pct: 12 },
                      { stars: 3, pct: 4 },
                      { stars: 2, pct: 1 },
                      { stars: 1, pct: 1 },
                    ].map((row) => (
                      <div key={row.stars} className="flex items-center gap-1.5">
                        <span className="w-2.5 text-right text-[10px] text-[#70757a]">{row.stars}</span>
                        <div className="h-[6px] flex-1 overflow-hidden rounded-full bg-[#e8eaed]">
                          <div className="h-full rounded-full bg-[#FBBC04]" style={{ width: `${row.pct}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute right-8 bottom-16 z-30 flex items-center gap-2 rounded-full border border-[#e8eaed] bg-white px-3.5 py-2 shadow-card"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                <div>
                  <p className="text-[11px] font-medium text-[#202124]">+24 avis ce mois</p>
                  <p className="text-[10px] text-[#137333] font-medium">Tous vérifiés</p>
                </div>
              </motion.div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 2. Logo défilant ── */}
      <section className="overflow-hidden border-y border-warm-200 bg-white py-4 sm:py-6">
        <div className="logos-marquee flex items-center gap-12 sm:gap-16">
          {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((client, i) => (
            <div key={i} className="flex h-6 w-20 shrink-0 items-center justify-center sm:h-7 sm:w-28">
              <img
                src={client.logo}
                alt={client.name}
                className="max-h-full max-w-full object-contain opacity-40 grayscale transition-all hover:opacity-70 hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── 2b. Identification du problème ── */}
      <section className="px-4 sm:px-6 py-14 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <Reveal className="mb-8 sm:mb-12 text-center">
            <p className="section-label mb-4 justify-center">Le constat</p>
            <h2 className="text-balance text-heading-xl text-warm-900 sm:text-display">
              Pourquoi les avis Google sont <span className="serif-accent">décisifs</span>
            </h2>
          </Reveal>

          <div className="space-y-5">
            <Reveal delay={0.06}>
              <p className="text-body-sm sm:text-body-lg leading-relaxed text-warm-600">
                Aujourd&apos;hui, la grande majorité des clients regardent les avis Google avant de choisir une entreprise. Dans beaucoup de secteurs, la décision se fait en quelques secondes entre deux fiches&nbsp;: celle qui a le plus d&apos;avis et la meilleure note gagne presque toujours.
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="text-body-sm sm:text-body-lg leading-relaxed text-warm-600">
                Le problème, c&apos;est que les clients satisfaits laissent rarement un avis, alors que les clients mécontents le font beaucoup plus facilement. Résultat&nbsp;: beaucoup d&apos;entreprises ont une note qui ne reflète pas vraiment la qualité de leur service.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="text-body-sm sm:text-body-lg leading-relaxed text-warm-600">
                Concrètement, cela signifie que deux entreprises qui font exactement le même travail peuvent avoir des résultats très différents simplement à cause de leur réputation en ligne.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-6 sm:mt-8 grid grid-cols-2 gap-4">
                <div className="relative rounded-2xl border border-positive/30 bg-positive/[0.04] p-5 sm:p-6 text-center">
                  <span className="absolute -top-2.5 left-4 rounded-full bg-positive px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                    Gagnant
                  </span>
                  <div className="mt-1 flex items-center justify-center gap-1.5 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} weight="fill" className="h-4 w-4 text-[#FBBC04]" />
                    ))}
                  </div>
                  <p className="text-2xl sm:text-3xl font-semibold text-warm-900">4,7<span className="text-lg text-warm-400">/5</span></p>
                  <p className="mt-1 text-sm font-medium text-warm-500">150 avis</p>
                </div>
                <div className="relative rounded-2xl border border-warm-200 bg-warm-50 p-5 sm:p-6 text-center opacity-60">
                  <span className="absolute -top-2.5 left-4 rounded-full bg-warm-400 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                    Invisible
                  </span>
                  <div className="mt-1 flex items-center justify-center gap-1.5 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} weight={i < 4 ? 'fill' : 'regular'} className={`h-4 w-4 ${i < 4 ? 'text-[#FBBC04]' : 'text-warm-200'}`} />
                    ))}
                  </div>
                  <p className="text-2xl sm:text-3xl font-semibold text-warm-900">4,2<span className="text-lg text-warm-400">/5</span></p>
                  <p className="mt-1 text-sm font-medium text-warm-500">20 avis</p>
                </div>
              </div>
              <p className="mt-4 text-center text-sm text-warm-500 italic">
                Même qualité de service, résultats très différents.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 2c. Intro de notre solution ── */}
      <section className="bg-warm-50 px-4 sm:px-6 py-10 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <div className="rounded-2xl border border-accent/20 bg-accent/[0.04] p-6 sm:p-10 text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-white px-4 py-2 text-sm font-semibold text-accent-dark">
                <SealCheck weight="fill" className="h-4 w-4" />
                Notre approche
              </div>
              <p className="text-body-sm sm:text-body-lg leading-relaxed text-warm-700 max-w-2xl mx-auto">
                Notre rôle est d&apos;aider les entreprises à développer leur réputation en ligne de manière naturelle, en générant davantage d&apos;expériences clients et donc plus de retours authentiques.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 3. Comment ça marche ── */}
      <section id="concept" className="relative overflow-hidden bg-warm-900 px-4 sm:px-6 py-14 sm:py-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-accent/[0.04] blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-5xl">
          <Reveal className="mb-10 sm:mb-16 text-center">
            <p className="section-label mb-4 justify-center !text-accent before:!bg-accent/40">Comment ça marche</p>
            <h2 className="text-balance text-heading-xl text-white sm:text-display">
              Des ambassadeurs testent votre <span className="serif-accent text-accent">établissement.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-body-sm sm:text-body-lg text-white/50">
              On sélectionne, on envoie, ils vivent l&apos;expérience et laissent un avis sur Google.
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {HOW_IT_WORKS.map((step, i) => (
              <Reveal key={step.num} delay={i * 0.08}>
                <div className="relative flex h-full flex-col items-start gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.04] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/20 hover:bg-white/[0.06]">
                  <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-accent/20 to-accent/5 ring-1 ring-accent/10 text-accent">
                    <FreehandIcon name={step.icon} size={44} />
                  </div>
                  <div>
                    <p className="mb-1.5 text-xs font-bold uppercase tracking-wider text-accent">Étape {step.num}</p>
                    <h3 className="text-lg font-medium text-white">{step.title}</h3>
                    <p className="mt-2 text-body-sm leading-relaxed text-white/50">{step.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Simulateur pricing ── */}
      <section className="bg-warm-50 px-4 sm:px-6 py-14 sm:py-24" id="pricing">
        <div className="mx-auto max-w-3xl">
          <Reveal className="mb-6 sm:mb-8 text-center">
            <p className="section-label mb-3 justify-center">Tarification</p>
            <h2 className="text-balance text-heading-xl text-warm-900 sm:text-display">
              Estimez votre <span className="serif-accent">investissement</span>
            </h2>
            <p className="mx-auto mt-3 max-w-md text-body-sm text-warm-500">
              Plus le volume augmente, plus le prix unitaire baisse. On gère tout.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-warm-200 bg-white p-6 sm:p-10 shadow-soft">
              <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">
                <div className="flex-1">
                  <div className="flex items-baseline justify-between mb-3">
                    <span className="text-sm font-medium text-warm-400">Nombre d&apos;avis</span>
                    <motion.span
                      key={testerCount}
                      initial={{ opacity: 0.6 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.12 }}
                      className="text-xl font-semibold text-warm-900 tabular-nums"
                    >
                      {testerCount}
                    </motion.span>
                  </div>
                  <input
                    type="range"
                    min={30}
                    max={300}
                    step={10}
                    value={testerCount}
                    onChange={(e) => setTesterCount(Number(e.target.value))}
                    className="pricing-slider w-full"
                    style={{
                      background: `linear-gradient(to right, #D4A82E 0%, #D4A82E ${sliderPercent}%, #E3DCD2 ${sliderPercent}%, #E3DCD2 100%)`,
                    }}
                  />
                  <div className="mt-1.5 flex justify-between text-xs text-warm-300">
                    <span>30</span>
                    <span>300</span>
                  </div>
                </div>

                <div className="h-px sm:h-20 sm:w-px bg-warm-200/60 shrink-0" />

                <div className="text-center sm:text-right shrink-0 sm:min-w-[160px]">
                  <div className="flex items-baseline justify-center sm:justify-end gap-1.5">
                    <motion.span
                      key={Math.round(totalPrice)}
                      initial={{ opacity: 0.6 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.12 }}
                      className="text-3xl sm:text-4xl font-semibold text-warm-900 tabular-nums"
                    >
                      {Math.round(totalPrice).toLocaleString('fr-FR')}&euro;
                    </motion.span>
                    <span className="text-sm font-medium text-warm-400">HT</span>
                  </div>
                  <p className="mt-1 text-sm text-warm-500">
                    soit <span className="font-semibold text-warm-700">{pricePerTester.toFixed(1).replace('.', ',')}€</span> / avis
                  </p>
                  {savings > 0 && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-2 inline-flex items-center gap-1 rounded-full bg-positive/10 px-2.5 py-1 text-xs font-semibold text-positive"
                    >
                      <TrendUp weight="bold" className="h-3.5 w-3.5" />
                      –{savings}€
                    </motion.span>
                  )}
                </div>
              </div>

              <div className="my-6 h-px bg-warm-100" />

              <div className="grid gap-3 sm:grid-cols-3">
                {PRICING_TIERS.map((t) => {
                  const isActive = currentTier >= t.tier;
                  const isCurrent = currentTier === t.tier;
                  return (
                    <div
                      key={t.tier}
                      className={`relative rounded-xl border px-4 py-4 transition-all duration-300 ${
                        isCurrent
                          ? 'border-accent/40 bg-accent/[0.04] ring-1 ring-accent/15'
                          : isActive
                          ? 'border-warm-200 bg-white'
                          : 'border-warm-100 bg-warm-50/50 opacity-40'
                      }`}
                    >
                      {isCurrent && (
                        <span className="absolute -top-2.5 left-3 rounded-full bg-accent-dark px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                          Actif
                        </span>
                      )}
                      <div className="flex items-center justify-between mt-0.5">
                        <span className={`text-xs font-bold uppercase tracking-[0.12em] ${isCurrent ? 'text-accent-dark' : 'text-warm-400'}`}>
                          {t.label}
                        </span>
                        {t.discount && (
                          <span className={`text-[11px] font-bold rounded-full px-2 py-0.5 ${isActive ? 'bg-positive/10 text-positive' : 'bg-warm-100 text-warm-400'}`}>
                            {t.discount}
                          </span>
                        )}
                      </div>
                      <p className="mt-1.5 text-lg font-semibold text-warm-900">
                        {t.rate}<span className="text-xs font-normal text-warm-400"> {t.rateLabel}</span>
                      </p>
                      <p className="text-xs text-warm-400">{t.range}</p>
                    </div>
                  );
                })}
              </div>

              <div className="my-6 h-px bg-warm-100" />

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-start gap-2.5">
                  <SealCheck weight="fill" className="mt-0.5 h-5 w-5 shrink-0 text-accent-dark" />
                  <p className="text-sm leading-relaxed text-warm-500">
                    <span className="font-semibold text-warm-700">Garantie satisfaction</span> — Remboursement si non satisfait.
                  </p>
                </div>
                <button onClick={() => setShowFunnel(true)} className="btn-primary shrink-0 text-sm">
                  Obtenir plus d&apos;avis
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 5. Avantages ── */}
      <section className="bg-warm-100 px-4 sm:px-6 py-14 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-10 sm:mb-16 text-center">
            <p className="section-label mb-4 justify-center">Les avantages</p>
            <h2 className="text-balance text-heading-xl text-warm-900 sm:text-display">
              Ce que ça change <span className="serif-accent">concrètement.</span>
            </h2>
          </Reveal>

          <div className="grid gap-3 sm:grid-cols-2 sm:gap-5">
            {BENEFITS.map((benefit, i) => (
              <Reveal key={benefit.title} delay={i * 0.06}>
                <div className="group relative flex h-full flex-col items-start gap-4 rounded-xl border border-warm-200/80 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] sm:rounded-2xl sm:p-7">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-warm-100 text-warm-700 transition-colors group-hover:bg-accent-light group-hover:text-accent-dark">
                    <FreehandIcon name={benefit.icon} size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-warm-900">{benefit.title}</h3>
                    <p className="mt-2 text-body-sm leading-relaxed text-warm-500">{benefit.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Social proof – Témoignages ── */}
      <section className="px-4 sm:px-6 py-14 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-10 sm:mb-16 text-center">
            <p className="section-label mb-4 justify-center">Ils nous font confiance</p>
            <h2 className="text-balance text-heading-xl text-warm-900 sm:text-display">
              Des résultats qui parlent <span className="serif-accent">d&apos;eux-mêmes.</span>
            </h2>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.08}>
                <div className="group flex h-full flex-col justify-between rounded-2xl border border-warm-200 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card sm:rounded-3xl sm:p-7">
                  <div>
                    <div className="mb-3 flex gap-0.5">
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <Star key={j} weight="fill" className="h-4 w-4 text-[#FBBC04]" />
                      ))}
                    </div>
                    <p className="text-[15px] leading-relaxed text-warm-600">&ldquo;{t.text}&rdquo;</p>
                  </div>
                  <div className="mt-6 flex items-center gap-3 border-t border-warm-100 pt-5">
                    <img src={t.avatar} alt={t.name} className="h-10 w-10 shrink-0 rounded-full border border-warm-200 object-cover" />
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

      {/* ── 7. FAQ ── */}
      <section className="bg-warm-50 px-4 sm:px-6 py-14 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <Reveal className="mb-8 sm:mb-12 text-center">
            <p className="section-label mb-4 justify-center">FAQ</p>
            <h2 className="text-heading-xl text-warm-900">
              Questions <span className="serif-accent">fréquentes</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-warm-200 bg-white px-4 sm:px-6 shadow-soft sm:rounded-3xl md:px-8">
              {FAQ_ITEMS.map((item) => (
                <FAQItem key={item.q} q={item.q} a={item.a} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 8. CTA Devis ── */}
      <section id="formulaire" className="px-4 sm:px-6 py-14 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-warm-200 bg-white p-8 sm:p-12 shadow-card text-center">
              <div className="pointer-events-none absolute inset-0">
                <div className="hero-dot-grid absolute inset-0 opacity-40" />
                <div className="absolute left-1/2 top-0 h-[300px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[80px]" />
              </div>
              <div className="relative">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-warm-200 bg-warm-50 px-4 py-2 text-sm font-semibold text-warm-700">
                  <SealCheck weight="fill" className="h-4 w-4 text-accent-dark" />
                  Devis personnalisé en 2 minutes
                </div>
                <h2 className="text-balance text-heading-xl text-warm-900 sm:text-display">
                  Obtenez votre devis <span className="serif-accent">sur-mesure</span>
                </h2>
                <p className="mx-auto mt-4 max-w-md text-body-sm sm:text-body-lg text-warm-500">
                  Répondez à 4 questions et recevez immédiatement une estimation personnalisée pour votre établissement.
                </p>
                <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                  <button onClick={() => setShowFunnel(true)} className="btn-accent btn-hero">
                    Calculer mon devis gratuit
                  </button>
                  <div className="flex items-center gap-1.5 text-sm text-warm-400">
                    <ArrowRight className="h-3.5 w-3.5" />
                    Sans engagement · Réponse sous 24h
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA final ── */}
      <section className="rounded-t-[1.5rem] bg-warm-900 px-4 sm:px-6 py-14 sm:py-20 sm:rounded-t-[2.5rem] text-white">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-heading-xl sm:text-display md:text-display-lg text-white">
              Prêt à booster vos <span className="serif-accent text-accent">avis Google</span> ?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-body-sm sm:text-body-lg text-white/60">
              Obtenez votre devis en 2 minutes ou commencez par un audit gratuit.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button onClick={() => setShowFunnel(true)} className="btn-accent">
                Calculer mon devis
              </button>
              <Link href="/audit-gratuit" className="btn-secondary !bg-white/10 !border-white/20 !text-white hover:!bg-white/20">
                Lancer l&apos;audit gratuit
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
    </>
  );
}
