'use client';

import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import {
  RiArrowRightLine,
  RiVerifiedBadgeFill,
  RiCalendarScheduleFill,
  RiCheckboxCircleFill,
  RiArrowDownSLine,
  RiTimeLine,
  RiFileEditFill,
  RiMapPin2Fill,
  RiSearchLine,
  RiShieldCheckFill,
  RiSparklingFill,
  RiStarFill,
  RiStarLine,
  RiLineChartFill,
} from 'react-icons/ri';
import {
  Sparkle,
  Crosshair,
  MagnifyingGlass,
  ChartPie,
  ChartLineUp,
  CalendarCheck,
} from '@phosphor-icons/react';
import PlaceSearchInput from '@/components/audit/PlaceSearchInput';
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

const RESULTS_SHOWCASE = [
  {
    query: 'restaurant italien Paris 11',
    highlightIndex: 0,
    timeframe: '4 mois',
    listings: [
      { name: 'Restaurant Le Comptoir', rating: 4.7, reviews: 186, category: 'Restaurant italien', address: '42 Rue Oberkampf, Paris', hours: 'Ouvert · Ferme à 23:00', highlighted: true, image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=80&h=80&fit=crop&crop=center' },
      { name: 'Trattoria Bella', rating: 4.5, reviews: 203, category: 'Restaurant italien', address: '15 Rue de la Roquette, Paris', hours: 'Ouvert · Ferme à 22:30', highlighted: false, image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=80&h=80&fit=crop&crop=center' },
      { name: 'Il Palazzo', rating: 4.3, reviews: 147, category: 'Restaurant italien', address: '8 Bd Voltaire, Paris', hours: 'Ouvert · Ferme à 23:00', highlighted: false, image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=80&h=80&fit=crop&crop=center' },
    ],
  },
  {
    query: 'dentiste Paris 16',
    highlightIndex: 0,
    timeframe: '3 mois',
    listings: [
      { name: 'Cabinet Dentaire Rivière', rating: 4.9, reviews: 112, category: 'Dentiste', address: '28 Ave Mozart, Paris', hours: 'Ouvert · Ferme à 19:00', highlighted: true, image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=80&h=80&fit=crop&crop=center' },
      { name: 'Dr Martin - Dentiste', rating: 4.6, reviews: 89, category: 'Dentiste', address: '3 Rue de Passy, Paris', hours: 'Fermé · Ouvre à 09:00', highlighted: false, image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=80&h=80&fit=crop&crop=center' },
      { name: 'Centre Dentaire Auteuil', rating: 4.4, reviews: 201, category: 'Dentiste', address: '56 Rue d\'Auteuil, Paris', hours: 'Ouvert · Ferme à 18:30', highlighted: false, image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=80&h=80&fit=crop&crop=center' },
    ],
  },
  {
    query: 'garage automobile Boulogne',
    highlightIndex: 2,
    timeframe: '5 mois',
    listings: [
      { name: 'Speedy Boulogne', rating: 3.9, reviews: 312, category: 'Garage automobile', address: '12 Rue du Point du Jour', hours: 'Ouvert · Ferme à 19:00', highlighted: false, image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=80&h=80&fit=crop&crop=center' },
      { name: 'Norauto Boulogne', rating: 4.0, reviews: 178, category: 'Garage automobile', address: '45 Ave Édouard Vaillant', hours: 'Ouvert · Ferme à 19:30', highlighted: false, image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=80&h=80&fit=crop&crop=center' },
      { name: 'Garage Auto Prestige', rating: 4.8, reviews: 89, category: 'Garage automobile', address: '7 Rue de Silly, Boulogne', hours: 'Ouvert · Ferme à 18:00', highlighted: true, image: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=80&h=80&fit=crop&crop=center' },
    ],
  },
];

const VALUE_PROPS = [
  {
    Icon: Sparkle,
    stat: 'IA',
    statLabel: 'intégrée',
    title: 'L\'IA fait le travail invisible',
    description:
      'Nos algorithmes analysent des centaines de signaux en temps réel : mots-clés sous-exploités, tendances émergentes, failles de vos concurrents. On détecte ce que l\'œil humain ne voit pas.',
  },
  {
    Icon: Crosshair,
    stat: 'Zone',
    statLabel: 'par zone',
    title: 'Scan précis, zone par zone',
    description:
      'Pas de moyenne globale. On analyse votre positionnement rue par rue, quartier par quartier, pour savoir exactement où vous êtes visible — et où vous ne l\'êtes pas.',
  },
  {
    Icon: MagnifyingGlass,
    stat: '+8 ans',
    statLabel: 'd\'expérience',
    title: 'Le SEO local, rien d\'autre',
    description:
      'On ne fait pas de SEO "classique" ou de la com\' généraliste. Le référencement local est notre seul métier depuis des années. C\'est cette hyper-spécialisation qui fait la différence.',
  },
  {
    Icon: ChartPie,
    stat: '100%',
    statLabel: 'data-driven',
    title: '100% piloté par la data',
    description:
      'Chaque décision est basée sur des chiffres réels : positions, clics, appels, avis, taux de conversion. Zéro intuition, zéro bullshit — que du mesurable.',
  },
  {
    Icon: ChartLineUp,
    stat: 'Droit',
    statLabel: 'au but',
    title: 'Pas de bla-bla, des résultats',
    description:
      'On ne vend pas des slides ou des rapports de 50 pages. On exécute, on optimise, on mesure. Vous voyez la progression chaque semaine dans votre dashboard.',
  },
  {
    Icon: CalendarCheck,
    stat: '1/sem',
    statLabel: 'de suivi',
    title: 'Un suivi serré, chaque semaine',
    description:
      'Chaque semaine, vous recevez un point sur vos positions, vos appels et les actions réalisées. On ajuste la stratégie en temps réel selon les résultats.',
  },
];


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PROCESS_STEPS = [
  {
    id: '1',
    Icon: RiCalendarScheduleFill,
    title: 'Prise de rendez-vous',
    description:
      'Réservez un créneau de 15 min avec notre équipe. On échange sur vos objectifs et on évalue votre potentiel de croissance locale.',
  },
  {
    id: '2',
    Icon: RiSearchLine,
    title: 'Audit gratuit',
    description:
      'On analyse votre fiche Google, vos positions, vos concurrents et vos avis. Vous recevez un rapport complet sans engagement.',
  },
  {
    id: '3',
    Icon: RiLineChartFill,
    title: 'On booste votre présence',
    description:
      'Notre équipe optimise votre visibilité sur Google Maps : fiche, avis, contenu et positionnement. Vous voyez les résultats chaque semaine.',
  },
];

const PRICING_PLANS = [
  {
    Icon: RiSearchLine,
    tag: 'Gratuit',
    title: 'Audit Fiche Google',
    basePrice: 0,
    price: 'Gratuit',
    priceSuffix: '',
    promise: 'Découvrez les axes d\'amélioration de votre fiche Google en 2 minutes.',
    features: [
      'Analyse de votre visibilité locale',
      'Score d\'optimisation de votre fiche',
      'Recommandations personnalisées',
      'Comparaison avec vos concurrents',
      'Rapport détaillé envoyé par email',
    ],
    cta: 'Lancer mon audit gratuit',
    ctaHref: '/audit-gratuit',
    highlighted: false,
    badge: null,
  },
  {
    Icon: RiFileEditFill,
    tag: 'One-shot',
    title: 'Optimisation Fiche Google',
    basePrice: 790,
    price: '790€',
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
    Icon: RiVerifiedBadgeFill,
    tag: 'Sélectif',
    title: 'Boost Avis Expérience',
    basePrice: null as number | null,
    price: 'Sur devis',
    priceSuffix: '',
    promise: 'De vrais clients, de vraies visites, de vrais avis Google.',
    features: [
      'Des étudiants visitent votre établissement',
      'Ils vivent une expérience réelle (repas, soin, service…)',
      'Ils laissent un avis Google authentique et détaillé',
      '100% conforme aux CGU Google',
    ],
    cta: 'Déposer ma candidature',
    ctaHref: '/rendez-vous',
    highlighted: false,
    badge: 'Candidature requise',
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

const TESTIMONIALS_ROW1 = [
  {
    name: 'Marie L.',
    role: 'Restauratrice',
    placeName: 'Le Bouillon Chartier',
    city: 'Paris',
    avatar: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=120&h=120&fit=crop&crop=center',
    text: 'En 3 mois, on est passé de la 12e à la 2e position sur "restaurant italien" dans notre quartier. Les appels ont doublé. L\'équipe Siva est redoutablement efficace et toujours disponible.',
    rating: 5,
  },
  {
    name: 'Thomas B.',
    role: 'Dentiste',
    placeName: 'Centre Dentaire Bellecour',
    city: 'Lyon',
    avatar: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=120&h=120&fit=crop&crop=center',
    text: 'La heatmap m\'a ouvert les yeux. Je ne savais même pas que je n\'apparaissais pas dans la moitié de ma zone ! Aujourd\'hui je suis n°1 sur toutes mes requêtes principales. Le ROI est énorme.',
    rating: 5,
  },
  {
    name: 'Sophie R.',
    role: 'Avocate',
    placeName: 'Cabinet Voltaire Avocats',
    city: 'Bordeaux',
    avatar: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=120&h=120&fit=crop&crop=center',
    text: 'Rapport impressionnant dès l\'audit gratuit. J\'ai été convaincue de passer à l\'accompagnement complet et j\'ai gagné 45% de visibilité en 2 mois. Professionnels et transparents.',
    rating: 5,
  },
  {
    name: 'Julien D.',
    role: 'Plombier',
    placeName: 'Plomberie du Vieux-Port',
    city: 'Marseille',
    avatar: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=120&h=120&fit=crop&crop=center',
    text: 'Avant Siva, on n\'existait pas sur Google Maps. En 6 semaines, on était dans le top 3 sur "plombier urgence" dans toute notre zone. Les appels ont explosé.',
    rating: 4,
  },
];

const TESTIMONIALS_ROW2 = [
  {
    name: 'David K.',
    role: 'Gérant',
    placeName: 'Garage du Capitole',
    city: 'Toulouse',
    avatar: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=120&h=120&fit=crop&crop=center',
    text: 'Sandro et son équipe comprennent parfaitement les enjeux d\'un commerce local. Ils ont triplé nos avis Google en 4 mois et on reçoit maintenant 3x plus de demandes de devis.',
    rating: 5,
  },
  {
    name: 'Camille M.',
    role: 'Opticienne',
    placeName: 'Optique Saint-Germain',
    city: 'Nantes',
    avatar: 'https://images.unsplash.com/photo-1604147706283-d7119b5b822c?w=120&h=120&fit=crop&crop=center',
    text: 'L\'approche data-driven de Siva est bluffante. On voit exactement ce qui marche, zone par zone. Nos concurrents nous demandent comment on fait. Je recommande à 1000%.',
    rating: 5,
  },
  {
    name: 'Lucas P.',
    role: 'Boulanger',
    placeName: 'Boulangerie Maison Kayser',
    city: 'Strasbourg',
    avatar: 'https://images.unsplash.com/photo-1528698827591-e19cef51a699?w=120&h=120&fit=crop&crop=center',
    text: 'On hésitait à investir dans le digital. Siva nous a montré le potentiel qu\'on perdait chaque mois. Résultat : +60% de nouveaux clients en 90 jours. Le meilleur investissement qu\'on ait fait.',
    rating: 5,
  },
  {
    name: 'Dr Leroy',
    role: 'Médecin',
    placeName: 'Cabinet Médical Haussmann',
    city: 'Paris',
    avatar: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=120&h=120&fit=crop&crop=center',
    text: 'En tant que professionnel de santé, je ne connaissais rien au référencement. Siva a tout pris en main. Mon cabinet apparaît maintenant en 1ère position sur 80% de ma zone.',
    rating: 5,
  },
];


const FAQ_ITEMS = [
  {
    q: 'Qu\'est-ce que Siva fait concrètement ?',
    a: 'Siva est une agence spécialisée en visibilité locale sur Google Maps. On optimise votre fiche Google Business, on booste vos avis clients grâce à notre programme "Boost Avis Expérience", et on gère vos campagnes Google Ads locales — pour que votre établissement apparaisse en premier quand un client cherche vos services à proximité.',
  },
  {
    q: 'Comment fonctionne le "Boost Avis Expérience" ?',
    a: 'C\'est notre service phare. Des étudiants sélectionnés visitent réellement votre établissement, vivent une expérience authentique (repas, soin, consultation…), puis laissent un avis Google détaillé et sincère. Pas de faux avis : tout est basé sur une vraie visite. Le programme est 100% conforme aux CGU Google.',
  },
  {
    q: 'L\'audit gratuit est-il vraiment gratuit ?',
    a: 'Oui, 100% gratuit et sans engagement. Vous obtenez un score d\'optimisation sur 100, une heatmap de vos positions locales, une analyse de vos 3 principaux concurrents et des recommandations IA personnalisées. Aucune carte bancaire n\'est requise.',
  },
  {
    q: 'Combien de temps avant de voir des résultats ?',
    a: 'Les premiers effets (optimisation de fiche, photos, catégories) sont visibles en 2 à 4 semaines. Les résultats significatifs en termes de positions Google Maps et de nouveaux contacts arrivent entre 60 et 90 jours. On vous partage un calendrier précis dès le démarrage.',
  },
  {
    q: 'Quel est le prix de vos services ?',
    a: 'L\'audit est gratuit. L\'optimisation complète de votre fiche Google est à 500€ HT (prestation one-shot). Le Google Ads local est à 400€/mois HT + budget pub. Le Boost Avis Expérience est sur devis après candidature. Pas de frais cachés.',
  },
  {
    q: 'Y a-t-il un engagement de durée ?',
    a: 'Aucun engagement minimum. L\'optimisation de fiche est une prestation one-shot. Pour le Google Ads, les contrats sont résiliables à tout moment. On préfère vous garder par la qualité de nos résultats, pas par une clause contractuelle.',
  },
  {
    q: 'C\'est adapté pour un indépendant ou une petite entreprise ?',
    a: 'Absolument. La majorité de nos clients sont des indépendants et TPE : restaurants, médecins, avocats, artisans, garages, salons de coiffure… Le SEO local est le levier le plus rentable pour les structures qui dépendent d\'une clientèle de proximité.',
  },
  {
    q: 'Garantissez-vous la première position sur Google Maps ?',
    a: 'Personne ne peut honnêtement garantir la 1ère position. Ce qu\'on garantit, c\'est une amélioration mesurable de vos positions, de votre visibilité et de vos prises de contact. Vous recevez un reporting chaque semaine avec vos positions, vos appels et votre ROI estimé.',
  },
];


type RevealVariant = 'fade-up' | 'slide-left' | 'slide-right' | 'scale-up' | 'blur-in' | 'rotate-in';

const REVEAL_VARIANTS: Record<RevealVariant, { hidden: Record<string, number | string>; visible: Record<string, number | string> }> = {
  'fade-up': {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  },
  'slide-left': {
    hidden: { opacity: 0, x: -80 },
    visible: { opacity: 1, x: 0 },
  },
  'slide-right': {
    hidden: { opacity: 0, x: 80 },
    visible: { opacity: 1, x: 0 },
  },
  'scale-up': {
    hidden: { opacity: 0, scale: 0.82, y: 30 },
    visible: { opacity: 1, scale: 1, y: 0 },
  },
  'blur-in': {
    hidden: { opacity: 0, filter: 'blur(12px)', y: 20 },
    visible: { opacity: 1, filter: 'blur(0px)', y: 0 },
  },
  'rotate-in': {
    hidden: { opacity: 0, y: 60, rotate: -2 },
    visible: { opacity: 1, y: 0, rotate: 0 },
  },
};

function Reveal({
  children,
  className = '',
  delay = 0,
  variant = 'fade-up' as RevealVariant,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: RevealVariant;
}) {
  const v = REVEAL_VARIANTS[variant];

  return (
    <motion.div
      initial={v.hidden}
      whileInView={v.visible}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[100] origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #C8A84E, #F0C75E, #E8C060)',
      }}
    />
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
      className={`sticker-float ${className}`}
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

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-warm-200 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="group flex w-full items-center justify-between gap-3 py-4 text-left sm:gap-4 sm:py-6"
      >
        <span className="text-sm font-medium text-warm-800 transition-colors group-hover:text-warm-900 sm:text-lg">
          {question}
        </span>
        <RiArrowDownSLine
          className={`h-4 w-4 shrink-0 text-warm-400 transition-transform duration-300 sm:h-5 sm:w-5 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <p className="pb-4 text-sm leading-relaxed text-warm-600 sm:pb-6 sm:text-base">{answer}</p>
      </motion.div>
    </div>
  );
}

export default function HomePage() {
  const router = useRouter();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const [establishmentCount, setEstablishmentCount] = useState(1);
  const discount = getDiscount(establishmentCount);

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
        <ScrollProgress />
        {/* ═══════════════════════ HERO ═══════════════════════ */}
        <section ref={heroRef} className="relative overflow-hidden px-4 pb-12 pt-10 sm:px-6 sm:pb-16 sm:pt-14 md:pb-24 md:pt-20">
          <motion.div style={{ y: heroY }} className="pointer-events-none absolute inset-0 -z-10">
            <div className="hero-grain-gradient" />
            <div className="hero-dot-grid absolute inset-0" />
            <div className="hero-glow" />
          </motion.div>

          <Sticker className="absolute left-[6%] top-[12%] text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl" rotate={-12} floatDuration={3.2} floatStyle="float">🗺️</Sticker>
          <Sticker className="absolute right-[8%] top-[8%] text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl" rotate={8} floatDuration={2.8} floatStyle="pulse">⭐</Sticker>
          <Sticker className="absolute bottom-[18%] left-[4%] text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl" rotate={15} floatDuration={3.6} floatStyle="bob">🔥</Sticker>
          <Sticker className="absolute bottom-[22%] right-[5%] text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl" rotate={-8} floatDuration={3} floatStyle="sway">📈</Sticker>

          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-4xl text-center">
              <Reveal>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-warm-200 bg-white px-3.5 py-2 text-xs font-semibold shadow-soft sm:mb-6 sm:px-5 sm:py-2.5 sm:text-sm">
                  <RiMapPin2Fill className="h-3.5 w-3.5 text-accent-dark sm:h-4 sm:w-4" />
                  Agence SEO local basée à Paris
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <h1 className="text-balance text-heading-xl font-light text-warm-900 sm:text-display md:text-display-lg lg:text-display-xl">
                  On propulse votre business à la 1ère place de{' '}
                  <span className="serif-accent serif-accent-animated">Google Maps.</span>
                </h1>
              </Reveal>

              <Reveal delay={0.16}>
                <p className="mx-auto mt-4 max-w-2xl text-body-sm text-warm-600 sm:mt-6 sm:text-body-lg">
                  Plus de visibilité, plus d&apos;appels, plus de clients. Nous aidons des entreprises ambitieuses à dominer leur zone géographique sur Google Maps.
                </p>
              </Reveal>

              <Reveal delay={0.24}>
                <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4">
                  <a href="/rendez-vous" className="btn-primary btn-hero">
                    Parler à un expert
                  </a>
                  <a
                    href="#audit"
                    className="btn-secondary btn-hero"
                  >
                    Audit gratuit
                  </a>
                </div>
              </Reveal>

              <Reveal delay={0.32}>
                <div className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full border border-warm-200 bg-white px-3.5 py-2 shadow-soft sm:mt-8 sm:gap-3 sm:px-5 sm:py-2.5">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 92.3 132.3" className="h-5 w-auto shrink-0 sm:h-6">
                    <path fill="#1a73e8" d="M60.2 2.2C55.8.8 51 0 46.1 0 32 0 19.3 6.4 10.8 16.5l21.8 18.3L60.2 2.2z"/>
                    <path fill="#ea4335" d="M10.8 16.5C4.1 24.5 0 34.9 0 46.1c0 8.7 1.7 15.7 4.6 22l28-33.3L10.8 16.5z"/>
                    <path fill="#4285f4" d="M46.2 28.5c9.8 0 17.7 7.9 17.7 17.7 0 4.3-1.6 8.3-4.2 11.4 0 0 13.9-16.6 27.5-32.7-5.6-10.8-15.3-19-27-22.7L32.6 34.8c3.3-3.8 8.1-6.3 13.6-6.3"/>
                    <path fill="#fbbc04" d="M46.2 63.8c-9.8 0-17.7-7.9-17.7-17.7 0-4.3 1.5-8.3 4.1-11.3l-28 33.3c4.8 10.6 12.8 19.2 21 29.9l34.1-40.5c-3.3 3.9-8.1 6.3-13.5 6.3"/>
                    <path fill="#34a853" d="M59.1 109.2c15.4-24.1 33.3-35 33.3-63 0-7.7-1.9-14.9-5.2-21.3L25.6 98c2.6 3.4 5.3 7.3 7.9 11.3 9.4 14.5 6.8 23.1 12.8 23.1s3.4-8.7 12.8-23.2"/>
                  </svg>
                  <div className="flex items-center gap-0.5 sm:gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <RiStarFill key={i} className="h-3.5 w-3.5 text-accent sm:h-4 sm:w-4" />
                    ))}
                  </div>
                  <span className="text-xs font-medium text-warm-600 sm:text-sm">
                    <strong className="text-warm-900">4.9/5</strong> · 67 avis Google
                  </span>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ═══════════════════════ LOGOS MARQUEE ═══════════════════════ */}
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


        {/* ═══════════════════════ RESULTATS / SHOWCASE ═══════════════════════ */}
        <section id="resultats" className="px-4 pb-10 pt-14 sm:px-6 sm:pb-14 md:pt-24">
          <div className="mx-auto max-w-7xl">
            <Reveal className="mb-10 text-center sm:mb-16" variant="blur-in">
              <p className="section-label mb-3 justify-center sm:mb-4">Nos derniers résultats</p>
              <h2 className="text-balance text-heading-mobile font-light text-warm-900 sm:text-heading-xl md:text-display">
                +150 fiches propulsées dans le top 3
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-body-sm text-warm-500 sm:mt-4 sm:text-body-lg">
                Pas des promesses — des positions. Voici ce qu&apos;on obtient pour nos clients.
              </p>
            </Reveal>

            <div className="grid gap-6 md:grid-cols-3">
              {RESULTS_SHOWCASE.map((result, i) => (
                <Reveal key={result.query} delay={i * 0.12} variant="rotate-in" className={i > 0 ? 'hidden md:block' : ''}>
                  <div className="group relative overflow-hidden rounded-3xl border border-warm-200 bg-white shadow-soft transition-all hover:-translate-y-1 hover:shadow-card">
                    {/* Google-style search bar */}
                    <div className="flex items-center gap-2 border-b border-gray-200 px-4 py-3">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 272 92" className="h-5 w-auto shrink-0">
                        <path fill="#4285F4" d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"/>
                        <path fill="#EA4335" d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C119.25 34.32 129.24 25 141.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"/>
                        <path fill="#FBBC05" d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z"/>
                        <path fill="#4285F4" d="M225 3v65h-9.5V3h9.5z"/>
                        <path fill="#34A853" d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z"/>
                        <path fill="#EA4335" d="M35.29 41.19V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49-.21z"/>
                      </svg>
                      <div className="flex flex-1 items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5">
                        <RiSearchLine className="h-3.5 w-3.5 text-[#4285F4]" />
                        <span className="text-xs text-gray-700">{result.query}</span>
                      </div>
                    </div>

                    {/* Local Pack listings */}
                    <div className="px-4 pb-2 pt-3">
                      <div className="mb-2 flex items-center gap-1.5">
                        <RiMapPin2Fill className="h-3.5 w-3.5 text-[#4285F4]" />
                        <span className="text-xs font-medium text-gray-800">Établissements</span>
                      </div>

                      <div className="divide-y divide-gray-100">
                        {result.listings.map((listing) => (
                          <div
                            key={listing.name}
                            className={`relative flex gap-3 py-3 ${listing.highlighted ? 'rounded-lg bg-green-50/80 px-2 -mx-2' : ''}`}
                          >
                            <img
                              src={listing.image}
                              alt={listing.name}
                              className={`h-7 w-7 shrink-0 rounded-full object-cover ring-2 ${listing.highlighted ? 'ring-[#34A853]' : 'ring-gray-200'}`}
                            />
                            <div className="min-w-0 flex-1">
                              <p className={`text-sm font-medium leading-tight ${listing.highlighted ? 'text-[#34A853]' : 'text-gray-900'}`}>
                                {listing.name}
                              </p>
                              <div className="mt-0.5 flex items-center gap-1">
                                <span className="text-xs font-medium text-gray-700">{listing.rating}</span>
                                <div className="flex">
                                  {Array.from({ length: 5 }).map((_, k) =>
                                    k < Math.floor(listing.rating)
                                      ? <RiStarFill key={k} className="h-2.5 w-2.5 text-[#FBBC05]" />
                                      : <RiStarLine key={k} className="h-2.5 w-2.5 text-gray-200" />
                                  )}
                                </div>
                                <span className="text-xs text-gray-500">({listing.reviews})</span>
                              </div>
                              <p className="mt-0.5 text-[11px] leading-tight text-gray-500">
                                {listing.category} · {listing.address}
                              </p>
                              <p className={`text-[11px] ${listing.hours.startsWith('Ouvert') ? 'text-[#34A853]' : 'text-[#EA4335]'}`}>
                                {listing.hours}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Badge résultat */}
                    <div className="border-t border-gray-100 px-4 py-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-warm-500">
                          <RiTimeLine className="h-3.5 w-3.5" />
                          Résultat obtenu en {result.timeframe}
                        </div>
                        <span className="inline-flex items-center gap-1 rounded-full bg-positive/10 px-2.5 py-1 text-[11px] font-semibold text-positive">
                          <RiCheckboxCircleFill className="h-3 w-3" />
                          Client Siva
                        </span>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════ PRICING ═══════════════════════ */}
        <section id="services" className="px-4 pb-14 pt-10 sm:px-6 sm:pb-24 sm:pt-14">
          <div className="mx-auto max-w-7xl">
            <Reveal className="mb-8 text-center sm:mb-10" variant="blur-in">
              <p className="section-label mb-3 justify-center sm:mb-4">Nos offres</p>
              <h2 className="text-balance text-heading-mobile font-light text-warm-900 sm:text-heading-xl md:text-display">
                Des solutions pour transformer votre fiche Google en machine à clients
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-body-sm text-warm-500 sm:mt-5 sm:text-body-lg">
                Choisissez la formule adaptée à vos objectifs. Pas de frais cachés, pas de surprise.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mx-auto mb-8 flex flex-col items-center gap-3 sm:mb-14 sm:gap-4">
                <div className="flex items-center gap-2 text-xs font-medium text-warm-500 sm:gap-2.5 sm:text-sm">
                  <RiMapPin2Fill className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
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
                          layoutId="est-pill"
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
                    <span className="text-xs text-positive/70">sur tous les prix</span>
                  </motion.div>
                )}
              </div>
            </Reveal>

            <div className="grid gap-4 sm:gap-5 lg:grid-cols-3 lg:items-center">
              {PRICING_PLANS.map((plan, i) => (
                <Reveal key={plan.title} delay={i * 0.14} variant="scale-up">
                  <div className={`group relative flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-2 sm:rounded-[2rem] ${plan.highlighted ? 'border-2 border-accent/30 bg-white shadow-[0_8px_60px_rgba(240,199,94,0.12)] lg:scale-105 lg:z-10' : 'border border-warm-200 bg-white shadow-soft hover:shadow-card'}`}>
                    {plan.highlighted && (
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-accent/[0.04] to-transparent sm:rounded-[2rem]" />
                    )}

                    {plan.badge && (
                      <div className={`absolute right-4 top-4 z-10 rounded-full px-3 py-1 text-[9px] font-bold uppercase tracking-[0.12em] sm:right-6 sm:top-6 sm:px-4 sm:py-1.5 sm:text-[10px] ${plan.highlighted ? 'bg-accent text-warm-900 shadow-lg shadow-accent/25' : 'border border-warm-200 bg-warm-50 text-warm-500'}`}>
                        {plan.badge}
                      </div>
                    )}

                    <div className="relative p-5 pb-4 sm:p-9 sm:pb-7">
                      <span className="mb-2 block text-[9px] font-bold uppercase tracking-[0.2em] text-warm-400 sm:mb-2.5 sm:text-[10px]">
                        {plan.tag}
                      </span>
                      <h3 className="text-xl font-medium tracking-tight text-warm-900 sm:text-2xl">{plan.title}</h3>

                      <div className="mt-4 sm:mt-6">
                        {plan.basePrice === null ? (
                          <span className="serif-accent text-[2.5rem] leading-none tracking-tight text-warm-900 sm:text-[3.25rem]">Sur devis</span>
                        ) : plan.basePrice === 0 ? (
                          <span className="serif-accent text-[2.5rem] leading-none tracking-tight text-warm-900 sm:text-[3.25rem]">Gratuit</span>
                        ) : (() => {
                          const unitPrice = Math.round(plan.basePrice * (1 - discount / 100));
                          return (
                            <>
                              <span className="mb-1 block text-[11px] font-medium text-warm-400 sm:text-xs">
                                {establishmentCount > 1 ? 'Par établissement' : 'À partir de'}
                              </span>
                              <div className="flex items-baseline gap-1.5 sm:gap-2">
                                <motion.span
                                  key={`${plan.title}-${establishmentCount}`}
                                  initial={{ opacity: 0, y: 8 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.25 }}
                                  className="serif-accent text-[2.5rem] leading-none tracking-tight text-warm-900 sm:text-[3.25rem]"
                                >
                                  {unitPrice}€
                                </motion.span>
                                <span className="text-xs font-medium text-warm-500 sm:text-sm">HT</span>
                                {plan.priceSuffix && (
                                  <span className="text-xs font-medium text-warm-500 sm:text-sm">{plan.priceSuffix}</span>
                                )}
                              </div>
                              {discount > 0 && (
                                <motion.div
                                  key={`discount-${plan.title}-${establishmentCount}`}
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  className="mt-2 flex items-center gap-2"
                                >
                                  <span className="text-xs text-warm-400 line-through">{plan.basePrice}€ HT</span>
                                  <span className="rounded-full bg-positive/10 px-2 py-0.5 text-[11px] font-bold text-positive">
                                    −{discount}%
                                  </span>
                                </motion.div>
                              )}
                            </>
                          );
                        })()}
                      </div>

                      <p className="mt-3 text-sm leading-relaxed text-warm-600 sm:mt-4 sm:text-[15px]">
                        {plan.promise}
                      </p>
                    </div>

                    <div className="relative flex flex-1 flex-col px-5 pb-5 sm:px-9 sm:pb-9">
                      <div className="mb-5 h-px bg-warm-200/60 sm:mb-7" />
                      <p className="mb-4 text-[9px] font-bold uppercase tracking-[0.2em] text-warm-400 sm:mb-5 sm:text-[10px]">
                        Ce qu&apos;on fait
                      </p>
                      <ul className="flex-1 space-y-3 sm:space-y-4">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2.5 text-xs text-warm-500 sm:gap-3 sm:text-[13px]">
                            <RiCheckboxCircleFill className="mt-0.5 h-4 w-4 shrink-0 text-black sm:h-[18px] sm:w-[18px]" />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      <a
                        href={plan.ctaHref}
                        className="mt-6 self-start sm:mt-9 btn-primary"
                      >
                        {plan.cta}
                      </a>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════ PROCESS ═══════════════════════ */}
        <section id="methode" className="relative overflow-hidden bg-warm-900 px-4 py-14 sm:px-6 sm:py-20">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-accent/[0.04] blur-[120px]" />
          </div>

          <div className="relative mx-auto max-w-5xl">
            <Reveal className="mb-4 text-center" variant="scale-up">
              <p className="section-label mb-3 justify-center !text-accent sm:mb-4 before:!bg-accent/40">3 étapes, c&apos;est tout</p>
              <h2 className="text-balance text-heading-mobile font-light text-white sm:text-heading-xl md:text-display">
                Comment ça <span className="serif-accent">marche.</span>
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-body-sm text-white/50 sm:mt-4 sm:text-body-lg">
                Pas de process compliqué. On s&apos;occupe de tout pour que vous puissiez vous concentrer sur votre activité.
              </p>
            </Reveal>

            <div className="mt-8 grid gap-8 sm:mt-12 sm:gap-6 md:grid-cols-3">
              {/* ── Étape 1 : Calendly booking widget ── */}
              <Reveal delay={0.1} variant="slide-left">
                <div className="group relative text-center md:text-left">
                  <div className="mx-auto mb-4 flex h-[260px] w-full max-w-[260px] flex-col overflow-hidden rounded-2xl bg-white shadow-[0_8px_40px_rgba(0,0,0,0.18)] transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_12px_50px_rgba(0,107,255,0.15)] sm:mb-6 md:mx-0" style={{ border: '1px solid #e8e8e8' }}>
                    {/* Calendly-style event info header */}
                    <div className="border-b px-4 pb-2.5 pt-3" style={{ borderColor: '#e5e5e5' }}>
                      <div className="mb-2 flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-200">
                          <span className="text-[9px] font-bold text-gray-500">S</span>
                        </div>
                        <div>
                          <p className="text-[9px] text-gray-500">Sandro T.</p>
                          <p className="text-[12px] font-bold text-gray-900">Appel Découverte</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-[9px] text-gray-500">
                        <span className="flex items-center gap-1">
                          <svg className="h-2.5 w-2.5" viewBox="0 0 16 16" fill="none">
                            <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M8 4.5V8L10.5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                          </svg>
                          15 min
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="h-2.5 w-2.5" viewBox="0 0 16 16" fill="none">
                            <rect x="1" y="3" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
                            <circle cx="8" cy="8" r="2" fill="currentColor" />
                          </svg>
                          Google Meet
                        </span>
                      </div>
                    </div>

                    {/* Calendar section */}
                    <div className="px-4 pb-2 pt-2.5">
                      <p className="mb-2 text-[11px] font-bold text-gray-900">Sélectionnez une date</p>

                      {/* Month navigation */}
                      <div className="mb-2 flex items-center gap-2">
                        <span className="flex h-4 w-4 items-center justify-center rounded-full text-[10px] text-gray-300">&lsaquo;</span>
                        <span className="text-[10px] font-semibold text-gray-800">Mars 2026</span>
                        <span className="flex h-4 w-4 items-center justify-center rounded-full text-[10px] text-white" style={{ backgroundColor: '#0069ff' }}>&rsaquo;</span>
                      </div>

                      {/* Day headers - like real Calendly: MON TUE WED... */}
                      <div className="mb-1 grid grid-cols-7 gap-0 text-center">
                        {['LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM', 'DIM'].map((d, idx) => (
                          <span key={idx} className="text-[7px] font-semibold uppercase tracking-wide text-gray-400">{d}</span>
                        ))}
                      </div>

                      {/* Calendar grid - March 2026 starts on Sunday, so offset = 6 */}
                      <div className="grid grid-cols-7 gap-y-0.5 text-center text-[9px]">
                        {/* Empty cells for offset (Sun start = 6 empty cells before day 1) */}
                        {Array.from({ length: 6 }, (_, idx) => (
                          <span key={`empty-${idx}`} className="flex h-[22px] w-full items-center justify-center" />
                        ))}
                        {Array.from({ length: 22 }, (_, idx) => {
                          const day = idx + 1;
                          const isToday = day === 7;
                          const isSelected = day === 9;
                          const isPast = day < 7;
                          const isUnavailable = day === 1 || day === 8 || day === 15 || day === 22 || day === 29;
                          const isAvailable = !isPast && !isToday && !isSelected && !isUnavailable;
                          return (
                            <span
                              key={idx}
                              className={`relative mx-auto flex h-[22px] w-[22px] items-center justify-center rounded-full text-[9px] ${
                                isSelected
                                  ? 'font-bold text-white'
                                  : isToday
                                  ? 'font-bold'
                                  : isAvailable
                                  ? 'font-medium'
                                  : isPast
                                  ? 'text-gray-300'
                                  : 'text-gray-300'
                              }`}
                              style={
                                isSelected
                                  ? { backgroundColor: '#0069ff' }
                                  : isToday
                                  ? { border: '1.5px solid #0069ff', color: '#1a3154' }
                                  : isAvailable
                                  ? { backgroundColor: 'rgba(0,105,255,0.08)', color: '#0069ff' }
                                  : undefined
                              }
                            >
                              {day}
                              {isToday && (
                                <span className="absolute -bottom-0.5 left-1/2 h-[3px] w-[3px] -translate-x-1/2 rounded-full" style={{ backgroundColor: '#0069ff' }} />
                              )}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                  </div>
                  <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-accent sm:text-xs">Étape 1</p>
                  <h3 className="text-base font-medium text-white sm:text-lg">Prise de rendez-vous</h3>
                  <p className="mx-auto mt-2 max-w-[280px] text-xs leading-relaxed text-white/50 sm:text-sm md:mx-0 md:max-w-[240px]">
                    Réservez un créneau de 15 min avec notre équipe. On échange sur vos objectifs et on évalue votre potentiel de croissance locale.
                  </p>
                  <RiArrowRightLine className="absolute -right-3 top-20 hidden h-4 w-4 text-white/20 md:block" />
                </div>
              </Reveal>

              {/* ── Étape 2 : Audit dashboard ── */}
              <Reveal delay={0.2} variant="scale-up">
                <div className="group relative text-center md:text-left">
                  <div className="mx-auto mb-4 flex h-[260px] w-full max-w-[260px] flex-col overflow-hidden rounded-xl border border-warm-200 bg-white shadow-[0_8px_40px_rgba(0,0,0,0.15)] transition-all duration-500 group-hover:-translate-y-1 group-hover:border-accent/30 group-hover:shadow-[0_12px_50px_rgba(240,199,94,0.12)] sm:mb-6 md:mx-0">
                    <div className="flex items-center gap-2 border-b border-warm-100 px-3 py-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
                      <span className="text-[10px] font-medium text-warm-400">Votre score local</span>
                    </div>
                    <div className="p-3">
                      <div className="mx-auto mb-2.5 flex h-16 w-16 items-center justify-center rounded-full border-2 border-red-300 bg-red-50">
                        <div className="text-center">
                          <span className="block text-xl font-bold text-red-600">32</span>
                          <span className="block text-[7px] font-semibold uppercase tracking-wider text-red-400">/100</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {[
                          { label: 'Fiche Google', value: 40, color: 'bg-red-400' },
                          { label: 'Positions locales', value: 18, color: 'bg-red-500' },
                          { label: 'Avis & réputation', value: 35, color: 'bg-orange-400' },
                        ].map((metric) => (
                          <div key={metric.label}>
                            <div className="mb-0.5 flex items-center justify-between text-[9px]">
                              <span className="text-warm-500">{metric.label}</span>
                              <span className="font-semibold text-warm-700">{metric.value}%</span>
                            </div>
                            <div className="h-1 rounded-full bg-warm-100">
                              <div
                                className={`h-full rounded-full ${metric.color}`}
                                style={{ width: `${metric.value}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-2.5 flex items-center gap-1.5 rounded-md bg-red-50 px-2.5 py-1">
                        <RiSparklingFill className="h-2.5 w-2.5 text-red-500" />
                        <span className="text-[9px] font-medium text-red-600">5 axes d&apos;amélioration détectés</span>
                      </div>
                    </div>
                  </div>
                  <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-accent sm:text-xs">Étape 2</p>
                  <h3 className="text-base font-medium text-white sm:text-lg">Audit gratuit</h3>
                  <p className="mx-auto mt-2 max-w-[280px] text-xs leading-relaxed text-white/50 sm:text-sm md:mx-0 md:max-w-[240px]">
                    On analyse votre fiche Google, vos positions, vos concurrents et vos avis. Vous recevez un rapport complet sans engagement.
                  </p>
                  <RiArrowRightLine className="absolute -right-3 top-20 hidden h-4 w-4 text-white/20 md:block" />
                </div>
              </Reveal>

              {/* ── Étape 3 : Google Maps boost ── */}
              <Reveal delay={0.3} variant="slide-right">
                <div className="group relative text-center md:text-left">
                  <div className="mx-auto mb-4 flex h-[260px] w-full max-w-[260px] flex-col overflow-hidden rounded-xl border border-warm-200 bg-white shadow-[0_8px_40px_rgba(0,0,0,0.15)] transition-all duration-500 group-hover:-translate-y-1 group-hover:border-accent/30 group-hover:shadow-[0_12px_50px_rgba(240,199,94,0.12)] sm:mb-6 md:mx-0">
                    <div className="flex items-center gap-2 border-b border-warm-100 px-3 py-2">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 92.3 132.3" className="h-4 w-auto shrink-0">
                        <path fill="#1a73e8" d="M60.2 2.2C55.8.8 51 0 46.1 0 32 0 19.3 6.4 10.8 16.5l21.8 18.3L60.2 2.2z"/>
                        <path fill="#ea4335" d="M10.8 16.5C4.1 24.5 0 34.9 0 46.1c0 8.7 1.7 15.7 4.6 22l28-33.3L10.8 16.5z"/>
                        <path fill="#4285f4" d="M46.2 28.5c9.8 0 17.7 7.9 17.7 17.7 0 4.3-1.6 8.3-4.2 11.4 0 0 13.9-16.6 27.5-32.7-5.6-10.8-15.3-19-27-22.7L32.6 34.8c3.3-3.8 8.1-6.3 13.6-6.3"/>
                        <path fill="#fbbc04" d="M46.2 63.8c-9.8 0-17.7-7.9-17.7-17.7 0-4.3 1.5-8.3 4.1-11.3l-28 33.3c4.8 10.6 12.8 19.2 21 29.9l34.1-40.5c-3.3 3.9-8.1 6.3-13.5 6.3"/>
                        <path fill="#34a853" d="M59.1 109.2c15.4-24.1 33.3-35 33.3-63 0-7.7-1.9-14.9-5.2-21.3L25.6 98c2.6 3.4 5.3 7.3 7.9 11.3 9.4 14.5 6.8 23.1 12.8 23.1s3.4-8.7 12.8-23.2"/>
                      </svg>
                      <span className="text-[10px] font-medium text-warm-400">Google Maps</span>
                    </div>
                    <div className="px-3 pt-2 pb-1">
                      <div className="mb-2 flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-2.5 py-1.5">
                        <RiSearchLine className="h-2.5 w-2.5 text-warm-400" />
                        <span className="text-[9px] text-warm-500">restaurant italien paris 11</span>
                      </div>

                      <div className="divide-y divide-gray-100">
                        {[
                          { rank: '1', name: 'Votre établissement', highlight: true, rating: 4.9, reviews: 186, img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=80&h=80&fit=crop&crop=center' },
                          { rank: '2', name: 'Concurrent A', highlight: false, rating: 4.5, reviews: 142, img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=80&h=80&fit=crop&crop=center' },
                          { rank: '3', name: 'Concurrent B', highlight: false, rating: 4.3, reviews: 98, img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=80&h=80&fit=crop&crop=center' },
                        ].map((item) => (
                          <div
                            key={item.rank}
                            className={`flex gap-2 py-2 ${item.highlight ? 'rounded-lg bg-emerald-50/80 px-1.5 -mx-1.5' : ''}`}
                          >
                            <img
                              src={item.img}
                              alt={item.name}
                              className={`h-6 w-6 shrink-0 rounded-full object-cover ring-[1.5px] ${item.highlight ? 'ring-emerald-400' : 'ring-gray-200'}`}
                            />
                            <div className="min-w-0 flex-1">
                              <p className={`truncate text-[10px] font-semibold leading-tight ${item.highlight ? 'text-emerald-600' : 'text-gray-800'}`}>
                                {item.name}
                              </p>
                              <div className="mt-0.5 flex items-center gap-0.5">
                                <span className="text-[8px] font-medium text-gray-600">{item.rating}</span>
                                <div className="flex">
                                  {Array.from({ length: 5 }).map((_, k) =>
                                    k < Math.floor(item.rating)
                                      ? <RiStarFill key={k} className="h-[6px] w-[6px] text-[#FBBC05]" />
                                      : <RiStarLine key={k} className="h-[6px] w-[6px] text-gray-200" />
                                  )}
                                </div>
                                <span className="text-[7px] text-gray-400">({item.reviews})</span>
                              </div>
                            </div>
                            {item.highlight && (
                              <span className="mt-0.5 shrink-0 rounded-full bg-emerald-100 px-1.5 py-0.5 text-[7px] font-bold text-emerald-600">
                                ↑ +10
                              </span>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="mt-1.5 mb-1.5 flex items-center justify-center gap-1 rounded-md bg-emerald-50 px-2.5 py-1">
                        <RiCheckboxCircleFill className="h-2.5 w-2.5 text-emerald-500" />
                        <span className="text-[9px] font-medium text-emerald-600">Top 1 · Zone couverte à 92%</span>
                      </div>
                    </div>
                  </div>
                  <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-accent sm:text-xs">Étape 3</p>
                  <h3 className="text-base font-medium text-white sm:text-lg">On booste votre présence</h3>
                  <p className="mx-auto mt-2 max-w-[280px] text-xs leading-relaxed text-white/50 sm:text-sm md:mx-0 md:max-w-[240px]">
                    Notre équipe optimise votre visibilité sur Google Maps : fiche, avis, contenu et positionnement. Vous voyez les résultats chaque semaine.
                  </p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.3} className="mt-8 flex justify-center gap-4 sm:mt-10" variant="scale-up">
              <a href="/rendez-vous" className="btn-outline-light">
                Prendre rendez-vous
              </a>
            </Reveal>
          </div>
        </section>

        {/* ═══════════════════════ VALUE PROPS ═══════════════════════ */}
        <section className="bg-warm-100 px-4 py-14 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-7xl">
            <Reveal className="mb-4 text-center sm:mb-6" variant="blur-in">
              <p className="section-label mb-3 justify-center sm:mb-4">Notre méthode</p>
              <h2 className="text-balance text-heading-mobile font-light text-warm-900 sm:text-heading-xl md:text-display">
                Les avantages de notre <span className="serif-accent">approche.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.08} className="mb-10 text-center sm:mb-16" variant="blur-in">
              <p className="mx-auto max-w-2xl text-body-sm text-warm-500 sm:text-body-lg">
                Une méthode complète, data-driven et pilotée par l&apos;IA pour maximiser votre visibilité locale.
              </p>
            </Reveal>

            <div className="grid gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
              {VALUE_PROPS.map((prop, i) => (
                <Reveal key={prop.title} delay={i * 0.08} variant={i % 2 === 0 ? 'slide-left' : 'slide-right'}>
                  <div className="group relative flex h-full flex-col items-start gap-4 rounded-xl border border-warm-200/80 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] sm:gap-5 sm:rounded-2xl sm:p-7">
                    <div className="relative h-[60px] w-[60px] rounded-[10px] bg-gradient-to-b from-[#c0cde0] via-[#a8b8d8] to-[#8da4cc] p-[5px] shadow-[0_2px_8px_rgba(80,100,180,0.18),0_4px_14px_rgba(80,100,180,0.12)] transition-all duration-300 group-hover:shadow-[0_4px_16px_rgba(80,100,180,0.24),0_6px_22px_rgba(80,100,180,0.14)] sm:h-[70px] sm:w-[70px] sm:rounded-[12px] sm:p-[6px]">
                      <div className="flex h-full w-full items-center justify-center rounded-[6px] border border-white/60 bg-gradient-to-b from-white from-30% via-[#f0f4fb] via-65% to-[#dae4f2] shadow-[inset_0_1.5px_0_rgba(255,255,255,0.95)] sm:rounded-[7px]">
                        <prop.Icon weight="bold" className="h-7 w-7 text-[#1d1d1f] sm:h-[34px] sm:w-[34px]" />
                      </div>
                    </div>
                    <span className="text-[11px] font-semibold uppercase tracking-widest text-warm-400 transition-colors duration-300 group-hover:text-accent-dark sm:text-xs">
                      {prop.stat} {prop.statLabel}
                    </span>
                    <div>
                      <h3 className="text-lg font-medium text-warm-900 sm:text-xl">{prop.title}</h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-warm-500 sm:mt-2 sm:text-body-sm">
                        {prop.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.4} className="mt-14 text-center">
              <Link
                href="/resultats"
                className="group/link inline-flex items-center gap-2 text-sm font-medium text-warm-500 transition-colors hover:text-accent-dark"
              >
                Voir comment on a fait pour Le Comptoir
                <RiArrowRightLine className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-1" />
              </Link>
            </Reveal>
          </div>
        </section>

        {/* ═══════════════════════ BLOG ═══════════════════════ */}
        <section className="px-4 py-14 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-7xl">
            <Reveal className="mb-8 text-center sm:mb-10" variant="scale-up">
              <p className="section-label mb-3 justify-center sm:mb-4">Notre blog</p>
              <h2 className="text-balance text-heading-mobile font-light text-warm-900 sm:text-heading-xl md:text-display">
                Nos conseils pour votre <span className="serif-accent">fiche Google</span>
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-body-sm text-warm-500 sm:mt-4 sm:text-body-lg">
                Des astuces concrètes pour améliorer votre visibilité locale et attirer plus de clients.
              </p>
            </Reveal>

            <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  tag: 'Optimisation',
                  title: '10 astuces pour optimiser votre fiche Google Business',
                  excerpt: 'Découvrez les bonnes pratiques pour remonter dans les résultats locaux et capter plus de clients près de chez vous.',
                  readTime: '5 min',
                  image: '/blog/blog-optimiser-fiche-google.png',
                },
                {
                  tag: 'Avis clients',
                  title: 'Comment obtenir (et gérer) plus d\'avis Google',
                  excerpt: 'Les avis sont le nerf de la guerre. Voici comment en obtenir davantage et y répondre intelligemment.',
                  readTime: '4 min',
                  image: '/blog/blog-avis-google-strategie.png',
                },
                {
                  tag: 'SEO local',
                  title: 'Google Maps : les erreurs qui plombent votre classement',
                  excerpt: 'Catégories mal choisies, horaires incomplets, photos absentes… Corrigez ces erreurs pour gagner des places.',
                  readTime: '6 min',
                  image: '/blog/blog-erreurs-fiche-google.png',
                },
              ].map((article, i) => (
                <Reveal key={article.title} delay={i * 0.12} variant="rotate-in">
                  <Link href="/blog" className="group flex h-full flex-col overflow-hidden rounded-2xl border border-warm-200 bg-white shadow-soft transition-all hover:-translate-y-1 hover:shadow-card sm:rounded-3xl">
                    <div className="relative h-36 overflow-hidden bg-gradient-to-br from-warm-100 via-warm-200/60 to-accent-light/30 flex items-center justify-center sm:h-48">
                      <svg className="h-10 w-10 text-warm-300 transition-transform duration-500 group-hover:scale-110 sm:h-12 sm:w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                      </svg>
                    </div>
                    <div className="flex flex-1 flex-col p-5 sm:p-7">
                      <span className="mb-3 inline-block w-fit rounded-full bg-accent-light px-2.5 py-0.5 text-[11px] font-semibold text-accent-dark sm:mb-4 sm:px-3 sm:py-1 sm:text-xs">
                        {article.tag}
                      </span>
                      <h3 className="text-lg font-medium text-warm-900 group-hover:text-accent-dark transition-colors sm:text-xl">
                        {article.title}
                      </h3>
                      <p className="mt-2 flex-1 text-xs leading-relaxed text-warm-600 sm:mt-3 sm:text-sm">
                        {article.excerpt}
                      </p>
                      <div className="mt-4 flex items-center justify-between border-t border-warm-100 pt-4 sm:mt-6 sm:pt-5">
                        <span className="text-[11px] text-warm-500 sm:text-xs">{article.readTime} de lecture</span>
                        <span className="text-xs font-semibold text-accent-dark group-hover:underline sm:text-sm">
                          Lire l&apos;article →
                        </span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════ TESTIMONIALS ═══════════════════════ */}
        <section id="temoignages" className="pb-14 pt-6 overflow-hidden sm:pb-24 sm:pt-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <Reveal className="mb-10 text-center sm:mb-16" variant="scale-up">
              <p className="section-label mb-3 justify-center sm:mb-4">Avis clients</p>
              <h2 className="text-balance text-heading-mobile font-light text-warm-900 sm:text-heading-xl md:text-display">
                +150 entreprises accompagnées
              </h2>
              <div className="mx-auto mt-3 inline-flex items-center justify-center gap-2 rounded-full border border-warm-200 bg-white px-3.5 py-2 shadow-soft sm:mt-4 sm:gap-3 sm:px-5 sm:py-2.5">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 272 92" className="h-4 w-auto shrink-0 sm:h-5">
                  <path fill="#EA4335" d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"/>
                  <path fill="#FBBC05" d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C119.25 34.32 129.24 25 141.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"/>
                  <path fill="#4285F4" d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z"/>
                  <path fill="#34A853" d="M225 3v65h-9.5V3h9.5z"/>
                  <path fill="#EA4335" d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z"/>
                  <path fill="#4285F4" d="M35.29 41.19V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49-.21z"/>
                </svg>
                <div className="flex items-center gap-0.5 sm:gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <RiStarFill key={i} className="h-4 w-4 text-accent sm:h-5 sm:w-5" />
                  ))}
                </div>
                <span className="text-xs font-semibold text-warm-700 sm:text-sm">4.9/5 · 67 avis Google</span>
              </div>
            </Reveal>
          </div>

          {/* Row 1 — scrolls left */}
          <div className="testimonials-row relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-warm-50 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-warm-50 to-transparent" />
            <div className="testimonials-track testimonials-track-left">
              {[...TESTIMONIALS_ROW1, ...TESTIMONIALS_ROW1].map((t, i) => (
                <div
                  key={`r1-${i}`}
                  className="group flex w-[280px] shrink-0 flex-col rounded-2xl border border-warm-200 bg-white p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card sm:w-[380px] sm:rounded-3xl sm:p-7"
                >
                  <div className="mb-3 flex gap-0.5 sm:mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <RiStarFill key={j} className="h-3.5 w-3.5 text-accent sm:h-4 sm:w-4" />
                    ))}
                  </div>
                  <p className="flex-1 text-xs leading-relaxed text-warm-700 sm:text-[15px]">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="mt-4 flex items-center gap-2.5 border-t border-warm-100 pt-4 sm:mt-6 sm:gap-3 sm:pt-5">
                    <img
                      src={t.avatar}
                      alt={t.placeName}
                      className="h-10 w-10 shrink-0 rounded-full border border-warm-200 object-cover sm:h-14 sm:w-14"
                    />
                    <div>
                      <p className="text-xs font-semibold text-warm-900 sm:text-sm">{t.placeName}</p>
                      <p className="text-[11px] text-warm-500 sm:text-xs">{t.role} · {t.city}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 — scrolls right */}
          <div className="testimonials-row relative mt-5">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-warm-50 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-warm-50 to-transparent" />
            <div className="testimonials-track testimonials-track-right">
              {[...TESTIMONIALS_ROW2, ...TESTIMONIALS_ROW2].map((t, i) => (
                <div
                  key={`r2-${i}`}
                  className="group flex w-[280px] shrink-0 flex-col rounded-2xl border border-warm-200 bg-white p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card sm:w-[380px] sm:rounded-3xl sm:p-7"
                >
                  <div className="mb-3 flex gap-0.5 sm:mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <RiStarFill key={j} className="h-3.5 w-3.5 text-accent sm:h-4 sm:w-4" />
                    ))}
                  </div>
                  <p className="flex-1 text-xs leading-relaxed text-warm-700 sm:text-[15px]">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="mt-4 flex items-center gap-2.5 border-t border-warm-100 pt-4 sm:mt-6 sm:gap-3 sm:pt-5">
                    <img
                      src={t.avatar}
                      alt={t.placeName}
                      className="h-10 w-10 shrink-0 rounded-full border border-warm-200 object-cover sm:h-14 sm:w-14"
                    />
                    <div>
                      <p className="text-xs font-semibold text-warm-900 sm:text-sm">{t.placeName}</p>
                      <p className="text-[11px] text-warm-500 sm:text-xs">{t.role} · {t.city}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* ═══════════════════════ FAQ ═══════════════════════ */}
        <section id="faq" className="px-4 pb-14 pt-6 sm:px-6 sm:pb-24 sm:pt-8">
          <div className="mx-auto max-w-3xl">
            <Reveal className="mb-10 text-center sm:mb-16" variant="blur-in">
              <p className="section-label mb-3 justify-center sm:mb-4">FAQ</p>
              <h2 className="text-balance text-heading-mobile font-light text-warm-900 sm:text-heading-xl md:text-display">
                Encore des questions ?
              </h2>
            </Reveal>

            <Reveal delay={0.1} variant="scale-up">
              <div className="rounded-2xl border border-warm-200 bg-white p-4 shadow-soft sm:rounded-3xl sm:p-8">
                {FAQ_ITEMS.map((item, i) => (
                  <FAQItem key={i} question={item.q} answer={item.a} />
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════════════════════ AUDIT CTA ═══════════════════════ */}
        <section id="audit" className="relative px-4 pb-10 pt-6 sm:px-6 sm:pb-16 sm:pt-8">
          <Reveal variant="scale-up">
            <div className="mx-auto max-w-6xl rounded-2xl border border-warm-200 bg-white shadow-soft sm:rounded-4xl">
            <div className="grid gap-6 p-5 sm:gap-8 sm:p-8 lg:grid-cols-[1.2fr_1fr] lg:p-12">
              <div>
                <p className="section-label mb-3 sm:mb-4">Avant de parler stratégie</p>
                <h2 className="text-balance text-heading-mobile font-light text-warm-900 sm:text-heading-xl md:text-display">
                  Vérifiez votre potentiel local en 30 secondes.
                </h2>
                <p className="mt-3 text-body-sm text-warm-600 sm:mt-4 sm:text-body">
                  Si vous préférez démarrer en autonomie, l&apos;audit est ici. Il vous donne un
                  diagnostic concret que nous pouvons ensuite transformer en plan d&apos;action.
                </p>
                <ul className="mt-4 space-y-2 text-xs text-warm-600 sm:mt-6 sm:text-sm">
                  <li className="flex items-center gap-2">
                    <RiCheckboxCircleFill className="h-3.5 w-3.5 text-positive sm:h-4 sm:w-4" /> Score d&apos;optimisation sur 100
                  </li>
                  <li className="flex items-center gap-2">
                    <RiCheckboxCircleFill className="h-3.5 w-3.5 text-positive sm:h-4 sm:w-4" /> Heatmap de vos positions locales
                  </li>
                  <li className="flex items-center gap-2">
                    <RiCheckboxCircleFill className="h-3.5 w-3.5 text-positive sm:h-4 sm:w-4" /> Analyse de vos 3 concurrents
                  </li>
                  <li className="flex items-center gap-2">
                    <RiCheckboxCircleFill className="h-3.5 w-3.5 text-positive sm:h-4 sm:w-4" /> Recommandations IA personnalisées
                  </li>
                </ul>
                <p className="mt-4 flex items-center gap-2 text-xs text-warm-500 sm:mt-6 sm:text-sm">
                  <RiTimeLine className="h-3.5 w-3.5 text-warm-400 sm:h-4 sm:w-4" />
                  Gratuit, sans carte bancaire, résultat immédiat.
                </p>
              </div>

              <div className="relative flex flex-col justify-center overflow-hidden rounded-2xl border border-warm-200 bg-warm-50 p-4 sm:rounded-3xl sm:p-6">
                {/* Google Maps background */}
                <div className="pointer-events-none absolute inset-0">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d21003.6!2d2.3522!3d48.8566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sfr!2sfr"
                    className="absolute inset-0 h-full w-full scale-110 border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    tabIndex={-1}
                    aria-hidden="true"
                  />
                  <div className="absolute inset-0 bg-warm-50/60 backdrop-blur-[1px]" />
                </div>

                <div className="relative">
                  <p className="mb-3 text-base font-semibold text-warm-900 sm:mb-4 sm:text-lg">Cherchez votre établissement</p>
                  <PlaceSearchInput onSelect={handlePlaceSelect} />
                  <p className="mt-2.5 text-[11px] text-warm-400 sm:mt-3 sm:text-xs">
                    Tapez le nom de votre commerce, restaurant, cabinet...
                  </p>
                </div>
              </div>
            </div>
            </div>
          </Reveal>
        </section>

        {/* ═══════════════════════ FINAL CTA ═══════════════════════ */}
        <section className="rounded-t-[1.5rem] bg-warm-900 px-4 py-14 text-white sm:rounded-t-[2.5rem] sm:px-6 sm:py-24">
          <Reveal variant="blur-in">
            <div className="mx-auto grid max-w-6xl items-center gap-8 sm:gap-12 lg:grid-cols-2">
              <div>
                <h2 className="text-balance text-heading-mobile font-light text-white sm:text-heading-xl md:text-display lg:text-display-lg">
                  Prêt à dominer{' '}
                  <span className="serif-accent text-accent">Google Maps</span> ?
                </h2>
                <p className="mt-4 max-w-xl text-body-sm text-white/60 sm:mt-6 sm:text-body-lg">
                  Rejoignez +150 entreprises locales qui nous font confiance pour dominer Google Maps.
                </p>
              </div>

              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-5 backdrop-blur-sm sm:rounded-3xl sm:p-8">
                <p className="mb-1.5 text-base font-semibold text-white sm:mb-2 sm:text-lg">
                  Recevez nos conseils SEO local
                </p>
                <p className="mb-4 text-xs text-white/50 sm:mb-6 sm:text-sm">
                  1 email par semaine. Astuces concrètes pour booster votre fiche Google. Désabonnement en 1 clic.
                </p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    const emailInput = form.elements.namedItem('newsletter_email') as HTMLInputElement;
                    if (emailInput?.value) {
                      emailInput.value = '';
                    }
                  }}
                  className="flex flex-col gap-3 sm:flex-row"
                >
                  <input
                    type="email"
                    name="newsletter_email"
                    required
                    placeholder="votre@email.com"
                    className="flex-1 rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-accent/40 focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all"
                  />
                  <button
                    type="submit"
                    className="btn-accent btn-no-arrow shrink-0 !text-sm"
                  >
                    S&apos;inscrire
                  </button>
                </form>
                <p className="mt-3 flex items-center gap-2 text-[11px] text-white/30 sm:mt-4 sm:text-xs">
                  <RiShieldCheckFill className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  Pas de spam. On respecte votre boîte mail.
                </p>
              </div>
            </div>
          </Reveal>
        </section>
      </main>
  );
}
