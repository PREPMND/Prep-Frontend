import { useEffect } from "react";

interface ChallengeParticipationModalProps {
  isOpen: boolean;
  isSubmitting: boolean;
  hasOrganization: boolean;
  onClose: () => void;
  onSubmit: (payload: any) => void;
}

export default function ChallengeParticipationModal({
  isOpen,
  onClose,
}: ChallengeParticipationModalProps) {
  useEffect(() => {
    console.log("MODAL MOUNTED:", isOpen);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-red-500 p-4">
      <div className="h-[400px] w-full max-w-md overflow-y-scroll bg-blue-500 p-6">
        <h1 className="text-4xl font-bold text-white">
          MODAL TEST
        </h1>

        {Array.from({ length: 30 }).map((_, index) => (
          <p
            key={index}
            className="my-4 text-xl text-yellow-300"
          >
            Scroll test {index}
          </p>
        ))}

        <button
          onClick={onClose}
          className="bg-white px-4 py-2 text-black"
        >
          Close
        </button>
      </div>
    </div>
  );
}