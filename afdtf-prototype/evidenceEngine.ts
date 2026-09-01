import type { EvidenceItem, LearningEvent } from './domain';

let evidenceCounter = 0;
const nextEvidenceId = () => `EV-${String(++evidenceCounter).padStart(3, '0')}`;

export function identifyEvidence(events: LearningEvent[]): EvidenceItem[] {
  const evidence: EvidenceItem[] = [];

  for (const event of events) {
    if (event.type === 'SOURCE_OPENED') {
      evidence.push({
        id: nextEvidenceId(),
        learnerId: event.learnerId,
        taskId: event.taskId,
        sourceEventIds: [event.id],
        construct: 'verification',
        status: 'supporting',
        weight: 0.25,
        rationale: 'De leerling zoekt externe bevestiging. Dit is ondersteunend maar nog geen bewijs van goede bronbeoordeling.',
        teacherDecision: 'pending',
      });
    }

    if (event.type === 'SOURCE_COMPARED') {
      evidence.push({
        id: nextEvidenceId(),
        learnerId: event.learnerId,
        taskId: event.taskId,
        sourceEventIds: [event.id],
        construct: 'verification',
        status: 'supporting',
        weight: 0.45,
        rationale: 'De leerling vergelijkt meerdere bronnen en laat daarmee sterkere evidence voor verificatie zien.',
        teacherDecision: 'pending',
      });
      evidence.push({
        id: nextEvidenceId(),
        learnerId: event.learnerId,
        taskId: event.taskId,
        sourceEventIds: [event.id],
        construct: 'source_evaluation',
        status: 'supporting',
        weight: 0.35,
        rationale: 'Bronvergelijking ondersteunt vakinhoudelijke informatievaardigheid; kwaliteit van de vergelijking moet inhoudelijk worden beoordeeld.',
        teacherDecision: 'pending',
      });
    }

    if (event.type === 'AI_CLAIM_CHALLENGED') {
      evidence.push({
        id: nextEvidenceId(),
        learnerId: event.learnerId,
        taskId: event.taskId,
        sourceEventIds: [event.id],
        construct: 'autonomy_calibration',
        status: 'supporting',
        weight: 0.45,
        rationale: 'De leerling spreekt AI-output gemotiveerd tegen en behoudt inhoudelijke regie.',
        teacherDecision: 'pending',
      });
    }

    if (event.type === 'NO_VERIFICATION_BEFORE_USE') {
      evidence.push({
        id: nextEvidenceId(),
        learnerId: event.learnerId,
        taskId: event.taskId,
        sourceEventIds: [event.id],
        construct: 'verification',
        status: 'contradicting',
        weight: 0.5,
        rationale: 'Een AI-claim wordt gebruikt zonder controle terwijl verificatie volgens de Task Twin vereist is.',
        teacherDecision: 'pending',
      });
      evidence.push({
        id: nextEvidenceId(),
        learnerId: event.learnerId,
        taskId: event.taskId,
        sourceEventIds: [event.id],
        construct: 'autonomy_calibration',
        status: 'contradicting',
        weight: 0.3,
        rationale: 'Het gedrag kan wijzen op onvoldoende kalibratie van vertrouwen in AI, maar één event is niet beslissend.',
        teacherDecision: 'pending',
      });
    }
  }

  return evidence;
}
