import { SearchIcon } from "lucide-react";

export const Search = () => {
  // 🧠 Logic

  return (
    <div className="flex items-center gap-2 h-navbar-items bg-black border-border border-2 p-2 px-3 rounded-full">
      <input className="focus:outline-0 px-2" type="text" placeholder="Elysium, Interstellar..." />
      <button><SearchIcon className="cursor-pointer" /></button>
    </div>
  );
};
