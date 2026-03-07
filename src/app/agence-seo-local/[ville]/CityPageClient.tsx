'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import {
  RiArrowRightLine,
  RiCheckboxCircleFill,
  RiMapPin2Fill,
  RiSearchLine,
  RiStarFill,
  RiTimeLine,
  RiPhoneFill,
  RiArrowDownSLine,
  RiSparklingFill,
  RiLineChartFill,
  RiFileEditFill,
  RiCalendarScheduleFill,
} from 'react-icons/ri';
import PlaceSearchInput from '@/components/audit/PlaceSearchInput';
import { PlaceResult } from '@/lib/types';
import { City } from '@/lib/cities';

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
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
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

interface CityPageClientProps {
  city: City;
  otherCities: City[];
}

export default function CityPageClient({ city, otherCities }: CityPageClientProps) {
  const router = useRouter();

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

  const faqItems = [
    {
      q: `Pourquoi faire appel à une agence SEO local à ${city.name} ?`,
      a: `${city.name} compte ${city.localBusinesses} entreprises locales. La concurrence sur Google Maps y est intense. Une agence spécialisée en SEO local connaît les spécificités du marché de ${city.name} et ses quartiers (${city.keyNeighborhoods.slice(0, 3).join(', ')}...) pour vous positionner efficacement devant vos concurrents.`,
    },
    {
      q: `Combien de temps pour apparaître en top 3 Google Maps à ${city.name} ?`,
      a: `Les premiers résultats apparaissent généralement entre 2 et 4 semaines après l'optimisation de votre fiche Google Business. Pour des positions solides dans le top 3 sur vos mots-clés principaux à ${city.name}, comptez 60 à 90 jours selon le niveau de concurrence dans votre secteur.`,
    },
    {
      q: `Quel est le coût d'un accompagnement SEO local à ${city.name} ?`,
      a: `Nos tarifs dépendent de votre secteur d'activité, du nombre de mots-clés cibles et du niveau de concurrence dans votre zone à ${city.name}. Nous commençons toujours par un audit gratuit pour évaluer votre potentiel et vous proposer un devis personnalisé, sans engagement.`,
    },
    {
      q: `L'audit de visibilité Google Maps est-il vraiment gratuit ?`,
      a: `Oui, 100% gratuit et sans engagement. L'audit analyse votre fiche Google Business, vos positions sur Google Maps à ${city.name}, vos concurrents locaux et vous fournit des recommandations concrètes. Aucune carte bancaire requise.`,
    },
    {
      q: `Quels types d'entreprises accompagnez-vous à ${city.name} ?`,
      a: `Nous accompagnons tous les commerces et professions de proximité à ${city.name} : restaurants, dentistes, avocats, plombiers, coiffeurs, garages automobiles, opticiens, boutiques... Toute entreprise qui dépend d'une clientèle locale bénéficie du SEO local.`,
    },
    {
      q: `Comment mesurez-vous les résultats de votre travail ?`,
      a: `Chaque semaine, vous recevez un reporting détaillé avec vos positions mot-clé par mot-clé sur Google Maps à ${city.name}, le nombre d'appels et de demandes d'itinéraire, l'évolution de vos avis Google et le ROI estimé. Tout est transparent.`,
    },
  ];

  return (
    <main>
      {/* ═══════ HERO ═══════ */}
      <section className="relative overflow-hidden px-4 pb-12 pt-10 sm:px-6 sm:pb-20 sm:pt-16 md:pb-28 md:pt-24">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="hero-grain-gradient" />
          <div className="hero-dot-grid absolute inset-0" />
          <div className="hero-glow" />
        </div>

        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <Reveal>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-warm-200 bg-white px-3.5 py-2 text-xs font-semibold shadow-soft sm:mb-6 sm:px-5 sm:py-2.5 sm:text-sm">
                <RiMapPin2Fill className="h-3.5 w-3.5 text-accent-dark sm:h-4 sm:w-4" />
                Agence SEO local à {city.name}
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="text-balance text-heading-xl text-warm-900 sm:text-display-lg md:text-display-xl">
                Agence SEO local à{' '}
                <span className="serif-accent serif-accent-animated">{city.name}.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mx-auto mt-4 max-w-2xl text-body-sm text-warm-600 sm:mt-6 sm:text-body-lg">
                Dominez Google Maps à {city.name}. Plus de visibilité, plus d&apos;appels, plus de clients.
                Nous aidons les entreprises de {city.name} et {city.region} à atteindre le top 3 de Google Maps.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4">
                <a href="/rendez-vous" className="btn-primary w-full sm:w-auto">
                  Parler à un expert
                </a>
                <a href="#audit" className="btn-secondary w-full sm:w-auto">
                  Audit gratuit {city.name}
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

      {/* ═══════ CITY STATS ═══════ */}
      <section className="border-y border-warm-200 bg-white px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: 'Population', value: city.population, sub: city.department },
                { label: 'Entreprises locales', value: city.localBusinesses, sub: 'enregistrées' },
                { label: 'Quartiers clés', value: String(city.keyNeighborhoods.length) + '+', sub: 'zones couvertes' },
                { label: 'Région', value: city.region, sub: 'zone d\'intervention' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-warm-400 sm:text-xs">{stat.label}</p>
                  <p className="mt-2 text-2xl font-bold text-warm-900 sm:text-3xl">{stat.value}</p>
                  <p className="mt-1 text-xs text-warm-500 sm:text-sm">{stat.sub}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════ PROBLÈME / SOLUTION ═══════ */}
      <section className="px-4 py-14 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-10 text-center sm:mb-16">
            <p className="section-label mb-3 justify-center sm:mb-4">Le constat</p>
            <h2 className="text-balance text-heading-xl text-warm-900 sm:text-display">
              Pourquoi votre entreprise à {city.name} est{' '}
              <span className="serif-accent">invisible</span> sur Google Maps
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-body-sm text-warm-500 sm:mt-4 sm:text-body-lg">
              {city.localBusinesses} entreprises à {city.name} se battent pour les mêmes clients.
              Si vous n&apos;êtes pas dans le top 3 de Google Maps, vos concurrents récupèrent vos clients.
            </p>
          </Reveal>

          <div className="grid gap-5 sm:gap-6 lg:grid-cols-3">
            {[
              {
                icon: RiSearchLine,
                title: 'Fiche Google non optimisée',
                description: `La plupart des fiches Google Business à ${city.name} sont incomplètes : catégories mal choisies, descriptions absentes, photos manquantes. Google les relègue en bas de page.`,
              },
              {
                icon: RiStarFill,
                title: 'Pas assez d\'avis Google',
                description: `À ${city.name}, les entreprises en tête de Google Maps ont en moyenne 3x plus d'avis que leurs concurrents. Sans stratégie d'avis, vous êtes invisible.`,
              },
              {
                icon: RiMapPin2Fill,
                title: 'Zone de chalandise mal couverte',
                description: `Votre fiche peut apparaître en position 1 dans un quartier de ${city.name} et être absente à 500 mètres. Sans analyse par zone, vous perdez des clients.`,
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 0.1}>
                <div className="group flex h-full flex-col rounded-2xl border border-warm-200 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card sm:rounded-3xl sm:p-8">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 sm:h-12 sm:w-12">
                    <item.icon className="h-5 w-5 text-red-500 sm:h-6 sm:w-6" />
                  </div>
                  <h3 className="text-lg font-medium text-warm-900 sm:text-xl">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-warm-600 sm:text-base">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ SERVICES ═══════ */}
      <section className="bg-warm-100 px-4 py-14 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-10 text-center sm:mb-16">
            <p className="section-label mb-3 justify-center sm:mb-4">Nos services à {city.name}</p>
            <h2 className="text-balance text-heading-xl text-warm-900 sm:text-display">
              Ce qu&apos;on fait pour vous à{' '}
              <span className="serif-accent">{city.name}.</span>
            </h2>
          </Reveal>

          <div className="grid gap-5 sm:gap-6 lg:grid-cols-3">
            {[
              {
                icon: RiFileEditFill,
                title: 'Optimisation Fiche Google',
                price: '790€ HT',
                tag: 'One-shot',
                features: [
                  'Audit complet de votre fiche existante',
                  `Optimisation pour les recherches locales à ${city.name}`,
                  'Catégories, attributs, description optimisés',
                  'Upload et structuration des photos',
                  'Cohérence NAP sur les annuaires locaux',
                ],
                href: '/services/optimisation-fiche-google',
              },
              {
                icon: RiLineChartFill,
                title: 'SEO Local Complet',
                price: 'Sur devis',
                tag: 'Accompagnement',
                features: [
                  `Stratégie SEO local personnalisée pour ${city.name}`,
                  `Couverture de tous les quartiers : ${city.keyNeighborhoods.slice(0, 3).join(', ')}...`,
                  'Suivi des positions par zone géographique',
                  'Reporting hebdomadaire détaillé',
                  'Optimisation continue de votre fiche',
                ],
                href: '/rendez-vous',
                highlighted: true,
              },
              {
                icon: RiStarFill,
                title: 'Boost Avis Expérience',
                price: 'Sur devis',
                tag: 'Sélectif',
                features: [
                  `Des étudiants de ${city.name} visitent votre établissement`,
                  'Ils vivent une expérience réelle',
                  'Ils laissent un avis Google authentique',
                  '100% conforme aux CGU Google',
                  'Augmentation rapide de votre note moyenne',
                ],
                href: '/services/boost-avis-experience',
              },
            ].map((service, i) => (
              <Reveal key={service.title} delay={i * 0.12}>
                <div className={`group relative flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-2 sm:rounded-3xl ${service.highlighted ? 'border-2 border-accent/30 bg-white shadow-[0_8px_60px_rgba(240,199,94,0.12)]' : 'border border-warm-200 bg-white shadow-soft hover:shadow-card'}`}>
                  {service.highlighted && (
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-accent/[0.04] to-transparent sm:rounded-3xl" />
                  )}
                  <div className="relative p-6 pb-4 sm:p-8 sm:pb-6">
                    <span className="mb-2 block text-[9px] font-bold uppercase tracking-[0.2em] text-warm-400 sm:text-[10px]">
                      {service.tag}
                    </span>
                    <h3 className="text-xl font-medium tracking-tight text-warm-900 sm:text-2xl">{service.title}</h3>
                    <p className="mt-3 text-2xl font-bold text-warm-900 sm:mt-4 sm:text-3xl">{service.price}</p>
                  </div>
                  <div className="relative flex flex-1 flex-col px-6 pb-6 sm:px-8 sm:pb-8">
                    <div className="mb-5 h-px bg-warm-200/60" />
                    <ul className="flex-1 space-y-3">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5 text-xs text-warm-600 sm:text-[13px]">
                          <RiCheckboxCircleFill className="mt-0.5 h-4 w-4 shrink-0 text-warm-900" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={service.href}
                      className={`mt-6 w-full justify-center ${service.highlighted ? 'btn-accent' : 'btn-primary'}`}
                    >
                      {service.highlighted ? 'Prendre rendez-vous' : 'En savoir plus'}
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ PROCESS ═══════ */}
      <section className="bg-warm-900 px-4 py-14 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <Reveal className="mb-10 text-center sm:mb-16">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-accent sm:mb-5 sm:text-xs">
              Notre méthode à {city.name}
            </p>
            <h2 className="mt-3 text-balance text-heading-xl text-white sm:mt-4 sm:text-display">
              Comment on vous propulse en tête de{' '}
              <span className="serif-accent">Google Maps.</span>
            </h2>
          </Reveal>

          <div className="grid gap-8 sm:gap-10 md:grid-cols-3">
            {[
              {
                step: '1',
                icon: RiCalendarScheduleFill,
                title: 'Audit & Diagnostic',
                description: `On analyse votre fiche Google, vos positions zone par zone à ${city.name}, vos concurrents locaux et vos avis. Vous recevez un rapport complet gratuitement.`,
              },
              {
                step: '2',
                icon: RiSparklingFill,
                title: 'Stratégie & Optimisation',
                description: `On optimise votre fiche Google Business pour les recherches locales à ${city.name}. Catégories, description, photos, publications — tout est calibré pour le top 3.`,
              },
              {
                step: '3',
                icon: RiLineChartFill,
                title: 'Suivi & Croissance',
                description: `On suit vos positions dans chaque quartier de ${city.name}, on ajuste la stratégie et on vous envoie un reporting hebdomadaire avec des résultats concrets.`,
              },
            ].map((item, i) => (
              <Reveal key={item.step} delay={i * 0.12}>
                <div className="text-center md:text-left">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 md:mx-0">
                    <item.icon className="h-6 w-6 text-accent" />
                  </div>
                  <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-accent sm:text-xs">
                    Étape {item.step}
                  </p>
                  <h3 className="text-base font-medium text-white sm:text-lg">{item.title}</h3>
                  <p className="mx-auto mt-2 max-w-[300px] text-xs leading-relaxed text-white/50 sm:text-sm md:mx-0">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3} className="mt-10 flex justify-center sm:mt-14">
            <a href="/rendez-vous" className="btn-accent">
              Prendre rendez-vous
            </a>
          </Reveal>
        </div>
      </section>

      {/* ═══════ QUARTIERS ═══════ */}
      <section className="px-4 py-14 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-10 text-center sm:mb-16">
            <p className="section-label mb-3 justify-center sm:mb-4">Zone d&apos;intervention</p>
            <h2 className="text-balance text-heading-xl text-warm-900 sm:text-display">
              On couvre tout {city.name} et ses{' '}
              <span className="serif-accent">quartiers.</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-body-sm text-warm-500 sm:mt-4 sm:text-body-lg">
              Notre approche zone par zone garantit que votre entreprise apparaît en tête de Google Maps dans chaque quartier de {city.name}.
            </p>
          </Reveal>

          <Reveal>
            <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
              {city.keyNeighborhoods.map((neighborhood) => (
                <div
                  key={neighborhood}
                  className="group flex items-center gap-3 rounded-xl border border-warm-200 bg-white px-5 py-4 shadow-soft transition-all hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-card sm:rounded-2xl sm:px-6 sm:py-5"
                >
                  <RiMapPin2Fill className="h-4 w-4 shrink-0 text-accent-dark sm:h-5 sm:w-5" />
                  <span className="text-sm font-medium text-warm-800 sm:text-base">{neighborhood}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.2} className="mt-8 sm:mt-10">
            <div className="rounded-2xl border border-warm-200 bg-warm-50 p-6 sm:rounded-3xl sm:p-8">
              <h3 className="text-lg font-medium text-warm-900 sm:text-xl">
                Exemples de recherches locales à {city.name}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2 sm:gap-3">
                {city.typicalSearches.map((search) => (
                  <span
                    key={search}
                    className="inline-flex items-center gap-1.5 rounded-full border border-warm-200 bg-white px-3 py-1.5 text-xs font-medium text-warm-700 sm:px-4 sm:py-2 sm:text-sm"
                  >
                    <RiSearchLine className="h-3 w-3 text-warm-400 sm:h-3.5 sm:w-3.5" />
                    {search}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════ FAQ ═══════ */}
      <section className="bg-warm-100 px-4 py-14 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <Reveal className="mb-10 text-center sm:mb-16">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-accent-dark sm:text-xs">FAQ</p>
            <h2 className="mt-3 text-heading-xl text-warm-900 sm:mt-4 sm:text-display">
              Questions fréquentes sur le SEO local à {city.name}
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-warm-200 bg-white p-4 shadow-soft sm:rounded-3xl sm:p-8">
              {faqItems.map((item, i) => (
                <FAQItem key={i} question={item.q} answer={item.a} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════ AUDIT CTA ═══════ */}
      <section id="audit" className="relative px-4 pb-14 pt-6 sm:px-6 sm:pb-24 sm:pt-10" style={{ background: 'linear-gradient(to bottom, #f5f0e8 50%, transparent 50%)' }}>
        <Reveal>
          <div className="mx-auto grid max-w-6xl gap-6 rounded-2xl border border-warm-200 bg-white p-5 shadow-elevated sm:gap-8 sm:rounded-[2rem] sm:p-8 lg:grid-cols-[1.2fr_1fr] lg:p-12">
            <div>
              <p className="section-label mb-3 sm:mb-4">Votre audit gratuit à {city.name}</p>
              <h2 className="text-heading-xl text-warm-900 sm:text-display">
                Vérifiez votre visibilité Google Maps à {city.name} en 30 secondes.
              </h2>
              <p className="mt-3 text-body-sm text-warm-600 sm:mt-4 sm:text-body">
                Découvrez votre score d&apos;optimisation, votre couverture zone par zone à {city.name} et les actions prioritaires pour dominer Google Maps.
              </p>
              <ul className="mt-4 space-y-2 text-xs text-warm-600 sm:mt-6 sm:text-sm">
                <li className="flex items-center gap-2">
                  <RiCheckboxCircleFill className="h-3.5 w-3.5 text-positive sm:h-4 sm:w-4" /> Score d&apos;optimisation sur 100
                </li>
                <li className="flex items-center gap-2">
                  <RiCheckboxCircleFill className="h-3.5 w-3.5 text-positive sm:h-4 sm:w-4" /> Heatmap de vos positions à {city.name}
                </li>
                <li className="flex items-center gap-2">
                  <RiCheckboxCircleFill className="h-3.5 w-3.5 text-positive sm:h-4 sm:w-4" /> Analyse de vos 3 concurrents locaux
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
              <div className="pointer-events-none absolute inset-0">
                <iframe
                  src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d21003.6!2d${city.mapCenter.lng}!3d${city.mapCenter.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sfr!2sfr`}
                  className="absolute inset-0 h-full w-full scale-110 border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  tabIndex={-1}
                  aria-hidden="true"
                />
                <div className="absolute inset-0 bg-warm-50/60 backdrop-blur-[1px]" />
              </div>

              <div className="relative">
                <p className="mb-3 text-base font-semibold text-warm-900 sm:mb-4 sm:text-lg">
                  Cherchez votre établissement à {city.name}
                </p>
                <PlaceSearchInput onSelect={handlePlaceSelect} />
                <p className="mt-2.5 text-[11px] text-warm-400 sm:mt-3 sm:text-xs">
                  Tapez le nom de votre commerce, restaurant, cabinet...
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ═══════ CTA FINAL ═══════ */}
      <section className="bg-warm-900 px-4 py-14 sm:px-6 sm:py-24">
        <Reveal>
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-balance text-heading-xl text-white sm:text-display">
              Prêt à dominer Google Maps à{' '}
              <span className="serif-accent">{city.name}</span> ?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-body-sm text-white/60 sm:mt-6 sm:text-body-lg">
              Rejoignez les entreprises de {city.name} qui nous font confiance pour atteindre le top 3 de Google Maps.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4">
              <a href="/rendez-vous" className="btn-accent w-full sm:w-auto">
                Prendre rendez-vous
              </a>
              <a href={`tel:+33760554000`} className="btn-secondary w-full !border-white/20 !text-white hover:!bg-white/10 sm:w-auto">
                <RiPhoneFill className="mr-2 h-4 w-4" />
                +33 7 60 55 40 00
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ═══════ AUTRES VILLES ═══════ */}
      <section className="px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-8 text-center sm:mb-10">
            <p className="section-label mb-3 justify-center sm:mb-4">Nos autres villes</p>
            <h2 className="text-heading-xl text-warm-900 sm:text-display">
              On intervient partout en France
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
              {otherCities.map((otherCity) => (
                <Link
                  key={otherCity.slug}
                  href={`/agence-seo-local/${otherCity.slug}`}
                  className="group flex items-center justify-between rounded-xl border border-warm-200 bg-white px-5 py-4 shadow-soft transition-all hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-card"
                >
                  <div className="flex items-center gap-2.5">
                    <RiMapPin2Fill className="h-4 w-4 text-warm-400 transition-colors group-hover:text-accent-dark" />
                    <span className="text-sm font-medium text-warm-800">SEO local {otherCity.name}</span>
                  </div>
                  <RiArrowRightLine className="h-4 w-4 text-warm-300 transition-all group-hover:translate-x-0.5 group-hover:text-accent-dark" />
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
