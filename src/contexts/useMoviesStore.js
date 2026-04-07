import { create } from "zustand";
import { getMovieByExactTitle, getMovies } from "../services/movies";

const useMoviesStore = create((set, get) => ({
  // estados
  query: "",
  movies: [],
  isLoading: false,
  error: null,
  hasSearched: false,

  // acciones
  setQuery: (value) => set({ query: value, hasSearched: false, error: null }),
  setMovies: (value) => set({ movies: value, hasSearched: false, error: null }),

  // funciones
  getMoviesByQuery: async (query) => {
    const normalizedQuery = query.trim();

    if (!normalizedQuery) {
      set({ movies: [], isLoading: false, error: null, hasSearched: false });
      return;
    }

    set({ isLoading: true, error: null });

    try {
      const res = await getMovies(normalizedQuery);

      if (res.Response === "True") {
        set({ movies: res.Search, isLoading: false, error: null, hasSearched: true });
        console.log(get().movies);
      } else if (res.Error === "Too many results.") {
        const exactMovie = await getMovieByExactTitle(normalizedQuery);

        if (exactMovie.Response === "True") {
          set({ movies: [exactMovie], isLoading: false, error: null, hasSearched: true });
        } else {
          set({
            movies: [],
            error: "Hay demasiados resultados. Prueba agregando el año o más contexto, por ejemplo: It 2017 o Fallout series.",
            isLoading: false,
            hasSearched: true,
          });
        }
      } else if (res.Error === "Incorrect IMDb ID.") {
        set({ movies: [], isLoading: false, error: null, hasSearched: true });
      } else {
        set({ movies: [], error: res.Error, isLoading: false, hasSearched: true });
        console.error("Error al buscar películas: ", res);
      }
    } catch (error) {
      set({ movies: [], error: "No se pudo completar la búsqueda.", isLoading: false, hasSearched: true });
      console.error("Error en la función al buscar películas: ", error);
    }
  },
}));

export default useMoviesStore;
