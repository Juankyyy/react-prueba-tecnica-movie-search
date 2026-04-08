import { Logo } from "./Logo";
import { Search } from "./Search";
import { Theme } from "./Theme";

export const Navbar = () => {
  // 🧠 Logic

  return (
    <nav className="mb-6 flex flex-col gap-3 md:mb-9 md:flex-row md:items-center md:justify-between">
      <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:items-center md:gap-4">
        <Logo />

        <Search />
      </div>

      <div className="self-end md:self-auto">
        <Theme />
      </div>
    </nav>
  );
};
