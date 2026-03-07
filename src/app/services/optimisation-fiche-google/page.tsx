'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import {
  CheckCircle,
  Camera,
  ClockCountdown,
  Globe,
  ListChecks,
  MagnifyingGlass,
  NotePencil,
  Sliders,
  Star,
  TextAa,
  MapPin,
  Clock,
  Image as ImageIcon,
  CaretDown,
  Warning,
  Lightbulb,
  Trophy,
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

const FEATURES = [
  {
    Icon: Sliders,
    title: 'Catégories & attributs',
    description: 'On sélectionne les catégories primaires et secondaires optimales pour maximiser votre visibilité sur les bonnes requêtes.',
  },
  {
    Icon: TextAa,
    title: 'Description optimisée SEO',
    description: 'Une description rédigée par nos experts, enrichie en mots-clés locaux stratégiques pour Google.',
  },
  {
    Icon: Camera,
    title: 'Photos structurées',
    description: 'Upload et organisation de vos photos selon les bonnes pratiques Google : logo, couverture, intérieur, équipe, produits.',
  },
  {
    Icon: ListChecks,
    title: 'Q&A, produits, services',
    description: 'Configuration complète des sections produits/services, FAQ pré-remplie et horaires optimisés.',
  },
  {
    Icon: Star,
    title: 'Premiers posts Google',
    description: 'Publication de vos premiers posts pour activer la fiche et envoyer des signaux de fraîcheur à Google.',
  },
  {
    Icon: Globe,
    title: 'Cohérence NAP',
    description: 'Vérification et correction du Nom, Adresse, Téléphone sur les annuaires principaux (Pages Jaunes, Yelp, etc.).',
  },
];

const INCLUDED = [
  'Audit complet de la fiche existante',
  'Optimisation catégories, attributs, description',
  'Upload et structuration des photos',
  'Setup Q&A, produits/services, horaires',
  'Publication des premiers posts Google',
  'Cohérence NAP sur les annuaires principaux',
];

const STEPS = [
  { num: '1', Icon: MagnifyingGlass, title: 'Audit de la fiche actuelle', desc: 'On passe votre fiche au peigne fin et on identifie tous les axes d\'amélioration.' },
  { num: '2', Icon: NotePencil, title: 'Optimisation complète', desc: 'On optimise chaque section : catégories, description, photos, attributs, Q&A, services.' },
  { num: '3', Icon: ClockCountdown, title: 'Livraison en 5 jours', desc: 'Votre fiche optimisée est livrée avec un rapport détaillé de toutes les modifications.' },
];

const SCORE_ITEMS = [
  { label: 'Catégories', score: 95, color: 'bg-positive' },
  { label: 'Description SEO', score: 90, color: 'bg-positive' },
  { label: 'Photos', score: 85, color: 'bg-accent' },
  { label: 'Q&A / Services', score: 80, color: 'bg-accent' },
  { label: 'Cohérence NAP', score: 100, color: 'bg-positive' },
];

const PROBLEMS = [
  {
    Icon: Warning,
    title: 'Fiche incomplète = invisible',
    description: 'Google pénalise les fiches mal renseignées. Si vos catégories, attributs ou photos manquent, vous perdez des positions chaque jour.',
  },
  {
    Icon: MapPin,
    title: 'Vos concurrents vous dépassent',
    description: 'Les commerces avec des fiches optimisées reçoivent 7x plus de clics que les fiches basiques. Chaque détail compte dans le classement.',
  },
  {
    Icon: MagnifyingGlass,
    title: 'Mauvaises catégories = mauvais clients',
    description: 'Avec les mauvaises catégories, Google vous montre aux mauvaises personnes. Vous manquez les requêtes qui convertissent vraiment.',
  },
];

const STATS = [
  { value: '92/100', label: 'Score moyen post-optimisation' },
  { value: '5 jours', label: 'Délai de livraison' },
  { value: '+70%', label: 'de visibilité en moyenne' },
  { value: '350+', label: 'Fiches optimisées' },
];

const BEFORE_AFTER = [
  { label: 'Catégories', before: '1 générique', after: '3 optimisées' },
  { label: 'Description', before: '0 mot-clé local', after: 'SEO complète' },
  { label: 'Photos', before: '3 photos floues', after: '25+ structurées' },
  { label: 'Q&A', before: 'Aucune', after: '10 questions clés' },
  { label: 'Posts Google', before: 'Jamais publié', after: '4 posts actifs' },
  { label: 'Cohérence NAP', before: '3 erreurs trouvées', after: '100% corrigé' },
];

