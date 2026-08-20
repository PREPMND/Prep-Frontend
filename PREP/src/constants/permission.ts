export const PERMISSIONS = {
  INCIDENT_CREATE: "incident:create",
  INCIDENT_VIEW: "incident:view",
  INCIDENT_UPDATE: "incident:update",
  INCIDENT_ASSIGN: "incident:assign",

  EVIDENCE_UPLOAD: "evidence:upload",
  EVIDENCE_VIEW: "evidence:view",
  EVIDENCE_VERIFY: "evidence:verify",

  OFFICER_MANAGE: "officer:manage",
  DEPARTMENT_MANAGE: "department:manage",

  MODERATION_MANAGE: "moderation:manage",
  AUDIT_VIEW: "audit:view",
  ANALYTICS_VIEW: "analytics:view",
} as const;

export type Permission =
  (typeof PERMISSIONS)[keyof typeof PERMISSIONS];