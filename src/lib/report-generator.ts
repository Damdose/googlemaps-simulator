import { CriteriaResult, OptimizationSuggestion, PlaceDetails } from './types';
import { getBenchmark } from './sector-benchmarks';

export function generateAISummary(details: PlaceDetails, criteria: CriteriaResult[], score: number): string {
  const benchmark = getBenchmark(details.primaryType);
  const failedCriteria = criteria.filter(c => c.status === 'fail');

  const problems: string[] = [];
  const strengths: string[] = [];

  if (details.rating < 4.0) {
    problems.push(`une note de ${details.rating}/5 en dessous du seuil critique de 4.0`);
  } else if (details.rating < 4.5) {
    problems.push(`une note de ${details.rating}/5 correcte mais insuffisante face aux leaders à 4.5+`);
  } else {
    strengths.push(`une excellente note de ${details.rating}/5`);
  }

  if (details.userRatingCount < benchmark.avgReviewCount) {
    problems.push(`seulement ${details.userRatingCount} avis contre ${benchmark.avgReviewCount} en moyenne dans le secteur`);
  } else {
    strengths.push(`${details.userRatingCount} avis, au-dessus de la moyenne sectorielle`);
  }

  if (details.photoCount < benchmark.avgPhotoCount) {
    problems.push(`${details.photoCount} photos contre ${benchmark.avgPhotoCount} recommandées`);
  }

  if (!details.editorialSummary || details.editorialSummary.length < 100) {
    problems.push(`une description de fiche absente ou trop courte`);
  }

  if (!details.websiteUri) {
    problems.push(`aucun site web renseigné`);
  }

  let summary = `${details.name} obtient un score d'optimisation de ${score}/100. `;

  if (problems.length > 0) {
    summary += `Les principaux problèmes identifiés sont : ${problems.slice(0, 3).join(', ')}. `;
  }

  if (strengths.length > 0) {
    summary += `Points positifs : ${strengths.join(', ')}. `;
  }

  if (failedCriteria.length > 0) {
    summary += `${failedCriteria.length} critère${failedCriteria.length > 1 ? 's' : ''} sur ${criteria.filter(c => c.status !== 'unknown').length} sont en échec. `;
  }

  const estimatedLoss = Math.round(benchmark.avgReviewCount * 0.3);
  summary += `Ces lacunes vous coûtent potentiellement ${estimatedLoss} à ${estimatedLoss * 2} clients par mois qui choisissent vos concurrents. `;
  summary += `La bonne nouvelle : la majorité de ces problèmes sont corrigeables en moins de 2 semaines avec les bonnes actions.`;

  return summary;
}

export function generateSuggestions(details: PlaceDetails, criteria: CriteriaResult[]): OptimizationSuggestion[] {
  const suggestions: OptimizationSuggestion[] = [];
  const benchmark = getBenchmark(details.primaryType);

  for (const c of criteria) {
    if (c.status === 'pass' || c.status === 'unknown') continue;

    switch (c.key) {
      case 'businessDescription': {
        const currentDesc = details.editorialSummary;
        suggestions.push({
          criteriaKey: c.key,
          criteriaLabel: c.label,
          currentState: currentDesc
            ? `Votre description actuelle fait ${currentDesc.length} caractères : "${currentDesc.slice(0, 100)}${currentDesc.length > 100 ? '...' : ''}"`
            : 'Votre fiche n\'a aucune description.',
          recommendation: `Rédigez une description de 250+ caractères incluant votre activité principale, vos spécialités, votre localisation et des mots-clés naturels liés à "${benchmark.displayNameFr}". Une bonne description augmente votre pertinence dans les recherches locales.`,
          improvedContent: generateDescriptionSuggestion(details, benchmark),
        });
        break;
      }
      case 'googleRating': {
        suggestions.push({
          criteriaKey: c.key,
          criteriaLabel: c.label,
          currentState: `Votre note est de ${details.rating}/5 avec ${details.userRatingCount} avis. Le benchmark sectoriel (${benchmark.displayNameFr}) est de ${benchmark.avgRating}/5 avec ${benchmark.avgReviewCount} avis.`,
          recommendation: `${details.rating < 4.0 ? 'Votre priorité absolue est de remonter au-dessus de 4.0. ' : ''}Mettez en place un processus systématique de collecte d'avis : QR code, SMS de suivi, demande directe après une prestation réussie. Chaque nouvel avis 5 étoiles rapproche votre fiche du top des résultats.`,
        });
        break;
      }
      case 'reviewFrequency': {
        suggestions.push({
          criteriaKey: c.key,
          criteriaLabel: c.label,
          currentState: `Le rythme de vos avis récents est insuffisant. Google favorise les fiches avec un flux constant de nouveaux avis (objectif : ${benchmark.minReviewsPerWeek}+ par semaine).`,
          recommendation: `Automatisez la demande d'avis : envoyez un email ou SMS de remerciement avec le lien direct vers votre page d'avis Google après chaque prestation. Formez votre équipe à demander un avis au bon moment (après un compliment spontané).`,
        });
        break;
      }
      case 'reviewReplies': {
        const replied = details.reviews.filter(r => r.ownerResponse !== null).length;
        suggestions.push({
          criteriaKey: c.key,
          criteriaLabel: c.label,
          currentState: `Vous répondez à ${replied}/${details.reviews.length} avis visibles (${details.reviews.length > 0 ? Math.round((replied / details.reviews.length) * 100) : 0}%). Les avis sans réponse donnent une image de désintérêt.`,
          recommendation: `Répondez à 100% de vos avis dans les 24h. Pour les avis positifs : remerciez personnellement et mentionnez un détail spécifique. Pour les avis négatifs : montrez de l'empathie, reconnaissez le problème et proposez une solution concrète.`,
        });
        break;
      }
      case 'numberOfImages': {
        suggestions.push({
          criteriaKey: c.key,
          criteriaLabel: c.label,
          currentState: `Vous avez ${details.photoCount} photos. Les fiches les mieux classées dans votre secteur en ont ${benchmark.avgPhotoCount}+.`,
          recommendation: `Ajoutez des photos variées : façade, intérieur, équipe, prestations, produits. Publiez 2-3 nouvelles photos par semaine. Des photos de qualité et récentes renforcent la confiance et le taux de clic.`,
        });
        break;
      }
    }
  }

  return suggestions;
}

function generateDescriptionSuggestion(details: PlaceDetails, benchmark: { displayNameFr: string }): string {
  const city = extractCityFromAddress(details.address);
  const type = benchmark.displayNameFr.toLowerCase();

  return `${details.name}, ${type} situé${details.address ? ` au ${details.address.split(',')[0]}` : ''}, vous accueille ${city ? `à ${city} ` : ''}pour des prestations de qualité. ${details.phoneNumber ? `Contactez-nous au ${details.phoneNumber} ` : ''}pour prendre rendez-vous ou obtenir des informations. Notre équipe expérimentée est à votre écoute pour répondre à tous vos besoins. Découvrez un service professionnel et personnalisé dans un cadre accueillant.`;
}

function extractCityFromAddress(address: string): string {
  const parts = address.split(',').map(p => p.trim());
  for (const part of parts) {
    const match = part.match(/\d{5}\s+(.+)/);
    if (match) return match[1];
  }
  return parts.length >= 2 ? parts[parts.length - 2] : '';
}
