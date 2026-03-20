'use client';

import { useState, useEffect, Suspense, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, useInView } from 'framer-motion';
import {
  RiStarFill,
  RiGlobalLine,
  RiPhoneFill,
  RiArrowRightLine,
  RiLoader4Line,
  RiExternalLinkLine,
  RiLockLine,
  RiFileTextLine,
  RiTaskLine,
  RiLineChartLine,
  RiGroupFill,
  RiMapLine,
  RiToolsLine,
  RiSparklingFill,
  RiPlugLine,
  RiDownloadLine,
  RiMessage2Fill,
  RiImageLine,
  RiSearchLine,
  RiCalculatorLine,
  RiBrainLine,
  RiCheckboxCircleFill,
} from 'react-icons/ri';
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

const LOADING_STEPS = [
  { text: 'Connexion à Google Places API...', Icon: RiPlugLine },
  { text: 'Récupération des données de votre fiche...', Icon: RiDownloadLine },
  { text: 'Analyse de vos avis clients...', Icon: RiMessage2Fill },
  { text: 'Scan de vos photos et médias...', Icon: RiImageLine },
  { text: 'Recherche de vos concurrents locaux...', Icon: RiSearchLine },
  { text: 'Calcul de votre score d\'optimisation...', Icon: RiCalculatorLine },
  { text: 'Génération des recommandations...', Icon: RiBrainLine },
  { text: 'Finalisation du rapport...', Icon: RiCheckboxCircleFill },
];

