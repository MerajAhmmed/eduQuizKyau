import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import useAuth from "../../hooks/useAuth";
import LogIn from "../auth/LogIn";
import LogOut from "../auth/LogOut";

export default function Header() {
  const { auth } = useAuth();
  return (
    <header className="flex justify-between items-center mb-12">
      <Link to="/">
        <img src={logo} className="h-7" />
      </Link>
      <div>{auth?.tokens?.accessToken ? <LogOut /> : <LogIn />}</div>
    </header>
  );
}
