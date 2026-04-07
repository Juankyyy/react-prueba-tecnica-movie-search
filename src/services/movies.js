const API_KEY = "32e86ad1";
const BASE_URL = "https://www.omdbapi.com/";

export const getDefaultMovies = async () => {
  try {
    const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=avengers`);

    const data = await res.json();

    return data.Search;
  } catch (err) {
    throw new Error("Error al obtener películas: ", err);
  }
};

export const getMovies = async (search) => {
  try {
    const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${search}`);
    // https://www.omdbapi.com/?apikey=32e86ad1&s=arroz

    const data = await res.json();

    return data;
  } catch (err) {
    throw new Error("Error al buscar películas: ", err);
  }
};