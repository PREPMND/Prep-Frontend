import { useMutation, useQueryClient } from "@tanstack/react-query";
import { register } from "../api/authApi";
import { useAuthStore } from "../store/authStore";

export function useRegister() {
  const queryClient = useQueryClient();

  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: register,

    onSuccess: (response) => {
      setUser(response.user);

      queryClient.setQueryData(
        ["current-user"],
        response.user
      );
    },
  });
}