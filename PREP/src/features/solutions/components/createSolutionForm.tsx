import { useState } from "react";
import { useParams } from "react-router-dom";
import { useCreateSolution } from "../hooks/useCreateSolution";
import { uploadMedia } from "../../../services/api/media";
import { useToast } from "../../common/toastProvider";
import { useQueryClient } from "@tanstack/react-query";

export default function CreateSolutionForm() {
  const { id: challengeId } = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  const createSolution = useCreateSolution();
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    try {
      let mediaIds: string[] = [];

      // Upload solution media first
      if (files.length > 0) {
        const uploadedMedia = await Promise.all(
          files.map((file) =>
            uploadMedia(file, "solution_evidence"),
          ),
        );

        mediaIds = uploadedMedia.map(
          (media) => media.id,
        );
      }

      await createSolution.mutateAsync({
        challengeId: challengeId!,
        title,
        description,
        ownerType: "User",
        mediaIds,
        organizationId: null,
      });

      queryClient.invalidateQueries({
        queryKey: [
          "challenge-solutions",
          challengeId,
        ],
      });

      showToast("Solution submitted successfully");

      setTitle("");
      setDescription("");
      setFiles([]);

    } catch (error) {
      console.error(error);
      showToast("Failed to submit solution");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <div>
        <label>Solution Title</label>

        <input
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          placeholder="Enter solution title"
          required
          className="w-full rounded-lg border p-3"
        />
      </div>

      <div>
        <label>Description</label>

        <textarea
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          placeholder="Explain your proposed solution"
          required
          className="min-h-40 w-full rounded-lg border p-3"
        />
      </div>

      <div>
        <label>
          Upload Prototype / Images / Documents
        </label>

        <input
          type="file"
          multiple
          onChange={(e) =>
            setFiles(
              Array.from(
                e.target.files ?? [],
              ),
            )
          }
        />
      </div>

      {files.length > 0 && (
        <div>
          {files.map((file) => (
            <p key={file.name}>
              {file.name}
            </p>
          ))}
        </div>
      )}

      <button
        type="submit"
        disabled={createSolution.isPending}
        className="rounded-3xl bg-emerald-500 px-6 py-3 font-semibold text-white"
      >
        {createSolution.isPending
          ? "Submitting..."
          : "Submit Solution"}
      </button>
    </form>
  );
}