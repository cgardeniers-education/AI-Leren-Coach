export enum Role {
  USER = 'user',
  MODEL = 'model'
}

export interface Message {
  id: string;
  role: Role;
  text: string;
  timestamp: number;
}

export interface UserContext {
  level: 'VMBO' | 'HAVO' | 'VWO';
  year: string;
  subject: string;
  hasStarted: boolean;
}

export enum ModuleType {
  GENERAL = 'Algemeen',
  EXPLAIN_AI = 'Wat is AI?',
  PROMPTING = 'Beter Prompten',
  HOMEWORK = 'Hulp bij Schooltaak',
  FACT_CHECK = 'Fact-checken',
  PRACTICE = 'Oefenopdracht'
}