'use client';

import { useRef, useState, FormEvent } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  CaretDown,
  CheckCircle,
  Gift,
  MapPin,
  Star,
  UsersThree,
  CalendarCheck,
  ForkKnife,
  Trophy,
  Handshake,
  UserPlus,
} from '@phosphor-icons/react';
import FreehandIcon, { type FreehandIconName } from '@/components/FreehandIcon';

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
        <span className="text-sm sm:text-[17px] font-medium text-warm-900">{q}</span>
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
  {
    num: '1',
    icon: 'unlock' as const satisfies FreehandIconName,
    title: 'Inscrivez votre association',
    description:
      'Formulaire en 2 minutes. Aucun frais, aucun engagement. Votre candidature est étudiée sous 48h.',
  },
  {
    num: '2',
    icon: 'store' as const satisfies FreehandIconName,
    title: 'Vos membres vivent l\'expérience',
    description:
      'On vous envoie des invitations : restaurants, mais aussi des services en ligne (formations, applications, etc.). Vos membres testent en physique ou à distance, selon la mission.',
  },
  {
    num: '3',
    icon: 'coins' as const satisfies FreehandIconName,
    title: 'Un avis libre, une rémunération',
    description:
      'Après chaque visite ou utilisation d\'un service en ligne, vos membres sont libres de laisser un avis Google honnête. Votre association est rémunérée pour chaque mission accomplie.',
  },
];

const BENEFITS = [
  {
    icon: 'store' as const satisfies FreehandIconName,
    title: 'Expériences 100% offertes',
    description:
      'Restaurants, hôtels, spas, mais aussi services en ligne (formations, applications...). Vos membres ne déboursent pas un centime.',
  },
  {
    icon: 'coins' as const satisfies FreehandIconName,
    title: 'Rémunération directe',
    description:
      'Chaque mission accomplie rapporte de l\'argent à votre association. Versement direct, sans intermédiaire.',
  },
  {
    icon: 'sparkle' as const satisfies FreehandIconName,
    title: 'Missions variées',
    description:
      'Tests en physique dans les meilleurs établissements de votre ville, ou à distance pour des services en ligne. Chacun choisit ses missions.',
  },
  {
    icon: 'shield' as const satisfies FreehandIconName,
    title: 'Zéro contrainte',
    description:
      'Pas de quota, pas d\'engagement. Vos membres participent quand ils veulent, au rythme qui leur convient.',
  },
  {
    icon: 'team' as const satisfies FreehandIconName,
    title: 'Un levier d\'adhésion',
    description:
      'Des sorties gratuites dans les meilleurs restos de la ville : c\'est l\'argument qui fait la différence pour recruter des adhérents.',
  },
  {
    icon: 'crown' as const satisfies FreehandIconName,
    title: 'Statut VIP',
    description:
      'Les assos les plus actives débloquent le statut VIP : accès prioritaire aux missions premium et rémunération majorée.',
  },
];

const TESTIMONIALS = [
  {
    name: 'Claire D.',
    role: 'Présidente BDE',
    company: 'Université parisienne',
    avatar: '/logos/sorbonne.png',
    text: 'En 3 mois, nos membres ont testé 12 restaurants et 2 spas. L\'asso a touché plus de 1 200€ sans débourser un centime. C\'est devenu un vrai complément pour notre budget.',
    rating: 5,
  },
  {
    name: 'Karim B.',
    role: 'Vice-président BDE',
    company: 'Grande école parisienne',
    avatar: '/logos/sciences-po.png',
    text: 'On cherchait un moyen de financer nos événements sans vendre des gâteaux. Le programme nous rapporte entre 150 et 300€ par mois, et nos membres sont ravis des sorties.',
    rating: 5,
  },
  {
    name: 'Émilie R.',
    role: 'Trésorière BDE',
    company: 'École de commerce · Paris',
    avatar: '/logos/dauphine.png',
    text: 'Les adresses proposées sont qualitatives, l\'organisation est fluide. On a doublé nos adhérents depuis qu\'on propose ces sorties gratuites à nos membres.',
    rating: 5,
  },
];

