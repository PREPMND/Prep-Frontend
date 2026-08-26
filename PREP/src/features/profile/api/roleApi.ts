import { apiClient } from "../../../services/api";
import type { Role } from "../../../constants/roles";

interface UserRoleResponse {
  role: Role;
}

export async function getMyRole(): Promise<UserRoleResponse> {
  const response = await apiClient.get<UserRoleResponse>(
    "/authorization/:id",
  );

  return response.data;
}