import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClientMedia } from "./apiClient";

export async function uploadMedia(
file: File,
purpose = "challenge_evidence",
) {
const formData = new FormData();

formData.append("file", file);
formData.append("purpose", purpose);

const response = await apiClientMedia.post(
"/media/upload",
formData,
);

return response.data;
}

export function useUploadMediaMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ file, purpose }: { file: File; purpose?: string }) => 
            uploadMedia(file, purpose),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["media"] });
            queryClient.invalidateQueries({ queryKey: ["my-challenge-participations"] });
        },
    });
}