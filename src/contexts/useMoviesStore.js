import { create } from "zustand";
import { getMovies } from "../services/movies";

const useMoviesStore = create((set) => ({
  // estados
  query: "",
  movies: [],
  isLoading: false,
  error: null,

  // acciones
  setQuery: (query) => set({ query }),

  // funciones
  getMoviesByQuery: async (query) => {
    try {
      const res = await getMovies(query);

      if (!res.error) {
        // afirmativo
      } else {
        console.error("Error al buscar películas: ", res.error);
      }
    } catch (error) {
      console.error("Error en la función al buscar películas: ", error);
    }
  },
}));

export default useMoviesStore;
