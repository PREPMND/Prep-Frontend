import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

export function LoginForm() {
  const navigate = useNavigate();
  const loginMutation = useLogin();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    try {
      await loginMutation.mutateAsync({
        identifier,
        password,
      });

      navigate("/dashboard");
    } catch {
        
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-md flex-col gap-5"
    >
      <div>
        <label
          htmlFor="identifier"
          className="mb-2 block text-sm font-medium"
        >
          Email, username or phone
        </label>

        <input
          id="identifier"
          type="text"
          value={identifier}
          onChange={(event) =>
            setIdentifier(event.target.value)
          }
          placeholder="Enter email, username or phone"
          autoComplete="username"
          required
          className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 outline-none"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium"
        >
          Password
        </label>

        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) =>
            setPassword(event.target.value)
          }
          placeholder="Enter your password"
          autoComplete="current-password"
          required
          className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 outline-none"
        />
      </div>

      {loginMutation.isError && (
        <p className="text-sm text-red-500">
          Invalid credentials. Please try again.
        </p>
      )}

      <button
        type="submit"
        disabled={loginMutation.isPending}
        className="rounded-lg bg-blue-600 px-4 py-3 font-medium text-white disabled:opacity-50"
      >
        {loginMutation.isPending
          ? "Signing in..."
          : "Sign in"}
      </button>

      <Link
        to="/forgot-password"
        className="text-center text-sm text-blue-500"
      >
        Forgot password?
      </Link>

      <p className="text-center text-sm">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-blue-500"
        >
          Create one
        </Link>
      </p>
    </form>
  );
}