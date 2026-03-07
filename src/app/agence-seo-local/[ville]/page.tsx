import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CITIES, getCityBySlug, getAllCitySlugs } from '@/lib/cities';
import CityPageClient from './CityPageClient';

interface PageProps {
  params: Promise<{ ville: string }>;
}

export async function generateStaticParams() {
  return getAllCitySlugs().map((slug) => ({ ville: slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { ville } = await params;
  const city = getCityBySlug(ville);
  if (!city) return {};

  const title = `Agence SEO Local ${city.name} — Dominez Google Maps à ${city.name} | Siva`;
  const description = `Agence SEO local spécialisée à ${city.name}. Optimisez votre fiche Google Business, dominez Google Maps dans ${city.region} et attirez plus de clients locaux. Audit gratuit.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
    },
  };
}

export default async function CityPage({ params }: PageProps) {
  const { ville } = await params;
  const city = getCityBySlug(ville);
  if (!city) notFound();

  const otherCities = CITIES.filter((c) => c.slug !== city.slug).slice(0, 8);

  return <CityPageClient city={city} otherCities={otherCities} />;
}
