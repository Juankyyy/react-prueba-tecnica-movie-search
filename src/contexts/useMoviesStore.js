import { create } from "zustand";
import { getMovies } from "../services/movies";

const useMoviesStore = create((set, get) => ({
  // estados
  query: "",
  movies: [],
  isLoading: false,
  error: null,

  // acciones
  setQuery: (value) => set({ query: value }),

  // funciones
  getMoviesByQuery: async (query) => {
    try {
      const res = await getMovies(query);

      if (res.Response === "True") {
        set({ movies: res.Search, isLoading: false, error: null });
        console.log(get().movies);
      }
      else if (res.Error ==="Incorrect IMDb ID.") {
        set({ movies: [], isLoading: false, error: null});
      } else {
        set({ error: res.Error, isLoading: false });
        console.error("Error al buscar películas: ", res);
      }
    } catch (error) {
      console.error("Error en la función al buscar películas: ", error);
    }
  },
}));

export default useMoviesStore;
