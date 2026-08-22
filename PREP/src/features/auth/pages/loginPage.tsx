import { useNavigate } from "react-router-dom";
import { LoginForm } from "../components/loginForm";
import { GithubLoginButton } from "../components/githubButton";
export default function LoginPage() {
  const navigate = useNavigate();
  return (
    <>
      <div className="*:m-auto mt-6 *:cursor-pointer">
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
        <GithubLoginButton/>
        <LoginForm />
      </div>
    </>
  );
}