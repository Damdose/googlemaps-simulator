'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, ArrowLeft, CheckCircle, Star, SealCheck,
  MagnifyingGlass, MapPin, SpinnerGap,
  Lightning, Shield, Clock, TrendUp, Rocket, Gift,
  Trophy, Fire, Crown, Users,
} from '@phosphor-icons/react';

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */

interface PlaceInfo {
  placeId: string;
  name: string;
  address: string;
  rating: number;
  userRatingCount: number;
}

interface AutocompleteResult {
  placeId: string;
  mainText: string;
  secondaryText: string;
}

type FunnelPath = 'launch' | 'quote';

interface FunnelAnswers {
  place: PlaceInfo | null;
  targetRating: number;
  reviewCount: number;
  path: FunnelPath | null;
  nom: string;
  email: string;
  telephone: string;
}

/* ─────────────────────────────────────────────
   Formule & Pricing
   n = 1.1 × (N₀ × (Rt − R₀)) / (5 − Rt)
───────────────────────────────────────────── */

const MAX_REVIEWS = 500;
const REVIEWS_PER_MONTH = 15;
const REMAINING_SPOTS = 7;
const FREE_REVIEWS_BONUS = 10;

function calculateReviewsNeeded(R0: number, N0: number, Rt: number): number {
  if (Rt >= 5 || N0 <= 0) return 20;
  if (Rt <= R0) return 0;
  const raw = Math.ceil(1.1 * (N0 * (Rt - R0)) / (5 - Rt));
  return Math.max(20, Math.min(raw, MAX_REVIEWS));
}

function reviewsToSurpass(R0: number, N0: number, Rc: number): number {
  if (Rc <= R0) return 0;
  if (Rc >= 5 || N0 <= 0) return MAX_REVIEWS + 1;
  return Math.min(Math.ceil(1.1 * (N0 * (Rc - R0)) / (5 - Rc)), MAX_REVIEWS + 1);
}

function computePrice(n: number): number {
  if (n <= 0) return 0;
  if (n <= 100) return Math.round(n * 24.5);
  if (n <= 200) return Math.round(100 * 24.5 + (n - 100) * 22);
  return Math.round(100 * 24.5 + 100 * 22 + (n - 200) * 17.6);
}

function getUnitPrice(n: number): string {
  if (n <= 100) return '24,5';
  if (n <= 200) return '22';
  return '17,6';
}

function generateCompetitors(place: PlaceInfo) {
  const r = place.rating;
  const c = place.userRatingCount;
  return [
    { name: 'Leader de votre zone', rating: Math.min(4.9, +(r + 0.4).toFixed(1)), reviews: Math.max(c + 80, Math.floor(c * 1.5)), threat: true },
    { name: 'Concurrent direct', rating: Math.min(4.8, +(r + 0.2).toFixed(1)), reviews: Math.max(c + 30, Math.floor(c * 1.1)), threat: true },
    { name: 'Autre concurrent', rating: Math.max(3.5, +(r - 0.1).toFixed(1)), reviews: Math.max(10, Math.floor(c * 0.6)), threat: false },
  ];
}

/* ─────────────────────────────────────────────
   Helpers UI
───────────────────────────────────────────── */

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 48 : -48, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -48 : 48, opacity: 0 }),
};

const FIELD =
  'w-full rounded-xl border border-warm-200 bg-warm-50 px-4 py-3 text-sm text-warm-800 outline-none transition-colors placeholder:text-warm-400 focus:border-accent focus:ring-2 focus:ring-accent/20';

