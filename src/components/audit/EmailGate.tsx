'use client';

import { useState } from 'react';
import { RiCloseLine, RiLockUnlockLine, RiUserFill, RiMailLine, RiPhoneFill, RiShieldLine } from 'react-icons/ri';

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
      <div className="absolute inset-0 bg-warm-900/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-elevated p-8 sm:p-10">
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-warm-50 flex items-center justify-center hover:bg-warm-100 transition-colors"
          >
            <RiCloseLine className="w-4 h-4 text-warm-500" />
          </button>
        )}

        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full bg-accent-light border border-accent/20 flex items-center justify-center mx-auto mb-4">
            <RiLockUnlockLine className="w-6 h-6 text-accent-dark" />
          </div>
          <h3 className="text-heading-lg text-warm-900">Débloquez votre rapport</h3>
          <p className="text-body-sm text-warm-500 mt-2 max-w-xs mx-auto">
            Accédez à la heatmap, aux suggestions IA et au check de visibilité IA.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <RiUserFill className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-400" />
            <input
              type="text"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              placeholder="Prénom"
              required
              className="w-full pl-11 pr-5 py-4 rounded-full border border-warm-200 text-sm focus:border-warm-400 focus:ring-3 focus:ring-accent/10 outline-none transition-all duration-200"
            />
          </div>

          <div className="relative">
            <RiMailLine className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-400" />
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email professionnel"
              required
              className="w-full pl-11 pr-5 py-4 rounded-full border border-warm-200 text-sm focus:border-warm-400 focus:ring-3 focus:ring-accent/10 outline-none transition-all duration-200"
            />
          </div>

          <div className="relative">
            <RiPhoneFill className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-400" />
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="Téléphone (optionnel)"
              className="w-full pl-11 pr-5 py-4 rounded-full border border-warm-200 text-sm focus:border-warm-400 focus:ring-3 focus:ring-accent/10 outline-none transition-all duration-200"
            />
          </div>

          <label className="flex items-start gap-3 cursor-pointer py-1">
            <input
              type="checkbox"
              checked={wantsContact}
              onChange={e => setWantsContact(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded border-warm-300 text-warm-900 focus:ring-accent/20 accent-warm-900"
            />
            <span className="text-body-sm text-warm-600">
              Je souhaite être contacté par un expert pour optimiser ma fiche Google
            </span>
          </label>

          <button
            type="submit"
            disabled={!email || !firstName || isSubmitting}
            className="w-full btn-primary justify-center py-4 disabled:opacity-50 disabled:hover:shadow-none"
          >
            {isSubmitting ? 'Déverrouillage...' : 'Accéder à mon rapport complet'}
          </button>

          <p className="flex items-center justify-center gap-1.5 text-center text-xs text-warm-400">
            <RiShieldLine className="w-3 h-3" />
            Vos données sont protégées. Pas de spam.
          </p>
        </form>
      </div>
    </div>
  );
}
