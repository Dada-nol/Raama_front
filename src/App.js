import { AuthProvider } from "./context/AuthContext";
import Router from "./Router";
import "./styles/scss/layout.scss";
import "./styles/scss/main.scss";
import "./styles/scss/profil.scss";
import "./styles/scss/transitions.scss";

/**
 * Composant principal de l'application.
 *
 * Ce composant englobe l'ensemble de l'application dans le contexte AuthProvider
 * pour gérer l'authentification des utilisateurs et rend le Router principal
 * pour la navigation entre les différentes pages.
 *
 * Styles importés :
 * - layout.scss : structure générale
 * - main.scss : styles globaux
 * - profil.scss : styles spécifiques au profil
 * - transitions.scss : animations de transition
 *
 * @component
 *
 * @example
 * <App />
 */
function App() {
  return (
    <div className="App flex min-h-screen text-text">
      <AuthProvider>
        <Router />
      </AuthProvider>
    </div>
  );
}

export default App;