function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(value);
  const frameRef = useRef(0);
  const currentRef = useRef(value);

  useEffect(() => {
    const start = currentRef.current;
    if (Math.abs(start - value) < 1) {
      setDisplay(value);
      currentRef.current = value;
      return;
    }
    const t0 = performance.now();
    const dur = 400;
    function tick(t: number) {
      const p = Math.min((t - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const v = Math.round(start + (value - start) * eased);
      currentRef.current = v;
      setDisplay(v);
      if (p < 1) frameRef.current = requestAnimationFrame(tick);
      else currentRef.current = value;
    }
    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [value]);

  return <>{display.toLocaleString('fr-FR')}</>;
}

/* ─────────────────────────────────────────────
   Composant principal
───────────────────────────────────────────── */

export default function BoostAvisFunnel({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [answers, setAnswers] = useState<FunnelAnswers>({
    place: null, targetRating: 4.5, reviewCount: 0, path: null,
    nom: '', email: '', telephone: '',
  });

  const progress = step >= 4 ? 100 : Math.round((step / 4) * 100);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => {
        setStep(0); setDirection(1); setSubmitting(false);
        setAnswers({ place: null, targetRating: 4.5, reviewCount: 0, path: null, nom: '', email: '', telephone: '' });
      }, 350);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  function go(delta: number) { setDirection(delta); setStep((s) => s + delta); }

  function onPlaceSelected(place: PlaceInfo) {
    const defaultTarget = Math.min(+(place.rating + 0.3).toFixed(1), 4.9);
    const initialReviews = calculateReviewsNeeded(place.rating, place.userRatingCount, defaultTarget);
    setAnswers((a) => ({ ...a, place, targetRating: defaultTarget, reviewCount: initialReviews, nom: place.name }));
    go(1);
  }

  function onTargetConfirmed(targetRating: number, reviewCount: number) {
    setAnswers((a) => ({ ...a, targetRating, reviewCount }));
    go(1);
  }

  function onPathChosen(path: FunnelPath, count: number) {
    setAnswers((a) => ({ ...a, path, reviewCount: count }));
    go(1);
  }

  async function handleSubmit() {
    if (!answers.email) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitting(false);
    go(1);
  }

  const labels = ['Votre établissement', 'Votre objectif', 'Votre plan', 'Vos coordonnées', ''];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4"
          style={{ background: 'rgba(26,23,20,0.82)', backdropFilter: 'blur(10px)' }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            initial={{ scale: 0.98, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.98, opacity: 0, y: 20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full sm:max-w-lg bg-white sm:rounded-3xl rounded-t-3xl shadow-[0_40px_100px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col"
            style={{ maxHeight: '92vh' }}
          >
            {/* Progress */}
            <div className="h-1 bg-warm-100 w-full shrink-0">
              <motion.div className="h-full bg-accent rounded-full" animate={{ width: `${progress}%` }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-5 sm:px-7 pt-5 pb-1 shrink-0">
              <div className="flex items-center gap-3">
                {step > 0 && step < 4 && (
                  <button onClick={() => go(-1)} className="flex h-7 w-7 items-center justify-center rounded-full text-warm-400 hover:text-warm-800 transition-colors">
                    <ArrowLeft weight="bold" className="h-4 w-4" />
                  </button>
                )}
                {step < 4 ? (
                  <span className="text-xs font-semibold uppercase tracking-widest text-warm-400">{labels[step]}</span>
                ) : (
                  <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-positive">
                    <CheckCircle weight="fill" className="h-3.5 w-3.5" />
                    {answers.path === 'launch' ? 'Campagne réservée' : 'Devis envoyé'}
                  </span>
                )}
              </div>
              <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full bg-warm-100 text-warm-500 transition-colors hover:bg-warm-200 hover:text-warm-900">
                <X weight="bold" className="h-4 w-4" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto overscroll-contain">
              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  key={step} custom={direction} variants={slideVariants}
                  initial="enter" animate="center" exit="exit"
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="px-5 sm:px-7 pb-7 pt-4"
                >
                  {step === 0 && <StepSearch onSelect={onPlaceSelected} />}
                  {step === 1 && answers.place && (
                    <StepTargetRating place={answers.place} initialTarget={answers.targetRating} onConfirm={onTargetConfirmed} />
                  )}
                  {step === 2 && answers.place && (
                    <StepOffer place={answers.place} targetRating={answers.targetRating} reviewCount={answers.reviewCount} onChoose={onPathChosen} />
                  )}
                  {step === 3 && (
                    <StepForm answers={answers} submitting={submitting} onSubmit={handleSubmit} onChange={(k, v) => setAnswers((a) => ({ ...a, [k]: v }))} />
                  )}
                  {step === 4 && <StepConfirmation answers={answers} onClose={onClose} />}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────
   Step 0 — Recherche Google Places
───────────────────────────────────────────── */

function StepSearch({ onSelect }: { onSelect: (p: PlaceInfo) => void }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<AutocompleteResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [loadingPlace, setLoadingPlace] = useState<string | null>(null);
  const [selected, setSelected] = useState<PlaceInfo | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sessionToken = useRef(crypto.randomUUID());

  const search = useCallback(async (q: string) => {
    if (q.length < 2) { setSuggestions([]); return; }
    setSearching(true);
    try {
      const res = await fetch('/api/audit/search-place', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: q, sessionToken: sessionToken.current }),
      });
      const data = await res.json();
      setSuggestions(data.results ?? []);
    } catch { setSuggestions([]); } finally { setSearching(false); }
  }, []);

  function handleInput(value: string) {
    setQuery(value);
    setSelected(null);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => search(value), 320);
  }

  async function handleSelect(s: AutocompleteResult) {
    setLoadingPlace(s.placeId);
    setSuggestions([]);
    try {
      const res = await fetch(`/api/audit/place-details?place_id=${s.placeId}`);
      const data = await res.json();
      const place: PlaceInfo = {
        placeId: s.placeId, name: data.name ?? s.mainText, address: data.address ?? s.secondaryText,
        rating: data.rating ?? 0, userRatingCount: data.userRatingCount ?? 0,
      };
      setSelected(place);
      setQuery(place.name);
    } catch {
      setSelected({ placeId: s.placeId, name: s.mainText, address: s.secondaryText, rating: 0, userRatingCount: 0 });
    } finally { setLoadingPlace(null); }
  }

  return (
    <div>
      <h2 className="text-xl font-light text-warm-900 mb-1">
        Trouvez votre <span className="font-medium">établissement sur Google</span>
      </h2>
      <p className="text-sm text-warm-500 mb-5">On récupère automatiquement votre note et vos avis actuels.</p>

      <div className="relative mb-3">
        <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
          {searching || loadingPlace ? (
            <SpinnerGap weight="bold" className="h-4 w-4 text-warm-400 animate-spin" />
          ) : (
            <MagnifyingGlass weight="bold" className="h-4 w-4 text-warm-400" />
          )}
        </div>
        <input
          type="text" value={query} onChange={(e) => handleInput(e.target.value)}
          placeholder="Ex : Le Bouillon Chartier, Paris" autoFocus
          className="w-full rounded-2xl border border-warm-200 bg-warm-50 pl-10 pr-4 py-3.5 text-sm text-warm-800 outline-none transition-colors placeholder:text-warm-400 focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
      </div>

      <AnimatePresence>
        {suggestions.length > 0 && !selected && (
          <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.2 }}
            className="mb-3 overflow-hidden rounded-2xl border border-warm-200 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
            {suggestions.slice(0, 5).map((s, i) => (
              <button key={s.placeId} onClick={() => handleSelect(s)} disabled={!!loadingPlace}
                className={`flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-warm-50 ${i > 0 ? 'border-t border-warm-100' : ''}`}>
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-warm-100">
                  <MapPin weight="fill" className="h-4 w-4 text-warm-500" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-warm-900 truncate">{s.mainText}</p>
                  <p className="text-xs text-warm-400 truncate">{s.secondaryText}</p>
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
            <div className="rounded-2xl border border-warm-200 bg-warm-50 p-4 mb-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white border border-warm-200">
                  <MapPin weight="fill" className="h-5 w-5 text-accent-dark" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-warm-900 leading-snug">{selected.name}</p>
                  <p className="text-xs text-warm-400 mt-0.5 truncate">{selected.address}</p>
                  <div className="mt-2.5 flex items-center gap-3">
                    <div className="flex items-center gap-1.5 rounded-full bg-white border border-warm-200 px-3 py-1">
                      <Star weight="fill" className="h-3.5 w-3.5 text-[#FBBC04]" />
                      <span className="text-xs font-bold text-warm-800">{selected.rating > 0 ? selected.rating.toFixed(1).replace('.', ',') : '—'}</span>
                    </div>
                    <div className="flex items-center gap-1 rounded-full bg-white border border-warm-200 px-3 py-1">
                      <span className="text-xs font-semibold text-warm-700">{selected.userRatingCount > 0 ? selected.userRatingCount.toLocaleString('fr-FR') : '—'}</span>
                      <span className="text-xs text-warm-400">avis</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button onClick={() => onSelect(selected)} className="btn-primary w-full justify-center">
              C&apos;est bien mon établissement
            </button>
            <button onClick={() => { setSelected(null); setQuery(''); setSuggestions([]); }} className="btn-secondary mt-2 w-full text-center text-sm">
              Chercher un autre lieu
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {!selected && !searching && query.length > 1 && suggestions.length === 0 && (
        <p className="text-center text-sm text-warm-400 mt-4">Aucun résultat — essayez avec le nom exact ou une adresse.</p>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Step 1 — Molette note cible + calcul live
───────────────────────────────────────────── */

function StepTargetRating({ place, initialTarget, onConfirm }: {
  place: PlaceInfo; initialTarget: number;
  onConfirm: (target: number, reviews: number) => void;
}) {
  const minTarget = Math.min(+(Math.ceil(place.rating * 10 + 1) / 10).toFixed(1), 4.9);
  const maxTarget = 4.9;
  const [target, setTarget] = useState(Math.max(initialTarget, minTarget));

  const reviewsNeeded = calculateReviewsNeeded(place.rating, place.userRatingCount, target);
  const totalPrice = computePrice(reviewsNeeded);
  const months = Math.max(1, Math.ceil(reviewsNeeded / REVIEWS_PER_MONTH));
  const sliderPercent = maxTarget > minTarget ? ((target - minTarget) / (maxTarget - minTarget)) * 100 : 50;

  if (minTarget > 4.9) {
    return (
      <div className="text-center py-8">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-positive/10 mb-4">
          <Trophy weight="fill" className="h-8 w-8 text-positive" />
        </div>
        <h2 className="text-xl font-medium text-warm-900 mb-2">Votre note est déjà excellente !</h2>
        <p className="text-sm text-warm-500 max-w-xs mx-auto">
          Avec {place.rating.toFixed(1).replace('.', ',')} de note, vous êtes dans le top. Nos ambassadeurs peuvent vous aider à maintenir ce niveau et augmenter votre volume d&apos;avis.
        </p>
        <button onClick={() => onConfirm(place.rating, 50)} className="btn-primary mt-6 w-full justify-center">
          Voir les options
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Place badge */}
      <div className="mb-5 flex items-center gap-3 rounded-2xl bg-warm-50 border border-warm-200 px-4 py-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white border border-warm-200">
          <MapPin weight="fill" className="h-4 w-4 text-accent-dark" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-warm-900 truncate">{place.name}</p>
          <div className="mt-0.5 flex items-center gap-2">
            <Star weight="fill" className="h-3 w-3 text-[#FBBC04]" />
            <span className="text-xs font-bold text-warm-700">{place.rating > 0 ? place.rating.toFixed(1).replace('.', ',') : '—'}</span>
            <span className="text-warm-200">·</span>
            <span className="text-xs text-warm-400">{place.userRatingCount.toLocaleString('fr-FR')} avis</span>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-light text-warm-900 mb-1">
        Quelle note voulez-vous <span className="font-medium">atteindre ?</span>
      </h2>
      <p className="text-sm text-warm-500 mb-8">Déplacez le curseur et voyez le résultat en temps réel.</p>

      {/* Big target display */}
      <div className="text-center mb-6">
        <motion.div key={target.toFixed(1)} initial={{ scale: 0.95, opacity: 0.7 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.15 }}
          className="inline-flex flex-col items-center">
          <span className="text-6xl font-semibold text-warm-900 tabular-nums leading-none">
            {target.toFixed(1).replace('.', ',')}
          </span>
          <div className="mt-3 flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} weight={i < Math.round(target) ? 'fill' : 'regular'}
                className={`h-5 w-5 transition-colors ${i < Math.round(target) ? 'text-[#FBBC04]' : 'text-warm-200'}`} />
            ))}
          </div>
          <span className="mt-2 text-sm font-medium text-positive">
            +{(target - place.rating).toFixed(1).replace('.', ',')} point{(target - place.rating) >= 0.2 ? 's' : ''}
          </span>
        </motion.div>
      </div>

      {/* Slider */}
      <div className="mb-8 px-1">
        <input
          type="range" min={Math.round(minTarget * 10)} max={Math.round(maxTarget * 10)} step={1}
          value={Math.round(target * 10)}
          onChange={(e) => setTarget(Number(e.target.value) / 10)}
          className="pricing-slider w-full"
          style={{ background: `linear-gradient(to right, #D4A82E 0%, #D4A82E ${sliderPercent}%, #E3DCD2 ${sliderPercent}%, #E3DCD2 100%)` }}
        />
        <div className="mt-1.5 flex justify-between text-xs text-warm-300">
          <span>{minTarget.toFixed(1).replace('.', ',')}</span>
          <span>{maxTarget.toFixed(1).replace('.', ',')}</span>
        </div>
      </div>

      {/* Live stats */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="rounded-2xl border border-warm-200 bg-warm-50 p-4 text-center">
          <p className="text-[10px] font-bold uppercase tracking-widest text-warm-400 mb-1">Avis nécessaires</p>
          <p className="text-3xl font-semibold text-warm-900 tabular-nums leading-none">
            <AnimatedNumber value={reviewsNeeded} />
          </p>
          <p className="text-xs text-warm-400 mt-1">avis 5 étoiles</p>
        </div>
        <div className="rounded-2xl border border-accent/30 bg-accent/[0.04] p-4 text-center">
          <p className="text-[10px] font-bold uppercase tracking-widest text-warm-400 mb-1">Investissement</p>
          <p className="text-3xl font-semibold text-warm-900 tabular-nums leading-none">
            <AnimatedNumber value={totalPrice} /><span className="text-lg">€</span>
          </p>
          <p className="text-xs text-warm-400 mt-1">soit {getUnitPrice(reviewsNeeded)}€/avis</p>
        </div>
      </div>

      {/* Time estimate */}
      <div className="flex items-center justify-center gap-2 mb-6 text-sm text-warm-500">
        <Clock weight="bold" className="h-4 w-4 text-warm-400" />
        <span>Objectif atteint en <strong className="text-warm-800">~{months} mois</strong></span>
      </div>

      <button onClick={() => onConfirm(target, reviewsNeeded)} className="btn-primary w-full justify-center">
        Voir mon plan personnalisé
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Step 2 — Offre (concurrents, urgence, bonus, 2 CTAs)
───────────────────────────────────────────── */

function StepOffer({ place, targetRating, reviewCount: initial, onChoose }: {
  place: PlaceInfo; targetRating: number; reviewCount: number;
  onChoose: (path: FunnelPath, count: number) => void;
}) {
  const [count, setCount] = useState(initial);
  const competitors = generateCompetitors(place);
  const totalPrice = computePrice(count);
  const months = Math.max(1, Math.ceil(count / REVIEWS_PER_MONTH));
  const monthlyPrice = Math.round(totalPrice / months);
  const bonus100 = count >= 100;

  function adjust(delta: number) {
    setCount((c) => Math.max(20, Math.min(MAX_REVIEWS, c + delta)));
  }

  return (
    <div>
      <div className="text-center mb-5">
        <h2 className="text-xl font-light text-warm-900 mb-1">
          Votre plan pour atteindre <span className="font-semibold">{targetRating.toFixed(1).replace('.', ',')}/5</span>
        </h2>
        <p className="text-sm text-warm-500">
          Notre recommandation pour <strong className="text-warm-700">{place.name}</strong>
        </p>
      </div>

      {/* Recommended block */}
      <div className="rounded-2xl border-2 border-accent/40 bg-accent/[0.04] p-5 mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Trophy weight="fill" className="h-4 w-4 text-accent-dark" />
            <span className="text-xs font-bold uppercase tracking-wider text-accent-dark">Recommandé</span>
          </div>
          {bonus100 && (
            <span className="flex items-center gap-1 rounded-full bg-positive/10 px-2.5 py-1 text-[10px] font-bold text-positive">
              <Gift weight="fill" className="h-3 w-3" />
              Bonus inclus
            </span>
          )}
        </div>

        {/* Adjustable count */}
        <div className="flex items-center justify-center gap-4 mb-3">
          <button onClick={() => adjust(-10)} className="flex h-10 w-10 items-center justify-center rounded-full border border-warm-200 bg-white text-warm-600 hover:bg-warm-50 transition-colors text-lg font-semibold select-none">
            &minus;
          </button>
          <div className="text-center min-w-[100px]">
            <span className="text-5xl font-semibold text-warm-900 tabular-nums leading-none">{count}</span>
            <p className="text-xs text-warm-400 mt-1">avis 5 étoiles</p>
          </div>
          <button onClick={() => adjust(10)} className="flex h-10 w-10 items-center justify-center rounded-full border border-warm-200 bg-white text-warm-600 hover:bg-warm-50 transition-colors text-lg font-semibold select-none">
            +
          </button>
        </div>

        <div className="h-px bg-accent/20 mb-3" />

        <div className="flex items-center justify-between text-sm">
          <div>
            <span className="text-warm-400">Total </span>
            <span className="font-semibold text-warm-900">{totalPrice.toLocaleString('fr-FR')}€</span>
            <span className="text-warm-400 text-xs"> HT</span>
          </div>
          <div>
            <span className="text-warm-400">~</span>
            <span className="font-semibold text-warm-900">{monthlyPrice.toLocaleString('fr-FR')}€</span>
            <span className="text-warm-400 text-xs"> /mois sur {months} mois</span>
          </div>
        </div>
      </div>

      {/* Competitors */}
      <div className="mb-4">
        <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-warm-400 mb-2">
          <TrendUp weight="bold" className="h-3.5 w-3.5" />
          Vos concurrents dans la zone
        </p>
        <div className="space-y-2">
          {competitors.map((comp, i) => {
            const needed = reviewsToSurpass(place.rating, place.userRatingCount, comp.rating);
            const mToSurpass = Math.max(1, Math.ceil(needed / REVIEWS_PER_MONTH));
            const willSurpass = needed <= count;
            return (
              <div key={i} className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 ${willSurpass ? 'border-positive/30 bg-positive/[0.04]' : 'border-warm-200 bg-warm-50'}`}>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-warm-700 truncate">{comp.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Star weight="fill" className="h-3 w-3 text-[#FBBC04]" />
                    <span className="text-xs font-bold text-warm-600">{comp.rating.toFixed(1)}</span>
                    <span className="text-[10px] text-warm-400">({comp.reviews} avis)</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  {!comp.threat || needed === 0 ? (
                    <span className="text-[10px] font-bold text-positive flex items-center gap-1">
                      <CheckCircle weight="fill" className="h-3 w-3" /> Déjà devant
                    </span>
                  ) : willSurpass ? (
                    <span className="text-[10px] font-bold text-positive flex items-center gap-1">
                      <CheckCircle weight="fill" className="h-3 w-3" /> Dépassé en ~{mToSurpass} mois
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-warm-400">{needed} avis pour dépasser</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Urgency */}
      <div className="flex items-center gap-2.5 rounded-xl bg-red-50 border border-red-200/60 px-4 py-3 mb-3">
        <Fire weight="fill" className="h-4 w-4 text-red-500 shrink-0 animate-pulse" />
        <p className="text-xs text-red-700">
          <strong>Plus que {REMAINING_SPOTS} places</strong> disponibles ce mois pour votre zone.
        </p>
      </div>

      {/* Bonus 100+ */}
      {bonus100 && (
        <div className="flex items-center gap-2.5 rounded-xl bg-accent/[0.06] border border-accent/30 px-4 py-3 mb-4">
          <Crown weight="fill" className="h-4 w-4 text-accent-dark shrink-0" />
          <p className="text-xs text-warm-700">
            <strong>Bonus 100+ avis :</strong> Optimisation complète de votre fiche Google + stratégie SEO local offerte.
          </p>
        </div>
      )}

      {!bonus100 && <div className="mb-4" />}

      {/* CTA 1 — Lancer */}
      <button onClick={() => onChoose('launch', count)} className="btn-accent btn-hero w-full justify-center relative">
        <Lightning weight="fill" className="h-4 w-4" />
        Lancer ma campagne
      </button>
      <p className="text-center text-[11px] text-positive font-semibold mt-1.5 mb-3">
        <Gift weight="fill" className="inline h-3 w-3 mr-0.5 -mt-0.5" />
        {FREE_REVIEWS_BONUS} avis offerts en réservant maintenant
      </p>

      {/* CTA 2 — Devis */}
      <button onClick={() => onChoose('quote', count)} className="btn-secondary w-full text-center text-sm">
        Recevoir mon devis par email
      </button>

      {/* Trust */}
      <div className="mt-4 flex items-center justify-center gap-4 text-[10px] text-warm-400">
        <span className="flex items-center gap-1"><Shield weight="fill" className="h-3 w-3" /> Paiement sécurisé</span>
        <span className="flex items-center gap-1"><SealCheck weight="fill" className="h-3 w-3" /> Satisfait ou remboursé</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Step 3 — Formulaire ultra-conversion
───────────────────────────────────────────── */

function StepForm({ answers, submitting, onSubmit, onChange }: {
  answers: FunnelAnswers; submitting: boolean; onSubmit: () => void;
  onChange: (k: keyof FunnelAnswers, v: string) => void;
}) {
  const isLaunch = answers.path === 'launch';
  const totalPrice = computePrice(answers.reviewCount);
  const canSubmit = !!answers.nom && !!answers.email;

  return (
    <div>
      {isLaunch ? (
        <>
          <div className="text-center mb-5">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-positive/10 px-3 py-1.5 mb-3">
              <Gift weight="fill" className="h-3.5 w-3.5 text-positive" />
              <span className="text-xs font-bold text-positive">{FREE_REVIEWS_BONUS} avis offerts inclus</span>
            </div>
            <h2 className="text-xl font-light text-warm-900">
              Réservez votre <span className="font-semibold">campagne</span>
            </h2>
            <p className="text-sm text-warm-500 mt-1">
              {answers.reviewCount} avis · {totalPrice.toLocaleString('fr-FR')}€ HT
            </p>
          </div>

          {/* Reassurance steps */}
          <div className="mb-5 space-y-2">
            {[
              { icon: CheckCircle, text: 'Validation de votre éligibilité sous 24h' },
              { icon: Users, text: 'Sélection des ambassadeurs pour votre établissement' },
              { icon: Star, text: 'Premiers avis publiés sous 7 jours' },
              { icon: Rocket, text: 'Suivi personnalisé tout au long de la campagne' },
            ].map(({ icon: Icon, text }, i) => (
              <div key={i} className="flex items-center gap-2.5 rounded-xl bg-warm-50 border border-warm-200 px-3 py-2.5">
                <Icon weight="fill" className="h-4 w-4 text-accent-dark shrink-0" />
                <span className="text-xs text-warm-600">{text}</span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center mb-5">
          <h2 className="text-xl font-light text-warm-900">
            Recevez votre <span className="font-semibold">devis personnalisé</span>
          </h2>
          <p className="text-sm text-warm-500 mt-1">
            {answers.reviewCount} avis · Devis détaillé envoyé par email
          </p>
        </div>
      )}

      {/* Social proof */}
      <div className="flex items-center justify-center gap-2 mb-4 text-xs text-warm-500">
        <div className="flex -space-x-1.5">
          {['#1a73e8', '#e8710a', '#137333'].map((color) => (
            <div key={color} className="h-5 w-5 rounded-full border-2 border-white" style={{ background: color }} />
          ))}
        </div>
        <span>127 entreprises ont lancé leur campagne ce trimestre</span>
      </div>

      {/* Form */}
      <div className="space-y-3">
        <div>
          <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-warm-400">Établissement *</label>
          <input type="text" value={answers.nom} onChange={(e) => onChange('nom', e.target.value)} placeholder="Le Bouillon" className={FIELD} />
        </div>
        <div>
          <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-warm-400">Email *</label>
          <input type="email" value={answers.email} onChange={(e) => onChange('email', e.target.value)} placeholder="contact@moncommerce.fr" className={FIELD} autoFocus />
        </div>
        <div>
          <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-warm-400">
            Téléphone <span className="normal-case font-normal text-warm-300">(recommandé)</span>
          </label>
          <input type="tel" value={answers.telephone} onChange={(e) => onChange('telephone', e.target.value)} placeholder="06 12 34 56 78" className={FIELD} />
        </div>
      </div>

      {isLaunch ? (
        <button onClick={onSubmit} disabled={!canSubmit || submitting} className="btn-accent btn-hero mt-5 w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed">
          {submitting ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-dark/30 border-t-dark" />
              Réservation en cours...
            </span>
          ) : (
            <>
              <Lightning weight="fill" className="h-4 w-4" />
              Réserver ma campagne
            </>
          )}
        </button>
      ) : (
        <button onClick={onSubmit} disabled={!canSubmit || submitting} className="btn-primary mt-5 w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed">
          {submitting ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Envoi en cours...
            </span>
          ) : (
            'Recevoir mon devis'
          )}
        </button>
      )}

      {isLaunch && (
        <p className="text-center text-[10px] text-warm-400 mt-2">
          Paiement sécurisé par Stripe · Satisfait ou remboursé
        </p>
      )}

      {/* Urgency reminder */}
      {isLaunch && (
        <div className="flex items-center justify-center gap-2 mt-3 text-[10px] text-red-500 font-semibold">
          <Fire weight="fill" className="h-3 w-3" />
          Plus que {REMAINING_SPOTS} places ce mois
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Step 4 — Confirmation / Réassurance
───────────────────────────────────────────── */

function StepConfirmation({ answers, onClose }: { answers: FunnelAnswers; onClose: () => void }) {
  const isLaunch = answers.path === 'launch';

  return (
    <div className="flex flex-col items-center text-center py-4">
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 280, damping: 20, delay: 0.05 }}
        className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-positive/10"
      >
        {isLaunch ? <Rocket weight="fill" className="h-8 w-8 text-positive" /> : <CheckCircle weight="fill" className="h-8 w-8 text-positive" />}
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
        <h2 className="text-xl font-medium text-warm-900 mb-2">
          {isLaunch ? 'Campagne réservée !' : 'Devis envoyé !'}
        </h2>
        <p className="text-sm text-warm-500 max-w-xs mx-auto leading-relaxed">
          {isLaunch ? (
            <>
              Votre campagne de <strong className="text-warm-700">{answers.reviewCount} avis</strong> (+ {FREE_REVIEWS_BONUS} offerts) est en cours de réservation.
              Notre équipe vous contacte sous 24h.
            </>
          ) : (
            <>
              Votre devis personnalisé a été envoyé à <strong className="text-warm-700">{answers.email}</strong>.
              Un conseiller vous recontacte sous 24h.
            </>
          )}
        </p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
        className="mt-6 w-full space-y-2">
        {isLaunch ? (
          ['Vérification éligibilité (24h)', 'Sélection de vos ambassadeurs', 'Lancement campagne sous 7 jours', 'Premiers avis publiés'].map((text, i) => (
            <div key={i} className="flex items-start gap-2.5 rounded-2xl bg-warm-50 border border-warm-200 px-4 py-3 text-left">
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent-dark text-[10px] font-bold mt-0.5">
                {i + 1}
              </div>
              <p className="text-xs text-warm-600">{text}</p>
            </div>
          ))
        ) : (
          ['Devis détaillé envoyé par email', 'Un conseiller vous rappelle sous 24h', 'Possibilité de réserver à tout moment'].map((text, i) => (
            <div key={i} className="flex items-start gap-2.5 rounded-2xl bg-warm-50 border border-warm-200 px-4 py-3 text-left">
              <SealCheck weight="fill" className="mt-0.5 h-4 w-4 shrink-0 text-accent-dark" />
              <p className="text-xs text-warm-600">{text}</p>
            </div>
          ))
        )}
      </motion.div>

      <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
        onClick={onClose} className="btn-secondary mt-6 w-full text-center">
        Fermer
      </motion.button>
    </div>
  );
}
