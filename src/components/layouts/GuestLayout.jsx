import { Outlet } from "react-router-dom";
import Footer from "./guest/Footer";
import Nav from "./guest/Nav";

/**
 * Composant de mise en page pour les pages publiques (visiteurs non connectés).
 *
 * Affiche la barre de navigation (Nav) en haut, les routes enfants via <Outlet /> et le pied de page (Footer) en bas.
 *
 * @component
 *
 * @example
 * <GuestLayout />
 */
function GuestLayout() {
  return (
    <div className="flex flex-col w-full">
      <Nav />
      <Outlet />
      <Footer />
    </div>
  );
}

export default GuestLayout;
