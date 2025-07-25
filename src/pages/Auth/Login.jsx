import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/ui/Logo";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const { setUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [globalErrors, setGlobalErrors] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      const res = await axios.post("http://localhost:8000/api/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      // 🔥 Appelle manuellement l'API pour remplir le context directement
      const userRes = await axios.get("http://localhost:8000/api/user", {
        headers: {
          Authorization: `Bearer ${res.data.token}`,
        },
      });

      setUser(userRes.data);

      navigate("/home");
    } catch (e) {
      if (e.response && e.response.status === 422) {
        setErrors(e.response.data.errors); // <- Laravel met les erreurs ici
      } else if (e.response && e.response.status === 401) {
        setGlobalErrors("Email ou mot de passe incorrect.");
      } else {
        console.error("Erreur inattendue", e);
      }
    }
  };
  return (
    <main className="container-form">
      <Logo></Logo>
      <form className="auth" onSubmit={handleLogin}>
        <h2>Login</h2>
        <div className="form-item">
          <input
            type="text"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="error">{errors.email[0]}</p>}
        </div>
        <div className="form-item">
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="error">{errors.password[0]}</p>}
          <a href="/reset-password">Forget password ?</a>
        </div>

        <button type="submit">Se connecter</button>
        {globalErrors && <p className="error">{globalErrors}</p>}
        <p>
          <a href="/register">Sign up</a> if you don't have an account yet.
        </p>
      </form>
    </main>
  );
}

export default Login;
