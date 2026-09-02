import { ChallengeForm } from "../components/challengeForm";

export function ChallengePage() {
  return (
    <main >
      

      <section className="rounded-2xl border border-neutral-200 light:bg-white dark:bg-neutral-950 p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-950 sm:p-7">
        <ChallengeForm />
      </section>
    </main>
  );
}