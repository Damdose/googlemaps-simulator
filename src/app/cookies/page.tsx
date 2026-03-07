import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Politique de cookies — Siva',
  description: 'Découvrez comment Siva utilise les cookies pour améliorer votre expérience de navigation.',
};

export default function CookiesPage() {
  return (
    <main className="px-4 pb-14 pt-8 sm:px-6 sm:pb-24 sm:pt-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 text-center sm:mb-16">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-accent-dark">
            Transparence
          </p>
          <h1 className="text-balance text-heading-xl text-warm-900 sm:text-display">
            Politique de <span className="serif-accent">cookies</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-body-sm text-warm-500 sm:text-body-lg">
            Dernière mise à jour : mars 2026
          </p>
        </div>

        <div className="prose-legal space-y-10 text-sm leading-relaxed text-warm-600 [&_h2]:mb-4 [&_h2]:mt-0 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-warm-900 [&_p]:mb-3 [&_ul]:mb-3 [&_ul]:ml-5 [&_ul]:list-disc [&_ul]:space-y-1.5">
          <section>
            <h2>1. Qu&apos;est-ce qu&apos;un cookie ?</h2>
            <p>
              Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, tablette, smartphone) lors
              de votre visite sur notre site. Il permet de stocker des informations relatives à votre navigation et
              de vous reconnaître lors de vos visites ultérieures.
            </p>
          </section>

          <section>
            <h2>2. Cookies utilisés sur notre site</h2>

            <div className="mt-4 overflow-hidden rounded-xl border border-warm-200">
              <table className="w-full text-left text-sm">
                <thead className="bg-warm-100">
                  <tr>
                    <th className="px-4 py-3 font-semibold text-warm-900">Type</th>
                    <th className="px-4 py-3 font-semibold text-warm-900">Finalité</th>
                    <th className="px-4 py-3 font-semibold text-warm-900">Durée</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-warm-100">
                  <tr>
                    <td className="px-4 py-3 font-medium text-warm-800">Essentiels</td>
                    <td className="px-4 py-3">Fonctionnement du site, préférences cookies</td>
                    <td className="px-4 py-3">12 mois</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-warm-800">Analytiques</td>
                    <td className="px-4 py-3">Mesure d&apos;audience, amélioration du site</td>
                    <td className="px-4 py-3">13 mois</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-warm-800">Marketing</td>
                    <td className="px-4 py-3">Publicités personnalisées, remarketing</td>
                    <td className="px-4 py-3">13 mois</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2>3. Cookies essentiels</h2>
            <p>
              Ces cookies sont nécessaires au fonctionnement du site. Ils vous permettent d&apos;utiliser les
              fonctionnalités essentielles (navigation, sécurité, mémorisation de vos préférences cookies). Ils ne
              peuvent pas être désactivés.
            </p>
          </section>

          <section>
            <h2>4. Cookies analytiques</h2>
            <p>
              Ces cookies nous permettent de mesurer l&apos;audience du site, de comprendre comment les visiteurs
              l&apos;utilisent et d&apos;améliorer son contenu et ses performances. Ils sont déposés uniquement avec
              votre consentement.
            </p>
          </section>

          <section>
            <h2>5. Cookies marketing</h2>
            <p>
              Ces cookies sont utilisés pour vous proposer des publicités pertinentes en fonction de vos centres
              d&apos;intérêt. Ils sont déposés uniquement avec votre consentement.
            </p>
          </section>

          <section>
            <h2>6. Gérer vos préférences</h2>
            <p>
              Lors de votre première visite, une bannière vous permet d&apos;accepter ou de refuser les cookies non
              essentiels. Vous pouvez modifier vos préférences à tout moment en cliquant sur le lien « Gérer les
              cookies » en bas de chaque page.
            </p>
            <p>
              Vous pouvez également configurer votre navigateur pour refuser tous les cookies ou être informé(e)
              lorsqu&apos;un cookie est envoyé. Notez que la désactivation de certains cookies peut affecter votre
              expérience de navigation.
            </p>
          </section>

          <section>
            <h2>7. En savoir plus</h2>
            <p>
              Pour en savoir plus sur les cookies et la manière de les gérer, vous pouvez consulter le site de la
              CNIL : <strong>www.cnil.fr</strong>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
