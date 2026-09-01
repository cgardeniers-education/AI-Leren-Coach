import type { TaskTwin } from './domain';

export const fraudDetectionTask: TaskTwin = {
  taskId: 'mwt-havo-fraud-ai-001',
  title: 'Algoritmen, fraude en maatschappelijke ongelijkheid',
  centralQuestion: 'Mag de Nederlandse overheid AI en algoritmen inzetten om fraude of risicogroepen op te sporen?',
  curriculumRefs: [
    'HAVO Maatschappijwetenschappen 2026 - onderzoeks/informatievaardigheden: betrouwbaarheid, validiteit en representativiteit',
    'C1 Sociale ongelijkheid',
    'C2 Macht en gezag',
  ],
  cognitiveComplexity: 'high',
  openness: 'semi_open',
  verificationRequired: true,
  ethicalComplexity: 'high',
  targetAutonomy: 'guided',
  allowedAIRoles: [
    'socratic_coach',
    'scaffold_provider',
    'source_critic',
    'feedback_partner',
    'deliberate_non_intervention',
  ],
  expectedEvidenceSignals: [
    'DIAGNOSTIC_ANSWER_SUBMITTED',
    'AI_OUTPUT_VIEWED',
    'CLAIM_ADOPTED',
    'SOURCE_OPENED',
    'SOURCE_COMPARED',
    'AI_CLAIM_CHALLENGED',
    'CLAIM_REVISED',
    'NO_VERIFICATION_BEFORE_USE',
    'REFLECTION_SUBMITTED',
  ],
};

export const diagnosticStart = [
  {
    id: 'diag-1',
    type: 'subject',
    prompt: 'Leg in eigen woorden uit wat sociale ongelijkheid betekent en geef één mogelijk gevolg.',
    targets: ['social_inequality'],
  },
  {
    id: 'diag-2',
    type: 'subject',
    prompt: 'Wanneer is macht volgens jou ook gezag? Geef een kort voorbeeld.',
    targets: ['power_authority'],
  },
  {
    id: 'diag-3',
    type: 'subject',
    prompt: 'Een nieuwsbericht noemt een onderzoek “bewijs” dat een fraudemodel eerlijk werkt. Welke twee dingen zou je eerst willen controleren?',
    targets: ['source_evaluation'],
  },
  {
    id: 'diag-ai-1',
    type: 'ai_choice',
    prompt: 'De AI geeft een overtuigend feit zonder bron. Wat doe je als eerste?',
    options: [
      'Ik gebruik het als het logisch klinkt.',
      'Ik vraag de AI om dezelfde uitleg eenvoudiger te geven.',
      'Ik zoek onafhankelijke controleerbare bronnen voordat ik het gebruik.',
      'Ik laat de AI zelf beslissen of de bron betrouwbaar is.',
    ],
    targets: ['verification', 'autonomy_calibration'],
  },
] as const;

export const sharedFlawedAIClaim =
  'Algoritmische fraudedetectie heeft bewezen geen systematische invloed op sociale ongelijkheid; daardoor is inzet door de overheid in beginsel neutraal.';

export const mainTaskInstructions = [
  'Formuleer een voorlopig standpunt over de centrale vraag.',
  'Gebruik ten minste twee controleerbare bronnen of bronfragmenten.',
  'Benoem expliciet hoe macht/gezag en sociale ongelijkheid in jouw afweging een rol spelen.',
  'Gebruik de AI Learning Partner alleen wanneer dat jouw eigen redenering versterkt; jij blijft verantwoordelijk voor claims en conclusies.',
] as const;
