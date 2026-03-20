'use client';

import { useRef, useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, useInView } from 'framer-motion';
import {
  CaretDown,
  CheckCircle,
  Clock,
  Lightbulb,
  Sparkle,
  Star,
  Trophy,
} from '@phosphor-icons/react';
import PlaceSearchInput from '@/components/audit/PlaceSearchInput';
import FreehandIcon, { type FreehandIconName } from '@/components/FreehandIcon';
import { PlaceResult } from '@/lib/types';

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

const FEATURES: { icon: FreehandIconName; title: string; description: string }[] = [
  {
    icon: 'chart-bar',
    title: 'Score d\'optimisation',
    description: 'Obtenez un score sur 100 qui évalue l\'optimisation complète de votre fiche Google Business Profile.',
  },
  {
    icon: 'map',
    title: 'Heatmap de positions',
    description: 'Visualisez sur une carte interactive vos positions pour chaque mot-clé, zone par zone autour de votre établissement.',
  },
  {
    icon: 'users',
    title: 'Analyse concurrentielle',
    description: 'Découvrez qui domine votre zone et sur quels mots-clés vos concurrents vous dépassent.',
  },
  {
    icon: 'sparkle',
    title: 'Recommandations IA',
    description: 'Recevez des recommandations personnalisées et actionnables générées par notre intelligence artificielle.',
  },
  {
    icon: 'target',
    title: 'Estimation de revenus',
    description: 'Estimez le chiffre d\'affaires que vous perdez chaque mois à cause de votre manque de visibilité locale.',
  },
  {
    icon: 'eye',
    title: 'Visibilité IA',
    description: 'Analysez votre présence dans les réponses des assistants IA (ChatGPT, Gemini) pour vos requêtes locales.',
  },
];

const STEPS: { num: string; icon: FreehandIconName; title: string; desc: string }[] = [
  { num: '1', icon: 'search', title: 'Recherchez votre établissement', desc: 'Tapez le nom de votre commerce et sélectionnez-le dans les résultats Google.' },
  { num: '2', icon: 'target', title: 'Choisissez vos mots-clés', desc: 'Sélectionnez 3 mots-clés stratégiques parmi nos suggestions adaptées à votre activité.' },
  { num: '3', icon: 'lightning', title: 'Recevez votre rapport', desc: 'En 30 secondes, obtenez un diagnostic complet avec score, heatmap et recommandations.' },
];

const PROBLEMS: { icon: FreehandIconName; title: string; description: string }[] = [
  {
    icon: 'warning',
    title: 'Vous ne savez pas où vous en êtes',
    description: 'Sans données, impossible de savoir si votre fiche Google travaille pour vous ou contre vous. Vous avancez à l\'aveugle.',
  },
  {
    icon: 'eye',
    title: 'Vos concurrents vous dépassent',
    description: 'D\'autres commerces captent vos clients potentiels sur Google Maps. Sans audit, vous ne savez même pas qui ni comment.',
  },
  {
    icon: 'chart-bar',
    title: 'Vous perdez du CA chaque jour',
    description: 'Chaque jour sans visibilité locale, c\'est des appels, des visites et des clients qui vont chez la concurrence.',
  },
];

const STATS = [
  { value: '30s', label: 'Résultat immédiat' },
  { value: '100%', label: 'Gratuit, sans engagement' },
  { value: '15+', label: 'Métriques analysées' },
  { value: '3', label: 'Concurrents identifiés' },
];

const TESTIMONIALS = [
  {
    name: 'Sophie R.',
    role: 'Avocate · Bordeaux',
    avatar: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=120&h=120&fit=crop&crop=center',
    text: 'L\'audit m\'a ouvert les yeux. Je ne savais pas que ma fiche était si mal optimisée. Les recommandations étaient claires et actionnables. J\'ai gagné 45% de visibilité en 2 mois.',
    rating: 5,
  },
  {
    name: 'Antoine L.',
    role: 'Médecin · Paris',
    avatar: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=120&h=120&fit=crop&crop=center',
    text: 'Le rapport d\'audit est impressionnant de précision. La heatmap m\'a montré exactement les zones où je n\'apparaissais pas. Maintenant je suis visible partout dans mon quartier.',
    rating: 5,
  },
  {
    name: 'Camille M.',
    role: 'Opticienne · Nantes',
    avatar: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=120&h=120&fit=crop&crop=center',
    text: 'J\'ai lancé l\'audit par curiosité et j\'ai été bluffée. En 30 secondes, j\'ai compris pourquoi mes concurrents me dépassaient. L\'IA a proposé des améliorations que je n\'aurais jamais trouvées seule.',
    rating: 5,
  },
];

