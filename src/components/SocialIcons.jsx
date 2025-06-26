function SocialIcons(props) {
  const socialIcons = [props.src, props.alt];
  return (
    <div className="social-icons">
      {socialIcons.map((icon, i) => (
        <img
          key={i}
          src={icon.src}
          alt={icon.alt}
          className="social-icon-img"
        />
      ))}
    </div>
  );
}

export default SocialIcons;
