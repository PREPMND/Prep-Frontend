import { useQuery } from "@tanstack/react-query";
//import { getCurrentUser } from "../api/authApi";
import { useAuthStore } from "../store/authStore";

export function useCurrentUser() {
  const setUser = useAuthStore((state) => state.setUser);
  const clearUser = useAuthStore((state) => state.clearUser);

  return useQuery({
    queryKey: ["current-user"],

    queryFn: async () => {
      try {
        const response = await getCurrentUser();

        setUser(response.user);

        return response.user;
      } catch (error) {
        clearUser();
        throw error;
      }
    },

    retry: false,
  });
}