import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const getPreferredTheme = () => {
  if (typeof window === "undefined") return "dark";

  const storedTheme = localStorage.getItem("theme");
  if (storedTheme === "dark" || storedTheme === "light") {
    return storedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export const Theme = () => {
  const [theme, setTheme] = useState(getPreferredTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <div className="group flex h-11 w-11 items-center justify-center md:h-navbar-items md:w-navbar-items">
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={`Cambiar a modo ${theme === "dark" ? "claro" : "oscuro"}`}
        className="themed-control p-2 rounded-full cursor-pointer"
      >
        {theme === "dark" ? (
          <Moon className="group-hover:animate-squeeze" />
        ) : (
          <Sun className="group-hover:animate-squeeze" />
        )}
      </button>
    </div>
  );
};
