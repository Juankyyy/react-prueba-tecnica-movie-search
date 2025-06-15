import { SearchIcon } from "lucide-react";

export const Search = () => {
  // 🧠 Logic

  return (
    <form className="flex items-center group gap-2 p-2 px-3 h-navbar-items bg-black border-border hover:bg-border hover:border-black border-2 rounded-full transition-colors">
      <input
        className="focus:outline-0 p-2 px-3"
        type="text"
        placeholder="Elysium, Interstellar..."
      />
      <button className="group-hover:animate-squeeze">
        <SearchIcon className="cursor-pointer" />
      </button>
    </form>
  );
};
