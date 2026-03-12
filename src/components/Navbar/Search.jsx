import { SearchIcon } from "lucide-react";
import { getMovies } from "../../services/movies";
import useMoviesStore from "../../contexts/useMoviesStore";

export const Search = () => {
  const query = useMoviesStore((s) => s.query);
  const setQuery = useMoviesStore((s) => s.setQuery);

  const onInputChange = (e) => {
    setQuery(e.target.value);
    console.log(query)
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(query);

    getMovies(query);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex items-center group gap-2 p-2 px-3 h-navbar-items bg-black border-border hover:bg-border hover:border-black border-2 rounded-full transition-colors"
    >
      <input
        className="focus:outline-0 p-2 px-3"
        type="text"
        placeholder="Fallout, Interstellar..."
        value={query}
        onChange={onInputChange}
      />
      <button className="group-hover:animate-squeeze">
        <SearchIcon className="cursor-pointer" />
      </button>
    </form>
  );
};
