import { Link } from "react-router-dom";
import { LoginForm } from "../components/loginForm";
export default function LoginPage() {
  return (
    <>
      <div className="m-auto *:font-[600]">
        <div>
          Login To Prep
        </div>
        <div className="">
          <span>
            Don't have an account?
          </span>
          <h4>
            <Link
              to="/register"
              className="text-blue-500"
            >
              Sign Up!
            </Link>
          </h4>
        </div>
        <div className="flex dark:bg-gradient-to-r dark:from-mist-200 dark:via-slate-800 dark:to-slate-950 dark:text-white hover:bg-white hover:text-black hover:font-[500] border-1 m-auto md:w-[20%] h-13 items-center justify-evenly rounded-lg transition-transform duration-200 ease-in-out ">
          <i className="bi bi-github"></i>
          <button >Log in with Github</button>
        </div>
        <LoginForm />
      </div>
    </>
  );
}