'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import {
  CheckCircle,
  Eye,
  Handshake,
  SealCheck,
  ShieldCheck,
  Star,
  UsersThree,
  TrendUp,
  CaretDown,
  Warning,
  Lightbulb,
  ChartLineUp,
  ChatCircleDots,
  Medal,
} from '@phosphor-icons/react';

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
    Icon: Handshake,
    title: 'Candidature & sélection',
    description: 'Vous candidatez et on vérifie que votre établissement est éligible. On sélectionne les meilleurs profils.',
  },
  {
    num: '2',
    Icon: UsersThree,
    title: 'Visite par nos étudiants',
    description: 'Des étudiants sélectionnés visitent votre établissement et vivent une expérience réelle (repas, soin, service...).',
  },
  {
    num: '3',
    Icon: Star,
    title: 'Avis Google authentique',
    description: 'Ils laissent un avis Google détaillé et authentique basé sur leur expérience réelle chez vous.',
  },
];

const BENEFITS = [
  {
    Icon: SealCheck,
    title: '100% conforme Google',
    description: 'Nos avis respectent scrupuleusement les CGU Google. Ce sont de vrais avis de vraies personnes après une vraie visite.',
  },
  {
    Icon: Eye,
    title: 'Avis détaillés et crédibles',
    description: 'Pas de "Super !" générique. Nos visiteurs rédigent des avis longs, détaillés, avec photos quand c\'est possible.',
  },
  {
    Icon: ShieldCheck,
    title: 'Risque zéro',
    description: 'Aucun risque de pénalité Google. Les visites sont réelles, les expériences authentiques, les avis naturels.',
  },
  {
    Icon: Star,
    title: 'Impact SEO direct',
    description: 'Plus d\'avis récents = meilleur classement Google Maps. Chaque avis renforce votre positionnement local.',
  },
];

const INCLUDED = [
  'Des étudiants visitent votre établissement',
  'Ils vivent une expérience réelle (repas, soin, service…)',
  'Ils laissent un avis Google authentique et détaillé',
  '100% conforme aux CGU Google',
  'Suivi et reporting des avis publiés',
  'Accompagnement pour répondre aux avis',
];

const RECENT_REVIEWS = [
  { name: 'Léa M.', time: 'il y a 2 jours', rating: 5, text: 'Expérience incroyable ! Le cadre est magnifique, le service impeccable et la cuisine raffinée. Je recommande les yeux fermés.' },
  { name: 'Thomas R.', time: 'il y a 5 jours', rating: 5, text: 'Un vrai coup de cœur. Accueil chaleureux, plats savoureux et desserts maison à tomber. Bravo à toute l\'équipe !' },
  { name: 'Camille D.', time: 'il y a 1 semaine', rating: 5, text: 'Superbe découverte. Rapport qualité-prix excellent, ambiance conviviale. On reviendra avec plaisir.' },
];

const PROBLEMS = [
  {
    Icon: Warning,
    title: 'Peu d\'avis = peu de confiance',
    description: '88% des consommateurs font autant confiance aux avis en ligne qu\'aux recommandations personnelles. Sans avis récents, vos prospects choisissent vos concurrents.',
  },
  {
    Icon: ChartLineUp,
    title: 'Les avis impactent votre ranking',
    description: 'Google considère la quantité et la fraîcheur des avis comme un facteur de classement majeur. Moins d\'avis = moins de visibilité dans le Local Pack.',
  },
  {
    Icon: ChatCircleDots,
    title: 'Demander des avis ne suffit plus',
    description: 'Vos clients satisfaits oublient de laisser un avis. Seuls les mécontents prennent le temps. Résultat : une note qui ne reflète pas la réalité.',
  },
];

const STATS = [
  { value: '88%', label: 'font confiance aux avis en ligne' },
  { value: '+0.4', label: 'de note moyenne par mois' },
  { value: '24+', label: 'avis publiés / mois' },
  { value: '100%', label: 'conforme CGU Google' },
];

