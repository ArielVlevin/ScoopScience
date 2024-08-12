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
import { deleteData, postData } from "@/services/apiFunctions";

interface User extends JwtPayload {
  _id: string;
  username: string;
  email: string;
  favorites: number[];
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

  handleFavorite: (recipe_id: number) => void;
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
      const decodedUser = jwtDecode<User>(data.token);
      setUser(decodedUser);
      localStorage.setItem("user", JSON.stringify(decodedUser));
      localStorage.setItem("token", data.token);

      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const addFavorite = async (recipe_id: number) => {
    if (!user || !recipe_id) return;

    const updatedUser = {
      ...user,
      favorites: [...user.favorites, recipe_id],
    };

    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));

    try {
      await postData(`/favorites/add/${recipe_id}`, {
        _id: user._id,
      });
    } catch (error) {
      console.error("Failed to add recipe to favorites:", error);
    }
  };

  const removeFavorite = async (recipe_id: number) => {
    if (!user || !recipe_id) return;

    const updatedUser = {
      ...user,
      favorites: user.favorites.filter((id) => id !== recipe_id),
    };

    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));

    try {
      const response = await deleteData(`/favorites/delete/${recipe_id}`, {
        user_id: user._id,
      });
      console.log("response:", response);
    } catch (error) {
      console.error("Failed to delete recipe from favorites:", error);
    }
  };

  const handleFavorite = (recipe_id: number) => {
    if (!user || !recipe_id) return;

    if (user.favorites.includes(recipe_id)) {
      removeFavorite(recipe_id);
    } else {
      addFavorite(recipe_id);
    }
    return user.favorites.includes(recipe_id);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      setUser(JSON.parse(storedUser)); // Load user from local storage
      setIsAuthenticated(true);
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
        handleFavorite,
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
