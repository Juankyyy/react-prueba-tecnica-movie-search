import { SearchIcon } from "lucide-react";
import useMoviesStore from "../../contexts/useMoviesStore";

export const Search = () => {
  const getMoviesByQuery = useMoviesStore((s) => s.getMoviesByQuery);
  const query = useMoviesStore((s) => s.query);
  const setQuery = useMoviesStore((s) => s.setQuery);

  const onInputChange = (e) => {
    setQuery(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(query);

    getMoviesByQuery(query.trim());
  };

  return (
    <form
      onSubmit={onSubmit}
      className="themed-control flex items-center group gap-2 p-2 px-3 h-navbar-items rounded-full"
    >
      <input
        className="themed-input focus:outline-0 p-2 px-3"
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
