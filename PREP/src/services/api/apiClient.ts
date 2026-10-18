import axios from "axios";
import { ENV } from "../../../config/environment";

/**
 * Per-service axios clients.
 *
 * Every base URL now comes from `ENV` (and therefore from the environment),
 * instead of the hardcoded `http://localhost:PORT` values that were here
 * before -- those could only ever work on a developer machine. The local
 * defaults live in `.env`, so local development is unchanged.
 */
const jsonHeaders = {
  "Content-Type": "application/json",
};

export const apiClient = axios.create({
  baseURL: ENV.API_URL,
  withCredentials: true,
  headers: jsonHeaders,
});

export const apiClientAuthorization = axios.create({
  baseURL: ENV.AUTHORIZATION_API_URL,
  withCredentials: true,
  headers: jsonHeaders,
});

export const apiClientChallenge = axios.create({
  baseURL: ENV.CHALLENGE_API_URL,
  withCredentials: true,
  headers: jsonHeaders,
});

export const apiClientMedia = axios.create({
  baseURL: ENV.MEDIA_API_URL,
  withCredentials: true,
});

export const apiClientOrganization = axios.create({
  baseURL: ENV.ORGANIZATION_API_URL,
  withCredentials: true,
  headers: jsonHeaders,
});

export const apiClientSolution = axios.create({
  baseURL: ENV.SOLUTION_API_URL,
  withCredentials: true,
  headers: jsonHeaders,
});

export const apiClientWorkspace = axios.create({
  baseURL: ENV.WORKSPACE_API_URL,
  withCredentials: true,
  headers: jsonHeaders,
});
