'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { List, X, CaretDown } from '@phosphor-icons/react';
import FreehandIcon, { type FreehandIconName } from '@/components/FreehandIcon';

const FRENCH_MONTHS = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
];

const SERVICE_ITEMS: { href: string; label: string; description: string; icon: FreehandIconName }[] = [
  { href: '/services/audit-gratuit', label: 'Audit Gratuit', description: 'Gratuit · Score, heatmap, concurrents & recommandations IA', icon: 'chart-bar' },
  { href: '/services/optimisation-fiche-google', label: 'Optimisation Fiche Google', description: '500€ one-shot · Fiche 100% optimisée pour convertir', icon: 'pencil' },
  { href: '/services/boost-avis-experience', label: 'Boost Avis Expérience', description: 'Sur devis · De vrais avis par de vrais clients', icon: 'check-badge' },
];

const RESOURCE_ITEMS: { href: string; label: string; description: string; icon: FreehandIconName }[] = [
  { href: '/blog', label: 'Blog', description: 'Guides, études de cas & stratégies SEO', icon: 'book' },
  { href: '/faq', label: 'FAQ', description: 'Réponses à vos questions fréquentes', icon: 'chat' },
  { href: '/glossaire', label: 'Glossaire', description: 'Tous les termes du SEO local expliqués', icon: 'notebook' },
];

