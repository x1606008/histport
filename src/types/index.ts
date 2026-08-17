export type UserRole = 'student' | 'researcher' | 'moderator';

export type ThemeMode = 'dark' | 'light' | 'gold' | 'antique' | 'modern';

export interface Citation {
  id: string;
  sourceTitle: string;
  author?: string;
  year?: string | number;
  publisherOrUrl?: string;
  pageNumber?: string;
  type: 'book' | 'manuscript' | 'academic_paper' | 'archive' | 'web';
}

export interface Coordinates {
  lat: number;
  lng: number;
  locationName: string;
}

export interface HistoricalPerson {
  id: string;
  name: string;
  nativeName?: string;
  title: string; // e.g. "Buyuk Sohibqiron", "Astronom va Matematik"
  category: 'ruler' | 'commander' | 'scientist' | 'philosopher' | 'poet';
  birthYear: number;
  deathYear: number;
  isBCE: boolean; // Miloddan avvalgi
  dynastyOrState: string;
  shortBio: string;
  fullBio: string;
  achievements: string[];
  famousQuotes: { quote: string; context?: string }[];
  avatarUrl: string;
  heroBackgroundUrl: string;
  coordinates: Coordinates;
  majorWorksOrCampaigns: string[];
  citations: Citation[];
  viewsCount: number;
  tags: string[];
}

export interface StateEconomicMetric {
  year: number;
  yearLabel: string;
  populationMillions: number;
  urbanPopulationPercent: number;
  tradeVolumeGoldCoinsMillion: number;
  annualTaxRevenueMillion: number;
  standingArmyThousands: number;
  territoryMillionKm2: number;
  agricultureIndex: number; // 0-100
  craftsmanshipIndex: number; // 0-100
  notableEvent?: string;
}

export interface StatePowerRadar {
  militaryPower: number; // 0-100
  tradeDiplomacy: number;
  scienceCulture: number;
  urbanization: number;
  territorialControl: number;
  monetaryStability: number;
}

export interface HistoricalState {
  id: string;
  name: string;
  nativeName?: string;
  capital: string;
  startYear: number;
  endYear: number;
  isBCE: boolean;
  era: string; // "Antik davr", "O'rta asrlar", "Yangi davr"
  dynasty?: string;
  founders: string[];
  zenithLeaders: string[];
  shortDescription: string;
  riseAndGrowth: string;
  goldenAge: string;
  declineAndFall: string;
  territoryDescription: string;
  dynastyLineage: { ruler: string; reign: string; note?: string }[];
  foundationStory?: string;
  zenithPeriod?: string;
  otherMajorCities?: string[];
  keyRulers?: string[];
  economicMetrics?: StateEconomicMetric[];
  powerRadar?: StatePowerRadar;
  heroBackgroundUrl: string;
  coordinates: Coordinates;
  citations: Citation[];
  tags: string[];
}

export interface HistoricalCity {
  id: string;
  name: string;
  ancientName?: string;
  establishedYear: number;
  isBCE: boolean;
  region: string;
  modernCountry: string;
  strategicImportance: string;
  shortDescription: string;
  fullHistory: string;
  keyEpochs: { era: string; title: string; desc: string }[];
  famousMonuments: string[];
  heroBackgroundUrl: string;
  coordinates: Coordinates;
  citations: Citation[];
}

export interface HistoricalConflict {
  id: string;
  title: string;
  type: 'qozgolon' | 'urush' | 'jang';
  startYear: number;
  endYear: number;
  isBCE: boolean;
  location: string;
  parties: { name: string; leader: string; strength?: string }[];
  commanders: string[];
  causes: string[];
  battleSequence: { phase: string; description: string }[];
  outcome: string;
  geopoliticalImpact: string;
  heroBackgroundUrl: string;
  coordinates: Coordinates;
  citations: Citation[];
}

export interface HistoricalTreaty {
  id: string;
  title: string;
  signYear: number;
  isBCE: boolean;
  location: string;
  signatories: { party: string; representative: string }[];
  context: string;
  keyTerms: string[];
  geopoliticalImpact: string;
  originalDocumentExtract?: string;
  heroBackgroundUrl: string;
  coordinates: Coordinates;
  citations: Citation[];
}

export interface HistoricalMonument {
  id: string;
  name: string;
  ancientName?: string;
  buildCentury: string;
  buildYear?: number;
  builder: string;
  architecturalStyle: string; // e.g. "Temuriylar memoriy uslubi", "Koshinkorlik", "Ellinistik"
  locationCity: string;
  currentStatus: string;
  shortDescription: string;
  architecturalDetails: string;
  heroBackgroundUrl: string;
  galleryUrls: string[];
  coordinates: Coordinates;
  citations: Citation[];
}

export interface TimelineEvent {
  id: string;
  title: string;
  year: number;
  isBCE: boolean;
  century: string;
  category: 'person' | 'state' | 'city' | 'conflict' | 'treaty' | 'monument';
  summary: string;
  entityId: string;
  route: string;
  heroBackgroundUrl: string;
  tags: string[];
}

export interface MapRouteLayer {
  id: string;
  name: string;
  description: string;
  color: string;
  epoch: string;
  coordinates: [number, number][];
}

export interface EditProposal {
  id: string;
  targetId: string;
  targetType: 'person' | 'state' | 'city' | 'conflict' | 'treaty' | 'monument';
  targetTitle: string;
  authorName: string;
  authorRole: UserRole;
  authorEmail: string;
  submittedAt: string;
  summaryOfChange: string;
  proposedContent: string;
  originalContent: string;
  status: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
  citationsAdded?: Citation[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  institution?: string;
  researchFocus?: string;
  bookmarks: string[]; // IDs of saved entities
  contributionsCount: number;
}
