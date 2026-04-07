import { useState } from "react";
import { ImageOff } from "lucide-react";

export const Card = ({ title, year, poster }) => {
  const [imageError, setImageError] = useState(false);

  const hasPoster = Boolean(poster) && poster !== "N/A" && !imageError;

  return (
    <article className="themed-movie-card group relative w-full max-w-52 aspect-2/3 overflow-hidden cursor-pointer rounded-md">
      {hasPoster ? (
        <>
          <img
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
            src={poster}
            alt={title}
            onError={() => setImageError(true)}
            loading="lazy"
          />
          <div className="themed-movie-overlay absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
        </>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/35 text-white/90">
          <ImageOff size={26} />
          <p className="text-sm font-medium">Poster no disponible</p>
        </div>
      )}

      <div className="absolute inset-x-2 bottom-2 z-10 translate-y-3 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
        <div className="themed-movie-meta rounded-xl p-2">
          <h2 className="font-bold leading-tight">{title}</h2>
          <p className="text-sm opacity-85">{year}</p>
        </div>
      </div>
    </article>
  );
};
