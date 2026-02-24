'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, MapPin, Loader2 } from 'lucide-react';
import KeywordSelector from '@/components/audit/KeywordSelector';
import ZoneSelector from '@/components/audit/ZoneSelector';
import { KeywordSuggestion } from '@/lib/types';
import { generateKeywordsForBusiness } from '@/lib/keyword-generator';

function ConfigureContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const placeId = searchParams.get('place_id') ?? '';
  const businessName = searchParams.get('name') ?? '';
  const businessAddress = searchParams.get('address') ?? '';
  const lat = parseFloat(searchParams.get('lat') ?? '0');
  const lng = parseFloat(searchParams.get('lng') ?? '0');
  const businessType = searchParams.get('type') ?? '';
  const businessTypeName = searchParams.get('type_name') ?? '';

  const initialKeywords = useMemo(
    () => generateKeywordsForBusiness(businessType, businessAddress),
    [businessType, businessAddress],
  );

  const [keywords, setKeywords] = useState<KeywordSuggestion[]>(initialKeywords);
  const [radiusKm, setRadiusKm] = useState(5);
  const [isGenerating, setIsGenerating] = useState(false);

  const selectedCount = keywords.filter(k => k.selected).length;
  const canGenerate = selectedCount >= 1 && selectedCount <= 3;

  useEffect(() => {
    if (!placeId) {
      router.push('/');
    }
  }, [placeId, router]);

  useEffect(() => {
    setKeywords(initialKeywords);
  }, [initialKeywords]);

  async function handleGenerate() {
    if (!canGenerate) return;
    setIsGenerating(true);

    await new Promise(r => setTimeout(r, 2000));

    const auditId = `audit_${Date.now()}`;
    const params = new URLSearchParams({
      place_id: placeId,
      keywords: JSON.stringify(keywords.filter(k => k.selected).map(k => k.keyword)),
      radius: String(radiusKm),
    });
    router.push(`/audit/report/${auditId}?${params.toString()}`);
  }

  if (!placeId) return null;

  return (
    <div className="min-h-screen bg-warm-bg">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-warm-bg/80 backdrop-blur-lg border-b border-warm-100">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-warm-500 hover:text-warm-700 transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour
          </button>
          <div className="flex items-center gap-2 text-sm text-warm-500">
            <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">1</span>
            <span className="text-warm-300">—</span>
            <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">2</span>
            <span className="text-warm-300">—</span>
            <span className="w-6 h-6 rounded-full bg-warm-200 text-warm-400 text-xs font-bold flex items-center justify-center">3</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Business info */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 p-4 rounded-xl bg-white border border-warm-200 shadow-soft mb-8"
        >
          <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center shrink-0">
            <MapPin className="w-6 h-6 text-primary" />
          </div>
          <div className="min-w-0">
            <p className="font-bold text-warm-800 truncate">{businessName}</p>
            <p className="text-sm text-warm-500 truncate">{businessAddress}</p>
            <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full bg-warm-100 text-warm-600">
              {businessTypeName || businessType}
            </span>
          </div>
        </motion.div>

        <h1 className="text-2xl sm:text-3xl font-bold text-warm-800 mb-2">
          Configurez votre audit
        </h1>
        <p className="text-warm-500 mb-8">
          Sélectionnez vos mots-clés cibles et la zone géographique à analyser.
        </p>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl border border-warm-200 shadow-soft p-6"
          >
            <KeywordSelector
              keywords={keywords}
              maxSelection={3}
              onChange={setKeywords}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl border border-warm-200 shadow-soft p-6"
          >
            <ZoneSelector
              centerLat={lat}
              centerLng={lng}
              radiusKm={radiusKm}
              onRadiusChange={setRadiusKm}
            />
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-white rounded-2xl border border-warm-200 shadow-soft"
        >
          <div>
            <p className="text-sm text-warm-500">
              {selectedCount === 0
                ? 'Sélectionnez au moins 1 mot-clé pour continuer.'
                : `${selectedCount} mot${selectedCount > 1 ? 's' : ''}-clé${selectedCount > 1 ? 's' : ''} sélectionné${selectedCount > 1 ? 's' : ''} — rayon de ${radiusKm} km`}
            </p>
            {selectedCount > 0 && (
              <p className="text-xs text-warm-400 mt-1">
                Grille d&apos;analyse : {selectedCount * 49} points de contrôle
              </p>
            )}
          </div>

          <button
            onClick={handleGenerate}
            disabled={!canGenerate || isGenerating}
            className="flex items-center gap-2 bg-cta hover:bg-cta-hover disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold px-8 py-4 rounded-xl transition-colors whitespace-nowrap"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Génération en cours...
              </>
            ) : (
              <>
                Générer mon audit gratuit
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </motion.div>
      </main>
    </div>
  );
}

export default function ConfigurePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-warm-bg flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    }>
      <ConfigureContent />
    </Suspense>
  );
}
