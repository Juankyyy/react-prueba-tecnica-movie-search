// import { useEffect, useState } from "react";
// import { getDefaultMovies } from "../../services/movies";
import useMoviesStore from "../../contexts/useMoviesStore";
import { Card } from "./Card";

export const Movies = () => {
  const movies = useMoviesStore((s) => s.movies);
  // const [allMovies, setAllMovies] = useState([]);

  // useEffect(() => {
  //   const fetchDefaultMovies = async () => {
  //     try {
  //       const movies = await getDefaultMovies();
  //       setAllMovies(movies);
  //     } catch (error) {
  //       console.error("Error fetching movies:", error);
  //     }
  //   };

  //   fetchDefaultMovies();
  // });

  return (
    <section className="flex flex-wrap gap-5">
      {movies.map((movie) => (
        <Card key={movie.imdbID} title={movie.Title} year={movie.Year} poster={movie.Poster}></Card>
      ))}
    </section>
  );
};
