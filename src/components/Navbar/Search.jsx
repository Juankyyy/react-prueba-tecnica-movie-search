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
    <div className="flex w-full items-center gap-1.5 sm:gap-2 md:w-auto">
      <form
        onSubmit={onSubmit}
        className="themed-control group flex h-navbar-items min-w-0 flex-1 items-center gap-1.5 rounded-full p-2 px-2 sm:gap-2 sm:px-3"
      >
        <input
          className="themed-input min-w-0 flex-1 p-1.5 px-1 text-[13px] focus:outline-0 sm:p-2 sm:px-3 sm:text-base"
          type="text"
          value={query}
          onChange={onInputChange}
          placeholder="Busca una película o serie"
        />
        <button className="shrink-0 group-hover:animate-squeeze" aria-label="Buscar">
          <SearchIcon className="h-4 w-4 cursor-pointer sm:h-5 sm:w-5" />
        </button>
      </form>

      <button
        type="button"
        onClick={onRandomClick}
        disabled={isRandomPicking}
        aria-label="Buscar una película o serie popular aleatoria"
        className="themed-random-btn grid h-9 w-9 shrink-0 place-items-center rounded-full sm:h-10 sm:w-10"
      >
        <Dices size={16} className="random-icon sm:h-[18px] sm:w-[18px]" />
      </button>
    </div>
  );
};
