import SocialIcons from "../../ui/SocialIcons";

/**
 * Composant Footer de la landing page.
 *
 * Affiche deux sections principales :
 * 1. "Connect with us" avec les icônes des réseaux sociaux (via le composant SocialIcons).
 * 2. "Contact us" avec les informations de contact : email, téléphone et adresse.
 *
 * La mise en page est responsive :
 * - Colonne sur mobile (flex-col)
 * - Ligne sur desktop (md:flex-row)
 *
 * @component
 *
 * @example
 * <Footer />
 */
function Footer() {
  return (
    <footer className="flex flex-col md:flex-row justify-between items-center gap-8">
      <div>
        <h4>Connect with us</h4>

        <SocialIcons></SocialIcons>
      </div>

      <div className="text-center">
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
