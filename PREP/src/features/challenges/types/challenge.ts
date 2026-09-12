export const CHALLENGE_CATEGORIES = {
  INFRASTRUCTURE_TRANSPORT: "infrastructure_transport",
  WATER_SANITATION: "water_sanitation",
  HEALTHCARE: "healthcare",
  EDUCATION_SKILLS: "education_skills",
  AGRICULTURE_RURAL: "agriculture_rural",
  ENVIRONMENT_CLIMATE: "environment_climate",
  PUBLIC_SAFETY: "public_safety",
  GOVERNMENT_PUBLIC_SERVICES: "government_public_services",
  ECONOMY_LIVELIHOODS: "economy_livelihoods",
  ENERGY_UTILITIES: "energy_utilities",
  SOCIAL_INCLUSION: "social_inclusion",
  OTHER: "other",
} as const;

export type ChallengeCategory =
  (typeof CHALLENGE_CATEGORIES)[keyof typeof CHALLENGE_CATEGORIES];

export interface CreateChallengePayload {
  title: string;
  description: string;
  mediaIds?: string[];
  category?: ChallengeCategory;
  subcategory?: string;
  location?: string;
  latitude?: number;
  longitude?: number;
  visibility: ChallengeVisibilityType,
}
export interface ChallengeMedia {
  id: string;
  url: string;
  originalName: string;
}


export interface Challenge {
  id: string;
  title: string;
  description: string;
  category: ChallengeCategory | null;
  subcategory: string | null;
  location: string | null;
  latitude?: number | null;
  longitude?: number | null;
  mediaIds: string[];
  media: ChallengeMedia[];
  status: string;
  visibility:ChallengeVisibilityType ;
  duplicateOfId?: string | null;
  aiSuggestedCategory?: ChallengeCategory | null;
  aiSuggestedSubcategory?: string | null;
  aiConfidence?: number | null;
  submittedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface PossibleDuplicate {
  challengeId: string;
  score: number;
  title: string;
  description: string;
  location: string | null;
  submittedBy: string;
}

export interface CreateChallengeResponse {
  challenge: Challenge;
  possibleDuplicates: PossibleDuplicate[];
}

export const ChallengeVisibility={
  PUBLIC:'PUBLIC',
  RESTRICTED:'RESTRICTED'
} as const 
export const ChallengeParticipationStatusConst= {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  WITHDRAWN = 'withdrawn',
}

export enum ChallengeParticipationRole {
  SOLUTION_DEVELOPMENT = 'solution_development',
  FUNDING = 'funding',
  IMPLEMENTATION = 'implementation',
  EXPERTISE = 'expertise',
  VALIDATION = 'validation',
}

export enum ChallengeStatus {
  SUBMITTED = 'submitted',
  UNDER_REVIEW = 'under_review',
  VALIDATED = 'validated',
  ASSIGNED = 'assigned',
  IN_PROGRESS = 'in_progress',
  RESOLVED = 'resolved',
  REJECTED = 'rejected',
}
export type ChallengeVisibilityType = typeof ChallengeVisibility[keyof typeof ChallengeVisibility];
export const CHALLENGE_SUBCATEGORIES = {
  ROADS: "roads",
  BRIDGES: "bridges",
  PUBLIC_TRANSPORT: "public_transport",
  TRAFFIC_INFRASTRUCTURE: "traffic_infrastructure",
  PUBLIC_INFRASTRUCTURE: "public_infrastructure",

  DRINKING_WATER: "drinking_water",
  WATER_SUPPLY: "water_supply",
  DRAINAGE: "drainage",
  SANITATION: "sanitation",
  WASTE_MANAGEMENT: "waste_management",

  HEALTHCARE_ACCESS: "healthcare_access",
  HEALTHCARE_FACILITIES: "healthcare_facilities",
  MATERNAL_CHILD_HEALTH: "maternal_child_health",
  DISEASE_PREVENTION: "disease_prevention",
  MENTAL_HEALTH: "mental_health",

  SCHOOL_INFRASTRUCTURE: "school_infrastructure",
  EDUCATION_ACCESS: "education_access",
  EDUCATION_QUALITY: "education_quality",
  DIGITAL_EDUCATION: "digital_education",
  SKILL_DEVELOPMENT: "skill_development",

  FARMING: "farming",
  IRRIGATION: "irrigation",
  LIVESTOCK: "livestock",
  RURAL_INFRASTRUCTURE: "rural_infrastructure",
  FARMER_SUPPORT: "farmer_support",

  POLLUTION: "pollution",
  FOREST_BIODIVERSITY: "forest_biodiversity",
  CLIMATE_RESILIENCE: "climate_resilience",
  NATURAL_RESOURCES: "natural_resources",

  ROAD_SAFETY: "road_safety",
  DISASTER_MANAGEMENT: "disaster_management",
  COMMUNITY_SAFETY: "community_safety",
  EMERGENCY_RESPONSE: "emergency_response",

  PUBLIC_SERVICE_ACCESS: "public_service_access",
  GOVERNANCE_GRIEVANCES: "governance_grievances",
  DIGITAL_GOVERNMENT: "digital_government",
  CIVIC_SERVICES: "civic_services",

  EMPLOYMENT: "employment",
  ENTREPRENEURSHIP: "entrepreneurship",
  LOCAL_LIVELIHOODS: "local_livelihoods",
  FINANCIAL_INCLUSION: "financial_inclusion",

  ELECTRICITY: "electricity",
  RENEWABLE_ENERGY: "renewable_energy",
  ENERGY_ACCESS: "energy_access",

  DISABILITY_INCLUSION: "disability_inclusion",
  WOMEN_EMPOWERMENT: "women_empowerment",
  SENIOR_CITIZENS: "senior_citizens",
  MARGINALIZED_COMMUNITIES: "marginalized_communities",

  OTHER: "other",
} as const;

export type ChallengeSubcategory =
  (typeof CHALLENGE_SUBCATEGORIES)[keyof typeof CHALLENGE_SUBCATEGORIES];