'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { MagnifyingGlass } from '@phosphor-icons/react';

type GlossaryEntry = {
  term: string;
  definition: string;
  category: string;
};

const GLOSSARY_ENTRIES: GlossaryEntry[] = [
  {
    term: 'Google Business Profile (GBP)',
    definition:
      "Anciennement Google My Business, c'est l'outil gratuit de Google qui permet aux entreprises de gérer leur présence en ligne sur Google Search et Google Maps. C'est la base de toute stratégie de SEO local.",
    category: 'Google',
  },
  {
    term: 'Local Pack',
    definition:
      "Le bloc de 3 résultats locaux qui apparaît en haut des résultats Google lors d'une recherche locale, accompagné d'une carte Google Maps. Apparaître dans le Local Pack est l'objectif principal du SEO local.",
    category: 'SEO Local',
  },
  {
    term: 'NAP (Name, Address, Phone)',
    definition:
      'Acronyme désignant le nom, l\'adresse et le numéro de téléphone d\'une entreprise. La cohérence du NAP sur tous les annuaires et sites web est un facteur de ranking crucial pour le SEO local.',
    category: 'SEO Local',
  },
  {
    term: 'Citation locale',
    definition:
      "Mention en ligne du NAP de votre entreprise sur des annuaires, sites web ou plateformes. Les citations cohérentes renforcent la confiance de Google dans la légitimité de votre entreprise.",
    category: 'SEO Local',
  },
  {
    term: 'Fiche Google',
    definition:
      "Le profil de votre entreprise tel qu'il apparaît sur Google Maps et dans les résultats de recherche. Elle contient vos informations (horaires, photos, avis, services, etc.).",
    category: 'Google',
  },
  {
    term: 'Avis Google',
    definition:
      "Les évaluations et commentaires laissés par les clients sur votre fiche Google Business Profile. La quantité, la qualité et la récence des avis sont des facteurs de classement majeurs.",
    category: 'Google',
  },
  {
    term: 'SEO Local',
    definition:
      "Ensemble des techniques d'optimisation visant à améliorer la visibilité d'une entreprise dans les résultats de recherche géolocalisés (Google Maps, Local Pack). Contrairement au SEO classique, il cible une zone géographique précise.",
    category: 'SEO Local',
  },
  {
    term: 'Géogrille (Grid Search)',
    definition:
      "Technique d'analyse qui consiste à simuler des recherches Google Maps depuis différents points géographiques pour cartographier la visibilité d'une entreprise sur une zone donnée.",
    category: 'Outils',
  },
  {
    term: 'Heatmap de visibilité',
    definition:
      "Carte thermique montrant les positions de votre fiche Google sur une grille géographique. Les zones vertes indiquent un bon classement, les rouges un classement faible.",
    category: 'Outils',
  },
  {
    term: 'Catégorie principale',
    definition:
      "La catégorie la plus importante de votre fiche Google Business Profile. Elle doit correspondre précisément à votre activité principale car elle a un impact direct sur les recherches pour lesquelles vous apparaissez.",
    category: 'Google',
  },
  {
    term: 'Catégories secondaires',
    definition:
      "Les catégories additionnelles que vous pouvez ajouter à votre fiche GBP pour couvrir vos activités complémentaires. Elles permettent d'élargir les requêtes sur lesquelles vous pouvez apparaître.",
    category: 'Google',
  },
  {
    term: 'Google Posts',
    definition:
      "Publications (actualités, offres, événements) que vous pouvez créer directement depuis votre fiche Google Business Profile. Ils signalent à Google que votre fiche est active.",
    category: 'Google',
  },
  {
    term: 'Proéminence',
    definition:
      "L'un des 3 facteurs de classement Google Maps. Elle mesure la notoriété de votre entreprise en ligne : nombre d'avis, citations, backlinks, présence sur les réseaux sociaux.",
    category: 'SEO Local',
  },
  {
    term: 'Proximité',
    definition:
      "L'un des 3 facteurs de classement Google Maps. Elle correspond à la distance entre l'internaute (ou le lieu recherché) et votre entreprise. Facteur sur lequel vous avez le moins de contrôle.",
    category: 'SEO Local',
  },
  {
    term: 'Pertinence',
    definition:
      "L'un des 3 facteurs de classement Google Maps. Elle mesure la correspondance entre la requête de l'internaute et les informations de votre fiche (catégories, description, services, etc.).",
    category: 'SEO Local',
  },
  {
    term: 'LSA (Local Services Ads)',
    definition:
      "Annonces de services locaux Google qui apparaissent tout en haut des résultats avec un badge \"Garanti par Google\". Modèle au coût par lead, idéal pour les prestataires de services.",
    category: 'Publicité',
  },
  {
    term: 'Google Ads Local',
    definition:
      "Campagnes publicitaires Google ciblant une zone géographique précise. Elles permettent d'apparaître en tête des résultats de recherche et sur Google Maps pour des requêtes locales.",
    category: 'Publicité',
  },
  {
    term: 'CPC (Coût par Clic)',
    definition:
      "Modèle de tarification publicitaire où l'annonceur paie chaque fois qu'un utilisateur clique sur son annonce. Le CPC varie selon la concurrence et la localisation.",
    category: 'Publicité',
  },
  {
    term: 'Taux de conversion local',
    definition:
      "Pourcentage de visiteurs de votre fiche Google qui effectuent une action (appel, itinéraire, visite du site web). Un indicateur clé de la performance de votre présence locale.",
    category: 'Métriques',
  },
  {
    term: 'Impressions Maps',
    definition:
      "Nombre de fois où votre fiche est apparue dans les résultats Google Maps. Cette métrique permet de mesurer votre visibilité locale brute.",
    category: 'Métriques',
  },
  {
    term: 'Actions sur la fiche',
    definition:
      "Les interactions des utilisateurs avec votre fiche GBP : appels, demandes d'itinéraire, clics vers le site web, messages. Ces métriques mesurent l'engagement.",
    category: 'Métriques',
  },
  {
    term: 'Backlink local',
    definition:
      "Lien provenant d'un site web local (mairie, association, annuaire local, presse régionale) pointant vers votre site. Les backlinks locaux renforcent votre autorité géographique.",
    category: 'SEO Local',
  },
  {
    term: 'Schema LocalBusiness',
    definition:
      "Balisage structuré (JSON-LD) à intégrer sur votre site web pour aider Google à comprendre les informations de votre entreprise locale (nom, adresse, horaires, etc.).",
    category: 'Technique',
  },
  {
    term: 'Recherche « near me »',
    definition:
      "Requêtes incluant \"près de moi\" ou \"à proximité\". Ce type de recherche a explosé (+500% en 5 ans) et déclenche systématiquement des résultats Google Maps.",
    category: 'SEO Local',
  },
  {
    term: 'Intention locale',
    definition:
      "Requête de recherche pour laquelle Google considère que l'utilisateur cherche un résultat géographiquement proche. Google affiche alors un Local Pack même sans mention de lieu.",
    category: 'SEO Local',
  },
  {
    term: 'Audit SEO local',
    definition:
      "Analyse complète de la présence en ligne locale d'une entreprise : fiche GBP, citations, avis, positionnement sur une géogrille, analyse des concurrents et recommandations.",
    category: 'Outils',
  },
  {
    term: 'Remarketing local',
    definition:
      "Stratégie publicitaire qui cible les personnes ayant déjà interagi avec votre entreprise (visite du site, fiche Google) avec des annonces personnalisées.",
    category: 'Publicité',
  },
  {
    term: 'SERP locale',
    definition:
      "Page de résultats de recherche Google affichée pour une requête à intention locale. Elle inclut typiquement un Local Pack, des annonces locales et des résultats organiques.",
    category: 'SEO Local',
  },
];

