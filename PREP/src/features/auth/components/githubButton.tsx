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

            <div
                onClick={() => navigate("/register")}
                className="mt-3 flex font-[600] bg-gradient-to-r from-mist-200 via-slate-800 to-neutral-800 dark:text-white text-mist-50 hover:bg-gradient-to-l hover:from-mist-200 hover:via-slate-200 hover:to-mist-100  hover:text-black 
        hover:font-[500] hover:border-mist-100 border-1  m-auto w-[90%] md:w-[50%] h-12 items-center justify-evenly rounded-lg transition-all duration-400 ease-in-out hover:shadow-mauve-200 hover:shadow-md">
                <i className="bi bi-github"></i>
                <button >Log in with Github</button>
            </div>
        </button>

    );
}