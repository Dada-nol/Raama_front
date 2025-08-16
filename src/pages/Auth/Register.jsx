import {
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import panda4 from "../../assets/img/panda4.jpg";
import Input from "../../components/ui/Input";
import Logo from "../../components/ui/Logo";
import { useAuth } from "../../context/AuthContext";

/**
 * Page d'inscription pour les utilisateurs.
 *
 * Fonctionnalités :
 * - Permet à un nouvel utilisateur de créer un compte avec nom, prénom, email et mot de passe.
 * - Vérifie la confirmation du mot de passe.
 * - Enregistre le token JWT dans le localStorage après inscription.
 * - Remplit le contexte utilisateur avec les informations récupérées via l'API `/user`.
 * - Redirige l'utilisateur vers la page d'accueil (`/home`) après inscription réussie.
 * - Affiche les erreurs spécifiques aux champs (Laravel 422) et empêche l'envoi multiple.
 * - Affiche une image illustrative sur les écrans desktop.
 *
 * Composants internes utilisés :
 * - Input : champ de saisie réutilisable.
 * - Logo : logo de l'application.
 * - LockClosedIcon, UserIcon, EnvelopeIcon : icônes pour le formulaire.
 *
 * @module Register
 * @returns {JSX.Element} Page d'inscription complète
 */
function Register() {
  const { setUser } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [firstname, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      const res = await axios.post("/register", {
        name,
        firstname,
        email,
        password,
        password_confirmation,
      });

      const token = res.data.token;

      localStorage.setItem("token", token);

      // 🔥 Appelle manuellement l'API pour remplir le context directement
      const userRes = await axios.get("/user", {
        headers: {
          Authorization: `Bearer ${res.data.token}`,
        },
      });

      setUser(userRes.data);
      navigate("/home");
    } catch (e) {
      if (e.response && e.response.status === 422) {
        setErrors(e.response.data.errors);
      } else {
        console.error("Erreur inattendue", e);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2 bg-secondary">
      {/* Formulaire */}
      <form
        className="w-full flex flex-col items-center gap-4 pb-20 px-4 md:px-8 justify-center"
        onSubmit={handleRegister}
      >
        <Logo width={200} />
        <h2 className="py-6 text-xl font-bold">
          Create an account to continue
        </h2>

        {/* Name */}
        <div className="relative w-full max-w-[400px]">
          <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            value={name}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        {errors.name && <p className="text-danger">{errors.name[0]}</p>}

        {/* Firstname */}
        <div className="relative w-full max-w-[400px]">
          <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            value={firstname}
            placeholder="Firstname"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        {errors.firstname && (
          <p className="text-danger">{errors.firstname[0]}</p>
        )}

        <hr className="border border-gray-300 w-full max-w-[300px] my-4" />

        {/* Email */}
        <div className="relative w-full max-w-[400px]">
          <EnvelopeIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {errors.email && <p className="text-danger">{errors.email[0]}</p>}

        {/* Password */}
        <div className="relative w-full max-w-[400px]">
          <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Confirm password */}
        <div className="relative w-full max-w-[400px]">
          <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="password"
            value={password_confirmation}
            placeholder="Confirm password"
            onChange={(e) => setPassword_confirmation(e.target.value)}
          />
        </div>
        {errors.password && <p className="text-danger">{errors.password[0]}</p>}

        {/* Privacy */}
        <div className="flex flex-col justify-center items-center my-4 text-center">
          <p>By creating an account,</p>
          <p>you agree to our Privacy Policy</p>
        </div>

        {/* Submit */}
        <button
          className={`gradient-border transition-transform duration-300 hover:scale-105 px-4 py-2 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Chargement..." : "Register"}
        </button>

        {/* Link to login */}
        <p className="text-center">
          <a
            className="inline-block text-gradient transition-transform duration-300 hover:scale-105 pr-2"
            href="/login"
          >
            Sign in
          </a>
          if you already have an account.
        </p>
      </form>

      {/* Image uniquement sur desktop */}
      <section className="hidden md:block overflow-hidden">
        <img src={panda4} alt="Panda" className="h-full w-full object-cover" />
      </section>
    </main>
  );
}

export default Register;
