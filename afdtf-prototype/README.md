# AFDTF Micro-Prototype v0.1

Proof-of-concept voor HAVO Maatschappijwetenschappen waarin dezelfde digitale leertaak verschillend reageert op leerling A en B op basis van evidence tijdens het leren.

## Kernprincipe

Niet: `prompt -> LLM -> antwoord`.

Wel:

`leeractiviteit -> events -> evidence -> Learner Twin + Task Twin -> Learning Intelligence Layer -> adaptatie -> pedagogische AI-interventie`.

Het taalmodel is uitvoerder van een pedagogische interventie en niet de beoordelaar van de leerling.

## Curriculumcasus

Centrale vraag:

> Mag de Nederlandse overheid AI en algoritmen inzetten om fraude of risicogroepen op te sporen?

Prototype-koppelingen aan HAVO Maatschappijwetenschappen 2026:

- Domein A / onderzoeks- en informatievaardigheden: bronnen en onderzoeksresultaten beoordelen op betrouwbaarheid, validiteit en representativiteit.
- C1 Sociale ongelijkheid: sociale ongelijkheid verklaren en gevolgen beschrijven.
- C2 Macht en gezag: bronnen/soorten/niveaus van macht classificeren, macht van gezag onderscheiden en theorieën over machtsverdeling vergelijken.

De definitieve inhoudelijke tagging moet door een vakexpert tegen de officiële syllabus worden gecontroleerd voordat het als gevalideerd curriculumproduct wordt gebruikt.

## Demo

Beide leerlingen starten zonder bekend profiel en krijgen dezelfde korte diagnose en dezelfde casus.

### Leerling A
Accepteert een plausibele maar ondeugdelijke AI-claim en verwerkt die zonder broncontrole.

Systeemroute:
1. event `AI_OUTPUT_VIEWED`
2. event `CLAIM_ADOPTED`
3. event `NO_VERIFICATION_BEFORE_USE`
4. Evidence Engine koppelt dit voorlopig aan zwakke evidence voor `verification` en `autonomy_calibration`.
5. Learning Intelligence Layer kiest een interventiehypothese.
6. Coach geeft geen nieuw inhoudelijk antwoord, maar verplicht broncontrole.

### Leerling B
Controleert dezelfde claim, vergelijkt bronnen en spreekt de AI tegen.

Systeemroute:
1. event `AI_OUTPUT_VIEWED`
2. event `SOURCE_OPENED`
3. event `SOURCE_COMPARED`
4. event `AI_CLAIM_CHALLENGED`
5. Evidence Engine levert positieve evidence voor `verification`, `discernment` en `autonomy_calibration`.
6. Learning Intelligence Layer past fading toe en biedt een complexer dilemma over macht en sociale ongelijkheid.

## Architectuur

- `domain.ts` - types voor Task Twin, Learner Twin, events, evidence en interventies.
- `taskTwin.ts` - de maatschappijwetenschappentaak en diagnostische start.
- `evidenceEngine.ts` - transparante rule-based evidence-identificatie voor v0.1.
- `learnerTwin.ts` - probabilistische states met expliciete onzekerheid.
- `adaptationEngine.ts` - beslisregels en interventiehypothesen.
- `simulation.ts` - deterministische demo voor leerling A en B.

## AFDTF-ontwerpgrenzen

1. Geen persoonlijkheidslabels.
2. Geen automatische summatieve cijfers.
3. Elke inferentie verwijst naar concrete evidence-events.
4. Elke state bevat onzekerheid/confidence.
5. Vakinhoudelijke beheersing en AI-fluency zijn gescheiden maar gekoppeld.
6. Tijd, aantal prompts en tekstlengte gelden niet zelfstandig als bewijs van leren.
7. Docent kan inferenties accepteren, corrigeren of negeren.
8. De Task Twin blijft onderdeel van iedere interpretatie om deterministisch profileren te voorkomen.

## Status

Dit is een gesimuleerde proof-of-concept, geen gevalideerd meetinstrument.