import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function UserRoute() {
  const { auth } = useAuth();
  return (
    <>
      {auth?.tokens?.accessToken && auth?.user?.role === "user" ? (
        <Outlet />
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
}
