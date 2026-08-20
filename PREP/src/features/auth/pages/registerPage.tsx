import { RegisterForm } from "../components/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <section className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">
            Create your PREP account
          </h1>

          <p className="mt-2 text-[var(--color-text-secondary)]">
            Get started with civic assistance
          </p>
        </div>

        <RegisterForm />
      </section>
    </main>
  );
}