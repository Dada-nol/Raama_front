export default function Logo(props) {
  return (
    <div className={props.className}>
      <a href={props.href}>
        <img
          src={`/assets/img/${props.src}`}
          alt={props.alt}
          className="logo"
        />
      </a>
    </div>
  );
}
