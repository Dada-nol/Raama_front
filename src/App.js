import { AuthProvider } from "./context/AuthContext";
import Router from "./Router";
import "./styles/scss/main.scss";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router></Router>
      </AuthProvider>
    </div>
  );
}

export default App;
