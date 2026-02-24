import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "GBP Audit — Audit gratuit de visibilité Google Business Profile",
  description:
    "Découvrez pourquoi vos concurrents vous dépassent sur Google Maps. Audit gratuit avec score, heatmap, analyse des concurrents et recommandations IA.",
  openGraph: {
    title: "GBP Audit — Audit gratuit de visibilité Google Business Profile",
    description:
      "Analysez votre fiche Google Business Profile gratuitement. Score, heatmap, concurrents et recommandations IA.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
