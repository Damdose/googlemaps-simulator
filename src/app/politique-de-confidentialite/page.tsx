import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Politique de confidentialité — Siva',
  description: 'Politique de confidentialité du site Siva. Découvrez comment nous protégeons vos données personnelles.',
};

export default function PolitiqueConfidentialitePage() {
  return (
    <main className="px-4 pb-14 pt-8 sm:px-6 sm:pb-24 sm:pt-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 text-center sm:mb-16">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-accent-dark">
            Vos données
          </p>
          <h1 className="text-balance text-heading-xl text-warm-900 sm:text-display">
            Politique de <span className="serif-accent">confidentialité</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-body-sm text-warm-500 sm:text-body-lg">
            Dernière mise à jour : mars 2026
          </p>
        </div>

        <div className="prose-legal space-y-10 text-sm leading-relaxed text-warm-600 [&_h2]:mb-4 [&_h2]:mt-0 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-warm-900 [&_p]:mb-3 [&_ul]:mb-3 [&_ul]:ml-5 [&_ul]:list-disc [&_ul]:space-y-1.5">
          <section>
            <h2>1. Responsable du traitement</h2>
            <p>
              Le responsable du traitement des données collectées sur le site <strong>siva.local</strong> est la
              société Siva, dont le siège social est situé à Paris, France.
            </p>
            <p>Contact : contact@siva.local</p>
          </section>

          <section>
            <h2>2. Données collectées</h2>
            <p>Nous pouvons collecter les données suivantes :</p>
            <ul>
              <li>Nom et prénom</li>
              <li>Adresse email</li>
              <li>Numéro de téléphone</li>
              <li>Nom de l&apos;entreprise</li>
              <li>Données de navigation (cookies, adresse IP, pages visitées)</li>
              <li>Informations relatives à votre fiche Google Business Profile (dans le cadre de nos audits)</li>
            </ul>
          </section>

          <section>
            <h2>3. Finalités du traitement</h2>
            <p>Vos données sont collectées pour les finalités suivantes :</p>
            <ul>
              <li>Répondre à vos demandes de contact et devis</li>
              <li>Réaliser des audits SEO local gratuits</li>
              <li>Envoyer notre newsletter (avec votre consentement)</li>
              <li>Améliorer nos services et l&apos;expérience utilisateur</li>
              <li>Analyser le trafic du site via des cookies analytiques</li>
            </ul>
          </section>

          <section>
            <h2>4. Base légale</h2>
            <p>
              Le traitement de vos données repose sur votre consentement (formulaires, newsletter), l&apos;exécution
              d&apos;un contrat (prestation de services) ou notre intérêt légitime (amélioration du site, analyse du
              trafic).
            </p>
          </section>

          <section>
            <h2>5. Durée de conservation</h2>
            <p>
              Vos données personnelles sont conservées pendant une durée de 3 ans à compter de votre dernière
              interaction avec nous, sauf obligation légale de conservation plus longue.
            </p>
          </section>

          <section>
            <h2>6. Partage des données</h2>
            <p>
              Vos données ne sont jamais vendues à des tiers. Elles peuvent être partagées avec nos sous-traitants
              techniques (hébergement, emailing) dans le strict cadre de nos prestations, et uniquement avec des
              prestataires respectant le RGPD.
            </p>
          </section>

          <section>
            <h2>7. Vos droits</h2>
            <p>Conformément au RGPD, vous disposez des droits suivants :</p>
            <ul>
              <li>Droit d&apos;accès à vos données</li>
              <li>Droit de rectification</li>
              <li>Droit à l&apos;effacement (« droit à l&apos;oubli »)</li>
              <li>Droit à la limitation du traitement</li>
              <li>Droit à la portabilité des données</li>
              <li>Droit d&apos;opposition</li>
            </ul>
            <p>
              Pour exercer ces droits, contactez-nous à <strong>contact@siva.local</strong>. Nous nous engageons à
              répondre dans un délai de 30 jours.
            </p>
          </section>

          <section>
            <h2>8. Sécurité</h2>
            <p>
              Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données
              contre tout accès non autorisé, perte, destruction ou altération.
            </p>
          </section>

          <section>
            <h2>9. Réclamation</h2>
            <p>
              Si vous estimez que le traitement de vos données ne respecte pas la réglementation, vous pouvez
              introduire une réclamation auprès de la CNIL (Commission Nationale de l&apos;Informatique et des
              Libertés) : <strong>www.cnil.fr</strong>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
