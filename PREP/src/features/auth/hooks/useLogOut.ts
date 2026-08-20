import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../api/authApi";
import { useAuthStore } from "../store/authStore";

export function useLogout() {
  const queryClient = useQueryClient();

  const clearUser = useAuthStore(
    (state) => state.clearUser
  );

  return useMutation({
    mutationFn: logout,

    onSuccess: () => {
      clearUser();

      queryClient.removeQueries({
        queryKey: ["current-user"],
      });
    },
  });
}