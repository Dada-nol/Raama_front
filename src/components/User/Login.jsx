import axios from "axios";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await axios.post("http://localhost:8000/api/login", {
      email,
      password,
    });

    localStorage.setItem("token", res.data.token);
    alert("Connecté !");
  };
  return (
    <form className="form" onSubmit={handleLogin}>
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
  );
}

export default Login;
