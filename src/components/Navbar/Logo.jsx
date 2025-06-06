import { Popcorn } from "lucide-react";

export const Logo = () => {
  // 🧠 Logic

  return (
    <div className="flex h-navbar-items items-center gap-2 bg-black border-border border-2 p-2 px-3 rounded-full">
      <Popcorn />
      <h1 className="text-xl">Buscador de películas</h1>
    </div>
  );
};
