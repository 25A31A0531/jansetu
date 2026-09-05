import { DemoScenario, Journey } from '@/lib/types';
import { DEMO_SCENARIOS, LIFE_EVENTS, DOCUMENT_TYPES } from '@/lib/demoData';
import { getUserDocuments } from '@/lib/storage';
import { findRelevantServices, generateActionPlan } from '@/lib/rulesEngine';

export function buildJourneyFromScenario(scenario: DemoScenario): Journey {
  const lifeEvent = LIFE_EVENTS.find((e) => e.id === scenario.lifeEventId) || LIFE_EVENTS[0];
  const { recommendations, excludedServices } = findRelevantServices(scenario.profile, lifeEvent);
  const primaryServices = recommendations.map((r) => r.service);
  const steps = generateActionPlan(scenario.profile, primaryServices);

  const userDocs = typeof window !== 'undefined' ? getUserDocuments() : DOCUMENT_TYPES;
  const requiredDocIds = Array.from(new Set(primaryServices.flatMap((s) => s.requiredDocuments)));
  const totalRequired = requiredDocIds.length;
  const readyCount = requiredDocIds.filter(
    (id) => userDocs.find((d) => d.id === id)?.status === 'ready'
  ).length;
  const percentage = totalRequired > 0 ? Math.round((readyCount / totalRequired) * 100) : 0;

  return {
    id: `journey-${Date.now()}`,
    title: scenario.title,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lifeEvent,
    profile: scenario.profile,
    naturalLanguageInput: scenario.initialQuery,
    recommendations,
    excludedServices,
    steps,
    overallProgress: 25,
    documentReadiness: {
      totalRequired,
      readyCount,
      missingCount: totalRequired - readyCount,
      percentage,
    },
  };
}


export function createFallbackJourney(journeyId: string): Journey {
  const defaultScenario = DEMO_SCENARIOS[0];
  const lifeEvent =
    LIFE_EVENTS.find((e) => e.id === defaultScenario.lifeEventId) || LIFE_EVENTS[0];
  const { recommendations, excludedServices } = findRelevantServices(
    defaultScenario.profile,
    lifeEvent
  );
  const primaryServices = recommendations.map((r) => r.service);
  const steps = generateActionPlan(
    defaultScenario.profile,
    primaryServices
  );

  const userDocs = typeof window !== 'undefined' ? getUserDocuments() : DOCUMENT_TYPES;
  const requiredDocIds = Array.from(new Set(primaryServices.flatMap((s) => s.requiredDocuments)));
  const totalRequired = requiredDocIds.length || 3;
  const readyCount = requiredDocIds.filter(
    (id) => userDocs.find((d) => d.id === id)?.status === 'ready'
  ).length;
  const percentage = totalRequired > 0 ? Math.round((readyCount / totalRequired) * 100) : 0;

  return {
    id: journeyId,
    title: defaultScenario.title,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lifeEvent,
    profile: defaultScenario.profile,
    naturalLanguageInput: defaultScenario.initialQuery,
    recommendations,
    excludedServices,
    steps,
    overallProgress: 25,
    documentReadiness: {
      totalRequired,
      readyCount,
      missingCount: totalRequired - readyCount,
      percentage,
    },
  };
}
