import { useState } from "react";
import { useParams } from "react-router-dom";
import { useChallengeDetails } from "../hooks/useChallengeDetails";
import { useMedia } from "../hooks/useMedia";
import { ChallengeParticipationStatusConst, type ChallengeParticipationStatus, type CreateChallengeParticipationPayload } from "../types/challenge";
import { useToast } from "../../common/toastProvider";
import { useAcceptChallengeParticipation, useChallengeParticipations, useRejectChallengeParticipation, useRequestChallengeParticipation } from "../hooks/useChallengeParticipation";
import ChallengeParticipationModal from "../components/challengeParticipationModal"
import { useQueryClient } from "@tanstack/react-query";
import ChallengeParticipations from "../components/ChallengeParticipations";
export default function ChallengeDetailPage() {
  const { id } = useParams();

  const { data: challenge, isLoading } = useChallengeDetails(id);

  const { data: media = [] } = useMedia(
    challenge?.mediaIds ?? [],
  );
  console.log(challenge);

  const [imageLoaded, setImageLoaded] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] =
    useState(false);

  const [participationStatus, setParticipationStatus] =
    useState<ChallengeParticipationStatus | null>(
      null,
    );

  const { showToast } = useToast();

  const requestParticipation =
    useRequestChallengeParticipation(id!);

  function handleParticipationRequest(
    payload: CreateChallengeParticipationPayload,
  ) {
    requestParticipation.mutate(payload, {
      onSuccess: (participation) => {
        setParticipationStatus(
          participation.status,
        );

        setIsJoinModalOpen(false);

        if (
          participation.status ===
          ChallengeParticipationStatusConst.APPROVED
        ) {
          showToast(
            "You successfully joined this challenge",
          );
        } else {
          showToast(
            "Your participation request has been sent",
          );
        }
      },

      onError: () => {
        showToast(
          "Unable to send participation request",
        );
      },
    });
  }

  const queryClient = useQueryClient();

  const {
    data: participations = [],
    isLoading: isParticipationsLoading,
  } = useChallengeParticipations(id!);

  const acceptParticipation =
    useAcceptChallengeParticipation();

  const rejectParticipation =
    useRejectChallengeParticipation();
  function handleAcceptParticipation(
    participationId: string,
  ) {
    acceptParticipation.mutate(participationId, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [
            "challenge-participations",
            id,
          ],
        });

        showToast(
          "Participation request approved",
        );
      },

      onError: () => {
        showToast(
          "Unable to approve participation request",
        );
      },
    });
  }

  function handleRejectParticipation(
    participationId: string,
  ) {
    rejectParticipation.mutate(participationId, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [
            "challenge-participations",
            id,
          ],
        });

        showToast(
          "Participation request rejected",
        );
      },

      onError: () => {
        showToast(
          "Unable to reject participation request",
        );
      },
    });
  }
  if (isLoading) return <div>Loading...</div>;
  if (!challenge) return <div>Challenge not found.</div>;

  return (
    <div>
      <main className="app-container py-10">
        <div className="mx-auto max-w-4xl select-none">
          <p className="text-sm text-neutral-500">
            {challenge.category?.replaceAll("_", " ").toLowerCase().replace(/\b\w/g, (letter) => letter.toUpperCase())}
          </p>
          <h1 className="mt-2 text-3xl font-bold">
            {challenge.title.toLowerCase().replace(/\b\w/g, (letter) => letter.toUpperCase())}
          </h1>
          <p className="mt-6 text-neutral-700 dark:text-neutral-300">
            {challenge.description.toLowerCase().replace(/\b\w/g, (letter) => letter.toUpperCase())}
          </p>
          {challenge.location && (
            <p className="mt-8 text-sm text-neutral-500">
              📍 {challenge.location}
            </p>
          )}
          {media.length > 0 && (
            <div className="mt-1 overflow-x-auto snap-x snap-mandatory scrollbar-hide overflow-y-hidden scrollbar-thin scrollbar-thumb-amber-400">
              <div className="flex">
                {media.map((item) => (
                  <div
                    key={item.id}
                    className={`h-52 md:h-[380px] mx-auto w-full xss:w-[70%] shrink-0 overflow-y-hidden rounded-lg light:bg-neutral-200 dark:bg-neutral-800 ${!imageLoaded ? "animate-pulse" : ""
                      }`}
                  >
                    <img
                      src={item.url}
                      alt={item.originalName}
                      onLoad={() => setImageLoaded(true)}
                      className="h-52 md:h-[380px] w-full rounded-lg object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={() => setIsJoinModalOpen(true)}
          disabled={
            participationStatus ===
            ChallengeParticipationStatusConst.APPROVED
          }
          className={`w-[60%] md:w-[30%] px-3 py-2 text-center mx-auto mt-5 block rounded-3xl text-lg font-semibold transition ${participationStatus ===
            ChallengeParticipationStatusConst.APPROVED
            ? "cursor-default bg-emerald-600 text-white"
            : participationStatus ===
              ChallengeParticipationStatusConst.PENDING
              ? "cursor-default bg-amber-500 text-white"
              : "cursor-pointer bg-emerald-500 text-white hover:bg-emerald-600"
            }`}
        >
          {participationStatus ===
            ChallengeParticipationStatusConst.APPROVED
            ? "✓ Participating"
            : participationStatus ===
              ChallengeParticipationStatusConst.PENDING
              ? "Request Pending"
              : "Request to Join"}
        </button>

      </main>
      <ChallengeParticipationModal
        isOpen={isJoinModalOpen}
        isSubmitting={requestParticipation.isPending}
        hasOrganization={false}
        onClose={() => setIsJoinModalOpen(false)}
        onSubmit={handleParticipationRequest}
      />
      <ChallengeParticipations
        participations={participations}
        isLoading={isParticipationsLoading}
        isUpdating={
          acceptParticipation.isPending ||
          rejectParticipation.isPending
        }
        onAccept={handleAcceptParticipation}
        onReject={handleRejectParticipation}
      />
    </div>

  );
}