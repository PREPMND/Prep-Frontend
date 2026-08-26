import { apiClient } from "../../../services/api";
import type { UpdateProfilePayload } from "../types";
import type { User } from "../../../types/user";

export async function updateProfile(
  payload: UpdateProfilePayload,
): Promise<User> {
  const response = await apiClient.patch<User>(
    "/auth/profile",
    payload,
  );

  return response.data;
}