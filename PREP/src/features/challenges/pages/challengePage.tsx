import { ChallengeForm } from "../components/challengeForm";

export function ChallengePage() {
  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
          Societal Innovation Portal
        </p>

        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-900 dark:text-white">
          Submit a challenge
        </h1>

        <p className="mt-3 text-sm leading-6 text-neutral-600 dark:text-neutral-400">
          Tell us about a problem affecting your community. The platform will
          help organize it and connect it with the right people over time.
        </p>
      </div>

      <section className="rounded-2xl relative border border-neutral-200 light:bg-white dark:bg-neutral-950 px-[10px] py-4 md:p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-950 sm:p-7">
        <ChallengeForm />
      </section>
    </main>
  );
}