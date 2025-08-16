import facebookIcon from "../../assets/img/facebook.png";
import instagramIcon from "../../assets/img/instagram.png";
import linkedinIcon from "../../assets/img/linkedin.png";
import Icon from "./Icon";

/**
 * Composant affichant une liste d'icônes sociales cliquables.
 *
 * Chaque icône redirige vers le réseau social correspondant dans un nouvel onglet.
 *
 * @component
 *
 * @example
 * <SocialIcons />
 */
function SocialIcons() {
  const socialIcons = [
    { href: "https://facebook.com", src: facebookIcon, alt: "Facebook" },
    { href: "https://instagram.com", src: instagramIcon, alt: "Instagram" },
    { href: "https://linkedin.com", src: linkedinIcon, alt: "LinkedIn" },
  ];
  return (
    <div className="flex justify-center items-center gap-2">
      {socialIcons.map((icon, i) => (
        <a key={i} rel="noneferrer noreferrer" target="_blank" href={icon.href}>
          <Icon src={icon.src} alt={icon.alt} />
        </a>
      ))}
    </div>
  );
}

export default SocialIcons;
