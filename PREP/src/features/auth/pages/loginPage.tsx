import { Link } from "react-router-dom";
import { LoginForm } from "../components/loginForm";
import { FolderGit } from "lucide-react"
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
              Sign Up!
            </Link>
          </h4>
        </div>
        <div>
          
          <button >Log in with Github</button>
        </div>
        <LoginForm />
      </div>
    </>
  );
}