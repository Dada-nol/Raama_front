import facebookIcon from "../assets/img/facebook.png";
import instagramIcon from "../assets/img/instagram.png";
import linkedinIcon from "../assets/img/linkedin.png";
import Icon from "./Icon";

function SocialIcons() {
  const socialIcons = [
    { src: facebookIcon, alt: "Facebook" },
    { src: instagramIcon, alt: "Instagram" },
    { src: linkedinIcon, alt: "LinkedIn" },
  ];
  return (
    <div className="social-icons">
      {socialIcons.map((icon, i) => (
        <Icon key={i} src={icon.src} alt={icon.alt} />
      ))}
    </div>
  );
}

export default SocialIcons;
