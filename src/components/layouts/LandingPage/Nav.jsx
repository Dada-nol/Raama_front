import { useEffect, useState } from "react";
import logo from "../../../assets/img/logo.png";
import img_panda1 from "../../../assets/img/panda1.png";
import video_loop1 from "../../../assets/video/loop1.mp4";
import "../../../styles/scss/header.scss";
import Button from "../../ui/Button";

function Nav() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [colorNav, setColorNav] = useState("transparent");
  const [sizeLogo, setSizeLogo] = useState("156.5px");

  useEffect(() => {
    const handleSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    const handleScroll = () => {
      const vh100 = window.innerHeight - 100;
      if (window.scrollY > vh100) {
        setColorNav("#1e1e1e");
        setSizeLogo("80px");
      } else {
        setColorNav("transparent");
        setSizeLogo("156.5px");
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
        <div>
          <img
            src={logo}
            alt="Pandaraama"
            className="logo"
            style={{ width: sizeLogo }}
          />
        </div>

        <div className="nav-links">
          <a href="/login">
            <Button name="Log in" />
          </a>
          <a href="/register">
            <Button name="Register" />
          </a>
        </div>
      </nav>
      {isMobile ? (
        <img
          src={img_panda1}
          alt="Le panda suprême !"
          className="background-img"
        ></img>
      ) : (
        <video autoPlay muted loop playsInline className="background-video">
          <source src={video_loop1} type="video/mp4" />
        </video>
      )}

      <div className="header-content">
        <h1>
          Chaque jour une mémoire, <br></br>chaque mémoire un lien
        </h1>
        <a href="/register">
          <button>Get started</button>
        </a>
      </div>
    </header>
  );
}

export default Nav;
