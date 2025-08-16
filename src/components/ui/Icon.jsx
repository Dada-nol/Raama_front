/**
 * Composant affichant une image en tant qu'icône.
 *
 * @param {Object} props
 * @param {string} props.src - L'URL ou chemin de l'image à afficher.
 * @param {string} props.alt - Le texte alternatif pour l'image.
 *
 * @component
 *
 * @example
 * <Icon src="/path/to/icon.png" alt="Icône exemple" />
 */
function Icon(props) {
  return <img className="w-6" src={props.src} alt={props.alt}></img>;
}

export default Icon;