const FAQ_ITEMS = [
  {
    q: 'L\'audit est-il vraiment gratuit ?',
    a: 'Oui, 100% gratuit, sans carte bancaire et sans engagement. Vous obtenez un rapport complet avec score, heatmap, analyse concurrentielle et recommandations IA. Aucune surprise.',
  },
  {
    q: 'Combien de temps faut-il pour obtenir les résultats ?',
    a: 'L\'audit est généré en environ 30 secondes. Vous obtenez immédiatement votre score, votre heatmap de positions et vos recommandations personnalisées.',
  },
  {
    q: 'Quelles données sont analysées ?',
    a: 'Nous analysons votre fiche Google Business Profile (catégories, description, photos, avis, attributs), vos positions sur Google Maps pour vos mots-clés stratégiques, et nous comparons votre profil à celui de vos 3 principaux concurrents.',
  },
  {
    q: 'Dois-je donner accès à ma fiche Google ?',
    a: 'Non, aucun accès n\'est nécessaire. Nous analysons les données publiques de votre fiche Google et vos positions dans les résultats de recherche. Il suffit de chercher votre établissement.',
  },
  {
    q: 'Que faire après avoir reçu mon audit ?',
    a: 'Vous pouvez appliquer les recommandations vous-même, ou prendre rendez-vous avec un expert Siva pour un accompagnement personnalisé. Notre offre d\'optimisation de fiche à 500€ reprend exactement les points identifiés par l\'audit.',
  },
  {
    q: 'L\'audit fonctionne pour tous les types de commerces ?',
    a: 'Oui, l\'audit fonctionne pour tout établissement avec une fiche Google : restaurants, commerces, cabinets médicaux, salons de beauté, garages, etc. Les mots-clés sont automatiquement adaptés à votre activité.',
  },
];

const INCLUDED = [
  'Score d\'optimisation sur 100',
  'Heatmap de vos positions locales',
  'Analyse de vos 3 concurrents principaux',
  'Recommandations IA personnalisées',
  'Estimation de revenus manqués',
  'Analyse de visibilité IA',
];

const FORM_FIELDS_CLASSES =
  'w-full rounded-xl border border-warm-200 bg-warm-50 px-4 py-3 text-sm text-warm-800 outline-none transition-colors placeholder:text-warm-400 focus:border-accent focus:ring-2 focus:ring-accent/20';

