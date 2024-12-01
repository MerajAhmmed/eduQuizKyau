import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function AdminLogOut() {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  function handleLogOut() {
    setUser({});
    navigate("/");
  }
  return (
    <button
      className="block py-2 px-4 rounded-lg text-gray-100 hover:bg-gray-100 hover:text-primary"
      onClick={handleLogOut}
    >
      Logout
    </button>
  );
}
