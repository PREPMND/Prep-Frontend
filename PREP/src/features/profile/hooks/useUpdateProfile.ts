import { useMutation } from "@tanstack/react-query";
import { updateProfile } from "../api/profileApi";
import { useAuthStore } from "../../auth/store/authStore";

export function useUpdateProfile() {
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (user) => {
      setUser(user);
    },
  });
}