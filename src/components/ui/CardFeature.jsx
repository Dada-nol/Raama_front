function CardFeature({ icon, description }) {
  return (
    <div className="card-feature">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="#64b000"
          viewBox="0 0 256 256"
        >
          <path d={icon}></path>
        </svg>
      </div>
      <p>{description}</p>
    </div>
  );
}

export default CardFeature;
