const requiredEnv = (value: string | undefined, name: string) => {
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
};

/**
 * Service endpoints, with local-development defaults.
 *
 * These used to be `requiredEnv(...)`, which threw at module load when a
 * variable was absent -- and `.env.production` does not define the per-service
 * URLs, so a production build crashed on startup rather than failing in a way
 * anyone could diagnose. Falling back to the documented local port keeps
 * development working, while `logMissingServiceUrls` makes a non-development
 * deployment say loudly which variables it is missing.
 *
 * Note the names are not `VITE_`-prefixed: `vite.config.ts` widens `envPrefix`
 * to include these, so they are exposed to the client bundle. Nothing secret
 * may be put in them.
 */
const serviceEnv = (value: string | undefined, fallback: string) =>
  value && value.length > 0 ? value : fallback;

const SERVICE_DEFAULTS = {
  AUTHORIZATION_API_URL: "http://localhost:3001",
  CHALLENGE_API_URL: "http://localhost:3003",
  ORGANIZATION_API_URL: "http://localhost:3004",
  SOLUTION_API_URL: "http://localhost:3005",
  WORKSPACE_API_URL: "http://localhost:3007",
  MEDIA_API_URL: "http://localhost:3011",
} as const;

export const ENV = {
  MODE: import.meta.env.MODE,
  API_URL: requiredEnv(import.meta.env.VITE_API_URL, "VITE_API_URL"),
  SOCKET_URL: import.meta.env.VITE_SOCKET_URL || "",

  AUTHORIZATION_API_URL: serviceEnv(
    import.meta.env.AUTHORIZATION_API_URL,
    SERVICE_DEFAULTS.AUTHORIZATION_API_URL,
  ),
  CHALLENGE_API_URL: serviceEnv(
    import.meta.env.CHALLENGE_API_URL,
    SERVICE_DEFAULTS.CHALLENGE_API_URL,
  ),
  ORGANIZATION_API_URL: serviceEnv(
    import.meta.env.ORGANIZATION_API_URL,
    SERVICE_DEFAULTS.ORGANIZATION_API_URL,
  ),
  SOLUTION_API_URL: serviceEnv(
    import.meta.env.SOLUTION_API_URL,
    SERVICE_DEFAULTS.SOLUTION_API_URL,
  ),
  WORKSPACE_API_URL: serviceEnv(
    import.meta.env.WORKSPACE_API_URL,
    SERVICE_DEFAULTS.WORKSPACE_API_URL,
  ),
  MEDIA_API_URL: serviceEnv(
    import.meta.env.MEDIA_API_URL,
    SERVICE_DEFAULTS.MEDIA_API_URL,
  ),
} as const;

/**
 * Warns once, outside development, about service URLs that fell back to a
 * localhost default -- which in a deployed environment means the variable was
 * never set and that service is unreachable.
 */
function logMissingServiceUrls() {
  if (import.meta.env.MODE === "development") return;

  const missing = (
    Object.keys(SERVICE_DEFAULTS) as (keyof typeof SERVICE_DEFAULTS)[]
  ).filter((name) => ENV[name] === SERVICE_DEFAULTS[name]);

  if (missing.length > 0) {
    console.error(
      `[PREP] These service URLs are not configured and fell back to localhost: ${missing.join(
        ", ",
      )}`,
    );
  }
}

logMissingServiceUrls();
