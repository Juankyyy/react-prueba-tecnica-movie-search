// import { useEffect, useState } from "react";
// import { getDefaultMovies } from "../../services/movies";
import { Popcorn, Search, Sparkles } from "lucide-react";
import useMoviesStore from "../../contexts/useMoviesStore";
import { Card } from "./Card";

export const Movies = () => {
  const movies = useMoviesStore((s) => s.movies);
  const query = useMoviesStore((s) => s.query);
  const hasQuery = query.trim().length > 0;

  return movies.length > 0 ? (
    <section className="flex flex-wrap gap-5">
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
    <section className="mt-20 flex justify-center">
      <article className="themed-empty-card relative w-full overflow-hidden rounded-3xl p-8 shadow-[0_24px_80px_-30px_rgba(0,0,0,0.85)] backdrop-blur-sm md:p-10">
        <div className="pointer-events-none absolute -left-20 -top-24 h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-16 h-52 w-52 rounded-full bg-emerald-400/20 blur-3xl" />

        <div className="relative z-10">
          <div className="themed-empty-pill mb-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm">
            <Sparkles size={16} />
            Descubre tu próxima película favorita
          </div>

          <h2 className="text-3xl font-bold md:text-5xl">
            {hasQuery ? "No encontramos resultados" : "¡Bienvenido a Movie Search!"}
          </h2>

          <p className="themed-muted mt-4 max-w-2xl text-base md:text-lg">
            {hasQuery
              ? `No hay coincidencias para "${query}". Prueba con otro título o una palabra más corta.`
              : "Busca por título y encuentra películas en segundos. Empieza con una de estas ideas:"}
          </p>

          <div className="mt-7 flex flex-wrap gap-3 text-sm">
            <span className="themed-empty-chip rounded-full px-4 py-2">Interstellar</span>
            <span className="themed-empty-chip rounded-full px-4 py-2">The Dark Knight</span>
            <span className="themed-empty-chip rounded-full px-4 py-2">Fallout</span>
          </div>

          <div className="themed-muted mt-8 flex flex-wrap items-center gap-4 text-sm">
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
