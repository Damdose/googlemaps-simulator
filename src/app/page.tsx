'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search, BarChart3, Map, Zap, ArrowRight, Star, Shield, TrendingUp, CheckCircle2 } from 'lucide-react';
import PlaceSearchInput from '@/components/audit/PlaceSearchInput';
import { PlaceResult } from '@/lib/types';

const STEPS = [
  { icon: Search, title: 'Recherchez', description: 'Entrez le nom de votre établissement Google' },
  { icon: BarChart3, title: 'Configurez', description: 'Choisissez vos mots-clés et votre zone' },
  { icon: Map, title: 'Analysez', description: 'Recevez votre rapport complet avec heatmap' },
];

const SOCIAL_PROOF = [
  { value: '2 847', label: 'audits réalisés' },
  { value: '4.9/5', label: 'satisfaction client' },
  { value: '93%', label: 'score amélioré' },
];

const FEATURES = [
  { icon: TrendingUp, title: 'Score d\'optimisation', description: 'Évaluation complète de votre fiche sur 10 critères clés avec benchmarks sectoriels.' },
  { icon: Map, title: 'Heatmap de ranking', description: 'Visualisez votre position Google Maps sur toute votre zone géographique.' },
  { icon: Zap, title: 'Recommandations IA', description: 'Suggestions personnalisées générées par IA pour améliorer votre visibilité.' },
  { icon: Shield, title: 'Visibilité IA', description: 'Vérifiez si ChatGPT, Claude et Gemini recommandent votre business.' },
];

export default function HomePage() {
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

  return (
    <div className="min-h-screen bg-warm-bg">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-warm-bg/80 backdrop-blur-lg border-b border-warm-100">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Map className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-warm-800 text-lg">GBP Audit</span>
          </div>
          <a
            href="#audit"
            className="hidden sm:flex items-center gap-2 bg-cta hover:bg-cta-hover text-white font-semibold px-4 py-2 rounded-lg transition-colors text-sm"
          >
            Lancer l&apos;audit gratuit
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-16 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-light text-primary text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              Audit 100% gratuit — Résultats en 30 secondes
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-warm-900 leading-tight mb-6">
              Découvrez pourquoi vos concurrents vous{' '}
              <span className="text-primary">dépassent sur Google Maps</span>
            </h1>

            <p className="text-lg sm:text-xl text-warm-500 max-w-2xl mx-auto mb-10">
              Analysez votre fiche Google Business Profile en quelques clics.
              Score, heatmap, concurrents et recommandations IA personnalisées.
            </p>
          </motion.div>

          <motion.div
            id="audit"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <PlaceSearchInput onSelect={handlePlaceSelect} />
            <p className="text-sm text-warm-400 mt-3">
              Commencez à taper le nom de votre commerce, restaurant, cabinet...
            </p>
          </motion.div>
        </div>
      </section>

      {/* Social proof */}
      <section className="pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-3 gap-4">
            {SOCIAL_PROOF.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="text-center p-4 rounded-xl bg-white border border-warm-100 shadow-soft"
              >
                <p className="text-2xl sm:text-3xl font-bold text-primary">{item.value}</p>
                <p className="text-sm text-warm-500 mt-1">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-4 bg-white border-y border-warm-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-warm-800 mb-12">
            Comment ça marche ?
          </h2>

          <div className="grid sm:grid-cols-3 gap-8">
            {STEPS.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary-light flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-7 h-7 text-primary" />
                </div>
                <div className="w-8 h-8 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center mx-auto mb-3">
                  {i + 1}
                </div>
                <h3 className="text-lg font-bold text-warm-800 mb-2">{step.title}</h3>
                <p className="text-sm text-warm-500">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-warm-800 mb-4">
            Ce que contient votre rapport
          </h2>
          <p className="text-center text-warm-500 mb-12 max-w-xl mx-auto">
            Un audit complet et actionnable pour comprendre et améliorer votre visibilité locale.
          </p>

          <div className="grid sm:grid-cols-2 gap-6">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4 p-6 rounded-xl bg-white border border-warm-100 shadow-soft hover:shadow-card transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center shrink-0">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-warm-800 mb-1">{feature.title}</h3>
                  <p className="text-sm text-warm-500 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-white border-y border-warm-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-warm-800 mb-12">
            Ce qu&apos;en disent nos utilisateurs
          </h2>

          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { name: 'Marie L.', role: 'Restauratrice, Paris', text: 'J\'ai compris en 2 minutes pourquoi mes concurrents me dépassaient. Les recommandations étaient claires et concrètes.', rating: 5 },
              { name: 'Thomas B.', role: 'Dentiste, Lyon', text: 'La heatmap m\'a ouvert les yeux. Je ne savais même pas que je n\'apparaissais pas dans la moitié de ma zone !', rating: 5 },
              { name: 'Sophie R.', role: 'Avocate, Bordeaux', text: 'Rapport impressionnant et gratuit. J\'ai suivi les conseils et gagné 30% de visibilité en un mois.', rating: 5 },
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-xl bg-warm-50 border border-warm-100 text-left"
              >
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-sm text-warm-600 leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
                <div>
                  <p className="text-sm font-semibold text-warm-800">{t.name}</p>
                  <p className="text-xs text-warm-400">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-warm-800 mb-4">
            Prêt à dominer votre zone ?
          </h2>
          <p className="text-warm-500 mb-8">
            Lancez votre audit gratuit maintenant et découvrez votre potentiel de croissance.
          </p>
          <a
            href="#audit"
            className="inline-flex items-center gap-2 bg-cta hover:bg-cta-hover text-white font-bold px-8 py-4 rounded-xl transition-colors text-lg"
          >
            Auditer mon business gratuitement
            <ArrowRight className="w-5 h-5" />
          </a>
          <div className="flex items-center justify-center gap-4 mt-6 text-sm text-warm-500">
            <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-positive" /> Gratuit</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-positive" /> Sans engagement</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-positive" /> Résultats immédiats</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-warm-100">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-warm-400">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
              <Map className="w-3 h-3 text-white" />
            </div>
            <span>GBP Audit</span>
          </div>
          <p>&copy; {new Date().getFullYear()} GBP Audit. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}
