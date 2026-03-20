export interface BlogSection {
  id: string;
  title: string;
  content: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  metaDescription: string;
  category: string;
  tags: string[];
  readTime: string;
  readTimeMinutes: number;
  date: string;
  dateISO: string;
  updatedDate?: string;
  updatedDateISO?: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  coverImage: string;
  sections: BlogSection[];
}

export const CATEGORIES = ['Tous', 'Guide', 'Éducation', 'Stratégie', 'SEO Local', 'Business'] as const;

export type Category = (typeof CATEGORIES)[number];

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'optimiser-fiche-google-business',
    title: 'Comment optimiser votre fiche Google Business Profile en 2026',
    excerpt:
      'Les 10 étapes essentielles pour transformer votre fiche Google en machine à générer des clients. Guide complet avec exemples concrets.',
    metaDescription:
      'Guide complet 2026 pour optimiser votre fiche Google Business Profile : catégories, photos, avis, posts, FAQ. 10 étapes concrètes pour dominer le Local Pack.',
    category: 'Guide',
    tags: ['Google Business Profile', 'Optimisation', 'Fiche Google', 'Local Pack', 'SEO Local'],
    readTime: '8 min',
    readTimeMinutes: 8,
    date: '28 février 2026',
    dateISO: '2026-02-28',
    author: { name: 'Damien T.', role: 'Fondateur & Expert SEO Local', avatar: '/logo.svg' },
    coverImage: '/blog/blog-optimiser-fiche-google.png',
    sections: [
      {
        id: 'introduction',
        title: 'Introduction',
        content: `<p>Votre fiche Google Business Profile (GBP) est souvent le <strong>premier point de contact</strong> entre votre entreprise et un client potentiel. En 2026, 87% des consommateurs utilisent Google pour évaluer un commerce local avant de s'y rendre. Pourtant, la majorité des fiches sont mal optimisées et passent à côté d'un flux massif de clients.</p>
<p>Dans ce guide, nous allons détailler les <strong>10 étapes concrètes</strong> qui vous permettront de transformer votre fiche en véritable aimant à clients. Chaque étape est basée sur notre expérience avec plus de 1 000 commerces locaux accompagnés.</p>`,
      },
      {
        id: 'choisir-categories',
        title: '1. Choisir les bonnes catégories',
        content: `<p>La catégorie principale de votre fiche est le <strong>facteur de ranking n°1</strong> pour le Local Pack de Google. Pourtant, 60% des entreprises choisissent une catégorie trop générique ou inadaptée.</p>
<h3>Bonnes pratiques</h3>
<ul>
<li><strong>Catégorie principale</strong> : choisissez la plus spécifique possible. "Pizzeria" est meilleur que "Restaurant italien".</li>
<li><strong>Catégories secondaires</strong> : ajoutez-en 3 à 5 pour couvrir vos services annexes (livraison, traiteur, etc.).</li>
<li><strong>Analysez vos concurrents</strong> : utilisez un outil comme Siva pour voir quelles catégories utilisent les fiches qui apparaissent dans le top 3.</li>
</ul>
<p>Une mauvaise catégorie peut vous rendre <em>invisible</em> sur vos mots-clés les plus importants. Prenez le temps de bien la choisir dès le départ.</p>`,
      },
      {
        id: 'completer-informations',
        title: '2. Compléter 100% des informations',
        content: `<p>Google favorise les fiches les plus complètes. Chaque champ vide est une opportunité manquée de convaincre à la fois l'algorithme et vos futurs clients.</p>
<h3>Les champs indispensables</h3>
<ul>
<li><strong>Nom</strong> : exactement comme sur votre enseigne (pas de mots-clés ajoutés).</li>
<li><strong>Adresse</strong> : vérifiée et cohérente avec votre site web.</li>
<li><strong>Téléphone</strong> : numéro local de préférence.</li>
<li><strong>Horaires</strong> : incluez les horaires exceptionnels (jours fériés, vacances).</li>
<li><strong>Site web</strong> : URL de votre page la plus pertinente (pas forcément la home).</li>
<li><strong>Description</strong> : 750 caractères max, incluez vos mots-clés naturellement.</li>
</ul>
<p>Astuce : mettez à jour vos horaires chaque trimestre au minimum. Les fiches avec des horaires incorrects sont pénalisées dans le ranking.</p>`,
      },
      {
        id: 'photos-videos',
        title: '3. Ajouter des photos et vidéos de qualité',
        content: `<p>Les fiches avec plus de 100 photos reçoivent <strong>520% plus d'appels</strong> et <strong>2 717% plus de demandes d'itinéraire</strong> que la fiche moyenne (source : BrightLocal 2025).</p>
<h3>Stratégie photo recommandée</h3>
<ul>
<li><strong>Extérieur</strong> : 3 à 5 photos de votre façade sous différents angles et à différentes heures.</li>
<li><strong>Intérieur</strong> : 5 à 10 photos montrant l'ambiance, la propreté, les détails.</li>
<li><strong>Produits/Services</strong> : montrez vos best-sellers, vos réalisations.</li>
<li><strong>Équipe</strong> : humanisez votre entreprise avec des photos de vos collaborateurs.</li>
<li><strong>Vidéos</strong> : des tours de 30 secondes de votre établissement performent exceptionnellement bien.</li>
</ul>
<p>Publiez de nouvelles photos chaque semaine. La régularité est un signal de fraîcheur pour Google.</p>`,
      },
      {
        id: 'gerer-avis',
        title: '4. Gérer activement vos avis',
        content: `<p>Les avis sont le <strong>2e facteur de ranking</strong> le plus important pour le Local Pack. Mais au-delà du SEO, ils influencent directement la décision d'achat : 93% des consommateurs lisent les avis avant de choisir un commerce.</p>
<h3>La stratégie en 3 piliers</h3>
<ul>
<li><strong>Collecter</strong> : envoyez un lien de dépôt d'avis par SMS 2h après la visite. Le taux de réponse est 3x supérieur à l'email.</li>
<li><strong>Répondre</strong> : répondez à 100% des avis, positifs comme négatifs, dans les 24h. Google mesure votre réactivité.</li>
<li><strong>Analyser</strong> : identifiez les mots-clés récurrents dans vos avis positifs et intégrez-les dans votre description.</li>
</ul>
<p>Ne jamais acheter de faux avis. Google les détecte de mieux en mieux et les sanctions vont jusqu'à la suppression de la fiche.</p>`,
      },
      {
        id: 'google-posts',
        title: '5. Publier des Google Posts régulièrement',
        content: `<p>Les Google Posts sont un outil sous-estimé qui permet de publier du contenu directement sur votre fiche. Ils apparaissent dans les résultats de recherche et permettent d'<strong>augmenter votre taux de clic de 25%</strong> en moyenne.</p>
<h3>Types de posts efficaces</h3>
<ul>
<li><strong>Offres</strong> : promotions avec date de début et de fin (créent l'urgence).</li>
<li><strong>Nouveautés</strong> : nouveau produit, service, ou membre de l'équipe.</li>
<li><strong>Événements</strong> : portes ouvertes, ateliers, soirées spéciales.</li>
<li><strong>Mises à jour</strong> : changements d'horaires, nouvelles mesures, informations pratiques.</li>
</ul>
<p>Fréquence recommandée : <strong>2 posts par semaine minimum</strong>. Les posts expirent après 7 jours, donc la régularité est essentielle.</p>`,
      },
      {
        id: 'faq-fiche',
        title: '6. Alimenter la section FAQ',
        content: `<p>La section Questions/Réponses de votre fiche est une mine d'or SEO souvent ignorée. Elle vous permet d'<strong>injecter des mots-clés</strong> de manière naturelle tout en répondant aux interrogations de vos prospects.</p>
<h3>Stratégie FAQ</h3>
<ul>
<li>Posez vous-même les 10 à 15 questions les plus fréquentes de vos clients.</li>
<li>Répondez de manière détaillée en incluant vos mots-clés cibles.</li>
<li>Surveillez les nouvelles questions posées par les internautes et répondez rapidement.</li>
<li>Votez pour les questions les plus pertinentes pour les faire remonter.</li>
</ul>
<p>Chaque question-réponse est indexée par Google et peut apparaître directement dans les résultats de recherche.</p>`,
      },
      {
        id: 'attributs-services',
        title: '7. Configurer les attributs et services',
        content: `<p>Google propose des dizaines d'attributs spécifiques à votre secteur d'activité. Ces attributs permettent de vous démarquer dans les résultats et de répondre aux <strong>filtres de recherche</strong> des utilisateurs.</p>
<ul>
<li><strong>Attributs factuels</strong> : Wi-Fi gratuit, terrasse, parking, accessibilité PMR.</li>
<li><strong>Attributs subjectifs</strong> : ambiance cosy, adapté aux familles, idéal pour le travail.</li>
<li><strong>Services</strong> : listez tous vos services avec descriptions et fourchettes de prix.</li>
</ul>
<p>Mettez à jour vos attributs dès qu'un nouveau est disponible. Google ajoute régulièrement de nouvelles options selon les tendances.</p>`,
      },
      {
        id: 'coherence-nap',
        title: '8. Assurer la cohérence NAP',
        content: `<p>NAP signifie Name, Address, Phone. La cohérence de ces informations entre votre fiche Google, votre site web et les annuaires locaux est un <strong>facteur de confiance majeur</strong> pour Google.</p>
<h3>Check-list NAP</h3>
<ul>
<li>Vérifiez que votre nom est identique partout (pas d'abréviations sur un site et le nom complet sur un autre).</li>
<li>Utilisez exactement le même format d'adresse partout.</li>
<li>Inscrivez-vous sur les annuaires locaux principaux : PagesJaunes, Yelp, TripAdvisor, annuaires de votre secteur.</li>
<li>Supprimez les fiches doublons qui pourraient créer de la confusion.</li>
</ul>
<p>Un audit NAP complet devrait être réalisé au moins une fois par an. Siva peut automatiser cette vérification pour vous.</p>`,
      },
      {
        id: 'suivi-performance',
        title: '9. Suivre vos performances',
        content: `<p>Google Business Profile fournit des statistiques précieuses que trop peu d'entreprises exploitent. Ces données vous permettent d'<strong>ajuster votre stratégie</strong> en continu.</p>
<h3>Métriques clés à suivre</h3>
<ul>
<li><strong>Recherches</strong> : combien de fois votre fiche apparaît dans les résultats.</li>
<li><strong>Vues</strong> : combien d'utilisateurs voient votre fiche.</li>
<li><strong>Actions</strong> : appels, demandes d'itinéraire, visites du site web.</li>
<li><strong>Photos</strong> : combien de vues ont vos photos par rapport à la concurrence.</li>
</ul>
<p>Exportez ces données mensuellement et identifiez les tendances. Une baisse de visibilité peut signaler un problème à corriger rapidement.</p>`,
      },
      {
        id: 'conclusion',
        title: '10. Automatiser et itérer',
        content: `<p>L'optimisation d'une fiche Google Business Profile n'est pas un projet ponctuel, c'est un <strong>processus continu</strong>. Les entreprises qui dominent le Local Pack sont celles qui ont mis en place des routines d'optimisation régulières.</p>
<h3>Plan d'action recommandé</h3>
<ul>
<li><strong>Quotidien</strong> : répondre aux avis et questions.</li>
<li><strong>Hebdomadaire</strong> : publier 2 Google Posts et ajouter des photos.</li>
<li><strong>Mensuel</strong> : analyser les statistiques et ajuster la stratégie.</li>
<li><strong>Trimestriel</strong> : audit complet de la fiche et mise à jour des informations.</li>
</ul>
<p>Avec Siva, vous pouvez obtenir un <strong>audit gratuit de votre fiche</strong> en quelques minutes et identifier exactement les points à améliorer. C'est le point de départ idéal pour une optimisation efficace.</p>`,
      },
    ],
  },
  {
    slug: 'seo-local-vs-seo-classique',
    title: 'SEO local vs SEO classique : quelles différences pour votre business ?',
    excerpt:
      'Comprendre les mécanismes du référencement local et pourquoi il est devenu incontournable pour les commerces de proximité.',
    metaDescription:
      'SEO local vs SEO classique : découvrez les différences fondamentales, les facteurs de ranking spécifiques et pourquoi le SEO local est essentiel pour les commerces.',
    category: 'Éducation',
    tags: ['SEO Local', 'SEO Classique', 'Référencement', 'Google Maps', 'Commerces'],
    readTime: '6 min',
    readTimeMinutes: 6,
    date: '21 février 2026',
    dateISO: '2026-02-21',
    author: { name: 'Damien T.', role: 'Fondateur & Expert SEO Local', avatar: '/logo.svg' },
    coverImage: '/blog/blog-seo-local-vs-classique.png',
    sections: [
      {
        id: 'introduction',
        title: 'Introduction',
        content: `<p>Si vous possédez un commerce physique, vous avez probablement entendu parler de "SEO local". Mais en quoi est-il différent du SEO "classique" ? Et surtout, <strong>pourquoi devriez-vous y investir en priorité</strong> ?</p>
<p>En 2026, 46% de toutes les recherches Google ont une intention locale. Ignorer le SEO local, c'est se couper de près de la moitié de vos clients potentiels. Ce guide vous explique tout.</p>`,
      },
      {
        id: 'seo-classique',
        title: 'Le SEO classique : les fondamentaux',
        content: `<p>Le SEO classique (ou SEO organique) vise à positionner votre site web dans les <strong>résultats de recherche naturels</strong> de Google. Il repose sur trois piliers fondamentaux.</p>
<h3>Les 3 piliers du SEO classique</h3>
<ul>
<li><strong>Technique</strong> : vitesse de chargement, architecture du site, balisage sémantique, mobile-first.</li>
<li><strong>Contenu</strong> : articles de qualité, mots-clés pertinents, réponse à l'intention de recherche.</li>
<li><strong>Autorité</strong> : backlinks de qualité, mentions de marque, ancienneté du domaine.</li>
</ul>
<p>Le SEO classique est idéal pour les entreprises qui vendent en ligne ou qui ciblent un marché national/international. Mais pour un commerce de proximité, il ne suffit pas.</p>`,
      },
      {
        id: 'seo-local-specifiques',
        title: 'Le SEO local : un écosystème à part',
        content: `<p>Le SEO local intègre des <strong>facteurs de ranking spécifiques</strong> que le SEO classique ignore complètement. Il agit sur un écosystème propre : Google Maps, le Local Pack, et la Knowledge Panel locale.</p>
<h3>Les facteurs de ranking du SEO local</h3>
<ul>
<li><strong>Proximité</strong> : la distance entre le chercheur et votre établissement. C'est le facteur n°1.</li>
<li><strong>Pertinence</strong> : l'adéquation entre votre fiche et la requête de l'utilisateur.</li>
<li><strong>Notoriété</strong> : avis, citations locales, backlinks locaux, présence sur les annuaires.</li>
<li><strong>Fiche Google Business Profile</strong> : complétude, catégories, posts, photos, FAQ.</li>
<li><strong>Signaux comportementaux</strong> : taux de clic, temps passé, demandes d'itinéraire.</li>
</ul>
<p>Contrairement au SEO classique, le SEO local est fortement influencé par la <strong>géolocalisation de l'utilisateur</strong>. Votre position dans les résultats change selon l'endroit où se trouve l'internaute.</p>`,
      },
      {
        id: 'comparaison',
        title: 'Comparaison directe : les 5 différences clés',
        content: `<p>Pour bien comprendre les enjeux, voici un comparatif point par point entre les deux approches.</p>
<h3>1. Zone d'action</h3>
<p>Le SEO classique cible le web entier. Le SEO local cible un <strong>rayon géographique précis</strong> autour de votre établissement (généralement 5 à 15 km).</p>
<h3>2. Support principal</h3>
<p>Le SEO classique optimise votre site web. Le SEO local optimise votre <strong>fiche Google Business Profile</strong> en priorité, puis votre site.</p>
<h3>3. Facteurs de ranking</h3>
<p>Le SEO classique repose sur le contenu et les backlinks. Le SEO local ajoute la <strong>proximité, les avis, et la cohérence NAP</strong>.</p>
<h3>4. Résultats affichés</h3>
<p>Le SEO classique vise les 10 liens bleus. Le SEO local vise le <strong>Local Pack</strong> (les 3 résultats avec carte Google Maps).</p>
<h3>5. Vitesse de résultats</h3>
<p>Le SEO classique prend 6 à 12 mois. Le SEO local peut donner des résultats en <strong>2 à 4 semaines</strong> avec les bonnes optimisations.</p>`,
      },
      {
        id: 'pourquoi-priorite',
        title: 'Pourquoi le SEO local doit être votre priorité',
        content: `<p>Si vous avez un établissement physique, le SEO local offre le <strong>meilleur retour sur investissement</strong> de toutes les stratégies marketing digitales. Voici pourquoi :</p>
<ul>
<li><strong>76% des recherches locales</strong> aboutissent à une visite en magasin dans les 24h.</li>
<li>Le <strong>taux de conversion</strong> des recherches locales est 5x supérieur aux recherches classiques.</li>
<li>Le Local Pack capte <strong>44% des clics</strong> sur les pages de résultats locaux.</li>
<li>L'investissement est <strong>bien inférieur</strong> à une stratégie SEO classique complète.</li>
</ul>
<p>En résumé : le SEO local cible des clients qui sont déjà prêts à acheter, à proximité de chez vous. C'est le canal d'acquisition le plus rentable pour un commerce local.</p>`,
      },
      {
        id: 'strategie-combinee',
        title: 'La stratégie combinée idéale',
        content: `<p>L'idéal n'est pas de choisir entre SEO local et SEO classique, mais de les <strong>combiner intelligemment</strong>. Voici l'approche que nous recommandons chez Siva :</p>
<ul>
<li><strong>Phase 1 (mois 1-2)</strong> : optimisation complète de votre fiche Google Business Profile pour des résultats rapides.</li>
<li><strong>Phase 2 (mois 2-4)</strong> : création de pages locales sur votre site (page ville, landing pages services).</li>
<li><strong>Phase 3 (mois 4+)</strong> : stratégie de contenu blog orientée locale + acquisition de backlinks locaux.</li>
</ul>
<p>Cette approche en 3 phases permet de générer des résultats dès les premières semaines tout en construisant une présence durable.</p>`,
      },
    ],
  },
  {
    slug: 'avis-google-strategie',
    title: 'Stratégie avis Google : comment passer de 20 à 200 avis en 6 mois',
    excerpt:
      'Les techniques éprouvées pour collecter des avis authentiques et booster votre visibilité locale de manière éthique.',
    metaDescription:
      'Découvrez comment passer de 20 à 200 avis Google en 6 mois avec des techniques éthiques. Stratégie complète : collecte, réponses, et impact sur le SEO local.',
    category: 'Stratégie',
    tags: ['Avis Google', 'Réputation', 'E-réputation', 'SEO Local', 'Clients'],
    readTime: '7 min',
    readTimeMinutes: 7,
    date: '14 février 2026',
    dateISO: '2026-02-14',
    author: { name: 'Damien T.', role: 'Fondateur & Expert SEO Local', avatar: '/logo.svg' },
    coverImage: '/blog/blog-avis-google-strategie.png',
    sections: [
      {
        id: 'introduction',
        title: 'Introduction',
        content: `<p>Les avis Google sont devenus la <strong>monnaie de la confiance</strong> dans l'économie locale. 93% des consommateurs affirment que les avis en ligne influencent leur décision d'achat, et les fiches avec plus de 100 avis convertissent 3 fois mieux que celles qui en ont moins de 20.</p>
<p>Pourtant, la plupart des commerces stagnent à quelques dizaines d'avis, se plaignent du manque de retours, ou pire, sont tentés par des solutions douteuses. Ce guide vous donne un <strong>plan d'action concret et éthique</strong> pour multiplier vos avis par 10 en 6 mois.</p>`,
      },
      {
        id: 'impact-avis',
        title: 'L\'impact réel des avis sur votre business',
        content: `<p>Avant de passer à la stratégie, comprenons précisément <strong>pourquoi les avis sont si importants</strong>.</p>
<h3>Impact sur le SEO local</h3>
<ul>
<li>Les avis représentent <strong>17% des facteurs de ranking</strong> du Local Pack (Whitespark 2025).</li>
<li>La note moyenne, le volume d'avis et la fréquence de publication sont tous pris en compte.</li>
<li>Les mots-clés présents dans les avis clients améliorent votre pertinence thématique.</li>
</ul>
<h3>Impact sur la conversion</h3>
<ul>
<li>Passer de 3.5 à 4.5 étoiles augmente le taux de conversion de <strong>25%</strong>.</li>
<li>Les fiches avec des avis récents (moins d'un mois) ont un <strong>CTR supérieur de 73%</strong>.</li>
<li>Un avis négatif sans réponse fait fuir <strong>45% des prospects</strong>.</li>
</ul>`,
      },
      {
        id: 'canaux-collecte',
        title: 'Les 5 canaux de collecte les plus efficaces',
        content: `<p>La clé pour collecter massivement des avis, c'est de <strong>multiplier les points de contact</strong> et de rendre le processus le plus simple possible.</p>
<h3>1. Le SMS post-visite</h3>
<p>Envoyez un SMS personnalisé 2h après la visite du client. Le SMS a un taux d'ouverture de 98% et un taux de conversion en avis de <strong>15 à 25%</strong>.</p>
<h3>2. Le QR code en magasin</h3>
<p>Placez des QR codes à des endroits stratégiques : caisse, table, salle d'attente. Le client scanne et arrive directement sur le formulaire d'avis.</p>
<h3>3. L'email de suivi</h3>
<p>Intégrez une demande d'avis dans votre email de confirmation/remerciement. Moins performant que le SMS, mais complémentaire.</p>
<h3>4. La demande verbale</h3>
<p>Formez votre équipe à demander un avis aux clients satisfaits. "Votre avis sur Google nous aiderait énormément" est une phrase simple et efficace.</p>
<h3>5. Les réseaux sociaux</h3>
<p>Partagez vos meilleurs avis sur Instagram/Facebook avec un appel à l'action pour en laisser un. L'effet social proof fonctionne à plein.</p>`,
      },
      {
        id: 'repondre-avis',
        title: 'L\'art de répondre aux avis',
        content: `<p>Répondre aux avis est aussi important que les collecter. Google le prend en compte dans son algorithme, et c'est un <strong>signal de professionnalisme</strong> pour vos prospects.</p>
<h3>Avis positifs (4-5 étoiles)</h3>
<ul>
<li>Remerciez le client <strong>par son prénom</strong>.</li>
<li>Reprenez un <strong>détail spécifique</strong> de son expérience.</li>
<li>Intégrez un <strong>mot-clé naturellement</strong> dans votre réponse.</li>
<li>Invitez-le à revenir ou à découvrir un autre service.</li>
</ul>
<h3>Avis négatifs (1-3 étoiles)</h3>
<ul>
<li><strong>Ne jamais répondre à chaud</strong>. Attendez 24h.</li>
<li>Reconnaissez le problème sans vous justifier excessivement.</li>
<li>Proposez une <strong>solution concrète</strong> et un contact direct.</li>
<li>Restez professionnel et empathique. C'est votre vitrine publique.</li>
</ul>`,
      },
      {
        id: 'plan-6-mois',
        title: 'Le plan d\'action mois par mois',
        content: `<p>Voici le calendrier précis que nous recommandons pour passer de 20 à 200 avis en 6 mois.</p>
<h3>Mois 1-2 : Mise en place</h3>
<ul>
<li>Créez votre lien de dépôt d'avis raccourci.</li>
<li>Mettez en place le SMS automatique post-visite.</li>
<li>Installez des QR codes dans votre établissement.</li>
<li>Répondez à tous les avis existants sans réponse.</li>
<li><strong>Objectif : +30 avis</strong></li>
</ul>
<h3>Mois 3-4 : Accélération</h3>
<ul>
<li>Formez votre équipe à la demande verbale.</li>
<li>Lancez une campagne email sur vos clients fidèles.</li>
<li>Testez différents timings de SMS pour optimiser le taux de réponse.</li>
<li><strong>Objectif : +60 avis</strong></li>
</ul>
<h3>Mois 5-6 : Consolidation</h3>
<ul>
<li>Analysez quels canaux fonctionnent le mieux et doublez la mise.</li>
<li>Mettez en place un suivi social pour partager les meilleurs avis.</li>
<li>Commencez à collecter des avis avec photos (bonus SEO).</li>
<li><strong>Objectif : +90 avis</strong></li>
</ul>
<p>Total : 180 à 200+ nouveaux avis en 6 mois, de manière 100% éthique.</p>`,
      },
      {
        id: 'erreurs-eviter',
        title: 'Les erreurs fatales à éviter',
        content: `<p>Dans la course aux avis, certaines pratiques peuvent vous coûter <strong>très cher</strong>.</p>
<ul>
<li><strong>Acheter des faux avis</strong> : Google utilise l'IA pour les détecter. Sanction : suppression de tous les avis, voire de la fiche.</li>
<li><strong>Offrir des réductions contre un avis</strong> : c'est contraire aux guidelines Google et peut être signalé.</li>
<li><strong>Harceler les clients</strong> : une seule demande suffit. Deux relances maximum.</li>
<li><strong>Supprimer les avis négatifs</strong> : ne signalez que les avis clairement faux ou diffamatoires.</li>
<li><strong>Ignorer les avis négatifs</strong> : l'absence de réponse est pire que l'avis lui-même.</li>
</ul>
<p>La patience et l'authenticité sont vos meilleurs alliés. Un flux régulier d'avis authentiques sera toujours plus puissant qu'un pic de faux avis.</p>`,
      },
    ],
  },
  {
    slug: 'google-maps-pack-local',
    title: 'Google Maps Local Pack : comment atteindre le top 3',
    excerpt:
      "Décryptage des facteurs de ranking du Local Pack et plan d'action pour y apparaître sur vos mots-clés stratégiques.",
    metaDescription:
      'Guide complet pour apparaître dans le Local Pack Google Maps. Facteurs de ranking, stratégie pas à pas et outils pour atteindre le top 3 local.',
    category: 'SEO Local',
    tags: ['Local Pack', 'Google Maps', 'Top 3', 'Ranking Local', 'Visibilité'],
    readTime: '10 min',
    readTimeMinutes: 10,
    date: '7 février 2026',
    dateISO: '2026-02-07',
    author: { name: 'Damien T.', role: 'Fondateur & Expert SEO Local', avatar: '/logo.svg' },
    coverImage: '/blog/blog-google-maps-local-pack.png',
    sections: [
      {
        id: 'introduction',
        title: 'Introduction',
        content: `<p>Le <strong>Local Pack</strong> — ces 3 résultats avec carte Google Maps qui apparaissent en haut de page — capte 44% de tous les clics sur les recherches locales. Être dans le top 3 signifie capter un flux constant de clients qualifiés, prêts à acheter, à quelques minutes de votre établissement.</p>
<p>Mais la concurrence est féroce : il n'y a que 3 places. Voici le plan d'action complet pour y parvenir.</p>`,
      },
      {
        id: 'comprendre-local-pack',
        title: 'Comprendre le fonctionnement du Local Pack',
        content: `<p>Le Local Pack est un <strong>système de ranking distinct</strong> des résultats de recherche classiques. Google utilise un algorithme spécifique pour déterminer quels établissements méritent ces 3 places convoitées.</p>
<h3>Les 3 facteurs principaux selon Google</h3>
<ul>
<li><strong>Pertinence</strong> : à quel point votre fiche correspond à la recherche de l'utilisateur.</li>
<li><strong>Distance</strong> : la proximité géographique entre l'utilisateur et votre établissement.</li>
<li><strong>Proéminence</strong> : la notoriété de votre entreprise en ligne et hors ligne.</li>
</ul>
<p>Le poids relatif de ces facteurs varie selon la requête. Pour "restaurant", la distance pèse lourd. Pour "avocat spécialisé divorce", c'est la pertinence et la proéminence qui dominent.</p>`,
      },
      {
        id: 'facteurs-ranking',
        title: 'Les 8 facteurs de ranking détaillés',
        content: `<p>Au-delà des 3 critères officiels, les études de corrélation (Whitespark, BrightLocal) identifient <strong>8 facteurs clés</strong> qui déterminent votre position dans le Local Pack.</p>
<h3>1. Catégorie principale GBP (25%)</h3>
<p>Le facteur le plus lourd. Votre catégorie principale doit correspondre exactement à l'intention de recherche.</p>
<h3>2. Mots-clés dans le nom (16%)</h3>
<p>Si votre nom commercial contient naturellement le mot-clé cible, vous avez un avantage. Ne modifiez jamais artificiellement votre nom.</p>
<h3>3. Proximité (15%)</h3>
<p>Impossible à modifier, mais compensable par les autres facteurs si vous les maximisez.</p>
<h3>4. Avis (17%)</h3>
<p>Volume, note moyenne, fréquence et mots-clés dans le contenu des avis.</p>
<h3>5. Backlinks locaux (10%)</h3>
<p>Liens provenant de sites locaux : mairie, associations, presse locale, partenaires.</p>
<h3>6. Cohérence NAP (7%)</h3>
<p>Name, Address, Phone identiques sur toutes vos présences en ligne.</p>
<h3>7. Signaux on-page (5%)</h3>
<p>Votre site web doit confirmer les informations de votre fiche avec du contenu local optimisé.</p>
<h3>8. Signaux comportementaux (5%)</h3>
<p>Taux de clic, demandes d'itinéraire, appels depuis la fiche, time on site.</p>`,
      },
      {
        id: 'strategie-top3',
        title: 'Plan d\'action pour atteindre le top 3',
        content: `<p>Voici la stratégie pas à pas que nous appliquons chez Siva pour positionner nos clients dans le Local Pack.</p>
<h3>Étape 1 : Audit de départ</h3>
<p>Identifiez votre position actuelle sur vos 5 à 10 mots-clés principaux, dans différentes zones autour de votre établissement. L'outil d'audit gratuit de Siva fait exactement cela.</p>
<h3>Étape 2 : Optimisation de la fiche</h3>
<p>Appliquez les 10 étapes de notre guide d'optimisation GBP. Catégorie, description, photos, attributs : chaque détail compte.</p>
<h3>Étape 3 : Stratégie d'avis</h3>
<p>Lancez un programme de collecte d'avis systématique. Visez un rythme de 8 à 12 avis par mois.</p>
<h3>Étape 4 : Citations locales</h3>
<p>Inscrivez-vous sur les 20 annuaires locaux les plus importants avec des informations NAP cohérentes.</p>
<h3>Étape 5 : Contenu local sur votre site</h3>
<p>Créez des pages dédiées à chaque service + ville que vous ciblez. Ajoutez un blog avec du contenu local pertinent.</p>`,
      },
      {
        id: 'outils-suivi',
        title: 'Les outils pour mesurer votre progression',
        content: `<p>Vous ne pouvez pas améliorer ce que vous ne mesurez pas. Voici les outils essentiels pour <strong>suivre votre position</strong> dans le Local Pack.</p>
<ul>
<li><strong>Siva</strong> : audit gratuit avec heatmap de votre visibilité dans votre zone de chalandise. Idéal pour un premier diagnostic.</li>
<li><strong>Google Business Profile Insights</strong> : données natives sur les recherches, vues et actions.</li>
<li><strong>BrightLocal</strong> : suivi des positions local avec rapports détaillés.</li>
<li><strong>Whitespark</strong> : audit des citations et suivi du ranking local.</li>
</ul>
<p>Mesurez votre position chaque semaine et corrélezles avec vos actions d'optimisation pour identifier ce qui fonctionne le mieux dans votre contexte.</p>`,
      },
      {
        id: 'cas-concrets',
        title: 'Résultats concrets : 3 études de cas',
        content: `<p>Pour illustrer l'efficacité de cette stratégie, voici 3 résultats obtenus par des clients Siva.</p>
<h3>Boulangerie – Paris 11e</h3>
<p>De la position 8 à la position 2 sur "boulangerie Paris 11" en 6 semaines. <strong>+340% de demandes d'itinéraire</strong>.</p>
<h3>Cabinet d'avocats – Lyon</h3>
<p>Entrée dans le top 3 sur "avocat droit du travail Lyon" après 3 mois d'optimisation. <strong>+12 nouveaux clients/mois</strong>.</p>
<h3>Garage automobile – Bordeaux</h3>
<p>De 15 à 120 avis en 4 mois. Position 1 sur "garage Bordeaux centre". <strong>+85% de chiffre d'affaires</strong>.</p>
<p>Ces résultats sont atteignables pour tout commerce qui applique méthodiquement la stratégie décrite dans cet article.</p>`,
      },
    ],
  },
  {
    slug: 'erreurs-fiche-google',
    title: 'Les 7 erreurs qui ruinent votre fiche Google (et comment les corriger)',
    excerpt:
      'Catégories mal choisies, horaires incorrects, photos absentes… Identifiez et corrigez les erreurs qui vous coûtent des clients.',
    metaDescription:
      'Découvrez les 7 erreurs les plus courantes sur les fiches Google Business Profile et comment les corriger immédiatement pour récupérer des clients perdus.',
    category: 'Guide',
    tags: ['Erreurs GBP', 'Fiche Google', 'Optimisation', 'Correction', 'Visibilité'],
    readTime: '5 min',
    readTimeMinutes: 5,
    date: '31 janvier 2026',
    dateISO: '2026-01-31',
    author: { name: 'Damien T.', role: 'Fondateur & Expert SEO Local', avatar: '/logo.svg' },
    coverImage: '/blog/blog-erreurs-fiche-google.png',
    sections: [
      {
        id: 'introduction',
        title: 'Introduction',
        content: `<p>Après avoir audité plus de 1 000 fiches Google Business Profile, nous avons identifié <strong>7 erreurs récurrentes</strong> qui reviennent chez la grande majorité des commerces. Ces erreurs semblent anodines, mais elles ont un impact direct sur votre visibilité et votre chiffre d'affaires.</p>
<p>La bonne nouvelle ? Elles sont toutes <strong>corrigeables en quelques minutes</strong>. Voici comment les identifier et les résoudre.</p>`,
      },
      {
        id: 'erreur-1',
        title: 'Erreur 1 : Catégorie principale trop générique',
        content: `<p>C'est l'erreur la plus coûteuse. Choisir "Restaurant" au lieu de "Restaurant japonais" ou "Médecin" au lieu de "Dermatologue" peut vous faire <strong>disparaître des résultats pertinents</strong>.</p>
<h3>Comment corriger</h3>
<ul>
<li>Allez dans votre tableau de bord GBP → Informations → Catégorie.</li>
<li>Recherchez la catégorie la plus spécifique qui décrit votre activité principale.</li>
<li>Ajoutez 3 à 5 catégories secondaires pour couvrir vos services annexes.</li>
</ul>
<p>Résultat attendu : amélioration de votre positionnement en <strong>1 à 3 semaines</strong>.</p>`,
      },
      {
        id: 'erreur-2',
        title: 'Erreur 2 : Horaires incorrects ou manquants',
        content: `<p>38% des fiches que nous auditons ont des horaires incorrects. C'est un <strong>signal négatif direct</strong> pour Google, et c'est la raison n°1 des avis négatifs type "nous sommes venus mais c'était fermé".</p>
<h3>Comment corriger</h3>
<ul>
<li>Vérifiez chaque jour de la semaine, y compris les pauses déjeuner si applicable.</li>
<li>Ajoutez les horaires exceptionnels (jours fériés, vacances, événements spéciaux).</li>
<li>Activez les alertes Google pour être notifié si quelqu'un suggère un changement.</li>
</ul>`,
      },
      {
        id: 'erreur-3',
        title: 'Erreur 3 : Aucune photo ou photos de mauvaise qualité',
        content: `<p>Une fiche sans photo perd <strong>42% de chances</strong> de recevoir une demande d'itinéraire. Et des photos floues, sombres ou non représentatives font pire que pas de photo du tout.</p>
<h3>Comment corriger</h3>
<ul>
<li>Prenez des photos en lumière naturelle, avec un smartphone récent suffit.</li>
<li>Ajoutez minimum 10 photos : façade, intérieur, produits, équipe.</li>
<li>Renommez vos fichiers avec des mots-clés avant l'upload (ex : "boulangerie-paris-11-vitrine.jpg").</li>
<li>Publiez 2 à 3 nouvelles photos par semaine.</li>
</ul>`,
      },
      {
        id: 'erreur-4',
        title: 'Erreur 4 : Description vide ou remplie de mots-clés',
        content: `<p>La description de votre fiche est lue par les clients et par Google. Une description vide gaspille une opportunité SEO. Une description bourrée de mots-clés fait fuir les clients.</p>
<h3>Comment corriger</h3>
<ul>
<li>Écrivez 750 caractères maximum (la limite Google).</li>
<li>Commencez par votre activité principale et votre localisation.</li>
<li>Mettez en avant vos points forts et ce qui vous différencie.</li>
<li>Intégrez vos mots-clés de manière naturelle, comme dans une conversation.</li>
</ul>`,
      },
      {
        id: 'erreur-5',
        title: 'Erreur 5 : Ne pas répondre aux avis',
        content: `<p>53% des consommateurs s'attendent à une réponse à leur avis dans les 7 jours. Ne pas répondre envoie un signal de <strong>désintérêt</strong> tant aux clients qu'à Google.</p>
<h3>Comment corriger</h3>
<ul>
<li>Mettez en place une alerte pour chaque nouvel avis.</li>
<li>Répondez dans les 24h avec un message personnalisé.</li>
<li>Pour les avis négatifs, proposez une solution et un contact direct.</li>
<li>Intégrez des mots-clés naturellement dans vos réponses.</li>
</ul>`,
      },
      {
        id: 'erreur-6',
        title: 'Erreur 6 : Incohérence NAP',
        content: `<p>Si votre nom, adresse ou numéro de téléphone diffèrent entre votre fiche Google, votre site et les annuaires, Google <strong>perd confiance</strong> et rétrograde votre positionnement.</p>
<h3>Comment corriger</h3>
<ul>
<li>Faites un audit de toutes vos présences en ligne.</li>
<li>Harmonisez le format exact du nom, de l'adresse et du téléphone partout.</li>
<li>Supprimez les fiches doublons sur Google et les annuaires.</li>
<li>Mettez à jour les annuaires obsolètes ou incorrects.</li>
</ul>`,
      },
      {
        id: 'erreur-7',
        title: 'Erreur 7 : Ignorer les Google Posts',
        content: `<p>90% des commerces n'utilisent jamais les Google Posts. C'est comme avoir un panneau publicitaire gratuit devant votre magasin et ne jamais rien y afficher.</p>
<h3>Comment corriger</h3>
<ul>
<li>Publiez au minimum 1 post par semaine (idéalement 2 à 3).</li>
<li>Alternez entre offres, actualités, événements et conseils.</li>
<li>Ajoutez toujours une image et un appel à l'action.</li>
<li>Utilisez des mots-clés dans le texte du post.</li>
</ul>
<p>Corrigez ces 7 erreurs et vous verrez une amélioration significative de votre visibilité en <strong>2 à 4 semaines</strong>. Pour un audit complet et personnalisé de votre fiche, testez l'outil gratuit de Siva.</p>`,
      },
    ],
  },
  {
    slug: 'roi-seo-local',
    title: "ROI du SEO local : combien rapporte vraiment l'investissement ?",
    excerpt:
      'Chiffres réels, études de cas et méthode de calcul pour évaluer le retour sur investissement de votre stratégie SEO locale.',
    metaDescription:
      'Calculez le ROI réel du SEO local avec notre méthode et nos chiffres concrets. Études de cas, formules et comparaison avec les autres canaux marketing.',
    category: 'Business',
    tags: ['ROI', 'Investissement', 'Business', 'Rentabilité', 'SEO Local'],
    readTime: '9 min',
    readTimeMinutes: 9,
    date: '24 janvier 2026',
    dateISO: '2026-01-24',
    author: { name: 'Damien T.', role: 'Fondateur & Expert SEO Local', avatar: '/logo.svg' },
    coverImage: '/blog/blog-roi-seo-local.png',
    sections: [
      {
        id: 'introduction',
        title: 'Introduction',
        content: `<p>La question que se posent tous les dirigeants : <strong>"Combien va me rapporter le SEO local ?"</strong>. C'est une question légitime, et contrairement à ce qu'on pourrait penser, il est tout à fait possible d'y répondre avec des chiffres concrets.</p>
<p>Dans cet article, nous allons vous donner une <strong>méthode de calcul simple</strong>, des chiffres moyens par secteur, et des études de cas réels pour que vous puissiez évaluer le potentiel du SEO local pour votre business.</p>`,
      },
      {
        id: 'formule-roi',
        title: 'La formule de calcul du ROI',
        content: `<p>Le ROI du SEO local se calcule comme tout autre investissement marketing :</p>
<p><strong>ROI = (Revenus générés - Coût du SEO) / Coût du SEO × 100</strong></p>
<p>Pour calculer les revenus générés, vous avez besoin de 4 métriques :</p>
<ul>
<li><strong>Impressions mensuelles</strong> : combien de fois votre fiche apparaît dans les recherches.</li>
<li><strong>Taux de clic</strong> : pourcentage d'impressions qui se transforment en visites de fiche (moyenne : 5-8%).</li>
<li><strong>Taux de conversion</strong> : pourcentage de visites qui se transforment en action (appel, itinéraire) (moyenne : 3-7%).</li>
<li><strong>Valeur moyenne d'un client</strong> : le chiffre d'affaires moyen qu'un nouveau client vous rapporte sur un an.</li>
</ul>
<p>Exemple : 10 000 impressions × 6% CTR × 5% conversion × 500€ valeur client = <strong>15 000€/mois de revenus</strong>.</p>`,
      },
      {
        id: 'chiffres-secteur',
        title: 'Chiffres moyens par secteur',
        content: `<p>Voici les <strong>benchmarks de performance</strong> que nous observons chez nos clients Siva, par secteur d'activité.</p>
<h3>Restauration</h3>
<ul>
<li>Coût moyen SEO local : 300-600€/mois</li>
<li>Nouveaux clients générés : 30-80/mois</li>
<li>Valeur panier moyen : 25-40€</li>
<li><strong>ROI moyen : 400-800%</strong></li>
</ul>
<h3>Professions libérales (avocats, médecins, comptables)</h3>
<ul>
<li>Coût moyen SEO local : 500-1000€/mois</li>
<li>Nouveaux clients générés : 5-15/mois</li>
<li>Valeur client annuelle : 1 500-5 000€</li>
<li><strong>ROI moyen : 600-1500%</strong></li>
</ul>
<h3>Commerce de détail</h3>
<ul>
<li>Coût moyen SEO local : 300-500€/mois</li>
<li>Nouveaux clients générés : 20-50/mois</li>
<li>Panier moyen : 50-150€</li>
<li><strong>ROI moyen : 500-1000%</strong></li>
</ul>
<h3>Services à domicile (plombier, électricien, serrurier)</h3>
<ul>
<li>Coût moyen SEO local : 400-800€/mois</li>
<li>Nouveaux clients générés : 10-30/mois</li>
<li>Valeur intervention moyenne : 150-400€</li>
<li><strong>ROI moyen : 500-1200%</strong></li>
</ul>`,
      },
      {
        id: 'comparaison-canaux',
        title: 'Comparaison avec les autres canaux marketing',
        content: `<p>Pour mesurer la pertinence du SEO local, comparons son <strong>coût par acquisition client</strong> avec les autres canaux.</p>
<h3>Coût par acquisition client (CPA)</h3>
<ul>
<li><strong>SEO local</strong> : 8-25€/client</li>
<li><strong>Google Ads</strong> : 30-80€/client</li>
<li><strong>Facebook/Instagram Ads</strong> : 15-50€/client</li>
<li><strong>Flyers/prospectus</strong> : 50-200€/client</li>
<li><strong>Bouche-à-oreille</strong> : 0€ (mais non scalable)</li>
</ul>
<p>Le SEO local a le CPA le plus bas de tous les canaux marketing payants. Et contrairement aux publicités, les <strong>résultats se cumulent</strong> dans le temps : chaque mois d'optimisation renforce votre position pour les mois suivants.</p>`,
      },
      {
        id: 'effet-cumule',
        title: 'L\'effet cumulé : la vraie puissance du SEO local',
        content: `<p>La grande différence entre le SEO local et la publicité, c'est l'<strong>effet composé</strong>. Quand vous arrêtez une campagne Google Ads, les résultats s'arrêtent immédiatement. Quand vous arrêtez le SEO local, les résultats persistent pendant des mois.</p>
<h3>Projection sur 12 mois</h3>
<ul>
<li><strong>Mois 1-3</strong> : investissement initial, premiers résultats (ROI 100-200%).</li>
<li><strong>Mois 4-6</strong> : accélération, effet des avis et des citations (ROI 300-500%).</li>
<li><strong>Mois 7-12</strong> : position dominante, flux constant de clients (ROI 600-1500%).</li>
</ul>
<p>Sur 12 mois, un investissement de 6 000€ en SEO local génère en moyenne entre <strong>36 000€ et 90 000€ de revenus supplémentaires</strong> pour un commerce local.</p>`,
      },
      {
        id: 'calculer-votre-roi',
        title: 'Calculez votre ROI potentiel',
        content: `<p>Pour estimer votre ROI potentiel, répondez à ces 4 questions :</p>
<ul>
<li><strong>Combien de recherches locales</strong> concernent votre activité dans votre zone ? (Ex : "plombier Lyon" = 2 400 recherches/mois)</li>
<li><strong>Quelle est votre position actuelle</strong> dans le Local Pack ? (Position 1 = 30% CTR, Position 3 = 10%, hors top 3 = 2%)</li>
<li><strong>Quel est votre taux de conversion</strong> fiche → client ? (Moyenne : 5%)</li>
<li><strong>Quelle est la valeur d'un client</strong> sur un an ?</li>
</ul>
<p><strong>Formule rapide</strong> : Recherches mensuelles × CTR × 5% × Valeur client = Revenus mensuels potentiels</p>
<p>Exemple : un plombier à Lyon avec 2 400 recherches/mois, s'il passe de la position 8 (2% CTR) à la position 2 (25% CTR), passe de 2 400€/mois à <strong>30 000€/mois</strong> de revenus générés par Google.</p>
<p>Pour un calcul personnalisé et gratuit, lancez un audit Siva. Notre outil estime automatiquement le revenu potentiel en fonction de votre position et de votre secteur.</p>`,
      },
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function getRelatedPosts(currentSlug: string, limit = 3): BlogPost[] {
  const current = getPostBySlug(currentSlug);
  if (!current) return BLOG_POSTS.slice(0, limit);

  return BLOG_POSTS.filter((p) => p.slug !== currentSlug)
    .sort((a, b) => {
      const aScore = a.category === current.category ? 2 : a.tags.some((t) => current.tags.includes(t)) ? 1 : 0;
      const bScore = b.category === current.category ? 2 : b.tags.some((t) => current.tags.includes(t)) ? 1 : 0;
      return bScore - aScore;
    })
    .slice(0, limit);
}