const FAQ_ITEMS = [
  {
    q: 'C\'est gratuit. Où est le piège ?',
    a: 'Il n\'y en a pas. Les entreprises partenaires (restaurants, hôtels, commerces, mais aussi des services en ligne) nous rémunèrent pour leur envoyer de vrais utilisateurs qui laissent un avis Google honnête. Votre association est rémunérée pour chaque mission. Aucun frais caché, aucun engagement.',
  },
  {
    q: 'Que doivent faire nos membres concrètement ?',
    a: 'Selon la mission : se rendre dans un établissement ou tester un service en ligne (formation, application, etc.). Après l\'expérience, vos membres sont libres de laisser un avis Google sincère. Comptez 30 minutes à 2 heures selon le type de mission.',
  },
  {
    q: 'Faut-il mettre obligatoirement 5 étoiles ?',
    a: 'Non. On demande des avis honnêtes, pas des avis complaisants. Si l\'expérience mérite 3 étoiles, c\'est 3 étoiles. C\'est ce qui rend le programme crédible et durable. Les établissements le savent et l\'acceptent.',
  },
  {
    q: 'Combien notre association peut-elle gagner ?',
    a: 'Cela dépend du nombre de membres actifs et de la fréquence des missions. En moyenne, une asso de 30 membres actifs génère entre 80 et 300€ par mois. Utilisez le simulateur de revenus plus haut pour une estimation personnalisée.',
  },
  {
    q: 'Quelles associations sont éligibles ?',
    a: 'Toutes les associations étudiantes, culturelles, sportives ou de quartier avec au moins 5 membres actifs. BDE, BDA, BDS, associations loi 1901 : toutes sont bienvenues. L\'inscription est ouverte dans toute la France.',
  },
  {
    q: 'Combien de temps avant les premières missions ?',
    a: 'Candidature étudiée sous 48h. Si vous êtes acceptés, les premières invitations arrivent généralement dans la semaine. Le rythme dépend ensuite des partenaires disponibles dans votre ville.',
  },
];

const FORM_FIELDS_CLASSES =
  'w-full rounded-xl border border-warm-200 bg-warm-50 px-4 py-3 text-sm text-warm-800 outline-none transition-colors placeholder:text-warm-400 focus:border-accent focus:ring-2 focus:ring-accent/20';

type MotivationLevel = 'faible' | 'moyenne' | 'forte';

const MOTIVATION_LABELS: Record<MotivationLevel, { label: string; emoji: string }> = {
  faible: { label: 'Tranquille', emoji: '🌱' },
  moyenne: { label: 'Motivée', emoji: '🔥' },
  forte: { label: 'Ultra-active', emoji: '🚀' },
};

function computeSimulation(members: number, motivation: MotivationLevel) {
  const perMemberPerWeek: Record<MotivationLevel, number> = { faible: 3, moyenne: 6, forte: 12 };
  const testAnnual = members * perMemberPerWeek[motivation] * 52;

  const clientMonthly: Record<MotivationLevel, number> = { faible: 150, moyenne: 300, forte: 600 };
  const affiliationAnnual = clientMonthly[motivation] * 12;

  const sponsorMonthly: Record<MotivationLevel, number> = { faible: 100, moyenne: 200, forte: 300 };
  const recruitAnnual = sponsorMonthly[motivation] * 12;

  return {
    testAnnual,
    affiliationAnnual,
    recruitAnnual,
    total: testAnnual + affiliationAnnual + recruitAnnual,
  };
}

