# Prompt Lovable — Reproduire l'UX de la Homepage Siva

> Colle ce prompt directement dans Lovable pour recréer l'UX complète de la homepage.

---

## PROMPT LOVABLE

Crée une homepage complète pour une agence SEO local appelée **Siva**, spécialisée dans la visibilité Google Maps. Reproduis fidèlement l'UX, les sections, les animations et le design system ci-dessous.

---

## DESIGN SYSTEM

### Palette de couleurs
```
warm-bg: #F7F3ED        (fond principal)
warm-50:  #FAF8F4
warm-100: #F0EBE3
warm-200: #E3DCD2
warm-300: #D1C7BA
warm-400: #B5A899
warm-500: #8B7E72
warm-600: #6B5F54
warm-700: #4A403A
warm-800: #342C27
warm-900: #1A1714       (fond dark / texte principal)

accent:        #F0C75E  (jaune doré - couleur d'accent)
accent-hover:  #E8BD4A
accent-light:  #FDF8E8
accent-dark:   #D4A82E

positive: #2D8B57
```

### Typographie
- **Sans-serif principale** : Switzer (via fontshare API) + Geist Sans
- **Serif italique pour accents** : Instrument Serif (Google Fonts) — utilisée pour les mots en italique en gros titre
- Les `h1`, `h2` ont `font-weight: 300` (light)
- Classes de taille :
  - `text-display-xl` : 5rem, lh 1.1, ls -0.0625em
  - `text-display-lg` : 4.25rem, lh 1.1, ls -0.05em
  - `text-display` : 3rem, lh 1.12, ls -0.02em
  - `text-heading-xl` : 2.25rem, lh 1.2, ls -0.015em
  - `text-heading-mobile` : 1.875rem, lh 1.2, ls -0.015em
  - `text-body-lg` : 1.125rem, lh 1.7
  - `text-body` : 1rem, lh 1.7
  - `text-body-sm` : 0.875rem, lh 1.6

### Effets visuels clés
- **Fond global** : `#F7F3ED` (beige chaud)
- **Hero** : fond avec gradient radial jaune doré subtil + grain SVG + grille de points
- **Animations scroll** : `framer-motion` avec `whileInView` et variants (fade-up, blur-in, scale-up, slide-left/right, rotate-in)
- **Stickers flottants** : emojis animés (🗺️ ⭐ 🔥 📈) avec float/bob/sway/pulse
- **Underline animée** sur le mot accent dans le H1 (pulsation jaune)
- **Marquee logos** : défilement horizontal infini
- **Marquee témoignages** : 2 rangées, une vers la gauche, une vers la droite, pause au hover

### Boutons
```css
/* btn-primary : fond noir, texte blanc, pastille blanche avec flèche →  */
.btn-primary {
  background: #1A1714;
  color: white;
  border-radius: 9999px;
  padding: 0.25rem 0.25rem 0.25rem 1.15rem;
  /* pastille blanche à droite avec flèche → */
}

/* btn-secondary : fond beige, bordure warm-300 */
.btn-secondary {
  background: #F0EBE3;
  border: 1px solid #D1C7BA;
  border-radius: 9999px;
  padding: 0.625rem 1.25rem;
}

/* btn-accent : fond jaune #F0C75E, texte dark */
.btn-accent { background: #F0C75E; color: #1A1714; border-radius: 9999px; }

/* btn-outline-light : transparent, bordure blanche/30, texte blanc */
.btn-outline-light { border: 1px solid rgba(255,255,255,0.3); color: white; border-radius: 9999px; }
```

---

## STRUCTURE DE LA PAGE

