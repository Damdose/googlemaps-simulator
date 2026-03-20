'use client';

import { useRef, useState, useEffect, FormEvent } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import {
  CheckCircle,
  ClockCountdown,
  NotePencil,
  Star,
  MapPin,
  Clock,
  Image as ImageIcon,
  CaretDown,
} from '@phosphor-icons/react';
import FreehandIcon from '@/components/FreehandIcon';

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

const STEPS = [
  { num: '1', icon: 'search' as const, title: 'Audit de la fiche actuelle', description: 'On passe votre fiche au peigne fin et on identifie tous les axes d\'amélioration.' },
  { num: '2', icon: 'pencil' as const, title: 'Optimisation complète', description: 'On optimise chaque section : catégories, description, photos, attributs, Q&A, services.' },
  { num: '3', icon: 'clock' as const, title: 'Livraison en 5 jours', description: 'Votre fiche optimisée est livrée avec un rapport détaillé de toutes les modifications.' },
];

const SCORE_ITEMS = [
  { label: 'Catégories', score: 95, color: 'bg-positive' },
  { label: 'Description SEO', score: 90, color: 'bg-positive' },
  { label: 'Photos', score: 85, color: 'bg-accent' },
  { label: 'Q&A / Services', score: 80, color: 'bg-accent' },
  { label: 'Cohérence NAP', score: 100, color: 'bg-positive' },
];

const INCLUDED = [
  'Audit complet de la fiche existante',
  'Optimisation catégories, attributs, description',
  'Upload et structuration des photos',
  'Setup Q&A, produits/services, horaires',
  'Publication des premiers posts Google',
  'Cohérence NAP sur les annuaires principaux',
];

const FEATURES = [
  {
    icon: 'sliders' as const,
    title: 'Catégories & attributs',
    description: 'On sélectionne les catégories primaires et secondaires optimales pour maximiser votre visibilité sur les bonnes requêtes.',
  },
  {
    icon: 'text' as const,
    title: 'Description optimisée SEO',
    description: 'Une description rédigée par nos experts, enrichie en mots-clés locaux stratégiques pour Google.',
  },
  {
    icon: 'camera' as const,
    title: 'Photos structurées',
    description: 'Upload et organisation de vos photos selon les bonnes pratiques Google : logo, couverture, intérieur, équipe, produits.',
  },
  {
    icon: 'list-checks' as const,
    title: 'Q&A, produits, services',
    description: 'Configuration complète des sections produits/services, FAQ pré-remplie et horaires optimisés.',
  },
  {
    icon: 'star' as const,
    title: 'Premiers posts Google',
    description: 'Publication de vos premiers posts pour activer la fiche et envoyer des signaux de fraîcheur à Google.',
  },
  {
    icon: 'globe' as const,
    title: 'Cohérence NAP',
    description: 'Vérification et correction du Nom, Adresse, Téléphone sur les annuaires principaux (Pages Jaunes, Yelp, etc.).',
  },
];

const TESTIMONIALS = [
  {
    name: 'Sophie R.',
    role: 'Avocate · Bordeaux',
    avatar: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=120&h=120&fit=crop&crop=center',
    text: 'Rapport impressionnant dès l\'audit gratuit. J\'ai été convaincue de passer à l\'accompagnement et j\'ai gagné 45% de visibilité en 2 mois. Professionnels et transparents.',
    rating: 5,
  },
  {
    name: 'Antoine L.',
    role: 'Médecin · Paris',
    avatar: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=120&h=120&fit=crop&crop=center',
    text: 'En tant que professionnel de santé, je ne connaissais rien au référencement. Siva a tout pris en main. Mon cabinet apparaît maintenant en 1ère position sur 80% de ma zone.',
    rating: 5,
  },
  {
    name: 'Camille M.',
    role: 'Opticienne · Nantes',
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
    q: 'Pourquoi ce prix pour optimiser une fiche Google ?',
    a: 'Une fiche Google bien optimisée génère en moyenne 70% de visibilité en plus, soit des dizaines de clients supplémentaires chaque mois. C\'est un investissement one-shot qui rapporte pendant des mois. Le ROI est généralement atteint dès le premier mois. Et si vous avez plusieurs établissements, les tarifs sont dégressifs (jusqu\'à -30%). Vous pouvez aussi ajouter des options comme le shooting photo pro ou le Booster Avis pour maximiser l\'impact.',
  },
];

