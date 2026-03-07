'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  CaretDown,
  MagnifyingGlass,
  MapPin,
  ChartLineUp,
  CurrencyDollar,
  Wrench,
  Star,
  Buildings,
} from '@phosphor-icons/react';

type FAQCategory = {
  id: string;
  label: string;
  icon: React.ElementType;
  items: { q: string; a: string }[];
};

const FAQ_CATEGORIES: FAQCategory[] = [
  {
    id: 'siva',
    label: 'Siva & nos services',
    icon: MapPin,
    items: [
      {
        q: 'Qu\'est-ce que Siva fait concrètement ?',
        a: 'Siva est une agence spécialisée en visibilité locale sur Google Maps. On propose 4 services : un audit gratuit de votre fiche Google, l\'optimisation complète de votre fiche Google Business (one-shot), le Boost Avis Expérience (de vrais clients qui visitent votre établissement et laissent un avis authentique), et la gestion de vos campagnes Google Ads locales.',
      },
      {
        q: 'Pourquoi Google Maps est si important pour mon business ?',
        a: '46% des recherches Google ont une intention locale. Quand quelqu\'un cherche "restaurant italien", "dentiste" ou "plombier" près de chez lui, Google affiche 3 résultats sur une carte — le "Local Pack". Si vous n\'y êtes pas, vos concurrents captent ces clients à votre place. C\'est le canal le plus rentable pour un commerce de proximité.',
      },
      {
        q: 'Comment se passe la collaboration avec Siva ?',
        a: 'Tout commence par un audit gratuit pour évaluer votre situation actuelle. Ensuite, on vous recommande les services adaptés : optimisation de fiche, Boost Avis, Google Ads… On gère 95% du travail. Vous n\'avez qu\'à valider certains contenus et nous fournir des photos de temps en temps.',
      },
      {
        q: 'Travaillez-vous avec des entreprises multi-établissements ?',
        a: 'Oui. On accompagne des réseaux avec plusieurs points de vente. Chaque établissement bénéficie d\'une stratégie locale dédiée, et vous profitez de tarifs dégressifs à partir de 2 établissements (jusqu\'à -30% pour 5+).',
      },
    ],
  },
  {
    id: 'audit',
    label: 'Audit gratuit',
    icon: Star,
    items: [
      {
        q: 'L\'audit gratuit est-il vraiment gratuit ?',
        a: 'Oui, 100% gratuit et sans engagement. Aucune carte bancaire requise. Vous obtenez un rapport complet avec votre score d\'optimisation, une heatmap de vos positions, l\'analyse de vos concurrents et des recommandations IA personnalisées.',
      },
      {
        q: 'Que contient exactement l\'audit ?',
        a: 'L\'audit comprend 4 éléments : un score d\'optimisation de votre fiche Google Business sur 100, une heatmap qui montre vos positions dans chaque quartier de votre zone, une analyse de vos 3 principaux concurrents, et des recommandations d\'actions prioritaires générées par IA.',
      },
      {
        q: 'Combien de temps dure l\'audit ?',
        a: 'L\'audit est généré en quelques minutes grâce à nos outils d\'analyse automatisés. Vous recevez les résultats immédiatement. Si vous le souhaitez, on vous contacte sous 24h pour un débrief personnalisé gratuit.',
      },
      {
        q: 'L\'audit m\'engage-t-il à acheter un service ?',
        a: 'Non. L\'audit est un outil d\'aide à la décision. Il vous montre votre potentiel et vos axes d\'amélioration. Libre à vous ensuite de les appliquer seul ou de nous confier le travail.',
      },
    ],
  },
  {
    id: 'optimisation',
    label: 'Optimisation fiche Google',
    icon: Wrench,
    items: [
      {
        q: 'En quoi consiste l\'optimisation de ma fiche Google ?',
        a: 'C\'est une prestation one-shot complète : on audite votre fiche existante, on optimise vos catégories, attributs et description SEO, on structure et uploade vos photos, on crée vos Q&A, produits/services, on vérifie vos horaires et on assure la cohérence de vos informations (nom, adresse, téléphone) sur les principaux annuaires.',
      },
      {
        q: 'Pourquoi 500€ pour optimiser une fiche Google ?',
        a: 'Une fiche Google bien optimisée, c\'est des dizaines de paramètres à régler correctement : catégories primaires et secondaires, description enrichie en mots-clés locaux, photos structurées, Q&A stratégiques, cohérence NAP sur les annuaires… Ce travail expert transforme une fiche basique en véritable machine à contacts.',
      },
      {
        q: 'Est-ce un paiement unique ou un abonnement ?',
        a: 'C\'est un paiement unique. On optimise votre fiche une fois, et elle reste optimisée. Il n\'y a pas de frais récurrents pour ce service. Si vous souhaitez un suivi continu, on peut en discuter séparément.',
      },
      {
        q: 'Combien de temps pour voir les effets de l\'optimisation ?',
        a: 'Les changements sont appliqués en quelques jours. Les premiers effets (meilleure visibilité, plus d\'impressions) apparaissent en 2 à 4 semaines. Les résultats significatifs en termes de positions Google Maps arrivent entre 60 et 90 jours.',
      },
    ],
  },
  {
    id: 'boost-avis',
    label: 'Boost Avis Expérience',
    icon: Star,
    items: [
      {
        q: 'Comment fonctionne le Boost Avis Expérience ?',
        a: 'Des étudiants rigoureusement sélectionnés se rendent dans votre établissement, vivent une expérience réelle (repas, soin, consultation, achat…), puis laissent un avis Google détaillé et sincère basé sur leur vécu. Chaque avis est authentique et reflète une vraie visite.',
      },
      {
        q: 'Est-ce que ce sont de faux avis ?',
        a: 'Non. C\'est l\'inverse des faux avis. Nos étudiants visitent physiquement votre établissement, consomment un produit ou un service, et partagent leur retour d\'expérience honnête. Le processus est 100% conforme aux Conditions Générales d\'Utilisation de Google.',
      },
      {
        q: 'Pourquoi faut-il candidater pour ce service ?',
        a: 'On sélectionne les établissements partenaires pour garantir la qualité des expériences vécues par nos étudiants. On privilégie les commerces qui offrent un bon service et qui sont prêts à accueillir nos visiteurs dans de bonnes conditions.',
      },
      {
        q: 'Combien d\'avis puis-je obtenir par mois ?',
        a: 'Le volume dépend de votre formule et de votre localisation. On calibre le rythme pour que la progression soit naturelle aux yeux de Google. Un afflux trop rapide d\'avis serait contre-productif. On vous propose un plan adapté lors de l\'échange initial.',
      },
      {
        q: 'Les étudiants paient-ils leur consommation ?',
        a: 'Non, l\'expérience est offerte par l\'établissement. C\'est le principe : vous offrez un repas, un soin ou un service, et en retour vous obtenez un avis Google authentique et détaillé. Le coût est inclus dans le devis.',
      },
    ],
  },
  {
    id: 'google-ads',
    label: 'Google Ads Local',
    icon: ChartLineUp,
    items: [
      {
        q: 'En quoi consiste le service Google Ads Local ?',
        a: 'On crée et gère vos campagnes publicitaires Google ciblées sur votre zone géographique : Google Search local, Local Service Ads (si éligible), et campagnes Maps. L\'objectif : générer des appels et des visites qualifiés, pas juste des clics.',
      },
      {
        q: 'Quel budget pub faut-il prévoir ?',
        a: 'Le budget publicitaire dépend de votre secteur et de votre zone. En général, on recommande entre 300€ et 1 000€/mois de budget média. On vous conseille le budget optimal en fonction de vos objectifs et de la concurrence locale.',
      },
      {
        q: 'Quelle est la différence avec le SEO local ?',
        a: 'Le SEO local (optimisation de fiche, avis) est un travail organique dont les effets sont durables mais progressifs. Google Ads donne des résultats immédiats tant que vous investissez. L\'idéal est de combiner les deux : Ads pour le court terme, SEO pour le long terme.',
      },
      {
        q: 'Comment mesurez-vous les résultats des campagnes ?',
        a: 'Chaque mois, vous recevez un reporting clair : nombre d\'appels générés, demandes d\'itinéraire, formulaires remplis, coût par lead, et ROI estimé. On track tout pour que vous sachiez exactement ce que chaque euro investi vous rapporte.',
      },
    ],
  },
  {
    id: 'tarifs',
    label: 'Tarifs & engagement',
    icon: CurrencyDollar,
    items: [
      {
        q: 'Récapitulez-moi vos tarifs.',
        a: 'Audit gratuit : 0€. Optimisation fiche Google : 500€ HT (one-shot). Google Ads Local : 400€/mois HT + budget pub. Boost Avis Expérience : sur devis après candidature. Tarifs dégressifs pour les multi-établissements (jusqu\'à -30%).',
      },
      {
        q: 'Y a-t-il un engagement de durée ?',
        a: 'Non. L\'optimisation de fiche est un paiement unique. Le Google Ads est résiliable à tout moment, sans durée minimum. On préfère vous garder par la qualité de nos résultats plutôt que par une clause contractuelle.',
      },
      {
        q: 'Quels moyens de paiement acceptez-vous ?',
        a: 'Virement bancaire, prélèvement SEPA et carte bancaire. La facturation est claire et détaillée, avec un récapitulatif des actions réalisées.',
      },
      {
        q: 'Proposez-vous des facilités de paiement ?',
        a: 'Pour le one-shot optimisation, le paiement est en une fois. Pour le Google Ads mensuel, la facturation est automatique chaque mois. Si vous avez un besoin spécifique, contactez-nous pour en discuter.',
      },
    ],
  },
  {
    id: 'profil',
    label: 'Pour qui ?',
    icon: Buildings,
    items: [
      {
        q: 'Je suis un indépendant ou une TPE, c\'est fait pour moi ?',
        a: 'C\'est exactement pour vous. La majorité de nos clients sont des indépendants et petites entreprises : restaurants, médecins, avocats, artisans, garages, salons de coiffure, commerces de détail… Le SEO local est le levier le plus rentable quand votre clientèle vient de votre zone géographique.',
      },
      {
        q: 'Je n\'ai pas de site web, est-ce un problème ?',
        a: 'Non. Votre fiche Google Business Profile suffit pour apparaître dans les résultats Google Maps et générer des appels, des itinéraires et des visites. Un site web renforce votre crédibilité, mais ce n\'est pas un prérequis pour démarrer.',
      },
      {
        q: 'Je viens de créer mon entreprise, c\'est trop tôt ?',
        a: 'Au contraire, c\'est le moment idéal. En optimisant votre fiche Google dès le départ, vous prenez de l\'avance sur les concurrents qui négligent leur visibilité locale. Les premiers mois sont déterminants pour construire votre réputation en ligne.',
      },
      {
        q: 'Mon établissement est en zone rurale, ça marche quand même ?',
        a: 'Oui, et souvent encore mieux. En zone rurale, la concurrence en ligne est généralement plus faible. Une fiche bien optimisée peut vous placer en tête très rapidement. C\'est un avantage que beaucoup de commerces ruraux sous-exploitent.',
      },
    ],
  },
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

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-warm-200/60 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="group flex w-full items-center justify-between gap-4 py-4 sm:py-5 text-left"
      >
        <span className="text-sm sm:text-[1.0625rem] font-medium leading-snug text-warm-800 transition-colors group-hover:text-warm-900">
          {question}
        </span>
        <CaretDown
          weight="bold"
          className={`h-4.5 w-4.5 shrink-0 text-warm-400 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-4 sm:pb-5 leading-relaxed text-warm-600">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CategorySection({ category }: { category: FAQCategory }) {
  const Icon = category.icon;

  return (
    <div id={category.id} className="scroll-mt-32">
      <Reveal>
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15">
            <Icon weight="fill" className="h-5 w-5 text-accent-dark" />
          </div>
          <h2 className="text-heading-lg text-warm-900">{category.label}</h2>
        </div>
        <div className="rounded-xl border border-warm-200 bg-white px-4 py-1 shadow-soft sm:rounded-2xl sm:px-7">
          {category.items.map((item, i) => (
            <FAQItem key={i} question={item.q} answer={item.a} />
          ))}
        </div>
      </Reveal>
    </div>
  );
}

export default function FAQPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredCategories = FAQ_CATEGORIES.map((cat) => ({
    ...cat,
    items: cat.items.filter(
      (item) =>
        item.q.toLowerCase().includes(search.toLowerCase()) ||
        item.a.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter((cat) => (activeCategory ? cat.id === activeCategory : true));

  const visibleCategories = filteredCategories.filter((cat) => cat.items.length > 0);
  const totalQuestions = FAQ_CATEGORIES.reduce((acc, cat) => acc + cat.items.length, 0);

  return (
    <main>
      {/* Hero */}
      <section className="px-4 sm:px-6 pb-6 pt-10 sm:pt-16 md:pt-20">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <p className="section-label mb-4 justify-center">FAQ</p>
            <h1 className="text-balance text-heading-xl sm:text-display text-warm-900">
              Tout savoir sur <span className="serif-accent">Siva</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-body-sm sm:text-body-lg text-warm-500">
              {totalQuestions} réponses sur nos services, nos tarifs et notre approche du SEO local.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Search */}
      <section className="px-4 sm:px-6 pb-4">
        <div className="mx-auto max-w-2xl">
          <Reveal delay={0.05}>
            <div className="relative">
              <MagnifyingGlass
                weight="bold"
                className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-warm-400"
              />
              <input
                type="text"
                placeholder="Rechercher une question..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-2xl border border-warm-200 bg-white py-3 pl-10 pr-4 sm:py-4 sm:pl-12 text-body text-warm-800 shadow-soft outline-none transition-all placeholder:text-warm-400 focus:border-warm-300 focus:shadow-card"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Category pills */}
      <section className="px-4 sm:px-6 pb-10">
        <div className="mx-auto max-w-4xl">
          <Reveal delay={0.1}>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                onClick={() => setActiveCategory(null)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  activeCategory === null
                    ? 'bg-warm-900 text-white shadow-soft'
                    : 'bg-white text-warm-600 border border-warm-200 hover:border-warm-300 hover:text-warm-800'
                }`}
              >
                Tout voir
              </button>
              {FAQ_CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() =>
                      setActiveCategory(activeCategory === cat.id ? null : cat.id)
                    }
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                      activeCategory === cat.id
                        ? 'bg-warm-900 text-white shadow-soft'
                        : 'bg-white text-warm-600 border border-warm-200 hover:border-warm-300 hover:text-warm-800'
                    }`}
                  >
                    <Icon weight="bold" className="h-4 w-4" />
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ sections */}
      <section className="px-4 sm:px-6 pb-14 sm:pb-24">
        <div className="mx-auto max-w-3xl space-y-12">
          {visibleCategories.length > 0 ? (
            visibleCategories.map((cat) => (
              <CategorySection key={cat.id} category={cat} />
            ))
          ) : (
            <Reveal>
              <div className="rounded-2xl border border-warm-200 bg-white p-8 text-center shadow-soft sm:p-12">
                <MagnifyingGlass
                  weight="bold"
                  className="mx-auto mb-4 h-10 w-10 text-warm-300"
                />
                <p className="text-lg font-medium text-warm-700">
                  Aucun résultat trouvé
                </p>
                <p className="mt-2 text-warm-500">
                  Essayez avec d&apos;autres mots-clés ou{' '}
                  <button
                    onClick={() => {
                      setSearch('');
                      setActiveCategory(null);
                    }}
                    className="font-medium text-accent-dark underline underline-offset-2 hover:text-accent-hover"
                  >
                    réinitialisez les filtres
                  </button>
                </p>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-t-[1.5rem] sm:rounded-t-[2.5rem] bg-warm-900 px-4 sm:px-6 py-14 sm:py-20 text-white">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-heading-xl text-white">
              Vous avez d&apos;autres questions ?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-body-sm sm:text-body-lg text-white/60">
              Notre équipe est disponible pour répondre à toutes vos interrogations.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/rendez-vous" className="btn-accent">
                Prendre rendez-vous
              </Link>
              <a
                href="tel:+33760554000"
                className="btn-secondary !bg-white/10 !border-white/20 !text-white hover:!bg-white/20"
              >
                Nous appeler
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
