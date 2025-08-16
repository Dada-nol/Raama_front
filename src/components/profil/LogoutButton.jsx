import { useAuth } from "../../context/AuthContext";

/**
 * Composant pour afficher un bouton de déconnexion.
 *
 * Fonctionnalités :
 * - Appelle la fonction `logout` du contexte Auth pour déconnecter l'utilisateur.
 *
 * @component
 *
 * @example
 * <LogoutButton />
 */
function LogoutButton() {
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };
  return (
    <>
      <button
        className="text-center w-full hover:text-danger hover:scale-105"
        onClick={handleLogout}
      >
        Déconnexion
      </button>
    </>
  );
}

export default LogoutButton;
