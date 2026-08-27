import { apiClient } from "../../../services/api";
import type { Role } from "../../../constants/roles";
import { apiClientAuthorization } from "../../../services/api/apiClient";

interface UserRoleResponse {
    role: string[];
}
export async function getMyRole(userId: string,): Promise<UserRoleResponse> {
    const response = await apiClientAuthorization.get<UserRoleResponse>(
        `user-roles/me`,
    );
    console.log(response)
    return response.data;
}