const NAV_LINKS = [
  { href: '/ambassadeur', label: 'Ambassadeur' },
  { href: '/faq', label: 'FAQ' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const resourcesRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const currentMonth = useMemo(() => FRENCH_MONTHS[new Date().getMonth()], []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
      if (resourcesRef.current && !resourcesRef.current.contains(e.target as Node)) {
        setResourcesOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
    setResourcesOpen(false);
    setMobileServicesOpen(false);
    setMobileResourcesOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-warm-100/70 bg-warm-bg/85 backdrop-blur-xl">
      {!bannerDismissed && (
        <div className="relative bg-warm-900 text-white">
          <Link
            href="/services/boost-avis-experience"
            className="flex items-center justify-center gap-1.5 px-10 py-2 text-center text-[11px] font-medium transition-colors hover:bg-warm-800 sm:gap-3 sm:px-8 sm:text-xs"
          >
            <span className="hidden items-center gap-1.5 rounded-full bg-accent px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-warm-900 sm:inline-flex">
              🔥 2 places dispo
            </span>
            <span>
              <span className="sm:hidden">🔥 Plus que <strong>2 places en {FRENCH_MONTHS[new Date().getMonth()]}</strong> — Testez l&apos;expérience →</span>
              <span className="hidden sm:inline">Boost Avis Expérience — Plus que <strong>2 places en {FRENCH_MONTHS[new Date().getMonth()]}</strong> pour tester l&apos;expérience</span>
            </span>
            <span className="hidden sm:inline">→</span>
          </Link>
          <button
            onClick={(e) => {
              e.preventDefault();
              setBannerDismissed(true);
            }}
            className="absolute right-2 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full text-white/50 transition-colors hover:bg-white/10 hover:text-white sm:right-4"
            aria-label="Fermer"
          >
            <X weight="bold" className="h-3 w-3" />
          </button>
        </div>
      )}
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:h-18 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <img src="/logo.svg" alt="Siva" className="h-7" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {/* Services dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              className="flex items-center gap-1.5 text-sm font-medium text-warm-600 transition-colors hover:text-warm-900"
            >
              Nos services
              <CaretDown
                weight="bold"
                className={`h-3.5 w-3.5 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {servicesOpen && (
              <div className="absolute left-1/2 top-full z-50 mt-3 w-80 -translate-x-1/2 overflow-hidden rounded-2xl border border-warm-200 bg-white p-2 shadow-elevated">
                <div className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-l border-t border-warm-200 bg-white" />
                {SERVICE_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group relative flex items-start gap-3.5 rounded-xl px-3.5 py-3 transition-colors hover:bg-warm-50"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-warm-100 text-warm-600 transition-colors group-hover:bg-accent-light group-hover:text-accent-dark">
                      <FreehandIcon name={item.icon} size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-warm-900">{item.label}</p>
                      <p className="mt-0.5 text-xs text-warm-500">{item.description}</p>
                    </div>
                  </Link>
                ))}
                <div className="mt-1 border-t border-warm-100 pt-1">
                  <Link
                    href="/services"
                    className="flex items-center justify-center rounded-xl px-3.5 py-2.5 text-sm font-medium text-warm-600 transition-colors hover:bg-warm-50 hover:text-warm-900"
                  >
                    Voir toutes les offres
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Resources dropdown */}
          <div ref={resourcesRef} className="relative">
            <button
              onClick={() => setResourcesOpen(!resourcesOpen)}
              className="flex items-center gap-1.5 text-sm font-medium text-warm-600 transition-colors hover:text-warm-900"
            >
              Ressources
              <CaretDown
                weight="bold"
                className={`h-3.5 w-3.5 transition-transform duration-200 ${resourcesOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {resourcesOpen && (
              <div className="absolute left-1/2 top-full z-50 mt-3 w-72 -translate-x-1/2 overflow-hidden rounded-2xl border border-warm-200 bg-white p-2 shadow-elevated">
                <div className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-l border-t border-warm-200 bg-white" />
                {RESOURCE_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group relative flex items-start gap-3.5 rounded-xl px-3.5 py-3 transition-colors hover:bg-warm-50"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-warm-100 text-warm-600 transition-colors group-hover:bg-accent-light group-hover:text-accent-dark">
                      <FreehandIcon name={item.icon} size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-warm-900">{item.label}</p>
                      <p className="mt-0.5 text-xs text-warm-500">{item.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-warm-600 transition-colors hover:text-warm-900"
            >
              {link.label}
            </Link>
          ))}

        </nav>

        <div className="flex items-center gap-2 sm:gap-3 lg:items-stretch">
          <Link
            href="/contact"
            className="btn-secondary hidden !border !border-warm-200 !py-[0.85rem] !px-5 !text-sm !font-medium lg:inline-flex"
          >
            Nous contacter
          </Link>
          <Link href="/rendez-vous" className="relative hidden btn-primary sm:inline-flex" style={{ fontSize: '0.875rem', padding: '0.2rem 0.2rem 0.2rem 1.25rem', gap: '0.5rem' }}>
            Prendre rendez-vous
            <span className="absolute -top-1.5 right-8 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[11px] font-bold leading-none text-white shadow-lg ring-2 ring-white">
              1
            </span>
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-warm-200 bg-white md:hidden"
            aria-label="Menu"
          >
            {mobileOpen ? <X weight="bold" className="h-5 w-5" /> : <List weight="bold" className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-warm-100 bg-warm-bg px-4 pb-6 pt-3 sm:px-6 sm:pt-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {/* Mobile services accordion */}
            <button
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              className="flex items-center justify-between rounded-xl px-3 py-3 text-base font-medium text-warm-700 transition-colors hover:bg-warm-100"
            >
              Nos services
              <CaretDown
                weight="bold"
                className={`h-4 w-4 text-warm-400 transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {mobileServicesOpen && (
              <div className="mb-2 ml-3 flex flex-col gap-1 border-l-2 border-warm-200 pl-3">
                {SERVICE_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-warm-100"
                  >
                    <FreehandIcon name={item.icon} size={16} className="text-warm-500" />
                    <div>
                      <p className="text-sm font-medium text-warm-800">{item.label}</p>
                      <p className="text-[11px] text-warm-500">{item.description}</p>
                    </div>
                  </Link>
                ))}
                <Link
                  href="/services"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-warm-500 transition-colors hover:bg-warm-100 hover:text-warm-700"
                >
                  Voir toutes les offres
                </Link>
              </div>
            )}

            {/* Mobile resources accordion */}
            <button
              onClick={() => setMobileResourcesOpen(!mobileResourcesOpen)}
              className="flex items-center justify-between rounded-xl px-3 py-3 text-base font-medium text-warm-700 transition-colors hover:bg-warm-100"
            >
              Ressources
              <CaretDown
                weight="bold"
                className={`h-4 w-4 text-warm-400 transition-transform duration-200 ${mobileResourcesOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {mobileResourcesOpen && (
              <div className="mb-2 ml-3 flex flex-col gap-1 border-l-2 border-warm-200 pl-3">
                {RESOURCE_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-warm-100"
                  >
                    <FreehandIcon name={item.icon} size={16} className="text-warm-500" />
                    <div>
                      <p className="text-sm font-medium text-warm-800">{item.label}</p>
                      <p className="text-[11px] text-warm-500">{item.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-3 py-3 text-base font-medium text-warm-700 transition-colors hover:bg-warm-100"
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/rendez-vous"
              onClick={() => setMobileOpen(false)}
              className="btn-primary mt-3 w-fit" style={{ fontSize: '0.875rem' }}
            >
              Prendre rendez-vous
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="btn-secondary mt-2 w-fit !text-sm"
            >
              Nous contacter
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
