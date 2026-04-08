import { Clapperboard } from "lucide-react";
import useMoviesStore from "../../contexts/useMoviesStore";

export const Logo = () => {
  const resetSearch = useMoviesStore((s) => s.resetSearch);

  return (
    <button
      type="button"
      onClick={resetSearch}
      aria-label="Volver al inicio"
      className="themed-control flex h-navbar-items w-full items-center justify-center gap-2 rounded-full px-2 py-2 cursor-pointer md:w-auto md:px-3"
    >
      <Clapperboard className="h-4 w-4 sm:h-5 sm:w-5" />
      <span className="text-sm sm:text-lg md:text-xl">Movie Search</span>
    </button>
  );
};
