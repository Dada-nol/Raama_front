import { useEffect, useState } from "react";
import "../../styles/scss/transitions.scss";

function Transition() {
  const [fadeOut, setFadeOut] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  useEffect(() => {
    // après 1.5s, active la classe de sortie
    const timer = setTimeout(() => setFadeOut(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main>
      <div
        className={`container-transition ${fadeIn ? "fade-in" : ""} ${
          fadeOut ? "fade-out" : ""
        }`}
      >
        <div className="ball"></div>
        <div className="shadow"></div>
        <div className="progress-bar"></div>
      </div>
    </main>
  );
}

export default Transition;
