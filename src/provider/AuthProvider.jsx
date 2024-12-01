import { AuthContext } from "../context";
import useLocalStorage from "../hooks/useLocalStorage";

export default function AuthProvider({ children }) {
  const { auth, setUser, clearUser, setAuth } = useLocalStorage();

  return (
    <AuthContext.Provider value={{ auth, setUser, clearUser, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
