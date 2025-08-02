import { useEffect, useState } from "react";
import logo from "../../../assets/img/logo.png";
import img_panda1 from "../../../assets/img/panda1.png";
import video_loop1 from "../../../assets/video/loop1.mp4";
import Button from "../../ui/Button";
import Logo from "../../ui/Logo";

function Nav() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [colorNav, setColorNav] = useState("transparent");
  const [sizeLogo, setSizeLogo] = useState(true);

  useEffect(() => {
    const handleSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

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

    window.addEventListener("resize", handleSize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleSize);
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
            <Button name="Log in" />
          </a>
          <a
            className="text-lg hover:scale-105 inline-block transition-transform duration-300 hover:scale-140"
            href="/register"
          >
            <Button name="Register" />
          </a>
        </div>
      </nav>
      {isMobile ? (
        <img
          src={img_panda1}
          alt="Panda allongé couvrant le haut de la landing page"
          className="background-img"
        ></img>
      ) : (
        <video autoPlay muted loop playsInline className="background-video">
          <source src={video_loop1} type="video/mp4" />
        </video>
      )}

      <div className="header-content flex flex-col items-center">
        <h1 className="font-bold text-[40px] flex flex-col items-center pb-6">
          <p>Chaque jour une mémoire,</p>
          <p>chaque mémoire un lien</p>
        </h1>
        <a
          className="gradient-border p-4 inline-block transition-transform duration-300 hover:scale-105"
          href="/register"
        >
          <button className="text-lg">Get started</button>
        </a>
      </div>
    </header>
  );
}

export default Nav;
