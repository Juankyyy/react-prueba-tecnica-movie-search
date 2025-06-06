import { SearchIcon } from "lucide-react";

export const Search = () => {
  // 🧠 Logic

  return (
    <div className="flex items-center group gap-2 h-navbar-items bg-black border-border hover:bg-border hover:border-black border-2 p-2 px-3 rounded-full transition-colors">
      <input
        className="focus:outline-0 px-2"
        type="text"
        placeholder="Elysium, Interstellar..."
      />
      <button className="group-hover:animate-squeeze">
        <SearchIcon className="cursor-pointer" />
      </button>
    </div>
  );
};
