'use client';

import { useRef, useState, FormEvent } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  CaretDown,
  CheckCircle,
  Gift,
  Lightbulb,
  MapPin,
  Medal,
  Storefront,
  Star,
  UsersThree,
  UserCirclePlus,
  CalendarCheck,
  ForkKnife,
  Bed,
  Trophy,
  Camera,
  Crown,
  Sparkle,
  UsersFour,
  CalendarX,
  HandCoins,
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

const PROBLEMS = [
  {
    Icon: UsersFour,
    title: 'Des activités qui se répètent',
    description:
      'Sorties culturelles, pique-niques, réunions... Vos membres veulent de la nouveauté mais le budget limite les possibilités.',
  },
  {
    Icon: CalendarX,
    title: 'Difficile de mobiliser',
    description:
      'La participation baisse quand les activités se ressemblent. Les membres les plus actifs finissent par décrocher.',
  },
  {
    Icon: HandCoins,
    title: 'Le budget freine l\'ambition',
    description:
      'Restaurants, hôtels, loisirs... Ces expériences coûtent cher et sont rarement accessibles pour une association.',
  },
];

const STATS = [
  { value: '50+', label: 'Établissements partenaires' },
  { value: '100%', label: 'Gratuit pour les associations' },
  { value: '48h', label: 'Délai de validation' },
  { value: '4.8/5', label: 'Satisfaction des membres' },
];

const STEPS = [
  {
    num: '1',
    Icon: UserCirclePlus,
    title: 'Inscrivez votre association',
    description:
      'Remplissez le formulaire avec les infos de votre asso. On valide votre candidature sous 48h.',
  },
  {
    num: '2',
    Icon: MapPin,
    title: 'Testez des établissements',
    description:
      'Recevez des invitations pour découvrir des restaurants, hôtels, commerces et lieux locaux.',
  },
  {
    num: '3',
    Icon: Star,
    title: 'Partagez votre expérience',
    description:
      'Laissez un avis honnête et détaillé sur Google. Plus vous êtes actifs, plus vous recevez d\'invitations.',
  },
];

const BENEFITS = [
  {
    Icon: ForkKnife,
    title: 'Repas offerts',
    description:
      'Découvrez les meilleurs restaurants de votre ville, menu offert pour vos membres.',
  },
  {
    Icon: Sparkle,
    title: 'Expériences exclusives',
    description:
      'Accédez à des événements, dégustations et activités réservés à nos ambassadeurs.',
  },
  {
    Icon: Bed,
    title: 'Séjours & bien-être',
    description:
      'Profitez de nuits d\'hôtel, spas et activités de loisirs pour votre communauté.',
  },
  {
    Icon: Storefront,
    title: 'Commerces locaux',
    description:
      'Testez des boutiques, salons et commerces de proximité avec des avantages exclusifs.',
  },
  {
    Icon: Camera,
    title: 'Visibilité pour votre asso',
    description:
      'Votre association est mise en avant sur nos réseaux et auprès de nos partenaires.',
  },
  {
    Icon: Crown,
    title: 'Statut VIP',
    description:
      'Les associations les plus actives accèdent au statut VIP avec des avantages doublés.',
  },
];

const COMPARISON = [
  { label: 'Expériences 100% gratuites', us: true, others: false },
  { label: 'Restaurants, hôtels, loisirs', us: true, others: false },
  { label: 'Ouvert à toutes les associations', us: true, others: true },
  { label: 'Statut VIP et avantages doublés', us: true, others: false },
  { label: 'Visibilité pour votre asso', us: true, others: false },
  { label: 'Aucun engagement', us: true, others: true },
];

const INCLUDED = [
  'Accès gratuit aux établissements partenaires',
  'Repas, soins, séjours offerts pour vos membres',
  'Invitations personnalisées par ville et secteur',
  'Visibilité de votre asso sur nos réseaux',
  'Statut VIP pour les assos les plus actives',
  'Aucun engagement, aucun frais',
];

const TESTIMONIALS = [
  {
    name: 'Claire D.',
    role: 'Présidente',
    company: 'Les Amis de Montmartre',
    avatar: '👩🏻',
    text: 'Nos membres adorent le programme. En 2 mois, on a testé 8 restaurants et un spa. C\'est devenu notre activité préférée. Tout est gratuit et bien organisé.',
    rating: 5,
  },
  {
    name: 'Karim B.',
    role: 'Vice-président',
    company: 'Asso Jeunes du 13e',
    avatar: '👨🏾',
    text: 'On cherchait des activités originales sans exploser notre budget. Le programme ambassadeur est parfait : des sorties gratuites de qualité. On a triplé notre nombre de membres.',
    rating: 5,
  },
  {
    name: 'Émilie R.',
    role: 'Trésorière',
    company: 'Collectif Gourmand Lyon',
    avatar: '👩🏼‍🦰',
    text: 'On a été surpris par la qualité des adresses proposées. Les établissements sont top, l\'accueil est toujours impeccable. Je recommande à toutes les assos !',
    rating: 5,
  },
];

