import { useEffect, useState } from "react";
import { ImageOff } from "lucide-react";

export const Card = ({ title, year, poster }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setImageError(false);
    setImageLoaded(false);
  }, [poster]);

  const hasPoster = Boolean(poster) && poster !== "N/A" && !imageError;

  return (
    <article className="themed-movie-card group relative aspect-2/3 w-full overflow-hidden rounded-md cursor-pointer">
      {hasPoster ? (
        <>
          {!imageLoaded && (
            <div className="themed-poster-loading absolute inset-0 flex items-center justify-center">
              <div className="themed-poster-shimmer" />
              <div className="themed-poster-spinner" aria-hidden="true" />
            </div>
          )}

          <img
            className={`absolute inset-0 h-full w-full object-cover transition-all duration-300 ${
              imageLoaded ? "opacity-100 group-hover:scale-105" : "opacity-0"
            }`}
            src={poster}
            alt={title}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            loading="lazy"
            decoding="async"
          />
          <div
            className={`themed-movie-overlay absolute inset-0 transition-opacity duration-200 ${
              imageLoaded ? "opacity-20 md:opacity-0 md:group-hover:opacity-100" : "opacity-0"
            }`}
          />
        </>
      ) : (
        <div className="themed-poster-fallback absolute inset-0 flex flex-col items-center justify-center gap-2">
          <ImageOff size={26} />
          <p className="px-2 text-center text-xs font-medium sm:text-sm">Poster no disponible</p>
        </div>
      )}

      <div className="absolute inset-x-2 bottom-2 z-10 translate-y-0 opacity-100 transition-all duration-200 md:translate-y-3 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
        <div className="themed-movie-meta rounded-xl p-1.5 sm:p-2">
          <h2 className="text-xs font-bold leading-tight sm:text-base">{title}</h2>
          <p className="text-xs opacity-85 sm:text-sm">{year}</p>
        </div>
      </div>
    </article>
  );
};
