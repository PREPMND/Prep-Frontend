import { Link } from "react-router-dom";
import { LoginForm } from "../components/loginForm";
export default function LoginPage() {
  return (
    <>
      <div className="*:m-auto ">
        <div className="font-bold text-center text-4xl font-lato ">
          Log in to Prep
        </div>
        <div className="">
          <h6>
            Don't have an account?
          </h6>
          <h4>
            <Link
              to="/register"
              className="text-blue-500"
            >
              Sign Up!
            </Link>
          </h4>
        </div>
        <div className="flex bg-gradient-to-r from-mist-200 via-slate-800 to-neutral-950 dark:text-white dark:hover:bg-gradient-to-l dark:hover:from-mist-200 dark:hover:via-slate-200 dark:hover:to-mist-100 dark:hover:text-black 
        dark:hover:font-[500] hover:border-mist-100 border-1  m-auto md:w-[20%] h-12 items-center justify-evenly rounded-lg transition-all duration-400 ease-in-out ">
          <i className="bi bi-github"></i>
          <button >Log in with Github</button>
        </div>
        <LoginForm />
      </div>
    </>
  );
}