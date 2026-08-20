import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../api/authApi";
import { useAuthStore } from "../store/authStore";

export function useLogin() {
  const queryClient = useQueryClient();

  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: login,

    onSuccess: async (response) => {
      setUser(response.user);

      queryClient.setQueryData(
        ["current-user"],
        response.user
      );
    },
  });
}