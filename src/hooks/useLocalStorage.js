import { useState } from "react";

export default function useLocalStorage() {
  const [auth, setAuth] = useState(() => {
    const storedAuth = localStorage.getItem("user");
    return storedAuth === "undefined" ? null : JSON.parse(storedAuth);
  });

  function setUser(authData) {
    setAuth(authData);
    localStorage.setItem("user", JSON.stringify(authData));
  }

  function clearUser() {
    setAuth(null);
    localStorage.clear("user");
  }
  return { auth, setUser, clearUser, setAuth };
}
