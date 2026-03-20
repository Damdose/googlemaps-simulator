'use client';

import { useRef, useState, FormEvent } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import {
  CheckCircle,
  Megaphone,
  Phone,
  TrendUp,
  CursorClick,
  CaretDown,
  Star,
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

const WEEKLY_DATA = [
  { day: 'L', calls: 65, clicks: 40 },
  { day: 'M', calls: 80, clicks: 55 },
  { day: 'M', calls: 55, clicks: 35 },
  { day: 'J', calls: 90, clicks: 60 },
  { day: 'V', calls: 75, clicks: 50 },
  { day: 'S', calls: 45, clicks: 30 },
  { day: 'D', calls: 30, clicks: 20 },
];

const PROCESS = [
  { num: '1', icon: 'search' as const, title: 'Audit & stratégie', description: 'On analyse votre marché local, vos concurrents et vos mots-clés pour définir une stratégie sur-mesure.' },
  { num: '2', icon: 'megaphone' as const, title: 'Lancement des campagnes', description: 'On crée vos campagnes Search locales, le tracking et les LSA si vous êtes éligible.' },
  { num: '3', icon: 'chart-line' as const, title: 'Optimisation & scaling', description: 'Chaque semaine on optimise les enchères, les annonces et le ciblage pour baisser votre CPL.' },
];

const INCLUDED = [
  'Création et gestion des campagnes Search local',
  'Setup Local Service Ads (LSA) si éligible',
  'Tracking appels, formulaires, visites',
  'Reporting mensuel coût par lead',
  'Optimisation continue enchères et ciblage',
  'Call de suivi mensuel avec votre account manager',
];

const FEATURES = [
  {
    icon: 'target' as const,
    title: 'Ciblage hyper-local',
    description: 'Vos annonces apparaissent uniquement auprès de prospects dans votre zone de chalandise. Pas de dépense inutile.',
  },
  {
    icon: 'phone' as const,
    title: 'Tracking complet',
    description: 'Chaque appel, chaque formulaire, chaque demande d\'itinéraire est tracké. Vous savez exactement ce que rapporte chaque euro investi.',
  },
  {
    icon: 'chart-line' as const,
    title: 'Optimisation continue',
    description: 'On ajuste les enchères, le ciblage et les annonces chaque semaine pour maximiser votre ROI.',
  },
  {
    icon: 'dollar' as const,
    title: 'Coût par lead transparent',
    description: 'Reporting mensuel avec le coût par lead réel. Pas de vanity metrics, que du concret.',
  },
  {
    icon: 'users' as const,
    title: 'Local Service Ads',
    description: 'Si vous êtes éligible, on setup vos LSA pour apparaître tout en haut avec le badge "Garanti par Google".',
  },
  {
    icon: 'search' as const,
    title: 'Mots-clés locaux',
    description: 'Recherche approfondie des termes que vos clients potentiels utilisent réellement dans votre zone.',
  },
];

const TESTIMONIALS = [
  {
    name: 'Marie L.',
    role: 'Restauratrice · Paris',
    avatar: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=120&h=120&fit=crop&crop=center',
    text: 'En 3 mois, on est passé de la 12e à la 2e position sur "restaurant italien" dans notre quartier. Les appels ont doublé. L\'équipe Siva est redoutablement efficace.',
    rating: 5,
  },
  {
    name: 'Julien D.',
    role: 'Plombier · Marseille',
    avatar: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=120&h=120&fit=crop&crop=center',
    text: 'Avant Siva, on n\'existait pas sur Google Maps. En 6 semaines, on était dans le top 3 sur "plombier urgence". Les appels ont explosé, le CPL est imbattable.',
    rating: 5,
  },
  {
    name: 'David K.',
    role: 'Gérant de garage · Toulouse',
    avatar: 'https://images.unsplash.com/photo-1486006920555-c77dcf18193c?w=120&h=120&fit=crop&crop=center',
    text: 'Sandro et son équipe comprennent parfaitement les enjeux d\'un commerce local. On reçoit maintenant 3x plus de demandes de devis depuis les Ads locales.',
    rating: 5,
  },
];

const FAQ_ITEMS = [
  {
    q: 'Quel budget publicitaire faut-il prévoir en plus des 400€/mois ?',
    a: 'Le budget pub dépend de votre secteur et de votre zone. En moyenne, nos clients investissent entre 500€ et 2000€/mois en budget Google Ads. On vous recommande un budget optimal lors de l\'audit initial pour maximiser votre ROI.',
  },
  {
    q: 'En combien de temps vais-je voir des résultats ?',
    a: 'Les premiers appels arrivent généralement dès la première semaine de diffusion. L\'optimisation complète des campagnes prend 4 à 6 semaines pour atteindre un CPL stabilisé. On vous donne des objectifs réalistes dès le départ.',
  },
  {
    q: 'Quelle est la différence avec faire mes Ads moi-même ?',
    a: 'Google Ads local est un métier. Sans expertise, vous gaspillez 40 à 60% de votre budget en clics non qualifiés. On maîtrise le ciblage géographique, les enchères, le tracking et les LSA. Chaque euro est optimisé pour générer des leads.',
  },
  {
    q: 'C\'est quoi les Local Service Ads (LSA) ?',
    a: 'Les LSA sont un format d\'annonce Google qui apparaît tout en haut des résultats avec un badge "Garanti par Google". Vous ne payez que lorsqu\'un prospect vous contacte directement. Si vous êtes éligible, on les setup gratuitement.',
  },
  {
    q: 'Comment mesurez-vous les résultats concrètement ?',
    a: 'Chaque mois vous recevez un reporting complet avec : nombre d\'appels générés, coût par lead réel, taux de conversion, budget dépensé et ROI estimé. Pas de vanity metrics — que du concret orienté business.',
  },
  {
    q: 'Est-ce qu\'il y a un engagement ?',
    a: 'Non, pas d\'engagement longue durée. On fonctionne au mois. 96% de nos clients restent parce que les résultats parlent d\'eux-mêmes, pas parce qu\'ils sont coincés dans un contrat.',
  },
];

const FORM_FIELDS_CLASSES =
  'w-full rounded-xl border border-warm-200 bg-warm-50 px-4 py-3 text-sm text-warm-800 outline-none transition-colors placeholder:text-warm-400 focus:border-accent focus:ring-2 focus:ring-accent/20';

export default function GoogleAdsLocalPage() {
  const [formState, setFormState] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [form, setForm] = useState({
    businessName: '',
    sector: '',
    city: '',
    budget: '',
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
                  <Megaphone weight="fill" className="h-4 w-4 text-accent-dark" />
                  À partir de 400€/mois + budget pub
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <h1 className="text-balance text-heading-xl text-warm-900 sm:text-display-lg md:text-display-xl">
                  Google Ads <span className="serif-accent serif-accent-animated">Local</span>
                </h1>
              </Reveal>

              <Reveal delay={0.16}>
                <p className="mt-4 sm:mt-6 max-w-xl text-body-sm sm:text-body-lg text-warm-600">
                  Des appels et des visites qualifiés, pas juste des clics.
                  On gère vos campagnes Search locales pour transformer votre budget pub en clients réels.
                </p>
              </Reveal>

              <Reveal delay={0.24}>
                <div className="mt-6 sm:mt-10 flex flex-col gap-4 sm:flex-row">
                  <a href="#formulaire" className="btn-primary">
                    Prendre rendez-vous
                  </a>
                  <a href="#concept" className="btn-secondary">
                    Comment ça marche
                  </a>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.3} className="relative hidden min-h-[420px] lg:block">
              <motion.div
                className="absolute right-0 top-4 z-10 w-[325px] overflow-hidden rounded-2xl border border-[#e8eaed] bg-white shadow-card"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="flex items-center gap-2 border-b border-[#e8eaed] bg-[#f8f9fa] px-4 py-2.5">
                  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] shrink-0">
                    <path d="M12.04 7.28c-.45-.19-.96-.28-1.54-.28-1.8 0-3 1.18-3 3s1.2 3 3 3c.58 0 1.09-.1 1.54-.28" fill="none" stroke="#4285F4" strokeWidth="2"/>
                    <circle cx="12" cy="10" r="2.5" fill="#FBBC04"/>
                    <path d="M3 10a7 7 0 0114 0" fill="none" stroke="#34A853" strokeWidth="2"/>
                    <path d="M17 10a7 7 0 01-14 0" fill="none" stroke="#EA4335" strokeWidth="2"/>
                  </svg>
                  <span className="text-[12px] font-medium text-[#202124]">Google Ads</span>
                  <span className="ml-auto text-[10px] text-[#70757a]">Cette semaine</span>
                </div>
                <div className="p-4 space-y-2.5">
                  {[
                    { label: 'Restaurant italien Paris', clicks: '247', cpl: '4,20€', trend: '+18%', status: 'Diffusion' },
                    { label: 'Pizzeria livraison 11e', clicks: '183', cpl: '3,80€', trend: '+24%', status: 'Diffusion' },
                    { label: 'Traiteur italien Paris', clicks: '96', cpl: '5,10€', trend: '+12%', status: 'Diffusion' },
                  ].map((campaign) => (
                    <div key={campaign.label} className="flex items-center justify-between rounded-lg bg-[#f8f9fa] px-3 py-2.5">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#137333]" />
                          <p className="text-[12px] font-medium text-[#202124]">{campaign.label}</p>
                        </div>
                        <p className="mt-0.5 ml-3 text-[11px] text-[#70757a]">{campaign.clicks} clics · CPL {campaign.cpl}</p>
                      </div>
                      <span className="flex items-center gap-0.5 text-[11px] font-semibold text-[#137333]">
                        <TrendUp weight="bold" className="h-3 w-3" />
                        {campaign.trend}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="absolute bottom-0 left-0 z-20 w-[280px] overflow-hidden rounded-2xl border border-[#e8eaed] bg-white shadow-card"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
              >
                <div className="flex items-center justify-between border-b border-[#e8eaed] bg-[#f8f9fa] px-4 py-2.5">
                  <div className="flex items-center gap-1.5">
                    <Phone weight="fill" className="h-3.5 w-3.5 text-[#1a73e8]" />
                    <span className="text-[11px] font-medium text-[#202124]">Appels générés</span>
                  </div>
                  <span className="text-[10px] font-semibold text-[#137333]">+30%</span>
                </div>
                <div className="p-4">
                  <p className="mb-3 text-[28px] font-normal leading-none text-[#202124]">
                    48 <span className="text-[14px] text-[#70757a]">appels</span>
                  </p>
                  <div className="flex items-end justify-between gap-1.5">
                    {WEEKLY_DATA.map((d, i) => (
                      <div key={i} className="flex flex-1 flex-col items-center gap-1">
                        <div className="relative w-full overflow-hidden rounded" style={{ height: 55 }}>
                          <div
                            className="absolute bottom-0 w-full rounded bg-[#e8f0fe]"
                            style={{ height: `${(d.clicks / 90) * 100}%` }}
                          />
                          <div
                            className="absolute bottom-0 w-full rounded bg-[#1a73e8]"
                            style={{ height: `${(d.calls / 90) * 100}%` }}
                          />
                        </div>
                        <span className="text-[10px] text-[#70757a]">{d.day}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 flex items-center gap-3 text-[10px] text-[#70757a]">
                    <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-[#1a73e8]" /> Appels</span>
                    <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-[#e8f0fe]" /> Clics</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute right-8 bottom-16 z-30 flex items-center gap-2 rounded-full border border-[#e8eaed] bg-white px-3.5 py-2 shadow-card"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#e6f4ea]">
                  <CursorClick weight="fill" className="h-3.5 w-3.5 text-[#137333]" />
                </div>
                <div>
                  <p className="text-[10px] text-[#70757a]">CPL moyen</p>
                  <p className="text-[13px] font-bold text-[#137333]">4,20€</p>
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

      {/* ── 3. Comment ça marche ── */}
      <section id="concept" className="relative overflow-hidden bg-warm-900 px-4 sm:px-6 py-14 sm:py-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-accent/[0.04] blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-5xl">
          <Reveal className="mb-10 sm:mb-16 text-center">
            <p className="section-label mb-4 justify-center !text-accent before:!bg-accent/40">Comment ça marche</p>
            <h2 className="text-balance text-heading-xl text-white sm:text-display">
              On s&apos;occupe de tout, <span className="serif-accent text-accent">vraiment.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-body-sm sm:text-body-lg text-white/50">
              De l&apos;audit à l&apos;optimisation continue, chaque euro de votre budget est calibré pour générer des leads qualifiés.
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {PROCESS.map((step, i) => (
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
              Un accompagnement <span className="serif-accent">mensuel</span>
            </h2>
            <p className="mx-auto mt-3 max-w-md text-body-sm text-warm-500">
              Sans engagement. 96% de nos clients restent parce que ça fonctionne.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-2xl sm:rounded-3xl border border-warm-200 bg-white p-5 sm:p-8 shadow-soft lg:p-12">
              <div className="mb-8 text-center">
                <span className="mb-2.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-warm-400">Récurrent</span>
                <h3 className="text-xl sm:text-2xl font-medium text-warm-900">Google Ads Local</h3>
                <div className="mt-4">
                  <span className="mb-1 block text-xs font-medium text-warm-400">À partir de</span>
                  <span className="serif-accent text-[2.5rem] sm:text-[3.25rem] leading-none tracking-tight text-warm-900">400€</span>
                  <span className="ml-2 text-sm font-medium text-warm-500">/mois + budget pub</span>
                </div>
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
                <a href="#formulaire" className="btn-primary">
                  Prendre rendez-vous
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
            <p className="section-label mb-4 justify-center">Ce qu&apos;on fait pour vous</p>
            <h2 className="text-balance text-heading-xl text-warm-900 sm:text-display">
              Chaque euro compte. On le fait <span className="serif-accent">travailler.</span>
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
            <p className="section-label mb-4 justify-center">Contact</p>
            <h2 className="text-balance text-heading-xl text-warm-900 sm:text-display">
              Lancez vos <span className="serif-accent">campagnes</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-body-sm sm:text-body-lg text-warm-500">
              Remplissez le formulaire, on vous recontacte sous 24h avec un audit et une stratégie sur-mesure.
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
                    Merci pour votre demande. Un expert Google Ads local vous
                    recontacte sous 24h.
                  </p>
                  <button
                    onClick={() => {
                      setFormState('idle');
                      setForm({ businessName: '', sector: '', city: '', budget: '', contactName: '', email: '', phone: '', message: '' });
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
                      <input id="businessName" name="businessName" type="text" required value={form.businessName} onChange={handleChange} placeholder="Mon Commerce" className={FORM_FIELDS_CLASSES} />
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
                      <label htmlFor="budget" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-warm-400">
                        Budget pub mensuel estimé *
                      </label>
                      <select id="budget" name="budget" required value={form.budget} onChange={handleChange} className={FORM_FIELDS_CLASSES}>
                        <option value="">Sélectionnez</option>
                        <option value="500-1000">500€ – 1 000€</option>
                        <option value="1000-2000">1 000€ – 2 000€</option>
                        <option value="2000-5000">2 000€ – 5 000€</option>
                        <option value="5000+">5 000€+</option>
                        <option value="je-ne-sais-pas">Je ne sais pas encore</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contactName" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-warm-400">
                        Nom du responsable *
                      </label>
                      <input id="contactName" name="contactName" type="text" required value={form.contactName} onChange={handleChange} placeholder="Jean Dupont" className={FORM_FIELDS_CLASSES} />
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-warm-400">
                        Email *
                      </label>
                      <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} placeholder="contact@moncommerce.fr" className={FORM_FIELDS_CLASSES} />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-warm-400">
                      Téléphone (optionnel)
                    </label>
                    <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="06 12 34 56 78" className={FORM_FIELDS_CLASSES} />
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-warm-400">
                      Un mot sur votre projet (optionnel)
                    </label>
                    <textarea id="message" name="message" rows={4} value={form.message} onChange={handleChange} placeholder="Décrivez votre situation actuelle, vos objectifs, votre expérience avec Google Ads..." className={`${FORM_FIELDS_CLASSES} resize-none`} />
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
              Prêt à générer des <span className="serif-accent text-accent">leads qualifiés</span> ?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-body-sm sm:text-body-lg text-white/60">
              Commencez par un audit gratuit ou prenez rendez-vous avec un expert Google Ads local.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a href="#formulaire" className="btn-accent">
                Prendre rendez-vous
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