const BASE_PRICE = 790;

const ADD_ONS = [
  {
    id: 'photo-pro',
    title: 'Shooting photo professionnel',
    description: 'Un photographe pro se déplace dans votre établissement pour capturer des photos qui convertissent.',
    price: 290,
  },
  {
    id: 'booster-avis',
    title: 'Booster Avis Google',
    description: 'Notre solution pour collecter automatiquement des avis 5 étoiles et booster votre réputation.',
    price: 99,
    priceLabel: '/mois',
    highlight: true,
    href: '/services/boost-avis-experience',
  },
];

const ESTABLISHMENT_TIERS = [
  { count: 1, label: '1', discount: 0 },
  { count: 2, label: '2', discount: 15 },
  { count: 3, label: '3', discount: 20 },
  { count: 4, label: '4', discount: 25 },
  { count: 5, label: '5+', discount: 30 },
];

function getDiscount(count: number): number {
  const tier = ESTABLISHMENT_TIERS.find(t => t.count === count);
  return tier?.discount ?? 0;
}

const FORM_FIELDS_CLASSES =
  'w-full rounded-xl border border-warm-200 bg-warm-50 px-4 py-3 text-sm text-warm-800 outline-none transition-colors placeholder:text-warm-400 focus:border-accent focus:ring-2 focus:ring-accent/20';

