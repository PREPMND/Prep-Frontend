import type {
  ChallengeCategory,
  ChallengeSubcategory,
} from "../types/challenge";

export const CATEGORY_SUBCATEGORIES: Record<
  ChallengeCategory,
  ChallengeSubcategory[]
> = {
  infrastructure_transport: [
    "roads",
    "bridges",
    "public_transport",
    "traffic_infrastructure",
    "public_infrastructure",
  ],
  water_sanitation: [
    "drinking_water",
    "water_supply",
    "drainage",
    "sanitation",
    "waste_management",
  ],
  healthcare: [
    "healthcare_access",
    "healthcare_facilities",
    "maternal_child_health",
    "disease_prevention",
    "mental_health",
  ],
  education_skills: [
    "school_infrastructure",
    "education_access",
    "education_quality",
    "digital_education",
    "skill_development",
  ],
  agriculture_rural: [
    "farming",
    "irrigation",
    "livestock",
    "rural_infrastructure",
    "farmer_support",
  ],
  environment_climate: [
    "pollution",
    "forest_biodiversity",
    "climate_resilience",
    "natural_resources",
  ],
  public_safety: [
    "road_safety",
    "disaster_management",
    "community_safety",
    "emergency_response",
  ],
  government_public_services: [
    "public_service_access",
    "governance_grievances",
    "digital_government",
    "civic_services",
  ],
  economy_livelihoods: [
    "employment",
    "entrepreneurship",
    "local_livelihoods",
    "financial_inclusion",
  ],
  energy_utilities: [
    "electricity",
    "renewable_energy",
    "energy_access",
  ],
  social_inclusion: [
    "disability_inclusion",
    "women_empowerment",
    "senior_citizens",
    "marginalized_communities",
  ],
  other: ["other"],
};