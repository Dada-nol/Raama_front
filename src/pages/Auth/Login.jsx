import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/ui/Logo";

function Login() {
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
      navigate("/home");
    } catch (e) {
      console.error("Les informations données sont incorrect");
    }
  };
  return (
    <div className="container-form">
      <form className="form" onSubmit={handleLogin}>
        <Logo></Logo>
        <div className="form-item">
          <div>
            <label htmlFor="">Email</label>
          </div>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-item">
          <div>
            <label htmlFor="">Password</label>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}

export default Login;
