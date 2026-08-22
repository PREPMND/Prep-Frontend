import { GithubLoginButton } from "../components/githubButton";
import { RegisterForm } from "../components/registerForm";
import { useNavigate } from "react-router-dom";
export default function RegisterPage() {
  const navigate = useNavigate();
  return (
    <div className="*:m-auto *:cursor-pointer">
      <div className="font-bold text-center text-4xl font-lato ">
        Register to Prep
      </div>
      <div
        onClick={() => navigate("/login")}
        className="flex mt-2 justify-center gap-2 items-center">
        <div className="text-gray-400 font-[400] text-[15px]">
          Already have an account?
        </div>
        <span

          className="dark:text-[white]  light:text-black font-[500]">
          Log in!
        </span>
      </div>
      <GithubLoginButton/>
      <RegisterForm />
    </div>
  );
}