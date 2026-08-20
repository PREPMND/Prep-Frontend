import { LoginForm } from "../components/loginForm";
import { GitCommit } from "lucide-react"
export default function LoginPage() {
  return (
    <>
      <div>
        <div>
          Login To Prep
        </div>
        <div>
          <span>
            Don't have an account?
          </span>
          <h4>
            <Link
              to="/register"
              className="text-blue-500"
            >
              Create one
            </Link>
          </h4>
        </div>
        <div>
          <GitCommit />
          <button >Log in with Github</button>
        </div>
        <LoginForm />
      </div>
    </>
  );
}