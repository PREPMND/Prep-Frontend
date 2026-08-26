import { useCurrentUser } from "../../auth/hooks/useCurrentUser";

export default function DashboardPage() {
  console.log(useCurrentUser)
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">
        PREP Dashboard
      </h1>

      <p className="mt-2">
        You are authenticated.
      </p>
    </div>
  );
}