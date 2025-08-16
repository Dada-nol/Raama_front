import logo from "../../assets/img/logo.png";

/**
 * Composant affichant le logo de l'application.
 *
 * @param {Object} props
 * @param {number} props.width - Largeur du logo en pixels.
 *
 * @component
 *
 * @example
 * <Logo width={150} />
 */
export default function Logo({ width }) {
  return (
    <div>
      <img src={logo} alt="Pandaraama" style={{ width: `${width}px` }} />
    </div>
  );
}
