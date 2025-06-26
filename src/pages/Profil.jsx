import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logout from "../components/Logout";

function Profil() {
  const [user, setUser] = useState(null); // initialiser un user avec un appel API
  const [show, setShow] = useState(false); // afficher les données d'un user mais avec setTimeOut
  const [error, setError] = useState(null); //afficher un message d'erreur s'il n'y a pas de user

  const navigate = useNavigate();

  // obtenir les info du user connecté
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/user", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setUser(res.data);
      } catch (e) {
        console.error("Erreur lors de la récupération de l'utilisateur :", e);
      }
    };

    fetchData();
  }, []);

  // Mise en place d'un délai pour afficher soit des données soit une erreur
  useEffect(() => {
    const timer = setTimeout(() => {
      if (user) {
        setShow(true);
      } else {
        setError(
          <>
            <p>Veuillez vous connecter !</p>
            <div className="flex-row">
              <a href="/login">Se connecter</a>
              <>Ou</>
              <a href="/register">Créer un compte</a>
            </div>
          </>
        );
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [user]);

  if (!user || !show) {
    return <>{error || <p>Chargement...</p>}</>;
  }

  // Method de suppression de compte
  const deleteAccount = async () => {
    await axios.delete("http://localhost:8000/api/user", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    localStorage.removeItem("token");

    navigate("/");
  };

  return (
    <>
      <div>
        <p>{user.name}</p>
        <p>{user.email}</p>
      </div>

      <a href="/">Home</a>

      <div>
        <Logout></Logout>
      </div>
      <button onClick={deleteAccount}>Supprimer le compte</button>
    </>
  );
}

export default Profil;
