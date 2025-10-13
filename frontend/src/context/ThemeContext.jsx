import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.style.setProperty("--bg", "#1e1e2f");
      root.style.setProperty("--text", "#ffffff");
      root.style.setProperty("--surface", "#555555");
    } else {
      root.style.setProperty("--bg", "#ffffff");
      root.style.setProperty("--text", "#1e1e2f");
      root.style.setProperty("--surface", "#f5f5f5");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
