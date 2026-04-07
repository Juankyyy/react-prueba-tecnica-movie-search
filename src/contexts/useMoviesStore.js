import { create } from "zustand";
import { getMovieByExactTitle, getMovies } from "../services/movies";

const WORD_TRANSLATIONS = {
  capitulo: "chapter",
  capitulos: "chapters",
  parte: "part",
  temporada: "season",
  serie: "series",
  pelicula: "movie",
};

const NUMBER_TO_WORD = {
  "1": "one",
  "2": "two",
  "3": "three",
  "4": "four",
  "5": "five",
  "6": "six",
  "7": "seven",
  "8": "eight",
  "9": "nine",
  "10": "ten",
};

const NUMBER_TO_ROMAN = {
  "1": "i",
  "2": "ii",
  "3": "iii",
  "4": "iv",
  "5": "v",
  "6": "vi",
  "7": "vii",
  "8": "viii",
  "9": "ix",
  "10": "x",
};

const normalizeText = (value) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const replaceWords = (value) =>
  value.replace(/\b[a-z]+\b/g, (word) => WORD_TRANSLATIONS[word] ?? word);

const replaceNumbers = (value, map) =>
  value.replace(/\b(\d{1,2})\b/g, (digits) => map[digits] ?? digits);

const buildSequelVariants = (value) => {
  const match = value.match(/^(.*)\s(\d{1,2})$/);
  if (!match) return [];

  const title = match[1].trim();
  const number = match[2];
  const numberWord = NUMBER_TO_WORD[number];
  const numberRoman = NUMBER_TO_ROMAN[number];

  if (!numberWord) return [];

  const variants = [
    `${title} chapter ${numberWord}`,
    `${title} part ${numberWord}`,
    `${title} ${numberWord}`,
  ];

  if (numberRoman) {
    variants.push(`${title} ${numberRoman}`);
  }

  return variants;
};

const buildQueryVariants = (query) => {
  const base = query.replace(/\s+/g, " ").trim();
  const normalized = normalizeText(base);
  const translated = replaceWords(normalized);
  const translatedWithWords = replaceNumbers(translated, NUMBER_TO_WORD);
  const translatedWithRoman = replaceNumbers(translated, NUMBER_TO_ROMAN);

  const sequelPriorityVariants = [
    ...buildSequelVariants(base),
    ...buildSequelVariants(translated),
    ...buildSequelVariants(translatedWithWords),
  ];

  return [
    ...new Set([
      ...sequelPriorityVariants,
      translatedWithWords,
      translatedWithRoman,
      translated,
      base,
    ]),
  ]
    .filter((value) => value.length > 0)
    .slice(0, 8);
};

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
