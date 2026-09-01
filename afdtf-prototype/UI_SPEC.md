# UI Specification - AFDTF Micro-Prototype v0.1

## Leerlingweergave

Driekoloms werkruimte.

### Links - Taak en bronnen
- centrale vraag
- leerdoelen/eindtermen in leerlingtaal
- diagnostische start
- bronkaarten
- markering welke claims nog verificatie vragen

### Midden - Eigen werk
- teksteditor / argumentatieschema
- voorlopig standpunt
- bewijs per argument
- mogelijkheid claim te markeren als 'gecontroleerd', 'onzeker' of 'verworpen'

### Rechts - AI Learning Partner
De zichtbare coach voert alleen acties uit die door de Learning Intelligence Layer zijn toegestaan.

Mogelijke rollen:
- Socratische coach
- Scaffoldgever
- Broncriticus
- Feedbackpartner
- Bewust niet-ingrijpen

De interface toont niet de volledige Learner Twin aan de leerling tijdens de taak. Wel kan bij een interventie een korte uitlegbare reden verschijnen, bijvoorbeeld:

> Ik vraag je nu eerst bronnen te controleren, omdat je een feitelijke AI-claim in je argument gebruikt zonder dat er nog verificatie zichtbaar is.

## Docentpaneel

Geen uitgebreid dashboard in v0.1. Eén inspectiepaneel met:

1. geselecteerde taak en curriculumrefs;
2. Task Twin-eigenschappen;
3. chronologische eventstream;
4. afgeleide evidence-items met evidence-ID;
5. AI Fluency State per relevante dimensie: `estimate`, `confidence`, evidenceIds;
6. Subject Mastery State per relevante dimensie;
7. gekozen interventie, interventiehypothese en evidenceIds;
8. docentactie per inferentie: accepteren / corrigeren / negeren.

## Demo-modus

Bovenaan een schakelaar:

- `Leerling A - accepteert AI-claim`
- `Leerling B - verifieert AI-claim`

De twee scenario's gebruiken exact dezelfde Task Twin en dezelfde onbekende startsituatie. Alleen de events verschillen.

Naast elkaar tonen:

| Stap | Leerling A | Leerling B |
|---|---|---|
| Start | onbekende Twin | onbekende Twin |
| AI-claim | bekeken | bekeken |
| Gedrag | overgenomen zonder controle | bron geopend + vergeleken + claim betwist |
| Evidence | verificatie tegenbewijs | verificatie ondersteunend bewijs |
| Interventie | verplichte broncontrole / scaffold | fading + complexer dilemma |

## Learning Intelligence Layer

De UI roept nooit rechtstreeks het LLM aan voor een beoordeling.

Flow:

`UI event -> Event Store -> Evidence Engine -> Learner Twin update -> Adaptation Engine -> LIL-authorisatie -> AI Coach output`

Voor v0.1 mag de LIL als lokale TypeScript-orchestrator worden geïmplementeerd. Een externe LLM-call is optioneel; de A/B-demo moet deterministisch en zonder API-key kunnen draaien.

## Niet bouwen in v0.1

- geen cijferdashboard;
- geen ranking tussen leerlingen;
- geen automatische summatieve beoordeling;
- geen persoonlijkheids- of motivatieprofielen;
- geen black-box LLM-classificatie zonder zichtbare evidence;
- geen LMS-integratie; alleen interfaces hiervoor voorbereiden.
