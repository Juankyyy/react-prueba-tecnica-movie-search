import { SearchIcon } from "lucide-react";
import { useState } from "react";

export const Search = () => {
  const [query, setQuery] = useState("");

  const onInputChange = (e) => {
    setQuery(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(query);
  };

  return (
    <form onSubmit={onSubmit} className="flex items-center group gap-2 p-2 px-3 h-navbar-items bg-black border-border hover:bg-border hover:border-black border-2 rounded-full transition-colors">
      <input
        className="focus:outline-0 p-2 px-3"
        type="text"
        placeholder="Elysium, Interstellar..."
        value={query}
        onChange={onInputChange}
      />
      <button className="group-hover:animate-squeeze">
        <SearchIcon className="cursor-pointer" />
      </button>
    </form>
  );
};
