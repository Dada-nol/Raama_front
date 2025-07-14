import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/ui/Logo";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const { setUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

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
      console.error("Les informations données sont incorrect");
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
        </div>
        <div className="form-item">
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <a href="/reset-password">Forget password ?</a>
        </div>

        <button type="submit">Se connecter</button>
        <p>
          <a href="/register">Sign up</a> if you don't have an account yet.
        </p>
      </form>
    </main>
  );
}

export default Login;
