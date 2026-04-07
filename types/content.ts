export type AnalysisType = 'deep-dive' | 'earnings-update' | 'method-note';
export type FundAnalysisType = 'fund-deep-dive' | 'fund-update' | 'fund-comparison';
export type StartupAnalysisType = 'startup-deep-dive' | 'startup-update';
export type FundType = 'VC' | 'PE' | 'Credit' | 'Hedge' | 'Real Estate';
export type ContentStatus = 'draft' | 'published';

// Shared types
export interface ValuationSummary {
  currentPrice: number;
  currency: string;
  bearCase: number;
  baseCase: number;
  bullCase: number;
  methodology: string;
}

export interface ScenarioRow {
  label: string;
  bear: number | string;
  base: number | string;
  bull: number | string;
}

// Research Post
export interface ResearchPost {
  title: string;
  slug: string;
  company: string;
  ticker: string;
  exchange: string;
  sector: string;
  industry: string;
  analysisType: AnalysisType;
  date: string;
  dataAsOf: string;
  author: string;
  readingTime: number;
  status: ContentStatus;
  valuation: ValuationSummary;
  disclosure: string;
  tags: string[];
  model?: {
    filename: string;
    version: string;
    lastUpdated: string;
  };
  content: string;
}

// Fund Post
export interface FundMetrics {
  grossMoic: number;
  netMoic: number;
  grossIrr: string;
  netIrr: string;
  dpi: number;
  tvpi: number;
  vintageQuartile: string;
}

export interface FundPost {
  title: string;
  slug: string;
  fundName: string;
  fundVintage: number;
  fundType: FundType;
  aum: string;
  gp: string;
  analysisType: FundAnalysisType;
  date: string;
  author: string;
  status: ContentStatus;
  disclosure: string;
  metrics: FundMetrics;
  tags: string[];
  content: string;
}

// Startup Post
export interface StartupMetrics {
  revenue?: string;
  revenueGrowth?: string;
  tpv?: string;
  employees?: string;
}

export interface StartupPost {
  title: string;
  slug: string;
  company: string;
  stage: string;
  sector: string;
  lastValuation: string;
  totalRaised: string;
  founded: number;
  hq: string;
  analysisType: StartupAnalysisType;
  date: string;
  author: string;
  status: ContentStatus;
  disclosure: string;
  metrics: StartupMetrics;
  tags: string[];
  content: string;
}

// Validation functions
export function validateResearchPost(data: unknown): asserts data is ResearchPost {
  const post = data as Record<string, unknown>;
  const required = [
    'title',
    'slug',
    'company',
    'ticker',
    'exchange',
    'sector',
    'industry',
    'analysisType',
    'date',
    'dataAsOf',
    'author',
    'status',
    'valuation',
    'disclosure',
    'tags',
    'content',
  ];

  for (const field of required) {
    if (!(field in post)) {
      throw new Error(`Missing required field in ResearchPost: ${field}`);
    }
  }
}

export function validateFundPost(data: unknown): asserts data is FundPost {
  const post = data as Record<string, unknown>;
  const required = ['title', 'slug', 'fundName', 'fundVintage', 'fundType', 'date', 'status', 'disclosure', 'tags'];

  for (const field of required) {
    if (!(field in post)) {
      throw new Error(`Missing required field in FundPost: ${field}`);
    }
  }
}

export function validateStartupPost(data: unknown): asserts data is StartupPost {
  const post = data as Record<string, unknown>;
  const required = ['title', 'slug', 'company', 'stage', 'sector', 'date', 'status', 'disclosure', 'tags'];

  for (const field of required) {
    if (!(field in post)) {
      throw new Error(`Missing required field in StartupPost: ${field}`);
    }
  }
}