function AnimatedSection({
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
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ReportContent() {
  const searchParams = useSearchParams();
  const [report, setReport] = useState<AuditReport | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [emailUnlocked, setEmailUnlocked] = useState(false);
  const [showEmailGate, setShowEmailGate] = useState(false);
  const [activeHeatmapKeyword, setActiveHeatmapKeyword] = useState<string>('');

  const placeId = searchParams.get('place_id') ?? '';
  const keywordsParam = searchParams.get('keywords') ?? '[]';
  const radiusKm = parseInt(searchParams.get('radius') ?? '5', 10);

  useEffect(() => {
    if (!placeId) return;

    let stepInterval: NodeJS.Timeout;

    async function generateAudit() {
      stepInterval = setInterval(() => {
        setLoadingStep(prev => (prev < LOADING_STEPS.length - 1 ? prev + 1 : prev));
      }, 1200);

      try {
        let keywords: { keyword: string; searchVolume: number }[];
        try {
          const parsed = JSON.parse(keywordsParam);
          if (Array.isArray(parsed) && parsed.length > 0) {
            if (typeof parsed[0] === 'string') {
              keywords = parsed.map((k: string) => ({ keyword: k, searchVolume: 500 }));
            } else {
              keywords = parsed;
            }
          } else {
            keywords = [{ keyword: 'business local', searchVolume: 500 }];
          }
        } catch {
          keywords = [{ keyword: 'business local', searchVolume: 500 }];
        }

        const res = await fetch('/api/audit/generate-audit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ placeId, keywords, radiusKm }),
        });

        const data = await res.json();

        if (data.error) {
          throw new Error(data.detail || data.error);
        }

        setReport(data as AuditReport);

        const selectedKws = (data as AuditReport).config.keywords.filter(k => k.selected);
        if (selectedKws.length > 0) {
          setActiveHeatmapKeyword(selectedKws[0].keyword);
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Erreur inconnue';
        console.error('Audit generation failed:', message);
        setError(message);
      } finally {
        clearInterval(stepInterval);
        setIsLoading(false);
      }
    }

    generateAudit();

    return () => clearInterval(stepInterval);
  }, [placeId, keywordsParam, radiusKm]);

  function handleEmailSubmit() {
    setEmailUnlocked(true);
    setShowEmailGate(false);
  }

  function handleGatedClick() {
    if (!emailUnlocked) {
      setShowEmailGate(true);
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-warm-bg flex flex-col items-center justify-center gap-8 px-6">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-accent-light border border-accent/20 flex items-center justify-center">
            {(() => { const StepIcon = LOADING_STEPS[loadingStep].Icon; return <StepIcon className="w-8 h-8 text-accent-dark" />; })()}
          </div>
        </div>
        <div className="text-center max-w-md">
          <p className="text-heading text-warm-900 mb-2">Analyse en cours...</p>
          <p className="text-body text-warm-500 transition-all duration-300">
            {LOADING_STEPS[loadingStep].text}
          </p>
          <div className="mt-6 w-full bg-warm-100 rounded-full h-2 overflow-hidden">
            <motion.div
              className="bg-gradient-to-r from-warm-900 to-accent h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((loadingStep + 1) / LOADING_STEPS.length) * 100}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
          <p className="text-xs text-warm-400 mt-3 font-medium">
            Étape {loadingStep + 1}/{LOADING_STEPS.length}
          </p>
        </div>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="min-h-screen bg-warm-bg flex flex-col items-center justify-center gap-6 px-6">
        <div className="w-16 h-16 rounded-full bg-critical/10 flex items-center justify-center">
          <span className="text-2xl font-semibold text-critical">!</span>
        </div>
        <div className="text-center max-w-md">
          <p className="text-heading text-warm-900 mb-2">Erreur lors de l&apos;audit</p>
          <p className="text-body text-warm-500">{error}</p>
        </div>
        <a href="/" className="btn-primary mt-2">
          Réessayer
        </a>
      </div>
    );
  }

  const selectedKeywords = report.config.keywords.filter(k => k.selected);

  return (
    <div>
      {/* Urgency banner */}
      <div className="bg-warm-900 text-white py-3 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm">
              Offre spéciale : optimisation complète à <strong className="text-accent">-50%</strong>
            </span>
            <CountdownTimer durationMinutes={20} />
          </div>
          <button className="hidden sm:flex items-center gap-1.5 bg-accent hover:bg-accent-hover text-warm-900 text-sm font-semibold px-5 py-2 rounded-full transition-all duration-200 hover:scale-[1.02]">
            Profiter de l&apos;offre <RiArrowRightLine className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Report header */}
      <header className="bg-white border-b border-warm-100 py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-warm-400 mb-6">
            <div className="flex items-center gap-2">
              <img src="/logo.svg" alt="Siva" className="h-5" />
            </div>
            <span className="text-warm-200">/</span>
            <span className="text-warm-600 font-medium">Rapport d&apos;audit</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="flex items-start gap-5">
              <div className="w-16 h-16 rounded-full bg-warm-100 flex items-center justify-center shrink-0">
                <span className="text-xl font-semibold text-warm-600">{report.placeDetails.name.charAt(0)}</span>
              </div>
              <div>
                <h1 className="text-heading-xl text-warm-900">{report.placeDetails.name}</h1>
                <p className="text-body text-warm-500 mt-1">{report.placeDetails.address}</p>
                <div className="flex flex-wrap items-center gap-4 mt-3 text-sm">
                  <div className="flex items-center gap-1.5">
                    <RiStarFill className="w-4 h-4 fill-accent text-accent" />
                    <span className="font-semibold text-warm-800">{report.placeDetails.rating}</span>
                    <span className="text-warm-400">({report.placeDetails.userRatingCount} avis)</span>
                  </div>
                  {report.placeDetails.websiteUri && (
                    <a
                      href={report.placeDetails.websiteUri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-warm-700 hover:text-warm-900 transition-colors font-medium"
                    >
                      <RiGlobalLine className="w-3.5 h-3.5" />
                      Site web
                    </a>
                  )}
                  {report.placeDetails.phoneNumber && (
                    <span className="flex items-center gap-1.5 text-warm-500">
                      <RiPhoneFill className="w-3.5 h-3.5" />
                      {report.placeDetails.phoneNumber}
                    </span>
                  )}
                  {report.placeDetails.primaryTypeDisplayName && (
                    <span className="px-3 py-1 rounded-full bg-accent-light text-warm-800 text-xs font-medium border border-accent/20">
                      {report.placeDetails.primaryTypeDisplayName}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <ScoreGauge score={report.overallScore} size={160} />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10 space-y-12">
        {/* AI Summary */}
        <ReportSection
          icon={<RiFileTextLine className="w-4 h-4" />}
          label="Résumé"
          title="Résumé de l'audit"
          subtitle="Analyse personnalisée de votre fiche Google Business Profile"
          gated={!emailUnlocked}
          onGatedClick={handleGatedClick}
        >
          <div className="card">
            <p className="text-body text-warm-700 leading-relaxed">{report.aiSummary}</p>
          </div>
        </ReportSection>

        {/* Criteria Grid */}
        <ReportSection
          icon={<RiTaskLine className="w-4 h-4" />}
          label="Analyse"
          title="Résultats de l'audit"
          subtitle="Évaluation détaillée basée sur les données réelles de votre fiche"
        >
          <AuditGrid criteria={report.criteriaResults} />
        </ReportSection>

        {/* Revenue Estimate */}
        <ReportSection
          icon={<RiLineChartLine className="w-4 h-4" />}
          label="Impact"
          title="Impact financier"
          subtitle="Estimation du manque à gagner basée sur vos mots-clés"
        >
          <RevenueEstimate
            amount={report.revenueEstimate}
            explanation={report.revenueExplanation}
          />
        </ReportSection>

        {/* Competitors */}
        <ReportSection
          icon={<RiGroupFill className="w-4 h-4" />}
          label="Concurrence"
          title="Top concurrents"
          subtitle={`Les ${report.competitors.length} mieux classés dans un rayon de ${report.config.zoneRadiusKm} km`}
        >
          {report.competitors.length > 0 ? (
            <CompetitorsList
              competitors={report.competitors}
              businessName={report.placeDetails.name}
            />
          ) : (
            <div className="card text-center py-10">
              <p className="text-warm-500">Aucun concurrent trouvé dans cette zone pour ce type d&apos;activité.</p>
            </div>
          )}
        </ReportSection>

        {/* Heatmap */}
        <ReportSection
          icon={<RiMapLine className="w-4 h-4" />}
          label="Heatmap"
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
                    className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                      activeHeatmapKeyword === kw.keyword
                        ? 'bg-warm-900 text-white shadow-soft'
                        : 'bg-white text-warm-600 border border-warm-200 hover:border-warm-300'
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
              gridSize={5}
              centerLat={report.config.businessLat}
              centerLng={report.config.businessLng}
              radiusKm={report.config.zoneRadiusKm}
            />
          </div>
        </ReportSection>

        {/* Optimization Suggestions */}
        <ReportSection
          icon={<RiToolsLine className="w-4 h-4" />}
          label="Optimisation"
          title="Recommandations d'optimisation"
          subtitle="Actions concrètes basées sur l'analyse de votre fiche"
          gated={!emailUnlocked}
          onGatedClick={handleGatedClick}
        >
          {report.suggestions.length > 0 ? (
            <OptimizationSuggestions suggestions={report.suggestions} />
          ) : (
            <div className="card bg-positive/5 border-positive/20 text-center py-10">
              <p className="text-positive font-semibold">Tous les critères vérifiables sont validés !</p>
            </div>
          )}
        </ReportSection>

        {/* AI Visibility */}
        <ReportSection
          icon={<RiSparklingFill className="w-4 h-4" />}
          label="IA"
          title="Visibilité IA"
          subtitle="Votre présence dans les assistants IA"
          gated={!emailUnlocked}
          onGatedClick={handleGatedClick}
        >
          <AIVisibilityGrid results={report.aiVisibility} />
        </ReportSection>

        {/* Final CTA */}
        <AnimatedSection>
          <div className="relative overflow-hidden rounded-[3rem] bg-warm-900 text-white p-10 sm:p-14">
            <div className="absolute top-0 right-0 w-72 h-72 bg-accent/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
            <div className="absolute bottom-0 left-0 w-56 h-56 bg-accent/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />

            <div className="relative text-center max-w-xl mx-auto">
              <h2 className="text-heading-xl sm:text-display md:text-display-lg text-white mb-4">
                Prêt à dominer <span className="serif-accent">Google Maps</span> ?
              </h2>
              <p className="text-body-lg text-white/50 mb-8">
                Nos experts optimisent votre fiche Google Business Profile pour maximiser votre visibilité locale.
              </p>
              <button className="btn-accent">
                Commencer l&apos;optimisation
              </button>
              <div className="flex items-center justify-center gap-8 mt-8 text-sm text-white/30">
                <span>À partir de 99€/mois</span>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <span>Sans engagement</span>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <span>Résultats sous 30 jours</span>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </main>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-warm-100 mt-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-body-sm text-warm-400">
          <div className="flex items-center gap-2">
            <img src="/logo.svg" alt="Siva" className="h-5" />
          </div>
          <div className="flex items-center gap-4">
            <a href={report.placeDetails.googleMapsUri} target="_blank" rel="noopener noreferrer" className="hover:text-warm-600 flex items-center gap-1.5 transition-colors">
              Voir sur Google Maps <RiExternalLinkLine className="w-3 h-3" />
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

interface ReportSectionProps {
  icon?: React.ReactNode;
  label: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  gated?: boolean;
  onGatedClick?: () => void;
}

function ReportSection({ icon, label, title, subtitle, children, gated, onGatedClick }: ReportSectionProps) {
  return (
    <AnimatedSection>
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-2">
          {icon && <span className="text-warm-400">{icon}</span>}
          <span className="section-label">{label}</span>
        </div>
        <h2 className="text-heading-lg text-warm-900">{title}</h2>
        <p className="text-body-sm text-warm-500 mt-1">{subtitle}</p>
      </div>

      {gated ? (
        <div className="relative">
          <div className="filter blur-sm pointer-events-none select-none">{children}</div>
          <div className="absolute inset-0 flex items-center justify-center bg-warm-bg/50 backdrop-blur-[2px] rounded-2xl">
            <button
              onClick={onGatedClick}
              className="flex items-center gap-4 bg-white shadow-elevated px-7 py-5 rounded-full border border-warm-100 hover:shadow-card hover:border-warm-200 transition-all duration-200 hover:scale-[1.02]"
            >
              <div className="w-10 h-10 rounded-full bg-accent-light flex items-center justify-center">
                <RiLockLine className="w-5 h-5 text-accent-dark" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-warm-900 text-sm">Contenu verrouillé</p>
                <p className="text-xs text-warm-500">Entrez votre email pour débloquer</p>
              </div>
              <RiArrowRightLine className="w-4 h-4 text-warm-400" />
            </button>
          </div>
        </div>
      ) : (
        children
      )}
    </AnimatedSection>
  );
}

export default function ReportPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-warm-bg flex items-center justify-center">
        <RiLoader4Line className="w-8 h-8 animate-spin text-warm-400" />
      </div>
    }>
      <ReportContent />
    </Suspense>
  );
}
