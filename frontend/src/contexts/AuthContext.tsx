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
  googleLogin,
  logout as logoutUser,
  refreshAccessToken,
} from "@/auth/services";
import { deleteData, postData } from "@/services/apiFunctions";

interface User extends JwtPayload {
  _id: number;
  username: string;
  email: string;
  isAdmin: boolean;
  favorites: number[];
  recipes: number[];
}

export interface AuthContextType {
  user: User;
  loading: boolean;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  loginGoogle: (googleToken: string) => Promise<void>;
  logout: () => void;

  isAuthenticated: boolean;
  isAdmin: boolean;

  handleFavorite: (recipe_id: number) => void;
  updateUserRecipes: (recipe_id: number, action: "add" | "remove") => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  function scheduleTokenRefresh(refreshToken: string, expiresIn: number) {
    const timeout = expiresIn * 0.9 * 1000;

    setTimeout(async () => {
      try {
        console.log("Token expired, refreshing...");
        const newAccessToken = await refreshAccessToken(refreshToken);
        if (newAccessToken) {
          localStorage.setItem("token", newAccessToken);
          const decodedToken: any = jwtDecode(newAccessToken);
          scheduleTokenRefresh(
            refreshToken,
            decodedToken.exp - Date.now() / 1000
          );
        } else {
          console.error("Failed to refresh token, logging out...");
          handleLogout();
        }
      } catch (err) {
        console.error("Error refreshing access token:", err);

        // Handle refresh error, maybe log out the user
      }
    }, timeout);
  }

  const nullUser: User = {
    _id: 0,
    username: "Guest",
    email: "Guest@Guest",
    isAdmin: false,
    favorites: [],
    recipes: [],
  };

  //useStates
  const [user, setUser] = useState<User>(nullUser);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  //
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
      throw error;
    }
  };

  //TODO::: make this 1 function / combain the two functions
  const handleLogin = async (email: string, password: string) => {
    try {
      const { accessToken, refreshToken } = await login(email, password);

      const decodedToken: any = jwtDecode(accessToken);

      const decodedUser = jwtDecode<User>(accessToken);
      setUser(decodedUser);

      scheduleTokenRefresh(refreshToken, decodedToken.exp - Date.now() / 1000);

      localStorage.setItem("token", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(decodedUser));

      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  const handleGoogleLogin = async (token: string) => {
    try {
      const { accessToken, refreshToken } = await googleLogin(token);

      const decodedToken: any = jwtDecode(accessToken);

      const decodedUser = jwtDecode<User>(accessToken);
      setUser(decodedUser);

      scheduleTokenRefresh(refreshToken, decodedToken.exp - Date.now() / 1000);

      localStorage.setItem("token", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(decodedUser));

      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleLogout = () => {
    logoutUser();
    setUser(nullUser);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
  };

  /*
   *
   *
   * Favorites
   *
   *
   * */

  const handleFavorite = (recipe_id: number) => {
    if (!user || !recipe_id || user._id === 0) return;

    if (user.favorites === undefined) {
      user.favorites = [];
      addFavorite(recipe_id);
    } else if (user.favorites?.includes(recipe_id)) {
      removeFavorite(recipe_id);
    } else {
      addFavorite(recipe_id);
    }
    return user.favorites.includes(recipe_id);
  };

  /*
   *
   * add Favorite
   *
   * */

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

  /*
   *
   * remove Favorite
   *
   * */

  const removeFavorite = async (recipe_id: number) => {
    if (!user || !recipe_id) return;

    const updatedUser = {
      ...user,
      favorites: user.favorites.filter((id) => id !== recipe_id),
    };

    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));

    try {
      await deleteData(`/favorites/delete/${recipe_id}`, {
        user_id: user._id,
      });
    } catch (error) {
      console.error("Failed to delete recipe from favorites:", error);
    }
  };
  /*
   *
   *
   * End Favorites
   *
   *
   * */

  const updateUserRecipes = (recipe_id: number, action: "add" | "remove") => {
    if (!user || !recipe_id) return;

    let updatedRecipes;

    if (action === "add") {
      // Add the recipe ID to the user's recipes array
      if (!user.recipes) user.recipes = [];
      updatedRecipes = [...user.recipes, recipe_id];
    } else if (action === "remove") {
      // Remove the recipe ID from the user's recipes array
      updatedRecipes = user.recipes.filter((id) => id !== recipe_id);
    } else {
      return;
    }

    const updatedUser = {
      ...user,
      recipes: updatedRecipes,
    };

    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      try {
        const decodedToken: any = jwtDecode(token);

        // בדיקה אם הטוקן פג תוקף
        if (decodedToken.exp * 1000 < Date.now()) {
          console.warn("Token has expired. Logging out...");
          handleLogout(); // ניתוק המשתמש אם הטוקן פג תוקף
        } else {
          // אם הטוקן תקף, שחזר את פרטי המשתמש
          setUser(JSON.parse(storedUser));
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Failed to decode token:", error);
        handleLogout(); // ניתוק המשתמש אם יש שגיאה בפענוח הטוקן
      }
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
        loginGoogle: handleGoogleLogin,
        logout: handleLogout,
        isAuthenticated: isAuthenticated,
        isAdmin: user?.isAdmin || false,
        handleFavorite,
        updateUserRecipes,
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
  return {
    ...context,
    isGuest: context.user?._id === 0,
  };
};
