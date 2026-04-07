export const Card = ({ title, year, poster }) => {
  return (
    <article className="themed-movie-card group relative w-full max-w-52 aspect-2/3 overflow-hidden cursor-pointer rounded-md">
      <div
        className="absolute inset-0 bg-center bg-cover transition-transform duration-200 group-hover:scale-105"
        style={{ backgroundImage: `url(${poster})` }}
      />
      <div className="themed-movie-overlay absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

      <div className="absolute inset-x-2 bottom-2 z-10 translate-y-3 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
        <div className="themed-movie-meta rounded-xl p-2">
          <h2 className="font-bold leading-tight">{title}</h2>
          <p className="text-sm opacity-85">{year}</p>
        </div>
      </div>
    </article>
  );
};
