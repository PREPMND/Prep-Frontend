import { useParams } from "react-router-dom";
import { useState } from "react";
import {
  useOrganizationMembers,
  useApproveMembershipRequest,
  useRejectMembershipRequest,
} from "../hooks/useOrganization";

export function OrganizationMembershipRequests() {
  const { id: organizationId } = useParams();
  const [processingUserId, setProcessingUserId] = useState<string | null>(null);

  const { data: members = [], isLoading } =
    useOrganizationMembers(organizationId);

  const approveMutation = useApproveMembershipRequest(
    organizationId!,
  );

  const rejectMutation = useRejectMembershipRequest(
    organizationId!,
  );

  if (!organizationId) return null;

  if (isLoading) {
    return <div>Loading requests...</div>;
  }

  const pendingRequests = members.filter(
    (member) => member.status === "PENDING",
  );

  const handleApprove = async (userId: string) => {
    setProcessingUserId(userId);

    try {
      await approveMutation.mutateAsync(userId);
    } finally {
      setProcessingUserId(null);
    }
  };

  const handleReject = async (userId: string) => {
    setProcessingUserId(userId);

    try {
      await rejectMutation.mutateAsync(userId);
    } finally {
      setProcessingUserId(null);
    }
  };

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white">
        Membership Requests
      </h1>

      {pendingRequests.length === 0 ? (
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          No pending membership requests.
        </p>
      ) : (
        <div className="space-y-3">
          {pendingRequests.map((request) => (
            <div
              key={request.id}
              className="flex items-center justify-between rounded-xl border border-neutral-200 light:bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950"
            >
              <div>
                <p className="font-medium text-neutral-900 dark:text-white">
                  {request.userId}
                </p>

                {request.message && (
                  <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                    {request.message}
                  </p>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  disabled={processingUserId === request.userId}
                  onClick={() => handleApprove(request.userId)}
                  className="rounded-lg bg-green-600 px-3 py-2 text-sm font-medium text-white disabled:opacity-50"
                >
                  Approve
                </button>

                <button
                  disabled={processingUserId === request.userId}
                  onClick={() => handleReject(request.userId)}
                  className="rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white disabled:opacity-50"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}