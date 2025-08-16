import { useEffect, useState } from "react";
import img_panda1 from "../../../assets/img/panda1.png";
import video_loop1 from "../../../assets/video/loop1.mp4";
import Logo from "../../ui/Logo";

/**
 * Composant de navigation principal pour la landing page.
 *
 * Comportements :
 * - Change la couleur de fond de la navbar selon le scroll (transparent ou sombre).
 * - Change la taille du logo selon le scroll.
 * - Affiche des liens "Log in" et "Register".
 * - Affiche un panda en image pour mobile et une vidéo en arrière-plan pour desktop.
 * - Affiche un message central avec un bouton "Get started".
 *
 * @component
 *
 * @example
 * <Nav />
 */
function Nav() {
  const [colorNav, setColorNav] = useState("transparent");
  const [sizeLogo, setSizeLogo] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const vh100 = window.innerHeight - 100;
      if (window.scrollY > vh100) {
        setColorNav("#1e1e1e");
        setSizeLogo(false);
      } else {
        setColorNav("transparent");
        setSizeLogo(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="header">
      <nav
        className="nav"
        style={{
          backgroundColor: colorNav,
        }}
      >
        <div className="pl-10">
          {sizeLogo ? <Logo width={150}></Logo> : <Logo width={80}></Logo>}
        </div>

        <div className="flex justify-center items-center gap-4 pr-10">
          <a
            className="text-lg hover:scale-105 inline-block transition-transform duration-300 hover:scale-140"
            href="/login"
          >
            Log in
          </a>
          <a
            className="text-lg hover:scale-105 inline-block transition-transform duration-300 hover:scale-140"
            href="/register"
          >
            Register
          </a>
        </div>
      </nav>

      <img
        src={img_panda1}
        alt="Panda allongé couvrant le haut de la landing page"
        className="block md:hidden background-img"
      ></img>

      <video
        autoPlay
        muted
        loop
        playsInline
        className="hidden md:block background-video"
      >
        <source src={video_loop1} type="video/mp4" />
      </video>

      <div className="absolute top-1/2 left-1/2 transform  -translate-y-1/2 -translate-x-1/2 z-10 flex flex-col items-center text-center">
        <h1 className="font-bold text-3xl md:text-4xl flex flex-col items-center pb-6">
          <span>Chaque jour une mémoire,</span>
          <span>chaque mémoire un lien</span>
        </h1>
        <a
          className="text-lg bg-my-gradient border border-white shadow-md hover:shadow-lg rounded-lg p-4 inline-block transition-transform duration-300 hover:scale-105"
          href="/register"
        >
          Get started
        </a>
      </div>
    </header>
  );
}

export default Nav;
