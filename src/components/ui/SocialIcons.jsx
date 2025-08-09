import facebookIcon from "../../assets/img/facebook.png";
import instagramIcon from "../../assets/img/instagram.png";
import linkedinIcon from "../../assets/img/linkedin.png";
import Icon from "./Icon";

function SocialIcons() {
  const socialIcons = [
    { href: "https://facebook.com", src: facebookIcon, alt: "Facebook" },
    { href: "https://instagram.com", src: instagramIcon, alt: "Instagram" },
    { href: "https://linkedin.com", src: linkedinIcon, alt: "LinkedIn" },
  ];
  return (
    <div className="flex justify-center items-center gap-2">
      {socialIcons.map((icon, i) => (
        <a rel="noneferrer noreferrer" target="_blank" href={icon.href}>
          <Icon key={i} src={icon.src} alt={icon.alt} />
        </a>
      ))}
    </div>
  );
}

export default SocialIcons;
