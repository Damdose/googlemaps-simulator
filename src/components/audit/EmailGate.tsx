'use client';

import { useState } from 'react';
import { Lock, Mail, User, Phone, ArrowRight, X } from 'lucide-react';

interface EmailGateProps {
  onSubmit: (data: { email: string; firstName: string; phone?: string; wantsContact: boolean }) => void;
  onClose?: () => void;
}

export default function EmailGate({ onSubmit, onClose }: EmailGateProps) {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [phone, setPhone] = useState('');
  const [wantsContact, setWantsContact] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !firstName) return;

    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 800));
    onSubmit({ email, firstName, phone: phone || undefined, wantsContact });
    setIsSubmitting(false);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-warm-900/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-elevated p-8 animate-in fade-in zoom-in-95">
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-warm-100 flex items-center justify-center hover:bg-warm-200 transition-colors"
          >
            <X className="w-4 h-4 text-warm-600" />
          </button>
        )}

        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-primary-light flex items-center justify-center mx-auto mb-4">
            <Lock className="w-7 h-7 text-primary" />
          </div>
          <h3 className="text-xl font-bold text-warm-800">Débloquez votre rapport complet</h3>
          <p className="text-sm text-warm-500 mt-2">
            Accédez à la heatmap, aux suggestions IA et au check de visibilité IA.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-400" />
            <input
              type="text"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              placeholder="Prénom"
              required
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-warm-200 text-sm focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none"
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-400" />
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email professionnel"
              required
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-warm-200 text-sm focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none"
            />
          </div>

          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-400" />
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="Téléphone (optionnel)"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-warm-200 text-sm focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none"
            />
          </div>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={wantsContact}
              onChange={e => setWantsContact(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded border-warm-300 text-primary focus:ring-primary/20 accent-primary"
            />
            <span className="text-sm text-warm-600">
              Je souhaite être contacté par un expert pour optimiser ma fiche Google
            </span>
          </label>

          <button
            type="submit"
            disabled={!email || !firstName || isSubmitting}
            className="w-full flex items-center justify-center gap-2 bg-cta hover:bg-cta-hover disabled:opacity-50 text-white font-semibold py-3.5 rounded-xl transition-colors"
          >
            {isSubmitting ? 'Déverrouillage...' : 'Accéder à mon rapport complet'}
            <ArrowRight className="w-4 h-4" />
          </button>

          <p className="text-center text-xs text-warm-400">
            Vos données sont protégées. Pas de spam, promis.
          </p>
        </form>
      </div>
    </div>
  );
}
