import { Moon } from "lucide-react";
import { Sun } from "lucide-react";

export const Theme = () => {
  const theme = localStorage.getItem("theme");

  return (
    <div className="flex items-center justify-center h-navbar-items w-navbar-items group">
      <button className="bg-black border-border border-2 p-2 rounded-full cursor-pointer hover:bg-border hover:border-black transition-colors">
        {theme === "dark" ? <Sun className="group-hover:animate-squeeze" /> : <Moon className="group-hover:animate-squeeze" />}
      </button>
    </div>
  );
};
