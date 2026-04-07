import { Dices, SearchIcon } from "lucide-react";
import useMoviesStore from "../../contexts/useMoviesStore";
import { useEffect } from "react";

export const Search = () => {
  const getMoviesByQuery = useMoviesStore((s) => s.getMoviesByQuery);
  const searchRandomPopular = useMoviesStore((s) => s.searchRandomPopular);
  const isRandomPicking = useMoviesStore((s) => s.isRandomPicking);
  const query = useMoviesStore((s) => s.query);
  const setQuery = useMoviesStore((s) => s.setQuery);
  const setMovies = useMoviesStore((s) => s.setMovies);

  const onInputChange = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    if (!query.trim()) {
      setMovies([]);
      return;
    }

    const timer = setTimeout(() => {
      getMoviesByQuery(query.trim());
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const onRandomClick = () => {
    searchRandomPopular();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(query);
    if (query.length === 0) {
      setMovies([]);

    } else {
      getMoviesByQuery(query);
    };
  };

  return (
    <div className="flex items-center gap-2">
      <form
        onSubmit={onSubmit}
        className="themed-control flex items-center group gap-2 p-2 px-3 h-navbar-items rounded-full"
      >
        <input
          className="themed-input focus:outline-0 p-2 px-3"
          type="text"
          value={query}
          onChange={onInputChange}
        />
        <button className="group-hover:animate-squeeze">
          <SearchIcon className="cursor-pointer" />
        </button>
      </form>

      <button
        type="button"
        onClick={onRandomClick}
        disabled={isRandomPicking}
        aria-label="Buscar una película o serie popular aleatoria"
        className="themed-random-btn h-10 w-10 rounded-full grid place-items-center"
      >
        <Dices size={18} className="random-icon" />
      </button>
    </div>
  );
};
