const API_KEY = "32e86ad1";
const BASE_URL = "https://www.omdbapi.com/";

export const getMovies = async (search) => {
  try {
    const normalizedSearch = encodeURIComponent(search.trim());
    const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${normalizedSearch}`);

    const data = await res.json();

    return data;
  } catch (err) {
    throw new Error("Error al buscar películas: ", err);
  }
};

export const getMovieByExactTitle = async (title) => {
  try {
    const normalizedTitle = encodeURIComponent(title.trim());
    const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&t=${normalizedTitle}`);
    const data = await res.json();

    return data;
  } catch (err) {
    throw new Error("Error al buscar película exacta: ", err);
  }
};