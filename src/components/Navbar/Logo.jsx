import { Clapperboard } from "lucide-react";
import useMoviesStore from "../../contexts/useMoviesStore";

export const Logo = () => {
  const resetSearch = useMoviesStore((s) => s.resetSearch);

  return (
    <button
      type="button"
      onClick={resetSearch}
      aria-label="Volver al inicio"
      className="themed-control flex h-navbar-items items-center gap-2 p-2 px-3 rounded-full cursor-pointer"
    >
      <Clapperboard />
      <span className="text-xl">Movie Search</span>
    </button>
  );
};