### 1. HEADER (sticky, backdrop-blur)
- Bandeau top sombre (#1A1714) avec : "🔥 2 places dispo" badge jaune + "Boost Avis Expérience — Plus que **2 places en Mars** pour tester l'expérience" → bouton fermer (X)
- Navbar : Logo SVG "Siva" | dropdown "Nos services" | dropdown "Ressources" | "Ambassadeur" | "FAQ" | btn "Nous contacter" (secondaire) | btn "Prendre rendez-vous" (primaire avec badge rouge "1")
- **Dropdown Services** : Audit Gratuit, Optimisation Fiche Google, Boost Avis Expérience, Google Ads Local — chaque item avec icône + description
- **Dropdown Ressources** : Blog, FAQ, Glossaire
- Mobile : hamburger → menu accordéon

---

### 2. HERO SECTION
**Fond** : Gradient radial jaune doré + grain SVG + grille de points
**Stickers animés flottants** : 🗺️ (haut gauche), ⭐ (haut droite), 🔥 (bas gauche), 📈 (bas droite)

**Contenu centré** :
1. Pill badge : "📍 Agence SEO local basée à Paris"
2. H1 (font-light, très grand) : "On propulse votre business à la 1ère place de *Google Maps.*" (le mot "Google Maps." en italique serif avec soulignement animé jaune)
3. Sous-titre : "Plus de visibilité, plus d'appels, plus de clients. Nous aidons des entreprises ambitieuses à dominer leur zone géographique sur Google Maps."
4. 2 boutons : "Parler à un expert" (primaire) + "Audit gratuit" (secondaire)
5. Badge Google reviews : logo Google + 5 étoiles jaunes + "4.9/5 · 67 avis Google"

---

### 3. LOGOS MARQUEE (bordure haut/bas)
11 logos clients en niveaux de gris, défilement horizontal infini, opacity 40% → 70% au hover + couleur

---

### 4. RÉSULTATS / SHOWCASE
Label : "Nos derniers résultats"
H2 : "+150 fiches propulsées dans le top 3"
Sous-titre : "Pas des promesses — des positions. Voici ce qu'on obtient pour nos clients."

**3 cartes** (style Google Maps local pack) :
Chaque carte montre une recherche Google avec les 3 résultats du local pack. Le résultat client est surligné en vert (bg-green-50, texte vert, ring vert). Footer de carte : "Résultat obtenu en X mois" + badge "Client Siva"

Données :
- "restaurant italien Paris 11" → Le Comptoir (1er, surligné), Trattoria Bella, Il Palazzo — 4 mois
- "dentiste Paris 16" → Cabinet Dentaire Rivière (1er, surligné), Dr Martin, Centre Dentaire Auteuil — 3 mois
- "garage automobile Boulogne" → Speedy, Norauto, Garage Auto Prestige (3e, surligné) — 5 mois

---

### 5. PRICING / OFFRES
Label : "Nos offres"
H2 : "Des solutions pour transformer votre fiche Google en machine à clients"

**Sélecteur d'établissements** (1 à 5+) avec pilule animée et réduction progressive :
- 1 étab : 0%
- 2 étabs : -15%
- 3 étabs : -20%
- 4 étabs : -25%
- 5+ étabs : -30%

**3 cartes pricing** :

**Card 1 — Audit Fiche Google** (gratuit)
- Tag : "Gratuit"
- Prix : "Gratuit"
- Promise : "Découvrez les axes d'amélioration de votre fiche Google en 2 minutes."
- Features : Analyse visibilité locale / Score d'optimisation / Recommandations personnalisées / Comparaison concurrents / Rapport par email
- CTA : "Lancer mon audit gratuit" → /audit-gratuit

**Card 2 — Optimisation Fiche Google** (highlighted, badge "Populaire")
- Tag : "One-shot"
- Prix : 790€ HT (avec réduction selon nb d'étabs)
- Promise : "Une fiche Google 100% optimisée qui convertit les recherches en clients."
- Features : Audit complet / Optimisation catégories, attributs, description / Upload photos / Setup Q&A, produits, horaires / Posts Google / Cohérence NAP annuaires
- CTA : "Prendre rendez-vous" → /rendez-vous
- Style : bordure accent/30, ombre jaune, `scale-105` sur desktop, bg gradient accent léger

**Card 3 — Boost Avis Expérience** (badge "Candidature requise")
- Tag : "Sélectif"
- Prix : "Sur devis"
- Promise : "De vrais clients, de vraies visites, de vrais avis Google."
- Features : Des étudiants visitent votre établissement / Ils vivent une expérience réelle / Ils laissent un avis authentique / 100% conforme CGU Google
- CTA : "Déposer ma candidature" → /rendez-vous

---

### 6. COMMENT ÇA MARCHE (fond dark #1A1714)
Label : "3 étapes, c'est tout"
H2 : "Comment ça *marche.*"
Sous-titre : "Pas de process compliqué. On s'occupe de tout pour que vous puissiez vous concentrer sur votre activité."

**3 étapes avec mockup UI** :

**Étape 1 — Prise de rendez-vous**
Mockup : Mini widget calendrier style Calendly (blanc, coins arrondis, ombre)
- Header : avatar "S" + "Sandro T." + "Appel Découverte" + "15 min" + "Google Meet"
- Corps : calendrier Mars 2026, dates disponibles en bleu #0069ff, date sélectionnée fond bleu, date actuelle avec bordure
- Texte : "Réservez un créneau de 15 min avec notre équipe."

**Étape 2 — Audit gratuit**
Mockup : Dashboard d'audit
- Score 32/100 dans un cercle rouge
- 3 barres de progression : Fiche Google 40% (rouge), Positions locales 18% (rouge), Avis & réputation 35% (orange)
- Alerte : "✨ 5 axes d'amélioration détectés"
- Texte : "On analyse votre fiche Google, vos positions, vos concurrents et vos avis."

**Étape 3 — On booste votre présence**
Mockup : Google Maps local pack
- Barre de recherche : "restaurant italien paris 11"
- 3 résultats : "Votre établissement" (1er, surligné vert, badge "+10"), Concurrent A, Concurrent B
- Badge : "✓ Top 1 · Zone couverte à 92%"
- Texte : "Notre équipe optimise votre visibilité sur Google Maps."

CTA centré : "Prendre rendez-vous" (btn-outline-light)

---

### 7. VALUE PROPS / MÉTHODE (fond warm-100 #F0EBE3)
Label : "Notre méthode"
H2 : "Les avantages de notre *approche.*"
Sous-titre : "Une méthode complète, data-driven et pilotée par l'IA pour maximiser votre visibilité locale."

**6 cartes** en grille 3 colonnes :

1. **IA intégrée** — "L'IA fait le travail invisible" — Nos algorithmes analysent des centaines de signaux en temps réel…
2. **Zone par zone** — "Scan précis, zone par zone" — Pas de moyenne globale. On analyse votre positionnement rue par rue…
3. **+8 ans d'expérience** — "Le SEO local, rien d'autre" — On ne fait pas de SEO "classique"…
4. **100% data-driven** — "100% piloté par la data" — Chaque décision est basée sur des chiffres réels…
5. **Droit au but** — "Pas de bla-bla, des résultats" — On ne vend pas des slides ou des rapports de 50 pages…
6. **1/sem de suivi** — "Un suivi serré, chaque semaine" — Chaque semaine, vous recevez un point sur vos positions…

Chaque carte : icône macOS-style (cadre gris métallique, intérieur blanc/gris, ombre), stat en uppercase tracking-wide, titre, description.

---

### 8. BLOG
Label : "Notre blog"
H2 : "Nos conseils pour votre *fiche Google*"
3 articles en grille :
1. "10 astuces pour optimiser votre fiche Google Business" (tag: Optimisation, 5 min)
2. "Comment obtenir (et gérer) plus d'avis Google" (tag: Avis clients, 4 min)
3. "Google Maps : les erreurs qui plombent votre classement" (tag: SEO local, 6 min)
Chaque carte : image/placeholder, tag pill jaune, titre, excerpt, "X min de lecture" + "Lire l'article →"

---

### 9. TÉMOIGNAGES (marquee infini, 2 rangées)
Label : "Avis clients"
H2 : "+150 entreprises accompagnées"
Badge : logo Google + 5 étoiles + "4.9/5 · 67 avis Google"

**Rangée 1** (défile vers la gauche) :
- Marie L. · Restauratrice · Le Bouillon Chartier · Paris ★★★★★ — "En 3 mois, on est passé de la 12e à la 2e position..."
- Thomas B. · Dentiste · Centre Dentaire Bellecour · Lyon ★★★★★ — "La heatmap m'a ouvert les yeux..."
- Sophie R. · Avocate · Cabinet Voltaire Avocats · Bordeaux ★★★★★ — "Rapport impressionnant dès l'audit gratuit..."
- Julien D. · Plombier · Plomberie du Vieux-Port · Marseille ★★★★ — "Avant Siva, on n'existait pas sur Google Maps..."

**Rangée 2** (défile vers la droite) :
- David K. · Gérant · Garage du Capitole · Toulouse ★★★★★ — "Sandro et son équipe comprennent parfaitement..."
- Camille M. · Opticienne · Optique Saint-Germain · Nantes ★★★★★ — "L'approche data-driven de Siva est bluffante..."
- Lucas P. · Boulanger · Boulangerie Maison Kayser · Strasbourg ★★★★★ — "On hésitait à investir dans le digital..."
- Dr Leroy · Médecin · Cabinet Médical Haussmann · Paris ★★★★★ — "En tant que professionnel de santé..."

Chaque carte : largeur 280px (380px sm), padding 20px, note étoiles, citation, séparateur, avatar + nom établissement + rôle/ville

**Les 2 rangées se mettent en pause au hover.**

---

### 10. FAQ
Label : "FAQ"
H2 : "Encore des questions ?"
Accordion avec 8 questions/réponses dans une carte blanche arrondie :

1. Qu'est-ce que Siva fait concrètement ? — Siva est une agence spécialisée en visibilité locale sur Google Maps...
2. Comment fonctionne le "Boost Avis Expérience" ? — Des étudiants sélectionnés visitent réellement votre établissement...
3. L'audit gratuit est-il vraiment gratuit ? — Oui, 100% gratuit et sans engagement...
4. Combien de temps avant de voir des résultats ? — Les premiers effets sont visibles en 2 à 4 semaines...
5. Quel est le prix de vos services ? — L'audit est gratuit. L'optimisation complète à 500€ HT...
6. Y a-t-il un engagement de durée ? — Aucun engagement minimum...
7. C'est adapté pour un indépendant ou une petite entreprise ? — Absolument. La majorité de nos clients sont des indépendants et TPE...
8. Garantissez-vous la première position sur Google Maps ? — Personne ne peut honnêtement garantir la 1ère position...

Style : bordure warm-200 entre items, flèche rotative (90° → -90° quand ouvert), animation height auto

---

### 11. AUDIT CTA
Label : "Avant de parler stratégie"
H2 : "Vérifiez votre potentiel local en 30 secondes."

**Layout 2 colonnes** :

**Colonne gauche** :
- Texte intro
- 4 bullets ✓ : Score d'optimisation sur 100 / Heatmap de vos positions locales / Analyse de vos 3 concurrents / Recommandations IA personnalisées
- Note : "⏱ Gratuit, sans carte bancaire, résultat immédiat."

**Colonne droite** (bg warm-50, Google Maps en fond flouté via iframe embed) :
- Titre : "Cherchez votre établissement"
- Input de recherche d'établissement (autocomplete Google Places)
- Note sous l'input : "Tapez le nom de votre commerce, restaurant, cabinet..."

---

### 12. FINAL CTA (fond dark #1A1714, arrondi en haut)
**Layout 2 colonnes** :

**Gauche** :
H2 : "Prêt à dominer *Google Maps* ?" (Google Maps en jaune accent italic)
Sous-titre : "Rejoignez +150 entreprises locales qui nous font confiance pour dominer Google Maps."

**Droite** (card glassmorphism border white/8, bg white/4) :
Titre : "Recevez nos conseils SEO local"
Sous-titre : "1 email par semaine. Astuces concrètes pour booster votre fiche Google. Désabonnement en 1 clic."
Form : input email + btn "S'inscrire" (accent jaune)
Note : "🛡 Pas de spam. On respecte votre boîte mail."

---

### 13. FOOTER (fond dark #1A1714)
**Grille 5 colonnes** :
1. Logo blanc + description + icônes LinkedIn / Instagram
2. Services : Audit Gratuit / Optimisation Fiche Google / Boost Avis Expérience / Google Ads Local
3. Navigation : Nos services / FAQ / Blog / Glossaire / Contact / Prendre rendez-vous
4. Contact : +33 7 60 55 40 00 / contact@siva.local / Prendre rendez-vous
5. Entreprise : Mentions légales / Politique de confidentialité / Cookies

**Section villes** : "Présents dans toute la France" + liste de liens villes (Paris, Lyon, Marseille, Bordeaux, Toulouse, Nantes, Nice, Strasbourg, Lille, Rennes, Montpellier, etc.)

**Copyright** : © 2025 Siva. Tous droits réservés.

---

## ANIMATIONS À REPRODUIRE

### Composant `<Reveal>`
```jsx
// Wrapper d'animation scroll-triggered avec framer-motion
// Variantes : fade-up, blur-in, scale-up, slide-left, slide-right, rotate-in
// viewport: once: true, margin: '-60px'
// transition: duration 0.85, ease [0.22, 1, 0.36, 1]
```

### Stickers flottants
```jsx
// Emojis avec animation float/bob/sway/pulse en loop
// float: y[0,-14,0] + x[0,6,0]
// bob: y[0,-8,2,-8,0] + x[0,-3,0,3,0]
// sway: y + x + rotation oscillante
// pulse: y + scale[1, 1.08, 1]
// whileHover: scale 1.3 + rotation +10
```

### Marquees
```css
/* Logos */
@keyframes marquee-scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.logos-marquee { animation: marquee-scroll 25s linear infinite; width: max-content; }

/* Témoignages */
@keyframes testimonial-scroll-left { 0%{translateX(0)} 100%{translateX(-50%)} }
@keyframes testimonial-scroll-right { 0%{translateX(-50%)} 100%{translateX(0)} }
/* Pause au hover du parent */
.testimonials-row:hover .testimonials-track { animation-play-state: paused; }
```

### Underline accent titre
```css
.serif-accent-animated::after {
  content: '';
  position: absolute;
  bottom: 4px; left: 0; right: 0; height: 6px;
  background: linear-gradient(90deg, transparent 2%, rgba(240,199,94,0.9) 15%, #F0C75E 50%, rgba(240,199,94,0.9) 85%, transparent 98%);
  border-radius: 3px;
  animation: accent-underline-pulse 3s ease-in-out infinite;
}
@keyframes accent-underline-pulse {
  0%, 100% { opacity: 0.6; transform: scaleX(0.92); }
  50% { opacity: 1; transform: scaleX(1); }
}
```

### Hero glow
```css
.hero-glow {
  position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
  width: 700px; height: 700px;
  background: radial-gradient(circle, rgba(240,199,94,0.1) 0%, transparent 70%);
  animation: pulse-glow 4s ease-in-out infinite;
}
@keyframes pulse-glow {
  0%, 100% { opacity: 0.5; transform: translate(-50%,-50%) scale(1); }
  50% { opacity: 1; transform: translate(-50%,-50%) scale(1.15); }
}
```

---

## NOTES SUPPLÉMENTAIRES

- **Scroll progress bar** : barre fine (#F0C75E) en haut de page qui suit le scroll avec glow jaune
- **Chatbot WhatsApp** : bouton flottant en bas à droite
- **Cookie banner** : bandeau bas de page
- **Exit intent popup** : popup qui s'affiche quand l'utilisateur s'apprête à quitter
- **section-label** : petite étiquette au-dessus des titres avec trait horizontal et texte uppercase tracking-widest
- **Fonts** : importer Switzer via `https://api.fontshare.com/v2/css?f[]=switzer@100,200,300,400,500,600,700,800,900&display=swap` et Instrument Serif via Google Fonts
- **Logo** : SVG "Siva" simple (blanc pour version dark, couleur pour version claire)
- **Toutes les sections** sont responsive avec breakpoints sm (640px), md (768px), lg (1024px)
- **Fond global** `#F7F3ED` sur tout le site

---

## PAGES LIÉES (pour les CTAs)
- `/rendez-vous` — page de prise de RDV (Calendly)
- `/audit-gratuit` — outil d'audit
- `/services` — page services
- `/blog` — blog
- `/faq` — FAQ
- `/contact` — contact