const FAQ_ITEMS = [
  {
    q: 'C\'est vraiment 100% gratuit ?',
    a: 'Oui, totalement. Les expériences (repas, soins, séjours...) sont offertes par nos établissements partenaires. En contrepartie, vos membres laissent un avis Google honnête et détaillé après leur visite. Aucun frais caché, aucun engagement.',
  },
  {
    q: 'Quelles associations peuvent rejoindre le programme ?',
    a: 'Toutes les associations à but non lucratif (loi 1901 ou équivalent) peuvent candidater : associations culturelles, sportives, étudiantes, de quartier, caritatives... On demande simplement un minimum de 5 membres actifs.',
  },
  {
    q: 'Quel type d\'expériences sont proposées ?',
    a: 'Restaurants (menus complets offerts), hôtels (nuitées), spas (soins), commerces locaux (produits offerts), activités de loisirs... Les expériences varient selon votre ville et les partenaires disponibles.',
  },
  {
    q: 'Combien de membres peuvent participer à chaque sortie ?',
    a: 'En général, chaque invitation couvre entre 2 et 6 personnes selon l\'établissement et le type d\'expérience. Les associations VIP peuvent bénéficier de groupes plus importants.',
  },
  {
    q: 'Qu\'est-ce que le statut VIP ?',
    a: 'Les associations les plus actives (participation régulière, avis détaillés et de qualité) accèdent au statut VIP : plus d\'invitations, des expériences premium et une visibilité renforcée auprès de nos partenaires.',
  },
  {
    q: 'Combien de temps pour être accepté ?',
    a: 'On étudie chaque candidature et on vous recontacte sous 48h. Si votre association est éligible, vous recevez vos premières invitations dès la semaine suivante.',
  },
];

const FORM_FIELDS_CLASSES =
  'w-full rounded-xl border border-warm-200 bg-warm-50 px-4 py-3 text-sm text-warm-800 outline-none transition-colors placeholder:text-warm-400 focus:border-accent focus:ring-2 focus:ring-accent/20';

