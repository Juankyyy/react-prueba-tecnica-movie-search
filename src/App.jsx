import { Movies } from "./components/Movies/Movies.jsx";
import { Navbar } from "./components/Navbar/Navbar.jsx";
import { RandomSearchOverlay } from "./components/RandomSearchOverlay.jsx";

export const App = () => {
  // 🧠 Logic

  return (
    <>
      <RandomSearchOverlay />
      <Navbar />
      <Movies />
    </>
  );
};
