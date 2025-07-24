import { AuthProvider } from "./context/AuthContext";
import Router from "./Router";
import "./styles/scss/auth.scss";
import "./styles/scss/entry.scss";
import "./styles/scss/footer.scss";
import "./styles/scss/header.scss";
import "./styles/scss/landingPage.scss";
import "./styles/scss/main.scss";
import "./styles/scss/profil.scss";
import "./styles/scss/souvenirPage.scss";
import "./styles/scss/transitions.scss";

function App() {
  return (
    <div className="App flex h-screen text-text">
      <AuthProvider>
        <Router></Router>
      </AuthProvider>
    </div>
  );
}

export default App;
