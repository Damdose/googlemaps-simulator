'use client';

import { useState, FormEvent } from 'react';
import {
  RiMapPin2Fill,
  RiPhoneFill,
  RiMailFill,
  RiTimeFill,
  RiCheckboxCircleFill,
  RiWhatsappFill,
} from 'react-icons/ri';

const CONTACT_INFO = [
  { Icon: RiMapPin2Fill, label: 'Adresse', value: 'Paris, France' },
  { Icon: RiPhoneFill, label: 'Téléphone', value: '+33 7 60 55 40 00', href: 'tel:+33760554000' },
  { Icon: RiMailFill, label: 'Email', value: 'contact@siva.local', href: 'mailto:contact@siva.local' },
  { Icon: RiTimeFill, label: 'Horaires', value: 'Lun – Ven, 9h – 18h' },
];

export default function ContactPage() {
  const [formState, setFormState] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', message: '' });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormState('sending');
    setTimeout(() => setFormState('sent'), 1200);
  }

  return (
    <main className="px-4 sm:px-6 pb-14 sm:pb-24 pt-8 sm:pt-12">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10 sm:mb-16 text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-accent-dark">
            Contact
          </p>
          <h1 className="text-balance text-heading-xl text-warm-900 sm:text-display">
            Parlons de votre <span className="serif-accent">visibilité locale</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-body-sm sm:text-body-lg text-warm-500">
            Une question, un projet, une demande de devis ? Remplissez le formulaire ou contactez-nous directement.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          {/* Infos de contact */}
          <div className="flex flex-col gap-6">
            <div className="rounded-2xl sm:rounded-3xl border border-warm-200 bg-white p-5 sm:p-8 shadow-soft">
              <h2 className="mb-6 text-xl font-semibold text-warm-900">Nos coordonnées</h2>
              <div className="space-y-5">
                {CONTACT_INFO.map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-light text-accent-dark">
                      <item.Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-warm-400">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-sm font-medium text-warm-800 transition-colors hover:text-accent-dark">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium text-warm-800">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <a
              href="https://wa.me/33760554000?text=Bonjour%2C%20je%20souhaite%20en%20savoir%20plus%20sur%20vos%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-2xl sm:rounded-3xl border border-[#25D366]/20 bg-[#25D366]/5 p-6 transition-all hover:border-[#25D366]/40 hover:bg-[#25D366]/10"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#25D366] text-white">
                <RiWhatsappFill className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-semibold text-warm-900">Écrire sur WhatsApp</p>
                <p className="text-xs text-warm-500">Réponse rapide, généralement sous 1h</p>
              </div>
            </a>

            <div className="rounded-2xl sm:rounded-3xl border border-warm-200 bg-warm-50 p-5 sm:p-8">
              <h3 className="mb-3 text-lg font-medium text-warm-900">Pourquoi nous contacter ?</h3>
              <ul className="space-y-3">
                {[
                  'Obtenir un devis personnalisé',
                  'Poser des questions sur nos services',
                  'Planifier un audit gratuit',
                  'Discuter de votre stratégie locale',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-warm-600">
                    <RiCheckboxCircleFill className="h-4 w-4 shrink-0 text-accent-dark" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Formulaire */}
          <div className="rounded-2xl sm:rounded-3xl border border-warm-200 bg-white p-5 sm:p-8 shadow-soft lg:p-10">
            {formState === 'sent' ? (
              <div className="flex h-full flex-col items-center justify-center py-12 text-center">
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-positive/10">
                  <RiCheckboxCircleFill className="h-8 w-8 text-positive" />
                </div>
                <h3 className="text-2xl font-medium text-warm-900">Message envoyé !</h3>
                <p className="mt-3 max-w-sm text-sm text-warm-500">
                  Merci pour votre message. Notre équipe vous répondra dans les 24h ouvrées.
                </p>
                <button
                  onClick={() => { setFormState('idle'); setForm({ name: '', email: '', phone: '', company: '', message: '' }); }}
                  className="mt-8 text-sm font-semibold text-accent-dark transition-colors hover:underline"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <>
                <h2 className="mb-2 text-xl font-semibold text-warm-900">Envoyez-nous un message</h2>
                <p className="mb-8 text-sm text-warm-500">Nous vous répondrons dans les 24h.</p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-warm-400">
                        Nom complet *
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Jean Dupont"
                        className="w-full rounded-xl border border-warm-200 bg-warm-50 px-4 py-3 text-sm text-warm-800 outline-none transition-colors placeholder:text-warm-400 focus:border-accent focus:ring-2 focus:ring-accent/20"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-warm-400">
                        Email *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="jean@monentreprise.fr"
                        className="w-full rounded-xl border border-warm-200 bg-warm-50 px-4 py-3 text-sm text-warm-800 outline-none transition-colors placeholder:text-warm-400 focus:border-accent focus:ring-2 focus:ring-accent/20"
                      />
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="phone" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-warm-400">
                        Téléphone
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="06 12 34 56 78"
                        className="w-full rounded-xl border border-warm-200 bg-warm-50 px-4 py-3 text-sm text-warm-800 outline-none transition-colors placeholder:text-warm-400 focus:border-accent focus:ring-2 focus:ring-accent/20"
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-warm-400">
                        Entreprise
                      </label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        value={form.company}
                        onChange={handleChange}
                        placeholder="Mon Commerce"
                        className="w-full rounded-xl border border-warm-200 bg-warm-50 px-4 py-3 text-sm text-warm-800 outline-none transition-colors placeholder:text-warm-400 focus:border-accent focus:ring-2 focus:ring-accent/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-warm-400">
                      Votre message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Décrivez votre besoin, votre activité, vos objectifs..."
                      className="w-full resize-none rounded-xl border border-warm-200 bg-warm-50 px-4 py-3 text-sm text-warm-800 outline-none transition-colors placeholder:text-warm-400 focus:border-accent focus:ring-2 focus:ring-accent/20"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formState === 'sending'}
                    className="btn-primary w-full disabled:opacity-60"
                  >
                    {formState === 'sending' ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Envoi en cours...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Envoyer le message
                      </span>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
