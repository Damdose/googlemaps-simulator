'use client';

import { useState, useRef, useMemo } from 'react';
import Link from 'next/link';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowRight, Clock, MagnifyingGlass, X } from '@phosphor-icons/react';
import { BLOG_POSTS, CATEGORIES, type Category } from '@/lib/blog-data';

function Reveal({
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
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('Tous');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesCategory = activeCategory === 'Tous' || post.category === activeCategory;
      const matchesSearch =
        !searchQuery ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <main>
      <section className="px-4 sm:px-6 pb-6 sm:pb-8 pt-10 sm:pt-16 md:pt-20">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <p className="section-label mb-4 justify-center">Blog</p>
            <h1 className="text-balance text-heading-xl sm:text-display text-warm-900">
              Ressources & <span className="serif-accent">conseils SEO local</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-body-sm sm:text-body-lg text-warm-500">
              Guides pratiques, études de cas et stratégies pour dominer Google Maps dans votre zone.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-4 sm:px-6 pb-14 sm:pb-24">
        <div className="mx-auto max-w-7xl">
          <Reveal delay={0.08}>
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                      cat === activeCategory
                        ? 'bg-warm-900 text-white shadow-soft'
                        : 'border border-warm-200 bg-white text-warm-600 hover:border-warm-300 hover:text-warm-900'
                    }`}
                  >
                    {cat}
                    {cat !== 'Tous' && (
                      <span className="ml-1.5 text-xs opacity-60">
                        {BLOG_POSTS.filter((p) => p.category === cat).length}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-64">
                <MagnifyingGlass weight="bold" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-warm-400" />
                <input
                  type="text"
                  placeholder="Rechercher un article…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-full border border-warm-200 bg-white py-2.5 pl-10 pr-10 text-sm text-warm-900 placeholder:text-warm-400 outline-none transition-all focus:border-warm-400 focus:shadow-soft"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-warm-400 hover:text-warm-600"
                  >
                    <X weight="bold" className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>
          </Reveal>

          <AnimatePresence mode="wait">
            {filteredPosts.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="py-20 text-center"
              >
                <p className="text-lg text-warm-500">Aucun article trouvé pour cette recherche.</p>
                <button
                  onClick={() => {
                    setActiveCategory('Tous');
                    setSearchQuery('');
                  }}
                  className="mt-4 text-sm font-medium text-accent-dark hover:underline"
                >
                  Réinitialiser les filtres
                </button>
              </motion.div>
            ) : (
              <motion.div
                key={activeCategory + searchQuery}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              >
                {filteredPosts.map((post, i) => (
                  <Reveal key={post.slug} delay={i * 0.06}>
                    <Link href={`/blog/${post.slug}`} className="block h-full">
                      <article className="group flex h-full flex-col overflow-hidden rounded-2xl sm:rounded-3xl border border-warm-200 bg-white shadow-soft transition-all hover:-translate-y-1 hover:shadow-card">
                        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-warm-100 via-warm-200/60 to-accent-light/30 flex items-center justify-center">
                          <svg
                            className="h-12 w-12 text-warm-300 transition-transform duration-500 group-hover:scale-110"
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
                        <div className="flex flex-1 flex-col p-6">
                          <div className="mb-3 flex items-center gap-3">
                            <span className="rounded-full bg-warm-100 px-3 py-1 text-xs font-semibold text-warm-700">
                              {post.category}
                            </span>
                            <span className="flex items-center gap-1 text-xs text-warm-400">
                              <Clock weight="bold" className="h-3 w-3" />
                              {post.readTime}
                            </span>
                          </div>
                          <h2 className="text-xl font-medium leading-tight text-warm-900 transition-colors group-hover:text-accent-dark">
                            {post.title}
                          </h2>
                          <p className="mt-3 flex-1 text-sm leading-relaxed text-warm-500">{post.excerpt}</p>
                          <div className="mt-5 flex items-center justify-between border-t border-warm-100 pt-4">
                            <span className="text-xs text-warm-400">{post.date}</span>
                            <span className="flex items-center gap-1 text-sm font-medium text-warm-700 transition-colors group-hover:text-accent-dark">
                              Lire
                              <ArrowRight weight="bold" className="h-3.5 w-3.5" />
                            </span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  </Reveal>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <section className="rounded-t-[1.5rem] sm:rounded-t-[2.5rem] bg-warm-900 px-4 sm:px-6 py-14 sm:py-20 text-white">
        <Reveal>
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
        </Reveal>
      </section>
    </main>
  );
}
