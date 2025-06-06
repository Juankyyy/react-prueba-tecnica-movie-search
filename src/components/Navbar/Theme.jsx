import { Moon } from "lucide-react";
import { Sun } from "lucide-react";

export const Theme = () => {
  const theme = localStorage.getItem("theme");

  return (
    <div className="flex items-center justify-center h-navbar-items w-navbar-items">
      <button className="bg-black border-border border-2 p-2 rounded-full cursor-pointer">
        {theme === "dark" ? <Sun /> : <Moon />}
      </button>
    </div>
  );
};
