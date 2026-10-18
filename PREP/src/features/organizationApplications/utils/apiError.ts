import { AxiosError } from "axios";

/**
 * Turns a failed request into something worth showing a person.
 *
 * The backend returns either a plain `message` or, for an incomplete
 * submission, `{ message, missingFields }`. Both are surfaced; anything
 * unrecognised falls back to a generic line rather than printing a raw object.
 */
export function describeApiError(error: unknown): string {
  const axiosError = error as AxiosError<{
    message?: string | string[];
    missingFields?: string[];
  }>;

  const data = axiosError?.response?.data;

  if (data?.missingFields?.length) {
    return `Please complete: ${data.missingFields.join(", ")}.`;
  }

  if (Array.isArray(data?.message)) {
    return data.message.join(" ");
  }

  if (typeof data?.message === "string") {
    return data.message;
  }

  if (axiosError?.response?.status === 403) {
    return "You do not have permission to do that.";
  }

  if (axiosError?.response?.status === 404) {
    return "That application could not be found.";
  }

  return "Something went wrong. Please try again.";
}

/** True when the failure was specifically a permission denial. */
export function isPermissionDenied(error: unknown): boolean {
  return (error as AxiosError)?.response?.status === 403;
}