export default function AmbassadeurPage() {
  const [simMembers, setSimMembers] = useState(30);
  const [simMotivation, setSimMotivation] = useState<MotivationLevel>('moyenne');
  const sim = computeSimulation(simMembers, simMotivation);

  const [formState, setFormState] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [form, setForm] = useState({
    assoName: '',
    school: '',
    city: '',
    members: '',
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
                  <Gift weight="fill" className="h-4 w-4 text-accent-dark" />
                  Programme Ambassadeur · Gratuit · Places limitées
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <h1 className="text-balance text-heading-xl text-warm-900 sm:text-display-lg md:text-display-xl">
                  Rejoignez le programme <span className="serif-accent serif-accent-animated">Ambassadeur</span>
                </h1>
              </Reveal>

              <Reveal delay={0.16}>
                <p className="mt-4 sm:mt-6 max-w-xl text-body-sm sm:text-body-lg text-warm-600">
                  Gagnez de l&apos;argent en aidant des entreprises à améliorer leur réputation en ligne.
                </p>
              </Reveal>

              <Reveal delay={0.24}>
                <div className="mt-6 sm:mt-10 flex flex-col gap-4 sm:flex-row">
                  <a href="#simulateur" className="btn-primary">
                    Devenir ambassadeur
                  </a>
                  <a href="#concept" className="btn-secondary">
                    Comment ça marche
                  </a>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.3} className="relative hidden min-h-[420px] lg:block">
              <Sticker className="absolute -left-6 top-[8%] z-40 text-5xl xl:text-6xl" rotate={-12} floatDuration={3.2} floatStyle="float">🍔</Sticker>
              <Sticker className="absolute left-[10%] bottom-[2%] z-40 text-5xl xl:text-6xl" rotate={15} floatDuration={3.6} floatStyle="bob">⭐</Sticker>
              <Sticker className="absolute right-[-12px] top-[42%] z-40 text-5xl xl:text-6xl" rotate={-8} floatDuration={3} floatStyle="sway">💰</Sticker>

              <motion.div
                className="absolute right-0 top-0 z-10 w-[310px] overflow-hidden rounded-2xl border border-[#e8eaed] bg-white shadow-card"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="flex items-center gap-2 border-b border-[#e8eaed] bg-[#f8f9fa] px-4 py-2.5">
                  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] shrink-0"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                  <span className="text-[12px] font-medium text-[#202124]">Google Maps</span>
                  <span className="ml-auto rounded-full bg-[#e8f0fe] px-2 py-0.5 text-[10px] font-semibold text-[#1a73e8]">Invitation</span>
                </div>
                <div className="p-4">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ea4335]">
                      <ForkKnife weight="fill" className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-[13px] font-medium text-[#202124]">Restaurant partenaire</p>
                      <p className="text-[11px] text-[#70757a]">Restaurant · Paris 6e</p>
                    </div>
                  </div>
                  <div className="rounded-lg bg-[#f8f9fa] p-3">
                    <p className="text-[12px] text-[#3c4043]">Menu dégustation offert pour 4 personnes</p>
                    <div className="mt-2 flex items-center gap-1">
                      <span className="text-[12px] font-medium text-[#202124]">4.7</span>
                      <div className="flex gap-px">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} weight="fill" className={`h-3 w-3 ${i < 4 ? 'text-[#FBBC04]' : 'text-[#FBBC04]/50'}`} />
                        ))}
                      </div>
                      <span className="text-[11px] text-[#70757a]">(234)</span>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-[12px] text-[#70757a]">
                    <CalendarCheck weight="fill" className="h-3.5 w-3.5 text-[#137333]" />
                    <span className="font-medium text-[#137333]">Disponible</span>
                    <span>·</span>
                    <span>Samedi 15 mars</span>
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
                    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                    <span className="text-[11px] font-medium text-[#202124]">Votre activité</span>
                  </div>
                  <span className="rounded-full bg-[#e6f4ea] px-2 py-0.5 text-[10px] font-semibold text-[#137333]">Actif</span>
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e8f0fe]">
                      <MapPin weight="fill" className="h-4 w-4 text-[#1a73e8]" />
                    </div>
                    <div>
                      <p className="text-[12px] font-medium text-[#202124]">12 expériences</p>
                      <p className="text-[10px] text-[#70757a]">réalisées ce mois</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#fef7e0]">
                      <Star weight="fill" className="h-4 w-4 text-[#FBBC04]" />
                    </div>
                    <div>
                      <p className="text-[12px] font-medium text-[#202124]">48 avis Google</p>
                      <p className="text-[10px] text-[#70757a]">publiés par vos membres</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e6f4ea]">
                      <UsersThree weight="fill" className="h-4 w-4 text-[#137333]" />
                    </div>
                    <div>
                      <p className="text-[12px] font-medium text-[#202124]">24 membres</p>
                      <p className="text-[10px] text-[#70757a]">actifs dans votre asso</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute right-4 bottom-12 z-30 flex items-center gap-2 rounded-full border border-[#e8eaed] bg-white px-3.5 py-2 shadow-card"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FBBC04]/20">
                  <Trophy weight="fill" className="h-4 w-4 text-[#FBBC04]" />
                </div>
                <div>
                  <p className="text-[11px] text-[#70757a]">Statut</p>
                  <p className="text-[13px] font-bold text-[#FBBC04]">VIP</p>
                </div>
              </motion.div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Simulateur de revenus ── */}
      <section id="simulateur" className="bg-warm-50 px-4 sm:px-6 py-14 sm:py-24">
        <div className="mx-auto max-w-xl">
          <Reveal className="mb-6 sm:mb-8 text-center">
            <p className="section-label mb-3 justify-center">Simulateur</p>
            <h2 className="text-balance text-heading-xl text-warm-900 sm:text-display">
              Combien votre asso peut <span className="serif-accent">gagner</span>&nbsp;?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-body-sm text-warm-500">
              Ajustez le nombre de membres et le niveau d&apos;implication pour voir une estimation réaliste.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-warm-200 bg-white p-4 sm:p-6 shadow-soft">
              <div className="mb-5">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-warm-600">Nombre de membres</span>
                  <motion.span
                    key={simMembers}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="min-w-[2.25rem] rounded-full bg-warm-900 px-2.5 py-0.5 text-center text-xs font-bold tabular-nums text-white"
                  >
                    {simMembers}
                  </motion.span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={150}
                  step={5}
                  value={simMembers}
                  onChange={(e) => setSimMembers(Number(e.target.value))}
                  className="pricing-slider w-full"
                  style={{
                    background: `linear-gradient(to right, #1A1714 0%, #1A1714 ${((simMembers - 10) / 140) * 100}%, #E3DCD2 ${((simMembers - 10) / 140) * 100}%, #E3DCD2 100%)`,
                  }}
                />
                <div className="mt-1 flex justify-between text-xs text-warm-400">
                  <span>10</span>
                  <span>50</span>
                  <span>100</span>
                  <span>150</span>
                </div>
              </div>

              <div className="mb-5">
                <span className="mb-2 block text-sm font-medium text-warm-600">Implication de vos membres</span>
                <div className="grid grid-cols-3 gap-1.5">
                  {(Object.keys(MOTIVATION_LABELS) as MotivationLevel[]).map((key) => (
                    <button
                      key={key}
                      onClick={() => setSimMotivation(key)}
                      className={`rounded-lg border px-2 py-2 text-center transition-all duration-200 ${
                        simMotivation === key
                          ? 'border-warm-900 bg-warm-900 text-white shadow-md shadow-warm-900/15'
                          : 'border-warm-200 bg-warm-50 text-warm-600 hover:border-warm-300'
                      }`}
                    >
                      <span className="block text-xl leading-none">{MOTIVATION_LABELS[key].emoji}</span>
                      <span className="block text-xs font-semibold mt-1.5 leading-none">{MOTIVATION_LABELS[key].label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-px bg-warm-200/60 mb-4" />

              <div className="mb-4 rounded-xl bg-warm-900 px-4 py-4 text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-warm-400 mb-0.5">Revenu annuel estimé</p>
                <motion.p
                  key={sim.total}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="serif-accent text-[2rem] sm:text-[2.5rem] leading-none tracking-tight text-white"
                >
                  {sim.total.toLocaleString('fr-FR')}€
                </motion.p>
                <p className="mt-1 text-sm text-warm-400">
                  soit <strong className="text-white">{Math.round(sim.total / 12).toLocaleString('fr-FR')}€/mois</strong> pour votre asso
                </p>
              </div>

              <div className="space-y-1.5">
                {[
                  { label: 'Missions (avis rémunérés)', value: sim.testAnnual, icon: <Star weight="fill" className="h-4 w-4 text-warm-900" /> },
                  { label: 'Apport clients (commissions)', value: sim.affiliationAnnual, icon: <Handshake weight="fill" className="h-4 w-4 text-warm-900" /> },
                  { label: 'Parrainage (bonus)', value: sim.recruitAnnual, icon: <UserPlus weight="fill" className="h-4 w-4 text-warm-900" /> },
                ].map((line) => (
                  <div key={line.label} className="flex items-center justify-between rounded-lg bg-warm-50 px-3 py-2">
                    <div className="flex items-center gap-2">
                      {line.icon}
                      <span className="text-sm text-warm-900">{line.label}</span>
                    </div>
                    <motion.span
                      key={line.value}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-sm font-bold tabular-nums text-warm-900"
                    >
                      {line.value.toLocaleString('fr-FR')}€
                    </motion.span>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex justify-center">
                <a href="#inscription" className="btn-primary">
                  Devenir ambassadeur
                </a>
              </div>
            </div>
          </Reveal>
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

      {/* ── 3. Comment ça marche ── */}
      <section id="concept" className="relative overflow-hidden bg-warm-900 px-4 sm:px-6 py-14 sm:py-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-accent/[0.04] blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-5xl">
          <Reveal className="mb-10 sm:mb-16 text-center">
            <p className="section-label mb-4 justify-center !text-accent before:!bg-accent/40">Comment ça marche</p>
            <h2 className="text-balance text-heading-xl text-white sm:text-display">
              Comment ça <span className="serif-accent text-accent">fonctionne ?</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-body-sm sm:text-body-lg text-white/50">
              Inscrivez-vous, profitez, soyez rémunérés. Le programme est conçu pour être simple dès le premier jour.
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <Reveal key={step.num} delay={i * 0.08}>
                <div className="relative flex h-full flex-col items-start gap-5 rounded-2xl border border-white/[0.08] bg-white/[0.04] p-6 sm:p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/20 hover:bg-white/[0.06]">
                  <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-accent/20 to-accent/5 ring-1 ring-accent/10 text-accent">
                    <FreehandIcon name={step.icon} size={44} />
                  </div>
                  <div>
                    <p className="mb-2 text-xs font-bold uppercase tracking-wider text-accent">Étape {step.num}</p>
                    <h3 className="text-xl sm:text-2xl font-semibold text-white">{step.title}</h3>
                    <p className="mt-2.5 text-body-sm sm:text-base leading-relaxed text-white/50">{step.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Avantages ── */}
      <section className="bg-warm-100 px-4 sm:px-6 py-14 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-10 sm:mb-16 text-center">
            <p className="section-label mb-4 justify-center">Pourquoi rejoindre</p>
            <h2 className="text-balance text-heading-xl text-warm-900 sm:text-display">
              Ce que votre asso y gagne. <span className="serif-accent">Concrètement.</span>
            </h2>
          </Reveal>

          <div className="grid gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
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
            <p className="section-label mb-4 justify-center">Retours d&apos;expérience</p>
            <h2 className="text-balance text-heading-xl text-warm-900 sm:text-display">
              Ils ont rejoint le <span className="serif-accent">programme.</span>
            </h2>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.08}>
                <div className="group flex h-full flex-col justify-between rounded-2xl border border-warm-200 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card sm:rounded-3xl sm:p-7">
                  <div>
                    <div className="mb-4 flex h-10 w-28 items-center sm:h-12 sm:w-32">
                      <img
                        src={t.avatar}
                        alt={t.company}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div className="mb-3 flex gap-0.5">
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <Star key={j} weight="fill" className="h-4 w-4 text-[#FBBC04]" />
                      ))}
                    </div>
                    <p className="text-[15px] leading-relaxed text-warm-600">&ldquo;{t.text}&rdquo;</p>
                  </div>
                  <div className="mt-6 flex items-center gap-3 border-t border-warm-100 pt-5">
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

      {/* ── Formulaire inscription ── */}
      <section id="inscription" className="px-4 sm:px-6 py-14 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <Reveal className="mb-8 sm:mb-12 text-center">
            <p className="section-label mb-4 justify-center">Inscription</p>
            <h2 className="text-balance text-heading-xl text-warm-900 sm:text-display">
              Rejoignez le <span className="serif-accent">programme</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-body-sm sm:text-body-lg text-warm-500">
              Inscription en 2 minutes. Candidature étudiée sous 48h.
              Premières missions dès la semaine suivante.
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
                    Candidature envoyée !
                  </h3>
                  <p className="mt-3 max-w-sm text-sm text-warm-500">
                    Merci pour votre inscription. Notre équipe étudie votre
                    candidature et vous contactera sous 48h.
                  </p>
                  <button
                    onClick={() => {
                      setFormState('idle');
                      setForm({
                        assoName: '',
                        school: '',
                        city: '',
                        members: '',
                        contactName: '',
                        email: '',
                        phone: '',
                        message: '',
                      });
                    }}
                    className="mt-8 text-sm font-semibold text-accent-dark transition-colors hover:underline"
                  >
                    Inscrire une autre association
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="assoName"
                        className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-warm-400"
                      >
                        Nom de l&apos;association *
                      </label>
                      <input
                        id="assoName"
                        name="assoName"
                        type="text"
                        required
                        value={form.assoName}
                        onChange={handleChange}
                        placeholder="BDE Sorbonne"
                        className={FORM_FIELDS_CLASSES}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="school"
                        className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-warm-400"
                      >
                        École / Université *
                      </label>
                      <input
                        id="school"
                        name="school"
                        type="text"
                        required
                        value={form.school}
                        onChange={handleChange}
                        placeholder="Sorbonne Université"
                        className={FORM_FIELDS_CLASSES}
                      />
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="city"
                        className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-warm-400"
                      >
                        Ville *
                      </label>
                      <input
                        id="city"
                        name="city"
                        type="text"
                        required
                        value={form.city}
                        onChange={handleChange}
                        placeholder="Paris"
                        className={FORM_FIELDS_CLASSES}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="members"
                        className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-warm-400"
                      >
                        Nombre de membres *
                      </label>
                      <select
                        id="members"
                        name="members"
                        required
                        value={form.members}
                        onChange={handleChange}
                        className={FORM_FIELDS_CLASSES}
                      >
                        <option value="">Sélectionnez</option>
                        <option value="5-15">5 – 15</option>
                        <option value="16-30">16 – 30</option>
                        <option value="31-50">31 – 50</option>
                        <option value="51-100">51 – 100</option>
                        <option value="100+">100+</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="contactName"
                        className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-warm-400"
                      >
                        Nom du responsable *
                      </label>
                      <input
                        id="contactName"
                        name="contactName"
                        type="text"
                        required
                        value={form.contactName}
                        onChange={handleChange}
                        placeholder="Jean Dupont"
                        className={FORM_FIELDS_CLASSES}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-warm-400"
                      >
                        Email *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="contact@bde-sorbonne.fr"
                        className={FORM_FIELDS_CLASSES}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-warm-400"
                    >
                      Téléphone (optionnel)
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="06 12 34 56 78"
                      className={FORM_FIELDS_CLASSES}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-warm-400"
                    >
                      Un mot sur votre asso (optionnel)
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Présentez brièvement votre association, vos membres, ce qui vous intéresse dans le programme..."
                      className={`${FORM_FIELDS_CLASSES} resize-none`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formState === 'sending'}
                    className="btn-primary disabled:opacity-60"
                  >
                    {formState === 'sending' ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Envoi en cours...
                      </span>
                    ) : (
                      'Envoyer ma candidature'
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
              Les places sont limitées par <span className="serif-accent text-accent">ville.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-body-sm sm:text-body-lg text-white/60">
              Plus de 200 associations nous font déjà confiance. Inscrivez la vôtre
              avant que les créneaux de votre ville soient complets.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a href="#inscription" className="btn-accent">
                Devenir ambassadeur
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
