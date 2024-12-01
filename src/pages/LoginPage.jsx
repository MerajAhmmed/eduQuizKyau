import { Link } from "react-router-dom";
import sallyOne from "../assets/Saly-1.png";
import logo from "../assets/logo.svg";
import LoginForm from "../component/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:flex lg:w-1/2 bg-primary flex-col justify-between p-12 relative">
        <div className="text-white">
          <img src={sallyOne} alt="Illustration" className="mx-auto" />

          <h2 className="text-3xl font-bold mb-4">Sign in Now</h2>
          <p className="text-xl mb-4">Boost Your Learning Capabilities</p>
          <p className="mb-8">
            Logging in unlocks your personal progress tracker, letting you
            evaluate your performance and see how you stack up against others.
            Whether youre preparing for exams, improving your knowledge, or
            simply having fun, theres no better way to sharpen your mind.
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-12">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-8 flex gap-2 items-center">
            <span>Welcome to</span>
            <img src={logo} className="h-7" />
          </h2>
          <h1 className="text-5xl font-bold mb-8">Sign in</h1>

          <LoginForm />
          <div className="text-center">
            <Link to="" className="text-primary">
              Forgot Password
            </Link>
          </div>

          <div className="mt-8">
            <p className="text-center">
              No Account ?{" "}
              <Link to="/register" className="text-primary">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
