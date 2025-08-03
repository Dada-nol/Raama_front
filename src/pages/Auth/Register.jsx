import {
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import panda4 from "../../assets/img/panda4.jpg";
import Logo from "../../components/ui/Logo";
import { useAuth } from "../../context/AuthContext";

function Register() {
  const { setUser } = useAuth();

  const isMobile = window.innerWidth <= 768;

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
      const res = await axios.post("http://localhost:8000/api/register", {
        name,
        firstname,
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
        setErrors(e.response.data.errors);
      } else {
        console.error("Erreur inattendue", e);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="w-full grid grid-cols-1 md:grid-cols-2 content-center bg-secondary">
      <form
        className="w-full flex flex-col items-center gap-4  pb-20"
        onSubmit={handleRegister}
      >
        <Logo width={200}></Logo>
        <h2 className="py-6 text-xl font-bold">
          Create an account to continue
        </h2>
        <div className="relative w-[400px]">
          <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            className="w-full pl-10 border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-primary"
            type="text"
            value={name}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        {errors.name && <p className="text-danger">{errors.name[0]}</p>}

        <div className="relative w-[400px]">
          <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            className="w-full pl-10 border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-primary"
            type="text"
            value={firstname}
            placeholder="Firstname"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        {errors.firstname && (
          <p className="text-danger">{errors.firstname[0]}</p>
        )}

        <hr className="border border-gray-300 w-[300px] my-4"></hr>

        <div className="relative w-[400px]">
          <EnvelopeIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            className="w-full pl-10 border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-primary"
            type="text"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {errors.email && <p className="text-danger">{errors.email[0]}</p>}

        <div className="relative w-[400px]">
          <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            className="w-full pl-10 border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-primary"
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="relative w-[400px]">
          <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            className="w-full pl-10 border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-primary"
            type="password"
            value={password_confirmation}
            placeholder="Confirm password"
            onChange={(e) => setPassword_confirmation(e.target.value)}
          />
        </div>
        {errors.password && <p className="text-danger">{errors.password[0]}</p>}

        <div className="flex flex-col justify-center items-center my-4">
          <p>By creating an account,</p>
          <p>you agree to our Privacy Policy</p>
        </div>
        <button
          className={`inline-block gradient-border transition-transform duration-300 hover:scale-105 px-4 py-2 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Chargement..." : "Register"}
        </button>
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

      {!isMobile && (
        <section className="overflow-hidden m-0">
          <img src={panda4} alt="Panda" className="h-full object-cover" />
        </section>
      )}
    </main>
  );
}

export default Register;
