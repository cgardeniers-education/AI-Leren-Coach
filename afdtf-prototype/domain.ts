export type EvidenceStatus = 'supporting' | 'contradicting' | 'ambiguous';
export type TeacherDecision = 'pending' | 'accepted' | 'corrected' | 'ignored';

export type AIFluencyDimension =
  | 'problem_framing'
  | 'ai_strategy'
  | 'interaction_iteration'
  | 'verification'
  | 'synthesis_transformation'
  | 'metacognition'
  | 'ethics_responsibility'
  | 'autonomy_calibration';

export type SubjectDimension =
  | 'source_evaluation'
  | 'social_inequality'
  | 'power_authority'
  | 'argumentation';

export interface ProbabilisticState {
  estimate: number; // 0..1, voorlopige beheersingsinschatting
  confidence: number; // 0..1, zekerheid van de inschatting
  evidenceIds: string[];
}

export interface LearnerTwin {
  learnerId: string;
  aiFluency: Record<AIFluencyDimension, ProbabilisticState>;
  subjectMastery: Record<SubjectDimension, ProbabilisticState>;
  interventionHistory: Intervention[];
  updatedAt: string;
}

export interface TaskTwin {
  taskId: string;
  title: string;
  centralQuestion: string;
  curriculumRefs: string[];
  cognitiveComplexity: 'medium' | 'high';
  openness: 'semi_open' | 'open';
  verificationRequired: boolean;
  ethicalComplexity: 'medium' | 'high';
  targetAutonomy: 'guided' | 'independent';
  allowedAIRoles: AIRole[];
  expectedEvidenceSignals: EventType[];
}

export type EventType =
  | 'DIAGNOSTIC_ANSWER_SUBMITTED'
  | 'AI_OUTPUT_VIEWED'
  | 'CLAIM_ADOPTED'
  | 'SOURCE_OPENED'
  | 'SOURCE_COMPARED'
  | 'AI_CLAIM_CHALLENGED'
  | 'CLAIM_REVISED'
  | 'NO_VERIFICATION_BEFORE_USE'
  | 'REFLECTION_SUBMITTED';

export interface LearningEvent {
  id: string;
  learnerId: string;
  taskId: string;
  type: EventType;
  timestamp: string;
  payload?: Record<string, unknown>;
}

export interface EvidenceItem {
  id: string;
  learnerId: string;
  taskId: string;
  sourceEventIds: string[];
  construct: AIFluencyDimension | SubjectDimension;
  status: EvidenceStatus;
  weight: number; // 0..1, prototypewaarde; nog niet empirisch gekalibreerd
  rationale: string;
  teacherDecision: TeacherDecision;
}

export type AIRole =
  | 'socratic_coach'
  | 'scaffold_provider'
  | 'source_critic'
  | 'feedback_partner'
  | 'deliberate_non_intervention';

export interface Intervention {
  id: string;
  learnerId: string;
  taskId: string;
  role: AIRole;
  hypothesis: string;
  evidenceIds: string[];
  action: string;
  createdAt: string;
}
