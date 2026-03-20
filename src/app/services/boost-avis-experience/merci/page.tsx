'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, EnvelopeSimple } from '@phosphor-icons/react';

export default function MerciPage() {
  return (
    <main className="flex min-h-[80vh] items-center justify-center px-4 sm:px-6 py-20">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="hero-dot-grid absolute inset-0" />
        <div className="hero-glow" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-xl text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2, type: 'spring', stiffness: 200 }}
          className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-positive/10"
        >
          <CheckCircle weight="fill" className="h-12 w-12 text-positive" />
        </motion.div>

        <h1 className="text-heading-xl text-warm-900 sm:text-display">
          Candidature <span className="serif-accent">envoyée !</span>
        </h1>

        <p className="mx-auto mt-6 max-w-md text-body-sm sm:text-body-lg text-warm-500">
          Merci pour votre candidature au programme Boost Avis Expérience. Notre équipe analyse votre demande et vous recontacte sous 24h.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <div className="flex items-center gap-2.5 rounded-xl border border-warm-200 bg-white px-5 py-3 shadow-soft">
            <Clock weight="fill" className="h-5 w-5 text-accent-dark" />
            <span className="text-sm font-medium text-warm-700">Réponse sous 24h</span>
          </div>
          <div className="flex items-center gap-2.5 rounded-xl border border-warm-200 bg-white px-5 py-3 shadow-soft">
            <EnvelopeSimple weight="fill" className="h-5 w-5 text-accent-dark" />
            <span className="text-sm font-medium text-warm-700">Par email ou téléphone</span>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/" className="btn-primary">
            Retour à l&apos;accueil
          </Link>
          <Link href="/audit-gratuit" className="btn-secondary">
            Lancer un audit gratuit
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
