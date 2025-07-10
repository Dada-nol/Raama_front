import "../../../styles/css/footer.css";
/* import Button from "./Button"; */
import SocialIcons from "../../ui/SocialIcons";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-item">
        <h4>Connect with us</h4>

        <SocialIcons></SocialIcons>
        {/* <a href="/register">
          <Button className="get-started" name="Get started"></Button>
        </a> */}
      </div>

      <div className="footer-item">
        <h4>Contact us</h4>
        <ul>
          <li>
            <a href="mailto:ndarren.dev@gmail.com">ndarren.dev@gmail.com</a>
          </li>
          <li>
            <a href="tel:+33635196394">0635196394</a>
          </li>
          <li>
            <a
              target="_blank"
              rel="noneferrer noreferrer"
              href="https://maps.app.goo.gl/N5RtUWzmHN9qJmcL8"
            >
              12 traverse pastré 13009 Marseille
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
