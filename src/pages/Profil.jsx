import axios from "axios";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../components/ui/LogoutButton";
import { useAuth } from "../context/AuthContext";

function Profil() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const createdAtDate = new Date(user.created_at);
  const formattedDate = createdAtDate.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

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
        <img src="" alt="" />
        <div className="profile">
          <p>{user.name}</p>
          <p>{user.email}</p>
          <p>Membre depuis le {formattedDate}</p>
        </div>
      </div>

      <a href="/">Home</a>

      <div>
        <LogoutButton></LogoutButton>
      </div>
      <button onClick={deleteAccount}>Supprimer le compte</button>
    </>
  );
}

export default Profil;