export default function AuditGratuitServicePage() {
  const router = useRouter();

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
      {/* ── Hero ── */}
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
                  <Sparkle weight="fill" className="h-4 w-4 text-accent-dark" />
                  100% gratuit · Sans engagement
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <h1 className="text-balance text-heading-xl text-warm-900 sm:text-display-lg md:text-display-xl">
                  Audit de visibilité <span className="serif-accent serif-accent-animated">Google Maps</span>
                </h1>
              </Reveal>

              <Reveal delay={0.16}>
                <p className="mt-4 sm:mt-6 max-w-xl text-body-sm sm:text-body-lg text-warm-600">
                  Découvrez votre score d&apos;optimisation, visualisez vos positions sur une heatmap,
                  analysez vos concurrents et recevez des recommandations IA personnalisées. En 30 secondes.
                </p>
              </Reveal>

              <Reveal delay={0.24}>
                <div className="mt-6 sm:mt-10 flex flex-col gap-4 sm:flex-row">
                  <Link href="/audit-gratuit" className="btn-primary">
                    Lancer l&apos;audit gratuit
                  </Link>
                  <Link href="/rendez-vous" className="btn-secondary">
                    Prendre rendez-vous
                  </Link>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.3} className="relative hidden min-h-[420px] lg:block">
              {/* Google Maps audit score card */}
              <motion.div
                className="absolute right-0 top-0 z-10 w-[305px] overflow-hidden rounded-2xl border border-[#e8eaed] bg-white shadow-card"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="flex items-center gap-2 border-b border-[#e8eaed] bg-[#f8f9fa] px-4 py-2.5">
                  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] shrink-0"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                  <span className="text-[12px] font-medium text-[#202124]">Audit de visibilité</span>
                  <span className="ml-auto text-[12px] font-bold text-[#FBBC04]">78/100</span>
                </div>
                <div className="p-4">
                  <div className="mb-3 h-[6px] overflow-hidden rounded-full bg-[#e8eaed]">
                    <div className="h-full w-[78%] rounded-full bg-[#FBBC04]" />
                  </div>
                  <div className="space-y-2">
                    {[
                      { label: 'Fiche Google', score: 85, },
                      { label: 'Mots-clés', score: 62, },
                      { label: 'Avis clients', score: 90, },
                      { label: 'Photos', score: 45, },
                      { label: 'Cohérence NAP', score: 100, },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center gap-2.5">
                        <span className="w-24 text-[11px] text-[#70757a]">{item.label}</span>
                        <div className="h-[5px] flex-1 overflow-hidden rounded-full bg-[#e8eaed]">
                          <div className={`h-full rounded-full ${item.score >= 80 ? 'bg-[#137333]' : item.score >= 60 ? 'bg-[#FBBC04]' : 'bg-[#ea4335]'}`} style={{ width: `${item.score}%` }} />
                        </div>
                        <span className="text-[11px] font-medium text-[#202124]">{item.score}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Heatmap card - Google Maps style */}
              <motion.div
                className="absolute bottom-0 left-0 z-20 w-[265px] overflow-hidden rounded-2xl border border-[#e8eaed] bg-white shadow-card"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
              >
                <div className="flex items-center gap-1.5 border-b border-[#e8eaed] bg-[#f8f9fa] px-4 py-2.5">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#ea4335"/><circle cx="12" cy="9" r="2.5" fill="white"/></svg>
                  <span className="text-[11px] font-medium text-[#202124]">Heatmap · Positions locales</span>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-5 gap-1">
                    {[1,1,2,3,1, 1,1,2,1,2, 2,1,1,1,3, 3,2,1,2,2, 2,3,2,1,1].map((v, i) => (
                      <div
                        key={i}
                        className={`h-6 rounded ${v === 1 ? 'bg-[#137333]/50' : v === 2 ? 'bg-[#FBBC04]/50' : 'bg-[#ea4335]/50'}`}
                      />
                    ))}
                  </div>
                  <div className="mt-3 flex items-center justify-between text-[10px] text-[#70757a]">
                    <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-[#137333]/50" /> Top 3</span>
                    <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-[#FBBC04]/50" /> Top 10</span>
                    <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-[#ea4335]/50" /> +10</span>
                  </div>
                </div>
              </motion.div>

              {/* Speed badge */}
              <motion.div
                className="absolute right-4 bottom-12 z-30 flex items-center gap-2 rounded-full border border-[#e8eaed] bg-white px-3.5 py-2 shadow-card"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#e8f0fe]">
                  <Clock weight="fill" className="h-3.5 w-3.5 text-[#1a73e8]" />
                </div>
                <div>
                  <p className="text-[10px] text-[#70757a]">Résultat en</p>
                  <p className="text-[13px] font-bold text-[#1a73e8]">30 secondes</p>
                </div>
              </motion.div>
            </Reveal>
          </div>
        </div>

      </section>

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

      {/* ── Problème ── */}
      <section className="bg-warm-100 px-4 sm:px-6 py-14 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <Reveal className="mb-10 sm:mb-16 text-center">
            <p className="section-label mb-4 justify-center">Le problème</p>
            <h2 className="text-balance text-heading-xl text-warm-900 sm:text-display">
              Vous êtes invisible sur <span className="serif-accent">Google Maps ?</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-body-sm sm:text-body-lg text-warm-500">
              72% des consommateurs qui font une recherche locale visitent un commerce dans les 8 km.
              Si vous n&apos;apparaissez pas, vos concurrents récupèrent vos clients.
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {PROBLEMS.map((problem, i) => (
              <Reveal key={problem.title} delay={i * 0.08}>
                <div className="relative flex h-full flex-col items-start gap-4 rounded-2xl border border-red-100 bg-red-50/30 p-6">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-red-600">
                    <FreehandIcon name={problem.icon} size={20} />
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
              Et si vous saviez exactement où vous <span className="serif-accent">perdez</span> des clients ?
            </h2>
            <p className="mx-auto mt-4 sm:mt-6 max-w-2xl text-body-sm sm:text-body-lg text-warm-500">
              Notre audit analyse votre fiche Google, vos positions sur la carte, vos concurrents et génère des recommandations IA personnalisées. Tout ça gratuitement, en 30 secondes.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Process ── */}
      <section id="concept" className="relative overflow-hidden bg-warm-900 px-4 sm:px-6 py-14 sm:py-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-accent/[0.04] blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-5xl">
          <Reveal className="mb-10 sm:mb-16 text-center">
            <p className="section-label mb-4 justify-center !text-accent before:!bg-accent/40">Comment ça marche</p>
            <h2 className="text-balance text-heading-xl text-white sm:text-display">
              3 étapes, 30 <span className="serif-accent text-accent">secondes.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-body-sm sm:text-body-lg text-white/50">
              Recherchez votre établissement, choisissez vos mots-clés, obtenez votre rapport. C&apos;est tout.
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
                    <p className="mt-2 text-body-sm leading-relaxed text-white/50">{step.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="bg-warm-100 px-4 sm:px-6 py-14 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-10 sm:mb-16 text-center">
            <p className="section-label mb-4 justify-center">Ce que vous obtenez</p>
            <h2 className="text-balance text-heading-xl text-warm-900 sm:text-display">
              Un diagnostic <span className="serif-accent">complet.</span>
            </h2>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feat, i) => (
              <Reveal key={feat.title} delay={i * 0.06}>
                <div className="card-hover group relative flex h-full flex-col items-start gap-4 p-6">
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

      {/* ── Lancer l'audit CTA ── */}
      <section className="bg-warm-50 px-4 sm:px-6 py-14 sm:py-24">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <div className="grid gap-8 rounded-2xl sm:rounded-3xl border border-warm-200 bg-white p-5 sm:p-8 shadow-elevated lg:grid-cols-[1.2fr_1fr] lg:p-12">
              <div>
                <p className="section-label mb-4">Lancez votre audit</p>
                <h2 className="text-heading-xl text-warm-900">
                  Vérifiez votre potentiel local en 30 secondes.
                </h2>
                <p className="mt-4 text-body text-warm-600">
                  Entrez le nom de votre établissement et obtenez un diagnostic complet
                  de votre visibilité sur Google Maps.
                </p>
                <ul className="mt-6 space-y-2 text-sm text-warm-600">
                  {INCLUDED.slice(0, 4).map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle weight="fill" className="h-4 w-4 text-positive" /> {item}
                    </li>
                  ))}
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
        </div>
      </section>

      {/* ── Témoignages ── */}
      <section className="px-4 sm:px-6 py-14 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-10 sm:mb-16 text-center">
            <p className="section-label mb-4 justify-center">Ils ont lancé leur audit</p>
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

      {/* ── Pricing ── */}
      <section className="bg-warm-50 px-4 sm:px-6 py-14 sm:py-24">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <div className="rounded-2xl sm:rounded-3xl border border-warm-200 bg-white p-5 sm:p-8 shadow-soft lg:p-12">
              <div className="mb-8 text-center">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-positive/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-positive">
                  100% gratuit
                </span>
                <h3 className="mt-4 text-2xl font-medium text-warm-900">Audit de visibilité Google Maps</h3>
                <div className="mt-4">
                  <span className="serif-accent text-[2.5rem] sm:text-[3.25rem] leading-none tracking-tight text-warm-900">Gratuit</span>
                </div>
                <p className="mt-2 text-sm text-warm-500">Sans carte bancaire · Résultat en 30 secondes</p>
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
                <Link href="/audit-gratuit" className="btn-primary">
                  Lancer l&apos;audit gratuit
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
                <h3 className="text-xl font-medium text-warm-900">Vos données restent privées</h3>
                <p className="mt-2 text-body-sm leading-relaxed text-warm-500">
                  Nous analysons uniquement les données publiques de votre fiche Google.
                  Aucun accès à votre compte n&apos;est nécessaire. Vos résultats d&apos;audit ne sont jamais partagés avec des tiers.
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

      {/* ── Formulaire ── */}
      <section id="formulaire" className="px-4 sm:px-6 py-14 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <Reveal className="mb-8 sm:mb-12 text-center">
            <p className="section-label mb-4 justify-center">Accompagnement expert</p>
            <h2 className="text-balance text-heading-xl text-warm-900 sm:text-display">
              Vous voulez aller plus <span className="serif-accent">loin ?</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-body-sm sm:text-body-lg text-warm-500">
              Lancez d&apos;abord votre audit gratuit, puis partagez vos résultats avec nos experts.
              On vous recontacte sous 24h avec un plan d&apos;action personnalisé.
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
                    Merci pour votre message. Notre équipe vous recontacte sous 24h
                    avec un plan d&apos;action adapté à vos résultats d&apos;audit.
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
                    <textarea id="message" name="message" rows={4} value={form.message} onChange={handleChange} placeholder="Partagez vos résultats d'audit, vos objectifs, votre situation actuelle sur Google..." className={`${FORM_FIELDS_CLASSES} resize-none`} />
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
              Prêt à dominer <span className="serif-accent text-accent">Google Maps</span> ?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-body-sm sm:text-body-lg text-white/60">
              Lancez votre audit gratuit maintenant, ou faites appel à nos experts pour aller encore plus loin.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/audit-gratuit" className="btn-accent">
                Lancer l&apos;audit gratuit
              </Link>
              <a href="#formulaire" className="btn-secondary !bg-white/10 !border-white/20 !text-white hover:!bg-white/20">
                Parler à un expert
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
