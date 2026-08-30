import { apiClientAuthorization } from "../../../services/api/apiClient";

export interface UserRoleAssignment {
  id: string;
  roleId: string;
  organizationId: string | null;
  role: {
    id: string;
    name: string;
  };
}

export async function getMyRole(): Promise<UserRoleAssignment[]> {
  const response = await apiClientAuthorization.get<UserRoleAssignment[]>(
    "/user-roles/me",
  );

  return response.data;
}