export default function OptimisationFicheGooglePage() {
  const [establishmentCount, setEstablishmentCount] = useState(1);
  const [selectedAddOns, setSelectedAddOns] = useState<Set<string>>(new Set());
  const discount = getDiscount(establishmentCount);
  const unitPrice = Math.round(BASE_PRICE * (1 - discount / 100));

  function toggleAddOn(id: string) {
    setSelectedAddOns(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const wheelSelectorRef = useRef<HTMLDivElement>(null);
  const wheelDebounce = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const el = wheelSelectorRef.current;
    if (!el) return;

    const handler = (e: WheelEvent) => {
      e.preventDefault();
      if (wheelDebounce.current) return;

      setEstablishmentCount(prev => {
        const idx = ESTABLISHMENT_TIERS.findIndex(t => t.count === prev);
        const next = e.deltaY > 0
          ? Math.min(idx + 1, ESTABLISHMENT_TIERS.length - 1)
          : Math.max(idx - 1, 0);
        return ESTABLISHMENT_TIERS[next].count;
      });

      wheelDebounce.current = setTimeout(() => {
        wheelDebounce.current = undefined;
      }, 150);
    };

    el.addEventListener('wheel', handler, { passive: false });
    return () => el.removeEventListener('wheel', handler);
  }, []);

  const [formState, setFormState] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [form, setForm] = useState({
    businessName: '',
    sector: '',
    city: '',
    contactName: '',
    email: '',
    phone: '',
    message: '',
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormState('sending');
    setTimeout(() => setFormState('sent'), 1200);
  }

  return (
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
                  <NotePencil weight="fill" className="h-4 w-4 text-accent-dark" />
                  One-shot · À partir de 790€ HT
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <h1 className="text-balance text-heading-xl text-warm-900 sm:text-display-lg md:text-display-xl">
                  Transformez votre fiche Google en <span className="serif-accent serif-accent-animated">machine à clients</span>
                </h1>
              </Reveal>

              <Reveal delay={0.16}>
                <p className="mt-4 sm:mt-6 max-w-xl text-body-sm sm:text-body-lg text-warm-600">
                  Votre fiche Google est votre vitrine n°1 sur internet.
                  On l&apos;optimise de A à Z pour que chaque recherche locale se transforme en appel, en visite, en client.
                </p>
              </Reveal>

              <Reveal delay={0.24}>
                <div className="mt-6 sm:mt-10 flex flex-col gap-4 sm:flex-row">
                  <a href="#formulaire" className="btn-primary">
                    Optimiser ma fiche
                  </a>
                  <a href="#concept" className="btn-secondary">
                    Comment ça marche
                  </a>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.3} className="relative hidden min-h-[420px] lg:block">
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

      {/* ── 3. Pain – Fiche non optimisée ── */}
      <section className="px-4 sm:px-6 py-14 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <Reveal className="mb-10 sm:mb-16 text-center">
            <p className="section-label mb-4 justify-center">Le problème</p>
            <h2 className="text-balance text-heading-xl text-warm-900 sm:text-display">
              Vos clients vous cherchent sur Google.<br />
              <span className="serif-accent">Vous trouvent-ils ?</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-body-sm sm:text-body-lg text-warm-500">
              Lorsque des clients recherchent un service près de chez eux, Google affiche en priorité les fiches les plus pertinentes et les mieux optimisées.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mx-auto max-w-3xl rounded-2xl sm:rounded-3xl border border-red-200/60 bg-red-50/50 p-6 sm:p-10">
              <p className="mb-5 text-center text-sm font-bold uppercase tracking-wider text-red-400">
                Si votre fiche n&apos;est pas optimisée
              </p>
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { icon: 'eye' as const, title: 'Moins de visibilité', text: 'Vous apparaissez moins souvent dans les résultats locaux et sur Google Maps.' },
                  { icon: 'phone' as const, title: 'Moins d\'appels', text: 'Les clients ne vous trouvent pas, donc ne vous contactent pas.' },
                  { icon: 'target' as const, title: 'Vos concurrents gagnent', text: 'Les fiches mieux optimisées captent les clients à votre place.' },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center gap-3 rounded-xl bg-white/80 p-5 text-center shadow-soft">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-red-500">
                      <FreehandIcon name={item.icon} size={22} />
                    </div>
                    <h3 className="text-sm font-semibold text-warm-900">{item.title}</h3>
                    <p className="text-xs leading-relaxed text-warm-500">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 4. Bénéfices de l'optimisation ── */}
      <section className="bg-warm-50 px-4 sm:px-6 py-14 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <Reveal className="mb-10 sm:mb-16 text-center">
            <p className="section-label mb-4 justify-center">Les bénéfices</p>
            <h2 className="text-balance text-heading-xl text-warm-900 sm:text-display">
              Une fiche optimisée, c&apos;est plus de <span className="serif-accent">clients.</span>
            </h2>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { icon: 'map-pin' as const, title: 'Visibilité maximale sur Google Maps', text: 'Apparaissez en haut des résultats locaux, là où vos clients vous cherchent.' },
              { icon: 'coins' as const, title: 'Plus de chiffre d\'affaires', text: 'Plus de visibilité = plus d\'appels, plus de visites en magasin, plus de ventes.' },
              { icon: 'shield' as const, title: 'Crédibilité renforcée', text: 'Une fiche complète et bien gérée inspire confiance et améliore votre réputation en ligne.' },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="group flex h-full flex-col items-center gap-4 rounded-2xl border border-warm-200/80 bg-white p-6 text-center shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-card sm:p-8">
                  <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-accent/20 to-accent/5 ring-1 ring-accent/10 text-accent transition-colors group-hover:from-accent/30 group-hover:to-accent/10">
                    <FreehandIcon name={item.icon} size={30} />
                  </div>
                  <h3 className="text-lg font-medium text-warm-900">{item.title}</h3>
                  <p className="text-body-sm leading-relaxed text-warm-500">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3} className="mt-10 text-center">
            <a href="#formulaire" className="btn-primary">
              Optimiser ma fiche
            </a>
          </Reveal>
        </div>
      </section>

      {/* ── 5. Comment ça marche ── */}
      <section id="concept" className="relative overflow-hidden bg-warm-900 px-4 sm:px-6 py-14 sm:py-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-accent/[0.04] blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-5xl">
          <Reveal className="mb-10 sm:mb-16 text-center">
            <p className="section-label mb-4 justify-center !text-accent before:!bg-accent/40">Comment ça marche</p>
            <h2 className="text-balance text-heading-xl text-white sm:text-display">
              Simple, rapide, <span className="serif-accent text-accent">efficace.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-body-sm sm:text-body-lg text-white/50">
              On audite, on optimise, on livre. Votre fiche est prête à performer en 5 jours.
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {STEPS.map((step, i) => (
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

      {/* ── 4. Pricing ── */}
      <section className="bg-warm-50 px-4 sm:px-6 py-14 sm:py-24">
        <div className="mx-auto max-w-4xl">
          <Reveal className="mb-6 sm:mb-8 text-center">
            <p className="section-label mb-3 justify-center">Tarif</p>
            <h2 className="text-balance text-heading-xl text-warm-900 sm:text-display">
              Un investissement <span className="serif-accent">one-shot</span>
            </h2>
            <p className="mx-auto mt-3 max-w-md text-body-sm text-warm-500">
              Tout est inclus. Aucun coût caché, aucun abonnement.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mx-auto mb-8 flex flex-col items-center gap-3 sm:mb-12 sm:gap-4">
              <div className="flex items-center gap-2 text-xs font-medium text-warm-500 sm:gap-2.5 sm:text-sm">
                <MapPin weight="fill" className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span>Nombre d&apos;établissements</span>
              </div>
              <div
                ref={wheelSelectorRef}
                className="relative inline-flex items-center gap-0.5 rounded-full bg-warm-100/80 p-1 backdrop-blur-sm cursor-ns-resize sm:gap-1"
                title="Scrollez pour changer"
              >
                {ESTABLISHMENT_TIERS.map((tier) => (
                  <button
                    key={tier.count}
                    onClick={() => setEstablishmentCount(tier.count)}
                    className={`relative z-[1] flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold transition-all duration-200 sm:h-11 sm:w-11 sm:text-[13px] ${
                      establishmentCount === tier.count
                        ? 'text-white'
                        : 'text-warm-400 hover:text-warm-600'
                    }`}
                  >
                    {establishmentCount === tier.count && (
                      <motion.div
                        layoutId="est-pill-optim"
                        className="absolute inset-0 rounded-full bg-warm-900 shadow-lg shadow-warm-900/20"
                        transition={{ type: 'spring', stiffness: 500, damping: 32 }}
                      />
                    )}
                    <span className="relative">{tier.label}</span>
                  </button>
                ))}
              </div>
              {discount > 0 && (
                <motion.div
                  key={discount}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-1.5 rounded-full bg-positive/[0.08] px-3.5 py-1.5"
                >
                  <span className="text-xs font-bold text-positive">-{discount}%</span>
                  <span className="text-xs text-positive/70">sur le prix</span>
                </motion.div>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-2xl sm:rounded-3xl border-2 border-accent/30 bg-white p-5 sm:p-8 shadow-[0_8px_60px_rgba(240,199,94,0.12)] lg:p-12">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-accent/[0.04] to-transparent sm:rounded-3xl pointer-events-none" />

              <div className="relative mb-8 text-center">
                <span className="mb-2.5 block text-[9px] font-bold uppercase tracking-[0.2em] text-warm-400 sm:text-[10px]">
                  One-shot
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-warm-900 shadow-lg shadow-accent/25">
                  Populaire
                </span>
                <h3 className="mt-4 text-2xl font-medium text-warm-900">Optimisation Fiche Google</h3>
                <div className="mt-5">
                  <span className="mb-1 block text-[11px] font-medium text-warm-400 sm:text-xs">
                    {establishmentCount > 1 ? 'Par établissement' : 'À partir de'}
                  </span>
                  <div className="flex items-baseline justify-center gap-1.5 sm:gap-2">
                    <motion.span
                      key={`${establishmentCount}-${selectedAddOns.size}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25 }}
                      className="serif-accent text-[2.5rem] sm:text-[3.25rem] leading-none tracking-tight text-warm-900"
                    >
                      {unitPrice}€
                    </motion.span>
                    <span className="text-xs font-medium text-warm-500 sm:text-sm">HT</span>
                  </div>
                  {discount > 0 && (
                    <motion.div
                      key={`discount-${establishmentCount}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-2 flex items-center justify-center gap-2"
                    >
                      <span className="text-xs text-warm-400 line-through">{BASE_PRICE}€ HT</span>
                      <span className="rounded-full bg-positive/10 px-2 py-0.5 text-[11px] font-bold text-positive">
                        −{discount}%
                      </span>
                    </motion.div>
                  )}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-warm-600 sm:text-[15px]">
                  Optimisation complète de votre fiche Google pour maximiser vos appels et vos visites.
                </p>
              </div>

              <div className="relative mb-8 h-px bg-warm-200/60" />

              <p className="relative mb-6 text-[10px] font-bold uppercase tracking-[0.2em] text-warm-400">
                Ce qu&apos;on fait
              </p>
              <ul className="relative grid gap-4 sm:grid-cols-2">
                {INCLUDED.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[15px] text-warm-700">
                    <CheckCircle weight="fill" className="mt-0.5 h-[18px] w-[18px] shrink-0 text-accent-dark" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="relative my-8 h-px bg-warm-200/60" />

              <p className="relative mb-5 text-[10px] font-bold uppercase tracking-[0.2em] text-warm-400">
                Boostez vos résultats avec un add-on
              </p>
              <div className="relative grid gap-3 sm:grid-cols-2">
                {ADD_ONS.map((addon) => (
                  <button
                    key={addon.id}
                    type="button"
                    onClick={() => toggleAddOn(addon.id)}
                    className={`group relative flex flex-col gap-2 rounded-xl border-2 p-4 text-left transition-all duration-200 sm:p-5 ${
                      selectedAddOns.has(addon.id)
                        ? 'border-accent bg-accent-light/40 shadow-md'
                        : 'border-warm-200 bg-warm-50/50 hover:border-warm-300'
                    }`}
                  >
                    {addon.highlight && (
                      <span className="absolute -top-2.5 right-3 rounded-full bg-accent px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-warm-900">
                        Recommandé
                      </span>
                    )}
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-warm-900">{addon.title}</span>
                      <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                        selectedAddOns.has(addon.id)
                          ? 'border-accent-dark bg-accent-dark'
                          : 'border-warm-300'
                      }`}>
                        {selectedAddOns.has(addon.id) && (
                          <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <p className="text-xs leading-relaxed text-warm-500">{addon.description}</p>
                    <p className="mt-auto text-sm font-bold text-warm-900">
                      +{addon.price}€{addon.priceLabel ?? ' HT'}
                    </p>
                  </button>
                ))}
              </div>

              <div className="relative mt-6 sm:mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a href="#formulaire" className="btn-primary">
                  Optimiser ma fiche
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 5. Avantages ── */}
      <section className="bg-warm-100 px-4 sm:px-6 py-14 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-10 sm:mb-16 text-center">
            <p className="section-label mb-4 justify-center">Ce qu&apos;on optimise</p>
            <h2 className="text-balance text-heading-xl text-warm-900 sm:text-display">
              Chaque détail de votre fiche <span className="serif-accent">compte.</span>
            </h2>
          </Reveal>

          <div className="grid gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {FEATURES.map((feat, i) => (
              <Reveal key={feat.title} delay={i * 0.06}>
                <div className="group relative flex h-full flex-col items-start gap-4 rounded-xl border border-warm-200/80 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] sm:rounded-2xl sm:p-7">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-warm-100 text-warm-700 transition-colors group-hover:bg-accent-light group-hover:text-accent-dark">
                    <FreehandIcon name={feat.icon} size={20} />
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

      {/* ── 8. Formulaire ── */}
      <section id="formulaire" className="px-4 sm:px-6 py-14 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <Reveal className="mb-8 sm:mb-12 text-center">
            <p className="section-label mb-4 justify-center">Demande</p>
            <h2 className="text-balance text-heading-xl text-warm-900 sm:text-display">
              Faites de votre fiche une <span className="serif-accent">machine à clients</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-body-sm sm:text-body-lg text-warm-500">
              Remplissez le formulaire, on vous recontacte sous 24h avec un plan d&apos;action personnalisé.
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="rounded-2xl sm:rounded-3xl border border-warm-200 bg-white p-5 sm:p-8 shadow-card lg:p-10">
              {formState === 'sent' ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-positive/10">
                    <CheckCircle weight="fill" className="h-8 w-8 text-positive" />
                  </div>
                  <h3 className="text-2xl font-medium text-warm-900">
                    Demande envoyée !
                  </h3>
                  <p className="mt-3 max-w-sm text-sm text-warm-500">
                    Merci pour votre demande. Notre équipe vous recontacte sous 24h
                    avec un plan d&apos;action personnalisé.
                  </p>
                  <button
                    onClick={() => {
                      setFormState('idle');
                      setForm({ businessName: '', sector: '', city: '', contactName: '', email: '', phone: '', message: '' });
                    }}
                    className="mt-8 text-sm font-semibold text-accent-dark transition-colors hover:underline"
                  >
                    Envoyer une autre demande
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="businessName" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-warm-400">
                        Nom de l&apos;établissement *
                      </label>
                      <input id="businessName" name="businessName" type="text" required value={form.businessName} onChange={handleChange} placeholder="Mon établissement" className={FORM_FIELDS_CLASSES} />
                    </div>
                    <div>
                      <label htmlFor="sector" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-warm-400">
                        Secteur d&apos;activité *
                      </label>
                      <select id="sector" name="sector" required value={form.sector} onChange={handleChange} className={FORM_FIELDS_CLASSES}>
                        <option value="">Sélectionnez</option>
                        <option value="restaurant">Restaurant / Café</option>
                        <option value="commerce">Commerce de détail</option>
                        <option value="sante">Santé / Médical</option>
                        <option value="beaute">Beauté / Bien-être</option>
                        <option value="artisan">Artisan / Service</option>
                        <option value="hotel">Hôtel / Hébergement</option>
                        <option value="autre">Autre</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="city" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-warm-400">
                        Ville *
                      </label>
                      <input id="city" name="city" type="text" required value={form.city} onChange={handleChange} placeholder="Paris" className={FORM_FIELDS_CLASSES} />
                    </div>
                    <div>
                      <label htmlFor="contactName" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-warm-400">
                        Nom du responsable *
                      </label>
                      <input id="contactName" name="contactName" type="text" required value={form.contactName} onChange={handleChange} placeholder="Jean Dupont" className={FORM_FIELDS_CLASSES} />
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="email" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-warm-400">
                        Email *
                      </label>
                      <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} placeholder="contact@moncommerce.fr" className={FORM_FIELDS_CLASSES} />
                    </div>
                    <div>
                      <label htmlFor="phone" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-warm-400">
                        Téléphone (optionnel)
                      </label>
                      <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="06 12 34 56 78" className={FORM_FIELDS_CLASSES} />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-warm-400">
                      Un mot sur votre projet (optionnel)
                    </label>
                    <textarea id="message" name="message" rows={4} value={form.message} onChange={handleChange} placeholder="Décrivez votre établissement, votre situation actuelle sur Google, vos objectifs..." className={`${FORM_FIELDS_CLASSES} resize-none`} />
                  </div>

                  <button type="submit" disabled={formState === 'sending'} className="btn-primary disabled:opacity-60">
                    {formState === 'sending' ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Envoi en cours...
                      </span>
                    ) : (
                      'Envoyer ma demande'
                    )}
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA final ── */}
      <section className="rounded-t-[1.5rem] bg-warm-900 px-4 sm:px-6 py-14 sm:py-20 sm:rounded-t-[2.5rem] text-white">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-heading-xl sm:text-display md:text-display-lg text-white">
              Votre fiche mérite d&apos;être au <span className="serif-accent text-accent">top.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-body-sm sm:text-body-lg text-white/60">
              Commencez par un audit gratuit pour voir votre marge de progression, ou demandez directement votre optimisation.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a href="#formulaire" className="btn-accent">
                Optimiser ma fiche
              </a>
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
