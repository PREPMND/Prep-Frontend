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
        //error later
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-md flex-col gap-3 mt-5"
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
          className="w-full rounded-xl border border-slate-300 light:bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-blue-400 dark:focus:ring-blue-400/20"
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
          className="w-full rounded-xl border border-slate-300 light:bg-white px-4 py-3 text-slate-900 light:placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-neutral-800 dark:white dark:placeholder:text-slate-500 dark:focus:border-blue-400 dark:focus:ring-blue-400/20"
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

      
    </form>
  );
}