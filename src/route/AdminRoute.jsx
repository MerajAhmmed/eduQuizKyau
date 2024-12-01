import { Navigate, Outlet } from "react-router-dom";
import AdminSideBar from "../admin/adminDashboard/AdminSideBar";
import useAuth from "../hooks/useAuth";

export default function AdminRoute() {
  const { auth } = useAuth();
  return (
    <>
      {auth?.tokens?.accessToken && auth?.user?.role === "admin" ? (
        <div className="bg-gray-100 min-h-screen flex">
          <AdminSideBar />
          <Outlet />
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
}
