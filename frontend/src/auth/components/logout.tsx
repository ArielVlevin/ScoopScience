import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function Logout() {
  const { logout, isAuthenticated } = useAuth();

  if (isAuthenticated) logout();

  return <Navigate to="/auth" />;
}
