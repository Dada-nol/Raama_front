import { AuthProvider } from "./context/AuthContext";
import Router from "./Router";
import "./styles/scss/auth.scss";
import "./styles/scss/landingPage.scss";
import "./styles/scss/layout.scss";
import "./styles/scss/main.scss";
import "./styles/scss/profil.scss";
import "./styles/scss/transitions.scss";

function App() {
  return (
    <div className="App flex min-h-screen text-text">
      <AuthProvider>
        <Router></Router>
      </AuthProvider>
    </div>
  );
}

export default App;
