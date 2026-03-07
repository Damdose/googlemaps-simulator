'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  CalendarBlank,
  ShareNetwork,
  Link as LinkIcon,
  List as ListIcon,
  X,
  CaretUp,
  Check,
} from '@phosphor-icons/react';
import type { BlogPost } from '@/lib/blog-data';

interface BlogPostClientProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export default function BlogPostClient({ post, relatedPosts }: BlogPostClientProps) {
  const [activeSection, setActiveSection] = useState('');
  const [tocOpen, setTocOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [copied, setCopied] = useState(false);
  const articleRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: articleRef,
    offset: ['start start', 'end end'],
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const sectionElements = post.sections.map((s) => document.getElementById(s.id));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    );

    sectionElements.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [post.sections]);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 600);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: 'smooth' });
      setTocOpen(false);
    }
  }, []);

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* noop */
    }
  }, []);

  const handleShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: post.title, url: window.location.href });
      } catch {
        /* user cancelled */
      }
    } else {
      handleCopyLink();
    }
  }, [post.title, handleCopyLink]);

  return (
    <>
      {/* Reading progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-accent-dark to-accent"
        style={{ scaleX }}
      />

      <main className="pb-0">
        {/* Breadcrumbs */}
        <nav aria-label="Fil d'Ariane" className="px-4 sm:px-6 pt-6 sm:pt-8">
          <div className="mx-auto max-w-4xl">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-warm-400" itemScope itemType="https://schema.org/BreadcrumbList">
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <Link href="/" className="hover:text-warm-600 transition-colors" itemProp="item">
                  <span itemProp="name">Accueil</span>
                </Link>
                <meta itemProp="position" content="1" />
              </li>
              <li className="text-warm-300">/</li>
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <Link href="/blog" className="hover:text-warm-600 transition-colors" itemProp="item">
                  <span itemProp="name">Blog</span>
                </Link>
                <meta itemProp="position" content="2" />
              </li>
              <li className="text-warm-300">/</li>
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <span className="text-warm-600 font-medium line-clamp-1" itemProp="name">{post.title}</span>
                <meta itemProp="position" content="3" />
              </li>
            </ol>
          </div>
        </nav>

        {/* Article header */}
        <header className="px-4 sm:px-6 pt-6 sm:pt-10 pb-8 sm:pb-12">
          <div className="mx-auto max-w-4xl">
            <Link
              href="/blog"
              className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-warm-500 transition-colors hover:text-warm-900"
            >
              <ArrowLeft weight="bold" className="h-4 w-4" />
              Retour au blog
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="rounded-full bg-warm-100 px-3 py-1 text-xs font-semibold text-warm-700">
                {post.category}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-warm-400">
                <Clock weight="bold" className="h-3.5 w-3.5" />
                {post.readTime} de lecture
              </span>
              <span className="flex items-center gap-1.5 text-xs text-warm-400">
                <CalendarBlank weight="bold" className="h-3.5 w-3.5" />
                {post.date}
              </span>
            </div>

            <h1 className="text-heading-xl sm:text-display md:text-display-lg text-warm-900 text-balance">
              {post.title}
            </h1>

            <p className="mt-4 text-body-sm sm:text-body-lg text-warm-500 max-w-3xl">
              {post.excerpt}
            </p>

            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-warm-100">
                  <img src={post.author.avatar} alt="" className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-warm-900">{post.author.name}</p>
                  <p className="text-xs text-warm-400">{post.author.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyLink}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-warm-200 bg-white text-warm-500 transition-all hover:border-warm-300 hover:text-warm-900"
                  title="Copier le lien"
                >
                  {copied ? <Check weight="bold" className="h-4 w-4 text-positive" /> : <LinkIcon weight="bold" className="h-4 w-4" />}
                </button>
                <button
                  onClick={handleShare}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-warm-200 bg-white text-warm-500 transition-all hover:border-warm-300 hover:text-warm-900"
                  title="Partager"
                >
                  <ShareNetwork weight="bold" className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-warm-100 bg-warm-50 px-3 py-1 text-xs text-warm-500"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </header>

        <div className="px-4 sm:px-6">
          <div className="mx-auto max-w-7xl flex gap-10">
            {/* Desktop Table of Contents sidebar */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-24">
                <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-warm-400">Sommaire</p>
                <nav aria-label="Sommaire" className="space-y-1">
                  {post.sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`block w-full text-left rounded-lg px-3 py-2 text-sm transition-all duration-200 ${
                        activeSection === section.id
                          ? 'bg-accent-light text-accent-dark font-medium border-l-2 border-accent-dark'
                          : 'text-warm-500 hover:text-warm-900 hover:bg-warm-50'
                      }`}
                    >
                      {section.title}
                    </button>
                  ))}
                </nav>

                <div className="mt-8 rounded-2xl border border-warm-200 bg-white p-5">
                  <p className="text-sm font-semibold text-warm-900">Besoin d&apos;un audit ?</p>
                  <p className="mt-1 text-xs text-warm-500">
                    Analysez votre fiche Google gratuitement en 2 minutes.
                  </p>
                  <Link
                    href="/audit-gratuit"
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-accent-dark hover:underline"
                  >
                    Lancer l&apos;audit
                    <ArrowRight weight="bold" className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </aside>

            {/* Article content */}
            <article ref={articleRef} className="min-w-0 flex-1 max-w-3xl pb-16">
              {post.sections.map((section) => (
                <section key={section.id} id={section.id} className="mb-10 scroll-mt-24">
                  <h2 className="text-heading-lg text-warm-900 mb-4">{section.title}</h2>
                  <div
                    className="prose-blog"
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  />
                </section>
              ))}

              {/* CTA in-article */}
              <div className="my-12 rounded-2xl sm:rounded-3xl bg-warm-900 p-6 sm:p-10 text-center">
                <h3 className="text-heading text-white">
                  Prêt à booster votre visibilité <span className="serif-accent text-accent">locale</span> ?
                </h3>
                <p className="mx-auto mt-3 max-w-md text-sm text-white/60">
                  Obtenez un audit complet de votre fiche Google Business Profile en 2 minutes.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <Link href="/audit-gratuit" className="btn-accent">
                    Audit gratuit
                  </Link>
                  <Link href="/rendez-vous" className="btn-outline-light">
                    Prendre rendez-vous
                  </Link>
                </div>
              </div>

              {/* Author box */}
              <div className="mt-10 flex items-start gap-4 rounded-2xl border border-warm-200 bg-white p-6">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-warm-100">
                  <img src={post.author.avatar} alt="" className="h-7 w-7" />
                </div>
                <div>
                  <p className="text-base font-semibold text-warm-900">{post.author.name}</p>
                  <p className="text-sm text-warm-500">{post.author.role}</p>
                  <p className="mt-2 text-sm text-warm-500 leading-relaxed">
                    Expert en SEO local et visibilité Google Maps. Accompagne plus de 500 commerces dans leur stratégie de référencement local.
                  </p>
                </div>
              </div>

              {/* Share bar */}
              <div className="mt-8 flex items-center justify-between rounded-2xl border border-warm-200 bg-white p-4">
                <p className="text-sm font-medium text-warm-600">Cet article vous a aidé ?</p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyLink}
                    className="flex items-center gap-2 rounded-full border border-warm-200 px-4 py-2 text-sm font-medium text-warm-600 transition-all hover:border-warm-300 hover:text-warm-900"
                  >
                    {copied ? (
                      <>
                        <Check weight="bold" className="h-4 w-4 text-positive" />
                        Copié !
                      </>
                    ) : (
                      <>
                        <LinkIcon weight="bold" className="h-4 w-4" />
                        Copier le lien
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-2 rounded-full bg-warm-900 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-warm-800"
                  >
                    <ShareNetwork weight="bold" className="h-4 w-4" />
                    Partager
                  </button>
                </div>
              </div>
            </article>
          </div>
        </div>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-14 border-t border-warm-200 px-4 sm:px-6 py-14 sm:py-20">
            <div className="mx-auto max-w-7xl">
              <h2 className="text-heading-xl text-warm-900 mb-8 text-center">
                Articles <span className="serif-accent">similaires</span>
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((rp) => (
                  <Link key={rp.slug} href={`/blog/${rp.slug}`} className="block h-full">
                    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-warm-200 bg-white shadow-soft transition-all hover:-translate-y-1 hover:shadow-card">
                      <div className="relative h-40 overflow-hidden bg-gradient-to-br from-warm-100 via-warm-200/60 to-accent-light/30 flex items-center justify-center">
                        <svg
                          className="h-10 w-10 text-warm-300 transition-transform duration-500 group-hover:scale-110"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                          />
                        </svg>
                      </div>
                      <div className="flex flex-1 flex-col p-5">
                        <div className="mb-2 flex items-center gap-2">
                          <span className="rounded-full bg-warm-100 px-2.5 py-0.5 text-xs font-semibold text-warm-700">
                            {rp.category}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-warm-400">
                            <Clock weight="bold" className="h-3 w-3" />
                            {rp.readTime}
                          </span>
                        </div>
                        <h3 className="text-base font-medium leading-snug text-warm-900 transition-colors group-hover:text-accent-dark">
                          {rp.title}
                        </h3>
                        <div className="mt-auto pt-4 flex items-center gap-1 text-sm font-medium text-warm-700 transition-colors group-hover:text-accent-dark">
                          Lire
                          <ArrowRight weight="bold" className="h-3.5 w-3.5" />
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA footer */}
        <section className="rounded-t-[1.5rem] sm:rounded-t-[2.5rem] bg-warm-900 px-4 sm:px-6 py-14 sm:py-20 text-white">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-heading-xl text-white">
              Passez de la théorie à la <span className="serif-accent text-accent">pratique</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-body-sm sm:text-body-lg text-white/60">
              Laissez-nous auditer votre visibilité et construire votre plan d&apos;action.
            </p>
            <div className="mt-8">
              <Link href="/rendez-vous" className="btn-accent">
                Prendre rendez-vous
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Mobile TOC floating button */}
      <AnimatePresence>
        {!tocOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setTocOpen(true)}
            className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-warm-900 text-white shadow-elevated lg:hidden"
            aria-label="Ouvrir le sommaire"
          >
            <ListIcon weight="bold" className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Mobile TOC sheet */}
      <AnimatePresence>
        {tocOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm lg:hidden"
              onClick={() => setTocOpen(false)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 max-h-[70vh] overflow-y-auto rounded-t-3xl bg-white p-6 shadow-elevated lg:hidden"
            >
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-semibold uppercase tracking-widest text-warm-400">Sommaire</p>
                <button onClick={() => setTocOpen(false)} className="text-warm-400 hover:text-warm-600">
                  <X weight="bold" className="h-5 w-5" />
                </button>
              </div>
              <nav className="space-y-1">
                {post.sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`block w-full text-left rounded-lg px-3 py-2.5 text-sm transition-all ${
                      activeSection === section.id
                        ? 'bg-accent-light text-accent-dark font-medium'
                        : 'text-warm-500 hover:text-warm-900 hover:bg-warm-50'
                    }`}
                  >
                    {section.title}
                  </button>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Back to top */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 left-6 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-warm-200 bg-white text-warm-500 shadow-card transition-colors hover:text-warm-900"
            aria-label="Remonter en haut"
          >
            <CaretUp weight="bold" className="h-4 w-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
