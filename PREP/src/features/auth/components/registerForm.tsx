import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegister } from "../hooks/useRegister";

export function RegisterForm() {
  const navigate = useNavigate();
  const registerMutation = useRegister();

  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const updateField = (
    field: keyof typeof form,
    value: string
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (form.password !== form.confirmPassword) {
      return;
    }

    try {
      await registerMutation.mutateAsync(form);

      navigate("/dashboard");
    } catch {
      // Error UI later.
    }
  };
  const style='w-full rounded-xl border light:border-neutral-300 light:bg-neutral-50 light:text-neutral-900 light:placeholder:text-neutral-400 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder:text-neutral-500 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:focus:border-blue-400 dark:focus:ring-blue-400/20';
  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-md flex-col gap-4"
    >
      <input
        value={form.name}
        onChange={(e) =>
          updateField("name", e.target.value)
        }
        placeholder="Full name"
        required
        className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3"
      />

      <input
        value={form.username}
        onChange={(e) =>
          updateField("username", e.target.value)
        }
        placeholder="Username"
        required
        className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3"
      />

      <input
        type="email"
        value={form.email}
        onChange={(e) =>
          updateField("email", e.target.value)
        }
        placeholder="Email"
        required
        className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3"
      />

      

      <input
        type="password"
        value={form.password}
        onChange={(e) =>
          updateField("password", e.target.value)
        }
        placeholder="Password"
        autoComplete="new-password"
        required
        className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3"
      />

      <input
        type="password"
        value={form.confirmPassword}
        onChange={(e) =>
          updateField(
            "confirmPassword",
            e.target.value
          )
        }
        placeholder="Confirm password"
        autoComplete="new-password"
        required
        className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3"
      />

      {form.password &&
        form.confirmPassword &&
        form.password !== form.confirmPassword && (
          <p className="text-sm text-red-500">
            Passwords do not match.
          </p>
        )}

      {registerMutation.isError && (
        <p className="text-sm text-red-500">
          Registration failed. Please try again.
        </p>
      )}

      <button
        type="submit"
        disabled={registerMutation.isPending}
        className="rounded-lg bg-blue-600 px-4 py-3 font-medium text-white disabled:opacity-50"
      >
        {registerMutation.isPending
          ? "Creating account..."
          : "Create account"}
      </button>

      <p className="text-center text-sm">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-blue-500"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}