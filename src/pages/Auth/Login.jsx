import { LockClosedIcon, UserIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import panda4 from "../../assets/img/panda4.jpg";
import Input from "../../components/ui/Input";
import Logo from "../../components/ui/Logo";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const { setUser } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [globalErrors, setGlobalErrors] = useState("");
  const navigate = useNavigate();

  const isMobile = window.innerWidth <= 768;

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      const res = await axios.post("http://localhost:8000/api/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      // Appel manuellement l'API pour remplir le context directement
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="h-screen w-full grid grid-cols-1 md:grid-cols-2 content-center bg-secondary">
      {!isMobile && (
        <section className="h-screen overflow-hidden">
          <img src={panda4} alt="Panda" className="h-full object-cover" />
        </section>
      )}

      <form
        className="w-full flex flex-col items-center gap-4 py-4 h-screen"
        onSubmit={handleLogin}
      >
        <Logo width={200}></Logo>
        <h2 className="py-6 text-xl font-bold">Login</h2>
        <div className="relative w-[400px]">
          <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type={"text"}
            value={email}
            placeholder={"Email"}
            onChange={(e) => setEmail(e.target.value)}
          ></Input>
        </div>
        {errors.email && <p className="text-danger">{errors.email[0]}</p>}

        <div className="relative w-[400px]">
          <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type={"password"}
            value={password}
            placeholder={"Password"}
            onChange={(e) => setPassword(e.target.value)}
          ></Input>
        </div>
        {errors.password && <p className="text-danger">{errors.password[0]}</p>}

        {globalErrors && <p className="text-danger">{globalErrors}</p>}

        <div className="w-[400px] text-right">
          <a
            className="inline-block text-gradient transition-transform duration-300 hover:scale-105"
            href="/reset-password"
          >
            Forget password ?
          </a>
        </div>
        <button
          className={`inline-block gradient-border transition-transform duration-300 hover:scale-105 px-4 py-2 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Chargement..." : "Se connecter"}
        </button>
        <p className="text-center">
          <a
            className="inline-block text-gradient transition-transform duration-300 hover:scale-105 pr-2"
            href="/register"
          >
            Sign up
          </a>
          if you don't have an account yet.
        </p>
      </form>
    </main>
  );
}

export default Login;
