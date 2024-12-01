import { useNavigate } from "react-router-dom";

export default function LogIn() {
  const navigate = useNavigate();

  function handleLogIn() {
    navigate("/login");
  }
  return (
    <button
      className="px-4 py-2 rounded hover:bg-primary hover:text-white transition-colors"
      style={{ fontFamily: "Jaro" }}
      onClick={handleLogIn}
    >
      Login
    </button>
  );
}