const TESTIMONIALS = [
  {
    name: 'Sophie R.',
    role: 'Avocate',
    place: 'Cabinet Voltaire Avocats, Bordeaux',
    avatar: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=120&h=120&fit=crop&crop=center',
    text: 'Rapport impressionnant dès l\'audit gratuit. J\'ai été convaincue de passer à l\'accompagnement et j\'ai gagné 45% de visibilité en 2 mois. Professionnels et transparents.',
    rating: 5,
  },
  {
    name: 'Dr Leroy',
    role: 'Médecin',
    place: 'Cabinet Médical Haussmann, Paris',
    avatar: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=120&h=120&fit=crop&crop=center',
    text: 'En tant que professionnel de santé, je ne connaissais rien au référencement. Siva a tout pris en main. Mon cabinet apparaît maintenant en 1ère position sur 80% de ma zone.',
    rating: 5,
  },
  {
    name: 'Camille M.',
    role: 'Opticienne',
    place: 'Optique Saint-Germain, Nantes',
    avatar: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=120&h=120&fit=crop&crop=center',
    text: 'L\'approche data-driven de Siva est bluffante. On voit exactement ce qui marche, zone par zone. Nos concurrents nous demandent comment on fait.',
    rating: 5,
  },
];

const FAQ_ITEMS = [
  {
    q: 'Qu\'est-ce qui est concrètement optimisé sur ma fiche ?',
    a: 'Tout : catégorie principale et secondaires, description SEO, attributs, photos structurées (logo, couverture, intérieur, produits), Q&A, sections produits/services, horaires, et cohérence NAP sur les annuaires. Rien n\'est laissé au hasard.',
  },
  {
    q: 'J\'ai déjà une fiche Google, c\'est quand même utile ?',
    a: 'La plupart des fiches que nous auditons ont un score d\'optimisation entre 30 et 50/100. Même si votre fiche existe, il y a probablement des dizaines d\'améliorations à faire pour maximiser votre visibilité et vos conversions.',
  },
  {
    q: 'Combien de temps avant de voir les effets ?',
    a: 'Les premières améliorations sont visibles sous 1 à 2 semaines après la livraison. Google a besoin de temps pour "digérer" les modifications. Les effets complets se manifestent en 3 à 4 semaines.',
  },
  {
    q: 'Est-ce que je dois fournir les photos ?',
    a: 'Idéalement oui, car les photos de votre vrai établissement performent bien mieux. On vous donne un brief photo détaillé (quoi photographier, sous quel angle, etc.) pour faciliter la prise de vue. On s\'occupe ensuite du recadrage et de l\'upload.',
  },
  {
    q: 'Que se passe-t-il après la livraison ?',
    a: 'Vous recevez un rapport complet détaillant toutes les modifications réalisées, avec des recommandations pour maintenir et améliorer votre fiche dans le temps. Si vous souhaitez un suivi mensuel, on propose aussi un accompagnement continu.',
  },
  {
    q: 'Pourquoi 500€ pour optimiser une fiche Google ?',
    a: 'Une fiche Google bien optimisée génère en moyenne 70% de visibilité en plus, soit des dizaines de clients supplémentaires chaque mois. C\'est un investissement one-shot qui rapporte pendant des mois. Le ROI est généralement atteint dès le premier mois.',
  },
];

