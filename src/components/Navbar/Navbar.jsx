import { Logo } from "./Logo";
import { Search } from "./Search";
import { Theme } from "./Theme";

export const Navbar = () => {
  // 🧠 Logic

  return (
    <nav className="flex items-center justify-between mb-9">
      <div className="flex items-center gap-4">
        <Logo />

        <Search />
      </div>

      <Theme />
    </nav>
  );
};
