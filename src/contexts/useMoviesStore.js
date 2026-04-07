import { create } from "zustand";
import { getMovieByExactTitle, getMovies } from "../services/movies";
import { buildQueryVariants, buildTooManyResultsVariants } from "../utils/queryVariants";
import { getRandomPopularTitle } from "../utils/popularTitles";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const useMoviesStore = create((set, get) => ({
  // estados
  query: "",
  movies: [],
  isLoading: false,
  error: null,
  hasSearched: false,
  isRandomPicking: false,
  randomPickedTitle: "",

  // acciones
  setQuery: (value) => set({ query: value, hasSearched: false, error: null }),
  setMovies: (value) => set({ movies: value, hasSearched: false, error: null }),
  searchRandomPopular: async () => {
    if (get().isRandomPicking) return;

    const randomTitle = getRandomPopularTitle(get().query);

    set({
      isRandomPicking: true,
      randomPickedTitle: "",
      hasSearched: false,
      error: null,
    });

    await wait(1800);
    set({ randomPickedTitle: randomTitle });

    await wait(1300);
    set({
      query: randomTitle,
      hasSearched: false,
      error: null,
      isRandomPicking: false,
      randomPickedTitle: "",
    });
  },
  resetSearch: () =>
    set({
      query: "",
      movies: [],
      isLoading: false,
      error: null,
      hasSearched: false,
      isRandomPicking: false,
      randomPickedTitle: "",
    }),

  // funciones
  getMoviesByQuery: async (query) => {
    const normalizedQuery = query.trim();

    if (!normalizedQuery) {
      set({ movies: [], isLoading: false, error: null, hasSearched: false });
      return;
    }

    set({ isLoading: true, error: null });

    try {
      const queryVariants = buildQueryVariants(normalizedQuery);
      let hadTooManyResultsError = false;
      let lastError = null;

      for (const variant of queryVariants) {
        const res = await getMovies(variant);

        if (res.Response === "True") {
          set({ movies: res.Search, isLoading: false, error: null, hasSearched: true });
          console.log(get().movies);
          return;
        }

        if (res.Error === "Too many results.") {
          hadTooManyResultsError = true;
        }

        lastError = res.Error;
      }

      if (hadTooManyResultsError) {
        const refinedVariants = buildTooManyResultsVariants(normalizedQuery);

        for (const variant of refinedVariants) {
          const refinedRes = await getMovies(variant);

          if (refinedRes.Response === "True") {
            const exactMovie = await getMovieByExactTitle(normalizedQuery);
            const refinedMovies = refinedRes.Search ?? [];

            const moviesWithExactFirst =
              exactMovie.Response === "True"
                ? [exactMovie, ...refinedMovies.filter((movie) => movie.imdbID !== exactMovie.imdbID)]
                : refinedMovies;

            set({ movies: moviesWithExactFirst, isLoading: false, error: null, hasSearched: true });
            return;
          }
        }
      }

      for (const variant of queryVariants) {
        const exactMovie = await getMovieByExactTitle(variant);

        if (exactMovie.Response === "True") {
          set({ movies: [exactMovie], isLoading: false, error: null, hasSearched: true });
          return;
        }
      }

      if (hadTooManyResultsError) {
        set({
          movies: [],
          error: "Hay demasiados resultados. Prueba agregando el año o más contexto, por ejemplo: It Chapter Two o It 2017.",
          isLoading: false,
          hasSearched: true,
        });
      } else if (lastError === "Incorrect IMDb ID." || lastError === "Movie not found!") {
        set({ movies: [], isLoading: false, error: null, hasSearched: true });
      } else {
        set({ movies: [], error: lastError, isLoading: false, hasSearched: true });
        console.error("Error al buscar películas: ", lastError);
      }
    } catch (error) {
      set({ movies: [], error: "No se pudo completar la búsqueda.", isLoading: false, hasSearched: true });
      console.error("Error en la función al buscar películas: ", error);
    }
  },
}));

export default useMoviesStore;