export default function OptimisationFicheGooglePage() {
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
                  <NotePencil weight="fill" className="h-4 w-4 text-accent-dark" />
                  One-shot · 500€ · Populaire
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <h1 className="text-balance text-heading-xl text-warm-900 sm:text-display-lg md:text-display-xl">
                  Optimisation <span className="serif-accent serif-accent-animated">Fiche Google</span>
                </h1>
              </Reveal>

              <Reveal delay={0.16}>
                <p className="mt-4 sm:mt-6 max-w-xl text-body-sm sm:text-body-lg text-warm-600">
                  Une fiche Google 100% optimisée qui convertit les recherches en clients.
                  On s&apos;occupe de tout, vous récupérez une fiche prête à performer.
                </p>
              </Reveal>

              <Reveal delay={0.24}>
                <div className="mt-6 sm:mt-10 flex flex-col gap-4 sm:flex-row">
                  <Link href="/rendez-vous" className="btn-primary">
                    Prendre rendez-vous
                  </Link>
                  <Link href="/audit-gratuit" className="btn-secondary">
                    Audit gratuit
                  </Link>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.3} className="relative hidden min-h-[420px] lg:block">
              {/* Google Business Profile card */}
              <motion.div
                className="absolute right-0 top-0 z-10 w-[310px] overflow-hidden rounded-2xl border border-[#e8eaed] bg-white shadow-card"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="flex items-center gap-2 border-b border-[#e8eaed] bg-[#f8f9fa] px-4 py-2.5">
                  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] shrink-0"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                  <span className="text-[12px] font-medium text-[#202124]">Google Business Profile</span>
                </div>
                <div className="p-4">
                  <div className="mb-2 flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4285F4]">
                      <span className="text-[14px] font-bold text-white">VE</span>
                    </div>
                    <div>
                      <p className="text-[14px] font-medium text-[#202124]">Votre Établissement</p>
                      <p className="text-[12px] text-[#70757a]">Restaurant · Paris 11e</p>
                    </div>
                  </div>
                  <div className="my-2.5 flex items-center gap-1.5">
                    <span className="text-[13px] font-medium text-[#202124]">4.8</span>
                    <div className="flex gap-px">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} weight="fill" className="h-3.5 w-3.5 text-[#FBBC04]" />
                      ))}
                    </div>
                    <span className="text-[12px] text-[#70757a]">(186)</span>
                  </div>
                  <div className="space-y-1.5 border-t border-[#e8eaed] pt-2.5">
                    <div className="flex items-center gap-2 text-[12px] text-[#3c4043]">
                      <Clock weight="bold" className="h-3.5 w-3.5 text-[#137333]" />
                      <span className="font-medium text-[#137333]">Ouvert</span>
                      <span className="text-[#70757a]">· Ferme à 23:00</span>
                    </div>
                    <div className="flex items-center gap-2 text-[12px] text-[#3c4043]">
                      <MapPin weight="bold" className="h-3.5 w-3.5 text-[#70757a]" />
                      42 Rue Oberkampf, 75011 Paris
                    </div>
                    <div className="flex items-center gap-2 text-[12px] text-[#3c4043]">
                      <ImageIcon weight="bold" className="h-3.5 w-3.5 text-[#70757a]" />
                      48 photos · Mise à jour récente
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Optimization score card */}
              <motion.div
                className="absolute bottom-0 left-0 z-20 w-[265px] overflow-hidden rounded-2xl border border-[#e8eaed] bg-white shadow-card"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
              >
                <div className="flex items-center justify-between border-b border-[#e8eaed] bg-[#f8f9fa] px-4 py-2.5">
                  <div className="flex items-center gap-1.5">
                    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#137333"/></svg>
                    <span className="text-[11px] font-medium text-[#202124]">Score d&apos;optimisation</span>
                  </div>
                  <span className="text-[12px] font-bold text-[#137333]">92/100</span>
                </div>
                <div className="p-4">
                  <div className="mb-3 h-[6px] overflow-hidden rounded-full bg-[#e8eaed]">
                    <div className="h-full w-[92%] rounded-full bg-[#137333]" />
                  </div>
                  <div className="space-y-2">
                    {SCORE_ITEMS.map((item) => (
                      <div key={item.label} className="flex items-center gap-2.5">
                        <span className="w-24 text-[11px] text-[#70757a]">{item.label}</span>
                        <div className="h-[5px] flex-1 overflow-hidden rounded-full bg-[#e8eaed]">
                          <div className={`h-full rounded-full ${item.score >= 90 ? 'bg-[#137333]' : item.score >= 70 ? 'bg-[#FBBC04]' : 'bg-[#ea4335]'}`} style={{ width: `${item.score}%` }} />
                        </div>
                        <span className="text-[11px] font-medium text-[#202124]">{item.score}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Delivery badge */}
              <motion.div
                className="absolute right-4 bottom-12 z-30 flex items-center gap-2 rounded-full border border-[#e8eaed] bg-white px-3.5 py-2 shadow-card"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#e8f0fe]">
                  <ClockCountdown weight="fill" className="h-3.5 w-3.5 text-[#1a73e8]" />
                </div>
                <div>
                  <p className="text-[10px] text-[#70757a]">Livraison</p>
                  <p className="text-[13px] font-bold text-[#1a73e8]">5 jours</p>
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
              Votre fiche Google travaille <span className="serif-accent">contre vous.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-body-sm sm:text-body-lg text-warm-500">
              56% des commerces locaux n&apos;ont jamais optimisé leur fiche Google Business Profile. Ils perdent des dizaines de clients chaque mois sans le savoir.
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
              Et si votre fiche devenait votre meilleur <span className="serif-accent">commercial</span> ?
            </h2>
            <p className="mx-auto mt-4 sm:mt-6 max-w-2xl text-body-sm sm:text-body-lg text-warm-500">
              Une fiche Google optimisée reçoit en moyenne 7x plus de clics, 3x plus d&apos;appels et 2x plus de demandes d&apos;itinéraire. On vous la livre prête à performer en 5 jours.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Before / After ── */}
      <section className="bg-warm-50 px-4 sm:px-6 py-14 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <Reveal className="mb-8 sm:mb-12 text-center">
            <p className="section-label mb-4 justify-center">Avant / Après</p>
            <h2 className="text-heading-xl text-warm-900">
              La transformation de votre <span className="serif-accent">fiche.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-2xl border border-warm-200 bg-white shadow-soft">
              <div className="grid grid-cols-3 border-b border-warm-200 bg-warm-50 px-3 sm:px-6 py-3 text-[11px] font-bold uppercase tracking-[0.15em] text-warm-400">
                <span>Section</span>
                <span className="text-center">Avant</span>
                <span className="text-center">Après</span>
              </div>
              {BEFORE_AFTER.map((row, i) => (
                <div key={row.label} className={`grid grid-cols-3 items-center px-3 sm:px-6 py-4 ${i < BEFORE_AFTER.length - 1 ? 'border-b border-warm-100' : ''}`}>
                  <span className="text-sm font-semibold text-warm-900">{row.label}</span>
                  <span className="text-center text-sm text-red-400">{row.before}</span>
                  <span className="text-center text-sm font-medium text-positive">{row.after}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="bg-warm-900 px-4 sm:px-6 py-14 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <Reveal className="mb-8 sm:mb-12 text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-accent">Comment ça marche</p>
            <h2 className="text-heading-xl text-white sm:text-display">
              Simple, rapide, <span className="serif-accent text-accent">efficace.</span>
            </h2>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <Reveal key={step.num} delay={i * 0.1}>
                <div className="text-center">
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-accent">
                    <step.Icon weight="bold" className="h-6 w-6" />
                  </div>
                  <p className="mb-1.5 text-xs font-bold uppercase tracking-wider text-accent">Étape {step.num}</p>
                  <h3 className="text-lg font-medium text-white">{step.title}</h3>
                  <p className="mx-auto mt-2 max-w-[260px] text-sm leading-relaxed text-white/50">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="px-4 sm:px-6 py-14 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-10 sm:mb-16 text-center">
            <p className="section-label mb-4 justify-center">Ce qu&apos;on optimise</p>
            <h2 className="text-balance text-heading-xl text-warm-900 sm:text-display">
              Chaque détail de votre fiche <span className="serif-accent">compte.</span>
            </h2>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feat, i) => (
              <Reveal key={feat.title} delay={i * 0.06}>
                <div className="card-hover group relative flex h-full flex-col items-start gap-4 p-6">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-warm-100 text-warm-700 transition-colors group-hover:bg-accent-light group-hover:text-accent-dark">
                    <feat.Icon weight="bold" className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-warm-900">{feat.title}</h3>
                    <p className="mt-2 text-body-sm leading-relaxed text-warm-500">{feat.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Témoignages ── */}
      <section className="bg-warm-50 px-4 sm:px-6 py-14 sm:py-24">
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
      <section className="px-4 sm:px-6 py-14 sm:py-24">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <div className="rounded-2xl sm:rounded-3xl border border-warm-200 bg-white p-5 sm:p-8 shadow-soft lg:p-12">
              <div className="mb-8 text-center">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-warm-900 shadow-lg shadow-accent/25">
                  Populaire
                </span>
                <h3 className="mt-4 text-2xl font-medium text-warm-900">Optimisation Fiche Google</h3>
                <div className="mt-4">
                  <span className="serif-accent text-[2.5rem] sm:text-[3.25rem] leading-none tracking-tight text-warm-900">500€</span>
                </div>
                <p className="mt-2 text-sm text-warm-500">Livré en 5 jours ouvrés</p>
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
                  Prendre rendez-vous
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
                <Trophy weight="fill" className="h-8 w-8 text-positive" />
              </div>
              <div>
                <h3 className="text-xl font-medium text-warm-900">Satisfait ou on recommence</h3>
                <p className="mt-2 text-body-sm leading-relaxed text-warm-500">
                  Si votre score d&apos;optimisation n&apos;atteint pas au moins 85/100 après notre intervention, on retravaille votre fiche gratuitement jusqu&apos;à satisfaction. Plus de 350 fiches optimisées, 100% de clients satisfaits.
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
              Votre fiche mérite d&apos;être au <span className="serif-accent text-accent">top</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-body-sm sm:text-body-lg text-white/60">
              Commencez par un audit gratuit pour voir votre marge de progression, ou prenez rendez-vous directement.
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
