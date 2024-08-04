import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/auth" />;
};

export default PrivateRoute;