export default function AmbassadeurPage() {
  const [formState, setFormState] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [form, setForm] = useState({
    assoName: '',
    contactName: '',
    email: '',
    phone: '',
    city: '',
    members: '',
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
                  <Gift weight="fill" className="h-4 w-4 text-accent-dark" />
                  100% Gratuit · Associations · Exclusif
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <h1 className="text-balance text-heading-xl text-warm-900 sm:text-display-lg md:text-display-xl">
                  Programme <span className="serif-accent serif-accent-animated">Ambassadeur</span>
                </h1>
              </Reveal>

              <Reveal delay={0.16}>
                <p className="mt-4 sm:mt-6 max-w-xl text-body-sm sm:text-body-lg text-warm-600">
                  Votre association teste gratuitement des restaurants, hôtels et
                  commerces locaux en échange d&apos;avis Google authentiques.
                  Des expériences uniques pour votre communauté.
                </p>
              </Reveal>

              <Reveal delay={0.24}>
                <div className="mt-6 sm:mt-10 flex flex-col gap-4 sm:flex-row">
                  <a href="#inscription" className="btn-primary">
                    Rejoindre le programme
                  </a>
                  <a href="#concept" className="btn-secondary">
                    En savoir plus
                  </a>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.3} className="relative hidden min-h-[420px] lg:block">
              {/* Google Business Profile card - Restaurant invitation */}
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
                      <p className="text-[13px] font-medium text-[#202124]">La Belle Époque</p>
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

              {/* Activity dashboard card */}
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

              {/* VIP status badge */}
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
      <section id="concept" className="px-4 sm:px-6 py-14 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <Reveal className="mb-10 sm:mb-16 text-center">
            <p className="section-label mb-4 justify-center">Le problème</p>
            <h2 className="text-balance text-heading-xl text-warm-900 sm:text-display">
              Vos activités d&apos;asso méritent mieux que le <span className="serif-accent">statu quo.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-body-sm sm:text-body-lg text-warm-500">
              Proposer des sorties originales à vos membres sans exploser votre budget, c&apos;est le défi de toute association. Et si on le résolvait pour vous ?
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
              Et si votre asso profitait d&apos;expériences <span className="serif-accent">gratuites</span> ?
            </h2>
            <p className="mx-auto mt-4 sm:mt-6 max-w-2xl text-body-sm sm:text-body-lg text-warm-500">
              On vous invite dans nos établissements partenaires, vos membres vivent l&apos;expérience,
              et ils partagent un avis honnête sur Google. C&apos;est simple, gratuit, et tout le monde y gagne.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Process (dark) ── */}
      <section className="bg-warm-900 px-4 sm:px-6 py-14 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <Reveal className="mb-8 sm:mb-12 text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-accent">Comment ça marche</p>
            <h2 className="text-heading-xl text-white sm:text-display">
              3 étapes pour devenir <span className="serif-accent text-accent">ambassadeur.</span>
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
            <p className="section-label mb-4 justify-center">Avantages</p>
            <h2 className="text-balance text-heading-xl text-warm-900 sm:text-display">
              Ce que vous y <span className="serif-accent">gagnez.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-body-sm sm:text-body-lg text-warm-500">
              En rejoignant le programme, votre association et ses membres profitent
              d&apos;expériences exclusives, gratuitement.
            </p>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
              Programme Ambassadeur vs. les <span className="serif-accent">autres.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-2xl border border-warm-200 bg-white shadow-soft">
              <div className="grid grid-cols-3 border-b border-warm-200 bg-warm-50 px-3 sm:px-6 py-3 text-[11px] font-bold uppercase tracking-[0.15em] text-warm-400">
                <span>Critère</span>
                <span className="text-center">Programme Siva</span>
                <span className="text-center">Autres programmes</span>
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
              Des associations qui en parlent <span className="serif-accent">mieux que nous.</span>
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

      {/* ── Pricing card ── */}
      <section className="bg-warm-50 px-4 sm:px-6 py-14 sm:py-24">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <div className="rounded-2xl sm:rounded-3xl border border-warm-200 bg-white p-5 sm:p-8 shadow-soft lg:p-12">
              <div className="mb-8 text-center">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-warm-900 shadow-lg shadow-accent/25">
                  Gratuit
                </span>
                <h3 className="mt-4 text-2xl font-medium text-warm-900">Programme Ambassadeur</h3>
                <div className="mt-4">
                  <span className="serif-accent text-[2.5rem] sm:text-[3.25rem] leading-none tracking-tight text-warm-900">0€</span>
                </div>
                <p className="mt-2 text-sm text-warm-500">Aucun frais, aucun engagement</p>
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
                <a href="#inscription" className="btn-accent">
                  Rejoindre le programme
                </a>
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
                <h3 className="text-xl font-medium text-warm-900">Expériences garanties, sans surprise</h3>
                <p className="mt-2 text-body-sm leading-relaxed text-warm-500">
                  Chaque établissement partenaire est vérifié par notre équipe. On s&apos;assure de la qualité de l&apos;expérience avant de vous inviter. Si une sortie ne vous convient pas, on vous en propose une autre. 100% des associations recommandent le programme.
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

      {/* ── Formulaire inscription ── */}
      <section id="inscription" className="px-4 sm:px-6 py-14 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <Reveal className="mb-8 sm:mb-12 text-center">
            <p className="section-label mb-4 justify-center">Inscription</p>
            <h2 className="text-heading-xl text-warm-900">
              Inscrivez votre <span className="serif-accent">association</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-body-sm sm:text-body-lg text-warm-500">
              Remplissez le formulaire ci-dessous. On revient vers vous sous 48h avec
              les prochaines étapes.
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="rounded-2xl sm:rounded-3xl border border-warm-200 bg-white p-5 sm:p-8 shadow-soft lg:p-10">
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
                        contactName: '',
                        email: '',
                        phone: '',
                        city: '',
                        members: '',
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
                        placeholder="Les Gourmets Solidaires"
                        className={FORM_FIELDS_CLASSES}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contactName"
                        className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-warm-400"
                      >
                        Nom du référent *
                      </label>
                      <input
                        id="contactName"
                        name="contactName"
                        type="text"
                        required
                        value={form.contactName}
                        onChange={handleChange}
                        placeholder="Marie Dupont"
                        className={FORM_FIELDS_CLASSES}
                      />
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
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
                        placeholder="contact@monasso.fr"
                        className={FORM_FIELDS_CLASSES}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-warm-400"
                      >
                        Téléphone *
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="06 12 34 56 78"
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
                        Nombre de membres
                      </label>
                      <select
                        id="members"
                        name="members"
                        value={form.members}
                        onChange={handleChange}
                        className={FORM_FIELDS_CLASSES}
                      >
                        <option value="">Sélectionnez</option>
                        <option value="1-10">1 – 10</option>
                        <option value="11-30">11 – 30</option>
                        <option value="31-50">31 – 50</option>
                        <option value="51-100">51 – 100</option>
                        <option value="100+">100+</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-warm-400"
                    >
                      Parlez-nous de votre association
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Décrivez votre asso, vos activités, pourquoi vous souhaitez rejoindre le programme..."
                      className={`${FORM_FIELDS_CLASSES} resize-none`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formState === 'sending'}
                    className="btn-primary w-full disabled:opacity-60"
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
      <section className="bg-warm-900 px-4 sm:px-6 py-14 sm:py-20 text-white">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-heading-xl text-white">
              Des expériences gratuites pour votre <span className="serif-accent text-accent">communauté</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-body-sm sm:text-body-lg text-white/60">
              Plus de 50 établissements partenaires vous attendent. Inscrivez votre
              association et commencez à profiter dès cette semaine.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a href="#inscription" className="btn-accent">
                Inscrire mon association
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
