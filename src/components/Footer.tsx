import Link from 'next/link';
import { CITIES } from '@/lib/cities';

const CONTACT_PHONE = '+33 7 60 55 40 00';
const CONTACT_PHONE_LINK = 'tel:+33760554000';

const SERVICE_LINKS = [
  { href: '/services/audit-gratuit', label: 'Audit Gratuit' },
  { href: '/services/optimisation-fiche-google', label: 'Optimisation Fiche Google' },
  { href: '/services/boost-avis-experience', label: 'Boost Avis Expérience' },
  { href: '/services/google-ads-local', label: 'Google Ads Local' },
];

const NAV_LINKS = [
  { href: '/services', label: 'Nos services' },
  { href: '/faq', label: 'FAQ' },
  { href: '/blog', label: 'Blog' },
  { href: '/glossaire', label: 'Glossaire' },
  { href: '/contact', label: 'Contact' },
  { href: '/rendez-vous', label: 'Prendre rendez-vous' },
];

const LEGAL_LINKS = [
  { href: '/mentions-legales', label: 'Mentions légales' },
  { href: '/politique-de-confidentialite', label: 'Politique de confidentialité' },
  { href: '/cookies', label: 'Cookies' },
];

export default function Footer() {
  return (
    <footer className="border-t border-warm-800 bg-warm-900 px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-5">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block">
              <img src="/logo-white.svg" alt="Siva" className="h-8 w-auto" />
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-white/50">
              Agence SEO locale Google Maps. On propulse votre business dans le top de Google Maps.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/60 transition-colors hover:bg-white/20 hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/60 transition-colors hover:bg-white/20 hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-white/40">Services</p>
            <ul className="space-y-2.5">
              {SERVICE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/60 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-white/40">Navigation</p>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/60 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-white/40">Contact</p>
            <ul className="space-y-2.5">
              <li>
                <a href={CONTACT_PHONE_LINK} className="text-sm text-white/60 transition-colors hover:text-white">
                  {CONTACT_PHONE}
                </a>
              </li>
              <li>
                <a href="mailto:contact@siva.local" className="text-sm text-white/60 transition-colors hover:text-white">
                  contact@siva.local
                </a>
              </li>
            </ul>
          </div>

          {/* Entreprise */}
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-white/40">Entreprise</p>
            <ul className="space-y-2.5">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/60 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Villes */}
        <div className="mt-8 border-t border-white/10 pt-6 sm:mt-10 sm:pt-8">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-white/40">Agence SEO local par ville</p>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {CITIES.map((city) => (
              <Link
                key={city.slug}
                href={`/agence-seo-local/${city.slug}`}
                className="text-[13px] text-white/50 transition-colors hover:text-white"
              >
                {city.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-5 sm:mt-10 sm:pt-6">
          <p className="text-center text-[11px] text-white/30 sm:text-xs">
            &copy; {new Date().getFullYear()} Siva. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
