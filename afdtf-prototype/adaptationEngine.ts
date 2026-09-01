import type { EvidenceItem, Intervention, LearnerTwin, TaskTwin } from './domain';

let interventionCounter = 0;
const nextId = () => `INT-${String(++interventionCounter).padStart(3, '0')}`;

export function selectIntervention(
  twin: LearnerTwin,
  task: TaskTwin,
  evidence: EvidenceItem[],
): Intervention {
  const verification = twin.aiFluency.verification;
  const autonomy = twin.aiFluency.autonomy_calibration;
  const evidenceIds = evidence.map((e) => e.id);

  const strongNegativeVerification = evidence.some(
    (e) => e.construct === 'verification' && e.status === 'contradicting' && e.weight >= 0.4,
  );

  const strongPositiveVerification = evidence.some(
    (e) => e.construct === 'verification' && e.status === 'supporting' && e.weight >= 0.4,
  );

  if (task.verificationRequired && strongNegativeVerification) {
    return {
      id: nextId(),
      learnerId: twin.learnerId,
      taskId: task.taskId,
      role: 'source_critic',
      hypothesis:
        'De leerling gebruikt een AI-claim in een taak waarin verificatie vereist is, terwijl recente evidence laat zien dat broncontrole nog onvoldoende zichtbaar is.',
      evidenceIds,
      action:
        'Geef geen nieuw inhoudelijk antwoord. Vraag de leerling twee controleerbare claims te markeren, voor elke claim een onafhankelijke bron te zoeken en kort uit te leggen waarom die bron bruikbaar is.',
      createdAt: new Date().toISOString(),
    };
  }

  if (
    strongPositiveVerification &&
    verification.estimate >= 0.55 &&
    autonomy.estimate >= 0.5
  ) {
    return {
      id: nextId(),
      learnerId: twin.learnerId,
      taskId: task.taskId,
      role: 'socratic_coach',
      hypothesis:
        'De leerling laat voldoende verificatiegedrag en inhoudelijke regie zien om scaffolding af te bouwen en een complexere afweging te introduceren.',
      evidenceIds,
      action:
        'Pas fading toe. Leg een dilemma voor: het algoritme vermindert fraude aantoonbaar, maar selecteert bepaalde sociaaleconomische groepen disproportioneel vaak. Vraag wanneer effectieve controle problematische machtsuitoefening wordt en laat de leerling macht/gezag en sociale ongelijkheid expliciet gebruiken.',
      createdAt: new Date().toISOString(),
    };
  }

  return {
    id: nextId(),
    learnerId: twin.learnerId,
    taskId: task.taskId,
    role: 'scaffold_provider',
    hypothesis:
      'De huidige evidence is nog onvoldoende sterk om de ondersteuning verantwoord af te bouwen of een gerichte remediërende interventie te rechtvaardigen.',
    evidenceIds,
    action:
      'Geef één proceshint: formuleer eerst wat je wilt bewijzen, welke claim daarvoor nodig is en welk type bron die claim kan ondersteunen. Laat de leerling daarna zelf verder werken.',
    createdAt: new Date().toISOString(),
  };
}
