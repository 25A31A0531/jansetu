import { CitizenProfile, LifeEvent, Recommendation, ExclusionReason, GovernmentService } from '../types';
import { GOVERNMENT_SERVICES, DOCUMENT_TYPES } from '../demoData';
import { getUserDocuments } from '../storage';
import { evaluateJurisdiction } from '../jurisdictionEngine';
import { evaluateEligibilityRules } from '../eligibilityEngine';
export const isSchemeCurrentlyActive = (service: GovernmentService): boolean => {
  if (service.status !== 'ACTIVE') return false;
  if (
    service.officialVerificationStatus === 'HISTORICAL_ARCHIVED' ||
    service.officialVerificationStatus === 'DISCONTINUED' ||
    service.officialVerificationStatus === 'REPLACED' ||
    service.officialVerificationStatus === 'SUSPENDED' ||
    service.officialVerificationStatus === 'UNVERIFIED'
  ) {
    return false;
  }
  if (service.effectiveTo && new Date(service.effectiveTo) < new Date()) {
    return false;
  }
  return true;
};

/**
 * Candidate Retrieval → Jurisdiction Filter → Eligibility Filter → Ranking
 */
export function findRelevantServices(
  profile: CitizenProfile,
  event: LifeEvent
): {
  recommendations: Recommendation[];
  excludedServices: ExclusionReason[];
} {
  const recommendations: Recommendation[] = [];
  const excludedServices: ExclusionReason[] = [];

  const candidateServices = GOVERNMENT_SERVICES.filter((svc) => {
    if (!isSchemeCurrentlyActive(svc)) {
      excludedServices.push({
        serviceId: svc.id,
        serviceName: svc.name,
        reasonType: 'status',
        message: `Scheme is not currently active (Status: ${svc.status}). Superseded or historical record.`,
        details: { expected: 'ACTIVE', actual: svc.status },
      });
      return false;
    }
    const isCatMatch =
      svc.category === event.category ||
      svc.secondaryCategories?.includes(event.category) ||
      svc.tags.includes(event.id);
    return isCatMatch;
  });

  for (const service of candidateServices) {
    const jurisdictionEval = evaluateJurisdiction(profile, service);
    if (!jurisdictionEval.isEligible) {
      if (jurisdictionEval.exclusion) excludedServices.push(jurisdictionEval.exclusion);
      continue;
    }

    const eligibilityEval = evaluateEligibilityRules(profile, service);
    if (!eligibilityEval.isEligible) {
      if (eligibilityEval.exclusion) excludedServices.push(eligibilityEval.exclusion);
      continue;
    }

    const allDocs = typeof window !== 'undefined' ? getUserDocuments() : DOCUMENT_TYPES;
    const matchedDocs = service.requiredDocuments.map((docId) =>
      allDocs.find((d) => d.id === docId)
    );
    const readyCount = matchedDocs.filter((d) => d?.status === 'ready').length;
    const docPercent =
      matchedDocs.length > 0 ? Math.round((readyCount / matchedDocs.length) * 100) : 0;

    recommendations.push({
      serviceId: service.id,
      service,
      confidenceScore: eligibilityEval.confidenceScore,
      potentialEligibility: eligibilityEval.potentialEligibility,
      matchReasons: [jurisdictionEval.matchNote, ...eligibilityEval.matchReasons],
      missingInfoReasons: eligibilityEval.missingInfoReasons,
      cautions: eligibilityEval.cautions,
      documentReadinessPercent: docPercent,
      jurisdictionMatchNote: jurisdictionEval.matchNote,
      jurisdictionBasis: jurisdictionEval.jurisdictionBasis,
      matchedLocationState: jurisdictionEval.matchedLocationState,
      categoryMatchStatus: eligibilityEval.categoryMatchStatus,
    });
  }

  recommendations.sort((a, b) => b.confidenceScore - a.confidenceScore);
  return { recommendations, excludedServices };
}
