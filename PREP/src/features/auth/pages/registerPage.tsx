import { RegisterForm } from "../components/registerForm";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <section className="w-full max-w-md">
        <div className="font-bold text-center text-4xl font-lato ">
          Log in to Prep
        </div>
        <div
          onClick={() => navigate("/register")}
          className="flex mt-2 justify-center gap-2 items-center">
          <div className="text-gray-400 font-[400] text-[15px]">
            Don't have an account?
          </div>
          <span

            className="dark:text-[white]  light:text-black font-[500]">
            Sign Up!
          </span>
        </div>
        <div
          onClick={() => navigate("/register")}
          className="mt-3 flex font-[600] bg-gradient-to-r from-mist-200 via-slate-800 to-neutral-800 dark:text-white text-mist-50 hover:bg-gradient-to-l hover:from-mist-200 hover:via-slate-200 hover:to-mist-100  hover:text-black 
        hover:font-[500] hover:border-mist-100 border-1  m-auto w-[90%] md:w-[50%] h-12 items-center justify-evenly rounded-lg transition-all duration-400 ease-in-out hover:shadow-mauve-200 hover:shadow-md">
          <i className="bi bi-github"></i>
          <button >Log in with Github</button>
        </div>

        <RegisterForm />
      </section>
    </main>
  );
}