const COMPARISON = [
  { label: 'Vraie visite physique', us: true, others: false },
  { label: 'Expérience réelle vécue', us: true, others: false },
  { label: 'Conforme CGU Google', us: true, others: false },
  { label: 'Avis détaillés avec photos', us: true, others: false },
  { label: 'Aucun risque de pénalité', us: true, others: false },
  { label: 'Impact SEO durable', us: true, others: true },
];

const TESTIMONIALS = [
  {
    name: 'Marie L.',
    role: 'Restauratrice',
    place: 'Le Bouillon Chartier, Paris',
    avatar: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=120&h=120&fit=crop&crop=center',
    text: 'En 3 mois, on est passé de 4.2 à 4.7 de note moyenne. Les avis sont naturels, détaillés, et nos clients nous disent qu\'ils nous ont trouvés grâce aux avis Google.',
    rating: 5,
  },
  {
    name: 'David K.',
    role: 'Gérant',
    place: 'Garage du Capitole, Toulouse',
    avatar: 'https://images.unsplash.com/photo-1486006920555-c77dcf18193c?w=120&h=120&fit=crop&crop=center',
    text: 'Sandro et son équipe ont triplé nos avis Google en 4 mois. On reçoit maintenant 3x plus de demandes de devis. L\'approche est éthique et les résultats sont là.',
    rating: 5,
  },
  {
    name: 'Lucas P.',
    role: 'Boulanger',
    place: 'Boulangerie Maison Kayser, Strasbourg',
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
  return (
    <main>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden px-4 sm:px-6 pb-0 pt-10 sm:pt-16 md:pt-20">
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
                  Boost Avis <span className="serif-accent serif-accent-animated">Expérience</span>
                </h1>
              </Reveal>

              <Reveal delay={0.16}>
                <p className="mt-4 sm:mt-6 max-w-xl text-body-sm sm:text-body-lg text-warm-600">
                  De vrais clients, de vraies visites, de vrais avis Google.
                  La solution la plus naturelle et efficace pour booster votre réputation en ligne.
                </p>
              </Reveal>

              <Reveal delay={0.24}>
                <div className="mt-6 sm:mt-10 flex flex-col gap-4 sm:flex-row">
                  <Link href="/rendez-vous" className="btn-primary">
                    Candidater
                  </Link>
                  <Link href="/audit-gratuit" className="btn-secondary">
                    Audit gratuit
                  </Link>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.3} className="relative hidden min-h-[420px] lg:block">
              {/* Google Reviews card */}
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

              {/* Google rating summary card */}
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

              {/* Google verified badge */}
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

        <div className="mt-10 sm:mt-16 overflow-hidden border-t border-warm-200 bg-white/60 py-5 md:mt-20">
          <div className="logos-marquee flex items-center gap-14 sm:gap-20">
            {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((client, i) => (
              <div key={i} className="flex h-8 w-28 shrink-0 items-center justify-center sm:h-10 sm:w-36">
                <img
                  src={client.logo}
                  alt={client.name}
                  className="max-h-full max-w-full object-contain opacity-40 grayscale transition-all hover:opacity-70 hover:grayscale-0"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Problème ── */}
      <section className="px-4 sm:px-6 py-14 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <Reveal className="mb-10 sm:mb-16 text-center">
            <p className="section-label mb-4 justify-center">Le problème</p>
            <h2 className="text-balance text-heading-xl text-warm-900 sm:text-display">
              Vos avis Google ne reflètent pas la <span className="serif-accent">réalité.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-body-sm sm:text-body-lg text-warm-500">
              Les clients satisfaits partent sans laisser d&apos;avis. Les mécontents, eux, prennent le temps. Résultat : une note qui vous dessert et des prospects qui choisissent vos concurrents.
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {PROBLEMS.map((problem, i) => (
              <Reveal key={problem.title} delay={i * 0.08}>
                <div className="relative flex h-full flex-col items-start gap-4 rounded-2xl border border-red-100 bg-red-50/30 p-6">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-red-600">
                    <problem.Icon weight="bold" className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-warm-900">{problem.title}</h3>
                    <p className="mt-2 text-body-sm leading-relaxed text-warm-500">{problem.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="border-y border-warm-200 bg-white px-4 sm:px-6 py-10 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {STATS.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.06}>
                <div className="text-center">
                  <p className="serif-accent text-[2rem] sm:text-[2.5rem] leading-none tracking-tight text-warm-900 md:text-[3rem]">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm font-medium text-warm-500">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Solution intro ── */}
      <section className="px-4 sm:px-6 py-14 sm:py-24">
        <div className="mx-auto max-w-4xl">
          <Reveal className="text-center">
            <div className="mx-auto mb-4 sm:mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10">
              <Lightbulb weight="fill" className="h-7 w-7 text-accent-dark" />
            </div>
            <h2 className="text-balance text-heading-xl text-warm-900 sm:text-display">
              Et si de vrais visiteurs laissaient de vrais <span className="serif-accent">avis</span> ?
            </h2>
            <p className="mx-auto mt-4 sm:mt-6 max-w-2xl text-body-sm sm:text-body-lg text-warm-500">
              Pas de bots. Pas de faux comptes. Des étudiants sélectionnés qui visitent réellement votre établissement, vivent une expérience authentique, et laissent un avis détaillé basé sur du vécu.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="bg-warm-900 px-4 sm:px-6 py-14 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <Reveal className="mb-8 sm:mb-12 text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-accent">Comment ça marche</p>
            <h2 className="text-heading-xl text-white sm:text-display">
              Des avis authentiques, pas des <span className="serif-accent text-accent">faux.</span>
            </h2>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {HOW_IT_WORKS.map((step, i) => (
              <Reveal key={step.num} delay={i * 0.1}>
                <div className="text-center">
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-accent">
                    <step.Icon weight="bold" className="h-6 w-6" />
                  </div>
                  <p className="mb-1.5 text-xs font-bold uppercase tracking-wider text-accent">Étape {step.num}</p>
                  <h3 className="text-lg font-medium text-white">{step.title}</h3>
                  <p className="mx-auto mt-2 max-w-[260px] text-sm leading-relaxed text-white/50">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="px-4 sm:px-6 py-14 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-10 sm:mb-16 text-center">
            <p className="section-label mb-4 justify-center">Pourquoi ça marche</p>
            <h2 className="text-balance text-heading-xl text-warm-900 sm:text-display">
              Les avis sont le nerf de la <span className="serif-accent">guerre.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-body-sm sm:text-body-lg text-warm-500">
              88% des consommateurs font autant confiance aux avis en ligne qu&apos;aux recommandations personnelles.
            </p>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2">
            {BENEFITS.map((benefit, i) => (
              <Reveal key={benefit.title} delay={i * 0.06}>
                <div className="card-hover group relative flex h-full flex-col items-start gap-4 p-6">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-warm-100 text-warm-700 transition-colors group-hover:bg-accent-light group-hover:text-accent-dark">
                    <benefit.Icon weight="bold" className="h-5 w-5" />
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

      {/* ── Comparison table ── */}
      <section className="bg-warm-50 px-4 sm:px-6 py-14 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <Reveal className="mb-8 sm:mb-12 text-center">
            <p className="section-label mb-4 justify-center">Notre différence</p>
            <h2 className="text-heading-xl text-warm-900">
              Siva vs. les <span className="serif-accent">autres.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-2xl border border-warm-200 bg-white shadow-soft">
              <div className="grid grid-cols-3 border-b border-warm-200 bg-warm-50 px-3 sm:px-6 py-3 text-[11px] font-bold uppercase tracking-[0.15em] text-warm-400">
                <span>Critère</span>
                <span className="text-center">Boost Avis Siva</span>
                <span className="text-center">Autres services</span>
              </div>
              {COMPARISON.map((row, i) => (
                <div key={row.label} className={`grid grid-cols-3 items-center px-3 sm:px-6 py-4 ${i < COMPARISON.length - 1 ? 'border-b border-warm-100' : ''}`}>
                  <span className="text-sm font-medium text-warm-900">{row.label}</span>
                  <div className="flex justify-center">
                    <CheckCircle weight="fill" className="h-5 w-5 text-positive" />
                  </div>
                  <div className="flex justify-center">
                    {row.others ? (
                      <CheckCircle weight="fill" className="h-5 w-5 text-warm-300" />
                    ) : (
                      <span className="text-sm text-red-400">✕</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Témoignages ── */}
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
                <div className="card-hover flex h-full flex-col justify-between p-6">
                  <div>
                    <div className="mb-3 flex gap-0.5">
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <Star key={j} weight="fill" className="h-4 w-4 text-[#FBBC04]" />
                      ))}
                    </div>
                    <p className="text-[15px] leading-relaxed text-warm-600">&ldquo;{t.text}&rdquo;</p>
                  </div>
                  <div className="mt-6 flex items-center gap-3 border-t border-warm-100 pt-5">
                    <img src={t.avatar} alt={t.place} className="h-10 w-10 shrink-0 rounded-full border border-warm-200 object-cover" />
                    <div>
                      <p className="text-sm font-semibold text-warm-900">{t.name}</p>
                      <p className="text-xs text-warm-500">{t.role} @ {t.place}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="bg-warm-50 px-4 sm:px-6 py-14 sm:py-24">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <div className="rounded-2xl sm:rounded-3xl border border-warm-200 bg-white p-5 sm:p-8 shadow-soft lg:p-12">
              <div className="mb-8 text-center">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-warm-200 bg-warm-50 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-warm-500">
                  Candidature requise
                </span>
                <h3 className="mt-4 text-2xl font-medium text-warm-900">Boost Avis Expérience</h3>
                <div className="mt-4">
                  <span className="serif-accent text-[2.5rem] sm:text-[3.25rem] leading-none tracking-tight text-warm-900">Sur devis</span>
                </div>
                <p className="mt-2 text-sm text-warm-500">Tarif personnalisé selon votre secteur et vos besoins</p>
              </div>

              <div className="mb-8 h-px bg-warm-200/60" />

              <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.2em] text-warm-400">
                Ce qui est inclus
              </p>
              <ul className="grid gap-4 sm:grid-cols-2">
                {INCLUDED.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[15px] text-warm-700">
                    <CheckCircle weight="fill" className="mt-0.5 h-[18px] w-[18px] shrink-0 text-accent-dark" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-6 sm:mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/rendez-vous" className="btn-accent">
                  Candidater
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Garantie ── */}
      <section className="px-4 sm:px-6 py-14 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <div className="flex flex-col items-center gap-6 rounded-2xl sm:rounded-3xl border border-warm-200 bg-white p-5 sm:p-8 text-center shadow-soft md:flex-row md:text-left lg:p-10">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-positive/10">
                <Medal weight="fill" className="h-8 w-8 text-positive" />
              </div>
              <div>
                <h3 className="text-xl font-medium text-warm-900">100% conforme, 0% de risque</h3>
                <p className="mt-2 text-body-sm leading-relaxed text-warm-500">
                  Nos avis respectent à 100% les CGU Google. De vraies personnes, de vraies visites, de vrais avis. Si un avis est supprimé par Google (cas extrêmement rare), il est remplacé gratuitement.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-warm-50 px-4 sm:px-6 py-14 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <Reveal className="mb-8 sm:mb-12 text-center">
            <p className="section-label mb-4 justify-center">FAQ</p>
            <h2 className="text-heading-xl text-warm-900">
              Questions <span className="serif-accent">fréquentes</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-warm-200 bg-white px-4 sm:px-6 shadow-soft md:px-8">
              {FAQ_ITEMS.map((item) => (
                <FAQItem key={item.q} q={item.q} a={item.a} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA final ── */}
      <section className="bg-warm-900 px-4 sm:px-6 py-14 sm:py-20 text-white">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-heading-xl text-white">
              Prêt à booster vos <span className="serif-accent text-accent">avis Google</span> ?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-body-sm sm:text-body-lg text-white/60">
              Candidatez maintenant ou commencez par un audit gratuit pour évaluer votre potentiel.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/rendez-vous" className="btn-accent">
                Candidater
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
