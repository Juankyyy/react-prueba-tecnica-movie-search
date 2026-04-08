import { Dices, Popcorn, Search, Sparkles } from "lucide-react";
import useMoviesStore from "../../contexts/useMoviesStore";
import { Card } from "./Card";

export const Movies = () => {
  const movies = useMoviesStore((s) => s.movies);
  const isLoading = useMoviesStore((s) => s.isLoading);
  const isRandomPicking = useMoviesStore((s) => s.isRandomPicking);
  const error = useMoviesStore((s) => s.error);
  const hasSearched = useMoviesStore((s) => s.hasSearched);
  const query = useMoviesStore((s) => s.query);
  const setQuery = useMoviesStore((s) => s.setQuery);
  const searchRandomPopular = useMoviesStore((s) => s.searchRandomPopular);
  const hasQuery = query.trim().length > 0;
  const showMovies = hasQuery && movies.length > 0 && hasSearched && !isLoading;

  const onSuggestionClick = (suggestion) => {
    setQuery(suggestion);
  };

  const onRandomClick = () => {
    searchRandomPopular();
  };

  const getTitle = () => {
    if (!hasQuery) return "¡Bienvenido a Movie Search!";
    if (isLoading) return "Escribiendo tu búsqueda...";
    if (!hasSearched) return "Escribiendo tu búsqueda...";
    if (error) return "Hubo un problema al buscar";

    return "No encontramos resultados";
  };

  const getDescription = () => {
    if (!hasQuery) {
      return "Busca por título y encuentra películas en segundos. Empieza con una de estas ideas:";
    }

    if (isLoading) {
      return "Sigue escribiendo, aún no hemos terminado de buscar.";
    }

    if (!hasSearched) {
      return "Sigue escribiendo, aún no hemos terminado de buscar.";
    }

    if (error) {
      return error;
    }

    return `No hay coincidencias para "${query}". Prueba con otro título o una palabra más corta.`;
  };

  return showMovies ? (
    <section className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
      {movies.map((movie) => (
        <Card
          key={movie.imdbID}
          title={movie.Title}
          year={movie.Year}
          poster={movie.Poster}
        />
      ))}
    </section>
  ) : (
    <section className="mt-9 flex justify-center md:mt-20">
      <article className="themed-empty-card relative w-full overflow-hidden rounded-3xl p-5 sm:p-7 md:p-10">
        <div className="pointer-events-none absolute -left-20 -top-24 h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-16 h-52 w-52 rounded-full bg-emerald-400/20 blur-3xl" />

        <div className="relative z-10">
          <div className="themed-empty-pill mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs sm:mb-5 sm:px-4 sm:py-2 sm:text-sm">
            <Sparkles size={16} />
            Busca y descubre tu próxima película favorita
          </div>

          <h2 className="text-2xl font-bold sm:text-3xl md:text-5xl">{getTitle()}</h2>

          <p className="themed-muted mt-4 max-w-2xl text-sm sm:text-base md:text-lg">{getDescription()}</p>

          <div className="mt-6 flex flex-wrap gap-2 text-xs sm:mt-7 sm:gap-3 sm:text-sm">
            <button
              type="button"
              onClick={() => onSuggestionClick("Interstellar")}
              className="themed-empty-chip cursor-pointer rounded-full px-3 py-2 transition-transform hover:scale-105 max-[420px]:w-full max-[420px]:justify-center sm:px-4"
            >
              Interstellar
            </button>
            <button
              type="button"
              onClick={() => onSuggestionClick("The Dark Knight")}
              className="themed-empty-chip cursor-pointer rounded-full px-3 py-2 transition-transform hover:scale-105 max-[420px]:w-full max-[420px]:justify-center sm:px-4"
            >
              The Dark Knight
            </button>
            <button
              type="button"
              onClick={() => onSuggestionClick("Fallout")}
              className="themed-empty-chip cursor-pointer rounded-full px-3 py-2 transition-transform hover:scale-105 max-[420px]:w-full max-[420px]:justify-center sm:px-4"
            >
              Fallout
            </button>
            <button
              type="button"
              onClick={onRandomClick}
              disabled={isRandomPicking}
              className="themed-random-btn inline-flex items-center gap-2 rounded-full px-3 py-2 max-[420px]:w-full max-[420px]:justify-center sm:px-4"
            >
              <Dices size={16} className="random-icon" />
              Random
            </button>
          </div>

          <div className="themed-muted mt-8 flex flex-wrap items-center gap-3 text-xs sm:gap-4 sm:text-sm">
            <div className="inline-flex items-center gap-2">
              <Search size={16} />
              Escribe un título en el buscador
            </div>
            <div className="inline-flex items-center gap-2">
              <Popcorn size={16} />
              Explora resultados al instante
            </div>
          </div>
        </div>
      </article>
    </section>
  );
};
