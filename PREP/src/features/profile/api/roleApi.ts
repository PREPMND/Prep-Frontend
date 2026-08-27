import { apiClientAuthorization } from "../../../services/api/apiClient";

interface UserRoleResponse {
    roleData: string[];
}
export async function getMyRole(): Promise<any> {
    const response = await apiClientAuthorization.get<UserRoleResponse>(
        `user-roles/me`,
    );
    console.log(response)
    return response;
}