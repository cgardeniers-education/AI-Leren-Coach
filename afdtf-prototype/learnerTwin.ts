import type {
  AIFluencyDimension,
  EvidenceItem,
  LearnerTwin,
  ProbabilisticState,
  SubjectDimension,
} from './domain';

const aiDimensions: AIFluencyDimension[] = [
  'problem_framing',
  'ai_strategy',
  'interaction_iteration',
  'verification',
  'synthesis_transformation',
  'metacognition',
  'ethics_responsibility',
  'autonomy_calibration',
];

const subjectDimensions: SubjectDimension[] = [
  'source_evaluation',
  'social_inequality',
  'power_authority',
  'argumentation',
];

const unknownState = (): ProbabilisticState => ({
  estimate: 0.5,
  confidence: 0.1,
  evidenceIds: [],
});

export function createUnknownLearnerTwin(learnerId: string): LearnerTwin {
  return {
    learnerId,
    aiFluency: Object.fromEntries(aiDimensions.map((d) => [d, unknownState()])) as LearnerTwin['aiFluency'],
    subjectMastery: Object.fromEntries(subjectDimensions.map((d) => [d, unknownState()])) as LearnerTwin['subjectMastery'],
    interventionHistory: [],
    updatedAt: new Date().toISOString(),
  };
}

function updateState(state: ProbabilisticState, item: EvidenceItem): ProbabilisticState {
  // Prototype update rule: intentionally simple and transparent.
  // This is NOT a calibrated Bayesian Knowledge Tracing implementation.
  const direction = item.status === 'supporting' ? 1 : item.status === 'contradicting' ? -1 : 0;
  const step = direction * item.weight * 0.2;
  const estimate = Math.max(0.05, Math.min(0.95, state.estimate + step));
  const confidence = Math.max(0.1, Math.min(0.9, state.confidence + item.weight * 0.12));

  return {
    estimate,
    confidence,
    evidenceIds: [...state.evidenceIds, item.id],
  };
}

export function applyEvidence(twin: LearnerTwin, evidence: EvidenceItem[]): LearnerTwin {
  const next: LearnerTwin = structuredClone(twin);

  for (const item of evidence) {
    if (item.construct in next.aiFluency) {
      const key = item.construct as AIFluencyDimension;
      next.aiFluency[key] = updateState(next.aiFluency[key], item);
    } else if (item.construct in next.subjectMastery) {
      const key = item.construct as SubjectDimension;
      next.subjectMastery[key] = updateState(next.subjectMastery[key], item);
    }
  }

  next.updatedAt = new Date().toISOString();
  return next;
}