const CATEGORIES = ['Tous', 'SEO Local', 'Google', 'Publicité', 'Outils', 'Métriques', 'Technique'];

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

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

export default function GlossairePage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [activeLetter, setActiveLetter] = useState<string | null>(null);

  const filtered = GLOSSARY_ENTRIES.filter((entry) => {
    const matchSearch =
      search === '' ||
      entry.term.toLowerCase().includes(search.toLowerCase()) ||
      entry.definition.toLowerCase().includes(search.toLowerCase());
    const matchCategory = activeCategory === 'Tous' || entry.category === activeCategory;
    const matchLetter = !activeLetter || entry.term[0].toUpperCase() === activeLetter;
    return matchSearch && matchCategory && matchLetter;
  }).sort((a, b) => a.term.localeCompare(b.term, 'fr'));

  const groupedByLetter = filtered.reduce<Record<string, GlossaryEntry[]>>((acc, entry) => {
    const letter = entry.term[0].toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(entry);
    return acc;
  }, {});

  const availableLetters = new Set(
    GLOSSARY_ENTRIES.map((e) => e.term[0].toUpperCase())
  );

  return (
    <main>
      <section className="px-4 pb-6 pt-10 sm:px-6 sm:pb-8 sm:pt-16 md:pt-20">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <p className="section-label mb-4 justify-center">Ressources</p>
            <h1 className="text-balance text-heading-xl text-warm-900 sm:text-display">
              Glossaire du <span className="serif-accent">SEO local</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-body-sm text-warm-500 sm:text-body-lg">
              Tous les termes clés du référencement local expliqués simplement.
              De Google Business Profile au Local Pack, maîtrisez le vocabulaire.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-4 pb-14 sm:px-6 sm:pb-24">
        <div className="mx-auto max-w-5xl">
          <Reveal delay={0.08}>
            <div className="relative mb-6">
              <MagnifyingGlass
                weight="bold"
                className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-warm-400"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setActiveLetter(null);
                }}
                placeholder="Rechercher un terme…"
                className="w-full rounded-2xl border border-warm-200 bg-white py-3.5 pl-12 pr-4 text-sm text-warm-900 shadow-soft placeholder:text-warm-400 focus:border-accent/40 focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all"
              />
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="mb-6 flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    activeCategory === cat
                      ? 'bg-warm-900 text-white'
                      : 'border border-warm-200 bg-white text-warm-600 hover:border-warm-300 hover:text-warm-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mb-8 flex flex-wrap gap-1">
              {ALPHABET.map((letter) => {
                const isAvailable = availableLetters.has(letter);
                const isActive = activeLetter === letter;
                return (
                  <button
                    key={letter}
                    onClick={() => {
                      if (isAvailable) {
                        setActiveLetter(isActive ? null : letter);
                        setSearch('');
                      }
                    }}
                    disabled={!isAvailable}
                    className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-warm-900 text-white'
                        : isAvailable
                          ? 'border border-warm-200 bg-white text-warm-700 hover:border-warm-300 hover:bg-warm-50'
                          : 'text-warm-300 cursor-default'
                    }`}
                  >
                    {letter}
                  </button>
                );
              })}
              {activeLetter && (
                <button
                  onClick={() => setActiveLetter(null)}
                  className="ml-2 rounded-lg px-3 py-1.5 text-sm font-medium text-warm-500 transition-colors hover:text-warm-900"
                >
                  Effacer
                </button>
              )}
            </div>
          </Reveal>

          {filtered.length === 0 ? (
            <Reveal>
              <div className="rounded-2xl border border-warm-200 bg-white p-10 text-center shadow-soft">
                <p className="text-warm-500">Aucun terme trouvé pour cette recherche.</p>
              </div>
            </Reveal>
          ) : (
            <div className="space-y-8">
              {Object.keys(groupedByLetter)
                .sort()
                .map((letter) => (
                  <Reveal key={letter}>
                    <div>
                      <div className="mb-3 flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-warm-900 text-lg font-bold text-white">
                          {letter}
                        </span>
                        <div className="h-px flex-1 bg-warm-200" />
                      </div>
                      <div className="space-y-3">
                        {groupedByLetter[letter].map((entry) => (
                          <div
                            key={entry.term}
                            className="group rounded-2xl border border-warm-200 bg-white p-5 shadow-soft transition-all hover:shadow-card sm:p-6"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <h3 className="text-base font-medium text-warm-900 sm:text-lg">
                                {entry.term}
                              </h3>
                              <span className="shrink-0 rounded-full bg-warm-100 px-3 py-1 text-xs font-semibold text-warm-600">
                                {entry.category}
                              </span>
                            </div>
                            <p className="mt-2.5 text-sm leading-relaxed text-warm-500">
                              {entry.definition}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                ))}
            </div>
          )}

          <Reveal delay={0.1}>
            <p className="mt-8 text-center text-sm text-warm-400">
              {filtered.length} terme{filtered.length > 1 ? 's' : ''} trouvé{filtered.length > 1 ? 's' : ''}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="rounded-t-[1.5rem] bg-warm-900 px-4 py-14 text-white sm:rounded-t-[2.5rem] sm:px-6 sm:py-20">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-heading-xl text-white">
              Besoin d&apos;un <span className="serif-accent text-accent">accompagnement</span> ?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-body-sm text-white/60 sm:text-body-lg">
              On passe du jargon à l&apos;action. Laissez-nous auditer votre visibilité locale.
            </p>
            <div className="mt-8">
              <Link href="/rendez-vous" className="btn-accent">
                Prendre rendez-vous
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
