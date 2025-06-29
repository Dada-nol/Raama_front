import { useEffect, useState } from "react";
import img_panda2 from "../assets/img/panda2.png";
import video_loop1 from "../assets/video/loop1.mp4";
import "../css/header.css";
import Button from "./Button";
import Logo from "./Logo";

function Nav() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [colorNav, setColorNav] = useState("transparent");

  useEffect(() => {
    const handleSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    const handleScroll = () => {
      if (window.scrollY > 0) {
        setColorNav("#2f2f2f");
      } else {
        setColorNav("transparent");
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
    <header>
      <nav className="nav" style={{ backgroundColor: colorNav }}>
        <Logo href="/" src="" alt="PANDA ~ RAAMA" />

        <div className="nav-links">
          <a href="/login">
            <Button className="login" name="Log in" />
          </a>
          <a href="/register">
            <Button className="get-started" name="Get started" />
          </a>
        </div>
      </nav>
      {isMobile ? (
        <img
          src={img_panda2}
          alt="Le panda suprême !"
          className="background-img"
        ></img>
      ) : (
        <video autoPlay muted loop playsInline className="background-video">
          <source src={video_loop1} type="video/mp4" />
        </video>
      )}

      <div className="header-content">
        <div class="header-content-items">
          <Logo href="/" src="" alt="PANDA ~ RAAMA" />

          <div class="slogan">Un souvenir par jour, pour toujours</div>
        </div>
      </div>
    </header>
  );
}

export default Nav;
