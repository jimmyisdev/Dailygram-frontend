import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoutes() {
  const isAuth = Boolean(useSelector((state) => state.auth.token));
  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
}
