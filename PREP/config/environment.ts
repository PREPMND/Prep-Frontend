const requiredEnv = (value: string | undefined, name: string) => {
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
};

export const ENV = {
  API_URL: requiredEnv(
    import.meta.env.VITE_API_URL,
    "VITE_API_URL"
  ),
  SOCKET_URL: import.meta.env.VITE_SOCKET_URL || "",
  MODE: import.meta.env.MODE,
} as const;