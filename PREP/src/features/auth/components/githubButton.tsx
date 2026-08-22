export function GithubLoginButton() {
  const handleGithubLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/github`;
  };

  return (
    <button
      type="button"
      onClick={handleGithubLogin}
      className="w-full rounded-xl border px-4 py-3 font-medium transition light:border-neutral-300 light:bg-white light:text-neutral-800 light:hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:hover:bg-neutral-800"
    >
      Continue with GitHub
    </button>
  );
}