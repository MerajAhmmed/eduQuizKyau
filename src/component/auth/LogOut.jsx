import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function LogOut() {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  function handleLogOut() {
    setUser({});
    navigate("/");
  }
  return (
    <button
      className="px-4 py-2 rounded hover:bg-primary hover:text-white transition-colors"
      style={{ fontFamily: "Jaro" }}
      onClick={handleLogOut}
    >
      Logout
    </button>
  );
}
