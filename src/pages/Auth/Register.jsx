import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/ui/Logo";
import "../../styles/scss/auth.scss";

function Register() {
  const [name, setName] = useState("");
  const [firstname, setFirstName] = useState(""); // a faire
  const [pseudo, setPseudo] = useState(""); // a faire
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const res = await axios.post("http://localhost:8000/api/register", {
      name,
      email,
      password,
      password_confirmation,
    });

    const token = res.data.token;

    localStorage.setItem("token", token);
    navigate("/home");
  };

  return (
    <div className="container-form">
      <Logo></Logo>
      <div>
        <form onSubmit={handleRegister}>
          <h2>Create an account to continue</h2>
          <div className="form-item">
            <input
              type="text"
              value={name}
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-item">
            <input
              type="text"
              value={firstname}
              placeholder="Firstname"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="form-item">
            <input
              type="text"
              value={pseudo}
              placeholder="Pseudo"
              onChange={(e) => setPseudo(e.target.value)}
            />
          </div>

          <hr></hr>

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
          </div>

          <div className="form-item">
            <input
              type="password"
              value={password_confirmation}
              placeholder="Confirm password"
              onChange={(e) => setPassword_confirmation(e.target.value)}
            />
          </div>

          <div>
            <p>
              By creating an account, <br></br>you agree to our Privacy Policy
            </p>
            <button type="submit">Valider</button>
            <p>
              <a href="/login">Sign in</a> if you already have an account.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
