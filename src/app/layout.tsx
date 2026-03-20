import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { Instrument_Serif } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/Chatbot";
import CookieBanner from "@/components/CookieBanner";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import ScrollProgress from "@/components/ScrollProgress";
import "./globals.css";

const instrumentSerif = Instrument_Serif({ weight: "400", subsets: ["latin"], style: ["normal", "italic"], variable: "--font-instrument-serif" });

export const metadata: Metadata = {
  title: "Siva — Audit gratuit de visibilité Google Business Profile",
  description:
    "Découvrez pourquoi vos concurrents vous dépassent sur Google Maps. Audit gratuit avec score, heatmap, analyse des concurrents et recommandations IA.",
  openGraph: {
    title: "Siva — Audit gratuit de visibilité Google Business Profile",
    description:
      "Analysez votre fiche Google Business Profile gratuitement. Score, heatmap, concurrents et recommandations IA.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=switzer@100,200,300,400,500,600,700,800,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${GeistSans.variable} ${instrumentSerif.variable} font-sans antialiased`}>
        <div className="min-h-screen bg-warm-bg text-warm-900">
          <ScrollProgress />
          <Header />
          {children}
          <Footer />
          <WhatsAppWidget />
          <CookieBanner />
          <ExitIntentPopup />
        </div>
      </body>
    </html>
  );
}
