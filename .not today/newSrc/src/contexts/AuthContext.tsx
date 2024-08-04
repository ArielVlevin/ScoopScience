import React, { createContext, useState, useEffect, ReactNode } from "react";
import {
  jwtDecode,
  JwtPayload,
} from "../../../node_modules1/jwt-decode/build/esm";
import {
  register,
  login,
  logout as logoutUser,
} from "@/features/auth/services/index.ts";

// Define the types for user and auth context
interface User extends JwtPayload {
  // Define any additional user fields if needed
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
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

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
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    logoutUser();
    setUser(null);
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
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
