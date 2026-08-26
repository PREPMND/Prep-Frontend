import { apiClient } from "../../../services/api";
import type { Role } from "../../../constants/roles";

interface UserRoleResponse {
    role: Role;
}
export async function getMyRole(
    userId: string,
): Promise<UserRoleResponse> {
    const response = await apiClient.get<UserRoleResponse>(
        `/authorization/${userId}`,
    );

    return response.data;
}