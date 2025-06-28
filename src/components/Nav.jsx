import loop1 from "../assets/video/loop1.mp4";
import Button from "./Button";
import Logo from "./Logo";

function Nav() {
  return (
    <header>
      <nav className="nav">
        <Logo href="/" src="" alt="PANDA ~ RAAMA" />

        <div className="nav-links">
          <Button className="login" name="Log in" />
          <Button className="get-started" name="Get started" />
        </div>
      </nav>
      <video autoPlay muted loop playsInline className="background-video">
        <source src={loop1} type="video/mp4" />
      </video>

      <div className="text">
        <div class="header-content">
          <Logo href="/" src="" alt="PANDA ~ RAAMA" />

          <div class="slogan">Un souvenir par jour, pour toujours</div>
        </div>
      </div>
    </header>
  );
}

export default Nav;
