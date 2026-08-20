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
      // Error handling later
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-5 flex w-full max-w-md flex-col gap-4">
      <div>
        <label htmlFor="identifier" className="mb-2 block text-sm font-medium light:text-neutral-700 dark:text-neutral-300">
          Email, username or phone
        </label>

        <input
          id="identifier"
          type="text"
          value={identifier}
          onChange={(event) => setIdentifier(event.target.value)}
          placeholder="Enter email, username or phone"
          autoComplete="username"
          required
          className="w-full rounded-xl border light:border-neutral-300 light:bg-white light:text-neutral-900 light:placeholder:text-neutral-400 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder:text-neutral-500 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:focus:border-blue-400 dark:focus:ring-blue-400/20"
        />
      </div>

      <div>
        <label htmlFor="password" className="mb-2 block text-sm font-medium light:text-neutral-700 dark:text-neutral-300">
          Password
        </label>

        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter your password"
          autoComplete="current-password"
          required
          className="w-full rounded-xl border light:border-neutral-300 light:bg-neutral-50 light:text-neutral-900 light:placeholder:text-neutral-400 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder:text-neutral-500 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:focus:border-blue-400 dark:focus:ring-blue-400/20"
        />
      </div>

      {loginMutation.isError && (
        <p className="text-sm light:text-red-600 dark:text-red-400">
          Invalid credentials. Please try again.
        </p>
      )}

      <button
        type="submit"
        className="mt-2 bg-neutral-700 hover:bg-white  px-4 py-3 hover:text-black rounded-lg hover:rounded-4xl"
      >
        {loginMutation.isPending ? "Logging in..." : "Log in"}
      </button>

      <Link
        to="/forgot-password"
        className="text-center text-sm font-medium light:text-blue-600 light:hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
      >
        Forgot password?
      </Link>
    </form>
  );
}