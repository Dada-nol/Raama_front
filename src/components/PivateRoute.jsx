import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * Composant de route privée.
 *
 * Vérifie si l'utilisateur est connecté via le context Auth.
 * Si connecté, rend les enfants du composant.
 * Sinon, redirige vers la page de connexion.
 *
 * @component
 * @param {Object} props
 * @param {React.ReactNode} props.children - Composants à afficher si l'utilisateur est connecté
 *
 * @example
 * <PrivateRoute>
 *   <Dashboard />
 * </PrivateRoute>
 */
function PrivateRoute({ children }) {
  const { user } = useAuth();

  return user ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
