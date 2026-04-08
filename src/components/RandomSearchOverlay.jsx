import { useEffect, useState } from "react";
import { Dices } from "lucide-react";
import useMoviesStore from "../contexts/useMoviesStore";

const OVERLAY_TRANSITION_MS = 520;

export const RandomSearchOverlay = () => {
  const isRandomPicking = useMoviesStore((s) => s.isRandomPicking);
  const randomPickedTitle = useMoviesStore((s) => s.randomPickedTitle);

  const [isVisible, setIsVisible] = useState(isRandomPicking);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isRandomPicking) {
      setIsVisible(true);
      return;
    }

    setIsActive(false);

    const timeoutId = window.setTimeout(() => {
      setIsVisible(false);
    }, OVERLAY_TRANSITION_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isRandomPicking]);

  useEffect(() => {
    if (!isVisible || !isRandomPicking) return;

    setIsActive(false);

    // Double RAF ensures one paint in pre-enter before animating to entered.
    let frameId2;
    const frameId = window.requestAnimationFrame(() => {
      frameId2 = window.requestAnimationFrame(() => {
        setIsActive(true);
      });
    });

    return () => {
      window.cancelAnimationFrame(frameId);
      if (frameId2) window.cancelAnimationFrame(frameId2);
    };
  }, [isVisible, isRandomPicking]);

  useEffect(() => {
    if (!isVisible) return;

    const previousOverflow = document.body.style.overflow;
    const previousTouchAction = document.body.style.touchAction;

    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.touchAction = previousTouchAction;
    };
  }, [isVisible]);

  if (!isVisible) return null;

  const hasPickedTitle = randomPickedTitle.length > 0;
  const transitionClass = !isRandomPicking ? "is-leaving" : isActive ? "is-entered" : "is-pre-enter";

  return (
    <div
      className={`random-overlay ${transitionClass}`}
      role="status"
      aria-live="polite"
      aria-atomic="true"
      aria-label="Búsqueda aleatoria en progreso"
    >
      <div className={`random-overlay-card ${transitionClass} ${hasPickedTitle ? "is-result" : ""}`}>
        <div className="random-overlay-orb" />

        <div className={`random-overlay-dice-wrap ${hasPickedTitle ? "is-result" : ""}`}>
          <Dices size={54} className="random-overlay-dice" />
        </div>

        <p className="random-overlay-title">
          {hasPickedTitle ? "Título elegido" : "Lanzando dado..."}
        </p>

        <p className={`random-overlay-picked ${hasPickedTitle ? "show" : ""}`}>
          {hasPickedTitle ? randomPickedTitle : "Descubriendo una sorpresa"}
        </p>
      </div>
    </div>
  );
};
