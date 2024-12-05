import { createContext, useContext, useEffect, useState } from "react";
import { themeSettings } from "./themeSettings";

type Theme = "dark" | "light" | "system";

type ThemeSettings = (typeof themeSettings)[Theme];

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  settings: ThemeSettings;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
  settings: themeSettings.light,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );

  const setTheme = (theme: Theme) => {
    localStorage.setItem(storageKey, theme);
    setThemeState(theme);
  };

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  const currentSettings =
    theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? themeSettings.dark
        : themeSettings.light
      : themeSettings[theme];

  return (
    <ThemeProviderContext.Provider
      value={{ theme, setTheme, settings: currentSettings }}
    >
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
