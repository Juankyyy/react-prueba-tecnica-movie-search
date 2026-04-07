import { Clapperboard } from "lucide-react";

export const Logo = () => {
  // 🧠 Logic

  return (
    <div className="themed-control flex h-navbar-items items-center gap-2 p-2 px-3 rounded-full cursor-pointer">
      <Clapperboard />
      <h1 className="text-xl">Movie Search</h1>
    </div>
  );
};
