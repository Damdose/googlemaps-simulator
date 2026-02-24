'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Star,
  MapPin,
  Globe,
  Phone,
  ArrowRight,
  Map,
  Loader2,
  ExternalLink,
  Lock,
} from 'lucide-react';
import ScoreGauge from '@/components/audit/ScoreGauge';
import AuditGrid from '@/components/audit/AuditGrid';
import RevenueEstimate from '@/components/audit/RevenueEstimate';
import CompetitorsList from '@/components/audit/CompetitorsList';
import OptimizationSuggestions from '@/components/audit/OptimizationSuggestions';
import AIVisibilityGrid from '@/components/audit/AIVisibilityGrid';
import HeatmapOverlay from '@/components/audit/HeatmapOverlay';
import CountdownTimer from '@/components/audit/CountdownTimer';
import EmailGate from '@/components/audit/EmailGate';
import { AuditReport } from '@/lib/types';
import { generateMockAuditReport } from '@/lib/mock-data';

function ReportContent() {
  const searchParams = useSearchParams();
  const [report, setReport] = useState<AuditReport | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [emailUnlocked, setEmailUnlocked] = useState(false);
  const [showEmailGate, setShowEmailGate] = useState(false);
  const [activeHeatmapKeyword, setActiveHeatmapKeyword] = useState<string>('');

  const placeId = searchParams.get('place_id') ?? 'ChIJ_1';

  useEffect(() => {
    async function loadReport() {
      try {
        // Fetch real place details from Google API
        const res = await fetch(`/api/audit/place-details?place_id=${encodeURIComponent(placeId)}`);
        const details = await res.json();

        if (details.error) {
          throw new Error(details.error);
        }

        // Build report using real details + mock data for sections not yet integrated
        const data = generateMockAuditReport(placeId);

        // Override with real Google data
        data.placeDetails = {
          ...data.placeDetails,
          placeId: details.placeId,
          name: details.name,
          address: details.address,
          lat: details.lat,
          lng: details.lng,
          rating: details.rating,
          userRatingCount: details.userRatingCount,
          primaryType: details.primaryType || data.placeDetails.primaryType,
          primaryTypeDisplayName: details.primaryTypeDisplayName || data.placeDetails.primaryTypeDisplayName,
          websiteUri: details.websiteUri,
          phoneNumber: details.phoneNumber,
          openingHours: details.openingHours,
          photoCount: details.photoCount,
          reviews: details.reviews?.length > 0 ? details.reviews : data.placeDetails.reviews,
          editorialSummary: details.editorialSummary || data.placeDetails.editorialSummary,
          googleMapsUri: details.googleMapsUri,
        };
        data.config.businessName = details.name;
        data.config.businessAddress = details.address;

        setReport(data);
      } catch (err) {
        console.error('Failed to fetch place details, using mock data:', err);
        const data = generateMockAuditReport(placeId);
        setReport(data);
      } finally {
        setIsLoading(false);
      }
    }

    loadReport().then(() => {
      if (report) {
        const selectedKws = report.config.keywords.filter(k => k.selected);
        if (selectedKws.length > 0) {
          setActiveHeatmapKeyword(selectedKws[0].keyword);
        }
      }
    });
  }, [placeId]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (report && !activeHeatmapKeyword) {
      const selectedKws = report.config.keywords.filter(k => k.selected);
      if (selectedKws.length > 0) {
        setActiveHeatmapKeyword(selectedKws[0].keyword);
      }
    }
  }, [report, activeHeatmapKeyword]);

  function handleEmailSubmit() {
    setEmailUnlocked(true);
    setShowEmailGate(false);
  }

  function handleGatedClick() {
    if (!emailUnlocked) {
      setShowEmailGate(true);
    }
  }

  if (isLoading || !report) {
    return (
      <div className="min-h-screen bg-warm-bg flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
        <p className="text-warm-600 font-medium">Génération de votre rapport d&apos;audit...</p>
        <p className="text-sm text-warm-400">Analyse en cours de votre fiche Google Business</p>
      </div>
    );
  }

  const selectedKeywords = report.config.keywords.filter(k => k.selected);

  return (
    <div className="min-h-screen bg-warm-bg">
      {/* Urgency banner */}
      <div className="bg-gradient-to-r from-primary-dark to-primary text-white py-3 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium">
              Offre spéciale : optimisation complète à <strong>-50%</strong>
            </span>
            <CountdownTimer durationMinutes={20} />
          </div>
          <button className="hidden sm:flex items-center gap-1 bg-white/20 hover:bg-white/30 text-white text-sm font-medium px-4 py-1.5 rounded-lg transition-colors">
            Profiter de l&apos;offre <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white border-b border-warm-100 py-6 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-warm-400 mb-4">
            <Map className="w-4 h-4" />
            <span>GBP Audit</span>
            <span>/</span>
            <span className="text-warm-600">Rapport d&apos;audit</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-primary-light flex items-center justify-center shrink-0">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-warm-800">{report.placeDetails.name}</h1>
                <p className="text-warm-500 mt-1">{report.placeDetails.address}</p>
                <div className="flex items-center gap-4 mt-2 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-gold text-gold" />
                    <span className="font-semibold text-warm-700">{report.placeDetails.rating}</span>
                    <span className="text-warm-400">({report.placeDetails.userRatingCount} avis)</span>
                  </div>
                  {report.placeDetails.websiteUri && (
                    <a
                      href={report.placeDetails.websiteUri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-primary hover:underline"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      Site web
                    </a>
                  )}
                  {report.placeDetails.phoneNumber && (
                    <span className="flex items-center gap-1 text-warm-500">
                      <Phone className="w-3.5 h-3.5" />
                      {report.placeDetails.phoneNumber}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <ScoreGauge score={report.overallScore} size={160} />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-10">
        {/* Section 1: AI Summary */}
        <Section
          title="Résumé de l'audit"
          subtitle="Analyse IA personnalisée de votre fiche"
          gated={!emailUnlocked}
          onGatedClick={handleGatedClick}
        >
          <div className="p-6 rounded-xl bg-white border border-warm-200">
            <p className="text-warm-700 leading-relaxed">{report.aiSummary}</p>
          </div>
        </Section>

        {/* Section 2: Criteria Grid */}
        <Section title="Résultats de l'audit" subtitle="Évaluation détaillée sur 10 critères">
          <AuditGrid criteria={report.criteriaResults} />
        </Section>

        {/* Section 3: Revenue Estimate */}
        <Section title="Impact financier" subtitle="Estimation du manque à gagner">
          <RevenueEstimate
            amount={report.revenueEstimate}
            explanation={report.revenueExplanation}
          />
        </Section>

        {/* Section 4: Competitors */}
        <Section title="Top concurrents" subtitle="Les mieux classés dans votre zone">
          <CompetitorsList
            competitors={report.competitors}
            businessName={report.placeDetails.name}
          />
        </Section>

        {/* Section 5: Heatmap */}
        <Section
          title="Heatmap de ranking"
          subtitle="Votre position Google Maps point par point"
          gated={!emailUnlocked}
          onGatedClick={handleGatedClick}
        >
          <div className="space-y-4">
            {selectedKeywords.length > 1 && (
              <div className="flex gap-2 flex-wrap">
                {selectedKeywords.map(kw => (
                  <button
                    key={kw.keyword}
                    onClick={() => setActiveHeatmapKeyword(kw.keyword)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeHeatmapKeyword === kw.keyword
                        ? 'bg-primary text-white'
                        : 'bg-warm-100 text-warm-600 hover:bg-warm-200'
                    }`}
                  >
                    {kw.keyword}
                  </button>
                ))}
              </div>
            )}
            <HeatmapOverlay
              cells={report.heatmapData}
              keyword={activeHeatmapKeyword}
            />
          </div>
        </Section>

        {/* Section 6: Optimization Suggestions */}
        <Section
          title="Recommandations d'optimisation"
          subtitle="Actions concrètes pour améliorer votre visibilité"
          gated={!emailUnlocked}
          onGatedClick={handleGatedClick}
        >
          <OptimizationSuggestions suggestions={report.suggestions} />
        </Section>

        {/* Section 7: AI Visibility */}
        <Section
          title="Visibilité IA"
          subtitle="Votre présence dans les assistants IA"
          gated={!emailUnlocked}
          onGatedClick={handleGatedClick}
        >
          <AIVisibilityGrid results={report.aiVisibility} />
        </Section>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary-dark text-white p-8 sm:p-12"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative text-center max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Prêt à dominer Google Maps ?
            </h2>
            <p className="text-white/80 mb-8">
              Nos experts optimisent votre fiche Google Business Profile pour maximiser votre visibilité locale et attirer plus de clients.
            </p>
            <button className="inline-flex items-center gap-2 bg-cta hover:bg-cta-hover text-white font-bold px-8 py-4 rounded-xl transition-colors">
              Commencer l&apos;optimisation
              <ArrowRight className="w-5 h-5" />
            </button>
            <div className="flex items-center justify-center gap-6 mt-6 text-sm text-white/60">
              <span>A partir de 99€/mois</span>
              <span>Sans engagement</span>
              <span>Résultats sous 30 jours</span>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-warm-100 mt-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-warm-400">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
              <Map className="w-3 h-3 text-white" />
            </div>
            <span>GBP Audit</span>
          </div>
          <div className="flex items-center gap-4">
            <a href={report.placeDetails.googleMapsUri} target="_blank" rel="noopener noreferrer" className="hover:text-warm-600 flex items-center gap-1">
              Voir sur Google Maps <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>

      {/* Email Gate Modal */}
      {showEmailGate && (
        <EmailGate
          onSubmit={handleEmailSubmit}
          onClose={() => setShowEmailGate(false)}
        />
      )}
    </div>
  );
}

interface SectionProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  gated?: boolean;
  onGatedClick?: () => void;
}

function Section({ title, subtitle, children, gated, onGatedClick }: SectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
    >
      <div className="mb-4">
        <h2 className="text-xl font-bold text-warm-800">{title}</h2>
        <p className="text-sm text-warm-500">{subtitle}</p>
      </div>

      {gated ? (
        <div className="relative">
          <div className="filter blur-sm pointer-events-none select-none">{children}</div>
          <div className="absolute inset-0 flex items-center justify-center bg-warm-bg/60 backdrop-blur-[2px] rounded-xl">
            <button
              onClick={onGatedClick}
              className="flex items-center gap-3 bg-white shadow-elevated px-6 py-4 rounded-xl border border-warm-200 hover:shadow-card transition-shadow"
            >
              <Lock className="w-5 h-5 text-cta" />
              <div className="text-left">
                <p className="font-semibold text-warm-800 text-sm">Contenu verrouillé</p>
                <p className="text-xs text-warm-500">Entrez votre email pour débloquer</p>
              </div>
              <ArrowRight className="w-4 h-4 text-cta" />
            </button>
          </div>
        </div>
      ) : (
        children
      )}
    </motion.section>
  );
}

export default function ReportPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-warm-bg flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    }>
      <ReportContent />
    </Suspense>
  );
}
