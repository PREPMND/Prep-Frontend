import { Link ,useNavigate} from "react-router-dom";
import { LoginForm } from "../components/loginForm";
export default function LoginPage() {
  const navigate=useNavigate();
  return (
    <>
      <div className="*:m-auto mt-6 ">
        <div className="font-bold text-center text-4xl font-lato ">
          Log in to Prep
        </div>
        <div className="flex mt-2 justify-center items-center">
          <div className="">
            Don't have an account?
          </div>
          <span>
              Sign Up!
          </span>
        </div>
        <div className="mt-3 flex font-[600] bg-gradient-to-r from-mist-200 via-slate-800 to-neutral-950 dark:text-white dark:hover:bg-gradient-to-l dark:hover:from-mist-200 dark:hover:via-slate-200 dark:hover:to-mist-100 dark:hover:text-black 
        dark:hover:font-[500] hover:border-mist-100 border-1  m-auto md:w-[20%] h-12 items-center justify-evenly rounded-lg transition-all duration-400 ease-in-out ">
          <i className="bi bi-github"></i>
          <button >Log in with Github</button>
        </div>
        <LoginForm />
      </div>
    </>
  );
}