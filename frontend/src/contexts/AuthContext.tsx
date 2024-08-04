import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import { jwtDecode, JwtPayload } from "jwt-decode";
import {
  register,
  login,
  logout as logoutUser,
} from "@/features/auth/services/index.ts";

// Define the types for user and auth context
interface User extends JwtPayload {
  username: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;

  isAuthenticated: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const handleRegister = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      await register(username, email, password);
      await handleLogin(email, password);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      const data = await login(email, password);
      setUser(jwtDecode<User>(data.token));
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser(jwtDecode<User>(token));
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register: handleRegister,
        login: handleLogin,
        logout: handleLogout,
        isAuthenticated: !!user,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
