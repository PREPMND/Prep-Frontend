import { LoginForm } from "../components/loginForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <section className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">
            Welcome to PREP
          </h1>

          <p className="mt-2 text-[var(--color-text-secondary)]">
            
          </p>
        </div>

        <LoginForm />
      </section>
    </main>
  );
}