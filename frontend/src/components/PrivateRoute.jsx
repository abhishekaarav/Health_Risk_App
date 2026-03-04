import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function PrivateRoute() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return null; // ya loader dikha sakte ho

  return user ? <Outlet /> : <Navigate to="/sign-in" replace />;
}