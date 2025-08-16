// src/components/PublicRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * Composant de route publique.
 *
 * Vérifie si l'utilisateur est connecté via le context Auth.
 * Si connecté, redirige vers la page "/home".
 * Sinon, rend les enfants du composant.
 *
 * @component
 * @param {Object} props
 * @param {React.ReactNode} props.children - Composants à afficher si l'utilisateur n'est pas connecté
 *
 * @example
 * <PublicRoute>
 *   <Login />
 * </PublicRoute>
 */
function PublicRoute({ children }) {
  const { user } = useAuth();

  return user ? <Navigate to="/home" /> : children;
}

export default PublicRoute;
