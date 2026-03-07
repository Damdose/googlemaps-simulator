import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BLOG_POSTS, getPostBySlug, getRelatedPosts } from '@/lib/blog-data';
import BlogPostClient from './BlogPostClient';

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return {};

  const url = `https://www.siva.fr/blog/${post.slug}`;

  return {
    title: `${post.title} | Siva Blog`,
    description: post.metaDescription,
    keywords: post.tags.join(', '),
    authors: [{ name: post.author.name }],
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.metaDescription,
      url,
      siteName: 'Siva',
      locale: 'fr_FR',
      publishedTime: post.dateISO,
      modifiedTime: post.updatedDateISO || post.dateISO,
      authors: [post.author.name],
      tags: post.tags,
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.metaDescription,
      images: [post.coverImage],
    },
    alternates: {
      canonical: url,
    },
  };
}

function ArticleJsonLd({ post }: { post: NonNullable<ReturnType<typeof getPostBySlug>> }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDescription,
    image: `https://www.siva.fr${post.coverImage}`,
    datePublished: post.dateISO,
    dateModified: post.updatedDateISO || post.dateISO,
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Siva',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.siva.fr/logo.svg',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.siva.fr/blog/${post.slug}`,
    },
    wordCount: post.sections.reduce((acc, s) => acc + s.content.split(/\s+/).length, 0),
    articleSection: post.category,
    keywords: post.tags.join(', '),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

function FAQJsonLd({ post }: { post: NonNullable<ReturnType<typeof getPostBySlug>> }) {
  const faqItems = post.sections
    .filter((s) => s.id !== 'introduction' && s.id !== 'conclusion')
    .slice(0, 5)
    .map((s) => ({
      '@type': 'Question',
      name: s.title.replace(/^\d+\.\s*/, ''),
      acceptedAnswer: {
        '@type': 'Answer',
        text: s.content.replace(/<[^>]*>/g, '').slice(0, 300),
      },
    }));

  if (faqItems.length < 2) return null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function BlogPostPage({ params }: PageProps) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const relatedPosts = getRelatedPosts(params.slug, 3);

  return (
    <>
      <ArticleJsonLd post={post} />
      <FAQJsonLd post={post} />
      <BlogPostClient post={post} relatedPosts={relatedPosts} />
    </>
  );
}
