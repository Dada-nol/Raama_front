import axios from "axios";
import { useState } from "react";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    const res = await axios.post("http://localhost:8000/api/register", {
      name,
      email,
      password,
      password_confirmation,
    });

    localStorage.setItem("token", res.data.token);
    alert("Compte créée");
  };

  return (
    <form className="form" onSubmit={handleRegister}>
      <div className="form-item">
        <div>
          <label htmlFor="">Name</label>
        </div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

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

      <div className="form-item">
        <div>
          <label htmlFor="">Confirm password</label>
        </div>
        <input
          type="password"
          value={password_confirmation}
          onChange={(e) => setPassword_confirmation(e.target.value)}
        />
      </div>

      <button type="submit">Valider</button>
    </form>
  );
}

export default Register;
