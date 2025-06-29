import Button from "./Button";
import SocialIcons from "./SocialIcons";
import "../css/footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-item">
        <h5>Contact us</h5>
        <ul>
          <li>ndarren.dev@gmail.com</li>
          <li>0635196394</li>
          <li>12 traverse pastré 13009 Marseille</li>
        </ul>
      </div>

      <div className="footer-item">
        <SocialIcons></SocialIcons>
        <Button className="get-started" name="Get started"></Button>
      </div>
    </footer>
  );
}

export default Footer;
