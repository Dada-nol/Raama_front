import { AuthProvider } from "./context/AuthContext";
import Router from "./Router";

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
