import { apiClient } from "../../../services/api";
import type {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
} from "../types";

export async function login(
  payload: LoginPayload
): Promise<AuthResponse> {
  const response = await apiClient.post<AuthResponse>(
    "/auth/login",
    payload
  );

  return response.data;
}

export async function register(
  payload: RegisterPayload
): Promise<AuthResponse> {
  const response = await apiClient.post<AuthResponse>(
    "/auth/register",
    payload
  );

  return response.data;
}

export async function getCurrentUser(): Promise<AuthResponse> {
  const response = await apiClient.get<AuthResponse>(
    "/auth/me"
  );

  return response.data;
}

export async function logout(): Promise<void> {
  await apiClient.post("/auth/logout");
}

export async function logoutAll(): Promise<void> {
  await apiClient.post("/auth/logout-all");
}

export async function verifyEmail(token: string) {
  const response = await apiClient.post(
    "/auth/verify-email",
    { token }
  );

  return response.data;
}