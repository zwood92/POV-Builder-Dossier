export type BuildOption = 'Account Dossier' | 'Outreach Templates' | 'Use Cases' | 'All';

export interface AnalysisFormInput {
  companyName: string;
  buildOption: BuildOption;
}

export interface KeyContact {
  name: string;
  role: string;
  email: string;
}

export interface NewsEvent {
  title: string;
  summary: string;
  date: string;
  source: string;
}

export interface BusinessUseCase {
  title: string;
  problem: string;
  solution: string;
  businessValue: string;
  salesforceCapability: string;
  serviceOfferings: string;
  successMetrics: string;
}

export interface AccountDossier {
  companyName: string;
  industry: string;
  employeeCount: string;
  overview: string;
  keyContacts: KeyContact[];
  recentNews: NewsEvent[];
}

export interface OutreachTemplate {
  title: string;
  channel: string; // 'Email' or 'LinkedIn InMail'
  subject: string;
  body: string;
}

export interface AnalysisResult {
  dossier?: AccountDossier;
  useCases?: BusinessUseCase[];
  outreachTemplates?: OutreachTemplate[];
}