const API_KEY = "32e86ad1";
const BASE_URL = "https://www.omdbapi.com/";

export const getMoviesbySearch = async (search) => {
  try {
    console.log(search)
    const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${search}`);
    // https://www.omdbapi.com/?apikey=32e86ad1&s=arroz

    const data = await res.json();

    console.log(data);

  } catch (err) {
    throw new Error("Error al buscar películas: ", err);
  }

  return {
    getMoviesbySearch,
  };
};
