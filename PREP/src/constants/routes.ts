export const ROUTES = {
  HOME: "/",

  AUTH: {
    LOGIN: "/login",
    REGISTER: "/register",
    VERIFY_EMAIL: "/verify-email",
    FORGOT_PASSWORD: "/forgot-password",
    RESET_PASSWORD: "/reset-password",
  },

  CITIZEN: {
    DASHBOARD: "/dashboard",
    INCIDENTS: "/incidents",
    CREATE_INCIDENT: "/incidents/create",
    PROFILE: "/profile",
    NOTIFICATIONS: "/notifications",
  },

  GOVERNMENT: {
    OFFICE_FINDER: "/government/offices",
    FORMS: "/government/forms",
  },

  OFFICER: {
    DASHBOARD: "/officer/dashboard",
    INCIDENTS: "/officer/incidents",
    ASSIGNMENTS: "/officer/assignments",
    ESCALATIONS: "/officer/escalations",
  },

  ADMIN: {
    DASHBOARD: "/admin/dashboard",
    USERS: "/admin/users",
    OFFICERS: "/admin/officers",
    DEPARTMENTS: "/admin/departments",
    MODERATION: "/admin/moderation",
    AUDIT_LOGS: "/admin/audit-logs",
    ANALYTICS: "/admin/analytics",
    SYSTEM: "/admin/system",
  },

  AI: {
    COMPLAINT_ASSISTANT: "/ai/complaint-assistant",
    FORM_ASSISTANT: "/ai/form-assistant",
    RIGHTS: "/ai/rights",
    DOCUMENT_GENERATION: "/ai/document-generation",
    MEDIA_VERIFICATION: "/ai/media-verification",
  },
} as const;