import type { LearningEvent } from './domain';
import { identifyEvidence } from './evidenceEngine';
import { applyEvidence, createUnknownLearnerTwin } from './learnerTwin';
import { selectIntervention } from './adaptationEngine';
import { fraudDetectionTask } from './taskTwin';

const now = () => new Date().toISOString();

const learnerAEvents: LearningEvent[] = [
  { id: 'A-E001', learnerId: 'learner-a', taskId: fraudDetectionTask.taskId, type: 'AI_OUTPUT_VIEWED', timestamp: now() },
  { id: 'A-E002', learnerId: 'learner-a', taskId: fraudDetectionTask.taskId, type: 'CLAIM_ADOPTED', timestamp: now() },
  { id: 'A-E003', learnerId: 'learner-a', taskId: fraudDetectionTask.taskId, type: 'NO_VERIFICATION_BEFORE_USE', timestamp: now() },
];

const learnerBEvents: LearningEvent[] = [
  { id: 'B-E001', learnerId: 'learner-b', taskId: fraudDetectionTask.taskId, type: 'AI_OUTPUT_VIEWED', timestamp: now() },
  { id: 'B-E002', learnerId: 'learner-b', taskId: fraudDetectionTask.taskId, type: 'SOURCE_OPENED', timestamp: now() },
  { id: 'B-E003', learnerId: 'learner-b', taskId: fraudDetectionTask.taskId, type: 'SOURCE_COMPARED', timestamp: now() },
  { id: 'B-E004', learnerId: 'learner-b', taskId: fraudDetectionTask.taskId, type: 'AI_CLAIM_CHALLENGED', timestamp: now() },
];

export function runSimulation() {
  const twinA0 = createUnknownLearnerTwin('learner-a');
  const twinB0 = createUnknownLearnerTwin('learner-b');

  const evidenceA = identifyEvidence(learnerAEvents);
  const evidenceB = identifyEvidence(learnerBEvents);

  const twinA1 = applyEvidence(twinA0, evidenceA);
  const twinB1 = applyEvidence(twinB0, evidenceB);

  const interventionA = selectIntervention(twinA1, fraudDetectionTask, evidenceA);
  const interventionB = selectIntervention(twinB1, fraudDetectionTask, evidenceB);

  return {
    learnerA: { events: learnerAEvents, evidence: evidenceA, twin: twinA1, intervention: interventionA },
    learnerB: { events: learnerBEvents, evidence: evidenceB, twin: twinB1, intervention: interventionB },
  };
}
