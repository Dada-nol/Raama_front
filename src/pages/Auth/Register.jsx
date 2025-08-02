import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/ui/Logo";
import { useAuth } from "../../context/AuthContext";

function Register() {
  const { setUser } = useAuth();

  const [name, setName] = useState("");
  const [firstname, setFirstName] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      const res = await axios.post("http://localhost:8000/api/register", {
        name,
        firstname,
        pseudo,
        email,
        password,
        password_confirmation,
      });

      const token = res.data.token;

      localStorage.setItem("token", token);

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
      } else {
        console.error("Erreur inattendue", e);
      }
    }
  };

  return (
    <main className="flex justify-center items-center">
      <Logo width={200}></Logo>
      <div>
        <form className="auth" onSubmit={handleRegister}>
          <h2>Create an account to continue</h2>
          <div className="form-item">
            <input
              type="text"
              value={name}
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <p className="error">{errors.name[0]}</p>}
          </div>

          <div className="form-item">
            <input
              type="text"
              value={firstname}
              placeholder="Firstname"
              onChange={(e) => setFirstName(e.target.value)}
            />
            {errors.firstname && <p className="error">{errors.firstname[0]}</p>}
          </div>

          <div className="form-item">
            <input
              type="text"
              value={pseudo}
              placeholder="Pseudo"
              onChange={(e) => setPseudo(e.target.value)}
            />
            {errors.pseudo && <p className="error">{errors.pseudo[0]}</p>}
          </div>

          <hr></hr>

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
          </div>

          <div className="form-item">
            <input
              type="password"
              value={password_confirmation}
              placeholder="Confirm password"
              onChange={(e) => setPassword_confirmation(e.target.value)}
            />
            {errors.password && <p className="error">{errors.password[0]}</p>}
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
    </main>
  );
}

export default Register;
