import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mentions légales — Siva',
  description: 'Mentions légales du site Siva, agence SEO locale Google Maps.',
};

export default function MentionsLegalesPage() {
  return (
    <main className="px-4 pb-14 pt-8 sm:px-6 sm:pb-24 sm:pt-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 text-center sm:mb-16">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-accent-dark">
            Informations légales
          </p>
          <h1 className="text-balance text-heading-xl text-warm-900 sm:text-display">
            Mentions <span className="serif-accent">légales</span>
          </h1>
        </div>

        <div className="prose-legal space-y-10 text-sm leading-relaxed text-warm-600 [&_h2]:mb-4 [&_h2]:mt-0 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-warm-900 [&_p]:mb-3">
          <section>
            <h2>1. Éditeur du site</h2>
            <p>
              Le site <strong>siva.local</strong> est édité par la société Siva, société par actions simplifiée (SAS)
              au capital de 1 000 €, immatriculée au Registre du Commerce et des Sociétés de Paris.
            </p>
            <p>Siège social : Paris, France</p>
            <p>Téléphone : +33 7 60 55 40 00</p>
            <p>Email : contact@siva.local</p>
            <p>Directeur de la publication : Le représentant légal de la société Siva.</p>
          </section>

          <section>
            <h2>2. Hébergement</h2>
            <p>
              Le site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis.
            </p>
          </section>

          <section>
            <h2>3. Propriété intellectuelle</h2>
            <p>
              L&apos;ensemble du contenu du site (textes, images, graphismes, logo, icônes, sons, logiciels, etc.) est
              la propriété exclusive de Siva ou de ses partenaires et est protégé par les lois françaises et
              internationales relatives à la propriété intellectuelle.
            </p>
            <p>
              Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments
              du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable
              de Siva.
            </p>
          </section>

          <section>
            <h2>4. Limitation de responsabilité</h2>
            <p>
              Siva s&apos;efforce d&apos;assurer au mieux de ses possibilités l&apos;exactitude et la mise à jour des
              informations diffusées sur ce site. Toutefois, Siva ne peut garantir l&apos;exactitude, la précision ou
              l&apos;exhaustivité des informations mises à disposition sur ce site.
            </p>
            <p>
              Siva décline toute responsabilité pour toute imprécision, inexactitude ou omission portant sur des
              informations disponibles sur le site, ainsi que pour tout dommage résultant d&apos;une intrusion
              frauduleuse d&apos;un tiers.
            </p>
          </section>

          <section>
            <h2>5. Liens hypertextes</h2>
            <p>
              Le site peut contenir des liens hypertextes vers d&apos;autres sites. Siva n&apos;exerce aucun contrôle
              sur ces sites et décline toute responsabilité quant à leur contenu ou aux pratiques de confidentialité
              qu&apos;ils appliquent.
            </p>
          </section>

          <section>
            <h2>6. Droit applicable</h2>
            <p>
              Les présentes mentions légales sont régies par le droit français. En cas de litige, les tribunaux
              français seront seuls compétents.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
