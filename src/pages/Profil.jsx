import axios from "axios";
import { useEffect, useState } from "react";

function Profil() {
  const [user, setUser] = useState(null);

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

  if (!user) {
    return <p>Chargement...</p>;
  }

  return (
    <>
      <div>
        <p>{user.name}</p>
        <p>{user.email}</p>
      </div>
    </>
  );
}

export default Profil;
