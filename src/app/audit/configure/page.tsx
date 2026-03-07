'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { RiArrowLeftLine, RiLoader4Line } from 'react-icons/ri';
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

  const [keywords, setKeywords] = useState<KeywordSuggestion[]>([]);
  const [radiusKm, setRadiusKm] = useState(5);
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingKeywords, setLoadingKeywords] = useState(true);

  const selectedCount = keywords.filter(k => k.selected).length;
  const canGenerate = selectedCount >= 1 && selectedCount <= 3;

  useEffect(() => {
    if (!placeId) {
      router.push('/');
    }
  }, [placeId, router]);

  const fetchKeywords = useCallback(async () => {
    if (!businessType || !businessAddress) return;
    setLoadingKeywords(true);

    try {
      const res = await fetch('/api/audit/suggest-keywords', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          primaryType: businessType,
          address: businessAddress,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.keywords && data.keywords.length > 0) {
          const mapped: KeywordSuggestion[] = data.keywords.map((k: { keyword: string; searchVolume: number }, i: number) => ({
            keyword: k.keyword,
            searchVolume: k.searchVolume,
            selected: i < 1,
          }));
          setKeywords(mapped);
          setLoadingKeywords(false);
          return;
        }
      }
    } catch (err) {
      console.error('DataForSEO keywords failed, falling back to local:', err);
    }

    const fallback = generateKeywordsForBusiness(businessType, businessTypeName, businessName, businessAddress);
    setKeywords(fallback);
    setLoadingKeywords(false);
  }, [businessType, businessTypeName, businessName, businessAddress]);

  useEffect(() => {
    fetchKeywords();
  }, [fetchKeywords]);

  async function handleGenerate() {
    if (!canGenerate) return;
    setIsGenerating(true);

    const selectedKws = keywords.filter(k => k.selected).map(k => ({
      keyword: k.keyword,
      searchVolume: k.searchVolume,
    }));

    const auditId = `audit_${Date.now()}`;
    const params = new URLSearchParams({
      place_id: placeId,
      keywords: JSON.stringify(selectedKws),
      radius: String(radiusKm),
    });
    router.push(`/audit/report/${auditId}?${params.toString()}`);
  }

  if (!placeId) return null;

  return (
    <div>
      {/* Step indicator */}
      <header className="sticky top-18 z-40 glass border-b border-warm-100/60">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-warm-500 hover:text-warm-800 transition-colors text-sm font-medium"
          >
            <RiArrowLeftLine className="w-4 h-4" />
            Retour
          </button>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm">
              <span className="w-7 h-7 rounded-full bg-warm-900 text-white text-xs font-bold flex items-center justify-center">
                1
              </span>
              <span className="hidden sm:inline text-warm-500 font-medium">Recherche</span>
            </div>
            <div className="w-8 h-px bg-warm-200" />
            <div className="flex items-center gap-2 text-sm">
              <span className="w-7 h-7 rounded-full bg-accent text-warm-900 text-xs font-bold flex items-center justify-center">2</span>
              <span className="hidden sm:inline text-warm-800 font-medium">Configuration</span>
            </div>
            <div className="w-8 h-px bg-warm-200" />
            <div className="flex items-center gap-2 text-sm">
              <span className="w-7 h-7 rounded-full bg-warm-100 text-warm-400 text-xs font-bold flex items-center justify-center">3</span>
              <span className="hidden sm:inline text-warm-400 font-medium">Rapport</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* Business card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="card flex items-center gap-4 mb-10"
        >
          <div className="w-14 h-14 rounded-full bg-warm-100 flex items-center justify-center shrink-0">
            <span className="text-lg font-semibold text-warm-600">{businessName.charAt(0)}</span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-lg font-semibold text-warm-900 truncate">{businessName}</p>
            <p className="text-body-sm text-warm-500 truncate">{businessAddress}</p>
          </div>
          <span className="hidden sm:inline-block text-xs px-4 py-2 rounded-full bg-accent-light text-warm-800 font-medium border border-accent/20">
            {businessTypeName || businessType}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10"
        >
          <h1 className="text-heading-xl text-warm-900 mb-2">
            Configurez votre <span className="serif-accent">audit</span>
          </h1>
          <p className="text-body-lg text-warm-500">
            Sélectionnez vos mots-clés cibles et la zone géographique à analyser.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="card"
          >
            <KeywordSelector
              keywords={keywords}
              maxSelection={3}
              onChange={setKeywords}
              loading={loadingKeywords}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="card"
          >
            <ZoneSelector
              centerLat={lat}
              centerLng={lng}
              radiusKm={radiusKm}
              onRadiusChange={setRadiusKm}
            />
          </motion.div>
        </div>

        {/* CTA bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 card"
        >
          <div>
            <p className="text-body-sm text-warm-600 font-medium">
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
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none whitespace-nowrap"
          >
            {isGenerating ? (
              <>
                <RiLoader4Line className="w-5 h-5 animate-spin" />
                Génération en cours...
              </>
            ) : (
              'Générer mon audit gratuit'
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
        <RiLoader4Line className="w-8 h-8 animate-spin text-warm-400" />
      </div>
    }>
      <ConfigureContent />
    </Suspense>
  );
}
