/**
 * Composant représentant une carte de fonctionnalité.
 *
 * Affiche une icône SVG et une description centrée.
 *
 * @param {Object} props
 * @param {string} props.icon - Le path SVG de l'icône à afficher.
 * @param {string} props.description - Le texte descriptif de la fonctionnalité.
 *
 * @component
 *
 * @example
 * <CardFeature
 *   icon="M10 10 H 90 V 90 H 10 Z"
 *   description="Exemple de fonctionnalité"
 * />
 */
function CardFeature({ icon, description }) {
  return (
    <div className="card-feature">
      <div className="flex flex-col justify-center items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="#64b000"
          viewBox="0 0 256 256"
        >
          <path d={icon}></path>
        </svg>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default CardFeature;
