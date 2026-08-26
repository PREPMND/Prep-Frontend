import { apiClient } from "../../../services/api";
import type { Role } from "../../../constants/roles";
import { apiClientAuthorization } from "../../../services/api/apiClient";

interface UserRoleResponse {
    role: Role;
}
export async function getMyRole(userId: string,): Promise<UserRoleResponse> {
    const response = await apiClientAuthorization.get<UserRoleResponse>(
        `user-roles/${userId}`,
    );
    console.log(response)
    return response.data;
}